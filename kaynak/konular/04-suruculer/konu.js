/* Sürücüler: konu tanımı ve bilgi sayfaları. */
VERI.konular.push({
  id: 'suruculer', ad: 'Sürücüler', ikon: 'surucu',
  ozet: 'Step, servo ve hız sürücüleri',
  giris: 'Sürücü, kontrol sinyalini motorun ihtiyaç duyduğu akım ve gerilime çeviren güç katıdır.',
  altlar: [
    { id: 'surucu-ic-yapi', kod: '3B', ad: 'Step sürücü: klemensler (3B model)', alt: 'PUL, DIR, ENA, A±, B± · DIP anahtarları · iç yapı', sayfa: 'surucu-ic-yapi' },
    { id: 'surucu-step', kod: 'STEP', ad: 'Step sürücüler', alt: 'Akım ayarı, mikroadım, DIP anahtarı', sayfa: 'surucu-step' },
    { id: 'servo-surucu-ic-yapi', kod: '3B', ad: 'Servo sürücü: iç yapı (3B)', alt: 'DC bara, IGBT, fren direnci, konnektörler · CHARGE LED’i', sayfa: 'servo-surucu-ic-yapi' },
    { id: 'surucu-servo', kod: 'SRV', ad: 'Servo sürücüler', alt: 'Kontrol modları: konum, hız, tork', sayfa: 'surucu-servo' },
    { id: 'surucu-vfd', kod: 'VFD', ad: 'Hız kontrol cihazı (VFD)', alt: 'Asenkron motor hız kontrolü, parametreler', sayfa: 'surucu-vfd' },
    { id: 'surucu-io', kod: 'I/O', ad: 'Sürücü giriş–çıkışları', alt: 'Dijital girişler, alarm ve hazır çıkışları', sayfa: 'surucu-io' }
  ]
});

