# PANO — proje kılavuzu

PANO, Furkan Çağrı YÜKSEL’in elektrik-elektronik ve endüstriyel otomasyon bilgi notları uygulamasıdır. Telefonun ana ekranına eklenen bir PWA’dır ve GitHub Pages’ten yayınlanır. Dil Türkçedir.

Canlı adres: https://fcagriyuksel.github.io/Pano/ (deponun kökü yayınlanır).

Kaynak `kaynak/` klasöründe konu ve türe göre küçük dosyalara bölünmüştür. `araclar/derle.py` bunları birleştirip tek dosyalık `index.html` üretir.

## Altın kurallar (kullanıcının)

- Optimize, hatasız, geliştirmeye açık. Bir hata düzeltildiğinde aynı hatanın başka nerede çıkabileceğine de bak.
- Türkçe yazım doğru olmalı. Kısa, doğrudan, yapmacık olmayan cümleler kullan.
- Kullanıcı odaklı, pratik ve şematik ol. Her sayfada görsel olsun: şema, hesaplayıcı, simülasyon.
- Değerler saha ve standartlarla uyumlu olmalı (IEC/EN, Elektrik İç Tesisleri Yönetmeliği). Emin olmadığın değeri yazma.
- Proje her zaman düzenli kalmalı: her iş için ne yapılacağı `belgeler/` altında yazılı olmalı. Yeni bir iş türü eklenirse rehberini de yaz; akış değişirse rehberi güncelle.
- Çalışırken gözüne çarpan eksik bilgiyi, yazım hatasını ve bilgi yanlışlığını, konu dışı olsa bile düzelt. Emin değilsen değiştirme; kullanıcıya sor. Yaptığın düzeltmeleri commit mesajında ve kullanıcıya verdiğin özette ayrıca belirt.
- Hatalardan ders al, aynı hatayı tekrarlama. Oturumlar arasında hafıza yoktur; ders ancak yazılırsa kalır. Bir hatayı bulup düzelttiğinde nedenini ve önlemini ilgili rehberin “Tuzaklar” bölümüne ya da bu dosyadaki “Genel tuzaklar” listesine ekle. İşe başlarken o listeleri oku.

## Kullanıcının tercihleri

- Düzenlemeleri yalnızca Claude Code yapar. Kullanıcı dosyaları elle ya da claude.ai sohbetinde düzenlemez.
- Değişiklikler şimdilik doğrudan `main` dalına gönderilir (PR açılmaz). Göndermeden önce `python3 araclar/kontrol.py` temiz olmalı.
- 3B modeller uygulamanın görsel dilinde olur: gerçek biçim ve oranlar, sade malzeme, uygulamanın renkleri, numaralı parçalar. Aşırı gerçekçilik yerine telefonda akıcılık.
- Kullanıcı teknik terimlerde (PR, dal vb.) açıklamaya ihtiyaç duyabilir; kısa ve sade anlat.

## Klasör düzeni

```
kaynak/                     ELLE DÜZENLENEN TEK YER
  sablon.html               index.html iskeleti
  gizlilik.html, sw.js, manifest.webmanifest   diğer yayın dosyalarının şablonları
  stil/NN-*.css             stil (01 belirteçler … 99 hareket azaltma)
  govde/NN-*                gövde parçaları: uygulama kabı, erken betik, açılış ekranı, alt menü
  ortak/NN-*.js             genel kapsam: sayi(), kayıtlar, ayarlar (sürüm), metinler, şema araçları
  konular/NN-konu/          konu başına: konu.js, semalar.js, hesaplar.js, simler.js, modeller.js
  uygulama/NN-*.js          uygulama kodu (tek IIFE): simgeler, dizin, arama, yönlendirme, ekranlar, bloklar, 3B modeller, olaylar
varliklar/                  sabit dosyalar: yazitipleri/, simgeler/, kutuphane/ (Three.js), LISANSLAR.md
araclar/                    derle.py, kontrol.py, simge_olustur.py, three_olustur.py
test/                       test_icerik.js (tarayıcısız), test_sayfalar.py (Playwright)
belgeler/                   iş başına rehberler
index.html, privacy.html, manifest.webmanifest, sw.js   DERLENİR, elle düzenleme
```

Dosya adlarındaki `NN-` önekleri birleştirme sırasını belirler.

## Hangi iş, hangi rehber

İşe başlamadan önce ilgili rehberi oku.

