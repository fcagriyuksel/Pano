/* =====================================================================
   OTOMASYON NOTLARI — UYGULAMA AYARLARI
   Play Store yayını öncesi: eposta ve dogrulamaAdresi doldurulur,
   premium.kilit true yapılır.
   ===================================================================== */
const UYGULAMA = {
  ad: 'Otomasyon Notları',
  alt: 'Elektrik, elektronik ve endüstriyel otomasyon',
  surum: '1.19.0',
  gelistirici: 'Furkan Çağrı YÜKSEL',
  eposta: '[İLETİŞİM E-POSTASI]',
  premium: {
    kilit: false,                 /* false: bütün içerik açık (geliştirme). Play sürümünde true. */
    urun: 'pano_premium',         /* Play Console’daki uygulama içi ürün kimliği */
    dogrulamaAdresi: ''           /* Satın alma doğrulama sunucusu (yayın öncesi zorunlu) */
  }
};
