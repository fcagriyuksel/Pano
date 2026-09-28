/* Sigortalar: 3B modeller. Ölçüler mm; z = 0 DIN ray yüzü (+z öne), y dikey (+y giriş tarafı, yukarı), x genişlik.
   İç yerleşim tipiktir; mekanizmanın biçimi ve konumu üreticiye göre değişir. */
(() => {
  const ISINMA = 2.5, SOGUMA = 3;   // gösterim süreleri (sn); gerçekte aşırı yükte açma süresi dakikaları bulabilir

  Object.assign(MODELLER, {
    'otomatik-sigorta': {
      aciklama: 'Tek kutuplu otomatik sigortanın (MCB) 3B modeli: klemensler, kol, bobin ve pim, bimetal, mandal, sabit ve hareketli kontak, ark söndürme hücresi, gövde, DIN ray klipsi.',
      not: 'Kesit sağ yarım gövdeyi kaldırır ve mekanizmayı gösterir. Aşırı yükte bimetalin eğilmesine, kısa devrede pimin kontağa vurmasına bak. Sarı çizgi ark söndürme hücresindeki arkı gösterir.',
      parcalar: [
        ['Giriş klemensi (1)', 'Faz buraya gelir. Genel uygulama: besleme üstten, yük alttan. Vidayı katalogdaki torkla sık; gevşek klemens ısınır.'],
        ['Çıkış klemensi (2)', 'Korunan hat buradan yüke gider.'],
        ['Kol', 'Yukarı ON, aşağı OFF. Serbest açmalıdır: kol yukarıda tutulsa bile sigorta açar.'],
        ['Kontak göstergesi', 'Kontakların konumunu gösterir; birçok üreticide kırmızı kapalı, yeşil açık demektir.'],
        ['Manyetik bobin ve pim', 'Kısa devre akımı bobinde güçlü bir alan oluşturur; pim mandalı açar ve hareketli kontağa vurur. Milisaniyeler içinde keser.'],
        ['Bimetal', 'Aşırı yükte ısınıp eğilir ve mandalı açar. Yavaştır; akım büyüdükçe daha çabuk açar. Soğumadan sigorta yeniden kurulamaz.'],
        ['Mandal (açma mekanizması)', 'Kolu, bimetali ve pimi hareketli kontağa bağlar. Açma gelince yaylı mekanizma kontağı hızla açar.'],
        ['Sabit kontak', 'Bobinden gelen iletkenin ucundaki kontak yüzeyi.'],
        ['Hareketli kontak', 'Mandalın açıp kapattığı kontak kolu. Esnek örgülü iletken akımı bimetale taşır.'],
        ['Ark söndürme hücresi', 'Kontaklar açılınca oluşan ark, kılavuzlarla çelik plakaların arasına itilir; plakalar arkı küçük parçalara böler ve soğutur, ark söner.'],
        ['Gövde (sol yarım)', 'Isıya dayanıklı yalıtkan plastik. Bir modül 17,5–18 mm genişliktedir.'],
        ['Gövde (sağ yarım)', 'İki yarım kabuk perçinle birleştirilir; sigorta sökülüp onarılmaz.'],
        ['DIN ray klipsi', 'Sigorta 35 mm raya (TS35) takılır; klips tornavidayla aşağı çekilince çıkar.'],
        ['DIN ray (TS35)', '35 mm genişlik, 7,5 mm yükseklik (15 mm derin tipi de vardır).']
      ],
      kamera: { yon: [1.25, 0.35, 0.85], patlak: [1, 0.3, 0.75] },
      kesitler: [{ ad: 'yan', planlar: [[-1, 0, 0, 0]] }],
      yeni: () => ({ kapali: true, kol: 1, kontak: 1, olay: '', isi: 0, pim: 0, ark: 0, uyari: '' }),
      dugmeler: (s) => [
        ['kol', s.kapali ? 'Kolu indir' : 'Kolu kaldır'],
        ['asiri', 'Aşırı yük'],
        ['kisa', 'Kısa devre']
      ],
      olay(s, olay) {
        s.uyari = '';
        if (olay === 'kol') {
          if (s.kapali) { s.kapali = false; s.olay = ''; }
          else if (s.isi > 0.25) s.uyari = 'soguma';
          else { s.kapali = true; s.olay = ''; }
        } else if (olay === 'asiri') { if (s.kapali) s.olay = 'asiri'; else s.uyari = 'acik'; }
        else if (olay === 'kisa') {
          if (s.kapali) { s.olay = 'kisa'; s.pim = 1; s.ark = 1; s.kapali = false; } else s.uyari = 'acik';
        }
      },
      tik(s, dt) {
        let h = false;
        const yaklas = (a, b, v) => (a < b ? Math.min(b, a + v) : Math.max(b, a - v));
        const kol = s.kapali ? 1 : 0;
        if (s.kol !== kol) { s.kol = yaklas(s.kol, kol, dt * 6); h = true; }
        if (s.kontak !== kol) { s.kontak = yaklas(s.kontak, kol, dt * 14); h = true; }
        if (s.olay === 'asiri' && s.kapali) {
          s.isi = Math.min(1, s.isi + dt / ISINMA);
          if (s.isi >= 1) s.kapali = false;
          h = true;
        } else if (s.isi > 0 && !s.kapali) { s.isi = Math.max(0, s.isi - dt / SOGUMA); h = true; }
        if (s.pim > 0) { s.pim = Math.max(0, s.pim - dt * 2.5); h = true; }
        if (s.ark > 0) { s.ark = Math.max(0, s.ark - dt * 1.6); h = true; }
        return h;
      },
      durum(s) {
        if (s.uyari === 'soguma') return { metin: 'Bimetal henüz soğumadı: kol kalksa da mandal tutmaz. Biraz bekle.', uyari: true };
        if (s.uyari === 'acik') return { metin: 'Sigorta zaten açık; önce kolu kaldır.', uyari: true };
        if (s.olay === 'asiri' && s.kapali) return { metin: `Aşırı yük (ör. 1,45 × In): akım bimetali ısıtıyor, bimetal eğiliyor… ${Math.round(s.isi * 100)} %. Gerçekte bu süre dakikaları bulabilir.` };
        if (s.olay === 'asiri') return { metin: `Termik açtı: bimetal mandalı itti, kol düştü, kontaklar açıldı.${s.isi > 0.25 ? ' Bimetal soğumadan yeniden kurulamaz.' : ' Bimetal soğudu; nedeni giderip kolu kaldırabilirsin.'}` };
        if (s.olay === 'kisa') return { metin: 'Kısa devre (ör. C eğrisinde 10 × In üstü): bobin pimi ittirdi, kontaklar milisaniyeler içinde açıldı; ark, ark söndürme hücresinde bölünüp söndü. Nedeni bulmadan kurma.' };
        return { metin: s.kapali ? 'Kol yukarıda (ON): kontaklar kapalı, hat enerjili. Gösterge kırmızı.' : 'Kol aşağıda (OFF): kontaklar açık, hat enerjisiz. Gösterge yeşil.' };
      },

      kur(y) {
        const T = y.T, TUR = Math.PI * 2;
        const kok = new T.Group();
        const grup = (...n) => { const g = new T.Group(); n.forEach((x) => g.add(x)); return g; };
        const yer = (n, x, yy, z) => { n.position.set(x, yy, z); return n; };
        const kutu = (w, h, d, m, x, yy, z, sec) => yer(y.ag(new T.BoxGeometry(w, h, d), m, sec), x, yy, z);
        const eksenX = (geo) => geo.rotateY(Math.PI / 2);   // z eksenli geometriyi x eksenine çevirir
        /* Birbirine değen parçalar arasında 0,05 mm boşluk vardır (kesitte z-fighting olmasın). */

        /* ---- gövde: iki yarım kabuk. Her yarım = yan levha + çevre bandı (içi boş; kesitte mekanizma görünür).
           Profil (z, y) x boyunca çekilir; şekilde x = −z (dünya). Band iç profili dış profilin 1,5 mm içeriden geçer. ---- */
        const DIS = [[0, -45], [44, -45], [44, -22.5], [68, -22.5], [68, 22.5], [44, 22.5], [44, 45], [0, 45]];
        const IC = [[1.5, -43.5], [42.5, -43.5], [42.5, -21], [66.5, -21], [66.5, 21], [42.5, 21], [42.5, 43.5], [1.5, 43.5]];
        const sekil = (n) => new T.Shape(n.map(([z, yy]) => new T.Vector2(-z, yy)));
        const levhaGeo = eksenX(new T.ExtrudeGeometry(sekil(DIS), { depth: 1.5, bevelEnabled: false }));
        const bantSekli = sekil(DIS);
        bantSekli.holes.push(new T.Path(IC.map(([z, yy]) => new T.Vector2(-z, yy))));
        const bantGeo = eksenX(new T.ExtrudeGeometry(bantSekli, { depth: 7.15, bevelEnabled: false }));
        const govdeSol = grup(yer(y.ag(levhaGeo, 'plastikAcik'), -8.75, 0, 0), yer(y.ag(bantGeo, 'plastikAcik'), -7.2, 0, 0));
        const govdeSag = grup(yer(y.ag(levhaGeo, 'plastikAcik'), 7.25, 0, 0), yer(y.ag(bantGeo, 'plastikAcik'), 0.05, 0, 0));

        /* ---- klemensler: kafes, vida, yüzeydeki vida kuyusu ve kablo girişi ---- */
        const klemens = (yy) => {
          const d = Math.sign(yy);
          return grup(
            kutu(8, 6, 10, 'celik', 0, yy, 27),
            yer(y.ag(y.silindir(1.8, 11.9, 20), 'celik', { esik: 60 }), 0, yy, 38.05),
            yer(y.ag(y.silindir(2.9, 1.4, 24), 'celik'), 0, yy, 44.9),
            kutu(0.5, 4, 0.2, 'entegre', 0, yy, 45.7, { kenar: false }),
            kutu(7.5, 7.5, 0.1, 'entegre', 0, yy, 44.1, { kenar: false }),
            kutu(7, 0.1, 12, 'entegre', 0, d * 45.1, 27, { kenar: false })
          );
        };
        const giris = klemens(36), cikis = klemens(-36);

        /* ---- kol ve gösterge ---- */
        const kol = yer(grup(yer(y.ag(eksenX(y.silindir(5, 7, 32)), 'plastik'), 0, 0, 0), kutu(7, 8, 14, 'plastik', 0, 0, 7)), 0, 0, 64);
        const gosterge = kutu(4, 3, 0.1, y.malzeme('plastik').clone(), 0, -15, 68.1, { kenar: false });
        const kirmizi = y.malzeme('kuzey').color.clone(), yesil = new T.Color(0x2e9e4f);

        /* ---- bobin ve pim (pim aşağı, hareketli kontağa doğru iter) ---- */
        const pim = yer(y.ag(new T.CylinderGeometry(1.4, 1.4, 18, 20), 'celik', { esik: 60 }), 0, 21.2, 34);
        const bobin = grup(yer(y.ag(y.halka(1.7, 4.5, 14, 40).rotateX(Math.PI / 2), 'bakir'), 0, 19, 34), pim,
          kutu(3, 2.25, 2, 'bakir', 0, 10.825, 31), kutu(3, 6.9, 12, 'bakir', 0, 29.5, 26));

        /* ---- kontaklar ---- */
        const sabit = grup(kutu(6, 2, 7, 'bakir', 0, 8.65, 28.5), kutu(5, 1, 3.5, 'celik', 0, 7.1, 28.25));
        const kontakKolu = yer(grup(kutu(5, 2, 26, 'bakir', 0, 0.5, -13), kutu(5, 1, 3.5, 'celik', 0, 2.05, -23.75)), 0, 4, 52);
        const hareketli = grup(kontakKolu, y.ag(y.boru([[3, 3.3, 49.5], [3, -1, 51], [3, -6, 45], [3, -7.8, 40.6]], 0.9, 24), 'bakir', { kenar: false }));   // mandalın yanından geçer

        /* ---- bimetal (alt ucundan bağlı, üst ucu öne eğilir) ve çıkışa giden iletken ---- */
        const serit = kutu(6, 22, 1.2, y.malzeme('celik').clone(), 0, 11, 0);
        const bimetalKol = yer(grup(serit), 0, -30, 39.6);
        const bimetal = grup(bimetalKol, kutu(4, 2, 11.7, 'bakir', 0, -31.1, 33.9));
        const soguk = serit.material.color.clone(), sicak = y.malzeme('kuzey').color.clone();

        /* ---- mandal: açma kolu, bağlantı kolu, pimler ---- */
        const mandal = grup(
          kutu(4, 11.4, 2, 'plastik', 0, -2.3, 42.6),
          kutu(3, 2, 6.75, 'plastik', 0, 1.2, 55.5),
          yer(y.ag(eksenX(y.silindir(1, 1.45, 16)), 'celik', { esik: 60 }), 3.275, 4, 52),   // kontak kolunun iki yanındaki pim
          yer(y.ag(eksenX(y.silindir(1, 1.45, 16)), 'celik', { esik: 60 }), -3.275, 4, 52)
        );

        /* ---- ark söndürme hücresi: çelik plakalar, ark kılavuzu, ark ---- */
        const ark = kutu(6, 22, 6, 'vurgu', 0, -11, 27, { kenar: false });
        const hucre = grup(kutu(5, 29, 0.8, 'celik', 0, -7.5, 19.5), ark);
        for (let k = 0; k < 9; k++) hucre.add(kutu(11, 0.8, 14, 'celik', 0, -4 - k * 2.3, 27.2, { esik: 60 }));

        /* ---- DIN klipsi ve ray ---- */
        const klips = kutu(12, 6, 8, 'plastik', 0, -48.05, 4.3);
        const ray = yer(y.ag(y.dinRay(70), 'aluminyum'), -35, 0, -0.05);

        const parcalar = [
          { nesne: giris, isaret: [0, 36, 45.7], patlat: [0, 12, 0] },
          { nesne: cikis, isaret: [0, -36, 45.7], patlat: [0, -12, 0] },
          { nesne: kol, isaret: [0, 0, 14.1], patlat: [0, 0, 16] },
          { nesne: gosterge, isaret: [0, 0, 0.1], patlat: [0, 0, 10] },
          { nesne: bobin, isaret: [0, 19, 38.6], patlat: [0, 8, 6] },
          { nesne: bimetal, isaret: [0, -18, 40.3], patlat: [0, -8, 8] },
          { nesne: mandal, isaret: [0, -2, 43.65], patlat: [0, 0, 12] },
          { nesne: sabit, isaret: [0, 8.65, 32.05], patlat: [0, 4, 0] },
          { nesne: hareketli, isaret: [0, 4.5, 44], patlat: [0, -2, 4] },
          { nesne: hucre, isaret: [0, -12, 34.25], patlat: [0, -10, -10] },
          { nesne: govdeSol, isaret: [-4.4, 45.05, 10], patlat: [-26, 0, 0] },
          { nesne: govdeSag, isaret: [8.8, 0, 20], patlat: [26, 0, -100] },
          { nesne: klips, isaret: [0, -3.05, 0], patlat: [0, -14, 0] },
          { nesne: ray, isaret: [55, 15.5, 0.05], patlat: [0, 0, -18] }
        ];
        parcalar.forEach((p) => kok.add(p.nesne));

        return {
          kok,
          parcalar,
          uygula(s) {
            kol.rotation.x = 0.45 - 0.9 * s.kol;                       // yukarı: ON
            kontakKolu.rotation.x = -0.22 * (1 - s.kontak);             // açılınca uç ≈ 5,7 mm aşağı iner (ark hücresine değmez)
            pim.position.y = 21.2 - 6.6 * s.pim;
            bimetalKol.rotation.x = 0.12 * s.isi;                       // ısınınca üst uç öne, mandala doğru
            serit.material.color.copy(soguk).lerp(sicak, s.isi * 0.8);
            gosterge.material.color.copy(s.kontak > 0.5 ? kirmizi : yesil);
            ark.visible = s.ark > 0.02;
            ark.scale.set(1, Math.max(0.05, s.ark), 1);
          }
        };
      }
    }
  });
})();

