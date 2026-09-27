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
