/* PLC temelleri: konu tanımı ve bilgi sayfaları. */
VERI.konular.push({
  id: 'plc-temelleri', ad: 'PLC temelleri', ikon: 'plc',
  ozet: 'Tarama, ladder, veri tipleri, zamanlayıcı, PID',
  giris: 'PLC girişleri okur, programı çalıştırır, çıkışları yazar ve bunu milisaniyeler içinde sürekli tekrarlar.',
  altlar: [
    { id: 'plc-tarama', kod: 'CPU', ad: 'Tarama çevrimi ve I/O', alt: 'Giriş, program, çıkış · çıkış tipleri', sayfa: 'plc-tarama' },
    { id: 'ladder', kod: 'LD', ad: 'Ladder temelleri', alt: 'Kontak, bobin, set/reset · diller', sayfa: 'ladder' },
    { id: 'veri-tipleri', kod: 'INT', ad: 'Veri tipleri ve adresleme', alt: 'BOOL, INT, REAL · word sırası', sayfa: 'veri-tipleri' },
    { id: 'zamanlayici-sayici', kod: 'TON', ad: 'Zamanlayıcı ve sayıcı', alt: 'TON, TOF, TP, CTU · simülasyon', sayfa: 'zamanlayici-sayici' },
    { id: 'pid', kod: 'PID', ad: 'PID kontrol', alt: 'P, I, D etkisi · ayar · simülasyon', sayfa: 'pid' },
    { id: 'plc-ariza', kod: 'I/O', ad: 'PLC arıza bulma', alt: 'LED’ler, çıkış devresi, CPU durumu', sayfa: 'plc-ariza' }
  ]
});

