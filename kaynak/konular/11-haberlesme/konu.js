/* Endüstriyel haberleşme: konu tanımı ve bilgi sayfaları. */
VERI.konular.push({
  id: 'haberlesme', ad: 'Endüstriyel haberleşme', ikon: 'haberlesme',
  ozet: 'RS-232/485, Ethernet, Modbus, PROFINET, EtherCAT, IO-Link',
  giris: 'PLC, sürücü ve cihazlar arasında veri tek kablodan taşınır. Her protokolün kablo, adres ve ayar kuralları farklıdır.',
  altlar: [
    { id: 'rs232', kod: '232', ad: 'RS-232', alt: 'DB9 pinleri, çapraz kablo, hız ve süre', sayfa: 'rs232' },
    { id: 'modbus-rtu', kod: '485', ad: 'Modbus RTU', alt: 'RS-485, adres, fonksiyon kodları', sayfa: 'modbus-rtu' },
    { id: 'ethernet-ip', kod: 'IP', ad: 'Ethernet kablosu ve IP adresi', alt: 'Alt ağ maskesi, RJ45 ve M12, 100 m', sayfa: 'ethernet-ip' },
    { id: 'modbus-tcp', kod: 'TCP', ad: 'Modbus TCP', alt: 'IP adresi, port 502, unit ID', sayfa: 'modbus-tcp' },
    { id: 'profinet', kod: 'PN', ad: 'PROFINET', alt: 'Cihaz adı, GSDML, devreye alma', sayfa: 'profinet' },
    { id: 'ethercat', kod: 'ECAT', ad: 'EtherCAT', alt: 'IN/OUT, ESI dosyası, durumlar', sayfa: 'ethercat' },
    { id: 'canopen', kod: 'CAN', ad: 'CANopen', alt: 'Düğüm no, sonlandırma, hız–mesafe', sayfa: 'canopen' },
    { id: 'io-link', kod: 'IOL', ad: 'IO-Link', alt: 'Master, port, IODD, M12 pinleri', sayfa: 'io-link' }
  ]
});

