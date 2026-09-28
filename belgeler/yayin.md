# Derleme, test ve yayın

## Kurulum (bir kez)

- Node.js 18 ya da üstü, Python 3.10 ya da üstü.
- Sayfa testi için Playwright: `pip install playwright` ve `python3 -m playwright install chromium`. Ortamda Chromium hazırsa kurulum gerekmez; Playwright sürümü o Chromium’la uyumlu olmalı.

## Komutlar

```
python3 araclar/derle.py                  # kaynak/ → index.html, privacy.html, manifest.webmanifest, sw.js
python3 araclar/kontrol.py                # içerik testi + sayfa testi + yayın dosyaları güncel mi
python3 araclar/kontrol.py --hizli        # tarayıcısız denetim
node test/test_icerik.js                  # hesaplayıcı kombinasyonları, referanslar, kimlikler
python3 test/test_sayfalar.py             # bütün sayfalar, iki tema, 360 px
python3 test/test_sayfalar.py --sayfa pid --ekran /tmp/ekran   # seçili sayfaların şema görüntüleri
python3 araclar/simge_olustur.py          # uygulama simgeleri
python3 araclar/three_olustur.py          # Three.js alt kümesi (npm ve internet gerekir) → model-3b.md
```

## Değişiklik akışı

1. `kaynak/` altında düzenle (hangi dosya: ilgili rehber).
2. Anlamlı bir değişiklikte `kaynak/ortak/30-ayarlar.js` içindeki `surum` değerini artır. Ayarlar › Hakkında’da görünür.
3. `python3 araclar/kontrol.py` temiz olmalı.
4. `python3 araclar/derle.py` ile yayın dosyalarını üret.
5. Commit at ve gönder. GitHub Pages depo kökünü birkaç dakikada yayınlar.

Yayın dosyaları (`index.html`, `privacy.html`, `manifest.webmanifest`, `sw.js`) **derlenir, elle düzenlenmez**. Kökte dururlar çünkü GitHub Pages depo kökünü yayınlar. `.nojekyll` dosyası Pages’in Jekyll işlemesini kapatır.

## Derleme nasıl çalışır

`araclar/derle.py` parçaları dosya adındaki sırayla (01-, 10- …) birleştirir:

```
kaynak/sablon.html        sayfa iskeleti ({{SURUM}}, {{YAZITIPLERI}}, {{STIL}}, {{GOVDE}}, {{BETIK}})
kaynak/stil/*.css         → <style>
kaynak/govde/*            → <body>; .js parçaları <script> içine alınır
kaynak/ortak/*.js         → genel kapsam: sayi(), kayıtlar (VERI, SEMALAR, HESAPLAR, SIMLER, MODELLER), ayarlar, metinler, şema araçları
kaynak/konular/NN-*/      → konu.js, semalar.js, hesaplar.js, simler.js, modeller.js
kaynak/uygulama/*.js      → tek bir IIFE içinde ('use strict')
```

- Birleşen betikte her dosyanın başında `/* ---- kaynak/…/dosya.js ---- */` yazar. Tarayıcıdaki bir hata satırının hangi dosyadan geldiği buradan bulunur.
- Birleşen betik `node --check` ile denetlenir. Söz dizimi hatası varsa hiçbir dosya yazılmaz.
- Betikte geçen her `varliklar/…` yolu diskte var olmalı; yoksa derleme durur.
- `kaynak/sw.js` içinde `__SURUM__` ve `__DOSYALAR__` tam bir kez geçmeli. Yorumda bile yazma: derleme her geçtiği yere değer yazar.
- `privacy.html`, `kaynak/gizlilik.html` şablonundan ve `METINLER.gizlilik` metninden üretilir.
- `sw.js`, `kaynak/sw.js` şablonundan üretilir. Önbellek adı her derlemede değişir (`otomasyon-notlari-YYYYAAGGSSDD`). Etkinleşince yalnızca bu önekle ya da eski `pano-` önekiyle başlayan önbellekleri siler; aynı adresteki başka uygulamalara dokunmaz. `varliklar/` altındaki bütün `.woff2`, `.png`, `.js` dosyaları kendiliğinden önbellek listesine girer.
- `--cikti DIR` başka klasöre derler. Testler bunu kullanır ve depodaki yayın dosyalarına dokunmaz.

## Telefonda güncelleme

- Service worker HTML için önce ağı dener (3,5 sn zaman aşımı), sonra önbelleğe düşer. İnternet varken uygulama bir sonraki açılışta yeni sürümü alır.
- `varliklar/` altındaki dosyalar önce önbellekten gelir. Aynı adla değişen bir dosya, yeni derlemenin önbelleği yenilemesiyle güncellenir. Kütüphanelerin sürümü klasör adındadır (`varliklar/kutuphane/three-0.186.1/`); sürüm değişince yol da değişir ve telefonlar yeni dosyayı kendiliğinden alır.
- Güncelleme görünmüyorsa uygulamayı tamamen kapatıp yeniden aç.

## Premium ve Play Store (ertelendi)

Altyapı hazır ama kapalı.

- `kaynak/ortak/30-ayarlar.js`: `premium.kilit = false`. `python3 araclar/derle.py --kilit` kilidi açık derler.
- `eposta: '[İLETİŞİM E-POSTASI]'`: kullanıcı ayrı bir adres açacak.
- Mağaza dosyaları (magaza/) şimdilik depoda değil, kullanıcının bilgisayarındaki proje zip’inde. Metinler güncel; ekran görüntüleri ve tanıtım görseli eski sürümden kaldı, yayından önce yenilenmeli.
- Play için notlar (Eylül 2026 itibarıyla): hedef API 36; yeni kişisel hesapta 12 test kullanıcısıyla 14 gün kapalı test; dijital içerikte Play Billing zorunlu, satın alma 72 saat içinde sunucu tarafında onaylanmalı (doğrulama sunucusu gerekir); TWA için alan adının kökünde `assetlinks.json` gerekir (github.io/otomasyon-notlari alt yolu uygun değil, alan adı gerekir).