Object.assign(VERI.sayfalar, {
  'plc-tarama': {
    baslik: 'Tarama çevrimi ve I/O',
    giris: 'PLC girişleri okur, programı yukarıdan aşağı çalıştırır, sonuçları çıkışlara yazar ve bunu sürekli tekrarlar. Bir turun süresine tarama süresi denir.',
    etiketler: ['Tarama süresi', 'PNP / NPN giriş', 'Röle / transistör çıkış'],
    bolumler: [
      { id: 'cevrim', kisa: 'Çevrim', baslik: 'Tarama çevrimi', bloklar: [
        { tip: 'sema', svg: 'plcTarama',
          isaretler: [
            ['Girişleri oku', 'Tüm girişler tek seferde hafızaya (giriş görüntüsü) kopyalanır. Program çalışırken giriş değişse de tur sonuna kadar bu kopya kullanılır.'],
            ['Programı çalıştır', 'Satırlar yukarıdan aşağı sırayla işlenir. Sonuçlar önce hafızadaki çıkış görüntüsüne yazılır.'],
            ['Çıkışları yaz', 'Çıkış görüntüsü tur sonunda fiziksel çıkışlara aktarılır.'],
            ['İletişim ve tanı', 'HMI, ağ ve programlama bağlantısı işlenir, donanım kontrol edilir. Sonra tur yeniden başlar.']
          ],
          not: 'Tarama süresinden kısa süren bir sinyal kaçabilir. Hızlı darbeler için hızlı sayıcı (HSC) ya da kesme girişi kullanılır.' }
      ]},
      { id: 'giris', kisa: 'Girişler', baslik: 'Dijital giriş bağlantısı', bloklar: [
        { tip: 'sema', svg: 'plcGiris',
          lejant: [['dc', '+24 V (BN)'], ['ink', 'Sinyal (BK)'], ['n', '0 V (BU)']],
          isaretler: [
            ['Kahverengi (BN)', 'Sensör beslemesi +24 V.'],
            ['Siyah (BK)', 'Sensör çıkışı. PNP algılayınca +24 V verir; NPN algılayınca 0 V’a çeker.'],
            ['Mavi (BU)', 'Sensör beslemesi 0 V.'],
            ['Ortak uç (1M)', 'Giriş grubunun ortak ucu. PNP sensörde 0 V’a, NPN sensörde +24 V’a bağlanır.']
          ],
          not: 'Sensör tipi ile giriş bağlantısı uyumlu olmalı. Avrupa’da PNP yaygındır; Asya menşeli makinelerde NPN sık görülür.' }
      ]},
      { id: 'cikis', kisa: 'Çıkışlar', baslik: 'Çıkış tipleri', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'roleCikis', baslik: 'Röle çıkış', etiket: 'AC ve DC', metin: 'Kontak kapatır; 230 V AC ya da 24 V DC yük sürebilir, tipik 2 A. Yavaştır, kontak ömrü sınırlıdır.' },
          { ikon: 'transistor', baslik: 'Transistör çıkış', etiket: 'Yalnızca DC', metin: '24 V DC yükler için; hızlıdır ve aşınmaz, tipik 0,5 A. Darbe ve sık anahtarlama için.' }
        ]},
        { tip: 'tablo', satirlar: [
          ['Ara röle', '', 'Büyük akım ya da 230 V kontaktör bobini sürülecekse araya 24 V bobinli ara röle koy.'],
          ['Diyot', 'dc', 'DC röle ve valf bobinlerine ters paralel diyot koy; kapanmadaki gerilim sıçraması çıkışı zorlar.'],
          ['Çıkış beslemesi', 'dc', 'Transistör çıkış kartı ayrıca 1L+ / 2L+ beslemesi ister. Besleme yoksa program çıkışı açsa da yük çalışmaz.']
        ]}
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Transistör çıkışa 230 V AC yük bağlamak', 'Çıkış anında bozulur. Doğrusu: 24 V ara röle ya da röle çıkışlı kart.'],
          ['NPN sensörü PNP’ye göre bağlanmış girişe takmak', 'Giriş hiç 1 olmaz. Doğrusu: 1M ucunu sensör tipine göre bağla ya da uygun sensör seç.'],
          ['Röle çıkışla hızlı darbe üretmek', 'Kontak çabuk aşınır, darbeler kaçar. Doğrusu: transistör çıkış.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['PLC CPU', 'Dijital giriş/çıkış kartı', '24 V DC güç kaynağı', 'Ara röle', 'Klemens'] }
      ]}
    ]
  },
  'ladder': {
    baslik: 'Ladder temelleri',
    giris: 'Ladder (LD), röleli kumanda şemasının yan yatırılmış hâlidir. Sol ray gerilim, sağ ray dönüş gibi düşünülür; her satır bir koşul ve bir sonuçtur.',
    etiketler: ['Kontak ve bobin', 'Mühürleme', 'Set / Reset'],
    bolumler: [
      { id: 'semboller', kisa: 'Semboller', baslik: 'Temel semboller', bloklar: [
        { tip: 'sema', svg: 'ladderSembol',
          not: 'Kontak fiziksel butonu değil, hafızadaki biti sorgular. NC kontak “bit 0 ise geçir” demektir.' }
      ]},
      { id: 'sim', kisa: 'Simülasyon', baslik: 'Start-stop satırı', bloklar: [
        { tip: 'sim', tur: 'ladderMuhur' }
      ]},
      { id: 'kural', kisa: 'Stop kuralı', baslik: 'Stop butonu neden NC bağlanır', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Stop butonunu fiziksel olarak NC bağla: basılı değilken giriş 1 okunur.',
          'Programda bu girişi NO kontakla yaz: giriş 1 iken satır geçirir.',
          'Stop’a basılınca ya da kablo kopunca giriş 0 olur ve çıkış düşer.',
          'Böylece kopuk kablo makineyi çalıştırmaz, durdurur (güvenli yön).'
        ]},
        { tip: 'not', metin: 'Acil stop gibi güvenlik fonksiyonları yalnızca PLC programına bırakılmaz; güvenlik rölesi ya da güvenlik PLC’si kullanılır.' }
      ]},
      { id: 'diller', kisa: 'Diller', baslik: 'IEC 61131-3 dilleri', bloklar: [
        { tip: 'tablo', satirlar: [
          ['LD', '', 'Ladder: kontak ve bobinler. Elektrikçinin en kolay okuduğu dil; arıza takibi için ideal.'],
          ['FBD', '', 'Fonksiyon blokları: kutular ve bağlantılar. Analog işlem ve kilitlemede okunaklı.'],
          ['ST', '', 'Yapısal metin: Pascal benzeri kod. Hesap, döngü ve veri işleme için.'],
          ['SFC', '', 'Adım diyagramı: adımlar ve geçişler. Sıralı makine hareketleri için.']
        ]}
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Aynı bobini iki satırda kullanmak (çift bobin)', 'Son yazılan satır kazanır; ilki çalışmıyor gibi görünür. Doğrusu: koşulları tek satırda paralel bağla ya da set/reset kullan.'],
          ['NC bağlı stop butonunu programda NC kontakla yazmak', 'Makine hiç çalışmaz ya da Stop’a basınca çalışır. Doğrusu: programda NO kontak.'],
          ['Set edilen biti resetlemeyi unutmak', 'Koşul kalksa da çıkış 1 kalır. Doğrusu: her set için bir reset koşulu yaz.']
        ]}
      ]}
    ]
  },
  'veri-tipleri': {
    baslik: 'Veri tipleri ve adresleme',
    giris: 'PLC hafızası bitlerden oluşur. Bitler byte, word ve double word olarak gruplanır. Seçilen veri tipi, değerin aralığını ve haberleşmede nasıl taşınacağını belirler.',
    etiketler: ['BOOL · INT · REAL', 'Bit · byte · word', 'Word sırası'],
    bolumler: [
      { id: 'hafiza', kisa: 'Hafıza', baslik: 'Bit, byte, word', bloklar: [
        { tip: 'sema', svg: 'veriBoyut',
          isaretler: [
            ['Bit', '%M0.0: tek bir 0/1. Byte içinde 0–7 arası numaralanır.'],
            ['Byte', '8 bit: MB0, MB1, MB2…'],
            ['Word', '16 bit = 2 byte. MW0, MB0 ile MB1’i kapsar.'],
            ['Double word', '32 bit = 4 byte. MD0, MB0’dan MB3’e kadar.'],
            ['Çakışma', 'MW1, MW0 ile aynı MB1’i kullanır. Word adreslerini 2’şer, double word adreslerini 4’er artır.']
          ],
          not: 'Siemens’te MW0’ın yüksek byte’ı MB0’dır (big-endian). Bazı PLC’ler tersini kullanır; haberleşmede byte sırası bu yüzden karışır.' }
      ]},
      { id: 'tipler', kisa: 'Tipler', baslik: 'Veri tipleri', bloklar: [
        { tip: 'tablo', satirlar: [
          ['BOOL', 'sig', '1 bit: 0 ya da 1.'],
          ['BYTE · WORD · DWORD', '', '8 · 16 · 32 bitlik bit dizisi. Durum sözcükleri ve maskeleme için.'],
          ['INT', 'sig', '16 bit tam sayı: −32.768 … 32.767.'],
          ['DINT', 'sig', '32 bit tam sayı: ±2,1 milyar. Sayıcı ve konum için.'],
          ['REAL', 'sig', '32 bit ondalıklı sayı (≈ 7 anlamlı basamak). Analog değer, PID.'],
          ['TIME', '', 'Süre: T#5S, T#200MS.'],
          ['STRING', '', 'Metin: barkod, reçete adı.']
        ]}
      ]},
      { id: 'adres', kisa: 'Adres', baslik: 'Üreticilere göre adres yazımı', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Siemens', '', '%I0.0 giriş · %Q0.0 çıkış · %M10.3 bit · %MW20 word · %DB1.DBX0.0 veri bloğu biti'],
          ['IEC / CODESYS', '', '%IX0.0 giriş · %QX0.0 çıkış · %MX0.0 bit · %MW0 word'],
          ['Mitsubishi', '', 'X0 giriş · Y0 çıkış · M0 bit · D0 veri kaydı (16 bit)'],
          ['Omron', '', '0.00 giriş · 100.00 çıkış · W0.00 iş biti · D0 veri'],
          ['Delta', '', 'X0 giriş · Y0 çıkış · M0 bit · D0 veri kaydı']
        ]}
      ]},
      { id: 'float', kisa: 'REAL sırası', baslik: 'Haberleşmede REAL ve word sırası', bloklar: [
        { tip: 'hesap', tur: 'float' }
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['MW0 ile MW1’i ayrı değişken sanmak', 'İkisi aynı byte’ı paylaşır; birine yazmak diğerini bozar. Doğrusu: word adreslerini 2’şer artır.'],
          ['INT taşmasını hesaba katmamak', '32.767 + 1 = −32.768 olur; sayıcı birden negatife düşer. Doğrusu: büyük değerlerde DINT.'],
          ['REAL değerleri = ile karşılaştırmak', 'Ondalık hesapta 0,1 + 0,2 tam 0,3 çıkmaz. Doğrusu: ≥ ve ≤ ya da küçük bir tolerans kullan.']
        ]}
      ]}
    ]
  },
  'zamanlayici-sayici': {
    baslik: 'Zamanlayıcı ve sayıcı',
    giris: 'Zamanlayıcı bir sinyali geciktirir ya da uzatır; sayıcı darbeleri sayar. İkisi de PLC programlarının en çok kullanılan bloklarıdır.',
    etiketler: ['TON, TOF, TP', 'CTU', 'PT, ET, PV, CV'],
    bolumler: [
      { id: 'zaman', kisa: 'Zamanlayıcı', baslik: 'Zamanlayıcı simülasyonu', bloklar: [
        { tip: 'sim', tur: 'zamanlayici' }
      ]},
      { id: 'tipler', kisa: 'Tipler', baslik: 'Zamanlayıcı tipleri', bloklar: [
        { tip: 'tablo', satirlar: [
          ['TON', '', 'Çekmede gecikme: IN, PT kadar 1 kalırsa Q = 1 olur. Kalkış gecikmesi, sinyal filtresi.'],
          ['TOF', '', 'Düşmede gecikme: IN düşünce Q, PT kadar daha 1 kalır. Fan son çalışma, aydınlatma.'],
          ['TP', '', 'Darbe: IN’in yükselen kenarında Q, PT kadar 1 olur. Sabit süreli itme, korna.'],
          ['TONR', '', 'Kalıcı çekmede gecikme (standart dışı, ör. Siemens): IN düşse de süre silinmez, reset ister. Çalışma saati sayacı.']
        ]},
        { tip: 'tablo', satirlar: [
          ['IN', 'sig', 'Zamanlayıcıyı başlatan giriş'],
          ['PT', 'sig', 'Ayarlanan süre (preset time)'],
          ['ET', 'sig', 'Geçen süre (elapsed time)'],
          ['Q', 'sig', 'Çıkış biti']
        ]}
      ]},
      { id: 'sayici', kisa: 'Sayıcı', baslik: 'Sayıcı simülasyonu', bloklar: [
        { tip: 'sim', tur: 'sayici' },
        { tip: 'tablo', satirlar: [
          ['CTU', '', 'Yukarı sayar. CV ≥ PV olunca Q = 1. R ile sıfırlanır.'],
          ['CTD', '', 'Aşağı sayar. LD ile PV yüklenir; CV ≤ 0 olunca Q = 1.'],
          ['CTUD', '', 'İki yönlü sayar: giren-çıkan ürün, doluluk takibi.']
        ]}
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['TON’u tek bir darbeyle başlatmak', 'IN hemen düştüğü için süre hiç dolmaz. Doğrusu: IN’i mühürlenmiş bir bitle sür ya da TP/TOF kullan.'],
          ['Sayıcıyı sıfırlamamak', 'CV artmaya devam eder, Q hep 1 kalır. Doğrusu: iş bitince ya da vardiya başında R ile sıfırla.'],
          ['Sayımı kalıcı olmayan hafızada tutmak', 'Enerji kesilince sayım kaybolur. Doğrusu: kalıcı (retentive) hafıza alanı seç.']
        ]}
      ]}
    ]
  },
  'pid': {
    baslik: 'PID kontrol',
    giris: 'PID, ölçülen değeri (PV) hedefe (SP) getirmek için çıkışı (CV) sürekli ayarlar. Sıcaklık, basınç, seviye ve debi kontrolünün temelidir.',
    etiketler: ['SP · PV · CV', 'P, I, D', 'Ayar sırası'],
    bolumler: [
      { id: 'sim', kisa: 'Simülasyon', baslik: 'PID simülasyonu', bloklar: [
        { tip: 'sim', tur: 'pid' }
      ]},
      { id: 'etkiler', kisa: 'P, I, D', baslik: 'P, I ve D ne yapar', bloklar: [
        { tip: 'tablo', satirlar: [
          ['P (oransal)', 'sig', 'Hatayla orantılı tepki. Tek başına kalıcı hata bırakır; fazlası salınım yapar.'],
          ['I (integral)', 'sig', 'Hata sürdükçe çıkışı büyütür, kalıcı hatayı sıfırlar. Fazlası aşım ve yavaş salınım yapar.'],
          ['D (türev)', 'sig', 'Değişim hızına tepki verir, aşımı azaltır. Gürültülü ölçümde çıkışı titretir.']
        ]},
        { tip: 'tablo', satirlar: [
          ['SP', '', 'Hedef değer (set point).'],
          ['PV', '', 'Ölçülen değer (process value).'],
          ['CV', '', 'Kontrol çıkışı: %0–100 valf açıklığı, ısıtıcı gücü ya da hız.'],
          ['Ti · Td', '', 'Integral ve türev süreleri. Ti kısaldıkça I güçlenir.']
        ]}
      ]},
      { id: 'ayar', kisa: 'Ayar', baslik: 'Ayar sırası', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Mümkünse PLC’nin otomatik ayarını (autotune) kullan.',
          'Elle ayarda I ve D’yi kapat; Kp’yi PV salınmaya başlayana kadar artır, sonra yarıya indir.',
          'I’yı aç; kalıcı hata makul sürede kapanana kadar Ti’yi kısalt.',
          'Aşım fazlaysa Kp’yi azalt ya da küçük bir D ekle.',
          'SP’yi küçük adımlarla değiştirip tepkiyi izle; bulduğun değerleri kaydet.'
        ]}
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Integral doymasını (windup) önlememek', 'Çıkış %100’de kalırken I büyümeye devam eder; hedefe gelince büyük aşım olur. Doğrusu: anti-windup açık, çıkış sınırları doğru.'],
          ['Yön ayarını yanlış seçmek', 'Isıtmada PV artınca çıkış azalmalı, soğutmada artmalı. Yön ters seçilirse kontrol kaçar. Doğrusu: soğutma gibi süreçlerde yön parametresini çevir.'],
          ['Gürültülü ölçümde güçlü D kullanmak', 'Çıkış titrer, valf ve röle yıpranır. Doğrusu: D’yi kapat ya da ölçümü filtrele.']
        ]}
      ]}
    ]
  },
  'plc-ariza': {
    baslik: 'PLC arıza bulma',
    giris: 'PLC arızasında sinyali baştan sona takip et: sensör, giriş LED’i, program, çıkış LED’i ve yük. Sorun, sinyalin kaybolduğu ilk noktadadır.',
    etiketler: ['LED takibi', 'Online izleme', 'Force'],
    bolumler: [
      { id: 'yol', kisa: 'Sinyal yolu', baslik: 'Sinyal yolu', bloklar: [
        { tip: 'sema', svg: 'plcAriza',
          isaretler: [
            ['Sensör / buton', 'Sensörün kendi LED’i yanıyor mu? Yanmıyorsa besleme, ayar ya da hedef mesafesi.'],
            ['Giriş LED’i', 'Sensör algıladığı hâlde giriş LED’i yanmıyorsa kablo, 1M bağlantısı ya da PNP/NPN uyumsuzluğu.'],
            ['Program', 'Online izlemede giriş biti 1 mi, çıkışı süren satırın koşulları sağlanıyor mu? Bir kilitleme, zamanlayıcı ya da adım bekleniyor olabilir.'],
            ['Çıkış LED’i', 'Program çıkışı 1 yaptığı hâlde LED yanmıyorsa kart arızası ya da yanlış adres (donanım konfigürasyonu).'],
            ['Yük', 'LED yanıyor ama yük çalışmıyorsa yük uçlarında gerilimi ölç: kablo, sigorta, ara röle ya da yükün kendisi.']
          ] }
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza tabloları', bloklar: [
        { tip: 'ariza', belirti: 'Çıkış LED’i yanıyor ama yük çalışmıyor', satirlar: [
          ['Çıkış beslemesi yok', 'Kontrol: kartın 1L+ ve M uçları arasında 24 V ölç.'],
          ['Röle çıkış kontağı yanmış', 'Kontrol: çıkış LED’i yanarken çıkış ucu ile ortak uç arasını ölç; besleme gerilimi okunuyorsa kontak kapanmıyordur.'],
          ['Kablo ya da ara röle', 'Kontrol: yük uçlarında gerilim var mı bak; ara rölenin LED’ini kontrol et.']
        ]},
        { tip: 'ariza', belirti: 'CPU STOP’ta ya da hata LED’i yanıyor', satirlar: [
          ['Program hatası', 'Kontrol: programlama yazılımında tanı arabelleğini (diagnostic buffer) oku.'],
          ['Eksik ya da arızalı modül', 'Kontrol: donanım konfigürasyonu ile raftaki kartları karşılaştır.'],
          ['Besleme sorunu', 'Kontrol: CPU beslemesinin 24 V olduğunu yük altındayken ölç.']
        ]}
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Force’u açık bırakmak', 'Zorlanan bit program ne derse desin sabit kalır; makine beklenmedik çalışır. Doğrusu: iş bitince tüm force’ları kaldır.'],
          ['Yedek almadan programı değiştirmek', 'Geri dönüş yolu kalmaz. Doğrusu: önce PLC’deki programı yedekle, değişikliği not et.'],
          ['Arızayı önce programda aramak', 'Sorunların çoğu sensör, kablo ve beslemededir. Doğrusu: önce LED’lerden sinyal yolunu takip et.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Multimetre', 'Programlama kablosu', 'Yedek sigorta', 'Ara röle'] }
      ]}
    ]
  },
});
