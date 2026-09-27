/* Simülasyon bloğunun çizimi ve saati. Simülasyonların kendisi: konular/<konu>/simler.js */
const simDurum = (tur) => {
  if (!durum.sim[tur]) { const S = SIMLER[tur]; durum.sim[tur] = S.yeni(); if (S.hesapla) S.hesapla(durum.sim[tur]); }
  return durum.sim[tur];
};
const simDugmeler = (tur, s) => SIMLER[tur].dugmeler(s).map(([o, e, b]) =>
  `<button type="button" class="dugme dugme-kucuk" data-sim-tur="${tur}" data-sim-olay="${o}"${b == null ? '' : ` aria-pressed="${!!b}"`}>${esc(e)}</button>`).join('');
function simBlok(tur) {
  const S = SIMLER[tur];
  if (!S) return '';
  const s = simDurum(tur), d = S.durum(s);
  return `
    <div class="kart" data-sim-kutu="${tur}" style="gap:14px">
      <div id="sim-${tur}-c">${S.ciz(s)}</div>
      <div class="sim-durum${d.uyari ? ' uyari' : ''}" id="sim-${tur}-d"${S.tik ? '' : ' aria-live="polite"'}>${esc(d.metin)}</div>
      <div class="dugme-satir" id="sim-${tur}-b">${simDugmeler(tur, s)}</div>
      <p class="kucuk">${esc(S.not)}</p>
    </div>`;
}
function simGuncelle(tur) {
  const S = SIMLER[tur], s = simDurum(tur);
  const c = document.getElementById(`sim-${tur}-c`);
  if (!c) return;
  c.innerHTML = S.ciz(s);
  const d = S.durum(s), de = document.getElementById(`sim-${tur}-d`);
  if (de.textContent !== d.metin) de.textContent = d.metin;
  de.classList.toggle('uyari', !!d.uyari);
  const be = document.getElementById(`sim-${tur}-b`), yeni = simDugmeler(tur, s);
  if (be.dataset.son !== yeni) {
    const odak = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.simOlay : null;
    be.innerHTML = yeni;
    be.dataset.son = yeni;
    if (odak) { const b = be.querySelector(`[data-sim-olay="${odak}"]`); if (b) b.focus({ preventScroll: true }); }
  }
}
let simSaat = null;
function simSaatiKur() {
  clearInterval(simSaat);
  simSaat = null;
  const turler = $$('[data-sim-kutu]').map((e) => e.dataset.simKutu).filter((t) => SIMLER[t] && SIMLER[t].tik);
  if (!turler.length) return;
  simSaat = setInterval(() => {
    if (document.hidden) return;
    turler.forEach((t) => { SIMLER[t].tik(simDurum(t), 0.1); simGuncelle(t); });
  }, 100);
}
