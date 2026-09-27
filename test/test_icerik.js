// İçerik ve hesaplayıcı testi (tarayıcı gerekmez).
// Kullanım (depo kökünden): node test/test_icerik.js
// 1) Bütün hesaplayıcıları, seçeneklerin bütün kombinasyonlarıyla çalıştırır.
// 2) Sayfalardaki şema, hesaplayıcı, simülasyon ve model adlarının kayıtlarda olduğunu,
//    kullanılmayan kayıt kalmadığını, kimliklerin tekil olduğunu denetler.
// Başarısızlıkta çıkış kodu 1 olur.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const kaynak = path.join(__dirname, '..', 'kaynak');
const oku = (p) => fs.readFileSync(path.join(kaynak, p), 'utf8');
const dosyalar = fs.readdirSync(path.join(kaynak, 'ortak')).filter((f) => f.endsWith('.js')).sort().map((f) => 'ortak/' + f);
for (const k of fs.readdirSync(path.join(kaynak, 'konular')).sort()) {
  for (const f of ['konu.js', 'semalar.js', 'hesaplar.js', 'simler.js', 'modeller.js']) {
    if (fs.existsSync(path.join(kaynak, 'konular', k, f))) dosyalar.push(`konular/${k}/${f}`);
  }
}
const kayit = vm.runInNewContext(dosyalar.map(oku).join('\n;\n') + '\n;({ VERI, SEMALAR, HESAPLAR, SIMLER, MODELLER: typeof MODELLER === "undefined" ? {} : MODELLER })', {}, { filename: 'kaynak' });
const { VERI, SEMALAR, HESAPLAR, SIMLER, MODELLER } = kayit;

let hata = 0;
const sorun = (...m) => { console.log('SORUN:', ...m); hata++; };

// ---- 1) Hesaplayıcılar
let toplam = 0;
for (const [ad, h] of Object.entries(HESAPLAR)) {
  const gs = h.gruplar, idx = gs.map(() => 0);
  gs.forEach((g) => { if (!g.s.some((x) => x[0] === g.v)) sorun('varsayılan seçeneklerde yok:', ad, g.k); });
  for (;;) {
    const d = {};
    gs.forEach((g, k) => { d[g.k] = g.s[idx[k]][0]; });
    try {
      const r = h.hesapla(d);
      const t = JSON.stringify(r);
      if (/NaN|undefined|Infinity|null/.test(t) || !Array.isArray(r.sonuclar) || r.sonuclar.length !== 4 || !Array.isArray(r.adimlar) || r.adimlar.length < 2) {
        sorun(ad, JSON.stringify(d), t.slice(0, 200));
      }
    } catch (e) { sorun('hata:', ad, JSON.stringify(d), e.message); }
    toplam++;
    let k = gs.length - 1;
    while (k >= 0) { idx[k]++; if (idx[k] < gs[k].s.length) break; idx[k] = 0; k--; }
    if (k < 0) break;
  }
}

// ---- 2) Referanslar ve kimlikler
const kullanilan = { sema: new Set(), hesap: new Set(), sim: new Set(), model: new Set() };
const kayitlar = { sema: SEMALAR, hesap: HESAPLAR, sim: SIMLER, model: MODELLER };
const idler = new Set();
let sayfaSayisi = 0;
for (const k of VERI.konular) {
  if (idler.has(k.id)) sorun('tekrarlanan kimlik:', k.id);
  idler.add(k.id);
  for (const a of k.altlar) {
    if (idler.has(a.id)) sorun('tekrarlanan kimlik:', a.id);
    idler.add(a.id);
    if (!a.sayfa) continue;
    const s = VERI.sayfalar[a.sayfa];
    if (!s) { sorun('sayfa yok:', a.sayfa); continue; }
    sayfaSayisi++;
    const bolumIdleri = new Set();
    for (const b of s.bolumler) {
      if (bolumIdleri.has(b.id)) sorun('tekrarlanan bölüm:', a.sayfa, b.id);
      bolumIdleri.add(b.id);
      for (const x of b.bloklar) {
        const ad = x.tip === 'sema' ? x.svg : x.tur;
        if (!(x.tip in kayitlar)) continue;
        kullanilan[x.tip].add(ad);
        if (!kayitlar[x.tip][ad]) sorun(`${a.sayfa}: ${x.tip} kaydı yok:`, ad);
      }
    }
  }
}
const sahipsiz = Object.keys(VERI.sayfalar).filter((s) => !VERI.konular.some((k) => k.altlar.some((a) => a.sayfa === s)));
if (sahipsiz.length) sorun('hiçbir alt başlığa bağlı olmayan sayfa:', sahipsiz.join(', '));
for (const [tip, kume] of Object.entries(kullanilan)) {
  const bos = Object.keys(kayitlar[tip]).filter((ad) => !kume.has(ad));
  if (bos.length) sorun(`kullanılmayan ${tip} kaydı:`, bos.join(', '));
}
for (const u of VERI.ucretsiz) if (!idler.has(u)) sorun('ücretsiz listesinde olmayan sayfa:', u);

console.log(`konu: ${VERI.konular.length} · sayfa: ${sayfaSayisi} · şema: ${Object.keys(SEMALAR).length} · hesaplayıcı: ${Object.keys(HESAPLAR).length} (${toplam} kombinasyon) · simülasyon: ${Object.keys(SIMLER).length} · model: ${Object.keys(MODELLER).length} · sorun: ${hata}`);
process.exit(hata ? 1 : 0);
