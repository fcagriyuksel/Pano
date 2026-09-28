/* Kontaktör ve röleler: konu tanımı ve bilgi sayfaları. */
VERI.konular.push({
  id: 'kontaktor-roleler', ad: 'Kontaktör ve röleler', ikon: 'kontaktor',
  ozet: 'Kontaktör, termik, zaman ve faz rölesi',
  giris: 'Kontaktör küçük bir kumanda akımıyla büyük yükleri anahtarlar. Röleler bu anahtarlamayı korur, geciktirir ya da denetler.',
  altlar: [
    { id: 'kontaktor-ic-yapi', kod: '3B', ad: 'Kontaktör: iç yapı (3B)', alt: 'Bobin, nüve, taşıyıcı, ana ve yardımcı kontaklar', sayfa: 'kontaktor-ic-yapi' },
    { id: 'kontaktor', kod: 'K1', ad: 'Kontaktör', alt: 'Bobin, ana ve yardımcı kontaklar · AC-3', sayfa: 'kontaktor' },
    { id: 'termik-role', kod: 'F2', ad: 'Termik röle', alt: 'Aşırı yük koruması · 95-96 / 97-98', sayfa: 'termik-role' },
    { id: 'zaman-rolesi', kod: 'KT', ad: 'Zaman rölesi', alt: 'Çekmede ve düşmede gecikme · 15-16-18', sayfa: 'zaman-rolesi' },
    { id: 'faz-koruma-rolesi', kod: 'FKR', ad: 'Faz koruma rölesi', alt: 'Faz kaybı, faz sırası, gerilim', sayfa: 'faz-koruma-rolesi' }
  ]
});

