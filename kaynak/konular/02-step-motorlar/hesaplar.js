/* Step motorlar: hesaplayıcılar. */
Object.assign(HESAPLAR, {
  step: {
    gruplar: [
      { k: 'ms', ad: 'Mikroadım', v: 8, s: [[1, 'Tam'], [2, '1/2'], [4, '1/4'], [8, '1/8'], [16, '1/16'], [32, '1/32']] },
      { k: 'hatve', ad: 'Vida hatvesi', v: 5, s: [[4, '4 mm'], [5, '5 mm'], [8, '8 mm'], [10, '10 mm']] },
      { k: 'hiz', ad: 'İlerleme hızı', v: 20, s: [[10, '10 mm/s'], [20, '20 mm/s'], [50, '50 mm/s']] }
    ],
    hesapla(d) {
      const ppr = 200 * d.ms, ppmm = ppr / d.hatve, hz = ppmm * d.hiz, rpm = (d.hiz / d.hatve) * 60;
      return {
        sonuclar: [['Darbe / tur', sayi(ppr)], ['Darbe / mm', sayi(ppmm)], ['Darbe frekansı', sayi(hz) + ' Hz'], ['Motor hızı', sayi(rpm) + ' d/dk']],
        adimlar: [`200 × ${d.ms} = ${sayi(ppr)} darbe/tur`, `${sayi(ppr)} ÷ ${d.hatve} = ${sayi(ppmm)} darbe/mm`, `${sayi(ppmm)} × ${d.hiz} = ${sayi(hz)} Hz`, `${d.hiz} ÷ ${d.hatve} × 60 = ${sayi(rpm, 0)} d/dk`]
      };
    },
    not: '1,8° motor: 360 ÷ 1,8 = 200 tam adım/tur. PLC darbe çıkışının frekans sınırını kataloğundan kontrol et; motor torku yüksek devirde düşer.'
  },
});
