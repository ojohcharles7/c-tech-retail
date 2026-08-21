const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 5501;
const HOST = '0.0.0.0';
const ROOT = __dirname;
const DB_FILE = path.join(ROOT, 'db.json');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.csv': 'text/csv; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

let db = {};
let saveTimer = null;
const sseClients = new Set();

function loadDb() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    db = JSON.parse(raw);
    if (!db || typeof db !== 'object' || Array.isArray(db)) db = {};
  } catch (error) {
    db = {};
  }
}

function persistDb() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), (err) => {
      if (err) console.error('[db] save failed:', err.message);
    });
  }, 250);
}

function broadcast(key) {
  const payload = `data: ${JSON.stringify({ key, value: db[key] })}\n\n`;
  for (const res of sseClients) {
    try { res.write(payload); } catch (error) { sseClients.delete(res); }
  }
}

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

function readBody(req, cb) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > 100 * 1024 * 1024) req.destroy();
  });
  req.on('end', () => cb(body));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(url.pathname);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (pathname === '/api/data' && req.method === 'GET') {
    sendJson(res, 200, { data: db });
    return;
  }

  const keyMatch = pathname.match(/^\/api\/data\/([^/]+)$/);
  if (keyMatch && req.method === 'GET') {
    sendJson(res, 200, { key: keyMatch[1], value: db[keyMatch[1]] ?? null });
    return;
  }

  if (keyMatch && req.method === 'PUT') {
    const key = keyMatch[1];
    readBody(req, (body) => {
      try {
        const value = JSON.parse(body || 'null');
        db[key] = value;
        persistDb();
        broadcast(key);
        sendJson(res, 200, { ok: true });
      } catch (error) {
        sendJson(res, 400, { error: 'Invalid JSON body' });
      }
    });
    return;
  }

  if (pathname === '/menu') {
    const filePath = path.join(ROOT, 'menu-online.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  if (pathname === '/api/events' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'
    });
    res.write('retry: 3000\n\n');
    sseClients.add(res);
    req.on('close', () => sseClients.delete(res));
    return;
  }

  if (pathname === '/api/info' && req.method === 'GET') {
    sendJson(res, 200, {
      app: 'FasterFood POS',
      port: PORT,
      addresses: getNetworkAddresses()
    });
    return;
  }

  const relPath = pathname === '/' ? 'pos-1.html' : pathname.replace(/^\/+/, '');
  const filePath = path.join(ROOT, relPath);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-cache'
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
    }
  });
});

function getNetworkAddresses() {
  const addresses = [];
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        addresses.push({ name, address: net.address });
      }
    }
  }
  return addresses;
}

loadDb();

server.listen(PORT, HOST, () => {
  console.log('FasterFood POS server running');
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log('  Network:');
  for (const addr of getNetworkAddresses()) {
    console.log(`    http://${addr.address}:${PORT}  (${addr.name})`);
  }
  console.log(`  Data:    ${DB_FILE}`);
});

process.on('SIGINT', () => {
  persistDb();
  setTimeout(() => process.exit(0), 300);
});