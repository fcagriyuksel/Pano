/* ---------- Güvenlik uyarısı kartı ---------- */
function uyariKarti() {
  if (durum.uyariOnay) return '';
  return `
    <section class="uyari-kart" aria-labelledby="uyari-baslik">
      <div class="uyari-ust">${IKON.uyari}<h2 id="uyari-baslik">Başlamadan önce</h2></div>
      <p>Bu notlar eğitim amaçlıdır. Elektrik işlerini yalnızca yetkili kişiler, enerjiyi kesip gerilim olmadığını ölçerek yapmalıdır. Değerlerde ürün kataloğu ve yönetmelik esastır.</p>
      <div class="dugme-satir"><button type="button" class="dugme dugme-ana" data-uyari-onay>Anladım</button><button type="button" class="dugme" data-git="uyari">Ayrıntılar</button></div>
    </section>`;
}

/* ---------- Premium ekranı ---------- */
function premiumEkrani() {
  const hazir = hazirlar();
  const ucretsiz = hazir.filter((a) => VERI.ucretsiz.includes(a.id));
  const hedef = durum.premiumHedef && ALT[durum.premiumHedef];
  const geri = onceki && onceki !== 'premium' ? onceki : 'ana';
  const fiyat = PREMIUM.fiyat || (PREMIUM.servis ? 'Fiyat okunamadı' : 'Fiyat Google Play’de gösterilir');
  const madde = (t) => `<li>${IKON.tik}<span>${t}</span></li>`;
  let eylem;
  if (PREMIUM.aktif) {
    eylem = `<div class="basari">Premium etkin. Bütün notlar açık.</div>`;
  } else {
    eylem = `<div class="blok-grup" style="gap:8px">
        <button type="button" class="dugme dugme-ana dugme-genis" data-premium="al">Premium’u satın al</button>
        <button type="button" class="dugme dugme-genis" data-premium="geri">Satın alımı geri yükle</button>
      </div>`;
  }
  let bilgi = '';
  if (!UYGULAMA.premium.kilit) bilgi = '<p class="kucuk">Geliştirme sürümü: bütün içerik şu an açık. Satın alma, uygulama Google Play’den yüklendiğinde çalışır.</p>';
  else if (!PREMIUM.servis && !PREMIUM.aktif) bilgi = '<p class="kucuk">Satın alma yalnızca Google Play’den yüklenen uygulamada yapılabilir.</p>';
  return `
    <div class="ust-cubuk" id="ust-cubuk"><div class="ust-satir"><button type="button" class="geri" data-git="${geri}">${IKON.geri}<span>Geri</span></button></div></div>
    <div class="panel premium-panel">
      <span class="panel-etiket">PANO Premium</span>
      <h1 class="h1" tabindex="-1">Bütün notları aç</h1>
      <span class="panel-alt">Tek seferlik satın alma, abonelik yok.</span>
      <span class="premium-fiyat">${esc(PREMIUM.aktif ? 'Satın alındı' : fiyat)}</span>
    </div>
    ${hedef && !PREMIUM.aktif ? `<p class="not">“${esc(sayfaOf(hedef).baslik)}” sayfası Premium’a dahil.</p>` : ''}
    <ul class="premium-liste">
      ${madde(`${hazir.length} bilgi sayfasının tamamı (${ucretsiz.length} tanesi ücretsiz)`)}
      ${madde(`${Object.keys(HESAPLAR).length} etkileşimli hesaplayıcı`)}
      ${madde('Bundan sonra eklenecek sayfalar')}
      ${madde('İnternet olmadan kullanım')}
    </ul>
    ${eylem}
    ${bilgi}
    <section class="blok-grup" aria-labelledby="ucretsiz-baslik">
      <h2 class="h2" id="ucretsiz-baslik">Ücretsiz sayfalar</h2>
      <div class="liste">${ucretsiz.map((a) => altSatiri(a, true)).join('')}</div>
    </section>`;
}

