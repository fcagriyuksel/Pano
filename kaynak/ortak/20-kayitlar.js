/* =====================================================================
   PANO — KAYITLAR
   Bütün içerik bu kayıtlara, kaynak/konular/<NN-konu>/ dosyalarından eklenir.
   Biçimler ve örnekler: belgeler/ klasöründeki rehberler.
   ===================================================================== */

/* İçerik. Konular, klasör sırasıyla (01-, 02- …) VERI.konular’a eklenir. */
const VERI = {
  /* Premium kilidi açıkken bu sayfalar ücretsiz kalır. */
  ucretsiz: ['otomatik-sigorta', 'kacak-akim-rolesi', 'step-calisma-prensibi', 'step-surucu-baglantisi', 'servo-enkoder', 'surucu-io'],
  konular: [],
  sayfalar: {}
};

/* Şemalar: ad → SVG metni. Sayfada { tip: 'sema', svg: '<ad>' }. */
const SEMALAR = {};

/* Hesaplayıcılar: ad → { gruplar, hesapla, not }. Sayfada { tip: 'hesap', tur: '<ad>' }. */
const HESAPLAR = {};

/* Simülasyonlar: ad → { not, yeni, olay, dugmeler, durum, ciz, tik? }. Sayfada { tip: 'sim', tur: '<ad>' }. */
const SIMLER = {};

/* 3B modeller: ad → { aciklama, not, parcalar, kur, yeni?, olay?, tik?, dugmeler?, durum?, kamera? }. Sayfada { tip: 'model', tur: '<ad>' }. */
const MODELLER = {};
