/* ---------- Görünüm ayarları ---------- */
const kok = document.documentElement;
/* Erken betik seçili temayı uyguladıysa, dışarıdan gelen asıl değer data-ilk-tema’dadır. */
const ilkTema = kok.hasAttribute('data-ilk-tema') ? (kok.getAttribute('data-ilk-tema') || null) : kok.getAttribute('data-theme');
function temaUygula() {
  const t = durum.ayarlar.tema;
  if (t === 'acik') kok.setAttribute('data-theme', 'light');
  else if (t === 'koyu') kok.setAttribute('data-theme', 'dark');
  else if (ilkTema) kok.setAttribute('data-theme', ilkTema);
  else kok.removeAttribute('data-theme');
  document.body.classList.toggle('buyuk-yazi', durum.ayarlar.yazi === 'buyuk');
}

/* ---------- Yönlendirme ---------- */
let rota = null;
let onceki = 'ana';
let bekleyenBolum = null;
let ilkCizim = true;
function rotaCoz(t) {
  t = String(t || '').replace(/^#/, '');
  if (!t || t === 'ana') return 'ana';
  if (['ara', 'kaydedilenler', 'ayarlar', 'premium', 'hakkinda'].includes(t) || METINLER[t]) return t;
  if (KONU[t]) return t;
  if (ALT[t] && hazirMi(ALT[t])) {
    if (kilitli(ALT[t])) { durum.premiumHedef = t; return 'premium'; }
    return t;
  }
  return 'ana';
}
function git(hedef, bolum) {
  const t = rotaCoz(hedef);
  bekleyenBolum = bolum || null;
  let hashDegisti = false;
  try {
    if (location.hash.replace(/^#/, '') !== t) { location.hash = t; hashDegisti = true; }
  } catch (e) { hashDegisti = false; }
  if (!hashDegisti) ciz(t);
  else setTimeout(() => { if (rota !== t) ciz(t); }, 80);
}
window.addEventListener('hashchange', () => {
  let t = 'ana';
  try { t = rotaCoz(location.hash); } catch (e) { /* yok say */ }
  if (t !== rota) ciz(t);
});

function ciz(t, secenek) {
  const koru = secenek && secenek.koru;
  if (rota && rota !== t) onceki = rota;
  rota = t;
  const app = $('#uygulama');
  const y = window.scrollY;
  let html;
  if (t === 'ara') html = aramaEkrani();
  else if (t === 'kaydedilenler') html = kayitEkrani();
  else if (t === 'ayarlar') html = ayarlarEkrani();
  else if (t === 'premium') html = premiumEkrani();
  else if (t === 'hakkinda') html = hakkindaEkrani();
  else if (METINLER[t]) html = metinEkrani(t);
  else if (KONU[t]) html = konuEkrani(KONU[t]);
  else if (ALT[t]) html = bilgiSayfasi(ALT[t]);
  else html = anaSayfa();
  app.innerHTML = html;
  menuGuncelle();
  aktifBolum = null;
  if (ALT[t]) sayfaAcildi(ALT[t]);
  if (koru) {
    window.scrollTo(0, y);
  } else if (bekleyenBolum && ALT[t]) {
    const hedef = bekleyenBolum;
    requestAnimationFrame(() => bolumeGit(hedef, false));
  } else {
    window.scrollTo(0, 0);
  }
  bekleyenBolum = null;
  if (!koru && !ilkCizim) {
    if (t === 'ara') { const g = $('#arama-kutusu'); if (g) g.focus({ preventScroll: true }); }
    else { const h = app.querySelector('h1'); if (h) h.focus({ preventScroll: true }); }
  }
  ilkCizim = false;
  kaydirmaIzle();
  simSaatiKur();
}

function menuGuncelle() {
  const aktif = rota === 'ara' ? 'ara' : rota === 'kaydedilenler' ? 'kaydedilenler' : (rota === 'ana' || KONU[rota] || ALT[rota]) ? 'konular' : '';
  $$('[data-menu]').forEach((b) => {
    if (b.dataset.menu === aktif) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
}
