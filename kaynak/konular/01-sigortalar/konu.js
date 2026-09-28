/* Sigortalar: konu tanımı ve bilgi sayfaları. */
VERI.konular.push({
  id: 'sigortalar', ad: 'Sigortalar', ikon: 'sigorta',
  ozet: 'MCB, buşon, NH, kaçak akım',
  giris: 'Hat sigortası cihazı değil, kabloyu korur; cam ve aR sigortalar cihazı korur. Doğru seçim kablo kesitine ve yükün kalkış akımına bağlıdır.',
  filtreler: [ { id: 'asiri', ad: 'Aşırı akım' }, { id: 'kacak', ad: 'Kaçak akım' }, { id: 'elektronik', ad: 'Elektronik' } ],
  altlar: [
    { id: 'mcb-ic-yapi', kod: '3B', ad: 'Otomatik sigorta: iç yapı (3B)', alt: 'Bimetal, bobin, kontaklar, ark hücresi · aşırı yük ve kısa devre', filtre: 'asiri', sayfa: 'mcb-ic-yapi' },
    { id: 'otomatik-sigorta', kod: 'MCB', ad: 'Otomatik sigorta', alt: 'B, C, D eğrileri · termik ve manyetik açma', filtre: 'asiri', sayfa: 'otomatik-sigorta' },
    { id: 'busonlu-sigorta', kod: 'D', ad: 'Buşonlu sigorta', alt: 'Erimeli telli, vidalı gövde · eski tesisatlar', filtre: 'asiri', sayfa: 'busonlu-sigorta' },
    { id: 'nh-sigorta', kod: 'NH', ad: 'NH bıçaklı sigorta', alt: 'Yüksek akımlı ana dağıtım · gG ve aM', filtre: 'asiri', sayfa: 'nh-sigorta' },
    { id: 'motor-koruma-salteri', kod: 'MPCB', ad: 'Motor koruma şalteri', alt: 'Ayarlı termik ve manyetik koruma · motor devreleri', filtre: 'asiri', sayfa: 'motor-koruma-salteri' },
    { id: 'kompakt-salter', kod: 'MCCB', ad: 'Kompakt şalter', alt: 'Ir, Isd, Ii ayarları · Icu ve selektivite', filtre: 'asiri', sayfa: 'kompakt-salter' },
    { id: 'rcd-ic-yapi', kod: '3B', ad: 'Kaçak akım rölesi: iç yapı (3B)', alt: 'Toroid, açma rölesi, test butonu · kaçakta açma', filtre: 'kacak', sayfa: 'rcd-ic-yapi' },
    { id: 'kacak-akim-rolesi', kod: 'RCD', ad: 'Kaçak akım rölesi', alt: '30 mA hayat koruması · 300 mA yangın koruması', filtre: 'kacak', sayfa: 'kacak-akim-rolesi' },
    { id: 'cam-sigorta', kod: '5×20', ad: 'Cam sigorta', alt: 'Elektronik kartlar · hızlı (F) ve gecikmeli (T)', filtre: 'elektronik', sayfa: 'cam-sigorta' },
    { id: 'yari-iletken-sigorta', kod: 'aR', ad: 'Yarı iletken sigorta', alt: 'Sürücü ve doğrultucu koruması · çok hızlı', filtre: 'elektronik', sayfa: 'yari-iletken-sigorta' }
  ]
});

