/* Güç kaynağı ve ölçüm: konu tanımı ve bilgi sayfaları. */
VERI.konular.push({
  id: 'guc-olcum', ad: 'Güç kaynağı ve ölçüm', ikon: 'olcum',
  ozet: '24 V kaynak, multimetre, pens, izolasyon',
  giris: 'Doğru ölçüm, arızanın yarısını çözer. Hangi aleti nasıl bağladığın, hem sonucu hem de güvenliğini belirler.',
  altlar: [
    { id: 'guc-kaynagi', kod: '24V', ad: '24 V güç kaynağı', alt: 'Bağlantı, boyutlandırma, arıza', sayfa: 'guc-kaynagi' },
    { id: 'multimetre', kod: 'V/Ω', ad: 'Multimetre', alt: 'Gerilim, akım, süreklilik · CAT sınıfı', sayfa: 'multimetre' },
    { id: 'pens-ampermetre', kod: 'A~', ad: 'Pens ampermetre', alt: 'Tek iletken · kaçak akım ölçümü', sayfa: 'pens-ampermetre' },
    { id: 'izolasyon-olcumu', kod: 'MΩ', ad: 'İzolasyon ölçümü', alt: 'Test gerilimi · alt sınırlar', sayfa: 'izolasyon-olcumu' }
  ]
});

