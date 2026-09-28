/* ---------- Premium (Google Play Faturalandırma) ---------- */
const PREMIUM = {
  aktif: DEPO.oku('premium', false) === true,
  servis: null,
  fiyat: null,
  ayarla(v) { this.aktif = !!v; DEPO.yaz('premium', this.aktif); },
  async baslat() {
    if (!('getDigitalGoodsService' in window)) return;
    try { this.servis = await window.getDigitalGoodsService('https://play.google.com/billing'); } catch (e) { this.servis = null; return; }
    if (!this.servis) return;
    try {
      const d = await this.servis.getDetails([UYGULAMA.premium.urun]);
      if (d && d[0] && d[0].price) this.fiyat = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: d[0].price.currency }).format(Number(d[0].price.value));
    } catch (e) { /* fiyat okunamadı */ }
    await this.geriYukle(true);
  },
  async geriYukle(sessiz) {
    if (!this.servis) { if (!sessiz) bildir('Geri yükleme yalnızca Google Play sürümünde çalışır.'); return false; }
    try {
      const liste = await this.servis.listPurchases();
      const var_ = liste.some((p) => p.itemId === UYGULAMA.premium.urun);
      this.ayarla(var_); /* Play listesi esastır: iade edilen satın alma kilidi yeniden kapatır. */
      if (!sessiz) bildir(var_ ? 'Premium geri yüklendi' : 'Bu hesapta Premium satın alımı bulunamadı');
      return var_;
    } catch (e) {
      if (!sessiz) bildir('Satın almalar okunamadı. İnternet bağlantını kontrol et.');
      return false;
    }
  },
  async satinAl() {
    if (!this.servis || !window.PaymentRequest) { bildir('Satın alma yalnızca Google Play’den yüklenen uygulamada yapılabilir.'); return false; }
    try {
      const istek = new PaymentRequest(
        [{ supportedMethods: 'https://play.google.com/billing', data: { sku: UYGULAMA.premium.urun } }],
        { total: { label: 'Toplam', amount: { currency: 'TRY', value: '0' } } }
      );
      const yanit = await istek.show();
      const kod = yanit.details && yanit.details.purchaseToken;
      let gecerli = !!kod;
      if (gecerli && UYGULAMA.premium.dogrulamaAdresi) {
        try {
          const r = await fetch(UYGULAMA.premium.dogrulamaAdresi, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ urun: UYGULAMA.premium.urun, purchaseToken: kod }) });
          gecerli = r.ok;
        } catch (e) { gecerli = false; }
      }
      await yanit.complete(gecerli ? 'success' : 'fail');
      if (gecerli) { this.ayarla(true); bildir('Premium açıldı. Teşekkürler.'); }
      else bildir('Satın alma doğrulanamadı. Biraz sonra “Satın alımı geri yükle”yi dene.');
      return gecerli;
    } catch (e) {
      if (e && e.name === 'AbortError') return false;
      bildir('Satın alma tamamlanamadı.');
      return false;
    }
  }
};
const kilitli = (a) => !!(UYGULAMA.premium.kilit && !PREMIUM.aktif && a && !VERI.ucretsiz.includes(a.id));
