/* Şema ve simülasyon çizim yardımcıları. Renkler her zaman style ile verilir (fill="var(..)" çalışmaz). */
const _no = (x, y, n) => `<circle cx="${x}" cy="${y}" r="10" style="fill:var(--ink)"></circle><text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">${n}</text>`;
const _cizgi = (d) => `<path d="${d}" style="stroke:var(--ink)" stroke-width="1" stroke-dasharray="2 2" fill="none"></path>`;
const _yazi = (x, y, t, o = {}) => `<text x="${x}" y="${y}" font-size="${o.b || 11}"${o.a ? ` text-anchor="${o.a}"` : ''}${o.w ? ` font-weight="${o.w}"` : ''} style="fill:var(${o.r || '--ink'})">${t}</text>`;
const _kutu = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx == null ? 6 : o.rx}" style="fill:var(${o.f || '--svg-body'});stroke:var(--ink)" stroke-width="${o.sw || 1.5}"></rect>`;
const _tel = (d, renk, o = {}) => `<path d="${d}" style="stroke:var(${renk})" stroke-width="${o.w || 3}"${o.k ? ` stroke-dasharray="${o.k}"` : ''} stroke-linejoin="round" fill="none"></path>`;
const _pe = (d) => _tel(d, '--wire-pe') + _tel(d, '--wire-pe2', { k: '6 6' });
const _okSag = (x, y) => `<path d="M${x - 7} ${y - 4}L${x} ${y}L${x - 7} ${y + 4}Z" style="fill:var(--ink)"></path>`;
const _okYukari = (x, y) => `<path d="M${x - 4} ${y + 7}L${x} ${y}L${x + 4} ${y + 7}Z" style="fill:var(--ink)"></path>`;
const _kontak = (x, y, o = {}) => {
  const nc = o.tip === 'NC';
  const kapali = o.kapali == null ? nc : o.kapali;
  const u = o.u || '--ink', a = o.a || '--ink', w = o.w || 2, g = o.gri ? '--line' : null;
  const cu = g || u, ca = g || a;
  let s = `<path d="M${x} ${y}V${y + 7}" style="stroke:var(${cu})" stroke-width="${w}" fill="none"></path>`;
  s += `<path d="M${x} ${y + 17}V${y + 24}" style="stroke:var(${ca})" stroke-width="${w}" fill="none"></path>`;
  if (nc) s += `<path d="M${x} ${y + 7}H${x + 7}" style="stroke:var(${cu})" stroke-width="${w}" fill="none"></path>`;
  const bicak = kapali ? (nc ? `M${x} ${y + 17}L${x + 7} ${y + 6}` : `M${x} ${y + 17}L${x} ${y + 6}`) : (nc ? `M${x} ${y + 17}L${x - 7} ${y + 8}` : `M${x} ${y + 17}L${x - 9} ${y + 8}`);
  s += `<path d="${bicak}" style="stroke:var(${kapali ? cu : ca})" stroke-width="${w}" stroke-linecap="round" fill="none"></path>`;
  if (o.b) s += `<path d="M${x - 3} ${y + 12}H${x - 14}" style="stroke:var(--muted)" stroke-width="1.2" stroke-dasharray="2 2" fill="none"></path><path d="M${x - 14} ${y + 7}V${y + 17}" style="stroke:var(--ink)" stroke-width="1.8" fill="none"></path>`;
  return s;
};
const _bobin = (x, y, acik, o = {}) => `<rect x="${x - 12}" y="${y}" width="24" height="16" rx="2" style="fill:var(${acik ? '--accent' : '--card'});stroke:var(--ink)" stroke-width="1.5"></rect>${o.zaman ? `<rect x="${x - 12}" y="${y}" width="8" height="16" style="fill:var(--ink)"></rect>` : ''}`;
const _lamba = (x, cy, acik) => `<circle cx="${x}" cy="${cy}" r="9" style="fill:var(${acik ? '--accent' : '--card'});stroke:var(--ink)" stroke-width="1.5"></circle><path d="M${x - 6} ${cy - 6}L${x + 6} ${cy + 6}M${x + 6} ${cy - 6}L${x - 6} ${cy + 6}" style="stroke:var(--ink)" stroke-width="1.2" fill="none"></path>`;
const _sig = (x, y, renk) => `<rect x="${x - 5}" y="${y}" width="10" height="20" rx="1" style="fill:var(--card);stroke:var(${renk || '--ink'})" stroke-width="1.5"></rect><path d="M${x} ${y}V${y + 20}" style="stroke:var(${renk || '--ink'})" stroke-width="1" fill="none"></path>`;
const _puls = (y, a, b, renk, x0 = 64, x1 = 306) => _tel(`M${x0} ${y + 9}H${a}V${y - 9}H${b}V${y + 9}H${x1}`, renk, { w: 2.5 });

/* Simülasyonlarda gerilim olan yolun rengi */
const CANLI = '--dc-plus';
const R = (v) => (v ? CANLI : '--ink');
