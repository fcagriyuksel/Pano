/* Pnömatik: hesaplayıcılar. */
Object.assign(HESAPLAR, {
  silindir: {
    gruplar: [
      { k: 'D', ad: 'Piston çapı', v: 50, s: [[20, 'Ø20'], [32, 'Ø32'], [50, 'Ø50'], [63, 'Ø63'], [80, 'Ø80'], [100, 'Ø100']] },
      { k: 'p', ad: 'Çalışma basıncı', v: 6, s: [[4, '4 bar'], [6, '6 bar'], [8, '8 bar']] }
    ],
    hesapla(d) {
      const mil = { 20: 8, 32: 12, 50: 20, 63: 20, 80: 25, 100: 25 }[d.D];
      const A = (Math.PI * d.D * d.D) / 4, Ac = (Math.PI * (d.D * d.D - mil * mil)) / 4;
      const F = d.p * 0.1 * A, Fc = d.p * 0.1 * Ac, Fp = 0.9 * F;
      return {
        sonuclar: [['İtme (teorik)', sayi(F, 0) + ' N'], ['Çekme (teorik)', sayi(Fc, 0) + ' N'], ['İtme (sürtünmeyle)', '≈ ' + sayi(Fp, 0) + ' N'], ['Kütle karşılığı', '≈ ' + sayi(Fp / 9.81, 0) + ' kg']],
        adimlar: [`A = π × ${d.D}² ÷ 4 ≈ ${sayi(A, 0)} mm²`, `F = ${d.p} bar × 0,1 × ${sayi(A, 0)} ≈ ${sayi(F, 0)} N`, `Çekmede mil (Ø${mil}) alanı düşer: ≈ ${sayi(Fc, 0)} N`, 'Hareketli yükte hesaplanan kuvvetin %50–70’ini kullan.']
      };
    },
    not: '1 bar = 0,1 N/mm². Mil çapları tipik ISO 15552 / ISO 6432 değerleridir. Kütle karşılığı dikey ve durağan yük içindir.'
  },

  hava: {
    gruplar: [
      { k: 'D', ad: 'Piston çapı', v: 50, s: [[32, 'Ø32'], [50, 'Ø50'], [63, 'Ø63'], [100, 'Ø100']] },
      { k: 'h', ad: 'Strok', v: 100, s: [[50, '50 mm'], [100, '100 mm'], [200, '200 mm'], [500, '500 mm']] },
      { k: 'n', ad: 'Çevrim / dakika', v: 30, s: [[10, '10'], [30, '30'], [60, '60']] },
      { k: 'p', ad: 'Çalışma basıncı', v: 6, s: [[4, '4 bar'], [6, '6 bar'], [8, '8 bar']] }
    ],
    hesapla(d) {
      const V = (2 * Math.PI * d.D * d.D * d.h) / 4 / 1e6;
      const Vs = V * (d.p + 1), Q = Vs * d.n;
      return {
        sonuclar: [['Bir çevrim', sayi(Vs, 2) + ' Nl'], ['Dakikada', sayi(Q, 0) + ' Nl/dk'], ['Saatte', sayi((Q * 60) / 1000, 1) + ' Nm³/h'], ['Kaçak payıyla', sayi(Q * 1.3, 0) + ' Nl/dk']],
        adimlar: [`Hacim (ileri + geri) = 2 × π × ${d.D}² ÷ 4 × ${d.h} ≈ ${sayi(V, 3)} l`, `Serbest hava = ${sayi(V, 3)} × (${d.p} + 1) ≈ ${sayi(Vs, 2)} Nl`, `${sayi(Vs, 2)} × ${d.n} ≈ ${sayi(Q, 0)} Nl/dk; %30 kaçak ve hortum payı ile ${sayi(Q * 1.3, 0)} Nl/dk`]
      };
    },
    not: 'Çift etkili silindir, mil hacmi ihmal edildi. Kompresörü bütün tüketicilerin toplamına göre seç.'
  },
});
