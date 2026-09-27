/* Sürücüler: hesaplayıcılar. */
Object.assign(HESAPLAR, {
  disli: {
    gruplar: [
      { k: 'dt', ad: 'Tur başına darbe', v: 10000, s: [[1000, '1.000'], [10000, '10.000'], [100000, '100.000']] },
      { k: 'hatve', ad: 'Vida hatvesi', v: 10, s: [[5, '5 mm'], [10, '10 mm'], [20, '20 mm']] },
      { k: 'hiz', ad: 'İlerleme hızı', v: 100, s: [[50, '50 mm/s'], [100, '100 mm/s'], [500, '500 mm/s']] }
    ],
    hesapla(d) {
      const um = (d.hatve * 1000) / d.dt;
      const f = (d.dt / d.hatve) * d.hiz;
      const rpm = (d.hiz / d.hatve) * 60;
      return {
        sonuclar: [['Darbe başına yol', sayi(um, 2) + ' µm'], ['1 mm için darbe', sayi(d.dt / d.hatve, 0)], ['Darbe frekansı', sayi(f, 0) + ' Hz'], ['Motor hızı', sayi(rpm, 0) + ' d/dk']],
        adimlar: [`${d.hatve} mm ÷ ${sayi(d.dt)} = ${sayi(um, 2)} µm/darbe`, `${sayi(d.dt / d.hatve, 0)} × ${d.hiz} = ${sayi(f, 0)} Hz`, `${d.hiz} ÷ ${d.hatve} × 60 = ${sayi(rpm, 0)} d/dk`, f > 200000 ? 'Uyarı: PLC ya da sürücünün darbe sınırını aşabilir' : rpm > 3000 ? 'Uyarı: motorun anma devrini aşıyor' : 'Frekans ve devir makul']
      };
    },
    not: 'Elektronik dişli, PLC’nin gönderdiği darbeleri enkoder sayımına ölçekler. Darbe başına yolu büyütmek aynı hız için gereken frekansı düşürür.'
  },

  vfd: {
    gruplar: [
      { k: 'f', ad: 'Çıkış frekansı', v: 50, s: [[10, '10 Hz'], [25, '25 Hz'], [50, '50 Hz'], [75, '75 Hz']] },
      { k: 'p', ad: 'Motor kutup sayısı', v: 4, s: [[2, '2 kutup'], [4, '4 kutup'], [6, '6 kutup']] }
    ],
    hesapla(d) {
      const ns = (120 * d.f) / d.p;
      const kayma = (0.04 * 6000) / d.p;
      const n = Math.round((ns - kayma) / 5) * 5;
      const V = d.f <= 50 ? (400 * d.f) / 50 : 400;
      return {
        sonuclar: [['Senkron hız', sayi(ns, 0) + ' d/dk'], ['Yaklaşık mil hızı', '≈ ' + sayi(n, 0) + ' d/dk'], ['Çıkış gerilimi', sayi(V, 0) + ' V'], ['Bölge', d.f <= 50 ? 'Sabit tork' : 'Sabit güç']],
        adimlar: [`n = 120 × ${d.f} ÷ ${d.p} = ${sayi(ns, 0)} d/dk`, `Anma kayması ≈ ${sayi(kayma, 0)} d/dk (sabit kabul) → ≈ ${sayi(n, 0)} d/dk`, d.f <= 50 ? `V/f: 400 × ${d.f} ÷ 50 = ${sayi(V, 0)} V` : '50 Hz üstünde gerilim 400 V’ta kalır; tork düşer']
      };
    },
    not: '400 V / 50 Hz asenkron motor için. Kayma motora ve yüke göre değişir; etiketteki devir 50 Hz tam yükteki değerdir.'
  },
});
