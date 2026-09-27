# 3B etkileşimli model eklemek

3B modeller Three.js ile çizilir. Kütüphane ilk model açılınca bir kez yüklenir, sonra önbellekte kalır ve internetsiz çalışır. Görünüm uygulamanın dilindedir: gerçek biçim ve oranlar, sade malzeme, ince kenar çizgileri, numaralı parçalar.

| Dosya | Görevi |
|---|---|
| `kaynak/konular/<konu>/modeller.js` | modelin kendisi (`MODELLER` kaydı) |
| `kaynak/uygulama/86-model.js` | ortak çalışma zamanı: kamera, dokunma, parçalama, kesit, numaralar, seçim, temizlik |
| `kaynak/stil/12-model.css` | model bloğunun görünümü |
| `varliklar/kutuphane/three-<sürüm>/three.min.js` | Three.js alt kümesi (`araclar/three_olustur.py` üretir) |

Sayfada `{ tip: 'model', tur: '<ad>' }` bloğuyla kullanılır. Örnek: `kaynak/konular/02-step-motorlar/modeller.js`.

## Kullanıcının gördüğü

- Tek parmakla sürükleyince döner (dikey kaydırma sayfayı kaydırır), iki parmakla yakınlaşır. Masaüstünde Ctrl + tekerlek yakınlaştırır.
- Parçaya ya da numarasına dokununca parça vurgulanır, öbürleri saydamlaşır; altta parçanın adı ve açıklaması çıkar.
- Ortak düğmeler: **Parçala / Birleştir**, **Kesit** (kipler sırayla dolaşır), **Görünümü sıfırla**. Modele özgü düğmeler bunların önüne gelir.
- Numaralı parça listesi modelin altındadır ve aranabilir.

## Model biçimi

Modeli bir IIFE içine yaz; yardımcı sabitler genel kapsama taşmasın.

```js
/* Konu adı: 3B modeller. Ölçüler mm; eksen ve yön açıklaması. */
(() => {
  Object.assign(MODELLER, {
    'ornek-model': {
      aciklama: 'Ekran okuyucu için tek cümlelik açıklama.',
      not: 'Modelin altında görünen kullanım notu.',
      parcalar: [['Parça adı', 'Bir iki cümlelik açıklama.'], /* … */],   // sıra = numara
      kamera: { yon: [1, 0.7, 1.6] },                  // başlangıç bakış yönü (merkezden kameraya)
      kesitler: [{ ad: 'çeyrek', planlar: [[-1, 0, 0, 0], [0, -1, 0, 0]] }],   // isteğe bağlı; [] verilirse Kesit düğmesi yok
      patlat: true,                                      // false: Parçala düğmesi yok
      yeni: () => ({ acik: false }),                     // modele özgü durum (isteğe bağlı)
      dugmeler: (s) => [['ac', s.acik ? 'Kapat' : 'Aç', s.acik]],
      olay(s, olay) { if (olay === 'ac') s.acik = !s.acik; },
      tik(s, dt) { return false; },                      // animasyon sürüyorsa true döndür
      durum: (s) => ({ metin: 'Durum satırı.' }),        // isteğe bağlı
      kur(y, s) {
        const T = y.T, kok = new T.Group();
        const govde = y.ag(y.cek(y.pahliKare(40, 4), 30), 'aluminyum');
        kok.add(govde);
        return {
          kok,
          parcalar: [{ nesne: govde, isaret: [0, 20, 15], patlat: [0, 0, 30] }],   // parcalar listesiyle aynı sıra
          uygula(s) { /* durumu sahneye yansıt: dönüş, renk … */ }
        };
      }
    }
  });
})();
```

- `parcalar[i]` ile `kur()` dönüşündeki `parcalar[i]` aynı parçadır. `isaret`: numaranın durduğu nokta (parçanın yerel koordinatı). `patlat`: parçalanınca kayma (parçanın üst nesnesinin koordinatında).
- Durum (`s`) bellekte tutulur; sayfaya dönünce kaldığı yerden sürer. Kamera her açılışta sıfırlanır.
- `tik` yalnızca çizim döngüsü çalışırken çağrılır. Döngü bir düğmeye basınca, sürüklerken ve `tik` true döndürdükçe sürer; durunca kendiliğinden durur (pil tüketmez).

## `y` yardımcıları

