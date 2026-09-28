/* Sensörler: konu tanımı ve bilgi sayfaları. */
VERI.konular.push({
  id: 'sensorler', ad: 'Sensörler', ikon: 'sensor',
  ozet: 'Endüktif, fotoelektrik, enkoder, PT100, 4–20 mA',
  giris: 'Sensörler makinenin gözleri ve kulaklarıdır: konumu, varlığı, seviyeyi ya da bir büyüklüğü ölçüp PLC’ye bildirirler.',
  altlar: [
    { id: 'enduktif-ic-yapi', kod: '3B', ad: 'Endüktif sensör: iç yapı (3B)', alt: 'Nüve, bobin, osilatör, M12 konnektör · hedef yaklaşınca', sayfa: 'enduktif-ic-yapi' },
    { id: 'enduktif-sensor', kod: 'Sn', ad: 'Endüktif sensör', alt: 'Metal algılama · malzeme faktörü', sayfa: 'enduktif-sensor' },
    { id: 'kapasitif-sensor', kod: 'C', ad: 'Kapasitif sensör', alt: 'Metal olmayan malzeme · seviye', sayfa: 'kapasitif-sensor' },
    { id: 'fotoelektrik-sensor', kod: 'OPT', ad: 'Fotoelektrik sensör', alt: 'Karşılıklı, reflektörlü, cisimden yansımalı', sayfa: 'fotoelektrik-sensor' },
    { id: 'enkoder-plc', kod: 'HSC', ad: 'Enkoder–PLC bağlantısı', alt: 'HTL, line driver · hızlı sayıcı', sayfa: 'enkoder-plc' },
    { id: 'sicaklik', kod: 'PT100', ad: 'Sıcaklık: PT100 ve termokupl', alt: '2/3/4 telli · K, J, T tipi', sayfa: 'sicaklik' },
    { id: 'analog-4-20', kod: 'mA', ad: 'Analog 4–20 mA', alt: 'İki telli döngü · ölçekleme', sayfa: 'analog-4-20' }
  ]
});