| İş | Rehber |
|---|---|
| Konu, alt başlık, bilgi sayfası | `belgeler/yeni-sayfa.md` |
| Şema | `belgeler/sema.md` |
| Hesaplayıcı | `belgeler/hesaplayici.md` |
| Simülasyon | `belgeler/simulasyon.md` |
| 3B model | `belgeler/model-3b.md` |
| Renk, yazı tipi, bileşen | `belgeler/gorunum.md` |
| Simge ve açılış efekti | `belgeler/simge-ve-acilis.md` |
| Derleme, test, yayın, Play Store notları | `belgeler/yayin.md` |
| Yazım kuralları | `belgeler/yazim.md` |

## Değişiklik akışı

1. `kaynak/` altında düzenle.
2. Anlamlı bir değişiklikte `kaynak/ortak/30-ayarlar.js` içindeki `surum` değerini artır.
3. `python3 araclar/kontrol.py` (içerik testi + iki temada sayfa testi + yayın dosyaları güncel mi).
4. `python3 araclar/derle.py`.
5. Commit at ve `main` dalına gönder. GitHub Pages birkaç dakikada yayınlar; telefon internet varken bir sonraki açılışta yeni sürümü alır.

## Commit öncesi kontrol listesi

- [ ] `python3 araclar/kontrol.py` temiz.
- [ ] Yeni ya da değişen şema, simülasyon ve modellerin ekran görüntüleri açık ve koyu temada kontrol edildi (`python3 test/test_sayfalar.py --sayfa <id> --ekran /tmp/ekran`).
- [ ] Arama yeni içeriği buluyor.
- [ ] `surum` artırıldı, `python3 araclar/derle.py` çalıştırıldı.
- [ ] Akış ya da yapı değiştiyse ilgili rehber ve bu dosya güncellendi.

## Genel tuzaklar

- SVG sunum özniteliklerinde `var()` çalışmaz (`fill="var(--x)"`); her zaman `style` kullan.
- Betikle toplu metin değiştirirken eşleşme sayısını kontrol et (çoğunlukla tam 1 olmalı), sonra derle: derleme söz dizimini `node --check` ile denetler.
- Yorumun içine `*/` yazma (ör. `konular/*/simler.js` yorumu erken kapatır). `konular/<konu>/simler.js` yaz.
- Arama, katlama tablosuyla tire türlerini eşitler (`4-20` = `4–20`); katlama tek karakteri tek karakterle değiştirmeli, yoksa vurgulama kayar.
- Erken betik (`govde/02-erken-betik.js`) seçili temayı `data-theme`’ye yazar; dışarıdan gelen asıl değer `data-ilk-tema`’da saklanır (`temaUygula` bunu okur).
- Uygulama kodu tek IIFE içindedir; `uygulama/` dosyaları aynı kapsamı paylaşır. Sıra önemlidir: bir dosya, kendinden sonra gelen dosyanın sabitini yükleme anında kullanamaz.
- Konu dosyaları (`konular/`) genel kapsamdadır. Yardımcı sabit gerekiyorsa dosyayı IIFE içine al; yoksa başka konunun aynı adlı sabitiyle çakışır.
- Şablonlardaki yer tutucuları (`{{STIL}}`, `__SURUM__` …) yorumlarda bile yazma; derleme her geçtiği yere değer yazar. Derleme artık bunu denetler.
- Ekran görüntüsü betiğinde sürükleme miktarı 0 ise tarayıcı bunu dokunuş sayar; 3B modelde parça seçilir ve görüntü yanıltır.
- Değişiklikten sonra yalnızca testlere güvenme: şema, açılış ve 3B modelde iki temada ekran görüntüsü al ve bak. Z-fighting, taşma, beyaza kaçan ışık gibi hatalar testte görünmez.

## Konular ve fikirler

Mevcut: 13 konu, 70 sayfa, 62 şema, 24 hesaplayıcı, 8 simülasyon, 3 3B model (step motor, servo motor, step sürücü).

Sıradaki 3B modeller (kullanıcının sırasıyla): otomatik sigorta (bimetal, manyetik bobin, ark hücresi), PLC; ardından öbür konular için de 3B modeller.

Kullanıcıya önerilen ama henüz seçilmeyen konular: makine güvenliği (acil stop, güvenlik rölesi, PL, STO, ışık perdesi) ve pano tasarımı (IP/IK, ısı hesabı, EMC, işaretleme). Kompanzasyon, parafudr (SPD) ve temel formüller de aday konulardır.
