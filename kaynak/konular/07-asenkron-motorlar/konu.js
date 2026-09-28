/* Asenkron motorlar: konu tanımı ve bilgi sayfaları. */
VERI.konular.push({
  id: 'asenkron-motorlar', ad: 'Asenkron motorlar', ikon: 'motorA',
  ozet: 'Bağlantı, etiket, tork, yol verme',
  giris: 'Üç fazlı asenkron motor sanayideki motorların büyük çoğunluğudur. Doğru bağlantı ve yol verme, motorun ömrünü doğrudan belirler.',
  altlar: [
    { id: 'motor-ic-yapi', kod: '3B', ad: 'Asenkron motor: iç yapı (3B)', alt: 'Stator, sincap kafesli rotor, klemens kutusu · döner alan', sayfa: 'motor-ic-yapi' },
    { id: 'motor-baglanti', kod: 'U1', ad: 'Yıldız ve üçgen bağlantı', alt: 'Klemens köprüleri · etiket gerilimi', sayfa: 'motor-baglanti' },
    { id: 'motor-etiketi', kod: 'kW', ad: 'Motor etiketi ve akım', alt: 'Etiketi okumak · akım hesabı', sayfa: 'motor-etiketi' },
    { id: 'guc-tork', kod: 'N·m', ad: 'Güç, tork ve devir', alt: 'T = 9550 · P ÷ n · kutup sayısı · redüktör', sayfa: 'guc-tork' },
    { id: 'yol-verme', kod: 'DOL', ad: 'Yol verme yöntemleri', alt: 'Direkt, yıldız-üçgen, yumuşak yol verici, VFD', sayfa: 'yol-verme' },
    { id: 'motor-ariza', kod: 'Ω', ad: 'Motor arızası ve ölçüm', alt: 'Sargı direnci, izolasyon, akım dengesi', sayfa: 'motor-ariza' }
  ]
});