Object.assign(VERI.sayfalar, {
  'guc-kaynagi': {
    baslik: '24 V güç kaynağı',
    giris: 'Pano içindeki kumanda, PLC ve sensörler 24 V DC ile çalışır. Kaynağın doğru boyutlandırılması ve çıkışın gruplara bölünüp korunması, tek bir kısa devrenin tüm makineyi durdurmasını önler.',
    etiketler: ['Boyutlandırma', 'Çıkış koruma', '0 V topraklama'],
    bolumler: [
      { id: 'baglanti', kisa: 'Bağlantı', baslik: 'Bağlantı', bloklar: [
        { tip: 'sema', svg: 'psuBaglanti',
          lejant: [['l', 'L'], ['n', 'N / 0 V'], ['pe', 'PE'], ['dc', '+24 V']],
          isaretler: [
            ['Giriş sigortası', 'Kaynağın kataloğunda önerilen tip ve değer (çoğu kez B ya da C karakteristik).'],
            ['Güç kaynağı', 'Giriş 230 V AC, çıkış 24 V DC. Üst ve altında havalandırma boşluğu bırak.'],
            ['Çıkış grupları', 'PLC, sensör ve valfleri ayrı sigortayla besle; kısa devre yalnızca kendi grubunu keser.'],
            ['0 V topraklama', 'PELV sistemde 0 V tek bir noktadan PE’ye bağlanır. Birden fazla nokta toprak döngüsü yapar.']
          ] }
      ]},
      { id: 'hesap', kisa: 'Hesap', baslik: 'Boyutlandırma', bloklar: [
        { tip: 'hesap', tur: 'psu' }
      ]},
      { id: 'koruma', kisa: 'Koruma', baslik: 'Çıkış koruması', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Elektronik sigorta', 'sig', 'Kaynağın akım sınırı içinde güvenle açar. Her kanal ayrı ayarlanır ve uzaktan resetlenebilir.'],
          ['Küçük MCB', 'dc', 'Açmak için anma akımının katlarını ister. Kaynak bu akımı veremezse MCB açmaz, gerilim düşer.'],
          ['Akım sınırlama', '', 'Aşırı yükte kaynak akımı sınırlar ya da kesip açar (hiccup). Çıkış LED’i yanıp söner.']
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Çıkış gerilimi düşük ya da kaynak kesip açıyor', satirlar: [
          ['Aşırı yük', 'Kontrol: çıkış akımını pens ile ölç, kaynağın anma akımıyla karşılaştır.'],
          ['Kısa devre', 'Kontrol: çıkış gruplarını tek tek ayırıp hangisinde düzeldiğine bak.'],
          ['Isınma', 'Kontrol: havalandırma boşluğunu ve pano sıcaklığını kontrol et; sıcakta kaynak gücü düşer.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Kaynağı %100 yükte çalıştırmak', 'Isınır, ömrü kısalır; kalkış anlarında gerilim çöker. Doğrusu: en az %20–25 pay.'],
          ['0 V’u birden fazla noktadan topraklamak', 'Toprak döngüsü; analog ölçümler ve haberleşme bozulur. Doğrusu: tek nokta.'],
          ['Tüm yükleri tek sigortadan beslemek', 'Bir sensör kablosundaki kısa devre PLC’yi de durdurur. Doğrusu: gruplara böl.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Giriş MCB', 'Elektronik sigorta modülü', 'Dağıtım klemensi', 'DC OK rölesi'] }
      ]}
    ]
  },
  'multimetre': {
    baslik: 'Multimetre',
    giris: 'Multimetre gerilim, akım, direnç ve süreklilik ölçer. Gerilim paralel, akım seri ölçülür; uçların hangi sokette olduğu hem sonucu hem de güvenliği belirler.',
    etiketler: ['Paralel / seri', 'CAT sınıfı', 'Hayalet gerilim'],
    bolumler: [
      { id: 'baglanti', kisa: 'Bağlantı', baslik: 'Ölçüm bağlantısı', bloklar: [
        { tip: 'sema', svg: 'multimetreBaglanti',
          lejant: [['dc', 'Kırmızı uç'], ['ink', 'Siyah uç']],
          isaretler: [
            ['Gerilim', 'Uçlar ölçülecek iki noktaya dokunur; devre açılmaz.'],
            ['Akım', 'Devre açılır ve multimetre araya seri girer. Kırmızı uç A ya da mA soketine alınır.'],
            ['Soketler', 'Siyah uç hep COM’da. Kırmızı uç gerilim ve direnç için VΩ’da; akım için A ya da mA soketinde.']
          ] }
      ]},
      { id: 'cat', kisa: 'CAT', baslik: 'Ölçüm kategorisi', bloklar: [
        { tip: 'tablo', satirlar: [
          ['CAT II', '', 'Priz ve fişli cihazlar.'],
          ['CAT III', 'dc', 'Pano, dağıtım, motor ve sabit tesisat. Pano işinde en az CAT III 600 V kullan.'],
          ['CAT IV', 'dc', 'Bina girişi, sayaç, havai hat. En yüksek darbe gerilimi.']
        ]},
        { tip: 'not', metin: 'Kategori hem ölçü aletinde hem de problarda yazmalı; düşük olanı geçerlidir.' }
      ]},
      { id: 'hayalet', kisa: 'Hayalet gerilim', baslik: 'Hayalet gerilim', bloklar: [
        { tip: 'kartlar', kartlar: [
          { ikon: 'gerilim', baslik: 'Yüksek empedans', etiket: 'Normal V', metin: 'Boşta kalan kabloda komşu kablolardan kapasitif olarak gelen gerilimi okur (ör. 80–150 V). Gerçek değildir.' },
          { ikon: 'uyari', baslik: 'Düşük empedans', etiket: 'LoZ', metin: 'Aletin içine küçük bir yük koyar; hayalet gerilim sıfıra iner, gerçek gerilim kalır.' }
        ]}
      ]},
      { id: 'guvenli', kisa: 'Güvenli ölçüm', baslik: 'Gerilim yokluğunu doğrulama', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Aleti bilinen bir gerilimde dene (çalıştığını gör).',
          'Ölçülecek devrede tüm iletkenler arasında ve PE’ye karşı ölç.',
          'Aleti tekrar bilinen gerilimde dene (arıza olmadığını doğrula).',
          'Ancak bundan sonra devreye dokun.'
        ]}
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Kırmızı uç A soketindeyken gerilim ölçmek', 'Alet kısa devre olur; sigortası atar ya da ark çıkar. Doğrusu: gerilimden önce soketi kontrol et.'],
          ['Enerjili devrede direnç ya da süreklilik ölçmek', 'Sonuç yanlış olur, alet zarar görebilir. Doğrusu: önce enerjiyi kes.'],
          ['AC ile DC seçimini karıştırmak', 'Değer sıfır ya da anlamsız görünür. Doğrusu: ölçülen gerilimin tipine göre seç.']
        ]}
      ]}
    ]
  },
  'pens-ampermetre': {
    baslik: 'Pens ampermetre',
    giris: 'Pens ampermetre, iletkeni çevreleyen manyetik alandan akımı ölçer; devreyi açmaya gerek kalmaz. Doğru sonuç için çenenin içinde tek bir iletken olmalıdır.',
    etiketler: ['Tek iletken', 'Kaçak akım', 'True RMS'],
    bolumler: [
      { id: 'olcum', kisa: 'Ölçüm', baslik: 'Çenenin içinde ne olmalı', bloklar: [
        { tip: 'sema', svg: 'pensOlcum',
          lejant: [['l', 'Faz (L)'], ['n', 'Nötr (N)']],
          isaretler: [
            ['Tek iletken', 'Yalnızca bir iletken: o iletkenin akımı okunur.'],
            ['L + N birlikte', 'Gidiş ve dönüş akımları zıt yönlüdür, alanları birbirini siler; pens 0 okur.'],
            ['Kaçak pens', 'L ve N (üç fazda tüm fazlar ve N) birlikte alınır; okunan fark, PE’ye ya da başka yola kaçan akımdır.']
          ],
          not: '⊙ bize doğru, ⊗ bizden uzağa akan akımı gösterir.' }
      ]},
      { id: 'hesap', kisa: 'Dengesizlik', baslik: 'Motor akım dengesizliği', bloklar: [
        { tip: 'hesap', tur: 'dengesizlik' }
      ]},
      { id: 'secim', kisa: 'Seçim', baslik: 'Pens seçimi', bloklar: [
        { tip: 'tablo', satirlar: [
          ['AC pens', '', 'Yalnızca AC akım. Trafo prensibiyle çalışır.'],
          ['AC/DC pens', 'dc', 'Hall sensörlü; DC motor, akü ve 24 V devrelerde. Ölçümden önce sıfırla (zero).'],
          ['True RMS', 'sig', 'Sürücü, UPS ve LED sürücüsü gibi bozuk dalga şekillerinde doğru okur.'],
          ['Kalkış akımı (inrush)', 'sig', 'Motor kalkışındaki tepe akımı yakalar.']
        ]}
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Kabloyu topluca çeneye almak', 'Pens 0 ya da çok düşük okur. Doğrusu: kılıfı açılmış tek iletken.'],
          ['Sürücü çıkışında True RMS olmayan pens kullanmak', 'Akım yanlış okunur. Doğrusu: True RMS ve alçak geçiren (low-pass) filtreli pens.'],
          ['DC ölçmeden önce sıfırlamamak', 'Sıfır kayması sonuca eklenir. Doğrusu: iletken yokken zero tuşuna bas.']
        ]}
      ]}
    ]
  },
  'izolasyon-olcumu': {
    baslik: 'İzolasyon ölçümü',
    giris: 'İzolasyon ölçer (megger) iletken ile toprak ya da iki iletken arasına yüksek DC gerilim uygular ve geçen çok küçük akımdan izolasyon direncini hesaplar. Kablo ve motorun sağlığını gösterir.',
    etiketler: ['Test gerilimi', 'Alt sınır', 'PI'],
    bolumler: [
      { id: 'baglanti', kisa: 'Bağlantı', baslik: 'Ölçüm bağlantısı', bloklar: [
        { tip: 'sema', svg: 'megger',
          lejant: [['dc', 'Hat ucu (L)'], ['ink', 'Toprak ucu (E)'], ['pe', 'PE']],
          isaretler: [
            ['İzolasyon ölçer', 'Test gerilimi devrenin gerilimine göre seçilir; 230/400 V için 500 V DC.'],
            ['Hat ucu', 'Ölçülen iletkene (faz) bağlanır.'],
            ['Toprak ucu', 'PE’ye ya da karşılaştırılan diğer iletkene bağlanır.'],
            ['İki uç ayrık', 'Kablonun iki ucu da ayrılır: sürücü, PLC ve elektronik cihazlar devre dışında kalmalı.']
          ] }
      ]},
      { id: 'hesap', kisa: 'Hesap', baslik: 'Test gerilimi ve sınır', bloklar: [
        { tip: 'hesap', tur: 'izolasyon' }
      ]},
      { id: 'pi', kisa: 'PI', baslik: 'Polarizasyon indeksi (PI)', bloklar: [
        { tip: 'formul', formul: 'PI = R(10 dk) ÷ R(1 dk)',
          tanimlar: [['R(1 dk)', '1. dakikadaki direnç'], ['R(10 dk)', '10. dakikadaki direnç']],
          kural: 'Motor sargısında PI < 1 kötü, 1–2 şüpheli, 2–4 iyi, 4 üstü çok iyi. Nemli sargıda direnç zamanla pek artmaz.' }
      ]},
      { id: 'sira', kisa: 'Sıra', baslik: 'Ölçüm sırası', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Enerjiyi kes, kilitle, etiketle ve gerilim olmadığını ölç.',
          'Kablonun iki ucunu ayır; sürücü, parafudr ve elektronik cihazları devre dışı bırak.',
          'Her fazı PE’ye karşı ve fazları birbirine karşı 1 dakika ölç.',
          'Ölçümden sonra kabloyu deşarj et (çoğu alet otomatik yapar), sonucu sıcaklıkla birlikte kaydet.'
        ]}
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Sürücü ya da PLC bağlıyken ölçmek', 'Test gerilimi elektroniği bozar. Doğrusu: kabloyu iki uçtan ayır.'],
          ['Parafudr bağlıyken ölçmek', 'Değer düşük çıkar, yanlış arıza sanılır. Doğrusu: parafudru ayır.'],
          ['Ölçümden sonra deşarj etmemek', 'Uzun kablo yük tutar ve çarpar. Doğrusu: ölçer deşarj etsin ya da PE’ye boşalt.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['İzolasyon ölçer (250/500/1000 V)', 'Kilitleme seti', 'Multimetre', 'Ölçüm kayıt formu'] }
      ]}
    ]
  },
});
