# PANO — proje kılavuzu

PANO, Furkan Çağrı YÜKSEL’in elektrik-elektronik ve endüstriyel otomasyon bilgi notları uygulamasıdır. Tek dosyalık bir HTML uygulamasıdır (PWA). GitHub Pages’ten yayınlanır ve telefonun ana ekranına eklenerek kullanılır. Dil Türkçedir.

Canlı adres: https://fcagriyuksel.github.io/Pano/ (bu deponun kökü yayınlanır).

## Altın kurallar (kullanıcının)

- Optimize, hatasız, geliştirmeye açık. Bir hata düzeltildiğinde aynı hatanın başka nerede çıkabileceğine de bak.
- Türkçe yazım doğru olmalı. Kısa, doğrudan, yapmacık olmayan cümleler kullan.
- Kullanıcı odaklı, pratik ve şematik ol. Her sayfada görsel olsun: şema, hesaplayıcı ya da simülasyon.
- Değerler saha ve standartlarla uyumlu olmalı (IEC/EN, Elektrik İç Tesisleri Yönetmeliği). Emin olmadığın değeri yazma.

## Dosya düzeni

Depoda klasör yok; her şey kökte durur (GitHub Pages kökü yayınlar).

```
pano-kaynak.html       TEK ANA KAYNAK: içerik + stil + kod (elle düzenlenen tek dosya)
pwa_olustur.py         pano-kaynak.html → yayın dosyaları
test_hesaplar.js       bütün hesaplayıcı kombinasyonları
test_sayfalar.py       bütün sayfalar, iki tema, taşma ve hata kontrolü
index.html             DERLENİR, elle düzenleme
privacy.html           DERLENİR
manifest.webmanifest   DERLENİR
sw.js                  DERLENİR (önbellek sürümü her derlemede değişir)
*.woff2, *.png         yazı tipleri ve simgeler (sabit)
CLAUDE.md, README.md
```

`pano-kaynak.html` doctype içermez: claude.ai Artifact gövdesi olarak da yayınlanabilir. Yayın sürümü `pwa_olustur.py` ile üretilir. Bu sırada Google Fonts bağlantıları kökteki woff2 dosyalarıyla değiştirilir ve service worker eklenir.

Play Store görselleri ve metinleri (magaza/) şimdilik depoda değil, kullanıcının bilgisayarındaki proje zip’inde duruyor. Yayın zamanı gelince eklenir.

## Değişiklik akışı

1. `pano-kaynak.html` dosyasını düzenle.
2. Anlamlı bir değişiklikte `UYGULAMA.surum` değerini artır (Ayarlar › Hakkında’da görünür).
3. Testleri çalıştır (aşağıda).
4. `python3 pwa_olustur.py` ile yayın dosyalarını üret.
5. Commit at ve `main` dalına gönder. GitHub Pages birkaç dakikada yayınlar. Telefondaki uygulama internet varken bir sonraki açılışta yeni sürümü alır (service worker, HTML için önce ağı dener).

Eski sw.js dursa bile yalnızca index.html’in güncellenmesi yeter. Yine de her derlemede dört dosyayı birlikte gönder.

## Kodun yapısı (pano-kaynak.html)

Sırayla: CSS (tema belirteçleri `:root`, koyu tema iki kez tanımlı) → menü → `VERI` → `UYGULAMA` + `METINLER` → şema yardımcıları + `SEMALAR` → uygulama IIFE’si (`IKON`, `HESAPLAR`, `SIMLER`, dizinler, arama, premium, yönlendirme, ekranlar, bloklar, olaylar).

### İçerik: VERI

