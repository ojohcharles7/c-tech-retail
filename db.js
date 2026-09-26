const { Pool } = require('pg');

const config = {
  host: process.env.PGHOST || '127.0.0.1',
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE || 'fasterfood',
  user: process.env.PGUSER || 'ffapp',
  password: process.env.PGPASSWORD || undefined,
  max: Number(process.env.PGPOOLMAX || 10),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
};

const LEGACY_KEYS = ['ff_testkey', 'ff_session', 'ff_recovery'];

const cache = new Map();
const versions = new Map();
const writeQueues = new Map();
let pool = null;
let ready = false;
let lastError = '';

function createPool() {
  return new Pool(config);
}

async function ensureSchema(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS app_data (
      key text PRIMARY KEY,
      value jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now(),
      version bigint NOT NULL DEFAULT 1
    )
  `);
  await client.query('ALTER TABLE app_data ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now()');
  await client.query('ALTER TABLE app_data ADD COLUMN IF NOT EXISTS version bigint NOT NULL DEFAULT 1');
  await client.query('DELETE FROM app_data WHERE key = ANY($1::text[])', [LEGACY_KEYS]);
}

async function refreshCache() {
  const { rows } = await pool.query('SELECT key, value, version FROM app_data');
  cache.clear();
  versions.clear();
  for (const row of rows) {
    cache.set(row.key, row.value);
    versions.set(row.key, Number(row.version));
  }
}

async function connect() {
  if (pool) {
    const probe = await pool.connect();
    probe.release();
    return;
  }
  pool = createPool();
  pool.on('error', (error) => {
    lastError = error.message;
    console.error('[db] idle client error:', error.message);
  });
  const client = await pool.connect();
  try {
    await ensureSchema(client);
    await client.query('BEGIN');
    await refreshCache();
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {});
    throw error;
  } finally {
    client.release();
  }
  ready = true;
  lastError = '';
  console.log(`[db] connected to ${config.host}:${config.port}/${config.database} (${cache.size} keys)`);
}

async function init() {
  await connect();
}

function isReady() {
  return ready && !!pool;
}

function status() {
  return { ready: isReady(), lastError, keys: cache.size };
}

function getAll() {
  const data = {};
  for (const [key, value] of cache) data[key] = value;
  return data;
}

function getKey(key) {
  return cache.has(key) ? cache.get(key) : null;
}

function getVersions() {
  const out = {};
  for (const [key, version] of versions) out[key] = version;
  return out;
}

function enqueue(key, task) {
  const previous = writeQueues.get(key) || Promise.resolve();
  const next = previous.then(task, task);
  writeQueues.set(
    key,
    next.then(
      () => {
        if (writeQueues.get(key) === next) writeQueues.delete(key);
      },
      () => {
        if (writeQueues.get(key) === next) writeQueues.delete(key);
      }
    )
  );
  return next;
}

async function putKey(key, value) {
  if (!isReady()) throw new Error('database unavailable');
  return enqueue(key, async () => {
    const { rows } = await pool.query(
      `INSERT INTO app_data (key, value, updated_at, version)
       VALUES ($1, $2, now(), 1)
       ON CONFLICT (key) DO UPDATE
         SET value = EXCLUDED.value, updated_at = now(), version = app_data.version + 1
       RETURNING version`,
      [key, JSON.stringify(value === undefined ? null : value)]
    );
    const version = Number(rows[0].version);
    cache.set(key, value === undefined ? null : value);
    versions.set(key, version);
    return version;
  });
}

async function writeMany(entries) {
  const results = {};
  for (const [key, value] of Object.entries(entries)) {
    results[key] = await putKey(key, value);
  }
  return results;
}

async function flush() {
  const pending = [...writeQueues.values()];
  if (pending.length) await Promise.all(pending);
}

let retryTimer = null;
function scheduleRetry() {
  if (retryTimer) return;
  retryTimer = setTimeout(async () => {
    retryTimer = null;
    if (isReady()) return;
    try {
      await connect();
      console.log('[db] reconnected');
    } catch (error) {
      lastError = error.message;
      scheduleRetry();
    }
  }, 5000);
  if (retryTimer.unref) retryTimer.unref();
}

async function ensureLive() {
  if (isReady()) return true;
  try {
    await connect();
    return true;
  } catch (error) {
    lastError = error.message;
    scheduleRetry();
    return false;
  }
}

async function close() {
  if (retryTimer) clearTimeout(retryTimer);
  retryTimer = null;
  ready = false;
  if (pool) {
    const current = pool;
    pool = null;
    await current.end().catch(() => {});
  }
}

process.on('SIGINT', () => { close(); });
process.on('SIGTERM', () => { close(); });

module.exports = {
  init,
  isReady,
  status,
  ensureLive,
  getAll,
  getKey,
  getVersions,
  putKey,
  writeMany,
  flush,
  close,
  config
};
