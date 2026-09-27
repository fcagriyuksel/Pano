/* ---------- Arama ekranı ---------- */
function aramaEkrani() {
  const vazgec = onceki && onceki !== 'ara' ? onceki : 'ana';
  return `
    <div class="ust-cubuk" id="ust-cubuk">
      <div class="arama-satir">
        <label class="arama-alan" for="arama-kutusu">${IKON.ara}<span class="gizli">Konu, parça veya terim ara</span>
          <input id="arama-kutusu" type="search" autocomplete="off" enterkeyhint="search" placeholder="Konu, parça veya terim ara" value="${esc(durum.sorgu)}">
        </label>
        <button type="button" class="metin-dugme" data-git="${vazgec}">Vazgeç</button>
      </div>
    </div>
    <h1 class="gizli" tabindex="-1">Arama</h1>
    <div id="arama-sonuc" class="blok-grup" style="gap:20px">${aramaSonuclari()}</div>`;
}
function aramaSonuclari() {
  const q = durum.sorgu.trim();
  if (katla(q).length < 2) {
    const son = durum.aramalar.length ? durum.aramalar : ['C eğrisi', 'PUL', 'Mikroadım', 'Kaplin', 'gG'];
    return `
      <div class="blok-grup" style="gap:10px"><span class="ust">${durum.aramalar.length ? 'Son aramalar' : 'Örnek aramalar'}</span>
        <div class="cip-kutu">${son.map((t) => `<button type="button" class="parca" data-ara-terim="${esc(t)}">${esc(t)}</button>`).join('')}</div></div>
      <div class="blok-grup" style="gap:10px"><span class="ust">Parçalar ve terimler</span>
        <div class="cip-kutu">${TUM_PARCALAR.map((p) => `<button type="button" class="parca" data-ara-terim="${esc(aramaTerimi(p))}">${esc(p)}</button>`).join('')}</div></div>`;
  }
  const { terimler, sonuclar } = ara(q);
  if (!sonuclar.length) {
    return `<div class="bos">${IKON.ara}<span>“${esc(q)}” için sonuç yok. Daha kısa bir terim ya da parça adı dene.</span></div>`;
  }
  return `
    <span class="ust" aria-live="polite">“${esc(q)}” için ${sonuclar.length} sonuç</span>
    <div class="liste">${sonuclar.map((d) => {
      const a = d.alt;
      const h = hazirMi(a);
      const baslik = h ? sayfaOf(a).baslik : a.ad;
      const yol = a.konu.ad + (d.bolumAd ? ' › ' + d.bolumAd : '') + (kilitli(a) ? ' · Premium' : '');
      const parca = vurgula(kesit(d.metin, terimler[0]), terimler);
      const ic = `<span class="sonuc-yol">${esc(yol)}</span><span class="bulgu-ad">${vurgula(baslik, terimler)}</span><span class="sonuc-parca">${parca}</span>`;
      return h
        ? `<button type="button" class="sonuc-kart" data-git="${a.id}"${d.bolum ? ` data-hedef-bolum="${d.bolum}"` : ''}>${ic}</button>`
        : `<div class="sonuc-kart">${ic}<span class="rozet" style="align-self:flex-start">Hazırlanıyor</span></div>`;
    }).join('')}</div>`;
}
function aramaKaydet(q) {
  q = q.trim();
  if (katla(q).length < 2) return;
  durum.aramalar = [q].concat(durum.aramalar.filter((x) => katla(x) !== katla(q))).slice(0, 6);
  DEPO.yaz('aramalar', durum.aramalar);
}
function sonucYenile() {
  const k = $('#arama-sonuc');
  if (k) k.innerHTML = aramaSonuclari();
}
