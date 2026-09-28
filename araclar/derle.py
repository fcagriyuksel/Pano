"""kaynak/ → yayın dosyaları (index.html, privacy.html, manifest.webmanifest, sw.js).

Kullanım (depo kökünden):
  python3 araclar/derle.py                 # depo köküne yazar (GitHub Pages kökü yayınlar)
  python3 araclar/derle.py --kilit         # Play sürümü: premium kilidi açık
  python3 araclar/derle.py --cikti DIR     # başka klasöre yazar (testler bunu kullanır)

Birleştirme sırası (dosya adlarındaki 01-, 10- … önekleri sırayı belirler):
  stil/*.css                         → <style>
  govde/*.html, govde/*.js           → <body> (js parçaları <script> içine alınır)
  ortak/*.js                         → genel kapsam: yardımcılar, kayıtlar, ayarlar, metinler, şema araçları
  konular/NN-konu/{konu,semalar,hesaplar,simler,modeller}.js
  uygulama/*.js                      → tek bir IIFE içinde ('use strict')
Birleşen betik node --check ile denetlenir; söz dizimi hatası varsa hiçbir dosya yazılmaz.
"""
import argparse, datetime, html, json, pathlib, re, subprocess, sys, tempfile

KOK = pathlib.Path(__file__).resolve().parent.parent
KAYNAK = KOK / 'kaynak'
VARLIK = KOK / 'varliklar'
KONU_DOSYALARI = ['konu.js', 'semalar.js', 'hesaplar.js', 'simler.js', 'modeller.js']

# Yazı tipleri: varliklar/yazitipleri/ içinde @fontsource adlandırmasıyla durur.
LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
LATIN_EXT = 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF'
AILELER = [('Barlow Condensed', 'barlow-condensed', [600, 700]), ('IBM Plex Sans', 'ibm-plex-sans', [400, 500, 600]), ('IBM Plex Mono', 'ibm-plex-mono', [500, 600])]


def hata(m):
    sys.exit(f'derle: {m}')


def oku(p):
    return p.read_text(encoding='utf-8').rstrip('\n')


def sirali(klasor, desen):
    return sorted(klasor.glob(desen), key=lambda p: p.name)


def yazitipi_css():
    yuzler = []
    for ad, dosya, agirliklar in AILELER:
        for w in agirliklar:
            for alt, aralik in (('latin-ext', LATIN_EXT), ('latin', LATIN)):
                f = f'varliklar/yazitipleri/{dosya}-{alt}-{w}-normal.woff2'
                if not (KOK / f).exists():
                    hata(f'yazı tipi eksik: {f}')
                yuzler.append(f"@font-face{{font-family:'{ad}';font-style:normal;font-weight:{w};font-display:swap;src:url({f}) format('woff2');unicode-range:{aralik}}}")
    return '<style>\n' + '\n'.join(yuzler) + '\n</style>'


def parca(p):
    """Birleşen betikte her dosyanın başına yolunu yazar: hata ayıklarken satırın hangi dosyadan geldiği görünür."""
    return f'/* ---- {p.relative_to(KOK).as_posix()} ---- */\n' + oku(p)


def betik(kilit):
    ortak = [parca(p) for p in sirali(KAYNAK / 'ortak', '*.js')]
    konular = []
    for k in sorted(p for p in (KAYNAK / 'konular').iterdir() if p.is_dir()):
        if not re.fullmatch(r'\d{2}-[a-z0-9-]+', k.name):
            hata(f'konu klasörü adı NN-ad biçiminde olmalı: {k.name}')
        if not (k / 'konu.js').exists():
            hata(f'{k.name}/konu.js yok')
        taninmayan = [p.name for p in k.iterdir() if p.name not in KONU_DOSYALARI]
        if taninmayan:
            hata(f'{k.name} içinde tanınmayan dosya: {taninmayan}')
        konular += [parca(k / f) for f in KONU_DOSYALARI if (k / f).exists()]
    uygulama = [parca(p) for p in sirali(KAYNAK / 'uygulama', '*.js')]
    metin = '\n\n'.join(ortak + konular) + "\n\n/* ==== UYGULAMA ==== */\n(function () {\n'use strict';\n\n" + '\n\n'.join(uygulama) + '\n})();'
    if kilit:
        if metin.count('kilit: false,') != 1:
            hata("ayarlarda 'kilit: false,' tam bir kez geçmeli")
        metin = metin.replace('kilit: false,', 'kilit: true,', 1)
    return metin


def soz_dizimi(ad, metin):
    with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as t:
        t.write(metin)
    s = subprocess.run(['node', '--check', t.name], capture_output=True, text=True)
    pathlib.Path(t.name).unlink()
    if s.returncode:
        hata(f'{ad} söz dizimi hatası:\n{s.stderr.replace(t.name, ad)}')


