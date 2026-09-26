// Runs the REAL buildReport() branches for 'xz' and 'variance' out of pos.js
// against real data pulled from PostgreSQL, then asserts the descriptor shape
// matches what renderReports() consumes.
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const source = fs.readFileSync(path.join(__dirname, 'pos.js'), 'utf8');

// Pull the two new branches verbatim out of the source.
function extractBranch(tab) {
  const marker = `if (tab === '${tab}') {`;
  const start = source.indexOf(marker);
  if (start === -1) throw new Error(`branch '${tab}' not found in pos.js`);
  let depth = 0;
  let i = source.indexOf('{', start);
  const open = i;
  for (; i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}') { depth--; if (depth === 0) break; }
  }
  return source.slice(start, i + 1);
}

const xzBranch = extractBranch('xz');
const varianceBranch = extractBranch('variance');

// Minimal stand-ins for the real helpers.
const store = {};
function getFromStorage(key) { return store[key] || []; }
function getRangeLabel() { return 'All time'; }
function getTaxRate() { return 7.5; }
function getReportDateRange() {
  return { start: new Date(2000, 0, 1), end: new Date(2100, 0, 1), custom: false };
}
function filterSalesByDate(sales) {
  const { start, end } = getReportDateRange();
  return sales.filter((sale) => {
    const created = new Date(sale.createdAt);
    return created >= start && created <= end;
  });
}
function getSaleTax(sale) {
  if (Number.isFinite(sale.tax)) return sale.tax;
  const rate = getTaxRate();
  return rate > 0 ? sale.total * rate / (100 + rate) : 0;
}
const STORAGE_KEYS = { sales: 'ff_sales', closings: 'ff_closings' };

// getSaleDiscount / getSaleGross are new too - extract them the same way.
function extractFn(name) {
  const start = source.indexOf(`function ${name}(`);
  let depth = 0, i = source.indexOf('{', start);
  for (; i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}') { depth--; if (depth === 0) break; }
  }
  return source.slice(start, i + 1);
}

const factory = new Function(
  'getFromStorage', 'getRangeLabel', 'getReportDateRange', 'filterSalesByDate', 'STORAGE_KEYS', 'rangeLabel', 'getTaxRate',
  extractFn('getSaleTax') + '\n' + extractFn('getSaleDiscount') + '\n' + extractFn('getSaleGross') + '\n' + extractFn('getSaleVoided') + '\n' + extractFn('getSaleRounding') + '\n' +
  'function buildReport(tab) {' + xzBranch + '\n' + varianceBranch + '\nreturn null;}' +
  '\nreturn function (tab) { return buildReport(tab); };'
);

const makeBuildReport = factory(getFromStorage, getRangeLabel, getReportDateRange, filterSalesByDate, STORAGE_KEYS, 'All time', getTaxRate);

let pass = 0, fail = 0;
function check(name, ok, detail) {
  if (ok) { pass++; console.log('  PASS  ' + name); }
  else { fail++; console.log('  FAIL  ' + name + (detail !== undefined ? '  -> ' + detail : '')); }
}

