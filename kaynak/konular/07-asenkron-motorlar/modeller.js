/* Asenkron motorlar: 3B modeller. Ölçüler mm; mil ekseni z (+z mil çıkışı, D tarafı), y yukarı. Mil yüksekliği 80 (IEC 80 gövdeye yakın, tipik ölçüler). */
(() => {
  const TUR = Math.PI * 2, DER = Math.PI / 180;
  const OLUK = 36, CUBUK = 28;
  const FE = 0.5;          // gösterimde elektriksel frekans (Hz): alan 4 s’de bir tur atar
  const KAYMA = 0.15;      // gösterimde kayma (gerçekte yükte yüzde birkaç); fark görünsün diye abartılı
  /* 4 kutup, 36 oluk: kutup ve faz başına 3 oluk. Faz kuşakları sırası U, −W, V, −U, W, −V (bir kutup çifti = 18 oluk). */
  const KUSAK = [[0, 1], [2, -1], [1, 1], [0, -1], [2, 1], [1, -1]];
  const X = [-18, 0, 18];  // klemens sütunları

  Object.assign(MODELLER, {
    'asenkron-motor': {
      aciklama: 'Üç fazlı sincap kafesli asenkron motorun 3B modeli: gövde, stator, sargı, rotor, kafes, mil, rulmanlar, kapaklar, fan, fan kapağı, klemens kutusu ve besleme kablosu.',
      not: 'Çalıştır: oluklardaki renkler anlık akımı gösterir (kırmızı +, mavi −); desen dönerek döner alanı oluşturur, rotor biraz geriden izler. Bağlantıyı değiştirip klemens köprülerine, yönü değiştirip kablolara bak. Klemens tablasına dokununca uç adları çıkar.',
      etiketBaslik: 'Klemens uçları',
      etiketler: [
        ['U1', 'Birinci faz sargısının başı; L1 buraya bağlanır.'],
        ['V1', 'İkinci faz sargısının başı; L2 buraya bağlanır.'],
        ['W1', 'Üçüncü faz sargısının başı; L3 buraya bağlanır.'],
        ['W2', 'Üçüncü faz sargısının sonu. Alt sıra kaydırılmıştır: W2, U1’in altındadır; üçgende U1-W2 köprülenir.'],
        ['U2', 'Birinci faz sargısının sonu. Yıldızda U2, V2 ve W2 birleşir (yıldız noktası).'],
        ['V2', 'İkinci faz sargısının sonu. Üçgende W1-V2 köprülenir.']
      ],
      parcalar: [
        ['Gövde ve soğutma kanatları', 'Alüminyum ya da dökme demir. Kanatlar, fanın üflediği havayla ısıyı dağıtır; üstleri tozla kaplanırsa motor ısınır. Ayaklar (IM B3 montaj) ve klemens kutusu yuvası gövdeyle birliktedir.'],
        ['Stator saç paketi', 'Birbirinden yalıtılmış ince silisli saclardan paketlenir; girdap akımı kaybı azalır. Oluklarına sargılar yerleşir.'],
        ['Stator sargısı', 'Üç fazın sargısı oluklara dağıtılmıştır. Renkler anlık akımı gösterir (kırmızı +, mavi −); desen döndükçe döner alan oluşur. Sargı başları U1-V1-W1, sonları U2-V2-W2 olarak klemens kutusuna gelir.'],
        ['Rotor saç paketi', 'Mile preslenmiş sac paket. Döner alan, rotor çubuklarında gerilim endükler; çubuklardan geçen akım torku üretir.'],
        ['Sincap kafesi', 'Oluklara dökülmüş alüminyum çubuklar iki uçta kısa devre halkalarıyla birleşir. Çubuklar gürültüyü ve tork dalgalanmasını azaltmak için eğik dökülür. Halkalardaki kanatçıklar içerideki havayı karıştırır.'],
        ['Mil ve kama', 'Tork, mil ucundaki kamayla kaplin ya da kasnağa aktarılır. Mil çapı ve boyu gövde büyüklüğüne göre standarttır (IEC 60072).'],
        ['Rulmanlar', 'Sabit bilyalı rulmanlar. Motor arızalarının önemli bölümü rulmandan çıkar: sesi, titreşimi ve ısınmayı izle; gresörlüklü tipte düzenli yağla.'],
        ['Ön kapak (D tarafı)', 'Mil çıkış tarafı (drive end). Ön rulmanı taşır, gövdeye cıvatayla bağlanır. Flanşlı motorlarda (B5, B14) bu kapak flanşlıdır.'],
        ['Arka kapak (N tarafı)', 'Fan tarafı (non-drive end). Arka rulmanı taşır.'],
        ['Fan', 'Mile takılı, düz kanatlı fan; iki yönde de soğutur. Devir düşünce soğutma da azalır: sürücüyle uzun süre düşük devirde yüklü çalışan motora ayrı fan gerekebilir.'],
        ['Fan kapağı', 'Fanı korur, havayı gövde kanatlarına yönlendirir. Izgarası tıkanırsa motor ısınır.'],
        ['Klemens kutusu kapağı', 'Contalıdır; motorun IP koruma derecesini (ör. IP55) sağlar. Conta bozuksa ya da vida eksikse su girer.'],
        ['Klemens tablası ve köprüler', 'Altı uç iki sırada: üstte U1-V1-W1, altta kaydırılmış W2-U2-V2. Köprüler yıldız ya da üçgen bağlantıyı kurar. Gevşek somun ısınır ve yanar.'],
        ['Besleme kablosu', 'L1-L2-L3 fazları U1-V1-W1’e, koruma iletkeni (PE, yeşil-sarı; modelde yeşil) topraklama vidasına bağlanır. İki fazın yeri değişince motor ters döner.']
      ],
      kamera: { yon: [1.15, 0.6, 1.1], patlak: [1, 0.55, 0.55] },
      secimdeOdak: true,
      yeni: () => ({ calisiyor: false, ucgen: false, ters: false, teta: 0, hiz: 0, aci: 0 }),
      dugmeler: (s) => [
        ['calis', s.calisiyor ? 'Durdur' : 'Çalıştır', s.calisiyor],
        ['baglanti', s.ucgen ? 'Bağlantı: üçgen (Δ)' : 'Bağlantı: yıldız (Y)', s.ucgen],
        ['yon', s.ters ? 'Yön: ters (L1 ↔ L2)' : 'Yön: ileri', s.ters]
      ],
      olay(s, olay) {
        if (olay === 'calis') s.calisiyor = !s.calisiyor;
        else if (olay === 'baglanti') s.ucgen = !s.ucgen;
        else if (olay === 'yon') s.ters = !s.ters;
      },
      tik(s, dt) {
        const hedef = s.calisiyor ? (s.ters ? -1 : 1) : 0, once = s.hiz;
        s.hiz += (hedef - s.hiz) * Math.min(1, dt * 1.6);
        if (Math.abs(hedef - s.hiz) < 0.003) s.hiz = hedef;
        if (s.calisiyor) s.teta += dt * TUR * FE;
        s.aci += (dt * TUR * FE * (1 - KAYMA) * s.hiz) / 2;   // 4 kutup: mekanik hız = elektriksel ÷ 2
        return s.calisiyor || s.hiz !== 0 || once !== s.hiz;
      },
      durum(s) {
        const b = s.ucgen
          ? 'Üçgen (Δ): köprüler dikey (U1-W2, V1-U2, W1-V2); her sargıya şebeke gerilimi (400 V) düşer.'
          : 'Yıldız (Y): köprüler alt sıradaki W2-U2-V2’yi birleştirir; her sargıya 400 V ÷ √3 ≈ 230 V düşer.';
        const y = s.ters ? ' L1 ile L2 yer değiştirdi: döner alan ve rotor ters yönde.' : '';
        if (!s.calisiyor) return { metin: `${b} Motor ${s.hiz !== 0 ? 'duruyor (rotor yavaşlıyor)' : 'duruyor'}.${y}` };
        return { metin: `${b} Döner alan 4 kutupta 50 Hz’de 1.500 d/dk; rotor biraz geriden döner (yükte tipik 1.400–1.450 d/dk), fark kaymadır. Gösterim yavaşlatıldı, kayma abartıldı.${y}` };
      },

      kur(y) {
        const T = y.T;
        const kok = new T.Group();
        const grup = (...n) => { const g = new T.Group(); n.forEach((x) => g.add(x)); return g; };
        const yer = (n, x, yy, z) => { n.position.set(x, yy, z); return n; };
        const kutu = (w, h, d, m, x, yy, z, sec) => yer(y.ag(new T.BoxGeometry(w, h, d), m, sec), x, yy, z);
        const kutupsal = (r, a) => new T.Vector2(r * Math.cos(a), r * Math.sin(a));
        const ayna = (p) => p.map(([r, z, k]) => [r, -z, k]).reverse();   // profili z = 0’a göre aynala (yön korunur)
        const dikdortgenYol = (noktalar) => { const p = new T.Path(); noktalar.forEach(([a, b], i) => (i ? p.lineTo(a, b) : p.moveTo(a, b))); p.closePath(); return p; };
        /* Birbirine değen parçalar arasında 0,05 mm boşluk vardır (kesitte z-fighting olmasın). */

        /* ---- gövde: kanatlı boru (iç çap 124), ayaklar, klemens kutusu yuvası ---- */
        const kanatlar = [];
        for (let k = 0; k < 36; k++) { const a = k * 10; if (Math.abs(a - 90) > 30 && Math.abs(a - 270) > 30) kanatlar.push(a * DER); }
        const cevre = [];
        kanatlar.forEach((f, i) => {
          const w = 1.5, bas = f + w / 70, son = (i + 1 < kanatlar.length ? kanatlar[i + 1] : kanatlar[0] + TUR) - w / 70;
          cevre.push(kutupsal(70, f - w / 70), kutupsal(80, f - w / 80), kutupsal(80, f + w / 80), kutupsal(70, bas));
          const n = Math.max(1, Math.round((son - bas) / (2.5 * DER)));
          for (let j = 1; j < n; j++) cevre.push(kutupsal(70, bas + ((son - bas) * j) / n));
        });
        const govdeSekli = new T.Shape(cevre);
        govdeSekli.holes.push(new T.Path().absarc(0, 0, 62, 0, TUR, true));
        const ayakSekli = new T.Shape([new T.Vector2(-70, -80), new T.Vector2(70, -80), new T.Vector2(70, -72), new T.Vector2(46, -72)]
          .concat(Array.from({ length: 17 }, (_, i) => { const a = -Math.acos(46 / 66) - (i / 16) * (Math.PI - 2 * Math.acos(46 / 66)); return kutupsal(66, a); }))
          .concat([new T.Vector2(-46, -72), new T.Vector2(-70, -72)]));
        const yuvaSekli = new T.Shape([new T.Vector2(42, 72), new T.Vector2(-42, 72)]
          .concat(Array.from({ length: 17 }, (_, i) => { const a = Math.PI - Math.acos(42 / 66) - (i / 16) * (Math.PI - 2 * Math.acos(42 / 66)); return kutupsal(66, a); })));
        const kutuHalka = y.yuvarlakDikdortgen(84, 70, 4);
        kutuHalka.holes.push(y.yuvarlakDikdortgen(78, 64, 2));
        const delikGeo = y.silindir(5, 0.1, 24).rotateX(Math.PI / 2);
        const govde = grup(
          y.ag(y.cek(govdeSekli, 130), 'aluminyum', { esik: 60 }),
          yer(y.ag(y.cek(ayakSekli, 24), 'aluminyum', { esik: 60 }), 0, 0, 50),
          yer(y.ag(y.cek(ayakSekli, 24), 'aluminyum', { esik: 60 }), 0, 0, -50),
          yer(y.ag(y.cek(yuvaSekli, 70), 'aluminyum', { esik: 60 }), 0, 0, 0),
          yer(y.ag(y.cek(kutuHalka, 34).rotateX(-Math.PI / 2), 'aluminyum'), 0, 89, 0),
          ...[[-62.5, 50], [62.5, 50], [-62.5, -50], [62.5, -50]].map(([x, z]) => yer(y.ag(delikGeo, 'entegre', { kenar: false }), x, -71.9, z))   // ayak delikleri (gösterim)
        );

        /* ---- stator: 36 oluklu sac paket (delik Ø76), oluk iletkenleri ve sargı başları ---- */
        const statorSekli = new T.Shape().absarc(0, 0, 61.95, 0, TUR, false);
        const bosluk = new T.Path();
        for (let i = 0; i < OLUK; i++) {
          const a = ((i + 0.5) * TUR) / OLUK;
          [[38, a - 2.41 * DER], [50, a - 2.75 * DER], [50, a + 2.75 * DER], [38, a + 2.41 * DER]].forEach(([r, b], j) => { const v = kutupsal(r, b); if (i || j) bosluk.lineTo(v.x, v.y); else bosluk.moveTo(v.x, v.y); });
        }
        bosluk.closePath();
        statorSekli.holes.push(bosluk);
        const stator = grup(y.ag(y.cek(statorSekli, 80), 'sac', { esik: 60 }));
        const olukGeo = new T.BoxGeometry(2.8, 10.5, 82);
        const bakir = y.malzeme('bakir');
        const olukAglar = Array.from({ length: OLUK }, (_, i) => {
          const a = ((i + 0.5) * TUR) / OLUK, m = y.ag(olukGeo, bakir.clone(), { kenar: false });   // her oluk kendi malzemesiyle (akıma göre renklenir)
          m.position.set(44.25 * Math.cos(a), 44.25 * Math.sin(a), 0);
          m.rotation.z = a - Math.PI / 2;
          return m;
        });
        const basProfil = [[40.5, 40.05], [56.5, 40.05, 1], [57, 44, 1], [55, 57, 1], [52, 58.5, 1], [45, 58.5, 1], [42, 57, 1], [40, 44, 1], [40.5, 40.05]];
        /* Sargı başları 12 faz kuşağına bölünür (her biri 30°, 3 oluk); oluklar gibi akıma göre renklenir. */
        const basAglar = [];
        [basProfil, ayna(basProfil)].forEach((pr) => { for (let b = 0; b < 12; b++) basAglar.push(y.ag(y.torna(pr, 6, (b * TUR) / 12, TUR / 12), bakir.clone(), { esik: 50 })); });
        const sargi = grup(...olukAglar, ...basAglar);
        const renkBakir = bakir.color.clone(), renkArti = y.malzeme('kuzey').color.clone(), renkEksi = y.malzeme('guney').color.clone();

        /* ---- rotor: sac paket, eğik alüminyum çubuklar, kısa devre halkaları ---- */
        const rotor = grup(y.ag(y.halka(12.05, 37.65, 80), 'sac', { esik: 60 }));
        const cubukGeo = new T.BoxGeometry(3, 6, 81), egim = Math.atan((33 * TUR) / CUBUK / 80);
        const kafes = grup(...Array.from({ length: CUBUK }, (_, i) => {
          const a = (i * TUR) / CUBUK, m = y.ag(cubukGeo, 'aluminyum', { kenar: false });
          m.position.set(33 * Math.cos(a), 33 * Math.sin(a), 0);
          m.rotation.set(0, egim, a - Math.PI / 2, 'ZYX');   // önce radyal eksen etrafında eğ, sonra yerine döndür
          return m;
        }));
        const halkaGeo = y.halka(26, 37.5, 7.95), kanatcikGeo = new T.BoxGeometry(2, 9, 5.95);
        [1, -1].forEach((d) => {
          kafes.add(yer(y.ag(halkaGeo, 'aluminyum', { esik: 60 }), 0, 0, d * 44.025));
          for (let k = 0; k < 6; k++) {
            const a = (k * TUR) / 6, m = y.ag(kanatcikGeo, 'aluminyum', { kenar: false });
            m.position.set(31.5 * Math.cos(a), 31.5 * Math.sin(a), d * 51.025);
            m.rotation.z = a - Math.PI / 2;
            kafes.add(m);
          }
        });

        /* ---- mil (Ø19 çıkış, kama 6 × 6) ve rulmanlar (6204) ---- */
        const mil = grup(
          y.ag(y.torna([[0, -95], [9, -95, 1], [9, -77, 1], [9.95, -77, 1], [9.95, -60, 1], [12, -60, 1], [12, 60, 1], [9.95, 60, 1], [9.95, 77, 1], [9.5, 77, 1], [9.5, 117.5, 1], [9, 118, 1], [0, 118]], 40), 'celik', { esik: 50 }),
          kutu(6, 6, 32, 'celik', 0, 8, 100)
        );
        const rulmanlar = grup(yer(y.rulman(10, 23.5, 14), 0, 0, 69), yer(y.rulman(10, 23.5, 14), 0, 0, -69));

        /* ---- yatak kapakları ---- */
        const kapakProfil = [[23.55, 58], [30, 58, 1], [30, 65.05, 1], [70, 65.05, 1], [70, 71, 1], [30, 71, 1], [30, 78, 1], [11, 78, 1], [11, 76.05, 1], [23.55, 76.05, 1], [23.55, 58]];
        const onKapak = grup(y.ag(y.torna(kapakProfil, 64), 'aluminyum', { esik: 50 }));
        const arkaKapak = grup(y.ag(y.torna(ayna(kapakProfil), 64), 'aluminyum', { esik: 50 }));
        [45, 135, 225, 315].forEach((a) => onKapak.add(yer(y.ag(y.silindir(3.5, 3, 6), 'celik'), 64 * Math.cos(a * DER), 64 * Math.sin(a * DER), 72.55)));

        /* ---- fan ve fan kapağı ---- */
        const kanatGeo = new T.BoxGeometry(2.5, 40, 11.9);
        const fan = grup(yer(y.ag(y.halka(9.05, 15, 12), 'plastik'), 0, 0, -86), ...Array.from({ length: 10 }, (_, k) => {
          const a = (k * TUR) / 10, m = y.ag(kanatGeo, 'plastik');
          m.position.set(35.05 * Math.cos(a), 35.05 * Math.sin(a), -86);
          m.rotation.z = a - Math.PI / 2;
          return m;
        }));
        const izgara = new T.Shape().absarc(0, 0, 72, 0, TUR, false);
        for (let k = 0; k < 12; k++) {
          const a = (k * TUR) / 12, c = Math.cos(a), s = Math.sin(a), yarim = 4;
          izgara.holes.push(dikdortgenYol([[22, -yarim], [62, -yarim], [62, yarim], [22, yarim]].map(([u, v]) => [u * c - v * s, u * s + v * c])));
        }
        const fanKapagi = grup(yer(y.ag(y.halka(70.5, 72, 31.95), 'sac', { esik: 60 }), 0, 0, -83.975), yer(y.ag(y.cek(izgara, 1.5), 'sac'), 0, 0, -100.75));

        /* ---- klemens kutusu: kapak, tabla, saplamalar, köprüler, kablo ---- */
        const kutuKapagi = grup(yer(y.ag(y.cek(y.yuvarlakDikdortgen(84, 70, 4), 3.95, { pah: 0.8 }).rotateX(-Math.PI / 2), 'aluminyum'), 0, 108.025, 0),
          ...[[-36, -29], [36, -29], [-36, 29], [36, 29]].map(([x, z]) => yer(y.ag(y.silindir(2.6, 1.5, 12).rotateX(Math.PI / 2), 'celik'), x, 110.8, z)));
        const saplamaGeo = y.silindir(2.5, 14.5, 16).rotateX(Math.PI / 2), somunGeo = new T.CylinderGeometry(4.6, 4.6, 3, 6);
        const kopruGeo = new T.BoxGeometry(26, 1.45, 7);
        const kopruler = [0, 1, 2].map(() => y.ag(kopruGeo, 'bakir', { esik: 60 }));
        const tabla = grup(kutu(60, 5.95, 40, 'plastik', 0, 75.025, 0), ...kopruler,
          yer(y.ag(y.silindir(2.5, 6, 12).rotateX(Math.PI / 2), 'celik'), 30, 75, -26));   // topraklama vidası
        X.forEach((x) => [10, -10].forEach((z) => tabla.add(
          yer(y.ag(saplamaGeo, 'celik', { esik: 60 }), x, 84.75, z),
          yer(y.ag(somunGeo, 'celik'), x, 79.55, z),
          yer(y.ag(somunGeo, 'celik'), x, 85.65, z))));

        const tel = (m, x0, uc) => y.ag(y.boru([[42, 90, x0], [30, 92, x0 + 1], [uc[0] + 5, 94, uc[1] - 1], [uc[0] + 4, 88.6, uc[1]]], 1.4, 24), m, { kenar: false });   // uç somunun üstünde, saplamanın yanında
        const telL1 = tel('kabloKahve', -3, [X[0], 10]), telL1ters = tel('kabloKahve', -3, [X[1], 10]);
        const telL2 = tel('kabloSiyah', 0, [X[1], 10]), telL2ters = tel('kabloSiyah', 0, [X[0], 10]);
        const kablo = grup(
          yer(y.ag(y.silindir(8, 12, 24).rotateY(Math.PI / 2), 'plastik'), 48.05, 90, 0),
          y.ag(y.boru([[48, 90, 0], [62, 90, 0], [76, 82, 0], [82, 62, 0]], 5, 32), 'kabloSiyah', { kenar: false }),
          telL1, telL1ters, telL2, telL2ters, tel('kabloGri', 3, [X[2], 10]),
          y.ag(y.boru([[42, 90, 1], [36, 86, -12], [31, 79, -24], [30, 78.2, -26]], 1.2, 16), 'kabloYesil', { kenar: false })
        );

        const parcalar = [
          { nesne: govde, isaret: [75, 0, 65], patlat: [0, 0, 0] },
          { nesne: stator, isaret: [0, 59.5, 40], patlat: [0, 0, 0] },
          { nesne: sargi, isaret: [0, 48.5, 58.5], patlat: [0, 0, 0] },
          { nesne: rotor, isaret: [0, 37.65, 0], patlat: [0, 190, 0] },
          { nesne: kafes, isaret: [0, 32, 48], patlat: [0, 190, 0] },
          { nesne: mil, isaret: [0, 0, 118], patlat: [0, 190, 0] },
          { nesne: rulmanlar, isaret: [0, 21.5, 76], patlat: [0, 190, 0] },
          { nesne: onKapak, isaret: [35, -35, 71], patlat: [0, 0, 45] },
          { nesne: arkaKapak, isaret: [49.5, -49.5, -68], patlat: [0, 0, -45] },
          { nesne: fan, isaret: [40, 0, -80.05], patlat: [0, 190, 0] },
          { nesne: fanKapagi, isaret: [50.9, -50.9, -85], patlat: [0, 0, -75] },
          { nesne: kutuKapagi, isaret: [20, 110, 20], patlat: [0, 30, 0] },
          { nesne: tabla, isaret: [-26, 78, 0], patlat: [0, 14, 0] },
          { nesne: kablo, isaret: [54.05, 90, 6.5], patlat: [12, 14, 0] }
        ];
        parcalar.forEach((p) => kok.add(p.nesne));

        const etiketYerleri = [...X.map((x) => ({ nesne: tabla, konum: [x, 95, 17], parca: 12 })), ...X.map((x) => ({ nesne: tabla, konum: [x, 95, -17], parca: 12 }))];

        return {
          kok,
          parcalar,
          etiketYerleri,
          uygula(s) {
            [rotor, kafes, mil, fan].forEach((g) => { g.rotation.z = s.aci; });
            /* Oluk akımları: faz k’nın akımı sin(θ − k·120°). Yön ters: V ile W’nin akımı yer değiştirir. Malzeme burada okunur. */
            const akim = (kusak) => {
              const [k, isaret] = KUSAK[kusak % 6], faz = s.ters ? [0, 2, 1][k] : k;
              return s.calisiyor ? isaret * Math.sin(s.teta - (faz * TUR) / 3) : 0;
            };
            const boya = (m, v) => m.material.color.copy(renkBakir).lerp(v > 0 ? renkArti : renkEksi, Math.min(1, Math.abs(v)) * 0.95);
            olukAglar.forEach((m, i) => boya(m, akim(Math.floor(i / 3))));
            basAglar.forEach((m, i) => boya(m, akim(i % 12)));
            if (s.ucgen) {
              kopruler.forEach((k, i) => { k.visible = true; k.position.set(X[i], 81.85, 0); k.rotation.y = Math.PI / 2; });
            } else {
              kopruler[0].position.set(-9, 81.85, -10); kopruler[1].position.set(9, 83.35, -10);
              kopruler.forEach((k, i) => { k.rotation.y = 0; k.visible = i < 2; });
            }
            telL1.visible = telL2.visible = !s.ters;
            telL1ters.visible = telL2ters.visible = s.ters;
          }
        };
      }
    }
  });
})();
