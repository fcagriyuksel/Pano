/* Servo motorlar: konu tanımı ve bilgi sayfaları. */
VERI.konular.push({
  id: 'servo-motorlar', ad: 'Servo motorlar', ikon: 'servo',
  ozet: 'Enkoder, geri besleme, ayar',
  giris: 'Servo motor, enkoderden gelen geri beslemeyle konumunu sürekli ölçer ve hatayı sürücü düzeltir.',
  altlar: [
    { id: 'servo-enkoder', kod: 'ENC', ad: 'Enkoder türleri', alt: 'Artımsal ve mutlak enkoder, çözünürlük', sayfa: 'servo-enkoder' },
    { id: 'servo-baglanti', kod: 'AC', ad: 'Servo motor ve sürücü bağlantısı', alt: 'Güç, enkoder ve fren kabloları', sayfa: 'servo-baglanti' },
    { id: 'servo-ayar', kod: 'PID', ad: 'Kazanç ayarı (tuning)', alt: 'Konum, hız ve akım döngüleri', sayfa: 'servo-ayar' },
    { id: 'servo-fren', kod: 'BRK', ad: 'Frenli servo', alt: 'Düşey eksende fren kontrolü', sayfa: 'servo-fren' },
    { id: 'servo-reduktor', kod: 'RED', ad: 'Servo ve redüktör montajı', alt: 'Servo ile yük arasında kaplin veya flanş', sayfa: 'servo-reduktor' }
  ]
});