Object.assign(VERI.sayfalar, {
  'kontaktor-ic-yapi': {
    baslik: 'Kontaktörün iç yapısı',
    giris: 'Kontaktörün içinde bir elektromıknatıs ve onun hareket ettirdiği kontak taşıyıcı vardır. Bobin çekince bütün kontaklar birlikte konum değiştirir; bırakınca yaylar onları geri getirir.',
    etiketler: ['3B model', 'IEC 60947-4-1', 'Gölge halkası', 'Kontak basıncı'],
    bolumler: [
      { id: 'model', kisa: '3B model', baslik: 'Parçalar', bloklar: [
        { tip: 'model', tur: 'kontaktor' }
      ]},
      { id: 'calisma', kisa: 'Çalışma', baslik: 'Bobin çekince ne olur', bloklar: [
        { tip: 'adimlar', satirlar: [
          'A1-A2’ye gerilim gelir; bobin sabit nüvede manyetik alan oluşturur.',
          'Hareketli nüve sabit nüveye çekilir ve taşıyıcıyı geriye götürür; geri dönüş yayları sıkışır.',
          'Önce NC yardımcı kontak (21-22) açılır, ardından ana kontaklar ve NO yardımcı kontak (13-14) kapanır.',
          'Kontaklar değdikten sonra taşıyıcı biraz daha ilerler; taşıyıcı penceresindeki yay sıkışır ve kontak basıncını sağlar. Kontaklar aşındıkça bu pay azalır.',
          'Gerilim kesilince geri dönüş yayları taşıyıcıyı öne iter; kontaklar ilk konumuna döner.'
        ]},
        { tip: 'not', metin: 'AC bobinde akım 50 Hz’de saniyede 100 kez sıfırdan geçer ve çekme kuvveti bu anlarda düşer. Gölge halkasındaki akım, kutbun bir bölümünde akıyı geciktirir; kuvvet sıfıra inmez, nüve titremez. DC bobinde akı sabittir, gölge halkası gerekmez. Kapanma ve açılma süreleri birkaç milisaniye ile birkaç on milisaniye arasındadır; kesin değer katalogdadır.' }
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Taşıyıcıya elle basarak motoru çalıştırmak', 'Kumanda devresi atlanır: termik, acil stop ve kilitlemeler devre dışı kalır. Kontaklar yavaş kapanır, ark büyür. Doğrusu: enerjiyi kumanda devresinden ver; elle basmayı yalnızca enerjisizken mekanik kontrol için yap.'],
          ['Yapışmış (kaynamış) ana kontağı fark etmemek', 'Bobin bıraksa da motor durmaz. Doğrusu: güvenlik devrelerinde ayna kontaklı (mirror contact, IEC 60947-4-1) kontaktör kullan ve NC yardımcı kontağı geri besleme olarak izle.'],
          ['Bobine söndürme elemanı koymamak', 'Bobin açılırken yüksek gerilim darbesi oluşur; PLC çıkışını ve röle kontaklarını yıpratır, parazit yapar. Doğrusu: DC bobinde diyot ya da varistör (diyot bırakma süresini uzatır), AC bobinde RC ya da varistör.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Termik röle', 'Yardımcı kontak bloğu', 'Bobin söndürme modülü (RC, varistör, diyot)', 'Motor koruma şalteri'] }
      ]}
    ]
  },
  'kontaktor': {
    baslik: 'Kontaktör',
    giris: 'Kontaktör, bobinine verilen kumanda gerilimiyle ana kontaklarını kapatan elektromanyetik anahtardır. Motorları ve büyük yükleri uzaktan, sık açıp kapamak için kullanılır.',
    etiketler: ['IEC 60947-4-1', 'A1-A2', 'AC-3'],
    bolumler: [
      { id: 'sema', kisa: 'Klemensler', baslik: 'Klemensler', bloklar: [
        { tip: 'sema', svg: 'kontaktor',
          isaretler: [
            ['Bobin (A1-A2)', 'Kumanda gerilimi buraya verilir: 24 V DC, 230 V AC gibi. Gerilim ve akım türü bobin etiketinde yazar.'],
            ['Ana kontaklar (1-2, 3-4, 5-6)', 'Yük akımını taşır. Tek numaralar besleme, çift numaralar yük tarafıdır.'],
            ['Yardımcı NO kontak (13-14)', 'Bobin çekince kapanır. Mühürleme ve durum bilgisi için kullanılır.'],
            ['Yardımcı NC kontak (21-22)', 'Bobin çekince açılır. Kilitleme devrelerinde kullanılır.']
          ],
          not: 'Yardımcı kontak numarasının ilk hanesi sıra numarası, ikinci hanesi türüdür: 1-2 NC, 3-4 NO. Kesik çizgi, bütün kontakların birlikte hareket ettiğini gösterir.' }
      ]},
      { id: 'kategori', kisa: 'Kategori', baslik: 'Kullanım kategorisi', bloklar: [
        { tip: 'tablo', satirlar: [
          ['AC-1', '', 'Rezistif ya da az endüktif yükler (ısıtıcı). Kontaktörün en yüksek akım değeri budur.'],
          ['AC-3', '', 'Kafesli asenkron motorda yol verme ve çalışırken durdurma. Motor için bu değere bakılır.'],
          ['AC-4', '', 'Kesik çalışma ve ters akımla frenleme. Kontak aşınması en yüksektir.'],
          ['AC-15', '', 'Kumanda devresinde AC bobin anahtarlama (yardımcı kontaklar).']
        ]}
      ]},
      { id: 'secim', kisa: 'Seçim', baslik: 'Seçim', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Motorun anma akımını etiketten oku.',
          'AC-3 akımı motor akımına eşit ya da büyük kontaktör seç.',
          'Bobin gerilimini kumanda devresine göre seç: 24 V DC, 230 V AC gibi.',
          'Gereken yardımcı kontak sayısını say; yetmezse ek kontak bloğu tak.',
          'Sık anahtarlama ya da ters akımla frenleme varsa AC-4 değerine bak.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Kontaktör vınlıyor ya da titriyor', satirlar: [
          ['Bobin gerilimi düşük', 'Kontrol: A1-A2 arasındaki gerilimi çekme anında ölç.'],
          ['Nüve yüzeyi kirli ya da aşınmış', 'Kontrol: enerjisizken nüve yüzeylerini temizle.'],
          ['Gölge halkası kırık (AC bobin)', 'Kontrol: kontaktörü değiştir.'],
          ['Yanlış bobin gerilimi', 'Kontrol: bobin etiketini kumanda gerilimiyle karşılaştır.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['AC bobini DC ile beslemek ya da tersi', 'Bobin yanar ya da hiç çekmez. Doğrusu: bobin etiketindeki gerilim ve akım türü.'],
          ['Motor için AC-1 akımına göre seçmek', 'Kalkış akımı kontakları yakar, kontaklar yapışır. Doğrusu: AC-3 değeri.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Termik röle', 'Yardımcı kontak bloğu', 'Mekanik kilit', 'Motor koruma şalteri', 'Zaman rölesi'] }
      ]}
    ]
  },
  'termik-role': {
    baslik: 'Termik röle',
    giris: 'Termik röle motor akımını bimetallerle izler; aşırı yükte kumanda devresini keserek kontaktörü düşürür. Yükü kendisi kesmez.',
    etiketler: ['95-96 / 97-98', 'Açma sınıfı', 'Elle reset'],
    bolumler: [
      { id: 'sema', kisa: 'Bağlantı', baslik: 'Bağlantı', bloklar: [
        { tip: 'sema', svg: 'termik',
          lejant: [['l', 'L1'], ['l2', 'L2'], ['l3', 'L3'], ['ink', 'Kumanda']],
          isaretler: [
            ['Bimetal ısıtıcılar ve ayar', 'Üç fazın akımı buradan geçer. Ayar düğmesi motor anma akımına getirilir; aşırı yükte bimetaller eğilir.'],
            ['95-96 (NC)', 'Kontaktör bobinine seri bağlanır. Termik atınca açılır, kontaktör düşer.'],
            ['97-98 (NO)', 'Termik atınca kapanır; arıza lambası ya da PLC girişi için.']
          ],
          not: 'Termik röle kısa devreye karşı korumaz; önünde sigorta ya da motor koruma şalteri gerekir.' }
      ]},
      { id: 'sinif', kisa: 'Sınıf', baslik: 'Açma sınıfı', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Sınıf 10A', '', '7,2 × ayar akımında 2–10 saniyede açar. Normal kalkışlı motorlar.'],
          ['Sınıf 10', '', '7,2 × ayar akımında 4–10 saniyede açar.'],
          ['Sınıf 20', '', '6–20 saniye. Ağır kalkışlı yükler.'],
          ['Sınıf 30', '', '9–30 saniye. Çok ağır kalkış: büyük fan, değirmen.']
        ]}
      ]},
      { id: 'reset', kisa: 'Reset', baslik: 'Elle ve otomatik reset', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'dugmeI', baslik: 'Elle reset', etiket: 'Tercih edilir', metin: 'Termik atınca biri reset butonuna basana kadar motor çalışmaz; arıza fark edilir.' },
          { ikon: 'reset', baslik: 'Otomatik reset', etiket: 'Dikkat', metin: 'Bimetal soğuyunca kendiliğinden kapanır. İki telli kumandada motor beklenmedik anda yeniden kalkabilir.' }
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Termik röle sık atıyor', satirlar: [
          ['Ayar düşük', 'Kontrol: ayarı motor etiketindeki akımla karşılaştır.'],
          ['Motor aşırı yüklü', 'Kontrol: pens ampermetreyle üç faz akımını ölç.'],
          ['Faz kaybı ya da dengesiz akım', 'Kontrol: üç faz akımını karşılaştır; biri çok düşükse sigortaları ve kontakları kontrol et.'],
          ['Ağır kalkış', 'Kontrol: kalkış uzun sürüyorsa daha yüksek sınıf (20, 30) seç.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Yıldız-üçgende ayarı hat akımına yapmak', 'Termik sargı kolundaysa sargı akımını görür. Doğrusu: ayar = motor anma akımı × 0,58.'],
          ['Termik atar atmaz tekrar kurmak', 'Neden bulunmadan motor yeniden ısınır. Doğrusu: önce nedeni bul.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Kontaktör', 'Motor koruma şalteri', 'Sigorta', 'Pens ampermetre'] }
      ]}
    ]
  },
  'zaman-rolesi': {
    baslik: 'Zaman rölesi',
    giris: 'Zaman rölesi kontağını ayarlanan süre kadar geciktirerek konum değiştirir. Yıldız-üçgen geçişi, gecikmeli durdurma ve yanıp sönme devrelerinde kullanılır.',
    etiketler: ['A1-A2', '15-16-18', 'Çok fonksiyonlu'],
    bolumler: [
      { id: 'sema', kisa: 'Diyagram', baslik: 'Zaman diyagramı', bloklar: [
        { tip: 'sema', svg: 'zamanDiyagram',
          lejant: [['ink', 'Enerji / kontrol'], ['sig', 'Kontak 15-18']],
          not: 'T ayarlanan süredir. 15 ortak uç, 16 NC, 18 NO’dur.' }
      ]},
      { id: 'fonksiyon', kisa: 'Fonksiyonlar', baslik: 'Fonksiyonlar', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Çekmede gecikmeli', '', 'Enerji gelince T süre sonra kontak konum değiştirir. En yaygın fonksiyon.'],
          ['Düşmede gecikmeli', '', 'Kontak hemen konum değiştirir; enerji ya da kontrol sinyali kesilince T süre sonra geri döner.'],
          ['Flaşör', '', 'Enerji varken kontak belirli aralıklarla açılıp kapanır; ikaz lambası.'],
          ['Yıldız-üçgen', '', 'Yıldız kontağını T süre tutar, kısa bir aradan sonra üçgen kontağını kapatır.']
        ]}
      ]},
      { id: 'ayar', kisa: 'Ayar', baslik: 'Ayar', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Çok fonksiyonlu rölede fonksiyonu seçiciden ayarla.',
          'Süre aralığını seç (ör. 1–10 s).',
          'İnce ayar düğmesiyle süreyi aralık içinde ayarla.',
          'Enerji ver ve süreyi kronometreyle doğrula; skala yaklaşıktır.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Zaman rölesi kontak değiştirmiyor', satirlar: [
          ['Besleme yok ya da yanlış gerilim', 'Kontrol: A1-A2 gerilimini ölç, etiketle karşılaştır.'],
          ['Yanlış fonksiyon ya da aralık seçili', 'Kontrol: fonksiyon ve süre aralığı seçicilerine bak.'],
          ['Kontrol girişi bağlı değil (düşmede gecikmeli)', 'Kontrol: kontrol girişinin (S ya da B1) bağlantısını kontrol et.'],
          ['Yanlış kontak kullanılmış', 'Kontrol: 15-18 NO, 15-16 NC; devrenin hangisini istediğine bak.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Süreyi skala üzerinden kabul etmek', 'Skala yaklaşıktır, birkaç saniyelik fark çıkabilir. Doğrusu: kronometreyle ölç.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Kontaktör', 'Yıldız-üçgen', 'Sinyal lambası'] }
      ]}
    ]
  },
  'faz-koruma-rolesi': {
    baslik: 'Faz koruma rölesi',
    giris: 'Faz koruma rölesi şebekeyi izler. Faz kesilirse, sıra ters dönerse ya da gerilim sınır dışına çıkarsa kontağını açar ve motoru durdurur.',
    etiketler: ['Faz kaybı', 'Faz sırası', 'Asimetri'],
    bolumler: [
      { id: 'sema', kisa: 'Bağlantı', baslik: 'Bağlantı', bloklar: [
        { tip: 'sema', svg: 'fazKoruma',
          lejant: [['l', 'L1'], ['l2', 'L2'], ['l3', 'L3'], ['ink', 'Kumanda']],
          isaretler: [
            ['İzleme girişleri', 'L1, L2, L3 röleye bağlanır; röle çoğunlukla beslemesini de buradan alır.'],
            ['Ayarlar ve LED', 'Asimetri yüzdesi, gerilim sınırları ve açma gecikmesi. LED hangi arızanın olduğunu gösterir.'],
            ['Kontak 11-14', 'Şebeke sağlıklıyken kapalıdır. Kumanda devresine seri bağlanır.'],
            ['Kontaktör bobini', 'Röle kontağı açınca bobin düşer, motor durur.']
          ],
          not: 'Kontak numaraları modele göre değişir; 11 ortak, 12 NC, 14 NO yaygın kullanımdır.' }
      ]},
      { id: 'denetim', kisa: 'Denetimler', baslik: 'Neleri denetler', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Faz kaybı', '', 'Bir faz kesilince açar; motor iki fazda kalıp yanmaz.'],
          ['Faz sırası', '', 'Sıra ters dönünce açar; pompa, fan gibi tek yönlü yükler ters dönmez.'],
          ['Asimetri', '', 'Faz gerilimleri arasındaki fark ayarı aşınca açar.'],
          ['Düşük / yüksek gerilim', '', 'Gerilim ayarlanan sınırların dışına çıkınca açar.']
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Röle çekmiyor, motor çalışmıyor', satirlar: [
          ['Faz sırası ters', 'Kontrol: faz sırası LED’ine bak; girişte iki fazın yerini değiştir.'],
          ['Bir faz yok', 'Kontrol: fazlar arası gerilimleri ölç.'],
          ['Asimetri ayarı çok hassas', 'Kontrol: ayarı şebekenin gerçek durumuna göre değerlendir.'],
          ['Gerilim sınır dışında', 'Kontrol: faz-faz gerilimini ölç.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Faz sırasını motor tarafında düzeltmek', 'Röle hâlâ ters sırayı görür ve çekmez. Doğrusu: fazları rölenin izlediği noktadan önce değiştir.'],
          ['Röle kontağını köprülemek', 'Faz kaybında motor iki fazda kalır ve yanar. Doğrusu: arızayı gider.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Kontaktör', 'Motor koruma şalteri', 'Faz sırası göstergesi'] }
      ]}
    ]
  },
});
