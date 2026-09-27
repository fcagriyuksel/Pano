/* Kumanda devreleri: konu tanımı ve bilgi sayfaları. */
VERI.konular.push({
  id: 'kumanda-devreleri', ad: 'Kumanda devreleri', ikon: 'kumanda',
  ozet: 'Mühürleme, kilitleme, ileri-geri, yıldız-üçgen',
  giris: 'Kumanda devresi, kontaktörlerin ne zaman ve hangi sırayla çekeceğini belirler. Buradaki simülasyonlarda butonlara basıp akımın yolunu izleyebilirsin.',
  altlar: [
    { id: 'muhurleme', kod: 'S1', ad: 'Mühürleme (start-stop)', alt: 'Kendini tutma devresi · simülasyon', sayfa: 'muhurleme' },
    { id: 'ileri-geri', kod: 'İ/G', ad: 'İleri-geri ve kilitleme', alt: 'Elektriksel kilitleme · simülasyon', sayfa: 'ileri-geri' },
    { id: 'yildiz-ucgen', kod: 'Y/Δ', ad: 'Yıldız-üçgen yol verme', alt: 'Zaman rölesiyle geçiş · simülasyon', sayfa: 'yildiz-ucgen' },
    { id: 'kumanda-semalari', kod: 'IEC', ad: 'Kumanda şeması okuma', alt: 'Semboller, harf kodları, kontak numaraları', sayfa: 'kumanda-semalari' }
  ]
});