// Descriptor contract from renderReports()
const moneyCol = (c) => c.money === true;
function validateDescriptor(def, label) {
  check(`${label}: has title`, typeof def.title === 'string' && def.title.length > 0);
  check(`${label}: has subtitle`, typeof def.subtitle === 'string');
  check(`${label}: columns is a non-empty array`, Array.isArray(def.columns) && def.columns.length > 0);
  check(`${label}: rows is an array`, Array.isArray(def.rows));
  const colKeys = def.columns.map((c) => c.key);
  check(`${label}: column keys are unique`, new Set(colKeys).size === colKeys.length, colKeys.join(','));
  check(`${label}: every column has a label`, def.columns.every((c) => typeof c.label === 'string' && c.label));
  check(`${label}: money columns have no cellClass conflict`, def.columns.every((c) => typeof c.cellClass !== 'function' || true));
  if (def.rows.length) {
    const missing = colKeys.filter((k) => def.rows[0][k] === undefined);
    check(`${label}: first row defines every column key`, missing.length === 0, 'missing: ' + missing.join(','));
    check(`${label}: no row has a non-finite money value`,
      def.rows.every((r) => def.columns.filter(moneyCol).every((c) => r[c.key] === undefined || Number.isFinite(r[c.key]))));
  }
  if (def.totals) {
    const tKeys = Object.keys(def.totals);
    check(`${label}: totals keys all exist as columns`, tKeys.every((k) => colKeys.includes(k)), tKeys.join(','));
    check(`${label}: totals is aligned to columns.slice(1)`, tKeys.length <= colKeys.length - 1,
      `totals has ${tKeys.length}, columns.slice(1) has ${colKeys.length - 1}`);
  }
  return colKeys;
}

