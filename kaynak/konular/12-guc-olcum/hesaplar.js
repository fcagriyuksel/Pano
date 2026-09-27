/* Güç kaynağı ve ölçüm: hesaplayıcılar. */
Object.assign(HESAPLAR, {
  psu: {
    gruplar: [
      { k: 'plc', ad: 'PLC ve I/O kartları', v: 1, s: [[0.5, '0,5 A'], [1, '1 A'], [2, '2 A']] },
      { k: 'sn', ad: 'Sensör sayısı (≈ 25 mA)', v: 10, s: [[5, '5'], [10, '10'], [20, '20'], [40, '40']] },
      { k: 'vl', ad: 'Valf / röle sayısı (≈ 100 mA)', v: 5, s: [[2, '2'], [5, '5'], [10, '10'], [20, '20']] }
    ],
    hesapla(d) {
      const toplam = d.plc + d.sn * 0.025 + d.vl * 0.1;
      const payli = toplam * 1.25;
      const secim = [2.5, 5, 10, 20, 40].find((a) => a >= payli) || 40;
      return {
        sonuclar: [['Toplam akım', sayi(toplam, 2) + ' A'], ['%25 pay ile', sayi(payli, 2) + ' A'], ['Önerilen kaynak', payli > 40 ? '> 40 A: böl' : sayi(secim) + ' A'], ['Kaynak gücü', sayi(secim * 24, 0) + ' W']],
        adimlar: [`${sayi(d.plc)} + ${d.sn} × 0,025 + ${d.vl} × 0,1 = ${sayi(toplam, 2)} A`, `Pay: ${sayi(toplam, 2)} × 1,25 = ${sayi(payli, 2)} A`, `En yakın üst standart değer: ${sayi(secim)} A (${sayi(secim * 24, 0)} W)`]
      };
    },
    not: 'Tüketimler tipiktir; katalog değerlerini kullan. Kapasitif yükler ve motorlu valfler kalkışta daha fazla çeker.'
  },

  dengesizlik: {
    gruplar: [
      { k: 'a', ad: 'L1 akımı', v: 5, s: [[4, '4'], [4.5, '4,5'], [5, '5'], [5.5, '5,5'], [6, '6']] },
      { k: 'b', ad: 'L2 akımı', v: 5, s: [[4, '4'], [4.5, '4,5'], [5, '5'], [5.5, '5,5'], [6, '6']] },
      { k: 'c', ad: 'L3 akımı', v: 4.5, s: [[4, '4'], [4.5, '4,5'], [5, '5'], [5.5, '5,5'], [6, '6']] }
    ],
    hesapla(d) {
      const l = [d.a, d.b, d.c], ort = (d.a + d.b + d.c) / 3;
      const sapma = Math.max(...l.map((x) => Math.abs(x - ort)));
      const yuzde = (100 * sapma) / ort;
      const durum = yuzde <= 5 ? 'İyi' : yuzde <= 10 ? 'Kontrol et' : 'Arıza şüphesi';
      return {
        sonuclar: [['Ortalama', sayi(ort, 2) + ' A'], ['En büyük sapma', sayi(sapma, 2) + ' A'], ['Dengesizlik', '%' + sayi(yuzde, 1)], ['Durum', durum]],
        adimlar: [`Ortalama = (${sayi(d.a)} + ${sayi(d.b)} + ${sayi(d.c)}) ÷ 3 = ${sayi(ort, 2)} A`, `En büyük sapma = ${sayi(sapma, 2)} A`, `Dengesizlik = ${sayi(sapma, 2)} ÷ ${sayi(ort, 2)} × 100 = %${sayi(yuzde, 1)}`]
      };
    },
    not: 'Akım dengesizliği %10’u geçerse şebeke gerilimlerini, bağlantıları ve motor sargılarını kontrol et.'
  },

  izolasyon: {
    gruplar: [
      { k: 'u', ad: 'Devre gerilimi', v: 2, s: [[1, 'SELV/PELV'], [2, '230/400 V'], [3, '690 V']] },
      { k: 'r', ad: 'Ölçülen değer', v: 200, s: [[0.3, '0,3 MΩ'], [0.8, '0,8 MΩ'], [5, '5 MΩ'], [200, '200 MΩ']] }
    ],
    hesapla(d) {
      const [test, min] = { 1: [250, 0.5], 2: [500, 1], 3: [1000, 1] }[d.u];
      const uygun = d.r >= min;
      const yorum = !uygun ? 'Bozuk ya da nemli: kullanma' : d.r < 10 * min ? 'Sınıra yakın: izle' : 'İyi';
      return {
        sonuclar: [['Test gerilimi', sayi(test) + ' V DC'], ['En az', sayi(min) + ' MΩ'], ['Sonuç', uygun ? 'Uygun' : 'Uygun değil'], ['Yorum', yorum]],
        adimlar: [`Devre: ${['', 'SELV/PELV', '230/400 V', '690 V'][d.u]} → ${test} V DC ile ölç`, `IEC 60364-6 alt sınırı: ${sayi(min)} MΩ`, `${sayi(d.r)} MΩ ${uygun ? '≥' : '<'} ${sayi(min)} MΩ → ${uygun ? 'uygun' : 'uygun değil'}`]
      };
    },
    not: 'Tesisat için alt sınırdır. 1 kV altı motor sargısında IEEE 43’e göre en az 5 MΩ beklenir. Yeni kablo ve motorda değer genelde yüzlerce MΩ’dur; düşüş eğilimi tek ölçümden daha anlamlıdır.'
  },
});
