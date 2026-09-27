# Uygulama simgesi ve açılış efekti

Simge ve açılış efekti aynı işareti kullanır: **sarı bara → sigorta (içi enerjili) → bağlantı ucu**. Koordinatlar ikisinde de aynıdır (512 × 512 ızgara). Birini değiştirirsen öbürünü de güncelle.

## Simgeyi değiştirmek

Simgeler elle çizilmez; `araclar/simge_olustur.py` SVG’den üretir.

1. `araclar/simge_olustur.py` içindeki `simge()` işlevinde SVG’yi düzenle. Renkler dosyanın başında: `ZEMIN`, `KAGIT`, `SARI`.
2. Üret ve önizle:
   ```
   python3 araclar/simge_olustur.py --onizle /tmp/simge
   ```
   `varliklar/simgeler/` içindeki dört dosya yenilenir: `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` (180 px).
3. `/tmp/simge/simge_onizleme.png` dosyasına bak: yuvarlak maske (Android), yuvarlatılmış kare (iOS), 48 ve 32 px’te okunabilirlik.
4. Maskeli simgede işaret, çapı simgenin %80’i olan güvenli dairenin içinde kalmalı. 512 px’te merkezden en fazla 204 px. Dosyadaki `DOSYALAR` listesinde maskeli simgenin ölçeği bu yüzden 1,0’dır.
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
| Bara uzar | `.a-bara` | 0–450 |
| İletken çizilir | `.a-tel` | 250–650 |
| Sigorta gövdesi çizilir | `.a-govde` | 400–850 |
| Bağlantı ucu belirir | `.a-uc` | 600–900 |
| Akım darbesi geçer | `.a-akim` | 700–1200 |
| Sigorta enerjilenir | `.a-eleman` | 800–1050 |
| PANO yazısı | `.acilis-ad` | 350–950 |
| Alt yazı | `.acilis-alt` | 600–1100 |
| Ekran söner | `.acilis-ekran` | 1350–1700 |
| Ana ekran öğeleri girer | `.acilis .app>*` | 1200–2050 |
| Alt menü girer | `.acilis .alt-menu` | 1300–1800 |
| Sınıflar kaldırılır | `99-baslat.js`, `setTimeout(bitir, 2400)` | 2400 |

### Sık yapılan değişiklikler

- **Süreyi kısaltmak/uzatmak:** `.acilis-ekran` animasyon gecikmesini (1,35 sn), `.acilis .app>*` gecikmelerini ve `99-baslat.js` içindeki 2400 ms’yi birlikte kaydır. 2400, son giriş animasyonunun bitişinden (≈ 2050) büyük kalmalı.
- **Her açılışta göstermek:** `02-erken-betik.js` içinde `sessionStorage` satırını kaldır.
- **Tamamen kapatmak:** `02-erken-betik.js` içinde `goster = false` yap. Başka bir şeye dokunmak gerekmez.
- **Çizimi değiştirmek:** `03-acilis.html` içindeki koordinatlar simgeyle aynı ızgaradadır. Çizgi uzunluğu değişirse `11-acilis.css` içindeki `stroke-dasharray` değerlerini de güncelle: iletken 184, gövde çevresi 360, sigorta elemanı 94.

### Denetim

- [ ] `python3 test/test_sayfalar.py`: açılış ekranının 4 sn içinde kendiliğinden kalktığını denetler.
- [ ] Kareleri gözle kontrol et. Tarayıcı konsolunda animasyonları istediğin ana dondurabilirsin:
  ```js
  document.getAnimations().forEach((a) => { a.pause(); a.currentTime = 900; });
  ```
- [ ] Açık ve koyu temada, “hareketi azalt” açık ve kapalıyken dene.
