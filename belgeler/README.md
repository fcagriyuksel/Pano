# PANO rehberleri

Bir işe başlamadan önce ilgili rehberi oku. Her rehberde hangi dosyaya dokunulacağı, adımlar ve denetim listesi yazar.

| İş | Rehber |
|---|---|
| Yeni konu, alt başlık ya da bilgi sayfası eklemek | [yeni-sayfa.md](yeni-sayfa.md) |
| Şema (SVG) çizmek ya da düzeltmek | [sema.md](sema.md) |
| Hesaplayıcı eklemek | [hesaplayici.md](hesaplayici.md) |
| Simülasyon eklemek | [simulasyon.md](simulasyon.md) |
| 3B etkileşimli model eklemek | [model-3b.md](model-3b.md) |
| Renk, yazı tipi, bileşen, koyu tema | [gorunum.md](gorunum.md) |
| Uygulama simgesini ya da açılış efektini değiştirmek | [simge-ve-acilis.md](simge-ve-acilis.md) |
| Derleme, test, yayın, telefonda güncelleme | [yayin.md](yayin.md) |
| Türkçe yazım ve terim kuralları | [yazim.md](yazim.md) |

## Kısa yol

```
python3 araclar/derle.py        # kaynak/ → index.html, privacy.html, manifest.webmanifest, sw.js
python3 araclar/kontrol.py      # bütün testler + yayın dosyaları güncel mi
```

Klasör düzeni ve genel kurallar için depo kökündeki `CLAUDE.md` dosyasına bak.
