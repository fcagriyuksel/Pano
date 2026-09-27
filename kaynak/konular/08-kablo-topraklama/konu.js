/* Kablo ve topraklama: konu tanımı ve bilgi sayfaları. */
VERI.konular.push({
  id: 'kablo-topraklama', ad: 'Kablo ve topraklama', ikon: 'kabloT',
  ozet: 'Kesit, gerilim düşümü, topraklama',
  giris: 'Doğru kesit kabloyu ısınmaktan, doğru topraklama insanı elektrik çarpmasından korur. İkisi de hesapla seçilir.',
  altlar: [
    { id: 'kablo-kesiti', kod: 'mm²', ad: 'Kablo kesiti seçimi', alt: 'Akım taşıma, döşeme, düzeltme', sayfa: 'kablo-kesiti' },
    { id: 'gerilim-dusumu', kod: 'ΔU', ad: 'Gerilim düşümü', alt: 'Hesap · yönetmelik sınırları', sayfa: 'gerilim-dusumu' },
    { id: 'topraklama-sistemleri', kod: 'TN', ad: 'Topraklama sistemleri', alt: 'TN-S, TN-C-S, TT · PE kesiti', sayfa: 'topraklama-sistemleri' },
    { id: 'kablo-renkleri', kod: 'L/N', ad: 'Kablo renkleri', alt: 'Güç ve kumanda renkleri · işaretleme', sayfa: 'kablo-renkleri' }
  ]
});