Object.assign(VERI.sayfalar, {
  'motor-ic-yapi': {
    baslik: 'Asenkron motorun iç yapısı',
    giris: 'Üç fazlı asenkron motorda stator sargıları döner bir manyetik alan oluşturur. Bu alan sincap kafesli rotorda akım endükler; rotor alanın arkasından, biraz daha yavaş döner.',
    etiketler: ['3B model', 'IEC 60034', 'Döner alan', 'Kayma'],
    bolumler: [
      { id: 'model', kisa: '3B model', baslik: 'Parçalar', bloklar: [
        { tip: 'model', tur: 'asenkron-motor' }
      ]},
      { id: 'calisma', kisa: 'Çalışma', baslik: 'Nasıl döner', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Üç faz akımı, aralarında 120° faz farkıyla sargılardan geçer; toplam alan stator boşluğunda döner.',
          'Döner alan hızı: ns = 120 × f ÷ kutup sayısı (50 Hz, 4 kutup: 1.500 d/dk).',
          'Alan rotor çubuklarını keser, çubuklarda akım endüklenir; akım ile alan torku üretir.',
          'Rotor alanın hızına ulaşamaz; ulaşsa çubuklar alanı kesmez, tork kalmaz. Aradaki fark kaymadır: s = (ns − n) ÷ ns.',
          'Yük arttıkça kayma ve akım artar. Anma yükünde kayma küçük motorlarda yüzde birkaç, büyük motorlarda daha azdır.'
        ]},
        { tip: 'not', metin: 'Modelde döner alan yavaşlatıldı, kayma abartıldı. Renkler oluklardaki anlık akımı gösterir: iki kırmızı ve iki mavi bölge 4 kutbu oluşturur. İki fazın yeri değişince desen de rotor da ters döner. Yıldız mı üçgen mi olacağını motor etiketi söyler: 230/400 V motor 400 V şebekede yıldız, 400/690 V motor üçgen bağlanır.' }
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Gövde kanatlarını ve fan ızgarasını kirli bırakmak', 'Soğutma azalır; sargı sıcaklığı her 10 °C arttığında yalıtım ömrü kabaca yarıya iner. Doğrusu: kanatları ve ızgarayı düzenli temizle.'],
          ['Sürücüyle düşük devirde uzun süre yüklü çalıştırmak', 'Mile takılı fan yavaş döner, motor ısınır. Doğrusu: ayrı fanlı motor kullan ya da kataloğun düşük devir tork eğrisine uy.'],
          ['Kaplini hizalamadan bağlamak', 'Mil ve rulmanlar zorlanır, titreşim artar, rulman erken bozulur. Doğrusu: kaplini komparatör ya da lazerle hizala.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Motor koruma şalteri', 'Kontaktör', 'Termik röle', 'Frekans çevirici', 'Kaplin'] }
      ]}
    ]
  },
  'motor-baglanti': {
    baslik: 'Yıldız ve üçgen bağlantı',
    giris: 'Motor klemens kutusunda altı uç vardır: sargı başları U1-V1-W1 ve sonları U2-V2-W2. Köprülerin yerleşimi motorun yıldız mı üçgen mi çalışacağını belirler.',
    etiketler: ['U1-V1-W1', 'W2-U2-V2', 'Köprü'],
    bolumler: [
      { id: 'sema', kisa: 'Klemens', baslik: 'Klemens kutusu', bloklar: [
        { tip: 'sema', svg: 'motorKlemens',
          lejant: [['l', 'L1'], ['l2', 'L2'], ['l3', 'L3']],
          isaretler: [
            ['Yıldız bağlantı', 'Köprüler alt sıradaki W2-U2-V2’yi birbirine bağlar. Her sargıya şebeke geriliminin 1/√3’ü düşer.'],
            ['Üçgen bağlantı', 'Köprüler dikey takılır: U1-W2, V1-U2, W1-V2. Her sargıya tam şebeke gerilimi düşer.'],
            ['Şebeke uçları', 'L1-L2-L3 üst sıradaki U1-V1-W1’e bağlanır.']
          ],
          not: 'Alt sıra W2-U2-V2 diye kaydırılmış dizilir; bu sayede aynı köprüler hem yatay hem dikey takılabilir.' }
      ]},
      { id: 'secim', kisa: 'Hangisi', baslik: 'Hangi bağlantı', bloklar: [
        { tip: 'tablo', satirlar: [
          ['230/400 V Δ/Y', '', '400 V şebekede yıldız bağlanır. Yıldız-üçgen yol verilemez.'],
          ['400/690 V Δ/Y', '', '400 V şebekede üçgen bağlanır. Yıldız-üçgen yol verilebilir.'],
          ['Kural', '', 'Etiketteki küçük gerilim üçgenin, büyük gerilim yıldızın gerilimidir.']
        ]}
      ]},
      { id: 'yon', kisa: 'Yön', baslik: 'Dönüş yönünü değiştirmek', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Enerjiyi kes, kilitle ve gerilim olmadığını ölç.',
          'Motor klemensinde ya da kontaktör çıkışında herhangi iki fazın yerini değiştir.',
          'Kısa süre çalıştırıp yönü kontrol et.',
          'Değişikliği şemaya işle.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Motor uğulduyor, dönmüyor ya da zor dönüyor', satirlar: [
          ['Bir faz yok', 'Kontrol: üç faz gerilimini motor klemensinde ölç.'],
          ['Üçgen yerine yıldız bağlanmış', 'Olası neden: 400/690 V motor yıldız bağlı; tork üçte bire düşer. Kontrol: etiketi ve köprüleri karşılaştır.'],
          ['Köprü gevşek', 'Kontrol: köprü somunlarını sık; yanık iz varsa değiştir.'],
          ['Mekanik sıkışma', 'Kontrol: kaplini ayırıp mili elle çevir.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['230/400 V motoru 400 V şebekede üçgen bağlamak', 'Sargılara 230 V yerine 400 V düşer; motor kısa sürede yanar. Doğrusu: yıldız.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Klemens kutusu', 'Köprü', 'Kontaktör', 'Motor koruma şalteri'] }
      ]}
    ]
  },
  'motor-etiketi': {
    baslik: 'Motor etiketi ve akım',
    giris: 'Motor etiketi bağlantıyı, korumayı ve kabloyu seçmek için gereken değerlerin hepsini verir. Etiketteki akım anma yükündeki hat akımıdır.',
    etiketler: ['kW', 'cos φ', 'IE sınıfı'],
    bolumler: [
      { id: 'sema', kisa: 'Etiket', baslik: 'Etiketi okumak', bloklar: [
        { tip: 'sema', svg: 'motorEtiket',
          isaretler: [
            ['Güç', 'Milden alınan mekanik güç. Şebekeden çekilen güç daha büyüktür: mil gücü ÷ verim.'],
            ['Gerilim ve bağlantı', '230/400 V Δ/Y: 230 V’ta üçgen, 400 V’ta yıldız.'],
            ['Akım', 'Her gerilim için ayrı yazılır: 8,1 A üçgende (230 V), 4,7 A yıldızda (400 V). Termik ayarı buna göre yapılır.'],
            ['cos φ', 'Güç faktörü; akım hesabında kullanılır.'],
            ['Devir', 'Anma yükündeki mil hızı. Senkron hızdan (4 kutuplu motorda 1500 d/dk) kayma kadar düşüktür.'],
            ['Koruma ve sınıflar', 'IP55: toz ve su jetine karşı koruma. F: izolasyon sınıfı. IE3: verim sınıfı.']
          ],
          not: 'Etiketteki değerler örnektir.' }
      ]},
      { id: 'hesap', kisa: 'Akım', baslik: 'Akım hesabı', bloklar: [
        { tip: 'hesap', tur: 'motorAkim' }
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Termiği yanlış gerilimin akımına ayarlamak', 'Motor 400 V’ta çalışıyorsa 400 V satırındaki akım kullanılır. Doğrusu: şebeke gerilimine karşılık gelen akım.'],
          ['kW değerini şebekeden çekilen güç sanmak', 'Etiketteki güç mil gücüdür. Doğrusu: çekilen güç = kW ÷ verim.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Termik röle', 'Motor koruma şalteri', 'Kontaktör', 'Kablo'] }
      ]}
    ]
  },
  'guc-tork': {
    baslik: 'Güç, tork ve devir',
    giris: 'Motor seçiminde güç, tork ve devir birbirine bağlıdır. Aynı güçte yavaş dönen motor daha büyük tork verir; redüktör de devri düşürüp torku bu yüzden artırır.',
    etiketler: ['T = 9550 · P ÷ n', 'Kutup sayısı', 'kW ↔ HP'],
    bolumler: [
      { id: 'egri', kisa: 'İlişki', baslik: 'Aynı güçte tork ve devir', bloklar: [
        { tip: 'sema', svg: 'torkEgri',
          lejant: [['sig', '5,5 kW sabit güç']],
          isaretler: [
            ['6 kutup', '960 d/dk: aynı güçte en yüksek tork.'],
            ['4 kutup', '1.450 d/dk: en yaygın motor.'],
            ['2 kutup', '2.900 d/dk: hızlı ama tork 4 kutuplunun yarısı.']
          ] }
      ]},
      { id: 'formul', kisa: 'Formül', baslik: 'Formül', bloklar: [
        { tip: 'formul', formul: 'T = 9550 × P ÷ n',
          tanimlar: [['T', 'Tork (N·m)'], ['P', 'Mil gücü (kW)'], ['n', 'Devir (d/dk)']],
          ornek: { baslik: 'Örnek · 5,5 kW, 1.450 d/dk', satirlar: [['T', '= 9550 × 5,5 ÷ 1.450 ≈ 36,2 N·m']] } }
      ]},
      { id: 'hesap', kisa: 'Hesap', baslik: 'Hesap', bloklar: [
        { tip: 'hesap', tur: 'tork' }
      ]},
      { id: 'kutup', kisa: 'Kutup', baslik: 'Kutup sayısı ve devir (50 Hz)', bloklar: [
        { tip: 'tablo', satirlar: [
          ['2 kutup', '', 'Senkron 3.000 d/dk · tipik 2.900'],
          ['4 kutup', '', 'Senkron 1.500 d/dk · tipik 1.450'],
          ['6 kutup', '', 'Senkron 1.000 d/dk · tipik 960'],
          ['8 kutup', '', 'Senkron 750 d/dk · tipik 720']
        ]},
        { tip: 'tablo', satirlar: [
          ['1 HP', 'sig', '0,746 kW'],
          ['1 kW', 'sig', '1,341 HP'],
          ['1 kgf·m', 'sig', '9,81 N·m']
        ]}
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Motoru yalnızca güce göre seçmek', 'Devir farklıysa tork da farklıdır; yavaş bir iş için hızlı motor yetmeyebilir. Doğrusu: gereken torku ve devri birlikte hesapla.'],
          ['Redüktör verimini unutmak', 'Sonsuz vidalı redüktörde verim %50–90 arasıdır; çıkış torku sanılandan düşük çıkar. Doğrusu: katalogdaki verimi kullan.']
        ]}
      ]}
    ]
  },
  'yol-verme': {
    baslik: 'Yol verme yöntemleri',
    giris: 'Asenkron motor direkt kalkışta anma akımının birkaç katını çeker. Yol verme yöntemi bu akımı, kalkış torkunu ve maliyeti belirler.',
    etiketler: ['DOL', 'Y/Δ', 'Yumuşak yol verici', 'VFD'],
    bolumler: [
      { id: 'akim', kisa: 'Kalkış akımı', baslik: 'Kalkış akımı', bloklar: [
        { tip: 'aralik', baslik: 'Kalkış akımı (× In, tipik)', eksen: 'Anma akımının katı (× In)', max: 8, adim: 2,
          satirlar: [
            { ad: 'DOL', bas: 5, son: 8, metin: 'Direkt: en yüksek akım ve tork; en basit ve ucuz.' },
            { ad: 'Y/Δ', bas: 1.7, son: 2.7, metin: 'Yıldız-üçgen: direktin üçte biri; tork da üçte bire iner.' },
            { ad: 'SS', bas: 2, son: 4, metin: 'Yumuşak yol verici: gerilimi rampayla artırır; akım sınırı ayarlanır.' },
            { ad: 'VFD', bas: 1, son: 1.5, metin: 'Frekans konvertörü: anma akımı civarında tam tork; hız da ayarlanır.' }
          ],
          not: 'Değerler tipik aralıklardır; motor ve yüke göre değişir.' }
      ]},
      { id: 'karsilastir', kisa: 'Karşılaştırma', baslik: 'Nerede hangisi', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Direkt (DOL)', '', 'Küçük motorlar ve şebekenin kalkış akımını kaldırabildiği yerler.'],
          ['Yıldız-üçgen', '', 'Boşta ya da hafif yükte kalkan pompa ve fanlar. Geçişte akım darbesi olur.'],
          ['Yumuşak yol verici', '', 'Pompa, konveyör: sarsıntısız kalkış ve duruş. Hız ayarı yapmaz.'],
          ['VFD', '', 'Hız ayarı gereken her yer. Kalkış akımı en düşük, maliyeti en yüksek.']
        ]}
      ]},
      { id: 'secim', kisa: 'Seçim', baslik: 'Seçim adımları', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Şebekenin ya da jeneratörün kalkış akımını kaldırıp kaldırmadığına bak.',
          'Yükün kalkışta ne kadar tork istediğini belirle.',
          'Hız ayarı gerekiyorsa doğrudan VFD seç.',
          'Yıldız-üçgen için motorun 400/690 V etiketli olduğunu doğrula.'
        ]},
        { tip: 'hatalar', hatalar: [
          ['Ağır yükte yıldız-üçgen kullanmak', 'Yıldızdaki düşük tork yükü kaldıramaz; motor hızlanmadan üçgene geçer ve akım darbesi yine büyük olur. Doğrusu: yumuşak yol verici ya da VFD.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Kontaktör', 'Zaman rölesi', 'Yumuşak yol verici', 'Frekans konvertörü (VFD)'] }
      ]}
    ]
  },
  'motor-ariza': {
    baslik: 'Motor arızası ve ölçüm',
    giris: 'Motor arızalarının çoğu üç ölçümle bulunur: sargı direnci, izolasyon direnci ve çalışma akımı. Direnç ölçümleri enerji kesilip kilitlendikten sonra yapılır.',
    etiketler: ['Sargı direnci', 'İzolasyon', 'Akım dengesi'],
    bolumler: [
      { id: 'sema', kisa: 'Ölçüm', baslik: 'Ölçüm bağlantısı', bloklar: [
        { tip: 'sema', svg: 'motorOlcum',
          lejant: [['sig', 'Ohmmetre uçları'], ['dc', 'Megger uçları']],
          isaretler: [
            ['Köprüleri sök', 'Sargıları ayrı ayrı ölçebilmek için köprüler çıkarılır.'],
            ['Sargı direnci', 'U1-U2, V1-V2, W1-W2 arasını ölç. Üç değer birbirine yakın olmalı; biri düşükse sarımlar arası kısa devre, sonsuzsa kopukluk vardır.'],
            ['İzolasyon', 'Her sargı ile gövde (PE) arasını 500 V DC ile ölç. Düşük değer nem ya da yalıtım bozulmasını gösterir.']
          ] }
      ]},
      { id: 'sira', kisa: 'Sıra', baslik: 'Ölçüm sırası', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Enerjiyi kes, kilitle, etiketle ve gerilim olmadığını ölç.',
          'Motor kablosunu sürücüden ya da kontaktörden ayır.',
          'Köprüleri sök, sargı dirençlerini ölç ve karşılaştır.',
          'Her sargı ile gövde arasında izolasyon ölç.',
          'Motoru bağlayıp çalıştır; pens ampermetreyle üç faz akımını ölç.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Motor aşırı ısınıyor', satirlar: [
          ['Aşırı yük', 'Kontrol: çalışma akımını etiket akımıyla karşılaştır.'],
          ['Faz dengesizliği', 'Kontrol: üç faz akımı arasındaki farka bak; fark büyükse gerilimleri ve bağlantıları kontrol et.'],
          ['Soğutma yetersiz', 'Kontrol: fan kapağı ve kanatçıklar tıkalı mı bak. VFD ile düşük hızda sürekli çalışma soğutmayı azaltır.'],
          ['Rulman arızası', 'Kontrol: mili elle çevir, ses ve boşluk var mı dinle.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Sürücü bağlıyken izolasyon ölçmek', '500 V DC test gerilimi sürücünün elektroniğini bozabilir. Doğrusu: motor kablosunu sürücüden ayır.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['İzolasyon ölçer', 'Multimetre', 'Pens ampermetre', 'Rulman'] }
      ]}
    ]
  },
});
