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

/* Servo sürücü: genel bir 230 V, 400 W sınıfı kitap tipi sürücü. Ölçüler mm; z = 0 pano sacı (+z öne), y yukarı, x genişlik (45).
   Katmanlar arkadan öne: soğutucu, IGBT ve doğrultucu, güç kartı ve kondansatörler, kontrol kartı, ön yüz. Yerleşim üreticiye göre değişir. */
(() => {
  const VDC = 325, VFREN = 380;   // 230 V × √2 ≈ 325 V; fren kıyıcısı eşiği tipik ≈ 380 V (üreticiye göre değişir)
  const GUC = ['L1', 'L2', 'L3', 'P+', 'BR', 'U', 'V', 'W', 'PE'];
  const gucY = (k) => -13.25 - 7.5 * k;
  const KON = [['CN1', -8, 12], ['CN2', 9, 17], ['CN3', -8, 38], ['CN4', 8, 38], ['STO', 9, 3]];   // ad, x, y (ön yüz)

  Object.assign(MODELLER, {
    'servo-surucu': {
      aciklama: 'Servo sürücünün 3B modeli: soğutucu, IGBT modülü, doğrultucu, güç kartı, DC bara kondansatörleri, fren direnci, kontrol kartı, ekran ve tuşlar, konnektörler, güç klemensleri, CHARGE LED’i.',
      not: 'Yan kesit katmanları gösterir: arkada soğutucu, önde kontrol kartı. Ana gücü verip kes: CHARGE LED’i kondansatörler boşalana kadar yanar. Servo ON’dan sonra hızlı yavaşlatıp fren direncine bak. Klemenslere ya da konnektörlere dokununca adları çıkar.',
      etiketBaslik: 'Klemensler ve konnektörler',
      etiketler: [
        ['L1', 'Ana besleme girişi. Tek fazlı beslemede hangi iki ucun kullanılacağı kılavuzda yazar.'],
        ['L2', 'Ana besleme girişi.'],
        ['L3', 'Ana besleme girişi.'],
        ['P+', 'DC bara artı ucu; dış fren direncinin bir ucu buraya. Adlar üreticiye göre değişir.'],
        ['BR', 'Fren kıyıcısı çıkışı; dış fren direncinin öbür ucu. İç direnç köprüsü varsa dış direnç takılınca sökülür.'],
        ['U', 'Motor fazı. Motor kablosundaki U ile aynı uca; yön için faz sırası değiştirilmez, parametre değiştirilir.'],
        ['V', 'Motor fazı.'],
        ['W', 'Motor fazı.'],
        ['PE', 'Motor ve sürücü toprağı. Motor kablosunun PE’si ve ekranı buraya.'],
        ['CN1', 'Kontrol G/Ç: darbe/yön, analog komut, dijital giriş ve çıkışlar (servo ON, alarm, hazır).'],
        ['CN2', 'Enkoder konnektörü. Ekranlı kablo; güç kablosundan ayrı döşenir.'],
        ['CN3', 'Haberleşme girişi (ör. EtherCAT IN ya da RS485).'],
        ['CN4', 'Haberleşme çıkışı; sonraki sürücüye gider (ör. EtherCAT OUT).'],
        ['STO', 'Güvenli tork kesme girişi. Kalıcı köprülenmez; güvenlik rölesi ya da güvenlik PLC’si üzerinden bağlanır.']
      ],
      parcalar: [
        ['Soğutucu', 'IGBT ve doğrultucunun ısısını havaya verir. Kanatlar dikeydir; üstte ve altta montaj boşluğu bırakılmazsa sürücü aşırı sıcaklık alarmı verir. Kulaklardan pano sacına vidalanır.'],
        ['Kapak', 'Yalıtkan plastik. Havalandırma yarıkları kapatılmamalı.'],
        ['Kontrol kartı', 'İşlemci (DSP) ve mantık devresi: enkoderi okur, konum, hız ve akım döngülerini hesaplar, PWM üretir.'],
        ['Ekran ve tuşlar', 'Parametre, izleme ve alarm kodları. Alarmda önce buradaki kodu oku.'],
        ['Konnektörler (CN1–CN4, STO)', 'Kontrol, enkoder, haberleşme ve güvenlik bağlantıları.'],
        ['Güç kartı', 'Ön dolum direnci ve rölesi, akım sensörleri, IGBT sürücüleri. Akım sensörleri motor akımını ölçer.'],
        ['DC bara kondansatörleri', 'Doğrultulmuş gerilimi düzgünleştirir ve enerji depolar. Enerji kesildikten sonra da bir süre yüklü kalır.'],
        ['IGBT modülü', 'Evirici: DC barayı PWM ile anahtarlayıp motora üç faz akım verir. Soğutucuya ısı macunuyla bağlanır.'],
        ['Doğrultucu köprü', 'Şebeke AC’sini DC’ye çevirir.'],
        ['Fren direnci (iç)', 'Yavaşlamada motordan dönen enerjiyi ısıya çevirir. Yetmezse P+ ile BR arasına dış direnç bağlanır.'],
        ['Güç klemensleri', 'Besleme (L1-L2-L3), fren direnci (P+, BR), motor (U-V-W) ve toprak (PE).'],
        ['CHARGE LED’i', 'DC barada tehlikeli gerilim olduğunu gösterir. Sönmeden klemenslere dokunma.']
      ],
      kamera: { yon: [0.55, 0.3, 1.15], patlak: [1, 0.4, 0.9] },
      secimdeOdak: true,
      kesitler: [{ ad: 'yan', planlar: [[-1, 0, 0, 0]] }],
      yeni: () => ({ guc: false, servo: false, vdc: 0, frenT: 0, isi: 0, uyari: '' }),
      dugmeler: (s) => [
        ['guc', s.guc ? 'Ana gücü kes' : 'Ana güç ver', s.guc],
        ['servo', s.servo ? 'Servo OFF' : 'Servo ON', s.servo],
        ['fren', 'Hızlı yavaşla']
      ],
      olay(s, olay) {
        s.uyari = '';
        if (olay === 'guc') s.guc = !s.guc;
        else if (olay === 'servo') { if (s.servo) s.servo = false; else if (s.guc && s.vdc > 290) s.servo = true; else s.uyari = 'guc'; }
        else if (olay === 'fren') { if (s.servo) s.frenT = 2; else s.uyari = 'fren'; }
      },
      tik(s, dt) {
        const once = [s.vdc, s.frenT, s.isi, s.servo].join();
        if (s.frenT > 0) s.frenT = Math.max(0, s.frenT - dt);
        if (!s.guc && s.servo) s.servo = false;   // ana güç kesilince sürücü servoyu kapatır
        if (s.guc) {
          const hedef = s.frenT > 0.4 ? VFREN : VDC;
          s.vdc += (hedef - s.vdc) * Math.min(1, dt * (s.frenT > 0 ? 6 : 2.5));
          if (Math.abs(hedef - s.vdc) < 0.5) s.vdc = hedef;
        } else {
          s.vdc *= Math.exp(-dt / 2.5);   // gösterim: gerçekte boşalma dakikalar sürebilir
          if (s.vdc < 1) s.vdc = 0;
        }
        const isiH = s.frenT > 0.4 ? 1 : 0;
        s.isi += (isiH - s.isi) * Math.min(1, dt * (isiH ? 3 : 0.7));
        if (!isiH && s.isi < 0.01) s.isi = 0;
        return [s.vdc, s.frenT, s.isi, s.servo].join() !== once;
      },
      durum(s) {
        const v = Math.round(s.vdc);
        if (s.uyari === 'guc') return { metin: 'Ana güç yok ya da DC bara dolmadı: Servo ON yapılamaz (sürücü “ana güç yok” uyarısı verir).', uyari: true };
        if (s.uyari === 'fren') return { metin: 'Motor sürülmüyor: önce Servo ON.', uyari: true };
        if (!s.guc && s.vdc > 30) return { metin: `Ana güç kesildi ama DC bara kondansatörleri hâlâ yüklü: ≈ ${v} V. CHARGE LED’i sönmeden ve etiketteki süre dolmadan klemenslere dokunma.`, uyari: true };
        if (!s.guc) return { metin: 'Sürücü enerjisiz, DC bara boş. Bağlantıdan önce yine de ölçerek doğrula.' };
        if (s.vdc < 300) return { metin: `Ana güç verildi: doğrultucu DC barayı dolduruyor (≈ ${v} V). İlk anda ön dolum direnci akımı sınırlar, sonra röle kapanır.` };
        if (s.frenT > 0) return { metin: `Hızlı yavaşlama: motor jeneratör gibi çalışıyor, DC bara ≈ ${v} V’a çıktı. Fren kıyıcısı fazla enerjiyi fren direncine aktarıyor; direnç ısınıyor.` };
        if (s.servo) return { metin: `Servo ON: IGBT’ler PWM ile U-V-W’ye akım veriyor, motor konumunu tutuyor. DC bara ≈ ${v} V.` };
        return { metin: `Ana güç var: DC bara ≈ ${v} V (230 V × √2), CHARGE LED’i yanıyor. Servo OFF: IGBT’ler kapalı, motor serbest.` };
      },

      kur(y) {
        const T = y.T;
        const kok = new T.Group();
        const grup = (...n) => { const g = new T.Group(); n.forEach((x) => g.add(x)); return g; };
        const yer = (n, x, yy, z) => { n.position.set(x, yy, z); return n; };
        const kutu = (w, h, d, m, x, yy, z, sec) => yer(y.ag(new T.BoxGeometry(w, h, d), m, sec), x, yy, z);
        const koyu = (w, h, x, yy, z) => kutu(w, h, 0.1, 'entegre', x, yy, z, { kenar: false });   // ön yüzdeki koyu yuva
        /* Birbirine değen parçalar arasında 0,05 mm boşluk vardır (kesitte z-fighting olmasın). */

        /* ---- soğutucu: dikey kanatlar (z 0 … 28), taban (28 … 34), montaj kulakları ---- */
        const sogutucu = grup(kutu(45, 170, 6, 'aluminyum', 0, 0, 31),
          ...[-21.5, -14.3, -7.2, 0, 7.2, 14.3, 21.5].map((x) => kutu(2, 170, 27.95, 'aluminyum', x, 0, 13.975, { esik: 60 })),
          ...[1, -1].flatMap((d) => [kutu(24, 10, 2, 'aluminyum', 0, d * 90.05, 29), koyu(6, 5, 0, d * 91, 30.1)]));

        /* ---- kapak: içi boş kabuk ---- */
        const kapak = grup(
          kutu(1.5, 170, 114.4, 'plastikAcik', -21.75, 0, 91.25), kutu(1.5, 170, 114.4, 'plastikAcik', 21.75, 0, 91.25),
          kutu(41.9, 1.5, 114.4, 'plastikAcik', 0, 84.25, 91.25), kutu(41.9, 1.5, 114.4, 'plastikAcik', 0, -84.25, 91.25),
          kutu(45, 170, 1.5, 'plastikAcik', 0, 0, 149.25),
          ...[-60, -40, -20, 0, 20, 40, 60].map((yy) => kutu(0.1, 3, 40, 'entegre', 22.55, yy, 70, { kenar: false }))   // havalandırma yarıkları
        );

        /* ---- IGBT modülü ve doğrultucu (soğutucu tabanında), güç kartı ve üstündekiler ---- */
        const pwmMalzeme = y.malzeme('entegre').clone();
        const igbt = grup(kutu(30, 40, 11.9, 'entegre', 0, 15, 40), kutu(24, 6, 0.1, pwmMalzeme, 0, 22, 46.05, { kenar: false }),
          ...[-10, -6, -2, 2, 6, 10].map((x) => kutu(1, 1, 17.95, 'celik', x, 33, 55, { kenar: false })));
        const dogrultucu = grup(kutu(20, 20, 7.9, 'entegre', 0, -35, 38.05), ...[-6, -2, 2, 6].map((x) => kutu(1, 1, 21.95, 'celik', x, -27, 53, { kenar: false })));
        const gucKarti = grup(kutu(40, 164, 1.6, 'kart', 0, 0, 64.8),
          kutu(10, 12, 14.9, 'plastik', -10, 22, 73.15),                                  // ön dolum rölesi
          kutu(8, 8, 7.9, 'plastik', 10, -20, 69.65), kutu(8, 8, 7.9, 'plastik', 10, -31, 69.65),   // akım sensörleri
          kutu(6, 6, 1.4, 'entegre', 8, 4, 66.35), kutu(6, 6, 1.4, 'entegre', -4, 4, 66.35));    // IGBT sürücüleri
        const kondansatorler = grup(...[-10, 10].flatMap((x) => [yer(y.ag(y.silindir(9, 34.3, 40), 'kondansator', { esik: 60 }), x, 55, 82.8), yer(y.ag(y.silindir(8.5, 0.5, 40), 'celik'), x, 55, 100.25)]));
        const direncAg = kutu(8, 34, 7.9, y.malzeme('plastikAcik').clone(), -12, -40, 69.65);
        const direnc = grup(direncAg);

        /* ---- kontrol kartı (üst yarım), ekran ve tuşlar, konnektörler ---- */
        const kontrol = grup(kutu(40, 85, 1.6, 'kart', 0, 37.5, 136.8),
          kutu(14, 14, 1.4, 'entegre', -8, 20, 135.25), kutu(12, 12, 1.3, 'entegre', -8, 44, 135.3), kutu(5, 3, 1.3, 'celik', 8, 60, 135.3));
        const segmentMalzeme = y.malzeme('ledKirmizi').clone();
        const ekran = grup(kutu(30, 14, 12.9, 'entegre', 0, 70, 144.15), kutu(24, 8, 0.1, segmentMalzeme, 0, 70, 150.7, { kenar: false }),
          ...[-12, -4, 4, 12].map((x) => kutu(6, 4, 2.4, 'plastik', x, 54, 150.3)));
        const konnektor = grup(
          kutu(12, 26, 13.3, 'celik', -8, 12, 144.35), koyu(8, 22, -8, 12, 151.1),
          kutu(10, 14, 13.3, 'celik', 9, 17, 144.35), koyu(7, 10, 9, 17, 151.1),
          kutu(15, 13, 13.3, 'celik', -8, 38, 144.35), koyu(11, 8, -8, 37, 151.1),
          kutu(15, 13, 13.3, 'celik', 8, 38, 144.35), koyu(11, 8, 8, 37, 151.1),
          kutu(10, 7, 13.3, 'klemens', 9, 3, 144.35), koyu(7, 3, 9, 3, 151.1));

        /* ---- güç klemensleri (dikey sıra) ve CHARGE LED’i ---- */
        const klemensler = grup(kutu(12, 67.5, 60, 'plastik', -6, -43.25, 96.65), kutu(16, 67.5, 24.3, 'klemens', -6, -43.25, 138.85));   // karttaki taban ve takılıp çıkan fiş
        GUC.forEach((a, k) => klemensler.add(yer(y.ag(y.silindir(1.8, 1, 16), 'celik'), -6, gucY(k), 151.55), kutu(0.4, 2.6, 0.1, 'entegre', -6, gucY(k), 152.1, { kenar: false }),
          kutu(0.1, 4.5, 4.5, 'entegre', 2.1, gucY(k), 140, { kenar: false })));
        const ledAg = yer(y.ag(y.silindir(1.5, 1, 16), y.malzeme('ledKirmizi').clone(), { kenar: false }), 12, -14, 150.55);
        const led = grup(ledAg);

        const parcalar = [
          { nesne: sogutucu, isaret: [22.5, 60, 14], patlat: [0, 0, -35] },
          { nesne: kapak, isaret: [22.5, 30, 100], patlat: [-80, 0, 20] },
          { nesne: kontrol, isaret: [-19, 60, 137.6], patlat: [0, 0, 40] },
          { nesne: ekran, isaret: [-10, 70, 150.75], patlat: [0, 0, 40] },
          { nesne: konnektor, isaret: [-8, 12, 151.15], patlat: [0, 0, 40] },
          { nesne: gucKarti, isaret: [-19, -70, 65.6], patlat: [0, 0, 0] },
          { nesne: kondansatorler, isaret: [-19, 55, 82.8], patlat: [0, 0, 0] },
          { nesne: igbt, isaret: [-15, 15, 40], patlat: [0, 0, 0] },
          { nesne: dogrultucu, isaret: [-10, -35, 38], patlat: [0, 0, 0] },
          { nesne: direnc, isaret: [-16, -40, 69.65], patlat: [0, 0, 0] },
          { nesne: klemensler, isaret: [-11, -43, 151], patlat: [0, 0, 40] },
          { nesne: led, isaret: [12, -14, 151.05], patlat: [0, 0, 20] }
        ];
        parcalar.forEach((p) => kok.add(p.nesne));

        const etiketYerleri = GUC.map((a, k) => ({ nesne: klemensler, konum: [-18, gucY(k), 151.5], parca: 10 }))
          .concat(KON.map(([a, x, yy]) => ({ nesne: konnektor, konum: [x, yy, 152], parca: 4 })));
        const soguk = direncAg.material.color.clone(), sicak = y.malzeme('kuzey').color.clone();
        const sonuk = new T.Color(0x3a1414), kirmizi = new T.Color(0xff3b2f), pwmRenk = y.malzeme('vurgu').color.clone(), pwmSonuk = pwmMalzeme.color.clone();

        return {
          kok,
          parcalar,
          etiketYerleri,
          uygula(s) {
            /* Malzemeler burada okunur: çalışma zamanı her parçaya kendi kopyasını verir. */
            const dolu = Math.min(1, s.vdc / VDC);
            ledAg.material.color.copy(sonuk).lerp(kirmizi, dolu);
            ekran.children[1].material.color.copy(sonuk).lerp(kirmizi, s.vdc > 150 ? 1 : 0);
            igbt.children[1].material.color.copy(s.servo ? pwmRenk : pwmSonuk);
            direncAg.material.color.copy(soguk).lerp(sicak, 0.85 * s.isi);
          }
        };
      }
    }
  });
})();
