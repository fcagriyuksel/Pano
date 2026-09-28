/* Pnömatik: konu tanımı ve bilgi sayfaları. */
VERI.konular.push({
  id: 'pnomatik', ad: 'Pnömatik', ikon: 'pnomatik',
  ozet: 'Valf, silindir, hava hazırlama',
  giris: 'Basınçlı havayla doğrusal ve döner hareket üretilir. Elektrik tarafı valf bobinlerini sürer, sensörler silindirin konumunu PLC’ye bildirir.',
  altlar: [
    { id: 'pnomatik-ic-yapi', kod: '3B', ad: 'Silindir ve 5/2 valf: iç yapı (3B)', alt: 'Makara, piston, sensörler · hava yolu', sayfa: 'pnomatik-ic-yapi' },
    { id: 'pnomatik-valf', kod: '5/2', ad: 'Valf tipleri ve sembolleri', alt: '3/2, 5/2, 5/3 · monostabil, bistabil · simülasyon', sayfa: 'pnomatik-valf' },
    { id: 'pnomatik-silindir', kod: 'Ø', ad: 'Silindir ve kuvvet', alt: 'Tek, çift etkili · kuvvet hesabı · sensör', sayfa: 'pnomatik-silindir' },
    { id: 'hava-hazirlama', kod: 'FRL', ad: 'Hava hazırlama', alt: 'Filtre, regülatör, kapatma valfi · tüketim', sayfa: 'hava-hazirlama' },
    { id: 'valf-adasi', kod: 'VA', ad: 'Valf adası ve arıza', alt: 'Bobin LED’i, manuel buton · arıza sırası', sayfa: 'valf-adasi' }
  ]
});