- `VERI.konular[]`: `{ id, ad, ikon, ozet, giris, filtreler?, altlar[] }`
- `altlar[]`: `{ id, kod, ad, alt, filtre?, sayfa }`. `sayfa` yoksa listede “Hazırlanıyor” görünür.
- `VERI.sayfalar[id]`: `{ baslik, giris, etiketler[], bolumler[] }`
- `bolumler[]`: `{ id, kisa (bölüm çipi), baslik, bloklar[] }`
- Blok tipleri:
  - `sema {svg, lejant?[[sınıf, ad]], isaretler?[[ad, metin]], not?}`: isaretler sırası şemadaki 1, 2, 3… numaralarıyla aynı olmalı.
  - `kartlar {kartlar[{ikon, baslik, etiket, metin}]}`: ikon, IKON’daki 28 px simgelerden biri.
  - `tablo {satirlar[[etiket, ''|'sig'|'dc', metin]]}`
  - `formul {formul, tanimlar[[k, v]], ornek?{baslik, satirlar[[k, v]]}, kural?}`
  - `aralik {baslik, eksen, max, adim, satirlar[{ad, bas, son, metin}], not?}`
  - `hesap {tur}`, `sim {tur}`
  - `ariza {belirti, satirlar[[neden, 'Kontrol: …']]}`
  - `hatalar {hatalar[[hata, '… Doğrusu: …']]}`
  - `adimlar {satirlar[]}`, `not {metin}`, `renkler {satirlar[[ad, cssRenk, renkAdı]]}`, `parcalar {parcalar[]}`
- Lejant sınıfları: `l l2 l3 n pe pen sig dc ink acc opt opt2 kacak hatch`.
- `VERI.ucretsiz`: premium kilidi açıldığında ücretsiz kalacak sayfalar.

### Şemalar: SEMALAR

- Genişlik her zaman `viewBox="0 0 318 H"`, `class="sema"`, `role="img"` ve açıklayıcı `aria-label` kullan.
- Renkleri öznitelikle değil, stil ile ver: `style="fill:var(--ink)"`. Belirteçler: `--ink --muted --line --card --svg-body --chip --rail --hatch --accent --signal --dc-plus --wire-l --wire-l2 --wire-l3 --wire-n --wire-pe --wire-pe2 --paper`. Siyah iletken için `--wire-l2` kullan (`--ink` koyu temada açık renk olur).
- Yardımcılar: `_no(x, y, n)` numaralı işaret, `_yazi(x, y, metin, {a, b, w, r})`, `_kutu(x, y, w, h, {rx, f, sw})`, `_tel(d, renk, {w, k})`, `_pe(d)`, `_cizgi(d)` noktalı kılavuz, `_kontak`, `_bobin`, `_lamba`, `_sig`, `_puls`.
- SEMALAR, uygulama IIFE’sinden önce çalışır; `sayi()` burada **yoktur**. Gerekirse yerel `toLocaleString('tr-TR')` kullan.
- Şema yazıları IBM Plex Mono’dur: karakter genişliği ≈ 0,6 × yazı boyutu. Taşma ve üst üste binme için genişliği hesapla, sonra ekran görüntüsüyle iki temada kontrol et.

### Hesaplayıcılar: HESAPLAR

`{ gruplar[{k, ad, v, s[[değer, etiket]]}], hesapla(d) → {sonuclar: 4 × [ad, değer], adimlar: [en az 2 satır]}, not }`

- Varsayılan `v` seçeneklerden biri olmalı (test bunu kontrol eder).
- Sayıları `sayi(n, ondalık)` ile yaz (tr-TR: 1.234,5). Negatif işaret için `−` kullan.
- `adimlar` satır sayısı değişebilir, uyarı satırı eklenebilir. Sonuç ve adımlar her seçimde yeniden çizilir.
- Seçenek etiketleri kısa olmalı; 4 düğmeli satırda ≈ 8 karakter.

### Simülasyonlar: SIMLER

`{ not, yeni() → durum, hesapla?(s), olay(s, olay, guncelle), tik?(s, dt), dugmeler(s) → [[olay, etiket, basılı?]], durum(s) → {metin, uyari?}, ciz(s) → svg }`

- `tik` varsa sayfa açıkken 100 ms’de bir çağrılır; sayfadan çıkınca durur.
- Anlık buton için `setTimeout` ile geri bırak ve `guncelle()` çağır (bkz. `muhurleme`, `valf52`).

## Yazım kuralları

