/* Step motorlar: konu tanımı ve bilgi sayfaları. */
VERI.konular.push({
  id: 'step-motorlar', ad: 'Step motorlar', ikon: 'step',
  ozet: 'Adım açısı, mikroadım, bağlantı',
  giris: 'Step motor her darbede sabit bir açı döner. Geri besleme yoktur; konumu, gönderilen darbe sayısından bilinir.',
  altlar: [
    { id: 'step-ic-yapi', kod: '3B', ad: 'İç yapı (3B model)', alt: 'Stator, sargılar, dişli rotor · parçala, kesit al, adım at', sayfa: 'step-ic-yapi' },
    { id: 'step-calisma-prensibi', kod: '1,8°', ad: 'Çalışma prensibi', alt: 'Adım açısı, tam ve yarım adım, tutma torku', sayfa: 'step-calisma-prensibi' },
    { id: 'step-nema', kod: 'NEMA', ad: 'Gövde boyutları (NEMA)', alt: 'NEMA 17, 23, 34 · flanş ve mil ölçüleri', sayfa: 'step-nema' },
    { id: 'step-surucu-baglantisi', kod: 'PUL', ad: 'Step motor ve sürücü bağlantısı', alt: 'PLC → sürücü → motor · darbe hesabı', sayfa: 'step-surucu-baglantisi' },
    { id: 'step-mikroadim', kod: '1/16', ad: 'Mikroadım ve rezonans', alt: 'Daha düzgün hareket, titreşimden kaçınma', sayfa: 'step-mikroadim' },
    { id: 'step-tork-hiz', kod: 'N·m', ad: 'Tork–hız eğrisi', alt: 'Hız arttıkça tork neden düşer', sayfa: 'step-tork-hiz' }
  ]
});

