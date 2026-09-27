/* PLC temelleri: hesaplayıcılar. */
Object.assign(HESAPLAR, {
  float: {
    gruplar: [
      { k: 'v', ad: 'REAL değer', v: 12.5, s: [[12.5, '12,5'], [100, '100'], [-1, '−1'], [3.14, '3,14']] },
      { k: 'o', ad: 'Cihazın gönderdiği sıra', v: 2, s: [[1, 'ABCD'], [2, 'CDAB'], [3, 'BADC'], [4, 'DCBA']] }
    ],
    hesapla(d) {
      const dv = new DataView(new ArrayBuffer(4));
      dv.setFloat32(0, d.v);
      const b = [0, 1, 2, 3].map((i) => dv.getUint8(i));
      const sira = { 1: [0, 1, 2, 3], 2: [2, 3, 0, 1], 3: [1, 0, 3, 2], 4: [3, 2, 1, 0] }[d.o];
      const ad = { 1: 'ABCD', 2: 'CDAB', 3: 'BADC', 4: 'DCBA' }[d.o];
      const giden = sira.map((i) => b[i]);
      const hex = (a) => a.map((x) => x.toString(16).toUpperCase().padStart(2, '0')).join('');
      const dv2 = new DataView(new ArrayBuffer(4));
      giden.forEach((x, i) => dv2.setUint8(i, x));
      const yanlis = dv2.getFloat32(0);
      const bicim = (x) => {
        if (!isFinite(x)) return 'geçersiz';
        const m = Math.abs(x), isaret = x < 0 ? '−' : '';
        if (m !== 0 && (m < 0.001 || m >= 1e7)) {
          const [k, u] = m.toExponential(2).split('e');
          const ust = u.replace('+', '').split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c] || '⁻').join('');
          return isaret + k.replace('.', ',') + ' × 10' + ust;
        }
        return isaret + sayi(m, 4);
      };
      return {
        sonuclar: [['IEEE 754 (hex)', '0x' + hex(b)], ['1. register', '0x' + hex(giden.slice(0, 2))], ['2. register', '0x' + hex(giden.slice(2))], ['ABCD okunursa', bicim(yanlis)]],
        adimlar: [`${bicim(d.v)} → 32 bit: A=${hex([b[0]])} B=${hex([b[1]])} C=${hex([b[2]])} D=${hex([b[3]])}`, `Cihaz ${ad} sırasıyla gönderir: ${hex(giden.slice(0, 2))} ${hex(giden.slice(2))}`, d.o === 1 ? 'Sıralar aynı: değer doğru okunur.' : `ABCD bekleyen taraf ${bicim(yanlis)} görür; ayarda word ya da byte sırasını (swap) değiştir.`]
      };
    },
    not: 'Modbus’ta 32 bitlik değer iki register’a bölünür; sıra üreticiye göre değişir. Değer saçma çıkıyorsa önce word swap (CDAB) dene.'
  },
});
