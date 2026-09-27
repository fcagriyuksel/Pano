# Hesaplayıcı eklemek

Hesaplayıcılar konu klasöründeki `hesaplar.js` dosyasında, `HESAPLAR` kaydına eklenir ve sayfada `{ tip: 'hesap', tur: '<ad>' }` ile kullanılır.

```js
/* Step motorlar: hesaplayıcılar. */
Object.assign(HESAPLAR, {
  step: {
    gruplar: [
      { k: 'ms', ad: 'Mikroadım', v: 8, s: [[1, 'Tam'], [2, '1/2'], [4, '1/4'], [8, '1/8'], [16, '1/16']] },
      { k: 'hatve', ad: 'Vida hatvesi', v: 5, s: [[4, '4 mm'], [5, '5 mm'], [8, '8 mm'], [10, '10 mm']] }
    ],
    hesapla(d) {
      const ppr = 200 * d.ms, ppmm = ppr / d.hatve;
      return {
        sonuclar: [['Darbe / tur', sayi(ppr)], ['Darbe / mm', sayi(ppmm)], ['…', '…'], ['…', '…']],
        adimlar: [`200 × ${d.ms} = ${sayi(ppr)} darbe/tur`, `${sayi(ppr)} ÷ ${d.hatve} = ${sayi(ppmm)} darbe/mm`]
      };
    },
    not: 'Hesaplayıcının altında görünen kısa açıklama.'
  },
});
```

## Biçim

`{ gruplar[{k, ad, v, s[[değer, etiket]]}], hesapla(d) → {sonuclar, adimlar}, not }`

- `sonuclar`: tam **4** satır `[ad, değer]` (2 × 2 ızgara).
- `adimlar`: en az 2 satır. Satır sayısı seçime göre değişebilir, uyarı satırı eklenebilir.
- Varsayılan `v`, seçeneklerden biri olmalı.
- Sayıları `sayi(n, ondalık)` ile yaz (tr-TR: 1.234,5). Negatif işaret için `−` kullan.
- Seçenek etiketleri kısa olmalı: 4 düğmeli satırda ≈ 8 karakter. Uzun etiket satırı kırar.
- Sonuç ve adımlar her seçimde yeniden çizilir. Seçimler cihazda saklanır.

## Denetim

- [ ] `node test/test_icerik.js`: bütün seçenek kombinasyonları denenir. Sonuçta `NaN`, `undefined`, `Infinity`, `null` olmamalı; 4 sonuç ve en az 2 adım olmalı.
- [ ] Değerleri standart ve kataloglarla karşılaştır. Emin olmadığın katsayıyı yazma.