Object.assign(VERI.sayfalar, {
  'enduktif-ic-yapi': {
    baslik: 'Endüktif sensörün iç yapısı',
    giris: 'Endüktif sensörün içinde bir osilatör, ferrit nüveli bir bobin ve çıkışı anahtarlayan bir değerlendirme devresi vardır. Hedefe dokunmaz; metal hedef alanı zayıflatınca çıkış değişir.',
    etiketler: ['3B model', 'IEC 60947-5-2', 'M12 konnektör', 'PNP'],
    bolumler: [
      { id: 'model', kisa: '3B model', baslik: 'Parçalar', bloklar: [
        { tip: 'model', tur: 'enduktif-sensor' }
      ]},
      { id: 'calisma', kisa: 'Çalışma', baslik: 'Hedef yaklaşınca ne olur', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Osilatör bobinde yüksek frekanslı akım dolaştırır; ferrit nüve alanı aktif yüzeyin önüne yöneltir.',
          'Metal hedef alana girer; içinde girdap akımları dolaşır ve osilatörden enerji çeker.',
          'Hedef yaklaştıkça salınım genliği düşer. Genlik eşiğin altına inince çıkış açılır, LED yanar.',
          'Hedef uzaklaşınca genlik yükselir; çıkış, açıldığı mesafeden biraz daha uzakta kapanır (histerezis). Bu fark, sınırda çıkışın titremesini önler.'
        ]},
        { tip: 'not', metin: 'Sn, standart çelik hedefle ölçülen nominal mesafedir. Alüminyum, pirinç ve bakırda girdap akımı kaybı farklıdır; çalışma mesafesi kısalır (Hesap bölümündeki malzeme faktörü). Güvenli çalışma için hedefi Sa = 0,81 × Sn içinde tut.' }
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Aktif yüzeyde biriken talaşı önemsememek', 'Metal talaş alanda kalır, sensör hedef yokken de algılar. Doğrusu: yüzeyi düzenli temizle, gerekirse talaşa dayanıklı tip seç.'],
          ['M12 soketi elle sonuna kadar sıkmamak', 'Conta oturmaz, su girer; kontaklar oksitlenir, sinyal gelip gider. Doğrusu: rakor somununu elle sonuna kadar sık.'],
          ['Sensör kablosunu motor ve güç kablolarıyla aynı kanala koymak', 'Parazit yanlış sinyal üretebilir. Doğrusu: sinyal ve güç kablolarını ayrı kanaldan geçir.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['M12 sensör kablosu', 'Montaj braketi', 'PLC dijital giriş', '24 V DC güç kaynağı'] }
      ]}
    ]
  },
  'enduktif-sensor': {
    baslik: 'Endüktif sensör',
    giris: 'Endüktif sensör önünde yüksek frekanslı bir manyetik alan oluşturur. Alana giren metal bu alanı zayıflatır ve çıkış değişir. Yalnızca metali, temas etmeden algılar.',
    etiketler: ['Sn mesafesi', 'Malzeme faktörü', 'PNP / NPN'],
    bolumler: [
      { id: 'yapi', kisa: 'Yapı', baslik: 'Yapı ve algılama', bloklar: [
        { tip: 'sema', svg: 'enduktifSensor',
          isaretler: [
            ['Aktif yüzey', 'Manyetik alan buradan çıkar. Hedef bu yüzeyin önünden geçmeli.'],
            ['Algılama mesafesi (Sn)', 'Katalogdaki nominal mesafe; standart çelik hedef içindir.'],
            ['Metal hedef', 'Çelik tam mesafede algılanır; paslanmaz, alüminyum, pirinç ve bakırda mesafe kısalır.'],
            ['Durum LED’i', 'Algılayınca yanar. Arızada ilk bakılacak yer.'],
            ['Kablo', 'BN +24 V, BU 0 V, BK çıkış (3 telli DC sensör).']
          ] }
      ]},
      { id: 'hesap', kisa: 'Hesap', baslik: 'Algılama mesafesi', bloklar: [
        { tip: 'hesap', tur: 'enduktif' }
      ]},
      { id: 'montaj', kisa: 'Montaj', baslik: 'Montaj tipi', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'gomulu', baslik: 'Gömülü (flush)', etiket: 'Kısa menzil', metin: 'Metal içine yüzey hizasında gömülebilir; darbeye karşı korunur.' },
          { ikon: 'gomuluDegil', baslik: 'Gömülü değil', etiket: 'Uzun menzil', metin: 'Aktif yüzeyin çevresinde metalsiz boşluk ister; gömülürse çevresindeki metali algılar.' }
        ]}
      ]},
      { id: 'baglanti', kisa: 'Bağlantı', baslik: 'PLC’ye bağlantı', bloklar: [
        { tip: 'sema', svg: 'plcGiris',
          lejant: [['dc', '+24 V (BN)'], ['ink', 'Sinyal (BK)'], ['n', '0 V (BU)']],
          isaretler: [
            ['Kahverengi (BN)', '+24 V besleme.'],
            ['Siyah (BK)', 'Çıkış: PNP algılayınca +24 V verir, NPN 0 V’a çeker.'],
            ['Mavi (BU)', '0 V besleme.'],
            ['Ortak uç (1M)', 'PNP sensörde 0 V’a, NPN sensörde +24 V’a.']
          ] }
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Sensör metali algılamıyor', satirlar: [
          ['Mesafe fazla', 'Kontrol: hedef mesafesini ölç; alüminyum ya da paslanmazda mesafe kısalır.'],
          ['Besleme yok', 'Kontrol: BN ile BU arasında 24 V ölç; LED hiç yanmıyorsa ilk şüpheli budur.'],
          ['PNP/NPN uyumsuz', 'Kontrol: sensör LED’i yandığı hâlde PLC giriş LED’i yanmıyorsa sensör tipine ve 1M bağlantısına bak.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Gömülü olmayan sensörü metale gömmek', 'Sensör çevresindeki metali görür ve sürekli algılar. Doğrusu: gömülü tip seç ya da boşluk bırak.'],
          ['İki sensörü birbirine çok yakın koymak', 'Alanlar birbirini etkiler, çıkış titrer. Doğrusu: katalogdaki en küçük aralığa uy.'],
          ['Sensörü mekanik durdurucu gibi kullanmak', 'Hedef çarpınca aktif yüzey kırılır. Doğrusu: hedefi sensöre değmeden, Sa (≈ 0,81 × Sn) içinde durdur.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['M12 sensör kablosu', 'Montaj braketi', 'PLC dijital giriş', '24 V DC güç kaynağı'] }
      ]}
    ]
  },
  'kapasitif-sensor': {
    baslik: 'Kapasitif sensör',
    giris: 'Kapasitif sensör, önündeki malzemenin elektrik alanını değiştirmesini algılar. Metal olmayanları da görür: plastik, cam, ahşap, granül ve sıvı.',
    etiketler: ['Seviye algılama', 'Hassasiyet ayarı', 'Dielektrik'],
    bolumler: [
      { id: 'seviye', kisa: 'Seviye', baslik: 'Depo duvarından seviye algılama', bloklar: [
        { tip: 'sema', svg: 'kapasitifSeviye',
          isaretler: [
            ['Aktif yüzey', 'Elektrik alanı buradan çıkar ve depo duvarını geçer.'],
            ['Hassasiyet ayarı', 'Arkadaki trimpot. Duvarı görmeyip sıvıyı görecek şekilde ayarlanır.'],
            ['Depo duvarı', 'Plastik ya da cam olmalı; metal depoda sensör içeriği göremez.'],
            ['Sıvı seviyesi', 'Alt sensör sıvıyı görür (çıkış 1), üst sensör boşluğu görür (çıkış 0).']
          ] }
      ]},
      { id: 'malzeme', kisa: 'Malzeme', baslik: 'Neyi ne kadar kolay algılar', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Su ve sıvılar', 'sig', 'Çok kolay: dielektrik sabiti yüksek (su εr ≈ 80). Plastik duvar arkasından bile görülür.'],
          ['Metal', 'sig', 'Kolay: tam mesafede algılanır.'],
          ['Islak ahşap, gıda', '', 'Orta: nem arttıkça algılamak kolaylaşır.'],
          ['Plastik, cam, kuru kâğıt', 'dc', 'Zor: dielektrik sabiti düşük (εr ≈ 2–8). Mesafe kısalır, hassasiyet artırılır.']
        ]}
      ]},
      { id: 'karsilastir', kisa: 'Endüktif mi?', baslik: 'Endüktif mi, kapasitif mi?', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Endüktif', '', 'Yalnızca metal. Kir, yağ ve nemden az etkilenir. Metal algılamada ilk tercih.'],
          ['Kapasitif', '', 'Her malzeme. Nem, kir ve köpükten etkilenir; ayar gerektirir.']
        ]}
      ]},
      { id: 'ayar', kisa: 'Ayar', baslik: 'Hassasiyet ayarı', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Depo boşken (hedef yokken) hassasiyeti çıkış 1 olana kadar artır.',
          'Çıkış 0 olana kadar geri çevir, sonra pay bırakmak için biraz daha çevir.',
          'Hedefi getir (depoyu doldur); çıkışın kararlı 1 olduğunu kontrol et.',
          'Çıkış titriyorsa boş ve dolu arasındaki fark azdır; sensörü duvara tam yasla.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Sensör depo boşken de algılıyor', satirlar: [
          ['Hassasiyet çok yüksek', 'Kontrol: ayar adımlarını boş depoda tekrarla.'],
          ['Kir, köpük ya da yoğuşma', 'Kontrol: depo iç yüzeyini ve sensör yüzeyini temizle.'],
          ['Duvar kalın ya da metal takviyeli', 'Kontrol: duvarın kalınlığına ve malzemesine bak.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Metal depoya dışarıdan kapasitif sensör takmak', 'Sensör yalnızca metal duvarı görür. Doğrusu: depoya daldırılan sensör ya da başka yöntem (şamandıra, basınç).'],
          ['Ayarı dolu depoda yapmak', 'Boşken de algılayabilir. Doğrusu: ayarı boş depoda yap, dolu depoda doğrula.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Montaj braketi', 'Trimpot tornavidası', 'M12 sensör kablosu', 'PLC dijital giriş'] }
      ]}
    ]
  },
  'fotoelektrik-sensor': {
    baslik: 'Fotoelektrik sensör',
    giris: 'Fotoelektrik sensör bir ışık ışını gönderir; ışının kesilmesini ya da geri yansımasını algılar. Metal olsun olmasın, uzaktaki cisimleri görür.',
    etiketler: ['Karşılıklı', 'Reflektörlü', 'Cisimden yansımalı'],
    bolumler: [
      { id: 'tipler', kisa: 'Tipler', baslik: 'Üç çalışma tipi', bloklar: [
        { tip: 'sema', svg: 'fotoelektrik',
          lejant: [['sig', 'Işık ışını']],
          isaretler: [
            ['Karşılıklı', 'Verici (V) ve alıcı (A) ayrı gövdededir; cisim ışını keser. En uzun menzil ve en güvenilir algılama; iki tarafa kablo gerekir.'],
            ['Reflektörlü', 'Verici ve alıcı aynı gövdededir; ışın karşıdaki reflektörden döner. Tek tarafa kablo. Parlak cisimler için polarize filtreli tip seç.'],
            ['Cisimden yansımalı', 'Işık doğrudan cisimden yansır, reflektör yoktur. Menzil kısadır; cismin rengi ve yüzeyi etkiler.']
          ] }
      ]},
      { id: 'secim', kisa: 'Seçim', baslik: 'Karşılaştırma', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Karşılıklı', '', 'Menzil: onlarca metreye kadar. Uzun mesafe ve tozlu ortam.'],
          ['Reflektörlü', '', 'Menzil: tipik birkaç metre ile 10 m arası. Konveyör, kapı, raf.'],
          ['Cisimden yansımalı', '', 'Menzil: birkaç santimetreden 1–2 m’ye. Kutu varlığı, yakın algılama.'],
          ['Arka plan bastırmalı', '', 'Cisimden yansımalının gelişmiş hâli: ayarlanan mesafenin arkasını görmez, renkten az etkilenir.']
        ]},
        { tip: 'kartlar', kartlar: [
          { ikon: 'isikAcik', baslik: 'Işıkta çalışma', etiket: 'L.ON', metin: 'Alıcı ışık aldığında çıkış 1 olur.' },
          { ikon: 'karanlik', baslik: 'Karanlıkta çalışma', etiket: 'D.ON', metin: 'Alıcı ışık almadığında çıkış 1 olur. Karşılıklı ve reflektörlüde “cisim var = 1” için bu seçilir.' }
        ]}
      ]},
      { id: 'hizalama', kisa: 'Hizalama', baslik: 'Montaj ve hizalama', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Sensörü ve reflektörü (ya da alıcıyı) aynı yükseklikte, birbirine bakacak şekilde bağla.',
          'Sensörü yavaşça sağa-sola ve yukarı-aşağı çevir; kararlılık LED’inin yandığı aralığın ortasında sabitle.',
          'Cismi ışının önünden geçir; çıkış LED’inin her seferinde değiştiğini kontrol et.',
          'Lens ve reflektör temizliğini bakım listesine ekle.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Sensör cismi kaçırıyor ya da kararsız', satirlar: [
          ['Kirli lens ya da reflektör', 'Kontrol: kararlılık LED’i sönük mü bak; lensi ve reflektörü temizle.'],
          ['Hizalama bozuk', 'Kontrol: titreşimle kaymış olabilir; yeniden hizala.'],
          ['Parlak ya da şeffaf cisim', 'Kontrol: parlak cisim ışını reflektör gibi geri döndürebilir; polarize filtreli ya da şeffaf cisim tipi sensör kullan.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Güvenlik için standart fotosel kullanmak', 'Arızası fark edilmez, insanı korumaz. Doğrusu: güvenlik ışık perdesi ve güvenlik rölesi.'],
          ['L.ON / D.ON seçimini ters yapmak', 'Cisim yokken çıkış 1 olur, program ters çalışır. Doğrusu: modu ihtiyaca göre seç ve test et.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Reflektör', 'Montaj braketi', 'M12 sensör kablosu', 'PLC dijital giriş'] }
      ]}
    ]
  },
  'enkoder-plc': {
    baslik: 'Enkoder–PLC bağlantısı',
    giris: 'Artımsal enkoderin A, B ve Z darbeleri PLC’nin hızlı sayıcı (HSC) girişlerine bağlanır. Sayıcı darbeleri sayarak konumu, darbe frekansından hızı bulur. Enkoder çıkış tipi ile giriş tipi uyumlu olmalı.',
    etiketler: ['HTL · TTL', 'HSC', 'A · B · Z'],
    bolumler: [
      { id: 'baglanti', kisa: 'Bağlantı', baslik: 'Bağlantı', bloklar: [
        { tip: 'sema', svg: 'enkoderPlc',
          lejant: [['sig', 'Sinyal'], ['dc', '+ besleme'], ['n', '0 V']],
          isaretler: [
            ['HTL enkoder', 'Çıkışlar besleme seviyesindedir (10–30 V). PLC’nin 24 V hızlı girişlerine doğrudan bağlanır.'],
            ['HSC girişleri', 'A ve B hızlı sayıcıya, Z referans girişine. Hangi girişin HSC olduğu PLC kataloğunda yazar.'],
            ['Line driver', 'A ile /A, B ile /B ters sinyal taşır; alıcı ikisinin farkına bakar. Uzun kablo ve gürültüde güvenilirdir.'],
            ['Alıcı', 'RS-422 girişli sayıcı kartı ya da servo sürücü. 24 V girişe doğrudan bağlanmaz.']
          ] }
      ]},
      { id: 'hesap', kisa: 'Frekans', baslik: 'Frekans hesabı', bloklar: [
        { tip: 'hesap', tur: 'hsc' }
      ]},
      { id: 'tipler', kisa: 'Çıkış tipi', baslik: 'Çıkış tipleri', bloklar: [
        { tip: 'tablo', satirlar: [
          ['HTL (push-pull)', '', '10–30 V. PLC girişleriyle uyumlu, orta mesafe.'],
          ['TTL / RS-422', 'sig', '5 V diferansiyel (line driver). Uzun mesafe, yüksek frekans.'],
          ['NPN / PNP açık kollektör', '', 'Basit ve ucuz; kablo uzadıkça çıkabileceği frekans düşer.']
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Konum kayıyor ya da fazla sayıyor', satirlar: [
          ['Gürültü', 'Kontrol: ekranın iki uçta bağlı, kablonun güç kablolarından ayrı olduğunu kontrol et.'],
          ['Frekans sınırı', 'Kontrol: en yüksek hızda A frekansını hesapla, HSC sınırıyla karşılaştır.'],
          ['Giriş filtresi', 'Kontrol: HSC girişindeki filtre süresi darbe süresinden uzun olmamalı.']
        ]},
        { tip: 'ariza', belirti: 'Sayım ters yönde', satirlar: [
          ['A ve B yer değiştirmiş', 'Kontrol: A ile B’yi değiştir ya da sayıcıda yönü çevir.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Enkoderi standart dijital girişe bağlamak', 'Giriş filtresi ve tarama süresi darbeleri kaçırır. Doğrusu: HSC girişi.'],
          ['5 V line driver enkoderi 24 V girişe bağlamak', 'Sinyal seviyesi yetmez, sayım olmaz. Doğrusu: RS-422 girişli kart ya da sinyal çevirici.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Artımsal enkoder', 'Ekranlı enkoder kablosu', 'HSC modülü', 'Sinyal çevirici'] }
      ]}
    ]
  },
  'sicaklik': {
    baslik: 'Sıcaklık: PT100 ve termokupl',
    giris: 'PT100, sıcaklıkla direnci değişen platin elemandır: 0 °C’ta 100 Ω, her 1 °C’ta ≈ 0,385 Ω artar. Termokupl ise iki farklı metalin birleşim noktasında sıcaklıkla orantılı küçük bir gerilim (mV) üretir.',
    etiketler: ['PT100 · 2/3/4 telli', 'K · J · T', '0,385 Ω/°C'],
    bolumler: [
      { id: 'baglanti', kisa: 'Bağlantı', baslik: 'PT100 bağlantısı', bloklar: [
        { tip: 'sema', svg: 'pt100Bag',
          lejant: [['dc', 'Kırmızı uç'], ['hatch', 'Beyaz uç']],
          isaretler: [
            ['2 telli', 'Kablo direnci ölçüme eklenir. Yalnızca kısa kablo ve düşük hassasiyette kullan.'],
            ['3 telli', 'Üçüncü tel kablo direncini ölçer ve düşer. Endüstride standart.'],
            ['4 telli', 'Akım ve ölçüm ayrı tellerden; kablodan tamamen bağımsız. En hassas bağlantı.']
          ] }
      ]},
      { id: 'hesap', kisa: 'Hesap', baslik: 'Kablo hatası', bloklar: [
        { tip: 'hesap', tur: 'pt100' }
      ]},
      { id: 'termokupl', kisa: 'Termokupl', baslik: 'Termokupl tipleri', bloklar: [
        { tip: 'tablo', satirlar: [
          ['K', 'sig', 'NiCr–Ni. −200 … 1.200 °C. En yaygın: fırın, egzoz. Kablo yeşil (+) / beyaz (−).'],
          ['J', '', 'Fe–CuNi. −40 … 750 °C. Plastik makineleri. Siyah (+) / beyaz (−).'],
          ['T', '', 'Cu–CuNi. −200 … 350 °C. Düşük sıcaklık, gıda. Kahverengi (+) / beyaz (−).'],
          ['S · R', '', 'Platin. 1.600 °C’a kadar. Cam ve metal ergitme.']
        ]},
        { tip: 'kartlar', kartlar: [
          { ikon: 'termik', baslik: 'PT100', etiket: 'Hassas', metin: 'Tipik −200 … 600 °C. Doğru ve kararlıdır; 3 telli bağlanır.' },
          { ikon: 'gerilim', baslik: 'Termokupl', etiket: 'Yüksek sıcaklık', metin: '1.200 °C’a kadar, hızlı tepki. Uzatmada kendi kompanzasyon kablosu gerekir.' }
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Değer taşma gösteriyor ya da sabit kalıyor', satirlar: [
          ['Sensör ya da kablo kopuk', 'Kontrol: PT100’ü ayırıp ölç; oda sıcaklığında ≈ 108–110 Ω olmalı.'],
          ['Kısa devre', 'Kontrol: değer alt sınırda duruyorsa kablo ezilmiş olabilir; uçlar arasını ölç.'],
          ['Termokupl kutbu ters', 'Kontrol: ısıtınca değer düşüyorsa + ile − yer değiştirmiştir.'],
          ['Giriş tipi yanlış', 'Kontrol: kartta PT100, PT1000 ya da termokupl tipinin doğru seçildiğine bak.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Termokuplu normal bakır kabloyla uzatmak', 'Bağlantı noktasında yeni bir termokupl oluşur; ölçüm kayar. Doğrusu: aynı tipte kompanzasyon kablosu.'],
          ['PT100’ü uzun kabloyla 2 telli bağlamak', '50 m’de hata birkaç dereceyi bulur. Doğrusu: 3 ya da 4 telli bağlantı.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['PT100 sensör', 'Termokupl', 'Kompanzasyon kablosu', 'Sıcaklık transmitteri', 'Analog giriş kartı'] }
      ]}
    ]
  },
  'analog-4-20': {
    baslik: 'Analog 4–20 mA',
    giris: '4–20 mA sinyalde ölçülen değer akım olarak taşınır: 4 mA ölçüm aralığının başı, 20 mA sonudur. Akım kablo boyunca değişmediği için uzun mesafede ve gürültülü ortamda güvenilirdir.',
    etiketler: ['2 telli döngü', 'Ölçekleme', 'Kopuk kablo'],
    bolumler: [
      { id: 'dongu', kisa: 'Döngü', baslik: 'İki telli akım döngüsü', bloklar: [
        { tip: 'sema', svg: 'analogLoop',
          lejant: [['dc', '+24 V'], ['sig', 'Döngü akımı'], ['n', '0 V']],
          isaretler: [
            ['Besleme', '24 V DC; döngünün tek enerji kaynağı.'],
            ['Transmitter', 'Beslemesini döngüden alır; çektiği akımı ölçüme göre 4–20 mA arasında ayarlar.'],
            ['PLC analog giriş', 'İç direnç üzerindeki gerilimi okur: 250 Ω’da 4 mA → 1 V, 20 mA → 5 V.']
          ],
          not: 'Döngü tek bir seri devredir; akım her noktada aynıdır. Araya bir gösterge seri bağlanabilir.' }
      ]},
      { id: 'hesap', kisa: 'Hesap', baslik: 'Ölçekleme', bloklar: [
        { tip: 'hesap', tur: 'analog' },
        { tip: 'formul', formul: 'Değer = Alt + (I − 4) × (Üst − Alt) ÷ 16',
          tanimlar: [['I', 'Ölçülen akım (mA)'], ['Alt, Üst', 'Transmitterin ölçüm aralığı'], ['16', '20 − 4: akımın değişim aralığı (mA)']],
          ornek: { baslik: 'Örnek · 0–10 bar, 12 mA', satirlar: [['Değer', '= 0 + (12 − 4) × 10 ÷ 16'], ['', '= 5 bar (aralığın ortası)']] } }
      ]},
      { id: 'tipler', kisa: 'Bağlantı', baslik: '2 telli ve 4 telli', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'ikiTel', baslik: '2 telli', etiket: 'En yaygın', metin: 'Aynı iki kablo hem besler hem sinyal taşır. Basınç ve sıcaklık transmitterlerinde standart.' },
          { ikon: 'dortTel', baslik: '4 telli', etiket: 'Ayrı besleme', metin: 'Besleme ayrı iki kablodan gelir; cihaz akımı kendisi üretir (aktif çıkış). Debimetre, analizör.' }
        ]},
        { tip: 'not', metin: 'Akımı kendisi üreten (aktif) cihazı, beslemeli (aktif) bir PLC girişine bağlama; iki kaynak çakışır. Biri pasif olmalı.' }
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'PLC’de değer 0 ya da aralık altında', satirlar: [
          ['Kablo kopuk', 'Kontrol: döngüye seri ampermetre bağla ya da mA pens ile ölç; 0 mA ise döngü açık.'],
          ['Besleme yok ya da ters', 'Kontrol: transmitter uçlarında gerilim ve kutuplamayı ölç (tipik en az 10–12 V).'],
          ['Transmitter arızalı', 'Kontrol: döngü akımını ölç; 3,6 mA altı ya da 21 mA üstü NAMUR NE 43’e göre arızadır.']
        ]},
        { tip: 'ariza', belirti: 'Değer dalgalanıyor', satirlar: [
          ['Ekran bağlantısı', 'Kontrol: ekran yalnızca bir uçtan (genelde pano tarafı) topraklanmalı.'],
          ['Güç kablolarıyla aynı kanal', 'Kontrol: sinyal kablosunu motor ve sürücü kablolarından ayır.'],
          ['Filtre ayarı', 'Kontrol: PLC analog giriş filtresini (ortalama) artır.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Ekranı iki uçtan topraklamak', 'Toprak döngüsü oluşur; ölçüm kayar ve dalgalanır. Doğrusu: analog sinyalde tek uç. Enkoder, motor ve haberleşme kablolarında ekran iki uçtan geniş yüzeyle bağlanır.'],
          ['0–20 mA’e göre ölçeklemek', '4 mA’de değer sıfır değil %20 görünür. Doğrusu: 4 mA = alt sınır.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Ekranlı sinyal kablosu', 'Transmitter', 'Analog giriş kartı', '24 V DC güç kaynağı', 'Proses kalibratörü'] }
      ]}
    ]
  },
});
