# PANO

Elektrik-elektronik ve endüstriyel otomasyon bilgi notları: 13 konu ve 73 sayfa. Sayfalarda şemalar, hesaplayıcılar, simülasyonlar, 3B etkileşimli modeller, arıza tabloları ve sık yapılan hatalar yer alır.

- Uygulama: https://fcagriyuksel.github.io/Pano/
- Telefona kurmak için adresi aç, ardından tarayıcı menüsünden **Ana ekrana ekle**’yi seç. Uygulama internetsiz de çalışır.

## Geliştirme

```
python3 araclar/kontrol.py     # bütün testler
python3 araclar/derle.py       # kaynak/ → index.html, privacy.html, manifest.webmanifest, sw.js
```

| Klasör | İçerik |
|---|---|
| `kaynak/` | uygulamanın kaynağı: stil, konular, şemalar, hesaplayıcılar, simülasyonlar, 3B modeller, uygulama kodu |
| `varliklar/` | yazı tipleri, simgeler, Three.js |
| `araclar/` | derleme, denetim ve simge betikleri |
| `test/` | içerik ve sayfa testleri |
| `belgeler/` | iş başına rehberler |

Kökteki `index.html`, `privacy.html`, `manifest.webmanifest` ve `sw.js` derlenir; elle düzenlenmez. Geliştirme kuralları `CLAUDE.md`, adım adım rehberler `belgeler/` içindedir. Üçüncü taraf lisansları: `varliklar/LISANSLAR.md`.

Geliştirici: Furkan Çağrı YÜKSEL
