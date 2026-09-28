# Güvenlik

Otomasyon Notları sunucusu olmayan, tek dosyalık bir PWA’dır. Hesap, form ya da kullanıcı içeriği yoktur. Saldırı yüzeyi küçüktür ama sıfır değildir: arama kutusu, tarayıcı deposu, service worker ve Play satın alması. Bu rehber, hangi önlemin nerede olduğunu ve yeni kod yazarken nelere uyulacağını anlatır.

## Önlemler

| Önlem | Nerede | Ne yapar |
|---|---|---|
| İçerik güvenlik ilkesi (CSP) | `araclar/derle.py` → `csp()`, `kaynak/sablon.html` | Yalnızca kendi dosyalarımız ve derlemede özeti alınmış satır içi `<script>` blokları çalışır. Araya sokulmuş betik, `onclick="…"` gibi olay öznitelikleri, `eval` ve dış adreslere bağlantı engellenir. |
| Gizlilik sayfası CSP’si | `kaynak/gizlilik.html` | Sayfada hiç betik çalışmaz. |
| Yönlendiren bilgisi | `<meta name="referrer" content="no-referrer">` | Dışarı gidilen adreslere hangi sayfadan gelindiği gönderilmez. |
| Kaçış (escape) | `esc()` (`uygulama/10-temel.js`), `vurgula()` | Arama sorgusu ve depodan okunan her metin HTML’e `esc()` ile girer. |
| Depo doğrulama | `uygulama/40-dizin-depo-durum.js` | Depodan okunan değerlerin türü denetlenir; bozuk ya da elle değiştirilmiş veri uygulamayı çökertmez. |
| Depo ve önbellek öneki | `DEPO_ONEK`, `sw.js` → `ONEK` | `fcagriyuksel.github.io` altındaki başka uygulamalarla anahtar çakışmaz; service worker yalnızca kendi önbelleğini siler. |
| Service worker kapsamı | `kaynak/sw.js` | Yalnızca aynı adresten gelen GET isteklerine karışır; başarısız yanıtı önbelleğe yazmaz. |
| Satın alma | `uygulama/60-premium.js` | Satın alma kodu sunucuda doğrulanır. Play listesinde olmayan (iade edilen) satın alma, açılışta kilidi yeniden kapatır. |
| Play derlemesi denetimi | `derle.py --kilit` → `yayin_hazir()` | E-posta ya da `https://` ile başlayan doğrulama adresi eksikse derleme durur. |
| Üçüncü taraf dosyaları | `varliklar/` | CDN yok; Three.js ve yazı tipleri depoda, sürümü klasör adında, lisansları `varliklar/LISANSLAR.md`’de. |
| Test | `test/test_sayfalar.py` | Her sayfada CSP ihlali konsol hatası sayılır ve test düşer. |

## Kod yazarken

- HTML’e giren her değişken metni `esc()` ile yaz. İstisna yalnızca kendi ürettiğimiz HTML parçalarıdır (şema, simge, `vurgula()` çıktısı).
- Olay özniteliği (`onclick="…"`), `eval`, `new Function`, metinle `setTimeout` kullanma. Olaylar `uygulama/90-olaylar.js`’teki `data-*` yakalayıcılarıyla bağlanır.
- `<script>` bloklarına öznitelik verme (`<script type=…>` gibi). Derleme yalnızca düz `<script>` bloklarının özetini alır; öznitelikli blok görürse durur.
- Dış adrese istek ekleme. Gerçekten gerekiyorsa (ör. yeni bir sunucu) `derle.py` içindeki `csp()`’ye o adresi yaz ve bu rehberi güncelle. Şu an tek dış adres `dogrulamaAdresi`’dir; derleme onu ayarlardan okur.
- Yeni kütüphaneyi CDN’den çekme; `varliklar/kutuphane/<ad>-<sürüm>/` altına koy, lisansını ekle.
- Depo artık herkese açık bir depo gibi düşün: anahtar, parola, hizmet hesabı dosyası (ör. Google Play JSON anahtarı) asla commit edilmez. Doğrulama sunucusunun gizli bilgileri yalnızca sunucunun kendi ayarlarında durur.
- `localStorage`’a yeni anahtar yazarken `DEPO.yaz` kullan; okurken türünü denetle.

## GitHub Pages sınırları

- Pages yanıt başlığı eklemeye izin vermez. CSP bu yüzden `<meta>` ile verilir. `frame-ancestors` (başka sitenin uygulamayı çerçeveye almasını engelleme) `<meta>` ile çalışmaz. Uygulamada hesap ya da ödeme formu olmadığı için bu risk düşüktür; Play sürümünde satın alma Google’ın kendi penceresinde açılır.
- Stil için `'unsafe-inline'` açıktır: şemalar `style="fill:var(--x)"` kullanır. Stil enjeksiyonu betik çalıştıramaz.
- GitHub Pages ayarında **Enforce HTTPS** açık olmalı.

## Yayın öncesi güvenlik kontrolü

- [ ] `python3 araclar/kontrol.py` temiz (CSP ihlali yok).
- [ ] `python3 araclar/derle.py --kilit` hata vermeden derliyor (e-posta ve doğrulama adresi dolu).
- [ ] Doğrulama sunucusu satın alma kodunu Google Play Developer API ile denetliyor, gizli anahtarı depoda değil.
- [ ] Depoda gizli bilgi yok: `git log -p | grep -iE "private_key|BEGIN .*KEY|password|secret"` boş.
- [ ] GitHub’da Settings › Pages › Enforce HTTPS açık. Deponun güvenlik ayarlarında “Private vulnerability reporting” açık (güvenlik açığı özel olarak bildirilebilsin).

## Tuzaklar

- **Testte `wait_for_function` düz ifadeyle.** Playwright düz ifadeyi sayfada `eval` ile çalıştırır; CSP bunu engeller ve test, uygulamada olmayan bir hata bulur. Her zaman ok işlevi ver: `"() => …"`.
- **Service worker’ın bütün önbellekleri silmesi.** Önbellek adres başınadır; `caches.keys()` aynı adresteki başka uygulamaların önbelleğini de döndürür. Yalnızca kendi önekini sil.
