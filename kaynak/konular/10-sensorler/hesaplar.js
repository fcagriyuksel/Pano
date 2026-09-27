/* Sensörler: hesaplayıcılar. */
Object.assign(HESAPLAR, {
  pt100: {
    gruplar: [
      { k: 't', ad: 'Gerçek sıcaklık', v: 100, s: [[-20, '−20 °C'], [0, '0 °C'], [25, '25 °C'], [100, '100 °C'], [200, '200 °C']] },
      { k: 'b', ad: 'Bağlantı', v: 2, s: [[2, '2 telli'], [3, '3 telli'], [4, '4 telli']] },
      { k: 'l', ad: 'Kablo uzunluğu (0,75 mm²)', v: 50, s: [[10, '10 m'], [50, '50 m'], [100, '100 m']] }
    ],
    hesapla(d) {
      const A = 3.9083e-3, B = -5.775e-7, C = -4.183e-12;
      const R = 100 * (1 + A * d.t + B * d.t * d.t + (d.t < 0 ? C * (d.t - 100) * d.t ** 3 : 0));
      const rk = (0.0178 * d.l) / 0.75;
      const Rm = R + (d.b === 2 ? 2 * rk : 0);
      const Tm = (-A + Math.sqrt(A * A - 4 * B * (1 - Rm / 100))) / (2 * B);
      const hata = d.b === 2 ? Tm - d.t : 0;
      const isaretli = (x) => (x < 0 ? '−' : '') + sayi(Math.abs(x), 1);
      return {
        sonuclar: [['PT100 direnci', sayi(R, 2) + ' Ω'], ['Kablo (tek tel)', sayi(rk, 2) + ' Ω'], ['Okunan sıcaklık', isaretli(d.b === 2 ? Tm : d.t) + ' °C'], ['Hata', (hata > 0 ? '+' : '') + sayi(hata, 1) + ' °C']],
        adimlar: [`R(${isaretli(d.t)} °C) = ${sayi(R, 2)} Ω (IEC 60751)`, `Kablo: 0,0178 × ${d.l} ÷ 0,75 = ${sayi(rk, 2)} Ω/tel`, d.b === 2 ? `2 telli: ${sayi(R, 2)} + 2 × ${sayi(rk, 2)} = ${sayi(Rm, 2)} Ω → ${isaretli(Tm)} °C` : `${d.b} telli: kablo direnci ölçümden düşülür, hata ≈ 0`]
      };
    },
    not: 'Her 1 °C ≈ 0,385 Ω. 3 telli bağlantı, üç telin direnci eşitse hatayı sıfırlar.'
  },

  hsc: {
    gruplar: [
      { k: 'ppr', ad: 'Enkoder (darbe/tur)', v: 1000, s: [[100, '100'], [500, '500'], [1000, '1.000'], [2500, '2.500']] },
      { k: 'n', ad: 'En yüksek devir', v: 1500, s: [[300, '300 d/dk'], [1500, '1.500'], [3000, '3.000']] },
      { k: 'm', ad: 'Sayım modu', v: 4, s: [[1, '×1 (A)'], [4, '×4 (A/B kenar)']] }
    ],
    hesapla(d) {
      const f = (d.ppr * d.n) / 60;
      const durum = f > 100000 ? 'Aşıyor' : 'Uygun';
      return {
        sonuclar: [['A kanalı frekansı', sayi(f, 0) + ' Hz'], ['Tur başına sayım', sayi(d.ppr * d.m)], ['Standart giriş', f <= 50 ? 'Sayabilir' : 'Kaçırır'], ['HSC (100 kHz)', durum]],
        adimlar: [`f = ${sayi(d.ppr)} × ${sayi(d.n)} ÷ 60 = ${sayi(f, 0)} Hz`, `Sayım: ${sayi(d.ppr)} × ${d.m} = ${sayi(d.ppr * d.m)} / tur`, f > 100000 ? 'Hızlı sayıcı kartı ya da daha düşük çözünürlüklü enkoder gerekir.' : f > 50 ? 'Standart girişin filtresi ve tarama süresi darbeleri kaçırır; HSC girişini kullan.' : 'Standart giriş de sayabilir; yine de HSC önerilir.']
      };
    },
    not: 'HSC sınırı PLC’ye göre değişir (tipik 30–200 kHz); kataloğa bak.'
  },

  enduktif: {
    gruplar: [
      { k: 'm', ad: 'Gövde', v: 18, s: [[8, 'M8'], [12, 'M12'], [18, 'M18'], [30, 'M30']] },
      { k: 'g', ad: 'Montaj', v: 1, s: [[1, 'Gömülü'], [0, 'Gömülü değil']] },
      { k: 'k', ad: 'Hedef malzeme', v: 1, s: [[1, 'Çelik'], [0.7, 'Paslanmaz'], [0.45, 'Pirinç'], [0.4, 'Alüminyum'], [0.3, 'Bakır']] }
    ],
    hesapla(d) {
      const tablo = { 8: [1.5, 2.5], 12: [2, 4], 18: [5, 8], 30: [10, 15] };
      const sn = tablo[d.m][d.g ? 0 : 1], etkin = sn * d.k, sa = Math.floor(0.81 * etkin * 100) / 100;
      const b = etkin < 1 ? 2 : 1;
      return {
        sonuclar: [['Nominal Sn', sayi(sn, 1) + ' mm'], ['Malzeme faktörü', '× ' + sayi(d.k)], ['Etkin mesafe', sayi(etkin, b) + ' mm'], ['Güvenli algılama (Sa)', '≤ ' + sayi(sa, b) + ' mm']],
        adimlar: [`Sn (M${d.m}, ${d.g ? 'gömülü' : 'gömülü değil'}) = ${sayi(sn, 1)} mm`, `Etkin = ${sayi(sn, 1)} × ${sayi(d.k)} = ${sayi(etkin, b)} mm`, `Sa = 0,81 × ${sayi(etkin, b)} ≈ ${sayi(sa, b)} mm: hedef bu mesafenin içinden geçsin`]
      };
    },
    not: 'Tipik katalog değerleridir. Kendi sensörünün kataloğundaki Sn ve malzeme faktörlerini kullan.'
  },

  analog: {
    gruplar: [
      { k: 'o', ad: 'Ölçüm aralığı', v: 1, s: [[1, '0–10 bar'], [2, '0–16 bar'], [3, '0–100 °C'], [4, '−50…150 °C']] },
      { k: 'i', ad: 'Akım (mA)', v: 12, s: [[0, '0'], [4, '4'], [8, '8'], [12, '12'], [16, '16'], [20, '20']] }
    ],
    hesapla(d) {
      const [alt, ust, b] = { 1: [0, 10, 'bar'], 2: [0, 16, 'bar'], 3: [0, 100, '°C'], 4: [-50, 150, '°C'] }[d.o];
      if (d.i < 3.8) {
        return {
          sonuclar: [['Ölçülen değer', '—'], ['Aralığın yüzdesi', '—'], ['Ham değer (0–27.648)', 'aralık altı'], ['Durum', 'Arıza / kopuk kablo']],
          adimlar: ['Akım 4 mA’in altında: ölçüm aralığının dışında.', '0 mA genelde kopuk kablo ya da kapalı besleme demektir.', 'NAMUR NE 43: 3,6 mA altı ve 21 mA üstü arıza sinyalidir.']
        };
      }
      const oran = (d.i - 4) / 16, deger = alt + oran * (ust - alt), f = (v) => (v < 0 ? `(−${sayi(-v)})` : sayi(v));
      return {
        sonuclar: [['Ölçülen değer', (deger < 0 ? '−' + sayi(-deger, 1) : sayi(deger, 1)) + ' ' + b], ['Aralığın yüzdesi', '%' + sayi(oran * 100, 0)], ['Ham değer (0–27.648)', sayi(Math.round(oran * 27648), 0)], ['Durum', 'Normal']],
        adimlar: [`Değer = ${f(alt)} + (${d.i} − 4) × (${f(ust)} − ${f(alt)}) ÷ 16`, `Değer = ${deger < 0 ? '−' + sayi(-deger, 1) : sayi(deger, 1)} ${b}`, `Ham = (${d.i} − 4) ÷ 16 × 27.648 = ${sayi(Math.round(oran * 27648), 0)}`]
      };
    },
    not: 'Ham değer Siemens S7-1200/1500 ölçeğidir (4 mA = 0, 20 mA = 27.648). Başka PLC’lerde aralık farklı olabilir.'
  },
});
