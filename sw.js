/* PANO çevrimdışı çalışma. İnternet varken her açılışta güncel index.html alınır. */
const KABUK = 'pano-kabuk-v1';
const YAZITIPI = 'pano-yazitipi-v1';
const DOSYALAR = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(KABUK).then((c) => c.addAll(DOSYALAR)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== KABUK && k !== YAZITIPI).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function onbellektenBul(r) {
  return caches.match(r, { ignoreSearch: true }).then((m) => m || (r.mode === 'navigate' ? caches.match('./index.html') : undefined));
}

/* Önce ağ; ağ 3,5 sn içinde yanıt vermezse ya da yoksa önbellek. */
function onceAg(r) {
  return new Promise((coz) => {
    let bitti = false;
    const bitir = (y) => { if (!bitti && y) { bitti = true; coz(y); } };
    const zaman = setTimeout(() => onbellektenBul(r).then(bitir), 3500);
    fetch(r)
      .then((y) => {
        clearTimeout(zaman);
        if (y && y.ok) { const kopya = y.clone(); caches.open(KABUK).then((c) => c.put(r, kopya)); }
        bitir(y);
      })
      .catch(() => {
        clearTimeout(zaman);
        onbellektenBul(r).then((m) => { if (!bitti) { bitti = true; coz(m || Response.error()); } });
      });
  });
}

self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin === self.location.origin) { e.respondWith(onceAg(r)); return; }
  if (u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(YAZITIPI).then((c) => c.match(r).then((m) => {
      const ag = fetch(r).then((y) => { c.put(r, y.clone()); return y; }).catch(() => m);
      return m || ag;
    })));
  }
});
