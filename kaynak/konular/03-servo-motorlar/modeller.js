/* Servo motorlar: 3B modeller. Ölçüler mm; motor ekseni z, mil +z yönünde (öne) çıkar, flanş ön yüzü z = 0. */
(() => {
  const ENKODER_BIT = 17, ENKODER_DARBE = 2 ** ENKODER_BIT;   // 131.072 darbe/tur
  const KUTUP_CIFTI = 5;                                        // 10 kutuplu rotor
  /* 12 oluk / 10 kutup toplu sargı düzeni: diş başına faz ve sarım yönü (A a b B C c a A B b c C). */
  const DUZEN = [['U', 1], ['U', -1], ['V', -1], ['V', 1], ['W', 1], ['W', -1], ['U', -1], ['U', 1], ['V', 1], ['V', -1], ['W', -1], ['W', 1]];
  const FAZ_ACI = { U: 0, V: (-2 * Math.PI) / 3, W: (2 * Math.PI) / 3 };
  const HIZ = 120;   // gösterim hızı, derece/sn
  const derece = (a) => sayi(((a % 360) + 360) % 360, 1);

  Object.assign(MODELLER, {
    'servo-motor': {
      aciklama: 'Frenli AC servo motorun 3B modeli: flanş, gövde, stator ve sargılar, mıknatıslı rotor, rulmanlar, fren, enkoder ve konnektörler.',
      not: 'Sürükleyerek döndür, iki parmakla yakınlaştır. Servo ON olunca fren açılır; “+90° git” ile rotor konuma gider, enkoder sayısı değişir. Dönerken sargılar U, V, W akımına göre kırmızı (N) ve mavi (S) renklenir.',
      parcalar: [
        ['Mil ve kama', 'Ø14 mm mil, 5 mm kama (60 mm flanşlı 400 W sınıfında tipik). Kaplin ya da kasnak kamayla bağlanır. Mile çekiçle vurma: darbe rulmana ve enkodere gider.'],
        ['Ön flanş', '60 mm kare; Ø50 mm merkezleme çıkıntısı ve Ø70 mm çember üzerinde dört Ø5,5 mm delik (tipik). Motorun ısısı flanştan makineye de atılır.'],
        ['Ön rulman', 'Sabit bilyalı rulman. Kasnak ya da dişli kullanılıyorsa katalogdaki izin verilen radyal ve eksenel yüke dikkat et.'],
        ['Gövde', 'Alüminyum gövde statoru taşır ve ısısını dışarı verir. Katalogdaki sürekli tork, motor belirli ölçüde bir alüminyum plakaya bağlıyken verilir; motoru yalıtıp örtme.'],
        ['Stator ve sargılar', 'Silisli sac paket ve üç faz sargı (U, V, W). Bu örnekte 12 dişe sarılmış toplu sargı var; oluk sayısı üreticiye göre değişir.'],
        ['Rotor ve mıknatıslar', 'Çelik göbek üzerinde neodimyum mıknatıslar, 10 kutup (örnek). Aşırı sıcaklık ya da aşırı akım mıknatısı kalıcı olarak zayıflatabilir.'],
        ['Arka rulman', 'Milin arka ucunu taşır. Rulman sesi ve titreşimi enkoder okumasını da bozabilir.'],
        ['Fren (bobin, yay, armatür)', 'Yaylı tutma freni. Enerjisizken yaylar armatürü balataya bastırır, mil kilitlenir. 24 V DC verilince bobin armatürü çeker, fren açılır.'],
        ['Fren diski (balata)', 'Mille birlikte döner. Tutma freni içindir: hareketli yükü durdurmak için kullanılırsa balata aşınır, tutma torku düşer.'],
        ['Enkoder diski', 'Mille birlikte döner. Optik enkoderde ışık diskteki ince yarıklardan geçer; manyetik enkoderler de yaygındır.'],
        ['Enkoder kartı', 'Diskteki izi okuyup konumu sürücüye sayısal olarak gönderir. 17 bit: 131.072 darbe/tur. Tek turlu mutlak enkoder tur içindeki konumu enerji kesilince de bilir; tur sayımı için çoğunlukla pil gerekir.'],
        ['Enkoder kapağı', 'Enkoderi toz ve darbeden korur. Enkoder fabrikada rotora göre ayarlanır; kapağı açma.'],
        ['Güç konnektörü', 'U, V, W ve PE; frenli motorda fren uçları da. U-V-W sırası sürücüdekiyle aynı olmalı: yanlış sırada motor kontrolden çıkar ya da sürücü alarm verir.'],
        ['Enkoder konnektörü', 'Ekranlı kablo kullanılır; ekranı katalogdaki gibi topraklanır. Enkoder kablosunu güç kablosuyla yan yana uzun mesafe taşıma.']
      ],
      kamera: { yon: [1, 0.72, 1.45], patlak: [1, 0.45, 0.3] },
      kesitler: [{ ad: 'çeyrek', planlar: [[-1, 0, 0, 0], [0, -1, 0, 0]] }, { ad: 'enine', planlar: [[0, 0, -1, -30]] }],
      yeni: () => ({ servo: false, fren: 0, aci: 0, hedef: 0, surekli: false }),
      dugmeler: (s) => [
        ['servo', s.servo ? 'Servo OFF' : 'Servo ON', s.servo],
        ['git', '+90° git'],
        ['surekli', s.surekli ? 'Durdur' : 'Sürekli dön', s.surekli]
      ],
      olay(s, olay) {
        if (olay === 'servo') { s.servo = !s.servo; if (!s.servo) { s.surekli = false; s.hedef = s.aci; } }
        else if (olay === 'git' && s.servo) { s.surekli = false; s.hedef = Math.round(s.aci / 90) * 90 + 90; }
        else if (olay === 'surekli' && s.servo) { s.surekli = !s.surekli; if (!s.surekli) s.hedef = s.aci; }
        s.uyari = !s.servo && (olay === 'git' || olay === 'surekli');
      },
      tik(s, dt) {
        let hareket = false;
        const fren = s.servo ? 1 : 0;   // 1: armatür çekili, fren açık
        if (s.fren !== fren) { s.fren = fren > s.fren ? Math.min(1, s.fren + dt * 4) : Math.max(0, s.fren - dt * 4); hareket = true; }
        if (s.servo && s.fren === 1) {
          if (s.surekli) { s.aci += HIZ * dt; s.hedef = s.aci; hareket = true; }
          else if (s.aci !== s.hedef) {
            const fark = s.hedef - s.aci, adim = Math.max(8, Math.min(HIZ * 1.5, Math.abs(fark) * 4)) * dt;
            s.aci = Math.abs(fark) <= adim ? s.hedef : s.aci + Math.sign(fark) * adim;
            hareket = true;
          }
        }
        return hareket;
      },
      durum(s) {
        const sayim = sayi(Math.round(((((s.aci % 360) + 360) % 360) / 360) * ENKODER_DARBE) % ENKODER_DARBE, 0);
        const konum = `Konum ${derece(s.aci)}° · enkoder ${sayim} / ${sayi(ENKODER_DARBE)}`;
        if (s.uyari) return { metin: 'Önce Servo ON: sürücü motoru enerjilemeden fren açılmaz ve motor dönmez.', uyari: true };
        if (!s.servo) return { metin: s.fren > 0 ? 'Servo kapanıyor: fren bobininin enerjisi kesildi, yaylar freni kapatıyor.' : `Servo OFF. Fren kapalı: yaylar balatayı sıkıştırır, mil kilitli. ${konum}.` };
        if (s.fren < 1) return { metin: 'Servo ON: sürücü fren bobinine 24 V verdi, armatür çekiliyor; fren açılınca hareket başlar.' };
        if (s.surekli) return { metin: `${konum} · sürekli dönüyor.` };
        return { metin: `${konum} · ${s.aci === s.hedef ? 'konum tutuluyor (fren açık, motor akımla tutuyor).' : 'hedefe gidiyor.'}` };
      },

      kur(y) {
        const T = y.T, TUR = Math.PI * 2, DER = Math.PI / 180;
        const kok = new T.Group();
        const grup = (...n) => { const g = new T.Group(); n.forEach((x) => g.add(x)); return g; };
        const yer = (n, x, yy, z) => { n.position.set(x, yy, z); return n; };
        const delikli = (sekil, delikler) => { delikler.forEach(([x, yy, r]) => sekil.holes.push(new T.Path().absarc(x, yy, r, 0, TUR, true))); return sekil; };
        const KARE = 60, DEL = 24.75;   // Ø70 çember üzerindeki delikler: 35 / √2
        const flansDelik = [[1, 1], [-1, 1], [-1, -1], [1, -1]].map(([a, b]) => [a * DEL, b * DEL, 2.75]);
        /* Birbirine değen parçalar arasında 0,05 mm boşluk vardır (kesitte z-fighting olmasın). */

        /* ---- ön flanş ve merkezleme ---- */
        const onFlans = grup(
          yer(y.ag(y.cek(delikli(y.pahliKare(KARE, 5), [[0, 0, 16]].concat(flansDelik)), 8, { pah: 0.5 }), 'aluminyum'), 0, 0, -4),
          yer(y.ag(y.halka(16, 25, 2.95, 72), 'aluminyum'), 0, 0, 1.525)
        );
        const onRulman = yer(y.rulman(7.05, 15.95, 6.9), 0, 0, -4);

        /* ---- gövde: kare boru + arka yatak duvarı ---- */
        const govde = grup(
          yer(y.ag(y.cek(delikli(y.pahliKare(KARE, 8), [[0, 0, 26]]), 49.95), 'aluminyum'), 0, 0, -33.025),
          yer(y.ag(y.cek(delikli(y.pahliKare(KARE, 8), [[0, 0, 13]]), 5.95), 'aluminyum'), 0, 0, -61.025)
        );
        const arkaRulman = yer(y.rulman(7.05, 12.95, 5.9), 0, 0, -61);

        /* ---- stator: 12 diş, toplu sargı ---- */
        const statorSekli = new T.Shape().absarc(0, 0, 25.95, 0, TUR, false);
        statorSekli.holes.push(y.kutupluBosluk({ n: 12, rArka: 21, rUc: 16.3, rIc: 15.2, g: 2, uc: 13 * DER }));
        const statorPaket = yer(y.ag(y.cek(statorSekli, 36, { bolum: 72 }), 'sac'), 0, 0, -33);
        const bobinGeo = y.bobin({ gw: 2.05, gh: 18.05, kalinlik: 1.6, uzanti: 2.3, r0: 16.45, derinlik: 3.8 });
        const bakir = y.malzeme('bakir'), renkBakir = bakir.color.clone(), renkN = y.malzeme('kuzey').color.clone(), renkS = y.malzeme('guney').color.clone();
        const bobinler = [];
        const stator = grup(statorPaket);
        for (let k = 0; k < 12; k++) {
          const b = y.ag(bobinGeo, bakir.clone(), { esik: 50 });
          const g = yer(grup(b), 0, 0, -33);
          g.rotation.z = k * (TUR / 12);
          stator.add(g);
          bobinler.push(b);
        }

        /* ---- rotor: çelik göbek + 10 yüzey mıknatısı ---- */
        const rotor = yer(grup(y.ag(y.halka(7.05, 12, 36), 'celik')), 0, 0, -33);
        const mSekli = new T.Shape().absarc(0, 0, 14.55, -17 * DER, 17 * DER, false).absarc(0, 0, 12.05, 17 * DER, -17 * DER, true);
        const mGeo = y.cek(mSekli, 35.9, { bolum: 12 });
        for (let j = 0; j < 10; j++) {
          const m = y.ag(mGeo, j % 2 ? 'guney' : 'kuzey', { esik: 50 });
          m.rotation.z = j * 36 * DER;
          rotor.add(m);
        }

        /* ---- mil ve kama ---- */
        const kx = 2.5, ky = Math.sqrt(7.05 * 7.05 - kx * kx), ka = Math.atan2(ky, kx);
        const kamaSekli = new T.Shape().moveTo(-kx, ky).lineTo(-kx, 9.2).lineTo(kx, 9.2).lineTo(kx, ky).absarc(0, 0, 7.05, ka, Math.PI - ka, false);
        const mil = grup(
          yer(y.ag(y.silindir(7, 116), 'celik'), 0, 0, -28),
          yer(y.ag(y.cek(kamaSekli, 20, { bolum: 8 }), 'celik'), 0, 0, 16),
          yer(new T.Mesh(new T.BoxGeometry(1, 5, 0.2), y.malzeme('vurgu')), 0, -3.2, 30.1)
        );

        /* ---- fren: bobin gövdesi (arkaya açık oluk), bobin, armatür, karşı plaka ---- */
        const armatur = y.ag(y.halka(12, 24, 1.95), 'celik');
        const fren = grup(
          yer(y.ag(y.halka(12, 15.45, 7), 'celik'), 0, 0, -67.6),
          yer(y.ag(y.halka(21.55, 24, 7), 'celik'), 0, 0, -67.6),
          yer(y.ag(y.halka(15.5, 21.5, 1.2), 'celik'), 0, 0, -64.7),
          yer(y.ag(y.halka(15.55, 21.45, 5.6), 'bakir'), 0, 0, -68.15),
          armatur,
          yer(y.ag(y.halka(10, 24, 1.55), 'celik'), 0, 0, -78.325)
        );
        const frenDiski = grup(yer(y.ag(y.halka(9.2, 21.5, 3.05), 'balata'), 0, 0, -75.925), yer(y.ag(y.halka(7.05, 9.15, 3.05), 'celik'), 0, 0, -75.925));

        /* ---- enkoder: yarıklı disk, kart, kapak ---- */
        const enkoderDiski = grup(
          yer(y.ag(y.cek(y.disli({ sayi: 90, rDis: 16, rTaban: 15, rDelik: 9.05, oran: 0.5 }), 0.8, { bolum: 90 }), 'celik', { kenar: false }), 0, 0, -81.2),
          yer(y.ag(y.halka(7.05, 9, 2.4), 'celik'), 0, 0, -80.3)
        );
        const kart = grup(yer(y.ag(y.halka(10, 24, 1.6), 'kart'), 0, 0, -85));
        kart.add(yer(y.ag(new T.BoxGeometry(7, 5, 2.4), 'entegre'), 0, 15.5, -82.95));
        [[-10, -12, 6], [9, -13, 4], [-16, 4, 3]].forEach(([x, yy, a]) => kart.add(yer(y.ag(new T.BoxGeometry(a, a, 1), 'entegre'), x, yy, -86.35)));
        const kapak = grup(
          yer(y.ag(y.cek(delikli(y.pahliKare(KARE, 8), [[0, 0, 26]]), 31.9), 'aluminyum'), 0, 0, -80),
          yer(y.ag(y.cek(y.pahliKare(KARE, 8), 3, { pah: 0.5 }), 'aluminyum'), 0, 0, -97.5)
        );

        /* ---- konnektörler ve kablo çıkışları ---- */
        const konnektor = (z, r, kablo) => grup(
          yer(y.ag(new T.BoxGeometry(r * 2 + 2, 4, r * 2 + 2), 'plastik'), 0, 32.05, z),
          yer(y.ag(new T.CylinderGeometry(r, r, 11, 32), 'plastik'), 0, 39.6, z),
          yer(y.ag(y.halka(r + 0.05, r + 1.2, 3, 32).rotateX(Math.PI / 2), 'celik'), 0, 41, z),
          y.ag(y.boru([[0, 45, z], [0, 50, z - 8], [0, 53, z - 24], [0, 54, z - 44]], kablo), 'kabloSiyah', { kenar: false })
        );
        const guc = konnektor(-42, 7, 3.2), enkoderK = konnektor(-88, 5.5, 2.4);

        const parcalar = [
          { nesne: mil, isaret: [0, 9.25, 16], patlat: [0, 72, 0] },
          { nesne: onFlans, isaret: [-20, 20, 0.05], patlat: [0, 0, 46] },
          { nesne: onRulman, isaret: [10.2, 10.2, 3.5], patlat: [0, 0, 30] },
          { nesne: govde, isaret: [30.05, -10, -30], patlat: [0, -72, 0] },
          { nesne: stator, isaret: [18.35, 18.35, -20], patlat: [0, 0, 0] },
          { nesne: rotor, isaret: [10.3, 10.3, 12], patlat: [0, 72, 0] },
          { nesne: arkaRulman, isaret: [9.1, 9.1, 0], patlat: [0, 0, -22] },
          { nesne: fren, isaret: [16.9, 16.9, -67.6], patlat: [0, 0, -34] },
          { nesne: frenDiski, isaret: [15.2, 15.2, -75.9], patlat: [0, 72, 0] },
          { nesne: enkoderDiski, isaret: [11.3, 11.3, -81.2], patlat: [0, 72, 0] },
          { nesne: kart, isaret: [0, 18.05, -83], patlat: [0, 0, -56] },
          { nesne: kapak, isaret: [30.05, -10, -84], patlat: [0, 0, -80] },
          { nesne: guc, isaret: [7.05, 39, -42], patlat: [0, -72, 0] },
          { nesne: enkoderK, isaret: [5.55, 39, -88], patlat: [0, 0, -80] }
        ];
        parcalar.forEach((p) => kok.add(p.nesne));
        const donen = [mil, rotor, frenDiski, enkoderDiski];

        return {
          kok,
          parcalar,
          uygula(s) {
            donen.forEach((n) => { n.rotation.z = -s.aci * DER; });
            armatur.position.z = -73.4 + 1.2 * s.fren;   // fren kapalı: -73,4 (balataya basar); açık: -72,2 (bobine çekili)
            const enerjili = s.servo && s.fren === 1;
            const te = -s.aci * DER * KUTUP_CIFTI + Math.PI / 2;   // elektriksel açı: akım rotoru 90° önden çeker
            bobinler.forEach((b, k) => {
              if (!enerjili) { b.material.color.copy(renkBakir); return; }
              const [faz, yon] = DUZEN[k], i = Math.cos(te + FAZ_ACI[faz]) * yon;
              b.material.color.copy(renkBakir).lerp(i > 0 ? renkN : renkS, Math.min(1, Math.abs(i) * 1.1));
            });
          }
        };
      }
    }
  });
})();
