/* Sensörler: 3B modeller. Ölçüler mm; sensör ekseni z, aktif yüzey z = 0 (+z hedefe doğru). */
(() => {
  const SN = 5;                  // M18 gömülü tip, standart çelik hedefte (tipik katalog değeri)
  const AL = 0.4;                // alüminyum için malzeme faktörü (tipik; hesaplayıcıyla aynı)
  const UZAK = 12, YAKIN = 1, HIZ = 3;   // hedefin yolu (mm) ve hızı (mm/s)
  const HIST = 0.1;              // histerezis: tipik %10 (IEC 60947-5-2 en çok %20 izin verir)
  const esik = (s) => SN * (s.al ? AL : 1);
  const genlik = (s) => { const t = Math.min(1, Math.max(0, (s.d - 0.5 * esik(s)) / (0.9 * esik(s)))); return t * t * (3 - 2 * t); };

  Object.assign(MODELLER, {
    'enduktif-sensor': {
      aciklama: 'M18 gömülü tip endüktif sensörün 3B modeli: aktif yüzey, ferrit çanak nüve, bobin, osilatör kartı, dişli gövde, somunlar, durum LED’i, M12 konnektör, kablo soketi, braket ve standart hedef.',
      not: 'Hedefi yaklaştır: metal alana girince salınım söner, çıkış açılır ve LED yanar. Hedefi alüminyum seç: aynı çıkış için hedef daha çok yaklaşmalı. Kablo soketine dokununca tel renkleri çıkar.',
      etiketBaslik: 'Kablo uçları (3 telli PNP)',
      etiketler: [
        ['BN', 'Kahverengi: +24 V DC besleme.'],
        ['BU', 'Mavi: 0 V.'],
        ['BK', 'Siyah: çıkış. PNP sensör algılayınca bu uca +24 V verir; PLC girişine bağlanır.']
      ],
      parcalar: [
        ['Aktif yüzey', 'Plastik kapak; manyetik alan buradan çıkar. Gömülü tipte kovanın ucuyla aynı hizadadır. Darbe ve talaş birikmesi en çok bu yüzeye zarar verir.'],
        ['Ferrit çanak nüve', 'Bobinin alanını öne, aktif yüzeye yönlendirir; arkaya ve yanlara taşmasını önler. Gömülü tipin metal içine gömülebilmesi bu yüzdendir.'],
        ['Bobin', 'Osilatörün bobini. Yüksek frekanslı akım, önde değişken bir manyetik alan oluşturur.'],
        ['Osilatör ve değerlendirme kartı', 'Osilatör bobini sürer; değerlendirme devresi salınım genliğini izler. Genlik eşiğin altına inince çıkış transistörü anahtarlar. İç boşluk reçineyle doldurulur (titreşim ve neme karşı).'],
        ['Dişli gövde (M18 × 1)', 'Nikel kaplı pirinç ya da paslanmaz çelik kovan. Diş, montajda mesafe ayarı içindir.'],
        ['Somunlar', 'İki somun braketi arada sıkıştırır; sensörü ileri geri alarak mesafe ayarlanır. Aşırı sıkma dişi ve gövdeyi bozar; katalogdaki sıkma momentine uy.'],
        ['Durum LED’i', 'Çıkış açıkken yanar; halka biçimi her yönden görünür. Arızada ilk bakılacak yer.'],
        ['M12 konnektör', '4 pinli erkek M12 × 1 fiş (A kodlu). Kablo arızasında sensörü sökmeden kablo değiştirilir.'],
        ['Kablo soketi ve kablo', 'Dişi M12 soket, rakor somunu elle sonuna kadar sıkılır; yoksa su girer, IP67 geçerli olmaz.'],
        ['Montaj braketi', 'Sensörü makineye tutar. Gömülü tipte aktif yüzeyin çevresi metal olabilir.'],
        ['Hedef', 'Standart hedef: 1 mm kalın, kenarı aktif yüzey çapı ya da 3 × Sn’den büyük olanı kadar (burada 18 mm) çelik kare plaka. Sn bu hedefle ölçülür.'],
        ['Manyetik alan (gösterim)', 'Bobinin nüveden öne taşan alanı. Alana giren metalde girdap akımları dolaşır, osilatörden enerji çeker; salınım genliği düşer.']
      ],
      kamera: { yon: [0.95, 0.7, 0.75], patlak: [1, 0.5, 0.2] },
      secimdeOdak: true,
      yeni: () => ({ yakin: false, al: false, d: UZAK, cikis: false }),
      dugmeler: (s) => [
        ['hedef', s.yakin ? 'Hedefi uzaklaştır' : 'Hedefi yaklaştır', s.yakin],
        ['malzeme', s.al ? 'Hedef: alüminyum' : 'Hedef: çelik', s.al]
      ],
      olay(s, olay) {
        if (olay === 'hedef') s.yakin = !s.yakin;
        else if (olay === 'malzeme') s.al = !s.al;
      },
      tik(s, dt) {
        const hedef = s.yakin ? YAKIN : UZAK, once = s.d, onceC = s.cikis;
        s.d = hedef < s.d ? Math.max(hedef, s.d - dt * HIZ) : Math.min(hedef, s.d + dt * HIZ);
        if (s.d <= esik(s)) s.cikis = true;
        else if (s.d > esik(s) * (1 + HIST)) s.cikis = false;
        return s.d !== once || s.cikis !== onceC;
      },
      durum(s) {
        const e = esik(s), mal = s.al ? 'Alüminyum' : 'Çelik';
        const bas = `Mesafe ${sayi(s.d, 1)} mm. ${mal} hedefte çalışma mesafesi ≈ ${sayi(e, 1)} mm (Sn ${SN} mm × ${sayi(s.al ? AL : 1)}). `;
        if (!s.cikis) return { metin: bas + 'Salınım sürüyor: çıkış kapalı, LED sönük.' };
        const hist = s.d > e ? ` Histerezis: çıkış ancak ${sayi(e * (1 + HIST), 1)} mm’nin ötesinde kapanır.` : '';
        return { metin: bas + 'Salınım söndü: çıkış açık, LED yanıyor, BK ucunda +24 V (PNP).' + hist };
      },

      kur(y) {
        const T = y.T, TUR = Math.PI * 2;
        const kok = new T.Group();
        const grup = (...n) => { const g = new T.Group(); n.forEach((x) => g.add(x)); return g; };
        const yer = (n, x, yy, z) => { n.position.set(x, yy, z); return n; };
        const kutu = (w, h, d, m, x, yy, z, sec) => yer(y.ag(new T.BoxGeometry(w, h, d), m, sec), x, yy, z);
        const dis = (r0, rTepe, rDip, z0, z1) => {   // dış dişli kovan profili (adım 1 mm), iç çap r0
          const p = [[r0, z0], [rDip + 0.1, z0, 1]];
          for (let z = z0 + 0.5; z < z1; z += 1) { p.push([rTepe, z]); if (z + 0.5 < z1) p.push([rDip, z + 0.5]); }
          return p;
        };
        /* Birbirine değen parçalar arasında 0,05 mm boşluk vardır (kesitte z-fighting olmasın). */

        /* ---- aktif yüzey, nüve, bobin ---- */
        const kapak = grup(yer(y.ag(y.silindir(7.45, 0.8), 'plastikAcik'), 0, 0, -0.4));
        const nuve = grup(y.ag(y.torna([[0, -5.05], [7, -5.05, 1], [7, -0.85, 1], [6, -0.85, 1], [6, -3.85, 1], [2.2, -3.85, 1], [2.2, -0.85, 1], [0, -0.85]]), 'miknatis'));
        const bobin = grup(yer(y.ag(y.halka(2.3, 5.9, 2.9), 'bakir', { esik: 60 }), 0, 0, -2.35),
          ...[1.8, -1.8].map((yy) => y.ag(y.boru([[-2.8, yy, -3.7], [-2.8, yy, -5.3], [-3.2, yy, -6.3]], 0.15, 12), 'bakir', { kenar: false })));

        /* ---- kart: x = −4 … −2,4 düzleminde; elemanlar +x yüzünde (kesitte görünür) ---- */
        const eleman = (w, h, d, m, yy, z) => kutu(w, h, d, m, -2.35 + w / 2, yy, z, { kenar: false });
        const ledRenk = y.malzeme('entegre').clone();   // ayrı malzeme: yalnızca LED’ler renklenir
        const ledAglar = [3.8, -3.8].map((yy) => eleman(0.8, 1.6, 1.2, ledRenk, yy, -46.6));   // kart üstündeki LED’ler
        const kart = grup(
          kutu(1.6, 11.2, 41.5, 'kart', -3.2, 0, -26.75),
          eleman(1.2, 5, 5, 'entegre', 0, -12),                   // osilatör ve değerlendirme entegresi
          eleman(0.8, 1.6, 1, 'celik', 3.6, -10.5), eleman(0.8, 1.6, 1, 'celik', 3.6, -13.5), eleman(0.8, 1, 1.6, 'celik', -3.8, -12),
          eleman(0.6, 1, 2, 'entegre', 3.2, -20), eleman(0.6, 1, 2, 'entegre', -3.2, -20), eleman(0.8, 1.6, 1, 'celik', 0, -24),
          eleman(1.2, 3, 4, 'entegre', -1.5, -36),                // çıkış transistörü
          eleman(0.8, 1.6, 1, 'celik', 2.5, -32), eleman(0.8, 1.6, 1, 'celik', 2.5, -40),
          ...ledAglar
        );

        /* ---- gövde: M18 × 1 dişli kovan, iç çap 15 ---- */
        const govde = grup(y.ag(y.torna(dis(7.5, 9, 8.4, -50, 0).concat([[8.5, 0, 1], [7.5, 0, 1], [7.5, -50]]), 40), 'celik', { esik: 70 }));

        /* ---- somunlar (M18 × 1, anahtar ağzı 24, kalınlık 4) ---- */
        const altigen = new T.Shape();
        for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + (k * Math.PI) / 3, R = 24 / Math.sqrt(3); if (k) altigen.lineTo(R * Math.cos(a), R * Math.sin(a)); else altigen.moveTo(R * Math.cos(a), R * Math.sin(a)); }
        altigen.closePath();
        altigen.holes.push(new T.Path().absarc(0, 0, 9.05, 0, TUR, true));
        const somunGeo = y.cek(altigen, 4, { pah: 0.4 });
        const somunlar = grup(yer(y.ag(somunGeo, 'celik'), 0, 0, -17.95), yer(y.ag(somunGeo, 'celik'), 0, 0, -24.05));

        /* ---- arka: LED halkası, arka kapak ve M12 erkek fiş ---- */
        const ledHalka = yer(y.ag(y.halka(5, 8.5, 3.9), 'plastikAcik'), 0, 0, -52);
        const led = grup(ledHalka);
        const pim = y.silindir(0.5, 4, 16);
        const fis = grup(
          yer(y.ag(y.silindir(8.5, 3.9), 'plastik'), 0, 0, -56),
          y.ag(y.torna(dis(4.6, 6, 5.45, -68, -59).concat([[7, -59, 1], [7, -58.05, 1], [4.6, -58.05, 1], [4.6, -68]]), 40), 'celik', { esik: 70 }),
          yer(y.ag(y.silindir(4.55, 5.9), 'plastik'), 0, 0, -61.1),
          ...[1, 3, 5, 7].map((k) => yer(y.ag(pim, 'bakir', { esik: 60 }), 2.5 * Math.cos((k * Math.PI) / 4), 2.5 * Math.sin((k * Math.PI) / 4), -65.55))
        );

        /* ---- dişi soket ve kablo ---- */
        const tel = (m, uc) => [y.ag(y.boru([[0, -27, -106.5], ...uc.slice(0, 2)], 0.7, 16), m, { kenar: false }), y.ag(y.boru(uc.slice(1), 0.45, 8), 'bakir', { kenar: false })];
        const BN = [[-4, -38, -106], [-6, -44, -105.5], [-6.6, -47, -105.4]], BU = [[0, -39, -107], [0, -45, -107], [0, -48, -107]], BK = [[4, -38, -108], [6, -44, -108.5], [6.6, -47, -108.6]];
        const soket = grup(
          yer(y.ag(y.halka(6.05, 8, 9), 'celik'), 0, 0, -63.55),
          yer(y.ag(y.silindir(4.55, 7.95), 'plastik'), 0, 0, -68.075),
          y.ag(y.torna([[0, -88], [3.5, -88, 1], [3.5, -84, 1], [5, -82, 1], [7.6, -75, 1], [7.6, -68.1, 1], [0, -68.1]]), 'plastik'),
          y.ag(y.boru([[0, 0, -87.5], [0, 0, -96], [0, -3, -102], [0, -12, -105.5], [0, -27, -107]], 2.4, 40), 'kabloSiyah', { kenar: false }),
          ...tel('kabloKahve', BN), ...tel('kabloMavi', BU), ...tel('kabloSiyah', BK)
        );

        /* ---- braket (2 mm sac) ---- */
        const plaka = new T.Shape().moveTo(-16, -27.95).lineTo(16, -27.95).lineTo(16, 16).lineTo(-16, 16).closePath();
        plaka.holes.push(new T.Path().absarc(0, 0, 9.1, 0, TUR, true));
        const braket = grup(yer(y.ag(y.cek(plaka, 2), 'aluminyum'), 0, 0, -21), kutu(32, 2, 32, 'aluminyum', 0, -29, -36));

        /* ---- hedef ve alan (iç gruplar kayar) ---- */
        const plaka18 = kutu(18, 18, 1, y.malzeme('celik').clone(), 0, 0, 0.5);
        const renkCelik = y.malzeme('celik').color.clone(), renkAl = y.malzeme('aluminyum').color.clone();
        const hedefIc = grup(plaka18, kutu(4, 24, 1, 'sac', 0, 21.05, 0.5));
        const hedef = grup(hedefIc);
        const renkAlan = y.malzeme('vurgu').color.clone(), renkSonuk = y.malzeme('sac').color.clone();
        const yay = y.boru(Array.from({ length: 13 }, (_, i) => { const t = (i / 12) * Math.PI; return [3.85 - 2.65 * Math.cos(t), 0, 3 * Math.sin(t)]; }), 0.15, 24);
        const alanIc = grup();
        for (let k = 0; k < 8; k++) { const a = y.ag(yay, 'vurgu', { kenar: false }); a.rotation.z = (k * Math.PI) / 4 + Math.PI / 8; alanIc.add(a); }
        alanIc.position.z = 0.1;
        const alan = grup(alanIc);

        const parcalar = [
          { nesne: kapak, isaret: [-3.5, 0, 0], patlat: [0, 0, 12] },
          { nesne: nuve, isaret: [0, 6.5, -2.5], patlat: [0, 0, 4] },
          { nesne: bobin, isaret: [0, 4, -2.35], patlat: [0, 0, 8] },
          { nesne: kart, isaret: [-2.4, 4.5, -28], patlat: [0, 0, 0] },
          { nesne: govde, isaret: [8.46, -3.08, -29.5], patlat: [0, 28, 0] },
          { nesne: somunlar, isaret: [12, -3, -17.95], patlat: [0, 28, 0] },
          { nesne: led, isaret: [-1.48, 8.37, -52], patlat: [0, 0, -5] },
          { nesne: fis, isaret: [4.25, -7.36, -56], patlat: [0, 0, -10] },
          { nesne: soket, isaret: [7.52, -2.74, -66], patlat: [0, 0, -22] },
          { nesne: braket, isaret: [12, -20, -20], patlat: [0, 0, 0] },
          { nesne: hedef, isaretNesne: hedefIc, isaret: [-5, -5, 1], patlat: [0, 0, 16] },
          { nesne: alan, isaretNesne: alanIc, isaret: [-3.56, -1.47, 3], patlat: [0, 0, 12] }
        ];
        parcalar.forEach((p) => kok.add(p.nesne));

        const etiketYerleri = [[BN, -3.5], [BU, 0], [BK, 3.5]].map(([uc, dx]) => ({ nesne: soket, konum: [uc[2][0] + dx, uc[2][1] - 3.5, uc[2][2]], parca: 8 }));

        return {
          kok,
          parcalar,
          etiketYerleri,
          uygula(s) {
            /* Malzemeler burada okunur: çalışma zamanı her parçaya kendi kopyasını verir. */
            hedefIc.position.z = s.d;
            plaka18.material.color.copy(s.al ? renkAl : renkCelik);
            const g = genlik(s);
            alanIc.scale.z = 0.2 + 0.8 * g;
            alanIc.children[0].material.color.copy(renkSonuk).lerp(renkAlan, g);
            ledHalka.material.color.set(s.cikis ? 0xffc21a : 0xe8e4da);
            ledAglar[0].material.color.set(s.cikis ? 0xffc21a : 0x3a3218);
          }
        };
      }
    }
  });
})();