Object.assign(VERI.sayfalar, {
  'surucu-ic-yapi': {
    baslik: 'Step sürücü: klemensler ve iç yapı',
    giris: 'Step sürücünün bir yanında sinyal ve güç klemensleri, DIP anahtarları ve LED’ler bulunur. İçinde sinyalleri yalıtan optokuplörler, denetleyici ve motor akımını ayarlayan MOSFET köprüleri vardır.',
    etiketler: ['3B model', 'PUL · DIR · ENA', 'A± · B±', 'DIP anahtarı'],
    bolumler: [
      { id: 'model', kisa: '3B model', baslik: 'Klemensler ve parçalar', bloklar: [
        { tip: 'model', tur: 'step-surucu' }
      ]},
      { id: 'baglanti', kisa: 'Bağlantı', baslik: 'Bağlantı sırası', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Enerjiyi kes. Sargı çiftlerini motor tarafında ölçerek bul.',
          'A sargısını A+ / A−, B sargısını B+ / B− uçlarına bağla.',
          'DC beslemeyi +V ve GND uçlarına bağla; kutbu iki kez kontrol et.',
          'PLC’nin darbe ve yön çıkışlarını PUL ve DIR girişlerine bağla. NPN çıkışta artı uçlar ortak artıya, eksi uçlar PLC çıkışlarına gider.',
          'DIP anahtarlarıyla akımı motor etiketine, mikroadımı PLC’deki darbe/tur ayarına göre seç.',
          'Enerji ver: PWR yanmalı, ALM sönük kalmalı. İlk denemeyi düşük hızla yap.'
        ]},
        { tip: 'not', metin: 'Uç adları ve sırası üreticiye göre değişir; sürücünün üstündeki etikete ve kataloğa bak. Anahtarların anlamı ve NPN/PNP bağlantı: Step sürücüler ve Sürücü giriş–çıkışları sayfaları.' }
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['PUL ve DIR girişlerini doğrudan 24 V ile sürmek', 'Giriş 5 V içinse optokuplör aşırı akımla bozulabilir. Doğrusu: sürücü 24 V girişi destekliyorsa onu kullan; desteklemiyorsa katalogdaki seri direnci tak.'],
          ['Motor kablosunu enerji varken sökmek ya da takmak', 'Sargıdaki akım kesilince oluşan ark ve gerilim sıçraması sürücünün çıkış katını bozabilir. Doğrusu: önce enerjiyi kes.'],
          ['Sürücüyü havasız bir köşeye sıkıştırmak', 'Taban ısıyı atamaz; sürücü ısınır, akımı düşürür ya da alarma geçer. Doğrusu: metal yüzeye bağla, çevresinde boşluk bırak.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Step motor', 'DC güç kaynağı', 'PLC transistör çıkışı', 'Ekranlı kablo'] }
      ]}
    ]
  },
  'surucu-step': {
    baslik: 'Step sürücüler',
    giris: 'Step sürücü PLC’den gelen darbeleri sargı akımına çevirir. Akımı, mikroadımı ve bekleme akımını çoğunlukla üstündeki DIP anahtarlarla ayarlarsın.',
    etiketler: ['DIP anahtarı', 'Tepe / RMS', 'Bekleme akımı'],
    bolumler: [
      { id: 'sema', kisa: 'Anahtarlar', baslik: 'Ayar anahtarları', bloklar: [
        { tip: 'sema', svg: 'surucuDip',
          isaretler: [
            ['Akım (SW1–3)', 'Motorun faz akımına göre seçilir.'],
            ['Bekleme akımı (SW4)', 'Motor durunca akımı düşürür; ısınma azalır, tutma torku düşer.'],
            ['Mikroadım (SW5–8)', 'Tur başına darbe sayısını seçer.']
          ],
          not: 'Örnek düzendir. Hangi anahtarın ne yaptığı sürücünün üstündeki tabloda yazar.' }
      ]},
      { id: 'akim', kisa: 'Akım', baslik: 'Akım ayarı', bloklar: [
        { tip: 'formul', formul: 'Tepe ≈ RMS × 1,41',
          tanimlar: [['RMS', 'Etkin değer. Motor etiketindeki faz akımı genellikle bu değerle karşılaştırılır.'], ['Tepe', 'Sürücü tablolarında ayrıca verilir; RMS’nin yaklaşık 1,41 katıdır.']],
          ornek: { baslik: 'Örnek · motor 2,8 A/faz', satirlar: [['RMS', '≈ 2,8 A'], ['Tepe', '≈ 2,8 × 1,41 ≈ 3,9 A']] },
          kural: 'Akımı motor anma değerinin üstüne çıkarma; motor aşırı ısınır.' }
      ]},
      { id: 'cevrim', kisa: 'Açık / kapalı', baslik: 'Açık ve kapalı çevrim', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'acik', baslik: 'Açık çevrim', etiket: 'Enkodersiz', metin: 'Ucuz ve basit. Adım kaçırırsa sürücü fark etmez.' },
          { ikon: 'kapali', baslik: 'Kapalı çevrim', etiket: 'Enkoderli', metin: 'Adım kaçırmayı algılar ve düzeltir, gerekmediğinde akımı düşürür. Hibrit servo da denir.' }
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Sürücünün alarm LED’i yanıyor', satirlar: [
          ['Aşırı akım ya da kısa devre', 'Kontrol: motor kablosunda faz-faz ve faz-gövde kısa devre ölç.'],
          ['Aşırı gerilim', 'Olası neden: hızlı yavaşlamada motor enerji geri basar. Kontrol: yavaşlama rampasını uzat, beslemeyi ölç.'],
          ['Düşük gerilim', 'Kontrol: besleme gerilimini ve bağlantıyı ölç.'],
          ['Motor bağlı değil ya da sargı kopuk', 'Kontrol: sargı dirençlerini ölç.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['DIP ayarını enerji varken değiştirmek', 'Çoğu sürücü ayarı açılışta okur; değişiklik görünmez. Doğrusu: enerjiyi kesip ayarla.'],
          ['Sürücü beslemesini motor etiketindeki gerilime göre seçmek', 'Etiketteki gerilim sargı direncinden hesaplanan düşük bir değerdir; sürücü çok daha yüksek gerilimle beslenir. Doğrusu: sürücünün izin verdiği aralık.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Step motor', 'Güç kaynağı', 'Enkoder', 'PLC transistör çıkışı'] }
      ]}
    ]
  },
  'servo-surucu-ic-yapi': {
    baslik: 'Servo sürücünün iç yapısı',
    giris: 'Servo sürücü şebekeyi önce DC’ye çevirir, sonra IGBT’lerle motora istenen akımı verir. Kontrol kartı enkoderi okuyup konum, hız ve akım döngülerini kapatır.',
    etiketler: ['3B model', 'DC bara', 'IGBT', 'Fren direnci'],
    bolumler: [
      { id: 'model', kisa: '3B model', baslik: 'Parçalar', bloklar: [
        { tip: 'model', tur: 'servo-surucu' }
      ]},
      { id: 'calisma', kisa: 'Çalışma', baslik: 'Güç yolu', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Ana besleme doğrultucudan geçer; DC bara kondansatörleri 230 V girişte yaklaşık 325 V’a dolar. İlk anda ön dolum direnci akımı sınırlar, sonra röle direnci devreden çıkarır.',
          'Kontrol kartı enkoderden konumu okur; konum, hız ve akım döngülerini hesaplar.',
          'Servo ON gelince IGBT’ler PWM ile anahtarlanır; motor sargılarına istenen akım verilir. Akım sensörleri gerçek akımı ölçer.',
          'Yavaşlamada motor enerjiyi geri verir, DC bara yükselir. Eşik aşılınca fren kıyıcısı enerjiyi fren direncine aktarır.',
          'Enerji kesilince kondansatörler dirençler üzerinden boşalır; CHARGE LED’i sönmeden klemenslere dokunulmaz.'
        ]},
        { tip: 'not', metin: 'Modeldeki süreler kısaltıldı; gerçekte kondansatörlerin boşalması dakikalar sürebilir. Güvenli bekleme süresi sürücünün üzerinde yazar. 400 V sınıfı sürücülerde DC bara yaklaşık 565 V’tur.' }
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['CHARGE LED’i yanarken klemenslere dokunmak', 'Ana güç kesilse de DC bara yüzlerce volt taşır. Doğrusu: LED’in sönmesini ve etiketteki süreyi bekle, DC bara uçları arasını ölçerek doğrula.'],
          ['Fren direncini hesap yapmadan seçmek', 'Direnç aşırı ısınır ya da sürücü aşırı gerilim (OV) alarmı verir. Doğrusu: yük ataleti ve yavaşlama süresine göre gücü hesapla ya da kataloğa bak.'],
          ['Soğutucunun üstünü ve altını kapatmak', 'Hava akışı kesilir, IGBT ısınır, sürücü aşırı sıcaklık alarmı verir. Doğrusu: kılavuzdaki montaj boşluklarına uy.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Servo motor', 'Enkoder kablosu', 'Fren direnci', 'Hat filtresi', 'Güvenlik rölesi'] }
      ]}
    ]
  },
  'surucu-servo': {
    baslik: 'Servo sürücüler',
    giris: 'Servo sürücü motoru enkoderden aldığı geri beslemeyle sürer. Aynı sürücü konum, hız ya da tork modunda çalışabilir; komut darbe, analog gerilim ya da haberleşmeyle gelir.',
    etiketler: ['Konum · hız · tork', 'Elektronik dişli', 'EtherCAT'],
    bolumler: [
      { id: 'sema', kisa: 'Komutlar', baslik: 'Komut yolları', bloklar: [
        { tip: 'sema', svg: 'surucuServo',
          isaretler: [
            ['Darbe / yön', 'Konum modu. Her darbe bir konum birimi; elektronik dişliyle ölçeklenir.'],
            ['Analog ±10 V', 'Hız ya da tork modu. Gerilim komutun kendisidir; konum döngüsü PLC’de kapanır.'],
            ['EtherCAT (ya da CANopen)', 'Konum, hız, tork komutları ve durum bilgisi tek kablodan. CSP modunda PLC her çevrimde hedef konum gönderir.']
          ] }
      ]},
      { id: 'modlar', kisa: 'Modlar', baslik: 'Kontrol modları', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Konum', '', 'Motor verilen konuma gider ve orada durur.'],
          ['Hız', '', 'Motor verilen hızda döner.'],
          ['Tork', '', 'Motor verilen torku uygular; sarma ve gerdirme uygulamaları.'],
          ['CSP · CSV · CST', 'sig', 'EtherCAT’te döngüsel senkron konum, hız, tork. CiA 402’de mod numaraları 8, 9, 10.']
        ]},
        { tip: 'not', metin: 'Kinco FD serisinde mod, Operation_Mode parametresiyle (nesne 6060h) seçilir. Kılavuzdaki değerler:' },
        { tip: 'tablo', satirlar: [
          ['−4', 'sig', 'Darbe modu: darbe/yön ya da CW/CCW.'],
          ['−3', '', 'Anlık hız modu.'],
          ['1', '', 'İç konum modu.'],
          ['3', '', 'Rampalı hız modu.'],
          ['4', '', 'Tork modu.'],
          ['6', '', 'Referans (homing) modu.']
        ]}
      ]},
      { id: 'disli', kisa: 'Dişli', baslik: 'Elektronik dişli', bloklar: [
        { tip: 'hesap', tur: 'disli' }
      ]},
      { id: 'devreye', kisa: 'Devreye alma', baslik: 'Devreye alma', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Sürücüye motor modelini tanıt; enkoder alarmı olmamalı.',
          'Motoru yükten ayırıp JOG ile yönü kontrol et.',
          'Elektronik dişliyi (tur başına darbe) ayarla.',
          'Limit ve referans sensörlerini test et.',
          'Yükü bağlayıp kazanç ayarı yap.',
          'Takip hatası sınırını makineye göre ayarla.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Takip hatası (following error) alarmı', satirlar: [
          ['Hızlanma çok yüksek', 'Kontrol: rampayı uzat, motorun yetip yetmediğini hesapla.'],
          ['Kazanç düşük', 'Kontrol: rijitliği artır.'],
          ['Mekanik sıkışma ya da fren açılmıyor', 'Kontrol: ekseni elle hareket ettir, frenin açıldığını dinle.'],
          ['Tork sınırı düşük', 'Kontrol: tork sınırı parametresine bak.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['STO girişlerini kalıcı köprülemek', 'Güvenli tork kesme devre dışı kalır; acil durdurma motoru güvenle durdurmaz. Doğrusu: güvenlik rölesi ya da güvenlik PLC’si üzerinden bağla.'],
          ['Darbe frekansını PLC sınırına dayamak', 'Yüksek hızda darbe kaybolabilir. Doğrusu: elektronik dişliyle darbe başına yolu büyüt.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Servo motor', 'Enkoder kablosu', 'EtherCAT kablosu', 'Güvenlik rölesi', 'Fren direnci'] }
      ]}
    ]
  },
  'surucu-vfd': {
    baslik: 'Hız kontrol cihazı (VFD)',
    giris: 'VFD (frekans konvertörü) şebekeyi önce DC’ye, sonra ayarlanabilir frekanslı AC’ye çevirir. Asenkron motorun hızı frekansla orantılı değişir.',
    etiketler: ['V/f', 'Vektör kontrol', 'Fren direnci'],
    bolumler: [
      { id: 'sema', kisa: 'Yapı', baslik: 'İç yapı', bloklar: [
        { tip: 'sema', svg: 'surucuVfd',
          lejant: [['l', 'L1'], ['l2', 'L2'], ['l3', 'L3'], ['dc', 'DC +']],
          isaretler: [
            ['Doğrultucu', 'Şebeke AC’sini DC’ye çevirir.'],
            ['DC bara', 'Kondansatörler gerilimi düzgünleştirir ve enerji depolar.'],
            ['Fren kıyıcısı ve direnci', 'Yavaşlamada motor jeneratör gibi çalışır, DC bara gerilimi yükselir. Kıyıcı bu enerjiyi dirence aktarır.'],
            ['Evirici (IGBT)', 'DC’yi PWM ile istenen frekans ve gerilimde üç faz AC’ye çevirir.']
          ] }
      ]},
      { id: 'hesap', kisa: 'Hesap', baslik: 'Frekans ve hız', bloklar: [
        { tip: 'hesap', tur: 'vfd' }
      ]},
      { id: 'param', kisa: 'Parametreler', baslik: 'Temel parametreler', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Motor etiketi', '', 'Güç, gerilim, akım, frekans ve devir girilir. Koruma ve vektör kontrol buna göre çalışır.'],
          ['Hızlanma / yavaşlama', '', 'Çok kısa tutulursa aşırı akım ya da aşırı gerilim alarmı gelir.'],
          ['Alt / üst frekans', '', 'Motorun ve makinenin çalışma aralığı.'],
          ['Komut kaynağı', '', 'Çalıştırma nereden gelir: panel, klemens ya da haberleşme.'],
          ['Frekans referansı', '', 'Hız nereden gelir: potansiyometre, analog giriş ya da haberleşme.'],
          ['Kontrol modu', '', 'V/f basit yükler için; vektör kontrol düşük hızda yüksek tork için.']
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Yavaşlarken aşırı gerilim (OV) alarmı', satirlar: [
          ['Yavaşlama süresi kısa', 'Kontrol: süreyi uzat.'],
          ['Fren direnci yok ya da arızalı', 'Kontrol: direnci ölç, fren kıyıcısı parametresine bak.'],
          ['Yük ataleti büyük (fan, volan)', 'Kontrol: fren direnci ekle ya da serbest durdurma kullan.'],
          ['Şebeke gerilimi yüksek', 'Kontrol: giriş gerilimini ölç.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Çıkıştaki kontaktörü motor dönerken açıp kapamak', 'Ani akım darbesi sürücüyü alarma sokar ya da zarar verir. Doğrusu: kontaktörü sürücü dururken anahtarla, çalıştırmayı sürücüden yap.'],
          ['Çıkışa kompanzasyon kondansatörü bağlamak', 'PWM çıkışı kondansatörü ve sürücüyü zorlar. Doğrusu: VFD çıkışında kondansatör olmaz.'],
          ['Çalıştırıp durdurmayı giriş kontaktörüyle yapmak', 'DC bara her seferinde yeniden şarj olur, ömür kısalır. Doğrusu: çalıştır/durdur komutunu klemensten ver.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Fren direnci', 'Hat şoku', 'EMC filtresi', 'Ekranlı motor kablosu', 'Potansiyometre'] }
      ]}
    ]
  },
  'surucu-io': {
    baslik: 'Sürücü giriş–çıkışları',
    giris: 'Sürücünün dijital girişleri PLC’den ve sensörlerden komut alır, çıkışları durum bilgisi verir. Bağlantı, girişin NPN ya da PNP mantığına göre yapılır.',
    etiketler: ['NPN / PNP', '24 V DC', 'COM'],
    bolumler: [
      { id: 'sema', kisa: 'Bağlantı', baslik: 'NPN ve PNP bağlantı', bloklar: [
        { tip: 'sema', svg: 'surucuIo',
          lejant: [['dc', '+24 V'], ['ink', '0 V'], ['sig', 'Sinyal']],
          isaretler: [
            ['NPN (sink) sensör', 'Çıkış tetiklenince 0 V’a çeker. Girişin COM ucu +24 V’a bağlanır.'],
            ['PNP (source) sensör', 'Çıkış tetiklenince +24 V verir. Girişin COM ucu 0 V’a bağlanır.'],
            ['Ortak 0 V', 'Sensörler ile sürücü farklı kaynaklardan besleniyorsa 0 V’lar birleştirilir.']
          ] }
      ]},
      { id: 'sinyaller', kisa: 'Sinyaller', baslik: 'Tipik sinyaller', bloklar: [
        { tip: 'tablo', satirlar: [
          ['SON', 'sig', 'Servo enable. Motoru enerjiler.'],
          ['ARST', 'sig', 'Alarm reset.'],
          ['POT · NOT', 'sig', 'İleri ve geri limit.'],
          ['ORG', 'sig', 'Referans (home) sensörü.'],
          ['ALM', '', 'Alarm çıkışı.'],
          ['RDY', '', 'Hazır çıkışı.'],
          ['INP', '', 'Konuma ulaştı çıkışı.'],
          ['BRK', 'dc', 'Fren çıkışı.']
        ]},
        { tip: 'not', metin: 'Sinyal adları üreticiye göre değişir. Birçok sürücüde girişe hangi fonksiyonun atanacağı parametreden seçilir.' }
      ]},
      { id: 'mantik', kisa: 'NPN / PNP', baslik: 'NPN mi, PNP mi?', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'npn', baslik: 'NPN', etiket: 'Sink', metin: 'Asya menşeli ekipmanda yaygın. Sinyal 0 V’a çekilince aktif olur.' },
          { ikon: 'pnp', baslik: 'PNP', etiket: 'Source', metin: 'Avrupa’da yaygın. Sinyal +24 V olunca aktif olur.' }
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Sensör çalışıyor ama sürücü girişi görmüyor', satirlar: [
          ['NPN/PNP uyumsuz', 'Kontrol: COM ucunun bağlandığı yeri sensör tipine göre kontrol et.'],
          ['0 V’lar birleşik değil', 'Kontrol: iki kaynağın 0 V’u arasında süreklilik ölç.'],
          ['Giriş fonksiyonu atanmamış', 'Kontrol: giriş parametresinde fonksiyonu ata.'],
          ['Mantık ters', 'Kontrol: girişin NO/NC mantık parametresine bak.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Limit anahtarlarını NO bağlamak', 'Kablo koparsa limit hiç algılanmaz. Doğrusu: limitler NC bağlanır; kablo kopması da ekseni durdurur.'],
          ['Röle bobinini çıkışa diyotsuz bağlamak', 'Bobin kesilince oluşan gerilim darbesi transistör çıkışını bozar. Doğrusu: bobine ters paralel diyot.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Endüktif sensör', 'Limit anahtarı', 'Röle', 'Klemens', 'PLC'] }
      ]}
    ]
  },
});
