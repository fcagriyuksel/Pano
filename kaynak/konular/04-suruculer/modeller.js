/* Sürücüler: 3B modeller. Ölçüler mm; sürücü panoya tabanıyla bağlanır (z = 0 pano yüzü, +z öne),
   uzun kenarı dikey (y), klemensler sağ yandadır (+x). */
(() => {
  const ACIK = (b) => (b ? 'ON' : 'OFF');
  const grupYaz = (d, a, b) => d.slice(a, b).map(ACIK).join(' ');
  /* Etiket sırası: 6 sinyal ucu, 6 güç ve motor ucu, 3 DIP grubu, 2 LED. kur() içindeki etiketYerleri aynı sırada. */
  const SINYAL = ['PUL+', 'PUL−', 'DIR+', 'DIR−', 'ENA+', 'ENA−'], GUC = ['+V', 'GND', 'A+', 'A−', 'B+', 'B−'];

  Object.assign(MODELLER, {
    'step-surucu': {
      aciklama: 'Step sürücünün 3B modeli: soğutucu taban, kapak, sinyal ve güç klemensleri, DIP anahtarları, LED’ler, ana kart, optokuplörler, denetleyici, MOSFET köprüleri ve kondansatörler.',
      not: 'Bir klemense dokun: kamera yaklaşır, uçların adları çıkar; bir ada dokununca oraya ne bağlanacağı yazar. DIP ayarını enerji varken değiştirip ne olduğuna bak. Örnek, DM542 tipi genel bir sürücüdür; uç adları ve sırası üreticiye göre değişir.',
      etiketBaslik: 'Klemensler, anahtarlar ve LED’ler',
      etiketler: [
        ['PUL+', 'Darbe girişi (+). Her darbe bir adım ya da mikroadım. Giriş optokuplörlüdür; 5 V dışındaki sinyallerde seri direnç gerekebilir, kataloğa bak.'],
        ['PUL−', 'Darbe girişi (−). NPN çıkışlı PLC’de PUL+ artıya, PUL− PLC çıkışına bağlanır (ortak anot). PNP çıkışta PUL+ çıkışa, PUL− 0 V’a gider (ortak katot).'],
        ['DIR+', 'Yön girişi (+). Seviyesi dönüş yönünü seçer. Yön sinyali, ilk darbeden katalogdaki süre kadar (ör. 5 µs) önce değişmeli.'],
        ['DIR−', 'Yön girişi (−). Bağlantı mantığı PUL− ile aynıdır.'],
        ['ENA+', 'Etkinleştirme girişi (+). Çoğu sürücüde aktif olunca çıkış kesilir, motor serbest kalır; bağlı değilse sürücü çalışır. Mantığı kataloğa göre doğrula.'],
        ['ENA−', 'Etkinleştirme girişi (−).'],
        ['+V', 'DC besleme artı; sürücünün izin verdiği aralıkta (ör. 24–48 V). Ters bağlamak sürücüyü bozar.'],
        ['GND', 'DC besleme eksi (0 V).'],
        ['A+', 'Motorun A sargısının bir ucu.'],
        ['A−', 'A sargısının öbür ucu. A+ ile A− aynı sargının iki ucudur; ölçerek bul.'],
        ['B+', 'Motorun B sargısının bir ucu.'],
        ['B−', 'B sargısının öbür ucu. Motor ters dönerse bir sargının iki ucunu yer değiştir ya da DIR mantığını çevir.'],
        ['SW1–3', 'Çıkış akımı. Motorun faz akımına göre seçilir; hangi konumun hangi akım olduğu sürücünün üstündeki tabloda yazar.'],
        ['SW4', 'Bekleme akımı. Motor durunca akımı düşürür: ısınma azalır, tutma torku düşer.'],
        ['SW5–8', 'Mikroadım: tur başına darbe sayısı. PLC’deki darbe/tur ayarıyla aynı olmalı.'],
        ['PWR', 'Besleme LED’i (yeşil).'],
        ['ALM', 'Alarm LED’i (kırmızı). Yanıp sönme sayısı arıza türünü gösterir (aşırı akım, aşırı ya da düşük gerilim …); tablo sürücünün üstündedir.']
      ],
      parcalar: [
        ['Sinyal klemensi', 'PLC’den gelen darbe (PUL), yön (DIR) ve etkinleştirme (ENA) girişleri. Birçok sürücüde klemens fiş şeklindedir: kabloları sökmeden sürücü değiştirilebilir.'],
        ['Güç ve motor klemensi', '+V ve GND besleme, A± ve B± motor sargıları. Motor kablosunu enerji varken sökme ya da takma: sürücü bozulabilir.'],
        ['DIP anahtarları', 'Akım (SW1–3), bekleme akımı (SW4), mikroadım (SW5–8). Sürücü ayarı açılışta okur: enerjiyi kesip değiştir.'],
        ['LED’ler', 'PWR besleme, ALM alarm.'],
        ['Soğutucu taban', 'Alüminyum taban güç katının ısısını panoya iletir. Metal yüzeye oturmalı; çevresinde hava dolaşmalı.'],
        ['Kapak', 'Kartı korur. Üstündeki tablolar akım ve mikroadım ayarlarını gösterir.'],
        ['Ana kart', 'Denetleyici, optokuplörler ve güç katının bağlantıları bu karttadır.'],
        ['Optokuplörler', 'PLC sinyallerini sürücü devresinden yalıtır. Giriş LED’inin akımı katalogdaki aralıkta olmalı; yüksek gerilimde seri direnç bu akımı sınırlar.'],
        ['Denetleyici', 'Darbeleri sayar; mikroadım için iki sargının akımını sinüs ve kosinüs biçiminde ayarlar.'],
        ['MOSFET köprüleri', 'Her sargı için bir H köprüsü. Akımı hızla açıp kapatarak (PWM) sargı akımını DIP ile seçilen değerde tutar; ısısını tabana verir.'],
        ['Kondansatörler', 'Beslemeyi süzer ve motor yavaşlarken geri bastığı enerjiyi karşılar.']
      ],
      kamera: { yon: [1.5, 0.55, 1] },
      secimdeOdak: true,
      kesitler: [{ ad: 'kapaksız', planlar: [[0, 0, -1, 26]] }, { ad: 'kart altı', planlar: [[0, 0, -1, 11.9]] }],
      yeni: () => ({ enerji: false, ena: false, dip: [true, false, true, false, true, true, false, true], okunan: null }),
      dugmeler: (s) => [
        ['enerji', s.enerji ? 'Enerjiyi kes' : 'Enerji ver', s.enerji],
        ['dip', 'Akım ayarı (SW1–3)'],
        ['ena', s.ena ? 'ENA: aktif' : 'ENA: pasif', s.ena]
      ],
      olay(s, olay) {
        if (olay === 'enerji') { s.enerji = !s.enerji; s.okunan = s.enerji ? s.dip.slice() : null; }
        else if (olay === 'dip') {
          const n = ((s.dip[0] ? 1 : 0) + (s.dip[1] ? 2 : 0) + (s.dip[2] ? 4 : 0) + 1) % 8;
          s.dip[0] = !!(n & 1); s.dip[1] = !!(n & 2); s.dip[2] = !!(n & 4);
        } else if (olay === 'ena') s.ena = !s.ena;
      },
      durum(s) {
        const ayar = `SW1–3: ${grupYaz(s.dip, 0, 3)} · SW4: ${grupYaz(s.dip, 3, 4)} · SW5–8: ${grupYaz(s.dip, 4, 8)}`;
        if (!s.enerji) return { metin: `Enerji yok. ${ayar}. Ayarı enerjisizken değiştir.` };
        if (s.okunan && s.okunan.join() !== s.dip.join()) return { metin: `Anahtar değişti ama sürücü ayarı açılışta okur; hâlâ eski akımla çalışıyor. Enerjiyi kesip yeniden ver. ${ayar}.`, uyari: true };
        if (s.ena) return { metin: 'ENA aktif: çoğu sürücüde çıkış kesilir, motor serbest kalır ve elle çevrilebilir. PWR yanıyor.' };
        return { metin: `Enerji var, PWR yanıyor. Sürücü darbe bekliyor; motor bekleme akımıyla tutuluyor. ${ayar}.` };
      },

      kur(y) {
        const T = y.T, TUR = Math.PI * 2;
        const kok = new T.Group();
        const grup = (...n) => { const g = new T.Group(); n.forEach((x) => g.add(x)); return g; };
        const yer = (n, x, yy, z) => { n.position.set(x, yy, z); return n; };
        const kutu = (w, h, d, m, x, yy, z, sec) => yer(y.ag(new T.BoxGeometry(w, h, d), m, sec), x, yy, z);
        const yuvarlakDikdortgen = y.yuvarlakDikdortgen;
        const dikdortgenDelik = (x0, y0, x1, y1) => new T.Path().moveTo(x0, y0).lineTo(x0, y1).lineTo(x1, y1).lineTo(x1, y0).closePath();
        /* Birbirine değen parçalar arasında 0,05 mm boşluk vardır (kesitte z-fighting olmasın). */

        /* ---- soğutucu taban: bağlantı kulaklı alüminyum plaka ---- */
        const tabanSekli = yuvarlakDikdortgen(75, 130, 3);
        [[28, 61.5], [-28, 61.5], [28, -61.5], [-28, -61.5]].forEach(([x, yy]) => tabanSekli.holes.push(new T.Path().absarc(x, yy, 2.2, 0, TUR, true)));
        const taban = yer(y.ag(y.cek(tabanSekli, 5, { pah: 0.4 }), 'aluminyum'), 0, 0, 2.5);

        /* ---- kapak: üst levha, üç duvar ve açıklıklı sağ panel ---- */
        const SINYAL_Y = 3, GUC_Y = -35, DIP_Y = 33, adim = 5.08;
        const panelSekli = new T.Shape().moveTo(-31, -59).lineTo(-5.05, -59).lineTo(-5.05, 59).lineTo(-31, 59).closePath();   // x = −z (dünya)
        panelSekli.holes.push(dikdortgenDelik(-24.05, SINYAL_Y - 15.3, -11.95, SINYAL_Y + 15.3), dikdortgenDelik(-24.05, GUC_Y - 15.3, -11.95, GUC_Y + 15.3),
          dikdortgenDelik(-23.5, DIP_Y - 11, -14.5, DIP_Y + 11), new T.Path().absarc(-22, 51, 1.8, 0, TUR, true), new T.Path().absarc(-22, 55, 1.8, 0, TUR, true));
        const kapak = grup(
          yer(y.ag(y.cek(yuvarlakDikdortgen(75, 118, 3), 1.95, { pah: 0.4 }), 'plastik'), 0, 0, 32.025),
          kutu(1.5, 118, 25.95, 'plastik', -36.75, 0, 18.025),
          kutu(71.9, 1.5, 25.95, 'plastik', 0, 58.25, 18.025),
          kutu(71.9, 1.5, 25.95, 'plastik', 0, -58.25, 18.025),
          yer(y.ag(new T.ExtrudeGeometry(panelSekli, { depth: 1.5, bevelEnabled: false }).rotateY(Math.PI / 2), 'plastik'), 36, 0, 0),
          kutu(56, 34, 0.1, 'plastikAcik', -2, 30, 33.1, { kenar: false }),    // akım ve mikroadım tabloları (yazısız gösterim)
          kutu(56, 40, 0.1, 'plastikAcik', -2, -20, 33.1, { kenar: false })
        );

        /* ---- klemensler: gövde, vida başları, kablo girişleri ---- */
        const klemens = (yc) => {
          const g = grup(kutu(8.9, 30.5, 12, 'klemens', 42.05, yc, 18));
          const vida = y.silindir(1.55, 1.2, 20), yuva = new T.BoxGeometry(0.5, 2.4, 0.3), giris = new T.BoxGeometry(0.3, 3.4, 3.6);
          for (let i = 0; i < 6; i++) {
            const yy = yc + (2.5 - i) * adim;
            g.add(yer(y.ag(vida, 'celik', { esik: 60 }), 42.5, yy, 24.65), yer(y.ag(yuva, 'entegre', { kenar: false }), 42.5, yy, 25.42), yer(y.ag(giris, 'entegre', { kenar: false }), 46.7, yy, 16));
          }
          return g;
        };
        const sinyal = klemens(SINYAL_Y), guc = klemens(GUC_Y);

        /* ---- DIP anahtarları ve LED’ler ---- */
        const suruguler = [];
        const dip = grup(kutu(3, 21, 8, 'kabloKirmizi', 39.05, DIP_Y, 19));
        for (let j = 0; j < 8; j++) {
          const sg = kutu(1.3, 1.5, 2.6, 'plastikAcik', 41.25, DIP_Y + (3.5 - j) * 2.54, 19, { esik: 60 });   // j = 0: SW1
          dip.add(sg);
          suruguler.push(sg);
        }
        const ledGeo = new T.CylinderGeometry(1.5, 1.5, 2.5, 20).rotateZ(Math.PI / 2);
        const pwr = yer(y.ag(ledGeo, y.malzeme('ledYesil').clone(), { kenar: false }), 38.8, 55, 22);
        const alm = yer(y.ag(ledGeo, y.malzeme('ledKirmizi').clone(), { kenar: false }), 38.8, 51, 22);
        const ledler = grup(pwr, alm);
        const pwrKapali = pwr.material.color.clone(), pwrAcik = new T.Color(0x39e86a);

        /* ---- iç yapı ---- */
        const kart = kutu(70, 112, 1.6, 'kart', 0, 0, 12.8);
        const opto = grup(...[-8, 1, 10].map((yy) => kutu(4.6, 6.4, 3.4, 'plastikAcik', 28, yy, 15.35)));
        const denetleyici = kutu(12, 12, 1.6, 'entegre', 5, 12, 14.45);
        const mosfet = grup();
        [-26, -12].forEach((x) => [-45, -33, -21, -9].forEach((yy) => mosfet.add(kutu(10, 6, 3.95, 'entegre', x, yy, 7.1))));
        const kondansator = grup();
        [-40, -28].forEach((yy) => kondansator.add(yer(y.ag(y.silindir(5, 16, 32), 'kondansator'), 20, yy, 21.65), yer(y.ag(y.silindir(4.6, 0.3, 32), 'celik', { kenar: false }), 20, yy, 29.85)));

        const parcalar = [
          { nesne: sinyal, isaret: [46.6, SINYAL_Y + 15.3, 24.1], patlat: [24, 0, 0] },
          { nesne: guc, isaret: [46.6, GUC_Y + 15.3, 24.1], patlat: [24, 0, 0] },
          { nesne: dip, isaret: [40.6, DIP_Y + 11, 23.1], patlat: [0, 0, 18] },
          { nesne: ledler, isaret: [40.1, 57.5, 22], patlat: [0, 0, 18] },
          { nesne: taban, isaret: [30, 63, 2.55], patlat: [0, 0, 0] },
          { nesne: kapak, isaret: [-20, 20, 33.1], patlat: [0, 0, 44] },
          { nesne: kart, isaret: [-30, 50, 0.85], patlat: [0, 0, 18] },
          { nesne: opto, isaret: [28, 10, 17.1], patlat: [0, 0, 18] },
          { nesne: denetleyici, isaret: [0, 0, 0.85], patlat: [0, 0, 18] },
          { nesne: mosfet, isaret: [-26, -9, 9.1], patlat: [0, 0, 0] },
          { nesne: kondansator, isaret: [20, -40, 30.05], patlat: [0, 0, 18] }
        ];
        parcalar.forEach((p) => kok.add(p.nesne));

        /* Etiketler: klemens uçlarında kablo girişinin hemen önünde; DIP gruplarında ve LED’lerde yanda. */
        const etiketYerleri = [];
        SINYAL.forEach((ad, i) => etiketYerleri.push({ nesne: sinyal, konum: [47.6, SINYAL_Y + (2.5 - i) * adim, 21], parca: 0 }));
        GUC.forEach((ad, i) => etiketYerleri.push({ nesne: guc, konum: [47.6, GUC_Y + (2.5 - i) * adim, 21], parca: 1 }));
        const swY = (j) => DIP_Y + (3.5 - j) * 2.54;   // SW1 en üstte
        [swY(1), swY(3), (swY(5) + swY(6)) / 2].forEach((yy) => etiketYerleri.push({ nesne: dip, konum: [42.5, yy, 24.5], parca: 2 }));
        etiketYerleri.push({ nesne: ledler, konum: [41, 55, 24.5], parca: 3 }, { nesne: ledler, konum: [41, 51, 19.5], parca: 3 });

        return {
          kok,
          parcalar,
          etiketYerleri,
          uygula(s) {
            suruguler.forEach((sg, j) => { sg.position.z = s.dip[j] ? 21.1 : 16.9; });   // ON öne (+z)
            pwr.material.color.copy(s.enerji ? pwrAcik : pwrKapali);
          }
        };
      }
    }
  });
})();
