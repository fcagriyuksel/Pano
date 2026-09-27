/* ---------- Ekranlar ---------- */
function anaSayfa() {
  return `
    <header class="marka">
      <span class="marka-plaka" aria-hidden="true"></span>
      <div class="marka-ic"><h1 class="marka-ad" tabindex="-1">PANO</h1><p class="marka-alt">Elektrik-elektronik bilgi notları</p></div>
      <button type="button" class="ikon-dugme" data-git="ayarlar" aria-label="Ayarlar">${IKON.ayar}</button>
    </header>
    ${uyariKarti()}
    <button type="button" class="arama-dugme" data-git="ara">${IKON.ara}<span>Konu, parça veya terim ara</span></button>
    ${devamKarti()}
    <section class="blok-grup" aria-labelledby="konular-baslik">
      <div class="satir-baslik"><h2 class="h2" id="konular-baslik">Konular</h2><span class="ust">${VERI.konular.length} konu</span></div>
      <div class="konu-izgara">${VERI.konular.map(konuKarti).join('')}</div>
    </section>`;
}

function devamKarti() {
  let a = durum.son && ALT[durum.son.sayfa];
  let devam = !!(a && hazirMi(a));
  if (!devam) a = hazirlar()[0];
  if (!a) return '';
  const s = sayfaOf(a);
  const toplam = s.bolumler.length;
  let bi = 0;
  if (devam) bi = Math.max(0, s.bolumler.findIndex((b) => b.id === durum.son.bolum));
  const okunan = devam ? Math.min(toplam, Math.max(bi, Number(durum.ilerleme[a.id]) || 0) + 1) : 0;
  const alt = devam ? `${a.konu.ad} · ${s.bolumler[bi].kisa} bölümünden devam et` : `${a.konu.ad} · ${toplam} bölüm`;
  const seg = s.bolumler.map((b, i) => `<span class="${i < okunan ? 'dolu' : ''}"></span>`).join('');
  return `
    <button type="button" class="panel" data-git="${a.id}"${devam ? ` data-hedef-bolum="${s.bolumler[bi].id}"` : ''}>
      <span class="panel-ust"><span class="panel-etiket">${devam ? 'Kaldığın yer' : 'Buradan başla'}</span><span class="panel-sayac">${okunan} / ${toplam} bölüm</span></span>
      <span><span class="panel-baslik" style="display:block">${esc(s.baslik)}</span><span class="panel-alt" style="display:block">${esc(alt)}</span></span>
      <span class="ilerleme" style="grid-template-columns:repeat(${toplam},minmax(0,1fr))" aria-hidden="true">${seg}</span>
    </button>`;
}

function konuKarti(k) {
  const hazir = k.altlar.filter(hazirMi).length;
  return `
    <button type="button" class="konu-kart" data-git="${k.id}">
      <span class="konu-kart-ust">${IKON[k.ikon] || ''}<span class="konu-no">${k.no}</span></span>
      <span class="konu-kart-ad">${esc(k.ad)}</span>
      <span class="konu-kart-ozet">${esc(k.ozet)}</span>
      <span class="konu-kart-durum">${hazir} / ${k.altlar.length} hazır</span>
    </button>`;
}

function altSatiri(a, yolGoster) {
  const h = hazirMi(a);
  const ic = `<span class="kod${h ? ' hazir' : ''}">${esc(a.kod)}</span>
    <span class="satir-metin">${yolGoster ? `<span class="sonuc-yol">${esc(a.konu.ad)}</span>` : ''}<span class="satir-ad">${esc(a.ad)}</span><span class="satir-alt">${esc(a.alt)}</span></span>`;
  return h
    ? `<button type="button" class="satir" data-git="${a.id}">${ic}${kilitli(a) ? `<span class="rozet rozet-premium">${IKON.kilitK}Premium</span>` : `<span class="ok">${IKON.ok}</span>`}</button>`
    : `<div class="satir">${ic}<span class="rozet">Hazırlanıyor</span></div>`;
}