Object.assign(VERI.sayfalar, {
  'step-ic-yapi': {
    baslik: 'Step motorun iç yapısı',
    giris: 'Hibrit step motor iki kapak, sekiz kutuplu bir stator ve mıknatıslı dişli bir rotordan oluşur. Modeli döndür, parçalarına ayır, kesit al ve adım adım çalıştır.',
    etiketler: ['3B model', 'NEMA 17', 'Hibrit', '1,8°'],
    bolumler: [
      { id: 'model', kisa: '3B model', baslik: 'Parçalar', bloklar: [
        { tip: 'model', tur: 'step-motor' }
      ]},
      { id: 'rotor', kisa: 'Hibrit rotor', baslik: 'Rotor nasıl adım atar', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Mıknatıs, rotor kaplarından birini N, öbürünü S kutbu yapar.',
          'İki kabın dişleri yarım diş kaydırılmıştır: bir kutbun altında N kabının dişleri hizalıyken S kabının dişleri iki diş arasına denk gelir.',
          'Sargı enerjilenince stator kutbu N ya da S olur ve rotorun zıt kutuplu dişlerini kendine çeker.',
          'Sıradaki faz enerjilenince hizalanma bir sonraki kutba kayar; rotor bir adım döner.',
          'Sıra tersine dönünce motor ters döner. Sargı enerjili kaldıkça rotor olduğu yerde tutulur.'
        ]},
        { tip: 'formul', formul: 'θ = 360°/(2·m·Nr)', tanimlar: [['θ', 'adım açısı'], ['m', 'faz sayısı'], ['Nr', 'rotor kabı başına diş sayısı']],
          ornek: { baslik: 'İki fazlı, 50 dişli motor', satirlar: [['θ', '360° ÷ (2 × 2 × 50) = 1,8°'], ['Tur', '360° ÷ 1,8° = 200 adım']] } }
      ]},
      { id: 'olcum', kisa: 'Sargı uçları', baslik: 'Sargı uçlarını ölçerek bulmak', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Enerjiyi kes ve motor kablosunu sürücüden ayır.',
          'Multimetreyi direnç kademesine al; dört teli ikişer ikişer ölç.',
          'Birkaç ohm gösteren iki tel bir sargıdır (A+ / A−). Kalan iki tel öbür sargıdır (B+ / B−).',
          'Farklı sargıların telleri arasında devre açıktır. Bir sargıda da açık devre ölçülüyorsa sargı kopuktur.',
          'Motor istenenin tersine dönerse bir sargının iki ucunu (A+ ile A−) yer değiştir ya da sürücüde yön sinyalini ters çevir.'
        ]},
        { tip: 'not', metin: 'Faz direnci motora göre değişir; ölçtüğün değeri katalogdaki faz direnciyle karşılaştır. Altı ya da sekiz telli motorlarda sargıların orta ucu ya da ayrık yarımları vardır; bağlantı şekli kataloğa göre seçilir.' }
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Motor titriyor ama dönmüyor', satirlar: [
          ['Bir sargı kopuk ya da bağlantısı gevşek', 'Kontrol: iki sargının direncini ölç, klemens vidalarını sık.'],
          ['Sargı uçları karışık bağlanmış', 'Kontrol: aynı sargının iki ucunun sürücüde A+ / A− (ya da B+ / B−) klemenslerine gittiğini doğrula.'],
          ['Darbe frekansı ilk kalkış için çok yüksek', 'Kontrol: düşük hızla başlat, hızlanma rampası ekle.']
        ]},
        { tip: 'ariza', belirti: 'Motor gürültülü, elle çevrilince takılıyor', satirlar: [
          ['Rulman aşınmış', 'Kontrol: enerjisizken mili elle çevir. Detent tıkırtısı düzenli olmalı; sürtünme ya da cızırtı olmamalı.'],
          ['Kaplin eksenden kaçık ya da mil eğik', 'Kontrol: kaplini sök, motoru yüksüz çalıştır.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Motoru içini görmek için sökmek', 'Rotor statordan çıkınca mıknatıs zayıflayabilir, tork kalıcı olarak düşer. Doğrusu: motoru sökme; arızalıysa değiştir.'],
          ['Tel renklerine güvenerek bağlamak', 'Renk düzeni üreticiye göre değişir. Doğrusu: sargı çiftlerini ölçerek bul.'],
          ['Sürücü enerjiliyken motor soketini çıkarıp takmak', 'Oluşan ark ve gerilim sıçraması sürücünün çıkış katını bozabilir. Doğrusu: önce enerjiyi kes.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Step sürücü', 'Kaplin', 'Multimetre'] }
      ]}
    ]
  },
  'step-calisma-prensibi': {
    baslik: 'Step motor çalışma prensibi',
    giris: 'Step motorun iki sargısı sırayla enerjilenir; rotor her seferinde enerjili kutba doğru bir adım döner. Hibrit motorda dişli rotor bu adımı 1,8°’ye böler.',
    etiketler: ['Hibrit', '2 faz', '200 adım/tur'],
    bolumler: [
      { id: 'sema', kisa: 'Adım sırası', baslik: 'Adım sırası', bloklar: [
        { tip: 'sema', svg: 'stepPrensip',
          lejant: [['acc', 'Enerjili kutuplar'], ['dc', 'Rotorun yönü']],
          not: 'Tam adımda sıra A+ → B+ → A− → B− şeklindedir. Sıra tersine dönünce motor ters döner. Çizim prensibi gösterir; gerçek motorda her adım 1,8°’dir.' }
      ]},
      { id: 'aci', kisa: 'Adım açısı', baslik: 'Adım açısı', bloklar: [
        { tip: 'formul', formul: '360° ÷ 1,8° = 200 adım/tur', tanimlar: [] },
        { tip: 'tablo', satirlar: [
          ['1,8°', '', '200 adım/tur. En yaygın hibrit step motor.'],
          ['0,9°', '', '400 adım/tur. Daha hassas, düşük hızlı uygulamalar.'],
          ['7,5° · 15°', '', '48 · 24 adım/tur. Kalıcı mıknatıslı, ucuz motorlar.']
        ]}
      ]},
      { id: 'modlar', kisa: 'Tam / yarım', baslik: 'Tam ve yarım adım', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'tamadim', baslik: 'Tam adım', etiket: '200 adım', metin: 'Sargılar sırayla ya da ikisi birlikte enerjilenir. Tork yüksek, hareket kaba.' },
          { ikon: 'yarimadim', baslik: 'Yarım adım', etiket: '400 adım', metin: 'Tek ve çift sargı adımları sırayla uygulanır. Daha düzgün, tork biraz dalgalı.' }
        ]}
      ]},
      { id: 'tork', kisa: 'Tork', baslik: 'Tutma ve detent torku', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Tutma torku', '', 'Sargılar anma akımındayken mili döndürmek için gereken tork. Katalogdaki ana değerdir.'],
          ['Detent torku', '', 'Enerji yokken mıknatısın tuttuğu küçük tork. Mil elle çevrilince hissedilen tıkırtı budur.']
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Motor adım kaçırıyor, konum kayıyor', satirlar: [
          ['Hızlanma çok kısa', 'Kontrol: rampa süresini uzat.'],
          ['Sürücü akımı düşük', 'Kontrol: akım ayarını motor etiketine göre yap.'],
          ['Rezonans bölgesinde çalışıyor', 'Kontrol: mikroadımı artır ya da o hızdan hızlı geç.'],
          ['Yük torku fazla', 'Kontrol: tork–hız eğrisinde çalışma hızındaki torka bak.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Motoru yalnızca tutma torkuna göre seçmek', 'Hız arttıkça tork düşer; yüksek hızda motor yetmez. Doğrusu: tork–hız eğrisine bak.'],
          ['Sıcak gövdeyi hemen arıza sanmak', 'Step motor dururken de akım çeker ve ısınır. Doğrusu: katalogdaki sıcaklık sınırına bak, sürücüde bekleme akımı azaltmayı aç.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Step sürücü', 'Kaplin', 'Enkoder', 'Bilyalı vida', 'Kayış-kasnak'] }
      ]}
    ]
  },
  'step-nema': {
    baslik: 'Gövde boyutları (NEMA)',
    giris: 'NEMA numarası step motorun ön yüz ölçüsünü ve bağlantı deliklerini tanımlar. Tork gövde uzunluğuna ve sargıya bağlıdır; aynı NEMA’lı iki motorun torku çok farklı olabilir.',
    etiketler: ['NEMA 17', 'NEMA 23', 'NEMA 34'],
    bolumler: [
      { id: 'sema', kisa: 'Ön yüz', baslik: 'Ön yüz ölçüleri', bloklar: [
        { tip: 'sema', svg: 'stepNema',
          isaretler: [
            ['Yüz ölçüsü', 'Kare flanşın kenarı. NEMA numarası, bu ölçünün inç cinsinden 10 katıdır: NEMA 17 ≈ 1,7 inç.'],
            ['Delik aralığı', 'Bağlantı deliklerinin merkezleri arası.'],
            ['Merkezleme çıkıntısı', 'Pilot. Motoru montaj plakasında ortalar.'],
            ['Mil', 'Çapı ve boyu üreticiye göre değişir; düz ya da D kesitli olur.']
          ] }
      ]},
      { id: 'olculer', kisa: 'Ölçüler', baslik: 'Ölçü tablosu', bloklar: [
        { tip: 'tablo', satirlar: [
          ['NEMA 11', '', 'Yüz 28 mm · delik aralığı 23 mm · mil 4–5 mm'],
          ['NEMA 14', '', 'Yüz 35 mm · delik aralığı 26 mm · mil 5 mm'],
          ['NEMA 17', '', 'Yüz ≈ 42 mm · delik aralığı 31 mm · pilot Ø22 mm · mil 5 mm'],
          ['NEMA 23', '', 'Yüz ≈ 57 mm · delik aralığı 47,1 mm · pilot Ø38,1 mm · mil 6,35 ya da 8 mm'],
          ['NEMA 34', '', 'Yüz ≈ 86 mm · delik aralığı 69,6 mm · pilot Ø73 mm · mil 9,5–14 mm']
        ]},
        { tip: 'not', metin: 'Değerler tipiktir; mil ve pilot ölçüleri üreticiye göre değişir. Motorun teknik çizimine bak.' }
      ]},
      { id: 'secim', kisa: 'Seçim', baslik: 'Seçerken', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Gereken torku ve hızı tork–hız eğrisinden kontrol et.',
          'Aynı NEMA’da uzun gövde daha çok tork verir.',
          'Mil çapını kaplin ya da kasnakla eşleştir.',
          'Sürücünün akımı motorun faz akımına yetmeli.'
        ]}
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['NEMA numarasını tork sanmak', 'NEMA yalnızca yüz ölçüsüdür. Doğrusu: katalogdaki tutma torku ve tork–hız eğrisi.'],
          ['Mil çapına bakmadan kaplin almak', 'NEMA 23’te 6,35 ve 8 mm’lik miller var. Doğrusu: motorun çizimindeki mil çapı.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Montaj plakası', 'Kaplin', 'Kasnak', 'Step sürücü'] }
      ]}
    ]
  },
  'step-surucu-baglantisi': {
    baslik: 'Step motor ve sürücü bağlantısı',
    giris: 'PLC darbe gönderir, sürücü her darbeyi sargı akımına çevirir, motor her darbede bir adım döner. Hızı darbe frekansı, gidilen yolu darbe sayısı belirler.',
    etiketler: ['Hibrit, 2 fazlı', '1,8° / adım', 'Açık çevrim'],
    bolumler: [
      { id: 'sema', kisa: 'Şema', baslik: 'Bağlantı şeması', bloklar: [
        { tip: 'sema', svg: 'step',
          lejant: [['sig', 'Sinyal'], ['dc', 'DC +'], ['ink', 'DC − / sargı'], ['opt', 'İsteğe bağlı']],
          isaretler: [
            ['Sinyal hattı', 'PLC’nin transistör çıkışlarından darbe (Y0), yön (Y1) ve isteğe bağlı enable (Y2).'],
            ['Besleme', 'Sürücünün DC girişi. Gerilim aralığı sürücü etiketinde yazar; + ve − ters bağlanmaz.'],
            ['Motor sargıları', 'Bir sargının iki ucu aynı çifte gider: A+ / A− ya da B+ / B−.']
          ],
          not: 'Sinyal bağlantısı (NPN/PNP, ortak anot/katot) PLC çıkış tipine göre değişir. Sürücü kataloğundaki örnek şemayı esas al.' }
      ]},
      { id: 'klemensler', kisa: 'Klemensler', baslik: 'Klemensler', bloklar: [
        { tip: 'tablo', satirlar: [
          ['PUL+ / PUL−', 'sig', 'Darbe girişi. Her darbe bir adım ya da mikroadım.'],
          ['DIR+ / DIR−', 'sig', 'Yön girişi. Seviye değişince dönüş yönü değişir.'],
          ['ENA+ / ENA−', 'sig', 'Etkinleştirme. Çoğu sürücüde aktifken motor serbest kalır; kataloğa bak.'],
          ['A+ / A−', '', '1. sargı (A fazı).'],
          ['B+ / B−', '', '2. sargı (B fazı).'],
          ['V+ / GND', 'dc', 'DC besleme. Sürücü etiketindeki aralıkta olmalı.']
        ]}
      ]},
      { id: 'hesap', kisa: 'Hesap', baslik: 'Hesap: darbe, yol, hız', bloklar: [
        { tip: 'hesap', tur: 'step' }
      ]},
      { id: 'mekanik', kisa: 'Mekanik', baslik: 'Mekanik parçalar', bloklar: [
        { tip: 'sema', svg: 'mekanik',
          isaretler: [
            ['Kaplin', 'Motor milini vidaya bağlar, küçük eksen kaçıklığını tolere eder. Çeneli ve körüklü tipleri yaygın.'],
            ['Sabit uç yatağı (BK)', 'Açısal temaslı rulmanlarla eksenel yükü taşır.'],
            ['Bilyalı vida', 'Dönmeyi doğrusal harekete çevirir. Hatve: bir turda alınan yol.'],
            ['Somun ve tabla', 'Yükü taşır; tabla lineer ray üzerinde kayar.'],
            ['Serbest uç yatağı (BF)', 'Vidayı yalnızca radyal destekler, ısıl uzamaya izin verir.']
          ],
          not: 'Alternatifler: trapez mil daha ucuzdur ama sürtünmesi yüksektir. Sonsuz vida redüktörü yüksek tork ve düşük hız verir.' }
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Motor titriyor ama dönmüyor', satirlar: [
          ['Sargı çifti yanlış eşleşmiş', 'Kontrol: ölçü aletiyle direnç ölç. Aynı sargının iki ucu birkaç ohm gösterir, farklı sargılar açık devre.'],
          ['Darbe frekansı yüksek başlıyor', 'Kontrol: hızlanma rampası ekle, düşük hızda başlat.'],
          ['Sürücü akımı düşük ayarlı', 'Kontrol: DIP anahtarlarını motorun anma akımına göre ayarla.'],
          ['Mekanik sıkışma', 'Kontrol: kaplini ayır, motoru boşta dene.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Röle çıkışlı PLC ile darbe vermek', 'Röle bu hızda anahtarlanamaz. Doğrusu: transistör çıkışlı (darbe çıkışı olan) PLC.'],
          ['5 V girişe doğrudan 24 V vermek', 'Optokuplör girişi zarar görebilir. Doğrusu: seri direnç ya da 24 V uyumlu giriş; değer kataloğda yazar.'],
          ['Enerji varken motor soketini sökmek', 'Sargıda biriken enerji sürücüye zarar verebilir. Doğrusu: önce beslemeyi kes.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Kaplin', 'Bilyalı vida', 'BK / BF yatak', 'Lineer ray', 'Trapez mil', 'Sonsuz vida redüktörü', 'Endüktif sensör'] }
      ]}
    ]
  },
  'step-mikroadim': {
    baslik: 'Mikroadım ve rezonans',
    giris: 'Mikroadımda sürücü iki sargının akımını sinüse yakın basamaklarla değiştirir. Rotor tam adımlar arasındaki ara konumlarda durur; hareket düzgünleşir, titreşim azalır.',
    etiketler: ['1/2 – 1/256', 'Sinüs akım', 'Rezonans'],
    bolumler: [
      { id: 'sema', kisa: 'Akımlar', baslik: 'Sargı akımları', bloklar: [
        { tip: 'sema', svg: 'stepMikro',
          lejant: [['sig', 'A sargısı'], ['ink', 'B sargısı']],
          not: 'Tam adımda akım kare dalga gibi aniden değişir. Mikroadımda sinüse yaklaşan basamaklarla değişir.' }
      ]},
      { id: 'darbe', kisa: 'Darbe', baslik: 'Tur başına darbe', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Tam', '', '200 darbe/tur'],
          ['1/2', '', '400 darbe/tur'],
          ['1/4', '', '800 darbe/tur'],
          ['1/8', '', '1.600 darbe/tur'],
          ['1/16', '', '3.200 darbe/tur'],
          ['1/32', '', '6.400 darbe/tur']
        ]},
        { tip: 'not', metin: 'Mikroadım arttıkça aynı hız için PLC’nin daha yüksek frekansta darbe vermesi gerekir.' }
      ]},
      { id: 'artieksi', kisa: 'Artı / eksi', baslik: 'Artısı ve eksisi', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'arti', baslik: 'Artısı', etiket: 'Düzgün hareket', metin: 'Titreşim ve ses azalır, düşük hızda hareket akıcı olur.' },
          { ikon: 'eksi', baslik: 'Eksisi', etiket: 'Doğruluk sınırlı', metin: 'Mikroadım başına tork küçüktür; yük altında rotor her mikroadımı tam izlemez. Çözünürlük artar, doğruluk aynı oranda artmaz.' }
        ]}
      ]},
      { id: 'rezonans', kisa: 'Rezonans', baslik: 'Rezonanstan kaçınma', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Mikroadımı artır; en kolay ve etkili çözüm.',
          'Rezonans hızında sürekli çalışmaktan kaçın; rampayla o bölgeden hızlı geç.',
          'Sürücüde anti-rezonans özelliği varsa aç.',
          'Mile ya da kaplin tarafına mekanik sönümleyici ekle.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Belli bir hızda ses ve titreşim artıyor, motor duruyor', satirlar: [
          ['Orta hız rezonansı', 'Kontrol: hızı biraz değiştir; sorun kayboluyorsa rezonanstır.'],
          ['Tam adımda çalışıyor', 'Kontrol: 1/8 ya da daha yüksek mikroadım dene.'],
          ['Motor boşta çalışıyor', 'Olası neden: sönüm yok; boşta rezonans daha belirgindir. Kontrol: yük bağlıyken dene.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Mikroadımı artırınca doğruluğun aynı oranda arttığını sanmak', 'Mekanik boşluk ve yük torku gerçek konumu belirler. Doğrusu: hassasiyet gerekiyorsa enkoderli sistem.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Step sürücü', 'Sönümleyici', 'Kaplin', 'Enkoder'] }
      ]}
    ]
  },
  'step-tork-hiz': {
    baslik: 'Tork–hız eğrisi',
    giris: 'Step motorun torku hız arttıkça düşer: sargı endüktansı yüzünden akım, yüksek hızda anma değerine ulaşacak zamanı bulamaz. Motor seçimi bu eğriye göre yapılır.',
    etiketler: ['Pull-out', 'Pull-in', 'Emniyet payı'],
    bolumler: [
      { id: 'sema', kisa: 'Eğri', baslik: 'Eğriyi okumak', bloklar: [
        { tip: 'sema', svg: 'stepTork',
          lejant: [['sig', 'Pull-out'], ['opt2', 'Pull-in']],
          isaretler: [
            ['Tutma torku', 'Sıfır hızdaki tork; eğrinin başlangıcı.'],
            ['Pull-out eğrisi', 'Rampayla hızlanırken motorun verebileceği en yüksek tork. Bunun üstünde adım kaçırır.'],
            ['Pull-in eğrisi', 'Rampasız, anında kalkışta verebileceği tork. Daha düşüktür.'],
            ['Rezonans bölgesi', 'Eğride çukur oluşabilen bölge; bu hızda sürekli çalışılmaz.']
          ],
          not: 'Eğri belirli bir sürücü, besleme gerilimi ve mikroadım için ölçülür. Katalogdaki koşulları kontrol et.' }
      ]},
      { id: 'neden', kisa: 'Neden düşer', baslik: 'Tork neden düşer', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'manyetik', baslik: 'Endüktans', etiket: 'Akım gecikir', metin: 'Hız arttıkça her adımın süresi kısalır; akım hedef değere çıkamadan yön değiştirir.' },
          { ikon: 'gerilim', baslik: 'Gerilim', etiket: 'Yüksek gerilim yardımcı olur', metin: 'Sürücü beslemesi yükseldikçe akım daha hızlı yükselir, yüksek hızdaki tork artar. Sürücü ve motor sınırlarına dikkat.' }
        ]}
      ]},
      { id: 'secim', kisa: 'Seçim', baslik: 'Seçim adımları', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Yükü, en yüksek hızı ve hızlanma süresini yaz.',
          'Hızlanma torkunu da hesaba kat: tork = atalet × açısal ivme.',
          'Eğride en yüksek çalışma hızındaki torka bak.',
          'En az %30–50 emniyet payı bırak.',
          'Sürücü gerilimini katalog eğrisindekiyle aynı seç.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Yüksek hızda motor duruyor, uğulduyor', satirlar: [
          ['Tork eğrinin altında kaldı', 'Kontrol: hızı düşür ya da daha büyük motor, daha yüksek gerilim.'],
          ['Rampa çok kısa', 'Kontrol: hızlanma süresini uzat.'],
          ['Sürücü gerilimi düşük', 'Kontrol: besleme gerilimini yük altında ölç.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Eğriyi farklı gerilimdeki sürücüye uygulamak', 'Katalog eğrisi 48 V’ta çizilmişse 24 V’ta yüksek hız torku daha düşüktür. Doğrusu: eğrinin koşullarını eşleştir.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Step sürücü', 'Güç kaynağı', 'Redüktör'] }
      ]}
    ]
  },
});
