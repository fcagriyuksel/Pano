/* Kontaktör ve röleler: 3B modeller. Ölçüler mm; z = 0 DIN ray yüzü (+z öne), y dikey (+y besleme tarafı), x genişlik.
   Genel bir 3 kutuplu AC kontaktör (yerleşik 1 NO + 1 NC yardımcı kontak); yerleşim üreticiye göre değişir. */
(() => {
  const STROK = 3.95;     // hareketli nüve ve taşıyıcı yolu (nüve kapanınca 0,05 mm kalır)
  const ANA_YOL = 2.95;   // ana kontaklar bu kadar yolda değer; kalan yol (aşırı strok) kontak yayını sıkıştırır
  const KUTUP = [-13.5, 0, 13.5];
  const ON = [[-14, 'A1', 'A2'], [0, '13', '14'], [14, '21', '22']];   // ön yüzdeki klemensler: x, üst, alt

  Object.assign(MODELLER, {
    'kontaktor': {
      aciklama: 'Üç kutuplu kontaktörün 3B modeli: ana ve yardımcı klemensler, bobin, E nüve ve gölge halkası, hareketli nüve, kontak taşıyıcı, yaylar, ana ve yardımcı kontaklar.',
      not: 'Yan kesit orta kutbu ve mıknatıs sistemini gösterir. Bobine gerilim ver: taşıyıcı geriye çekilir, ana kontaklar ve 13-14 kapanır, 21-22 açılır. Gerilimi düşük seçip vınlamayı gör. Bir klemens grubuna dokununca uç adları çıkar.',
      etiketBaslik: 'Klemensler',
      etiketler: [
        ['1/L1', 'Ana kontak, besleme tarafı. Tek numaralar (1, 3, 5) beslemedir.'],
        ['3/L2', 'Ana kontak, besleme tarafı.'],
        ['5/L3', 'Ana kontak, besleme tarafı.'],
        ['2/T1', 'Ana kontak, yük tarafı. Çift numaralar (2, 4, 6) motora ya da termik röleye gider.'],
        ['4/T2', 'Ana kontak, yük tarafı.'],
        ['6/T3', 'Ana kontak, yük tarafı.'],
        ['A1', 'Bobin ucu. Kumanda gerilimi A1-A2 arasına verilir; değeri ve türü bobin etiketinde yazar (ör. 24 V DC, 230 V AC).'],
        ['A2', 'Bobinin öbür ucu; genellikle nötr ya da 0 V tarafı.'],
        ['13', 'Yardımcı NO kontak (13-14). Bobin çekince kapanır; mühürleme ve durum bilgisi için.'],
        ['14', 'Yardımcı NO kontağın öbür ucu.'],
        ['21', 'Yardımcı NC kontak (21-22). Bobin çekince açılır; karşılıklı kilitleme için.'],
        ['22', 'Yardımcı NC kontağın öbür ucu.']
      ],
      parcalar: [
        ['Ana klemensler, besleme (1-3-5)', 'Şebeke ya da motor koruma şalterinden gelen üç faz buraya bağlanır.'],
        ['Ana klemensler, yük (2-4-6)', 'Motora ya da termik röleye gider.'],
        ['Bobin ve yardımcı klemensleri', 'A1-A2 bobin, 13-14 NO, 21-22 NC yardımcı kontak. Kumanda devresi buraya bağlanır.'],
        ['Bobin', 'Kumanda gerilimiyle enerjilenir, nüvede manyetik alan oluşturur. AC bobin, nüve açıkken tutma akımından çok daha fazla akım çeker; gerilim düşük olup nüve kapanmazsa bu akım sürer, bobin ısınıp yanar.'],
        ['Sabit nüve ve gölge halkası', 'İnce saclardan E nüve. AC’de akım sıfırdan geçerken çekme kuvveti düşer; dış bacak uçlarının bir bölümünü saran bakır gölge halkası bu anda da kuvvet sağlar. Halka kırılırsa kontaktör vınlar. Alttaki takozlar çekme darbesini sönümler.'],
        ['Hareketli nüve', 'Bobin çekince sabit nüveye yapışır ve taşıyıcıyı geriye çeker. Kutup yüzleri kirlenirse tam oturmaz, vınlar.'],
        ['Kontak taşıyıcı', 'Bütün kontak köprülerini birlikte hareket ettirir; şemada kontakların kesik çizgiyle bağlanması bu yüzdendir. Öndeki gösterge taşıyıcının konumunu gösterir.'],
        ['Geri dönüş yayları', 'Bobin enerjisi kesilince taşıyıcıyı öne iter, kontaklar ilk konumuna döner.'],
        ['Ana kontaklar', 'Çift kesmeli köprü: her kutupta akım iki noktadan kesilir, ark ikiye bölünür. Kontaklar değdikten sonra taşıyıcı biraz daha ilerler; penceredeki yay sıkışır ve kontak basıncını sağlar. Kontak yüzeyi gümüş alaşımlıdır.'],
        ['Yardımcı kontaklar', 'NO (13-14) bobin çekince kapanır, NC (21-22) açılır. Kumanda akımları içindir (AC-15, DC-13).'],
        ['Gövde (sol yarım)', 'Yalıtkan, ısıya dayanıklı plastik. Alt kenardaki klips tornavidayla aşağı çekilince kontaktör raydan çıkar.'],
        ['Gövde (sağ yarım)', 'Kontaktör sökülüp onarılmaz; kontaklar aşınınca ya da yapışınca kontaktör değiştirilir.'],
        ['DIN ray', 'TS35 × 7,5 ray (EN 60715). Büyük kontaktörler montaj plakasına vidayla bağlanır.']
      ],
      kamera: { yon: [1.05, 0.45, 1], patlak: [1, 0.35, 0.8] },
      secimdeOdak: true,
      kesitler: [{ ad: 'yan', planlar: [[-1, 0, 0, 0]] }],
      yeni: () => ({ bobin: false, dusuk: false, k: 0, t: 0 }),
      dugmeler: (s) => [
        ['bobin', s.bobin ? 'Bobin gerilimini kes' : 'Bobine gerilim ver', s.bobin],
        ['gerilim', s.dusuk ? 'Gerilim: düşük' : 'Gerilim: normal', s.dusuk]
      ],
      olay(s, olay) {
        if (olay === 'bobin') s.bobin = !s.bobin;
        else if (olay === 'gerilim') s.dusuk = !s.dusuk;
      },
      tik(s, dt) {
        s.t += dt;
        const vin = s.bobin && s.dusuk;
        const hedef = !s.bobin ? 0 : vin ? 0.8 + 0.1 * Math.sin(s.t * Math.PI * 2 * 6) : 1;   // vınlama: nüve tam çekemez, titrer (gösterim için yavaş)
        const once = s.k;
        s.k = hedef > s.k ? Math.min(hedef, s.k + dt * 10) : Math.max(hedef, s.k - dt * 8);
        return vin || s.k !== once;
      },
      durum(s) {
        if (s.bobin && s.dusuk) return { metin: 'Bobin gerilimi düşük: hareketli nüve tam çekemiyor, kontaktör vınlıyor. Ana kontaklar titreşir, tam basmaz; ısınır ve yapışabilir. Kontrol: A1-A2 gerilimini çekme anında ölç.', uyari: true };
        if (s.bobin) return { metin: s.k > 0.97 ? 'A1-A2 enerjili: nüve çekti, taşıyıcı geride. Ana kontaklar (1-2, 3-4, 5-6) kapalı, 13-14 kapalı, 21-22 açık.' : 'A1-A2 enerjili: nüve çekiyor…' };
        return { metin: s.k < 0.03 ? 'Bobin enerjisiz: yaylar taşıyıcıyı öne itiyor. Ana kontaklar açık, 13-14 açık, 21-22 kapalı.' : 'Bobin enerjisi kesildi: yaylar taşıyıcıyı öne itiyor…' };
      },

      kur(y) {
        const T = y.T;
        const kok = new T.Group();
        const grup = (...n) => { const g = new T.Group(); n.forEach((x) => g.add(x)); return g; };
        const yer = (n, x, yy, z) => { n.position.set(x, yy, z); return n; };
        const kutu = (w, h, d, m, x, yy, z, sec) => yer(y.ag(new T.BoxGeometry(w, h, d), m, sec), x, yy, z);
        const eksenX = (geo) => geo.rotateY(Math.PI / 2);   // şekil (x = −z, y) → x boyunca çekilmiş geometri
        const profil = (n) => new T.Shape(n.map(([z, yy]) => new T.Vector2(-z, yy)));
        const delik = (a, b) => new T.Path().moveTo(-a, -b).lineTo(a, -b).lineTo(a, b).lineTo(-a, b).closePath();
        /* Birbirine değen parçalar arasında 0,05 mm boşluk vardır (kesitte z-fighting olmasın). */

        /* ---- gövde: iki yarım kabuk (yan levha + çevre bandı), yan profil (z, y) ---- */
        const DIS = [[0, -40], [60, -40], [60, -25], [85, -25], [85, 25], [60, 25], [60, 40], [0, 40]];
        const IC = [[1.5, -38.5], [58.5, -38.5], [58.5, -23.5], [83.5, -23.5], [83.5, 23.5], [58.5, 23.5], [58.5, 38.5], [1.5, 38.5]];
        const levhaGeo = eksenX(new T.ExtrudeGeometry(profil(DIS), { depth: 1.5, bevelEnabled: false }));
        const bant = profil(DIS);
        bant.holes.push(new T.Path(IC.map(([z, yy]) => new T.Vector2(-z, yy))));
        const bantGeo = eksenX(new T.ExtrudeGeometry(bant, { depth: 20.9, bevelEnabled: false }));
        const cerceve = y.yuvarlakDikdortgen(9, 11, 1);
        cerceve.holes.push(delik(2.2, 3.2));
        const govdeSol = grup(yer(y.ag(levhaGeo, 'plastikAcik'), -22.5, 0, 0), yer(y.ag(bantGeo, 'plastikAcik'), -20.95, 0, 0),
          yer(y.ag(y.cek(cerceve, 0.1), 'entegre', { kenar: false }), -7, 0, 85.1));   // gösterge penceresi
        const govdeSag = grup(yer(y.ag(levhaGeo, 'plastikAcik'), 21, 0, 0), yer(y.ag(bantGeo, 'plastikAcik'), 0.05, 0, 0));
        govdeSol.add(kutu(12, 4, 6, 'plastikAcik', 0, -42.05, 3.2));   // DIN ray klipsi (alt kenarda)

        /* ---- klemensler: kafes, vida, kablo girişi. Ana klemensler omuzda (z = 60), bobin ve yardımcılar önde (z = 85). ---- */
        const vida = y.silindir(2.6, 1.4, 24), govdeVida = y.silindir(1.7, 1.85, 16), yuva = new T.BoxGeometry(0.5, 3.6, 0.2), giris = new T.BoxGeometry(6.5, 0.1, 6.5);
        const klemens = (x, yy, z0, uzun, yuz, disY) => [   // kafes z0 … z0 + uzun, vida başı yüzün 0,05 mm önünde
          kutu(8, 6, uzun, 'celik', x, yy, z0 + uzun / 2),
          yer(y.ag(govdeVida, 'celik', { esik: 60 }), x, yy, yuz - 0.975),
          yer(y.ag(vida, 'celik'), x, yy, yuz + 0.75),
          yer(y.ag(yuva, 'entegre', { kenar: false }), x, yy, yuz + 1.6),
          yer(y.ag(giris, 'entegre', { kenar: false }), x, disY, z0 + uzun / 2)
        ];
        const besleme = grup(...KUTUP.flatMap((x) => klemens(x, 34, 48, 10, 60, 40.1)));
        const yuk = grup(...KUTUP.flatMap((x) => klemens(x, -34, 48, 10, 60, -40.1)));
        const onKlemens = grup(...ON.flatMap(([x]) => [...klemens(x, 19, 75, 8, 85, 25.1), ...klemens(x, -19, 75, 8, 85, -25.1)]));

        /* ---- mıknatıs sistemi: sabit E nüve (uçlar ayrı; dış bacak ucunun bir bölümünü gölge halkası sarar), bobin ---- */
        const eSekli = profil([[4, -18], [22, -18], [22, -12], [10, -12], [10, -4], [22, -4], [22, 4], [10, 4], [10, 12], [22, 12], [22, 18], [4, 18]]);
        const sabitNuve = grup(yer(y.ag(eksenX(new T.ExtrudeGeometry(eSekli, { depth: 20, bevelEnabled: false })), 'sac'), -10, 0, 0),
          kutu(20, 8, 3.95, 'sac', 0, 0, 24.025),
          kutu(20, 6, 2.4, 'plastik', 0, 14, 2.75), kutu(20, 6, 2.4, 'plastik', 0, -14, 2.75));   // titreşim sönümleyici takozlar
        const halka = y.yuvarlakDikdortgen(21.8, 4.3, 0.4);
        halka.holes.push(delik(10.05, 1.275));
        [1, -1].forEach((d) => sabitNuve.add(kutu(20, 2.45, 3.95, 'sac', 0, d * 13.225, 24.025), kutu(20, 2.45, 3.95, 'sac', 0, d * 16.775, 24.025),
          yer(y.ag(y.cek(halka, 2), 'bakir', { esik: 60 }), 0, d * 16.775, 24.2)));
        const bobinSekli = y.yuvarlakDikdortgen(30, 22.8, 2);
        bobinSekli.holes.push(delik(10.5, 4.5));
        const bobinAg = y.ag(y.cek(bobinSekli, 15, { pah: 0.4 }), y.malzeme('bakir').clone(), { esik: 50 });
        const bobin = grup(yer(bobinAg, 0, 0, 18),
          y.ag(y.boru([[-14, 16, 76], [-19, 12, 62], [-19.5, 9, 34], [-15, 8, 20]], 0.5, 24), 'kabloKirmizi', { kenar: false }),
          y.ag(y.boru([[-14, -16, 76], [-19, -12, 62], [-19.5, -9, 34], [-15, -8, 20]], 0.5, 24), 'kabloKirmizi', { kenar: false }));
        const renkBakir = bobinAg.material.color.clone(), renkEnerjili = y.malzeme('vurgu').color.clone();

        /* ---- hareketli parçalar: her biri iç grupta; uygula iç grubu kaydırır (kök konumu patlatmaya ait) ---- */
        const armSekli = profil([[30, -18], [32, -18], [32, -12], [30, -12], [30, -4], [32, -4], [32, 4], [30, 4], [30, 12], [32, 12], [32, 18], [38, 18], [38, -18]]);
        const armIc = grup(yer(y.ag(eksenX(new T.ExtrudeGeometry(armSekli, { depth: 20, bevelEnabled: false })), 'sac'), -10, 0, 0));
        const armatur = grup(armIc);

        /* Taşıyıcı: x-z profili y boyunca çekilir; her kutupta köprünün geçtiği pencere (z 61,05 … 68). */
        const tasSekli = new T.Shape().moveTo(-20, 38.05).lineTo(20, 38.05).lineTo(20, 70).lineTo(-20, 70).closePath();
        KUTUP.forEach((x) => tasSekli.holes.push(new T.Path().moveTo(x - 3, 61.05).lineTo(x + 3, 61.05).lineTo(x + 3, 68).lineTo(x - 3, 68).closePath()));
        const tasIc = grup(
          yer(y.ag(new T.ExtrudeGeometry(tasSekli, { depth: 10, bevelEnabled: false }).rotateX(Math.PI / 2), 'plastik'), 0, 5, 0),
          kutu(4, 6, 15.95, 'vurgu', -7, 0, 78.025)   // gösterge: bekler durumda ön yüzden 1 mm çıkar, çekince içeri girer
        );
        const tasiyici = grup(tasIc);
        const donusYayi = [-18.3, 18.3].map((x) => yer(y.ag(y.helis(2, 0.35, 35.75, 10), 'celik', { kenar: false }), x, 0, 1.9));
        const yaylar = grup(...donusYayi);

        /* Ana kontaklar: sabit şeritler ve pabuçlar duran; köprüler ANA_YOL kadar gidip durur, basınç yayları sıkışır. */
        const anaKopru = grup();
        const basincYayi = KUTUP.map((x) => yer(y.ag(y.helis(1.3, 0.3, 4.2, 5), 'celik', { kenar: false }), x, 0, 63.45));
        const anaKontak = grup(anaKopru, ...basincYayi);
        KUTUP.forEach((x) => {
          [1, -1].forEach((d) => anaKontak.add(kutu(5, 19, 2, 'bakir', x, d * 21.5, 55), kutu(5, 4, 0.95, 'celik', x, d * 14, 56.525)));
          anaKopru.add(kutu(5, 32, 2, 'bakir', x, 0, 62.1), kutu(5, 4, 1.05, 'celik', x, 14, 60.525), kutu(5, 4, 1.05, 'celik', x, -14, 60.525));
        });

        /* Yardımcı kontaklar: NO (x = 0) köprüsü önde, sabit kontağı arkada; NC (x = 14) köprüsü arkada, sabit kontağı önde. */
        const yrdKopru = grup(
          kutu(3, 3, 6.05, 'plastik', 0, 0, 73.075), kutu(5, 26, 2, 'bakir', 0, 0, 77.15), kutu(5, 4, 1, 'celik', 0, 11, 75.6), kutu(5, 4, 1, 'celik', 0, -11, 75.6),
          kutu(3, 3, 1.9, 'plastik', 14, 0, 71.0), kutu(5, 26, 2, 'bakir', 14, 0, 73.0), kutu(5, 4, 0.95, 'celik', 14, 11, 74.525), kutu(5, 4, 0.95, 'celik', 14, -11, 74.525)
        );
        const yardimci = grup(yrdKopru);
        [1, -1].forEach((d) => {
          yardimci.add(kutu(5, 9.5, 1.9, 'bakir', 0, d * 13.75, 69.1), kutu(5, 2, 5.4, 'bakir', 0, d * 17.5, 72.8), kutu(5, 4, 1, 'celik', 0, d * 11, 70.6));
          yardimci.add(kutu(5, 8, 1.9, 'bakir', 14, d * 13, 77.05), kutu(5, 4, 1, 'celik', 14, d * 11, 75.55));
        });

        /* ---- DIN ray ---- */
        const ray = grup(yer(y.ag(y.dinRay(80), 'aluminyum'), -40, 0, -0.05));

        const parcalar = [
          { nesne: besleme, isaret: [-12, 34, 61.45], patlat: [0, 16, 0] },
          { nesne: yuk, isaret: [-12, -34, 61.45], patlat: [0, -16, 0] },
          { nesne: onKlemens, isaret: [-12.5, 19, 86.45], patlat: [0, 0, 30] },
          { nesne: bobin, isaret: [-8, 8, 25.5], patlat: [0, 0, 0] },
          { nesne: sabitNuve, isaret: [-5, 0, 26], patlat: [0, 0, -14] },
          { nesne: armatur, isaret: [-5, 18, 35], patlat: [0, 0, 8] },
          { nesne: tasiyici, isaret: [-18, 5, 50], patlat: [0, 0, 16] },
          { nesne: yaylar, isaret: [-18.3, 2.35, 20], patlat: [0, 0, 0] },
          { nesne: anaKontak, isaret: [-13.5, 22, 56], patlat: [0, 0, 16] },
          { nesne: yardimci, isaret: [-1, 18.5, 72], patlat: [0, 0, 16] },
          { nesne: govdeSol, isaret: [-10, 40, 20], patlat: [-34, 0, 0] },
          { nesne: govdeSag, isaret: [22.5, 0, 30], patlat: [30, 0, -120] },
          { nesne: ray, isaret: [30, 15, -0.05], patlat: [0, 0, -16] }
        ];
        parcalar.forEach((p) => kok.add(p.nesne));

        const etiketYerleri = [
          ...KUTUP.map((x) => ({ nesne: besleme, konum: [x, 44, 58], parca: 0 })),
          ...KUTUP.map((x) => ({ nesne: yuk, konum: [x, -44, 58], parca: 1 })),
          ...ON.flatMap(([x]) => [1, -1].map((d) => ({ nesne: onKlemens, konum: [x, d * 28.5, 82], parca: 2 })))
        ];

        return {
          kok,
          parcalar,
          etiketYerleri,
          uygula(s) {
            const c = STROK * s.k, b = Math.min(c, ANA_YOL);
            [armIc, tasIc, yrdKopru].forEach((g) => { g.position.z = -c; });
            anaKopru.position.z = -b;
            basincYayi.forEach((g) => { g.position.z = 63.45 - b; g.scale.z = (4.2 - (c - b)) / 4.2; });
            donusYayi.forEach((g) => { g.scale.z = (35.75 - c) / 35.75; });
            bobinAg.material.color.copy(renkBakir).lerp(renkEnerjili, s.bobin ? 0.45 : 0);
          }
        };
      }
    }
  });
})();

