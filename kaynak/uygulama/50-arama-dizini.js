/* ---------- Arama dizini ---------- */
const KATLA = { 'ı': 'i', 'ş': 's', 'ğ': 'g', 'ü': 'u', 'ö': 'o', 'ç': 'c', 'â': 'a', 'î': 'i', 'û': 'u', '–': '-', '—': '-', '−': '-', '’': "'" };
function katla(s) {
  s = String(s);
  let o = '';
  for (let i = 0; i < s.length; i++) {
    let l = s[i].toLocaleLowerCase('tr-TR');
    if (l.length !== 1) l = l[0];
    o += KATLA[l] || l;
  }
  return o;
}
function blokMetni(b) {
  const p = [];
  const ekle = (...x) => x.forEach((y) => { if (y) p.push(Array.isArray(y) ? y.join(' ') : y); });
  switch (b.tip) {
    case 'sema': (b.lejant || []).forEach((l) => ekle(l[1])); (b.isaretler || []).forEach((i) => ekle(i)); ekle(b.not); break;
    case 'kartlar': b.kartlar.forEach((k) => ekle(k.baslik, k.etiket, k.metin)); break;
    case 'aralik': ekle(b.baslik, b.eksen); b.satirlar.forEach((r) => ekle(r.ad + ' ' + sayi(r.bas) + '–' + sayi(r.son), r.metin)); ekle(b.not); break;
    case 'formul': ekle(b.formul); b.tanimlar.forEach((t) => ekle(t)); if (b.ornek) { ekle(b.ornek.baslik); b.ornek.satirlar.forEach((t) => ekle(t)); } ekle(b.kural); break;
    case 'tablo': b.satirlar.forEach((r) => ekle(r[0], r[2])); break;
    case 'hesap': if (HESAPLAR[b.tur]) { ekle(HESAPLAR[b.tur].gruplar.map((g) => g.ad).join(', ')); ekle(HESAPLAR[b.tur].not); } break;
    case 'ariza': ekle('Belirti: ' + b.belirti); b.satirlar.forEach((r) => ekle(r)); break;
    case 'hatalar': b.hatalar.forEach((r) => ekle(r)); break;
    case 'parcalar': ekle(b.parcalar.join(', ')); break;
    case 'not': ekle(b.metin); break;
    case 'renkler': b.satirlar.forEach((r) => ekle(r[0] + ' ' + r[2])); break;
    case 'sim': ekle('Simülasyon'); if (SIMLER[b.tur]) ekle(SIMLER[b.tur].not); break;
    case 'model': ekle('3B model'); if (MODELLER[b.tur]) { ekle(MODELLER[b.tur].aciklama); MODELLER[b.tur].parcalar.forEach((x) => ekle(x)); } break;
    case 'adimlar': b.satirlar.forEach((m) => ekle(m)); break;
  }
  return p.join(' · ');
}
const DIZIN = [];
VERI.konular.forEach((k) => k.altlar.forEach((a) => {
  const s = sayfaOf(a);
  if (!s) {
    const m = a.ad + ' · ' + a.alt;
    DIZIN.push({ alt: a, bolum: null, bolumAd: null, metin: m, katli: katla(m) });
    return;
  }
  const bm = [s.baslik, a.alt, s.giris].concat(s.etiketler || []).join(' · ');
  DIZIN.push({ alt: a, bolum: null, bolumAd: null, metin: bm, katli: katla(bm) });
  s.bolumler.forEach((b) => {
    const m = [b.baslik].concat(b.bloklar.map(blokMetni)).join(' · ');
    DIZIN.push({ alt: a, bolum: b.id, bolumAd: b.kisa, metin: m, katli: katla(m) });
  });
}));
/* Arama ekranındaki parça çipleri: konu ve sayfa sırasıyla, tekrarsız. */
const TUM_PARCALAR = Array.from(new Set(hazirlar().map(sayfaOf).flatMap((s) => s.bolumler.flatMap((b) => b.bloklar.filter((x) => x.tip === 'parcalar').flatMap((x) => x.parcalar)))));
const aramaTerimi = (p) => p.replace(/\s*\(.*\)\s*$/, '');

function ara(q) {
  const terimler = katla(q.trim()).split(/\s+/).filter((t) => t.length > 0);
  if (!terimler.length || katla(q.trim()).length < 2) return { terimler, sonuclar: [] };
  const gorulen = new Map();
  DIZIN.forEach((d) => {
    if (!terimler.every((t) => d.katli.includes(t))) return;
    const var_ = gorulen.get(d.alt.id);
    if (!var_) gorulen.set(d.alt.id, d);
  });
  const sonuclar = Array.from(gorulen.values()).sort((x, y) => (hazirMi(y.alt) ? 1 : 0) - (hazirMi(x.alt) ? 1 : 0));
  return { terimler, sonuclar };
}
function vurgula(metin, terimler) {
  const k = katla(metin);
  const araliklar = [];
  terimler.forEach((t) => {
    if (!t) return;
    let i = k.indexOf(t);
    while (i !== -1) { araliklar.push([i, i + t.length]); i = k.indexOf(t, i + t.length); }
  });
  if (!araliklar.length) return esc(metin);
  araliklar.sort((a, b) => a[0] - b[0]);
  const birlesik = [araliklar[0].slice()];
  araliklar.slice(1).forEach((r) => { const s = birlesik[birlesik.length - 1]; if (r[0] <= s[1]) s[1] = Math.max(s[1], r[1]); else birlesik.push(r.slice()); });
  let o = '', son = 0;
  birlesik.forEach(([a, b]) => { o += esc(metin.slice(son, a)) + '<mark>' + esc(metin.slice(a, b)) + '</mark>'; son = b; });
  return o + esc(metin.slice(son));
}
function kesit(metin, terim) {
  const i = katla(metin).indexOf(terim);
  if (i < 0 || metin.length <= 140) return metin;
  let bas = Math.max(0, i - 45);
  if (bas > 0) { const b = metin.indexOf(' ', bas); if (b !== -1 && b < i) bas = b + 1; }
  let bit = Math.min(metin.length, i + 110);
  if (bit < metin.length) { const b = metin.lastIndexOf(' ', bit); if (b > i) bit = b; }
  return (bas > 0 ? '…' : '') + metin.slice(bas, bit) + (bit < metin.length ? '…' : '');
}
