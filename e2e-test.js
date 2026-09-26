const BASE = 'http://localhost:5501';
const fs = require('fs');

// Derive SERVER_KEYS from pos.js itself so this test tracks the real client.
// SERVER_KEYS = every STORAGE_KEYS value except the per-terminal ones.
const CLIENT_ONLY = ['ff_session', 'ff_panel', 'ff_report_tab', 'ff_report_period', 'ff_recovery'];
const posSource = fs.readFileSync(require('path').join(__dirname, 'pos.js'), 'utf8');
const block = posSource.match(/const STORAGE_KEYS = \{([\s\S]*?)\n\};/)[1];
const ALL_KEYS = [...block.matchAll(/:\s*'(ff_[a-z_]+)'/g)].map((m) => m[1]);
const STORAGE_KEYS = ALL_KEYS.filter((k) => !CLIENT_ONLY.includes(k));

let pass = 0;
let fail = 0;

function check(name, ok, detail) {
  if (ok) { pass++; console.log('  PASS  ' + name); }
  else { fail++; console.log('  FAIL  ' + name + (detail ? '  -> ' + detail : '')); }
}

async function main() {
  console.log('\n=== 1. Terminal boot sync (initServerSync) ===');
  const bootRes = await fetch(BASE + '/api/data');
  check('GET /api/data returns 200', bootRes.ok, 'got ' + bootRes.status);
  check('ETag header present', !!bootRes.headers.get('etag'));
  const payload = await bootRes.json();
  const data = payload.data || {};

  console.log('\n=== 2. All SERVER_KEYS hydrate into memoryStore ===');
  console.log('  (' + STORAGE_KEYS.length + ' keys derived from pos.js)');
  const missing = STORAGE_KEYS.filter((k) => data[k] === undefined || data[k] === null);
  check('every SERVER_KEYS key present and non-null', missing.length === 0, 'missing: ' + missing.join(','));
  const extra = Object.keys(data).filter((k) => !STORAGE_KEYS.includes(k));
  check('no unexpected keys in database', extra.length === 0, 'extra: ' + extra.join(','));

  console.log('\n=== 3. Junk / per-terminal keys are NOT in the database ===');
  for (const bad of ['ff_session', 'ff_recovery', 'ff_testkey', 'ff_panel']) {
    check(bad + ' absent', !(bad in data));
  }

  console.log('\n=== 4. Real business data intact ===');
  check('ff_sales is a non-empty array', Array.isArray(data.ff_sales) && data.ff_sales.length > 0, 'got ' + data.ff_sales.length);
  check('ff_inventory is a non-empty array', Array.isArray(data.ff_inventory) && data.ff_inventory.length > 0, 'got ' + data.ff_inventory.length);
  check('ff_menu is a non-empty array', Array.isArray(data.ff_menu) && data.ff_menu.length > 0, 'got ' + data.ff_menu.length);
  check('ff_stock_log is an array', Array.isArray(data.ff_stock_log), 'got ' + typeof data.ff_stock_log);
  check('ff_settings is an object', typeof data.ff_settings === 'object' && !Array.isArray(data.ff_settings));
  check('shopName is set', typeof data.ff_settings.shopName === 'string' && data.ff_settings.shopName.length > 0, data.ff_settings.shopName);
  check('every sale has a numeric total', data.ff_sales.every((s) => Number.isFinite(s.total)));
  check('no duplicate sale ids', new Set(data.ff_sales.map((s) => s.id)).size === data.ff_sales.length);

  console.log('\n=== 5. Simulated checkout: read-modify-write ff_sales ===');
  const baseline = data.ff_sales.length;
  const sales = JSON.parse(JSON.stringify(data.ff_sales));
  const nextInvoice = Math.max(...sales.map((s) => s.invoice || 0)) + 1;
  sales.push({
    id: Date.now(), invoice: nextInvoice, subtotal: 1000, total: 1075, tax: 75,
    paid: 1075, change: 0, cashier: 'e2e', createdAt: new Date().toISOString(),
    items: [{ id: 1, name: 'E2E Item', qty: 1, price: 1000 }], payments: [{ method: 'Cash', amount: 1075 }],
    rawSubtotal: 1000, discountTotal: 0, promo: null, discount: null, loyalty: null
  });
  const putRes = await fetch(BASE + '/api/data/ff_sales', {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sales)
  });
  const putBody = await putRes.json();
  check('PUT /api/data/ff_sales returns 200', putRes.ok, 'got ' + putRes.status);
  check('PUT reports a version', typeof putBody.version === 'number', JSON.stringify(putBody));

  const verify = await (await fetch(BASE + '/api/data/ff_sales')).json();
  check(`sale persisted (${baseline + 1} now)`, verify.value.length === baseline + 1, 'got ' + verify.value.length);
  check('new invoice number assigned', verify.value[baseline].invoice === nextInvoice);

  console.log('\n=== 6. Durability: value is in PostgreSQL, not just cache ===');
  const { Pool } = require('pg');
  const pool = new Pool({ host: '127.0.0.1', user: 'ffapp', database: 'fasterfood' });
  const { rows } = await pool.query("SELECT jsonb_array_length(value) n FROM app_data WHERE key='ff_sales'");
  check(`row in app_data has ${baseline + 1} sales`, rows[0].n === baseline + 1, 'got ' + rows[0].n);

  console.log('\n=== 7. Restore original sales ===');
  const restore = await fetch(BASE + '/api/data/ff_sales', {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data.ff_sales)
  });
  check('restore PUT ok', restore.ok);
  const after = await (await fetch(BASE + '/api/data/ff_sales')).json();
  check('back to ' + baseline + ' sales', after.value.length === baseline, 'got ' + after.value.length);

  console.log('\n=== 8. menu-online.html single-key GETs ===');
  const m = await (await fetch(BASE + '/api/data/ff_menu')).json();
  const s = await (await fetch(BASE + '/api/data/ff_settings')).json();
  check('ff_menu returns array', Array.isArray(m.value));
  check('ff_settings returns object', s.value && typeof s.value === 'object' && !Array.isArray(s.value));

  console.log('\n=== 9. find-server.html probe ===');
  const info = await (await fetch(BASE + '/api/info')).json();
  check('app identifier matches', info.app === 'FasterFood POS', info.app);
  check('reports LAN addresses', Array.isArray(info.addresses) && info.addresses.length > 0);

  console.log('\n=== 10. Heartbeat + systems presence ===');
  const hb = await (await fetch(BASE + '/api/heartbeat', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: 't-e2e-a', system: '', user: 'e2e' })
  })).json();
  check('heartbeat assigns a name', !!hb.system, JSON.stringify(hb));
  const sys = await (await fetch(BASE + '/api/systems')).json();
  check('terminal appears in /api/systems', sys.systems.some((x) => x.id === 't-e2e-a'));
  await fetch(BASE + '/api/heartbeat', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: 't-e2e-a', user: 'e2e', status: 'offline' })
  });

  console.log('\n=== 11. Malformed body rejected ===');
  const bad = await fetch(BASE + '/api/data/ff_sales', {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: '{not json'
  });
  check('invalid JSON returns 400', bad.status === 400, 'got ' + bad.status);

  console.log('\n=== 12. Installable app assets (manifest, icons, service worker) ===');
  const manifestRes = await fetch(BASE + '/manifest.webmanifest');
  check('manifest returns 200', manifestRes.ok, 'got ' + manifestRes.status);
  check('manifest served as application/manifest+json',
    (manifestRes.headers.get('content-type') || '').includes('application/manifest+json'),
    manifestRes.headers.get('content-type'));

  const manifest = await manifestRes.json();
  check('manifest parses', !!manifest && typeof manifest === 'object');
  check('has a name and a short name', !!manifest.name && !!manifest.short_name,
    manifest.name + ' / ' + manifest.short_name);
  check('display is standalone', manifest.display === 'standalone', manifest.display);
  check('start_url and scope are in scope', manifest.start_url === '/' && manifest.scope === '/',
    manifest.start_url + ' ' + manifest.scope);
  check('theme_color and background_color set', !!manifest.theme_color && !!manifest.background_color);

  const declared = manifest.icons || [];
  const has192 = declared.some((i) => i.sizes === '192x192');
  const has512 = declared.some((i) => i.sizes === '512x512');
  const hasMaskable = declared.some((i) => String(i.purpose || '').includes('maskable'));
  check('declares a 192x192 icon', has192);
  check('declares a 512x512 icon', has512);
  check('declares a maskable icon for Android', hasMaskable);

  // Every icon the manifest names must actually exist and be a real PNG.
  for (const icon of declared) {
    const res = await fetch(BASE + icon.src);
    const type = res.headers.get('content-type') || '';
    const isPng = res.ok && type.includes('image/png') &&
      Buffer.from(await res.arrayBuffer()).subarray(0, 8).toString('hex') === '89504e470d0a1a0a';
    check('icon served: ' + icon.src, isPng, 'status ' + res.status + ' type ' + type);
  }

  // Referenced by <link>/<meta> in pos-1.html, so they must resolve too.
  for (const asset of ['/favicon.ico', '/icons/icon-32.png', '/icons/icon-144.png', '/icons/apple-touch-icon.png']) {
    const res = await fetch(BASE + asset);
    check('asset served: ' + asset, res.ok, 'got ' + res.status);
  }

  const swRes = await fetch(BASE + '/sw.js');
  check('sw.js returns 200', swRes.ok, 'got ' + swRes.status);
  check('sw.js is a script', (swRes.headers.get('content-type') || '').includes('javascript'),
    swRes.headers.get('content-type'));
  const swBody = await swRes.text();
  // The worker must stay a pass-through. A respondWith here would let a
  // cached copy of the menu or prices reach a live till.
  check('sw.js does not intercept requests', !/respondWith/.test(swBody));
  check('sw.js registers a fetch handler', /addEventListener\(\s*['"]fetch['"]/.test(swBody));

  const page = await (await fetch(BASE + '/')).text();
  check('page links the manifest', /rel="manifest"/.test(page));
  check('page has an apple-touch-icon', /rel="apple-touch-icon"/.test(page));
  check('page has a theme-color', /name="theme-color"/.test(page));
  check('page no longer references the old logo files',
    !/src="(logo|log)\.png"/.test(page));

  await pool.end();
  console.log('\n========================================');
  console.log('  ' + pass + ' passed, ' + fail + ' failed');
  console.log('========================================\n');
  process.exit(fail ? 1 : 0);
}

main().catch((error) => { console.error('E2E crashed:', error); process.exit(1); });