Object.assign(VERI.sayfalar, {
  'pnomatik-ic-yapi': {
    baslik: 'Silindir ve valfin iç yapısı',
    giris: '5/2 valfin içindeki makara, basınçlı havayı silindirin bir tarafına verirken öbür tarafı egzoza açar. Piston bu basınç farkıyla hareket eder; pistondaki mıknatıs konum sensörlerini tetikler.',
    etiketler: ['3B model', 'ISO 15552', 'ISO 5599', '5/2 monostabil'],
    bolumler: [
      { id: 'model', kisa: '3B model', baslik: 'Parçalar', bloklar: [
        { tip: 'model', tur: 'pnomatik-silindir' }
      ]},
      { id: 'calisma', kisa: 'Çalışma', baslik: 'Bir çevrim', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Y1 enerjisiz: yay makarayı sola iter. 1→2 açık, kol tarafı basınçlı; silindir geride durur. 4→5 açık, arka oda egzoza açık.',
          'Y1’e sinyal gelir: bobin pilot valfi açar, 1’den alınan pilot hava makarayı sağa iter.',
          '1→4 açılır, arka oda basınçlanır; 2→3 açılır, kol tarafındaki hava egzozdan çıkar. Silindir ileri gider.',
          'Piston ileri konuma gelince mıknatıs B2’yi tetikler; PLC bir sonraki adıma geçer.',
          'Sinyal kesilince yay makarayı geri iter; silindir geri döner, B1 algılar.'
        ]},
        { tip: 'not', metin: 'Kuvvet: F = p × A. Ø32 silindirde 6 bar ile ileri kuvvet yaklaşık 480 N, geri kuvvet (kol alanı çıkar, Ø12 kol) yaklaşık 415 N’dir; sürtünme bunu biraz azaltır. Hesap için “Silindir ve kuvvet” sayfasına bak.' }
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Kilitli manuel butonu basılı bırakmak', 'Valf PLC sinyalinden bağımsız kalır; PLC silindiri durduramaz. Doğrusu: manuel butonu yalnızca arıza ararken kullan, sonra geri al.'],
          ['Hava kesilince silindirin yerinde kalacağını sanmak', 'Basınç düşünce yük kolu itebilir; dikey silindirde yük düşer. Doğrusu: yük tutma gereken yerde kilitli silindir ya da pilot kumandalı çek valf.'],
          ['Sensörü kanala gevşek takmak', 'Titreşimle kayar; silindir yerine geldiği hâlde sinyal gelmez. Doğrusu: sensörü uç konumda ayarla, vidasını sık.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Hava hazırlama ünitesi', 'Hız ayar (kısma) valfi', 'Silindir sensörü', 'Valf adası'] }
      ]}
    ]
  },
  'pnomatik-valf': {
    baslik: 'Valf tipleri ve sembolleri',
    giris: 'Valf, basınçlı havanın yolunu değiştirir. Adı iki sayıdan oluşur: bağlantı ağzı sayısı / konum sayısı. 5/2 valf, 5 ağızlı ve 2 konumludur; çift etkili silindiri sürer.',
    etiketler: ['3/2 · 5/2 · 5/3', 'Monostabil · bistabil', 'Ağız numaraları'],
    bolumler: [
      { id: 'sim', kisa: 'Simülasyon', baslik: '5/2 valf ve silindir', bloklar: [
        { tip: 'sim', tur: 'valf52' }
      ]},
      { id: 'semboller', kisa: 'Sembol', baslik: 'Sembol nasıl okunur', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Her kare valfin bir konumudur; kare sayısı konum sayısını verir.',
          'Borular, valfin şu an çalışan konumunun karesine bağlı çizilir (normal konum).',
          'Kare içindeki ok havanın yönünü, T işareti kapalı ağzı gösterir.',
          'Kenardaki semboller valfi çalıştıranı gösterir: bobin, yay, pilot hava ya da buton.',
          'Bobin enerjilenince bobin tarafındaki kare devreye girer.'
        ]}
      ]},
      { id: 'tipler', kisa: 'Tipler', baslik: 'Valf tipleri', bloklar: [
        { tip: 'tablo', satirlar: [
          ['3/2 NC', '', 'Normalde kapalı. Tek etkili silindir, hava üfleme, vakum.'],
          ['5/2', 'sig', 'Çift etkili silindirin en yaygın valfi.'],
          ['5/3 kapalı merkez', '', 'Orta konumda bütün ağızlar kapalı; silindir ara konumda durur (sızıntı kadar kayabilir).'],
          ['5/3 egzoz merkez', '', 'Orta konumda silindirin iki tarafı egzoza açılır; silindir elle itilebilir.'],
          ['5/3 basınç merkez', '', 'Orta konumda iki taraf da basınçlı; mil alanı farkından silindir yavaşça ileri gider.']
        ]},
        { tip: 'kartlar', kartlar: [
          { ikon: 'yay', baslik: 'Monostabil', etiket: 'Yay dönüşlü', metin: 'Bobin enerjisi kesilince yay valfi normal konuma döndürür. Enerji kesintisinde konum bellidir.' },
          { ikon: 'kilit', baslik: 'Bistabil', etiket: 'Hafızalı', metin: 'İki bobinlidir; kısa bir darbe yeter, valf son konumunda kalır. Enerji kesilince silindir yerinde kalır.' }
        ]}
      ]},
      { id: 'agizlar', kisa: 'Ağızlar', baslik: 'Ağız numaraları (ISO 5599)', bloklar: [
        { tip: 'tablo', satirlar: [
          ['1', 'sig', 'Besleme (eski gösterim P).'],
          ['2 · 4', 'sig', 'Çalışma çıkışları (A, B).'],
          ['3 · 5', '', 'Egzoz (R, S). Susturucu takılır.'],
          ['12 · 14', '', 'Pilot uyarı: 14, 1’i 4’e bağlayan konuma; 12, 1’i 2’ye bağlayan konuma geçirir.']
        ]}
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Acil durumda bistabil valfin kendiliğinden döneceğini sanmak', 'Bistabil valf son konumda kalır; enerji kesilince silindir durmaz ya da dönmez. Doğrusu: güvenli konum gereken yerde monostabil valf ve risk analizi.'],
          ['5/3 kapalı merkezi silindiri kilitler sanmak', 'Valf ve contalardaki sızıntıyla yük yavaşça kayar. Doğrusu: yük tutma gerekiyorsa pilot kumandalı çek valf ya da mekanik kilit.'],
          ['Egzoz ağızlarını tıkamak', 'Hava çıkamaz; silindir hareket etmez ya da çok yavaşlar. Doğrusu: susturucu tak, temiz tut.']
        ]}
      ]}
    ]
  },
  'pnomatik-silindir': {
    baslik: 'Silindir ve kuvvet',
    giris: 'Silindir, basınçlı havayı doğrusal harekete çevirir. Kuvvet, basınç ile piston alanının çarpımıdır; geri dönüşte mil alanı çıktığı için kuvvet daha küçüktür.',
    etiketler: ['Tek · çift etkili', 'F = p × A', 'Manyetik sensör'],
    bolumler: [
      { id: 'yapi', kisa: 'Yapı', baslik: 'Silindirin yapısı', bloklar: [
        { tip: 'sema', svg: 'silindirKesit',
          lejant: [['sig', 'Basınçlı taraf'], ['acc', 'Mıknatıs']],
          isaretler: [
            ['Piston ve mıknatıs', 'Pistondaki mıknatıs halka, gövde üzerindeki sensörün konumu algılamasını sağlar.'],
            ['Mil', 'Kuvveti yüke aktarır. Yanal yük taşımaz; kılavuz gerekir.'],
            ['Hava ağızları', 'Arka ağız basınçlanınca silindir ileri, ön ağız basınçlanınca geri gider.'],
            ['Manyetik sensör', 'Gövdedeki kanala takılır. Piston sensörün altına gelince LED yanar ve PLC’ye sinyal gider.']
          ] }
      ]},
      { id: 'hesap', kisa: 'Kuvvet', baslik: 'Kuvvet hesabı', bloklar: [
        { tip: 'hesap', tur: 'silindir' }
      ]},
      { id: 'tipler', kisa: 'Tipler', baslik: 'Tek ve çift etkili', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'yay', baslik: 'Tek etkili', etiket: 'Yay dönüşlü', metin: 'Tek yönde havayla, geri dönüşte yayla hareket eder. 3/2 valfle sürülür. Kısa strok, sıkıştırma.' },
          { ikon: 'acik', baslik: 'Çift etkili', etiket: 'İki yönde hava', metin: 'İki yönde de havayla itilir; kuvvet ve hız iki yönde ayarlanır. 5/2 ya da 5/3 valfle sürülür.' }
        ]}
      ]},
      { id: 'sensor', kisa: 'Sensör', baslik: 'Sensör ve hız ayarı', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Silindiri uç konuma götür (manuel butonla ya da elle).',
          'Sensörü kanal boyunca kaydır; LED yandığı noktayı bul.',
          'Sensörü LED’in yandığı aralığın ortasına al ve sık.',
          'Hızı, çıkan havayı kısarak (meter-out) ayarla: kısma valfi silindirin çıkış tarafında olmalı.',
          'Uçta vuruntu varsa yastıklama vidasını kademeli kıs.'
        ]},
        { tip: 'tablo', satirlar: [
          ['Reed sensör', '', 'Mekanik kontaklı, genelde 2 telli. Ucuz; yüksek frekansta ve titreşimde ömrü kısalır.'],
          ['Elektronik (GMR)', 'sig', '3 telli PNP. Aşınmaz, daha hassastır. Günümüzde yaygın.']
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Silindir yavaş ya da sarsıntılı', satirlar: [
          ['Basınç düşük', 'Kontrol: silindir hareket ederken regülatör manometresine bak.'],
          ['Kısma aşırı kapalı', 'Kontrol: kısma vidalarını yarım tur açıp dene.'],
          ['Conta aşınmış', 'Kontrol: silindir dururken egzozdan sürekli hava geliyorsa iç kaçak vardır.'],
          ['Mekanik sıkışma', 'Kontrol: havayı boşalt, mili elle hareket ettir.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Mile yanal yük bindirmek', 'Burç ve conta hızla aşınır, mil eğilir. Doğrusu: yükü kılavuzla taşı, mili yalnızca itmek için kullan.'],
          ['Hızı giren havayı kısarak ayarlamak', 'Çift etkili silindirde hareket kesik kesik olur. Doğrusu: çıkan havayı kıs (meter-out).']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Kısma valfi', 'Manyetik sensör', 'Rot başı', 'Silindir bağlantı ayağı', 'Susturucu'] }
      ]}
    ]
  },
  'hava-hazirlama': {
    baslik: 'Hava hazırlama',
    giris: 'Kompresörden gelen hava nem, yağ ve partikül taşır. Şartlandırıcı havayı filtreler ve basıncını sabitler. Makine girişinde kilitlenebilir, sistemi boşaltan bir kapatma valfi de olmalıdır.',
    etiketler: ['Filtre · regülatör', 'Kapatma-boşaltma', 'Hava tüketimi'],
    bolumler: [
      { id: 'zincir', kisa: 'Sıra', baslik: 'Hava hazırlama sırası', bloklar: [
        { tip: 'sema', svg: 'frl',
          lejant: [['sig', 'Basınçlı hava']],
          isaretler: [
            ['Kapatma-boşaltma valfi', 'Makinenin havasını keser ve içerideki basıncı boşaltır. Bakımda asma kilitle kilitlenir.'],
            ['Filtre', 'Su ve partikülü tutar. Kabında biriken su tahliye edilmeli; otomatik tahliyeli tipler yaygındır.'],
            ['Regülatör', 'Çıkış basıncını sabitler (tipik 6 bar). Ayar düğmesi kilitlenebilir.'],
            ['Yumuşak başlatma', 'Basıncı yavaşça yükseltir; silindirlerin ilk açılışta sert hareket etmesini önler.'],
            ['Basınç şalteri', 'Basınç düşünce PLC’ye sinyal verir; makine hatalı çalışmadan durur.']
          ],
          not: 'Yağlayıcı günümüzde çoğu zaman kullanılmaz. Yağlanarak çalıştırılan bir sistem, fabrika yağı yıkandığı için bundan sonra hep yağlanmalıdır.' }
      ]},
      { id: 'hesap', kisa: 'Tüketim', baslik: 'Hava tüketimi', bloklar: [
        { tip: 'hesap', tur: 'hava' }
      ]},
      { id: 'bakim', kisa: 'Bakım', baslik: 'Bakım', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Filtre kabındaki suyu boşalt; otomatik tahliyenin çalıştığını kontrol et.',
          'Filtre elemanını, iki tarafı arasındaki basınç farkı arttığında ya da üretici süresinde değiştir.',
          'Regülatör ayarını kontrol et ve kilitle.',
          'Makine dururken kaçak dinle; sabunlu su ya da ultrasonik kaçak dedektörü kullan.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Makinede basınç düşüyor', satirlar: [
          ['Kaçak', 'Kontrol: makine dururken hortum bağlantılarını ve silindir contalarını dinle.'],
          ['Tıkalı filtre', 'Kontrol: filtre girişi ile çıkışı arasındaki basınç farkına bak.'],
          ['Kompresör yetersiz', 'Kontrol: toplam hava tüketimini hesapla, kompresör kapasitesiyle karşılaştır.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Havayı kesip içerideki basıncı boşaltmadan çalışmak', 'Silindirler basınçlı kalır, beklenmedik hareket edebilir. Doğrusu: boşaltmalı kapatma valfi ve kilitleme.'],
          ['Regülatörü sonuna kadar açık bırakmak', 'Silindirler gereğinden sert çalışır, hava boşa harcanır. Doğrusu: işin gerektirdiği en düşük basınç.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Şartlandırıcı', 'Kapatma-boşaltma valfi', 'Basınç şalteri', 'Manometre', 'Otomatik tahliye'] }
      ]}
    ]
  },
  'valf-adasi': {
    baslik: 'Valf adası ve arıza',
    giris: 'Valf adası birçok valfi ortak besleme ve egzozlu tek gövdede toplar. Bobinler çok pinli bir konnektörle ya da haberleşmeyle (PROFINET, EtherCAT, IO-Link) sürülür. Arızaların çoğu elektrikte değil, hava tarafındadır.',
    etiketler: ['Bobin LED’i', 'Manuel buton', 'Arıza sırası'],
    bolumler: [
      { id: 'yapi', kisa: 'Yapı', baslik: 'Valf adası', bloklar: [
        { tip: 'sema', svg: 'valfAdasi',
          isaretler: [
            ['Bus / konnektör', 'Bobin sinyalleri buradan gelir. Haberleşmeli adada her bobin bir çıkış bitidir.'],
            ['Bobin LED’i', 'Bobin enerjiliyken yanar. Elektrik tarafının çalıştığını gösterir.'],
            ['Manuel buton', 'Valfi elle çalıştırır. Arıza bulmada hava tarafını elektrikten ayırmak için kullanılır.'],
            ['Ortak besleme ve egzoz', 'Bütün valfler 1 numaralı ağızdan beslenir, 3/5’ten boşaltır.'],
            ['İstasyon çıkışları', 'Her valfin 2 ve 4 ağızları silindirlere gider.']
          ] }
      ]},
      { id: 'sira', kisa: 'Arıza sırası', baslik: 'Silindir hareket etmiyor: sıra', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Bobin LED’ine bak: yanmıyorsa sorun elektrikte (PLC çıkışı, adres, kablo, besleme).',
          'LED yanıyorsa manuel butonla valfi çalıştır: silindir gidiyorsa bobin ya da pilot tarafı arızalıdır.',
          'Manuel butonla da gitmiyorsa hava tarafına bak: basınç, kısma vidaları, hortum.',
          'Hâlâ gitmiyorsa havayı boşaltıp silindiri elle dene: mekanik sıkışma ya da yük.'
        ]}
      ]},
      { id: 'bobin', kisa: 'Bobin', baslik: 'Bobin ve bağlantı', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Gerilim', 'dc', 'Endüstride çoğunlukla 24 V DC, 1–2,5 W (≈ 40–100 mA).'],
          ['Koruma', '', 'Çoğu bobinde LED ve söndürme diyotu içindedir; yoksa ters paralel diyot ekle.'],
          ['Pilot basıncı', 'sig', 'Pilot kumandalı valf çalışmak için en az 2–3 bar ister; basınç düşükse bobin çekse de valf dönmez.']
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'LED yanıyor ama silindir hareket etmiyor', satirlar: [
          ['Pilot basıncı düşük', 'Kontrol: ada girişindeki basıncı ölç.'],
          ['Valf sıkışmış', 'Kontrol: manuel butonla dene; su ve kir varsa valfi temizle ya da değiştir.'],
          ['Kısma vidası kapalı', 'Kontrol: silindirdeki kısma valflerini aç.'],
          ['Yanlış istasyon', 'Kontrol: hortumların doğru istasyona ve 2/4 ağzına takıldığını kontrol et.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Manuel butonu kilitli konumda bırakmak', 'Valf PLC ne derse desin çalışır; makine beklenmedik hareket eder. Doğrusu: testten sonra butonu serbest bırak.'],
          ['Basınç altındayken hortum sökmek', 'Hortum savrulur, göz ve yüz yaralanır. Doğrusu: önce kapatma valfiyle havayı kes ve boşalt.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Valf adası', 'Bus modülü', 'Susturucu', 'Pnömatik hortum', 'Hızlı bağlantı rakoru'] }
      ]}
    ]
  },
});