Object.assign(VERI.sayfalar, {
  'muhurleme': {
    baslik: 'Mühürleme (start-stop)',
    giris: 'Start butonu bırakılınca da kontaktörün çekili kalması için kontaktörün kendi NO kontağı start butonuna paralel bağlanır. Buna mühürleme denir.',
    etiketler: ['Kendini tutma', '13-14', 'Simülasyon'],
    bolumler: [
      { id: 'sim', kisa: 'Simülasyon', baslik: 'Simülasyon', bloklar: [
        { tip: 'sim', tur: 'muhurleme' }
      ]},
      { id: 'nasil', kisa: 'Nasıl çalışır', baslik: 'Nasıl çalışır', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Start butonuna (S1) basılınca akım F2, S0 ve S1 üzerinden K1 bobinine gider.',
          'K1 çeker, 13-14 kontağı kapanır ve S1’i köprüler.',
          'S1 bırakılsa da akım 13-14 üzerinden geçer; K1 çekili kalır.',
          'Stop butonuna (S0) basılınca devre açılır, K1 düşer ve 13-14 de açılır.',
          'Termik (95-96) atarsa da devre açılır ve motor durur.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Motor start bırakılınca duruyor', satirlar: [
          ['Mühürleme kontağı bağlı değil', 'Kontrol: 13-14’ün S1’e paralel bağlandığını kontrol et. Simülasyonda mühürlemeyi sökerek dene.'],
          ['Yanlış kontak kullanılmış (21-22)', 'Kontrol: mühürleme için NO kontak (13-14) gerekir.'],
          ['Kontak arızalı', 'Kontrol: K1 çekiliyken 13-14 arasında süreklilik ölç.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Stop butonunu NO bağlamak', 'Buton kablosu koparsa stop çalışmaz. Doğrusu: stop butonu NC bağlanır.'],
          ['Mühürleme kontağını start butonuna seri bağlamak', 'Devre hiç çalışmaz. Doğrusu: start butonuna paralel.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Kontaktör', 'Start/stop butonu', 'Termik röle', 'Sinyal lambası'] }
      ]}
    ]
  },
  'ileri-geri': {
    baslik: 'İleri-geri ve kilitleme',
    giris: 'Asenkron motorun yönü iki fazın yeri değiştirilerek çevrilir. İki kontaktör aynı anda çekerse faz-faz kısa devre olur; bunu kilitleme önler.',
    etiketler: ['Elektriksel kilitleme', 'Mekanik kilit', 'Simülasyon'],
    bolumler: [
      { id: 'sim', kisa: 'Simülasyon', baslik: 'Kumanda simülasyonu', bloklar: [
        { tip: 'sim', tur: 'ileriGeri' }
      ]},
      { id: 'guc', kisa: 'Güç devresi', baslik: 'Güç devresi', bloklar: [
        { tip: 'sema', svg: 'ileriGeriGuc',
          lejant: [['l', 'L1'], ['l2', 'L2'], ['l3', 'L3']],
          isaretler: [
            ['K1 (ileri)', 'L1-L2-L3’ü motora sırasıyla verir.'],
            ['K2 (geri)', 'L1 ile L3’ün yerini değiştirir; motor ters döner.'],
            ['Mekanik kilit', 'İki kontaktör arasındaki kilit; biri çekiliyken diğeri fiziksel olarak kapanamaz.']
          ] }
      ]},
      { id: 'kilit', kisa: 'Kilitleme', baslik: 'Kilitleme türleri', bloklar: [
        { tip: 'tablo', satirlar: [
          ['Elektriksel', '', 'Her kontaktörün NC kontağı (21-22) diğerinin bobinine seri bağlanır.'],
          ['Buton', '', 'İleri butonunun NC kontağı geri devresine, geri butonununki ileri devresine seri bağlanır.'],
          ['Mekanik', '', 'Kontaktörler arasına takılan kilit. Kontak yapışsa bile ikincisinin kapanmasını engeller.']
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Yön değiştirirken sigorta atıyor', satirlar: [
          ['Elektriksel kilitleme yok ya da yanlış', 'Kontrol: K1 21-22’nin K2 bobinine, K2 21-22’nin K1 bobinine seri olduğunu kontrol et.'],
          ['Kontak yapışmış', 'Kontrol: enerjisizken ana kontakları kontrol et.'],
          ['Motor dönerken ters yöne geçiliyor', 'Olası neden: ters akımla frenleme. Kontrol: geçişte bekleme ekle ya da kontaktörü AC-4’e göre seç.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['Yalnızca buton kilitlemesine güvenmek', 'Kontak yapışırsa buton kilidi kısa devreyi önlemez. Doğrusu: elektriksel ve mekanik kilit birlikte.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Kontaktör', 'Mekanik kilit', 'Termik röle', 'Start/stop butonu'] }
      ]}
    ]
  },
  'yildiz-ucgen': {
    baslik: 'Yıldız-üçgen yol verme',
    giris: 'Motor önce yıldız bağlı kalkar, belirli süre sonra üçgene geçer. Yıldızda sargı gerilimi √3 kat düşük olduğundan kalkış akımı ve torku yaklaşık üçte bire iner.',
    etiketler: ['K1 · K2 · K3', 'Zaman rölesi', 'Simülasyon'],
    bolumler: [
      { id: 'sim', kisa: 'Simülasyon', baslik: 'Geçiş simülasyonu', bloklar: [
        { tip: 'sim', tur: 'yildizUcgen' }
      ]},
      { id: 'guc', kisa: 'Kontaktörler', baslik: 'Kontaktörler ne bağlar', bloklar: [
        { tip: 'tablo', satirlar: [
          ['K1 ana', '', 'L1-L2-L3’ü U1-V1-W1’e verir; kalkıştan duruşa kadar çekilidir.'],
          ['K2 yıldız', '', 'U2-V2-W2’yi birbirine bağlar (yıldız noktası); yalnızca kalkışta çeker.'],
          ['K3 üçgen', '', 'L1→W2, L2→U2, L3→V2 bağlar; yıldızdan sonra çeker.'],
          ['F2 termik', '', 'U1-V1-W1 kolunda sargı akımını görür; ayar = motor anma akımı × 0,58.']
        ]}
      ]},
      { id: 'hesap', kisa: 'Kalkış', baslik: 'Kalkışta ne değişir', bloklar: [
        { tip: 'formul', formul: 'I(Y) ≈ I(Δ) ÷ 3',
          tanimlar: [
            ['Gerilim', 'Yıldızda her sargıya 400 ÷ √3 ≈ 230 V düşer.'],
            ['Akım', 'Hat akımı direkt kalkışın yaklaşık üçte biridir.'],
            ['Tork', 'Kalkış torku da yaklaşık üçte bire iner; yüklü kalkışta motor zorlanabilir.']
          ],
          kural: 'Yıldız-üçgen için motor, şebeke geriliminde üçgen çalışacak etiketli olmalı: 400 V şebekede 400/690 V.' }
      ]},
      { id: 'ayar', kisa: 'Ayar', baslik: 'Ayar', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Termiği motor anma akımı × 0,58’e ayarla (termik sargı kolundaysa).',
          'Zaman rölesini motorun anma devrine yaklaşma süresine ayarla; çoğu uygulamada birkaç saniye.',
          'Yıldızdan üçgene geçişte kısa bir bekleme bırak; K2 ve K3 aynı anda çekmemeli.',
          'K2 ile K3 arasına elektriksel ve mekanik kilit koy.'
        ]}
      ]},
      { id: 'ariza', kisa: 'Arıza', baslik: 'Arıza ve sık yapılan hatalar', bloklar: [
        { tip: 'ariza', belirti: 'Üçgene geçerken sigorta ya da termik atıyor', satirlar: [
          ['Geçiş çok erken', 'Kontrol: süreyi uzat; motor hızlanmadan üçgene geçerse akım yükselir.'],
          ['K2 ile K3 aynı anda çekiyor', 'Kontrol: kilitleme kontaklarını ve geçiş aralığını kontrol et.'],
          ['Motor etiketi uygun değil', 'Kontrol: 400 V şebekede 400/690 V etiketli olmalı.'],
          ['Yük kalkışta ağır', 'Kontrol: yumuşak yol verici ya da VFD düşün.']
        ]},
        { tip: 'hatalar', hatalar: [
          ['230/400 V etiketli motora yıldız-üçgen uygulamak', 'Üçgende sargılara 400 V düşer, motor yanar. Doğrusu: 400/690 V etiketli motor.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Kontaktör', 'Zaman rölesi', 'Termik röle', 'Mekanik kilit'] }
      ]}
    ]
  },
  'kumanda-semalari': {
    baslik: 'Kumanda şeması okuma',
    giris: 'Kumanda şeması devreyi enerjisiz ve butonlara basılmamış hâliyle gösterir. Harf kodu elemanın türünü, numaralar kontağın yerini söyler.',
    etiketler: ['IEC 60617', 'IEC 81346', 'Kontak numaraları'],
    bolumler: [
      { id: 'sema', kisa: 'Semboller', baslik: 'Temel semboller', bloklar: [
        { tip: 'sema', svg: 'semboller', not: 'NC kontak şemada kapalı çizilir; bobin çekince açılır. Butondaki kesik çizgi elle basmayı gösterir.' }
      ]},
      { id: 'harf', kisa: 'Harf kodları', baslik: 'Harf kodları', bloklar: [
        { tip: 'tablo', satirlar: [
          ['-K', '', 'Kontaktör, röle, zaman rölesi. Yeni IEC 81346’da güç kontaktörü -Q ile gösterilir.'],
          ['-S', '', 'Buton, anahtar, sınır anahtarı.'],
          ['-F', '', 'Sigorta, termik röle, koruma elemanı.'],
          ['-Q', '', 'Şalter, motor koruma şalteri.'],
          ['-M', '', 'Motor.'],
          ['-H', '', 'Sinyal lambası, korna. Yeni IEC 81346’da -P ile gösterilir.']
        ]}
      ]},
      { id: 'numara', kisa: 'Numaralar', baslik: 'Kontak numaraları', bloklar: [
        { tip: 'tablo', satirlar: [
          ['A1-A2', '', 'Bobin uçları.'],
          ['1-2 · 3-4 · 5-6', '', 'Ana kontaklar.'],
          ['x1-x2', '', 'Yardımcı NC kontak; x sıra numarasıdır (ör. 21-22).'],
          ['x3-x4', '', 'Yardımcı NO kontak (ör. 13-14).'],
          ['95-96 · 97-98', '', 'Termik rölenin NC ve NO kontakları.'],
          ['15-16-18', '', 'Zaman rölesi: ortak, NC, NO.']
        ]}
      ]},
      { id: 'okuma', kisa: 'Okuma', baslik: 'Şemayı okuma sırası', bloklar: [
        { tip: 'adimlar', satirlar: [
          'Şema enerjisiz ve butonlara basılmamış hâlde çizilir.',
          'Akım yolunu yukarıdaki L’den aşağıdaki N’ye (ya da +24 V’tan 0 V’a) doğru izle.',
          'Bir bobin çekince aynı harf koduna sahip bütün kontakların konum değiştirdiğini düşün.',
          'Bobinin altındaki kontak tablosu, o kontaktörün kontaklarının hangi sayfada ve hangi yolda olduğunu gösterir.'
        ]},
        { tip: 'hatalar', hatalar: [
          ['Şemadaki kontağı çekili hâl sanmak', 'Şema her zaman enerjisiz hâli gösterir. Doğrusu: bobin çekince NO’nun kapandığını, NC’nin açıldığını kafanda uygula.']
        ]}
      ]},
      { id: 'parcalar', kisa: 'Parçalar', baslik: 'Birlikte kullanılır', bloklar: [
        { tip: 'parcalar', parcalar: ['Kontaktör', 'Buton', 'Termik röle', 'Zaman rölesi'] }
      ]}
    ]
  },
});
