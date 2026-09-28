/* Pnömatik: 3B modeller. Ölçüler mm. Silindir ve valf kendi gruplarında kurulur (yerel z ekseni = dünyada +x);
   yerel x dünyada −z’dir, yani yerel −x yüzü kameraya bakar. Kesit düzlemi dünyada z = 0 (yerel x = 0). */
(() => {
  const STROK = 100;               // ISO 15552, Ø32 silindir, strok 100 (tipik)
  const KAYMA = 12;                // makara yolu: ağız aralığı kadar
  const VALF = [64, -80, 0];       // valfin dünyadaki yeri
  /* Valf ağızları (yerel z): 5 | 4 | 1 | 2 | 3 sırasıyla, üstte 4 ve 2, altta 5, 1, 3 (ISO 5599 numaraları). */
  const AGIZ = { 5: -24, 4: -12, 1: 0, 2: 12, 3: 24 };
  const UST = [4, 2], ALT = [5, 1, 3];

  Object.assign(MODELLER, {
    'pnomatik-silindir': {
      aciklama: 'Çift etkili pnömatik silindir ve 5/2 tek bobinli valfin 3B modeli: profil boru, kapaklar, mıknatıslı piston, piston kolu, konum sensörleri, valf gövdesi, makara, bobin ve pilot, yay, susturucular, hortumlar.',
      not: 'Boyuna kesit, valfin makarasını ve silindirin içini gösterir. Y1’e sinyal ver: makara kayar, 1→4 ve 2→3 olur, silindir ileri çıkar. Kırmızı basınçlı hava, mavi egzoz. Valf gövdesine dokununca ağız numaraları çıkar.',
      etiketBaslik: 'Valf ağızları (ISO 5599)',
      etiketler: [
        ['1', 'Besleme: hazırlanmış basınçlı hava (ör. 6 bar).'],
        ['2', 'Çalışma çıkışı. Bobin enerjisizken 1’e bağlıdır; modelde silindirin kol tarafına gider, silindir geride durur.'],
        ['3', 'Egzoz: bobin enerjiliyken 2’deki hava buradan çıkar. Susturucu takılır.'],
        ['4', 'Çalışma çıkışı. Bobin enerjiliyken 1’e bağlıdır; modelde silindirin arka tarafına gider, silindir ileri çıkar.'],
        ['5', 'Egzoz: bobin enerjisizken 4’teki hava buradan çıkar. Susturucu takılır.'],
        ['14', 'Bobin (pilot) tarafı. 14 uyarısı 1’i 4’e bağlayan konuma geçirir.']
      ],
      parcalar: [
        ['Silindir borusu', 'Alüminyum profil (ISO 15552). Üstteki kanala konum sensörleri takılır.'],
        ['Arka kapak', 'Arka hava ağzı buradadır; bu taraf basınçlanınca silindir ileri çıkar. Cıvatalar kapağı boruya sıkar.'],
        ['Ön kapak ve kol yatağı', 'Kol yatağı (burç) kolu yönlendirir, sıyırıcı conta tozu dışarıda tutar. Ön ağız basınçlanınca silindir geri çekilir.'],
        ['Piston', 'İki yanındaki contalar odaları birbirinden ayırır. Ortadaki mıknatıs halka, sensörlerin pistonun yerini görmesini sağlar.'],
        ['Piston kolu', 'Kromlu çelik. Ucundaki dişe bağlantı parçası takılır. Kola yandan yük bindirmek yatağı ve contaları aşındırır.'],
        ['Konum sensörleri (B1, B2)', 'Mıknatıslı pistonu borunun dışından algılar. B1 geri, B2 ileri konumu PLC’ye bildirir; algılayınca LED yanar.'],
        ['Valf gövdesi', 'Ağızlar ve aralarındaki oluklar gövdededir. Makaranın konumu hangi ağızın hangisine bağlanacağını belirler.'],
        ['Makara (sürgü)', 'Üzerindeki conta bilezikleri oluklar arasını kapatır. Bir ağız aralığı kadar kayınca bağlantılar değişir: 1→2 / 4→5 ya da 1→4 / 2→3.'],
        ['Bobin ve pilot (Y1)', 'Bobin küçük bir pilot valfi açar; 1’den gelen hava pilot pistonunu iterek makarayı kaydırır. Pilot valf, besleme havası olmadan çalışmaz. Konnektördeki LED bobin sinyalini gösterir; sarı buton manuel kumandadır.'],
        ['Geri dönüş yayı', 'Bobin enerjisi kesilince makarayı geri iter (monostabil valf). Enerji kesintisinde valf bilinen konuma döner.'],
        ['Susturucular', 'Egzoz havasının sesini azaltır. Tıkanırsa silindir yavaşlar ya da hareket etmez.'],
        ['Hortumlar ve rakorlar', 'Hızlı geçme rakorlar Ø6 hortumu tutar. Hortumu çıkarmak için rakorun halkasına bastır. Renkler basınç durumunu gösterir.'],
        ['Basınçlı hava (gösterim)', 'Kırmızı: beslemeye bağlı, basınçlı. Mavi: egzoza açık. Gri: kapalı ağız.']
      ],
      kamera: { yon: [0.35, 0.5, 1], patlak: [0.3, 0.55, 1] },
      secimdeOdak: true,
      kesitler: [{ ad: 'boyuna', planlar: [[0, 0, -1, 0]] }],
      yeni: () => ({ y1: false, manuel: false, k: 0, p: 0 }),
      dugmeler: (s) => [
        ['y1', s.y1 ? 'Y1: sinyal var' : 'Y1’e sinyal ver', s.y1],
        ['manuel', s.manuel ? 'Manuel buton basılı' : 'Manuel butona bas', s.manuel]
      ],
      olay(s, olay) {
        if (olay === 'y1') s.y1 = !s.y1;
        else if (olay === 'manuel') s.manuel = !s.manuel;
      },
      tik(s, dt) {
        const hedefK = s.y1 || s.manuel ? 1 : 0, onceK = s.k, onceP = s.p;
        /* Hedefe yaklaş, geçme: sınır olarak hedefin kendisi kullanılır (0/1 değil), yoksa hedefte titrer. */
        s.k = hedefK > s.k ? Math.min(hedefK, s.k + dt * 14) : Math.max(hedefK, s.k - dt * 14);
        const hedefP = s.k > 0.5 ? 1 : 0;
        s.p = hedefP > s.p ? Math.min(hedefP, s.p + dt * 0.8) : Math.max(hedefP, s.p - dt * 0.8);
        return s.k !== onceK || s.p !== onceP;
      },
      durum(s) {
        const ileri = s.k > 0.5;
        const valf = ileri ? 'Makara sağda: 1→4, 2→3.' : 'Yay makarayı solda tutuyor: 1→2, 4→5.';
        const sil = s.p >= 1 ? 'Silindir ileride; B2 algılıyor.' : s.p <= 0 ? 'Silindir geride; B1 algılıyor.' : ileri ? 'Arka oda basınçlı, silindir ileri çıkıyor…' : 'Kol tarafı basınçlı, silindir geri çekiliyor…';
        if (s.manuel) return { metin: `Manuel buton basılı: valf elektrik olmadan konum değiştirdi (besleme havası gerekir). ${valf} ${sil} Arızada valfi elektrikten ayırmak için kullanılır; silindir beklenmedik hareket eder, önce çevreyi kontrol et.`, uyari: true };
        return { metin: `${s.y1 ? 'Y1 enerjili.' : 'Y1 enerjisiz.'} ${valf} ${sil}` };
      },

      kur(y) {
        const T = y.T, TUR = Math.PI * 2;
        const kok = new T.Group();
        const grup = (...n) => { const g = new T.Group(); n.forEach((x) => g.add(x)); return g; };
        const yer = (n, x, yy, z) => { n.position.set(x, yy, z); return n; };
        const kutu = (w, h, d, m, x, yy, z, sec) => yer(y.ag(new T.BoxGeometry(w, h, d), m, sec), x, yy, z);
        const dikey = (r, u, b = 24) => y.silindir(r, u, b).rotateX(Math.PI / 2);   // yerel y ekseninde silindir
        const altigen = (r, u) => new T.CylinderGeometry(r, r, u, 6);               // y ekseninde altıgen
        const eksende = (g) => { g.rotation.y = Math.PI / 2; return g; };            // yerel z → dünya +x
        const kesitli = (n) => new T.Shape(n.map(([z, yy]) => new T.Vector2(-z, yy)));
        const xBoyunca = (sekil, d) => new T.ExtrudeGeometry(sekil, { depth: d, bevelEnabled: false }).rotateY(Math.PI / 2).translate(-d / 2, 0, 0);   // (z, y) profili x boyunca, x = 0’a ortalı
        const malzemeKopya = (ad) => y.malzeme(ad).clone();
        /* Birbirine değen parçalar arasında 0,05 mm boşluk vardır (kesitte z-fighting olmasın). */

        /* ================= SİLİNDİR (yerel z ekseni) ================= */
        const profil = new T.Shape().moveTo(2, 22.5).lineTo(17.5, 22.5).quadraticCurveTo(22.5, 22.5, 22.5, 17.5).lineTo(22.5, -17.5).quadraticCurveTo(22.5, -22.5, 17.5, -22.5)
          .lineTo(-17.5, -22.5).quadraticCurveTo(-22.5, -22.5, -22.5, -17.5).lineTo(-22.5, 17.5).quadraticCurveTo(-22.5, 22.5, -17.5, 22.5).lineTo(-2, 22.5).lineTo(-2, 19.5).lineTo(2, 19.5).closePath();
        profil.holes.push(new T.Path().absarc(0, 0, 16, 0, TUR, true));
        const boru = grup(yer(y.ag(y.cek(profil, 127.9), 'aluminyum', { esik: 50 }), 0, 0, 64));

        const kapakSekli = (delik) => { const s = y.yuvarlakDikdortgen(45, 45, 5); if (delik) s.holes.push(new T.Path().absarc(0, 0, delik, 0, TUR, true)); return s; };
        const civata = (z) => [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b]) => yer(y.ag(y.silindir(3, 3, 16), 'celik'), a * 16.25, b * 16.25, z));
        const rakor = (x, yy, z, asagi) => {   // hızlı geçme rakor: altıgen gövde + halka; asagi: ağız −y’ye bakar
          const d = asagi ? -1 : 1;
          return [yer(y.ag(altigen(7, 4), 'celik'), x, yy + d * 2.05, z), yer(y.ag(dikey(5, 6), 'celik'), x, yy + d * 7.1, z), yer(y.ag(dikey(5.5, 2), 'plastik'), x, yy + d * 11.15, z)];
        };
        const arkaKapak = grup(yer(y.ag(y.cek(kapakSekli(0), 21.95, { pah: 1 }), 'aluminyum'), 0, 0, -11.025), ...civata(-23.55));
        const onKapak = grup(yer(y.ag(y.cek(kapakSekli(6.05), 21.95, { pah: 1 }), 'aluminyum'), 0, 0, 139.025), ...civata(151.55),
          yer(y.ag(y.halka(6.05, 11, 6), 'bakir'), 0, 0, 153.05), yer(y.ag(y.halka(6.05, 8, 1), 'plastik'), 0, 0, 156.6));
        const silRakorlar = [...rakor(0, -22.5, -11, true), ...rakor(0, -22.5, 139, true)];

        /* Piston ve kol iç gruplarda kayar (geride z = 1, ileride z = 101). */
        const pistonIc = grup(
          yer(y.ag(y.halka(6.05, 15.95, 4.9), 'plastik'), 0, 0, 2.5),
          yer(y.ag(y.halka(6.05, 12, 7.9), 'aluminyum'), 0, 0, 9),
          yer(y.ag(y.halka(12.05, 15.9, 7.9), 'miknatis'), 0, 0, 9),
          yer(y.ag(y.halka(6.05, 15.95, 4.9), 'plastik'), 0, 0, 15.5)
        );
        const kolIc = grup(
          y.ag(y.torna([[0, 0], [6, 0, 1], [6, 159, 1], [5, 159, 1], [5, 178.5, 1], [4.5, 179, 1], [0, 179]], 32), 'celik', { esik: 50 }),
          yer(y.ag(altigen(9.8, 6).rotateX(Math.PI / 2), 'celik'), 0, 0, 164)
        );
        const piston = grup(pistonIc), kol = grup(kolIc);

        const sensorLed = [malzemeKopya('entegre'), malzemeKopya('entegre')];
        const sensor = (z, led) => [kutu(3.9, 2.9, 25, 'plastik', 0, 21, z), kutu(2.4, 0.5, 3, led, 0, 22.75, z + 9, { kenar: false }),
          y.ag(y.boru([[0, 22, z + 12.4], [0, 28, z + 16], [0, 40, z + 18]], 1.4, 16), 'kabloSiyah', { kenar: false })];
        const sensorler = grup(...sensor(14, sensorLed[0]), ...sensor(106, sensorLed[1]));
        const silG = eksende(grup(boru, arkaKapak, onKapak, piston, kol, sensorler, ...silRakorlar));

        /* ================= VALF (yerel z ekseni; derinlik yerel x) ================= */
        /* Gövde: orta katman oluk ve kanallarıyla parçalar hâlinde, önde ve arkada kapak levhası. Delik yarıçapı 5, oluk derinliği 2. */
        const parca = (z0, z1, ust, oluk) => {
          const d = ust ? 1 : -1, n = [[z0, 5 * d]];
          if (oluk) n.push([oluk[0], 5 * d], [oluk[0], 7 * d], [oluk[1], 7 * d], [oluk[1], 5 * d]);
          n.push([z1, 5 * d], [z1, 12 * d], [z0, 12 * d]);
          return y.ag(xBoyunca(kesitli(ust ? n : n.reverse()), 11.9), 'aluminyum', { esik: 50 });
        };
        const valfGovde = grup(
          parca(-45, -15, true, [-27, -21]), parca(-9, 9, true, [-3, 3]), parca(15, 45, true, [21, 27]),
          parca(-45, -27, false), parca(-21, -3, false, [-15, -9]), parca(3, 21, false, [9, 15]), parca(27, 45, false),
          kutu(4.95, 24, 90, 'aluminyum', 8.525, 0, 0), kutu(4.95, 24, 90, 'aluminyum', -8.525, 0, 0)
        );
        const valfRakorlar = [...UST.flatMap((a) => rakor(0, 12, AGIZ[a], false)), ...rakor(0, -12, AGIZ[1], true)];

        /* Makara: mil, conta bilezikleri, sol uçta pilot pistonu, sağ uçta yay tablası. */
        const makaraG = grup(
          yer(y.ag(y.silindir(3, 107, 24), 'celik'), 0, 0, -12.5),                                      // mil: z −66 … 41
          ...[-30, -6, 18, 30].map((z) => yer(y.ag(y.silindir(4.95, 6, 32), 'plastik'), 0, 0, z)),     // conta bilezikleri
          yer(y.ag(y.silindir(9, 4, 32), 'celik'), 0, 0, -64.5),                                        // pilot pistonu
          yer(y.ag(y.silindir(4.5, 1, 24), 'celik'), 0, 0, 40.5)                                        // yay tablası
        );
        const makara = grup(makaraG);

        const bobinLed = malzemeKopya('entegre');
        const pilot = grup(
          kutu(22, 24, 29.9, 'plastik', 0, 0, -60.05),
          kutu(18, 12, 18, 'plastikAcik', 0, 18.05, -62), kutu(4, 3, 3, bobinLed, -9.05, 18, -57, { kenar: false }),
          yer(y.ag(y.silindir(3.5, 3, 24).rotateY(Math.PI / 2), 'vurgu'), -12.55, -5, -52),
          y.ag(y.boru([[5, 18, -71.05], [14, 18, -80], [24, 10, -90]], 2.5, 16), 'kabloSiyah', { kenar: false })   // kablo arkaya (dünyada −z) çıkar
        );
        const yayAg = yer(y.ag(y.helis(3.4, 0.45, 26.4, 7), 'celik', { kenar: false }), 0, 0, 41.5);
        const yay = grup(kutu(22, 24, 24.9, 'plastik', 0, 0, 57.5), yayAg);
        const susturucu = (z) => [yer(y.ag(dikey(4.5, 13, 16), 'bakir', { esik: 60 }), 0, -21.6, z), yer(y.ag(altigen(6, 3), 'celik'), 0, -13.55, z)];
        const susturucular = grup(...susturucu(AGIZ[5]), ...susturucu(AGIZ[3]));
        const valG = eksende(grup(valfGovde, makara, pilot, yay, susturucular, ...valfRakorlar));
        valG.position.set(...VALF);

        /* ================= HORTUMLAR (dünya koordinatı) ================= */
        const [vx, vy] = VALF;
        const hortum = (m, n) => y.ag(y.boru(n, 3, 48), m, { kenar: false });
        const h4 = hortum(malzemeKopya('kabloSiyah'), [[vx + AGIZ[4], vy + 24, 0], [vx + AGIZ[4] - 2, vy + 34, 0], [22, -44, 0], [-8, -46, 0], [-11, -35, 0]]);
        const h2 = hortum(malzemeKopya('kabloSiyah'), [[vx + AGIZ[2], vy + 24, 0], [vx + AGIZ[2] + 2, vy + 34, 0], [108, -44, 0], [136, -46, 0], [139, -35, 0]]);
        const h1 = hortum(malzemeKopya('kabloSiyah'), [[vx, vy - 24, 0], [vx, vy - 40, 0], [vx - 20, vy - 50, 0], [vx - 60, vy - 52, 0]]);
        const hortumlar = grup(h4, h2, h1);

        /* ================= BASINÇLI HAVA (gösterim) ================= */
        const havaMalzeme = () => malzemeKopya('sac');
        const arkaOda = y.ag(y.silindir(15.85, 1, 32), havaMalzeme(), { kenar: false });
        const onOda = y.ag(y.halka(6.1, 15.85, 1, 32), havaMalzeme(), { kenar: false });
        const silHava = eksende(grup(arkaOda, onOda));
        const kanal = {};
        [...UST, ...ALT].forEach((a) => { kanal[a] = kutu(11.8, 6.9, 5.9, havaMalzeme(), 0, (UST.includes(a) ? 1 : -1) * 8.5, AGIZ[a], { kenar: false }); });
        const valHava = eksende(grup(...Object.values(kanal)));
        valHava.position.set(...VALF);
        const hava = grup(silHava, valHava);

        kok.add(silG, valG, hortumlar, hava);

        const parcalar = [
          { nesne: boru, isaret: [-22.5, 0, 64], patlat: [0, 0, 0] },
          { nesne: arkaKapak, isaret: [-22.5, 0, -11], patlat: [0, 0, -35] },
          { nesne: onKapak, isaret: [-22.5, 0, 139], patlat: [0, 0, 35] },
          { nesne: piston, isaretNesne: pistonIc, isaret: [0, 15.9, 9], patlat: [0, 55, 0] },
          { nesne: kol, isaretNesne: kolIc, isaret: [0, 5, 172], patlat: [0, 55, 0] },
          { nesne: sensorler, isaret: [0, 22.45, 14], patlat: [0, 22, 0] },
          { nesne: valfGovde, isaret: [-11, 0, 30], patlat: [0, 0, 0] },
          { nesne: makara, isaretNesne: makaraG, isaret: [0, 4.95, -6], patlat: [-34, 0, 0] },
          { nesne: pilot, isaret: [-11, 0, -66], patlat: [0, 0, -26] },
          { nesne: yay, isaret: [-11, 0, 60], patlat: [0, 0, 26] },
          { nesne: susturucular, isaret: [-4.5, -19, AGIZ[5]], patlat: [0, -16, 0] },
          { nesne: hortumlar, isaret: [22, -44, 3], patlat: [0, 0, 0] },
          { nesne: hava, isaretNesne: valHava, isaret: [0, -8.5, 0], patlat: [0, 0, 0] }
        ];

        const etiketYerleri = [1, 2, 3, 4, 5].map((a) => ({ nesne: valfGovde, konum: [0, UST.includes(a) ? 19 : -20, AGIZ[a] + (a === 4 || a === 5 ? -9 : 9)], parca: 6 }))   // rakorun yanında, kesit düzleminde (kesitte de görünür)
          .concat([{ nesne: pilot, konum: [0, 0, -79], parca: 8 }]);

        const RENK = { basinc: y.malzeme('kuzey').color.clone(), egzoz: y.malzeme('guney').color.clone(), bos: y.malzeme('sac').color.clone(), hortum: y.malzeme('kabloSiyah').color.clone() };
        return {
          kok,
          parcalar,
          etiketYerleri,
          cerceve: [[1 + STROK + 181, 0, 0]],   // ileri çıkmış kolun ucu da kadraja girsin
          uygula(s) {
            /* Malzemeler burada okunur: çalışma zamanı her parçaya kendi kopyasını verir. */
            const p = 1 + STROK * s.p, ileri = s.k > 0.5;
            pistonIc.position.z = p;
            kolIc.position.z = p;
            makaraG.position.z = KAYMA * s.k;
            yayAg.scale.z = (26.4 - KAYMA * s.k) / 26.4;
            yayAg.position.z = 41.5 + KAYMA * s.k;
            arkaOda.position.z = p / 2; arkaOda.scale.z = Math.max(0.05, p - 0.1);
            onOda.position.z = (p + 18.05 + 127.95) / 2; onOda.scale.z = 127.95 - p - 18.05;
            const durum = { 1: 'basinc', 2: ileri ? 'egzoz' : 'basinc', 4: ileri ? 'basinc' : 'egzoz', 3: ileri ? 'egzoz' : 'bos', 5: ileri ? 'bos' : 'egzoz' };
            Object.keys(kanal).forEach((a) => kanal[a].material.color.copy(RENK[durum[a]]));
            arkaOda.material.color.copy(RENK[durum[4]]);
            onOda.material.color.copy(RENK[durum[2]]);
            const hortumRenk = (m, d) => m.material.color.copy(RENK.hortum).lerp(RENK[d], 0.75);
            hortumRenk(h4, durum[4]); hortumRenk(h2, durum[2]); hortumRenk(h1, 'basinc');
            sensorler.children[1].material.color.set(s.p <= 0.02 ? 0xffc21a : 0x3a3218);
            sensorler.children[4].material.color.set(s.p >= 0.98 ? 0xffc21a : 0x3a3218);
            pilot.children[2].material.color.set(s.y1 ? 0xffc21a : 0x3a3218);
          }
        };
      }
    }
  });
})();
