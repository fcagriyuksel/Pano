/* =====================================================================
   PANO — UYGULAMA AYARLARI
   Play Store yayını öncesi: eposta ve dogrulamaAdresi doldurulur,
   premium.kilit true yapılır.
   ===================================================================== */
const UYGULAMA = {
  ad: 'PANO',
  surum: '1.3.0',
  gelistirici: 'Furkan Çağrı YÜKSEL',
  eposta: '[İLETİŞİM E-POSTASI]',
  premium: {
    kilit: false,                 /* false: bütün içerik açık (geliştirme). Play sürümünde true. */
    urun: 'pano_premium',         /* Play Console’daki uygulama içi ürün kimliği */
    dogrulamaAdresi: ''           /* Satın alma doğrulama sunucusu (yayın öncesi zorunlu) */
  }
};
