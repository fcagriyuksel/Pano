/* Asenkron motorlar: hesaplayıcılar. */
Object.assign(HESAPLAR, {
  motorAkim: {
    gruplar: [
      { k: 'p', ad: 'Motor gücü (400 V)', v: 2.2, s: [[0.75, '0,75 kW'], [2.2, '2,2 kW'], [5.5, '5,5 kW'], [11, '11 kW']] },
      { k: 'cos', ad: 'cos φ', v: 0.82, s: [[0.78, '0,78'], [0.82, '0,82'], [0.86, '0,86']] },
      { k: 'eta', ad: 'Verim', v: 0.86, s: [[0.8, '%80'], [0.86, '%86'], [0.9, '%90']] }
    ],
    hesapla(d) {
      const I = (d.p * 1000) / (Math.sqrt(3) * 400 * d.cos * d.eta);
      return {
        sonuclar: [['Anma akımı', sayi(I, 1) + ' A'], ['Y/Δ termik ayarı', sayi(I * 0.58, 1) + ' A'], ['Direkt kalkış', '≈ ' + sayi(I * 5, 0) + '–' + sayi(I * 8, 0) + ' A'], ['Çekilen güç', sayi(d.p / d.eta, 2) + ' kW']],
        adimlar: [`I = P ÷ (√3 × U × cos φ × η)`, `I = ${sayi(d.p * 1000)} ÷ (1,73 × 400 × ${sayi(d.cos)} × ${sayi(d.eta)}) ≈ ${sayi(I, 1)} A`, `Termik (sargı kolunda): ${sayi(I, 1)} × 0,58 ≈ ${sayi(I * 0.58, 1)} A`]
      };
    },
    not: 'Hesap yaklaşıktır; etiketteki akım her zaman önceliklidir. Kalkış akımı motora göre değişir.'
  },

  tork: {
    gruplar: [
      { k: 'p', ad: 'Motor gücü', v: 5.5, s: [[0.75, '0,75 kW'], [2.2, '2,2 kW'], [5.5, '5,5 kW'], [11, '11 kW'], [22, '22 kW']] },
      { k: 'n', ad: 'Motor devri', v: 1450, s: [[960, '960 d/dk'], [1450, '1.450'], [2900, '2.900']] },
      { k: 'i', ad: 'Redüktör oranı', v: 1, s: [[1, 'Yok'], [5, '5:1'], [10, '10:1'], [20, '20:1']] }
    ],
    hesapla(d) {
      const T = (9550 * d.p) / d.n;
      const eta = d.i === 1 ? 1 : d.i > 10 ? 0.92 : 0.95;
      const Tc = T * d.i * eta, nc = d.n / d.i;
      return {
        sonuclar: [['Motor torku', sayi(T, 1) + ' N·m'], ['Çıkış torku', sayi(Tc, 1) + ' N·m'], ['Çıkış devri', sayi(nc, 0) + ' d/dk'], ['Güç', sayi(d.p * 1.341, 1) + ' HP']],
        adimlar: [`T = 9550 × ${sayi(d.p)} ÷ ${sayi(d.n)} ≈ ${sayi(T, 1)} N·m`, d.i === 1 ? 'Redüktör yok: çıkış motor miliyle aynı.' : `Çıkış = ${sayi(T, 1)} × ${d.i} × ${sayi(eta)} ≈ ${sayi(Tc, 1)} N·m (dişli redüktör verimi)`, `${sayi(d.p)} kW × 1,341 = ${sayi(d.p * 1.341, 1)} HP`]
      };
    },
    not: 'Anma değerleridir. Kalkış torku, katalogdaki kalkış/anma tork oranıyla bulunur. Sonsuz vidalı redüktörde verim çok daha düşüktür.'
  },
});