Object.assign(VERI.sayfalar, {
  'servo-enkoder': {
    baslik: 'Enkoder türleri',
    giris: 'Enkoder, motor milinin konumunu ölçüp sürücüye bildirir. Konum, hız ve yön bilgisinin hepsi buradan gelir; servo sistemin gözüdür.',
    etiketler: ['Artımsal', 'Mutlak', 'A · B · Z'],
    bolumler: [
      { id: 'sema', kisa: 'Nasıl ölçer', baslik: 'Nasıl ölçer', bloklar: [
        { tip: 'sema', svg: 'servoEnkoder',
          lejant: [['sig', 'A kanalı'], ['ink', 'B kanalı'], ['dc', 'Z kanalı']],
          isaretler: [
            ['Disk ve yarıklar', 'Işık yarıklardan geçtikçe sensör darbe üretir. Yarık sayısı turdaki darbe sayısını (ppr) belirler.'],
            ['A ve B kanalları', 'Aralarında 90° faz farkı var; hangisinin önde olduğu yönü verir. İki kanalın bütün kenarları sayılınca çözünürlük 4 katına çıkar.'],
            ['Z kanalı', 'Turda bir darbe. Referans (sıfır) noktası bulunurken kullanılır.']
          ] }
      ]},
      { id: 'turler', kisa: 'Türler', baslik: 'Artımsal ve mutlak', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'artimsal', baslik: 'Artımsal', etiket: 'Referans gerekir', metin: 'Enerji kesilince konumu unutur. Her açılışta referans (homing) hareketi yapılır.' },
          { ikon: 'mutlak', baslik: 'Mutlak', etiket: 'Konumu hatırlar', metin: 'Tek turluk ya da çok turluk olur. Çok turlu modeller tur sayısını çoğunlukla pille saklar.' }
        ]},
        { tip: 'not', metin: 'Çok turlu mutlak enkoderde pil bitince tur bilgisi kaybolur; sürücü alarm verir ve referans yeniden alınır.' }
      ]},
      { id: 'cozunurluk', kisa: 'Çözünürlük', baslik: 'Çözünürlük hesabı', bloklar: [
        { tip: 'hesap', tur: 'enkoder' }
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Sürücü enkoder alarmı veriyor', satirlar: [
          ['Konnektör gevşek ya da kablo kopuk', 'Kontrol: iki uçtaki konnektörü enerjisizken sök-tak, kabloyu hareketli bölgede kontrol et.'],
          ['Kablo güç kablosuyla aynı kanalda', 'Olası neden: gürültü. Kontrol: enkoder kablosunu ayrı kanala al.'],
          ['Kablo ekranı bağlı değil', 'Kontrol: ekranın konnektör gövdelerine bağlandığını kontrol et.'],
          ['Mutlak enkoder pili bitmiş', 'Kontrol: pil gerilimini ölç, pili değiştir ve referansı yeniden al.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Enkoder kablosunu rastgele kabloyla uzatmak', 'Ekran ve bükümlü çiftler bozulunca gürültü alarmı çıkar. Doğrusu: üreticinin hazır kablosu ya da aynı yapıda kablo.'],
          ['Enerji varken enkoder konnektörünü sökmek', 'Enkoder ya da sürücü girişi zarar görebilir, mutlak enkoderde konum kaybolabilir. Doğrusu: önce enerjiyi kes.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Enkoder kablosu', 'Mutlak enkoder pili', 'Referans sensörü', 'Ekranlı kablo', 'Kablo kanalı'] }
      ]}
    ]
  },
  'servo-baglanti': {
    baslik: 'Servo motor ve sürücü bağlantısı',
    giris: 'Servo motor ile sürücü arasında iki kablo vardır: güç kablosu (U-V-W-PE) ve enkoder kablosu. Frenli motorlarda buna 24 V fren beslemesi eklenir.',
    etiketler: ['U · V · W · PE', 'Enkoder', 'Fren 24 V'],
    bolumler: [
      { id: 'sema', kisa: 'Şema', baslik: 'Bağlantı şeması', bloklar: [
        { tip: 'sema', svg: 'servoBaglanti',
          lejant: [['l', 'L1 / U'], ['l2', 'L2 / V'], ['l3', 'L3 / W'], ['pe', 'PE'], ['sig', 'Sinyal'], ['dc', 'Fren 24 V']],
          isaretler: [
            ['Ana besleme', 'Sürücünün güç girişi. Küçük güçlerde tek faz, büyüklerde üç faz olur.'],
            ['Kontrol bağlantısı', 'PLC ile sürücü arası: darbe/yön, analog ya da EtherCAT gibi haberleşme.'],
            ['Enkoder kablosu', 'Motorun konum bilgisi. Ekranlı kablodur, güç kablosundan ayrı döşenir.'],
            ['Motor güç çıkışı', 'U-V-W-PE. Sıra motor kablosundaki gibi olmalı; asenkron motordaki gibi iki faz değiştirilerek yön çevrilmez.'],
            ['Fren beslemesi', 'Frenli motorlarda 24 V DC. Sürücünün fren çıkışı bir röleyi sürer, röle freni besler.'],
            ['Fren direnci', 'Hızlı yavaşlamada motordan dönen enerjiyi ısıya çevirir. İç direnç yetmezse dış direnç bağlanır.']
          ],
          not: 'Klemens adları üreticiye göre değişir; sürücünün bağlantı şemasını esas al.' }
      ]},
      { id: 'klemensler', kisa: 'Klemensler', baslik: 'Klemensler', bloklar: [
        { tip: 'tablo', satirlar: [
          ['L1 · L2 · L3', '', 'Ana besleme girişi.'],
          ['L1C · L2C', '', 'Kontrol devresi beslemesi (bazı modellerde). Ana güç kesilince sürücü açık kalır, alarm okunabilir.'],
          ['U · V · W', '', 'Motor fazları. Sıra değişirse motor titrer ya da kontrolden çıkar.'],
          ['PE', '', 'Motor gövdesi ve sürücü toprağı.'],
          ['P+ · BR', 'dc', 'Dış fren direnci klemensleri; adları üreticiye göre değişir.'],
          ['Enkoder', 'sig', 'Enkoder konnektörü (CN).'],
          ['BK+ · BK−', 'dc', 'Motor freni bobini, 24 V DC; adı üreticiye göre değişir.']
        ]}
      ]},
      { id: 'ilk', kisa: 'İlk çalıştırma', baslik: 'İlk çalıştırma', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Enerji vermeden önce U-V-W sırasını, PE’yi ve enkoder konnektörünü kontrol et.',
          'Önce yalnızca sürücüyü enerjile; alarm olmamalı.',
          'Motoru yükten ayırıp düşük hızda JOG ile çalıştır, yönü kontrol et.',
          'Frenli motorda frenin açılıp kapandığını dinle.',
          'Sonra yükü bağla ve kazanç ayarına geç.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Servo enable olunca titriyor ya da kontrolden çıkıyor', satirlar: [
          ['U-V-W sırası yanlış', 'Kontrol: motor kablosundaki U-V-W işaretlerini sürücü klemensleriyle karşılaştır.'],
          ['Enkoder kablosu başka eksenin motoruna takılı', 'Kontrol: çok eksenli panoda güç ve enkoder kablosunun aynı motora gittiğini doğrula.'],
          ['Kazanç çok yüksek', 'Kontrol: rijitlik ayarını düşür, yeniden ayarla.'],
          ['Mekanik boşluk ya da gevşek kaplin', 'Kontrol: kaplin ve sıkma bileziği vidalarını kontrol et.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Yönü U-V-W’yi değiştirerek çevirmek', 'Servoda faz sırası enkoderle eşleşir; değişince motor kontrolden çıkar. Doğrusu: yön parametresini değiştir.'],
          ['Güç ve enkoder kablosunu aynı kanala döşemek', 'PWM gürültüsü enkoder sinyalini bozar. Doğrusu: ayrı kanal ya da aralarında mesafe.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Motor güç kablosu', 'Enkoder kablosu', 'Fren direnci', 'Hat filtresi', 'Ferrit'] }
      ]}
    ]
  },
  'servo-ayar': {
    baslik: 'Kazanç ayarı (tuning)',
    giris: 'Servo sürücü iç içe üç döngüyle çalışır. Kazanç ayarı bu döngülerin yüke ne kadar sert tepki vereceğini belirler: yumuşak ayar geç kalır, fazla sert ayar titretir.',
    etiketler: ['Konum · hız · akım', 'Atalet oranı', 'Rijitlik'],
    bolumler: [
      { id: 'sema', kisa: 'Döngüler', baslik: 'Kontrol döngüleri', bloklar: [
        { tip: 'sema', svg: 'servoAyar',
          isaretler: [
            ['Konum döngüsü', 'Hedef konumu enkoder konumuyla karşılaştırır, hız komutu üretir. En yavaş döngüdür.'],
            ['Hız döngüsü', 'Hız hatasından tork (akım) komutu üretir. Sertliği asıl bu döngünün kazancı belirler.'],
            ['Akım döngüsü', 'En hızlı döngü. Sürücü çoğunlukla bunu kendisi ayarlar.'],
            ['Geri besleme', 'Konum ve hız enkoderden, akım sürücünün akım sensörlerinden gelir.']
          ] }
      ]},
      { id: 'kavramlar', kisa: 'Kavramlar', baslik: 'Temel kavramlar', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Atalet oranı', '', 'Yük ataletinin motor ataletine oranı. Otomatik ayarın ilk tahmin ettiği değer; büyüdükçe ayar zorlaşır.'],
          ['Rijitlik', '', 'Birçok sürücüde kazançları tek ayardan birlikte değiştiren kademe. Yükseldikçe tepki hızlanır, titreşim riski artar.'],
          ['Konum kazancı', '', 'Konum hatasına ne kadar hızlı tepki verileceği.'],
          ['Hız kazancı', '', 'Hız hatasına verilen tork tepkisi.'],
          ['Notch filtre', '', 'Mekanik rezonans frekansındaki titreşimi bastırır.']
        ]}
      ]},
      { id: 'sira', kisa: 'Ayar sırası', baslik: 'Ayar sırası', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Yükü gerçek hâliyle bağla; boşta yapılan ayar yük altında tutmaz.',
          'Otomatik atalet tahminini çalıştır.',
          'Rijitliği düşük bir kademeden başlat, adım adım artır.',
          'Titreşim ya da ses başlayınca bir iki kademe geri dön.',
          'Belirli bir frekansta vınlama varsa notch filtreyi o frekansa ayarla.',
          'Konumlanma süresini ve aşımı sürücü yazılımının grafiğinden kontrol et.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Motor dururken vınlıyor ya da titriyor', satirlar: [
          ['Kazanç yüksek', 'Kontrol: rijitliği bir iki kademe düşür.'],
          ['Mekanik rezonans', 'Kontrol: sürücünün frekans analiziyle rezonansı bul, notch filtre uygula.'],
          ['Atalet oranı yanlış', 'Kontrol: atalet tahminini yük bağlıyken tekrarla.'],
          ['Kaplin ya da kayış gevşek', 'Kontrol: mekanik bağlantıları sık, kayış gerginliğini ayarla.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Kazancı yüksüz motorda ayarlamak', 'Yük bağlanınca atalet değişir; sistem ya yavaşlar ya titreşir. Doğrusu: ayarı yük bağlıyken yap.'],
          ['Titreşimi yalnızca kazancı düşürerek çözmek', 'Tepki gereksiz yavaşlar. Doğrusu: önce mekanik gevşekliği ve rezonansı kontrol et.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Sürücü yazılımı', 'Kaplin', 'Redüktör', 'Kayış-kasnak', 'Osiloskop'] }
      ]}
    ]
  },
  'servo-fren': {
    baslik: 'Frenli servo',
    giris: 'Frenli servoda motorun içinde yaylı bir tutma freni vardır. Enerji yokken kapalıdır; düşey eksenin enerji kesilince düşmesini önler.',
    etiketler: ['24 V DC', 'Tutma freni', 'Düşey eksen'],
    bolumler: [
      { id: 'sema', kisa: 'Devre', baslik: 'Fren devresi', bloklar: [
        { tip: 'sema', svg: 'servoFren',
          lejant: [['dc', '+24 V'], ['ink', '0 V'], ['sig', 'Kontrol sinyali']],
          isaretler: [
            ['Fren çıkışı', 'Sürücü, motor tork üretmeye başlayınca freni açma komutunu verir.'],
            ['Röle', 'Fren bobininin akımını taşır; sürücü çıkışı bu akımı doğrudan veremeyebilir.'],
            ['Söndürme elemanı', 'Bobin kesilince oluşan gerilim darbesini söndürür. Diyot freni geç kapatır, varistör daha hızlı kapatır.'],
            ['Fren bobini', 'Enerjilenince freni açar. Enerji kesilince yay freni kapatır.']
          ] }
      ]},
      { id: 'calisma', kisa: 'Çalışma', baslik: 'Nasıl çalışır', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'kilit', baslik: 'Tutma freni', etiket: 'Durdurma freni değil', metin: 'Motor dururken yükü tutar. Acil durum dışında hareket hâlindeyken kullanılmaz; balata aşınır.' },
          { ikon: 'yay', baslik: 'Emniyetli yapı', etiket: 'Enerjisizken kapalı', metin: 'Enerji ya da kablo kesilince yay freni kapatır, eksen yerinde tutulur. Eksenin altında çalışılacaksa tek fren yetmez: mekanik destek kullan, freni düzenli test et.' }
        ]}
      ]},
      { id: 'zamanlama', kisa: 'Zamanlama', baslik: 'Zamanlama', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Çalıştırma: sürücü enable olur, motor tork üretir.',
          'Kısa bir gecikmeden sonra fren açılır; hareket ancak bundan sonra başlar.',
          'Durdurma: motor durur ve konumu tutar.',
          'Fren kapanır; kapanma süresi kadar beklenir.',
          'Sonra enable kesilir. Gecikmeler sürücü parametrelerinden ayarlanır.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Düşey eksen, enable kesilince bir miktar düşüyor', satirlar: [
          ['Enable fren kapanmadan kesiliyor', 'Kontrol: fren kapanma gecikmesi parametresini artır.'],
          ['Söndürme için yalnız diyot kullanılmış', 'Olası neden: fren geç kapanıyor. Kontrol: üreticinin önerdiği varistörlü devre.'],
          ['Fren gerilimi düşük', 'Kontrol: motor ucunda 24 V’u ölç; uzun kabloda gerilim düşer.'],
          ['Balata aşınmış', 'Kontrol: freni tutma torku testiyle dene, gerekirse motoru değiştir.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Kılavuza bakmadan freni sürücü çıkışından beslemek', 'Çoğu sürücüde çıkış akımı yetmez, çıkış yanar. Doğrusu: kılavuz izin vermiyorsa röle üzerinden ayrı 24 V besleme.'],
          ['Freni durdurma freni gibi kullanmak', 'Balata aşınır, tutma torku düşer. Doğrusu: motor önce elektriksel olarak durur, fren sonra kapanır.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['24 V güç kaynağı', 'Röle', 'Varistör', 'Fren kablosu', 'Düşey eksen'] }
      ]}
    ]
  },
  'servo-reduktor': {
    baslik: 'Servo ve redüktör montajı',
    giris: 'Redüktör hızı düşürüp torku artırır ve yükün ataletini motora oranın karesi kadar küçük yansıtır. Servoda genellikle düşük boşluklu planet redüktör kullanılır.',
    etiketler: ['Planet redüktör', 'Oran i', 'Boşluk (arcmin)'],
    bolumler: [
      { id: 'sema', kisa: 'Yapı', baslik: 'Yapısı', bloklar: [
        { tip: 'sema', svg: 'servoReduktor',
          isaretler: [
            ['Adaptör flanş', 'Motor flanşını redüktöre uydurur; motor modeline göre seçilir.'],
            ['Sıkma bileziği', 'Motor milini redüktörün girişine sürtünmeyle bağlar. Vidası tork anahtarıyla sıkılır.'],
            ['Planet dişli kademesi', 'Güneş dişli, planet dişliler ve çember dişliden oluşur. Tek kademede oran çoğunlukla 3 ile 10 arasıdır.'],
            ['Çıkış mili', 'Kamalı ya da düz mil. Kasnak, pinyon ya da kaplin buraya bağlanır.']
          ] }
      ]},
      { id: 'hesap', kisa: 'Hesap', baslik: 'Hız, tork ve atalet', bloklar: [
        { tip: 'hesap', tur: 'reduktor' }
      ]},
      { id: 'montaj', kisa: 'Montaj', baslik: 'Montaj', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Motor milini ve sıkma bileziğinin içini yağdan arındır.',
          'Redüktörü dik tut, motoru eksenine paralel ve zorlamadan yerleştir.',
          'Sıkma bileziği vidasını katalogdaki torkla sık.',
          'Flanş vidalarını çapraz sırayla sık.',
          'Erişim tapasını kapat, motoru JOG ile çevirip sıkışma olmadığını kontrol et.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Konum doğru görünüyor ama yük hedefte salınıyor', satirlar: [
          ['Redüktör boşluğu', 'Kontrol: çıkış milini iki yöne elle çevirip boşluğu hisset, katalogdaki arcmin değeriyle karşılaştır.'],
          ['Sıkma bileziği kayıyor', 'Kontrol: mil ile bilezik üzerine işaret çiz, çalıştıktan sonra kayma var mı bak.'],
          ['Atalet oranı yüksek', 'Kontrol: yük ataletini hesapla; gerekirse oranı büyüt.'],
          ['Kazanç yüke göre ayarlanmamış', 'Kontrol: kazanç ayarını yük bağlıyken tekrarla.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Sıkma bileziğini tork anahtarsız sıkmak', 'Az sıkılırsa mil kayar, fazla sıkılırsa bilezik zarar görür. Doğrusu: katalogdaki tork.'],
          ['Çıkış torkunu redüktörün sınırına bakmadan hesaplamak', 'Motor torku × oran, redüktörün izin verdiği torku aşabilir. Doğrusu: redüktör kataloğundaki anma ve acil durdurma torku.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Planet redüktör', 'Adaptör flanş', 'Sıkma bileziği', 'Kaplin', 'Tork anahtarı'] }
      ]}
    ]
  },
});
