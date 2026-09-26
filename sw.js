/**
 * FasterFood POS service worker.
 *
 * This exists only so Chrome and Edge treat the app as installable: they
 * require a service worker with a fetch handler before they will offer
 * "Install app" or add a home-screen shortcut.
 *
 * It deliberately does nothing. The fetch handler below never calls
 * respondWith(), so every request -- the page, the CSS, the API, the SSE
 * stream at /api/events -- goes straight to the network exactly as it would
 * without a worker. Nothing is cached, nothing is precached, and there is no
 * offline fallback.
 *
 * That is the point. A POS reads live prices, stock levels and shift state
 * from the server on every terminal. An offline cache would let a till keep
 * selling against a stale menu after a price change, or after the database
 * went away, and no amount of "refresh" would clear it. The app already
 * degrades on its own when the server is unreachable, which is handled far
 * better by server.js and the client's own offline path.
 *
 * Do not add caching here without reading DEPLOY.md first.
 */

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', () => {
  // Intentionally empty. No respondWith, so the browser's normal network
  // path handles the request untouched.
});