Object.assign(VERI.sayfalar, {
  'mcb-ic-yapi': {
    baslik: 'Otomatik sigortanın iç yapısı',
    giris: 'Otomatik sigortada iki açma mekanizması vardır: aşırı yükte yavaş açan bimetal ve kısa devrede anında açan manyetik bobin. Kontaklar açılınca oluşan ark, ark söndürme hücresinde söner.',
    etiketler: ['3B model', 'TS EN 60898-1', 'Bimetal', 'Ark söndürme'],
    bolumler: [
      { id: 'model', kisa: '3B model', baslik: 'Parçalar', bloklar: [
        { tip: 'model', tur: 'otomatik-sigorta' }
      ]},
      { id: 'akim-yolu', kisa: 'Akım yolu', baslik: 'Akımın yolu', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Giriş klemensi (1)',
          'Manyetik bobin: kısa devre akımı pimi fırlatır.',
          'Sabit kontak → hareketli kontak',
          'Örgülü esnek iletken',
          'Bimetal: aşırı yük akımı onu ısıtıp eğer.',
          'Çıkış klemensi (2)'
        ]},
        { tip: 'not', metin: 'Sıra tipiktir; bazı sigortalarda bimetal girişe daha yakındır. İki mekanizma da aynı mandalı açar; mandal açılınca yaylı mekanizma kontağı hızla ayırır.' }
      ]},
      { id: 'acma', kisa: 'Açma', baslik: 'Hangi mekanizma ne zaman açar', bloklar: [
        { tip: 'tablo', satirlar: [
          ['1,13 × In', '', 'Anlaşılmış açmama akımı: bu akımda 1 saat içinde (In ≤ 63 A) açmamalı.'],
          ['1,45 × In', '', 'Anlaşılmış açma akımı: bu akımda 1 saat içinde açmalı. Bimetal açar.'],
          ['3–5 × In', '', 'B eğrisinde bobin anlık açar.'],
          ['5–10 × In', '', 'C eğrisinde bobin anlık açar.'],
          ['10–20 × In', '', 'D eğrisinde bobin anlık açar.']
        ]},
        { tip: 'not', metin: 'Değerler TS EN 60898-1’e göredir. Anlık açma aralığının alt sınırında açmaz, üst sınırında mutlaka açar.' }
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Atan sigortayı soğumasını beklemeden tekrar tekrar kurmaya çalışmak', 'Bimetal soğumadan mandal tutmaz; zorlamak mekanizmayı yıpratır. Doğrusu: birkaç dakika bekle, önce aşırı yükün nedenini bul.'],
          ['Kolu bantla ya da kilitle yukarıda tutarak atmasını engellemeye çalışmak', 'Sigorta serbest açmalıdır, yine atar; ama aşırı yükün nedeni ortada kalır. Doğrusu: yükü azalt ya da hattı böl.'],
          ['Kısa devreden sonra aynı sigortayı hiç kontrol etmeden kullanmak', 'Büyük kısa devre kontakları ve ark hücresini yıpratır. Doğrusu: klemenslerde ısınma izi, gövdede kararma varsa sigortayı değiştir.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['DIN ray (TS35)', 'Tarak bara', 'Kaçak akım rölesi'] }
      ]}
    ]
  },
  'otomatik-sigorta': {
    baslik: 'Otomatik sigorta (MCB)',
    giris: 'Hattı aşırı yüke ve kısa devreye karşı korur. Attığında değiştirilmez; nedeni giderilip kolu kaldırılarak yeniden kurulur.',
    etiketler: ['TS EN 60898-1', 'Alçak gerilim', 'DIN ray'],
    bolumler: [
      { id: 'sema', kisa: 'Şema', baslik: 'Bağlantı şeması', bloklar: [
        { tip: 'sema', svg: 'mcb',
          lejant: [['l', 'L · kahverengi (faz)'], ['n', 'N · mavi (nötr)'], ['pe', 'PE · sarı-yeşil (toprak)']],
          isaretler: [
            ['Giriş klemensi (1)', 'Faz buraya gelir. Genel uygulama: besleme üstten, yük alttan.'],
            ['Çıkış klemensi (2)', 'Korunan hat buradan yüke gider.'],
            ['Kol', 'Sigorta atınca aşağı düşer. Nedeni bulmadan tekrar kaldırma.'],
            ['DIN ray', '35 mm ray (TS35). Sigorta arkasındaki klipsle raya takılır.']
          ],
          not: 'Şema 1 kutuplu (1P) sigorta içindir; nötr kesilmez. 1P+N ve 2P modellerde faz ve nötr birlikte kesilir.' }
      ]},
      { id: 'mekanizma', kisa: 'Mekanizma', baslik: 'İçerideki iki mekanizma', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'termik', baslik: 'Termik (bimetal)', etiket: 'Aşırı yük', metin: 'Bimetal ısınıp eğilir ve mandalı açar. Yavaştır; akım büyüdükçe daha çabuk açar.' },
          { ikon: 'manyetik', baslik: 'Manyetik (bobin)', etiket: 'Kısa devre', metin: 'Büyük akım bobinde güçlü alan oluşturur, pim mandalı anında açar. Milisaniyeler içinde keser.' }
        ]}
      ]},
      { id: 'egriler', kisa: 'Eğriler', baslik: 'Açma eğrileri: B, C, D', bloklar: [
        { tip: 'aralik', baslik: 'Anlık (manyetik) açma aralığı (× In)', eksen: 'Anma akımının katı (× In)', max: 20, adim: 5,
          satirlar: [
            { ad: 'B', bas: 3, son: 5, metin: 'Uzun kablolu hatlar, rezistif yükler (ısıtıcı, akkor aydınlatma)' },
            { ad: 'C', bas: 5, son: 10, metin: 'Genel kullanım: priz, aydınlatma, küçük motorlar' },
            { ad: 'D', bas: 10, son: 20, metin: 'Kalkış akımı yüksek yükler: trafo, büyük motor, kompresör' }
          ],
          not: 'Alt sınırın altında anlık açmaz, üst sınırın üstünde mutlaka anlık açar. Aradaki bölgede açabilir.' }
      ]},
      { id: 'secim', kisa: 'Seçim', baslik: 'Seçim', bloklar: [
        { tip: 'formul', formul: 'Ib ≤ In ≤ Iz',
          tanimlar: [['Ib', 'Hattın çektiği akım (hesap değeri)'], ['In', 'Sigortanın anma akımı'], ['Iz', 'Kablonun akım taşıma kapasitesi (döşeme şekline göre tablodan)']],
          ornek: { baslik: 'Örnek · 2.500 W ısıtıcı, 230 V', satirlar: [
            ['Ib', '= 2.500 W ÷ 230 V ≈ 10,9 A'],
            ['In', '= 16 A (B16 veya C16). 10 A yetmez, çünkü 10,9 A > 10 A.'],
            ['Iz', '≥ 16 A olmalı → tipik olarak 2,5 mm² bakır. Döşeme şeklini tablodan doğrula.']
          ]},
          kural: 'Kural: Sigorta, kablonun taşıyabileceğinden büyük olamaz.' }
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Sigorta sık sık atıyor', satirlar: [
          ['Kurar kurmaz atıyor', 'Olası neden: kısa devre veya toprak teması. Kontrol: yükleri ayır, izolasyon direncini ölç.'],
          ['Belli bir cihaz çalışınca atıyor', 'Olası neden: kalkış akımı eğriyi aşıyor. Kontrol: eğri tipi (B → C) ve cihazın kendisi.'],
          ['Bir süre çalışıp atıyor', 'Olası neden: aşırı yük, termik açma. Kontrol: hattaki toplam gücü hesapla.'],
          ['Klemens çevresi ısınmış', 'Olası neden: gevşek bağlantı; ısı termik mekanizmayı erken açtırır. Kontrol: enerjiyi kes, klemensi sık, hasarlıysa değiştir.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Kompresör hattına B eğrili sigorta takmak', 'Motor kalkışta anma akımının 5–8 katını çeker; bu B eğrisinin anlık açma bölgesine girebilir. Doğrusu: C veya D eğrisi; motor devresinde motor koruma şalteri.'],
          ['Atan sigortayı büyütmek', 'In ≤ Iz kuralı bozulabilir; kablo aşırı yükte ısınır, yalıtımı yaşlanır. Doğrusu: önce atma nedenini bul.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['DIN ray (TS35)', 'Tarak bara', 'Kaçak akım rölesi', 'Yardımcı kontak', 'Kablo yüksüğü', 'Ray klemensi'] }
      ]}
    ]
  },
  'busonlu-sigorta': {
    baslik: 'Buşonlu sigorta (DIAZED)',
    giris: 'Vidalı kapak içine takılan, erime telli sigorta. Attığında buşon değiştirilir. Eski konut ve atölye panolarında hâlâ yaygındır.',
    etiketler: ['DIAZED', 'gG', '500 V AC'],
    bolumler: [
      { id: 'yapi', kisa: 'Yapı', baslik: 'Yapısı ve bağlantısı', bloklar: [
        { tip: 'sema', svg: 'buson',
          lejant: [['l', 'Faz (L)']],
          isaretler: [
            ['Kapak (başlık)', 'Buşonu tabana bastırır. Camından buşonun göstergesi görünür.'],
            ['Buşon', 'Kum dolu seramik gövde ve erime teli. Tel eriyince üstteki renkli gösterge düşer.'],
            ['Ayar vidası', 'Çapı anma akımına göre değişir; daha büyük buşonun takılmasını engeller. Rengi buşonun göstergesiyle aynıdır.'],
            ['Taban (gövde)', 'Besleme orta kontağa, yük dişli kısma bağlanır. Böylece buşon çıkınca dişli kısım gerilimsiz kalır.']
          ],
          not: 'Daha küçük ve yeni nesli D0 (NEOZED) olarak bilinir; çalışma mantığı aynıdır.' }
      ]},
      { id: 'akim', kisa: 'Renk kodu', baslik: 'Anma akımı ve renk kodu', bloklar: [
        { tip: 'renkler', satirlar: [
          ['2 A', '#E89AB0', 'Pembe'], ['4 A', '#7A4A22', 'Kahverengi'], ['6 A', '#3E8E3A', 'Yeşil'],
          ['10 A', '#C0392B', 'Kırmızı'], ['16 A', '#9AA0A6', 'Gri'], ['20 A', '#2E6FD1', 'Mavi'],
          ['25 A', '#E8C21A', 'Sarı'], ['35 A', '#16181B', 'Siyah'], ['50 A', '#FFFFFF', 'Beyaz'],
          ['63 A', '#B87333', 'Bakır'], ['80 A', '#C7CCD1', 'Gümüş'], ['100 A', '#C0392B', 'Kırmızı']
        ]},
        { tip: 'tablo', satirlar: [
          ['DII · E27', '', '2–25 A. En yaygın boyut; konut ve priz hatları.'],
          ['DIII · E33', '', '35–63 A. Ana girişler, büyük hatlar.'],
          ['DIV · R1¼"', '', '80–100 A. Daha seyrek kullanılır.']
        ]},
        { tip: 'not', metin: 'Renk, buşonun göstergesinde ve ayar vidasında aynıdır. Göstergeye bakarak takılı buşonun değerini sökmeden okursun.' }
      ]},
      { id: 'degistirme', kisa: 'Değiştirme', baslik: 'Buşon değiştirme', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Mümkünse hattı üstteki şalterden ayır, yükleri kapat.',
          'Kapağı saat yönünün tersine çevirerek çıkar, buşonu kapaktan al.',
          'Göstergesi düşmüşse buşon atmıştır. Yenisi aynı akımda (aynı renk) olmalı.',
          'Buşonu kapağa yerleştir, kapağı sonuna kadar sık.',
          'Buşon tekrar atarsa değiştirmeye devam etme; önce nedeni bul.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Yeni buşon taktım ama hat enerjisiz', satirlar: [
          ['Kapak tam sıkılmamış', 'Kontrol: kapağı sonuna kadar çevir.'],
          ['Ayar vidası gevşek ya da oksitli', 'Kontrol: enerjiyi kes, ayar vidasını sık, oksidi temizle.'],
          ['Buşon arızalı ya da yanlış boyut', 'Kontrol: göstergeye bak, ölçü aletiyle buşonun sürekliliğini ölç.'],
          ['Hat başka bir yerden kesik', 'Kontrol: buşon çıkışında gerilimi ölç; varsa arıza hattın devamındadır.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Buşonu tel sararak yamamak', 'Koruma tamamen kalkar; kısa devrede kablo yanar, yangın çıkabilir. Doğrusu: aynı değerde yeni buşon.'],
          ['Ayar vidasını söküp büyük buşon takmak', 'Kablo, taşıyabileceğinden büyük akımda korunmaz. Doğrusu: ayar vidası hattın kesitine göre kalır.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Buşon kapağı', 'Ayar vidası', 'Buşon tabanı', 'D0 (NEOZED)', 'Kaçak akım rölesi'] }
      ]}
    ]
  },
  'nh-sigorta': {
    baslik: 'NH bıçaklı sigorta',
    giris: 'Yüksek akımlı ana dağıtımda ve motor çıkışlarında kullanılan, bıçak kontaklı sigorta. Kesme kapasitesi yüksektir; takıp çıkarmak için NH pensesi gerekir.',
    etiketler: ['IEC 60269-2', 'gG / aM', '400–690 V AC'],
    bolumler: [
      { id: 'yapi', kisa: 'Yapı', baslik: 'Yapısı', bloklar: [
        { tip: 'sema', svg: 'nh',
          isaretler: [
            ['Bıçak kontak', 'Tabandaki yaylı klipslere oturur. Temas yüzeyi temiz ve sıkı olmalı.'],
            ['Tutma kulakları', 'NH pensesi buradan kavrar. Sigorta elle tutulmaz.'],
            ['Gösterge', 'Sigorta atınca dışarı çıkar ya da renk değiştirir.'],
            ['Taban klipsi', 'Bıçağı sıkar. Gevşek klips ısınır ve bıçağı karartır.']
          ],
          not: 'Gövdedeki yazı: boyut (ör. NH00), karakteristik (gG ya da aM), anma akımı ve gerilim.' }
      ]},
      { id: 'boyutlar', kisa: 'Boyutlar', baslik: 'Boyutlar', bloklar: [
        { tip: 'tablo', satirlar: [
          ['NH000', '', 'gG en fazla 100 A. Küçük dağıtım ve motor çıkışları.'],
          ['NH00', '', 'gG en fazla 160 A.'],
          ['NH1', '', 'gG en fazla 250 A; bazı üreticilerde daha yüksek.'],
          ['NH2', '', 'gG en fazla 400 A; bazı üreticilerde daha yüksek.'],
          ['NH3', '', 'gG en fazla 630 A.'],
          ['NH4a', '', 'gG en fazla 1250 A. Trafo çıkışları.']
        ]},
        { tip: 'not', metin: 'Üst sınırlar üreticiye göre değişir; taban ve sigorta aynı boyutta olmalı.' }
      ]},
      { id: 'karakteristik', kisa: 'gG / aM', baslik: 'gG ve aM farkı', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'kablo', baslik: 'gG', etiket: 'Tam aralık', metin: 'Aşırı yükte de kısa devrede de açar. Kablo ve genel dağıtım koruması.' },
          { ikon: 'motor', baslik: 'aM', etiket: 'Kısmi aralık', metin: 'Yalnızca kısa devrede açar, motor kalkışına dayanır. Aşırı yük için termik röle gerekir.' }
        ]}
      ]},
      { id: 'degistirme', kisa: 'Değiştirme', baslik: 'Güvenli değiştirme', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Yükü kaldır: çıkıştaki şalteri ya da motoru kapat. NH sigorta yük altında çekilmez; ark oluşur.',
          'Mümkünse üst taraftan enerjiyi kes. Kesilemiyorsa işi yalnızca yetkili kişi, ark korumalı KKD ve kollu NH pensesiyle yapar.',
          'Yüz siperliği ve yalıtkan eldiven kullan.',
          'NH pensesini tutma kulaklarına tam oturt, sigortayı düz çek.',
          'Aynı boyut, karakteristik ve akımda sigorta tak. Klipslerin sıkı oturduğunu kontrol et.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Motor uğultulu dönüyor, zorlanıyor (bir faz yok)', satirlar: [
          ['Bir NH sigorta atmış', 'Kontrol: göstergelere bak; sigorta çıkışlarında fazlar arası gerilimi ölç.'],
          ['Klips gevşek, bıçak kararmış', 'Kontrol: enerjiyi kes, klipsi ve kararmış sigortayı değiştir.'],
          ['Kalkışta hep aynı sigorta atıyor', 'Kontrol: motor çıkışında düşük değerli gG olabilir; aM ya da uygun değerli gG seç.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Pensesiz, elle ya da kargaburunla çekmek', 'Bıçaklar gerilim altında olabilir; ark yüzü ve eli yakar. Doğrusu: NH pensesi ve kişisel koruyucu donanım.'],
          ['Üç fazdan yalnız atanı değiştirmek', 'Diğer ikisi aynı arıza akımını görüp yıpranmış olabilir. Doğrusu: motor çıkışlarında üçünü birlikte değiştir.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['NH pensesi', 'NH sigorta tabanı', 'Sigortalı yük ayırıcı', 'Termik röle', 'Bara'] }
      ]}
    ]
  },
  'motor-koruma-salteri': {
    baslik: 'Motor koruma şalteri (MPCB)',
    giris: 'Motoru aşırı yüke, kısa devreye ve çoğu modelde faz kaybına karşı korur. Akımı motorun etiket değerine ayarlanır; elle açıp kapatılabilir.',
    etiketler: ['IEC 60947-4-1', 'Sınıf 10', '3 kutuplu'],
    bolumler: [
      { id: 'sema', kisa: 'Şema', baslik: 'Bağlantı şeması', bloklar: [
        { tip: 'sema', svg: 'mpcb',
          lejant: [['l', 'L1 · kahverengi'], ['l2', 'L2 · siyah'], ['l3', 'L3 · gri'], ['pe', 'PE · sarı-yeşil']],
          isaretler: [
            ['Giriş klemensleri (1-3-5)', 'Şebekeden gelen üç faz.'],
            ['Akım ayar düğmesi', 'Motor etiketindeki anma akımına ayarlanır. Termik koruma bu değere göre çalışır.'],
            ['Çıkış klemensleri (2-4-6)', 'Kontaktöre ya da doğrudan motora gider.'],
            ['Yardımcı kontak', 'Şalterin açık/kapalı konumunu PLC’ye bildirir. Atmayı ayrıca bildirmek için arıza sinyal kontağı takılır.']
          ],
          not: 'Uzaktan çalıştırma gerekiyorsa şalterin çıkışına kontaktör eklenir; şalter koruma, kontaktör anahtarlama yapar.' }
      ]},
      { id: 'koruma', kisa: 'Koruma', baslik: 'Koruma türleri', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'termik', baslik: 'Termik', etiket: 'Aşırı yük', metin: 'Ayar akımının üstünde, akım büyüdükçe daha çabuk açar. Sınıf 10: 7,2 × ayar akımında en geç 10 saniyede açar.' },
          { ikon: 'manyetik', baslik: 'Manyetik', etiket: 'Kısa devre', metin: 'Kısa devrede anında açar. Açma değeri sabittir; çoğu modelde aralık üst sınırının yaklaşık 13 katı.' }
        ]},
        { tip: 'not', metin: 'Çoğu model faz kaybını da algılar: bir faz kesilince diğer iki fazın akımı artar ve şalter açar.' }
      ]},
      { id: 'ayar', kisa: 'Ayar', baslik: 'Akım ayarı', bloklar: [
        { tip: 'formul', formul: 'Ayar = motor etiket akımı',
          tanimlar: [['Etiket', 'Motorun bağlandığı gerilime karşılık gelen akım (ör. 400 V satırı).'], ['Aralık', 'Ayar değeri şalterin ayar aralığının içinde, tercihen ortasında olmalı.']],
          ornek: { baslik: 'Örnek · 2,2 kW motor, 400 V', satirlar: [
            ['Etiket', '400 V için 4,8 A (örnek değer; motor etiketinden oku)'],
            ['Şalter', '4–6,3 A aralıklı model'],
            ['Ayar', '4,8 A']
          ]},
          kural: 'Ayarı motor akımının üstüne çıkarmak, motoru aşırı yükte korumasız bırakır.' }
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Motor koruma şalteri sık atıyor', satirlar: [
          ['Çalıştırır çalıştırmaz atıyor', 'Olası neden: kısa devre ya da sıkışmış rotor. Kontrol: sargıları ve yalıtımı ölç, mili elle çevir.'],
          ['Bir süre çalışıp atıyor', 'Olası neden: aşırı yük ya da düşük ayar. Kontrol: pens ampermetreyle faz akımlarını ölç, ayarı etiketle karşılaştır.'],
          ['Faz akımlarından biri sıfır', 'Olası neden: faz kaybı. Kontrol: giriş gerilimlerini, sigortaları ve kontaktör kontaklarını ölç.'],
          ['Sıcak günlerde ya da kapalı panoda atıyor', 'Olası neden: ortam sıcaklığı. Kontrol: pano havalandırmasını ve şalterlerin arasındaki boşluğu kontrol et.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Atmasın diye ayarı en üste çevirmek', 'Motor aşırı yükte korunmaz, sargı yanar. Doğrusu: ayar etiket akımında kalır, nedeni bulunur.'],
          ['Tek fazlı motoru tek kutuptan geçirmek', 'Diğer kutuplar akımsız kaldığı için şalter faz kaybı sanıp atabilir. Doğrusu: üreticinin şemasındaki gibi üç kutbu seri bağla.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Kontaktör', 'Yardımcı kontak', 'Termik röle', 'Pens ampermetre', 'Bara adaptörü'] }
      ]}
    ]
  },
  'kompakt-salter': {
    baslik: 'Kompakt şalter (MCCB)',
    giris: 'Kompakt şalter, 16 A’den 1.600 A’e kadar ana ve tali dağıtımlarda kullanılan, ayarlanabilir korumalı güç şalteridir. Aşırı yük ve kısa devre değerleri sahada ayarlanır; elektronik açma üniteli modellerde ayar aralığı geniştir.',
    etiketler: ['Ir · Isd · Ii', 'Icu · Ics', 'Selektivite'],
    bolumler: [
      { id: 'egri', kisa: 'Eğri', baslik: 'Açma eğrisi', bloklar: [
        { tip: 'sema', svg: 'mccbEgri',
          isaretler: [
            ['Ir · uzun gecikme', 'Aşırı yük koruması. Hat akımına ve kablonun Iz değerine göre ayarlanır.'],
            ['Isd · kısa gecikme', 'Bu akımın üstünde şalter tsd kadar bekleyip açar; alttaki şalterin önce açmasına zaman tanır.'],
            ['tsd', 'Kısa gecikme süresi (ör. 0,1–0,4 s). Üst şalterde bir kademe uzun seçilir.'],
            ['Ii · ani', 'Büyük kısa devrede beklemeden açar.']
          ],
          not: 'Eğri temsilidir; gerçek eğri ve toleranslar üretici kataloğunda verilir.' }
      ]},
      { id: 'hesap', kisa: 'Ayar', baslik: 'Ayar hesabı', bloklar: [
        { tip: 'hesap', tur: 'mccb' }
      ]},
      { id: 'kapasite', kisa: 'Kapasite', baslik: 'Etiket değerleri', bloklar: [
        { tip: 'tablo', satirlar: [
          ['In', '', 'Şalterin anma akımı (çerçeve boyutu).'],
          ['Icu', 'dc', 'Nihai kesme kapasitesi. Bulunduğu noktadaki en büyük kısa devre akımından (Ik) büyük olmalı.'],
          ['Ics', '', 'Servis kesme kapasitesi (Icu’nun yüzdesi). Bu akımı kestikten sonra şalter kullanılmaya devam eder.'],
          ['Termik-manyetik', '', 'Ayarlar sınırlıdır; çoğunda yalnızca Ir ve Ii ayarlanır.'],
          ['Elektronik', 'sig', 'Ir, tr, Isd, tsd ve Ii ayrı ayrı ayarlanır; bazılarında toprak koruması da vardır.']
        ]}
      ]},
      { id: 'sira', kisa: 'Sıra', baslik: 'Ayar sırası', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Ir’yi hattın akımına göre ayarla; kablonun Iz değerini geçmesin.',
          'Isd’yi yükün kalkış akımının ve alttaki şalterin ani açma değerinin üstünde seç.',
          'tsd’yi alttaki şalterden bir kademe uzun seç.',
          'Hat sonundaki kısa devre akımının Isd’yi aştığını hesapla.',
          'Ayarları şalterin üstüne etiketle ve belgele.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Şalter motor kalkışında atıyor', satirlar: [
          ['Isd ya da Ii düşük', 'Kontrol: kalkış akımını pens ampermetreyle ölç, ayarla karşılaştır.'],
          ['Ir düşük', 'Kontrol: çalışma akımını ölç; Ir’nin altında kalmalı.']
        ]},
        { tip: 'ariza', belirti: 'Şalter kurulmuyor', satirlar: [
          ['Düşük gerilim bobini enerjisiz', 'Kontrol: şalterde düşük gerilim bobini (UVR) varsa beslemesini ölç.'],
          ['Açma nedeni sürüyor', 'Kontrol: elektronik ünitenin arıza göstergesini oku, nedeni gider.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Ir’yi In’de bırakıp daha ince kablo bağlamak', 'Kablo aşırı yükte korunmaz. Doğrusu: Ir ≤ Iz.'],
          ['Kesme kapasitesine bakmadan seçmek', 'Kısa devrede şalter akımı kesemez, hasar görür. Doğrusu: Icu ≥ Ik.'],
          ['Üst ve alt şalterde aynı ayarları kullanmak', 'Kısa devrede ikisi birden açar, bütün pano kararır. Doğrusu: selektivite tablosuna göre ayarla.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Yardımcı kontak', 'Arıza sinyal kontağı', 'Motor mekanizması', 'Düşük gerilim bobini (UVR)', 'Bara'] }
      ]}
    ]
  },
  'rcd-ic-yapi': {
    baslik: 'Kaçak akım rölesinin iç yapısı',
    giris: 'Kaçak akım rölesinde faz ve nötr aynı toroidin içinden geçer. Akımlar eşitken toroidde alan oluşmaz. Bir kısım akım toprağa kaçınca fark, sekonder sargıda gerilim doğurur ve açma rölesi kontakları açar.',
    etiketler: ['3B model', 'TS EN 61008-1', 'Toroid', 'Test butonu'],
    bolumler: [
      { id: 'model', kisa: '3B model', baslik: 'Parçalar', bloklar: [
        { tip: 'model', tur: 'kacak-akim-rolesi' }
      ]},
      { id: 'calisma', kisa: 'Çalışma', baslik: 'Kaçakta ne olur', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Normalde fazdan giden akım nötrden geri döner; toroiddeki iki alan birbirini götürür.',
          'Yalıtımı bozuk bir cihaz ya da cihaza dokunan bir insan üzerinden akımın bir kısmı toprağa gider.',
          'Nötrden dönen akım azalır; toroidde fark kadar alan oluşur, sekonder sargıda gerilim doğar.',
          'Açma rölesi mandalı bırakır; yay faz ve nötr kontaklarını birlikte açar.',
          'Kaçak giderilmeden röle yeniden kurulamaz.'
        ]},
        { tip: 'not', metin: 'Genel tip rölede IΔn akımında açma süresi en çok 300 ms, 5 × IΔn’de en çok 40 ms’dir (TS EN 61008-1). Röle 0,5 × IΔn’in altında açmamalı, IΔn’de mutlaka açmalıdır. Modeldeki süreler gösterim için uzatıldı.' }
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Test butonunu kaçak ölçümü yerine saymak', 'Buton yalnızca mekanizmayı dener; açma akımını ve süresini ölçmez. Doğrusu: periyodik kontrolde RCD test cihazıyla ölç.'],
          ['Atan röleyi tekrar tekrar kurmaya çalışmak', 'Kaçak sürdükçe röle yine atar; kaçak bir insan üzerinden de olabilir. Doğrusu: devreleri ya da cihazları tek tek ayırarak kaçağın yerini bul.'],
          ['Nötrü röleden geçirmemek', 'Yük akımının tamamı fark olarak görünür; röle kurulur kurulmaz atar. Doğrusu: faz ve nötr birlikte röleden geçer, PE geçmez.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Otomatik sigorta (MCB)', 'RCBO', 'Nötr barası', 'Toprak barası', 'RCD test cihazı'] }
      ]}
    ]
  },
  'kacak-akim-rolesi': {
    baslik: 'Kaçak akım rölesi (RCD)',
    giris: 'Hattan giden ve dönen akımların farkını ölçer (üç fazlıda üç faz ve nötr birlikte). Akımın bir kısmı toprağa kaçıyorsa, örneğin bir insan üzerinden, hattı milisaniyeler içinde keser.',
    etiketler: ['30 mA / 300 mA', 'AC · A · F · B', 'Test butonu'],
    bolumler: [
      { id: 'sema', kisa: 'Şema', baslik: 'Bağlantı şeması', bloklar: [
        { tip: 'sema', svg: 'rcd',
          lejant: [['l', 'L · faz'], ['n', 'N · nötr'], ['pe', 'PE · toprak'], ['kacak', 'Kaçak akım yolu']],
          isaretler: [
            ['Faz ve nötr birlikte geçer', 'Normalde giden ve dönen akım eşittir, fark sıfırdır.'],
            ['Toroid (akım trafosu)', 'Akımın bir kısmı toprağa kaçarsa fark oluşur, bobinde gerilim doğar ve röle açar.'],
            ['Test butonu', 'İçeride yapay bir kaçak oluşturur. Basınca röle atmalı.'],
            ['PE röleden geçmez', 'Toprak hattı doğrudan cihaz gövdesine gider.']
          ] }
      ]},
      { id: 'calisma', kisa: 'Çalışma', baslik: 'Nasıl çalışır', bloklar: [
        { tip: 'formul', formul: 'IΔ = I(L) − I(N)',
          tanimlar: [
            ['IΔn', 'Anma kaçak akımı: 30 mA hayat koruması, 300 mA yangın koruması.'],
            ['Süre', 'Genel tip röle, IΔn akımında en fazla 300 ms içinde açar.'],
            ['S tipi', 'Seçici (gecikmeli). Ana girişte kullanılır; alttaki 30 mA röle önce açsın diye.']
          ],
          kural: 'Kaçak akım rölesi aşırı akıma karşı korumaz; hatta ayrıca sigorta gerekir. İkisi bir aradaysa RCBO denir.' }
      ]},
      { id: 'turler', kisa: 'Türler', baslik: 'Türler: AC, A, F, B', bloklar: [
        { tip: 'tablo', satirlar: [
          ['AC', '', 'Yalnızca sinüs biçimli AC kaçak. Rezistif yükler: ısıtıcı, akkor lamba.'],
          ['A', '', 'AC ve darbeli DC kaçak. Elektronik cihazlar, LED sürücüler, indüksiyon ocak.'],
          ['F', '', 'A tipine ek olarak karışık frekanslı kaçak. Tek fazlı frekans konvertörlü cihazlar: klima, çamaşır makinesi.'],
          ['B', '', 'F tipine ek olarak düz DC kaçak. Üç fazlı sürücüler, UPS, güneş invertörü, bazı araç şarj istasyonları.']
        ]}
      ]},
      { id: 'test', kisa: 'Test', baslik: 'Test', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Test butonuna bas: röle hemen atmalı.',
          'Atmazsa röle arızalıdır; değiştir.',
          'Buton yalnızca mekanizmayı dener. Açma akımı ve süresi RCD test cihazıyla ölçülür.',
          'Butonu düzenli olarak dene; kılavuzlar en az altı ayda bir önerir.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Kaçak akım rölesi sık atıyor', satirlar: [
          ['Kurar kurmaz atıyor', 'Olası neden: nötr-toprak teması ya da ciddi yalıtım hatası. Kontrol: devreleri tek tek ayırarak bul, izolasyon direncini ölç.'],
          ['Belli bir cihaz çalışınca atıyor', 'Olası neden: cihazda kaçak (termosifon, fırın rezistansı). Kontrol: cihazı ayırıp röleyi yeniden kur.'],
          ['Yağmurda ya da nemde atıyor', 'Olası neden: nemli buat, dış mekân prizi. Kontrol: buatları aç, IP sınıfına bak.'],
          ['Yük arttıkça rastgele atıyor', 'Olası neden: çok sayıda elektronik cihazın toplam kaçağı. Kontrol: devreleri birden fazla röleye böl.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Nötrü başka devrenin nötrüyle birleştirmek', 'Giden ve dönen akım farklı görünür; röle sürekli atar. Doğrusu: her rölenin nötrü yalnızca kendi devresine gider.'],
          ['PE hattını röleden geçirmek', 'Kaçan akım toroidden geri döner, fark ölçülemez; koruma çalışmaz. Doğrusu: PE doğrudan toprak barasına.'],
          ['Sürücü hattında AC tipi kullanmak', 'DC kaçağı algılayamaz. Doğrusu: sürücü kataloğunun önerdiği tip, üç fazlı sürücülerde genellikle B.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Otomatik sigorta (MCB)', 'RCBO', 'Nötr barası', 'Toprak barası', 'RCD test cihazı'] }
      ]}
    ]
  },
  'cam-sigorta': {
    baslik: 'Cam sigorta (5×20 mm)',
    giris: 'Elektronik kartlarda, güç kaynaklarında ve cihaz girişlerinde kullanılan küçük sigorta. Üzerindeki kısa yazı, hızını, akımını ve kesme kapasitesini söyler.',
    etiketler: ['IEC 60127', '5×20 mm', 'F / T'],
    bolumler: [
      { id: 'etiket', kisa: 'Etiket', baslik: 'Etiketi okumak', bloklar: [
        { tip: 'sema', svg: 'cam',
          isaretler: [
            ['Hız harfi', 'T: gecikmeli. Açılıştaki kısa akım darbesine dayanır.'],
            ['Anma akımı', '2 A.'],
            ['Kesme kapasitesi', 'L: düşük (cam gövde). H: yüksek (seramik, kum dolu).'],
            ['Anma gerilimi', '250 V.']
          ],
          not: 'Yazı çoğunlukla uç kapağa kazınmıştır. Okunmuyorsa kart üzerindeki baskıya ya da cihaz etiketine bak.' }
      ]},
      { id: 'hiz', kisa: 'Hız', baslik: 'Hız sınıfları', bloklar: [
        { tip: 'tablo', satirlar: [
          ['FF', '', 'Çok hızlı. Yarı iletkenler, ölçü aleti girişleri.'],
          ['F', '', 'Hızlı. Açılış darbesi olmayan hassas devreler.'],
          ['M', '', 'Orta hızlı.'],
          ['T', '', 'Gecikmeli. Trafo, motor, kondansatörlü güç kaynağı girişleri.'],
          ['TT', '', 'Çok gecikmeli. Büyük açılış darbesi olan yükler.']
        ]}
      ]},
      { id: 'govde', kisa: 'Cam / seramik', baslik: 'Cam mı, seramik mi?', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'cam', baslik: 'Cam', etiket: 'L · düşük', metin: 'İçi görünür; tele bakarak teşhis yapılır. Kısa devre akımı düşük devrelerde.' },
          { ikon: 'seramik', baslik: 'Seramik', etiket: 'H · yüksek', metin: 'İçi kum dolu, görünmez. Şebekeye doğrudan bağlı girişlerde tercih edilir.' }
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Teşhis ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Sigorta atmış, cihaz çalışmıyor', satirlar: [
          ['Cam kararmış, içi metal buharıyla kaplı', 'Olası neden: büyük kısa devre. Kontrol: yeni sigortadan önce köprü diyot, MOSFET, kondansatör gibi parçaları ölç.'],
          ['Tel ortadan temiz kopmuş', 'Olası neden: aşırı akım ya da yaşlanma. Kontrol: aynı değerle değiştir; tekrar atarsa yük akımını ölç.'],
          ['Sağlam görünüyor ama ölçü aleti açık devre gösteriyor', 'Olası neden: uç kapak teması kopmuş. Kontrol: sigortayı değiştir.'],
          ['Yeni sigorta açar açmaz atıyor', 'Olası neden: arkadaki kısa devre sürüyor. Kontrol: cihazı enerjilemeden arızayı bul.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['T yerine F takmak ya da tersi', 'F takılırsa açılış darbesinde atar; T takılırsa hassas devre geç korunur. Doğrusu: harf, akım ve gerilim aynı olmalı.'],
          ['Tel, folyo ya da büyük değerle köprülemek', 'Kısa devrede kart ve kablo yanar. Doğrusu: arızayı bulup aynı değeri tak.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Sigorta yuvası', 'Panel tipi sigorta tutucu', 'Ölçü aleti (süreklilik)', 'PTC sigorta', 'Köprü diyot'] }
      ]}
    ]
  },
  'yari-iletken-sigorta': {
    baslik: 'Yarı iletken sigorta (aR)',
    giris: 'Diyot, tristör ve IGBT gibi yarı iletkenleri kısa devreye karşı korur. Normal sigortadan çok daha hızlı açar ve geçen enerjiyi sınırlar.',
    etiketler: ['IEC 60269-4', 'aR · gR · gS', 'I²t'],
    bolumler: [
      { id: 'sema', kisa: 'Şema', baslik: 'Sürücü girişinde kullanım', bloklar: [
        { tip: 'sema', svg: 'ar',
          lejant: [['l', 'L1'], ['l2', 'L2'], ['l3', 'L3'], ['dc', 'DC +']],
          isaretler: [
            ['aR sigortalar', 'Her fazda bir tane. Kısa devrede çok hızlı keser ve yarı iletkene ulaşan enerjiyi (I²t) sınırlar.'],
            ['Doğrultucu', 'Diyotlar ya da tristörler. Korunan parça budur.'],
            ['DC bara', 'Kondansatörler. Burada kısa devre olursa aR sigortalar atar.'],
            ['Sinyal kontağı', 'Sigorta atınca mikro switch konum değiştirir; sürücüyü durdurur ya da alarm verir.']
          ] }
      ]},
      { id: 'neden', kisa: 'Neden', baslik: 'Neden ayrı sigorta?', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'kablo', baslik: 'gG', etiket: 'Kablo koruması', metin: 'Yarı iletken için yavaştır; sigorta açmadan diyot ya da tristör yanar.' },
          { ikon: 'yariiletken', baslik: 'aR', etiket: 'Yarı iletken koruması', metin: 'Çok hızlıdır, geçen enerjiyi sınırlar. Yalnızca kısa devrede açar.' }
        ]}
      ]},
      { id: 'secim', kisa: 'Seçim', baslik: 'Seçim', bloklar: [
        { tip: 'formul', formul: 'I²t sigorta < I²t yarı iletken',
          tanimlar: [
            ['I²t', 'Arıza sırasında geçen enerjinin ölçüsü (A²s). Sigortanın açma I²t değeri, yarı iletkenin dayanabileceğinden küçük olmalı.'],
            ['Un', 'Anma gerilimi. DC barada kullanılıyorsa DC değerine bak.'],
            ['In', 'Anma akımı. Yük akımına ve ortam sıcaklığına göre seçilir.']
          ],
          kural: 'Pratikte: sürücü ya da yumuşak yol verici kataloğunda önerilen sigorta tipini ve değerini kullan.' },
        { tip: 'tablo', satirlar: [
          ['aR', '', 'Kısmi aralık: yalnızca kısa devre. Aşırı yük için ayrıca koruma gerekir.'],
          ['gR', '', 'Tam aralık: aşırı yük ve kısa devre, yarı iletken hızında.'],
          ['gS', '', 'Tam aralık: gR gibi hızlıdır, kabloyu da korur; kaybı daha düşüktür.']
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Sürücü girişindeki aR sigorta attı', satirlar: [
          ['Doğrultucu diyot kısa devre', 'Kontrol: yeni sigortadan önce giriş klemensleri ile DC bara arasında diyot testi yap.'],
          ['DC bara kondansatörü arızalı', 'Kontrol: şişmiş ya da akmış kondansatöre bak, kısa devre ölç.'],
          ['Fren direnci ya da fren transistörü kısa devre', 'Kontrol: direnç değerini ve transistörü ölç.'],
          ['Şebekede kısa devre ya da ani gerilim yükselmesi', 'Kontrol: giriş kablolarını, parafudru ve filtreyi kontrol et.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['aR yerine gG takmak', 'Sigorta açana kadar diyot ya da tristör yanar. Doğrusu: katalogdaki aR tipi.'],
          ['aR sigortayı aşırı yük koruması sanmak', 'aR yalnızca kısa devrede açar. Doğrusu: kablo için hat girişinde ayrıca uygun koruma.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Frekans konvertörü (VFD)', 'Yumuşak yol verici', 'Doğrultucu köprü', 'Sigorta tabanı', 'Mikro switch'] }
      ]}
    ]
  },
});