/* ---------- Ayarlar ---------- */
function ayarlarEkrani() {
  const a = durum.ayarlar;
  const secim = (k, ad, secenekler) => `
    <fieldset class="hesap-grup"><legend>${ad}</legend>
      <div class="secenekler">${secenekler.map(([v, l]) => `<button type="button" class="secenek" data-ayar="${k}" data-deger="${v}" aria-pressed="${a[k] === v}">${l}</button>`).join('')}</div>
    </fieldset>`;
  const satir = (hedef, ad, alt) => `<button type="button" class="satir" data-git="${hedef}"><span class="satir-metin"><span class="satir-ad">${esc(ad)}</span>${alt ? `<span class="satir-alt">${esc(alt)}</span>` : ''}</span><span class="ok">${IKON.ok}</span></button>`;
  const premiumAlt = PREMIUM.aktif ? 'Bütün notlar açık' : UYGULAMA.premium.kilit ? 'Bütün notları tek seferde aç' : 'Geliştirme sürümünde bütün notlar açık';
  const sifirla = durum.sifirlaOnay
    ? `<p class="kural">Kayıtlar, okuma ilerlemesi, son aramalar ve hesaplayıcı seçimleri silinecek. Emin misin?</p>
       <div class="dugme-satir"><button type="button" class="dugme dugme-tehlike" data-sifirla="evet">Evet, sıfırla</button><button type="button" class="dugme" data-sifirla="hayir">Vazgeç</button></div>`
    : `<div><button type="button" class="dugme" data-sifirla="sor">Verileri sıfırla</button></div>`;
  return `
    <div class="ust-cubuk" id="ust-cubuk"><div class="ust-satir"><button type="button" class="geri" data-git="ana">${IKON.geri}<span>Konular</span></button></div></div>
    <div class="baslik-blok"><h1 class="h1" tabindex="-1">Ayarlar</h1></div>
    <section class="blok-grup" aria-labelledby="ay-gorunum">
      <h2 class="h2" id="ay-gorunum">Görünüm</h2>
      <div class="kart" style="gap:16px">${secim('tema', 'Tema', [['sistem', 'Sistem'], ['acik', 'Açık'], ['koyu', 'Koyu']])}${secim('yazi', 'Yazı boyutu', [['normal', 'Normal'], ['buyuk', 'Büyük']])}</div>
    </section>
    ${UYGULAMA.premium.kilit ? `<section class="blok-grup" aria-labelledby="ay-premium">
      <h2 class="h2" id="ay-premium">Premium</h2>
      <div class="liste">${satir('premium', PREMIUM.aktif ? 'Premium etkin' : 'PANO Premium', premiumAlt)}</div>
    </section>` : ''}
    <section class="blok-grup" aria-labelledby="ay-veri">
      <h2 class="h2" id="ay-veri">Verilerim</h2>
      <div class="kart">
        <p class="mini-metin" style="margin:0">${durum.kayitli.length} kayıtlı not. Kayıtlar, okuma ilerlemesi ve son aramalar yalnızca bu cihazda tutulur.</p>
        ${sifirla}
      </div>
    </section>
    <section class="blok-grup" aria-labelledby="ay-bilgi">
      <h2 class="h2" id="ay-bilgi">Bilgi</h2>
      <div class="liste">
        ${satir('uyari', 'Güvenlik uyarısı')}${satir('gizlilik', 'Gizlilik politikası')}${satir('kosullar', 'Kullanım koşulları')}${satir('hakkinda', 'Hakkında', 'Sürüm ' + UYGULAMA.surum)}
      </div>
    </section>`;
}

/* ---------- Metin sayfaları (uyarı, gizlilik, koşullar) ---------- */
function metinEkrani(k) {
  const m = METINLER[k];
  const onay = k === 'uyari' && !durum.uyariOnay ? `<div><button type="button" class="dugme dugme-ana" data-uyari-onay>Anladım</button></div>` : '';
  return `
    <div class="ust-cubuk" id="ust-cubuk"><div class="ust-satir"><button type="button" class="geri" data-git="ayarlar">${IKON.geri}<span>Ayarlar</span></button></div></div>
    <div class="baslik-blok"><h1 class="h1" tabindex="-1">${esc(m.baslik)}</h1>${m.guncelleme ? `<span class="ust">Son güncelleme: ${esc(m.guncelleme)}</span>` : ''}</div>
    <div class="metin-sayfa">${m.bolumler.map(([b, t]) => `<section><h2 class="metin-baslik">${esc(b)}</h2><p>${esc(t.replace('{eposta}', UYGULAMA.eposta))}</p></section>`).join('')}</div>
    ${onay}`;
}

/* ---------- Hakkında ---------- */
function hakkindaEkrani() {
  const satir = (e, m) => `<div class="tablo-satir"><span class="tablo-etiket">${esc(e)}</span><span class="tablo-metin">${esc(m)}</span></div>`;
  return `
    <div class="ust-cubuk" id="ust-cubuk"><div class="ust-satir"><button type="button" class="geri" data-git="ayarlar">${IKON.geri}<span>Ayarlar</span></button></div></div>
    <header class="marka"><span class="marka-plaka" aria-hidden="true"></span><div class="marka-ic"><h1 class="marka-ad" tabindex="-1">PANO</h1><p class="marka-alt">Elektrik-elektronik bilgi notları</p></div></header>
    <div class="tablo">
      ${satir('Sürüm', UYGULAMA.surum)}
      ${satir('İçerik', `${VERI.konular.length} konu · ${hazirlar().length} bilgi sayfası · ${Object.keys(HESAPLAR).length} hesaplayıcı`)}
      ${satir('Geliştirici', UYGULAMA.gelistirici)}
      ${satir('İletişim', UYGULAMA.eposta)}
      ${satir('Yazı tipleri', 'Barlow Condensed, IBM Plex Sans, IBM Plex Mono · SIL Open Font License 1.1')}
    </div>
    <p class="not">Değerler üretici katalogları ve standartlardan derlenmiştir. Uygulamadan önce kullandığın ürünün belgesine bak.</p>`;
}

/* ---------- Kaydedilenler ---------- */
function kayitEkrani() {
  const liste = durum.kayitli.map((id) => ALT[id]).filter((a) => a && hazirMi(a));
  return `
    <div class="baslik-blok" style="padding-top:8px">
      <h1 class="h1" tabindex="-1">Kaydedilenler</h1>
      <p class="giris">Bilgi sayfalarındaki yer imi düğmesiyle kaydettiğin notlar burada. Kayıtlar bu cihazda, bu tarayıcıda tutulur.</p>
    </div>
    ${liste.length
      ? `<div class="liste">${liste.map((a) => altSatiri(a, true)).join('')}</div>`
      : `<div class="bos">${IKON.yerimiBuyuk}<span>Henüz kaydettiğin bir not yok.</span><button type="button" class="cip" data-git="ana">Konulara göz at</button></div>`}`;
}
