# Simülasyon eklemek

Simülasyonlar konu klasöründeki `simler.js` dosyasında, `SIMLER` kaydına eklenir ve sayfada `{ tip: 'sim', tur: '<ad>' }` ile kullanılır.

## Biçim

```js
Object.assign(SIMLER, {
  ornek: {
    not: 'Simülasyonun altında görünen kullanım açıklaması.',
    yeni: () => ({ acik: false }),                       // başlangıç durumu
    hesapla(s) { s.lamba = s.acik; },                    // isteğe bağlı: her olaydan sonra türetilmiş değerler
    olay(s, olay, guncelle) { if (olay === 'anahtar') s.acik = !s.acik; },
    tik(s, dt) { /* isteğe bağlı: sayfa açıkken 100 ms’de bir, dt = 0,1 sn */ },
    dugmeler: (s) => [['anahtar', s.acik ? 'Kapat' : 'Aç', s.acik]],   // [olay, etiket, basılı?]
    durum: (s) => ({ metin: s.acik ? 'Lamba yanıyor.' : 'Devre açık.', uyari: false }),
    ciz: (s) => `<svg class="sema" viewBox="0 0 318 120" role="img" aria-label="…">${_lamba(159, 60, s.lamba)}</svg>`
  },
});
```

- `ciz` şema kurallarına uyar (sema.md).
- Gerilim olan yolu göstermek için `R(v)` yardımcısını kullan: `_tel(d, R(s.enerji))` enerjiliyken kırmızı (`--dc-plus`), değilse `--ink` çizer.
- `tik` varsa sayfa açıkken 100 ms’de bir çağrılır; sayfadan çıkınca durur. Sekme arka plandayken çağrılmaz.
- Anlık buton (basılı tutulan buton) için olayda durumu değiştir, `setTimeout` ile geri bırak ve `guncelle()` çağır. Örnekler: `muhurleme` (06-kumanda-devreleri), `valf52` (13-pnomatik).
- Durum cihazda değil bellekte tutulur; sayfa yenilenince baştan başlar.

## Denetim

- [ ] `python3 test/test_sayfalar.py --sayfa <sayfa-id> --ekran /tmp/ekran`: test her düğmeye bir kez basar, hata olmamalı.
- [ ] Durum metni her adımda ne olduğunu kısa bir cümleyle söylüyor; uyarı gereken durumda `uyari: true`.