/* Termik röle: kontaktörün altına takılan 3 kutuplu tip. Ölçüler mm; z = 0 arka yüz (+z öne), y yukarı (+y kontaktör tarafı), x genişlik (45).
   İç yerleşim tipiktir; mekanizmanın biçimi üreticiye göre değişir. */
(() => {
  const KUTUP = [-13.5, 0, 13.5];
  const YRD = [[-15, '97'], [-5, '98'], [5, '95'], [15, '96']];   // ön üst klemensler: x, ad (97-98 NO, 95-96 NC)
  const ESIK = 1, FARK = 0.55;   // açma: en sıcak bimetal eşiği; faz kaybında sıcak–soğuk farkı (diferansiyel)

  Object.assign(MODELLER, {
    'termik-role': {
      aciklama: 'Termik rölenin 3B modeli: bağlantı pimleri, yük klemensleri, yardımcı kontak klemensleri, bimetaller ve ısıtıcılar, açma sürgüsü, mandal, yardımcı kontaklar, ayar düğmesi, reset ve test butonları, açma göstergesi, gövde.',
      not: 'Kesit ön kapağı kaldırır. Aşırı yük ya da faz kaybı seç: bimetaller ısınıp eğilir, sürgü mandalı iter, 95-96 açılır ve 97-98 kapanır. Bimetaller soğumadan reset tutmaz. Klemenslere dokununca uç adları çıkar.',
      etiketBaslik: 'Klemensler',
      etiketler: [
        ['1/L1', 'Kontaktörün 2/T1 ucuna takılan pim.'], ['3/L2', 'Kontaktörün 4/T2 ucuna takılan pim.'], ['5/L3', 'Kontaktörün 6/T3 ucuna takılan pim.'],
        ['2/T1', 'Motor ucu.'], ['4/T2', 'Motor ucu.'], ['6/T3', 'Motor ucu.'],
        ['97', 'NO yardımcı kontak (97-98): termik atınca kapanır; arıza lambası ya da PLC girişi.'], ['98', 'NO yardımcı kontağın öbür ucu.'],
        ['95', 'NC yardımcı kontak (95-96): kontaktör bobinine seri bağlanır; termik atınca açılır.'], ['96', 'NC yardımcı kontağın öbür ucu.']
      ],
      parcalar: [
        ['Bağlantı pimleri (1-3-5)', 'Termik doğrudan kontaktörün alt klemenslerine takılır; ayrı montajda bir altlık kullanılır.'],
        ['Yük klemensleri (2-4-6)', 'Motora giden fazlar buradan çıkar.'],
        ['Yardımcı kontak klemensleri', '95-96 NC kumanda devresine, 97-98 NO sinyal devresine bağlanır.'],
        ['Bimetaller ve ısıtıcılar', 'Her fazın akımı bir ısıtıcıdan geçer ve bimetali ısıtır; bimetal akımın karesiyle orantılı ısınıp eğilir. Soğuması zaman alır.'],
        ['Açma sürgüsü', 'Bimetallerin uçları sürgüyü iter. Faz kaybında soğuk kalan bimetal ikinci bir sürgüyü tutar; aradaki fark (diferansiyel) röleyi daha erken açtırır.'],
        ['Açma mandalı', 'Sürgü yeterince ilerleyince mandal boşalır ve yardımcı kontakları çevirir.'],
        ['Yardımcı kontaklar', 'Salıncak kol NC köprüyü açar, NO köprüyü kapatır. Termik yükü kesmez; kontaktörü düşürür.'],
        ['Akım ayar düğmesi', 'Motor etiketindeki anma akımına getirilir. Yıldız-üçgende termik sargı kolundaysa ayar = anma akımı × 0,58.'],
        ['Reset ve test butonları', 'Mavi reset rölesi kurar; soğumadan tutmaz. Kırmızı buton röleyi elle açtırıp kontakları dener.'],
        ['Açma göstergesi', 'Röle atınca turuncu görünür; arıza ararken ilk bakılacak yer.'],
        ['Gövde', 'Yalıtkan plastik.'],
        ['Ön kapak', 'Ayar ve butonlar ön yüzdedir; birçok modelde ayar mühürlenebilir kapakla örtülür.']
      ],
      kamera: { yon: [0.5, 0.4, 1], patlak: [0.7, 0.45, 1] },
      secimdeOdak: true,
      kesitler: [{ ad: 'kapaksız', planlar: [[0, 0, -1, 67]] }],
      yeni: () => ({ yuk: 'normal', isi: [0.3, 0.3, 0.3], atti: false, sebep: '', k: 0, uyari: '' }),
      dugmeler: (s) => [
        ['asiri', 'Aşırı yük', s.yuk === 'asiri'],
        ['faz', 'Faz kaybı', s.yuk === 'faz'],
        ['reset', 'Reset'],
        ['test', 'Test']
      ],
      olay(s, olay) {
        s.uyari = '';
        if (olay === 'asiri') s.yuk = s.yuk === 'asiri' ? 'normal' : 'asiri';
        else if (olay === 'faz') s.yuk = s.yuk === 'faz' ? 'normal' : 'faz';
        else if (olay === 'test') { if (!s.atti) { s.atti = true; s.sebep = 'test'; } }
        else if (olay === 'reset') {
          if (!s.atti) s.uyari = 'kurulu';
          else if (Math.max(...s.isi) > 0.45) s.uyari = 'sicak';
          else { s.atti = false; s.sebep = ''; }
        }
      },
      tik(s, dt) {
        const once = s.isi.join() + s.atti + s.k;
        const hedef = (i) => (s.atti ? 0 : s.yuk === 'asiri' ? 1.25 : s.yuk === 'faz' ? (i === 0 ? 0 : 1.25) : 0.3);   // atınca motor durur, akım kesilir
        s.isi = s.isi.map((v, i) => {
          const h = hedef(i), hiz = h > v ? (s.yuk === 'faz' ? 0.5 : 0.35) : 0.2;   // gösterim: gerçekte dakikalar
          const n = v + (h - v) * Math.min(1, dt * hiz * 2);
          return Math.abs(h - n) < 0.002 ? h : n;
        });
        const enSicak = Math.max(...s.isi), enSoguk = Math.min(...s.isi);
        if (!s.atti && (enSicak >= ESIK || (enSicak >= 0.7 && enSicak - enSoguk >= FARK))) { s.atti = true; s.sebep = enSicak >= ESIK ? 'asiri' : 'faz'; }
        const hk = s.atti ? 1 : 0;
        s.k = hk > s.k ? Math.min(hk, s.k + dt * 10) : Math.max(hk, s.k - dt * 10);
        return s.isi.join() + s.atti + s.k !== once;
      },
      durum(s) {
        const yuzde = Math.round(Math.min(1, Math.max(...s.isi)) * 100);
        if (s.uyari === 'sicak') return { metin: 'Bimetaller henüz soğumadı: reset tutmaz. Biraz bekle; önce aşırı yükün nedenini bul.', uyari: true };
        if (s.uyari === 'kurulu') return { metin: 'Röle zaten kurulu; reset gerekmiyor.' };
        if (s.atti) {
          const neden = s.sebep === 'test' ? 'Test butonu röleyi elle açtırdı.' : s.sebep === 'faz' ? 'Faz kaybı: soğuk kalan bimetal ile ısınanlar arasındaki fark röleyi erken açtırdı.' : 'Aşırı yük: bimetaller eşiğe kadar eğildi.';
          return { metin: `${neden} 95-96 açıldı, kontaktör bobini enerjisiz kaldı ve motor durdu; 97-98 kapandı. Gösterge turuncu.${s.sebep !== 'test' && s.yuk !== 'normal' ? ' Neden sürüyor: reset sonrası yine atar.' : ''}`, uyari: s.sebep !== 'test' };
        }
        if (s.yuk === 'asiri') return { metin: `Aşırı yük (ör. 1,5 × Ir): ısıtıcılar bimetalleri ısıtıyor, bimetaller eğiliyor… %${yuzde}. Sınıf 10 röle 1,5 × Ir’de sıcak durumdan 2 dakikadan kısa sürede açar; gösterim hızlandırıldı.` };
        if (s.yuk === 'faz') return { metin: `Faz kaybı: L1’de akım yok, öbür iki fazın akımı arttı. L1 bimetali soğuyor, ötekiler ısınıyor… %${yuzde}. Diferansiyel mekanizma farkı algılar.` };
        return { metin: 'Motor anma akımında: bimetaller ılık ve biraz eğik, açma eşiğinin altında. 95-96 kapalı (bobin beslenir), 97-98 açık.' };
      },

      kur(y) {
        const T = y.T;
        const kok = new T.Group();
        const grup = (...n) => { const g = new T.Group(); n.forEach((x) => g.add(x)); return g; };
        const yer = (n, x, yy, z) => { n.position.set(x, yy, z); return n; };
        const kutu = (w, h, d, m, x, yy, z, sec) => yer(y.ag(new T.BoxGeometry(w, h, d), m, sec), x, yy, z);
        const koyu = (w, h, d, x, yy, z) => kutu(w, h, d, 'entegre', x, yy, z, { kenar: false });
        const tel = (n, r = 1) => y.ag(y.boru(n, r, 24), 'bakir', { kenar: false });
        const onVida = (x, yy, on) => [yer(y.ag(y.silindir(1.6, 69.95 - on, 16), 'celik', { esik: 60 }), x, yy, (on + 70) / 2), yer(y.ag(y.silindir(2.6, 1.4, 24), 'celik'), x, yy, 70.75), koyu(0.5, 3.4, 0.2, x, yy, 71.6)];   // kafesin önünden ön yüze
        /* Birbirine değen parçalar arasında 0,05 mm boşluk vardır (kesitte z-fighting olmasın). */

        /* ---- gövde (arka, yanlar, üst, alt) ve ön kapak ---- */
        const govde = grup(kutu(45, 66, 1.5, 'plastikAcik', 0, 0, 0.75),
          kutu(1.5, 66, 66.9, 'plastikAcik', -21.75, 0, 35), kutu(1.5, 66, 66.9, 'plastikAcik', 21.75, 0, 35),
          kutu(41.9, 1.5, 66.9, 'plastikAcik', 0, 32.25, 35), kutu(41.9, 1.5, 66.9, 'plastikAcik', 0, -32.25, 35));
        const onKapak = grup(kutu(45, 66, 1.5, 'plastikAcik', 0, 0, 69.25));

        /* ---- bağlantı pimleri ve yük klemensleri ---- */
        const pimler = grup(...KUTUP.flatMap((x) => [kutu(4, 22, 2, 'bakir', x, 44, 40), tel([[x, 33.5, 40], [x, 27, 27], [x, 21, 24], [x, 16, 26]])]));
        const yuk = grup(...KUTUP.flatMap((x) => [kutu(8, 6, 10, 'celik', x, -27, 58), ...onVida(x, -27, 63), koyu(6, 0.1, 6, x, -33.05, 58),
          tel([[x, -12.5, 27], [x, -18, 34], [x, -24, 52]])]));

        /* ---- bimetaller ve ısıtıcılar: alt uçtan bağlı, ısınınca üst uç öne eğilir ---- */
        const serit = [], bimetal = KUTUP.map((x) => {
          const s = kutu(5, 32, 1.2, y.malzeme('celik').clone(), 0, 16, 0);
          serit.push(s);
          const isitici = yer(y.ag(y.helis(3.2, 0.55, 26, 7).rotateX(-Math.PI / 2), 'bakir', { kenar: false }), 0, 3, 0);
          return yer(grup(s, isitici, kutu(7, 3, 4, 'plastik', 0, -1.55, 0)), x, -14, 27);
        });
        const bimetaller = grup(...bimetal);
        const renkSoguk = serit[0].material.color.clone(), renkSicak = y.malzeme('kuzey').color.clone();

        /* ---- açma sürgüsü, mandal, yardımcı kontaklar ---- */
        const surguIc = grup(kutu(34, 4, 2, 'plastik', 0, 18, 30.5), kutu(3, 4, 1.9, 'plastik', 18.5, 18, 28.5));   // yandaki dil mandalı iter
        const surgu = grup(surguIc);
        const mandalIc = grup(kutu(3, 18, 3, 'plastik', 0, 9, 0), kutu(3, 3, 26, 'plastik', 0, 17, 14));
        const mandal = yer(grup(mandalIc), 19, 4, 33);   // alt ucundan döner, üst kolu salıncağa uzanır
        const yrdKlemens = grup(...YRD.flatMap(([x]) => [kutu(8, 6, 8, 'celik', x, 27, 62), ...onVida(x, 27, 66), koyu(6, 0.1, 6, x, 33.05, 62)]));
        /* Salıncak: bekler durumda NC köprüsü 95-96 pabuçlarına değer, NO köprüsü 97-98’in 2,5 mm altındadır. */
        const salincak = yer(grup(kutu(36, 2, 2, 'plastik', 0, 0, 0), kutu(14, 1.45, 2, 'bakir', 10, 1.775, 0), kutu(14, 1.45, 2, 'bakir', -10, 1.775, 0), kutu(3, 6, 2, 'plastik', 0, -3.5, 0)), 0, 18, 63);
        const yrdKontak = grup(salincak, ...YRD.flatMap(([x, a]) => (a === '95' || a === '96'
          ? [kutu(4, 2.45, 2, 'bakir', x, 22.725, 63), kutu(4, 0.9, 2, 'celik', x, 21.0, 63)]
          : [kutu(4, 0.9, 2, 'celik', x, 23.5, 63)])));

        /* ---- ön yüz: ayar düğmesi, reset ve test, gösterge ---- */
        const ayar = grup(yer(y.ag(y.halka(7.6, 10.5, 0.1, 48), 'entegre', { kenar: false }), -8, 8, 70.1),
          yer(y.ag(y.silindir(7, 3, 40), 'plastik'), -8, 8, 71.55), kutu(1, 5, 0.3, 'plastikAcik', -8, 11, 73.2, { kenar: false }));
        const butonlar = grup(yer(y.ag(y.silindir(3.5, 3, 24), 'kabloMavi'), 10, 12, 71.55), yer(y.ag(y.silindir(2.5, 2, 24), 'kabloKirmizi'), 10, 2, 71.05));
        const gostergeAg = kutu(8, 3, 0.1, y.malzeme('plastik').clone(), 0, -10, 70.1, { kenar: false });
        const gosterge = grup(gostergeAg);

        const parcalar = [
          { nesne: pimler, isaret: [-11.5, 48, 41], patlat: [0, 14, 0] },
          { nesne: yuk, isaret: [-12, -27, 71.45], patlat: [0, -12, 12] },
          { nesne: yrdKlemens, isaret: [-13.5, 27, 71.45], patlat: [0, 12, 14] },
          { nesne: bimetaller, isaret: [-13.5, 11, 27.6], patlat: [0, 0, 0] },
          { nesne: surgu, isaretNesne: surguIc, isaret: [-10, 20, 30.5], patlat: [0, 0, 12] },
          { nesne: mandal, isaretNesne: mandalIc, isaret: [1.5, 9, 0], patlat: [6, 0, 16] },
          { nesne: yrdKontak, isaretNesne: salincak, isaret: [-10, 2.5, 0], patlat: [0, 0, 22] },
          { nesne: ayar, isaret: [-8, 8, 73.05], patlat: [0, 0, 55] },
          { nesne: butonlar, isaret: [10, 12, 73.05], patlat: [0, 0, 55] },
          { nesne: gosterge, isaret: [0, -10, 70.15], patlat: [0, 0, 55] },
          { nesne: govde, isaret: [22.5, 0, 35], patlat: [0, 0, -20] },
          { nesne: onKapak, isaret: [16, -14, 70], patlat: [0, 0, 45] }
        ];
        parcalar.forEach((p) => kok.add(p.nesne));

        const etiketYerleri = [
          ...KUTUP.map((x) => ({ nesne: pimler, konum: [x, 58, 40], parca: 0 })),
          ...KUTUP.map((x) => ({ nesne: yuk, konum: [x, -38, 60], parca: 1 })),
          ...YRD.map(([x]) => ({ nesne: yrdKlemens, konum: [x, 38, 64], parca: 2 }))
        ];
        const turuncu = new T.Color(0xf08a24), sonuk = gostergeAg.material.color.clone();

        return {
          kok,
          parcalar,
          etiketYerleri,
          uygula(s) {
            /* Malzemeler burada okunur: çalışma zamanı her parçaya kendi kopyasını verir. */
            bimetal.forEach((g, i) => { g.rotation.x = 0.12 * Math.min(1.1, s.isi[i]); serit[i].material.color.copy(renkSoguk).lerp(renkSicak, 0.8 * Math.min(1, s.isi[i])); });
            const uc = Math.max(...s.isi.map((v) => 32 * Math.sin(0.12 * Math.min(1.1, v))));
            surguIc.position.z = Math.max(0, uc - 1.9) + 1.5 * s.k;
            mandal.rotation.x = 0.35 * s.k;   // üst uç öne, sürgüden uzağa
            salincak.rotation.z = -0.25 * s.k;   // sağ uç (NC) iner, sol uç (NO) kalkar
            gostergeAg.material.color.copy(s.atti ? turuncu : sonuk);
          }
        };
      }
    }
  });
})();