Object.assign(VERI.sayfalar, {
  'kablo-kesiti': {
    baslik: 'Kablo kesiti seçimi',
    giris: 'Kablo kesiti dört şeye göre seçilir: akım, döşeme şekli, ortam sıcaklığı ve hat uzunluğu. Son kontrol gerilim düşümüdür.',
    etiketler: ['Ib ≤ In ≤ Iz', 'Döşeme şekli', 'Düzeltme katsayısı'],
    bolumler: [
      { id: 'sema', kisa: 'Kural', baslik: 'Temel kural', bloklar: [
        { tip: 'sema', svg: 'akimSirasi',
          isaretler: [
            ['Ib', 'Hattın çektiği hesap akımı.'],
            ['In', 'Sigortanın anma akımı; Ib’den büyük ya da eşit.'],
            ['Iz', 'Kablonun döşeme şekli ve ortam sıcaklığına göre düzeltilmiş akım taşıma kapasitesi; In’den büyük ya da eşit.']
          ],
          not: 'MCB’de In ≤ Iz yeterlidir. Buşon ve NH (gG) sigortada erime akımı daha yüksektir; In ≤ 0,9 × Iz seç.' }
      ]},
      { id: 'hesap', kisa: 'Kesit hesabı', baslik: 'Kesit hesabı', bloklar: [
        { tip: 'hesap', tur: 'iz' }
      ]},
      { id: 'etkenler', kisa: 'Etkenler', baslik: 'Iz’yi düşüren etkenler', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Döşeme şekli', '', 'Duvar içinde boruda taşınan akım, açıkta kablo tavasındakinden düşüktür.'],
          ['Ortam sıcaklığı', '', 'Tablolar genellikle 30 °C için verilir; sıcak ortamda katsayıyla düşürülür.'],
          ['Gruplama', '', 'Aynı kanaldaki yüklü kablo sayısı arttıkça her birinin taşıyabileceği akım azalır.'],
          ['Yalıtım', '', 'XLPE yalıtım PVC’den daha yüksek sıcaklığa dayanır, daha fazla akım taşır.']
        ]}
      ]},
      { id: 'konut', kisa: 'Konut', baslik: 'Konutta yaygın eşleşmeler', bloklar: [
        { tip: 'tablo', satirlar: [
          ['1,5 mm²', '', 'Aydınlatma hattı · 10 A sigorta'],
          ['2,5 mm²', '', 'Priz hattı · 16 A sigorta'],
          ['4 mm²', '', 'Ocak, klima gibi güç hatları · döşeme şekline göre 20–25 A']
        ]},
        { tip: 'not', metin: 'Yaygın uygulamadır; kesin seçim döşeme şekli, uzunluk ve yönetmelik tablosuyla yapılır.' }
      ]},
      { id: 'sira', kisa: 'Sıra', baslik: 'Seçim sırası', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Hattın hesap akımını (Ib) bul.',
          'Sigortayı seç: In ≥ Ib.',
          'Döşeme şekline göre tablodan kesit seç: Iz ≥ In.',
          'Sıcaklık ve gruplama katsayılarıyla Iz’yi düzelt; yetmezse kesiti büyüt.',
          'Gerilim düşümünü hesapla; sınırı aşıyorsa kesiti büyüt.'
        ]},
        { tip: 'hatalar', hatalar: [
          ['Kesiti yalnızca akıma göre seçmek', 'Uzun hatta gerilim düşümü sınırı aşar; motor zor kalkar, lamba loş yanar. Doğrusu: gerilim düşümünü de hesapla.'],
          ['Aynı kanala çok sayıda yüklü kablo koymak', 'Kablolar birbirini ısıtır, taşıma kapasitesi düşer. Doğrusu: gruplama katsayısını uygula.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Otomatik sigorta (MCB)', 'Kablo kanalı', 'Kablo yüksüğü', 'Pens ampermetre'] }
      ]}
    ]
  },
  'gerilim-dusumu': {
    baslik: 'Gerilim düşümü',
    giris: 'Akım kablodan geçerken kablonun direnci üzerinde gerilim kaybolur. Hat uzadıkça ve akım büyüdükçe yükün ucundaki gerilim düşer.',
    etiketler: ['%1,5 aydınlatma', '%3 motor', 'γ = 56'],
    bolumler: [
      { id: 'sema', kisa: 'Hat', baslik: 'Hat üzerinde düşüm', bloklar: [
        { tip: 'sema', svg: 'gerilimHat',
          lejant: [['l', 'Faz'], ['n', 'Nötr (dönüş)']],
          isaretler: [
            ['Kaynak gerilimi', 'Panodaki gerilim (U₁).'],
            ['Hat', 'Uzunluk L ve kesit S kablonun direncini belirler; akım I bu dirençte ΔU kadar gerilim düşürür.'],
            ['Yükteki gerilim', 'U₂ = U₁ − ΔU. Motor ve aydınlatma bu gerilimle çalışır.']
          ] }
      ]},
      { id: 'hesap', kisa: 'Hesap', baslik: 'Hesap', bloklar: [
        { tip: 'hesap', tur: 'gerilimDusumu' }
      ]},
      { id: 'sinir', kisa: 'Sınırlar', baslik: 'Yönetmelik sınırları', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Aydınlatma, priz', '', '%1,5 — dağıtım şebekesinden beslenen tesislerde, bina bağlantı kutusundan tüketiciye kadar.'],
          ['Motor', '', '%3'],
          ['Özel trafolu tesis', '', 'Aydınlatma-priz %6,5, motor %8 (trafodan itibaren).']
        ]},
        { tip: 'not', metin: 'Elektrik İç Tesisleri Yönetmeliği’ne göredir; uygulamadan önce güncel metni kontrol et.' }
      ]},
      { id: 'formul', kisa: 'Formül', baslik: 'Formül', bloklar: [
        { tip: 'formul', formul: '%e = 100·k·L·I ÷ (γ·S·U)',
          tanimlar: [
            ['k', 'Tek fazda 2, üç fazda √3 ≈ 1,73'],
            ['L', 'Hat uzunluğu (m), tek yön'],
            ['I', 'Akım (A)'],
            ['γ', 'İletkenlik: bakır 56, alüminyum 35 m/(Ω·mm²)'],
            ['S', 'Kesit (mm²)'],
            ['U', 'Tek fazda 230 V, üç fazda 400 V']
          ],
          kural: 'Hesap cos φ = 1 kabulüyle yapılır; küçük kesitlerde sonuç biraz yüksek çıkar, yani güvenli taraftadır.' },
        { tip: 'hatalar', hatalar: [
          ['Uzunluğu gidiş-dönüş diye iki kez saymak', 'Formüldeki 2 katsayısı dönüş iletkenini zaten içerir. Doğrusu: L tek yön uzunluk.'],
          ['Motor kalkışındaki düşümü unutmak', 'Kalkışta akım birkaç kat büyür, düşüm de büyür; kontaktör bırakabilir. Doğrusu: uzun motor hatlarında kalkışı da kontrol et.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Kablo', 'Multimetre', 'Otomatik sigorta (MCB)'] }
      ]}
    ]
  },
  'topraklama-sistemleri': {
    baslik: 'Topraklama sistemleri',
    giris: 'Topraklama sistemi, nötrün ve cihaz gövdelerinin toprağa nasıl bağlandığını anlatır. Sistemi bilmeden doğru koruma elemanı seçilemez.',
    etiketler: ['TN-S', 'TN-C-S', 'TT'],
    bolumler: [
      { id: 'sema', kisa: 'Sistemler', baslik: 'Üç yaygın sistem', bloklar: [
        { tip: 'sema', svg: 'topraklama',
          lejant: [['l', 'L'], ['n', 'N'], ['pe', 'PE'], ['pen', 'PEN']],
          not: 'İlk harf trafo tarafını (T: doğrudan topraklı), ikinci harf gövdeleri (N: nötre bağlı, T: ayrı toprak) anlatır.' }
      ]},
      { id: 'ozellik', kisa: 'Özellikler', baslik: 'Özellikler', bloklar: [
        { tip: 'tablo', satirlar: [
          ['TN-S', '', 'Nötr ve koruma iletkeni baştan sona ayrı. En temiz sistem.'],
          ['TN-C', '', 'Nötr ve koruma tek iletkende (PEN). Kaçak akım rölesi PEN’li kısımda çalışmaz.'],
          ['TN-C-S', '', 'Şebekeden PEN gelir, bina girişinde N ve PE’ye ayrılır; ayrıldıktan sonra bir daha birleştirilmez.'],
          ['TT', '', 'Cihaz gövdeleri binanın kendi topraklamasına bağlıdır. Kaçak akım rölesi şarttır.']
        ]}
      ]},
      { id: 'pe', kisa: 'PE kesiti', baslik: 'PE kesiti', bloklar: [
        { tip: 'tablo', satirlar: [
          ['S ≤ 16 mm²', '', 'PE = S (faz kesiti kadar)'],
          ['16 < S ≤ 35 mm²', '', 'PE = 16 mm²'],
          ['S > 35 mm²', '', 'PE = S ÷ 2']
        ]},
        { tip: 'not', metin: 'PE, faz iletkeniyle aynı malzemeden olduğunda geçerlidir (IEC 60364-5-54).' }
      ]},
      { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
        { tip: 'hatalar', hatalar: [
          ['Ayrılma noktasından sonra N ile PE’yi birleştirmek', 'Nötr akımı PE’den ve metal yapılardan akar; kaçak akım rölesi atar. Doğrusu: ayrıldıktan sonra N ve PE hep ayrı.'],
          ['PEN iletkenini sigortadan ya da anahtardan geçirmek', 'PEN kesilirse gövdeler gerilim altında kalabilir. Doğrusu: PEN hiçbir zaman kesilmez.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Kaçak akım rölesi (RCD)', 'Toprak barası', 'Nötr barası', 'Topraklama ölçer'] }
      ]}
    ]
  },
  'kablo-renkleri': {
    baslik: 'Kablo renkleri',
    giris: 'Renkler iletkenin görevini söyler. Güç devresinde IEC 60445, makine panolarında kumanda devreleri için EN 60204-1 kullanılır.',
    etiketler: ['IEC 60445', 'EN 60204-1', 'Tel numarası'],
    bolumler: [
      { id: 'guc', kisa: 'Güç', baslik: 'Güç devresi (IEC 60445)', bloklar: [
        { tip: 'renkler', satirlar: [
          ['L1', '#7A4A22', 'Kahverengi'], ['L2', '#16181B', 'Siyah'], ['L3', '#9AA0A6', 'Gri'],
          ['N', '#5B9BD5', 'Mavi'], ['PE', 'linear-gradient(90deg,#4E8A2A 50%,#E0C21A 50%)', 'Sarı-yeşil'], ['PEN', 'linear-gradient(90deg,#4E8A2A 34%,#E0C21A 34% 67%,#5B9BD5 67%)', 'Sarı-yeşil, uçları mavi']
        ]}
      ]},
      { id: 'kumanda', kisa: 'Kumanda', baslik: 'Makine panosu (EN 60204-1)', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Siyah', '', 'AC ve DC güç devreleri.'],
          ['Kırmızı', '', 'AC kumanda devreleri.'],
          ['Mavi', '', 'DC kumanda devreleri.'],
          ['Turuncu', '', 'Dışarıdan beslenen kilitleme devreleri; ana şalter kapansa da gerilimli kalabilir.'],
          ['Açık mavi', '', 'Nötr.'],
          ['Sarı-yeşil', '', 'Koruma iletkeni.']
        ]},
        { tip: 'not', metin: 'Bu renkler önerilir; birçok firma kendi standardını kullanır. Pano şemasındaki renk açıklamasına bak.' }
      ]},
      { id: 'isaret', kisa: 'İşaretleme', baslik: 'İşaretleme', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Her iletkenin iki ucuna aynı tel numarasını tak.',
          'Numarayı şemadaki klemens ya da potansiyel numarasıyla eşleştir.',
          'Çok telli iletkende yüksük kullan; uygun pensle sık.',
          'Dışarıdan beslenen (turuncu) devreleri pano kapağında uyarı etiketiyle belirt.'
        ]},
        { tip: 'hatalar', hatalar: [
          ['Sarı-yeşil iletkeni başka amaçla kullanmak', 'Sarı-yeşil yalnızca koruma iletkenidir; faz olarak kullanılırsa ölümcül hata olur. Doğrusu: sarı-yeşil her zaman PE.'],
          ['Mavi iletkeni AC faz olarak kullanmak', 'Nötr sanılıp gerilim altındayken tutulabilir. Doğrusu: renkleri standarda ya da pano şemasına göre kullan.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Kablo yüksüğü', 'Tel numarası', 'Klemens', 'Kablo kanalı'] }
      ]}
    ]
  },
});
