/* Endüstriyel haberleşme: hesaplayıcılar. */
Object.assign(HESAPLAR, {
  seri: {
    gruplar: [
      { k: 'baud', ad: 'Hız (baud)', v: 9600, s: [[9600, '9.600'], [19200, '19.200'], [38400, '38.400'], [115200, '115.200']] },
      { k: 'bit', ad: 'Karakter biçimi', v: 11, s: [[10, '8N1'], [11, '8E1 · 8N2']] },
      { k: 'bayt', ad: 'Mesaj uzunluğu', v: 8, s: [[8, '8 bayt'], [32, '32 bayt'], [256, '256 bayt']] }
    ],
    hesapla(d) {
      const tk = d.bit / d.baud, tm = tk * d.bayt, bps = d.baud / d.bit;
      const t35 = d.baud > 19200 ? 0.00175 : 3.5 * tk;
      return {
        sonuclar: [['Karakter süresi', sayi(tk * 1000, 3) + ' ms'], ['Mesaj süresi', sayi(tm * 1000, 1) + ' ms'], ['Saniyede bayt', '≈ ' + sayi(bps, 0)], ['Modbus boşluğu', sayi(t35 * 1000, 2) + ' ms']],
        adimlar: [`1 karakter = ${d.bit} bit (başlangıç + 8 veri + ${d.bit === 11 ? 'parite ya da 2. stop + stop' : 'stop'})`, `${d.bit} ÷ ${sayi(d.baud)} = ${sayi(tk * 1000, 3)} ms`, `${d.bayt} × ${sayi(tk * 1000, 3)} = ${sayi(tm * 1000, 1)} ms`, d.baud > 19200 ? '19.200 baud üstünde Modbus boşluğu sabit 1,75 ms alınır' : `Modbus boşluğu = 3,5 × ${sayi(tk * 1000, 3)} = ${sayi(t35 * 1000, 2)} ms`]
      };
    },
    not: 'Gerçek süreye cihazın cevap gecikmesi eklenir. Hesap RS-232 ve RS-485 için aynıdır.'
  },

  altag: {
    gruplar: [
      { k: 'c', ad: 'Cihaz IP: 192.168.… (PLC: 192.168.0.10)', v: 1, s: [[1, '0.20'], [2, '1.20'], [3, '0.10'], [4, '0.255']] },
      { k: 'm', ad: 'Alt ağ maskesi', v: 24, s: [[24, '/24 · 255.255.255.0'], [16, '/16 · 255.255.0.0']] }
    ],
    hesapla(d) {
      const ipler = { 1: [192, 168, 0, 20], 2: [192, 168, 1, 20], 3: [192, 168, 0, 10], 4: [192, 168, 0, 255] };
      const plc = [192, 168, 0, 10], cih = ipler[d.c];
      const ag = (ip) => ip.map((o, i) => (i < d.m / 8 ? o : 0)).join('.');
      const ayniAg = ag(plc) === ag(cih);
      const yayin = cih.slice(d.m / 8).every((o) => o === 255);
      const cakisma = cih.join('.') === plc.join('.');
      const durum = cakisma ? 'IP çakışması' : !ayniAg ? 'Farklı ağ' : yayin ? 'Yayın adresi' : 'Uygun';
      const neden = cakisma ? 'Aynı IP iki cihazda: ikisi de ara ara kopar. Farklı bir adres ver.'
        : !ayniAg ? 'Ağ kısımları farklı: router olmadan birbirini görmez.'
        : yayin ? 'Cihaz kısmının hepsi 255: yayın adresidir, cihaza verilmez.'
        : 'Aynı ağda, adres serbest: doğrudan haberleşir.';
      return {
        sonuclar: [['PLC ağı', ag(plc)], ['Cihaz ağı', ag(cih)], ['Kullanılabilir adres', sayi(2 ** (32 - d.m) - 2)], ['Durum', durum]],
        adimlar: [`/${d.m}: ilk ${d.m / 8} sayı ağ kısmı, kalanı cihaz kısmı`, `PLC ${ag(plc)} · cihaz ${ag(cih)}`, neden]
      };
    },
    not: 'Bilgisayarla bağlanacaksan ağ kartına da aynı ağdan boş bir IP ver (ör. 192.168.0.100).'
  },

  modbusAdres: {
    gruplar: [
      { k: 't', ad: 'Veri alanı', v: 4, s: [[4, 'Holding (4x)'], [3, 'Input (3x)'], [0, 'Coil (0x)'], [1, 'Discrete (1x)']] },
      { k: 'n', ad: 'Kayıt no (1’den başlar)', v: 1, s: [[1, '1'], [2, '2'], [101, '101'], [1001, '1001']] }
    ],
    hesapla(d) {
      const gosterim = String(d.t * 10000 + d.n).padStart(5, '0');
      const adres = d.n - 1;
      const hex = '0x' + adres.toString(16).toUpperCase().padStart(4, '0');
      const kod = { 4: '03 · 06, 16', 3: '04', 0: '01 · 05, 15', 1: '02' }[d.t];
      const ad = { 4: 'holding register', 3: 'input register', 0: 'coil', 1: 'discrete input' }[d.t];
      return {
        sonuclar: [['Kılavuzdaki gösterim', gosterim], ['Protokol adresi', String(adres)], ['Hex', hex], ['Fonksiyon kodu', kod]],
        adimlar: [`${gosterim}: ${d.n}. ${ad}`, `Protokol adresi = ${d.n} − 1 = ${adres} (${hex})`, 'Okuma: ilk kod · yazma: sonraki kodlar. Değer bir kayıt kaymışsa ±1 dene.']
      };
    },
    not: 'Kılavuzlar 1’den, protokol 0’dan sayar. Bazı cihaz ve yazılımlar bu çevirmeyi kendisi yapar.'
  },

  can: {
    gruplar: [
      { k: 'h', ad: 'Hız', v: 500, s: [[1000, '1 Mbit/s'], [500, '500 kbit/s'], [250, '250 kbit/s'], [125, '125 kbit/s'], [50, '50 kbit/s']] },
      { k: 'r', ad: 'Hattaki 120 Ω sayısı', v: 2, s: [[1, '1'], [2, '2'], [3, '3']] }
    ],
    hesapla(d) {
      const uzunluk = { 1000: 25, 500: 100, 250: 250, 125: 500, 50: 1000 }[d.h];
      const R = 120 / d.r;
      const durum = d.r === 2 ? 'Doğru' : d.r < 2 ? 'Eksik' : 'Fazla';
      const yorum = d.r === 2 ? 'İki uçta birer direnç: doğru.' : d.r < 2 ? 'Bir uç sonlandırılmamış: sinyal yansır, hata çıkar.' : 'Fazla direnç: sinyal zayıflar; ara cihazdaki anahtarı kapat.';
      return {
        sonuclar: [['En uzun hat', '≈ ' + sayi(uzunluk) + ' m'], ['H–L arası (enerjisiz)', sayi(R, 0) + ' Ω'], ['Sonlandırma', durum], ['Bit süresi', sayi(1000 / d.h, 1) + ' µs']],
        adimlar: [`Paralel dirençler: 120 ÷ ${d.r} = ${sayi(R, 0)} Ω`, yorum, `${d.h >= 1000 ? '1 Mbit/s' : d.h + ' kbit/s'} için hat en fazla ≈ ${sayi(uzunluk)} m`]
      };
    },
    not: 'Uzunluk değerleri CiA önerisidir; kablo ve dal uzunluğuna göre değişir. Ölçümü enerji kesikken yap.'
  },
});