Object.assign(VERI.sayfalar, {
  'rs232': {
    baslik: 'RS-232',
    giris: 'RS-232, iki cihaz arasında noktadan noktaya seri haberleşmedir. Bir cihazın gönderdiği (TXD) hat, karşı tarafın aldığı (RXD) hatta gider. Kısa mesafe içindir; barkod okuyucu, terazi, eski HMI ve servis portlarında kullanılır.',
    etiketler: ['DB9', 'TXD ↔ RXD', '≈ 15 m'],
    bolumler: [
      { id: 'baglanti', kisa: 'Bağlantı', baslik: 'Çapraz (null-modem) bağlantı', bloklar: [
        { tip: 'sema', svg: 'rs232Kablo',
          lejant: [['dc', 'PLC’nin gönderdiği'], ['sig', 'Cihazın gönderdiği'], ['ink', 'GND']],
          isaretler: [
            ['TXD (3)', 'Gönderme ucu. Karşı tarafın RXD ucuna gider.'],
            ['RXD (2)', 'Alma ucu. Karşı tarafın TXD ucundan gelir.'],
            ['GND (5)', 'Ortak referans. Bağlanmazsa haberleşme kararsız olur ya da hiç olmaz.'],
            ['Çapraz kablo', 'İki bilgisayar gibi iki eşit cihaz (DTE–DTE) arasında 2 ve 3 çaprazlanır. Bilgisayar–modem (DTE–DCE) arasında düz kablo kullanılır.']
          ],
          not: 'Hangi ucun TXD olduğunu bulmak için: cihaz açıkken GND’ye göre ölç; boştaki gönderme ucu −5…−12 V gösterir.' }
      ]},
      { id: 'pinler', kisa: 'Pinler', baslik: 'DB9 pinleri', bloklar: [
        { tip: 'tablo', satirlar: [
          ['2 · RXD', 'sig', 'Veri alma.'],
          ['3 · TXD', 'sig', 'Veri gönderme.'],
          ['5 · GND', 'sig', 'Sinyal toprağı.'],
          ['7 · RTS / 8 · CTS', '', 'Donanım akış kontrolü (gönderme isteği / göndermeye izin). Kullanılmıyorsa ayarda kapat.'],
          ['4 · DTR / 6 · DSR', '', 'Cihaz hazır sinyalleri. Çoğu endüstriyel cihaz kullanmaz.'],
          ['1 · DCD / 9 · RI', '', 'Modem sinyalleri. Endüstride nadiren gerekir.']
        ]}
      ]},
      { id: 'hesap', kisa: 'Zamanlama', baslik: 'Hız ve mesaj süresi', bloklar: [
        { tip: 'hesap', tur: 'seri' }
      ]},
      { id: 'karsilastir', kisa: '232 / 485', baslik: 'RS-232, RS-422, RS-485', bloklar: [
        { tip: 'tablo', satirlar: [
          ['RS-232', '', 'Tek uçlu (GND’ye göre ±5…15 V). 1 verici, 1 alıcı. ≈ 15 m. Servis portu, terazi, barkod okuyucu.'],
          ['RS-422', '', 'Diferansiyel. 1 verici, 10’a kadar alıcı. 1.200 m’ye kadar. Enkoder hatları, uzun noktadan noktaya bağlantı.'],
          ['RS-485', '', 'Diferansiyel, çok noktalı: 32 birim yük. 1.200 m’ye kadar. Modbus RTU, Profibus DP.']
        ]},
        { tip: 'not', metin: 'RS-232 ile RS-485 doğrudan birbirine bağlanmaz; araya çevirici gerekir.' }
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Hiç veri gelmiyor', satirlar: [
          ['TXD ve RXD düz bağlı', 'Kontrol: iki tarafın TXD ucunu ölçerek bul; TXD karşı tarafın RXD’sine gitmeli.'],
          ['Ayarlar farklı', 'Kontrol: hız, veri biti, parite ve stop biti iki tarafta aynı olmalı (ör. 9.600 8N1).'],
          ['Akış kontrolü açık', 'Kontrol: RTS/CTS bağlı değilse ayarda akış kontrolünü kapat.'],
          ['GND bağlı değil', 'Kontrol: 5 numaralı pinlerin iki uçta da bağlı olduğunu ölç.']
        ]},
        { tip: 'ariza', belirti: 'Karakterler bozuk geliyor', satirlar: [
          ['Hız ya da parite farkı', 'Kontrol: iki tarafın ayarlarını yeniden karşılaştır.'],
          ['Kablo uzun ya da gürültülü', 'Kontrol: 15 m’yi aşıyorsa ya da güç kablosuyla aynı kanaldaysa RS-485’e çevir.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['RS-232’yi RS-485’e doğrudan bağlamak', 'Gerilim seviyeleri ve yapı farklıdır; haberleşme olmaz, port zarar görebilir. Doğrusu: RS-232/485 çevirici.'],
          ['USB–seri çeviricide yanlış COM numarası', 'Program başka portu dinler. Doğrusu: Aygıt Yöneticisi’nde çeviricinin COM numarasını kontrol et.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Null-modem kablo', 'USB–RS232 çevirici', 'RS232–RS485 çevirici', 'DB9 konnektör'] }
      ]}
    ]
  },
  'modbus-rtu': {
    baslik: 'Modbus RTU',
    giris: 'Modbus RTU, RS-485 hattında bir master ile cihazlar arasında veri taşır. Adres 1–247’dir; tekrarlayıcısız hatta tipik en fazla 32 cihaz olur. Master sorar, adresi tutan cihaz cevap verir; cihazlar kendiliğinden konuşmaz.',
    etiketler: ['RS-485', 'Adres 1–247', 'Fonksiyon kodu'],
    bolumler: [
      { id: 'hat', kisa: 'Hat', baslik: 'RS-485 hattı', bloklar: [
        { tip: 'sema', svg: 'modbusHat',
          lejant: [['dc', 'A'], ['sig', 'B'], ['opt2', '0 V (ortak)']],
          isaretler: [
            ['Master', 'Sorguyu başlatan taraf; genelde PLC ya da HMI. Hatta yalnızca bir master olur.'],
            ['Adres', 'Her cihazın adresi farklı olmalı (1–247). Aynı adresli iki cihaz cevaplarını çakıştırır.'],
            ['Sonlandırma', 'Hattın iki fiziksel ucuna 120 Ω. Ortadaki cihazlarda sonlandırma kapalı olmalı.'],
            ['Sıralı hat', 'Kablo cihazdan cihaza sırayla gider (daisy chain). Yıldız ve uzun dal yansıma yapar.']
          ],
          not: 'Üreticiler A/B etiketini ters kullanabilir. Bağlantı doğru görünüp iletişim yoksa A ile B’yi yer değiştir.' }
      ]},
      { id: 'ayar', kisa: 'Ayarlar', baslik: 'Haberleşme ayarları', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Adres', 'sig', '1–247, her cihazda farklı. 0 yayın adresidir; cevap alınmaz.'],
          ['Hız', 'sig', '9.600 ya da 19.200 baud yaygın. Hattaki herkes aynı hızda olmalı.'],
          ['Parite', 'sig', 'Varsayılan çift (Even). Parite yoksa (None) 2 stop biti önerilir.'],
          ['Veri', 'sig', '8 bit. Ayar farklıysa cihaz sorguyu anlamaz ve susar.']
        ]}
      ]},
      { id: 'kod', kisa: 'Kodlar', baslik: 'Fonksiyon kodları', bloklar: [
        { tip: 'tablo', satirlar: [
          ['01 / 05 / 15', '', 'Coil okuma / tek yazma / çoklu yazma (0x, bit).'],
          ['02', '', 'Discrete input okuma (1x, bit, yalnızca okuma).'],
          ['03 / 06 / 16', '', 'Holding register okuma / tek yazma / çoklu yazma (4x, 16 bit). Sürücü parametreleri çoğunlukla buradadır.'],
          ['04', '', 'Input register okuma (3x, 16 bit, yalnızca okuma).']
        ]},
        { tip: 'hesap', tur: 'modbusAdres' }
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Cihaz cevap vermiyor (zaman aşımı)', satirlar: [
          ['Adres ya da ayar farkı', 'Kontrol: adres, hız, parite ve stop bitini cihazla master arasında karşılaştır.'],
          ['A/B ters', 'Kontrol: A ile B’yi yer değiştirip dene.'],
          ['Sonlandırma', 'Kontrol: enerji kesikken A–B arasını ölç; iki uç sonlandırılmışsa ≈ 60 Ω okunur.'],
          ['Adres çakışması', 'Kontrol: cihazları tek tek ayırıp hangisinin cevap verdiğine bak.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Yıldız bağlantı yapmak', 'Dallar sinyali yansıtır, iletişim ara ara kopar. Doğrusu: cihazdan cihaza sıralı hat.'],
          ['Her cihazda sonlandırmayı açık bırakmak', 'Sinyal zayıflar. Doğrusu: yalnızca iki uçtaki cihazda aç.'],
          ['Sinyal kablosunu güç kablosuyla aynı kanaldan geçirmek', 'Sürücü gürültüsü veri hatası yapar. Doğrusu: ayrı kanal, ekranlı bükümlü çift kablo.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Ekranlı bükümlü çift kablo', '120 Ω sonlandırma', 'USB–RS485 çevirici', 'Haberleşme modülü'] }
      ]}
    ]
  },
  'ethernet-ip': {
    baslik: 'Ethernet kablosu ve IP adresi',
    giris: 'Modbus TCP, PROFINET ve EtherNet/IP aynı kablo ve IP kurallarını kullanır. Aynı ağdaki cihazlar aynı alt ağda olmalı, her birinin IP adresi farklı olmalı.',
    etiketler: ['Alt ağ maskesi', 'RJ45 · M12', '100 m'],
    bolumler: [
      { id: 'ip', kisa: 'IP adresi', baslik: 'IP adresi ve alt ağ', bloklar: [
        { tip: 'sema', svg: 'ipAdres',
          isaretler: [
            ['Ağ kısmı', 'Maskede 255 olan kısım. Aynı ağdaki bütün cihazlarda aynı olmalı.'],
            ['Cihaz kısmı', 'Maskede 0 olan kısım. Her cihazda farklı olmalı; /24’te 1–254 kullanılır.'],
            ['Aynı ağ', 'Ağ kısmı aynı olduğu için PLC ile HMI doğrudan konuşur.'],
            ['Farklı ağ', 'Ağ kısmı farklı; router olmadan PLC bu cihazı göremez.']
          ] }
      ]},
      { id: 'hesap', kisa: 'Kontrol', baslik: 'Aynı ağda mı?', bloklar: [
        { tip: 'hesap', tur: 'altag' }
      ]},
      { id: 'kablo', kisa: 'Kablo', baslik: 'RJ45 renk sırası (T568B)', bloklar: [
        { tip: 'renkler', satirlar: [
          ['1', 'linear-gradient(90deg,#FFFFFF 50%,#E8872B 50%)', 'Beyaz-turuncu'], ['2', '#E8872B', 'Turuncu'], ['3', 'linear-gradient(90deg,#FFFFFF 50%,#3E8E3A 50%)', 'Beyaz-yeşil'],
          ['4', '#2E6FD1', 'Mavi'], ['5', 'linear-gradient(90deg,#FFFFFF 50%,#2E6FD1 50%)', 'Beyaz-mavi'], ['6', '#3E8E3A', 'Yeşil'],
          ['7', 'linear-gradient(90deg,#FFFFFF 50%,#7A4A22 50%)', 'Beyaz-kahve'], ['8', '#7A4A22', 'Kahverengi']
        ]},
        { tip: 'tablo', satirlar: [
          ['100 Mbit/s', 'sig', 'Yalnızca 1-2 ve 3-6 çiftleri kullanılır. Endüstriyel 4 telli kablo bu yüzden yeterlidir.'],
          ['M12 D-kodlu', 'sig', '4 pin, 100 Mbit/s: 1 TD+ sarı, 2 RD+ beyaz, 3 TD− turuncu, 4 RD− mavi (PROFINET renkleri).'],
          ['M12 X-kodlu', '', '8 pin, 1 Gbit/s. Kamera ve yüksek bant genişliği için.'],
          ['Uzunluk', 'dc', 'Bakır Ethernet’te iki aktif cihaz arası en fazla 100 m.']
        ]}
      ]},
      { id: 'protokol', kisa: 'Protokoller', baslik: 'Endüstriyel Ethernet protokolleri', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Modbus TCP', '', 'Basit, üreticiden bağımsız. Hız kritik olmayan veri ve cihazlar.'],
          ['PROFINET', '', 'Siemens ve Avrupa makineleri. Cihaz adıyla çalışır; standart switch kullanılabilir.'],
          ['EtherNet/IP', '', 'Rockwell (Allen-Bradley) ve Amerikan makineleri. CIP nesneleriyle çalışır.'],
          ['EtherCAT', '', 'Beckhoff ve hareket kontrolü. Çok hızlı; switch kullanılmaz, cihazlar sıralı bağlanır.']
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Cihaza ping atılamıyor', satirlar: [
          ['Farklı alt ağ', 'Kontrol: bilgisayarın ve cihazın IP ile maskesini karşılaştır.'],
          ['Kablo ya da port', 'Kontrol: iki uçta link LED’i yanıyor mu bak; kabloyu test cihazıyla dene.'],
          ['IP çakışması', 'Kontrol: cihazı ayırıp aynı IP’ye ping at; cevap geliyorsa başka cihaz aynı IP’yi kullanıyor.'],
          ['Bilgisayarın güvenlik duvarı', 'Kontrol: yazılım bağlanamıyor ama ping gidiyorsa güvenlik duvarı kuralına bak.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['İki switch arasında döngü kurmak', 'Yayın fırtınası ağı kilitler. Doğrusu: halka gerekiyorsa MRP ya da RSTP destekli yönetilebilir switch.'],
          ['Panoda ofis tipi switch kullanmak', 'Sıcaklık, titreşim ve 230 V adaptör sorun çıkarır. Doğrusu: DIN raya takılan 24 V endüstriyel switch.'],
          ['Kabloyu elle sıkılmış RJ45 ile titreşimli yerde kullanmak', 'Temas kopar, bağlantı gelip gider. Doğrusu: endüstriyel RJ45 ya da M12 konnektör.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Endüstriyel switch', 'Cat5e/Cat6 ekranlı kablo', 'M12 D-kodlu konnektör', 'Kablo test cihazı'] }
      ]}
    ]
  },
  'modbus-tcp': {
    baslik: 'Modbus TCP',
    giris: 'Modbus TCP, aynı Modbus mesajlarını Ethernet üzerinden taşır. Cihazlar adres yerine IP ile bulunur; bağlantı 502 numaralı porttan kurulur.',
    etiketler: ['IP adresi', 'Port 502', 'Unit ID'],
    bolumler: [
      { id: 'ag', kisa: 'Ağ', baslik: 'Ağ yapısı', bloklar: [
        { tip: 'sema', svg: 'modbusTcp',
          lejant: [['sig', 'Ethernet'], ['dc', 'RS-485']],
          isaretler: [
            ['Client', 'Sorguyu başlatan taraf (eski adıyla master). Birden fazla client olabilir.'],
            ['Switch', 'Cihazlar yıldız bağlanır. Endüstriyel switch tercih edilir.'],
            ['Server', 'Sorguya cevap veren cihaz. IP adresi sabit verilir, port 502 dinlenir.'],
            ['Ağ geçidi', 'TCP sorgusunu RTU hattına çevirir. Unit ID, RTU hattındaki cihaz adresini seçer.']
          ] }
      ]},
      { id: 'ayar', kisa: 'Ayarlar', baslik: 'Ayarlar', bloklar: [
        { tip: 'tablo', satirlar: [
          ['IP adresi', 'sig', 'Her cihaza farklı, sabit adres. Örnek: 192.168.0.10, .20, .30.'],
          ['Alt ağ maskesi', 'sig', 'Tipik 255.255.255.0: ilk üç sayı tüm cihazlarda aynı olmalı.'],
          ['Port', 'sig', '502. Güvenlik duvarı ya da router bu portu engellememeli.'],
          ['Unit ID', 'sig', 'Doğrudan TCP cihazında genelde 1 ya da 255. Ağ geçidinde RTU cihazının adresi.']
        ]}
      ]},
      { id: 'karsilastir', kisa: 'RTU / TCP', baslik: 'RTU mu, TCP mi?', bloklar: [
        { tip: 'tablo', satirlar: [
          ['RTU', '', 'RS-485, tek master, sıralı hat. Ucuz ve uzun mesafe; hız düşük.'],
          ['TCP', '', 'Ethernet, çok client, yıldız bağlantı. Hızlı; IP planı gerekir.']
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Bağlantı kurulamıyor', satirlar: [
          ['Farklı alt ağ', 'Kontrol: IP ve maskeyi karşılaştır; bilgisayardan ping at.'],
          ['IP çakışması', 'Kontrol: cihazı ayırıp aynı IP’ye ping at; cevap geliyorsa başka cihaz aynı IP’yi kullanıyor.'],
          ['Kablo ya da switch portu', 'Kontrol: portun link LED’i yanıyor mu bak.'],
          ['Bağlantı sınırı dolu', 'Kontrol: cihazın aynı anda kabul ettiği client sayısına bak; eski bağlantılar kapanmamış olabilir.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Aynı IP’yi iki cihaza vermek', 'İletişim ara ara iki cihaz arasında gider gelir. Doğrusu: IP planı çıkar ve etiketle.'],
          ['Ağ geçidinde unit ID’yi yanlış bırakmak', 'Sorgu yanlış RTU cihazına gider ya da cevap gelmez. Doğrusu: unit ID = RTU adresi.'],
          ['Makine ağını ofis ağına doğrudan bağlamak', 'Modbus’ta kimlik doğrulama yoktur; ağdaki herkes yazabilir. Doğrusu: ayrı ağ ya da güvenlik duvarı.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Endüstriyel switch', 'Cat5e/Cat6 ekranlı kablo', 'Modbus TCP–RTU ağ geçidi', 'Dizüstü (ping, test yazılımı)'] }
      ]}
    ]
  },
  'profinet': {
    baslik: 'PROFINET',
    giris: 'PROFINET, Siemens başta olmak üzere birçok üreticinin kullandığı gerçek zamanlı Ethernet protokolüdür. Cihaz önce cihaz adıyla bulunur; IP adresini PLC atar.',
    etiketler: ['Cihaz adı', 'GSDML', 'IO-Controller / IO-Device'],
    bolumler: [
      { id: 'ag', kisa: 'Ağ', baslik: 'Ağ yapısı', bloklar: [
        { tip: 'sema', svg: 'profinetAg',
          lejant: [['sig', 'Ethernet kablosu']],
          isaretler: [
            ['IO-Controller', 'PLC. Cihazları başlatır, IP’lerini atar ve çevrimsel veri alışverişini yönetir.'],
            ['Cihaz adı', 'Her IO-Device’ın benzersiz adı (ör. io-1). PLC cihazı bu adla tanır.'],
            ['Hat topolojisi', 'Çoğu cihazın içinde 2 portlu switch vardır; kablo cihazdan cihaza geçer. Yıldız ya da halka da kurulabilir.'],
            ['GSDML', 'Cihazın tanım dosyası. Mühendislik yazılımına yüklenir; sürümü cihazla uyumlu olmalı.']
          ] }
      ]},
      { id: 'devreye', kisa: 'Devreye alma', baslik: 'Devreye alma sırası', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Cihazın GSDML dosyasını mühendislik yazılımına (ör. TIA Portal) yükle.',
          'Cihazı donanım konfigürasyonuna ekle, cihaz adını ve IP’yi ver.',
          'Online bağlanıp gerçek cihaza aynı adı ata (Assign device name). Cihaz MAC adresinden bulunur.',
          'PLC’yi yükle; PLC ada göre IP’yi kendisi dağıtır.',
          'Tanı ekranında bütün cihazların hatasız olduğunu kontrol et.'
        ]}
      ]},
      { id: 'terimler', kisa: 'Terimler', baslik: 'Terimler', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Güncelleme süresi', 'sig', 'Verinin kaç ms’de bir yenilendiği. Tipik 1–8 ms.'],
          ['Watchdog', 'sig', 'Bu süre boyunca veri gelmezse cihaz hataya geçer ve çıkışlarını güvenli konuma alır.'],
          ['RT / IRT', '', 'RT standart switch’le çalışır. IRT, eş zamanlı hareket kontrolü için özel donanım ister.'],
          ['MRP', '', 'Halka yedeklilik. Bir kablo koparsa ağ, halkanın diğer yönünden çalışmaya devam eder.']
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Cihazın BF (bus fault) LED’i yanıyor', satirlar: [
          ['Cihaz adı yok ya da farklı', 'Kontrol: online erişilebilir cihazlarda adı kontrol et, gerekirse yeniden ata.'],
          ['GSDML ya da donanım sürümü farklı', 'Kontrol: konfigürasyondaki modül ve sürümü cihaz etiketiyle karşılaştır.'],
          ['Kablo ya da port', 'Kontrol: portların link LED’lerini ve topoloji görünümünü kontrol et.']
        ]},
        { tip: 'ariza', belirti: 'Değiştirilen cihaz çalışmıyor', satirlar: [
          ['Yeni cihazın adı yok', 'Kontrol: yeni cihaza eskisinin adını ata. Topoloji ile otomatik ad atama açıksa PLC bunu kendisi yapar.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Aynı adı iki cihaza vermek', 'İki cihaz da hataya düşer. Doğrusu: ad planı çıkar, cihazın üstüne etiketle.'],
          ['Güncelleme süresini gereğinden kısa seçmek', 'Ağ ve PLC yüklenir, watchdog hataları başlar. Doğrusu: ihtiyaca göre seç; çoğu I/O için 4–8 ms yeter.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['PROFINET kablosu (yeşil)', 'M12 D-kodlu konnektör', 'Endüstriyel switch', 'GSDML dosyası'] }
      ]}
    ]
  },
  'ethercat': {
    baslik: 'EtherCAT',
    giris: 'EtherCAT, Ethernet kablosu kullanır ama switch kullanmaz: çerçeve cihazdan cihaza geçer, her cihaz kendi verisini üzerinden okuyup yazar. Çok hızlıdır; servo ve hareket kontrolünde yaygındır.',
    etiketler: ['IN / OUT', 'ESI dosyası', 'Init → Op'],
    bolumler: [
      { id: 'hat', kisa: 'Hat', baslik: 'Hat yapısı', bloklar: [
        { tip: 'sema', svg: 'ethercatHat',
          lejant: [['sig', 'Ethernet kablosu']],
          isaretler: [
            ['Master', 'PLC ya da endüstriyel PC’nin standart Ethernet portu.'],
            ['IN portu', 'Önceki cihazdan (ya da master’dan) gelen kablo buraya takılır.'],
            ['OUT portu', 'Sonraki cihaza giden kablo buradan çıkar.'],
            ['Son cihaz', 'OUT portu boş kalır; çerçeve burada döner. Sonlandırma direnci gerekmez.']
          ],
          not: 'Cihazların sırası kablo sırasıdır. Master tarama yaptığında cihazları bu sırayla bulur.' }
      ]},
      { id: 'durum', kisa: 'Durumlar', baslik: 'Cihaz durumları', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Init', '', 'Başlangıç. Haberleşme kurulmadı.'],
          ['Pre-Op', '', 'Parametre (SDO) yazılabilir; süreç verisi yok.'],
          ['Safe-Op', 'dc', 'Girişler okunur, çıkışlar güvenli durumda. Burada kalıyorsa genelde PDO ya da senkron ayarı hatalıdır.'],
          ['Op', 'sig', 'Tam çalışma: süreç verisi iki yönde akar.']
        ]}
      ]},
      { id: 'devreye', kisa: 'Devreye alma', baslik: 'Devreye alma sırası', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Cihazların ESI (XML) dosyalarını master yazılımına yükle.',
          'Kabloları IN → OUT sırasıyla bağla, master’dan tarama (scan) yap.',
          'Bulunan sıranın fiziksel sırayla aynı olduğunu kontrol et.',
          'PDO eşlemesini ve gerekiyorsa DC (senkron saat) ayarını yap.',
          'Cihazları Op durumuna al; tanı ekranında hata sayaçlarını izle.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Belli bir cihazdan sonrası görünmüyor', satirlar: [
          ['Kablo ya da konnektör', 'Kontrol: sorunlu noktadaki OUT ve sonraki IN portunun L/A LED’i yanıyor mu bak.'],
          ['Cihaz beslemesi', 'Kontrol: aradaki cihazın 24 V beslemesini ölç; kesilirse sonrası da kaybolur.'],
          ['IN/OUT ters', 'Kontrol: kablonun IN portuna geldiğini kontrol et.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Araya standart switch koymak', 'Çerçeve cihaz zincirinden geri dönmez; sonraki cihazlar görünmez, senkron bozulur. Doğrusu: dal gerekiyorsa EtherCAT junction modülü.'],
          ['Eski ESI dosyası kullanmak', 'Cihaz tanınmaz ya da Safe-Op’ta kalır. Doğrusu: cihaz sürümüne uygun ESI.'],
          ['Cihaz sırasını değiştirip taramayı yenilememek', 'Veriler yanlış cihaza gider. Doğrusu: değişiklikten sonra yeniden tara ve eşlemeyi kontrol et.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Cat5e ekranlı kablo', 'EtherCAT junction', 'ESI dosyası', 'EtherCAT master yazılımı'] }
      ]}
    ]
  },
  'canopen': {
    baslik: 'CANopen',
    giris: 'CANopen, CAN hattı üzerinde çalışan bir protokoldür. Sürücü, enkoder ve I/O modülleri iki telli hatta düğüm numarasıyla bağlanır; hız arttıkça hat kısalır.',
    etiketler: ['Düğüm no', '120 Ω / 60 Ω', 'NMT, PDO, SDO'],
    bolumler: [
      { id: 'hat', kisa: 'Hat', baslik: 'CAN hattı', bloklar: [
        { tip: 'sema', svg: 'canHat',
          lejant: [['dc', 'CAN_H'], ['sig', 'CAN_L']],
          isaretler: [
            ['NMT master', 'Ağı yöneten cihaz: düğümleri başlatır, durdurur. Genelde PLC.'],
            ['Düğüm no', 'Her cihazın numarası farklı olmalı (1–127). Anahtarla ya da parametreyle ayarlanır.'],
            ['Sonlandırma', 'Hattın iki ucunda 120 Ω. Birçok cihazda anahtarla açılır.'],
            ['Ölçüm', 'Enerji kesikken CAN_H ile CAN_L arası ≈ 60 Ω olmalı. 120 Ω bir uç eksik, 40 Ω bir direnç fazla demektir.']
          ] }
      ]},
      { id: 'hesap', kisa: 'Hız ve direnç', baslik: 'Hız, uzunluk ve sonlandırma', bloklar: [
        { tip: 'hesap', tur: 'can' }
      ]},
      { id: 'terimler', kisa: 'Terimler', baslik: 'Terimler', bloklar: [
        { tip: 'tablo', satirlar: [
          ['NMT', 'sig', 'Ağ yönetimi. Durumlar: Pre-operational (parametre verilir) → Operational (veri akar) → Stopped.'],
          ['PDO', 'sig', 'Hızlı süreç verisi: hız, konum, durum. Döngüsel ya da olayla gönderilir.'],
          ['SDO', 'sig', 'Parametre okuma-yazma. Yavaştır; devreye almada kullanılır.'],
          ['EDS', 'sig', 'Cihazın tanım dosyası. Master yazılımına yüklenir.'],
          ['Heartbeat', 'sig', 'Cihazın “buradayım” mesajı. Kesilirse master arızayı fark eder.']
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Düğüm görünmüyor ya da Pre-operational’da kalıyor', satirlar: [
          ['Hız ya da düğüm no farkı', 'Kontrol: cihazdaki hız ve numarayı master ayarıyla karşılaştır.'],
          ['Sonlandırma', 'Kontrol: enerji kesikken H–L arasında 60 Ω ölç.'],
          ['H/L ters ya da GND yok', 'Kontrol: kablo renklerini ve CAN_GND bağlantısını kontrol et.'],
          ['Master başlatmıyor', 'Kontrol: NMT “start” komutunun gönderildiğini ve EDS’nin doğru olduğunu kontrol et.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Aynı düğüm numarasını iki cihaza vermek', 'Mesajlar çakışır, hata sayacı artar. Doğrusu: numara planı çıkar.'],
          ['Sonlandırmayı unutmak ya da her cihazda açmak', 'Düşük hızda çalışıp yüksek hızda kopar. Doğrusu: 60 Ω ölçümüyle doğrula.'],
          ['Uzun dal (stub) bırakmak', 'Yansıma yapar. Doğrusu: hat cihazdan cihaza gitsin; dal kısa olsun.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['CAN kablosu (120 Ω, ekranlı)', 'M12 ya da D-Sub konnektör', '120 Ω sonlandırma', 'USB–CAN adaptörü'] }
      ]}
    ]
  },
  'io-link': {
    baslik: 'IO-Link',
    giris: 'IO-Link, sensör ve aktüatörü standart 3 telli kabloyla master’a bağlar. Aynı kablo cihazı besler ve ölçüm değeri, parametre ile tanı bilgisini dijital taşır. Noktadan noktaya çalışır; ağ değildir.',
    etiketler: ['Master · port', 'IODD', 'M12, 20 m'],
    bolumler: [
      { id: 'yapi', kisa: 'Yapı', baslik: 'Bağlantı', bloklar: [
        { tip: 'sema', svg: 'ioLink',
          lejant: [['l', 'L+ (kahverengi)'], ['l2', 'C/Q (siyah)'], ['n', 'L− (mavi)']],
          isaretler: [
            ['IO-Link master', 'Porttaki cihazlarla konuşur, veriyi PLC’ye PROFINET ya da EtherCAT gibi bir ağla aktarır.'],
            ['Port', 'Her porta bir cihaz bağlanır. Port, IO-Link ya da normal dijital giriş/çıkış (SIO) olarak ayarlanır.'],
            ['Kablo', 'Ekransız standart 3 telli kablo; en fazla 20 m.'],
            ['Akıllı sensör', 'Tanım dosyası IODD’dir. Ölçüm değerini, kirlenme ve sıcaklık gibi tanı bilgilerini gönderir.']
          ] }
      ]},
      { id: 'pinler', kisa: 'Pinler', baslik: 'M12 port pinleri', bloklar: [
        { tip: 'tablo', satirlar: [
          ['1 · L+', 'dc', '24 V besleme (kahverengi).'],
          ['2', '', 'Class A: ek dijital giriş/çıkış. Class B: aktüatör için ayrı 24 V (beyaz).'],
          ['3 · L−', '', '0 V (mavi).'],
          ['4 · C/Q', 'sig', 'IO-Link haberleşmesi ya da normal anahtarlama sinyali (siyah).'],
          ['5', '', 'Class B: ayrı beslemenin 0 V’u (gri).']
        ]}
      ]},
      { id: 'neden', kisa: 'Neden', baslik: 'Ne kazandırır', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'reset', baslik: 'Cihaz değişimi', etiket: 'Data storage', metin: 'Parametreleri master saklar; aynı tip yeni cihaz takılınca ayarlar otomatik yüklenir.' },
          { ikon: 'uyari', baslik: 'Tanı', etiket: 'Önleyici bakım', metin: 'Sensör kirlendiğini, ısındığını ya da sinyalin zayıfladığını arıza olmadan bildirir.' }
        ]},
        { tip: 'not', metin: 'Analog kart ve ekranlı kablo gerekmez; ölçüm değeri dijital gelir, gürültüden etkilenmez.' }
      ]},
      { id: 'devreye', kisa: 'Devreye alma', baslik: 'Devreye alma', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Master’ın tanım dosyasını (GSDML ya da ESI) PLC projesine ekle.',
          'Portu IO-Link moduna al; cihazın IODD dosyasını master yazılımına yükle.',
          'Cihaz kimliği doğrulamasını (validation) ve data storage’ı aç.',
          'Proses verisini PLC’deki değişkenlerle eşle, ölçüm birimini ve ölçeğini kontrol et.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Port IO-Link’e geçmiyor, cihaz bulunamıyor', satirlar: [
          ['Port modu yanlış', 'Kontrol: port dijital giriş (SIO) moduna ayarlıysa IO-Link’e al.'],
          ['Kablo', 'Kontrol: 4. pin bağlı mı, kablo 20 m’den uzun mu bak.'],
          ['Cihaz kimliği uyuşmuyor', 'Kontrol: doğrulama açıksa takılan cihaz, konfigürasyondakiyle aynı tip olmalı.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Class A porta ayrı besleme isteyen aktüatör takmak', 'Aktüatör çalışmaz ya da port aşırı yüklenir. Doğrusu: Class B port.'],
          ['Data storage kapalıyken cihaz değiştirmek', 'Yeni cihaz fabrika ayarlarıyla çalışır. Doğrusu: data storage’ı açık tut.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['IO-Link master', 'M12 sensör kablosu', 'IO-Link sensör', 'IODD dosyası'] }
      ]}
    ]
  },
});