/* Kaçak akım rölesi (RCD): 2 kutuplu (faz + nötr), 40 A, IΔn 30 mA, 2 modül (36 mm). Eksenler otomatik sigortayla aynı. */
(() => {
  const KUTUP = [-9, 9];   // x: faz (L) solda, nötr (N) sağda

  Object.assign(MODELLER, {
    'kacak-akim-rolesi': {
      aciklama: 'İki kutuplu kaçak akım rölesinin 3B modeli: klemensler, kol, test butonu ve direnci, toroid ve sekonder sargı, açma rölesi, mandal, faz ve nötr iletkenleri, sabit ve hareketli kontaklar, gövde, DIN ray.',
      not: 'Kesit sağ yarım gövdeyi kaldırır; faz iletkeninin toroidden geçişi ve kontaklar görünür. Kaçak oluştur ya da test butonuna bas: toroid farkı algılar, röle faz ve nötrü birlikte açar. Bir klemense dokununca uç adları çıkar.',
      etiketBaslik: 'Klemensler',
      etiketler: [
        ['1', 'Faz girişi (L). Besleme üstten gelir.'],
        ['N', 'Nötr girişi. Nötr de röleden geçmek zorundadır; yoksa fark hep faz akımı kadar görünür.'],
        ['2', 'Faz çıkışı; korunan devreye gider.'],
        ['N', 'Nötr çıkışı. Yalnızca bu rölenin devresine gider; başka devrenin nötrüyle birleşirse röle atar.']
      ],
      parcalar: [
        ['Giriş klemensleri (1, N)', 'Faz ve nötr buraya gelir. PE röleye girmez, doğrudan toprak barasına gider.'],
        ['Çıkış klemensleri (2, N)', 'Korunan devreye giden faz ve nötr.'],
        ['Kol', 'Yukarı ON, aşağı OFF. Serbest açmalıdır: kol yukarıda tutulsa bile röle açar. Kaçak sürdükçe kurulamaz.'],
        ['Test butonu ve direnci', 'Butona basınca bir direnç, toroidi atlayan küçük bir akım geçirir; fark oluşur, röle açmalı. Yalnızca mekanizmayı dener; açma akımı ve süresi test cihazıyla ölçülür.'],
        ['Toroid ve sekonder sargı', 'Faz ve nötr, toroidin içinden birlikte geçer. Akımlar eşitse alanları birbirini götürür. Fark varsa toroidde alan oluşur ve sekonder sargıda gerilim doğar.'],
        ['Açma rölesi', 'Sekonderden gelen küçük enerjiyle çalışan hassas röle. Pimi mandalı iter. Gerilime bağlı değildir (A, AC tiplerinde).'],
        ['Mandal', 'Kolu ve kontak köprüsünü tutar. Açma rölesi mandalı bırakınca yay kontakları hızla açar.'],
        ['Faz ve nötr iletkenleri', 'Toroidin primeri: her biri tek sarım gibi toroidden geçer.'],
        ['Sabit kontaklar', 'Faz ve nötr için birer tane. İkisi aynı anda açılır; nötr de kesilir.'],
        ['Hareketli kontaklar', 'Tek köprüye bağlı iki kontak kolu. Esnek iletkenler akımı çıkış klemenslerine taşır.'],
        ['Gövde (sol yarım)', 'Yalıtkan plastik. Alt kenardaki klips tornavidayla aşağı çekilince röle raydan çıkar.'],
        ['Gövde (sağ yarım)', 'Ön yüzde anma değerleri yazar: In (ör. 40 A), IΔn (ör. 30 mA) ve tip (AC, A, F, B).'],
        ['DIN ray (TS35)', 'Röle, sigortalarla aynı raya takılır.']
      ],
      kamera: { yon: [1.25, 0.35, 0.85], patlak: [1, 0.3, 0.75] },
      secimdeOdak: true,
      kesitler: [{ ad: 'yan', planlar: [[-1, 0, 0, 0]] }],
      yeni: () => ({ kapali: true, kacak: false, testT: 0, testAcik: false, algi: 0, kol: 1, kontak: 1, pim: 0, atti: '' }),
      dugmeler: (s) => [
        ['kol', s.kapali ? 'Kolu indir' : 'Kolu kaldır'],
        ['kacak', s.kacak ? 'Kaçağı gider' : 'Kaçak oluştur (40 mA)', s.kacak],
        ['test', 'Test butonuna bas']
      ],
      olay(s, olay) {
        s.testAcik = false;
        if (olay === 'kol') { s.kapali = !s.kapali; s.atti = ''; }
        else if (olay === 'kacak') s.kacak = !s.kacak;
        else if (olay === 'test') { if (s.kapali) s.testT = 0.6; else s.testAcik = true; }   // açıkken test devresi beslenmez
      },
      tik(s, dt) {
        let h = false;
        const yaklas = (a, b, v) => (a < b ? Math.min(b, a + v) : Math.max(b, a - v));
        if (s.testT > 0) { s.testT = Math.max(0, s.testT - dt); h = true; }
        const fark = s.kapali && (s.kacak || s.testT > 0);
        if (s.algi !== (fark ? 1 : 0)) { s.algi = yaklas(s.algi, fark ? 1 : 0, dt * 8); h = true; }
        if (fark && s.algi >= 1) { s.atti = s.testT > 0 ? 'test' : 'kacak'; s.kapali = false; s.pim = 1; h = true; }   // gösterimde ≈ 0,13 s; gerçekte IΔn’de ≤ 300 ms
        const hedef = s.kapali ? 1 : 0;
        if (s.kol !== hedef) { s.kol = yaklas(s.kol, hedef, dt * 6); h = true; }
        if (s.kontak !== hedef) { s.kontak = yaklas(s.kontak, hedef, dt * 14); h = true; }
        if (s.pim > 0) { s.pim = Math.max(0, s.pim - dt * 2); h = true; }
        return h;
      },
      durum(s) {
        if (!s.kapali && s.testAcik) return { metin: 'Röle açık: test devresi hattan beslendiği için test butonu şimdi çalışmaz.', uyari: true };
        if (!s.kapali && s.atti === 'kacak') return { metin: `Röle attı: faz akımının bir kısmı toprağa kaçtı, nötrden daha az akım döndü. Toroid farkı algıladı, açma rölesi mandalı bıraktı; faz ve nötr birlikte açıldı. ${s.kacak ? 'Kaçak sürüyor: kol kaldırılsa da hemen yeniden atar. Önce kaçağın yerini bul.' : 'Kaçak giderildi; kolu kaldırabilirsin.'}`, uyari: true };
        if (!s.kapali && s.atti === 'test') return { metin: 'Test butonu, direnç üzerinden toroidi atlayan küçük bir akım geçirdi; fark IΔn’i aştı ve röle attı. Mekanizma çalışıyor; kolu kaldır.' };
        if (!s.kapali) return { metin: 'Kol aşağıda: faz ve nötr açık, devre enerjisiz.' };
        if (s.kacak || s.testT > 0) return { metin: 'Fark akımı var: giden ve dönen akım eşit değil, toroidin sekonder sargısında gerilim oluştu…' };
        return { metin: 'Kol yukarıda: faz ve nötr kapalı. Giden ve dönen akım eşit; toroidde alan yok. IΔn = 30 mA: 15 mA’in altında açmaz, 30 mA’de mutlaka açar.' };
      },

      kur(y) {
        const T = y.T;
        const kok = new T.Group();
        const grup = (...n) => { const g = new T.Group(); n.forEach((x) => g.add(x)); return g; };
        const yer = (n, x, yy, z) => { n.position.set(x, yy, z); return n; };
        const kutu = (w, h, d, m, x, yy, z, sec) => yer(y.ag(new T.BoxGeometry(w, h, d), m, sec), x, yy, z);
        const eksenX = (geo) => geo.rotateY(Math.PI / 2);
        const tel = (n, r, m) => y.ag(y.boru(n, r, 32), m, { kenar: false });
        /* Birbirine değen parçalar arasında 0,05 mm boşluk vardır (kesitte z-fighting olmasın). */

        /* ---- gövde: otomatik sigortayla aynı profil, 36 mm genişlik ---- */
        const DIS = [[0, -45], [44, -45], [44, -22.5], [68, -22.5], [68, 22.5], [44, 22.5], [44, 45], [0, 45]];
        const IC = [[1.5, -43.5], [42.5, -43.5], [42.5, -21], [66.5, -21], [66.5, 21], [42.5, 21], [42.5, 43.5], [1.5, 43.5]];
        const sekil = (n) => new T.Shape(n.map(([z, yy]) => new T.Vector2(-z, yy)));
        const levhaGeo = eksenX(new T.ExtrudeGeometry(sekil(DIS), { depth: 1.5, bevelEnabled: false }));
        const bantSekli = sekil(DIS);
        bantSekli.holes.push(new T.Path(IC.map(([z, yy]) => new T.Vector2(-z, yy))));
        const bantGeo = eksenX(new T.ExtrudeGeometry(bantSekli, { depth: 16.4, bevelEnabled: false }));
        const govdeSol = grup(yer(y.ag(levhaGeo, 'plastikAcik'), -18, 0, 0), yer(y.ag(bantGeo, 'plastikAcik'), -16.45, 0, 0), kutu(12, 6, 8, 'plastik', 0, -48.05, 4.3));
        const govdeSag = grup(yer(y.ag(levhaGeo, 'plastikAcik'), 16.5, 0, 0), yer(y.ag(bantGeo, 'plastikAcik'), 0.05, 0, 0));

        /* ---- klemensler ---- */
        const klemens = (x, yy) => {
          const d = Math.sign(yy);
          return [kutu(8, 6, 10, 'celik', x, yy, 27), yer(y.ag(y.silindir(1.8, 11.9, 20), 'celik', { esik: 60 }), x, yy, 38.05),
            yer(y.ag(y.silindir(2.9, 1.4, 24), 'celik'), x, yy, 44.9), kutu(0.5, 4, 0.2, 'entegre', x, yy, 45.7, { kenar: false }),
            kutu(7.5, 7.5, 0.1, 'entegre', x, yy, 44.1, { kenar: false }), kutu(7, 0.1, 12, 'entegre', x, d * 45.1, 27, { kenar: false })];
        };
        const giris = grup(...KUTUP.flatMap((x) => klemens(x, 36)));
        const cikis = grup(...KUTUP.flatMap((x) => klemens(x, -36)),
          ...KUTUP.map((x) => tel([[x, -14.5, 24.5], [x, -22, 25.5], [x, -32.9, 27]], 1, 'bakir')));   // hareketli kontaktan gelen esnek iletkenler

        /* ---- kol ve test butonu (ön yüz) ---- */
        const kol = yer(grup(yer(y.ag(eksenX(y.silindir(5, 10, 32)), 'plastik'), 0, 0, 0), kutu(10, 8, 14, 'plastik', 0, 0, 7)), -6, 0, 64);
        const testIc = grup(yer(y.ag(y.silindir(3.5, 3, 24), 'vurgu'), 9, 12, 69.55), yer(y.ag(y.silindir(1.2, 9, 16), 'plastik'), 9, 12, 63.5));
        const test = grup(testIc,
          yer(y.ag(eksenX(y.silindir(1.3, 6, 16)), 'plastikAcik', { esik: 60 }), 11, 17, 55),
          tel([[14, 17, 55], [14.5, 14, 57.5], [10.3, 12, 59.6]], 0.35, 'bakir'),
          tel([[8, 17, 55], [6.5, 19.5, 40], [5.4, 21, 28.2]], 0.35, 'bakir'),   // nötre, toroidden önce
          tel([[7.8, 12, 59.5], [6, 7, 45], [-2, 7.5, 33], [-3, 9.6, 28.1]], 0.35, 'bakir'));   // butondan faza, toroidden sonra

        /* ---- toroid: y ekseninde halka; önündeki dilimde sekonder sargı ---- */
        const halkaY = (geo) => geo.rotateX(Math.PI / 2);
        const sargiAg = yer(y.ag(halkaY(y.torna([[5.9, -3.5], [12.1, -3.5, 1], [12.1, 3.5, 1], [5.9, 3.5, 1], [5.9, -3.5]], 24, (20 * Math.PI) / 180, (140 * Math.PI) / 180)), y.malzeme('bakir').clone(), { esik: 50 }), 0, 13, 27);
        const toroid = grup(yer(y.ag(halkaY(y.halka(6.5, 11.5, 6, 48)), 'miknatis', { esik: 60 }), 0, 13, 27), sargiAg,
          ...[-2.2, 2.2].map((x) => tel([[x, 10, 37], [x, 0, 44], [x, -12.9, 47]], 0.4, 'bakir')));

        /* ---- açma rölesi (kalıcı mıknatıslı) ve pimi; mandal ---- */
        const pim = yer(y.ag(new T.CylinderGeometry(1.2, 1.2, 6, 16), 'celik', { esik: 60 }), 0, -10, 48);
        const roleSargi = yer(y.ag(y.halka(2, 3.9, 5.9, 32), y.malzeme('bakir').clone(), { esik: 60 }), 0, -16.95, 56);   // mıknatısın önünde
        const role = grup(kutu(10, 7.9, 10, 'miknatis', 0, -16.95, 48), roleSargi, pim);
        const mandal = grup(kutu(4, 12, 3, 'plastik', 0, -1, 51), yer(y.ag(eksenX(y.silindir(1, 5.9, 16)), 'celik'), 0, 5.2, 51));

        /* ---- faz ve nötr iletkenleri: girişten toroide, oradan sabit kontağa ---- */
        const yol = (d) => [[9 * d, 32.5, 27], [9 * d, 24, 27], [3 * d, 19, 27], [3 * d, 10, 27], [5 * d, 6, 22], [9 * d, 3, 19.3]];   // sabit kontağa arkadan bağlanır
        const iletken = grup(tel(yol(-1), 1.2, 'bakir'), tel(yol(1), 1.2, 'bakir'));

        /* ---- kontaklar: sabit (arkada), hareketli köprü (pivot y −14, z 24,5; açılınca üst uç öne gider) ---- */
        const sabit = grup(...KUTUP.flatMap((x) => [kutu(5, 5, 2, 'bakir', x, 2, 21), kutu(4, 4, 0.95, 'celik', x, 2, 22.525)]));
        const hareketli = yer(grup(...KUTUP.flatMap((x) => [kutu(4, 18, 2, 'bakir', x, 9, 0.55), kutu(4, 3, 0.95, 'celik', x, 16, -0.975)]),
          kutu(26, 3, 2, 'plastik', 0, 19.55, 0.55)), 0, -14, 24.5);

        const ray = yer(y.ag(y.dinRay(70), 'aluminyum'), -35, 0, -0.05);

        const parcalar = [
          { nesne: giris, isaret: [-7.5, 36, 45.6], patlat: [0, 12, 0] },
          { nesne: cikis, isaret: [-7.5, -36, 45.6], patlat: [0, -12, 0] },
          { nesne: kol, isaret: [0, 0, 14], patlat: [0, 0, 18] },
          { nesne: test, isaretNesne: testIc, isaret: [9, 12, 71.05], patlat: [0, 0, 16] },
          { nesne: toroid, isaret: [0, 13, 39.1], patlat: [0, 0, 26] },
          { nesne: role, isaret: [-5, -16.95, 48], patlat: [0, -6, 14] },
          { nesne: mandal, isaret: [-2, -1, 51], patlat: [0, 0, 10] },
          { nesne: iletken, isaret: [-9, 28, 28.2], patlat: [0, 0, 0] },
          { nesne: sabit, isaret: [-9, 4.5, 21], patlat: [0, 0, -6] },
          { nesne: hareketli, isaret: [-9, 9, 1.55], patlat: [0, -4, 4] },
          { nesne: govdeSol, isaret: [-10, 45, 20], patlat: [-28, 0, 0] },
          { nesne: govdeSag, isaret: [18, 0, 20], patlat: [28, 0, -100] },
          { nesne: ray, isaret: [30, 15.5, -0.05], patlat: [0, 0, -18] }
        ];
        parcalar.forEach((p) => kok.add(p.nesne));

        const etiketYerleri = [[giris, -9, 1, 0], [giris, 9, 1, 0], [cikis, -9, -1, 1], [cikis, 9, -1, 1]]
          .map(([n, x, d, p]) => ({ nesne: n, konum: [x, d * 47, 40], parca: p }));
        const renkBakir = y.malzeme('bakir').color.clone(), renkAktif = y.malzeme('vurgu').color.clone();

        return {
          kok,
          parcalar,
          etiketYerleri,
          uygula(s) {
            /* Malzemeler burada okunur: çalışma zamanı her parçaya kendi kopyasını verir. */
            kol.rotation.x = 0.45 - 0.9 * s.kol;
            hareketli.rotation.x = 0.25 * (1 - s.kontak);   // üst uç ≈ 4 mm öne
            pim.position.y = -10 + 2.5 * s.pim;
            testIc.position.z = s.testT > 0 ? -1.2 : 0;
            sargiAg.material.color.copy(renkBakir).lerp(renkAktif, 0.85 * s.algi);
            roleSargi.material.color.copy(renkBakir).lerp(renkAktif, 0.85 * Math.max(s.algi, s.pim));
          }
        };
      }
    }
  });
})();