| Yardımcı | İş |
|---|---|
| `y.T` | Three.js sınıfları (`T.Group`, `T.Shape` …). Yalnızca `three_olustur.py` içindeki `DISA` listesindekiler vardır. |
| `y.malzeme(ad)` | ortak malzeme: `aluminyum celik sac bakir miknatis kuzey guney plastik plastikAcik vurgu kabloSiyah kabloYesil kabloKirmizi kabloMavi`. `kuzey`, `guney`, `vurgu` renklerini temadan alır. Yenisi `86-model.js` → `MALZEMELER`. |
| `y.ag(geo, malzeme, {kenar, esik})` | ağ + ince kenar çizgileri. `kenar: false` çizgisiz (küçük, çok yüzlü parçalar). `esik`: çizgi için en küçük kenar açısı (derece). |
| `y.cek(sekil, uzunluk, {pah, bolum})` | 2B şekli z ekseni boyunca çeker, z = 0’a ortalar |
| `y.halka(ic, dis, uzunluk)` | z ekseninde halka (boru) |
| `y.silindir(r, uzunluk)` | z ekseninde silindir |
| `y.pahliKare(kenar, pah)` | köşeleri pahlı kare (motor flanşı, pano kesiti …) |
| `y.boru(noktalar, r)` | noktalardan geçen kablo, hortum |

Geometriler z ekseni boyunca, z = 0 merkezli üretilir; `position` ile yerleştir.

## Kurallar

- Ölçüleri gerçek ürün ölçülerinden al (katalog, standart). Tipik değer kullanıyorsan açıklamada “tipik” de.
- Parça açıklamaları yazım kurallarına uyar (yazim.md) ve sahada işe yarayan bilgi verir.
- Renk anlamları tutarlı olsun: kırmızı N / gerilim, mavi S / nötr, sarı vurgu. Kablo renkleri standarda uymuyorsa açıklamada söyle.
- Numaralar birleşik hâlde yalnızca görünen yüzeylerde çıkar (arkada kalan gizlenir). İç parçaların `isaret` noktasını, parçalı ve kesitli görünümde kameraya bakan bir yüzeye koy.
- Parça sayısı 12–15’i geçmesin; ekran kalabalıklaşır.

## Tuzaklar

- **Birbirine değen yüzeyler titrer.** Aynı düzlemde ya da aynı yarıçapta çakışan yüzeyler kesit görünümünde çizgili görünür (z-fighting). Değen parçalar arasında en az 0,05 mm boşluk bırak: kapak–stator, mıknatıs–rotor kabı, rulman–yuva, delik–mil.
- **Kesit yüzleri kapalı ağ ister.** Kesit, ağın arka yüzlerini düz renkle çizerek dolu görünür. Açık yüzeyli ya da iç içe geçen ağlarda kesit bozuk çıkar. `ExtrudeGeometry`, `CylinderGeometry` gibi kapalı geometriler kullan.
- **Işın testi kesiti ve görünürlüğü bilmez.** Three.js `Raycaster` kırpma düzlemlerini ve `visible = false` nesneleri yok saymaz. Çalışma zamanı bunları `gorunenVurus` ile süzer; yeni bir ışın testi yazarsan aynı süzgeci kullan.
- **Dönen parçalar kökün doğrudan çocuğu olmalı.** `patlat` kayması parçanın üst nesnesinin koordinatındadır. Dönen bir grubun içindeki parçaya yan kayma verirsen, grup döndükçe kayma yönü de döner. Dönen her parçayı ayrı ayrı döndür (`uygula` içinde `rotation.z`).
- **Malzemeyi `uygula` anında oku.** Çalışma zamanı her parçaya kendi malzeme kopyasını verir (seçim vurgusu için). `kur` sırasında sakladığın malzeme nesnesi değil, `ag.material` değişir. Parça içinde ayrı renklenecek ağlara ayrı malzeme ver (ör. her bobine `bakir.clone()`).
- **Yeni Three.js sınıfı.** `T.X is not a constructor` hatası: sınıfı `araclar/three_olustur.py` → `DISA` listesine ekle ve betiği çalıştır.
- **Işık.** Işık kameraya bağlıdır. Yoğunluğu artırırsan kameraya dik bakan açık renkli yüzler beyaza kaçar; önden bakarak kontrol et.

## Three.js’i güncellemek

1. `araclar/three_olustur.py` içinde `SURUM` değerini değiştir, betiği çalıştır (npm ve internet gerekir).
2. `kaynak/uygulama/86-model.js` içindeki `THREE_YOLU` sabitini yeni klasöre çevir, eski klasörü sil.
3. `varliklar/LISANSLAR.md` satırını güncelle.
4. Bütün modelleri iki temada dene. Sürüm klasör adında olduğu için telefonlar yeni dosyayı kendiliğinden alır.

## Denetim

- [ ] `node test/test_icerik.js`: model adı kayıtta var, kullanılmayan model yok.
- [ ] `python3 test/test_sayfalar.py --sayfa <sayfa-id> --ekran /tmp/ekran`: model “hazır” duruma gelir, her düğmeye basılır, hata olmaz; `<sayfa>_model0_<tema>.png` görüntüleri kaydedilir.
- [ ] Gözle: birleşik, parçalı, her kesit kipi ve bir parça seçiliyken; açık ve koyu temada. Numaralar üst üste binmiyor, kesit yüzlerinde çizgi yok.
