/* Kablo ve topraklama: hesaplayıcılar. */
Object.assign(HESAPLAR, {
  gerilimDusumu: {
    gruplar: [
      { k: 'faz', ad: 'Sistem', v: 1, s: [[1, 'Tek faz 230 V'], [3, 'Üç faz 400 V']] },
      { k: 'kaynak', ad: 'Besleme', v: 1, s: [[1, 'Şebekeden'], [2, 'Özel trafodan']] },
      { k: 's', ad: 'Kesit (bakır, mm²)', v: 2.5, s: [[1.5, '1,5'], [2.5, '2,5'], [4, '4'], [6, '6'], [10, '10'], [16, '16']] },
      { k: 'l', ad: 'Hat uzunluğu', v: 25, s: [[10, '10 m'], [25, '25 m'], [50, '50 m'], [100, '100 m']] },
      { k: 'i', ad: 'Akım', v: 16, s: [[10, '10 A'], [16, '16 A'], [25, '25 A'], [32, '32 A']] }
    ],
    hesapla(d) {
      const U = d.faz === 3 ? 400 : 230, k = d.faz === 3 ? Math.sqrt(3) : 2;
      const dU = (k * d.l * d.i) / (56 * d.s);
      const yuzde = (100 * dU) / U;
      const durum = (sinir) => (yuzde <= sinir ? 'Uygun' : 'Aşıyor');
      const [sa, sm] = d.kaynak === 2 ? [6.5, 8] : [1.5, 3];
      const iz = (d.faz === 3 ? { 1.5: 15.5, 2.5: 21, 4: 28, 6: 36, 10: 50, 16: 68 } : { 1.5: 17.5, 2.5: 24, 4: 32, 6: 41, 10: 57, 16: 76 })[d.s];
      const adimlar = [`ΔU = ${d.faz === 3 ? '1,73' : '2'} × ${d.l} × ${d.i} ÷ (56 × ${sayi(d.s)}) ≈ ${sayi(dU, 2)} V`, `%e = 100 × ${sayi(dU, 2)} ÷ ${U} ≈ %${sayi(yuzde, 2)}`, `Yükteki gerilim ≈ ${sayi(U - dU, 1)} V`];
      if (d.i > iz) adimlar.push(`Uyarı: ${d.i} A, ${sayi(d.s)} mm² kablonun taşıma kapasitesini (boruda ≈ ${sayi(iz)} A) aşar.`);
      return {
        sonuclar: [['Gerilim düşümü', sayi(dU, 1) + ' V'], ['Yüzde', '%' + sayi(yuzde, 2)], [`Aydınlatma %${sayi(sa)}`, durum(sa)], [`Motor %${sayi(sm)}`, durum(sm)]],
        adimlar
      };
    },
    not: 'Bakır iletken, cos φ = 1 kabulü. Uzun hatlarda kesit seçimini bu hesaba göre büyüt.'
  },

  iz: {
    gruplar: [
      { k: 'd', ad: 'Döşeme', v: 1, s: [[1, 'B1 · boruda'], [2, 'C · duvarda'], [3, 'E · tavada']] },
      { k: 'f', ad: 'Sistem', v: 1, s: [[1, 'Tek faz'], [3, 'Üç faz']] },
      { k: 't', ad: 'Ortam sıcaklığı', v: 30, s: [[30, '30 °C'], [35, '35 °C'], [40, '40 °C'], [45, '45 °C']] },
      { k: 'g', ad: 'Aynı yerdeki devre sayısı', v: 1, s: [[1, '1'], [2, '2'], [3, '3'], [4, '4']] },
      { k: 'in', ad: 'Sigorta (In)', v: 16, s: [[10, '10 A'], [16, '16 A'], [20, '20 A'], [25, '25 A'], [32, '32 A'], [40, '40 A'], [63, '63 A']] }
    ],
    hesapla(d) {
      const kesit = [1.5, 2.5, 4, 6, 10, 16, 25];
      const tablo = {
        1: { 1: [17.5, 24, 32, 41, 57, 76, 101], 3: [15.5, 21, 28, 36, 50, 68, 89] },
        2: { 1: [19.5, 27, 36, 46, 63, 85, 112], 3: [17.5, 24, 32, 41, 57, 76, 96] },
        3: { 1: [22, 30, 40, 51, 70, 94, 119], 3: [18.5, 25, 34, 43, 60, 80, 101] }
      }[d.d][d.f];
      const kT = { 30: 1, 35: 0.94, 40: 0.87, 45: 0.79 }[d.t];
      const kG = (d.d === 3 ? { 1: 1, 2: 0.88, 3: 0.82, 4: 0.79 } : { 1: 1, 2: 0.8, 3: 0.7, 4: 0.65 })[d.g];
      const k = kT * kG, gerek = d.in / k;
      const i = tablo.findIndex((x) => x >= gerek);
      const adimlar = [`k = ${sayi(kT)} (sıcaklık) × ${sayi(kG)} (gruplama) = ${sayi(k)}`, `Gereken tablo değeri: ${d.in} ÷ ${sayi(k)} ≈ ${sayi(gerek, 1)} A`];
      if (i < 0) {
        adimlar.push('Tablodaki en büyük kesit (25 mm²) yetmiyor: daha büyük kesit ya da ayrı hatlar.');
        return { sonuclar: [['Düzeltme katsayısı', '× ' + sayi(k)], ['Gereken tablo Iz', '≥ ' + sayi(gerek, 1) + ' A'], ['En küçük kesit', '> 25 mm²'], ['Düzeltilmiş Iz', '—']], adimlar };
      }
      adimlar.push(`${sayi(kesit[i])} mm²: tabloda ${sayi(tablo[i])} A × ${sayi(k)} ≈ ${sayi(tablo[i] * k, 1)} A ≥ ${d.in} A`);
      return {
        sonuclar: [['Düzeltme katsayısı', '× ' + sayi(k)], ['Gereken tablo Iz', '≥ ' + sayi(gerek, 1) + ' A'], ['En küçük kesit', sayi(kesit[i]) + ' mm²'], ['Düzeltilmiş Iz', sayi(tablo[i] * k, 1) + ' A']],
        adimlar
      };
    },
    not: 'IEC 60364-5-52, bakır, PVC yalıtım. MCB içindir; buşon ve NH sigortada In yerine In ÷ 0,9 ile bak. Gerilim düşümünü ayrıca kontrol et.'
  },
});