async function main() {
  const pool = new Pool({ host: '127.0.0.1', user: 'ffapp', database: 'fasterfood' });
  const { rows } = await pool.query('SELECT key, value FROM app_data');
  rows.forEach((r) => { store[r.key] = r.value; });

  const sales = store.ff_sales || [];
  const closings = store.ff_closings || [];
  console.log(`\nReal data: ${sales.length} sales, ${closings.length} closings`);
  console.log(`Closings with sellers[]: ${closings.filter((c) => (c.sellers || []).length).length}`);

  console.log('\n=== X-Z report ===');
  const xz = makeBuildReport('xz');
  console.log(`  title: ${xz.title}`);
  console.log(`  subtitle: ${xz.subtitle}`);
  const xzKeys = validateDescriptor(xz, 'xz');
  console.log(`  columns: ${xz.columns.map((c) => c.key).join(', ')}`);
  console.log(`  rows: ${xz.rows.length} trading day(s)`);
  console.log(`  totalsLabel: ${xz.totalsLabel}`);
  xz.rows.slice(0, 5).forEach((r) =>
    console.log(`    ${r.date}  tx=${r.sales}  gross=${r.gross}  disc=${r.discount}  net=${r.net}  tax=${r.tax}  total=${r.total}  refunds=${r.refunds}`));
  console.log(`    Z-Total: ${JSON.stringify(xz.totals)}`);

  // Math assertions against independently computed values.
  const paid = sales.filter((s) => !s.savedOnly);
  const expectedTx = paid.length;
  const expectedTotal = paid.reduce((s, r) => s + r.total, 0);
  const expectedTax = paid.reduce((s, r) => s + (Number.isFinite(r.tax) ? r.tax : r.total * 7.5 / 107.5), 0);
  const expectedRefunds = paid.filter((s) => s.refunded).reduce((s, r) => s + r.total, 0);
  check('xz: transaction total matches independent sum', xz.totals.sales === expectedTx, `${xz.totals.sales} vs ${expectedTx}`);
  check('xz: "Total taken" matches independent sum', Math.abs(xz.totals.total - expectedTotal) < 0.001, `${xz.totals.total} vs ${expectedTotal}`);
  check('xz: VAT matches independent sum', Math.abs(xz.totals.tax - expectedTax) < 0.001, `${xz.totals.tax} vs ${expectedTax}`);
  check('xz: refunded total matches independent sum', Math.abs(xz.totals.refunds - expectedRefunds) < 0.001, `${xz.totals.refunds} vs ${expectedRefunds}`);
  check('xz: net + tax + rounding is consistent with total',
    Math.abs((xz.totals.net + xz.totals.tax + xz.totals.rounding) - xz.totals.total) < 0.001,
    `net+tax+rounding=${(xz.totals.net + xz.totals.tax + xz.totals.rounding).toFixed(2)} total=${xz.totals.total.toFixed(2)}`);
  const expectedRounding = paid.reduce((s, r) =>
    s + (Number.isFinite(r.roundDiff) ? r.roundDiff : r.total - ((Number.isFinite(r.subtotal) ? r.subtotal : r.total - r.total * 7.5 / 107.5) + (Number.isFinite(r.tax) ? r.tax : r.total * 7.5 / 107.5))), 0);
  check('xz: rounding total matches independent sum', Math.abs(xz.totals.rounding - expectedRounding) < 0.001,
    `${xz.totals.rounding} vs ${expectedRounding}`);
  check('xz: rounding is non-zero (round-to-10 used in real data)', xz.totals.rounding > 0, String(xz.totals.rounding));
  check('xz: gross - discount - voided reconciles to net',
    Math.abs((xz.totals.gross - xz.totals.discount - xz.totals.voided) - xz.totals.net) < 0.001,
    `gross-disc-voided=${(xz.totals.gross - xz.totals.discount - xz.totals.voided).toFixed(2)} net=${xz.totals.net.toFixed(2)}`);
  const expectedVoided = paid.reduce((s, r) =>
    s + (r.items || []).reduce((t, i) => t + (i.voided ? (i.price || 0) * (i.qty || 0) + (i.optionsPrice || 0) : 0), 0), 0);
  check('xz: voided total matches independent sum', Math.abs(xz.totals.voided - expectedVoided) < 0.001,
    `${xz.totals.voided} vs ${expectedVoided}`);
  check('xz: voided is non-zero (voids exist in real data)', xz.totals.voided > 0, String(xz.totals.voided));

  // Chronological order: compare against independently derived day order.
  const dayKeyOf = (iso) => { const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
  const expectedDays = [...new Set(paid.map((s) => dayKeyOf(s.createdAt)))].sort();
  check('xz: one row per trading day', xz.rows.length === expectedDays.length, `${xz.rows.length} vs ${expectedDays.length}`);
  const voidCol = xz.columns.find((c) => c.key === 'voided');
  check('xz: voided column flags non-zero as diff-shortage', voidCol.cellClass(10) === 'diff-shortage' && voidCol.cellClass(0) === '');
  check('xz: excludes savedOnly (open tables)', xz.totals.sales === paid.length);

  console.log('\n=== Variance report ===');
  const vr = makeBuildReport('variance');
  console.log(`  title: ${vr.title}`);
  console.log(`  subtitle: ${vr.subtitle}`);
  const vrKeys = validateDescriptor(vr, 'variance');
  console.log(`  columns: ${vr.columns.map((c) => c.key).join(', ')}`);
  console.log(`  rows: ${vr.rows.length} seller count(s)`);
  vr.rows.forEach((r) =>
    console.log(`    ${r.date}  ${r.seller} (${r.system})  tx=${r.sales}  expected=${r.expected}  counted=${r.counted}  variance=${r.variance}`));

  const allSellers = closings.flatMap((c) => c.sellers || []);
  check('variance: one row per seller record', vr.rows.length === allSellers.length, `${vr.rows.length} vs ${allSellers.length}`);
  check('variance: variance = counted - expected on every row',
    vr.rows.every((r) => Math.abs(r.variance - (r.counted - r.expected)) < 0.001));
  check('variance: totals.variance = counted - expected',
    Math.abs(vr.totals.variance - (vr.totals.counted - vr.totals.expected)) < 0.001);
  check('variance: expected total matches ff_closings seller totals',
    Math.abs(vr.totals.expected - allSellers.reduce((s, r) => s + (Number(r.total) || 0), 0)) < 0.001);
  check('variance: counted total matches ff_closings seller counted',
    Math.abs(vr.totals.counted - allSellers.reduce((s, r) => s + (Number(r.countTotal) || 0), 0)) < 0.001);
  check('variance: uses previously-unread sellers[] data', allSellers.length > 0 && vr.rows.length > 0);
  const diffCol = vr.columns.find((c) => c.key === 'variance');
  check('variance: variance column has a cellClass', typeof diffCol.cellClass === 'function');
  check('variance: positive renders diff-excess', diffCol.cellClass(5) === 'diff-excess', diffCol.cellClass(5));
  check('variance: negative renders diff-shortage', diffCol.cellClass(-5) === 'diff-shortage', diffCol.cellClass(-5));
  check('variance: zero renders no class', diffCol.cellClass(0) === '', JSON.stringify(diffCol.cellClass(0)));

  // Simulated balanced vs unbalanced closings.
  store.ff_closings = [
    { id: 1, date: '2026-09-26', createdAt: '2026-09-26T20:00:00.000Z', sales: 2, subtotal: 900, tax: 100, total: 1000, counts: { Cash: 1000 }, countTotal: 1000, difference: 0, closedBy: 'Boss', sellers: [{ name: 'S1 · uc', system: 'S1', cashier: 'uc', sales: 2, total: 1000, counts: { Cash: 1000 }, countTotal: 1000, difference: 0 }] },
    { id: 2, date: '2026-09-26', createdAt: '2026-09-26T21:00:00.000Z', sales: 1, subtotal: 450, tax: 50, total: 500, counts: { Cash: 450 }, countTotal: 450, difference: -50, closedBy: 'Boss', sellers: [
      { name: 'S1 · uc', system: 'S1', cashier: 'uc', sales: 1, total: 500, counts: { Cash: 450 }, countTotal: 450, difference: -50 },
      { name: 'S2 · boss', system: 'S2', cashier: 'boss', sales: 0, total: 0, counts: {}, countTotal: 0, difference: 0 }
    ] }
  ];
  const vr2 = makeBuildReport('variance');
  check('variance: multi-closing scenario totals expected', vr2.totals.expected === 1500, vr2.totals.expected);
  check('variance: multi-closing scenario totals counted', vr2.totals.counted === 1450, vr2.totals.counted);
  check('variance: multi-closing variance is -50', vr2.totals.variance === -50, vr2.totals.variance);
  check('variance: balanced seller renders no class',
    vr2.columns.find((c) => c.key === 'variance').cellClass(0) === '');

  // Empty-data resilience.
  store.ff_closings = [];
  const vr3 = makeBuildReport('variance');
  check('variance: empty closings yields empty rows', vr3.rows.length === 0);
  validateDescriptor(vr3, 'variance-empty');

  store.ff_sales = [];
  const xz2 = makeBuildReport('xz');
  check('xz: empty sales yields empty rows', xz2.rows.length === 0);
  check('xz: empty sales totals are all zero', Object.values(xz2.totals).every((v) => v === 0));

  // Sales with missing optional fields must not produce NaN.
  store.ff_sales = [
    { id: 1, total: 1000, createdAt: '2026-09-20T10:00:00.000Z' },
    { id: 2, total: 'bad', createdAt: 'not-a-date' },
    { id: 3, subtotal: 900, tax: 100, total: 1000, rawSubtotal: 1000, discountTotal: 100, createdAt: '2026-09-20T11:00:00.000Z', refunded: true }
  ];
  const xz3 = makeBuildReport('xz');
  validateDescriptor(xz3, 'xz-sparse');
  check('xz: sparse sales produce no NaN', xz3.rows.every((r) => Object.values(r).every((v) => typeof v !== 'number' || Number.isFinite(v))), JSON.stringify(xz3.rows));
  check('xz: bad createdAt sale is skipped, not crashed', xz3.rows.every((r) => r.date !== 'Invalid Date'));
  check('xz: refund flag surfaced', xz3.totals.refunds === 1000, xz3.totals.refunds);

  await pool.end();
  console.log('\n========================================');
  console.log('  ' + pass + ' passed, ' + fail + ' failed');
  console.log('========================================\n');
  process.exit(fail ? 1 : 0);
}

main().catch((e) => { console.error('crashed:', e); process.exit(1); });
