// 倉庫ツール Service Worker（アプリ化用）
// データはApps Script（ネット必須）。ここではアプリの外枠だけキャッシュして起動を速くする。
const CACHE = 'soko-v5';
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', './index.html', './manifest.json', './zxing.min.js']).catch(() => {})));
});
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  // ネット優先・失敗時はキャッシュ（オフラインでも画面だけは出る）
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
