/* PLC temelleri: 3B modeller. Ölçüler mm; z = 0 DIN ray yüzü (+z öne), y dikey, x genişlik.
   Genel bir kompakt PLC (DC/DC/DC: 24 V besleme, 24 V giriş, transistör çıkış); uç adları üreticiye göre değişir. */
(() => {
  const P = 5.08;   // klemens adımı
  /* Klemens düzeni: [bloğun sol kenarı x, uç adları]. Üst sıra: besleme ve girişler; alt sıra: sensör beslemesi ve çıkışlar. */
  const BESLEME = [-53, ['L+', 'M', 'PE']], GIRIS = [-35, ['1M', 'I0.0', 'I0.1', 'I0.2', 'I0.3', 'I0.4', 'I0.5', 'I0.6', 'I0.7']];
  const SENSOR = [-53, ['L+ çıkış', 'M çıkış']], CIKIS = [-40, ['3L+', '3M', 'Q0.0', 'Q0.1', 'Q0.2', 'Q0.3', 'Q0.4', 'Q0.5']];
  const ucX = ([x0], i) => x0 + (i + 0.5) * P;
  const bit = (b) => (b ? '1' : '0');
  const girisAciklama = (ad) => ({
    'I0.0': 'Dijital giriş, bit 0. Örnek programda start butonu (NO).',
    'I0.1': 'Dijital giriş, bit 1. Örnek programda stop butonu; NC bağlanır, basılı değilken giriş 1’dir. Kablo koparsa makine durur.'
  }[ad] || 'Dijital giriş, 24 V DC. Sensör ya da buton bağlanır.');
  const cikisAciklama = (ad) => (ad === 'Q0.0' ? 'Dijital çıkış, bit 0. Örnek programda motor kontaktörünü süren ara röle.' : 'Dijital çıkış (transistör), 24 V DC; tipik 0,5 A.');

  Object.assign(MODELLER, {
    'kompakt-plc': {
      aciklama: 'Kompakt PLC’nin 3B modeli: besleme, giriş, çıkış ve sensör beslemesi klemensleri, durum ve G/Ç LED’leri, Ethernet portu, genişleme bağlantısı, CPU ve güç kartları, DIN ray.',
      not: 'Bir klemense dokun: kamera yaklaşır, uç adları çıkar. Start ve Stop’a bas: giriş LED’leri hemen yanar, çıkış LED’i yalnızca RUN’da programın sonucuna göre yanar. Örnek, genel bir kompakt PLC’dir; adlar ve yerleşim üreticiye göre değişir.',
      etiketBaslik: 'Klemensler ve LED’ler',
      etiketler: [
        ['L+', 'CPU beslemesi +24 V DC. AC beslemeli modelde bu uçlar L1 ve N’dir; etiketi okumadan enerji verme.'],
        ['M', 'CPU beslemesi 0 V.'],
        ['PE', 'Topraklama ucu; panonun PE barasına bağlanır.'],
        ['1M', 'Giriş grubunun ortak ucu. PNP sensörde 0 V’a, NPN sensörde +24 V’a bağlanır.'],
        ...GIRIS[1].slice(1).map((ad) => [ad, girisAciklama(ad)]),
        ['L+ çıkış', 'Sensörler için 24 V DC çıkış. Akımı sınırlıdır; çok sensör varsa ayrı güç kaynağı kullan.'],
        ['M çıkış', 'Sensör beslemesinin 0 V’u.'],
        ['3L+', 'Çıkış grubunun beslemesi +24 V. Transistör çıkış bu gerilimi yüke verir.'],
        ['3M', 'Çıkış grubunun 0 V’u; yüklerin dönüşü buraya gelir.'],
        ...CIKIS[1].slice(2).map((ad) => [ad, cikisAciklama(ad)]),
        ['RUN/STOP', 'Çoğu PLC’de yeşil RUN, sarı STOP demektir.'],
        ['ERROR', 'Kırmızı yanıyorsa CPU hatadadır; tanı arabelleğine bak.'],
        ['MAINT', 'Bakım isteği (ör. hafıza kartı, zorlanmış değişken); PLC çalışmaya devam eder.']
      ],
      parcalar: [
        ['Besleme klemensi', 'CPU’nun beslemesi. DC modelde L+ ve M (24 V DC), AC modelde L1 ve N (230 V AC) yazar.'],
        ['Giriş klemensi', 'Buton ve sensörler buraya bağlanır. 1M ortak ucu PNP ya da NPN bağlantıyı belirler.'],
        ['Çıkış klemensi', 'Ara röle, lamba, valf gibi yükler buraya bağlanır. Transistör çıkış yalnızca DC ve düşük akım içindir; büyük yükte ara röle kullan.'],
        ['Sensör beslemesi', 'Az sayıda sensörü beslemek için 24 V çıkış. Çok sensör varsa ayrı güç kaynağı kullan.'],
        ['Durum LED’leri', 'RUN/STOP, ERROR ve MAINT. PLC’nin çalışma durumunu gösterir.'],
        ['G/Ç LED’leri', 'Her giriş ve çıkışın durumu. Arıza bulmada ilk bakılan yer: sinyal nerede kayboluyor?'],
        ['Ethernet portu', 'Programlama ve haberleşme (PROFINET, Modbus TCP gibi). Bilgisayarın IP adresi PLC ile aynı ağda olmalı.'],
        ['Ön kapak', 'Yalıtkan ön kapak ve etiket alanı.'],
        ['Gövde', 'Arka gövde. PLC’nin altında ve üstünde havalandırma için boşluk bırak.'],
        ['Genişleme bağlantısı', 'Sağ yandaki kapağın altında; ek giriş/çıkış ve haberleşme modülleri buradan bağlanır. Modülü enerji varken takma.'],
        ['CPU kartı', 'İşlemci, program hafızası ve saat. Programı tarama çevrimiyle sürekli çalıştırır: girişleri oku, programı işle, çıkışları yaz.'],
        ['Güç kartı', 'Beslemeyi iç gerilimlere çevirir. Giriş ve çıkış devreleri CPU’dan optokuplörle yalıtılır.'],
        ['DIN ray ve klips', 'TS35 raya takılır; klips tornavidayla aşağı çekilince çıkar.']
      ],
      kamera: { yon: [0.45, 0.35, 1], patlak: [1, 0.55, 0.85] },
      secimdeOdak: true,
      kesitler: [{ ad: 'yarım', planlar: [[-1, 0, 0, 0]] }],
      yeni: () => ({ run: true, giris: [false, true, false, false, false, false, false, false], q: [false, false, false, false, false, false], startT: 0, stopT: 0 }),
      dugmeler: (s) => [
        ['run', s.run ? 'STOP’a al' : 'RUN’a al', s.run],
        ['start', 'Start (I0.0)', s.startT > 0],
        ['stop', 'Stop (I0.1)', s.stopT > 0]
      ],
      olay(s, olay) {
        if (olay === 'run') s.run = !s.run;
        else if (olay === 'start') s.startT = 0.6;
        else if (olay === 'stop') s.stopT = 0.6;
      },
      /* Tarama çevrimi (sadeleştirilmiş): girişleri oku → Q0.0 = (I0.0 VEYA Q0.0) VE I0.1 → çıkışları yaz. */
      tik(s, dt) {
        const once = JSON.stringify([s.giris, s.q]);
        s.startT = Math.max(0, s.startT - dt);
        s.stopT = Math.max(0, s.stopT - dt);
        s.giris[0] = s.startT > 0;
        s.giris[1] = !(s.stopT > 0);   // NC stop: basılı değilken 1
        s.q[0] = s.run && (s.giris[0] || s.q[0]) && s.giris[1];
        return s.startT > 0 || s.stopT > 0 || JSON.stringify([s.giris, s.q]) !== once;
      },
      durum(s) {
        if (!s.run) return { metin: `STOP: program çalışmıyor, çıkışlar kapalı. Giriş LED’leri yine de girişi gösterir (I0.0 = ${bit(s.giris[0])}, I0.1 = ${bit(s.giris[1])}).` };
        return { metin: `RUN · I0.0 = ${bit(s.giris[0])}, I0.1 = ${bit(s.giris[1])} → Q0.0 = ${bit(s.q[0])}. Program: Q0.0 = (I0.0 VEYA Q0.0) VE I0.1 (mühürleme).` };
      },

      kur(y) {
        const T = y.T;
        const kok = new T.Group();
        const grup = (...n) => { const g = new T.Group(); n.forEach((x) => g.add(x)); return g; };
        const yer = (n, x, yy, z) => { n.position.set(x, yy, z); return n; };
        const kutu = (w, h, d, m, x, yy, z, sec) => yer(y.ag(new T.BoxGeometry(w, h, d), m, sec), x, yy, z);
        /* Birbirine değen parçalar arasında 0,05 mm boşluk vardır (kesitte z-fighting olmasın). */

        /* ---- gövde: içi boş kutu (arka levha + çevre bandı), ön kapak (ön levha + yükseltilmiş panel) ---- */
        const band = y.yuvarlakDikdortgen(110, 100, 4);
        band.holes.push(y.yuvarlakDikdortgen(106, 96, 2));
        const govde = grup(
          yer(y.ag(y.cek(y.yuvarlakDikdortgen(110, 100, 4), 2), 'plastik'), 0, 0, 2),
          yer(y.ag(y.cek(band, 53.95), 'plastik'), 0, 0, 30.025)
        );
        const onKapak = grup(
          yer(y.ag(y.cek(y.yuvarlakDikdortgen(110, 100, 4), 2), 'plastik'), 0, 0, 58.075),
          yer(y.ag(y.cek(y.yuvarlakDikdortgen(108, 52, 3), 14.9, { pah: 0.6 }), 'plastik'), 0, 0, 66.6),
          kutu(40, 26, 0.1, 'plastikAcik', 22, 0, 74.1, { kenar: false })   // etiket alanı
        );

        /* ---- klemensler: gövde, vida başları (önde), kablo girişleri (üstte ya da altta) ---- */
        const blok = ([x0, adlar], ust) => {
          const n = adlar.length, w = n * P, yc = ust ? 39 : -39, d = ust ? 1 : -1;
          const g = grup(kutu(w - 0.1, 16, 11.9, 'plastikAcik', x0 + w / 2, yc, 65.1));
          const vida = y.silindir(1.6, 1, 20), giris = new T.BoxGeometry(3.4, 0.1, 3.6);
          adlar.forEach((a, i) => {
            const x = x0 + (i + 0.5) * P;
            g.add(yer(y.ag(vida, 'celik', { esik: 60 }), x, yc - d * 3, 71.6), yer(y.ag(giris, 'entegre', { kenar: false }), x, yc + d * 8.05, 66));
          });
          return g;
        };
        const besleme = blok(BESLEME, true), giris = blok(GIRIS, true), sensor = blok(SENSOR, false), cikis = blok(CIKIS, false);

        /* ---- LED’ler (her biri kendi malzemesiyle; uygula renklendirir) ---- */
        const led = (w, h, x, yy) => kutu(w, h, 0.4, y.malzeme('ledYesil').clone(), x, yy, 74.3, { kenar: false });
        const durumLed = [led(5, 2.5, -46, 12), led(5, 2.5, -46, 6), led(5, 2.5, -46, 0)];
        const girisLed = GIRIS[1].slice(1).map((a, i) => led(2.4, 1.6, ucX(GIRIS, i + 1), 22));
        const cikisLed = CIKIS[1].slice(2).map((a, i) => led(2.4, 1.6, ucX(CIKIS, i + 2), -22));
        const durumLedleri = grup(...durumLed), gcLedleri = grup(...girisLed, ...cikisLed);
        const YESIL = new T.Color(0x39e86a), SONUK = new T.Color(0x1f3d29), SARI = new T.Color(0xf0b020), KIRMIZI_S = new T.Color(0x4a1f1f), SARI_S = new T.Color(0x4a3a14);

        /* ---- Ethernet portu (alt yüz), genişleme kapağı (sağ yan) ---- */
        const ethernet = grup(kutu(16, 0.1, 13, 'entegre', 35, -50.1, 30, { kenar: false }), kutu(12, 0.1, 3, 'celik', 35, -50.2, 24, { kenar: false }));
        const genisleme = grup(kutu(0.4, 34, 40, 'plastikAcik', 55.25, 0, 30));

        /* ---- iç kartlar ---- */
        const cpu = grup(kutu(100, 90, 1.6, 'kart', 0, 0, 42), kutu(14, 14, 1.5, 'entegre', -10, 8, 43.6), kutu(10, 6, 1.2, 'entegre', 12, 8, 43.45), kutu(8, 3, 2, 'celik', 12, -8, 43.85));
        const guc = grup(kutu(100, 90, 1.6, 'kart', 0, 0, 12), kutu(18, 14, 10, 'entegre', 25, -20, 17.85), yer(y.ag(y.silindir(5, 14, 28), 'kondansator'), -25, -20, 19.85), yer(y.ag(y.silindir(4, 11, 28), 'kondansator'), -12, -20, 18.35));
        for (let i = 0; i < 4; i++) guc.add(kutu(4.6, 6.4, 3, 'plastikAcik', -35 + i * 9, 25, 14.35));   // optokuplörler

        /* ---- DIN ray ve klips ---- */
        const ray = grup(yer(y.ag(y.dinRay(150), 'aluminyum'), -75, 0, -0.05), kutu(12, 6, 8, 'plastikAcik', 0, -53.05, 4.2));

        const parcalar = [
          { nesne: besleme, isaret: [-53, 47.1, 71.1], patlat: [0, 22, 18] },
          { nesne: giris, isaret: [10.7, 47.1, 71.1], patlat: [0, 22, 18] },
          { nesne: cikis, isaret: [0.6, -47.1, 71.1], patlat: [0, -22, 18] },
          { nesne: sensor, isaret: [-53, -47.1, 71.1], patlat: [0, -22, 18] },
          { nesne: durumLedleri, isaret: [-46, 17, 74.6], patlat: [0, 0, 48] },
          { nesne: gcLedleri, isaret: [10, 22, 74.6], patlat: [0, 0, 48] },
          { nesne: ethernet, isaret: [35, -50.3, 38], patlat: [0, -12, 0] },
          { nesne: onKapak, isaret: [40, 20, 74.2], patlat: [0, 0, 48] },
          { nesne: govde, isaret: [55.05, -30, 30], patlat: [0, 0, 0] },
          { nesne: genisleme, isaret: [55.5, 12, 45], patlat: [22, 0, 0] },
          { nesne: cpu, isaret: [-10, 8, 44.4], patlat: [0, 0, 30] },
          { nesne: guc, isaret: [25, -20, 22.9], patlat: [0, 0, 12] },
          { nesne: ray, isaret: [60, 16, 0.05], patlat: [0, 0, -16] }
        ];
        parcalar.forEach((p) => kok.add(p.nesne));

        /* Etiketler: klemens uçlarının dışında, sıra sıra yukarı-aşağı kaydırılmış (yan yana binmesin). */
        const etiketYerleri = [];
        const ekle = (tanim, nesne, parca, ust, bas = 0) => tanim[1].slice(bas).forEach((a, i) => {
          const j = i + bas, d = ust ? 1 : -1;
          etiketYerleri.push({ nesne, konum: [ucX(tanim, j), d * (49.5 + (j % 2) * 5), 66], parca });
        });
        ekle(BESLEME, besleme, 0, true);
        ekle(GIRIS, giris, 1, true);
        ekle(SENSOR, sensor, 3, false);
        ekle(CIKIS, cikis, 2, false);
        [12, 6, 0].forEach((yy) => etiketYerleri.push({ nesne: durumLedleri, konum: [-34, yy, 75], parca: 4 }));
        /* etiketler listesi sırası: besleme (3), giriş (9), sensör (2), çıkış (8), durum LED’leri (3) */

        return {
          kok,
          parcalar,
          etiketYerleri,
          uygula(s) {
            durumLed[0].material.color.copy(s.run ? YESIL : SARI);
            durumLed[1].material.color.copy(KIRMIZI_S);
            durumLed[2].material.color.copy(SARI_S);
            girisLed.forEach((l, i) => l.material.color.copy(s.giris[i] ? YESIL : SONUK));
            cikisLed.forEach((l, i) => l.material.color.copy(s.q[i] ? YESIL : SONUK));
          }
        };
      }
    }
  });
})();
