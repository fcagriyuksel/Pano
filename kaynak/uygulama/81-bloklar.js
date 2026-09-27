/* ---------- Bloklar ---------- */
function blok(b) {
  switch (b.tip) {
    case 'sema': return semaBlok(b);
    case 'kartlar': return `<div class="ikili">${b.kartlar.map((k) => `
      <div class="mini-kart">${IKON[k.ikon] || ''}<span class="mini-ad">${esc(k.baslik)}</span>${k.etiket ? `<span class="mini-etiket">${esc(k.etiket)}</span>` : ''}<span class="mini-metin">${esc(k.metin)}</span></div>`).join('')}</div>`;
    case 'aralik': return aralikBlok(b);
    case 'formul': return formulBlok(b);
    case 'tablo': return `<div class="tablo">${b.satirlar.map((r) => `<div class="tablo-satir"><span class="tablo-etiket ${esc(r[1] || '')}">${esc(r[0])}</span><span class="tablo-metin">${esc(r[2])}</span></div>`).join('')}</div>`;
    case 'hesap': return hesapBlok(b.tur);
    case 'sim': return simBlok(b.tur);
    case 'ariza': return `
      <div class="ariza">
        <div class="ariza-ust"><span class="panel-etiket">Belirti</span><span class="ariza-belirti">${esc(b.belirti)}</span></div>
        ${b.satirlar.map((r) => `<div class="ariza-satir"><span class="ariza-ad">${esc(r[0])}</span><span class="ariza-metin">${esc(r[1])}</span></div>`).join('')}
      </div>`;
    case 'hatalar': return b.hatalar.map((h) => `
      <div class="hata">${IKON.uyari}<div><span class="hata-ad">${esc(h[0])}</span><span class="hata-metin">${esc(h[1])}</span></div></div>`).join('');
    case 'parcalar': return `<div class="cip-kutu">${b.parcalar.map((p) => `<button type="button" class="parca" data-ara-terim="${esc(aramaTerimi(p))}">${esc(p)}</button>`).join('')}</div>
      <p class="kucuk">Bir parçaya dokununca geçtiği tüm notları gösterir.</p>`;
    case 'not': return `<p class="not">${esc(b.metin)}</p>`;
    case 'renkler': return `<div class="renk-izgara">${b.satirlar.map((r) => `<div class="renk"><span class="renk-nokta" style="background:${esc(r[1])}" aria-hidden="true"></span><span class="renk-akim">${esc(r[0])}</span><span class="renk-ad">${esc(r[2])}</span></div>`).join('')}</div>`;
    case 'adimlar': return `<ol class="sira-liste">${b.satirlar.map((m, i) => `<li><span class="sira-no">${i + 1}</span><span>${esc(m)}</span></li>`).join('')}</ol>`;
    default: return '';
  }
}

function semaBlok(b) {
  const lejant = b.lejant ? `<div class="lejant">${b.lejant.map(([s, ad]) => `<span><i class="sw sw-${esc(s)}" aria-hidden="true"></i>${esc(ad)}</span>`).join('')}</div>` : '';
  const isaret = b.isaretler ? `<ol class="isaretler">${b.isaretler.map(([ad, m], i) => `
    <li><span class="isaret-no" aria-hidden="true">${i + 1}</span><div><span class="isaret-ad"><span class="gizli">${i + 1}. </span>${esc(ad)}</span><span class="isaret-metin">${esc(m)}</span></div></li>`).join('')}</ol>` : '';
  return `<div class="kart">${SEMALAR[b.svg] || ''}${lejant}</div>${isaret}${b.not ? `<p class="not">${esc(b.not)}</p>` : ''}`;
}

function aralikBlok(b) {
  const enUzun = Math.max(...b.satirlar.map((r) => r.ad.length));
  const W = 318, x0 = enUzun > 1 ? 14 + enUzun * 9 : 36, x1 = 306, ust = 14, ara_ = 36;
  const eksenY = ust + b.satirlar.length * ara_ - 4;
  const H = eksenY + 28;
  const sx = (v) => +(x0 + ((x1 - x0) * v) / b.max).toFixed(2);
  let izgara = '';
  for (let v = b.adim; v <= b.max; v += b.adim) izgara += `M${sx(v)} 4V${eksenY}`;
  let ticks = '';
  for (let v = 0; v <= b.max; v += b.adim) ticks += `<text x="${Math.min(sx(v), W - 12)}" y="${eksenY + 20}" text-anchor="middle" font-size="11" style="fill:var(--muted)">${sayi(v)}</text>`;
  const satirlar = b.satirlar.map((r, i) => {
    const y = ust + i * ara_;
    const etiket = enUzun > 1 ? `x="6"` : `x="14" text-anchor="middle"`;
    return `<text ${etiket} y="${y + 13}" font-size="13" font-weight="600" style="fill:var(--ink)">${esc(r.ad)}</text>
      <rect x="${sx(r.bas)}" y="${y}" width="${sx(r.son) - sx(r.bas)}" height="16" rx="4" style="fill:var(--signal)"><title>${esc(r.ad)}: ${sayi(r.bas)}–${sayi(r.son)} × In</title></rect>`;
  }).join('');
  const aciklama = b.satirlar.map((r) => `${r.ad}: ${sayi(r.bas)}–${sayi(r.son)}`).join(', ');
  return `
    <div class="kart">
      <span style="font-size:13px;font-weight:600">${esc(b.baslik)}</span>
      <svg class="sema" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(b.baslik)}. ${esc(aciklama)}">
        <path d="${izgara}" style="stroke:var(--line)" stroke-width="1" stroke-dasharray="3 3" fill="none"></path>
        <path d="M${x0} 4V${eksenY}" style="stroke:var(--muted)" stroke-width="1" fill="none"></path>
        ${satirlar}${ticks}
      </svg>
      <span class="aralik-alt">${esc(b.eksen)}</span>
      <div class="aralik-liste">${b.satirlar.map((r) => `<div><span class="aralik-kod">${esc(r.ad)} ${sayi(r.bas)}–${sayi(r.son)}×</span><span class="mini-metin">${esc(r.metin)}</span></div>`).join('')}</div>
      ${b.not ? `<p class="kucuk">${esc(b.not)}</p>` : ''}
    </div>`;
}

function formulBlok(b) {
  return `
    <div class="kart" style="gap:14px">
      <div class="formul">${esc(b.formul)}</div>
      <div class="tanimlar">${(b.tanimlar || []).map((t) => `<div class="tanim"><b>${esc(t[0])}</b><span>${esc(t[1])}</span></div>`).join('')}</div>
      ${b.ornek ? `<div class="ornek"><span class="ust" style="font-size:11px">${esc(b.ornek.baslik)}</span>${b.ornek.satirlar.map((t) => `<div class="ornek-satir"><b>${esc(t[0])}</b> ${esc(t[1])}</div>`).join('')}</div>` : ''}
      ${b.kural ? `<p class="kural">${esc(b.kural)}</p>` : ''}
    </div>`;
}
