# Yazım ve terim kuralları

Uygulamanın dili Türkçedir. Kısa, doğrudan, yapmacık olmayan cümleler kullan.

## Noktalama ve sayılar

- Tipografik kesme işareti kullan: `PLC’ye`, `V’ta` (düz `'` değil).
- Ek, kısaltmanın okunuşuna göre gelir: `mA’e`, `4 mA’de`, `16 A’den`, `1.600 A’e`.
- Ondalık ayırıcı virgül, binlik ayırıcı nokta: `2,5 mm²`, `27.648`. Kodda `sayi()` bunu kendisi yapar.
- Eksi işareti için `−` (U+2212), aralık için `–` kullan: `4–20 mA`, `−10 °C`.
- Sayı ile birim arasında boşluk: `24 V`, `1,8°` (derece işareti bitişik).

## Kelimeler

- `hâl`, `hâlde` yazılır; “sadece” yerine “yalnızca” kullanılır.
- Terimler: izolasyon direnci, DIP anahtarı, yumuşak yol verici, döngüsel.
- Eğri ya da tip anlatılırken “B tipi” yerine “B eğrisi” yazılır. “D tipi” yalnızca DIAZED için kullanılabilir.

## Blok kalıpları

- Arıza satırının ilk sütunu bir neden ise metin “Kontrol:” ile başlar ve eylemle sürer: `['Bir faz yok', 'Kontrol: üç faz gerilimini ölç.']`
- İlk sütun bir gözlem ise (ne zaman, nasıl oluyor) metin “Olası neden: … Kontrol: …” biçimindedir: `['Kurar kurmaz atıyor', 'Olası neden: kısa devre. Kontrol: yükleri ayır, izolasyon direncini ölç.']`
- Hata kartı “Doğrusu:” ile biter: `Kabloyu sigortaya göre seçmek. Doğrusu: sigortayı kabloya göre seç.`
- Şema işaretleri: kısa ad + bir iki cümle.

## İçerik doğruluğu

- Değerler saha ve standartlarla uyumlu olmalı (IEC/EN, TS EN, Elektrik İç Tesisleri Yönetmeliği).
- Emin olmadığın değeri yazma. Tipik değer veriyorsan “tipik” de ve kataloğa yönlendir.
- Marka adı gerekmedikçe kullanma; gerekiyorsa (ör. Kinco) örnek olduğunu belirt.
