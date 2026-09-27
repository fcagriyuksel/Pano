/* Servo motorlar: hesaplayıcılar. */
Object.assign(HESAPLAR, {
  enkoder: {
    gruplar: [
      { k: 'c', ad: 'Enkoder', v: 131072, s: [[10000, '2500 ppr'], [131072, '17 bit'], [8388608, '23 bit']] },
      { k: 'hatve', ad: 'Vida hatvesi', v: 10, s: [[5, '5 mm'], [10, '10 mm'], [20, '20 mm']] }
    ],
    hesapla(d) {
      const um = (d.hatve * 1000) / d.c;
      const yol = um >= 1 ? sayi(um, 2) + ' µm' : sayi(um * 1000, 1) + ' nm';
      const aci = (360 * 3600) / d.c;
      const ad = d.c === 10000 ? '2500 ppr × 4' : d.c === 131072 ? '2¹⁷' : '2²³';
      return {
        sonuclar: [['Sayım / tur', sayi(d.c)], ['Sayım başına yol', yol], ['Sayım başına açı', sayi(aci, 2) + '″'], ['1 mm için sayım', sayi(d.c / d.hatve, 0)]],
        adimlar: [`${ad} = ${sayi(d.c)} sayım/tur`, `${d.hatve} mm ÷ ${sayi(d.c)} = ${yol}`, `360 × 3600″ ÷ ${sayi(d.c)} = ${sayi(aci, 2)}″`]
      };
    },
    not: 'Mekanik doğruluk (vida hatası, boşluk) çoğu zaman enkoder çözünürlüğünden büyüktür; çözünürlük tek başına hassasiyet demek değildir.'
  },

  reduktor: {
    gruplar: [
      { k: 'p', ad: 'Servo motor (3000 d/dk)', v: 750, s: [[400, '400 W'], [750, '750 W'], [1000, '1 kW']] },
      { k: 'i', ad: 'Redüktör oranı', v: 10, s: [[3, '3:1'], [5, '5:1'], [10, '10:1'], [20, '20:1']] }
    ],
    hesapla(d) {
      const T = d.p / ((2 * Math.PI * 3000) / 60);
      const eta = d.i > 10 ? 0.92 : 0.95;
      const Tc = T * d.i * eta;
      const n = 3000 / d.i;
      return {
        sonuclar: [['Motor anma torku', sayi(T, 2) + ' N·m'], ['Çıkış torku', '≈ ' + sayi(Tc, 1) + ' N·m'], ['Çıkış hızı', sayi(n, 0) + ' d/dk'], ['Yansıyan atalet', '÷ ' + sayi(d.i * d.i)]],
        adimlar: [`T = ${sayi(d.p)} W ÷ (2π × 3000 ÷ 60) ≈ ${sayi(T, 2)} N·m`, `${sayi(T, 2)} × ${d.i} × ${sayi(eta)} (${d.i > 10 ? 'iki' : 'tek'} kademe) ≈ ${sayi(Tc, 1)} N·m`, `3000 ÷ ${d.i} = ${sayi(n, 0)} d/dk`, `Yük ataleti motora ${d.i}² = ${sayi(d.i * d.i)} kat küçük yansır`]
      };
    },
    not: 'Verim tek kademede yaklaşık %95, iki kademede %92 alındı. Çıkış torku redüktör kataloğundaki sınırı aşmamalı.'
  },
});
