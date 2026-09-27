/* ---------- Dizinler ---------- */
const KONU = {};
const ALT = {};
VERI.konular.forEach((k, ki) => {
  k.no = String(ki + 1).padStart(2, '0');
  KONU[k.id] = k;
  k.altlar.forEach((a, ai) => {
    a.no = String(ai + 1).padStart(2, '0');
    a.konu = k;
    a.sira = ai;
    ALT[a.id] = a;
  });
});
const sayfaOf = (a) => (a && a.sayfa ? VERI.sayfalar[a.sayfa] : null);
const hazirMi = (a) => !!sayfaOf(a);
const hazirlar = () => VERI.konular.flatMap((k) => k.altlar.filter(hazirMi));

/* ---------- Tarayıcı deposu (yalnızca bu cihaz) ---------- */
const DEPO = {
  oku(k, v) { try { const x = localStorage.getItem('pano.' + k); return x == null ? v : JSON.parse(x); } catch (e) { return v; } },
  yaz(k, v) { try { localStorage.setItem('pano.' + k, JSON.stringify(v)); } catch (e) { /* depo kapalı olabilir */ } }
};
const durum = {
  kayitli: DEPO.oku('kayitli', []),
  son: DEPO.oku('son', null),
  ilerleme: DEPO.oku('ilerleme', {}),
  aramalar: DEPO.oku('aramalar', []),
  hesaplar: DEPO.oku('hesaplar', {}),
  filtre: {},
  sorgu: '',
  ayarlar: Object.assign({ tema: 'sistem', yazi: 'normal' }, DEPO.oku('ayarlar', {})),
  uyariOnay: DEPO.oku('uyariOnay', false) === true,
  sifirlaOnay: false,
  premiumHedef: null,
  sim: {},
  model: {}
};
if (!Array.isArray(durum.kayitli)) durum.kayitli = [];
if (!Array.isArray(durum.aramalar)) durum.aramalar = [];
if (!durum.ilerleme || typeof durum.ilerleme !== 'object') durum.ilerleme = {};
if (!durum.hesaplar || typeof durum.hesaplar !== 'object') durum.hesaplar = {};