/* Sıcaklık sensörü: B tipi kafalı, G1/2 bağlantılı, Ø6 kılıflı daldırma sensörü; borudaki akışkana daldırılmış. Ölçüler mm; sensör ekseni y (kafa yukarıda).
   Eleman PT100 (3 telli) ya da K tipi termokupl seçilir. Tablo değerleri: IEC 60751 (PT100), IEC 60584 (K tipi, 0 °C referans). */
(() => {
  const TUR = Math.PI * 2;
  const PT = [[0, 100], [20, 107.79], [100, 138.51], [200, 175.86]];
  const K = [[0, 0], [20, 0.798], [100, 4.096], [200, 8.138]];
  const ara = (tablo, t) => { for (let i = 1; i < tablo.length; i++) if (t <= tablo[i][0] || i === tablo.length - 1) { const [a, fa] = tablo[i - 1], [b, fb] = tablo[i]; return fa + ((fb - fa) * (t - a)) / (b - a); } return 0; };
  const HEDEF = [20, 100, 200];
  const UC = -93, BORU_Y = -75.2;   // kılıf ucu ve DN50 borunun ekseni (y)
  const mA = (t) => 4 + (16 * Math.min(200, Math.max(0, t))) / 200;   // transmitter 0–200 °C → 4–20 mA

  Object.assign(MODELLER, {
    'sicaklik-sensoru': {
      aciklama: 'Daldırma tipi sıcaklık sensörünün 3B modeli: bağlantı kafası ve kapağı, kablo rakoru, kafa transmitteri, proses bağlantısı, koruyucu kılıf, ölçüm elemanı (PT100 ya da termokupl), iç teller, kaynak soketi ve boru.',
      not: 'Boyuna kesit kılıfın içini gösterir. Proses sıcaklığını değiştir: sensör kılıf yüzünden biraz geç yetişir. Elemanı PT100 ile termokupl arasında değiştirip tellere ve uca bak.',
      parcalar: [
        ['Bağlantı kafası', 'Alüminyum B tipi kafa; içinde klemens bloğu ya da transmitter bulunur. Kapak contası suyu dışarıda tutar.'],
        ['Kafa kapağı', 'Vidalıdır; kapak açık bırakılırsa nem girer, ölçüm kayar.'],
        ['Kablo rakoru ve kablo', 'Transmitterin 4–20 mA çıkışı iki telli kabloyla PLC’ye gider.'],
        ['Kafa transmitteri', 'Direnci ya da mV’u 4–20 mA’e çevirir; uzun kabloda sinyal bozulmaz. Termokuplda soğuk uç kompanzasyonunu da yapar.'],
        ['Proses bağlantısı', 'G1/2 diş ve altıgen; boruya kaynatılmış sokete vidalanır.'],
        ['Koruyucu kılıf', 'Paslanmaz çelik. Elemanı basınç ve akışkandan korur ama ısıyı gecikmeli iletir; tepki süresi uzar.'],
        ['Ölçüm elemanı', 'PT100: sıcaklıkla direnci artan platin eleman. Termokupl: iki farklı telin kaynatıldığı uç; sıcaklık farkıyla gerilim üretir.'],
        ['İç teller', 'PT100’de 3 tel: iki kırmızı, bir beyaz (IEC 60751). K tipi termokuplda + yeşil, − beyaz (IEC 60584-3).'],
        ['Kaynak soketi ve boru', 'Kılıf ucu borunun ortasına yakın durmalı; akışkan kılıfın çevresinden akmalı.'],
        ['Akışkan (gösterim)', 'Renk proses sıcaklığını gösterir: mavi soğuk, turuncu sıcak.']
      ],
      kamera: { yon: [1, 0.35, 0.9], patlak: [1, 0.3, 0.8] },
      secimdeOdak: true,
      kesitler: [{ ad: 'boyuna', planlar: [[-1, 0, 0, 0]] }],
      yeni: () => ({ eleman: 'pt', hedef: 20, P: 20, T: 20 }),
      dugmeler: (s) => [
        ['eleman', s.eleman === 'pt' ? 'Eleman: PT100' : 'Eleman: termokupl K', s.eleman === 'tc'],
        ['isi', `Proses: ${s.hedef} °C`, s.hedef !== 20]
      ],
      olay(s, olay) {
        if (olay === 'eleman') s.eleman = s.eleman === 'pt' ? 'tc' : 'pt';
        else if (olay === 'isi') s.hedef = HEDEF[(HEDEF.indexOf(s.hedef) + 1) % HEDEF.length];
      },
      tik(s, dt) {
        const once = s.P + ',' + s.T;
        const yaklas = (v, h, tau) => { const n = v + (h - v) * Math.min(1, dt / tau); return Math.abs(h - n) < 0.05 ? h : n; };
        s.P = yaklas(s.P, s.hedef, 0.4);   // akışkan
        s.T = yaklas(s.T, s.P, 2.5);        // sensör: kılıf yüzünden gecikir (gösterim; gerçekte saniyeler–dakikalar)
        return s.P + ',' + s.T !== once;
      },
      durum(s) {
        const P = sayi(s.P, 0), T = sayi(s.T, 0), akim = sayi(mA(s.T), 1);
        const bas = `Proses ${P} °C, sensör ${T} °C${Math.abs(s.P - s.T) > 1 ? ' (kılıf ısıyı gecikmeli iletiyor)' : ''}. `;
        if (s.eleman === 'pt') return { metin: `${bas}PT100 ≈ ${sayi(ara(PT, s.T), 1)} Ω (0 °C’ta 100 Ω). 3 telli bağlantıda kablo direnci düşülür. Transmitter (0–200 °C) ≈ ${akim} mA.` };
        return { metin: `${bas}Klemens (soğuk uç) 20 °C: K tipi termokupl yalnızca farkı görür, ≈ ${sayi(ara(K, s.T) - ara(K, 20), 2)} mV. Transmitter soğuk ucu ölçüp ekler (soğuk uç kompanzasyonu): ≈ ${akim} mA.` };
      },

      kur(y) {
        const T = y.T;
        const kok = new T.Group();
        const grup = (...n) => { const g = new T.Group(); n.forEach((x) => g.add(x)); return g; };
        const yer = (n, x, yy, z) => { n.position.set(x, yy, z); return n; };
        const dikey = (geo) => geo.rotateX(-Math.PI / 2);   // z eksenli (torna, halka, cek) geometriyi y eksenine çevirir
        const tel = (n, m, r = 0.3) => y.ag(y.boru(n, r, 48), m, { kenar: false });
        /* Birbirine değen parçalar arasında 0,05 mm boşluk vardır (kesitte z-fighting olmasın). */

        /* ---- kafa, kapak, rakor ve kablo ---- */
        const kafa = grup(y.ag(dikey(y.torna([[7.05, 0], [26, 0, 1], [26, 29.95, 1], [23, 29.95, 1], [23, 3, 1], [7.05, 3, 1], [7.05, 0]], 48)), 'aluminyum', { esik: 50 }));
        const kapak = grup(y.ag(dikey(y.torna([[0, 30.05], [26, 30.05, 1], [26, 35, 1], [20, 40], [0, 40]], 48)), 'aluminyum', { esik: 50 }),
          yer(y.ag(new T.CylinderGeometry(2.5, 2.5, 2, 16), 'celik'), 0, 41.05, 0));
        const rakor = grup(yer(y.ag(y.silindir(7, 14, 24).rotateY(Math.PI / 2), 'plastik'), 33.05, 17, 0),
          yer(y.ag(new T.CylinderGeometry(8.5, 8.5, 4, 6).rotateZ(Math.PI / 2), 'plastik'), 28.1, 17, 0),
          tel([[40, 17, 0], [58, 17, 0], [70, 8, 0], [74, -14, 0]], 'kabloGri', 3.5));

        /* ---- kafa transmitteri: 4–20 mA çıkışı rakora gider ---- */
        const transmitter = grup(yer(y.ag(new T.CylinderGeometry(21.5, 21.5, 14, 40), 'plastik', { esik: 60 }), 0, 13, 0),
          ...[0, 1, 2, 3, 4].map((k) => { const a = (k * TUR) / 5; return yer(y.ag(new T.CylinderGeometry(1.8, 1.8, 2, 12), 'celik'), 14 * Math.cos(a), 21.05, 14 * Math.sin(a)); }),
          tel([[14, 22.3, 0], [20, 22.3, 0], [23.5, 17.5, 0], [27, 17, 0]], 'kabloKirmizi', 0.8),
          tel([[4.3, 22.3, 13.3], [15, 22.3, 7], [23.5, 17.5, 1.8], [27, 17, 1.8]], 'kabloSiyah', 0.8));

        /* ---- proses bağlantısı: G1/2 diş, altıgen, boyun (içleri teller için boş) ---- */
        const dis = [[3.05, -48], [9.4, -48, 1]];
        for (let yy = -47.1; yy < -30.6; yy += 1.814) dis.push([10.45, yy], [9.3, yy + 0.907]);
        dis.push([9.4, -30.05, 1], [3.05, -30.05, 1], [3.05, -48]);
        const altigen = new T.Shape();
        for (let k = 0; k < 6; k++) { const a = (k * TUR) / 6, R = 27 / Math.sqrt(3); if (k) altigen.lineTo(R * Math.cos(a), R * Math.sin(a)); else altigen.moveTo(R * Math.cos(a), R * Math.sin(a)); }
        altigen.closePath();
        altigen.holes.push(new T.Path().absarc(0, 0, 3.05, 0, TUR, true));
        const baglanti = grup(y.ag(dikey(y.torna(dis, 40)), 'celik', { esik: 70 }),
          yer(y.ag(dikey(y.cek(altigen, 9.9, { pah: 0.6 })), 'celik'), 0, -25, 0),
          yer(y.ag(dikey(y.halka(3, 7, 19.9, 32)), 'celik'), 0, -10, 0));

        /* ---- koruyucu kılıf: Ø6 × 0,6 boru, yuvarlak kapalı uç ---- */
        const ic = Array.from({ length: 7 }, (_, i) => { const t = (i / 6) * (Math.PI / 2); return [2.4 * Math.cos(t), UC + 3 - 2.4 * Math.sin(t)]; });
        const dis2 = Array.from({ length: 7 }, (_, i) => { const u = (i / 6) * (Math.PI / 2); return [3 * Math.sin(u), UC + 3 - 3 * Math.cos(u)]; });
        const kilif = grup(y.ag(dikey(y.torna([[2.4, -48], ...ic, [0, UC], ...dis2.slice(1), [3, -48, 1], [2.4, -48]], 32)), 'celik', { esik: 50 }));

        /* ---- ölçüm elemanları ve teller (PT100: 3 tel; termokupl: 2 tel ve kaynak ucu) ---- */
        const ptEleman = yer(y.ag(new T.CylinderGeometry(1.4, 1.4, 9, 16), 'plastikAcik'), -0.5, UC + 7, 0);
        const tcUc = yer(y.ag(new T.SphereGeometry(0.9, 16, 12), 'bakir', { kenar: false }), -0.8, UC + 1.8, 0);
        const eleman = grup(ptEleman, tcUc);
        const telYolu = (z, y0) => [[-0.8, y0, z], [-0.8, -55, z], [-0.8, -10, z], [-1.2, 5.9, z * 3]];
        const ptTeller = grup(tel(telYolu(-0.8, UC + 11.7), 'kabloKirmizi'), tel(telYolu(0, UC + 11.7), 'kabloKirmizi'), tel(telYolu(0.8, UC + 11.7), 'plastikAcik'));
        const tcTeller = grup(tel(telYolu(-0.5, UC + 2), 'kabloYesil'), tel(telYolu(0.5, UC + 2), 'plastikAcik'));
        const teller = grup(ptTeller, tcTeller);

        /* ---- DN50 boru (Ø60 × 2,8) ve kaynak soketi; akışkan ---- */
        const boru = grup(yer(y.ag(y.halka(27.2, 30, 70, 64), 'celik', { esik: 50 }), 0, BORU_Y, 0),
          y.ag(dikey(y.torna([[10.55, -47.9], [14, -47.9, 1], [14, -40.05, 1], [10.55, -40.05, 1], [10.55, -47.9]], 40)), 'celik', { esik: 50 }));
        const akiskanAg = yer(y.ag(y.silindir(27.15, 69.9, 64), y.malzeme('kabloMavi').clone(), { kenar: false }), 0, BORU_Y, 0);
        const akiskan = grup(akiskanAg);

        const parcalar = [
          { nesne: kafa, isaret: [0, 15, 26], patlat: [0, 0, 0] },
          { nesne: kapak, isaret: [0, 40, 12], patlat: [0, 40, 0] },
          { nesne: rakor, isaret: [40.05, 17, 5], patlat: [22, 0, 0] },
          { nesne: transmitter, isaret: [0, 13, 21.5], patlat: [0, 24, 0] },
          { nesne: baglanti, isaret: [0, -39.84, 10.45], patlat: [0, 0, 0] },
          { nesne: kilif, isaret: [0, -58, 3], patlat: [0, 0, 0] },
          { nesne: eleman, isaret: [0, UC + 8, 1.4], patlat: [16, 0, 0] },
          { nesne: teller, isaret: [-0.8, -55, 1.1], patlat: [16, 0, 0] },
          { nesne: boru, isaret: [0, -44, 14], patlat: [0, -30, 0] },
          { nesne: akiskan, isaret: [0, BORU_Y - 12, 34.95], patlat: [0, -30, 0] }
        ];
        parcalar.forEach((p) => kok.add(p.nesne));

        const soguk = y.malzeme('kabloMavi').color.clone(), sicak = new T.Color(0xf08a24), elemanRenk = ptEleman.material.color.clone(), kizgin = y.malzeme('kuzey').color.clone();

        return {
          kok,
          parcalar,
          uygula(s) {
            /* Malzemeler burada okunur: çalışma zamanı her parçaya kendi kopyasını verir. */
            const pt = s.eleman === 'pt';
            /* visible ağlara verilir: ışın testi (dokunma, örtülme) üst grubun görünürlüğüne bakmaz. */
            ptEleman.visible = pt; ptTeller.children.forEach((m) => { m.visible = pt; });
            tcUc.visible = !pt; tcTeller.children.forEach((m) => { m.visible = !pt; });
            akiskanAg.material.color.copy(soguk).lerp(sicak, Math.min(1, s.P / 200));
            ptEleman.material.color.copy(elemanRenk).lerp(kizgin, 0.6 * Math.min(1, s.T / 200));
          }
        };
      }
    }
  });
})();
