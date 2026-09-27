# Konu, alt başlık ve bilgi sayfası eklemek

Bütün içerik `kaynak/konular/` altındadır. Her konu kendi klasöründedir:

```
kaynak/konular/02-step-motorlar/
  konu.js       konu tanımı + bilgi sayfaları (VERI)
  semalar.js    bu konunun şemaları (SEMALAR)           → sema.md
  hesaplar.js   bu konunun hesaplayıcıları (HESAPLAR)   → hesaplayici.md
  simler.js     bu konunun simülasyonları (SIMLER)      → simulasyon.md
  modeller.js   bu konunun 3B modelleri (MODELLER)      → model-3b.md
```

Yalnızca `konu.js` zorunludur. Öbür dosyalar gerektiğinde açılır; derleme başka dosya adı kabul etmez.

## Yeni konu

1. Klasörü aç: `kaynak/konular/14-makine-guvenligi/`. Baştaki numara ana ekrandaki sırayı belirler. Sırayı değiştirmek için klasörü yeniden adlandır (`git mv`).
2. `konu.js`:

```js
/* Makine güvenliği: konu tanımı ve bilgi sayfaları. */
VERI.konular.push({
  id: 'makine-guvenligi', ad: 'Makine güvenliği', ikon: 'guvenlik',
  ozet: 'Acil stop, güvenlik rölesi, PL',
  giris: 'Konunun ilk ekranında görünen bir iki cümlelik açıklama.',
  filtreler: [ { id: 'devre', ad: 'Devre' }, { id: 'standart', ad: 'Standart' } ],   // isteğe bağlı
  altlar: [
    { id: 'acil-stop', kod: 'E-STOP', ad: 'Acil stop devresi', alt: 'Kategori 0 ve 1 durdurma', filtre: 'devre', sayfa: 'acil-stop' },
    { id: 'pl-hesabi', kod: 'PL', ad: 'Performans seviyesi', alt: 'PLr, kategori, MTTFd' }   // sayfa yok → “Hazırlanıyor”
  ]
});

Object.assign(VERI.sayfalar, {
  'acil-stop': { /* aşağıdaki sayfa biçimi */ },
});
```

3. `ikon`, `kaynak/uygulama/20-ikonlar.js` içindeki 40 px simgelerden biridir. Yeni simge gerekiyorsa aynı biçimde (`viewBox="0 0 40 40"`, `stroke="currentColor"`, `aria-hidden="true"`) ekle.

## Alt başlık

`{ id, kod, ad, alt, filtre?, sayfa? }`

- `kod`: listedeki kare rozet. En fazla ≈ 6 karakter (`MCB`, `1,8°`, `4–20`).
- `sayfa` yoksa listede “Hazırlanıyor” görünür. Sayfa hazır olunca `sayfa: '<id>'` ekle.
- Kimlikler (`id`) bütün uygulamada tekil olmalı; test bunu denetler.

## Bilgi sayfası

```js
'acil-stop': {
  baslik: 'Acil stop devresi',
  giris: 'Sayfanın başındaki özet. İki cümleyi geçmesin.',
  etiketler: ['EN ISO 13850', 'Kategori 0'],
  bolumler: [
    { id: 'sema', kisa: 'Şema', baslik: 'Bağlantı şeması', bloklar: [
      { tip: 'sema', svg: 'acilStop', lejant: [['l', 'L · faz']], isaretler: [['Acil stop butonu', 'NC kontak. …']], not: '…' }
    ]},
    { id: 'hatalar', kisa: 'Hatalar', baslik: 'Sık yapılan hatalar', bloklar: [
      { tip: 'hatalar', hatalar: [['Acil stopu PLC girişiyle kesmek', 'Yazılım çökerse makine durmaz. Doğrusu: …']] }
    ]}
  ]
},
```

- `kisa`, sayfanın üstündeki bölüm çipidir: bir iki kelime.
- Her sayfada en az bir görsel olmalı: şema, hesaplayıcı, simülasyon ya da 3B model.

### Blok tipleri

| Tip | Alanlar | Not |
|---|---|---|
| `sema` | `svg, lejant?[[sınıf, ad]], isaretler?[[ad, metin]], not?` | `isaretler` sırası şemadaki 1, 2, 3… numaralarıyla aynı olmalı |
| `kartlar` | `kartlar[{ikon, baslik, etiket, metin}]` | `ikon`: 28 px simge (`20-ikonlar.js`) |
| `tablo` | `satirlar[[etiket, ''\|'sig'\|'dc', metin]]` | ikinci alan etiket rengi |
| `formul` | `formul, tanimlar[[k, v]], ornek?{baslik, satirlar[[k, v]]}, kural?` | |
| `aralik` | `baslik, eksen, max, adim, satirlar[{ad, bas, son, metin}], not?` | yatay aralık çubukları |
| `hesap` | `tur` | → hesaplayici.md |
| `sim` | `tur` | → simulasyon.md |
| `model` | `tur` | 3B model; parça listesi ve düğmeler modelden gelir → model-3b.md |
| `ariza` | `belirti, satirlar[[neden, 'Kontrol: …']]` | |
| `hatalar` | `hatalar[[hata, '… Doğrusu: …']]` | |
| `adimlar` | `satirlar[]` | numaralı sıra |
| `not` | `metin` | |
| `renkler` | `satirlar[[ad, cssRenk, renkAdı]]` | |
| `parcalar` | `parcalar[]` | arama ekranındaki parça çiplerine de eklenir |

Lejant sınıfları: `l l2 l3 n pe pen sig dc ink acc opt opt2 kacak hatch` (renkleri `kaynak/stil/05-sayfa.css`).

### Ücretsiz sayfalar

Premium kilidi açıldığında ücretsiz kalacak sayfalar `kaynak/ortak/20-kayitlar.js` içindeki `VERI.ucretsiz` listesindedir. Kilit şu an kapalıdır; bkz. yayin.md.

### Arama

Arama dizini sayfa metninden kendiliğinden oluşur; ayrıca bir şey eklemen gerekmez. Yeni sayfayı ekledikten sonra Ara ekranında birkaç terimle dene.

## Denetim

- [ ] `node test/test_icerik.js` temiz: kimlikler tekil, bütün `svg` / `tur` adları kayıtlarda var, kullanılmayan kayıt yok.
- [ ] `python3 test/test_sayfalar.py --sayfa <id> --ekran /tmp/ekran`: şemaları açık ve koyu temada gözle kontrol et.
- [ ] Yazım kuralları (yazim.md), değerler standartla uyumlu. Emin olmadığın değeri yazma.
- [ ] `ortak/30-ayarlar.js` içinde `surum` artırıldı, sonra yayin.md’deki akış.
