/* ---------- Hesaplayıcı görünümü ---------- */
function hesapDurum(tur) {
  const h = HESAPLAR[tur];
  const kayit = (durum.hesaplar[tur] = durum.hesaplar[tur] && typeof durum.hesaplar[tur] === 'object' ? durum.hesaplar[tur] : {});
  h.gruplar.forEach((g) => { if (!g.s.some(([v]) => v === kayit[g.k])) kayit[g.k] = g.v; });
  return kayit;
}
function hesapBlok(tur) {
  const h = HESAPLAR[tur];
  if (!h) return '';
  const d = hesapDurum(tur);
  const r = h.hesapla(d);
  const grup = (g) => `
    <fieldset class="hesap-grup"><legend>${esc(g.ad)}</legend>
      <div class="secenekler">${g.s.map(([v, l]) => `<button type="button" class="secenek" data-hesap-tur="${tur}" data-hesap="${g.k}" data-deger="${v}" aria-pressed="${d[g.k] === v}">${esc(l)}</button>`).join('')}</div>
    </fieldset>`;
  return `
    <div class="kart" style="gap:16px" data-hesap-kutu="${tur}">
      ${h.gruplar.map(grup).join('')}
      <div class="sonuc" aria-live="polite">${sonucHtml(r)}</div>
      <div class="adimlar">${adimHtml(r)}</div>
      ${h.not ? `<p class="kucuk">${esc(h.not)}</p>` : ''}
    </div>`;
}
const sonucHtml = (r) => r.sonuclar.map((s) => `<div><span class="sonuc-ad">${esc(s[0])}</span><span class="sonuc-deger">${esc(s[1])}</span></div>`).join('');
const adimHtml = (r) => r.adimlar.map((a) => `<span>${esc(a)}</span>`).join('');
function hesapYaz(tur) {
  const h = HESAPLAR[tur];
  if (!h) return;
  const r = h.hesapla(hesapDurum(tur));
  $$(`[data-hesap-kutu="${tur}"]`).forEach((k) => {
    const s = $('.sonuc', k), a = $('.adimlar', k);
    if (s) s.innerHTML = sonucHtml(r);
    if (a) a.innerHTML = adimHtml(r);
  });
}
