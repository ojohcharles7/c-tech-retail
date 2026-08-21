
const STORAGE_KEYS = {
  users: 'ff_users',
  menu: 'ff_menu',
  inventory: 'ff_inventory',
  sales: 'ff_sales',
  session: 'ff_session',
  settings: 'ff_settings',
  stockLog: 'ff_stock_log',
  audit: 'ff_audit',
  panel: 'ff_panel',
  reportTab: 'ff_report_tab',
  reportPeriod: 'ff_report_period',
  shifts: 'ff_shifts',
  voids: 'ff_voids',
  leftovers: 'ff_leftovers',
  promos: 'ff_promos',
  discounts: 'ff_discounts',
  customers: 'ff_customers',
  priceHistory: 'ff_price_history',
  purchases: 'ff_purchases',
  closings: 'ff_closings',
  refunds: 'ff_refunds',
  recovery: 'ff_recovery',
  purchaseOrders: 'ff_purchase_orders',
  bookOrders: 'ff_book_orders'
};

const defaultUsers = [
  { id: 1, name: 'System Admin', username: 'admin', password: '123', role: 'admin' }
];

const defaultInventory = [
  { id: 1, name: 'Beef Patty', group: 'Beef', unit: 'pcs', stock: 30, reorderLevel: 10, price: 300 },
  { id: 2, name: 'Chicken Fillet', group: 'Chicken', unit: 'pcs', stock: 24, reorderLevel: 10, price: 350 },
  { id: 3, name: 'Burger Bun', group: 'Bakery', unit: 'pcs', stock: 40, reorderLevel: 15, price: 200 },
  { id: 4, name: 'Lettuce', group: 'Vegetables', unit: 'pcs', stock: 22, reorderLevel: 8, price: 150 },
  { id: 5, name: 'Tomato', group: 'Vegetables', unit: 'pcs', stock: 18, reorderLevel: 8, price: 100 },
  { id: 6, name: 'Cheese Slice', group: 'Dairy', unit: 'pcs', stock: 28, reorderLevel: 10, price: 250 },
  { id: 7, name: 'French Fries', group: 'Sides', unit: 'bags', stock: 25, reorderLevel: 10, price: 400 },
  { id: 8, name: 'Soft Drink', group: 'Drinks', unit: 'bottles', stock: 36, reorderLevel: 12, price: 500 },
  { id: 9, name: 'Packaging Box', group: 'Packaging', unit: 'pcs', stock: 30, reorderLevel: 12, price: 150 }
];

const defaultMenu = [
  { id: 1, name: 'Classic Burger', category: 'Burgers', price: 1800, barcode: '8901116000011', ingredients: [{ name: 'Beef Patty', qty: 1 }, { name: 'Burger Bun', qty: 1 }, { name: 'Lettuce', qty: 1 }, { name: 'Tomato', qty: 1 }, { name: 'Packaging Box', qty: 1 }] },
  { id: 2, name: 'Cheese Burger', category: 'Burgers', price: 2200, barcode: '8901116000028', ingredients: [{ name: 'Beef Patty', qty: 1 }, { name: 'Burger Bun', qty: 1 }, { name: 'Cheese Slice', qty: 2 }, { name: 'Tomato', qty: 1 }, { name: 'Packaging Box', qty: 1 }] },
  { id: 3, name: 'Crispy Chicken', category: 'Chicken', price: 2100, barcode: '8901116000035', ingredients: [{ name: 'Chicken Fillet', qty: 1 }, { name: 'Burger Bun', qty: 1 }, { name: 'Lettuce', qty: 1 }, { name: 'Packaging Box', qty: 1 }] },
  { id: 4, name: 'Small Fries', category: 'Sides', price: 900, barcode: '8901116000042', ingredients: [{ name: 'French Fries', qty: 1 }] },
  { id: 5, name: 'Large Fries', category: 'Sides', price: 1500, barcode: '8901116000059', ingredients: [{ name: 'French Fries', qty: 2 }] },
  { id: 6, name: 'Soft Drink', category: 'Drinks', price: 500, barcode: '8901116000066', ingredients: [{ name: 'Soft Drink', qty: 1 }] },
  { id: 7, name: 'Pepsi Combo', category: 'Combos', price: 3000, barcode: '8901116000073', ingredients: [{ name: 'Beef Patty', qty: 1 }, { name: 'Burger Bun', qty: 1 }, { name: 'French Fries', qty: 1 }, { name: 'Soft Drink', qty: 1 }, { name: 'Packaging Box', qty: 1 }] },
  { id: 8, name: 'Family Meal', category: 'Combos', price: 5200, barcode: '8901116000080', ingredients: [{ name: 'Beef Patty', qty: 2 }, { name: 'Burger Bun', qty: 2 }, { name: 'Cheese Slice', qty: 2 }, { name: 'French Fries', qty: 2 }, { name: 'Soft Drink', qty: 2 }, { name: 'Packaging Box', qty: 2 }] }
];

const defaultSettings = {
  shopName: 'FasterFood',
  currency: 'NGN',
  address: '12 Market Road, Ikeja',
  phone: '+234-800-111-2222',
  email: 'hello@fasterfood.ng',
  website: '',
  receiptContact: false,
  taxRate: 7.5,
  receiptWidth: '80mm',
  qrImage: '',
  paymentMethods: ['Cash', 'Moniepoint', 'Opay', 'Transfer / Bank'],
  salesTarget: 0,
  loyaltyEnabled: false,
  loyaltyPointsPer100: 1,
  loyaltyPointValue: 1,
  features: {
    tables: false, kitchen: false, delivery: false, modifiers: false, tips: false,
    reorder: false, photos: false, online: false, branches: false, receipts: false
  },
  tables: [],
  branches: [],
  currentBranch: '',
  deliveryFee: 0,
  deliveryRiderLabel: 'Rider',
  serviceChargeRate: 0,
  tipOptions: [500, 1000, 2000]
};

const ROLE_LABELS = { admin: 'Owner', manager: 'Manager', cashier: 'Cashier', kitchen: 'Kitchen' };

const ROLE_PANELS = {
  admin: ['dashboard', 'pos', 'menu', 'inventory', 'leftover', 'promos', 'orders', 'bookorders', 'reports', 'audit', 'settings'],
  manager: ['dashboard', 'menu', 'inventory', 'leftover', 'promos', 'orders', 'bookorders', 'reports', 'audit'],
  cashier: ['pos'],
  kitchen: ['dashboard', 'menu', 'inventory', 'leftover', 'orders']
};

function getRolePanels() {
  const role = currentUser?.role || 'admin';
  const base = ROLE_PANELS[role] || ROLE_PANELS.admin;
  if (!currentUser) return base;
  const features = getFeatures();
  const extra = [];
  if (features.tables) extra.push('tables');
  if (features.kitchen) extra.push('kitchen');
  if (features.reorder) extra.push('purchaseorders');
  if (role === 'admin') extra.push('fullpackage');
  return [...new Set([...base, ...extra])];
}

function applyNavPermissions() {
  const allowed = getRolePanels();
  document.querySelectorAll('.nav-btn').forEach((button) => {
    button.classList.toggle('hidden', !allowed.includes(button.dataset.panel));
  });
  const role = currentUser?.role || 'admin';
  const shiftBtn = document.getElementById('shift-nav-btn');
  if (shiftBtn) {
    shiftBtn.classList.toggle('hidden', !['admin', 'manager'].includes(role));
  }
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    navToggle.classList.toggle('hidden', role === 'cashier');
  }
  const logoutBtn = document.querySelector('.menu-logout-btn');
  if (logoutBtn) {
    logoutBtn.classList.toggle('hidden', role !== 'cashier');
  }
}

function canVoid() {
  return !!(currentUser && ['admin', 'manager'].includes(currentUser.role));
}

function getPaymentMethods() {
  const settings = getFromStorage(STORAGE_KEYS.settings);
  const methods = (settings && settings.paymentMethods) || defaultSettings.paymentMethods;
  return methods.length ? methods : defaultSettings.paymentMethods;
}

let currentUser = null;
let cart = [];
let pendingSavedOrderId = null;
let editingMenuId = null;
let editingInventoryId = null;
let appliedPromo = null;
let appliedDiscount = null;
let cartCustomer = null;
let cartLoyaltyPoints = 0;
let cartTable = null;
let cartOrderType = 'dinein';
let cartDelivery = { address: '', riderName: '', riderPhone: '' };
let cartTip = 0;
let fullPackageUnlocked = false;
let pendingModifierItem = null;
let pendingModifierConfig = [];

const SERVER_KEYS = Object.values(STORAGE_KEYS).filter((key) => !['session', 'panel', 'reportTab', 'reportPeriod', 'recovery'].includes(key));

const memoryStore = {};
const lastLocalWrite = {};
let serverOnline = false;
let serverWriteQueue = Promise.resolve();
let sseSource = null;
let lastPollJson = null;

function initStorage() {
  const ensure = (key, defaultValue) => {
    const exists = serverOnline ? (memoryStore[key] !== undefined) : !!localStorage.getItem(key);
    if (!exists) {
      writeToStorage(key, defaultValue);
    }
  };
  ensure(STORAGE_KEYS.users, defaultUsers);
  ensure(STORAGE_KEYS.inventory, defaultInventory);
  ensure(STORAGE_KEYS.menu, defaultMenu);
  ensure(STORAGE_KEYS.sales, []);
  ensure(STORAGE_KEYS.settings, defaultSettings);
  ensure(STORAGE_KEYS.stockLog, []);
  ensure(STORAGE_KEYS.audit, []);
  ensure(STORAGE_KEYS.shifts, []);
  ensure(STORAGE_KEYS.voids, []);
  ensure(STORAGE_KEYS.customers, []);
  ensure(STORAGE_KEYS.priceHistory, []);
  ensure(STORAGE_KEYS.purchases, []);
  ensure(STORAGE_KEYS.closings, []);
  ensure(STORAGE_KEYS.refunds, []);
  ensure(STORAGE_KEYS.purchaseOrders, []);
  ensure(STORAGE_KEYS.bookOrders, []);
}

function getFromStorage(key) {
  if (serverOnline && memoryStore[key] !== undefined) return memoryStore[key];
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch (error) {
    return [];
  }
}

function writeToStorage(key, value) {
  memoryStore[key] = value;
  lastLocalWrite[key] = Date.now();
  if (serverOnline) {
    pushToServer(key, value);
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {}
}

function pushToServer(key, value) {
  serverWriteQueue = serverWriteQueue.then(() =>
    fetch('/api/data/' + encodeURIComponent(key), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    }).catch(() => { serverOnline = false; })
  );
}

function connectServerEvents() {
  try {
    if (sseSource) sseSource.close();
    sseSource = new EventSource('/api/events');
    sseSource.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg && msg.key && memoryStore[msg.key] !== undefined) {
          memoryStore[msg.key] = msg.value;
          refreshLivePanels();
        }
      } catch (error) {}
    };
  } catch (error) {}
}

async function initServerSync() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch('/api/data', { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error('Server unavailable');
    const payload = await res.json();
    const data = (payload && payload.data) || {};
    SERVER_KEYS.forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) memoryStore[key] = data[key];
    });
    serverOnline = true;
    connectServerEvents();
  } catch (error) {
    serverOnline = false;
  }
}

function saleDateKey(sale) {
  const d = new Date(sale.createdAt);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function backfillInvoiceNumbers() {
  const sales = getFromStorage(STORAGE_KEYS.sales);
  const sorted = [...sales].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  let changed = false;
  let lastDay = null;
  let dayInvoice = 0;
  sorted.forEach((sale) => {
    const day = saleDateKey(sale);
    if (day !== lastDay) {
      lastDay = day;
      dayInvoice = 0;
    }
    dayInvoice += 1;
    if (sale.invoice !== dayInvoice) {
      sale.invoice = dayInvoice;
      changed = true;
    }
  });
  if (changed) writeToStorage(STORAGE_KEYS.sales, sales);
}

function getNextInvoiceNumber(sales) {
  const today = todayKey();
  const max = sales
    .filter((sale) => saleDateKey(sale) === today)
    .reduce((highest, sale) => Math.max(highest, Number(sale.invoice) || 0), 0);
  return max + 1;
}

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getAuditUser() {
  return currentUser ? `${currentUser.name} (${ROLE_LABELS[currentUser.role] || currentUser.role})` : 'System';
}

function logAudit(action, detail) {
  const audit = getFromStorage(STORAGE_KEYS.audit);
  audit.push({
    id: Date.now(),
    user: getAuditUser(),
    action,
    detail: detail || '',
    createdAt: new Date().toISOString()
  });
  if (audit.length > 1000) audit.splice(0, audit.length - 1000);
  writeToStorage(STORAGE_KEYS.audit, audit);
}

function logStockIn(itemName, qtyAdded, note) {
  const stockLog = getFromStorage(STORAGE_KEYS.stockLog);
  stockLog.push({
    id: Date.now(),
    itemName,
    qtyAdded,
    user: currentUser ? currentUser.name : 'System',
    note: note || '',
    createdAt: new Date().toISOString()
  });
  if (stockLog.length > 2000) stockLog.splice(0, stockLog.length - 2000);
  writeToStorage(STORAGE_KEYS.stockLog, stockLog);
}

function logPriceChange(type, name, oldPrice, newPrice) {
  const history = getFromStorage(STORAGE_KEYS.priceHistory);
  history.push({
    id: Date.now(),
    type,
    name,
    oldPrice: Number(oldPrice) || 0,
    newPrice: Number(newPrice) || 0,
    user: currentUser ? currentUser.name : 'System',
    createdAt: new Date().toISOString()
  });
  if (history.length > 2000) history.splice(0, history.length - 2000);
  writeToStorage(STORAGE_KEYS.priceHistory, history);
}

const BACKUP_KEYS = Object.values(STORAGE_KEYS).filter((key) => key !== STORAGE_KEYS.recovery && key !== STORAGE_KEYS.session);

function saveRecoverySnapshot() {
  try {
    const snapshot = {};
    BACKUP_KEYS.forEach((key) => snapshot[key] = JSON.stringify(getFromStorage(key)));
    localStorage.setItem(STORAGE_KEYS.recovery, JSON.stringify(snapshot));
  } catch (error) {
    // Snapshot skipped when storage is full; current data remains safe.
  }
}

function backupData() {
  const payload = { app: 'FasterFood POS', version: 1, exportedAt: new Date().toISOString(), data: {} };
  BACKUP_KEYS.forEach((key) => {
    try { payload.data[key] = getFromStorage(key); } catch (error) { payload.data[key] = null; }
  });
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `fasterfood-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
  logAudit('Backup created', 'Full data backup downloaded');
}

function restoreData(event) {
  const file = event.target.files[0];
  event.target.value = '';
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      const data = payload && payload.data ? payload.data : payload;
      let restored = 0;
      BACKUP_KEYS.forEach((key) => {
        if (data[key] !== undefined) {
          writeToStorage(key, data[key]);
          restored++;
        }
      });
      saveRecoverySnapshot();
      showToast(`Backup restored (${restored} section${restored === 1 ? '' : 's'}). Reloading…`, 'success');
      setTimeout(() => window.location.reload(), 900);
    } catch (error) {
      showToast('Invalid backup file.', 'error');
    }
  };
  reader.readAsText(file);
}

function checkRecovery() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.recovery);
    if (!raw) return;
    const snapshot = JSON.parse(raw);
    const salesRaw = snapshot[STORAGE_KEYS.sales];
    if (!salesRaw) return;
    const recoveredSales = JSON.parse(salesRaw || '[]');
    const currentSales = getFromStorage(STORAGE_KEYS.sales);
    if (currentSales.length === 0 && recoveredSales.length > 0) {
      const toast = document.getElementById('toast');
      if (toast) {
        toast.querySelector('.toast-msg').innerHTML = 'A saved backup was found. <button class="toast-link" onclick="restoreRecovery()">Restore</button>';
        toast.classList.add('info', 'show');
        clearTimeout(window._toastTimer);
        window._toastTimer = setTimeout(() => toast.classList.remove('show'), 8000);
      }
    }
  } catch (error) {}
}

function restoreRecovery() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.recovery);
    if (!raw) return;
    const snapshot = JSON.parse(raw);
    BACKUP_KEYS.forEach((key) => {
      if (snapshot[key] !== undefined) {
        try { writeToStorage(key, JSON.parse(snapshot[key])); } catch (error) {}
      }
    });
    showToast('Backup restored. Reloading…', 'success');
    setTimeout(() => window.location.reload(), 900);
  } catch (error) {
    showToast('Could not restore backup.', 'error');
  }
}

function getCustomers() {
  return getFromStorage(STORAGE_KEYS.customers);
}

function findCustomerByPhone(phone) {
  const normalized = String(phone || '').replace(/\D/g, '');
  if (!normalized) return null;
  return getCustomers().find((customer) => String(customer.phone || '').replace(/\D/g, '') === normalized);
}

function saveCustomer(customer) {
  const customers = getFromStorage(STORAGE_KEYS.customers);
  const index = customers.findIndex((entry) => entry.id === customer.id);
  if (index >= 0) customers[index] = customer;
  else customers.push(customer);
  writeToStorage(STORAGE_KEYS.customers, customers);
}

function getLoyaltySettings() {
  const settings = getStoredSettings();
  return {
    enabled: !!settings.loyaltyEnabled,
    pointsPer100: Number(settings.loyaltyPointsPer100) || 0,
    pointValue: Number(settings.loyaltyPointValue) || 0
  };
}

function getLoyaltyDiscount(amount) {
  const loyalty = getLoyaltySettings();
  if (!loyalty.enabled || !loyalty.pointValue) return 0;
  const spendable = Math.min((cartLoyaltyPoints || 0), Math.floor(amount / loyalty.pointValue));
  return spendable * loyalty.pointValue;
}

function setView(viewId) {
  document.querySelectorAll('.view').forEach((view) => {
    view.classList.toggle('active', view.id === viewId + '-view');
  });
}

function toggleNav() {
  document.getElementById('app-view').classList.toggle('nav-open');
}

function closeNav() {
  document.getElementById('app-view').classList.remove('nav-open');
}

let settingsUnlocked = false;

function showPanel(panelName) {
  const allowed = getRolePanels();
  if (currentUser && !allowed.includes(panelName)) {
    panelName = allowed[0];
  }

  if (panelName === 'settings' && !settingsUnlocked) {
    openSettingsAuth();
    return;
  }

  closeStockAlertPanel();
  document.getElementById('app-view').classList.toggle('pos-mode', panelName === 'pos');
  if (panelName === 'pos') document.getElementById('app-view').classList.remove('nav-open');

  document.querySelectorAll('.panel').forEach((panel) => {
    panel.classList.toggle('active', panel.id === panelName + '-panel');
  });

  document.querySelectorAll('.nav-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.panel === panelName);
  });

  localStorage.setItem(STORAGE_KEYS.panel, panelName);

  if (panelName === 'dashboard') renderDashboard();
  if (panelName === 'pos') renderPOS();
  if (panelName === 'menu') { menuPage = 1; renderMenuManager(); }
  if (panelName === 'inventory') { inventoryPage = 1; renderInventoryManager(); renderPurchaseList(); }
  if (panelName === 'leftover') { leftoverPage = 1; renderLeftoverManager(); }
  if (panelName === 'promos') renderPromosManager();
  if (panelName === 'orders') { ordersPage = 1; renderOrdersManager(); renderClosingsList(); }
  if (panelName === 'bookorders') renderBookOrdersPanel();
  if (panelName === 'reports') { reportPage = 1; renderReports(); }
  if (panelName === 'settings') renderSettings();
  if (panelName === 'audit') { auditPage = 1; renderAuditManager(); }
  if (panelName === 'tables') renderTablesPanel();
  if (panelName === 'kitchen') renderKitchenPanel();
  if (panelName === 'purchaseorders') renderPurchaseOrdersPanel();
  if (panelName === 'fullpackage') renderFullPackageAuth();
}

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const loginError = document.getElementById('login-error');

  if (!username || !password) {
    loginError.textContent = 'Please complete both fields.';
    return;
  }

  const users = getFromStorage(STORAGE_KEYS.users);
  const match = users.find((user) => user.username === username && user.password === password);

  if (!match) {
    loginError.textContent = 'Invalid username or password.';
    logAudit('Login failed', `Failed attempt for ${username || '(empty username)'}`);
    return;
  }

  currentUser = match;
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(match));
  loginError.textContent = '';
  shiftSignedOut = false;
  shiftEndCounting = false;
  setView('app');
  renderAuth();
  applyBrandName();
  showPanel('dashboard');
  logAudit('Login', `Signed in as ${match.name} (@${match.username})`);
  checkLowStockNotification(true);
  renderShiftGate();
  if (match.role === 'cashier') enterFullScreen();
}

function enterFullScreen() {
  const el = document.documentElement;
  const fn = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
  if (fn && !(document.fullscreenElement || document.webkitFullscreenElement)) {
    try { fn.call(el); } catch (e) { /* fullscreen blocked by browser */ }
  }
}

function exitFullScreen() {
  const fn = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
  if (fn && (document.fullscreenElement || document.webkitFullscreenElement)) {
    try { fn.call(document); } catch (e) { /* ignore */ }
  }
}

function logout() {
  logAudit('Logout', `${currentUser ? currentUser.name : 'User'} signed out`);
  exitFullScreen();
  currentUser = null;
  cart = [];
  settingsUnlocked = false;
  cartCustomer = null;
  cartLoyaltyPoints = 0;
  pendingSavedOrderId = null;
  document.documentElement.classList.remove('app-logged-in');
  localStorage.removeItem(STORAGE_KEYS.session);
  closeStockAlertPanel();
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('login-error').textContent = '';
  setView('login');
  const keyboard = document.getElementById('on-screen-keyboard');
  if (keyboard) keyboard.classList.add('hidden');
  const toggleBtn = document.querySelector('.osk-toggle-btn');
  if (toggleBtn) {
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }
  oskShiftOn = false;
  oskTargetEl = null;
}

let oskTargetEl = null;
let oskShiftOn = false;

function buildOnScreenKeyboard() {
  const container = document.getElementById('on-screen-keyboard');
  if (!container) return;

  const rows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
    ['@', '.', '-', '_', 'space', 'signin']
  ];

  container.innerHTML = `
    <div class="osk-head">
      <span>On-screen keyboard</span>
      <button type="button" class="osk-close" aria-label="Close keyboard" title="Close keyboard">&#10005;</button>
    </div>
    ${rows.map((row) => `
    <div class="osk-row">
      ${row.map((key) => {
        let cls = 'osk-key';
        let label = key;
        if (key === 'shift') { cls += ' osk-mod'; label = '&#8679;'; }
        if (key === 'backspace') { cls += ' osk-mod'; label = '&#9003;'; }
        if (key === 'space') { cls += ' osk-space'; label = 'Space'; }
        if (key === 'signin') { cls += ' osk-go'; label = 'Sign In'; }
        if (key === '@' || key === '.' || key === '-' || key === '_') { cls += ' osk-sym'; }
        return `<button type="button" class="${cls}" data-key="${key}">${label}</button>`;
      }).join('')}
    </div>
  `).join('')}
  `;

  const closeBtn = container.querySelector('.osk-close');
  if (closeBtn) closeBtn.addEventListener('click', () => toggleOnScreenKeyboard());

  container.addEventListener('click', (event) => {
    const btn = event.target.closest('.osk-key');
    if (!btn) return;
    handleOskKey(btn.dataset.key);
  });
}

function getOskInput() {
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const menuSearch = document.getElementById('menu-search');
  const barcodeInput = document.getElementById('barcode-input');
  const active = document.activeElement;
  if (active === password) return password;
  if (active === username) return username;
  if (active === menuSearch) return menuSearch;
  if (active === barcodeInput) return barcodeInput;
  if (oskTargetEl && ['menu-search', 'barcode-input'].includes(oskTargetEl.id)) return oskTargetEl;
  return oskTargetEl || username;
}

function oskInsert(char) {
  const input = getOskInput();
  if (!input) return;
  const active = document.activeElement === input;
  const value = input.value;
  let start = value.length;
  let end = value.length;
  if (active) {
    start = input.selectionStart ?? start;
    end = input.selectionEnd ?? end;
  }
  input.value = value.slice(0, start) + char + value.slice(end);
  if (active) {
    try { input.setSelectionRange(start + char.length, start + char.length); } catch (error) {}
  }
  if (input.id === 'menu-search' || input.id === 'barcode-input') {
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

function oskBackspace() {
  const input = getOskInput();
  if (!input) return;
  const active = document.activeElement === input;
  let start = input.value.length;
  let end = input.value.length;
  if (active) {
    start = input.selectionStart ?? start;
    end = input.selectionEnd ?? end;
  }
  if (start !== end) {
    input.value = input.value.slice(0, start) + input.value.slice(end);
    if (active) {
      try { input.setSelectionRange(start, start); } catch (error) {}
    }
  } else if (start > 0) {
    input.value = input.value.slice(0, start - 1) + input.value.slice(start);
    if (active) {
      try { input.setSelectionRange(start - 1, start - 1); } catch (error) {}
    }
  }
  if (input.id === 'menu-search' || input.id === 'barcode-input') {
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

function handleOskKey(key) {
  if (key === 'shift') {
    oskShiftOn = !oskShiftOn;
    renderOskShiftState();
    return;
  }
  if (key === 'backspace') { oskBackspace(); return; }
  if (key === 'space') { oskInsert(' '); return; }
  if (key === 'signin') {
    const target = getOskInput();
    if (target && (target.id === 'menu-search' || target.id === 'barcode-input')) {
      toggleOnScreenKeyboard();
    } else {
      login();
    }
    return;
  }
  const char = /^[a-z]$/.test(key) ? (oskShiftOn ? key.toUpperCase() : key) : key;
  if (oskShiftOn && /^[a-z]$/.test(key)) {
    oskShiftOn = false;
    renderOskShiftState();
  }
  oskInsert(char);
}

function renderOskShiftState() {
  const container = document.getElementById('on-screen-keyboard');
  if (!container) return;
  container.querySelectorAll('.osk-key[data-key]').forEach((btn) => {
    const key = btn.dataset.key;
    if (/^[a-z]$/.test(key)) {
      btn.textContent = oskShiftOn ? key.toUpperCase() : key;
    }
    if (key === 'shift') btn.classList.toggle('active', oskShiftOn);
  });
}

function toggleOnScreenKeyboard(btn) {
  const keyboard = document.getElementById('on-screen-keyboard');
  if (!keyboard) return;
  const toggleBtn = btn || document.querySelector('.osk-toggle-btn');
  const isOpen = !keyboard.classList.contains('hidden');

  if (isOpen) {
    keyboard.classList.add('hidden');
    if (toggleBtn) {
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
    return;
  }

  keyboard.classList.remove('hidden');
  if (toggleBtn) {
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }
  const active = document.activeElement;
  const targets = ['username', 'password', 'menu-search', 'barcode-input'];
  if (active && targets.includes(active.id)) {
    oskTargetEl = active;
  }
  const posOpen = document.getElementById('app-view') && document.getElementById('app-view').classList.contains('active');
  if (!oskTargetEl) {
    oskTargetEl = document.getElementById('barcode-input') || document.getElementById('username');
  }

  const goKey = keyboard.querySelector('.osk-key.osk-go');
  const isPosTarget = oskTargetEl && (oskTargetEl.id === 'menu-search' || oskTargetEl.id === 'barcode-input');
  if (goKey) goKey.textContent = isPosTarget ? 'Done' : 'Sign In';

  if (document.activeElement && typeof document.activeElement.blur === 'function') {
    document.activeElement.blur();
  }
}

function renderAuth() {
  const userNameEl = document.getElementById('user-name');
  const userRoleEl = document.getElementById('user-role');
  const avatar = document.getElementById('user-avatar');

  if (!currentUser) return;

  userNameEl.textContent = currentUser.name;
  userRoleEl.textContent = ROLE_LABELS[currentUser.role] || 'Shift staff';
  avatar.textContent = currentUser.name.charAt(0).toUpperCase();
  applyNavPermissions();
  refreshFeatureUI();
}

function formatCurrency(value) {
  return `₦${Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function isLightColor(hex) {
  const value = String(hex || '#b91c1c').replace('#', '');
  if (value.length !== 6) return false;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) > 186;
}

function renderDashboard() {
  const sales = getFromStorage(STORAGE_KEYS.sales);
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalOrders = sales.length;
  const averageOrder = totalOrders ? totalRevenue / totalOrders : 0;
  const lowStockCount = inventory.filter((item) => item.stock <= item.reorderLevel).length;

  const statCards = [
    { label: 'Revenue', value: formatCurrency(totalRevenue), icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M21 7v5h-5"/></svg>', tone: 'red' },
    { label: 'Orders', value: totalOrders, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5h12l1.5 17h-15z"/><path d="M9 8.5h6"/><path d="M9 12.5h6"/></svg>', tone: 'blue' },
    { label: 'Average order', value: formatCurrency(averageOrder), icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6.5h16v11H4z"/><path d="M8 6.5v2.5h8V6.5"/><path d="M9 6.5V5h6v1.5"/></svg>', tone: 'green' },
    { label: 'Low stock', value: lowStockCount, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>', tone: 'amber' }
  ];

  document.getElementById('dashboard-stats').innerHTML = statCards.map((stat) => `
    <div class="stat-card tone-${stat.tone}">
      <div class="stat-top">
        <div class="stat-icon">${stat.icon}</div>
        <div class="stat-trend" aria-hidden="true"></div>
      </div>
      <div class="stat-label">${stat.label}</div>
      <div class="stat-value">${stat.value}</div>
    </div>
  `).join('');

  const now = new Date();
  const dayEl = document.getElementById('dashboard-day');
  const dateEl = document.getElementById('dashboard-date');
  if (dayEl) dayEl.textContent = now.toLocaleDateString(undefined, { weekday: 'long' });
  if (dateEl) dateEl.textContent = now.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });

  const lowStock = inventory.filter((item) => item.stock <= item.reorderLevel).slice(0, 6);
  document.getElementById('low-stock-list').innerHTML = lowStock.length
    ? lowStock.map((item) => `
      <div class="list-row">
        <div class="mini-item">
          <span class="mini-avatar">${escapeHtml(item.name.charAt(0).toUpperCase())}</span>
          <div>
            <div>${item.name}</div>
            <small>${item.stock} ${item.unit} left</small>
          </div>
        </div>
        <span class="badge warning">Reorder</span>
      </div>
    `).join('')
    : '<div class="list-row"><div>Everything looks stocked</div><span class="badge safe">OK</span></div>';

  const recentOrders = [...sales].slice(-4).reverse();
  document.getElementById('recent-orders-list').innerHTML = recentOrders.length
    ? recentOrders.map((sale) => `
      <div class="list-row">
        <div class="mini-item">
          <span class="mini-avatar mini-avatar-order">#</span>
          <div>
            <div>Invoice #${sale.invoice}</div>
            <small>${new Date(sale.createdAt).toLocaleDateString()} · ${sale.items.length} items</small>
          </div>
        </div>
        <strong class="order-amount">${formatCurrency(sale.total)}</strong>
      </div>
    `).join('')
    : '<div class="list-row"><div>No orders yet</div><span class="badge info">New</span></div>';

  renderRevenueChart();
  renderCategoryPie();
  renderSalesTarget();
}

const CHART_COLORS = ['#f43f5e', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#14b8a6', '#f97316', '#e11d48'];

function getLastSevenDays() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - i);
    days.push({
      date,
      label: date.toLocaleDateString(undefined, { weekday: 'short' }),
      total: 0
    });
  }
  return days;
}

function renderRevenueChart() {
  const sales = getFromStorage(STORAGE_KEYS.sales);
  const days = getLastSevenDays();
  const today = days[days.length - 1].date;

  sales.forEach((sale) => {
    const created = new Date(sale.createdAt);
    const bucket = days.find((day) => day.date.toDateString() === created.toDateString());
    if (bucket) bucket.total += sale.total;
  });

  const max = Math.max(...days.map((day) => day.total), 1);
  const weekTotal = days.reduce((sum, day) => sum + day.total, 0);
  const todayTotal = days[days.length - 1].total;

  const summaryEl = document.getElementById('bar-chart-summary');
  if (summaryEl) {
    summaryEl.innerHTML = weekTotal
      ? `<span class="chart-pill"><strong>${formatCurrency(weekTotal)}</strong> this week</span><span class="chart-pill today"><strong>Today</strong> ${formatCurrency(todayTotal)}</span>`
      : '<span class="chart-pill muted">No sales recorded yet</span>';
  }

  const container = document.getElementById('revenue-line-chart');
  const width = 620;
  const height = 210;
  const padX = 30;
  const padTop = 22;
  const padBottom = 32;

  const points = days.map((day, index) => {
    const x = padX + (index * (width - padX * 2)) / (days.length - 1);
    const y = padTop + (height - padTop - padBottom) * (1 - day.total / max);
    return { x, y, day };
  });

  const linePath = points.map((point, index) => {
    const command = index === 0 ? 'M' : 'L';
    return `${command} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
  }).join(' ');

  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${height - padBottom} L ${points[0].x.toFixed(1)} ${height - padBottom} Z`;

  const gridLines = Array.from({ length: 4 }, (_, i) => {
    const value = ((max * (i + 1)) / 4);
    const y = padTop + (height - padTop - padBottom) * (1 - (i + 1) / 4);
    return `
      <line x1="${padX}" y1="${y.toFixed(1)}" x2="${width - padX}" y2="${y.toFixed(1)}" stroke="#e8d5d5" stroke-width="1" stroke-dasharray="4 4" />
      <text x="${padX - 6}" y="${(y + 3).toFixed(1)}" text-anchor="end" font-size="9" fill="#b05959">${formatCurrency(value)}</text>
    `;
  }).join('');

  container.innerHTML = `
    <svg class="line-chart-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Revenue trend over the last 7 days">
      ${gridLines}
      <defs>
        <linearGradient id="revenue-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#b91c1c" stop-opacity="0.32" />
          <stop offset="100%" stop-color="#b91c1c" stop-opacity="0.02" />
        </linearGradient>
        <linearGradient id="revenue-line-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#dc2626" />
          <stop offset="60%" stop-color="#b91c1c" />
          <stop offset="100%" stop-color="#7f1d1d" />
        </linearGradient>
      </defs>
      <path d="${areaPath}" fill="url(#revenue-area)" />
      <path d="${linePath}" fill="none" stroke="url(#revenue-line-grad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      ${points.map((point, index) => {
        const isToday = point.day.date.toDateString() === today.toDateString();
        const label = isToday ? 'Today' : point.day.label;
        return `
          <circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="${isToday ? 7 : 4.5}" fill="${isToday ? '#7f1d1d' : '#ffffff'}" stroke="#b91c1c" stroke-width="${isToday ? 3.5 : 2}">
            <title>${point.day.date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })} — ${formatCurrency(point.day.total)}</title>
          </circle>
          <text x="${point.x.toFixed(1)}" y="${height - 12}" text-anchor="middle" font-size="10.5" font-weight="${isToday ? 800 : 700}" fill="${isToday ? '#7f1d1d' : '#8a5252'}">${label}</text>
          <text x="${point.x.toFixed(1)}" y="${(point.y - 11).toFixed(1)}" text-anchor="middle" font-size="9.5" font-weight="700" fill="#7f1d1d">${point.day.total ? formatCurrency(point.day.total) : ''}</text>
        `;
      }).join('')}
    </svg>
  `;
}

function renderCategoryPie() {
  renderCategoryPieInto('category-pie-chart', getFromStorage(STORAGE_KEYS.sales));
}

function renderCategoryPieInto(containerId, sales) {
  const menu = getFromStorage(STORAGE_KEYS.menu);
  const categoryTotals = {};

  sales.forEach((sale) => {
    sale.items.forEach((item) => {
      if (item.voided) return;
      let menuItem = menu.find((entry) => entry.id === item.id)
        || menu.find((entry) => entry.name.toLowerCase() === (item.name || '').toLowerCase());
      let category = menuItem ? menuItem.category : null;
      if (!category && item.id > 0) {
        const stock = getFromStorage(STORAGE_KEYS.inventory).find((entry) => entry.id === item.id);
        category = stock ? (stock.group || 'General') : null;
      }
      if (!category) return;
      categoryTotals[category] = (categoryTotals[category] || 0) + item.qty * item.price;
    });
  });

  const entries = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
  const container = document.getElementById(containerId);

  if (!entries.length) {
    container.innerHTML = '<div class="pie-empty">No sales data yet.<br>Complete a checkout to see the breakdown.</div>';
    return;
  }

  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const top = entries[0];

  let offset = 0;
  const segments = entries.map(([label, value], index) => {
    const fraction = total ? value / total : 0;
    const dash = fraction * circumference;
    const segment = `
      <circle
        class="pie-seg"
        data-index="${index}"
        cx="50%"
        cy="50%"
        r="${radius}"
        fill="none"
        stroke="${CHART_COLORS[index % CHART_COLORS.length]}"
        stroke-width="24"
        stroke-dasharray="${dash} ${circumference - dash}"
        stroke-dashoffset="${-offset}"
        transform="rotate(-90 50 50)"
      >
        <title>${label} — ${formatCurrency(value)} (${Math.round(fraction * 100)}%)</title>
      </circle>
    `;
    offset += dash;
    return { segment, label, value, fraction, color: CHART_COLORS[index % CHART_COLORS.length] };
  });

  container.innerHTML = `
    <div class="pie-wrap">
      <svg class="pie-svg" viewBox="0 0 140 140" role="img" aria-label="Sales by category">
        <circle cx="50%" cy="50%" r="${radius}" fill="none" stroke="var(--panel-alt)" stroke-width="24" />
        ${segments.map((segment) => segment.segment).join('')}
        <text class="pie-center-label" x="50%" y="45%" text-anchor="middle" dominant-baseline="middle" font-size="10.5" font-weight="800" fill="var(--text)">${top[0]}</text>
        <text class="pie-center-pct" x="50%" y="58%" text-anchor="middle" dominant-baseline="middle" font-size="17" font-weight="800" fill="var(--primary-dark)">${Math.round(top[1] / total * 100)}%</text>
      </svg>
      <div class="pie-total">of ${formatCurrency(total)}</div>
    </div>
    <div class="pie-legend">
      <div class="breakdown-bar">
        ${segments.map((segment, index) => `
          <span class="breakdown-seg" data-index="${index}" style="width: ${Math.max(segment.fraction * 100, 2)}%; background: ${segment.color}" title="${segment.label} — ${formatCurrency(segment.value)} (${Math.round(segment.fraction * 100)}%)"></span>
        `).join('')}
      </div>
      ${segments.map((segment, index) => {
        const pct = Math.round(segment.fraction * 100);
        return `
          <div class="legend-row" data-index="${index}">
            <span class="legend-dot" style="background: ${segment.color}"></span>
            <div class="legend-info">
              <div class="legend-line">
                <span class="legend-name">${segment.label}</span>
                <span class="legend-value">${formatCurrency(segment.value)} · ${pct}%</span>
              </div>
              <div class="legend-bar"><span style="width: ${Math.max(pct, 2)}%; background: ${segment.color}"></span></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  container.querySelectorAll('.breakdown-seg').forEach((seg) => {
    seg.addEventListener('mouseenter', () => setHighlight(Number(seg.dataset.index), true));
    seg.addEventListener('mouseleave', () => setHighlight(null, true));
  });

  const setHighlight = (index, isHover) => {
    container.querySelectorAll('.pie-seg').forEach((seg, i) => {
      seg.style.opacity = index === null || i === index ? 1 : 0.18;
    });
    container.querySelectorAll('.breakdown-seg').forEach((seg, i) => {
      seg.classList.toggle('dimmed', index !== null && i !== index);
    });
    if (!isHover) {
      container.querySelectorAll('.legend-row').forEach((row, i) => {
        row.classList.toggle('legend-active', index === null || i === index);
      });
    }
  };

  container.querySelectorAll('.pie-seg').forEach((seg, index) => {
    seg.addEventListener('mouseenter', () => setHighlight(index, true));
    seg.addEventListener('mouseleave', () => setHighlight(null, true));
  });

  container.querySelectorAll('.legend-row').forEach((row, index) => {
    row.addEventListener('mouseenter', () => setHighlight(index, false));
    row.addEventListener('mouseleave', () => setHighlight(null, false));
  });
}

function renderPOS() {
  cancelMenuScrollAnim();
  const menu = getFromStorage(STORAGE_KEYS.menu);
  const orphaned = menu.filter((item) => !item.category);
  if (orphaned.length) {
    writeToStorage(STORAGE_KEYS.menu, menu.filter((item) => item.category));
  }
  const query = document.getElementById('menu-search')?.value.trim().toLowerCase() || '';
  const CATEGORY_PALETTE = ['#dc2626', '#ea580c', '#d97706', '#16a34a', '#059669', '#0891b2', '#2563eb', '#7c3aed', '#c026d3', '#e11d48', '#4d7c0f', '#0d9488'];
  const categorySet = [...new Set(menu.map((item) => item.category).filter(Boolean))];
  const alphaSorted = categorySet.slice().sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  const customOrder = getCategoryOrder();
  const categories = [
    ...customOrder.filter((c) => categorySet.includes(c)),
    ...alphaSorted.filter((c) => !customOrder.includes(c))
  ];
  let activeCategory = localStorage.getItem('ff_active_category');
  if (!activeCategory || !categories.includes(activeCategory)) activeCategory = categories[0] || '';
  const categoryColor = (category) => {
    const items = menu.filter((item) => item.category === category);
    const counts = {};
    items.forEach((item) => {
      const color = (item.color || '').toUpperCase();
      if (/^#[0-9A-F]{6}$/.test(color)) counts[color] = (counts[color] || 0) + 1;
    });
    let top = null;
    let topCount = 0;
    Object.entries(counts).forEach(([color, count]) => {
      if (count > topCount) { top = color; topCount = count; }
    });
    if (top) return top;
    const index = categories.indexOf(category);
    return CATEGORY_PALETTE[index % CATEGORY_PALETTE.length];
  };

  const editBtn = document.getElementById('category-edit-btn');
  if (editBtn) {
    editBtn.classList.toggle('hidden', !(currentUser && currentUser.role === 'admin'));
    editBtn.classList.toggle('active', categoryEditMode);
    editBtn.querySelector('span').textContent = categoryEditMode ? 'Done' : 'Edit order';
  }

  const categoryTabsEl = document.getElementById('category-tabs');
  categoryTabsEl.classList.toggle('editing', categoryEditMode);
  categoryTabsEl.innerHTML = categories.map((category) => {
    const color = categoryColor(category);
    return `
    <button class="category-tab ${category === activeCategory ? 'active' : ''}" data-category="${category}" ${color ? `style="--tab:${color}"` : ''} ${categoryEditMode ? 'draggable="true"' : ''}>${category}</button>
  `;
  }).join('');

  categoryTabsEl.querySelectorAll('.category-tab').forEach((button) => {
    button.addEventListener('click', () => {
      const next = button.dataset.category === activeCategory ? categories[0] || '' : button.dataset.category;
      localStorage.setItem('ff_active_category', next);
      renderPOS();
    });
  });

  if (categoryEditMode) attachCategoryDrag(categoryTabsEl);

  const filtered = menu
    .filter((item) => {
      const matchesCategory = item.category && item.category === activeCategory;
      const matchesSearch = !query || item.name.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
    .slice(0, 40);

  const menuGrid = document.getElementById('menu-grid');
  const prevScrollTop = menuGrid.scrollTop;
  renderMenuGrid(menuGrid, filtered, CATEGORY_PALETTE, categoryColor(activeCategory));
  if (prevScrollTop > 0 && menuGrid.scrollTop === 0) {
    menuGrid.scrollTop = Math.min(prevScrollTop, menuGrid.scrollHeight);
    const cur = menuGrid._menuPaint;
    if (cur) cur();
  }

  if (!menuGrid.dataset.scrollBound) {
    menuGrid.addEventListener('wheel', () => cancelMenuScrollAnim(), { passive: true });
    menuGrid.addEventListener('touchstart', () => cancelMenuScrollAnim(), { passive: true });
    menuGrid.addEventListener('keydown', () => cancelMenuScrollAnim());
    menuGrid.dataset.scrollBound = '1';
  }

  updateMenuScrollButtons();

  renderCart();
}

let menuGridRenderId = 0;

let selectedMenuItemId = null;

function bindTileClicks(grid) {
  grid.querySelectorAll('.menu-item').forEach((button) => {
    button.addEventListener('click', () => {
      grid.querySelectorAll('.menu-item.selected').forEach((el) => el.classList.remove('selected'));
      button.classList.add('selected');
      selectedMenuItemId = Number(button.dataset.id);
      addToCart(Number(button.dataset.id));
    });
  });
}

function renderMenuGrid(grid, items, palette, categoryColor) {
  const wrapper = document.createElement('div');
  wrapper.className = 'menu-grid-viewport';
  const padX = 12;
  const gap = 8;
  const tileH = 130;
  const rowH = tileH + gap;
  grid.innerHTML = '';
  grid.appendChild(wrapper);
  if (items.length === 0) {
    wrapper.innerHTML = '<div class="menu-empty">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>' +
      '<div class="menu-empty-title">No items found</div>' +
      '<div class="menu-empty-sub">Try a different search or category.</div>' +
      '</div>';
    wrapper.style.paddingTop = '0px';
    wrapper.style.paddingBottom = '0px';
    grid.style.padding = `0 ${padX}px`;
    grid._menuPaint = () => {};
    updateMenuScrollButtons();
    return;
  }
  const trackList = getComputedStyle(wrapper).gridTemplateColumns;
  const cols = Math.max(1, trackList.split(' ').length);
  const totalRows = Math.ceil(items.length / cols);
  const totalH = Math.max(0, totalRows * rowH - gap);
  const clientH = grid.clientHeight || grid.getBoundingClientRect().height;
  const scrollable = totalH > clientH + 1;
  const overflowVisible = getComputedStyle(grid).overflowY === 'visible';

  const buildTile = (item, gridIndex) => {
    const availability = getItemAvailability(item);
    const tileColor = item.color || categoryColor || palette[gridIndex % palette.length];
    const lightTile = isLightColor(tileColor) ? ' light-tile' : '';
    const selected = selectedMenuItemId === item.id ? ' selected' : '';
    return `
      <button class="menu-item${lightTile}${selected}" data-id="${item.id}" style="--tile:${tileColor}" ${availability.status === 'Out' ? 'disabled' : ''}>
        ${getFeature('photos') && item.image ? `<img class="menu-item-img" src="${item.image}" alt="" />` : ''}
        <div class="menu-item-name">${escapeHtml(item.name)}</div>
      </button>
    `;
  };

  const renderId = ++menuGridRenderId;
  const state = { cols, rowH, totalRows, items, buildTile, renderId, scrollable, overflowVisible };
  const buffer = 3;
  let lastTop = -1;
  let lastBottom = -1;

  const paint = () => {
    if (state.renderId !== menuGridRenderId) return;
    if (state.overflowVisible || !state.scrollable || state.items.length <= state.cols * 6) {
      if (!wrapper.dataset.full) {
        wrapper.dataset.full = '1';
        wrapper.innerHTML = items.map((item, i) => buildTile(item, i)).join('');
        wrapper.style.paddingTop = '0px';
        wrapper.style.paddingBottom = '0px';
        grid.style.padding = '';
        bindTileClicks(grid);
      }
      return;
    }
    const scrollTop = grid.scrollTop;
    const clientH = grid.clientHeight || grid.getBoundingClientRect().height;
    const firstRow = Math.max(0, Math.floor(scrollTop / rowH) - buffer);
    const lastRow = Math.min(totalRows, Math.ceil((scrollTop + clientH) / rowH) + buffer);
    if (firstRow === lastTop && lastRow === lastBottom) return;
    lastTop = firstRow;
    lastBottom = lastRow;
    const padTop = firstRow * rowH;
    const padBottom = Math.max(0, (totalRows - lastRow) * rowH);
    const startIdx = firstRow * cols;
    const endIdx = Math.min(items.length, lastRow * cols);
    const html = [];
    for (let i = startIdx; i < endIdx; i++) html.push(buildTile(items[i], i));
    wrapper.innerHTML = html.join('');
    wrapper.style.paddingTop = padTop + 'px';
    wrapper.style.paddingBottom = padBottom + 'px';
    grid.style.padding = `0 ${padX}px`;
    bindTileClicks(grid);
  };

  grid._menuPaint = paint;
  if (!grid.dataset.paintBound) {
    grid.dataset.paintBound = '1';
    grid.addEventListener('scroll', () => {
      const current = grid._menuPaint;
      if (menuScrollAnim && menuScrollExpected >= 0 && Math.abs(grid.scrollTop - menuScrollExpected) > 2) {
        cancelMenuScrollAnim();
      }
      updateMenuScrollButtons();
      if (current) current();
    }, { passive: true });
  }

  paint();
}

let menuScrollTarget = null;
let menuScrollAnim = null;
let menuScrollExpected = -1;

function cancelMenuScrollAnim() {
  menuScrollTarget = null;
  menuScrollExpected = -1;
  if (menuScrollAnim) {
    cancelAnimationFrame(menuScrollAnim);
    menuScrollAnim = null;
  }
}

function scrollMenuGrid(direction) {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;
  const amount = Math.max(140, grid.clientHeight * 0.7);
  const maxScroll = Math.max(0, grid.scrollHeight - grid.clientHeight);
  if (!menuScrollTarget) {
    menuScrollTarget = { start: grid.scrollTop, to: Math.max(0, Math.min(maxScroll, grid.scrollTop + direction * amount)), t0: performance.now() };
  } else {
    menuScrollTarget.to = Math.max(0, Math.min(maxScroll, menuScrollTarget.to + direction * amount));
  }
  animateMenuScroll(grid);
}

function animateMenuScroll(grid) {
  if (menuScrollAnim) return;
  const anim = () => {
    if (!menuScrollTarget) return;
    const { start, to, t0 } = menuScrollTarget;
    const now = performance.now();
    const elapsed = now - t0;
    if (elapsed < 0) return;
    const t = Math.min(1, elapsed / 140);
    const p = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    menuScrollExpected = start + (to - start) * p;
    grid.scrollTop = menuScrollExpected;
    if (elapsed < 140) {
      menuScrollAnim = requestAnimationFrame(anim);
    } else {
      grid.scrollTop = to;
      menuScrollTarget = null;
      menuScrollAnim = null;
    }
  };
  menuScrollAnim = requestAnimationFrame(anim);
}

function updateMenuScrollButtons() {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;
  const wrap = grid.closest('.menu-scroll-wrap');
  if (!wrap) return;
  const up = wrap.querySelector('.menu-scroll-up');
  const down = wrap.querySelector('.menu-scroll-down');
  const scrollable = grid.scrollHeight > grid.clientHeight + 1;
  const atTop = grid.scrollTop <= 1;
  const atBottom = grid.scrollTop >= grid.scrollHeight - grid.clientHeight - 1;
  if (up) {
    up.style.display = scrollable ? 'grid' : 'none';
    up.classList.toggle('edge', scrollable && atTop);
  }
  if (down) {
    down.style.display = scrollable ? 'grid' : 'none';
    down.classList.toggle('edge', scrollable && atBottom);
  }
}

let categoryEditMode = false;
let dragCategory = null;

function getCategoryOrder() {
  const settings = getFromStorage(STORAGE_KEYS.settings) || {};
  return Array.isArray(settings.categoryOrder) ? settings.categoryOrder.filter(Boolean) : [];
}

function saveCategoryOrder(order) {
  const settings = getFromStorage(STORAGE_KEYS.settings) || {};
  settings.categoryOrder = order;
  writeToStorage(STORAGE_KEYS.settings, settings);
}

function toggleCategoryEdit() {
  if (!currentUser || currentUser.role !== 'admin') return;
  categoryEditMode = !categoryEditMode;
  renderPOS();
}

function attachCategoryDrag(tabsEl) {
  tabsEl.querySelectorAll('.category-tab').forEach((tab) => {
    if (!tab.dataset.category) return;
    tab.draggable = true;
    tab.addEventListener('dragstart', (event) => {
      dragCategory = tab.dataset.category;
      tab.classList.add('dragging');
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', tab.dataset.category);
    });
    tab.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      tabsEl.querySelectorAll('.category-tab').forEach((t) => t.classList.remove('drag-over'));
      tab.classList.add('drag-over');
    });
    tab.addEventListener('drop', (event) => {
      event.preventDefault();
      const target = tab.dataset.category;
      if (dragCategory && dragCategory !== target) {
        const order = Array.from(tabsEl.querySelectorAll('.category-tab')).map((t) => t.dataset.category).filter(Boolean);
        const from = order.indexOf(dragCategory);
        const to = order.indexOf(target);
        if (from >= 0 && to >= 0) {
          order.splice(from, 1);
          order.splice(to, 0, dragCategory);
          saveCategoryOrder(order);
        }
      }
      dragCategory = null;
      renderPOS();
    });
    tab.addEventListener('dragend', () => {
      dragCategory = null;
      tabsEl.querySelectorAll('.category-tab').forEach((t) => t.classList.remove('dragging', 'drag-over'));
    });
  });
}

function getItemAvailability(item) {
  if (!item.ingredients || !item.ingredients.length) {
    return { label: 'Ready', status: 'Ready' };
  }

  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  const availableByIngredient = item.ingredients.map((ingredient) => {
    const match = inventory.find((entry) => entry.name.toLowerCase() === ingredient.name.toLowerCase());
    if (!match) return 0;
    return Math.floor(match.stock / ingredient.qty);
  });

  if (!availableByIngredient.length) return { label: 'Out', status: 'Out' };
  const maxAvailable = Math.min(...availableByIngredient);

  if (maxAvailable <= 0) return { label: 'Out', status: 'Out' };
  if (maxAvailable <= 2) return { label: `Only ${maxAvailable}`, status: 'Low' };
  return { label: `${maxAvailable}`, status: 'Ready' };
}

function canMakeItem(item, qty = 1) {
  if (!item.ingredients || !item.ingredients.length) return true;
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  return item.ingredients.every((ingredient) => {
    const match = inventory.find((entry) => entry.name.toLowerCase() === ingredient.name.toLowerCase());
    return match && match.stock >= ingredient.qty * qty;
  });
}

function getItemRemaining(item) {
  if (!item.ingredients || !item.ingredients.length) return null;
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  const availableByIngredient = item.ingredients.map((ingredient) => {
    const match = inventory.find((entry) => entry.name.toLowerCase() === ingredient.name.toLowerCase());
    if (!match) return 0;
    return Math.floor(match.stock / ingredient.qty);
  });
  if (!availableByIngredient.length) return 0;
  return Math.max(0, Math.min(...availableByIngredient));
}

function addToCart(itemId) {
  const menu = getFromStorage(STORAGE_KEYS.menu);
  const item = menu.find((entry) => entry.id === itemId);

  if (!item) return;

  if (!canMakeItem(item, 1)) {
    showToast('Not enough inventory to prepare this item.', 'error');
    return;
  }

  if (getFeature('modifiers') && item.modifiers && item.modifiers.length) {
    openModifierModal(item);
    return;
  }

  addToCartItem(item, [], 0, '');
}

function addToCartItem(item, options, optionsPrice, note) {
  if (!canMakeItem(item, 1)) {
    showToast('Not enough inventory to prepare this item.', 'error');
    return;
  }

  const signature = JSON.stringify({ options: options || [], optionsPrice: optionsPrice || 0, note: note || '' });
  const existing = cart.find((entry) => entry.id === item.id && JSON.stringify({ options: entry.options || [], optionsPrice: entry.optionsPrice || 0, note: entry.note || '' }) === signature);
  if (existing) {
    const nextQty = existing.qty + 1;
    if (!canMakeItem(item, nextQty)) {
      showToast('Inventory limit reached for this item.', 'error');
      return;
    }
    existing.qty = nextQty;
  } else {
    cart.push({ ...item, qty: 1, options: options || [], optionsPrice: optionsPrice || 0, note: note || '' });
  }

  renderCart();
}

function renderCart() {
  const cartItemsEl = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('subtotal-value');
  const taxEl = document.getElementById('tax-value');
  const totalEl = document.getElementById('grand-total-value');
  const countEl = document.getElementById('cart-total-count');

  if (!cartItemsEl) return;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<div class="cart-empty">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>' +
      '<div class="cart-empty-title">Cart is empty</div>' +
      '<div class="cart-empty-sub">Tap a menu item to add it.</div>' +
      '</div>';
    subtotalEl.textContent = '₦0';
    taxEl.textContent = '₦0';
    totalEl.textContent = '₦0';
    countEl.textContent = '0 items';
    updatePromoRows(0, null, 0, null);
    renderLoyaltyRow(0);
    updateCartCustomerBadge();
    ['service-charge-row', 'delivery-fee-row', 'tip-row'].forEach((id) => {
      const row = document.getElementById(id);
      if (row) row.classList.add('hidden');
    });
    return;
  }

  cartItemsEl.innerHTML = cart.map((entry, index) => `
    <div class="cart-item">
      <div>
        <div class="cart-item-name">${entry.name}</div>
        ${entry.options && entry.options.length ? `<div class="cart-item-options">${entry.options.map((option) => option.label).join(', ')}</div>` : ''}
        ${entry.note ? `<div class="cart-item-note">📝 ${escapeHtml(entry.note)}</div>` : ''}
        <div class="cart-item-price">${formatCurrency((Number(entry.price) || 0) + (Number(entry.optionsPrice) || 0))}</div>
      </div>
      <div class="qty-box">
        <button type="button" onclick="updateCartQty(${index}, -1)">-</button>
        <span>${entry.qty}</span>
        <button type="button" onclick="updateCartQty(${index}, 1)">+</button>
      </div>
      <button class="remove-item" onclick="removeCartItem(${index})">×</button>
    </div>
  `).join('');

  const subtotal = getCartSubtotal();
  const promoAmt = getPromoDiscount(subtotal);
  const discAmt = getDiscountValue(subtotal);
  const loyaltyAmt = getLoyaltyDiscount(subtotal);
  const discountTotal = promoAmt + discAmt + loyaltyAmt;
  const taxable = Math.max(0, subtotal - discountTotal);
  const tax = taxable * (getTaxRate() / 100);
  const serviceCharge = getCartServiceCharge(taxable);
  const deliveryFee = getCartDeliveryFee();
  const total = taxable + tax + serviceCharge + deliveryFee + cartTip;

  subtotalEl.textContent = formatCurrency(subtotal);
  taxEl.textContent = formatCurrency(tax);
  totalEl.textContent = formatCurrency(total);
  countEl.textContent = `${cart.reduce((sum, item) => sum + item.qty, 0)} items`;
  updatePromoRows(promoAmt, appliedPromo ? appliedPromo.name : null, discAmt, appliedDiscount ? appliedDiscount.name : null);
  renderLoyaltyRow(loyaltyAmt);
  updateCartCustomerBadge();

  const serviceRow = document.getElementById('service-charge-row');
  const serviceValue = document.getElementById('service-charge-value');
  if (serviceRow && serviceValue) {
    serviceRow.classList.toggle('hidden', !serviceCharge);
    serviceValue.textContent = formatCurrency(serviceCharge);
  }
  const deliveryRow = document.getElementById('delivery-fee-row');
  const deliveryValue = document.getElementById('delivery-fee-value');
  if (deliveryRow && deliveryValue) {
    deliveryRow.classList.toggle('hidden', !deliveryFee);
    deliveryValue.textContent = formatCurrency(deliveryFee);
  }
  const tipRow = document.getElementById('tip-row');
  const tipValue = document.getElementById('tip-value');
  if (tipRow && tipValue) {
    tipRow.classList.toggle('hidden', !cartTip);
    tipValue.textContent = formatCurrency(cartTip);
  }
}

function renderLoyaltyRow(loyaltyAmt) {
  const row = document.getElementById('loyalty-row');
  const nameEl = document.getElementById('loyalty-row-name');
  const valueEl = document.getElementById('loyalty-row-value');
  if (!row) return;
  if (loyaltyAmt > 0 && cartCustomer) {
    row.classList.remove('hidden');
    if (nameEl) nameEl.textContent = `${cartCustomer.name} · points`;
    if (valueEl) valueEl.textContent = `-${formatCurrency(loyaltyAmt)}`;
  } else {
    row.classList.add('hidden');
  }
}

function updatePromoRows(promoAmt, promoName, discAmt, discName) {
  const promoRow = document.getElementById('promo-row');
  const discountRow = document.getElementById('discount-row');
  if (promoRow) {
    promoRow.classList.toggle('hidden', !promoAmt);
    if (promoAmt) {
      const nameEl = document.getElementById('promo-row-name');
      const valueEl = document.getElementById('promo-row-value');
      if (nameEl) nameEl.textContent = promoName || '';
      if (valueEl) valueEl.textContent = `-${formatCurrency(promoAmt)}`;
    }
  }
  if (discountRow) {
    discountRow.classList.toggle('hidden', !discAmt);
    if (discAmt) {
      const nameEl = document.getElementById('discount-row-name');
      const valueEl = document.getElementById('discount-row-value');
      if (nameEl) nameEl.textContent = discName || '';
      if (valueEl) valueEl.textContent = `-${formatCurrency(discAmt)}`;
    }
  }
}

function updateCartQty(index, delta) {
  const item = cart[index];
  if (!item) return;

  const nextQty = item.qty + delta;
  if (nextQty <= 0) {
    cart.splice(index, 1);
    renderCart();
    return;
  }

  if (!canMakeItem(item, nextQty)) {
    showToast('Not enough inventory for the requested quantity.', 'error');
    return;
  }

  item.qty = nextQty;
  renderCart();
}

function removeCartItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function clearCart() {
  if (!cart.length) return;
  cart = [];
  pendingSavedOrderId = null;
  appliedPromo = null;
  appliedDiscount = null;
  cartCustomer = null;
  cartLoyaltyPoints = 0;
  renderCart();
}

function findItemByBarcode(code) {
  const normalized = String(code || '').trim();
  if (!normalized) return null;
  const menu = getFromStorage(STORAGE_KEYS.menu);
  return menu.find((entry) => String(entry.barcode || '').trim() === normalized);
}

function flashBarcodeInput(ok, message) {
  const input = document.getElementById('barcode-input');
  if (!input) return;
  input.classList.remove('scan-ok', 'scan-fail');
  void input.offsetWidth;
  input.classList.add(ok ? 'scan-ok' : 'scan-fail');
  setTimeout(() => input.classList.remove('scan-ok', 'scan-fail'), 700);
}

function handleBarcodeEntry() {
  const input = document.getElementById('barcode-input');
  if (!input) return;
  const code = input.value.trim();

  if (!code) return;

  const item = findItemByBarcode(code);
  if (item) {
    addToCart(item.id);
    input.value = '';
    flashBarcodeInput(true);
  } else {
    flashBarcodeInput(false);
    input.select();
  }
}

let scanStream = null;
let scanDetector = null;
let scanTimer = null;
let scanCameraIndex = 0;

async function getVideoDevices() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === 'videoinput');
  } catch (error) {
    return [];
  }
}

async function openCameraScan() {
  document.getElementById('scan-modal').classList.remove('hidden');
  document.getElementById('scan-status').textContent = 'Starting camera...';

  if (!('BarcodeDetector' in window)) {
    document.getElementById('scan-status').textContent = 'Camera barcode scanning is not supported in this browser. Use the barcode input below or a modern Chrome/Edge browser.';
    return;
  }

  scanCameraIndex = 0;
  try {
    await startScanCamera();
  } catch (error) {
    document.getElementById('scan-status').textContent = 'Camera unavailable or permission denied. Type the barcode manually instead.';
  }
}

async function startScanCamera() {
  stopScanStream();

  const devices = await getVideoDevices();
  const target = devices[scanCameraIndex % Math.max(devices.length, 1)];
  const video = document.getElementById('scan-video');

  scanStream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: 'environment',
      ...(target?.deviceId ? { deviceId: { exact: target.deviceId } } : {})
    }
  });

  video.srcObject = scanStream;
  await video.play();

  scanDetector = new BarcodeDetector({
    formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'code_93', 'qr_code']
  });

  scanTimer = setInterval(scanVideoFrame, 300);
  document.getElementById('scan-status').textContent = 'Point the camera at a barcode...';
}

async function scanVideoFrame() {
  const video = document.getElementById('scan-video');
  if (!scanDetector || !video || video.readyState < 2) return;

  try {
    const codes = await scanDetector.detect(video);
    if (!codes.length) return;

    const item = findItemByBarcode(codes[0].rawValue);
    if (item) {
      addToCart(item.id);
      document.getElementById('scan-status').textContent = `Added: ${item.name}`;
      setTimeout(closeCameraScan, 900);
    } else {
      document.getElementById('scan-status').textContent = `Unknown barcode: ${codes[0].rawValue}`;
    }
  } catch (error) {
    // Frame detection failed; keep scanning.
  }
}

async function switchScanCamera() {
  scanCameraIndex++;
  try {
    await startScanCamera();
  } catch (error) {
    document.getElementById('scan-status').textContent = 'Could not switch camera.';
  }
}

function stopScanStream() {
  if (scanTimer) {
    clearInterval(scanTimer);
    scanTimer = null;
  }

  if (scanStream) {
    scanStream.getTracks().forEach((track) => track.stop());
    scanStream = null;
  }

  const video = document.getElementById('scan-video');
  if (video) video.srcObject = null;
  scanDetector = null;
}

function closeCameraScan() {
  stopScanStream();
  document.getElementById('scan-modal').classList.add('hidden');
}

function openCashDrawer() {
  showToast('Cash drawer opened successfully.', 'success');
}

function computeDealValue(deal, subtotal, items = cart) {
  if (!deal) return 0;
  const subtotalSafe = Number(subtotal) || 0;
  switch (deal.type) {
    case 'percentage':
      return Math.min(subtotalSafe, subtotalSafe * (Number(deal.value) || 0) / 100);
    case 'fixed':
      return Math.min(subtotalSafe, Number(deal.value) || 0);
    case 'bogo':
    case 'free': {
      const prices = items.map((item) => Number(item.price) || 0);
      if (!prices.length) return 0;
      return Math.min(subtotalSafe, Math.min(...prices));
    }
    default:
      return 0;
  }
}

function getPromoDiscount(subtotal) {
  return appliedPromo ? computeDealValue(appliedPromo, subtotal) : 0;
}

function getDiscountValue(subtotal) {
  return appliedDiscount ? computeDealValue(appliedDiscount, subtotal) : 0;
}

function getCartDiscountsTotal(subtotal) {
  return getPromoDiscount(subtotal) + getDiscountValue(subtotal) + getLoyaltyDiscount(subtotal);
}

function getTaxRate() {
  const settings = getStoredSettings();
  const rate = Number(settings.taxRate);
  return Number.isFinite(rate) && rate >= 0 ? rate : defaultSettings.taxRate;
}

function getReceiptWidth() {
  const settings = getStoredSettings();
  return settings.receiptWidth === '58mm' ? '58mm' : '80mm';
}

function openPaymentModal() {
  const total = getCurrentTotal();
  if (!total || total <= 0) {
    showToast('Your cart is empty. Add an item first.', 'error');
    return;
  }

  document.getElementById('payment-amount').textContent = formatCurrency(total);
  renderPaymentMethods();
  renderTipsSection();
  renderDeliverySection();
  updatePaymentDisplay();
  document.getElementById('payment-modal').classList.remove('hidden');
}

function renderPaymentMethods() {
  const methods = getPaymentMethods();
  const container = document.getElementById('payment-methods');
  container.innerHTML = methods.map((method, index) => `
    <div class="pay-method-row" data-index="${index}" onclick="handlePaymentRowClick(event, ${index})" title="Click to use remaining amount">
      <span class="pay-method-name">${method}</span>
      <input type="number" min="0" step="0.01" placeholder="0.00" class="pay-method-amount" data-method="${method}" autocomplete="off" />
      <button type="button" class="pay-fill-btn" onclick="event.stopPropagation(); quickFillPayment(${index})">Fill</button>
    </div>
  `).join('');

  container.querySelectorAll('.pay-method-amount').forEach((input) => {
    input.addEventListener('input', updatePaymentDisplay);
  });

  const firstInput = container.querySelector('.pay-method-amount');
  if (firstInput) firstInput.focus();
}

function handlePaymentRowClick(event, index) {
  if (event.target.classList.contains('pay-method-amount')) return;
  quickFillPayment(index);
}

function quickFillPayment(index) {
  const inputs = Array.from(document.querySelectorAll('.pay-method-amount'));
  const input = inputs[index];
  if (!input) return;

  const total = getCurrentTotal();
  const allocated = getAllocatedPayment();
  const remaining = Math.max(total - allocated, 0);

  input.value = remaining > 0 ? remaining.toFixed(2) : '';
  updatePaymentDisplay();
  input.focus();
  input.select();
}

function updatePaymentDisplay() {
  const total = getCurrentTotal();
  const allocated = getAllocatedPayment();
  const remaining = Math.max(total - allocated, 0);
  const change = Math.max(allocated - total, 0);

  document.getElementById('allocated-display').textContent = formatCurrency(allocated);
  document.getElementById('remaining-display').textContent = formatCurrency(remaining);
  document.getElementById('remaining-display').style.color = remaining > 0 ? '#b91c1c' : '#0f8d52';
  document.getElementById('change-display').textContent = formatCurrency(change);
  document.getElementById('change-display').style.color = change > 0 ? '#0f8d52' : '#b91c1c';
}

function getAllocatedPayment() {
  return Array.from(document.querySelectorAll('.pay-method-amount')).reduce((sum, input) => {
    const value = Number(input.value || 0);
    return sum + (Number.isFinite(value) ? value : 0);
  }, 0);
}

function getPaymentsBreakdown() {
  return Array.from(document.querySelectorAll('.pay-method-amount')).reduce((acc, input) => {
    const amount = Number(input.value || 0);
    if (amount > 0) acc.push({ method: input.dataset.method, amount });
    return acc;
  }, []);
}

function closePaymentModal() {
  document.getElementById('payment-modal').classList.add('hidden');
}

function buildSaleMeta() {
  const meta = {};
  if (getFeature('delivery')) {
    const addressInput = document.getElementById('pay-delivery-address');
    const riderNameInput = document.getElementById('pay-rider-name');
    const riderPhoneInput = document.getElementById('pay-rider-phone');
    if (addressInput) cartDelivery.address = addressInput.value.trim();
    if (riderNameInput) cartDelivery.riderName = riderNameInput.value.trim();
    if (riderPhoneInput) cartDelivery.riderPhone = riderPhoneInput.value.trim();
    meta.orderType = cartOrderType;
    meta.deliveryFee = getCartDeliveryFee();
    meta.deliveryAddress = cartOrderType === 'delivery' ? cartDelivery.address : '';
    meta.riderName = cartOrderType === 'delivery' ? cartDelivery.riderName : '';
    meta.riderPhone = cartOrderType === 'delivery' ? cartDelivery.riderPhone : '';
  }
  if (getFeature('tables')) {
    meta.table = cartTable || null;
  }
  if (getFeature('tips')) {
    const raw = getCartSubtotal();
    const taxable = Math.max(0, raw - getCartDiscountsTotal(raw));
    meta.tip = cartTip;
    meta.serviceCharge = getCartServiceCharge(taxable);
  }
  if (getFeature('branches')) {
    meta.branch = getCurrentBranch() || null;
  }
  return meta;
}

function completeCheckout() {
  const total = getCurrentTotal();
  const payments = getPaymentsBreakdown();
  const allocated = payments.reduce((sum, payment) => sum + payment.amount, 0);

  if (!cart.length) {
    showToast('The order is empty.', 'error');
    return;
  }

  if (allocated < total) {
    showToast('The amount entered is less than the total. Add more to a payment method.', 'error');
    return;
  }

  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  for (const item of cart) {
    if (!canMakeItem(item, item.qty)) {
      showToast('Inventory changed before payment was completed.', 'error');
      return;
    }
  }

  for (const item of cart) {
    (item.ingredients || []).forEach((ingredient) => {
      const row = inventory.find((entry) => entry.name.toLowerCase() === ingredient.name.toLowerCase());
      if (row) {
        row.stock -= ingredient.qty * item.qty;
      }
    });
  }

  const sales = getFromStorage(STORAGE_KEYS.sales);
  const rawSubtotal = getCartSubtotal();
  const promoAmt = getPromoDiscount(rawSubtotal);
  const discAmt = getDiscountValue(rawSubtotal);
  const loyaltyAmt = getLoyaltyDiscount(rawSubtotal);
  const discountTotal = promoAmt + discAmt + loyaltyAmt;
  const subtotal = Math.max(0, rawSubtotal - discountTotal);
  const tax = subtotal * (getTaxRate() / 100);
  const serviceCharge = getCartServiceCharge(subtotal);
  const deliveryFee = getCartDeliveryFee();
  const promoSnapshot = appliedPromo ? { id: appliedPromo.id, name: appliedPromo.name, type: appliedPromo.type, value: appliedPromo.value, amount: promoAmt } : null;
  const discountSnapshot = appliedDiscount ? { id: appliedDiscount.id, name: appliedDiscount.name, type: appliedDiscount.type, value: appliedDiscount.value, amount: discAmt } : null;
  const loyaltySnapshot = loyaltyAmt > 0 ? { points: cartLoyaltyPoints, amount: loyaltyAmt } : null;
  const orderMeta = buildSaleMeta();
  const itemsSnapshot = cart.map((entry) => ({ id: entry.id, name: entry.name, qty: entry.qty, price: entry.price, optionsPrice: entry.optionsPrice || 0, options: entry.options || [], note: entry.note || '' }));

  let sale = null;
  if (pendingSavedOrderId) {
    sale = sales.find((entry) => entry.id === pendingSavedOrderId) || null;
    if (sale) {
      sale.rawSubtotal = rawSubtotal;
      sale.subtotal = subtotal;
      sale.tax = tax;
      sale.total = total;
      sale.discountTotal = discountTotal;
      sale.promo = promoSnapshot;
      sale.discount = discountSnapshot;
      sale.loyalty = loyaltySnapshot;
      sale.paid = allocated;
      sale.change = allocated - total;
      sale.cashier = currentUser?.name || sale.cashier;
      sale.payments = payments;
      sale.items = itemsSnapshot;
      sale.serviceCharge = serviceCharge;
      sale.deliveryFee = deliveryFee;
      Object.assign(sale, orderMeta);
      sale.kitchenStatus = 'pending';
      if (cartCustomer) {
        sale.customerId = cartCustomer.id;
        sale.customerName = cartCustomer.name;
        sale.customerPhone = cartCustomer.phone;
        sale.customerEmail = cartCustomer.email || '';
      }
      delete sale.savedOnly;
    }
  }
  pendingSavedOrderId = null;

  if (!sale) {
    sale = {
      id: Date.now(),
      invoice: getNextInvoiceNumber(sales),
      rawSubtotal,
      subtotal,
      tax,
      total,
      discountTotal,
      promo: promoSnapshot,
      discount: discountSnapshot,
      loyalty: loyaltySnapshot,
      paid: allocated,
      change: allocated - total,
      cashier: currentUser?.name || 'Cashier',
      payments,
      items: itemsSnapshot,
      createdAt: new Date().toISOString(),
      serviceCharge,
      deliveryFee,
      kitchenStatus: 'pending',
      ...orderMeta
    };
    if (cartCustomer) {
      sale.customerId = cartCustomer.id;
      sale.customerName = cartCustomer.name;
      sale.customerPhone = cartCustomer.phone;
      sale.customerEmail = cartCustomer.email || '';
    }
    sales.push(sale);
  }

  if (cartCustomer) {
    const customers = getFromStorage(STORAGE_KEYS.customers);
    const customer = customers.find((entry) => entry.id === cartCustomer.id);
    if (customer) {
      const loyalty = getLoyaltySettings();
      if (loyalty.enabled) {
        const earned = Math.floor((rawSubtotal - discountTotal) / 100) * loyalty.pointsPer100;
        customer.points = Math.max(0, (customer.points || 0) + earned - cartLoyaltyPoints);
        customer.lastVisit = new Date().toISOString();
      } else {
        customer.lastVisit = new Date().toISOString();
      }
      writeToStorage(STORAGE_KEYS.customers, customers);
    }
  }

  writeToStorage(STORAGE_KEYS.sales, sales);
  writeToStorage(STORAGE_KEYS.inventory, inventory);
  saveRecoverySnapshot();

  cart = [];
  appliedPromo = null;
  appliedDiscount = null;
  cartCustomer = null;
  cartLoyaltyPoints = 0;
  cartTip = 0;
  cartTable = null;
  cartOrderType = 'dinein';
  cartDelivery = { address: '', riderName: '', riderPhone: '' };
  renderCart();
  renderDashboard();
  renderOrdersManager();
  closePaymentModal();
  showToast('Payment successful', 'success');
  printReceipt(sale);
  logAudit('Sale', `Invoice #${sale.invoice} · ${formatCurrency(sale.total)}`);
}

function printReceipt(sale) {
  if (typeof sale === 'number') {
    sale = getFromStorage(STORAGE_KEYS.sales).find((entry) => entry.id === sale) || null;
    if (!sale) return;
  }
  const settings = getStoredSettings();
  const taxRate = getTaxRate();
  const paperWidth = getReceiptWidth();
  const nameLimit = paperWidth === '58mm' ? 13 : 19;
  const truncate = (text, max) => {
    const str = String(text || '');
    return str.length > max ? str.slice(0, max - 1) + '…' : str;
  };
  const date = new Date(sale.createdAt).toLocaleString();
  const shopName = settings.shopName || 'FasterFood';

  const itemRows = sale.items.map((item) => `
    <tr>
      <td class="name">${truncate(item.name, nameLimit)}${item.options && item.options.length ? `<div style="font-size:10px;">${truncate(item.options.map((option) => option.label).join(', '), nameLimit)}</div>` : ''}${item.note ? `<div style="font-size:10px;">📝 ${truncate(item.note, nameLimit)}</div>` : ''}</td>
      <td class="center">${item.qty}</td>
      <td class="right">${formatCurrency(item.price)}</td>
      <td class="right">${formatCurrency(((Number(item.price) || 0) + (Number(item.optionsPrice) || 0)) * item.qty)}</td>
    </tr>
  `).join('');

  const paymentRows = (sale.payments || []).map((payment) => `
    <tr>
      <td class="name">${truncate(payment.method, nameLimit)}</td>
      <td class="right">${formatCurrency(payment.amount)}</td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Receipt</title>
        <style>
          @page { size: ${paperWidth} auto; margin: 0; }
          * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          html, body { width: ${paperWidth}; }
          body {
            font-family: 'Courier New', 'Consolas', monospace;
            font-size: 12px;
            line-height: 1.4;
            color: #000;
            padding: 2mm 3mm;
          }
          h1 { font-size: 16px; text-align: center; margin-bottom: 2px; }
          .meta { text-align: center; font-size: 11px; margin: 1px 0; }
          .divider { border-top: 1px dashed #000; margin: 6px 0; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th { text-align: left; padding: 1px 0; border-bottom: 1px solid #000; }
          td { padding: 1px 0; vertical-align: top; white-space: nowrap; }
          td.name { max-width: ${paperWidth === '58mm' ? '26mm' : '40mm'}; overflow: hidden; text-overflow: ellipsis; }
          .right { text-align: right; }
          .center { text-align: center; }
          .bold { font-weight: 700; }
          .grand { font-size: 13px; }
          .qr { text-align: center; margin-top: 6px; }
          .qr img { max-width: ${paperWidth === '58mm' ? '24mm' : '38mm'}; height: auto; }
          .footer { text-align: center; margin-top: 8px; font-size: 11px; }
        </style>
      </head>
      <body>
        <h1>${shopName}</h1>
        <div class="meta">${settings.address || ''}</div>
        <div class="meta">${settings.phone || ''}</div>
        ${settings.receiptContact ? `
          <div class="meta">${settings.email || ''}</div>
          <div class="meta">${settings.website || ''}</div>
        ` : ''}
        <div class="divider"></div>
        <div class="meta">Invoice #${sale.invoice}</div>
        <div class="meta">${date}</div>
        <div class="meta">Cashier: ${sale.cashier || '—'}</div>
        ${sale.branch ? `<div class="meta">Branch: ${truncate(sale.branch, nameLimit)}</div>` : ''}
        ${sale.table ? `<div class="meta">Table: ${truncate(sale.table, nameLimit)}</div>` : ''}
        ${sale.orderType ? `<div class="meta">Type: ${sale.orderType.charAt(0).toUpperCase() + sale.orderType.slice(1)}</div>` : ''}
        ${sale.deliveryAddress ? `<div class="meta">Delivery: ${truncate(sale.deliveryAddress, 26)}</div>` : ''}
        ${sale.riderName ? `<div class="meta">${settings.deliveryRiderLabel || 'Rider'}: ${truncate(sale.riderName, 22)}${sale.riderPhone ? ' · ' + sale.riderPhone : ''}</div>` : ''}
        ${sale.customerName ? `<div class="meta">Customer: ${truncate(sale.customerName, nameLimit)}</div>` : ''}
        <div class="divider"></div>
        <table>
          <tr>
            <th class="name">Item</th>
            <th class="center">Qty</th>
            <th class="right">Price</th>
            <th class="right">Total</th>
          </tr>
          ${itemRows}
        </table>
        <div class="divider"></div>
        <table>
          <tr><td>Subtotal</td><td class="right">${formatCurrency(sale.rawSubtotal ?? (sale.subtotal + (sale.discountTotal || 0)))}</td></tr>
          ${sale.promo && sale.promo.amount ? `<tr><td>Promo: ${truncate(sale.promo.name, nameLimit)}</td><td class="right">-${formatCurrency(sale.promo.amount)}</td></tr>` : ''}
          ${sale.discount && sale.discount.amount ? `<tr><td>Discount: ${truncate(sale.discount.name, nameLimit)}</td><td class="right">-${formatCurrency(sale.discount.amount)}</td></tr>` : ''}
          ${sale.loyalty && sale.loyalty.amount ? `<tr><td>Loyalty points</td><td class="right">-${formatCurrency(sale.loyalty.amount)}</td></tr>` : ''}
          <tr><td>VAT (${taxRate}%)</td><td class="right">${formatCurrency(sale.tax)}</td></tr>
          ${sale.serviceCharge ? `<tr><td>Service charge</td><td class="right">${formatCurrency(sale.serviceCharge)}</td></tr>` : ''}
          ${sale.deliveryFee ? `<tr><td>Delivery fee</td><td class="right">${formatCurrency(sale.deliveryFee)}</td></tr>` : ''}
          ${sale.tip ? `<tr><td>Tip</td><td class="right">${formatCurrency(sale.tip)}</td></tr>` : ''}
          <tr class="bold grand"><td>TOTAL</td><td class="right">${formatCurrency(sale.total)}</td></tr>
        </table>
        <div class="divider"></div>
        <table>
          ${paymentRows}
          <tr><td>Change</td><td class="right">${formatCurrency(sale.change)}</td></tr>
        </table>
        <div class="divider"></div>
        ${settings.qrImage ? `
          <div class="qr">
            <img src="${settings.qrImage}" alt="QR" />
          </div>
        ` : ''}
        <div class="footer">Thank you for your patronage</div>
        <script>window.onload = function () { window.focus(); window.print(); };</script>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank', 'width=380,height=600');
  if (!printWindow) return;
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
}

function saveOrder() {
  if (!cart.length) {
    showToast('No items in cart. Add an item first.', 'error');
    return;
  }

  const sales = getFromStorage(STORAGE_KEYS.sales);
  const rawSubtotal = getCartSubtotal();
  const promoAmt = getPromoDiscount(rawSubtotal);
  const discAmt = getDiscountValue(rawSubtotal);
  const discountTotal = promoAmt + discAmt;
  const subtotal = Math.max(0, rawSubtotal - discountTotal);
  const tax = subtotal * (getTaxRate() / 100);
  const sale = {
    id: Date.now(),
    invoice: getNextInvoiceNumber(sales),
    rawSubtotal,
    subtotal,
    tax,
    discountTotal,
    promo: appliedPromo ? { id: appliedPromo.id, name: appliedPromo.name, type: appliedPromo.type, value: appliedPromo.value, amount: promoAmt } : null,
    discount: appliedDiscount ? { id: appliedDiscount.id, name: appliedDiscount.name, type: appliedDiscount.type, value: appliedDiscount.value, amount: discAmt } : null,
    total: getCurrentTotal(),
    paid: getCurrentTotal(),
    change: 0,
    cashier: currentUser?.name || 'Cashier',
    payments: [],
    items: cart.map((entry) => ({ id: entry.id, name: entry.name, qty: entry.qty, price: entry.price, optionsPrice: entry.optionsPrice || 0, options: entry.options || [], note: entry.note || '' })),
    createdAt: new Date().toISOString(),
    savedOnly: true,
    serviceCharge: getCartServiceCharge(subtotal),
    deliveryFee: getCartDeliveryFee(),
    ...buildSaleMeta()
  };
  if (cartCustomer) {
    sale.customerId = cartCustomer.id;
    sale.customerName = cartCustomer.name;
    sale.customerPhone = cartCustomer.phone;
  }

  sales.push(sale);
  writeToStorage(STORAGE_KEYS.sales, sales);
  cart = [];
  cartCustomer = null;
  cartLoyaltyPoints = 0;
  renderCart();
  renderDashboard();
  renderOrdersManager();
  showToast('Order saved.', 'success');
  logAudit('Order saved', `Invoice #${sale.invoice} · ${formatCurrency(sale.total)}`);
}

function openSavedOrdersModal() {
  const sales = getFromStorage(STORAGE_KEYS.sales).filter((sale) => sale.savedOnly);
  const container = document.getElementById('saved-orders-list');
  container.innerHTML = sales.length
    ? sales.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((sale) => {
        const itemSummary = sale.items.map((item) => `${item.name} ×${item.qty}`).join(', ');
        return `
          <div class="saved-order-row">
            <div class="saved-order-info">
              <div class="saved-order-title">Invoice #${sale.invoice} · ${formatCurrency(sale.total)}</div>
              <small>${new Date(sale.createdAt).toLocaleString()} · ${sale.cashier || '—'}</small>
              <div class="saved-order-items">${itemSummary}</div>
            </div>
            <div class="saved-order-actions">
              <button class="action-btn primary" onclick="recallSavedOrder(${sale.id})">Load &amp; pay</button>
              <button class="action-btn danger" onclick="deleteSavedOrder(${sale.id})">Delete</button>
            </div>
          </div>
        `;
      }).join('')
    : '<div class="empty-hint">No saved orders yet.</div>';
  document.getElementById('saved-orders-modal').classList.remove('hidden');
}

function closeSavedOrdersModal() {
  document.getElementById('saved-orders-modal').classList.add('hidden');
}

function openInvoicesModal() {
  const sales = getFromStorage(STORAGE_KEYS.sales).filter((sale) => !sale.savedOnly);
  const tbody = document.getElementById('invoices-table-body');
  tbody.innerHTML = sales.length
    ? sales.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((sale) => {
        const productSummary = sale.items.map((item) => `${item.name} ×${item.qty}`).join(', ');
        const paymentSummary = (sale.payments || []).map((payment) => `${payment.method} ${formatCurrency(payment.amount)}`).join(' + ');
        return `
          <tr>
            <td><span class="invoice-chip">#${sale.invoice}</span></td>
            <td>${new Date(sale.createdAt).toLocaleString()}</td>
            <td>${productSummary}</td>
            <td>${paymentSummary || '—'}</td>
            <td>${sale.cashier || '—'}</td>
            <td class="num"><strong>${formatCurrency(sale.total)}</strong></td>
            <td><button class="table-action" onclick="printReceipt(${sale.id})">Print</button></td>
          </tr>
        `;
      }).join('')
    : '<tr class="empty-row"><td colspan="7">No completed sales yet.</td></tr>';

  const totalSales = sales.reduce((sum, sale) => sum + (Number(sale.total) || 0), 0);
  const totalItems = sales.reduce((sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.qty, 0), 0);
  const foot = document.getElementById('invoices-table-foot');
  foot.innerHTML = `
    <tr class="invoices-total-row">
      <td colspan="5">Total sales · ${sales.length} invoice(s) · ${totalItems} item(s)</td>
      <td class="num"><strong>${formatCurrency(totalSales)}</strong></td>
      <td></td>
    </tr>
  `;
  document.getElementById('invoices-modal').classList.remove('hidden');
}

function closeInvoicesModal() {
  document.getElementById('invoices-modal').classList.add('hidden');
}

function deleteSavedOrder(saleId) {
  const sales = getFromStorage(STORAGE_KEYS.sales);
  const sale = sales.find((entry) => entry.id === saleId);
  if (!sale) return;
  if (pendingSavedOrderId === saleId) pendingSavedOrderId = null;
  const updated = sales.filter((entry) => entry.id !== saleId);
  writeToStorage(STORAGE_KEYS.sales, updated);
  logAudit('Saved order deleted', `Invoice #${sale.invoice} · ${formatCurrency(sale.total)}`);
  openSavedOrdersModal();
  showToast('Saved order deleted.', 'success');
}

function recallSavedOrder(saleId) {
  const sales = getFromStorage(STORAGE_KEYS.sales);
  const sale = sales.find((entry) => entry.id === saleId);
  if (!sale) return;

  const menu = getFromStorage(STORAGE_KEYS.menu);
  const loadedCart = [];

  sale.items.forEach((savedItem) => {
    const menuItem = menu.find((entry) => entry.id === savedItem.id);
    const entry = menuItem
      ? { ...menuItem, qty: savedItem.qty, options: savedItem.options || [], optionsPrice: savedItem.optionsPrice || 0, note: savedItem.note || '' }
      : { id: savedItem.id, name: savedItem.name, price: savedItem.price, qty: savedItem.qty, ingredients: [], options: savedItem.options || [], optionsPrice: savedItem.optionsPrice || 0, note: savedItem.note || '' };

    const signature = JSON.stringify({ options: entry.options, optionsPrice: entry.optionsPrice, note: entry.note });
    const existing = loadedCart.find((item) => item.id === entry.id && JSON.stringify({ options: item.options, optionsPrice: item.optionsPrice, note: item.note }) === signature);
    if (existing) {
      existing.qty += entry.qty;
    } else {
      loadedCart.push(entry);
    }
  });

  const unavailable = loadedCart.filter((entry) => !canMakeItem(entry, entry.qty)).map((entry) => entry.name);

  cart = loadedCart;
  pendingSavedOrderId = saleId;
  appliedPromo = sale.promo && sale.promo.id ? { ...sale.promo } : null;
  appliedDiscount = sale.discount && sale.discount.id ? { ...sale.discount } : null;
  cartCustomer = null;
  cartLoyaltyPoints = 0;
  cartTable = sale.table || null;
  cartOrderType = (sale.orderType && ['dinein', 'takeaway', 'delivery'].includes(sale.orderType)) ? sale.orderType : 'dinein';
  cartTip = sale.tip || 0;
  cartDelivery = {
    address: sale.deliveryAddress || '',
    riderName: sale.riderName || '',
    riderPhone: sale.riderPhone || ''
  };
  if (sale.customerId) {
    const customer = getCustomers().find((entry) => entry.id === sale.customerId);
    if (customer) cartCustomer = { id: customer.id, name: customer.name, phone: customer.phone, email: customer.email || '', points: customer.points || 0 };
  }
  closeSavedOrdersModal();
  showPanel('pos');
  renderCart();
  renderCartTableBadge();
  renderCartOrderBadge();

  if (unavailable.length) {
    showToast(`Some items are low on stock: ${unavailable.join(', ')}. Adjust before checkout.`, 'error');
  } else {
    showToast('Saved order loaded. Review and checkout.', 'success');
  }
}

function renderMenuManager() {
  const menuQuery = (document.getElementById('menu-search-manager')?.value || '').trim().toLowerCase();
  const menu = getFromStorage(STORAGE_KEYS.menu)
    .slice()
    .filter((item) => {
      if (!menuQuery) return true;
      const nameMatch = item.name.toLowerCase().includes(menuQuery);
      const categoryMatch = (item.category || '').toLowerCase().includes(menuQuery);
      const barcodeMatch = (item.barcode || '').toLowerCase().includes(menuQuery);
      return nameMatch || categoryMatch || barcodeMatch;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  const countEl = document.getElementById('menu-count');
  if (countEl) countEl.textContent = `${menu.length} item${menu.length === 1 ? '' : 's'}`;
  const menuTotalPages = Math.max(1, Math.ceil(menu.length / LIST_PAGE_SIZE));
  if (menuPage > menuTotalPages) menuPage = menuTotalPages;
  const pageMenu = menu.slice((menuPage - 1) * LIST_PAGE_SIZE, menuPage * LIST_PAGE_SIZE);
  document.getElementById('menu-list').innerHTML = `
    <table class="menu-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th class="num">Price</th>
          <th class="num">Remaining</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${pageMenu.length ? pageMenu.map((item) => {
          const [avatarBg, avatarFg] = avatarColor(item.name);
          const remaining = getItemRemaining(item);
          const remainingHtml = remaining === null
            ? '<span class="muted">—</span>'
            : `<span class="stock-chip ${remaining <= 2 ? 'chip-low' : ''}">${remaining} left</span>`;
          return `
          <tr ${editingMenuId === item.id ? 'class="row-editing"' : ''}>
            <td>
              <div class="fs-item">
                ${item.image ? `<span class="fs-avatar fs-thumb"><img src="${item.image}" alt="" /></span>` : `<span class="fs-avatar" style="background:${avatarBg};color:${avatarFg}">${item.name.charAt(0).toUpperCase()}</span>`}
                <div class="fs-item-text"><strong>${item.name}</strong></div>
              </div>
            </td>
            <td><span class="cat-pill">${item.category}</span></td>
            <td class="menu-price">${formatCurrency(item.price)}</td>
            <td class="num">${remainingHtml}</td>
            <td>
              <div class="row-actions">
                <button class="table-action edit" onclick="editMenuItem(${item.id})" title="Edit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                  <span>Edit</span>
                </button>
                ${getFeature('photos') ? `<button class="table-action push" onclick="openMenuPhotoModal(${item.id})" title="Upload photo">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                  <span>Photo</span>
                </button>` : ''}
                <button class="table-action leftover" onclick="toggleLeftoverPopover(${item.id}, this)" title="Return leftovers">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6.5h18"/><path d="M8 6.5V4.5h8v2"/><path d="M5.5 6.5l1.3 14h10.4l1.3-14"/><path d="M9 10.5v6M12 10.5v6M15 10.5v6"/></svg>
                  <span>Leftover</span>
                </button>
                <button class="table-action danger" onclick="deleteMenuItem(${item.id})" title="Delete">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6.5h16"/><path d="M9 6.5V4.5h6v2"/><path d="M6 6.5l.8 13h10.4l.8-13"/><path d="M10 10.5v5.5M14 10.5v5.5"/></svg>
                  <span>Delete</span>
                </button>
              </div>
            </td>
          </tr>
        `;}).join('') : `<tr class="empty-row"><td colspan="5"><div class="report-empty">${menuQuery ? 'No products match your search.' : 'No menu items yet.'}</div></td></tr>`}
      </tbody>
    </table>
  `;
  renderListPagination('menu-pagination', menuPage, menuTotalPages, menu.length, 'changeMenuPage', 'goToMenuPage');
}

function getMenuItemForInventory(inventoryId) {
  const menu = getFromStorage(STORAGE_KEYS.menu);
  return menu.find((entry) => entry.sourceInventoryId === inventoryId);
}

let activeLeftoverPopoverId = null;

function toggleLeftoverPopover(itemId, trigger) {
  const pop = document.getElementById('leftover-popover');
  if (!pop) return;
  const isOpen = activeLeftoverPopoverId === itemId;
  closeLeftoverPopover();
  if (isOpen) return;
  const menu = getFromStorage(STORAGE_KEYS.menu);
  const item = menu.find((entry) => entry.id === itemId);
  if (!item) return;
  document.getElementById('leftover-popover-title').textContent = `Return ${item.name}`;
  document.getElementById('leftover-popover-qty').value = 1;
  activeLeftoverPopoverId = itemId;
  pop.classList.remove('hidden');
  const rect = trigger.getBoundingClientRect();
  let left = rect.right - 240;
  if (left < 12) left = 12;
  let top = rect.bottom + 8;
  const estHeight = 150;
  if (top + estHeight > window.innerHeight - 12) {
    top = Math.max(12, rect.top - estHeight - 8);
  }
  pop.style.left = `${left}px`;
  pop.style.top = `${top}px`;
  const input = document.getElementById('leftover-popover-qty');
  input.focus();
  input.select();
}

function closeLeftoverPopover() {
  const pop = document.getElementById('leftover-popover');
  if (pop) pop.classList.add('hidden');
  activeLeftoverPopoverId = null;
}

document.addEventListener('click', (event) => {
  if (activeLeftoverPopoverId !== null && !event.target.closest('#leftover-popover') && !event.target.closest('.table-action.leftover')) {
    closeLeftoverPopover();
  }
});

function confirmLeftoverReturn() {
  if (activeLeftoverPopoverId === null) return;
  const itemId = activeLeftoverPopoverId;
  const input = document.getElementById('leftover-popover-qty');
  const qty = input ? parseInt(input.value, 10) : NaN;
  if (!qty || qty < 1) {
    showToast('Enter a valid quantity to return.', 'error');
    return;
  }
  const menu = getFromStorage(STORAGE_KEYS.menu);
  const item = menu.find((entry) => entry.id === itemId);
  if (!item) {
    showToast('Menu item not found.', 'error');
    return;
  }
  const leftovers = getFromStorage(STORAGE_KEYS.leftovers);
  leftovers.unshift({
    id: Date.now(),
    menuItemId: item.id,
    name: item.name,
    category: item.category || 'General',
    price: item.price || 0,
    qty,
    ingredients: item.ingredients || [],
    status: 'pending',
    createdAt: new Date().toISOString(),
    cashier: currentUser ? currentUser.name : '—'
  });
  writeToStorage(STORAGE_KEYS.leftovers, leftovers);

  const updatedMenu = menu.filter((entry) => entry.id !== item.id);
  writeToStorage(STORAGE_KEYS.menu, updatedMenu);
  if (typeof renderPOS === 'function') renderPOS();

  closeLeftoverPopover();
  showToast(`${qty} x ${item.name} returned as leftover and removed from the front store.`, 'success');
  logAudit('Leftover returned', `${qty} x ${item.name} removed from front store`);
  renderMenuManager();
}

function getLeftoverRecords() {
  return getFromStorage(STORAGE_KEYS.leftovers).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function setLeftoverStatus(id, status) {
  const leftovers = getFromStorage(STORAGE_KEYS.leftovers);
  const record = leftovers.find((entry) => entry.id === id);
  if (!record) return;

  if (status === 'inventory' && record.status !== 'inventory') {
    restoreLeftoverStock(record);
  }
  record.status = status;
  record.processedAt = new Date().toISOString();
  record.processedBy = currentUser ? currentUser.name : '—';
  writeToStorage(STORAGE_KEYS.leftovers, leftovers);
  showToast(status === 'inventory'
    ? `${record.qty} x ${record.name} returned to inventory.`
    : `${record.qty} x ${record.name} marked as wastage.`, 'success');
  logAudit(status === 'inventory' ? 'Leftover returned to inventory' : 'Leftover marked wastage',
    `${record.qty} x ${record.name}`);
  renderLeftoverManager();
  renderInventoryManager();
  renderPOS();
}

function restoreLeftoverStock(record) {
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  let restored = false;
  let matchedAny = false;
  const ingredients = record.ingredients || [];
  if (ingredients.length) {
    ingredients.forEach((ingredient) => {
      const row = inventory.find((entry) => entry.name.toLowerCase() === ingredient.name.toLowerCase());
      if (row) {
        row.stock = (Number(row.stock) || 0) + ingredient.qty * record.qty;
        row.returnedFromLeftover = true;
        row.returnedAt = new Date().toISOString();
        matchedAny = true;
        restored = true;
      }
    });
  } else {
    const row = inventory.find((entry) => entry.name.toLowerCase() === record.name.toLowerCase());
    if (row) {
      row.stock = (Number(row.stock) || 0) + record.qty;
      row.returnedFromLeftover = true;
      row.returnedAt = new Date().toISOString();
      matchedAny = true;
      restored = true;
    }
  }

  if (!matchedAny) {
    let newId = Date.now();
    while (inventory.some((entry) => entry.id === newId)) newId += 1;
    inventory.push({
      id: newId,
      name: record.name,
      group: record.category || 'General',
      unit: 'pcs',
      stock: record.qty,
      price: record.price || null,
      reorderLevel: 0,
      createdAt: new Date().toISOString(),
      returnedFromLeftover: true,
      returnedAt: new Date().toISOString(),
      returnedQty: record.qty
    });
    restored = true;
  }

  if (restored) writeToStorage(STORAGE_KEYS.inventory, inventory);
  return restored;
}

function renderLeftoverManager() {
  const records = getLeftoverRecords();
  const countEl = document.getElementById('leftover-count');
  if (countEl) countEl.textContent = `${records.length} record${records.length === 1 ? '' : 's'}`;

  const totalPages = Math.max(1, Math.ceil(records.length / LIST_PAGE_SIZE));
  if (leftoverPage > totalPages) leftoverPage = totalPages;
  const pageRecords = records.slice((leftoverPage - 1) * LIST_PAGE_SIZE, leftoverPage * LIST_PAGE_SIZE);

  const statusBadge = (status) => {
    if (status === 'inventory') return '<span class="status-pill pill-green">Returned to inventory</span>';
    if (status === 'wastage') return '<span class="status-pill pill-red">Wastage</span>';
    return '<span class="status-pill pill-amber">Pending</span>';
  };

  const actionButtons = (record) => {
    if (record.status !== 'pending') return '<span class="muted">—</span>';
    return `
      <div class="row-actions">
        <button class="table-action leftover" onclick="setLeftoverStatus(${record.id}, 'inventory')" title="Resaleable">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
          <span>Return to inventory</span>
        </button>
        <button class="table-action danger" onclick="setLeftoverStatus(${record.id}, 'wastage')" title="Cannot be resold">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6.5h18"/><path d="M8 6.5V4.5h8v2"/><path d="M5.5 6.5l1.3 14h10.4l1.3-14"/><path d="M9 10.5v6M12 10.5v6M15 10.5v6"/></svg>
          <span>Wastage</span>
        </button>
      </div>`;
  };

  document.getElementById('leftover-list').innerHTML = `
    <table class="menu-table">
      <thead>
        <tr>
          <th>Date returned</th>
          <th>Product</th>
          <th>Category</th>
          <th class="num">Qty</th>
          <th class="num">Value</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${pageRecords.length
          ? pageRecords.map((record) => `
            <tr>
              <td><span class="muted">${new Date(record.createdAt).toLocaleString()}</span></td>
              <td>
                <div class="fs-item">
                  <span class="fs-avatar" style="background:${avatarColor(record.name)[0]};color:${avatarColor(record.name)[1]}">${record.name.charAt(0).toUpperCase()}</span>
                  <div class="fs-item-text"><strong>${record.name}</strong></div>
                </div>
              </td>
              <td><span class="cat-pill">${record.category}</span></td>
              <td class="num"><strong>${record.qty}</strong></td>
              <td class="num">${formatCurrency((record.price || 0) * record.qty)}</td>
              <td>${statusBadge(record.status)}</td>
              <td>${actionButtons(record)}</td>
            </tr>
          `).join('')
          : `<tr class="empty-row"><td colspan="7"><div class="report-empty">No leftover records yet. Return items from the Front store to get started.</div></td></tr>`}
      </tbody>
    </table>
  `;
  renderListPagination('leftover-pagination', leftoverPage, totalPages, records.length, 'changeLeftoverPage', 'goToLeftoverPage');
}

function changeLeftoverPage(delta) {
  leftoverPage = Math.max(1, leftoverPage + delta);
  renderLeftoverManager();
}

function goToLeftoverPage(page) {
  leftoverPage = page;
  renderLeftoverManager();
}

const PROMO_TYPES = [
  { value: 'percentage', label: 'Percentage off (%)' },
  { value: 'fixed', label: 'Fixed amount off (₦)' },
  { value: 'bogo', label: 'Buy 1 Get 1 free' },
  { value: 'free', label: 'Free item with purchase' }
];

const DISCOUNT_TYPES = [
  { value: 'percentage', label: 'Percentage off (%)' },
  { value: 'fixed', label: 'Fixed amount off (₦)' }
];

function getPromos() {
  return getFromStorage(STORAGE_KEYS.promos);
}

function getDiscounts() {
  return getFromStorage(STORAGE_KEYS.discounts);
}

function getPromoTypeLabel(type) {
  const found = PROMO_TYPES.find((item) => item.value === type);
  return found ? found.label : String(type || '');
}

function getDiscountTypeLabel(type) {
  const found = DISCOUNT_TYPES.find((item) => item.value === type);
  return found ? found.label : String(type || '');
}

function getDealValueSummary(deal) {
  if (!deal) return '';
  if (deal.type === 'percentage') return `${Number(deal.value) || 0}% off`;
  if (deal.type === 'fixed') return `${formatCurrency(Number(deal.value) || 0)} off`;
  if (deal.type === 'bogo') return 'Buy 1, Get 1 free';
  if (deal.type === 'free') return 'Free item with purchase';
  return '';
}

function handlePromoSubmit(event) {
  event.preventDefault();
  const promos = getPromos();
  const name = document.getElementById('promo-name').value.trim();
  const type = document.getElementById('promo-type').value;
  const value = Number(document.getElementById('promo-value').value);
  const note = document.getElementById('promo-note').value.trim();

  if (!name) {
    showToast('Give the promo a name.', 'error');
    return;
  }
  if ((type === 'percentage' || type === 'fixed') && (!Number.isFinite(value) || value <= 0)) {
    showToast('Enter a value greater than zero for this promo type.', 'error');
    return;
  }

  promos.push({
    id: Date.now(),
    name,
    type,
    value: Number.isFinite(value) ? value : 0,
    note,
    active: true,
    createdAt: new Date().toISOString()
  });
  writeToStorage(STORAGE_KEYS.promos, promos);
  document.getElementById('promo-form').reset();
  renderPromosManager();
  showToast(`Promo "${name}" created and added to the POS.`, 'success');
  logAudit('Promo created', `${name} · ${getDealValueSummary(promos[promos.length - 1])}`);
}

function handleDiscountSubmit(event) {
  event.preventDefault();
  const discounts = getDiscounts();
  const name = document.getElementById('discount-name').value.trim();
  const type = document.getElementById('discount-type').value;
  const value = Number(document.getElementById('discount-value').value);
  const note = document.getElementById('discount-note').value.trim();

  if (!name) {
    showToast('Give the discount a name.', 'error');
    return;
  }
  if (!Number.isFinite(value) || value <= 0) {
    showToast('Enter a value greater than zero for the discount.', 'error');
    return;
  }

  discounts.push({
    id: Date.now(),
    name,
    type,
    value,
    note,
    active: true,
    createdAt: new Date().toISOString()
  });
  writeToStorage(STORAGE_KEYS.discounts, discounts);
  document.getElementById('discount-form').reset();
  renderPromosManager();
  showToast(`Discount "${name}" created and added to the POS.`, 'success');
  logAudit('Discount created', `${name} · ${getDealValueSummary(discounts[discounts.length - 1])}`);
}

function togglePromo(id) {
  const promos = getPromos();
  const promo = promos.find((entry) => entry.id === id);
  if (!promo) return;
  promo.active = !promo.active;
  writeToStorage(STORAGE_KEYS.promos, promos);
  renderPromosManager();
  showToast(promo.active ? `Promo "${promo.name}" is now active on the POS.` : `Promo "${promo.name}" deactivated.`, 'success');
  logAudit('Promo updated', `${promo.name} ${promo.active ? 'activated' : 'deactivated'}`);
}

function toggleDiscount(id) {
  const discounts = getDiscounts();
  const discount = discounts.find((entry) => entry.id === id);
  if (!discount) return;
  discount.active = !discount.active;
  writeToStorage(STORAGE_KEYS.discounts, discounts);
  renderPromosManager();
  showToast(discount.active ? `Discount "${discount.name}" is now active on the POS.` : `Discount "${discount.name}" deactivated.`, 'success');
  logAudit('Discount updated', `${discount.name} ${discount.active ? 'activated' : 'deactivated'}`);
}

function deletePromo(id) {
  const promos = getPromos();
  const promo = promos.find((entry) => entry.id === id);
  if (!promo) return;
  writeToStorage(STORAGE_KEYS.promos, promos.filter((entry) => entry.id !== id));
  if (appliedPromo && appliedPromo.id === id) {
    appliedPromo = null;
    renderCart();
  }
  renderPromosManager();
  showToast(`Promo "${promo.name}" deleted.`, 'success');
  logAudit('Promo deleted', promo.name);
}

function deleteDiscount(id) {
  const discounts = getDiscounts();
  const discount = discounts.find((entry) => entry.id === id);
  if (!discount) return;
  writeToStorage(STORAGE_KEYS.discounts, discounts.filter((entry) => entry.id !== id));
  if (appliedDiscount && appliedDiscount.id === id) {
    appliedDiscount = null;
    renderCart();
  }
  renderPromosManager();
  showToast(`Discount "${discount.name}" deleted.`, 'success');
  logAudit('Discount deleted', discount.name);
}

function renderDealRow(kind, deal) {
  const isPromo = kind === 'promo';
  const summary = getDealValueSummary(deal);
  const statusPill = deal.active
    ? '<span class="status-pill pill-green">Active</span>'
    : '<span class="status-pill pill-red">Inactive</span>';
  const toggleLabel = deal.active ? 'Deactivate' : 'Activate';
  const toggleFn = isPromo ? 'togglePromo' : 'toggleDiscount';
  const deleteFn = isPromo ? 'deletePromo' : 'deleteDiscount';
  return `
    <div class="list-row">
      <div class="mini-item">
        <span class="mini-avatar">${deal.name.charAt(0).toUpperCase()}</span>
        <div>
          <div><strong>${deal.name}</strong> ${statusPill}</div>
          <small>${isPromo ? getPromoTypeLabel(deal.type) : getDiscountTypeLabel(deal.type)}${summary ? ` · ${summary}` : ''}${deal.note ? ` · ${deal.note}` : ''}</small>
        </div>
      </div>
      <div class="row-actions">
        <button class="table-action edit" onclick="${toggleFn}(${deal.id})">${toggleLabel}</button>
        <button class="table-action danger" onclick="${deleteFn}(${deal.id})">Delete</button>
      </div>
    </div>
  `;
}

function renderPromosManager() {
  const promos = getPromos().slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const discounts = getDiscounts().slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const countEl = document.getElementById('promo-count');
  if (countEl) countEl.textContent = `${promos.length} promo${promos.length === 1 ? '' : 's'}`;
  const countDiscEl = document.getElementById('discount-count');
  if (countDiscEl) countDiscEl.textContent = `${discounts.length} discount${discounts.length === 1 ? '' : 's'}`;

  const promoList = document.getElementById('promo-list');
  const discountList = document.getElementById('discount-list');
  if (promoList) {
    promoList.innerHTML = promos.length
      ? promos.map((promo) => renderDealRow('promo', promo)).join('')
      : '<div class="list-row"><div>No promos yet. Create one above.</div><span class="badge info">New</span></div>';
  }
  if (discountList) {
    discountList.innerHTML = discounts.length
      ? discounts.map((discount) => renderDealRow('discount', discount)).join('')
      : '<div class="list-row"><div>No discounts yet. Create one above.</div><span class="badge info">New</span></div>';
  }
}

function renderPromoPickerCurrent() {
  const container = document.getElementById('promo-picker-current');
  if (!container) return;
  const promo = appliedPromo ? `${appliedPromo.name} (${getDealValueSummary(appliedPromo)})` : 'None';
  const discount = appliedDiscount ? `${appliedDiscount.name} (${getDealValueSummary(appliedDiscount)})` : 'None';
  container.innerHTML = `
    <div class="picker-current">
      <div><span>Promo applied:</span> <strong>${promo}</strong></div>
      <div><span>Discount applied:</span> <strong>${discount}</strong></div>
    </div>
  `;
}

function renderPickerRow(kind, deal, applied) {
  const summary = getDealValueSummary(deal);
  const typeLabel = kind === 'promo' ? getPromoTypeLabel(deal.type) : getDiscountTypeLabel(deal.type);
  const applyFn = kind === 'promo' ? 'applyPromo' : 'applyDiscount';
  const button = applied
    ? `<span class="status-pill pill-green">Applied</span><button class="table-action danger" onclick="${applyFn}(${deal.id})">Remove</button>`
    : `<button class="table-action push" onclick="${applyFn}(${deal.id})">Apply</button>`;
  return `
    <div class="deal-row ${applied ? 'deal-applied' : ''}">
      <div class="deal-row-info">
        <div class="deal-row-name">${deal.name}</div>
        <div class="deal-row-desc">${typeLabel}${summary ? ` · ${summary}` : ''}${deal.note ? ` · ${deal.note}` : ''}</div>
      </div>
      <div class="deal-row-actions">${button}</div>
    </div>
  `;
}

function openPromoPicker() {
  const promos = getPromos().filter((promo) => promo.active);
  const discounts = getDiscounts().filter((discount) => discount.active);
  renderPromoPickerCurrent();

  const promoList = document.getElementById('promo-picker-promos');
  const discountList = document.getElementById('promo-picker-discounts');
  promoList.innerHTML = promos.length
    ? promos.map((promo) => renderPickerRow('promo', promo, !!(appliedPromo && appliedPromo.id === promo.id))).join('')
    : '<div class="empty-hint">No active promos. Create one in Promos &amp; discount.</div>';
  discountList.innerHTML = discounts.length
    ? discounts.map((discount) => renderPickerRow('discount', discount, !!(appliedDiscount && appliedDiscount.id === discount.id))).join('')
    : '<div class="empty-hint">No active discounts. Create one in Promos &amp; discount.</div>';

  document.getElementById('promo-picker-modal').classList.remove('hidden');
}

function applyPromo(id) {
  const promo = getPromos().find((entry) => entry.id === id && entry.active);
  if (!promo) return;
  appliedPromo = { id: promo.id, name: promo.name, type: promo.type, value: promo.value };
  renderCart();
  openPromoPicker();
  showToast(`Promo "${promo.name}" applied to this order.`, 'success');
}

function applyDiscount(id) {
  const discount = getDiscounts().find((entry) => entry.id === id && entry.active);
  if (!discount) return;
  appliedDiscount = { id: discount.id, name: discount.name, type: discount.type, value: discount.value };
  renderCart();
  openPromoPicker();
  showToast(`Discount "${discount.name}" applied to this order.`, 'success');
}

function clearAppliedPromo() {
  appliedPromo = null;
  renderCart();
  openPromoPicker();
  showToast('Promo removed from this order.', 'info');
}

function clearAppliedDiscount() {
  appliedDiscount = null;
  renderCart();
  openPromoPicker();
  showToast('Discount removed from this order.', 'info');
}

function closePromoPicker() {
  document.getElementById('promo-picker-modal').classList.add('hidden');
}

function renderInventorySummary() {
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  const totalItems = inventory.length;
  const totalUnits = inventory.reduce((sum, item) => sum + (Number(item.stock) || 0), 0);
  const lowStock = inventory.filter((item) => item.stock <= item.reorderLevel).length;
  const stockValue = inventory.reduce((sum, item) => sum + (Number(item.stock) || 0) * (Number(item.price) || 0), 0);

  const summaryEl = document.getElementById('inventory-summary');
  if (!summaryEl) return;

  summaryEl.innerHTML = `
    <div class="inv-stat">
      <span class="inv-stat-label">Products</span>
      <strong>${totalItems}</strong>
    </div>
    <div class="inv-stat">
      <span class="inv-stat-label">Units in stock</span>
      <strong>${totalUnits.toLocaleString()}</strong>
    </div>
    <div class="inv-stat">
      <span class="inv-stat-label">Low stock</span>
      <strong class="${lowStock ? 'danger' : ''}">${lowStock}</strong>
    </div>
    <div class="inv-stat">
      <span class="inv-stat-label">Stock value</span>
      <strong>${formatCurrency(stockValue)}</strong>
    </div>
  `;
}

function exportInventoryCSV() {
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  if (!inventory.length) {
    showToast('No inventory to export yet.', 'error');
    return;
  }

  const escapeCell = (value) => {
    const text = String(value ?? '');
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };

  const header = 'Name,Group,Unit,Stock,Reorder Level,Price';
  const rows = inventory.map((item) => [
    escapeCell(item.name),
    escapeCell(item.group || ''),
    escapeCell(item.unit || 'pcs'),
    item.stock,
    item.reorderLevel,
    item.price ?? ''
  ].join(','));

  const csv = '\uFEFF' + [header, ...rows].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `inventory-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
  showToast('Inventory exported.', 'success');
}

function handleInventoryImport(event) {
  const file = event.target.files[0];
  event.target.value = '';
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const items = parseInventoryCSV(reader.result);
    if (!items.length) {
      showToast('No valid product rows found in the file.', 'error');
      return;
    }
    applyInventoryImport(items);
  };
  reader.readAsText(file);
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  const chars = String(text || '').replace(/^\uFEFF/, '');

  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (inQuotes) {
      if (ch === '"') {
        if (chars[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && chars[i + 1] === '\n') i++;
      row.push(field);
      field = '';
      if (row.some((cell) => cell.trim() !== '')) rows.push(row);
      row = [];
    } else {
      field += ch;
    }
  }

  row.push(field);
  if (row.some((cell) => cell.trim() !== '')) rows.push(row);
  return rows;
}

function parseInventoryCSV(text) {
  const rows = parseCSV(text);
  if (!rows.length) return [];

  const header = rows[0].map((cell) => String(cell).trim().toLowerCase());
  const findColumn = (aliases) => header.findIndex((h) => aliases.includes(h));
  const col = {
    name: findColumn(['name']),
    group: findColumn(['group', 'group / category', 'group/category', 'category']),
    unit: findColumn(['unit']),
    stock: findColumn(['stock', 'qty', 'quantity']),
    reorder: findColumn(['reorder level', 'reorder', 'reorderlevel']),
    price: findColumn(['price', 'cost'])
  };

  const items = [];
  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r];
    const get = (index) => (index >= 0 && cells[index] !== undefined ? String(cells[index]).trim() : '');

    const name = get(col.name);
    if (!name) continue;

    const stock = Number(get(col.stock));
    const reorder = Number(get(col.reorder));
    const priceText = get(col.price);
    const price = priceText === '' ? null : Number(priceText);

    items.push({
      name,
      group: get(col.group) || 'General',
      unit: get(col.unit) || 'pcs',
      stock: Number.isFinite(stock) && stock >= 0 ? stock : 0,
      reorderLevel: Number.isFinite(reorder) && reorder >= 0 ? reorder : 10,
      price: Number.isFinite(price) && price > 0 ? price : null
    });
  }
  return items;
}

function applyInventoryImport(items) {
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  let added = 0;
  let updated = 0;

  items.forEach((item, index) => {
    const existing = inventory.find((entry) => entry.name.toLowerCase() === item.name.toLowerCase());
    if (existing) {
      existing.group = item.group;
      existing.unit = item.unit;
      existing.stock = item.stock;
      existing.reorderLevel = item.reorderLevel;
      existing.price = item.price;
      syncMenuFromInventoryItem(existing);
      logStockIn(existing.name, existing.stock, 'CSV import');
      updated++;
    } else {
      const newItem = { id: Date.now() + index, createdAt: new Date().toISOString(), ...item };
      inventory.push(newItem);
      logStockIn(item.name, item.stock, 'CSV import');
      added++;
    }
  });

  writeToStorage(STORAGE_KEYS.inventory, inventory);
  renderInventoryManager();
  renderMenuManager();
  renderDashboard();
  renderPOS();
  showToast(`Import complete · ${added} added, ${updated} updated.`, 'success');
  logAudit('Inventory import', `${added} added, ${updated} updated`);
}

function syncMenuFromInventoryItem(inventoryItem) {
  const menuItem = getMenuItemForInventory(inventoryItem.id);
  if (!menuItem) return;
  const menu = getFromStorage(STORAGE_KEYS.menu);
  menuItem.name = inventoryItem.name;
  menuItem.category = inventoryItem.group || 'General';
  menuItem.price = inventoryItem.price;
  menuItem.ingredients = [{ name: inventoryItem.name, qty: 1 }];
  writeToStorage(STORAGE_KEYS.menu, menu);
}

function syncInventoryFromMenuItem(menuItem) {
  if (!menuItem.sourceInventoryId) return;
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  const inventoryItem = inventory.find((entry) => entry.id === menuItem.sourceInventoryId);
  if (!inventoryItem) return;
  inventoryItem.name = menuItem.name;
  inventoryItem.group = menuItem.category || 'General';
  inventoryItem.price = menuItem.price;
  writeToStorage(STORAGE_KEYS.inventory, inventory);
}

const INVENTORY_AVATAR_COLORS = [
  ['#f4f4f5', '#18181b'],
  ['#ececef', '#27272a'],
  ['#e4e4e7', '#3f3f46'],
  ['#f4f4f5', '#52525b'],
  ['#ececef', '#18181b'],
  ['#e4e4e7', '#27272a'],
];

function avatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return INVENTORY_AVATAR_COLORS[hash % INVENTORY_AVATAR_COLORS.length];
}

function getExpiryBadge(item) {
  if (!item.expiryDate) return '<span class="muted">—</span>';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(item.expiryDate + 'T00:00:00');
  if (expiry < today) return `<span class="expiry-badge expired">Expired</span>`;
  const soon = new Date(today);
  soon.setDate(soon.getDate() + 3);
  if (expiry <= soon) return `<span class="expiry-badge near">${expiry.toLocaleDateString()}</span>`;
  return `<span class="expiry-badge">${expiry.toLocaleDateString()}</span>`;
}

function renderInventoryManager() {
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  renderInventorySummary();
  renderVoidedReturns();

  const inventoryQuery = (document.getElementById('inventory-search')?.value || '').trim().toLowerCase();
  const flatItems = inventory.slice().sort((a, b) => {
    const groupA = (a.group || 'General').toLowerCase();
    const groupB = (b.group || 'General').toLowerCase();
    return groupA.localeCompare(groupB) || a.name.localeCompare(b.name);
  }).filter((item) => {
    if (inventoryFilter === 'returned' && !item.returnedFromLeftover) return false;
    if (!inventoryQuery) return true;
    return (item.name || '').toLowerCase().includes(inventoryQuery)
      || (item.group || '').toLowerCase().includes(inventoryQuery)
      || (item.barcode || '').toLowerCase().includes(inventoryQuery)
      || (item.sku || '').toLowerCase().includes(inventoryQuery);
  });
  const totalPages = Math.max(1, Math.ceil(flatItems.length / LIST_PAGE_SIZE));
  if (inventoryPage > totalPages) inventoryPage = totalPages;
  const pageItems = flatItems.slice((inventoryPage - 1) * LIST_PAGE_SIZE, inventoryPage * LIST_PAGE_SIZE);

  const grouped = pageItems.reduce((acc, item) => {
    const group = item.group || 'General';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
const groups = Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));

  document.getElementById('inventory-list').innerHTML = `
<div class="inventory-toolbar">
      <label class="check-all">
        <input type="checkbox" id="inventory-check-all" onchange="toggleInventoryCheckAll()" />
        <span>Mark all</span>
      </label>
      <span class="selected-count" id="inventory-selected-count">0 selected</span>
      <div class="inventory-filters">
        <button class="inv-filter-btn ${inventoryFilter === 'all' ? 'active' : ''}" onclick="setInventoryFilter('all')">All</button>
        <button class="inv-filter-btn returned ${inventoryFilter === 'returned' ? 'active' : ''}" onclick="setInventoryFilter('returned')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
          Returned
        </button>
      </div>
      <div class="toolbar-actions">
        <button class="action-btn mark-btn push" onclick="pushMarkedToMenu()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
<span>Push to front store</span>
        </button>
        <button class="action-btn mark-btn remove" onclick="unpushMarkedFromMenu()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M6 7h12l-1.5 12.5h-9z"/><path d="M9 10.5v5M12 10.5v5M15 10.5v5"/></svg>
<span>Remove from front store</span>
        </button>
        <button class="action-btn mark-btn danger" onclick="requestMarkedDelete()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6.5h16"/><path d="M9 6.5V4.5h6v2"/><path d="M6 6.5l.8 13h10.4l.8-13"/><path d="M10 10.5v5.5M14 10.5v5.5"/></svg>
          <span>Delete marked</span>
        </button>
        <button class="action-btn mark-btn" onclick="printBarcodeLabels()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7v10"/><path d="M8 7v10"/><path d="M12 7v10"/><path d="M16 7v6"/><path d="M16 16v1"/><path d="M20 7v10"/></svg>
          <span>Print labels</span>
        </button>
      </div>
    </div>
    ${groups.length
      ? groups.map(([group, items]) => `
        <div class="inventory-group">
          <div class="inventory-group-head">
            <div class="inventory-group-title">
              <span class="group-dot"></span>
              <strong>${group}</strong>
            </div>
            <span class="group-count">${items.length} product${items.length === 1 ? '' : 's'}</span>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th class="check-col"></th>
                  <th>Name</th>
                  <th>Unit</th>
                  <th>Stock</th>
                  <th>Expiry</th>
                  <th>Price</th>
                  <th>Menu</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${items.map((item) => {
                  const menuItem = getMenuItemForInventory(item.id);
                  const low = item.stock <= item.reorderLevel;
                  const critical = item.reorderLevel > 0 && item.stock <= Math.max(1, Math.floor(item.reorderLevel / 2));
                  const [avatarBg, avatarFg] = avatarColor(item.name);
                  const barPct = item.reorderLevel > 0 ? Math.min(Math.round((item.stock / (item.reorderLevel * 3)) * 100), 100) : null;
                  const stockClass = critical ? 'critical' : low ? 'low' : '';
                  return `
                    <tr class="${low ? 'row-warn' : ''}">
                      <td class="check-col"><input type="checkbox" class="inventory-check" value="${item.id}" onchange="updateInventorySelection()" /></td>
                      <td>
                        <div class="inv-item">
                          <span class="inv-avatar" style="background:${avatarBg};color:${avatarFg}">${item.name.charAt(0).toUpperCase()}</span>
                          <div class="inv-item-text">
                            <strong>${item.name}${item.returnedFromLeftover ? ' <span class="returned-tag">Returned</span>' : ''}</strong>
                            <span>${item.id < 0 ? 'Imported' : ''}</span>
                          </div>
                        </div>
                      </td>
                      <td><span class="unit-pill">${item.unit}</span></td>
                      <td>
                        <div class="stock-cell">
                          <span class="stock-badge ${stockClass}">${item.stock}</span>
                          ${barPct === null ? '' : `<span class="stock-bar ${stockClass}"><i style="width:${barPct}%"></i></span>`}
                        </div>
                      </td>
                      <td>${getExpiryBadge(item)}</td>
                      <td class="price-cell">${item.price ? formatCurrency(item.price) : '<span class="muted">—</span>'}</td>
                      <td>${menuItem ? '<span class="menu-status on"><i></i>On Store</span>' : '<span class="menu-status off"><i></i>Not pushed</span>'}</td>
                      <td>
                        <div class="row-actions">
                          <button class="table-action edit" onclick="openInventoryEdit(${item.id})" title="Edit">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                            <span>Edit</span>
                          </button>
                          <button class="table-action ${menuItem ? 'remove' : 'push'}" onclick="togglePushToMenu(${item.id})" title="${menuItem ? 'Remove from menu' : 'Push to menu'}">
                            ${menuItem
                              ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h2l2.4 12.2a1 1 0 0 0 1 .8h7.3a1 1 0 0 0 1-.8L19 9H6.4"/><circle cx="9.5" cy="20" r="1.3"/><circle cx="17.5" cy="20" r="1.3"/></svg><span>Remove from menu</span>'
                              : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h2l2.4 12.2a1 1 0 0 0 1 .8h7.3a1 1 0 0 0 1-.8L19 9H6.4"/><circle cx="9.5" cy="20" r="1.3"/><circle cx="17.5" cy="20" r="1.3"/><path d="M12.5 7V3"/><path d="M10.5 5h4"/></svg><span>Push to menu</span>'}
                          </button>
                          <button class="table-action danger" onclick="requestInventoryDelete(${item.id})" title="Delete">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6.5h16"/><path d="M9 6.5V4.5h6v2"/><path d="M6 6.5l.8 13h10.4l.8-13"/><path d="M10 10.5v5.5M14 10.5v5.5"/></svg>
                            <span>Delete</span>
                          </button>
                          <button class="table-action" onclick="printItemLabel(${item.id})" title="Print barcode label">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7v10"/><path d="M8 7v10"/><path d="M12 7v10"/><path d="M16 7v6"/><path d="M16 16v1"/><path d="M20 7v10"/></svg>
                            <span>Label</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `).join('')
      : '<div class="list-row"><div>No inventory items yet.</div></div>'}
  `;
  renderListPagination('inventory-pagination', inventoryPage, totalPages, flatItems.length, 'changeInventoryPage', 'goToInventoryPage');
}

function toggleInventoryCheckAll() {
  const all = document.getElementById('inventory-check-all');
  inventoryMarkAll = all.checked;
  document.querySelectorAll('.inventory-check').forEach((checkbox) => {
    checkbox.checked = all.checked;
  });
  updateInventorySelection();
}

function updateInventorySelection() {
  const checkboxes = document.querySelectorAll('.inventory-check');
  const count = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;
  const selectedCountEl = document.getElementById('inventory-selected-count');
  if (selectedCountEl) {
    if (inventoryMarkAll) {
      const total = getFromStorage(STORAGE_KEYS.inventory).length;
      selectedCountEl.textContent = `${total} selected`;
    } else {
      selectedCountEl.textContent = `${count} selected`;
    }
  }

  const all = document.getElementById('inventory-check-all');
  if (all) all.checked = inventoryMarkAll || (checkboxes.length > 0 && count === checkboxes.length);
}

function getMarkedInventoryIds() {
  if (inventoryMarkAll) {
    return getFromStorage(STORAGE_KEYS.inventory).map((item) => item.id);
  }
  return Array.from(document.querySelectorAll('.inventory-check:checked')).map((checkbox) => Number(checkbox.value));
}

function addToMenuFromInventory(item) {
  const menu = getFromStorage(STORAGE_KEYS.menu);
  let id = Date.now();
  while (menu.some((entry) => entry.id === id)) {
    id += 1;
  }
  menu.push({
    id,
    name: item.name,
    category: item.group || 'General',
    price: item.price,
    barcode: '',
    sourceInventoryId: item.id,
    createdAt: new Date().toISOString(),
    ingredients: [{ name: item.name, qty: 1 }]
  });
  writeToStorage(STORAGE_KEYS.menu, menu);
}

function removeMenuForInventory(id) {
  const existing = getMenuItemForInventory(id);
  if (!existing) return;
  const menu = getFromStorage(STORAGE_KEYS.menu).filter((entry) => entry.id !== existing.id);
  writeToStorage(STORAGE_KEYS.menu, menu);
}

function removeMenuItemsForDeletedInventory(deletedItems) {
  if (!deletedItems.length) return;
  const deletedNames = deletedItems.map((item) => String(item.name || '').toLowerCase());
  const menu = getFromStorage(STORAGE_KEYS.menu);
  const keptMenu = menu.filter((menuItem) => {
    const linked = deletedItems.some((item) => String(item.id) === String(menuItem.sourceInventoryId));
    if (linked) return false;
    if (deletedNames.includes(String(menuItem.name || '').toLowerCase())) return false;
    const usesDeleted = (menuItem.ingredients || []).some((ingredient) =>
      deletedNames.includes(String(ingredient.name || '').toLowerCase())
    );
    if (usesDeleted) return false;
    return true;
  });
  if (keptMenu.length !== menu.length) writeToStorage(STORAGE_KEYS.menu, keptMenu);
}

function clearReturnedFlag(itemId) {
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  const item = inventory.find((entry) => entry.id === itemId);
  if (!item) return;
  item.returnedFromLeftover = false;
  item.returnedAt = null;
  item.returnedQty = null;
  writeToStorage(STORAGE_KEYS.inventory, inventory);
}

function pushMarkedToMenu() {
  const ids = getMarkedInventoryIds();
  if (!ids.length) {
    showToast('No items marked. Use the checkboxes to mark products first.', 'error');
    return;
  }

  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  let added = 0;
  let skippedNoPrice = [];
  let skippedOnMenu = 0;

  ids.forEach((id) => {
    const item = inventory.find((entry) => entry.id === id);
    if (!item) return;
    if (getMenuItemForInventory(id)) {
      clearReturnedFlag(id);
      skippedOnMenu++;
      return;
    }
    if (!item.price || item.price <= 0) {
      skippedNoPrice.push(item.name);
      return;
    }
    addToMenuFromInventory(item);
    clearReturnedFlag(id);
    added++;
  });

  renderInventoryManager();
  renderMenuManager();
  renderPOS();

  let message = `Added ${added} item(s) to the menu.`;
  if (skippedOnMenu) message += `\n${skippedOnMenu} already on the menu (skipped).`;
  if (skippedNoPrice.length) message += `\nNo price set — skipped: ${skippedNoPrice.join(', ')}.`;
  showToast(message, 'success');
  logAudit('Menu push', message.replace(/\n/g, ' · '));
}

function unpushMarkedFromMenu() {
  const ids = getMarkedInventoryIds();
  if (!ids.length) {
    showToast('No items marked.', 'error');
    return;
  }

  let removed = 0;
  ids.forEach((id) => {
    if (getMenuItemForInventory(id)) {
      removeMenuForInventory(id);
      removed++;
    }
  });

  renderInventoryManager();
  renderMenuManager();
  renderPOS();
  showToast(`Removed ${removed} item(s) from the menu.`, 'success');
}

function togglePushToMenu(id) {
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  const item = inventory.find((entry) => entry.id === id);
  if (!item) return;

  const existing = getMenuItemForInventory(id);

  if (existing) {
    removeMenuForInventory(id);
    renderInventoryManager();
    renderMenuManager();
    renderPOS();
    logAudit('Menu push removed', item.name);
    return;
  }

  if (!item.price || item.price <= 0) {
    showToast(`Set a price for "${item.name}" before pushing it to the menu.`, 'error');
    return;
  }

  addToMenuFromInventory(item);
  clearReturnedFlag(id);
  renderInventoryManager();
  renderMenuManager();
  renderPOS();
  logAudit('Menu push', item.name);
}

function renderOrdersManager() {
  const sales = getFromStorage(STORAGE_KEYS.sales);
  const menu = getFromStorage(STORAGE_KEYS.menu);

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalItems = sales.reduce((sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.qty, 0), 0);
  const averageOrder = sales.length ? totalRevenue / sales.length : 0;

  const statCards = [
    { label: 'Total revenue', value: formatCurrency(totalRevenue) },
    { label: 'Orders', value: sales.length },
    { label: 'Items sold', value: totalItems },
    { label: 'Average order', value: formatCurrency(averageOrder) }
  ];

  document.getElementById('orders-stats').innerHTML = statCards.map((stat) => `
    <div class="stat-card">
      <div class="stat-label">${stat.label}</div>
      <div class="stat-value">${stat.value}</div>
    </div>
  `).join('');

  const itemTotals = {};
  sales.forEach((sale) => {
    sale.items.forEach((item) => {
      itemTotals[item.name] = (itemTotals[item.name] || 0) + item.qty;
    });
  });
  const topItems = Object.entries(itemTotals).sort((a, b) => b[1] - a[1]).slice(0, 6);

  document.getElementById('top-items-list').innerHTML = topItems.length
    ? topItems.map(([name, qty], index) => `
      <div class="list-row">
        <div class="top-item">
          <span class="rank">${index + 1}</span>
          <div>${name}</div>
        </div>
        <strong>${qty} sold</strong>
      </div>
    `).join('')
    : '<div class="list-row"><div>No sales yet</div><span class="badge info">New</span></div>';

  const categoryTotals = {};
  sales.forEach((sale) => {
    sale.items.forEach((item) => {
      if (item.voided) return;
      let menuItem = menu.find((entry) => entry.id === item.id)
        || menu.find((entry) => entry.name.toLowerCase() === (item.name || '').toLowerCase());
      let category = menuItem ? menuItem.category : null;
      if (!category && item.id > 0) {
        const stock = getFromStorage(STORAGE_KEYS.inventory).find((entry) => entry.id === item.id);
        category = stock ? (stock.group || 'General') : null;
      }
      if (!category) return;
      categoryTotals[category] = (categoryTotals[category] || 0) + item.qty * item.price;
    });
  });
  const categories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]).slice(0, 6);

  document.getElementById('orders-category-list').innerHTML = categories.length
    ? categories.map(([name, value]) => {
        const percent = totalRevenue ? Math.round((value / totalRevenue) * 100) : 0;
        return `
          <div class="list-row">
            <div>${name}</div>
            <strong>${formatCurrency(value)} <span class="muted-pct">${percent}%</span></strong>
          </div>
        `;
      }).join('')
    : '<div class="list-row"><div>No sales yet</div><span class="badge info">New</span></div>';

  const colSpan = 8;

  const reversedSales = sales.slice().reverse();
  const orderTotalPages = Math.max(1, Math.ceil(reversedSales.length / LIST_PAGE_SIZE));
  if (ordersPage > orderTotalPages) ordersPage = orderTotalPages;
  const pageSales = reversedSales.slice((ordersPage - 1) * LIST_PAGE_SIZE, ordersPage * LIST_PAGE_SIZE);

  document.getElementById('orders-list').innerHTML = `
    <table class="orders-table">
      <thead>
        <tr>
          <th class="expand-col"></th>
          <th>Invoice</th>
          <th>Time</th>
          <th>Cashier</th>
          <th>Payment</th>
          <th class="num">Items</th>
          <th class="num">Total</th>
          <th class="num">Action</th>
        </tr>
      </thead>
      <tbody>
        ${pageSales.length ? pageSales.map((sale) => {
          const activeQty = sale.items.filter((item) => !item.voided).reduce((sum, item) => sum + item.qty, 0);
          const hasVoid = sale.hasVoid || (sale.items || []).some((item) => item.voided);
          const open = openOrderIds.has(sale.id);
          const voidBtn = canVoid() && !sale.savedOnly
            ? `<button class="table-action danger" onclick="openVoidModal(${sale.id})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6.5h16"/><path d="M9 6.5V4.5h6v2"/><path d="M6 6.5l.8 13h10.4l.8-13"/><path d="M10 10.5v5.5M14 10.5v5.5"/></svg>
                <span>Void</span>
              </button>`
            : '';
          const receiptBtn = !sale.savedOnly
            ? `<button class="table-action" onclick="printReceipt(${sale.id})" title="Reprint receipt">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2.5h12V21l-3-1.5L12 21l-3-1.5L6 21z"/><path d="M9 7h6M9 10h6"/></svg>
                <span>Receipt</span>
              </button>`
            : '';
          const sendBtn = !sale.savedOnly && getFeature('receipts')
            ? `<button class="table-action" onclick="sendReceipt(${sale.id})" title="Send receipt via WhatsApp / email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                <span>Send</span>
              </button>`
            : '';
          const refundBtn = canVoid() && !sale.savedOnly && !sale.refunded
            ? `<button class="table-action danger refund" onclick="requestRefund(${sale.id})" title="Refund order">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
                <span>Refund</span>
              </button>`
            : '';
          const payment = (sale.payments || []).map((payment) => payment.method).join(' + ') || (sale.savedOnly ? 'Saved' : '—');
          const itemsHtml = (sale.items || []).map((item) => {
            if (item.voided) {
              return `
                <div class="order-item voided">
                  <span class="item-dot"></span>
                  <span class="item-name"><s>${item.name}</s></span>
                  <span class="item-qty">×${item.qty}</span>
                  <span class="item-line">${formatCurrency(item.price * item.qty)}</span>
                  <span class="void-tag">Voided</span>
                </div>
              `;
            }
            return `
              <div class="order-item">
                <span class="item-dot"></span>
                <span class="item-name">${item.name}${item.options && item.options.length ? `<small class="order-item-options">${item.options.map((option) => option.label).join(', ')}</small>` : ''}${item.note ? `<small class="order-item-options">📝 ${escapeHtml(item.note)}</small>` : ''}</span>
                <span class="item-qty">×${item.qty}</span>
                <span class="item-line">${formatCurrency(((Number(item.price) || 0) + (Number(item.optionsPrice) || 0)) * item.qty)}</span>
                ${canVoid() && !sale.savedOnly ? `<button class="void-line-btn" onclick="openVoidModal(${sale.id})">Void</button>` : ''}
              </div>
            `;
          }).join('');
          return `
            <tr class="order-row ${open ? 'open' : ''} ${hasVoid ? 'has-void' : ''}">
              <td class="expand-col">
                <button class="expand-btn" onclick="toggleOrderDetails(${sale.id})" title="Toggle products">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
                </button>
              </td>
              <td>
                <span class="invoice-chip">#${sale.invoice}</span>
                ${sale.table ? `<span class="status-tag table">Table ${escapeHtml(sale.table)}</span>` : ''}
                ${sale.orderType && sale.orderType !== 'dinein' ? `<span class="status-tag ${sale.orderType}">${sale.orderType.charAt(0).toUpperCase() + sale.orderType.slice(1)}</span>` : ''}
                ${sale.branch ? `<span class="status-tag branch">${escapeHtml(sale.branch)}</span>` : ''}
                ${hasVoid ? '<span class="status-tag voided">Voided</span>' : ''}
              </td>
              <td class="order-time">${new Date(sale.createdAt).toLocaleString()}</td>
              <td>${sale.cashier || '—'}</td>
              <td><span class="pay-pill">${payment}</span></td>
              <td class="num"><span class="qty-badge">${activeQty}</span></td>
              <td class="num order-total">${formatCurrency(sale.total)}</td>
              ${canVoid() ? `<td><div class="row-actions">${receiptBtn}${sendBtn}${voidBtn}${refundBtn}</div></td>` : `<td><div class="row-actions">${receiptBtn}${sendBtn}</div></td>`}
            </tr>
            ${open ? `<tr class="order-detail-row"><td colspan="${colSpan}"><div class="order-detail">${itemsHtml || '<div class="order-item"><span class="muted">No products in this order.</span></div>'}</div></td></tr>` : ''}
          `;
        }).join('') : `<tr class="empty-row"><td colspan="${colSpan}"><div class="report-empty">No orders recorded.</div></td></tr>`}
      </tbody>
    </table>
  `;
  renderListPagination('orders-pagination', ordersPage, orderTotalPages, reversedSales.length, 'changeOrdersPage', 'goToOrdersPage');
}

let openOrderIds = new Set();

function toggleOrderDetails(saleId) {
  if (openOrderIds.has(saleId)) openOrderIds.delete(saleId);
  else openOrderIds.add(saleId);
  renderOrdersManager();
}

let voidTargetSaleId = null;

function openVoidModal(saleId) {
  if (!canVoid()) return;
  const sales = getFromStorage(STORAGE_KEYS.sales);
  const sale = sales.find((entry) => entry.id === saleId);
  if (!sale) return;
  voidTargetSaleId = saleId;
  const items = sale.items.filter((item) => !item.voided);
  document.getElementById('void-modal-hint').textContent = `Invoice #${sale.invoice} · Select the product(s) sold by mistake. Voiding returns the product to the store as a pending return — it will be restocked once you return it.`;
  document.getElementById('sale-void-list').innerHTML = items.length
    ? items.map((item) => {
        const actualIndex = sale.items.indexOf(item);
        return `
          <div class="list-row">
            <div>
              <div>${item.name} ×${item.qty}</div>
              <small>${formatCurrency(item.price * item.qty)}</small>
            </div>
            <div class="row-actions">
              <button class="action-btn danger" onclick="requestVoidAuth(${sale.id}, ${actualIndex})">Void</button>
            </div>
          </div>
        `;
      }).join('')
    : '<div class="list-row"><div>All items in this sale have already been voided.</div></div>';
  document.getElementById('sale-void-modal').classList.remove('hidden');
}

function closeVoidModal() {
  document.getElementById('sale-void-modal').classList.add('hidden');
  voidTargetSaleId = null;
}

let pendingVoidAction = null;

function requestVoidAuth(saleId, itemIndex) {
  if (!canVoid()) return;
  pendingVoidAction = { saleId, itemIndex };
  document.getElementById('void-auth-error').textContent = '';
  document.getElementById('void-auth-password').value = '';
  document.getElementById('void-auth-modal').classList.remove('hidden');
  document.getElementById('void-auth-password').focus();
}

function closeVoidAuthModal() {
  document.getElementById('void-auth-modal').classList.add('hidden');
  pendingVoidAction = null;
}

function confirmVoidAuth() {
  const entered = document.getElementById('void-auth-password').value.trim();
  if (!entered) {
    document.getElementById('void-auth-error').textContent = 'Enter the admin password.';
    return;
  }
  const users = getFromStorage(STORAGE_KEYS.users);
  const authorized = users.some((user) => user.role === 'admin' && user.password === entered)
    || (currentUser && currentUser.password === entered);
  if (!authorized) {
    document.getElementById('void-auth-error').textContent = 'Incorrect admin password.';
    logAudit('Void blocked', 'Incorrect admin password entered by ' + (currentUser ? currentUser.name : 'User'));
    return;
  }
  const action = pendingVoidAction;
  pendingVoidAction = null;
  document.getElementById('void-auth-modal').classList.add('hidden');
  voidSaleItem(action.saleId, action.itemIndex);
}

function voidSaleItem(saleId, itemIndex) {
  if (!canVoid()) return;
  const sales = getFromStorage(STORAGE_KEYS.sales);
  const sale = sales.find((entry) => entry.id === saleId);
  if (!sale) return;
  const item = sale.items[itemIndex];
  if (!item || item.voided) return;

  item.voided = true;
  item.voidedAt = new Date().toISOString();
  item.voidedBy = currentUser.name;

  const rate = getTaxRate();
  const activeItems = sale.items.filter((entry) => !entry.voided);
  const rawSubtotal = activeItems.reduce((sum, entry) => sum + entry.price * entry.qty, 0);
  const promoAmt = sale.promo ? computeDealValue(sale.promo, rawSubtotal, activeItems) : 0;
  const discAmt = sale.discount ? computeDealValue(sale.discount, rawSubtotal, activeItems) : 0;
  const discountTotal = promoAmt + discAmt;
  sale.discountTotal = discountTotal;
  if (sale.promo) sale.promo = { ...sale.promo, amount: promoAmt };
  if (sale.discount) sale.discount = { ...sale.discount, amount: discAmt };
  sale.subtotal = Math.max(0, rawSubtotal - discountTotal);
  sale.tax = sale.subtotal * (rate / 100);
  sale.total = sale.subtotal + sale.tax;
  sale.hasVoid = true;

  const voids = getFromStorage(STORAGE_KEYS.voids);
  let id = Date.now();
  while (voids.some((entry) => entry.id === id)) id += 1;
  voids.push({
    id,
    saleId,
    invoice: sale.invoice,
    itemId: item.id,
    itemName: item.name,
    qty: item.qty,
    unitPrice: item.price,
    total: item.price * item.qty,
    cashier: sale.cashier,
    voidedBy: currentUser.name,
    createdAt: new Date().toISOString(),
    status: 'pending'
  });

  writeToStorage(STORAGE_KEYS.sales, sales);
  writeToStorage(STORAGE_KEYS.voids, voids);
  logAudit('Void', `Voided ${item.qty}× ${item.name} (${formatCurrency(item.price * item.qty)}) from Invoice #${sale.invoice} by ${sale.cashier}`);
  openVoidModal(saleId);
  renderOrdersManager();
  renderVoidedReturns();
  showToast(`${item.qty}× ${item.name} voided. Product returned to the store as a pending return.`, 'success');
}

function renderVoidedReturns() {
  const container = document.getElementById('voided-returns-list');
  const card = document.getElementById('voided-returns-card');
  if (!container) return;
  const voids = getFromStorage(STORAGE_KEYS.voids).filter((record) => record.status === 'pending');
  if (card) card.classList.toggle('hidden', !canVoid() || !voids.length);
  container.innerHTML = voids.length
    ? voids.map((record) => `
        <div class="list-row">
          <div>
            <div>${record.itemName} ×${record.qty}</div>
            <small>Invoice #${record.invoice} · voided by ${record.voidedBy}</small>
          </div>
          <div class="row-actions">
            <button class="action-btn danger" onclick="returnVoidedItem(${record.id})">Return to stock</button>
          </div>
        </div>
      `).join('')
    : '';
}

function returnVoidedItem(voidId) {
  if (!canVoid()) return;
  const voids = getFromStorage(STORAGE_KEYS.voids);
  const record = voids.find((entry) => entry.id === voidId);
  if (!record || record.status !== 'pending') return;

  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  const menu = getFromStorage(STORAGE_KEYS.menu);
  const menuItem = menu.find((entry) => entry.id === record.itemId);

  if (menuItem && menuItem.ingredients && menuItem.ingredients.length) {
    menuItem.ingredients.forEach((ingredient) => {
      const row = inventory.find((entry) => entry.name.toLowerCase() === ingredient.name.toLowerCase());
      if (row) row.stock += ingredient.qty * record.qty;
    });
  } else {
    const row = inventory.find((entry) => entry.name.toLowerCase() === record.itemName.toLowerCase());
    if (row) row.stock += record.qty;
  }

  record.status = 'returned';
  record.returnedAt = new Date().toISOString();
  record.returnedBy = currentUser.name;

  writeToStorage(STORAGE_KEYS.inventory, inventory);
  writeToStorage(STORAGE_KEYS.voids, voids);
  logAudit('Void returned', `Returned ${record.qty}× ${record.itemName} (${formatCurrency(record.total)}) to store stock from Invoice #${record.invoice}`);
  renderVoidedReturns();
  renderInventoryManager();
  renderOrdersManager();
  showToast(`${record.qty}× ${record.itemName} returned to stock.`, 'success');
  checkLowStockNotification(false);
}

let reportTab = 'sales';
let reportPeriod = 'all';
let reportFrom = null;
let reportTo = null;
let reportPage = 1;
let reportSearch = '';
let reportViews = {};
const REPORT_PAGE_SIZE = 15;
let inventoryPage = 1;
let inventoryFilter = 'all';
let menuPage = 1;
let ordersPage = 1;
let auditPage = 1;
let leftoverPage = 1;
const LIST_PAGE_SIZE = 15;
let inventoryMarkAll = false;

function getPeriodDateRange(period) {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const start = new Date(end);
  if (period === 'today') start.setHours(0, 0, 0, 0);
  else if (period === '7d') start.setDate(start.getDate() - 6);
  else if (period === '30d') start.setDate(start.getDate() - 29);
  else start.setFullYear(2000);
  return { start, end };
}

function getSaleTax(sale) {
  if (Number.isFinite(sale.tax)) return sale.tax;
  const rate = getTaxRate();
  return rate > 0 ? sale.total * rate / (100 + rate) : 0;
}

function getReportDateRange() {
  if (reportFrom && reportTo) {
    return {
      start: new Date(reportFrom + 'T00:00:00'),
      end: new Date(reportTo + 'T23:59:59.999'),
      custom: true
    };
  }
  const { start, end } = getPeriodDateRange(reportPeriod);
  return { start, end, custom: false };
}

function getRangeLabel() {
  const { start, end, custom } = getReportDateRange();
  if (custom) return `${start.toLocaleDateString()} – ${end.toLocaleDateString()}`;
  if (reportPeriod === 'today') return 'Today';
  if (reportPeriod === '7d') return 'Last 7 days';
  if (reportPeriod === '30d') return 'Last 30 days';
  return 'All time';
}

function filterSalesByDate(sales) {
  const { start, end } = getReportDateRange();
  return sales.filter((sale) => {
    const created = new Date(sale.createdAt);
    return created >= start && created <= end;
  });
}

function setReportPeriod(period) {
  reportPeriod = period;
  reportFrom = null;
  reportTo = null;
  reportPage = 1;
  localStorage.setItem(STORAGE_KEYS.reportPeriod, period);
  document.getElementById('report-date-from').value = '';
  document.getElementById('report-date-to').value = '';
  document.querySelectorAll('#report-period-switch .period-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.period === period);
  });
  renderReports();
}

function applyReportFilter() {
  reportFrom = document.getElementById('report-date-from').value || null;
  reportTo = document.getElementById('report-date-to').value || null;
  if (!reportFrom && !reportTo) {
    reportFrom = null;
    reportTo = null;
  }
  reportPage = 1;
  document.querySelectorAll('#report-period-switch .period-btn').forEach((button) => {
    button.classList.remove('active');
  });
  renderReports();
}

function resetReportFilter() {
  reportPeriod = 'all';
  reportFrom = null;
  reportTo = null;
  reportPage = 1;
  localStorage.setItem(STORAGE_KEYS.reportPeriod, 'all');
  document.getElementById('report-date-from').value = '';
  document.getElementById('report-date-to').value = '';
  document.querySelectorAll('#report-period-switch .period-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.period === 'all');
  });
  renderReports();
}

function setReportTab(tab) {
  reportTab = tab;
  reportPage = 1;
  localStorage.setItem(STORAGE_KEYS.reportTab, tab);
  document.querySelectorAll('.report-tab').forEach((button) => {
    button.classList.toggle('active', button.dataset.report === tab);
  });
  renderReports();
}

const FEATURE_REPORT_TABS = {
  tables: 'tables',
  kitchen: 'kitchen',
  delivery: 'delivery',
  modifiers: 'modifiers',
  tips: 'tips',
  reorder: 'purchaseorders',
  branches: 'branches',
  receipts: 'receipts'
};

const BASE_REPORT_TABS = ['sales', 'invoice', 'summary', 'analysis', 'inventory', 'menu', 'orders', 'tax', 'payments', 'stock', 'products', 'daily', 'transactions', 'customers', 'refunds', 'purchases', 'closings', 'price', 'shift', 'void', 'leftover', 'promos', 'bookorders'];

function getActiveReportTabs() {
  const features = getFeatures();
  return [...BASE_REPORT_TABS, ...FEATURE_DEFS.map((def) => features[def.key] ? FEATURE_REPORT_TABS[def.key] : null).filter(Boolean)];
}

function renderReportTabs() {
  const active = getActiveReportTabs();
  const allowed = getRolePanels();
  document.querySelectorAll('.report-tab').forEach((button) => {
    const tab = button.dataset.report;
    button.classList.toggle('hidden', !active.includes(tab) || (currentUser && !allowed.includes('reports')));
  });
  if (currentUser && !active.includes(reportTab) && !BASE_REPORT_TABS.includes(reportTab)) {
    setReportTab('sales');
  }
}

function isFeatureReportTab(tab) {
  return Object.values(FEATURE_REPORT_TABS).includes(tab);
}

function setReportSearch(value) {
  reportSearch = String(value || '');
  reportPage = 1;
  renderReports();
}

const REPORT_VIEW_OPTIONS = {
  sales: [
    { value: 'text', label: 'Text / table' },
    { value: 'cashier', label: 'Graph — by cashier' },
    { value: 'total', label: 'Graph — by total' }
  ]
};

function getReportViewOptions() {
  return REPORT_VIEW_OPTIONS[reportTab] || [
    { value: 'text', label: 'Text / table' },
    { value: 'graph', label: 'Graph' }
  ];
}

function getReportView() {
  return reportViews[reportTab] || 'text';
}

function setReportView(value) {
  const valid = getReportViewOptions().some((option) => option.value === value) ? value : 'text';
  reportViews[reportTab] = valid;
  localStorage.setItem('ff_report_views', JSON.stringify(reportViews));
  renderReports();
}

const REPORT_GRAPH_CONFIGS = {
  sales: {
    cashier: { label: 'Sales by cashier', categoryKey: 'cashier', valueKey: 'total', money: true },
    total: { label: 'Sales by day', categoryKey: 'date', valueKey: 'total', money: true, dateGroup: true }
  },
  invoice: { graph: { label: 'Invoice totals', categoryKey: 'order', valueKey: 'total', money: true } },
  summary: { graph: { label: 'Sales metrics', categoryKey: 'metric', valueKey: 'value', displayKey: 'value', aggregate: false } },
  analysis: { graph: { label: 'Top products by revenue', categoryKey: 'product', valueKey: 'revenue', money: true } },
  inventory: { graph: { label: 'Stock levels', categoryKey: 'name', valueKey: 'stock' } },
  menu: { graph: { label: 'Menu prices', categoryKey: 'name', valueKey: 'price', money: true } },
  orders: { graph: { label: 'Line totals by item', categoryKey: 'item', valueKey: 'lineTotal', money: true } },
  tax: { graph: { label: 'VAT / TAX by product', categoryKey: 'product', valueKey: 'total', money: true } },
  payments: { graph: { label: 'Payment method totals', categoryKey: 'method', valueKey: 'total', money: true } },
  stock: { graph: { label: 'Stock added by product', categoryKey: 'product', valueKey: 'qty' } },
  products: { graph: { label: 'Product sold totals', categoryKey: 'product', valueKey: 'total', money: true } },
  daily: { graph: { label: 'Daily sales', categoryKey: 'date', valueKey: 'total', money: true } },
  transactions: { graph: { label: 'Transactions by day', categoryKey: 'date', valueKey: 'total', money: true } },
  customers: { graph: { label: 'Customer spend', categoryKey: 'name', valueKey: 'spend', money: true } },
  refunds: { graph: { label: 'Refund totals', categoryKey: 'invoice', valueKey: 'total', money: true } },
  purchases: { graph: { label: 'Purchase costs', categoryKey: 'supplier', valueKey: 'totalCost', money: true } },
  closings: { graph: { label: 'Closing totals', categoryKey: 'date', valueKey: 'total', money: true } },
  price: { graph: { label: 'Current prices', categoryKey: 'name', valueKey: 'newPrice', money: true } },
  shift: { graph: { label: 'Shift totals', categoryKey: 'name', valueKey: 'total', money: true } },
  void: { graph: { label: 'Void totals', categoryKey: 'product', valueKey: 'total', money: true } },
  leftover: { graph: { label: 'Leftover quantities', categoryKey: 'product', valueKey: 'qty' } },
  promos: { graph: { label: 'Sale totals (promo)', categoryKey: 'order', valueKey: 'total', money: true } },
  tables: { graph: { label: 'Revenue by table', categoryKey: 'table', valueKey: 'total', money: true } },
  kitchen: { graph: { label: 'Kitchen orders by invoice', categoryKey: 'order', valueKey: 'items' } },
  delivery: { graph: { label: 'Delivery fees by order', categoryKey: 'order', valueKey: 'deliveryFee', money: true } },
  modifiers: { graph: { label: 'Add-on revenue by option', categoryKey: 'option', valueKey: 'extra', money: true } },
  tips: { graph: { label: 'Tips & service charge by order', categoryKey: 'order', valueKey: 'tip', money: true } },
  purchaseorders: { graph: { label: 'Purchase order costs', categoryKey: 'number', valueKey: 'totalCost', money: true } },
  branches: { graph: { label: 'Revenue by branch', categoryKey: 'branch', valueKey: 'total', money: true } },
  receipts: { graph: { label: 'Receipts sent per day', categoryKey: 'date', valueKey: 'count', dateGroup: true } }
};

function getReportGraphConfig(view) {
  const configs = REPORT_GRAPH_CONFIGS[reportTab];
  if (!configs) return null;
  return reportTab === 'sales' ? configs[view] : configs.graph;
}

function parseReportValue(value) {
  if (typeof value === 'number') return value;
  return Number(String(value ?? '').replace(/[^\d.-]/g, '')) || 0;
}

function buildGraphBars(def, view) {
  const config = getReportGraphConfig(view);
  if (!config) return [];
  const map = {};
  const order = [];
  def.rows.forEach((row) => {
    let category = String(row[config.categoryKey] ?? '—');
    if (config.dateGroup) {
      const datePart = category.split(',')[0].trim();
      const parsed = new Date(datePart);
      category = isNaN(parsed.getTime()) ? datePart : parsed.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
    }
    const value = config.displayKey ? row[config.displayKey] : (Number(row[config.valueKey]) || 0);
    if (config.aggregate === false) {
      if (map[category] === undefined) order.push(category);
      map[category] = value;
    } else {
      if (map[category] === undefined) order.push(category);
      map[category] = (map[category] || 0) + (Number(row[config.valueKey]) || 0);
    }
  });
  return order.map((label) => ({ label, value: map[label] })).sort((a, b) => {
    const av = typeof a.value === 'number' ? a.value : 0;
    const bv = typeof b.value === 'number' ? b.value : 0;
    return bv - av;
  });
}

function renderReportGraph(def, view) {
  const container = document.getElementById('report-table');
  const config = getReportGraphConfig(view);
  const bars = buildGraphBars(def, view);

  if (!config || !bars.length) {
    container.innerHTML = `<div class="report-empty">${bars.length === 0 ? 'No data for this report.' : 'No results match your search.'}</div>`;
    return;
  }

  const visible = bars.slice(0, 12);
  const numericValue = (bar) => typeof bar.value === 'number' ? bar.value : parseReportValue(bar.value);
  const maxValue = Math.max(...visible.map(numericValue), 1);

  container.innerHTML = `
    <div class="analysis-graph-wrap">
      <div class="analysis-graph-head">
        <strong>${escapeHtml(config.label)}</strong>
        <span>${bars.length} item(s)</span>
      </div>
      <div class="analysis-bars">
        ${visible.map((bar, index) => {
          const numeric = numericValue(bar);
          const display = config.money ? formatCurrency(bar.value) : (typeof bar.value === 'number' ? Number(bar.value).toLocaleString() : String(bar.value));
          return `
            <div class="analysis-bar-row">
              <div class="analysis-bar-label" title="${escapeHtml(bar.label)}">${escapeHtml(bar.label)}</div>
              <div class="analysis-bar-track">
                <div class="analysis-bar-fill" style="width:${Math.max(numeric / maxValue * 100, 2).toFixed(1)}%; background:${CHART_COLORS[index % CHART_COLORS.length]}"></div>
              </div>
              <div class="analysis-bar-value">${escapeHtml(display)}</div>
            </div>
          `;
        }).join('')}
      </div>
      <p class="analysis-graph-note">Showing top ${visible.length} of ${bars.length} by value.</p>
    </div>
  `;
}

function getFilteredReportDef() {
  const def = buildReport(reportTab);
  const term = String(reportSearch || '').trim().toLowerCase();
  if (!term) return def;
  const rows = def.rows.filter((row) => def.columns.some((column) => String(row[column.key] ?? '').toLowerCase().includes(term)));
  return { ...def, rows };
}

function buildReport(tab) {
  const rangeLabel = getRangeLabel();

  if (tab === 'sales') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales));
    return {
      title: 'Sales report',
      subtitle: `${sales.length} sale(s) · ${rangeLabel}`,
      columns: [
        { key: 'date', label: 'Date' },
        { key: 'order', label: 'Invoice' },
        { key: 'cashier', label: 'Cashier' },
        { key: 'items', label: 'Items' },
        { key: 'subtotal', label: 'Subtotal', money: true },
        { key: 'promo', label: 'Promo', money: true },
        { key: 'discount', label: 'Discount', money: true },
        { key: 'tax', label: 'Tax', money: true },
        { key: 'total', label: 'Total', money: true },
        { key: 'payment', label: 'Payment' }
      ],
      rows: sales.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((sale) => ({
        date: new Date(sale.createdAt).toLocaleString(),
        order: `Invoice #${sale.invoice}`,
        cashier: sale.cashier || '—',
        items: sale.items.reduce((sum, item) => sum + item.qty, 0),
        subtotal: Number.isFinite(sale.subtotal) ? sale.subtotal : sale.total - getSaleTax(sale),
        promo: sale.promo ? (Number(sale.promo.amount) || 0) : 0,
        discount: sale.discount ? (Number(sale.discount.amount) || 0) : 0,
        tax: getSaleTax(sale),
        total: sale.total,
        payment: (sale.payments || []).map((payment) => `${payment.method} ${payment.amount}`).join(' + ') || (sale.savedOnly ? 'Saved' : '—')
      }))
    };
  }

  if (tab === 'invoice') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales)).filter((sale) => !sale.savedOnly);
    const rows = sales.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((sale) => ({
      order: `Invoice #${sale.invoice}`,
      date: new Date(sale.createdAt).toLocaleString(),
      cashier: sale.cashier || '—',
      customer: sale.customerName || '—',
      items: sale.items.reduce((sum, item) => sum + item.qty, 0),
      subtotal: Number.isFinite(sale.subtotal) ? sale.subtotal : sale.total - getSaleTax(sale),
      promo: sale.promo ? (Number(sale.promo.amount) || 0) : 0,
      discount: sale.discount ? (Number(sale.discount.amount) || 0) : 0,
      tax: getSaleTax(sale),
      total: sale.total,
      payment: (sale.payments || []).map((payment) => payment.method).join(' + ') || '—',
      status: 'Paid'
    }));

    const totalItems = rows.reduce((sum, row) => sum + row.items, 0);
    const subtotalSum = rows.reduce((sum, row) => sum + row.subtotal, 0);
    const promoSum = rows.reduce((sum, row) => sum + row.promo, 0);
    const discSum = rows.reduce((sum, row) => sum + row.discount, 0);
    const taxSum = rows.reduce((sum, row) => sum + row.tax, 0);
    const totalSum = rows.reduce((sum, row) => sum + row.total, 0);

    return {
      title: 'Invoicing report',
      subtitle: `${rows.length} invoice(s) · ${rangeLabel}`,
      columns: [
        { key: 'order', label: 'Invoice' },
        { key: 'date', label: 'Date & time' },
        { key: 'cashier', label: 'Cashier' },
        { key: 'customer', label: 'Customer' },
        { key: 'items', label: 'Items' },
        { key: 'subtotal', label: 'Subtotal', money: true },
        { key: 'promo', label: 'Promo', money: true },
        { key: 'discount', label: 'Discount', money: true },
        { key: 'tax', label: 'VAT / TAX', money: true },
        { key: 'total', label: 'Total', money: true },
        { key: 'payment', label: 'Payment' },
        { key: 'status', label: 'Status' }
      ],
      rows,
      totalsLabel: 'Total sales',
      totals: { items: totalItems, subtotal: subtotalSum, promo: promoSum, discount: discSum, tax: taxSum, total: totalSum }
    };
  }

  if (tab === 'summary') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales)).filter((sale) => !sale.savedOnly);
    const revenue = sales.reduce((sum, sale) => sum + sale.total, 0);
    const orders = sales.length;
    const itemsSold = sales.reduce((sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.qty, 0), 0);
    const promoTotal = sales.reduce((sum, sale) => sum + (sale.promo ? (Number(sale.promo.amount) || 0) : 0), 0);
    const discountTotal = sales.reduce((sum, sale) => sum + (sale.discount ? (Number(sale.discount.amount) || 0) : 0), 0);
    const taxTotal = sales.reduce((sum, sale) => sum + getSaleTax(sale), 0);
    const paymentTotals = {};
    sales.forEach((sale) => {
      (sale.payments || []).forEach((payment) => {
        const method = payment.method || 'Other';
        paymentTotals[method] = (paymentTotals[method] || 0) + payment.amount;
      });
    });

    const metricRows = [
      { metric: 'Total revenue', value: formatCurrency(revenue) },
      { metric: 'Total transactions', value: orders },
      { metric: 'Average order value', value: formatCurrency(orders ? revenue / orders : 0) },
      { metric: 'Items sold', value: itemsSold },
      { metric: 'Average items per order', value: orders ? (itemsSold / orders).toFixed(2) : '0' },
      { metric: 'Promos given', value: formatCurrency(promoTotal) },
      { metric: 'Discounts given', value: formatCurrency(discountTotal) },
      { metric: 'VAT / TAX collected', value: formatCurrency(taxTotal) },
      { metric: 'Net sales (after discounts)', value: formatCurrency(revenue - promoTotal - discountTotal) }
    ];
    Object.entries(paymentTotals).sort((a, b) => b[1] - a[1]).forEach(([method, amount]) => {
      metricRows.push({ metric: `Received via ${method}`, value: formatCurrency(amount) });
    });

    return {
      title: 'Summary sales report',
      subtitle: `${orders} transaction(s) · ${rangeLabel}`,
      columns: [
        { key: 'metric', label: 'Metric' },
        { key: 'value', label: 'Value' }
      ],
      rows: metricRows
    };
  }

  if (tab === 'analysis') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales)).filter((sale) => !sale.savedOnly);
    const menu = getFromStorage(STORAGE_KEYS.menu);
    const productTotals = {};
    sales.forEach((sale) => {
      sale.items.forEach((item) => {
        if (item.voided) return;
        if (!productTotals[item.name]) {
          productTotals[item.name] = { itemId: item.id, qty: 0, revenue: 0 };
        }
        productTotals[item.name].qty += item.qty;
        productTotals[item.name].revenue += item.qty * item.price;
      });
    });

    const totalRevenue = Object.values(productTotals).reduce((sum, data) => sum + data.revenue, 0);
    const rows = Object.entries(productTotals).map(([name, data]) => {
      const menuItem = menu.find((entry) => entry.id === data.itemId);
      return {
        product: name,
        category: menuItem ? menuItem.category : 'Other',
        qty: data.qty,
        price: menuItem ? menuItem.price : (data.qty ? data.revenue / data.qty : 0),
        revenue: data.revenue,
        share: totalRevenue ? (data.revenue / totalRevenue * 100) : 0
      };
    }).sort((a, b) => b.revenue - a.revenue).map((row) => ({
      ...row,
      share: `${row.share.toFixed(1)}%`
    }));

    const totalQty = rows.reduce((sum, row) => sum + row.qty, 0);

    return {
      title: 'Sales analysis report',
      subtitle: `${rows.length} product(s) · ${rangeLabel}`,
      columns: [
        { key: 'product', label: 'Product' },
        { key: 'category', label: 'Category' },
        { key: 'qty', label: 'Qty sold' },
        { key: 'price', label: 'Unit price', money: true },
        { key: 'revenue', label: 'Revenue', money: true },
        { key: 'share', label: '% of revenue' }
      ],
      rows,
      totals: { qty: totalQty, revenue: totalRevenue }
    };
  }

  if (tab === 'inventory') {
    const inventory = getFromStorage(STORAGE_KEYS.inventory);
    return {
      title: 'Inventory report',
      subtitle: `${inventory.length} item(s) · current stock levels`,
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'group', label: 'Group' },
        { key: 'unit', label: 'Unit' },
        { key: 'stock', label: 'Stock' },
        { key: 'reorder', label: 'Reorder level' },
        { key: 'price', label: 'Price', money: true },
        { key: 'expiry', label: 'Expiry' },
        { key: 'status', label: 'Status' },
        { key: 'added', label: 'Added' }
      ],
      rows: inventory.slice().sort((a, b) => (a.group || '').localeCompare(b.group || '') || a.name.localeCompare(b.name)).map((item) => ({
        name: item.name,
        group: item.group || 'General',
        unit: item.unit || 'pcs',
        stock: item.stock,
        reorder: item.reorderLevel,
        price: item.price || 0,
        expiry: item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : '—',
        status: item.stock <= item.reorderLevel ? 'Low' : 'OK',
        added: item.createdAt ? new Date(item.createdAt).toLocaleString() : '—'
      }))
    };
  }

  if (tab === 'menu') {
    const menu = getFromStorage(STORAGE_KEYS.menu);
    return {
      title: 'Front store report',
      subtitle: `${menu.length} item(s) · current catalog`,
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'category', label: 'Category' },
        { key: 'price', label: 'Price', money: true },
        { key: 'barcode', label: 'Barcode' },
        { key: 'added', label: 'Added' }
      ],
      rows: menu.slice().sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name)).map((item) => ({
        name: item.name,
        category: item.category,
        price: item.price,
        barcode: item.barcode || '—',
        added: item.createdAt ? new Date(item.createdAt).toLocaleString() : '—'
      }))
    };
  }

  if (tab === 'orders') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales));
    const rows = [];
    sales.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).forEach((sale) => {
      sale.items.forEach((item) => {
        rows.push({
          order: `Invoice #${sale.invoice}`,
          date: new Date(sale.createdAt).toLocaleString(),
          cashier: sale.cashier || '—',
          item: item.name,
          qty: item.qty,
          price: item.price,
          lineTotal: item.qty * item.price
        });
      });
    });
    return {
      title: 'Orders report',
      subtitle: `${rows.length} line item(s) · ${rangeLabel}`,
      columns: [
        { key: 'order', label: 'Invoice' },
        { key: 'date', label: 'Date' },
        { key: 'cashier', label: 'Cashier' },
        { key: 'item', label: 'Item' },
        { key: 'qty', label: 'Qty' },
        { key: 'price', label: 'Price', money: true },
        { key: 'lineTotal', label: 'Line total', money: true }
      ],
      rows
    };
  }

  if (tab === 'tax') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales));
    const productTotals = {};
    sales.forEach((sale) => {
      const saleSubtotal = Number.isFinite(sale.subtotal)
        ? sale.subtotal
        : sale.items.reduce((sum, item) => sum + item.qty * item.price, 0);
      const saleTax = getSaleTax(sale);
      sale.items.forEach((item) => {
        const sub = item.qty * item.price;
        const tax = saleSubtotal > 0 ? (sub / saleSubtotal) * saleTax : 0;
        if (!productTotals[item.name]) {
          productTotals[item.name] = { qty: 0, subtotal: 0, tax: 0 };
        }
        productTotals[item.name].qty += item.qty;
        productTotals[item.name].subtotal += sub;
        productTotals[item.name].tax += tax;
      });
    });

    const rows = Object.entries(productTotals).map(([name, data]) => ({
      product: name,
      qty: data.qty,
      subtotal: data.subtotal,
      tax: data.tax,
      total: data.subtotal + data.tax
    })).sort((a, b) => b.subtotal - a.subtotal);

    const totalQty = rows.reduce((sum, row) => sum + row.qty, 0);
    const subtotalSum = rows.reduce((sum, row) => sum + row.subtotal, 0);
    const taxSum = rows.reduce((sum, row) => sum + row.tax, 0);
    const totalSum = rows.reduce((sum, row) => sum + row.total, 0);

    return {
      title: 'VAT / TAX report',
      subtitle: `${rows.length} product(s) · ${rangeLabel}`,
      columns: [
        { key: 'product', label: 'Product' },
        { key: 'qty', label: 'Qty' },
        { key: 'subtotal', label: 'Subtotal', money: true },
        { key: 'tax', label: 'VAT / TAX', money: true },
        { key: 'total', label: 'Total', money: true }
      ],
      rows,
      totals: { qty: totalQty, subtotal: subtotalSum, tax: taxSum, total: totalSum }
    };
  }

  if (tab === 'payments') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales));
    const methodTotals = {};
    sales.forEach((sale) => {
      (sale.payments || []).forEach((payment) => {
        const method = payment.method || 'Other';
        if (!methodTotals[method]) methodTotals[method] = { count: 0, total: 0 };
        methodTotals[method].count += 1;
        methodTotals[method].total += payment.amount;
      });
    });

    const rows = Object.entries(methodTotals).map(([method, data]) => ({
      method,
      count: data.count,
      total: data.total
    })).sort((a, b) => b.total - a.total);

    const totalCount = rows.reduce((sum, row) => sum + row.count, 0);
    const totalSum = rows.reduce((sum, row) => sum + row.total, 0);

    return {
      title: 'Payments report',
      subtitle: `${rows.length} payment method(s) · ${rangeLabel}`,
      columns: [
        { key: 'method', label: 'Payment method' },
        { key: 'count', label: 'Transactions' },
        { key: 'total', label: 'Total', money: true }
      ],
      rows,
      totals: { count: totalCount, total: totalSum }
    };
  }

  if (tab === 'stock') {
    const stockLog = getFromStorage(STORAGE_KEYS.stockLog);
    const { start, end } = getReportDateRange();
    const filtered = stockLog.filter((entry) => {
      const created = new Date(entry.createdAt);
      return created >= start && created <= end;
    }).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const totalQty = filtered.reduce((sum, entry) => sum + (Number(entry.qtyAdded) || 0), 0);

    return {
      title: 'Stock-in report',
      subtitle: `${filtered.length} stock addition(s) · ${rangeLabel}`,
      columns: [
        { key: 'date', label: 'Date & time' },
        { key: 'product', label: 'Product' },
        { key: 'qty', label: 'Qty added' },
        { key: 'note', label: 'Note' },
        { key: 'user', label: 'Added by' }
      ],
      rows: filtered.map((entry) => ({
        date: new Date(entry.createdAt).toLocaleString(),
        product: entry.itemName,
        qty: Number(entry.qtyAdded) || 0,
        note: entry.note || '—',
        user: entry.user
      })),
      totals: { qty: totalQty }
    };
  }

  if (tab === 'products') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales));
    const menu = getFromStorage(STORAGE_KEYS.menu);
    const productTotals = {};
    sales.forEach((sale) => {
      if (sale.savedOnly) return;
      sale.items.forEach((item) => {
        if (item.voided) return;
        if (!productTotals[item.name]) {
          productTotals[item.name] = { itemId: item.id, qty: 0, price: item.price, total: 0 };
        }
        productTotals[item.name].qty += item.qty;
        productTotals[item.name].price = item.price;
        productTotals[item.name].total += item.qty * item.price;
      });
    });

    const rows = Object.entries(productTotals).map(([name, data]) => {
      const menuItem = menu.find((entry) => entry.id === data.itemId);
      return {
        product: name,
        category: menuItem ? menuItem.category : 'Other',
        qty: data.qty,
        price: data.price,
        total: data.total
      };
    }).sort((a, b) => b.total - a.total);

    const totalQty = rows.reduce((sum, row) => sum + row.qty, 0);
    const totalSum = rows.reduce((sum, row) => sum + row.total, 0);

    return {
      title: 'Product sold report',
      subtitle: `${rows.length} product(s) · ${rangeLabel}`,
      columns: [
        { key: 'product', label: 'Product' },
        { key: 'category', label: 'Category' },
        { key: 'qty', label: 'Qty sold' },
        { key: 'price', label: 'Unit price', money: true },
        { key: 'total', label: 'Total', money: true }
      ],
      rows,
      totals: { qty: totalQty, total: totalSum }
    };
  }

  if (tab === 'daily') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales));
    const daily = {};
    sales.forEach((sale) => {
      if (sale.savedOnly) return;
      const created = new Date(sale.createdAt);
      const dayKey = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, '0')}-${String(created.getDate()).padStart(2, '0')}`;
      const cashier = sale.cashier || 'Unknown';
      const key = `${dayKey}|${cashier}`;
      if (!daily[key]) {
        daily[key] = {
          label: created.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }),
          cashier,
          orders: 0, items: 0, subtotal: 0, tax: 0, total: 0
        };
      }
      const activeItems = sale.items.filter((item) => !item.voided);
      daily[key].orders += 1;
      daily[key].items += activeItems.reduce((sum, item) => sum + item.qty, 0);
      daily[key].subtotal += Number.isFinite(sale.subtotal) ? sale.subtotal : sale.total - getSaleTax(sale);
      daily[key].tax += getSaleTax(sale);
      daily[key].total += sale.total;
    });

    const rows = Object.entries(daily).sort((a, b) => a[0].localeCompare(b[0])).map(([, data]) => ({
      date: data.label,
      cashier: data.cashier,
      orders: data.orders,
      items: data.items,
      subtotal: data.subtotal,
      tax: data.tax,
      total: data.total
    }));

    const totalOrders = rows.reduce((sum, row) => sum + row.orders, 0);
    const totalItems = rows.reduce((sum, row) => sum + row.items, 0);
    const subtotalSum = rows.reduce((sum, row) => sum + row.subtotal, 0);
    const taxSum = rows.reduce((sum, row) => sum + row.tax, 0);
    const totalSum = rows.reduce((sum, row) => sum + row.total, 0);

    return {
      title: 'Daily sales report',
      subtitle: `${rows.length} row(s) · ${rangeLabel}`,
      columns: [
        { key: 'date', label: 'Date' },
        { key: 'cashier', label: 'Cashier' },
        { key: 'orders', label: 'Orders' },
        { key: 'items', label: 'Items sold' },
        { key: 'subtotal', label: 'Subtotal', money: true },
        { key: 'tax', label: 'VAT / TAX', money: true },
        { key: 'total', label: 'Total', money: true }
      ],
      rows,
      totals: { orders: totalOrders, items: totalItems, subtotal: subtotalSum, tax: taxSum, total: totalSum }
    };
  }

  if (tab === 'transactions') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales)).filter((sale) => !sale.savedOnly);
    const daily = {};
    sales.forEach((sale) => {
      const created = new Date(sale.createdAt);
      const dayKey = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, '0')}-${String(created.getDate()).padStart(2, '0')}`;
      if (!daily[dayKey]) {
        daily[dayKey] = {
          label: created.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }),
          transactions: 0, items: 0, total: 0
        };
      }
      daily[dayKey].transactions += 1;
      daily[dayKey].items += sale.items.filter((item) => !item.voided).reduce((sum, item) => sum + item.qty, 0);
      daily[dayKey].total += sale.total;
    });

    const rows = Object.entries(daily).sort((a, b) => a[0].localeCompare(b[0])).map(([, data]) => ({
      date: data.label,
      transactions: data.transactions,
      items: data.items,
      average: data.transactions ? data.total / data.transactions : 0,
      total: data.total
    }));

    const totalTransactions = rows.reduce((sum, row) => sum + row.transactions, 0);
    const totalItems = rows.reduce((sum, row) => sum + row.items, 0);
    const totalSum = rows.reduce((sum, row) => sum + row.total, 0);

    return {
      title: 'Transaction count report',
      subtitle: `${totalTransactions} transaction(s) · ${rangeLabel}`,
      columns: [
        { key: 'date', label: 'Date' },
        { key: 'transactions', label: 'Transactions' },
        { key: 'items', label: 'Items sold' },
        { key: 'average', label: 'Average transaction', money: true },
        { key: 'total', label: 'Total', money: true }
      ],
      rows,
      totals: { transactions: totalTransactions, items: totalItems, average: totalTransactions ? totalSum / totalTransactions : 0, total: totalSum }
    };
  }

  if (tab === 'refunds') {
    const refunds = getFromStorage(STORAGE_KEYS.refunds);
    const { start, end } = getReportDateRange();
    const filtered = refunds.filter((record) => {
      const created = new Date(record.createdAt);
      return created >= start && created <= end;
    }).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const totalSum = filtered.reduce((sum, record) => sum + record.total, 0);
    const totalItems = filtered.reduce((sum, record) => sum + record.itemCount, 0);

    return {
      title: 'Refund report',
      subtitle: `${filtered.length} refund(s) · ${rangeLabel}`,
      columns: [
        { key: 'date', label: 'Date & time' },
        { key: 'invoice', label: 'Invoice' },
        { key: 'items', label: 'Items returned' },
        { key: 'cashier', label: 'Cashier' },
        { key: 'refundedBy', label: 'Refunded by' },
        { key: 'total', label: 'Refund amount', money: true }
      ],
      rows: filtered.map((record) => ({
        date: new Date(record.createdAt).toLocaleString(),
        invoice: `Invoice #${record.invoice}`,
        items: record.itemCount,
        cashier: record.cashier || '—',
        refundedBy: record.refundedBy || '—',
        total: record.total
      })),
      totals: { items: totalItems, total: totalSum }
    };
  }

  if (tab === 'purchases') {
    const purchases = getFromStorage(STORAGE_KEYS.purchases);
    const { start, end } = getReportDateRange();
    const filtered = purchases.filter((record) => {
      const created = new Date(record.createdAt);
      return created >= start && created <= end;
    }).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const totalCost = filtered.reduce((sum, record) => sum + record.totalCost, 0);
    const totalUnits = filtered.reduce((sum, record) => sum + record.lines.reduce((lineSum, line) => lineSum + line.qty, 0), 0);

    return {
      title: 'Purchases report',
      subtitle: `${filtered.length} purchase(s) · ${rangeLabel}`,
      columns: [
        { key: 'date', label: 'Date & time' },
        { key: 'supplier', label: 'Supplier' },
        { key: 'lines', label: 'Product lines' },
        { key: 'units', label: 'Units' },
        { key: 'note', label: 'Note' },
        { key: 'createdBy', label: 'Recorded by' },
        { key: 'totalCost', label: 'Total cost', money: true }
      ],
      rows: filtered.map((record) => ({
        date: new Date(record.createdAt).toLocaleString(),
        supplier: record.supplier,
        lines: record.lines.length,
        units: record.lines.reduce((sum, line) => sum + line.qty, 0),
        note: record.note || '—',
        createdBy: record.createdBy || '—',
        totalCost: record.totalCost
      })),
      totals: { lines: filtered.length, units: totalUnits, totalCost }
    };
  }

  if (tab === 'closings') {
    const closings = getFromStorage(STORAGE_KEYS.closings);
    const { start, end } = getReportDateRange();
    const filtered = closings.filter((record) => {
      const created = new Date(record.createdAt);
      return created >= start && created <= end;
    }).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const totalSales = filtered.reduce((sum, record) => sum + record.sales, 0);
    const totalSum = filtered.reduce((sum, record) => sum + record.total, 0);
    const totalCounted = filtered.reduce((sum, record) => sum + (record.countTotal || 0), 0);
    const totalDiff = totalCounted - totalSum;

    return {
      title: 'Daily closing report (X-Z)',
      subtitle: `${filtered.length} closing(s) · ${rangeLabel}`,
      columns: [
        { key: 'date', label: 'Date' },
        { key: 'sales', label: 'Transactions' },
        { key: 'subtotal', label: 'Subtotal', money: true },
        { key: 'tax', label: 'VAT / TAX', money: true },
        { key: 'total', label: 'Expected total', money: true },
        { key: 'countTotal', label: 'Counted total', money: true },
        { key: 'difference', label: 'Variance', money: true },
        { key: 'closedBy', label: 'Closed by' }
      ],
      rows: filtered.map((record) => ({
        date: record.date,
        sales: record.sales,
        subtotal: record.subtotal,
        tax: record.tax,
        total: record.total,
        countTotal: record.countTotal || 0,
        difference: record.difference || 0,
        closedBy: record.closedBy || '—'
      })),
      totals: { sales: totalSales, total: totalSum, countTotal: totalCounted, difference: totalDiff }
    };
  }

  if (tab === 'price') {
    const history = getFromStorage(STORAGE_KEYS.priceHistory);
    const { start, end } = getReportDateRange();
    const filtered = history.filter((record) => {
      const created = new Date(record.createdAt);
      return created >= start && created <= end;
    }).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return {
      title: 'Price change report',
      subtitle: `${filtered.length} change(s) · ${rangeLabel}`,
      columns: [
        { key: 'date', label: 'Date & time' },
        { key: 'type', label: 'Type' },
        { key: 'name', label: 'Item' },
        { key: 'oldPrice', label: 'Old price', money: true },
        { key: 'newPrice', label: 'New price', money: true },
        { key: 'user', label: 'Changed by' }
      ],
      rows: filtered.map((record) => ({
        date: new Date(record.createdAt).toLocaleString(),
        type: record.type === 'menu' ? 'Menu item' : 'Inventory',
        name: record.name,
        oldPrice: record.oldPrice,
        newPrice: record.newPrice,
        user: record.user
      }))
    };
  }

  if (tab === 'customers') {
    const customers = getFromStorage(STORAGE_KEYS.customers);
    const sales = getFromStorage(STORAGE_KEYS.sales);
    const { start, end } = getReportDateRange();

    const rows = customers.map((customer) => {
      const customerSales = sales.filter((sale) => sale.customerId === customer.id);
      const inRange = customerSales.filter((sale) => {
        const created = new Date(sale.createdAt);
        return created >= start && created <= end;
      });
      return {
        name: customer.name,
        phone: customer.phone || '—',
        visits: inRange.length,
        spend: inRange.reduce((sum, sale) => sum + sale.total, 0),
        points: customer.points || 0,
        lastVisit: customer.lastVisit ? new Date(customer.lastVisit).toLocaleDateString() : '—'
      };
    }).sort((a, b) => b.spend - a.spend);

    const totalVisits = rows.reduce((sum, row) => sum + row.visits, 0);
    const totalSpend = rows.reduce((sum, row) => sum + row.spend, 0);
    const totalPoints = rows.reduce((sum, row) => sum + row.points, 0);

    return {
      title: 'Customer report',
      subtitle: `${rows.length} customer(s) · ${rangeLabel}`,
      columns: [
        { key: 'name', label: 'Customer' },
        { key: 'phone', label: 'Phone' },
        { key: 'visits', label: 'Visits' },
        { key: 'spend', label: 'Total spend', money: true },
        { key: 'points', label: 'Loyalty points' },
        { key: 'lastVisit', label: 'Last visit' }
      ],
      rows,
      totals: { visits: totalVisits, spend: totalSpend, points: totalPoints }
    };
  }

  if (tab === 'shift') {
    const shifts = getFromStorage(STORAGE_KEYS.shifts);
    const allSales = getFromStorage(STORAGE_KEYS.sales);
    const { start, end } = getReportDateRange();
    const filtered = shifts.filter((shift) => {
      const created = new Date(shift.date + 'T00:00:00');
      return created >= start && created <= end;
    }).slice().sort((a, b) => b.date.localeCompare(a.date) || a.startTime.localeCompare(b.startTime));

    const matchesShift = (sale, shift) => {
      if (sale.savedOnly) return false;
      const created = new Date(sale.createdAt);
      const dateKey = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, '0')}-${String(created.getDate()).padStart(2, '0')}`;
      if (dateKey !== shift.date) return false;
      const hhmm = `${String(created.getHours()).padStart(2, '0')}:${String(created.getMinutes()).padStart(2, '0')}`;
      return hhmm >= shift.startTime && hhmm <= shift.endTime;
    };

    const methodSet = new Set();
    filtered.forEach((shift) => {
      allSales.forEach((sale) => {
        if (matchesShift(sale, shift)) {
          (sale.payments || []).forEach((payment) => methodSet.add(payment.method || 'Other'));
        }
      });
    });
    const paymentMethods = Array.from(methodSet);

    const rows = filtered.map((shift) => {
      const shiftSales = allSales.filter((sale) => matchesShift(sale, shift));
      const payByMethod = {};
      shiftSales.forEach((sale) => {
        (sale.payments || []).forEach((payment) => {
          const method = payment.method || 'Other';
          payByMethod[method] = (payByMethod[method] || 0) + payment.amount;
        });
      });
      const row = {
        date: shift.date,
        name: shift.name,
        time: `${shift.startTime} – ${shift.endTime}`,
        cashier: shift.cashierName || shift.cashier || '—',
        status: shift.status === 'started' ? 'In progress' : shift.status === 'ended' ? 'Ended' : 'Open',
        started: shift.startedAt ? new Date(shift.startedAt).toLocaleTimeString() : '—',
        ended: shift.endedAt ? new Date(shift.endedAt).toLocaleTimeString() : '—'
      };
      paymentMethods.forEach((method) => {
        row[method] = payByMethod[method] || 0;
      });
      row.total = shiftSales.reduce((sum, sale) => sum + sale.total, 0);
      return row;
    });

    const totals = { total: rows.reduce((sum, row) => sum + row.total, 0) };
    paymentMethods.forEach((method) => {
      totals[method] = rows.reduce((sum, row) => sum + (row[method] || 0), 0);
    });

    const columns = [
      { key: 'date', label: 'Date' },
      { key: 'name', label: 'Shift' },
      { key: 'time', label: 'Period' },
      { key: 'cashier', label: 'Cashier' },
      { key: 'status', label: 'Status' },
      { key: 'started', label: 'Started' },
      { key: 'ended', label: 'Ended' }
    ];
    paymentMethods.forEach((method) => {
      columns.push({ key: method, label: method, money: true });
    });
    columns.push({ key: 'total', label: 'Total', money: true });

    return {
      title: 'Shift report',
      subtitle: `${filtered.length} shift(s) · ${rangeLabel}`,
      columns,
      rows,
      totals
    };
  }

  if (tab === 'void') {
    const voids = getFromStorage(STORAGE_KEYS.voids);
    const { start, end } = getReportDateRange();
    const filtered = voids.filter((record) => {
      const created = new Date(record.createdAt);
      return created >= start && created <= end;
    }).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const totalQty = filtered.reduce((sum, record) => sum + record.qty, 0);
    const totalSum = filtered.reduce((sum, record) => sum + record.total, 0);

    const rows = filtered.map((record) => ({
      date: new Date(record.createdAt).toLocaleString(),
      invoice: `Invoice #${record.invoice}`,
      product: record.itemName,
      qty: record.qty,
      total: record.total,
      cashier: record.cashier || '—',
      voidedBy: record.voidedBy || '—',
      status: record.status === 'returned' ? 'Returned' : 'Pending'
    }));

    return {
      title: 'Void report',
      subtitle: `${filtered.length} void(s) · ${rangeLabel}`,
      columns: [
        { key: 'date', label: 'Date & time' },
        { key: 'invoice', label: 'Invoice' },
        { key: 'product', label: 'Product' },
        { key: 'qty', label: 'Qty' },
        { key: 'total', label: 'Total', money: true },
        { key: 'cashier', label: 'Cashier' },
        { key: 'voidedBy', label: 'Voided by' },
        { key: 'status', label: 'Status' }
      ],
      rows,
      totals: { qty: totalQty, total: totalSum }
    };
  }

  if (tab === 'leftover') {
    const leftovers = getFromStorage(STORAGE_KEYS.leftovers);
    const { start, end } = getReportDateRange();
    const filtered = leftovers.filter((record) => {
      const created = new Date(record.createdAt);
      return created >= start && created <= end;
    }).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const statusLabel = (status) => {
      if (status === 'inventory') return 'Returned to inventory';
      if (status === 'wastage') return 'Wastage';
      return 'Pending';
    };

    const totalQty = filtered.reduce((sum, record) => sum + record.qty, 0);
    const totalValue = filtered.reduce((sum, record) => sum + (record.price || 0) * record.qty, 0);
    const returnedValue = filtered.filter((record) => record.status === 'inventory').reduce((sum, record) => sum + (record.price || 0) * record.qty, 0);
    const wastageValue = filtered.filter((record) => record.status === 'wastage').reduce((sum, record) => sum + (record.price || 0) * record.qty, 0);
    const returnedQty = filtered.filter((record) => record.status === 'inventory').reduce((sum, record) => sum + record.qty, 0);
    const wastageQty = filtered.filter((record) => record.status === 'wastage').reduce((sum, record) => sum + record.qty, 0);

    const rows = filtered.map((record) => {
      const recordValue = (record.price || 0) * record.qty;
      return {
        date: new Date(record.createdAt).toLocaleString(),
        product: record.name,
        category: record.category,
        qty: record.qty,
        price: record.price || 0,
        returnedValue: record.status === 'inventory' ? recordValue : '',
        wastageValue: record.status === 'wastage' ? recordValue : '',
        status: statusLabel(record.status),
        cashier: record.cashier || '—'
      };
    });

    return {
      title: 'Leftover report',
      subtitle: `${filtered.length} record(s) · ${rangeLabel}`,
      columns: [
        { key: 'date', label: 'Date & time' },
        { key: 'product', label: 'Product' },
        { key: 'category', label: 'Category' },
        { key: 'qty', label: 'Qty' },
        { key: 'price', label: 'Price', money: true },
        { key: 'returnedValue', label: 'Value returned', money: true },
        { key: 'wastageValue', label: 'Value wastage', money: true },
        { key: 'status', label: 'Status' },
        { key: 'cashier', label: 'Cashier' }
      ],
      rows,
      totals: { qty: totalQty, returnedValue, wastageValue, returnedQty, wastageQty }
    };
  }

  if (tab === 'promos') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales));
    const rows = sales.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .filter((sale) => (sale.promo && Number(sale.promo.amount) > 0) || (sale.discount && Number(sale.discount.amount) > 0))
      .map((sale) => ({
        date: new Date(sale.createdAt).toLocaleString(),
        order: `Invoice #${sale.invoice}`,
        cashier: sale.cashier || '—',
        promo: sale.promo && Number(sale.promo.amount) > 0 ? `${sale.promo.name}` : '—',
        promoAmount: sale.promo && Number(sale.promo.amount) > 0 ? Number(sale.promo.amount) : 0,
        discount: sale.discount && Number(sale.discount.amount) > 0 ? `${sale.discount.name}` : '—',
        discountAmount: sale.discount && Number(sale.discount.amount) > 0 ? Number(sale.discount.amount) : 0,
        subtotal: Number.isFinite(sale.subtotal) ? sale.subtotal : sale.total - getSaleTax(sale),
        tax: getSaleTax(sale),
        total: sale.total
      }));

    const totalPromo = rows.reduce((sum, row) => sum + row.promoAmount, 0);
    const totalDiscount = rows.reduce((sum, row) => sum + row.discountAmount, 0);
    const subtotalSum = rows.reduce((sum, row) => sum + row.subtotal, 0);
    const taxSum = rows.reduce((sum, row) => sum + row.tax, 0);
    const totalSum = rows.reduce((sum, row) => sum + row.total, 0);

    return {
      title: 'Promo & discount report',
      subtitle: `${rows.length} sale(s) with a promo or discount · ${rangeLabel}`,
      columns: [
        { key: 'date', label: 'Date' },
        { key: 'order', label: 'Invoice' },
        { key: 'cashier', label: 'Cashier' },
        { key: 'promo', label: 'Promo' },
        { key: 'promoAmount', label: 'Promo value', money: true },
        { key: 'discount', label: 'Discount' },
        { key: 'discountAmount', label: 'Discount value', money: true },
        { key: 'subtotal', label: 'Subtotal', money: true },
        { key: 'tax', label: 'Tax', money: true },
        { key: 'total', label: 'Total', money: true }
      ],
      rows,
      totals: { promoAmount: totalPromo, discountAmount: totalDiscount, subtotal: subtotalSum, tax: taxSum, total: totalSum }
    };
  }

  if (tab === 'tables') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales)).filter((sale) => sale.table && !sale.savedOnly);
    const byTable = {};
    sales.forEach((sale) => {
      if (!byTable[sale.table]) byTable[sale.table] = { table: sale.table, orders: 0, items: 0, total: 0 };
      byTable[sale.table].orders += 1;
      byTable[sale.table].items += sale.items.reduce((sum, item) => sum + item.qty, 0);
      byTable[sale.table].total += sale.total;
    });
    const rows = Object.values(byTable).sort((a, b) => b.total - a.total);
    return {
      title: 'Dine-in tables report',
      subtitle: `${rows.length} table(s) served · ${rangeLabel}`,
      columns: [
        { key: 'table', label: 'Table' },
        { key: 'orders', label: 'Orders' },
        { key: 'items', label: 'Items' },
        { key: 'total', label: 'Revenue', money: true }
      ],
      rows,
      totalsLabel: 'Totals',
      totals: {
        orders: rows.reduce((sum, row) => sum + row.orders, 0),
        items: rows.reduce((sum, row) => sum + row.items, 0),
        total: rows.reduce((sum, row) => sum + row.total, 0)
      }
    };
  }

  if (tab === 'kitchen') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales)).filter((sale) => !sale.savedOnly && sale.kitchenStatus);
    const rows = sales.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((sale) => ({
      order: `Invoice #${sale.invoice}`,
      date: new Date(sale.createdAt).toLocaleString(),
      table: sale.table || '—',
      type: sale.orderType ? sale.orderType.charAt(0).toUpperCase() + sale.orderType.slice(1) : '—',
      items: sale.items.reduce((sum, item) => sum + item.qty, 0),
      status: sale.kitchenStatus === 'done' ? 'Done' : sale.kitchenStatus === 'preparing' ? 'Preparing' : 'Pending'
    }));
    const done = rows.filter((row) => row.status === 'Done').length;
    const preparing = rows.filter((row) => row.status === 'Preparing').length;
    const pending = rows.filter((row) => row.status === 'Pending').length;
    return {
      title: 'Kitchen orders report',
      subtitle: `${rows.length} order ticket(s) · ${rangeLabel}`,
      columns: [
        { key: 'order', label: 'Invoice' },
        { key: 'date', label: 'Date & time' },
        { key: 'table', label: 'Table' },
        { key: 'type', label: 'Type' },
        { key: 'items', label: 'Items' },
        { key: 'status', label: 'Status' }
      ],
      rows,
      totalsLabel: 'Status',
      totals: { items: rows.reduce((sum, row) => sum + row.items, 0), status: `${done} done · ${preparing} preparing · ${pending} pending` }
    };
  }

  if (tab === 'delivery') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales)).filter((sale) => !sale.savedOnly && sale.orderType && sale.orderType !== 'dinein');
    const rows = sales.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((sale) => ({
      order: `Invoice #${sale.invoice}`,
      date: new Date(sale.createdAt).toLocaleString(),
      orderType: sale.orderType === 'delivery' ? 'Delivery' : 'Takeaway',
      customer: sale.customerName || '—',
      address: sale.deliveryAddress || '—',
      rider: sale.riderName || '—',
      deliveryFee: Number(sale.deliveryFee) || 0,
      total: sale.total
    }));
    const deliveryCount = rows.filter((row) => row.orderType === 'Delivery').length;
    const takeawayCount = rows.filter((row) => row.orderType === 'Takeaway').length;
    return {
      title: 'Delivery & takeaway report',
      subtitle: `${deliveryCount} delivery · ${takeawayCount} takeaway · ${rangeLabel}`,
      columns: [
        { key: 'order', label: 'Invoice' },
        { key: 'date', label: 'Date & time' },
        { key: 'orderType', label: 'Type' },
        { key: 'customer', label: 'Customer' },
        { key: 'address', label: 'Address' },
        { key: 'rider', label: 'Rider' },
        { key: 'deliveryFee', label: 'Delivery fee', money: true },
        { key: 'total', label: 'Order total', money: true }
      ],
      rows,
      totalsLabel: 'Totals',
      totals: {
        deliveryFee: rows.reduce((sum, row) => sum + row.deliveryFee, 0),
        total: rows.reduce((sum, row) => sum + row.total, 0)
      }
    };
  }

  if (tab === 'modifiers') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales));
    const byOption = {};
    sales.forEach((sale) => {
      sale.items.forEach((item) => {
        (item.options || []).forEach((option) => {
          if (!byOption[option.label]) byOption[option.label] = { option: option.label, qty: 0, extra: 0 };
          byOption[option.label].qty += item.qty;
          byOption[option.label].extra += (Number(option.price) || 0) * item.qty;
        });
      });
    });
    const rows = Object.values(byOption).sort((a, b) => b.extra - a.extra);
    return {
      title: 'Add-ons report',
      subtitle: `${rows.length} add-on(s) sold · ${rangeLabel}`,
      columns: [
        { key: 'option', label: 'Add-on' },
        { key: 'qty', label: 'Quantity' },
        { key: 'extra', label: 'Extra revenue', money: true }
      ],
      rows,
      totalsLabel: 'Totals',
      totals: {
        qty: rows.reduce((sum, row) => sum + row.qty, 0),
        extra: rows.reduce((sum, row) => sum + row.extra, 0)
      }
    };
  }

  if (tab === 'tips') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales)).filter((sale) => !sale.savedOnly && (sale.tip || sale.serviceCharge));
    const rows = sales.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((sale) => ({
      order: `Invoice #${sale.invoice}`,
      date: new Date(sale.createdAt).toLocaleString(),
      cashier: sale.cashier || '—',
      subtotal: Number.isFinite(sale.subtotal) ? sale.subtotal : sale.total - getSaleTax(sale),
      serviceCharge: Number(sale.serviceCharge) || 0,
      tip: Number(sale.tip) || 0,
      total: sale.total
    }));
    return {
      title: 'Tips & service charge report',
      subtitle: `${rows.length} order(s) with tips or service charge · ${rangeLabel}`,
      columns: [
        { key: 'order', label: 'Invoice' },
        { key: 'date', label: 'Date & time' },
        { key: 'cashier', label: 'Cashier' },
        { key: 'subtotal', label: 'Subtotal', money: true },
        { key: 'serviceCharge', label: 'Service charge', money: true },
        { key: 'tip', label: 'Tip', money: true },
        { key: 'total', label: 'Total', money: true }
      ],
      rows,
      totalsLabel: 'Totals',
      totals: {
        serviceCharge: rows.reduce((sum, row) => sum + row.serviceCharge, 0),
        tip: rows.reduce((sum, row) => sum + row.tip, 0),
        total: rows.reduce((sum, row) => sum + row.total, 0)
      }
    };
  }

  if (tab === 'purchaseorders') {
    const pos = getFromStorage(STORAGE_KEYS.purchaseOrders);
    const rows = pos.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((po) => ({
      number: `PO #${po.number}`,
      date: new Date(po.createdAt).toLocaleString(),
      createdBy: po.createdBy || '—',
      lines: po.lines.length,
      status: po.status === 'received' ? 'Received' : po.status === 'ordered' ? 'Ordered' : 'Draft',
      totalCost: po.totalCost
    }));
    const draft = rows.filter((row) => row.status === 'Draft').length;
    const ordered = rows.filter((row) => row.status === 'Ordered').length;
    const received = rows.filter((row) => row.status === 'Received').length;
    return {
      title: 'Purchase orders report',
      subtitle: `${draft} draft · ${ordered} ordered · ${received} received · all time`,
      columns: [
        { key: 'number', label: 'PO' },
        { key: 'date', label: 'Date' },
        { key: 'createdBy', label: 'Created by' },
        { key: 'lines', label: 'Lines' },
        { key: 'status', label: 'Status' },
        { key: 'totalCost', label: 'Cost', money: true }
      ],
      rows,
      totalsLabel: 'Totals',
      totals: {
        lines: rows.reduce((sum, row) => sum + row.lines, 0),
        totalCost: rows.reduce((sum, row) => sum + row.totalCost, 0)
      }
    };
  }

  if (tab === 'branches') {
    const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales)).filter((sale) => sale.branch && !sale.savedOnly);
    const byBranch = {};
    sales.forEach((sale) => {
      if (!byBranch[sale.branch]) byBranch[sale.branch] = { branch: sale.branch, orders: 0, items: 0, total: 0 };
      byBranch[sale.branch].orders += 1;
      byBranch[sale.branch].items += sale.items.reduce((sum, item) => sum + item.qty, 0);
      byBranch[sale.branch].total += sale.total;
    });
    const rows = Object.values(byBranch).sort((a, b) => b.total - a.total);
    return {
      title: 'Branch sales report',
      subtitle: `${rows.length} branch(es) · ${rangeLabel}`,
      columns: [
        { key: 'branch', label: 'Branch' },
        { key: 'orders', label: 'Orders' },
        { key: 'items', label: 'Items' },
        { key: 'total', label: 'Revenue', money: true }
      ],
      rows,
      totalsLabel: 'Totals',
      totals: {
        orders: rows.reduce((sum, row) => sum + row.orders, 0),
        items: rows.reduce((sum, row) => sum + row.items, 0),
        total: rows.reduce((sum, row) => sum + row.total, 0)
      }
    };
  }

  if (tab === 'receipts') {
    const audit = getFromStorage(STORAGE_KEYS.audit);
    const { start, end } = getReportDateRange();
    const rows = audit
      .filter((entry) => entry.action === 'Receipt sent' && new Date(entry.createdAt) >= start && new Date(entry.createdAt) <= end)
      .map((entry) => {
        const match = String(entry.detail || '').match(/Receipt #(\S+)/);
        const detail = entry.detail || '';
        const channel = detail.includes('WhatsApp') ? 'WhatsApp' : detail.includes('Email') ? 'Email' : 'Copied';
        return {
          date: new Date(entry.createdAt).toLocaleString(),
          invoice: match ? `#${match[1]}` : '—',
          channel,
          user: entry.user || '—',
          detail,
          count: 1
        };
      });
    const whatsapp = rows.filter((row) => row.channel === 'WhatsApp').length;
    const email = rows.filter((row) => row.channel === 'Email').length;
    const copied = rows.filter((row) => row.channel === 'Copied').length;
    return {
      title: 'Receipts sent report',
      subtitle: `${rows.length} receipt(s) sent · ${rangeLabel}`,
      columns: [
        { key: 'date', label: 'Date & time' },
        { key: 'invoice', label: 'Invoice' },
        { key: 'channel', label: 'Channel' },
        { key: 'user', label: 'Sent by' },
        { key: 'detail', label: 'Detail' }
      ],
      rows,
      totalsLabel: 'Sent',
      totals: { channel: `${whatsapp} WhatsApp · ${email} Email · ${copied} Copied` }
    };
  }

  if (tab === 'bookorders') {
    const orders = getFromStorage(STORAGE_KEYS.bookOrders);
    const { start, end } = getReportDateRange();
    const filtered = orders.filter((order) => {
      const created = new Date(order.createdAt);
      return created >= start && created <= end;
    }).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const totalSum = filtered.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
    const partSum = filtered.reduce((sum, order) => sum + (Number(order.partPayment) || 0), 0);
    const balanceSum = filtered.reduce((sum, order) => sum + (Number(order.balance) || 0), 0);

    return {
      title: 'Book orders report',
      subtitle: `${filtered.length} book order(s) · ${rangeLabel}`,
      columns: [
        { key: 'date', label: 'Date & time' },
        { key: 'invoice', label: 'Invoice' },
        { key: 'source', label: 'Source' },
        { key: 'category', label: 'Category' },
        { key: 'customer', label: 'Customer' },
        { key: 'phone', label: 'Phone' },
        { key: 'total', label: 'Total', money: true },
        { key: 'partPayment', label: 'Part payment', money: true },
        { key: 'balance', label: 'Balance due', money: true },
        { key: 'status', label: 'Status' }
      ],
      rows: filtered.map((order) => ({
        date: new Date(order.createdAt).toLocaleString(),
        invoice: order.invoice || order.number || '—',
        source: order.source === 'online' ? 'Online' : 'Personal',
        category: order.category === 'cake' ? (order.cakeType ? `Cake · ${order.cakeType}` : 'Cake') : 'Other',
        customer: order.customerName || '—',
        phone: order.phone || '—',
        total: Number(order.total) || 0,
        partPayment: Number(order.partPayment) || 0,
        balance: Number(order.balance) || 0,
        status: order.status === 'collected' ? 'Collected' : 'Pending'
      })),
      totals: { count: filtered.length, total: totalSum, partPayment: partSum, balance: balanceSum }
    };
  }

  return buildReport('sales');
}

function renderReports() {
  const def = getFilteredReportDef();
  const term = String(reportSearch || '').trim().toLowerCase();

  const searchInput = document.getElementById('report-search');
  if (searchInput && searchInput.value !== reportSearch) searchInput.value = reportSearch;

  const viewSelect = document.getElementById('report-view-select');
  if (viewSelect) {
    const options = getReportViewOptions();
    const currentView = getReportView();
    viewSelect.innerHTML = options.map((option) => `<option value="${option.value}">${escapeHtml(option.label)}</option>`).join('');
    viewSelect.value = currentView;
  }

  document.getElementById('report-title').textContent = def.title;
  document.getElementById('report-subtitle').textContent = def.subtitle;

  const view = getReportView();
  if (view !== 'text' && getReportGraphConfig(view)) {
    renderReportGraph(def, view);
    document.getElementById('report-pagination').innerHTML = '';
    return;
  }

  const totalPages = Math.max(1, Math.ceil(def.rows.length / REPORT_PAGE_SIZE));
  if (reportPage > totalPages) reportPage = totalPages;
  const pageRows = def.rows.slice((reportPage - 1) * REPORT_PAGE_SIZE, reportPage * REPORT_PAGE_SIZE);

  const container = document.getElementById('report-table');
  container.innerHTML = `
    <table class="report-table">
      <thead>
        <tr>
          ${def.columns.map((column) => `<th class="${column.money ? 'num' : ''}">${column.label}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${pageRows.length
          ? pageRows.map((row) => `
            <tr>
              ${def.columns.map((column) => {
                const value = row[column.key];
                return `<td class="${column.money ? 'num' : ''}">${column.money ? formatCurrency(value) : (value ?? '—')}</td>`;
              }).join('')}
            </tr>
          `).join('')
          : `<tr class="empty-row"><td colspan="${def.columns.length}"><div class="report-empty">${term ? 'No results match your search.' : 'No data for this report.'}</div></td></tr>`}
      </tbody>
      ${def.totals && !term ? `
        <tfoot>
          <tr class="report-total-row">
            <td>${def.totalsLabel || 'Summary'}</td>
            ${def.columns.slice(1).map((column) => {
              const value = def.totals[column.key];
              return `<td class="${column.money ? 'num' : ''}">${value === undefined ? '' : (column.money ? formatCurrency(value) : value)}</td>`;
            }).join('')}
          </tr>
        </tfoot>` : ''}
    </table>
  `;

  renderReportPagination(def.rows.length, totalPages);
}

function renderReportPagination(totalRows, totalPages) {
  const container = document.getElementById('report-pagination');
  if (!container) return;
  if (totalPages <= 1) {
    container.innerHTML = totalRows ? `<div class="pagination-info">${totalRows} row(s)</div>` : '';
    return;
  }

  const start = totalRows ? (reportPage - 1) * REPORT_PAGE_SIZE + 1 : 0;
  const end = Math.min(reportPage * REPORT_PAGE_SIZE, totalRows);

  const pages = new Set([1, totalPages, reportPage - 1, reportPage, reportPage + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b);
  const items = [];
  let prev = 0;
  sorted.forEach((page) => {
    if (page - prev > 1) items.push('…');
    items.push(page);
    prev = page;
  });

  container.innerHTML = `
    <div class="pagination-info">Showing ${start}–${end} of ${totalRows}</div>
    <div class="pagination-controls">
      <button class="page-btn" onclick="changeReportPage(-1)" ${reportPage === 1 ? 'disabled' : ''}>Prev</button>
      ${items.map((page) => page === '…'
        ? '<span class="page-dots">…</span>'
        : `<button class="page-btn ${page === reportPage ? 'active' : ''}" onclick="goToReportPage(${page})">${page}</button>`
      ).join('')}
      <button class="page-btn" onclick="changeReportPage(1)" ${reportPage === totalPages ? 'disabled' : ''}>Next</button>
    </div>
  `;
}

function changeReportPage(delta) {
  const def = buildReport(reportTab);
  const totalPages = Math.max(1, Math.ceil(def.rows.length / REPORT_PAGE_SIZE));
  reportPage = Math.min(totalPages, Math.max(1, reportPage + delta));
  renderReports();
}

function goToReportPage(page) {
  reportPage = page;
  renderReports();
}

function updateCartCustomerBadge() {
  const badge = document.getElementById('cart-customer-badge');
  if (!badge) return;
  if (cartCustomer) {
    badge.textContent = `${cartCustomer.name}${cartLoyaltyPoints ? ` · ${cartLoyaltyPoints} pts` : ''}`;
    badge.classList.remove('empty');
  } else {
    badge.textContent = 'No customer';
    badge.classList.add('empty');
  }
}

function openCustomerModal() {
  document.getElementById('customer-search').value = '';
  document.getElementById('customer-error').textContent = '';
  renderCustomerList('');
  renderCartCustomerInfo();
  document.getElementById('customer-modal').classList.remove('hidden');
}

function closeCustomerModal() {
  document.getElementById('customer-modal').classList.add('hidden');
}

function renderCustomerList(query) {
  const term = String(query || '').trim().toLowerCase();
  const customers = getCustomers()
    .filter((customer) => !term || customer.name.toLowerCase().includes(term) || String(customer.phone || '').includes(term))
    .sort((a, b) => (b.lastVisit || '').localeCompare(a.lastVisit || ''));
  const container = document.getElementById('customer-list');
  container.innerHTML = customers.length
    ? customers.map((customer) => `
      <div class="customer-row ${cartCustomer && cartCustomer.id === customer.id ? 'selected' : ''}">
        <div class="customer-avatar">${customer.name.charAt(0).toUpperCase()}</div>
        <div class="customer-info">
          <strong>${escapeHtml(customer.name)}</strong>
          <small>${customer.phone ? escapeHtml(customer.phone) : 'No phone'} · ${customer.points || 0} pts</small>
        </div>
        <button class="table-action primary" onclick="selectCustomer(${customer.id})">${cartCustomer && cartCustomer.id === customer.id ? 'Selected' : 'Select'}</button>
      </div>
    `).join('')
    : '<div class="list-row"><div>No customers found.</div></div>';
}

function createCustomer() {
  const name = document.getElementById('new-customer-name').value.trim();
  const phone = document.getElementById('new-customer-phone').value.trim();
  const email = document.getElementById('new-customer-email') ? document.getElementById('new-customer-email').value.trim() : '';
  const errorEl = document.getElementById('customer-error');
  if (!name) { errorEl.textContent = 'Enter a customer name.'; return; }
  let customer = phone ? findCustomerByPhone(phone) : null;
  if (customer) {
    customer.name = name;
    customer.phone = phone;
    if (email) customer.email = email;
  } else {
    customer = { id: Date.now(), name, phone, email: email || undefined, points: 0, createdAt: new Date().toISOString(), lastVisit: new Date().toISOString() };
  }
  saveCustomer(customer);
  document.getElementById('new-customer-name').value = '';
  document.getElementById('new-customer-phone').value = '';
  const emailInput = document.getElementById('new-customer-email');
  if (emailInput) emailInput.value = '';
  renderCustomerList('');
  renderCartCustomerInfo();
  showToast('Customer saved.', 'success');
}

function selectCustomer(id) {
  const customer = getCustomers().find((entry) => entry.id === id);
  if (!customer) return;
  if (cartCustomer && cartCustomer.id === id) {
    cartCustomer = null;
    cartLoyaltyPoints = 0;
  } else {
    cartCustomer = { id: customer.id, name: customer.name, phone: customer.phone, email: customer.email || '', points: customer.points || 0 };
    cartLoyaltyPoints = 0;
  }
  renderCustomerList(document.getElementById('customer-search').value);
  renderCartCustomerInfo();
  updateCartCustomerBadge();
  renderCart();
}

function renderCartCustomerInfo() {
  const container = document.getElementById('customer-selected-info');
  const redeemRow = document.getElementById('loyalty-redeem-row');
  if (!container) return;
  if (cartCustomer) {
    const loyalty = getLoyaltySettings();
    container.innerHTML = `
      <div class="customer-selected">
        <span><strong>${escapeHtml(cartCustomer.name)}</strong> · ${cartCustomer.points} pts</span>
        <button class="table-action danger" onclick="selectCustomer(${cartCustomer.id})">Remove</button>
      </div>
    `;
    if (redeemRow) {
      const maxPoints = Math.min(cartCustomer.points, loyalty.enabled && loyalty.pointValue ? 999999 : 0);
      redeemRow.classList.toggle('hidden', !loyalty.enabled || maxPoints <= 0);
      const input = document.getElementById('loyalty-redeem-input');
      if (input) input.max = maxPoints;
    }
  } else {
    container.innerHTML = '<div class="list-row"><div>No customer selected.</div></div>';
    if (redeemRow) redeemRow.classList.add('hidden');
  }
}

function setLoyaltyRedeem() {
  const input = document.getElementById('loyalty-redeem-input');
  if (!input || !cartCustomer) return;
  const requested = Math.max(0, Math.floor(Number(input.value) || 0));
  cartLoyaltyPoints = Math.min(requested, cartCustomer.points);
  renderCart();
}

function getTodaySales() {
  const { start, end } = getPeriodDateRange('today');
  return getFromStorage(STORAGE_KEYS.sales).filter((sale) => {
    const created = new Date(sale.createdAt);
    return created >= start && created <= end;
  });
}

function renderSalesTarget() {
  const settings = getStoredSettings();
  const target = Number(settings.salesTarget) || 0;
  const container = document.getElementById('target-progress');
  if (!container) return;
  if (target <= 0) { container.innerHTML = ''; return; }
  const today = getTodaySales();
  const earned = today.reduce((sum, sale) => sum + sale.total, 0);
  const pct = Math.min(100, Math.round((earned / target) * 100));
  container.innerHTML = `
    <div class="target-block">
      <div class="target-head">
        <span>Today's target</span>
        <strong>${formatCurrency(earned)} / ${formatCurrency(target)}</strong>
      </div>
      <div class="target-bar"><i style="width:${pct}%"></i></div>
      <div class="target-meta">${pct}% reached ${pct >= 100 ? '· Target met 🎉' : ''}</div>
    </div>
  `;
}

function requestRefund(saleId) {
  if (!canVoid()) return;
  const sale = getFromStorage(STORAGE_KEYS.sales).find((entry) => entry.id === saleId);
  if (!sale) return;
  document.getElementById('refund-hint').textContent = `Refund Invoice #${sale.invoice} for ${formatCurrency(sale.total)} and return all products to stock?`;
  document.getElementById('refund-error').textContent = '';
  document.getElementById('refund-password').value = '';
  document.getElementById('refund-modal').classList.remove('hidden');
  document.getElementById('refund-password').focus();
  pendingRefundSaleId = saleId;
}

let pendingRefundSaleId = null;

function closeRefundModal() {
  document.getElementById('refund-modal').classList.add('hidden');
  pendingRefundSaleId = null;
}

function confirmRefund() {
  const entered = document.getElementById('refund-password').value.trim();
  const errorEl = document.getElementById('refund-error');
  if (!entered) { errorEl.textContent = 'Enter the admin password.'; return; }
  const users = getFromStorage(STORAGE_KEYS.users);
  const authorized = users.some((user) => user.role === 'admin' && user.password === entered)
    || (currentUser && currentUser.password === entered);
  if (!authorized) {
    errorEl.textContent = 'Incorrect admin password.';
    logAudit('Refund blocked', 'Incorrect admin password entered by ' + (currentUser ? currentUser.name : 'User'));
    return;
  }
  const saleId = pendingRefundSaleId;
  pendingRefundSaleId = null;
  document.getElementById('refund-modal').classList.add('hidden');
  refundSale(saleId);
}

function refundSale(saleId) {
  const sales = getFromStorage(STORAGE_KEYS.sales);
  const sale = sales.find((entry) => entry.id === saleId);
  if (!sale || sale.refunded || sale.savedOnly) return;

  sale.refunded = true;
  sale.refundedAt = new Date().toISOString();
  sale.refundedBy = currentUser ? currentUser.name : 'System';

  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  (sale.items || []).forEach((item) => {
    if (item.voided) return;
    const row = inventory.find((entry) => entry.name.toLowerCase() === item.name.toLowerCase());
    if (row) row.stock += item.qty;
  });
  writeToStorage(STORAGE_KEYS.inventory, inventory);

  const refunds = getFromStorage(STORAGE_KEYS.refunds);
  refunds.push({
    id: Date.now(),
    invoice: sale.invoice,
    total: sale.total,
    itemCount: sale.items.reduce((sum, item) => sum + (item.voided ? 0 : item.qty), 0),
    cashier: sale.cashier,
    refundedBy: sale.refundedBy,
    createdAt: new Date().toISOString()
  });
  writeToStorage(STORAGE_KEYS.refunds, refunds);

  writeToStorage(STORAGE_KEYS.sales, sales);
  renderOrdersManager();
  renderDashboard();
  saveRecoverySnapshot();
  showToast(`Invoice #${sale.invoice} refunded. Products returned to stock.`, 'success');
  logAudit('Refund', `Invoice #${sale.invoice} refunded · ${formatCurrency(sale.total)}`);
}

function getClosingTotals() {
  const sales = getTodaySales().filter((sale) => !sale.savedOnly);
  const byMethod = {};
  let subtotal = 0, tax = 0, total = 0;
  sales.forEach((sale) => {
    (sale.payments || []).forEach((payment) => {
      const method = payment.method || 'Other';
      byMethod[method] = (byMethod[method] || 0) + payment.amount;
    });
    subtotal += Number.isFinite(sale.subtotal) ? sale.subtotal : sale.total - getSaleTax(sale);
    tax += getSaleTax(sale);
    total += sale.total;
  });
  return { sales: sales.length, byMethod, subtotal, tax, total };
}

function openClosingModal() {
  const { sales, byMethod, subtotal, tax, total } = getClosingTotals();
  const dateEl = document.getElementById('closing-date');
  const countEl = document.getElementById('closing-sales-count');
  const totalEl = document.getElementById('closing-total');
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  if (countEl) countEl.textContent = `${sales} transaction(s)`;
  if (totalEl) totalEl.textContent = formatCurrency(total);

  const methods = getPaymentMethods();
  const methodList = document.getElementById('closing-methods');
  methodList.innerHTML = methods.map((method) => `
    <div class="closing-method">
      <div class="closing-method-info">
        <strong>${method}</strong>
        <span>Expected ${formatCurrency(byMethod[method] || 0)}</span>
      </div>
      <input type="number" min="0" step="0.01" placeholder="Counted amount" class="closing-count" data-method="${method}" />
    </div>
  `).join('');
  document.getElementById('closing-error').textContent = '';
  document.getElementById('closing-modal').classList.remove('hidden');
}

function closeClosingModal() {
  document.getElementById('closing-modal').classList.add('hidden');
}

function saveClosing() {
  const { sales, byMethod, subtotal, tax, total } = getClosingTotals();
  const counts = {};
  let countTotal = 0;
  document.querySelectorAll('#closing-methods .closing-count').forEach((input) => {
    const value = Number(input.value || 0);
    counts[input.dataset.method] = Number.isFinite(value) ? value : 0;
    countTotal += Number.isFinite(value) ? value : 0;
  });
  if (sales === 0) {
    document.getElementById('closing-error').textContent = 'No transactions today to close.';
    return;
  }
  const difference = countTotal - total;
  const closings = getFromStorage(STORAGE_KEYS.closings);
  closings.push({
    id: Date.now(),
    date: new Date().toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
    sales,
    subtotal,
    tax,
    total,
    counts,
    countTotal,
    difference,
    closedBy: currentUser ? currentUser.name : 'System'
  });
  writeToStorage(STORAGE_KEYS.closings, closings);
  document.getElementById('closing-modal').classList.add('hidden');
  renderClosingsList();
  showToast(difference === 0 ? 'Day closed perfectly.' : `Day closed. Difference ${formatCurrency(difference)}`, difference === 0 ? 'success' : 'info');
  logAudit('Day closed', `${sales} sale(s) · total ${formatCurrency(total)} · variance ${formatCurrency(difference)}`);
}

function renderClosingsList() {
  const container = document.getElementById('closings-list');
  if (!container) return;
  const closings = getFromStorage(STORAGE_KEYS.closings).slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8);
  container.innerHTML = closings.length
    ? closings.map((closing) => `
      <div class="list-row">
        <div class="mini-item">
          <span class="mini-avatar">₦</span>
          <div>
            <div>${closing.date} · ${closing.sales} sale(s)</div>
            <small>${closing.closedBy} · variance ${closing.difference >= 0 ? '+' : ''}${formatCurrency(closing.difference)}</small>
          </div>
        </div>
        <strong class="order-amount">${formatCurrency(closing.total)}</strong>
      </div>
    `).join('')
    : '<div class="list-row"><div>No closings yet.</div><span class="badge info">New</span></div>';
}

function openPurchaseModal() {
  document.getElementById('purchase-supplier').value = '';
  document.getElementById('purchase-note').value = '';
  document.getElementById('purchase-error').textContent = '';
  renderPurchaseItems();
  document.getElementById('purchase-modal').classList.remove('hidden');
}

function closePurchaseModal() {
  document.getElementById('purchase-modal').classList.add('hidden');
}

function renderPurchaseItems() {
  const container = document.getElementById('purchase-items');
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  const rows = inventory.map((item) => `
    <tr>
      <td>${escapeHtml(item.name)}</td>
      <td><input type="number" min="0" step="1" value="0" class="purchase-qty" data-id="${item.id}" /></td>
      <td><input type="number" min="0" step="0.01" value="${item.price ?? ''}" class="purchase-cost" data-id="${item.id}" /></td>
    </tr>
  `).join('');
  container.innerHTML = rows;
}

function savePurchase() {
  const supplier = document.getElementById('purchase-supplier').value.trim();
  const note = document.getElementById('purchase-note').value.trim();
  const errorEl = document.getElementById('purchase-error');
  if (!supplier) { errorEl.textContent = 'Enter a supplier name.'; return; }

  const lines = [];
  document.querySelectorAll('#purchase-items .purchase-qty').forEach((input) => {
    const qty = Math.floor(Number(input.value) || 0);
    if (qty <= 0) return;
    const cost = Number(document.querySelector(`.purchase-cost[data-id="${input.dataset.id}"]`).value) || 0;
    const item = getFromStorage(STORAGE_KEYS.inventory).find((entry) => entry.id === Number(input.dataset.id));
    if (!item) return;
    lines.push({ itemId: item.id, name: item.name, qty, cost });
  });

  if (!lines.length) { errorEl.textContent = 'Add at least one product with a quantity.'; return; }

  const totalCost = lines.reduce((sum, line) => sum + line.qty * line.cost, 0);
  const purchases = getFromStorage(STORAGE_KEYS.purchases);
  purchases.push({
    id: Date.now(),
    supplier,
    note,
    lines,
    totalCost,
    createdBy: currentUser ? currentUser.name : 'System',
    createdAt: new Date().toISOString()
  });
  writeToStorage(STORAGE_KEYS.purchases, purchases);

  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  lines.forEach((line) => {
    const item = inventory.find((entry) => entry.id === line.itemId);
    if (item) {
      item.stock += line.qty;
      item.lastCost = line.cost;
    }
  });
  writeToStorage(STORAGE_KEYS.inventory, inventory);
  lines.forEach((line) => logStockIn(line.name, line.qty, `Purchase from ${supplier}`));

  document.getElementById('purchase-modal').classList.add('hidden');
  renderInventoryManager();
  renderDashboard();
  renderPOS();
  showToast(`Purchase from ${supplier} recorded · ${formatCurrency(totalCost)}`, 'success');
  logAudit('Purchase recorded', `${supplier} · ${lines.length} product line(s) · ${formatCurrency(totalCost)}`);
}

function renderPurchaseList() {
  const container = document.getElementById('purchases-list');
  if (!container) return;
  const purchases = getFromStorage(STORAGE_KEYS.purchases).slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8);
  container.innerHTML = purchases.length
    ? purchases.map((purchase) => `
      <div class="list-row">
        <div class="mini-item">
          <span class="mini-avatar">${purchase.supplier.charAt(0).toUpperCase()}</span>
          <div>
            <div>${escapeHtml(purchase.supplier)}</div>
            <small>${new Date(purchase.createdAt).toLocaleString()} · ${purchase.lines.reduce((sum, line) => sum + line.qty, 0)} units</small>
          </div>
        </div>
        <strong class="order-amount">${formatCurrency(purchase.totalCost)}</strong>
      </div>
    `).join('')
    : '<div class="list-row"><div>No purchases yet.</div><span class="badge info">New</span></div>';
}

function printBarcodeLabels() {
  const ids = getMarkedInventoryIds();
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  const items = ids.length ? inventory.filter((item) => ids.includes(item.id)) : inventory;
  printLabels(items);
}

function printItemLabel(id) {
  const item = getFromStorage(STORAGE_KEYS.inventory).find((entry) => entry.id === id);
  if (item) printLabels([item]);
}

function printLabels(items) {
  if (!items.length) { showToast('No items to print.', 'error'); return; }
  const settings = getStoredSettings();
  const shopName = settings.shopName || 'FasterFood';
  const printWindow = window.open('', '_blank', 'width=400,height=600');
  if (!printWindow) { showToast('Pop-up blocked. Allow pop-ups to print labels.', 'error'); return; }
  const labels = items.map((item) => `
    <div class="label">
      <div class="label-brand">${escapeHtml(shopName)}</div>
      <div class="label-name">${escapeHtml(item.name)}</div>
      <div class="label-barcode">${escapeHtml(item.barcode || item.id)}</div>
      <div class="label-price">${item.price ? formatCurrency(item.price) : ''}</div>
    </div>
  `).join('');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html><head><meta charset="UTF-8" /><title>Barcode labels</title>
    <style>
      body { font-family: 'Courier New', monospace; margin: 10px; }
      .label { width: 45mm; min-height: 24mm; border: 1px dashed #999; padding: 4px 6px; margin: 4px; display: inline-block; text-align: center; font-size: 11px; }
      .label-brand { font-weight: 800; letter-spacing: 1px; }
      .label-name { font-weight: 700; margin-top: 2px; }
      .label-barcode { letter-spacing: 2px; margin-top: 3px; font-size: 10px; }
      .label-price { font-weight: 800; margin-top: 3px; font-size: 12px; }
      @media print { .label { border: none; } }
    </style></head>
    <body>${labels}
    <script>window.onload = function(){ window.focus(); window.print(); };<\/script>
    </body></html>
  `);
  printWindow.document.close();
  printWindow.focus();
  logAudit('Labels printed', `${items.length} label(s)`);
}

function downloadAccountingExport() {
  const sales = filterSalesByDate(getFromStorage(STORAGE_KEYS.sales));
  const methods = getPaymentMethods();
  const rows = sales.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((sale) => {
    const row = {
      'Date': new Date(sale.createdAt).toISOString(),
      'Invoice': sale.invoice,
      'Cashier': sale.cashier || '',
      'Items': sale.items.reduce((sum, item) => sum + item.qty, 0),
      'Subtotal': sale.rawSubtotal ?? (Number.isFinite(sale.subtotal) ? sale.subtotal : sale.total - getSaleTax(sale)),
      'Promo': sale.promo ? (Number(sale.promo.amount) || 0) : 0,
      'Discount': sale.discount ? (Number(sale.discount.amount) || 0) : 0,
      'VAT': getSaleTax(sale),
      'Total (Gross)': sale.total,
      'Status': sale.savedOnly ? 'SAVED' : sale.refunded ? 'REFUNDED' : 'SOLD'
    };
    methods.forEach((method) => {
      row[`Paid ${method}`] = (sale.payments || []).filter((p) => p.method === method).reduce((sum, p) => sum + p.amount, 0);
    });
    return row;
  });
  const escapeCell = (value) => {
    const text = String(value ?? '');
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  const header = Object.keys(rows[0] || {});
  const csv = '\uFEFF' + [header.join(','), ...rows.map((row) => header.map((key) => escapeCell(row[key])).join(','))].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `accounting-export-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
  showToast('Accounting export downloaded.', 'success');
}

function renderListPagination(containerId, page, totalPages, totalRows, changeFn, goFn) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (totalPages <= 1) {
    container.innerHTML = totalRows ? `<div class="pagination-info">${totalRows} item(s)</div>` : '';
    return;
  }

  const start = totalRows ? (page - 1) * LIST_PAGE_SIZE + 1 : 0;
  const end = Math.min(page * LIST_PAGE_SIZE, totalRows);

  const pages = new Set([1, totalPages, page - 1, page, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  const items = [];
  let prev = 0;
  sorted.forEach((p) => {
    if (p - prev > 1) items.push('…');
    items.push(p);
    prev = p;
  });

  container.innerHTML = `
    <div class="pagination-info">Showing ${start}–${end} of ${totalRows}</div>
    <div class="pagination-controls">
      <button class="page-btn" onclick="${changeFn}(-1)" ${page === 1 ? 'disabled' : ''}>Prev</button>
      ${items.map((p) => p === '…'
        ? '<span class="page-dots">…</span>'
        : `<button class="page-btn ${p === page ? 'active' : ''}" onclick="${goFn}(${p})">${p}</button>`
      ).join('')}
      <button class="page-btn" onclick="${changeFn}(1)" ${page === totalPages ? 'disabled' : ''}>Next</button>
    </div>
  `;
}

function changeInventoryPage(delta) {
  inventoryPage = Math.max(1, inventoryPage + delta);
  renderInventoryManager();
}

function changeMenuPage(delta) {
  menuPage = Math.max(1, menuPage + delta);
  renderMenuManager();
}

function clearInventorySearch() {
  const input = document.getElementById('inventory-search');
  if (input) {
    input.value = '';
    const clearBtn = document.querySelector('.inv-search .report-search-clear');
    if (clearBtn) clearBtn.classList.remove('visible');
    input.focus();
    inventoryPage = 1;
    renderInventoryManager();
  }
}

function clearMenuManagerSearch() {
  const input = document.getElementById('menu-search-manager');
  if (input) {
    input.value = '';
    const clearBtn = document.querySelector('.frontstore-search .report-search-clear');
    if (clearBtn) clearBtn.classList.remove('visible');
    input.focus();
    menuPage = 1;
    renderMenuManager();
  }
}

function goToMenuPage(page) {
  menuPage = page;
  renderMenuManager();
}

function setInventoryFilter(filter) {
  inventoryFilter = filter;
  inventoryMarkAll = false;
  inventoryPage = 1;
  renderInventoryManager();
  if (filter === 'returned') {
    const count = getFromStorage(STORAGE_KEYS.inventory).filter((item) => item.returnedFromLeftover).length;
    showToast(count ? `${count} returned product(s) ready to resell.` : 'No returned products right now.', count ? 'success' : 'info');
  }
}

function goToInventoryPage(page) {
  inventoryPage = page;
  renderInventoryManager();
}

function changeOrdersPage(delta) {
  ordersPage = Math.max(1, ordersPage + delta);
  renderOrdersManager();
}

function goToOrdersPage(page) {
  ordersPage = page;
  renderOrdersManager();
}

function changeAuditPage(delta) {
  auditPage = Math.max(1, auditPage + delta);
  renderAuditManager();
}

function goToAuditPage(page) {
  auditPage = page;
  renderAuditManager();
}

function downloadActiveReport() {
  const def = getFilteredReportDef();
  const escapeCell = (value) => {
    const text = String(value ?? '');
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };

  const title = def.title;
  const header = def.columns.map((column) => column.label).join(',');
  const rows = def.rows.map((row) => def.columns.map((column) => escapeCell(row[column.key])).join(','));
  if (def.totals) {
    rows.push(def.columns.map((column, index) => {
      if (index === 0) return def.totalsLabel || 'Summary';
      const value = def.totals[column.key];
      return value === undefined ? '' : escapeCell(value);
    }).join(','));
  }
  const csv = '\uFEFF' + [title, header, ...rows].join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${def.title.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

function openReportPrintWindow() {
  const def = getFilteredReportDef();
  const printWindow = window.open('', '_blank', 'width=900,height=650');
  if (!printWindow) {
    showToast('Pop-up blocked. Please allow pop-ups to print or download.', 'error');
    return null;
  }

  const cell = (column, value) => {
    const content = column.money ? formatCurrency(value) : escapeHtml(value ?? '—');
    return `<td class="${column.money ? 'right' : ''}">${content}</td>`;
  };

  const headerRow = `<tr>${def.columns.map((column) => `<th class="${column.money ? 'right' : ''}">${escapeHtml(column.label)}</th>`).join('')}</tr>`;

  const bodyRows = def.rows.length
    ? def.rows.map((row) => `<tr>${def.columns.map((column) => cell(column, row[column.key])).join('')}</tr>`).join('')
    : `<tr><td colspan="${def.columns.length}">No data.</td></tr>`;

  const totalRow = def.totals
    ? `<tr><td>${def.totalsLabel || 'Summary'}</td>${def.columns.slice(1).map((column) => {
        const value = def.totals[column.key];
        return `<td class="${column.money ? 'right' : ''}">${value === undefined ? '' : (column.money ? formatCurrency(value) : escapeHtml(value))}</td>`;
      }).join('')}</tr>`
    : '';

  const dateLabel = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  const settings = getFromStorage(STORAGE_KEYS.settings) || defaultSettings;
  const brandName = (settings.shopName || 'FasterFood') + ' POS';

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${escapeHtml(def.title)}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #222; margin: 28px; }
          .brand { color: #b91c1c; font-size: 15px; font-weight: 800; letter-spacing: 0.5px; margin-bottom: 2px; }
          h1 { margin: 0 0 4px; font-size: 22px; }
          .sub { color: #777; margin-bottom: 20px; font-size: 13px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th { background: #b91c1c; color: #fff; text-align: left; padding: 8px 10px; }
          td { padding: 7px 10px; border-bottom: 1px solid #eee; }
          tfoot td { font-weight: 700; border-top: 2px solid #b91c1c; }
          .right { text-align: right; }
        </style>
      </head>
      <body>
        <div class="brand">${escapeHtml(brandName)}</div>
        <h1>${escapeHtml(def.title)}</h1>
        <div class="sub">${escapeHtml(def.subtitle)} · Generated ${dateLabel}</div>
        <table>
          <thead>${headerRow}</thead>
          <tbody>${bodyRows}</tbody>
          ${def.totals ? `<tfoot>${totalRow}</tfoot>` : ''}
        </table>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  return printWindow;
}

function downloadActiveReportPDF() {
  const printWindow = openReportPrintWindow();
  if (printWindow) printWindow.print();
}

function printActiveReport() {
  const printWindow = openReportPrintWindow();
  if (printWindow) printWindow.print();
}

function getAuditActionClass(action) {
  const success = ['Sale', 'Order saved', 'Inventory added', 'Menu item added', 'User added', 'Login'];
  const error = ['Login failed', 'Menu item deleted', 'Inventory deleted', 'User removed', 'Payment method removed'];
  const warn = ['Data reset', 'Clear audit', 'Logout'];
  if (success.includes(action)) return 'success';
  if (error.includes(action)) return 'error';
  if (warn.includes(action)) return 'warn';
  return 'info';
}

function renderAuditManager() {
  const audit = getFromStorage(STORAGE_KEYS.audit);
  const users = [...new Set(audit.map((entry) => entry.user))].sort();
  const actions = [...new Set(audit.map((entry) => entry.action))].sort();

  const userFilter = document.getElementById('audit-user-filter');
  const actionFilter = document.getElementById('audit-action-filter');

  if (userFilter) {
    const prev = userFilter.value;
    userFilter.innerHTML = '<option value="all">All users</option>'
      + users.map((user) => `<option value="${escapeHtml(user)}">${escapeHtml(user)}</option>`).join('');
    userFilter.value = prev && users.includes(prev) ? prev : 'all';
  }
  if (actionFilter) {
    const prev = actionFilter.value;
    actionFilter.innerHTML = '<option value="all">All actions</option>'
      + actions.map((action) => `<option value="${escapeHtml(action)}">${escapeHtml(action)}</option>`).join('');
    actionFilter.value = prev && actions.includes(prev) ? prev : 'all';
  }

  const selectedUser = userFilter ? userFilter.value : 'all';
  const selectedAction = actionFilter ? actionFilter.value : 'all';

  const filtered = audit
    .filter((entry) => selectedUser === 'all' || entry.user === selectedUser)
    .filter((entry) => selectedAction === 'all' || entry.action === selectedAction)
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const auditTotalPages = Math.max(1, Math.ceil(filtered.length / LIST_PAGE_SIZE));
  if (auditPage > auditTotalPages) auditPage = auditTotalPages;
  const pageEntries = filtered.slice((auditPage - 1) * LIST_PAGE_SIZE, auditPage * LIST_PAGE_SIZE);

  document.getElementById('audit-list').innerHTML = filtered.length
    ? `
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>User</th>
            <th>Action</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          ${pageEntries.map((entry) => `
            <tr>
              <td>${new Date(entry.createdAt).toLocaleString()}</td>
              <td>${escapeHtml(entry.user)}</td>
              <td><span class="audit-badge ${getAuditActionClass(entry.action)}">${escapeHtml(entry.action)}</span></td>
              <td>${escapeHtml(entry.detail)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>`
    : '<div class="empty-hint">No audit entries yet.</div>';

  renderListPagination('audit-pagination', auditPage, auditTotalPages, filtered.length, 'changeAuditPage', 'goToAuditPage');
}

function clearAudit() {
  if (currentUser?.role !== 'admin') {
    showToast('Only the Owner can clear audit logs.', 'error');
    return;
  }
  pendingReset = { scope: 'clear-audit' };
  document.getElementById('reset-confirm-message').textContent =
    'Clear the entire audit trail? This will remove all login and activity logs.';
  document.getElementById('reset-confirm-modal').classList.remove('hidden');
  document.getElementById('reset-password').focus();
}

function renderSettings() {
  const settings = getFromStorage(STORAGE_KEYS.settings);
  const config = settings || defaultSettings;
  document.getElementById('shop-name').value = config.shopName || '';
  document.getElementById('currency').value = config.currency || 'NGN';
  document.getElementById('shop-address').value = config.address || '';
  document.getElementById('shop-phone').value = config.phone || '';
  document.getElementById('shop-email').value = config.email || '';
  document.getElementById('shop-website').value = config.website || '';
  document.getElementById('receipt-contact-toggle').checked = !!config.receiptContact;
  document.getElementById('tax-rate').value = Number.isFinite(Number(config.taxRate)) ? config.taxRate : 7.5;
  document.getElementById('receipt-width').value = config.receiptWidth === '58mm' ? '58mm' : '80mm';
  const salesTarget = document.getElementById('sales-target');
  if (salesTarget) salesTarget.value = Number(config.salesTarget) || '';
  const loyaltyEnabled = document.getElementById('loyalty-enabled-toggle');
  if (loyaltyEnabled) loyaltyEnabled.checked = !!config.loyaltyEnabled;
  const loyaltyPer = document.getElementById('loyalty-points-per');
  if (loyaltyPer) loyaltyPer.value = Number(config.loyaltyPointsPer100) || 1;
  const loyaltyValue = document.getElementById('loyalty-point-value');
  if (loyaltyValue) loyaltyValue.value = Number(config.loyaltyPointValue) || 1;
  renderQrPreview();
  renderPaymentMethodsList();
  renderUserManagement();
  renderClosingsList();
  renderPurchaseList();
  renderFeatureConfig();
  syncSettingsHero();
}

function openSettingsAuth() {
  document.getElementById('settings-auth-error').textContent = '';
  document.getElementById('settings-auth-password').value = '';
  document.getElementById('settings-auth-modal').classList.remove('hidden');
  document.getElementById('settings-auth-password').focus();
}

function closeSettingsAuth() {
  document.getElementById('settings-auth-modal').classList.add('hidden');
}

function confirmSettingsAuth() {
  const entered = document.getElementById('settings-auth-password').value.trim();
  const errorEl = document.getElementById('settings-auth-error');
  if (!entered) {
    errorEl.textContent = 'Enter your password to access settings.';
    return;
  }
  if (!currentUser) {
    errorEl.textContent = 'You must be signed in to access settings.';
    return;
  }
  if (currentUser.password !== entered) {
    errorEl.textContent = 'Incorrect password.';
    logAudit('Settings blocked', 'Incorrect password entered by ' + currentUser.name);
    return;
  }
  settingsUnlocked = true;
  document.getElementById('settings-auth-modal').classList.add('hidden');
  logAudit('Settings opened', `Settings unlocked by ${currentUser.name}`);
  showPanel('settings');
}

function renderQrPreview() {
  const settings = getFromStorage(STORAGE_KEYS.settings);
  const config = settings || defaultSettings;
  const preview = document.getElementById('qr-preview');
  const clearBtn = document.getElementById('qr-clear-btn');
  if (!preview) return;
  if (config.qrImage) {
    preview.innerHTML = `<img src="${config.qrImage}" alt="QR code" />`;
    if (clearBtn) clearBtn.style.display = 'inline-flex';
  } else {
    preview.innerHTML = '<span>No QR image</span>';
    if (clearBtn) clearBtn.style.display = 'none';
  }
}

function handleQrUpload(event) {
  const file = event.target.files[0];
  event.target.value = '';
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const settings = getFromStorage(STORAGE_KEYS.settings) || { ...defaultSettings };
    settings.qrImage = reader.result;
    writeToStorage(STORAGE_KEYS.settings, settings);
    renderQrPreview();
    showToast('QR code added. It will appear on printed receipts.', 'success');
    logAudit('QR code added', 'Receipt QR image updated');
  };
  reader.readAsDataURL(file);
}

function clearQrImage() {
  const settings = getFromStorage(STORAGE_KEYS.settings) || { ...defaultSettings };
  settings.qrImage = '';
  writeToStorage(STORAGE_KEYS.settings, settings);
  renderQrPreview();
  showToast('QR code removed.', 'info');
  logAudit('QR code removed', 'Receipt QR image cleared');
}

let shiftSignedOut = false;
let shiftEndCounting = false;
let shiftEndInterval = null;
let shiftEndTimer = null;
const shiftNotified5 = {};

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getTodayShifts() {
  return getFromStorage(STORAGE_KEYS.shifts).filter((shift) => shift.date === todayKey());
}

function requestShiftAccess() {
  if (!currentUser) {
    showToast('You must be signed in to access shifts.', 'error');
    return;
  }
  document.getElementById('shift-auth-error').textContent = '';
  document.getElementById('shift-auth-password').value = '';
  document.getElementById('shift-auth-modal').classList.remove('hidden');
  document.getElementById('shift-auth-password').focus();
}

function closeShiftAuth() {
  document.getElementById('shift-auth-modal').classList.add('hidden');
}

function confirmShiftAuth() {
  const entered = document.getElementById('shift-auth-password').value.trim();
  const errorEl = document.getElementById('shift-auth-error');
  if (!entered) {
    errorEl.textContent = 'Enter your password to access shifts.';
    return;
  }
  if (!currentUser) {
    errorEl.textContent = 'You must be signed in to access shifts.';
    return;
  }
  if (currentUser.password !== entered) {
    errorEl.textContent = 'Incorrect password.';
    logAudit('Shifts blocked', 'Incorrect password entered by ' + currentUser.name);
    return;
  }
  document.getElementById('shift-auth-modal').classList.add('hidden');
  logAudit('Shifts opened', `Shifts unlocked by ${currentUser.name}`);
  openShiftManager();
}

function openShiftManager() {
  const shifts = getTodayShifts();
  const morning = shifts.find((shift) => shift.name === 'Morning');
  const afternoon = shifts.find((shift) => shift.name === 'Afternoon');
  document.getElementById('shift-morning-start').value = morning ? morning.startTime : '08:00';
  document.getElementById('shift-morning-end').value = morning ? morning.endTime : '14:00';
  document.getElementById('shift-afternoon-start').value = afternoon ? afternoon.startTime : '14:00';
  document.getElementById('shift-afternoon-end').value = afternoon ? afternoon.endTime : '22:00';
  const morningToggle = document.getElementById('shift-morning-enabled');
  const afternoonToggle = document.getElementById('shift-afternoon-enabled');
  if (morningToggle) morningToggle.checked = !!morning;
  if (afternoonToggle) afternoonToggle.checked = !!afternoon;
  renderTodayShifts();
  document.getElementById('shift-modal').classList.remove('hidden');
}

function closeShiftModal() {
  document.getElementById('shift-modal').classList.add('hidden');
}

function saveTodayShifts() {
  const all = getFromStorage(STORAGE_KEYS.shifts);
  const today = todayKey();
  const isEnabled = (name) => {
    const el = document.getElementById(name === 'Morning' ? 'shift-morning-enabled' : 'shift-afternoon-enabled');
    return el ? el.checked : true;
  };
  const configs = [
    { name: 'Morning', enabled: isEnabled('Morning'), startTime: document.getElementById('shift-morning-start').value, endTime: document.getElementById('shift-morning-end').value },
    { name: 'Afternoon', enabled: isEnabled('Afternoon'), startTime: document.getElementById('shift-afternoon-start').value, endTime: document.getElementById('shift-afternoon-end').value }
  ];
  configs.forEach((config) => {
    let shift = all.find((entry) => entry.date === today && entry.name === config.name);
    if (!config.enabled) {
      if (shift && shift.status === 'open') {
        all.splice(all.indexOf(shift), 1);
      }
      return;
    }
    if (!shift) {
      let id = Date.now();
      while (all.some((entry) => entry.id === id)) id += 1;
      shift = { id, date: today, name: config.name, startTime: config.startTime, endTime: config.endTime, cashier: '', cashierName: '', startedAt: null, endedAt: null, status: 'open' };
      all.push(shift);
    } else if (shift.status !== 'started') {
      shift.startTime = config.startTime;
      shift.endTime = config.endTime;
      shift.status = 'open';
      shift.cashier = '';
      shift.cashierName = '';
      shift.startedAt = null;
      shift.endedAt = null;
    }
  });
  writeToStorage(STORAGE_KEYS.shifts, all);
  renderTodayShifts();
  renderShiftGate();
  showToast('Today\'s shifts opened.', 'success');
  logAudit('Shift opened', 'Today\'s shifts scheduled');
}

function renderTodayShifts() {
  const list = document.getElementById('today-shift-list');
  const shifts = getTodayShifts().sort((a, b) => a.startTime.localeCompare(b.startTime));
  list.innerHTML = shifts.length
    ? shifts.map((shift) => {
        const statusLabel = shift.status === 'started'
          ? '<span class="badge warning">In progress</span>'
          : shift.status === 'ended'
            ? '<span class="badge info">Ended</span>'
            : '<span class="badge safe">Open</span>';
        const endBtn = shift.status === 'started'
          ? `<button class="shift-end-btn" onclick="endShift(${shift.id})">End shift</button>`
          : '';
        const sub = shift.status === 'started'
          ? `Started by ${shift.cashierName || shift.cashier}`
          : shift.status === 'ended'
            ? `Ended ${new Date(shift.endedAt).toLocaleTimeString()}`
            : 'Awaiting cashier';
        return `
          <div class="list-row shift-row">
            <div class="shift-row-info">
              <div class="shift-row-title">
                <span class="shift-row-name">${shift.name}</span>
                <span class="shift-row-time">${shift.startTime} – ${shift.endTime}</span>
              </div>
              <small>${sub}</small>
            </div>
            <div class="row-actions">
              ${statusLabel}
              ${endBtn}
            </div>
          </div>
        `;
      }).join('')
    : '<div class="list-row"><div>No shifts opened for today yet.</div></div>';
}

function endShift(shiftId) {
  const all = getFromStorage(STORAGE_KEYS.shifts);
  const shift = all.find((entry) => entry.id === shiftId);
  if (!shift) return;
  shift.status = 'ended';
  shift.endedAt = new Date().toISOString();
  writeToStorage(STORAGE_KEYS.shifts, all);
  renderTodayShifts();
  showToast(`${shift.name} shift ended.`, 'success');
  logAudit('Shift ended', `${shift.name} shift`);
}

function startShift(shiftId) {
  if (!currentUser) return;
  const all = getFromStorage(STORAGE_KEYS.shifts);
  const shift = all.find((entry) => entry.id === shiftId);
  if (!shift || shift.status !== 'open') return;
  shift.status = 'started';
  shift.cashier = currentUser.username;
  shift.cashierName = currentUser.name;
  shift.startedAt = new Date().toISOString();
  writeToStorage(STORAGE_KEYS.shifts, all);
  renderShiftGate();
  showToast(`Shift started. Welcome, ${currentUser.name}!`, 'success');
  logAudit('Shift started', `${shift.name} shift`);
}

function renderShiftGate() {
  const gate = document.getElementById('shift-gate');
  if (gate) gate.classList.add('hidden');
}

function getMinutesUntilShiftEnd(shift) {
  const parts = String(shift.endTime || '23:59').split(':');
  const end = new Date();
  end.setHours(Number(parts[0]), Number(parts[1]), 0, 0);
  return (end - new Date()) / 60000;
}

function autoEndShift(shift) {
  const all = getFromStorage(STORAGE_KEYS.shifts);
  const stored = all.find((entry) => entry.id === shift.id);
  if (!stored || stored.status === 'ended') return;
  stored.status = 'ended';
  stored.endedAt = new Date().toISOString();
  writeToStorage(STORAGE_KEYS.shifts, all);
  renderTodayShifts();
  renderShiftGate();
  showToast(`${stored.name} shift ended.`, 'info', 3000);
  logAudit('Shift auto-ended', `${stored.name} shift ended by schedule`);
}

function checkShiftTimers() {
  if (!currentUser) return;
  const started = getTodayShifts().filter((shift) => shift.status === 'started');
  started.forEach((shift) => {
    const minsLeft = getMinutesUntilShiftEnd(shift);
    if (minsLeft <= 0) {
      autoEndShift(shift);
      return;
    }
    if (currentUser.role === 'cashier' && shift.cashier === currentUser.username) {
      if (minsLeft <= 5 && !shiftNotified5[shift.id]) {
        shiftNotified5[shift.id] = true;
        showToast(`${shift.name} shift ends in ${Math.ceil(minsLeft)} min.`, 'warning', 3000);
      }
    } else if (currentUser.role === 'admin' || currentUser.role === 'manager') {
      if (minsLeft <= 5 && !shiftNotified5[shift.id]) {
        shiftNotified5[shift.id] = true;
        const who = shift.cashierName || shift.cashier || 'a cashier';
        showToast(`${shift.name} shift (${who}) ends in ${Math.ceil(minsLeft)} min.`, 'warning', 3000);
      }
    }
  });
}

function checkCashierShiftEnded() {
  if (!currentUser || currentUser.role !== 'cashier') return;
  const ended = getTodayShifts().find((shift) => shift.cashier === currentUser.username && shift.status === 'ended');
  if (ended && !shiftNotified5['signed-out-' + ended.id]) {
    shiftNotified5['signed-out-' + ended.id] = true;
    showToast(`${ended.name} shift ended. You can continue using the POS.`, 'info', 3000);
  }
}

function syncSettingsHero() {
  const nameEl = document.getElementById('shop-name');
  if (!nameEl) return;

  const name = nameEl.value.trim() || 'FasterFood';
  document.getElementById('settings-hero-name').textContent = name;
  document.getElementById('settings-hero-avatar').textContent = name.charAt(0).toUpperCase();
  applyBrandName();

  const contact = [document.getElementById('shop-address').value.trim(), document.getElementById('shop-phone').value.trim(), document.getElementById('shop-email').value.trim(), document.getElementById('shop-website').value.trim()]
    .filter(Boolean)
    .join(' · ');
  document.getElementById('settings-hero-contact').textContent = contact || 'Set your contact details';

  document.getElementById('settings-hero-currency').textContent = document.getElementById('currency').value.trim() || 'NGN';

  const tax = Number(document.getElementById('tax-rate').value);
  document.getElementById('settings-hero-tax').textContent = `VAT ${Number.isFinite(tax) ? tax : 7.5}%`;
}

function getStoredSettings() {
  const settings = getFromStorage(STORAGE_KEYS.settings);
  return settings && typeof settings === 'object' ? settings : { ...defaultSettings };
}

function applyBrandName() {
  const config = getStoredSettings();
  const name = (config && config.shopName) || 'FasterFood';
  const navEl = document.getElementById('nav-brand-name');
  if (navEl) navEl.textContent = name;
  const loginEl = document.getElementById('login-brand-name');
  if (loginEl) loginEl.textContent = name;
}

const FULL_PACKAGE_PASSWORD = '@#Mother27';

const FEATURE_DEFS = [
  { key: 'tables', title: 'Dine-in table management', icon: '🍽', description: 'Assign orders to tables and track open tables.' },
  { key: 'kitchen', title: 'Kitchen display & order tickets', icon: '👨‍🍳', description: 'Send paid orders to a kitchen queue with preparation status.' },
  { key: 'delivery', title: 'Delivery & takeaway', icon: '🛵', description: 'Delivery fee, rider details and takeaway/delivery order flags.' },
  { key: 'modifiers', title: 'Modifiers, add-ons & notes', icon: '➕', description: 'Extra toppings, sizes and special instructions per item.' },
  { key: 'tips', title: 'Tips & service charge', icon: '💳', description: 'Add customer tips and automatic service charge at checkout.' },
  { key: 'reorder', title: 'Auto reorder & purchase orders', icon: '📦', description: 'Generate purchase orders from low stock automatically.' },
  { key: 'photos', title: 'Product photos', icon: '🖼️', description: 'Upload photos for menu items shown on the POS tiles.' },
  { key: 'online', title: 'Online ordering & QR menu', icon: '🌐', description: 'Public menu page with a QR code customers can scan.' },
  { key: 'branches', title: 'Multi-branch support', icon: '🏢', description: 'Manage branches and record which branch made each sale.' },
  { key: 'receipts', title: 'SMS/email receipts & marketing', icon: '📧', description: 'Send receipts and export a marketing contact list.' }
];

function getFeatures() {
  const settings = getStoredSettings();
  return { ...defaultSettings.features, ...(settings.features || {}) };
}

function getFeature(key) {
  return !!getFeatures()[key];
}

function getFeatureTitle(key) {
  const def = FEATURE_DEFS.find((entry) => entry.key === key);
  return def ? def.title : key;
}

function setFeature(key, value) {
  const settings = getStoredSettings();
  settings.features = { ...defaultSettings.features, ...(settings.features || {}), [key]: !!value };
  writeToStorage(STORAGE_KEYS.settings, settings);
  logAudit('Full Package feature', `${getFeatureTitle(key)} ${value ? 'enabled' : 'disabled'}`);
}

function refreshFeatureUI() {
  const features = getFeatures();
  applyNavPermissions();
  const tableBtn = document.getElementById('cart-table-btn');
  if (tableBtn) tableBtn.classList.toggle('hidden', !features.tables);
  const orderTypeBtn = document.getElementById('cart-order-type-btn');
  if (orderTypeBtn) orderTypeBtn.classList.toggle('hidden', !features.delivery);
  const photoField = document.getElementById('menu-photo-field');
  if (photoField) photoField.classList.toggle('hidden', !features.photos);
  updateMenuPhotoLock();
  renderCartTableBadge();
  renderCartOrderBadge();
  renderFeatureConfig();
  renderReportTabs();
  if (currentUser && document.getElementById('settings-panel') && document.getElementById('settings-panel').classList.contains('active')) {
    renderSettings();
  }
  if (currentUser && document.getElementById('reports-panel') && document.getElementById('reports-panel').classList.contains('active')) {
    renderReports();
  }
}

function openFullPackage() {
  if (!currentUser || currentUser.role !== 'admin') {
    showToast('Only the Owner can manage Full Package features.', 'error');
    return;
  }
  showPanel('fullpackage');
}

function renderFullPackageAuth() {
  const auth = document.getElementById('full-package-auth');
  const controls = document.getElementById('full-package-controls');
  if (!auth || !controls) return;
  if (fullPackageUnlocked) {
    auth.classList.add('hidden');
    controls.classList.remove('hidden');
    renderFullPackageList();
    renderFeatureConfig();
  } else {
    auth.classList.remove('hidden');
    controls.classList.add('hidden');
    const input = document.getElementById('full-package-password');
    if (input) {
      input.value = '';
      input.focus();
    }
    const errorEl = document.getElementById('full-package-error');
    if (errorEl) errorEl.textContent = '';
  }
}

function unlockFullPackage() {
  const input = document.getElementById('full-package-password');
  const errorEl = document.getElementById('full-package-error');
  if ((input.value || '') === FULL_PACKAGE_PASSWORD) {
    fullPackageUnlocked = true;
    logAudit('Full Package unlocked', 'Full Package manager opened by ' + (currentUser ? currentUser.name : 'unknown'));
    renderFullPackageAuth();
  } else if (errorEl) {
    errorEl.textContent = 'Incorrect activation password.';
    input.focus();
    input.select();
  }
}

function renderFullPackageList() {
  const container = document.getElementById('full-package-list');
  if (!container) return;
  const features = getFeatures();
  const countEl = document.getElementById('full-package-count');
  if (countEl) countEl.textContent = `${FEATURE_DEFS.filter((def) => features[def.key]).length} / ${FEATURE_DEFS.length} active`;
  container.innerHTML = FEATURE_DEFS.map((def) => `
    <div class="fp-row ${features[def.key] ? 'fp-on' : ''}">
      <div class="fp-icon">${def.icon}</div>
      <div class="fp-info">
        <strong>${def.title}</strong>
        <small>${def.description}</small>
      </div>
      <label class="toggle-row fp-toggle">
        <input type="checkbox" data-feature="${def.key}" ${features[def.key] ? 'checked' : ''} onchange="toggleFeature('${def.key}', this.checked)" />
        <span class="toggle-box"></span>
        <span class="fp-status">${features[def.key] ? 'On' : 'Off'}</span>
      </label>
    </div>
  `).join('');
}

function toggleFeature(key, value) {
  setFeature(key, value);
  renderFullPackageList();
  refreshFeatureUI();
  showToast(`${getFeatureTitle(key)} ${value ? 'activated' : 'deactivated'}`, value ? 'success' : 'info');
}

function renderFeatureConfig() {
  const container = document.getElementById('full-package-config');
  if (!container) return;
  const features = getFeatures();
  const settings = getStoredSettings();
  const parts = [];

  if (features.tables) {
    const tables = getTables();
    parts.push(`<div class="card-panel fp-config-card">
      <div class="card-title-row"><span class="card-icon green">🍽</span><div><h3>Dine-in tables</h3><p>Tables shown on the POS table picker.</p></div></div>
      <div class="fp-chips">${tables.map((name, i) => `<span class="fp-chip">${escapeHtml(name)} <button onclick="removeTable(${i})" title="Remove">×</button></span>`).join('') || '<span class="muted">No tables yet.</span>'}</div>
      <div class="pay-method-add">
        <input id="new-table-name" type="text" placeholder="e.g. Table 1" onkeydown="if(event.key==='Enter'){addTable();}" />
        <button class="action-btn primary" onclick="addTable()">Add table</button>
      </div>
    </div>`);
  }

  if (features.delivery) {
    parts.push(`<div class="card-panel fp-config-card">
      <div class="card-title-row"><span class="card-icon blue">🛵</span><div><h3>Delivery settings</h3><p>Flat fee applied to delivery orders.</p></div></div>
      <div class="settings-grid">
        <div class="field-group stacked"><label>Delivery fee (${getCurrencySymbol()})</label><input id="delivery-fee" type="number" min="0" step="50" value="${Number(settings.deliveryFee) || 0}" /></div>
        <div class="field-group stacked"><label>Rider label</label><input id="delivery-rider-label" type="text" value="${escapeHtml(settings.deliveryRiderLabel || 'Rider')}" /></div>
      </div>
      <div class="card-actions"><button class="action-btn primary" onclick="saveFeatureConfig()">Save delivery settings</button></div>
    </div>`);
  }

  if (features.tips) {
    parts.push(`<div class="card-panel fp-config-card">
      <div class="card-title-row"><span class="card-icon amber">💳</span><div><h3>Tips & service charge</h3><p>Service charge % is added automatically at checkout.</p></div></div>
      <div class="settings-grid">
        <div class="field-group stacked"><label>Service charge (%)</label><input id="service-charge-rate" type="number" min="0" step="0.5" value="${Number(settings.serviceChargeRate) || 0}" /></div>
        <div class="field-group stacked"><label>Tip quick options (${getCurrencySymbol()}, comma separated)</label><input id="tip-options" type="text" value="${escapeHtml((settings.tipOptions && settings.tipOptions.length ? settings.tipOptions : [500, 1000, 2000]).join(', '))}" /></div>
      </div>
      <div class="card-actions"><button class="action-btn primary" onclick="saveFeatureConfig()">Save</button></div>
    </div>`);
  }

  if (features.online) {
    const url = getPublicMenuUrl();
    parts.push(`<div class="card-panel fp-config-card">
      <div class="card-title-row"><span class="card-icon purple">🌐</span><div><h3>Online menu & QR</h3><p>Customers scan the QR code to open your menu on their phone.</p></div></div>
      <p class="form-hint">Public menu URL: <a href="${url}" target="_blank" rel="noopener">${url}</a></p>
      <div class="fp-qr"><img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}" alt="Menu QR code" /></div>
      <div class="card-actions"><a class="action-btn primary" href="${url}" target="_blank" rel="noopener">Open menu</a></div>
    </div>`);
  }

  if (features.branches) {
    const branches = getBranches();
    parts.push(`<div class="card-panel fp-config-card">
      <div class="card-title-row"><span class="card-icon orange">🏢</span><div><h3>Branches</h3><p>Active branch is recorded on new sales.</p></div></div>
      <div class="fp-chips">${branches.map((name, i) => `<span class="fp-chip ${name === settings.currentBranch ? 'fp-active' : ''}">${escapeHtml(name)} <button onclick="removeBranch(${i})" title="Remove">×</button></span>`).join('') || '<span class="muted">No branches yet.</span>'}</div>
      <div class="pay-method-add">
        <input id="new-branch-name" type="text" placeholder="e.g. Lekki Branch" onkeydown="if(event.key==='Enter'){addBranch();}" />
        <button class="action-btn primary" onclick="addBranch()">Add branch</button>
      </div>
      ${branches.length ? `
        <div class="field-group stacked"><label>Active branch</label>
          <select id="active-branch" onchange="setActiveBranch(this.value)">
            ${branches.map((name) => `<option value="${escapeHtml(name)}" ${name === settings.currentBranch ? 'selected' : ''}>${escapeHtml(name)}</option>`).join('')}
          </select>
        </div>` : ''}
    </div>`);
  }

  if (features.receipts) {
    parts.push(`<div class="card-panel fp-config-card">
      <div class="card-title-row"><span class="card-icon red">📧</span><div><h3>Marketing contacts</h3><p>Export customer phone/email list for SMS or email campaigns.</p></div></div>
      <div class="card-actions">
        <button class="action-btn primary" onclick="exportMarketingCsv()">Export contacts CSV</button>
      </div>
    </div>`);
  }

  container.innerHTML = parts.join('') || '';
}

function saveFeatureConfig() {
  const settings = getStoredSettings();
  const fee = document.getElementById('delivery-fee');
  const riderLabel = document.getElementById('delivery-rider-label');
  const serviceCharge = document.getElementById('service-charge-rate');
  const tipOptions = document.getElementById('tip-options');
  if (fee) settings.deliveryFee = Number(fee.value) || 0;
  if (riderLabel) settings.deliveryRiderLabel = riderLabel.value.trim() || 'Rider';
  if (serviceCharge) settings.serviceChargeRate = Number(serviceCharge.value) || 0;
  if (tipOptions) {
    const parsed = tipOptions.value.split(',').map((value) => Number(value.trim()) || 0).filter((value) => value > 0);
    settings.tipOptions = parsed.length ? parsed : [500, 1000, 2000];
  }
  writeToStorage(STORAGE_KEYS.settings, settings);
  showToast('Feature settings saved.', 'success');
  logAudit('Full Package settings', 'Feature settings updated');
  renderFeatureConfig();
}

function getTables() {
  const settings = getStoredSettings();
  return Array.isArray(settings.tables) ? settings.tables.filter(Boolean) : [];
}

function addTable() {
  const input = document.getElementById('new-table-name');
  if (!input) return;
  const name = input.value.trim();
  if (!name) return;
  const settings = getStoredSettings();
  const tables = getTables();
  if (tables.includes(name)) { showToast('That table already exists.', 'error'); return; }
  tables.push(name);
  settings.tables = tables;
  writeToStorage(STORAGE_KEYS.settings, settings);
  input.value = '';
  renderFeatureConfig();
  showToast(`Table "${name}" added.`);
}

function removeTable(index) {
  const settings = getStoredSettings();
  const tables = getTables();
  const removed = tables.splice(index, 1);
  settings.tables = tables;
  writeToStorage(STORAGE_KEYS.settings, settings);
  if (removed.length && cartTable === removed[0]) { cartTable = null; renderCartTableBadge(); }
  renderFeatureConfig();
}

function getBranches() {
  const settings = getStoredSettings();
  return Array.isArray(settings.branches) ? settings.branches.filter(Boolean) : [];
}

function getCurrentBranch() {
  const settings = getStoredSettings();
  return settings.currentBranch || (getBranches()[0] || '');
}

function addBranch() {
  const input = document.getElementById('new-branch-name');
  if (!input) return;
  const name = input.value.trim();
  if (!name) return;
  const settings = getStoredSettings();
  const branches = getBranches();
  if (branches.includes(name)) { showToast('That branch already exists.', 'error'); return; }
  branches.push(name);
  settings.branches = branches;
  if (!settings.currentBranch) settings.currentBranch = name;
  writeToStorage(STORAGE_KEYS.settings, settings);
  input.value = '';
  renderFeatureConfig();
  showToast(`Branch "${name}" added.`);
}

function removeBranch(index) {
  const settings = getStoredSettings();
  const branches = getBranches();
  const removed = branches.splice(index, 1);
  settings.branches = branches;
  if (removed.length && settings.currentBranch === removed[0]) {
    settings.currentBranch = branches[0] || '';
  }
  writeToStorage(STORAGE_KEYS.settings, settings);
  renderFeatureConfig();
}

function setActiveBranch(name) {
  const settings = getStoredSettings();
  settings.currentBranch = name;
  writeToStorage(STORAGE_KEYS.settings, settings);
  showToast(`Active branch set to "${name}".`, 'success');
}

function getCurrencySymbol() {
  const settings = getStoredSettings();
  return (settings.currency === 'USD') ? '$'
    : (settings.currency === 'GBP') ? '£'
    : (settings.currency === 'EUR') ? '€'
    : '₦';
}

function getPublicMenuUrl() {
  return (window.location.origin || 'http://' + window.location.host) + '/menu';
}

function exportMarketingCsv() {
  const customers = getFromStorage(STORAGE_KEYS.customers);
  const sales = getFromStorage(STORAGE_KEYS.sales);
  const escapeCell = (value) => {
    const text = String(value ?? '');
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  const header = 'Name,Phone,Email,Visits,Total spend,Points,Last visit';
  const rows = customers.map((customer) => {
    const customerSales = sales.filter((sale) => sale.customerId === customer.id);
    const visits = customerSales.length;
    const spend = customerSales.reduce((sum, sale) => sum + sale.total, 0);
    return [
      customer.name,
      customer.phone || '',
      customer.email || '',
      visits,
      spend,
      customer.points || 0,
      customer.lastVisit ? new Date(customer.lastVisit).toLocaleDateString() : ''
    ].map(escapeCell).join(',');
  });
  const csv = '\uFEFF' + [header, ...rows].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'marketing-contacts-' + new Date().toISOString().slice(0, 10) + '.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
  showToast('Marketing contacts exported.', 'success');
  logAudit('Marketing export', `Contact list exported · ${customers.length} customer(s)`);
}

function renderCartTableBadge() {
  const badge = document.getElementById('cart-table-badge');
  if (badge) badge.textContent = cartTable ? `Table ${cartTable}` : 'No table';
}

function renderCartOrderBadge() {
  const badge = document.getElementById('cart-order-badge');
  if (badge) {
    const labels = { dinein: 'Dine-in', takeaway: 'Takeaway', delivery: 'Delivery' };
    badge.textContent = labels[cartOrderType] || 'Dine-in';
  }
}

function openTablePicker() {
  const container = document.getElementById('table-picker-list');
  if (!container) return;
  const tables = getTables();
  container.innerHTML = `<button class="fp-table-btn ${!cartTable ? 'active' : ''}" data-t="" onclick="selectCartTable(this.dataset.t)">No table</button>` +
    tables.map((name) => `<button class="fp-table-btn ${cartTable === name ? 'active' : ''}" data-t="${escapeHtml(name)}" onclick="selectCartTable(this.dataset.t)">${escapeHtml(name)}</button>`).join('');
  document.getElementById('table-picker-modal').classList.remove('hidden');
}

function closeTablePicker() {
  document.getElementById('table-picker-modal').classList.add('hidden');
}

function selectCartTable(name) {
  cartTable = name || null;
  closeTablePicker();
  renderCartTableBadge();
  renderCart();
}

function openDeliveryModal() {
  const modal = document.getElementById('delivery-modal');
  if (!modal) return;
  document.querySelectorAll('input[name="cart-order-type"]').forEach((input) => {
    input.checked = input.value === cartOrderType;
  });
  document.getElementById('delivery-address').value = cartDelivery.address || '';
  document.getElementById('delivery-rider-name').value = cartDelivery.riderName || '';
  document.getElementById('delivery-rider-phone').value = cartDelivery.riderPhone || '';
  modal.classList.remove('hidden');
}

function closeDeliveryModal() {
  document.getElementById('delivery-modal').classList.add('hidden');
}

function saveDeliveryModal() {
  const selected = document.querySelector('input[name="cart-order-type"]:checked');
  cartOrderType = selected ? selected.value : 'dinein';
  cartDelivery = {
    address: document.getElementById('delivery-address').value.trim(),
    riderName: document.getElementById('delivery-rider-name').value.trim(),
    riderPhone: document.getElementById('delivery-rider-phone').value.trim()
  };
  closeDeliveryModal();
  renderCartOrderBadge();
  renderCart();
}

function renderTablesPanel() {
  const container = document.getElementById('tables-view');
  if (!container) return;
  const tables = getTables();
  const sales = getFromStorage(STORAGE_KEYS.sales);
  const activeTables = {};
  sales.forEach((sale) => {
    if (sale.savedOnly || !sale.table) return;
    const created = new Date(sale.createdAt);
    const now = new Date();
    const isToday = created.getFullYear() === now.getFullYear() && created.getMonth() === now.getMonth() && created.getDate() === now.getDate();
    if (isToday && !sale.refunded) {
      if (!activeTables[sale.table]) activeTables[sale.table] = { count: 0, total: 0 };
      activeTables[sale.table].count += 1;
      activeTables[sale.table].total += sale.total;
    }
  });

  if (!tables.length) {
    container.innerHTML = '<div class="report-empty">No tables added yet. Add tables from Settings → Full Package → Dine-in tables.</div>';
    return;
  }

  container.innerHTML = `
    <div class="tables-grid">
      ${tables.map((name) => {
        const info = activeTables[name];
        return `
          <div class="table-card ${info ? 'occupied' : ''}" data-t="${escapeHtml(name)}" onclick="assignTableOrder(this.dataset.t)">
            <div class="table-card-head">
              <strong>${escapeHtml(name)}</strong>
              <span class="table-status">${info ? 'Occupied' : 'Free'}</span>
            </div>
            ${info
              ? `<div class="table-card-stats"><span>${info.count} order(s)</span><strong>${formatCurrency(info.total)}</strong></div>`
              : '<div class="table-card-stats muted">No active order</div>'}
          </div>`;
      }).join('')}
    </div>`;
}

function assignTableOrder(name) {
  cartTable = name;
  showPanel('pos');
  renderCartTableBadge();
  renderCart();
  showToast(`Order assigned to ${name}.`);
}

function renderKitchenPanel() {
  const container = document.getElementById('kitchen-view');
  if (!container) return;
  const sales = getFromStorage(STORAGE_KEYS.sales)
    .filter((sale) => !sale.savedOnly && sale.kitchenStatus !== 'done')
    .filter((sale) => {
      const created = new Date(sale.createdAt);
      const now = new Date();
      return created.getFullYear() === now.getFullYear() && created.getMonth() === now.getMonth() && created.getDate() === now.getDate();
    })
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  container.innerHTML = `
    <div class="kitchen-head">
      <h3>Kitchen queue</h3>
      <span class="group-count">${sales.length} ticket(s)</span>
    </div>
    ${sales.length
      ? `<div class="kitchen-grid">
          ${sales.map((sale) => `
            <div class="kitchen-ticket status-${sale.kitchenStatus || 'pending'}">
              <div class="kt-head">
                <strong>#${sale.invoice}</strong>
                <span class="kt-time">${new Date(sale.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div class="kt-meta">
                ${sale.table ? `<span>Table ${escapeHtml(sale.table)}</span>` : ''}
                ${sale.orderType ? `<span>${sale.orderType.charAt(0).toUpperCase() + sale.orderType.slice(1)}</span>` : ''}
                ${sale.kitchenStatus === 'preparing' ? '<span class="status-pill pill-amber">Preparing</span>' : '<span class="status-pill pill-gray">Pending</span>'}
              </div>
              <div class="kt-items">
                ${sale.items.map((item) => `
                  <div class="kt-item">
                    <strong>${item.qty}×</strong> ${escapeHtml(item.name)}
                    ${item.options && item.options.length ? `<div class="kt-options">${item.options.map((option) => option.label).join(', ')}</div>` : ''}
                    ${item.note ? `<div class="kt-note">📝 ${escapeHtml(item.note)}</div>` : ''}
                  </div>`).join('')}
              </div>
              <div class="kt-actions">
                ${(sale.kitchenStatus || 'pending') === 'pending'
                  ? `<button class="action-btn primary" onclick="setKitchenStatus(${sale.id}, 'preparing')">Start preparing</button>`
                  : `<button class="action-btn success" onclick="setKitchenStatus(${sale.id}, 'done')">Mark done</button>`}
              </div>
            </div>`).join('')}
        </div>`
      : '<div class="report-empty">No active kitchen tickets.</div>'}`;
}

function setKitchenStatus(saleId, status) {
  const sales = getFromStorage(STORAGE_KEYS.sales);
  const sale = sales.find((entry) => entry.id === saleId);
  if (!sale) return;
  sale.kitchenStatus = status;
  sale.kitchenUpdatedAt = new Date().toISOString();
  writeToStorage(STORAGE_KEYS.sales, sales);
  renderKitchenPanel();
  if (document.getElementById('orders-panel').classList.contains('active')) renderOrdersManager();
}

function renderPurchaseOrdersPanel() {
  const container = document.getElementById('purchase-orders-view');
  if (!container) return;
  const pos = getFromStorage(STORAGE_KEYS.purchaseOrders);
  const lowStock = getFromStorage(STORAGE_KEYS.inventory).filter((item) => Number(item.stock) <= Number(item.reorderLevel));

  container.innerHTML = `
    <div class="card-panel">
      <div class="card-title-row">
        <div>
          <h3>Reorder suggestions</h3>
          <p>Items at or below their reorder level. Generate a purchase order for them.</p>
        </div>
        <span class="group-count">${lowStock.length} low</span>
      </div>
      ${lowStock.length
        ? `<div class="mini-list">
            ${lowStock.map((item) => `<div class="list-row">
              <div class="mini-item">
                <span class="mini-avatar">${item.name.charAt(0).toUpperCase()}</span>
                <div><div>${escapeHtml(item.name)}</div><small>${item.stock} ${item.unit || 'pcs'} left · reorder at ${item.reorderLevel}</small></div>
              </div>
              <span class="badge warning">Low</span>
            </div>`).join('')}
          </div>
          <div class="card-actions"><button class="action-btn primary" onclick="generatePurchaseOrder()">Generate purchase order</button></div>`
        : '<div class="list-row"><div>All stock levels are healthy.</div><span class="badge safe">OK</span></div>'}
    </div>
    <div class="card-panel">
      <div class="card-title-row"><div><h3>Purchase orders</h3><p>Track orders you place with suppliers.</p></div><span class="group-count">${pos.length}</span></div>
      <div class="mini-list" id="purchase-orders-list">
        ${pos.length ? pos.map(renderPurchaseOrderRow).join('') : '<div class="list-row"><div>No purchase orders yet.</div></div>'}
      </div>
    </div>`;
}

function renderPurchaseOrderRow(po) {
  const statusLabel = po.status === 'received' ? 'Received' : po.status === 'ordered' ? 'Ordered' : 'Draft';
  const pillClass = po.status === 'received' ? 'pill-green' : po.status === 'ordered' ? 'pill-amber' : 'pill-gray';
  return `
    <div class="po-row">
      <div class="saved-order-info">
        <div class="saved-order-title">PO #${po.number} · ${formatCurrency(po.totalCost)}</div>
        <small>${new Date(po.createdAt).toLocaleString()} · ${po.lines.length} line(s) · <span class="status-pill ${pillClass}">${statusLabel}</span></small>
        <div class="saved-order-items">${po.lines.map((line) => `${escapeHtml(line.name)} ×${line.qty}`).join(', ')}</div>
      </div>
      <div class="saved-order-actions">
        ${po.status === 'draft' ? `<button class="action-btn primary" onclick="markPOOrdered(${po.id})">Mark ordered</button>` : ''}
        ${po.status === 'ordered' ? `<button class="action-btn success" onclick="markPOReceived(${po.id})">Receive stock</button>` : ''}
        <button class="action-btn danger" onclick="deletePO(${po.id})">Delete</button>
      </div>
    </div>`;
}

function getNextPONumber() {
  const pos = getFromStorage(STORAGE_KEYS.purchaseOrders);
  return (pos.reduce((max, po) => Math.max(max, Number(po.number) || 0), 0) || 0) + 1;
}

function generatePurchaseOrder() {
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  const lowStock = inventory.filter((item) => Number(item.stock) <= Number(item.reorderLevel));
  if (!lowStock.length) { showToast('No items need reordering.', 'info'); return; }
  const pos = getFromStorage(STORAGE_KEYS.purchaseOrders);
  const lines = lowStock.map((item) => {
    const target = Math.max(Number(item.reorderLevel) * 2, Number(item.reorderLevel) + 1);
    const qty = Math.max(target - Number(item.stock), 1);
    const price = Number(item.price) || 0;
    return { inventoryId: item.id, name: item.name, unit: item.unit || 'pcs', qty, price, total: qty * price };
  });
  const po = {
    id: Date.now(),
    number: getNextPONumber(),
    status: 'draft',
    lines,
    totalCost: lines.reduce((sum, line) => sum + line.total, 0),
    createdAt: new Date().toISOString(),
    createdBy: currentUser ? currentUser.name : '—'
  };
  pos.unshift(po);
  writeToStorage(STORAGE_KEYS.purchaseOrders, pos);
  renderPurchaseOrdersPanel();
  showToast('Purchase order generated.', 'success');
  logAudit('Purchase order', `PO #${po.number} generated · ${formatCurrency(po.totalCost)}`);
}

function markPOOrdered(poId) {
  const pos = getFromStorage(STORAGE_KEYS.purchaseOrders);
  const po = pos.find((entry) => entry.id === poId);
  if (!po) return;
  po.status = 'ordered';
  po.orderedAt = new Date().toISOString();
  writeToStorage(STORAGE_KEYS.purchaseOrders, pos);
  renderPurchaseOrdersPanel();
  showToast(`PO #${po.number} marked as ordered.`, 'success');
}

function markPOReceived(poId) {
  const pos = getFromStorage(STORAGE_KEYS.purchaseOrders);
  const po = pos.find((entry) => entry.id === poId);
  if (!po) return;
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  po.lines.forEach((line) => {
    const item = inventory.find((entry) => entry.id === line.inventoryId);
    if (item) {
      item.stock = Number(item.stock) + line.qty;
      logStockIn(line.name, line.qty, `PO #${po.number}`);
    }
  });
  po.status = 'received';
  po.receivedAt = new Date().toISOString();
  writeToStorage(STORAGE_KEYS.purchaseOrders, pos);
  writeToStorage(STORAGE_KEYS.inventory, inventory);
  renderPurchaseOrdersPanel();
  renderInventoryManager();
  showToast(`PO #${po.number} received. Stock updated.`, 'success');
  logAudit('Purchase order received', `PO #${po.number} · stock added to ${po.lines.length} item(s)`);
}

function deletePO(poId) {
  const pos = getFromStorage(STORAGE_KEYS.purchaseOrders);
  const po = pos.find((entry) => entry.id === poId);
  if (!po) return;
  const updated = pos.filter((entry) => entry.id !== poId);
  writeToStorage(STORAGE_KEYS.purchaseOrders, updated);
  renderPurchaseOrdersPanel();
  showToast(`PO #${po.number} deleted.`, 'info');
}

let bookOrdersPage = 1;
let bookOrderFilter = 'all';
let editingBookOrderId = null;
let bookOrderCart = [];
let bookOrderCakePrice = 0;

function getBookOrderCakes() {
  const menu = getFromStorage(STORAGE_KEYS.menu);
  const cakes = menu.filter((item) => /cake/i.test(item.name));
  const custom = [
    { id: 0, name: 'Custom cake (type your own)', price: 0 }
  ];
  return [...custom, ...cakes];
}

function setBookOrderFilter(filter) {
  bookOrderFilter = filter;
  bookOrdersPage = 1;
  document.querySelectorAll('#bookorders-filter .period-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.bofilter === filter);
  });
  renderBookOrdersPanel();
}

function getBookOrderStats() {
  const orders = getFromStorage(STORAGE_KEYS.bookOrders);
  const total = orders.length;
  const pending = orders.filter((o) => o.status === 'pending' || o.status === undefined).length;
  const collected = orders.filter((o) => o.status === 'collected').length;
  const voided = orders.filter((o) => o.status === 'voided').length;
  const outstanding = orders
    .filter((o) => o.status === 'pending' || o.status === undefined)
    .reduce((sum, o) => sum + (Number(o.balance) || 0), 0);
  return { total, pending, collected, voided, outstanding };
}

function renderBookOrdersPanel() {
  backfillBookOrderInvoices();
  const stats = getBookOrderStats();
  const statCards = [
    { label: 'Total book orders', value: stats.total, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5h12l1.5 17h-15z"/><path d="M9 8.5h6"/><path d="M9 12.5h6"/></svg>', tone: 'blue' },
    { label: 'Pending pick-up', value: stats.pending, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 8v4l3 2"/></svg>', tone: 'amber' },
    { label: 'Collected', value: stats.collected, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>', tone: 'green' },
    { label: 'Voided', value: stats.voided, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>', tone: 'red' },
    { label: 'Outstanding balance', value: formatCurrency(stats.outstanding), icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>', tone: 'red' }
  ];
  document.getElementById('bookorders-stats').innerHTML = statCards.map((stat) => `
    <div class="stat-card tone-${stat.tone}">
      <div class="stat-icon">${stat.icon}</div>
      <div class="stat-label">${stat.label}</div>
      <div class="stat-value">${stat.value}</div>
    </div>
  `).join('');

  let orders = getFromStorage(STORAGE_KEYS.bookOrders);
  const query = (document.getElementById('bookorders-search')?.value || '').trim().toLowerCase();
  if (query) {
    orders = orders.filter((o) =>
      (o.customerName || '').toLowerCase().includes(query) ||
      (o.phone || '').toLowerCase().includes(query) ||
      (o.invoice || '').toLowerCase().includes(query) ||
      (o.number || '').toLowerCase().includes(query)
    );
  }
  if (bookOrderFilter === 'online') orders = orders.filter((o) => o.source === 'online');
  if (bookOrderFilter === 'personal') orders = orders.filter((o) => o.source === 'personal');
  if (bookOrderFilter === 'cake') orders = orders.filter((o) => o.category === 'cake');
  if (bookOrderFilter === 'other') orders = orders.filter((o) => o.category === 'other');
  if (bookOrderFilter === 'pending') orders = orders.filter((o) => o.status !== 'collected' && o.status !== 'voided');
  if (bookOrderFilter === 'collected') orders = orders.filter((o) => o.status === 'collected');
  if (bookOrderFilter === 'voided') orders = orders.filter((o) => o.status === 'voided');

  const reversed = orders.slice().reverse();
  const totalPages = Math.max(1, Math.ceil(reversed.length / LIST_PAGE_SIZE));
  if (bookOrdersPage > totalPages) bookOrdersPage = totalPages;
  const pageOrders = reversed.slice((bookOrdersPage - 1) * LIST_PAGE_SIZE, bookOrdersPage * LIST_PAGE_SIZE);

  document.getElementById('bookorders-list').innerHTML = pageOrders.length
    ? pageOrders.map((order) => renderBookOrderRow(order)).join('')
    : '<div class="report-empty">No book orders found.</div>';
  renderListPagination('bookorders-pagination', bookOrdersPage, totalPages, reversed.length, 'changeBookOrdersPage', 'goToBookOrdersPage');
}

function changeBookOrdersPage(delta) {
  bookOrdersPage = Math.max(1, bookOrdersPage + delta);
  renderBookOrdersPanel();
}

function goToBookOrdersPage(page) {
  bookOrdersPage = page;
  renderBookOrdersPanel();
}

function bookOrderStatusPill(order) {
  if (order.status === 'voided') return '<span class="status-pill pill-red">Voided</span>';
  if (order.status === 'collected') return '<span class="status-pill pill-green">Collected</span>';
  return '<span class="status-pill pill-amber">Pending</span>';
}

function renderBookOrderRow(order) {
  const sourceLabel = order.source === 'online' ? '🌐 Online' : '🤝 Personal';
  const sourceClass = order.source === 'online' ? 'pill-blue' : 'pill-purple';
  const categoryLabel = order.category === 'cake' ? '🎂 Cake' : '📦 Other';
  const itemSummary = [];
  if (order.category === 'cake' && order.cakeType) itemSummary.push(`<div class="book-order-item-line"><span>Cake: <strong>${escapeHtml(order.cakeType)}</strong></span><span>×1</span></div>`);
  (order.items || []).forEach((item) => itemSummary.push(`<div class="book-order-item-line"><span>${escapeHtml(item.name)}</span><span>×${item.qty}</span></div>`));
  const invoice = order.invoice || order.number || '—';
  return `
    <div class="book-order-card ${order.status === 'collected' ? 'is-collected' : ''} ${order.status === 'voided' ? 'is-voided' : ''}">
      <div class="book-order-card-head">
        <div class="book-order-id">
          <div class="book-order-invoice">${escapeHtml(invoice)}</div>
          <small>Order #${order.number} · ${new Date(order.createdAt).toLocaleString()}</small>
        </div>
        <div class="book-order-head-right">
          <span class="status-pill ${sourceClass}">${sourceLabel}</span>
          <span class="status-pill pill-gray">${categoryLabel}</span>
          ${bookOrderStatusPill(order)}
        </div>
      </div>
      <div class="book-order-card-body">
        <div class="book-order-customer">
          <span class="mini-avatar">${(order.customerName || '?').charAt(0).toUpperCase()}</span>
          <div class="book-order-customer-info">
            <strong>${escapeHtml(order.customerName || '—')}</strong>
            <small>📞 ${escapeHtml(order.phone || '—')}</small>
            <small class="book-order-addr">📍 ${escapeHtml(order.address || '—')}</small>
          </div>
        </div>
        <div class="book-order-items">
          <div class="book-order-items-title">Items</div>
          ${itemSummary.length ? itemSummary.join('') : '<div class="book-order-item-line"><span>—</span></div>'}
        </div>
        <div class="book-order-collect">
          <div class="book-order-collect-row">
            <span>📅 Collection</span>
            <strong>${order.collectionDate ? new Date(order.collectionDate + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</strong>
          </div>
          <div class="book-order-collect-row">
            <span>Total</span>
            <strong>${formatCurrency(order.total)}</strong>
          </div>
          <div class="book-order-collect-row">
            <span>Part payment</span>
            <strong>${formatCurrency(order.partPayment)}</strong>
          </div>
          <div class="book-order-collect-row due">
            <span>Balance due</span>
            <strong>${formatCurrency(order.balance)}</strong>
          </div>
        </div>
      </div>
      <div class="book-order-card-actions">
        <button class="action-btn primary" onclick="printBookOrderReceipt(${order.id})" title="Print receipt"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V3h12v6"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg> Receipt</button>
        ${order.status === 'collected'
          ? `<button class="action-btn danger" onclick="voidBookOrder(${order.id})" title="Void order"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="m4 9 4-4"/><path d="M16 10h6v6h-6z"/><path d="M21 13h-3"/><path d="M3 21h18"/></svg> Void</button>`
          : `<button class="action-btn excel" onclick="printBookOrderInvoice(${order.id})" title="Print invoice"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m8 13 2 2 4-4"/></svg> Invoice</button>
        <button class="action-btn secondary" onclick="openBookOrderModal(${order.id})" title="Edit order"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg> Edit</button>
        ${order.status === 'pending' || order.status === undefined
          ? `<button class="action-btn success" onclick="collectBookOrder(${order.id})" title="Mark as collected"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg> Collect</button>`
          : ''}
        ${order.status !== 'voided'
          ? `<button class="action-btn danger" onclick="voidBookOrder(${order.id})" title="Void order"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="m4 9 4-4"/><path d="M16 10h6v6h-6z"/><path d="M21 13h-3"/><path d="M3 21h18"/></svg> Void</button>`
          : ''}
        <button class="action-btn danger bo-delete-btn" onclick="deleteBookOrder(${order.id})" title="Delete order"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>`}
      </div>
    </div>
  `;
}

function openBookOrderModal(id) {
  editingBookOrderId = id || null;
  bookOrderCart = [];
  bookOrderCakePrice = 0;
  document.getElementById('book-order-error').textContent = '';

  const order = id ? getFromStorage(STORAGE_KEYS.bookOrders).find((o) => o.id === id) : null;
  const title = document.getElementById('book-order-modal-title');
  const invoiceDisplay = document.getElementById('book-order-invoice-display');
  title.textContent = order ? `Edit book order #${order.number}` : 'New book order';
  invoiceDisplay.textContent = order ? (order.invoice || order.number) : formatBookOrderInvoice(getNextBookOrderInvoice());

  if (order) {
    document.querySelector('input[name="book-order-source"][value="' + (order.source || 'online') + '"]').checked = true;
    document.querySelector('input[name="book-order-category"][value="' + (order.category || 'cake') + '"]').checked = true;
    document.getElementById('book-order-customer-name').value = order.customerName || '';
    document.getElementById('book-order-phone').value = order.phone || '';
    document.getElementById('book-order-address').value = order.address || '';
    document.getElementById('book-order-part-payment').value = order.partPayment ?? '';
    document.getElementById('book-order-collection-date').value = order.collectionDate || '';
    bookOrderCart = (order.items || []).map((item) => ({ ...item }));
    bookOrderCakePrice = Number(order.cakePrice) || 0;
    populateBookOrderCakeSelect(order.cakeType || '');
  } else {
    document.querySelector('input[name="book-order-source"][value="online"]').checked = true;
    document.querySelector('input[name="book-order-category"][value="cake"]').checked = true;
    document.getElementById('book-order-customer-name').value = '';
    document.getElementById('book-order-phone').value = '';
    document.getElementById('book-order-address').value = '';
    document.getElementById('book-order-part-payment').value = '';
    document.getElementById('book-order-collection-date').value = '';
    bookOrderCakePrice = 0;
    populateBookOrderCakeSelect('');
  }

  bookOrderToggleFields();
  renderBookOrderProductPicker('');
  renderBookOrderItems();
  bookOrderUpdateTotals();
  document.getElementById('book-order-modal').classList.remove('hidden');
}

function closeBookOrderModal() {
  document.getElementById('book-order-modal').classList.add('hidden');
  editingBookOrderId = null;
  bookOrderCart = [];
}

function populateBookOrderCakeSelect(selectedName) {
  const select = document.getElementById('book-order-cake-type');
  const cakes = getBookOrderCakes();
  select.innerHTML = cakes.map((cake) => `
    <option value="${escapeHtml(cake.name)}" data-price="${Number(cake.price) || 0}" ${cake.name === selectedName ? 'selected' : ''}>
      ${escapeHtml(cake.name)}${cake.price ? ` — ${formatCurrency(cake.price)}` : ''}
    </option>
  `).join('');
  const chosen = cakes.find((cake) => cake.name === selectedName);
  document.getElementById('book-order-cake-price').value = chosen ? (Number(chosen.price) || 0) : (bookOrderCakePrice || 0);
  bookOrderCakePrice = Number(document.getElementById('book-order-cake-price').value) || 0;
}

function bookOrderCakeSelected() {
  const select = document.getElementById('book-order-cake-type');
  const option = select.selectedOptions[0];
  const price = Number(option ? option.dataset.price : 0) || 0;
  document.getElementById('book-order-cake-price').value = price;
  bookOrderCakePrice = price;
  bookOrderUpdateTotals();
}

function bookOrderCakePriceChanged() {
  bookOrderCakePrice = Number(document.getElementById('book-order-cake-price').value) || 0;
  bookOrderUpdateTotals();
}

function bookOrderToggleFields() {
  const category = document.querySelector('input[name="book-order-category"]:checked').value;
  document.getElementById('book-order-cake-section').style.display = category === 'cake' ? '' : 'none';
}

function renderBookOrderProductPicker(query) {
  const container = document.getElementById('book-order-product-picker');
  if (!container) return;
  const menu = getFromStorage(STORAGE_KEYS.menu);
  const q = (query || '').trim().toLowerCase();
  const items = menu.filter((item) => !q || item.name.toLowerCase().includes(q)).slice(0, 40);
  container.innerHTML = items.length
    ? items.map((item) => `
        <div class="list-row book-order-pick-row">
          <div class="mini-item">
            <span class="mini-avatar">${item.name.charAt(0).toUpperCase()}</span>
            <div>
              <div>${escapeHtml(item.name)}</div>
              <small>${escapeHtml(item.category || 'Menu')} · ${formatCurrency(item.price)}</small>
            </div>
          </div>
          <button class="action-btn secondary" onclick="addBookOrderProduct(${item.id})">Add</button>
        </div>
      `).join('')
    : '<div class="list-row"><div>No products match.</div></div>';
}

function addBookOrderProduct(itemId) {
  const menu = getFromStorage(STORAGE_KEYS.menu);
  const item = menu.find((entry) => entry.id === itemId);
  if (!item) return;
  const existing = bookOrderCart.find((entry) => entry.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    bookOrderCart.push({ id: item.id, name: item.name, price: Number(item.price) || 0, qty: 1 });
  }
  renderBookOrderItems();
  bookOrderUpdateTotals();
}

function updateBookOrderItemQty(index, delta) {
  const item = bookOrderCart[index];
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) bookOrderCart.splice(index, 1);
  renderBookOrderItems();
  bookOrderUpdateTotals();
}

function removeBookOrderItem(index) {
  bookOrderCart.splice(index, 1);
  renderBookOrderItems();
  bookOrderUpdateTotals();
}

function renderBookOrderItems() {
  const container = document.getElementById('book-order-items');
  container.innerHTML = bookOrderCart.length
    ? `
    <div class="book-order-items-table">
      <div class="bo-item-row bo-item-head">
        <span>Item</span>
        <span class="bo-col-price">Price</span>
        <span class="bo-col-qty">Qty</span>
        <span class="bo-col-total">Line total</span>
        <span class="bo-col-x"></span>
      </div>
      ${bookOrderCart.map((item, index) => `
        <div class="bo-item-row">
          <div class="bo-item-name">${escapeHtml(item.name)}</div>
          <div class="bo-col-price">${formatCurrency(item.price)}</div>
          <div class="bo-col-qty">
            <button class="action-btn secondary bo-qty-btn" onclick="updateBookOrderItemQty(${index}, -1)">−</button>
            <strong>${item.qty}</strong>
            <button class="action-btn secondary bo-qty-btn" onclick="updateBookOrderItemQty(${index}, 1)">+</button>
          </div>
          <div class="bo-col-total">${formatCurrency((Number(item.price) || 0) * item.qty)}</div>
          <div class="bo-col-x"><button class="action-btn danger bo-remove-btn" onclick="removeBookOrderItem(${index})">✕</button></div>
        </div>
      `).join('')}
    </div>`
    : '<div class="list-row"><div>No products added yet. Search and add products above.</div></div>';
}

function bookOrderUpdateTotals() {
  const category = document.querySelector('input[name="book-order-category"]:checked')?.value || 'cake';
  const cakeTotal = category === 'cake' ? (Number(document.getElementById('book-order-cake-price').value) || 0) : 0;
  const productsTotal = bookOrderCart.reduce((sum, item) => sum + (Number(item.price) || 0) * item.qty, 0);
  const total = cakeTotal + productsTotal;
  const partPayment = Number(document.getElementById('book-order-part-payment').value) || 0;
  const balance = Math.max(0, total - partPayment);
  document.getElementById('book-order-total').textContent = formatCurrency(total);
  const partDisplay = document.getElementById('book-order-part-payment-display');
  if (partDisplay) partDisplay.textContent = formatCurrency(partPayment);
  document.getElementById('book-order-balance').textContent = formatCurrency(balance);
}

function getNextBookOrderNumber() {
  const orders = getFromStorage(STORAGE_KEYS.bookOrders);
  return (orders.reduce((max, o) => Math.max(max, Number(String(o.number).replace(/\D/g, '')) || 0), 0) || 0) + 1;
}

function getNextBookOrderInvoice() {
  const orders = getFromStorage(STORAGE_KEYS.bookOrders);
  return (orders.reduce((max, o) => Math.max(max, Number(String(o.invoice).replace(/\D/g, '')) || 0), 0) || 0) + 1;
}

function backfillBookOrderInvoices() {
  const orders = getFromStorage(STORAGE_KEYS.bookOrders);
  let changed = false;
  let next = (orders.reduce((max, o) => Math.max(max, Number(String(o.invoice || '').replace(/\D/g, '')) || 0), 0) || 0) + 1;
  orders.forEach((o) => {
    if (!o.invoice) {
      o.invoice = formatBookOrderInvoice(next);
      next += 1;
      changed = true;
    }
  });
  if (changed) writeToStorage(STORAGE_KEYS.bookOrders, orders);
}

function formatBookOrderInvoice(n) {
  return 'INV-' + String(n).padStart(4, '0');
}

function saveBookOrder() {
  const customerName = document.getElementById('book-order-customer-name').value.trim();
  const phone = document.getElementById('book-order-phone').value.trim();
  const address = document.getElementById('book-order-address').value.trim();
  const collectionDate = document.getElementById('book-order-collection-date').value;
  const partPayment = Number(document.getElementById('book-order-part-payment').value) || 0;
  const source = document.querySelector('input[name="book-order-source"]:checked').value;
  const category = document.querySelector('input[name="book-order-category"]:checked').value;
  const errorEl = document.getElementById('book-order-error');

  if (!customerName) { errorEl.textContent = 'Enter the customer name.'; return; }
  if (!phone) { errorEl.textContent = 'Enter the customer phone number.'; return; }
  if (!collectionDate) { errorEl.textContent = 'Choose a date of collection.'; return; }

  const cakeType = category === 'cake' ? document.getElementById('book-order-cake-type').value : '';
  const cakePrice = category === 'cake' ? (Number(document.getElementById('book-order-cake-price').value) || 0) : 0;
  const productsTotal = bookOrderCart.reduce((sum, item) => sum + (Number(item.price) || 0) * item.qty, 0);
  const total = cakePrice + productsTotal;
  const balance = Math.max(0, total - partPayment);

  const orders = getFromStorage(STORAGE_KEYS.bookOrders);
  const isNew = !editingBookOrderId;
  let order;
  if (editingBookOrderId) {
    order = orders.find((o) => o.id === editingBookOrderId);
  } else {
    order = {
      id: Date.now(),
      number: 'BO-' + String(getNextBookOrderNumber()).padStart(4, '0'),
      invoice: formatBookOrderInvoice(getNextBookOrderInvoice()),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    orders.push(order);
  }

  order.source = source;
  order.category = category;
  order.cakeType = cakeType;
  order.cakePrice = cakePrice;
  order.customerName = customerName;
  order.phone = phone;
  order.address = address;
  order.items = bookOrderCart.map((item) => ({ id: item.id, name: item.name, price: item.price, qty: item.qty }));
  order.partPayment = partPayment;
  order.collectionDate = collectionDate;
  order.total = total;
  order.balance = balance;

  writeToStorage(STORAGE_KEYS.bookOrders, orders);
  logAudit('Book order saved', `${order.invoice || order.number} · ${customerName} · ${formatCurrency(total)}`);
  closeBookOrderModal();
  if (isNew && bookOrderFilter !== 'all') setBookOrderFilter('all');
  renderBookOrdersPanel();
  showToast(`Book order ${order.invoice || order.number} saved.`, 'success');
}

function collectBookOrder(id) {
  const orders = getFromStorage(STORAGE_KEYS.bookOrders);
  const order = orders.find((o) => o.id === id);
  if (!order) return;
  order.status = 'collected';
  order.collectedAt = new Date().toISOString();
  writeToStorage(STORAGE_KEYS.bookOrders, orders);
  renderBookOrdersPanel();
  logAudit('Book order collected', `${order.invoice || order.number} · ${order.customerName}`);
  showToast(`${order.invoice || order.number} marked as collected.`, 'success');
}

function uncollectBookOrder(id) {
  const orders = getFromStorage(STORAGE_KEYS.bookOrders);
  const order = orders.find((o) => o.id === id);
  if (!order) return;
  order.status = 'pending';
  delete order.collectedAt;
  writeToStorage(STORAGE_KEYS.bookOrders, orders);
  renderBookOrdersPanel();
  logAudit('Book order reopened', `${order.invoice || order.number} · ${order.customerName}`);
  showToast(`${order.invoice || order.number} reopened as pending.`, 'success');
}

function voidBookOrder(id) {
  const orders = getFromStorage(STORAGE_KEYS.bookOrders);
  const order = orders.find((o) => o.id === id);
  if (!order) return;
  requestDeleteAuth(`Void book order ${order.invoice || order.number} for ${order.customerName}? This requires the admin password.`);
  pendingDeleteAction = { type: 'bookorder-void', id };
}

function performBookOrderVoid(action) {
  if (!action || action.type !== 'bookorder-void') return;
  const orders = getFromStorage(STORAGE_KEYS.bookOrders);
  const order = orders.find((o) => o.id === action.id);
  if (!order) return;
  order.status = 'voided';
  order.voidedAt = new Date().toISOString();
  writeToStorage(STORAGE_KEYS.bookOrders, orders);
  renderBookOrdersPanel();
  logAudit('Book order voided', `${order.invoice || order.number} · ${order.customerName}`);
  showToast(`${order.invoice || order.number} voided.`, 'success');
}

function deleteBookOrder(id) {
  const orders = getFromStorage(STORAGE_KEYS.bookOrders);
  const order = orders.find((o) => o.id === id);
  if (!order) return;
  requestDeleteAuth(`Delete book order ${order.invoice || order.number} for ${order.customerName}? This requires the admin password.`);
  pendingDeleteAction = { type: 'bookorder', id };
}

function performBookOrderDelete(action) {
  if (!action || action.type !== 'bookorder') return;
  const orders = getFromStorage(STORAGE_KEYS.bookOrders);
  const order = orders.find((o) => o.id === action.id);
  if (!order) return;
  writeToStorage(STORAGE_KEYS.bookOrders, orders.filter((o) => o.id !== action.id));
  renderBookOrdersPanel();
  showToast(`Book order ${order.invoice || order.number} deleted.`, 'info');
}

function buildBookOrderPrint(order) {
  const settings = getStoredSettings();
  const shopName = settings.shopName || 'FasterFood';
  const sourceLabel = order.source === 'online' ? 'Online book order' : 'Personal book order';
  const categoryLabel = order.category === 'cake' ? 'Cakes order' : 'Other order';
  const invoice = order.invoice || order.number || '—';
  const rows = [];
  if (order.category === 'cake' && order.cakeType) {
    rows.push({ name: order.cakeType + ' (cake)', qty: 1, price: order.cakePrice, lineTotal: Number(order.cakePrice) || 0 });
  }
  (order.items || []).forEach((item) => {
    rows.push({ name: item.name, qty: item.qty, price: item.price, lineTotal: (Number(item.price) || 0) * item.qty });
  });
  return { settings, shopName, sourceLabel, categoryLabel, invoice, rows };
}

function printBookOrderReceipt(id) {
  const order = getFromStorage(STORAGE_KEYS.bookOrders).find((o) => o.id === id);
  if (!order) return;
  const { settings, shopName, sourceLabel, categoryLabel, invoice, rows } = buildBookOrderPrint(order);
  const paperWidth = getReceiptWidth();
  const nameLimit = paperWidth === '58mm' ? 13 : 19;
  const truncate = (text, max) => {
    const str = String(text || '');
    return str.length > max ? str.slice(0, max - 1) + '…' : str;
  };
  const itemRows = rows.map((row) => `
    <tr>
      <td class="name">${truncate(row.name, nameLimit)}</td>
      <td class="center">${row.qty}</td>
      <td class="right">${formatCurrency(row.lineTotal)}</td>
    </tr>
  `).join('');
  const date = new Date(order.createdAt).toLocaleString();
  const collection = order.collectionDate ? new Date(order.collectionDate + 'T00:00:00').toLocaleDateString() : '—';
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Book order receipt</title>
        <style>
          @page { size: ${paperWidth} auto; margin: 0; }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { width: ${paperWidth}; }
          body { font-family: 'Courier New', 'Consolas', monospace; font-size: 12px; line-height: 1.4; color: #000; padding: 2mm 3mm; }
          h1 { font-size: 16px; text-align: center; margin-bottom: 2px; }
          .meta { text-align: center; font-size: 11px; margin: 1px 0; }
          .divider { border-top: 1px dashed #000; margin: 6px 0; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th { text-align: left; padding: 1px 0; border-bottom: 1px solid #000; }
          td { padding: 1px 0; vertical-align: top; white-space: nowrap; }
          td.name { max-width: ${paperWidth === '58mm' ? '26mm' : '40mm'}; overflow: hidden; text-overflow: ellipsis; }
          .right { text-align: right; }
          .center { text-align: center; }
          .bold { font-weight: 700; }
          .grand { font-size: 13px; }
          .footer { text-align: center; margin-top: 8px; font-size: 11px; }
        </style>
      </head>
      <body>
        <h1>${shopName}</h1>
        <div class="meta">${settings.address || ''}</div>
        <div class="meta">${settings.phone || ''}</div>
        <div class="divider"></div>
        <div class="meta">BOOK ORDER RECEIPT</div>
        <div class="meta">Invoice #${invoice}</div>
        <div class="meta">Order #${order.number}</div>
        <div class="meta">${date}</div>
        <div class="meta">${sourceLabel} · ${categoryLabel}</div>
        <div class="divider"></div>
        <div class="meta"><strong>Customer:</strong> ${truncate(order.customerName, nameLimit)}</div>
        <div class="meta"><strong>Phone:</strong> ${truncate(order.phone, nameLimit)}</div>
        ${order.address ? `<div class="meta"><strong>Address:</strong> ${truncate(order.address, 26)}</div>` : ''}
        <div class="meta"><strong>Collection date:</strong> ${collection}</div>
        <div class="divider"></div>
        <table>
          <tr>
            <th class="name">Item</th>
            <th class="center">Qty</th>
            <th class="right">Total</th>
          </tr>
          ${itemRows}
        </table>
        <div class="divider"></div>
        <table>
          <tr class="bold grand"><td>TOTAL</td><td class="right">${formatCurrency(order.total)}</td></tr>
          <tr><td>Part payment</td><td class="right">${formatCurrency(order.partPayment)}</td></tr>
          <tr class="bold"><td>Balance due</td><td class="right">${formatCurrency(order.balance)}</td></tr>
        </table>
        <div class="divider"></div>
        <div class="footer">Bring this receipt when coming to collect.</div>
        <div class="footer">Thank you for your patronage</div>
        <script>window.onload = function () { window.focus(); window.print(); };</script>
      </body>
    </html>
  `;
  const printWindow = window.open('', '_blank', 'width=380,height=600');
  if (!printWindow) { showToast('Pop-up blocked. Allow pop-ups to print.', 'error'); return; }
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  logAudit('Book order receipt printed', `${invoice} · ${order.customerName}`);
}

function printBookOrderInvoice(id) {
  const order = getFromStorage(STORAGE_KEYS.bookOrders).find((o) => o.id === id);
  if (!order) return;
  const { settings, shopName, sourceLabel, categoryLabel, invoice, rows } = buildBookOrderPrint(order);
  const itemRows = rows.map((row) => `
    <tr>
      <td>${escapeHtml(row.name)}</td>
      <td class="num">${row.qty}</td>
      <td class="num">${formatCurrency(row.price)}</td>
      <td class="num">${formatCurrency(row.lineTotal)}</td>
    </tr>
  `).join('');
  const date = new Date(order.createdAt).toLocaleString();
  const collection = order.collectionDate ? new Date(order.collectionDate + 'T00:00:00').toLocaleDateString() : '—';
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Book order invoice</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #111; padding: 28px; }
          .head { display: flex; justify-content: space-between; border-bottom: 3px solid #b91c1c; padding-bottom: 14px; }
          .head h1 { font-size: 22px; color: #b91c1c; }
          .head .meta { text-align: right; font-size: 12px; color: #555; }
          .inv-title { text-align: center; margin: 20px 0 6px; font-size: 18px; letter-spacing: 2px; text-transform: uppercase; }
          .customer { margin: 16px 0; display: flex; justify-content: space-between; gap: 20px; }
          .customer .block { font-size: 13px; }
          .customer .block b { display: block; margin-bottom: 4px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
          th { background: #f3f4f6; text-align: left; padding: 8px; border-bottom: 2px solid #b91c1c; }
          td { padding: 8px; border-bottom: 1px solid #e5e7eb; }
          .num { text-align: right; }
          .totals { margin-left: auto; width: 300px; margin-top: 16px; }
          .totals .row { display: flex; justify-content: space-between; padding: 6px 8px; font-size: 13px; }
          .totals .grand { font-size: 16px; font-weight: 800; background: #b91c1c; color: #fff; border-radius: 6px; padding: 8px 10px; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #555; border-top: 1px solid #e5e7eb; padding-top: 12px; }
        </style>
      </head>
      <body>
        <div class="head">
          <div>
            <h1>${shopName}</h1>
            <div class="meta">${settings.address || ''}</div>
            <div class="meta">${settings.phone || ''}</div>
          </div>
          <div class="meta">
            <div><strong>INVOICE</strong></div>
            <div>${invoice}</div>
            <div>${date}</div>
          </div>
        </div>
        <div class="inv-title">Book order invoice</div>
        <div class="customer">
          <div class="block">
            <b>Customer</b>
            ${escapeHtml(order.customerName)}<br>
            ${escapeHtml(order.phone)}<br>
            ${escapeHtml(order.address || '')}
          </div>
          <div class="block">
            <b>Order details</b>
            ${sourceLabel}<br>
            ${categoryLabel}<br>
            Collection: ${collection}
          </div>
        </div>
        <table>
          <thead>
            <tr><th>Item</th><th class="num">Qty</th><th class="num">Price</th><th class="num">Total</th></tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>
        <div class="totals">
          <div class="row"><span>Total</span><span>${formatCurrency(order.total)}</span></div>
          <div class="row"><span>Part payment</span><span>${formatCurrency(order.partPayment)}</span></div>
          <div class="row"><span>Balance due</span><span>${formatCurrency(order.balance)}</span></div>
          <div class="row grand"><span>TOTAL DUE</span><span>${formatCurrency(order.balance)}</span></div>
        </div>
        <div class="footer">${shopName} · Thank you for your patronage</div>
        <script>window.onload = function () { window.focus(); window.print(); };</script>
      </body>
    </html>
  `;
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  if (!printWindow) { showToast('Pop-up blocked. Allow pop-ups to print.', 'error'); return; }
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  logAudit('Book order invoice printed', `${invoice} · ${order.customerName}`);
}

function parseModifiersText(text) {
  const groups = [];
  String(text || '').split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const colon = trimmed.indexOf(':');
    if (colon < 0) return;
    const group = trimmed.slice(0, colon).trim();
    const options = trimmed.slice(colon + 1).split(',').map((optionText) => {
      const raw = optionText.trim();
      if (!raw) return null;
      const match = raw.match(/^(.*?)(?:\s+\+?\s*([\d,]+))?$/);
      const label = (match && match[1] ? match[1] : raw).trim();
      const price = match && match[2] ? Number(match[2].replace(/,/g, '')) : 0;
      return { label: label || raw, price: Number.isFinite(price) ? price : 0 };
    }).filter(Boolean);
    if (group && options.length) groups.push({ group, options });
  });
  return groups;
}

function modifiersToText(modifiers) {
  return (modifiers || []).map((group) => `${group.group}: ${group.options.map((option) => `${option.label}${option.price ? ' +' + option.price : ''}`).join(', ')}`).join('\n');
}

function handleMenuImageUpload(input) {
  const file = input.files[0];
  if (!file) return;
  if (!editingMenuId) {
    showToast('Select or edit a product first, then upload its photo.', 'error');
    input.value = '';
    return;
  }
  processImageFile(file, (dataUrl) => {
    const hidden = document.getElementById('menu-image-data');
    const preview = document.getElementById('menu-image-preview');
    if (hidden) hidden.value = dataUrl;
    if (preview) preview.innerHTML = dataUrl ? `<img src="${dataUrl}" alt="" />` : '';
  });
}

function updateMenuPhotoLock() {
  const locked = !editingMenuId;
  const fileInput = document.getElementById('menu-image-file');
  if (!fileInput) return;
  const actions = fileInput.closest('.menu-image-actions');
  if (!actions) return;
  const uploadLabel = fileInput.closest('.action-btn');
  if (uploadLabel) uploadLabel.classList.toggle('menu-photo-locked', locked);
  const removeBtn = actions.querySelector('.action-btn.secondary');
  if (removeBtn) removeBtn.classList.toggle('menu-photo-locked', locked);
}

function clearMenuImage() {
  const hidden = document.getElementById('menu-image-data');
  const fileInput = document.getElementById('menu-image-file');
  const preview = document.getElementById('menu-image-preview');
  if (hidden) hidden.value = '';
  if (fileInput) fileInput.value = '';
  if (preview) preview.innerHTML = '<span>No photo</span>';
}

function processImageFile(file, onDataUrl) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 260;
      const scale = Math.min(size / img.width, size / img.height, 1);
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      onDataUrl(canvas.toDataURL('image/jpeg', 0.72));
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

let menuPhotoItemId = null;

function openMenuPhotoModal(id) {
  const menu = getFromStorage(STORAGE_KEYS.menu);
  const item = menu.find((entry) => entry.id === id);
  if (!item) return;
  menuPhotoItemId = id;
  document.getElementById('menu-photo-product-name').textContent = item.name;
  const hidden = document.getElementById('menu-photo-data');
  const preview = document.getElementById('menu-photo-preview');
  const fileInput = document.getElementById('menu-photo-file');
  if (hidden) hidden.value = item.image || '';
  if (fileInput) fileInput.value = '';
  if (preview) preview.innerHTML = item.image ? `<img src="${item.image}" alt="" />` : '<span>No photo</span>';
  document.getElementById('menu-photo-modal').classList.remove('hidden');
}

function closeMenuPhotoModal() {
  document.getElementById('menu-photo-modal').classList.add('hidden');
  menuPhotoItemId = null;
}

function handleMenuPhotoUpload(input) {
  const file = input.files[0];
  if (!file) return;
  if (menuPhotoItemId === null) {
    showToast('Select a product before uploading its photo.', 'error');
    input.value = '';
    return;
  }
  processImageFile(file, (dataUrl) => {
    const hidden = document.getElementById('menu-photo-data');
    const preview = document.getElementById('menu-photo-preview');
    if (hidden) hidden.value = dataUrl;
    if (preview) preview.innerHTML = dataUrl ? `<img src="${dataUrl}" alt="" />` : '<span>No photo</span>';
  });
}

function removeMenuPhoto() {
  const hidden = document.getElementById('menu-photo-data');
  const fileInput = document.getElementById('menu-photo-file');
  const preview = document.getElementById('menu-photo-preview');
  if (hidden) hidden.value = '';
  if (fileInput) fileInput.value = '';
  if (preview) preview.innerHTML = '<span>No photo</span>';
}

function saveMenuPhoto() {
  if (menuPhotoItemId === null) {
    showToast('Select a product before saving its photo.', 'error');
    return;
  }
  const menu = getFromStorage(STORAGE_KEYS.menu);
  const item = menu.find((entry) => entry.id === menuPhotoItemId);
  if (!item) {
    closeMenuPhotoModal();
    return;
  }
  const hidden = document.getElementById('menu-photo-data');
  const image = hidden ? hidden.value.trim() : '';
  item.image = image || undefined;
  writeToStorage(STORAGE_KEYS.menu, menu);
  logAudit('Menu photo updated', `${item.name} · photo ${image ? 'set' : 'removed'}`);
  closeMenuPhotoModal();
  renderMenuManager();
  renderPOS();
}

function openModifierModal(item) {
  pendingModifierItem = item;
  pendingModifierConfig = (item.modifiers || []).map((group) => ({
    group: group.group,
    options: group.options.map((option) => ({ label: option.label, price: option.price, selected: false }))
  }));
  renderModifierModal();
  document.getElementById('modifier-modal').classList.remove('hidden');
}

function closeModifierModal() {
  document.getElementById('modifier-modal').classList.add('hidden');
  pendingModifierItem = null;
  pendingModifierConfig = [];
}

function renderModifierModal() {
  if (!pendingModifierItem) return;
  const title = document.getElementById('modifier-title');
  if (title) title.textContent = `Customize ${pendingModifierItem.name}`;
  const body = document.getElementById('modifier-body');
  if (!body) return;
  body.innerHTML = pendingModifierConfig.map((group, gi) => `
    <div class="mod-group" data-gi="${gi}">
      <label class="mod-group-label">${escapeHtml(group.group)}</label>
      ${group.options.map((option, oi) => `
        <label class="mod-option ${option.selected ? 'selected' : ''}" data-oi="${oi}">
          <input type="checkbox" ${option.selected ? 'checked' : ''} onchange="toggleModifierOption(${gi}, ${oi}, this.checked)" />
          <span>${escapeHtml(option.label)}</span>
          ${option.price ? `<em>+${formatCurrency(option.price)}</em>` : ''}
        </label>`).join('')}
    </div>`).join('') + `
    <div class="mod-group">
      <label class="mod-group-label">Special instructions</label>
      <textarea id="modifier-note" placeholder="e.g. No onions, extra sauce…">${escapeHtml(pendingModifierItem.note || '')}</textarea>
    </div>`;
}

function toggleModifierOption(gi, oi, checked) {
  if (!pendingModifierConfig[gi]) return;
  pendingModifierConfig[gi].options[oi].selected = checked;
  document.querySelectorAll(`.mod-group[data-gi="${gi}"] .mod-option[data-oi="${oi}"]`).forEach((el) => el.classList.toggle('selected', checked));
}

function confirmModifierConfig() {
  if (!pendingModifierItem) return;
  const note = document.getElementById('modifier-note') ? document.getElementById('modifier-note').value.trim() : '';
  const selected = [];
  let optionsPrice = 0;
  pendingModifierConfig.forEach((group) => {
    group.options.forEach((option) => {
      if (option.selected) {
        selected.push({ group: group.group, label: option.label, price: option.price });
        optionsPrice += option.price;
      }
    });
  });
  addToCartItem(pendingModifierItem, selected, optionsPrice, note);
  closeModifierModal();
}

function getCartSubtotal() {
  return cart.reduce((sum, item) => sum + ((Number(item.price) || 0) + (Number(item.optionsPrice) || 0)) * item.qty, 0);
}

function getCartServiceCharge(subtotal) {
  if (!getFeature('tips')) return 0;
  const settings = getStoredSettings();
  const rate = Number(settings.serviceChargeRate) || 0;
  return rate ? (subtotal * rate) / 100 : 0;
}

function getCartDeliveryFee() {
  if (!getFeature('delivery') || cartOrderType !== 'delivery') return 0;
  return Number(getStoredSettings().deliveryFee) || 0;
}

function getCurrentTotal() {
  const subtotal = getCartSubtotal();
  const taxable = Math.max(0, subtotal - getCartDiscountsTotal(subtotal));
  const tax = taxable * (getTaxRate() / 100);
  return taxable + tax + getCartServiceCharge(taxable) + getCartDeliveryFee() + cartTip;
}

function setCartTip(value) {
  cartTip = Math.max(0, Math.round(Number(value) || 0));
  const options = getStoredSettings().tipOptions && getStoredSettings().tipOptions.length ? getStoredSettings().tipOptions : [500, 1000, 2000];
  document.querySelectorAll('.tip-btn').forEach((btn) => {
    btn.classList.toggle('active', Number(btn.dataset.amt) === cartTip);
  });
  const customInput = document.getElementById('tip-custom');
  if (customInput && cartTip !== 0 && !options.includes(cartTip)) customInput.value = cartTip;
  if (customInput && options.includes(cartTip)) customInput.value = '';
  const amountEl = document.getElementById('payment-amount');
  if (amountEl) amountEl.textContent = formatCurrency(getCurrentTotal());
  updatePaymentDisplay();
  renderCart();
}

function renderTipsSection() {
  const section = document.getElementById('tips-section');
  if (!section) return;
  if (!getFeature('tips')) { section.classList.add('hidden'); return; }
  const settings = getStoredSettings();
  const options = settings.tipOptions && settings.tipOptions.length ? settings.tipOptions : [500, 1000, 2000];
  section.classList.remove('hidden');
  section.innerHTML = `
    <label class="pay-method-label">Tip</label>
    <div class="tip-options">
      <button type="button" class="tip-btn ${cartTip === 0 ? 'active' : ''}" data-amt="0" onclick="setCartTip(0)">None</button>
      ${options.map((amount) => `<button type="button" class="tip-btn ${cartTip === amount ? 'active' : ''}" data-amt="${amount}" onclick="setCartTip(${amount})">${formatCurrency(amount)}</button>`).join('')}
      <input type="number" min="0" step="50" id="tip-custom" class="tip-custom" placeholder="Custom" value="${cartTip > 0 && !options.includes(cartTip) ? cartTip : ''}" oninput="setCartTip(Number(this.value) || 0)" />
    </div>`;
}

function renderDeliverySection() {
  const section = document.getElementById('delivery-section');
  if (!section) return;
  if (!getFeature('delivery') || cartOrderType !== 'delivery') { section.classList.add('hidden'); return; }
  const settings = getStoredSettings();
  const riderLabel = settings.deliveryRiderLabel || 'Rider';
  section.classList.remove('hidden');
  section.innerHTML = `
    <label class="pay-method-label">Delivery details</label>
    <div class="field-group stacked"><label>Delivery address</label><input id="pay-delivery-address" type="text" value="${escapeHtml(cartDelivery.address)}" /></div>
    <div class="split-grid">
      <div class="field-group stacked"><label>${escapeHtml(riderLabel)} name</label><input id="pay-rider-name" type="text" value="${escapeHtml(cartDelivery.riderName)}" /></div>
      <div class="field-group stacked"><label>${escapeHtml(riderLabel)} phone</label><input id="pay-rider-phone" type="text" value="${escapeHtml(cartDelivery.riderPhone)}" /></div>
    </div>`;
}

function sendReceipt(saleId) {
  const sale = getFromStorage(STORAGE_KEYS.sales).find((entry) => entry.id === saleId);
  if (!sale) return;
  const settings = getStoredSettings();
  const lines = [
    settings.shopName || 'FasterFood',
    `Receipt #${sale.invoice}`,
    new Date(sale.createdAt).toLocaleString(),
    '',
    ...sale.items.map((item) => `${item.qty}× ${item.name}${item.options && item.options.length ? ' (' + item.options.map((option) => option.label).join(', ') + ')' : ''} = ${formatCurrency(((Number(item.price) || 0) + (Number(item.optionsPrice) || 0)) * item.qty)}`),
    '',
    `Total: ${formatCurrency(sale.total)}`,
    `Paid: ${formatCurrency(sale.paid || sale.total)}`,
    (sale.payments || []).map((payment) => `  ${payment.method}: ${formatCurrency(payment.amount)}`).join('\n')
  ].join('\n');
  const phone = sale.customerPhone || '';
  const email = sale.customerEmail || '';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(lines).catch(() => {});
  }
  if (phone) {
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(lines)}`, '_blank');
    showToast('WhatsApp receipt opened. Receipt text copied.', 'success');
  } else if (email) {
    window.open(`mailto:${email}?subject=${encodeURIComponent('Receipt #' + sale.invoice + ' — ' + (settings.shopName || 'FasterFood'))}&body=${encodeURIComponent(lines)}`, '_blank');
    showToast('Email receipt opened. Receipt text copied.', 'success');
  } else {
    showToast('Receipt text copied to clipboard.', 'success');
  }
  logAudit('Receipt sent', `Receipt #${sale.invoice} · ${phone ? 'WhatsApp' : email ? 'Email' : 'Copied'}`);
}

function renderPaymentMethodsList() {
  const methods = getPaymentMethods();
  const countEl = document.getElementById('payment-methods-count');
  if (countEl) countEl.textContent = methods.length;
  document.getElementById('payment-methods-list').innerHTML = methods.map((method, index) => `
    <div class="pay-chip-row">
      <span class="pay-chip-index">${index + 1}</span>
      <span class="pay-chip-name">${method}</span>
      <button class="table-action danger" onclick="removePaymentMethod(${index})">Remove</button>
    </div>
  `).join('');
}

function addPaymentMethod() {
  const input = document.getElementById('new-payment-method');
  const name = input.value.trim();
  if (!name) return;

  const settings = getStoredSettings();
  const methods = getPaymentMethods();
  if (methods.some((method) => method.toLowerCase() === name.toLowerCase())) {
    showToast('That payment method already exists.', 'error');
    return;
  }

  methods.push(name);
  settings.paymentMethods = methods;
  writeToStorage(STORAGE_KEYS.settings, settings);
  input.value = '';
  renderPaymentMethodsList();
  logAudit('Payment method added', name);
}

function removePaymentMethod(index) {
  const settings = getStoredSettings();
  const methods = getPaymentMethods();
  const removed = methods[index];
  const filtered = methods.filter((_, i) => i !== index);
  settings.paymentMethods = filtered.length ? filtered : defaultSettings.paymentMethods;
  writeToStorage(STORAGE_KEYS.settings, settings);
  renderPaymentMethodsList();
  if (removed) logAudit('Payment method removed', removed);
}

function renderUserManagement() {
  const users = getFromStorage(STORAGE_KEYS.users);
  const container = document.getElementById('users-list');
  if (!container) return;

  const countEl = document.getElementById('users-count');
  if (countEl) countEl.textContent = users.length;

  container.innerHTML = users.map((user) => {
    const isSelf = currentUser && user.username === currentUser.username;
    const isAdmin = user.role === 'admin';
    const selfBadge = isSelf ? ' <span class="badge info">You</span>' : '';
    const roleClass = ROLE_LABELS[user.role] ? ` role-${user.role}` : '';
    return `
      <div class="user-row">
        <div class="user-avatar${roleClass}">${user.name.charAt(0).toUpperCase()}</div>
        <div class="user-row-info">
          <div class="user-row-name">${user.name}${selfBadge}</div>
          <small>@${user.username}</small>
        </div>
        <select class="role-select" onchange="updateUserRole(${user.id}, this.value)" ${isAdmin ? 'disabled' : ''}>
          ${Object.entries(ROLE_LABELS).map(([value, text]) => `
            <option value="${value}" ${user.role === value ? 'selected' : ''}>${text}</option>
          `).join('')}
        </select>
        <button class="table-action danger" onclick="removeUser(${user.id})" ${isAdmin || isSelf ? 'disabled' : ''}>Remove</button>
      </div>
    `;
  }).join('');
}

function addUser() {
  const name = document.getElementById('new-user-name').value.trim();
  const username = document.getElementById('new-user-username').value.trim();
  const password = document.getElementById('new-user-password').value.trim();
  const role = document.getElementById('new-user-role').value;

  if (!name || !username || !password) {
    showToast('Fill in all user fields.', 'error');
    return;
  }

  const users = getFromStorage(STORAGE_KEYS.users);
  if (users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
    showToast('That username is already taken.', 'error');
    return;
  }

  users.push({ id: Date.now(), name, username, password, role });
  writeToStorage(STORAGE_KEYS.users, users);
  document.getElementById('new-user-name').value = '';
  document.getElementById('new-user-username').value = '';
  document.getElementById('new-user-password').value = '';
  renderUserManagement();
  showToast('User added.');
  logAudit('User added', `${name} (@${username}) · ${ROLE_LABELS[role] || role}`);
}

function updateUserRole(userId, role) {
  const users = getFromStorage(STORAGE_KEYS.users);
  const user = users.find((entry) => entry.id === userId);
  if (!user) return;
  user.role = role;
  writeToStorage(STORAGE_KEYS.users, users);

  if (currentUser && currentUser.id === userId) {
    currentUser.role = role;
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(currentUser));
    renderAuth();
  }
  showToast('Role updated.');
  logAudit('User role updated', `${user.name} → ${ROLE_LABELS[role] || role}`);
}

function removeUser(userId) {
  const users = getFromStorage(STORAGE_KEYS.users);
  const user = users.find((entry) => entry.id === userId);
  if (!user || user.role === 'admin') return;
  if (currentUser && currentUser.id === userId) return;

  writeToStorage(STORAGE_KEYS.users, users.filter((entry) => entry.id !== userId));
  renderUserManagement();
  showToast('User removed.');
  logAudit('User removed', `${user.name} (@${user.username})`);
}

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function renderPasswordStrength() {
  const input = document.getElementById('update-password-new');
  const bars = document.querySelectorAll('.password-strength .ps-bar');
  const label = document.querySelector('.password-strength .ps-label');
  if (!input || !label) return;
  const strength = getPasswordStrength(input.value || '');
  const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['#b91c1c', '#dc2626', '#d97706', '#1dbf73', '#0f8d52'];
  bars.forEach((bar, index) => {
    bar.classList.toggle('filled', index < strength);
    bar.style.background = index < strength ? colors[strength] : '';
  });
  label.textContent = labels[strength];
  label.style.color = colors[strength];
}

function updatePassword() {
  const current = document.getElementById('update-password-current').value.trim();
  const next = document.getElementById('update-password-new').value.trim();
  const confirm = document.getElementById('update-password-confirm').value.trim();

  if (!current || !next || !confirm) {
    showToast('Complete all password fields.', 'error');
    return;
  }
  if (next !== confirm) {
    showToast('New passwords do not match.', 'error');
    return;
  }
  if (getPasswordStrength(next) < 3) {
    showToast('Choose a stronger password (8+ chars, mix of letters, numbers, symbols).', 'error');
    return;
  }
  if (next === current) {
    showToast('New password must be different from the current one.', 'error');
    return;
  }

  const users = getFromStorage(STORAGE_KEYS.users);
  const user = users.find((entry) => entry.id === currentUser?.id);
  if (!user) {
    showToast('Account not found.', 'error');
    return;
  }
  if (user.password !== current) {
    showToast('Current password is incorrect.', 'error');
    return;
  }

  user.password = next;
  writeToStorage(STORAGE_KEYS.users, users);
  if (currentUser) currentUser.password = next;
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(currentUser));

  document.getElementById('update-password-current').value = '';
  document.getElementById('update-password-new').value = '';
  document.getElementById('update-password-confirm').value = '';
  renderPasswordStrength();
  showToast('Password updated successfully.', 'success');
  logAudit('Password updated', `@${user.username} changed their password`);
}

const RESET_LABELS = {
  menu: 'Front store',
  inventory: 'Inventory',
  stockLog: 'Stock-in log',
  sales: 'Sales history',
  shifts: 'Shift records',
  voids: 'Void / returns',
  leftovers: 'Leftover records',
  promos: 'Promos & discounts',
  audit: 'Audit trail',
  payments: 'Payment methods',
  users: 'Users',
  settings: 'Settings',
  customers: 'Customers & loyalty',
  purchases: 'Purchases',
  closings: 'Daily closings',
  refunds: 'Refunds',
  priceHistory: 'Price history'
};

let pendingReset = { scope: 'none' };

function getSelectedResetScopes() {
  return Array.from(document.querySelectorAll('.reset-check input:checked')).map((input) => input.value);
}

function toggleAllResetChecks() {
  const boxes = document.querySelectorAll('.reset-check input');
  const allChecked = Array.from(boxes).every((input) => input.checked);
  boxes.forEach((input) => { input.checked = !allChecked; });
}

function resetSelected() {
  const scopes = getSelectedResetScopes();
  if (!scopes.length) {
    showToast('Select what you want to reset.', 'error');
    return;
  }
  pendingReset = { scope: 'selected', scopes };
  document.getElementById('reset-confirm-message').textContent =
    `This will delete: ${scopes.map((scope) => RESET_LABELS[scope] || scope).join(', ')}.`;
  document.getElementById('reset-confirm-modal').classList.remove('hidden');
  document.getElementById('reset-password').focus();
}

function factoryReset() {
  pendingReset = { scope: 'factory' };
  document.getElementById('reset-confirm-message').textContent =
    'This will delete ALL data — menu, inventory, stock-in log, sales history, shift records, voids, audit trail, payment methods and users — and restore settings to their defaults.';
  document.getElementById('reset-confirm-modal').classList.remove('hidden');
  document.getElementById('reset-password').focus();
}

function closeResetConfirm() {
  document.getElementById('reset-confirm-modal').classList.add('hidden');
  document.getElementById('reset-password').value = '';
}

function executeReset() {
  const admin = getFromStorage(STORAGE_KEYS.users).find((user) => user.role === 'admin');
  const passwordInput = document.getElementById('reset-password');
  const errorEl = document.getElementById('reset-confirm-error');
  if (!admin || passwordInput.value !== admin.password) {
    passwordInput.classList.add('shake');
    setTimeout(() => passwordInput.classList.remove('shake'), 450);
    if (errorEl) errorEl.textContent = 'Incorrect admin password.';
    showToast('Incorrect admin password.', 'error');
    return;
  }
  if (errorEl) errorEl.textContent = '';

  if (pendingReset.scope === 'clear-audit') {
    writeToStorage(STORAGE_KEYS.audit, []);
    closeResetConfirm();
    renderAuditManager();
    showToast('Audit log cleared.', 'success');
    return;
  }

  const scopes = pendingReset.scope === 'factory'
    ? ['menu', 'inventory', 'stockLog', 'sales', 'shifts', 'voids', 'leftovers', 'promos', 'audit', 'payments', 'users', 'settings', 'customers', 'purchases', 'closings', 'refunds', 'priceHistory']
    : (pendingReset.scopes || []);

  if (scopes.includes('menu')) writeToStorage(STORAGE_KEYS.menu, []);
  if (scopes.includes('inventory')) writeToStorage(STORAGE_KEYS.inventory, []);
  if (scopes.includes('stockLog') || scopes.includes('inventory')) writeToStorage(STORAGE_KEYS.stockLog, []);
  if (scopes.includes('sales')) writeToStorage(STORAGE_KEYS.sales, []);
  if (scopes.includes('shifts')) writeToStorage(STORAGE_KEYS.shifts, []);
  if (scopes.includes('voids')) writeToStorage(STORAGE_KEYS.voids, []);
  if (scopes.includes('leftovers')) writeToStorage(STORAGE_KEYS.leftovers, []);
  if (scopes.includes('promos')) {
    writeToStorage(STORAGE_KEYS.promos, []);
    writeToStorage(STORAGE_KEYS.discounts, []);
    appliedPromo = null;
    appliedDiscount = null;
  }
  if (scopes.includes('audit')) writeToStorage(STORAGE_KEYS.audit, []);
  if (scopes.includes('customers')) { writeToStorage(STORAGE_KEYS.customers, []); cartCustomer = null; cartLoyaltyPoints = 0; }
  if (scopes.includes('purchases')) writeToStorage(STORAGE_KEYS.purchases, []);
  if (scopes.includes('closings')) writeToStorage(STORAGE_KEYS.closings, []);
  if (scopes.includes('refunds')) writeToStorage(STORAGE_KEYS.refunds, []);
  if (scopes.includes('priceHistory')) writeToStorage(STORAGE_KEYS.priceHistory, []);

  if (scopes.includes('settings')) {
    writeToStorage(STORAGE_KEYS.settings, defaultSettings);
  } else if (scopes.includes('payments')) {
    const settings = getStoredSettings();
    settings.paymentMethods = defaultSettings.paymentMethods;
    writeToStorage(STORAGE_KEYS.settings, settings);
  }

  if (scopes.includes('users')) {
    writeToStorage(STORAGE_KEYS.users, defaultUsers);
    if (currentUser && !defaultUsers.some((user) => user.username === currentUser.username)) {
      currentUser = defaultUsers[0];
      localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(currentUser));
      renderAuth();
    }
  }

  closeResetConfirm();
  document.querySelectorAll('.reset-check input').forEach((input) => { input.checked = false; });
  cart = [];
  renderCart();
  renderSettings();
  renderDashboard();
  renderInventoryManager();
  renderMenuManager();
  renderOrdersManager();
  renderReports();
  renderPOS();
  renderShiftGate();
  renderAuditManager();
  showToast('Reset complete. Selected data has been deleted.', 'success');
  logAudit('Data reset', pendingReset.scope === 'factory'
    ? 'Factory reset'
    : scopes.map((scope) => RESET_LABELS[scope] || scope).join(', '));
}

function saveSettings() {
  const current = getStoredSettings();
  const settings = {
    shopName: document.getElementById('shop-name').value.trim() || 'FasterFood',
    currency: document.getElementById('currency').value.trim() || 'NGN',
    address: document.getElementById('shop-address').value.trim(),
    phone: document.getElementById('shop-phone').value.trim(),
    email: document.getElementById('shop-email').value.trim(),
    website: document.getElementById('shop-website').value.trim(),
    receiptContact: document.getElementById('receipt-contact-toggle').checked,
    taxRate: Number(document.getElementById('tax-rate').value),
    receiptWidth: document.getElementById('receipt-width').value,
    qrImage: current.qrImage || '',
    paymentMethods: getPaymentMethods(),
    salesTarget: Number(document.getElementById('sales-target').value) || 0,
    loyaltyEnabled: document.getElementById('loyalty-enabled-toggle').checked,
    loyaltyPointsPer100: Number(document.getElementById('loyalty-points-per').value) || 0,
    loyaltyPointValue: Number(document.getElementById('loyalty-point-value').value) || 0,
    features: { ...defaultSettings.features, ...(current.features || {}) },
    tables: Array.isArray(current.tables) ? current.tables : [],
    branches: Array.isArray(current.branches) ? current.branches : [],
    currentBranch: current.currentBranch || '',
    deliveryFee: Number(current.deliveryFee) || 0,
    deliveryRiderLabel: current.deliveryRiderLabel || 'Rider',
    serviceChargeRate: Number(current.serviceChargeRate) || 0,
    tipOptions: (current.tipOptions && current.tipOptions.length ? current.tipOptions : [500, 1000, 2000])
  };
  writeToStorage(STORAGE_KEYS.settings, settings);
  syncSettingsHero();
  renderSalesTarget();
  showToast('Settings saved.');
  logAudit('Settings updated', `${settings.shopName} · tax ${settings.taxRate}% · receipt ${settings.receiptWidth}`);
}

const TOAST_ICONS = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };

function clearMenuSearch() {
  const input = document.getElementById('menu-search');
  if (input) {
    input.value = '';
    const clearBtn = document.querySelector('.menu-search-clear');
    if (clearBtn) clearBtn.classList.remove('visible');
    input.focus();
    renderPOS();
  }
}

function showToast(message, type, duration = 2600) {
  const toast = document.getElementById('toast');
  toast.querySelector('.toast-icon').textContent = TOAST_ICONS[type] || TOAST_ICONS.info;
  toast.querySelector('.toast-msg').textContent = message;
  toast.classList.remove('success', 'error', 'info');
  toast.classList.add(type || 'info');
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

let stockAlertSignature = null;

function toggleStockAlertPanel() {
  const panel = document.getElementById('stock-alert-panel');
  const willOpen = panel.classList.contains('hidden');
  closeStockAlertPanel();
  if (willOpen) panel.classList.remove('hidden');
}

function closeStockAlertPanel() {
  document.getElementById('stock-alert-panel').classList.add('hidden');
}

function checkLowStockNotification(force = false) {
  const bell = document.getElementById('stock-alert-bell');
  const badge = document.getElementById('stock-alert-badge');
  const list = document.getElementById('stock-alert-list');
  if (!bell || !badge || !list) return;

  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const soon = new Date(today);
  soon.setDate(soon.getDate() + 3);
  const out = inventory.filter((item) => Number(item.stock) <= 0);
  const low = inventory.filter((item) => Number(item.stock) > 0 && Number(item.stock) <= Number(item.reorderLevel));
  const expired = inventory.filter((item) => {
    if (!item.expiryDate) return false;
    const expiry = new Date(item.expiryDate + 'T00:00:00');
    return expiry < today;
  });
  const nearExpiry = inventory.filter((item) => {
    if (!item.expiryDate) return false;
    const expiry = new Date(item.expiryDate + 'T00:00:00');
    return expiry >= today && expiry <= soon;
  });
  const total = out.length + low.length + expired.length + nearExpiry.length;

  if (!currentUser || currentUser.role === 'cashier' || total === 0) {
    bell.classList.add('hidden');
    document.getElementById('app-view').classList.remove('bell-visible');
    closeStockAlertPanel();
    stockAlertSignature = '0|0|0|0';
    return;
  }

  const signature = `${out.length}|${low.length}|${expired.length}|${nearExpiry.length}`;
  if (!force && signature === stockAlertSignature) return;
  stockAlertSignature = signature;

  bell.classList.remove('hidden');
  document.getElementById('app-view').classList.add('bell-visible');
  badge.textContent = total;

  const expiryLabel = (item) => {
    const expiry = new Date(item.expiryDate + 'T00:00:00');
    return `Expires ${expiry.toLocaleDateString()}`;
  };

  list.innerHTML = [
    ...out.map((item) => ({ item, cls: 'out', meta: 'Out of stock' })),
    ...low.map((item) => ({ item, cls: '', meta: `Low · ${item.stock} ${item.unit} left` })),
    ...expired.map((item) => ({ item, cls: 'out', meta: 'Expired · ' + expiryLabel(item) })),
    ...nearExpiry.map((item) => ({ item, cls: 'near', meta: 'Expiring soon · ' + expiryLabel(item) }))
  ].map(({ item, cls, meta }) => `
    <div class="alert-item ${cls}">
      <div class="alert-item-name">${escapeHtml(item.name)}</div>
      <div class="alert-item-meta">${meta}</div>
    </div>
  `).join('');
}

function enterMenuEditMode(item) {
  editingMenuId = item.id;
  document.getElementById('menu-form-title').textContent = `Edit "${item.name}"`;
  document.getElementById('menu-submit-btn').textContent = 'Save changes';
  document.getElementById('menu-cancel-btn').classList.remove('hidden');
  document.getElementById('menu-name').value = item.name;
  document.getElementById('menu-category').value = item.category;
  document.getElementById('menu-price').value = item.price;
  document.getElementById('menu-barcode').value = item.barcode || '';
  document.getElementById('menu-color').value = item.color || '#b91c1c';
  document.getElementById('menu-color-text').value = (item.color || '#b91c1c').toUpperCase();
  const modifiersInput = document.getElementById('menu-modifiers');
  if (modifiersInput) modifiersInput.value = modifiersToText(item.modifiers);
  const notesToggle = document.getElementById('menu-notes-toggle');
  if (notesToggle) notesToggle.checked = !!item.allowNotes;
  const hidden = document.getElementById('menu-image-data');
  const preview = document.getElementById('menu-image-preview');
  if (hidden) hidden.value = item.image || '';
  if (preview) preview.innerHTML = item.image ? `<img src="${item.image}" alt="" />` : '<span>No photo</span>';
  updateMenuPhotoLock();
  document.getElementById('menu-name').focus();
}

function editMenuItem(id) {
  const menu = getFromStorage(STORAGE_KEYS.menu);
  const item = menu.find((entry) => entry.id === id);
  if (!item) return;
  enterMenuEditMode(item);
  renderMenuManager();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelMenuEdit() {
  editingMenuId = null;
  document.getElementById('menu-form').reset();
  document.getElementById('menu-form-title').textContent = 'Add a menu item';
  document.getElementById('menu-submit-btn').textContent = 'Add item';
  document.getElementById('menu-cancel-btn').classList.add('hidden');
  clearMenuImage();
  updateMenuPhotoLock();
  renderMenuManager();
}

function handleMenuSubmit(event) {
  event.preventDefault();
  const menu = getFromStorage(STORAGE_KEYS.menu);
  const name = document.getElementById('menu-name').value.trim();
  const category = document.getElementById('menu-category').value.trim();
  const price = Number(document.getElementById('menu-price').value);
  const barcode = document.getElementById('menu-barcode').value.trim();
  const color = (document.getElementById('menu-color-text').value.trim() || document.getElementById('menu-color').value || '#b91c1c').toUpperCase();
  const modifiersText = document.getElementById('menu-modifiers') ? document.getElementById('menu-modifiers').value.trim() : '';
  const allowNotes = document.getElementById('menu-notes-toggle') ? document.getElementById('menu-notes-toggle').checked : false;
  const image = document.getElementById('menu-image-data') ? document.getElementById('menu-image-data').value.trim() : '';

  if (!name || !category || !price) {
    showToast('Please complete required menu fields.', 'error');
    return;
  }

  let wasEdit = false;
  let oldPrice = null;
  if (editingMenuId) {
    const item = menu.find((entry) => entry.id === editingMenuId);
    if (item) {
      oldPrice = item.price;
      item.name = name;
      item.category = category;
      item.price = price;
      item.barcode = barcode;
      item.color = color;
      item.modifiers = parseModifiersText(modifiersText);
      item.allowNotes = allowNotes;
      if (image) item.image = image;
      syncInventoryFromMenuItem(item);
    }
    wasEdit = true;
    editingMenuId = null;
    document.getElementById('menu-form-title').textContent = 'Add a menu item';
    document.getElementById('menu-submit-btn').textContent = 'Add item';
    document.getElementById('menu-cancel-btn').classList.add('hidden');
  } else {
    menu.push({
      id: Date.now(),
      name,
      category,
      price,
      barcode,
      color,
      modifiers: parseModifiersText(modifiersText),
      allowNotes,
      image: image || undefined,
      createdAt: new Date().toISOString(),
      ingredients: []
    });
  }

  writeToStorage(STORAGE_KEYS.menu, menu);
  if (wasEdit && Number(price) !== Number(oldPrice)) {
    logPriceChange('menu', name, oldPrice, price);
  }
  document.getElementById('menu-form').reset();
  clearMenuImage();
  updateMenuPhotoLock();
  renderMenuManager();
  renderPOS();
  renderInventoryManager();
  renderDashboard();
  logAudit(
    wasEdit ? 'Menu item updated' : 'Menu item added',
    wasEdit
      ? `${name} · price ${formatCurrency(oldPrice)} → ${formatCurrency(price)}`
      : `${name} · ${formatCurrency(price)}`
  );
}

function handleInventorySubmit(event) {
  event.preventDefault();
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  const name = document.getElementById('stock-name').value.trim();
  const group = document.getElementById('stock-group').value.trim();
  const unit = document.getElementById('stock-unit').value.trim() || 'pcs';
  const quantity = Number(document.getElementById('stock-qty').value);
  const price = Number(document.getElementById('stock-price').value);
  const reorderLevel = Number(document.getElementById('stock-reorder').value || 0);
  const expiryDate = document.getElementById('stock-expiry').value || null;

  if (!name || Number.isNaN(quantity) || quantity < 0) {
    showToast('Enter valid inventory details.', 'error');
    return;
  }

  inventory.push({
    id: Date.now(),
    name,
    group,
    unit,
    stock: quantity,
    price: Number.isFinite(price) && price > 0 ? price : null,
    reorderLevel,
    expiryDate,
    createdAt: new Date().toISOString()
  });

  writeToStorage(STORAGE_KEYS.inventory, inventory);
  document.getElementById('inventory-form').reset();
  renderInventoryManager();
  renderMenuManager();
  renderDashboard();
  renderPOS();
  logStockIn(name, quantity, 'Added product');
  logAudit('Inventory added', `${name} · ${quantity} ${unit}`);
}

function deleteMenuItem(id) {
  const existing = getFromStorage(STORAGE_KEYS.menu).find((item) => item.id === id);
  requestDeleteAuth(`Delete "${existing ? existing.name : 'this item'}" from the front store? This requires the admin password.`);
  pendingDeleteAction = { type: 'menu', id };
}

function performMenuDelete(action) {
  if (!action || action.type !== 'menu') return;
  const existing = getFromStorage(STORAGE_KEYS.menu).find((item) => item.id === action.id);
  const menu = getFromStorage(STORAGE_KEYS.menu).filter((item) => item.id !== action.id);
  writeToStorage(STORAGE_KEYS.menu, menu);
  renderMenuManager();
  renderPOS();
  if (existing) logAudit('Menu item deleted', existing.name);
}

function openInventoryEdit(id) {
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  const item = inventory.find((entry) => entry.id === id);
  if (!item) return;

  editingInventoryId = id;
  document.getElementById('inv-edit-name').value = item.name;
  document.getElementById('inv-edit-group').value = item.group || '';
  document.getElementById('inv-edit-unit').value = item.unit || '';
  document.getElementById('inv-edit-price').value = item.price ?? '';
  document.getElementById('inv-edit-stock').value = item.stock ?? '';
  document.getElementById('inv-edit-reorder').value = item.reorderLevel ?? '';
  document.getElementById('inv-edit-expiry').value = item.expiryDate || '';

  document.getElementById('inventory-edit-modal').classList.remove('hidden');
  document.getElementById('inv-edit-name').focus();
}

function closeInventoryEdit() {
  editingInventoryId = null;
  document.getElementById('inventory-edit-modal').classList.add('hidden');
}

function saveInventoryEdit() {
  if (!editingInventoryId) return;

  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  const item = inventory.find((entry) => entry.id === editingInventoryId);
  if (!item) return;

  const name = document.getElementById('inv-edit-name').value.trim();
  const group = document.getElementById('inv-edit-group').value.trim();
  const unit = document.getElementById('inv-edit-unit').value.trim();
  const price = Number(document.getElementById('inv-edit-price').value);
  const stock = Number(document.getElementById('inv-edit-stock').value);
  const reorderLevel = Number(document.getElementById('inv-edit-reorder').value || 0);
  const expiryDate = document.getElementById('inv-edit-expiry').value || null;

  if (!name || Number.isNaN(stock) || stock < 0) {
    showToast('Enter a valid name and stock quantity.', 'error');
    return;
  }

  const stockDelta = stock - item.stock;
  const oldPrice = item.price || 0;

  item.name = name;
  item.group = group;
  item.unit = unit || 'pcs';
  item.price = Number.isFinite(price) && price > 0 ? price : null;
  item.stock = stock;
  item.reorderLevel = reorderLevel;
  item.expiryDate = expiryDate;
  if (item.returnedFromLeftover) {
    item.returnedFromLeftover = false;
    item.returnedAt = null;
    item.returnedQty = null;
  }

  writeToStorage(STORAGE_KEYS.inventory, inventory);

  if (Number(item.price) !== oldPrice) {
    logPriceChange('inventory', name, oldPrice, item.price || 0);
  }

  const menuItem = getMenuItemForInventory(item.id);
  if (menuItem) {
    const menu = getFromStorage(STORAGE_KEYS.menu);
    menuItem.name = item.name;
    menuItem.category = item.group || 'General';
    menuItem.price = item.price;
    menuItem.ingredients = [{ name: item.name, qty: 1 }];
    writeToStorage(STORAGE_KEYS.menu, menu);
    renderMenuManager();
  }

  editingInventoryId = null;
  document.getElementById('inventory-edit-modal').classList.add('hidden');
  renderInventoryManager();
  renderDashboard();
  renderPOS();
  if (stockDelta > 0) logStockIn(name, stockDelta, 'Stock increased (edit)');
  logAudit('Inventory updated', `${name} · stock ${item.stock} (${stockDelta >= 0 ? '+' : ''}${stockDelta})`);
}

function deleteInventoryItem(id) {
  const existing = getFromStorage(STORAGE_KEYS.inventory).find((item) => item.id === id);
  const inventory = getFromStorage(STORAGE_KEYS.inventory).filter((item) => item.id !== id);

  removeMenuItemsForDeletedInventory(existing ? [existing] : []);

  writeToStorage(STORAGE_KEYS.inventory, inventory);
  renderInventoryManager();
  renderMenuManager();
  renderDashboard();
  renderPOS();
  if (existing) logAudit('Inventory deleted', existing.name);
}

let pendingDeleteAction = null;

function requestInventoryDelete(id) {
  const item = getFromStorage(STORAGE_KEYS.inventory).find((entry) => entry.id === id);
  if (!item) return;
  requestDeleteAuth(`Delete "${item.name}" from inventory? This requires the admin password.`);
  pendingDeleteAction = { type: 'single', id };
}

function requestMarkedDelete() {
  const ids = getMarkedInventoryIds();
  if (!ids.length) {
    showToast('Select items to delete first.', 'error');
    return;
  }
  requestDeleteAuth(`Delete ${ids.length} selected item(s) from inventory? This requires the admin password.`);
  pendingDeleteAction = { type: 'marked' };
}

function requestDeleteAuth(message) {
  document.getElementById('delete-auth-hint').textContent = message;
  document.getElementById('delete-auth-error').textContent = '';
  document.getElementById('delete-auth-password').value = '';
  document.getElementById('delete-auth-modal').classList.remove('hidden');
  document.getElementById('delete-auth-password').focus();
}

function closeDeleteAuthModal() {
  document.getElementById('delete-auth-modal').classList.add('hidden');
  pendingDeleteAction = null;
}

function confirmDeleteAuth() {
  const entered = document.getElementById('delete-auth-password').value.trim();
  if (!entered) {
    document.getElementById('delete-auth-error').textContent = 'Enter the admin password.';
    return;
  }
  const users = getFromStorage(STORAGE_KEYS.users);
  const authorized = users.some((user) => user.role === 'admin' && user.password === entered)
    || (currentUser && currentUser.password === entered);
  if (!authorized) {
    document.getElementById('delete-auth-error').textContent = 'Incorrect admin password.';
    logAudit('Delete blocked', 'Incorrect admin password entered by ' + (currentUser ? currentUser.name : 'User'));
    return;
  }
  const action = pendingDeleteAction;
  pendingDeleteAction = null;
  document.getElementById('delete-auth-modal').classList.add('hidden');
  if (action.type === 'single') {
    deleteInventoryItem(action.id);
  } else if (action.type === 'marked') {
    deleteMarkedInventory();
  } else if (action.type === 'menu') {
    performMenuDelete(action);
  } else if (action.type === 'bookorder') {
    performBookOrderDelete(action);
  } else if (action.type === 'bookorder-void') {
    performBookOrderVoid(action);
  }
}

function deleteMarkedInventory() {
  const ids = getMarkedInventoryIds();
  if (!ids.length) return;
  inventoryMarkAll = false;
  const inventory = getFromStorage(STORAGE_KEYS.inventory);
  const deletedItems = inventory.filter((item) => ids.includes(item.id));
  const names = deletedItems.map((item) => item.name);

  removeMenuItemsForDeletedInventory(deletedItems);

  const updatedInventory = inventory.filter((item) => !ids.includes(item.id));

  writeToStorage(STORAGE_KEYS.inventory, updatedInventory);
  logAudit('Inventory deleted', `Deleted ${names.length} item(s): ${names.join(', ')}`);
  renderInventoryManager();
  renderMenuManager();
  renderDashboard();
  renderPOS();
  showToast(`${names.length} item(s) deleted.`, 'success');
}

function refreshLivePanels() {
  checkShiftTimers();
  checkCashierShiftEnded();
  renderShiftGate();
  if (document.getElementById('dashboard-panel')?.classList.contains('active')) renderDashboard();
  if (document.getElementById('orders-panel')?.classList.contains('active')) renderOrdersManager();
  if (document.getElementById('bookorders-panel')?.classList.contains('active')) renderBookOrdersPanel();
  if (document.getElementById('reports-panel')?.classList.contains('active')) renderReports();
  if (document.getElementById('pos-panel')?.classList.contains('active')) renderPOS();
  if (document.getElementById('menu-panel')?.classList.contains('active')) renderMenuManager();
  if (document.getElementById('leftover-panel')?.classList.contains('active')) renderLeftoverManager();
  if (document.getElementById('promos-panel')?.classList.contains('active')) renderPromosManager();
  if (document.getElementById('audit-panel')?.classList.contains('active')) renderAuditManager();
  if (document.getElementById('tables-panel')?.classList.contains('active')) renderTablesPanel();
  if (document.getElementById('kitchen-panel')?.classList.contains('active')) renderKitchenPanel();
  if (document.getElementById('purchaseorders-panel')?.classList.contains('active')) renderPurchaseOrdersPanel();
  checkLowStockNotification(false);
}

async function pollServerSync() {
  if (!serverOnline) return;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    const res = await fetch('/api/data', { signal: controller.signal, cache: 'no-store' });
    clearTimeout(timer);
    if (!res.ok) return;
    const payload = await res.json();
    const data = (payload && payload.data) || {};
    const sig = JSON.stringify(Object.entries(data).sort((a, b) => (a[0] < b[0] ? -1 : 1)).map(([k, v]) => [k, v]));
    if (sig === lastPollJson) return;
    lastPollJson = sig;
    let changed = false;
    SERVER_KEYS.forEach((key) => {
      if (data[key] === undefined || data[key] === null) return;
      const same = JSON.stringify(memoryStore[key]) === JSON.stringify(data[key]);
      if (!same && (lastLocalWrite[key] || 0) < Date.now() - 1500) {
        memoryStore[key] = data[key];
        changed = true;
      }
    });
    if (changed) refreshLivePanels();
  } catch (error) {}
}

function repairDuplicateMenuIds() {
  const menu = getFromStorage(STORAGE_KEYS.menu);
  const seen = new Set();
  let changed = false;
  let nextId = Date.now();
  menu.forEach((item) => {
    if (seen.has(item.id)) {
      do {
        nextId += 1;
      } while (seen.has(nextId));
      item.id = nextId;
      changed = true;
    }
    seen.add(item.id);
  });
  if (changed) writeToStorage(STORAGE_KEYS.menu, menu);
}

function applyTimeGreeting() {
  const hour = new Date().getHours();
  const title = document.getElementById('login-greeting');
  const sub = document.getElementById('login-greeting-sub');
  if (!title) return;
  let text = '';
  let emoji = '';
  let subText = 'Sign in to continue';
  if (hour >= 5 && hour < 12) {
    text = 'Good morning';
    emoji = '☕';
    subText = 'A fresh cup to start the day';
  } else if (hour >= 12 && hour < 17) {
    text = 'Good afternoon';
    emoji = '☀️';
    subText = 'Hope the day is going well';
  } else {
    text = 'Good evening';
    emoji = '🌙';
    subText = 'Wind down and wrap up the day';
  }
  const textEl = document.getElementById('login-greeting-text');
  const emojiEl = document.getElementById('login-greeting-emoji');
  if (textEl) textEl.textContent = text;
  if (emojiEl) emojiEl.textContent = emoji;
  if (sub) sub.textContent = subText;
}

function boot() {
  initServerSync().then(() => {
    initStorage();
    applyBrandName();
    applyTimeGreeting();
    backfillInvoiceNumbers();
    repairDuplicateMenuIds();
    buildOnScreenKeyboard();
    bootReady();
  });
}

function bootReady() {
  ['username', 'password'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('focus', () => { oskTargetEl = el; });
  });
  ['menu-search', 'barcode-input'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('focus', () => { oskTargetEl = el; });
  });
  let savedSession = null;
  try {
    savedSession = JSON.parse(localStorage.getItem(STORAGE_KEYS.session) || 'null');
  } catch (error) {
    localStorage.removeItem(STORAGE_KEYS.session);
    document.documentElement.classList.remove('app-logged-in');
  }

  const VALID_REPORT_TABS = ['sales', 'invoice', 'summary', 'analysis', 'inventory', 'menu', 'orders', 'tax', 'payments', 'stock', 'products', 'daily', 'transactions', 'customers', 'refunds', 'purchases', 'closings', 'price', 'shift', 'void', 'leftover', 'promos', 'tables', 'kitchen', 'delivery', 'modifiers', 'tips', 'purchaseorders', 'branches', 'receipts', 'bookorders'];
  const VALID_PERIODS = ['today', '7d', '30d', 'all'];
  const savedReportTab = localStorage.getItem(STORAGE_KEYS.reportTab);
  if (savedReportTab && VALID_REPORT_TABS.includes(savedReportTab)) reportTab = savedReportTab;
  const savedReportPeriod = localStorage.getItem(STORAGE_KEYS.reportPeriod);
  if (savedReportPeriod && VALID_PERIODS.includes(savedReportPeriod)) reportPeriod = savedReportPeriod;
  try {
    const savedViews = JSON.parse(localStorage.getItem('ff_report_views') || '{}');
    if (savedViews && typeof savedViews === 'object') reportViews = savedViews;
  } catch (error) {}

  const menuSearch = document.getElementById('menu-search');
  if (menuSearch) {
    menuSearch.addEventListener('input', () => {
      const clearBtn = document.querySelector('.menu-search-clear');
      if (clearBtn) clearBtn.classList.toggle('visible', menuSearch.value.length > 0);
      renderPOS();
    });
  }
  const menuManagerSearch = document.getElementById('menu-search-manager');
  if (menuManagerSearch) {
    menuManagerSearch.addEventListener('input', () => {
      const clearBtn = document.querySelector('.frontstore-search .report-search-clear');
      if (clearBtn) clearBtn.classList.toggle('visible', menuManagerSearch.value.length > 0);
      menuPage = 1;
      renderMenuManager();
    });
  }
  const inventorySearchInput = document.getElementById('inventory-search');
  if (inventorySearchInput) {
    inventorySearchInput.addEventListener('input', () => {
      const clearBtn = document.querySelector('.inv-search .report-search-clear');
      if (clearBtn) clearBtn.classList.toggle('visible', inventorySearchInput.value.length > 0);
      inventoryPage = 1;
      renderInventoryManager();
    });
  }
  const barcodeInput = document.getElementById('barcode-input');
  if (barcodeInput) {
    barcodeInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleBarcodeEntry();
      }
    });
    barcodeInput.addEventListener('input', () => {
      if (barcodeInput.value.length >= 6) handleBarcodeEntry();
    });
  }

  document.getElementById('void-auth-password').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      confirmVoidAuth();
    }
  });
  document.getElementById('delete-auth-password').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      confirmDeleteAuth();
    }
  });
  document.getElementById('menu-form').addEventListener('submit', handleMenuSubmit);
  document.getElementById('inventory-form').addEventListener('submit', handleInventorySubmit);
  const promoForm = document.getElementById('promo-form');
  if (promoForm) promoForm.addEventListener('submit', handlePromoSubmit);
  const discountForm = document.getElementById('discount-form');
  if (discountForm) discountForm.addEventListener('submit', handleDiscountSubmit);

  const menuColor = document.getElementById('menu-color');
  const menuColorText = document.getElementById('menu-color-text');
  if (menuColor && menuColorText) {
    const setColorValue = (value) => {
      const clean = (value.startsWith('#') ? value : '#' + value).toLowerCase();
      menuColor.value = clean;
      menuColorText.value = clean.toUpperCase();
      document.querySelectorAll('.color-presets .cp-swatch').forEach((swatch) => {
        swatch.classList.toggle('selected', swatch.dataset.color === clean);
      });
    };
    menuColor.addEventListener('input', () => { menuColorText.value = menuColor.value.toUpperCase(); });
    menuColorText.addEventListener('input', () => {
      const value = menuColorText.value.trim();
      if (/^#?[0-9a-fA-F]{6}$/.test(value)) {
        setColorValue(value);
      }
    });
    const presetsEl = document.getElementById('menu-color-presets');
    if (presetsEl) {
      const presets = [
        '#b91c1c', '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d',
        '#16a34a', '#059669', '#0d9488', '#0891b2', '#0284c7', '#2563eb',
        '#4f46e5', '#7c3aed', '#a21caf', '#c026d3', '#db2777', '#e11d48',
        '#92400e', '#78350f', '#1f2937', '#111827'
      ];
      presetsEl.innerHTML = presets.map((color) => `
        <button type="button" class="cp-swatch" data-color="${color}" style="background:${color}" title="${color}" aria-label="Use color ${color}"></button>
      `).join('');
      presetsEl.querySelectorAll('.cp-swatch').forEach((swatch) => {
        swatch.addEventListener('click', () => setColorValue(swatch.dataset.color));
      });
    }
  }

  ['shop-name', 'currency', 'shop-address', 'shop-phone', 'shop-email', 'tax-rate'].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.addEventListener('input', syncSettingsHero);
  });

  const updatePasswordNew = document.getElementById('update-password-new');
  if (updatePasswordNew) updatePasswordNew.addEventListener('input', renderPasswordStrength);

  document.querySelectorAll('.nav-btn').forEach((button) => {
    button.addEventListener('click', () => showPanel(button.dataset.panel));
  });

  document.querySelectorAll('#report-period-switch .period-btn').forEach((button) => {
    button.addEventListener('click', () => setReportPeriod(button.dataset.period));
  });

  document.querySelectorAll('.report-tab').forEach((button) => {
    button.addEventListener('click', () => setReportTab(button.dataset.report));
  });

  setInterval(() => { pollServerSync(); refreshLivePanels(); }, 5000);
  window.addEventListener('storage', refreshLivePanels);
  window.addEventListener('focus', refreshLivePanels);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refreshLivePanels();
  });
  window.addEventListener('resize', updateMenuScrollButtons);
  setInterval(applyTimeGreeting, 30000);
  setInterval(() => { if (currentUser) saveRecoverySnapshot(); }, 60000);
  window.addEventListener('beforeunload', () => { if (currentUser) saveRecoverySnapshot(); });

  let touchStartY = 0;
  document.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchmove', (event) => {
    const dy = event.touches[0].clientY - touchStartY;
    const atTop = window.scrollY <= 0;
    const atBottom = window.innerHeight + Math.ceil(window.scrollY) >= document.documentElement.scrollHeight;
    if ((atTop && dy > 0) || (atBottom && dy < 0)) {
      event.preventDefault();
    }
  }, { passive: false });

  document.querySelectorAll('.report-tab').forEach((button) => {
    button.classList.toggle('active', button.dataset.report === reportTab);
  });
  document.querySelectorAll('#report-period-switch .period-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.period === reportPeriod);
  });

  const savedPanel = localStorage.getItem(STORAGE_KEYS.panel);
  const startPanel = savedPanel && document.getElementById(savedPanel + '-panel') ? savedPanel : 'dashboard';

  if (savedSession) {
    currentUser = savedSession;
    setView('app');
    renderAuth();
    showPanel(startPanel);
    checkLowStockNotification(true);
    renderShiftGate();
  } else {
    setView('login');
  }

  setTimeout(checkRecovery, 1200);
}

boot();
