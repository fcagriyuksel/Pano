/* Sigortalar: hesaplayıcılar. */
Object.assign(HESAPLAR, {
  mccb: {
    gruplar: [
      { k: 'in', ad: 'Şalter anma akımı (In)', v: 160, s: [[100, '100 A'], [160, '160 A'], [250, '250 A'], [400, '400 A']] },
      { k: 'ir', ad: 'Ir ayarı (× In)', v: 0.8, s: [[0.5, '0,5'], [0.7, '0,7'], [0.8, '0,8'], [0.9, '0,9'], [1, '1']] },
      { k: 'sd', ad: 'Isd ayarı (× Ir)', v: 6, s: [[2, '2'], [4, '4'], [6, '6'], [10, '10']] }
    ],
    hesapla(d) {
      const Ir = d.in * d.ir, Isd = Ir * d.sd;
      return {
        sonuclar: [['Ir (aşırı yük)', sayi(Ir, 0) + ' A'], ['Isd (kısa gecikme)', sayi(Isd, 0) + ' A'], ['Kablo Iz en az', sayi(Ir, 0) + ' A'], ['Hat sonu Ik en az', sayi(Isd * 1.2, 0) + ' A']],
        adimlar: [`Ir = ${sayi(d.ir)} × ${d.in} = ${sayi(Ir, 0)} A`, `Isd = ${d.sd} × ${sayi(Ir, 0)} = ${sayi(Isd, 0)} A`, `Hat sonundaki kısa devre akımı ≈ 1,2 × Isd = ${sayi(Isd * 1.2, 0)} A’i aşmalı; yoksa şalter kısa devrede yalnızca uzun gecikmeyle açar.`]
      };
    },
    not: 'Ayar aralıkları üreticiye göre değişir. 1,2 katsayısı ayar toleransı içindir. Ii çoğu modelde ayrıca ayarlanır ya da sabittir.'
  },
});
