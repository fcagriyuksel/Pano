# Uygulama simgesi ve açılış efekti

Simge ve açılış efekti aynı işareti kullanır: **not defteri sayfası, sarı ayraç; ortadaki satır açık kontağa (IEC 60617) ve sarı bağlantı ucuna dönüşür.** Uygulamanın adı “Otomasyon Notları”dır; sayfa “notları”, kontak “otomasyonu” anlatır. Koordinatlar ikisinde de aynıdır (512 × 512 ızgara). Birini değiştirirsen öbürünü de güncelle.

Simgede sayfa kâğıt rengindedir, zemin koyudur. Açılışta sayfa temanın mürekkep rengini (`--ink`), satırlar zemin rengini (`--paper`) alır: açık temada koyu sayfa, koyu temada simgedeki gibi açık sayfa görünür.

## Simgeyi değiştirmek

Simgeler elle çizilmez; `araclar/simge_olustur.py` SVG’den üretir.

1. `araclar/simge_olustur.py` içindeki `simge()` işlevinde SVG’yi düzenle. Renkler dosyanın başında: `ZEMIN`, `KAGIT`, `SARI`.
2. Üret ve önizle:
   ```
   python3 araclar/simge_olustur.py --onizle /tmp/simge
   ```
   `varliklar/simgeler/` içindeki dört dosya yenilenir: `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` (180 px).
3. `/tmp/simge/simge_onizleme.png` dosyasına bak: yuvarlak maske (Android), yuvarlatılmış kare (iOS), 48 ve 32 px’te okunabilirlik.
4. Maskeli simgede işaret, çapı simgenin %80’i olan güvenli dairenin içinde kalmalı. 512 px’te merkezden en fazla 204 px. Sayfanın köşesi ≈ 191 px uzaktadır; `DOSYALAR` listesinde maskeli simgenin ölçeği bu yüzden 1,0, ötekilerin 1,08’dir.
5. İşaretin biçimi değiştiyse açılış çizimini de güncelle (aşağıda).
6. Derle, denetle, gönder (yayin.md).

Telefonda: Android ana ekran simgesini, uygulama açıldıktan sonra genelde bir gün içinde kendisi günceller. Hemen görmek için uygulamayı ana ekrandan kaldırıp yeniden ekle. iOS simgeyi yalnızca yeniden eklenince yeniler.

## Açılış efekti

| Dosya | Görevi |
|---|---|
| `kaynak/govde/03-acilis.html` | çizim (SVG) ve yazılar |
| `kaynak/stil/11-acilis.css` | zaman çizelgesi ve animasyonlar |
| `kaynak/govde/02-erken-betik.js` | açılışın gösterilip gösterilmeyeceği; seçili temanın ilk karede uygulanması |
| `kaynak/uygulama/99-baslat.js` | açılış ekranını DOM’dan kaldırma, dokununca atlama |

### Nasıl çalışır

- Oturum başına bir kez görünür (`sessionStorage` anahtarı `pano.acilis`). Uygulama baştan açılınca yeniden görünür; sayfa yenilenince görünmez.
- “Hareketi azalt” açıksa hiç görünmez.
- Ekran CSS ile kendi kendine kapanır. JavaScript çökse bile uygulamayı örtmez.
- Dokununca atlanır: ekran 0,2 sn’de söner, ana ekran hemen görünür.
- Açılış sürerken sayfa değişirse (geri tuşu) giriş animasyonu iptal edilir.

### Zaman çizelgesi (ms)

| Parça | Sınıf | Başlangıç–bitiş |
|---|---|---|
| Sayfa belirir | `.a-sayfa` | 0–450 |
| Satırlar yazılır | `.a-s1`, `.a-s2`, `.a-s4` | 300–820 |
| Kontak belirir | `.a-kontak` | 600–800 |
| Kontaktan sonraki satır | `.a-s3` | 700–800 |
| Bağlantı ucu yanar | `.a-uc` | 780–1080 |
| Ayraç düşer | `.a-ayrac` | 880–1330 |
| Uçtan halka yayılır | `.a-halka` | 920–1520 |
| Uygulama adı | `.acilis-ad` | 350–950 |
| Alt yazı | `.acilis-alt` | 600–1100 |
| Ekran söner | `.acilis-ekran` | 1550–1900 |
| Ana ekran öğeleri girer | `.acilis .app>*` | 1400–2250 |
| Alt menü girer | `.acilis .alt-menu` | 1500–2000 |
| Sınıflar kaldırılır | `99-baslat.js`, `setTimeout(bitir, 2400)` | 2400 |

### Sık yapılan değişiklikler

- **Süreyi kısaltmak/uzatmak:** `.acilis-ekran` animasyon gecikmesini (1,55 sn), `.acilis .app>*` ve `.acilis .alt-menu` gecikmelerini ve `99-baslat.js` içindeki 2400 ms’yi birlikte kaydır. 2400, son giriş animasyonunun bitişinden (≈ 2250) büyük kalmalı.
- **Her açılışta göstermek:** `02-erken-betik.js` içinde `sessionStorage` satırını kaldır.
- **Tamamen kapatmak:** `02-erken-betik.js` içinde `goster = false` yap. Başka bir şeye dokunmak gerekmez.
- **Çizimi değiştirmek:** `03-acilis.html` içindeki koordinatlar simgeyle aynı ızgaradadır. Satır uzunluğu değişirse `11-acilis.css` içindeki değerleri de güncelle: `stroke-dasharray` satır boyu (92, 74, 34, 124), `stroke-dashoffset` boy + 20.

### Denetim

- [ ] `python3 test/test_sayfalar.py`: açılış ekranının 4 sn içinde kendiliğinden kalktığını denetler.
- [ ] Kareleri gözle kontrol et. Tarayıcı konsolunda animasyonları istediğin ana dondurabilirsin:
  ```js
  document.getAnimations().forEach((a) => { a.pause(); a.currentTime = 900; });
  ```
  Otomatik kare çekerken animasyonları sayfa yüklenir yüklenmez (`DOMContentLoaded`) durdur ve zamanı ileri doğru ilerlet. Bitmiş animasyonu geri sararsan ekran görüntüsü eski kareyi gösterebilir; hesaplanan stil doğru olsa bile.
- [ ] Açık ve koyu temada, “hareketi azalt” açık ve kapalıyken dene.

## Tuzaklar

- **`scale(0)` ile gizleme.** Chrome, `scaleY(0)` verilmiş çizgiyi bazen yine çizdi. Büyüyerek beliren parçanın başlangıç karesine `opacity:0` da yaz ve ölçeği 0 yerine 0,2 gibi bir değerden başlat.
- **Yuvarlak uçlu çizgi.** `stroke-dashoffset` çizgi boyuna eşitse yuvarlak uç, çizim başlamadan nokta olarak görünür. Ofseti boy + 20 yap, `stroke-dasharray` aralığını büyük tut (`92 400`).
- **Uzun ad.** Harf aralığı açılarak beliren ad dar ekranda iki satıra kayar. `white-space:nowrap` ver, başlangıç aralığını küçük tut (.16em).
