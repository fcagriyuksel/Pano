/* Otomasyon Notları çevrimdışı çalışma. İnternet varken her açılışta güncel index.html alınır.
   Bu dosya şablondur: derle.py sürüm damgasını ve önbelleğe alınacak dosya listesini yerine yazar. */
/* Önbellek adları uygulamanın önekini taşır. Aynı adresteki (fcagriyuksel.github.io) başka uygulamaların önbelleği silinmesin diye
   yalnızca bu önekle ya da eski adla (pano-) başlayanlar temizlenir. */
const ONEK = 'otomasyon-notlari-';
const KABUK = ONEK + '__SURUM__';
const DOSYALAR = __DOSYALAR__;

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(KABUK).then((c) => c.addAll(DOSYALAR)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== KABUK && (k.startsWith(ONEK) || k.startsWith('pano-'))).map((k) => caches.delete(k))))
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

/* varliklar/ altındaki dosyalar (yazı tipi, simge, kütüphane) sürümle değişmez: önce önbellek. */
function onceOnbellek(r) {
  return caches.match(r).then((m) => m || fetch(r).then((y) => {
    if (y && y.ok) { const kopya = y.clone(); caches.open(KABUK).then((c) => c.put(r, kopya)); }
    return y;
  }));
}

self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== self.location.origin) return;
  if (u.pathname.includes('/varliklar/')) { e.respondWith(onceOnbellek(r)); return; }
  e.respondWith(onceAg(r));
});
