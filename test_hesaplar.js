// Bütün hesaplayıcıları, seçeneklerin bütün kombinasyonlarıyla çalıştırır.
// Kullanım (depo kökünden): node test_hesaplar.js
// Başarısızlıkta çıkış kodu 1 olur.
const fs = require('fs');
const path = require('path');

const s = fs.readFileSync(path.join(__dirname, 'pano-kaynak.html'), 'utf8');
const bas = s.indexOf('  const HESAPLAR = {');
const son = s.indexOf('\n  };\n', bas);
if (bas < 0 || son < 0) { console.error('HESAPLAR bloğu bulunamadı'); process.exit(1); }
const kod = s.slice(bas, son + 4);
// Uygulamadaki sayi() ile aynı
const sayi = (n, b) => { try { return Number(n).toLocaleString('tr-TR', { maximumFractionDigits: b == null ? 2 : b }); } catch (e) { return String(Math.round(n * 100) / 100); } };
const HESAPLAR = eval(kod.replace('const HESAPLAR =', '(') + ')');

let toplam = 0, hata = 0;
for (const [ad, h] of Object.entries(HESAPLAR)) {
  const gs = h.gruplar, idx = gs.map(() => 0);
  gs.forEach((g) => { if (!g.s.some((x) => x[0] === g.v)) { console.log('VARSAYILAN SEÇENEKLERDE YOK:', ad, g.k); hata++; } });
  for (;;) {
    const d = {};
    gs.forEach((g, k) => { d[g.k] = g.s[idx[k]][0]; });
    try {
      const r = h.hesapla(d);
      const t = JSON.stringify(r);
      if (/NaN|undefined|Infinity|null/.test(t) || !Array.isArray(r.sonuclar) || r.sonuclar.length !== 4 || !Array.isArray(r.adimlar) || r.adimlar.length < 2) {
        console.log('SORUN:', ad, JSON.stringify(d), t.slice(0, 200)); hata++;
      }
    } catch (e) { console.log('HATA:', ad, JSON.stringify(d), e.message); hata++; }
    toplam++;
    let k = gs.length - 1;
    while (k >= 0) { idx[k]++; if (idx[k] < gs[k].s.length) break; idx[k] = 0; k--; }
    if (k < 0) break;
  }
}
console.log(`hesaplayıcı: ${Object.keys(HESAPLAR).length} · kombinasyon: ${toplam} · hata: ${hata}`);
process.exit(hata ? 1 : 0);