def govde():
    parcalar = []
    for p in sirali(KAYNAK / 'govde', '*'):
        if p.suffix == '.html':
            parcalar.append(oku(p))
        elif p.suffix == '.js':
            soz_dizimi(p.name, oku(p))
            parcalar.append('<script>\n' + oku(p) + '\n</script>')
        else:
            hata(f'govde/ içinde tanınmayan dosya: {p.name}')
    return '\n\n'.join(parcalar)


def doldur(sablon, degerler):
    for k, v in degerler.items():
        if sablon.count(f'{{{{{k}}}}}') < 1:
            hata(f'şablonda {{{{{k}}}}} yok')
        sablon = sablon.replace(f'{{{{{k}}}}}', v)
    kalan = re.findall(r'\{\{[A-Z]+\}\}', sablon)
    if kalan:
        hata(f'doldurulmamış yer tutucu: {kalan}')
    return sablon


def gizlilik(font_css):
    betik = (oku(KAYNAK / 'ortak/10-yardimcilar.js') + '\n' + oku(KAYNAK / 'ortak/30-ayarlar.js') + '\n' + oku(KAYNAK / 'ortak/40-metinler.js')
             + '\nconst m = METINLER.gizlilik;\nprocess.stdout.write(JSON.stringify({ u: UYGULAMA, m: { baslik: baslikYaz(m.baslik), guncelleme: m.guncelleme, bolumler: m.bolumler.map(([b, t]) => [baslikYaz(b), t]) } }));')
    veri = json.loads(subprocess.run(['node', '-e', betik], capture_output=True, text=True, check=True).stdout)
    e = lambda t: html.escape(t, quote=False)
    bolumler = ''.join(f'<h2>{e(b)}</h2><p>{e(t.replace("{eposta}", veri["u"]["eposta"]))}</p>' for b, t in veri['m']['bolumler'])
    return doldur(oku(KAYNAK / 'gizlilik.html'), {'BASLIK': e(veri['m']['baslik']), 'GUNCELLEME': e(veri['m']['guncelleme']),
                                                  'YAZITIPLERI': font_css, 'BOLUMLER': bolumler})


def derle(cikti, kilit=False):
    cikti = pathlib.Path(cikti)
    surum = datetime.datetime.now().strftime('%Y%m%d%H%M')
    font_css = yazitipi_css()
    js = betik(kilit)
    soz_dizimi('betik (birleşik)', js)
    # Türkçe metinde Kiril harf olmaz; görünüşü Latin harfe benzediği için gözle fark edilmez (ör. “toprakla” içinde Kiril “а”).
    kiril = re.search(r'\w*[Ѐ-ӿ]\w*', js)
    if kiril:
        hata(f'metinde Kiril harf var: “{kiril.group(0)}”')
    for yol in sorted(set(re.findall(r"varliklar/[\w./-]+\.(?:js|png|woff2)", js))):
        if not (KOK / yol).exists():
            hata(f'betikte geçen dosya yok: {yol}')
    stil = '\n\n'.join(oku(p) for p in sirali(KAYNAK / 'stil', '*.css'))
    index = doldur(oku(KAYNAK / 'sablon.html'), {'SURUM': surum, 'YAZITIPLERI': font_css, 'STIL': stil, 'GOVDE': govde(), 'BETIK': js})
    manifest = json.loads(oku(KAYNAK / 'manifest.webmanifest'))
    for s in manifest['icons']:
        if not (KOK / s['src']).exists():
            hata(f"manifest simgesi yok: {s['src']}")
    varliklar = sorted('./' + p.relative_to(KOK).as_posix() for p in VARLIK.rglob('*') if p.is_file() and p.suffix in ('.woff2', '.png', '.js'))
    dosyalar = ['./', './index.html', './manifest.webmanifest', './privacy.html'] + varliklar
    sw = oku(KAYNAK / 'sw.js')
    for yer_tutucu in ('__SURUM__', '__DOSYALAR__'):
        if sw.count(yer_tutucu) != 1:
            hata(f'kaynak/sw.js içinde {yer_tutucu} tam bir kez geçmeli (yorumlarda da yazma)')
    sw = sw.replace('__SURUM__', surum).replace('__DOSYALAR__', json.dumps(dosyalar))
    soz_dizimi('sw.js', sw)
    cikti.mkdir(parents=True, exist_ok=True)
    (cikti / 'index.html').write_text(index + '\n', encoding='utf-8')
    (cikti / 'privacy.html').write_text(gizlilik(font_css) + '\n', encoding='utf-8')
    (cikti / 'manifest.webmanifest').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    (cikti / 'sw.js').write_text(sw + '\n', encoding='utf-8')
    return surum


if __name__ == '__main__':
    a = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    a.add_argument('--kilit', action='store_true', help='premium kilidi açık (Play sürümü)')
    a.add_argument('--cikti', default=str(KOK), help='çıktı klasörü (varsayılan: depo kökü)')
    g = a.parse_args()
    s = derle(g.cikti, g.kilit)
    print('Yayın dosyaları hazır:', s, '| kilit:', 'açık' if g.kilit else 'kapalı', '| index.html, privacy.html, manifest.webmanifest, sw.js')
