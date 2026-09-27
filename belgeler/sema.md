# Şema çizmek

Şemalar konu klasöründeki `semalar.js` dosyasında, `SEMALAR` kaydına eklenir ve sayfada `{ tip: 'sema', svg: '<ad>' }` ile kullanılır.

```js
/* Sigortalar: şemalar. */
Object.assign(SEMALAR, {
  mcb: `<svg class="sema" viewBox="0 0 318 260" role="img" aria-label="Tek kutuplu otomatik sigortanın bağlantısı">
    ${_kutu(120, 40, 78, 150)}
    ${_tel('M159 10V40', '--wire-l')}
    ${_no(220, 60, 1)}
  </svg>`,

  /* Hesaplanan şema: kendini hemen çağıran işlev bir kez çalışır ve metin döndürür. */
  stepMikro: (() => {
    let s = '';
    for (let i = 0; i < 8; i++) s += _yazi(40 + i * 30, 20, String(i));
    return `<svg class="sema" viewBox="0 0 318 120" role="img" aria-label="…">${s}</svg>`;
  })(),
});
```

Bir şema birden fazla konuda kullanılıyorsa ilk konunun dosyasında durur ve üstüne `/* Ayrıca kullanan: … */` yazılır.

## Kurallar

- Genişlik her zaman `viewBox="0 0 318 H"`. `class="sema"`, `role="img"` ve açıklayıcı bir `aria-label` kullan.
- Renkleri öznitelikle değil, stille ver: `style="fill:var(--ink)"`. **SVG sunum özniteliklerinde `var()` çalışmaz** (`fill="var(--x)"` yanlış).
- Kullanılabilen belirteçler: `--ink --muted --line --card --svg-body --chip --rail --hatch --accent --signal --dc-plus --wire-l --wire-l2 --wire-l3 --wire-n --wire-pe --wire-pe2 --paper`. Anlamları için gorunum.md’ye bak.
- Siyah iletken için `--wire-l2` kullan; `--ink` koyu temada açık renge döner.
- Numaralı işaretler (`_no`) sayfadaki `isaretler` listesiyle aynı sırada olmalı: 1. işaret listenin ilk satırıdır.
- Yazılar IBM Plex Mono’dur: karakter genişliği ≈ 0,6 × yazı boyutu. 11 px’te 10 karakter ≈ 66 birim. Taşma ve üst üste binme için genişliği önce hesapla, sonra ekran görüntüsüyle iki temada bak.
- Sayıları `sayi(n, ondalık)` ile yaz (tr-TR biçimi). Şemalarda da kullanılabilir.

## Yardımcılar

`kaynak/ortak/50-sema-araclari.js` içindedir.

| Yardımcı | İş |
|---|---|
| `_no(x, y, n)` | numaralı işaret (dolu daire + rakam) |
| `_yazi(x, y, metin, {a, b, w, r})` | yazı; `a` hizalama (`middle`, `end`), `b` boyut, `w` kalınlık, `r` renk belirteci |
| `_kutu(x, y, w, h, {rx, f, sw})` | gövde kutusu; `f` dolgu belirteci, `sw` çizgi kalınlığı |
| `_tel(d, renk, {w, k})` | iletken; `k` kesikli desen |
| `_pe(d)` | sarı-yeşil koruma iletkeni |
| `_cizgi(d)` | noktalı kılavuz çizgisi |
| `_kontak(x, y, {tip: 'NC', kapali, b, gri})` | kontak sembolü |
| `_bobin(x, y, acik, {zaman})` | röle bobini (enerjiliyse sarı) |
| `_lamba(x, cy, acik)` | sinyal lambası |
| `_sig(x, y, renk)` | sigorta sembolü |
| `_puls(y, a, b, renk, x0, x1)` | darbe dalga biçimi |
| `_okSag`, `_okYukari` | küçük ok uçları |

## Özel durumlar

- Pnömatik valf sembolünde aktif kare portların altına kaydırılır; port x konumları sabittir.

## Denetim

```
python3 test/test_sayfalar.py --sayfa <sayfa-id> --ekran /tmp/ekran
```

Görüntüleri açık ve koyu temada aç ve şunlara bak:

- [ ] Yazı taşması ya da üst üste binen yazı yok.
- [ ] İşaret numaraları listeyle aynı sırada.
- [ ] Koyu temada her çizgi seçilebiliyor (özellikle siyah iletken ve ince kılavuzlar).
