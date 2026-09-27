/* Step motorlar: 3B modeller. Ölçüler mm; motor ekseni z, mil +z yönünde (öne) çıkar. */
(() => {
  /* Tam adım (tek faz) sırası: bilgi sayfasındaki A+ → B+ → A− → B− ile aynı. */
  const FAZLAR = [['A', 1, 'A+'], ['B', 1, 'B+'], ['A', -1, 'A−'], ['B', -1, 'B−']];
  const faz = (adim) => FAZLAR[((adim % 4) + 4) % 4];
  const ADIM_ACISI = 1.8;
  const HIZ = 10;   // Çalıştır: adım/sn

  Object.assign(MODELLER, {
    'step-motor': {
      aciklama: 'NEMA 17 hibrit step motorun 3B modeli: kapaklar, stator, sargılar, iki dişli rotor kabı, mıknatıs, mil ve rulmanlar.',
      not: 'Sürükleyerek döndür, iki parmakla yakınlaştır. Bir parçaya ya da numarasına dokununca parça öne çıkar. Enerjili sargılar kırmızı (N) ve mavi (S) görünür; mil ucundaki sarı çizgi dönüşü gösterir.',
      parcalar: [
        ['Ön kapak (flanş)', 'Alüminyum. NEMA 17’de yüz ≈ 42 mm, bağlantı delikleri 31 mm aralıklı (M3). Ortadaki Ø22 mm pilot çıkıntı motoru makinede merkezler.'],
        ['Ön rulman', 'Sabit bilyalı rulman; mil iki rulmanla yataklanır. Rotor ile stator arasındaki hava aralığı çok dardır: aşınmış rulman rotoru statora sürtebilir.'],
        ['Stator paketi', 'İnce silisli saclardan paketlenir, böylece girdap akımı kaybı azalır. Sekiz kutbu vardır; kutup uçlarındaki ince dişler rotor dişleriyle karşılaşır.'],
        ['Sargılar', 'Emaye bakır bobinler. Sekiz kutup sırayla A ve B fazına aittir. Enerjili sargı kutbunu N ya da S yapar; akım yönü değişince kutup da değişir.'],
        ['Rotor kabı (N)', 'Dişli çelik kap, 50 diş. Mıknatısın N yüzüne oturur; bütün dişleri N kutbudur.'],
        ['Kalıcı mıknatıs', 'Eksenel mıknatıslanmış halka. Enerji yokken de rotoru tutar: mil elle çevrilince hissedilen tıkırtı (detent torku) buradan gelir.'],
        ['Rotor kabı (S)', 'N kabıyla aynıdır ama dişleri yarım diş (3,6°) kaydırılmıştır. İki faz ve 50 diş: 360° ÷ (2 × 2 × 50) = 1,8° adım.'],
        ['Mil', 'Ø5 mm çelik mil, ucu çoğunlukla D kesimlidir. Kaplin vidası düz yüzeye oturur, mil kaplinde kaymaz.'],
        ['Arka rulman', 'Milin arka ucunu taşır. Motor hırıltılı ses çıkarıyorsa önce rulmanlardan şüphelen.'],
        ['Arka kapak', 'Arka rulmanı ve kablo çıkışını taşır. İki kapak stator paketinin iki yanına oturur.'],
        ['Bağlantı cıvataları', 'Dört uzun cıvata kapakları stator paketiyle birlikte sıkar. Rotoru çıkarmak mıknatısı zayıflatıp torku düşürebilir; üreticiler motoru sökmemeyi önerir.'],
        ['Kablo', 'Dört tel, iki sargı. Renkler üreticiye göre değişir: aynı sargının iki ucu arasında birkaç ohm ölçülür, farklı sargılar arasında devre açıktır.']
      ],
      kamera: { yon: [1, 0.72, 1.55] },
      /* Çeyrek: sağ üst çeyrek kesilir. Enine: z = 4 mm’den önü kesilir; stator kutupları, sargılar ve N kabının dişleri görünür. */
      kesitler: [{ ad: 'çeyrek', planlar: [[-1, 0, 0, 0], [0, -1, 0, 0]] }, { ad: 'enine', planlar: [[0, 0, -1, 4]] }],
      yeni: () => ({ adim: 0, aci: 0, calisiyor: false, yon: 1, sure: 0 }),
      dugmeler: (s) => [['adim', 'Bir adım'], ['calistir', s.calisiyor ? 'Durdur' : 'Çalıştır', s.calisiyor], ['yon', s.yon > 0 ? 'Yön: ileri' : 'Yön: geri']],
      olay(s, olay) {
        if (olay === 'adim') { s.calisiyor = false; s.adim += s.yon; }
        else if (olay === 'calistir') { s.calisiyor = !s.calisiyor; s.sure = 0; }
        else if (olay === 'yon') s.yon = -s.yon;
      },
      tik(s, dt) {
        let hareket = false;
        if (s.calisiyor) {
          s.sure += dt;
          while (s.sure >= 1 / HIZ) { s.sure -= 1 / HIZ; s.adim += s.yon; }
          hareket = true;
        }
        const hedef = s.adim * ADIM_ACISI;
        if (s.aci !== hedef) {
          const fark = hedef - s.aci, adim = dt * 90;
          s.aci = Math.abs(fark) <= adim ? hedef : s.aci + Math.sign(fark) * adim;
          hareket = true;
        }
        return hareket;
      },
      durum(s) {
        const aci = ((s.adim * ADIM_ACISI) % 360 + 360) % 360;
        return { metin: `Adım ${s.adim} · ${sayi(aci, 1)}° · ${faz(s.adim)[2]} fazı enerjili.${s.adim === 0 && !s.calisiyor ? ' Rotor bu konumda tutulur.' : ''}` };
      },

      kur(y) {
        const T = y.T, TUR = Math.PI * 2, DER = Math.PI / 180;
        const kok = new T.Group();
        const grup = (...n) => { const g = new T.Group(); n.forEach((x) => g.add(x)); return g; };
        const yer = (n, x, yy, z) => { n.position.set(x, yy, z); return n; };
        const KARE = 42.3, PAH = 4.5, CIVATA = 15.5;
        const kose = [[1, 1], [-1, 1], [-1, -1], [1, -1]].map(([a, b]) => [a * CIVATA, b * CIVATA]);
        const delikli = (sekil, delikler) => { delikler.forEach(([x, yy, r]) => sekil.holes.push(new T.Path().absarc(x, yy, r, 0, TUR, true))); return sekil; };
        /* r yarıçaplı yayın ara noktaları (uçlar hariç: uç noktalar çağıran tarafça eklenir, tekrar etmez). */
        const yay = (dizi, r, a0, a1, n) => { for (let i = 1; i < n; i++) { const a = a0 + ((a1 - a0) * i) / n; dizi.push(new T.Vector2(r * Math.cos(a), r * Math.sin(a))); } };

        /* ---- stator: 8 kutup, kutup ucunda 5 diş ---- */
        const RB = 17.6, RS = 12.3, RI = 10.45, YG = 2.2, UA = 18 * DER, DP = 7.2 * DER, DD = 0.5;
        const kutupAci = (k) => Math.PI / 2 - k * (Math.PI / 4);   // 1. kutup üstte, numaralar saat yönünde artar
        const aB = Math.asin(YG / RB), aS = Math.asin(YG / RS);
        const kutupal = (r, a) => new T.Vector2(r * Math.cos(a), r * Math.sin(a));
        const bosluk = [];   // statorun iç boşluğu: artan açıyla, kutup kutup dolaşılır
        for (let k = 0; k < 8; k++) {
          const c = Math.PI / 2 + k * (Math.PI / 4);
          const u = [Math.cos(c), Math.sin(c)], v = [-Math.sin(c), Math.cos(c)];
          const nokta = (r, t) => new T.Vector2(r * u[0] + t * v[0], r * u[1] + t * v[1]);
          bosluk.push(nokta(Math.sqrt(RB * RB - YG * YG), -YG), nokta(Math.sqrt(RS * RS - YG * YG), -YG));
          yay(bosluk, RS, c - aS, c - UA, 3);
          bosluk.push(kutupal(RS, c - UA), kutupal(RI + DD, c - UA));
          for (let j = -2; j <= 2; j++) {
            const a = c + j * DP, g = DP * 0.22;
            for (const [aa, r] of [[a - g, RI + DD], [a - g, RI], [a + g, RI], [a + g, RI + DD]]) bosluk.push(kutupal(r, aa));
          }
          bosluk.push(kutupal(RI + DD, c + UA), kutupal(RS, c + UA));
          yay(bosluk, RS, c + UA, c + aS, 3);
          bosluk.push(nokta(Math.sqrt(RS * RS - YG * YG), YG), nokta(Math.sqrt(RB * RB - YG * YG), YG));
          yay(bosluk, RB, c + aB, c + Math.PI / 4 - aB, 6);   // arka demir: sonraki kutba kadar
        }
        const statorSekli = delikli(y.pahliKare(KARE, PAH), kose.map(([x, yy]) => [x, yy, 1.7]));
        statorSekli.holes.push(new T.Path(bosluk));
        const stator = y.ag(y.cek(statorSekli, 24), 'sac');

        /* ---- sargılar: her kutbun gövdesine bir bobin; her bobin kendi malzemesiyle (faza göre renklenir) ---- */
        const bobinSekli = new T.Shape();
        const [bw, bh, br] = [4.6, 14.5, 2];
        bobinSekli.moveTo(-bw + br, -bh).lineTo(bw - br, -bh).quadraticCurveTo(bw, -bh, bw, -bh + br).lineTo(bw, bh - br).quadraticCurveTo(bw, bh, bw - br, bh)
          .lineTo(-bw + br, bh).quadraticCurveTo(-bw, bh, -bw, bh - br).lineTo(-bw, -bh + br).quadraticCurveTo(-bw, -bh, -bw + br, -bh);
        bobinSekli.holes.push(new T.Path().moveTo(-2.25, -12.1).lineTo(-2.25, 12.1).lineTo(2.25, 12.1).lineTo(2.25, -12.1).closePath());
        const bobinGeo = new T.ExtrudeGeometry(bobinSekli, { depth: 3.8, bevelEnabled: true, bevelThickness: 0.3, bevelSize: 0.3, bevelSegments: 2, curveSegments: 6 })
          .rotateX(-Math.PI / 2).translate(0, 12.7, 0);
        const bakir = y.malzeme('bakir'), renkBakir = bakir.color.clone(), renkN = y.malzeme('kuzey').color.clone(), renkS = y.malzeme('guney').color.clone();
        const bobinler = [];
        const sargilar = new T.Group();
        for (let k = 0; k < 8; k++) {
          const b = y.ag(bobinGeo, bakir.clone(), { esik: 50 });
          const g = grup(b);
          g.rotation.z = kutupAci(k) - Math.PI / 2;
          sargilar.add(g);
          bobinler.push(b);
        }

        /* ---- rotor: iki dişli kap (50 diş), aralarında mıknatıs ---- */
        const kapSekli = (kayma) => {
          const n = [], p = TUR / 50;
          for (let i = 0; i < 50; i++) {
            const a = i * p + kayma, g = p * 0.21;
            for (const [aa, r] of [[a - p / 2 + 0.02, 9.6], [a - g, 9.6], [a - g * 0.8, 10.2], [a + g * 0.8, 10.2], [a + g, 9.6]]) n.push(new T.Vector2(r * Math.cos(aa), r * Math.sin(aa)));
          }
          return delikli(new T.Shape(n), [[0, 0, 2.55]]);
        };
        const rotorN = yer(y.ag(y.cek(kapSekli(0), 10), 'kuzey', { esik: 60 }), 0, 0, 7);
        const rotorS = yer(y.ag(y.cek(kapSekli(3.6 * DER), 10), 'guney', { esik: 60 }), 0, 0, -7);
        const miknatis = y.ag(y.halka(2.55, 8.8, 3.9), 'miknatis');

        /* ---- mil: Ø5, ön ucu D kesimli; uçtaki sarı çizgi dönüşü gösterir ---- */
        const dA = Math.acos(2 / 2.5);   // düz yüzey y = 2’de: 0,5 mm derinlik
        const dSekli = new T.Shape().moveTo(-1.5, 2).absarc(0, 0, 2.5, Math.PI / 2 + dA, Math.PI / 2 - dA + TUR, false).lineTo(-1.5, 2);
        const mil = grup(
          yer(y.ag(y.silindir(2.5, 43), 'celik'), 0, 0, 2.5),
          yer(y.ag(y.cek(dSekli, 20, { bolum: 32 }), 'celik'), 0, 0, 34),
          yer(new T.Mesh(new T.BoxGeometry(0.7, 2.2, 0.2), y.malzeme('vurgu')), 0, -1.1, 44.05)
        );

        /* ---- rulmanlar: dış bilezik, iç bilezik, 8 bilye ---- */
        const rulman = (z) => {
          const g = grup(y.ag(y.halka(6.4, 7.95, 4.9), 'celik'), y.ag(y.halka(2.55, 3.9, 4.9), 'celik'));
          const bilye = new T.SphereGeometry(1.2, 16, 12);
          for (let i = 0; i < 8; i++) g.add(yer(y.ag(bilye, 'celik', { kenar: false }), 5.15 * Math.cos((i * TUR) / 8), 5.15 * Math.sin((i * TUR) / 8), 0));
          g.position.z = z;
          return g;
        };
        const onRulman = rulman(17.5), arkaRulman = rulman(-17);

        /* ---- kapaklar ----
           Birbirine değen parçalar arasında 0,05 mm boşluk vardır: aynı düzlemdeki yüzeyler kesit görünümünde titrer (z-fighting). */
        const etek = (z) => yer(y.ag(y.cek(delikli(y.pahliKare(KARE, PAH), [[0, 0, 17.8]].concat(kose.map(([x, yy]) => [x, yy, 1.7]))), 2.9), 'aluminyum'), 0, 0, z);
        const onKapak = grup(
          etek(13.5),
          yer(y.ag(y.cek(delikli(y.pahliKare(KARE, PAH), [[0, 0, 8]].concat(kose.map(([x, yy]) => [x, yy, 1.5]))), 4.9, { pah: 0.4 }), 'aluminyum'), 0, 0, 17.55),
          yer(y.ag(y.halka(8, 11, 1.95), 'aluminyum'), 0, 0, 21.05)
        );
        const arkaKapak = grup(
          etek(-13.5),
          yer(y.ag(y.cek(delikli(y.pahliKare(KARE, PAH), [[0, 0, 8]].concat(kose.map(([x, yy]) => [x, yy, 1.7]))), 4.4), 'aluminyum'), 0, 0, -17.25),
          yer(y.ag(y.cek(delikli(y.pahliKare(KARE, PAH), kose.map(([x, yy]) => [x, yy, 1.7])), 1.4, { pah: 0.4 }), 'aluminyum'), 0, 0, -20.25)
        );

        /* ---- cıvatalar: arkadan geçer, ön kapağa vidalanır ---- */
        const civatalar = new T.Group();
        const govdeGeo = y.silindir(1.4, 38, 16), basGeo = y.silindir(2.6, 2, 24);
        kose.forEach(([x, yy]) => {
          civatalar.add(yer(y.ag(govdeGeo, 'celik', { esik: 60 }), x, yy, -2));
          civatalar.add(yer(y.ag(basGeo, 'celik'), x, yy, -22.05));
        });

        /* ---- kablo: arka kapaktan çıkan dört tel ---- */
        const kablo = grup(yer(y.ag(new T.BoxGeometry(12, 4, 5), 'plastik'), 0, 23.2, -17.5));
        [['kabloSiyah', -3.3], ['kabloYesil', -1.1], ['kabloKirmizi', 1.1], ['kabloMavi', 3.3]].forEach(([m, x]) => {
          kablo.add(y.ag(y.boru([[x, 24.5, -17.5], [x * 1.3, 28, -22], [x * 1.9, 31, -32], [x * 2.6, 33, -44]], 0.65), m, { kenar: false }));
        });

        const parcalar = [
          { nesne: onKapak, isaret: [-15, 12, 20.2], patlat: [0, 0, 34] },
          { nesne: onRulman, isaret: [5.7, 5.7, 0], patlat: [0, 0, 22] },
          { nesne: stator, isaret: [21.2, -8, 4], patlat: [0, 0, 0] },
          { nesne: sargilar, isaret: [-3.5, 15, 14], patlat: [0, 0, 0] },
          { nesne: rotorN, isaret: [-8, 5, 5.05], patlat: [0, 46, 6] },
          { nesne: miknatis, isaret: [8.3, -2.9, 0], patlat: [0, 46, 0] },
          { nesne: rotorS, isaret: [-5, 8.8, 5.05], patlat: [0, 46, -6] },
          { nesne: mil, isaret: [0, 2.05, 40], patlat: [0, 46, 0] },
          { nesne: arkaRulman, isaret: [5.7, 5.7, 0], patlat: [0, 0, -22] },
          { nesne: arkaKapak, isaret: [21.2, -8, -17], patlat: [0, 0, -34] },
          { nesne: civatalar, isaret: [CIVATA + 2.6, CIVATA, -22], patlat: [0, 0, -62] },
          { nesne: kablo, isaret: [6, 25.1, -17.5], patlat: [0, 0, -34] }
        ];
        parcalar.forEach((p) => kok.add(p.nesne));
        const donen = [rotorN, miknatis, rotorS, mil];

        return {
          kok,
          parcalar,
          uygula(s) {
            donen.forEach((n) => { n.rotation.z = -s.aci * DER; });
            const [f, yon] = faz(s.adim);
            bobinler.forEach((b, k) => {
              const bu = (k % 2 === 0 ? 'A' : 'B') === f;
              const kutup = ((k >> 1) % 2 === 0 ? 1 : -1) * yon;
              b.material.color.copy(!bu ? renkBakir : kutup > 0 ? renkN : renkS);
            });
          }
        };
      }
    }
  });
})();