- Tipografik kesme işareti kullan: `PLC’ye`, `V’ta`. Ek, kısaltmanın okunuşuna göre gelir: `mA’e`, `4 mA’de`, `16 A’den`, `1.600 A’e`.
- Ondalık ayırıcı virgül, binlik ayırıcı nokta: `2,5 mm²`, `27.648`.
- `hâl`, `hâlde` yazılır; “sadece” yerine “yalnızca” kullanılır.
- Terimler: izolasyon direnci, DIP anahtarı, yumuşak yol verici, döngüsel.
- Arıza satırı “Kontrol:” ile başlayıp eylemle sürer. Hata kartı “Doğrusu:” ile biter.
- Eğri ya da tip anlatılırken “B tipi” yerine “B eğrisi” yazılır; “D tipi” yalnızca DIAZED için kullanılabilir.

## Test

```
node test_hesaplar.js                               # bütün hesaplayıcı kombinasyonları
python3 test_sayfalar.py                            # bütün sayfalar, iki tema, 360 px
python3 test_sayfalar.py --sayfa pid --ekran /tmp/ekran   # şema görüntüleri
```

`test_sayfalar.py` için Playwright ve Chromium gerekir. Yoksa en azından JavaScript söz dizimini kontrol et: `pano-kaynak.html` içindeki `<script>` bloklarını ayır ve `node --check` ile dene.

## Commit öncesi kontrol listesi

- [ ] İki test de temiz.
- [ ] Yeni ya da değişen şemaların ekran görüntüleri açık ve koyu temada kontrol edildi: yazı taşması, üst üste binme, işaret numaraları.
- [ ] Arama yeni içeriği buluyor (dizin sayfa metninden otomatik oluşur).
- [ ] `UYGULAMA.surum` artırıldı, `python3 pwa_olustur.py` çalıştırıldı.

## Bilinen tuzaklar

- SVG sunum özniteliklerinde `var()` çalışmaz (`fill="var(--x)"`); her zaman `style` kullan.
- `sayi()` SEMALAR içinde tanımlı değildir.
- Betikle toplu metin değiştirdikten sonra `<script>` bloklarını `node --check` ile doğrula; eşleşme sayısını her zaman kontrol et (tam 1 olmalı).
- Arama, katlama tablosuyla tire türlerini eşitler (`4-20` = `4–20`); katlama tek karakteri tek karakterle değiştirmeli, yoksa vurgulama kayar.
- Hesap seçenek düğmelerinde bölünemeyen uzun metin taşar (CSS artık kırıyor; yine de kısa tut).
- Pnömatik valf sembolünde aktif kare portların altına kaydırılır; port x konumları sabittir.

## Premium ve Play Store (ertelendi)

Kullanıcı şimdilik yalnızca ana ekrandaki PWA’yı istiyor. Altyapı hazır ama kapalı:

- `UYGULAMA.premium.kilit = false`. `--kilit` bayrağıyla derlenince kilit açılır.
- `UYGULAMA.eposta = '[İLETİŞİM E-POSTASI]'`: kullanıcı ayrı bir adres açacak.
- Mağaza dosyaları (magaza/): metinler güncel. Ekran görüntüleri ve tanıtım görseli eski sürümden kaldı; yayından önce yenilenmeli.
- Play için notlar (Eylül 2026 itibarıyla): hedef API 36; yeni kişisel hesapta 12 test kullanıcısıyla 14 gün kapalı test; dijital içerikte Play Billing zorunlu, satın alma 72 saat içinde sunucu tarafında onaylanmalı (doğrulama sunucusu gerekir); TWA için alan adının kökünde `assetlinks.json` gerekir (github.io/Pano alt yolu uygun değil, alan adı gerekir).

## Konular ve fikirler

Mevcut: 13 konu, 67 sayfa, 24 hesaplayıcı, 8 simülasyon.

Kullanıcıya önerilen ama henüz seçilmeyen konular: makine güvenliği (acil stop, güvenlik rölesi, PL, STO, ışık perdesi) ve pano tasarımı (IP/IK, ısı hesabı, EMC, işaretleme). Kompanzasyon, parafudr (SPD) ve temel formüller de aday konulardır.
