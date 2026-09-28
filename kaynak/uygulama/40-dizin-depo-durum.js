/* ---------- Başlık yazımı ----------
   Veride başlıklar cümle düzeninde yazılır; burada bir kez baslikYaz ile dönüştürülür (arama dizini de bunu görür).
   Başlık sayılanlar: konu, filtre, alt başlık ve sayfa adları, bölüm başlıkları ve çipleri, kart ve örnek başlıkları,
   şema işaret adları, “Birlikte kullanılır” listeleri, hesaplayıcı grup adları, model parça adları, metin sayfası başlıkları. */
(() => {
  const B = baslikYaz;
  VERI.konular.forEach((k) => {
    k.ad = B(k.ad);
    (k.filtreler || []).forEach((f) => { f.ad = B(f.ad); });
    k.altlar.forEach((a) => { a.ad = B(a.ad); });
  });
  Object.values(VERI.sayfalar).forEach((s) => {
    s.baslik = B(s.baslik);
    s.bolumler.forEach((b) => {
      b.baslik = B(b.baslik);
      b.kisa = B(b.kisa);
      b.bloklar.forEach((k) => {
        if (k.baslik) k.baslik = B(k.baslik);
        if (k.ornek) k.ornek.baslik = B(k.ornek.baslik);
        if (k.kartlar) k.kartlar.forEach((c) => { c.baslik = B(c.baslik); });
        if (k.isaretler) k.isaretler.forEach((i) => { i[0] = B(i[0]); });
        if (k.tip === 'parcalar') k.parcalar = k.parcalar.map(B);
      });
    });
  });
  Object.values(HESAPLAR).forEach((h) => (h.gruplar || []).forEach((g) => { g.ad = B(g.ad); }));
  Object.values(MODELLER).forEach((m) => {
    m.parcalar.forEach((p) => { p[0] = B(p[0]); });
    if (m.etiketBaslik) m.etiketBaslik = B(m.etiketBaslik);
  });
  Object.values(METINLER).forEach((m) => {
    m.baslik = B(m.baslik);
    m.bolumler.forEach((b) => { b[0] = B(b[0]); });
  });
})();

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
