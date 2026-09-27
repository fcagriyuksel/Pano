# Görünüm: renk, yazı tipi, bileşen

Stil `kaynak/stil/` altındadır ve dosya adındaki sırayla birleşir:

| Dosya | İçerik |
|---|---|
| `01-belirtecler.css` | renk belirteçleri, koyu tema |
| `02-temel.css` | sayfa, gövde, `.app` düzeni |
| `03-ana-ekran.css` | marka, arama kutusu, koyu panel, konu kartları |
| `04-ust-cubuk.css` | alt ekranların üst çubuğu, çipler |
| `05-sayfa.css` | başlık, liste, bilgi sayfası blokları, lejant renkleri |
| `06-hesaplayici.css` | hesaplayıcı, “sonraki” kartı |
| `07-arama.css` | arama ekranı |
| `08-alt-menu.css` | alt menü, bildirim |
| `09-dugmeler-metin.css` | düğmeler, uyarı, premium, metin sayfaları |
| `10-simulasyon.css` | simülasyon |
| `11-acilis.css` | açılış ekranı (simge-ve-acilis.md) |
| `12-model.css` | 3B model bloğu (model-3b.md) |
| `99-hareket-azaltma.css` | “hareketi azalt” açıkken animasyonları kapatır; en sonda kalmalı |

## Renk belirteçleri

Renk her zaman belirteçle verilir, sabit renk yazılmaz. Koyu tema **iki kez** tanımlıdır: `@media (prefers-color-scheme: dark)` içinde (sistem teması) ve `:root[data-theme="dark"]` içinde (Ayarlar’dan seçilen tema). Bir koyu renk değişirse ikisini birlikte değiştir.

| Belirteç | Kullanım |
|---|---|
| `--paper` | sayfa zemini |
| `--card` | kart zemini |
| `--ink`, `--ink-2`, `--muted` | ana yazı, ikincil yazı, soluk yazı |
| `--line`, `--line-soft` | kenarlık, iç ayırıcı |
| `--chip` | çip ve not zemini |
| `--accent`, `--on-accent` | sarı vurgu ve üstündeki yazı |
| `--signal` | bağlantı, sinyal hattı (mavi) |
| `--panel`, `--panel-ink`, `--panel-muted`, `--panel-track` | koyu panel (kaldığın yer, formül, sonuç) |
| `--danger-bg`, `--danger-line`, `--danger-ink` | uyarı ve hata kartları |
| `--mark` | arama vurgusu |
| `--focus` | klavye odağı |
| `--wire-l`, `--wire-l2`, `--wire-l3` | faz iletkenleri: kahverengi, siyah, gri |
| `--wire-n` | nötr (mavi) |
| `--wire-pe`, `--wire-pe2` | koruma iletkeni (yeşil + sarı) |
| `--dc-plus` | DC artı, gerilim olan yol (kırmızı) |
| `--rail`, `--svg-body`, `--hatch` | şemada ray, gövde dolgusu, tarama |

## Yazı tipleri

| Aile | Kullanım |
|---|---|
| Barlow Condensed 600/700 (`--f-display`) | başlıklar, marka, konu adları |
| IBM Plex Sans 400/500/600 (`--f-body`) | gövde metni |
| IBM Plex Mono 500/600 (`--f-mono`) | sayılar, kodlar, şema yazıları |

Dosyalar `varliklar/yazitipleri/` içindedir; `@font-face` kuralları derlemede üretilir (`araclar/derle.py`, `AILELER`). Yeni ağırlık gerekirse `@fontsource` paketinden `latin` ve `latin-ext` dosyalarını ekle ve `AILELER` listesini güncelle.

## Genel kurallar

- Telefon öncelikli: 360 px genişlikte yatay taşma olmamalı (test denetler).
- Dokunma hedefleri en az 44 px.
- Simgeler `kaynak/uygulama/20-ikonlar.js` içindedir: 40 px konu, 28 px kart, 20 px arayüz. Hepsi `stroke="currentColor"`.
- Animasyon ekleyince `99-hareket-azaltma.css` dosyasında kapat.