function konuEkrani(k) {
  const f = durum.filtre[k.id] || 'tumu';
  const altlar = k.altlar.filter((a) => f === 'tumu' || a.filtre === f);
  const filtreler = k.filtreler
    ? `<div class="cipler" role="group" aria-label="Filtre">${[{ id: 'tumu', ad: 'Tümü' }].concat(k.filtreler).map((x) =>
        `<button type="button" class="cip" data-filtre="${x.id}" data-konu="${k.id}" aria-pressed="${x.id === f}">${esc(x.ad)}</button>`).join('')}</div>`
    : '';
  return `
    <div class="ust-cubuk" id="ust-cubuk">
      <div class="ust-satir"><button type="button" class="geri" data-git="ana">${IKON.geri}<span>Konular</span></button><span class="ust">Konu ${k.no}</span></div>
    </div>
    <div class="baslik-blok"><h1 class="h1" tabindex="-1">${esc(k.ad)}</h1><p class="giris">${esc(k.giris)}</p></div>
    ${filtreler}
    <div class="liste">
      <span class="ust">${altlar.length} alt başlık · ${altlar.filter(hazirMi).length} hazır</span>
      ${altlar.map((a) => altSatiri(a, false)).join('')}
    </div>`;
}

function bilgiSayfasi(a) {
  const s = sayfaOf(a);
  const kayitli = durum.kayitli.includes(a.id);
  return `
    <div class="ust-cubuk" id="ust-cubuk">
      <div class="ust-satir">
        <button type="button" class="geri" data-git="${a.konu.id}">${IKON.geri}<span>${esc(a.konu.ad)}</span></button>
        <button type="button" class="ikon-dugme" data-kaydet="${a.id}" aria-pressed="${kayitli}" aria-label="${kayitli ? 'Kayıtlardan çıkar' : 'Kaydet'}">${IKON.yerimi}</button>
      </div>
      <nav class="cipler" id="bolum-cipleri" aria-label="Sayfa bölümleri">
        ${s.bolumler.map((b) => `<button type="button" class="cip" data-bolum-kaydir="${b.id}">${esc(b.kisa)}</button>`).join('')}
      </nav>
    </div>
    <div class="baslik-blok">
      <span class="ust">${esc(a.konu.ad)} › ${a.no}</span>
      <h1 class="h1" tabindex="-1">${esc(s.baslik)}</h1>
      <p class="giris">${esc(s.giris)}</p>
      ${s.etiketler ? `<div class="etiketler">${s.etiketler.map((e) => `<span class="etiket">${esc(e)}</span>`).join('')}</div>` : ''}
    </div>
    <div class="bolumler">
      ${s.bolumler.map((b, i) => `
        <section class="bolum" id="b-${b.id}" data-bolum="${b.id}" aria-labelledby="h-${b.id}">
          <div class="bolum-baslik"><span class="bolum-no">${String(i + 1).padStart(2, '0')}</span><h2 class="bolum-ad" id="h-${b.id}">${esc(b.baslik)}</h2></div>
          ${b.bloklar.map(blok).join('')}
        </section>`).join('')}
      ${sonrakiKart(a)}
    </div>`;
}

function sonrakiKart(a) {
  const n = a.konu.altlar[a.sira + 1];
  if (!n) {
    return `<button type="button" class="sonraki" data-git="${a.konu.id}"><span><span class="panel-etiket" style="display:block">Konu sonu</span><span class="sonraki-ad">${esc(a.konu.ad)} listesine dön</span></span>${IKON.ok}</button>`;
  }
  if (hazirMi(n)) {
    return `<button type="button" class="sonraki" data-git="${n.id}"><span><span class="panel-etiket" style="display:block">Sonraki</span><span class="sonraki-ad">${esc(n.ad)}</span></span>${kilitli(n) ? `<span class="rozet" style="color:var(--accent);border-color:var(--accent)">Premium</span>` : IKON.ok}</button>`;
  }
  return `<div class="sonraki"><span><span class="panel-etiket" style="display:block">Sonraki</span><span class="sonraki-ad">${esc(n.ad)}</span></span><span class="rozet">Hazırlanıyor</span></div>`;
}
