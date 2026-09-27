"""pano-kaynak.html -> yayınlanan uygulama dosyaları (GitHub Pages, depo kökü).

Kullanım (depo kökünden):
  python3 pwa_olustur.py            # premium kilidi kapalı (şu anki yayın)
  python3 pwa_olustur.py --kilit    # Play sürümü: premium kilidi açık

Yazdığı dosyalar: index.html, privacy.html, manifest.webmanifest, sw.js (depo kökü).
Yazı tipleri (*.woff2) ve simgeler (*.png) depo kökünde hazır durur; script onları silmez, değiştirmez.
"""
import json, pathlib, datetime, re, shutil, subprocess, sys

kok = pathlib.Path(__file__).parent
kaynak = (kok / 'pano-kaynak.html').read_text(encoding='utf-8')
cikti = kok  # depo kökü
surum = datetime.datetime.now().strftime('%Y%m%d%H%M')

if '--kilit' in sys.argv:
    assert 'kilit: false,' in kaynak
    kaynak = kaynak.replace('kilit: false,', 'kilit: true,', 1)

# --- Yazı tipleri: Google Fonts yerine uygulamanın içinden ---
LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
LATIN_EXT = 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF'
AILELER = [('Barlow Condensed', 'barlow-condensed', [600, 700]), ('IBM Plex Sans', 'ibm-plex-sans', [400, 500, 600]), ('IBM Plex Mono', 'ibm-plex-mono', [500, 600])]
yuzler, font_dosyalari = [], []
for ad, dosya, agirliklar in AILELER:
    for w in agirliklar:
        for alt, aralik in (('latin-ext', LATIN_EXT), ('latin', LATIN)):
            f = f'{dosya}-{alt}-{w}-normal.woff2'
            assert (cikti / f).exists(), f'Yazı tipi eksik: {f} (depo kökünde olmalı)'
            font_dosyalari.append(f)
            yuzler.append(f"@font-face{{font-family:'{ad}';font-style:normal;font-weight:{w};font-display:swap;src:url({f}) format('woff2');unicode-range:{aralik}}}")
font_css = '<style>\n' + '\n'.join(yuzler) + '\n</style>'

ayrac = kaynak.index('<div class="app"')
bas, govde = kaynak[:ayrac], kaynak[ayrac:]
bas = re.sub(r'<link rel="preconnect"[^>]*>\s*', '', bas)
bas = re.sub(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com[^>]*>\s*', font_css + '\n', bas)
assert 'fonts.googleapis' not in bas and 'fonts.gstatic' not in bas

index = f'''<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="Elektrik-elektronik konularında şemalı, hesaplı ve arıza odaklı bilgi notları.">
<meta name="theme-color" content="#F3F1EA" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#141619" media="(prefers-color-scheme: dark)">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="PANO">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="pano-surum" content="{surum}">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<style>:root{{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}body{{margin:0}}img{{max-width:100%}}[hidden]{{display:none!important}}</style>
{bas.strip()}
</head>
<body>
{govde.strip()}
<script>
if ('serviceWorker' in navigator) {{
  window.addEventListener('load', function () {{ navigator.serviceWorker.register('./sw.js').catch(function () {{}}); }});
}}
</script>
</body>
</html>
'''
(cikti / 'index.html').write_text(index, encoding='utf-8')

# --- Gizlilik politikası: Play Console için ayrı, herkese açık sayfa ---
metin_js = kaynak[kaynak.index('const UYGULAMA = {'):kaynak.index('/*METIN-BITIR*/')].replace('/*METIN-BASLA*/', '')
betik = metin_js + '\nprocess.stdout.write(JSON.stringify({ u: UYGULAMA, m: METINLER.gizlilik }));'
veri = json.loads(subprocess.run(['node', '-e', betik], capture_output=True, text=True, check=True).stdout)
def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
bolumler = ''.join(f'<h2>{esc(b)}</h2><p>{esc(t.replace("{eposta}", veri["u"]["eposta"]))}</p>' for b, t in veri['m']['bolumler'])
gizlilik = f'''<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>PANO · Gizlilik politikası</title>
{font_css}
<style>
:root{{--paper:#F3F1EA;--ink:#1B1E21;--ink-2:#3A3F44;--muted:#50565C;--accent:#F2B01E;color-scheme:light}}
@media (prefers-color-scheme: dark){{:root{{--paper:#141619;--ink:#ECE8DF;--ink-2:#C9C5BB;--muted:#A7A398;color-scheme:dark}}}}
body{{margin:0;background:var(--paper);color:var(--ink);font-family:'IBM Plex Sans',system-ui,sans-serif;line-height:1.6}}
main{{max-width:680px;margin:0 auto;padding:32px 20px 48px}}
.plaka{{display:inline-block;width:10px;height:32px;border-radius:3px;background:var(--accent);vertical-align:middle;margin-right:10px}}
.marka{{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:28px;letter-spacing:.09em;vertical-align:middle}}
h1{{font-family:'Barlow Condensed',sans-serif;font-size:38px;line-height:1.05;margin:28px 0 6px}}
.tarih{{font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em}}
h2{{font-size:17px;margin:28px 0 6px}}
p{{margin:0;color:var(--ink-2);font-size:16px}}
</style>
</head>
<body>
<main lang="tr">
<div><span class="plaka"></span><span class="marka">PANO</span></div>
<h1>{esc(veri["m"]["baslik"])}</h1>
<div class="tarih">Son güncelleme: {esc(veri["m"]["guncelleme"])}</div>
{bolumler}
</main>
</body>
</html>
'''
(cikti / 'privacy.html').write_text(gizlilik, encoding='utf-8')

# --- Manifest ---
manifest = {
    "name": "PANO Bilgi Notları",
    "short_name": "PANO",
    "description": "Elektrik-elektronik konularında şemalı, hesaplı ve arıza odaklı bilgi notları.",
    "lang": "tr",
    "dir": "ltr",
    "id": "./",
    "start_url": "./",
    "scope": "./",
    "display": "standalone",
    "orientation": "portrait",
    "background_color": "#F3F1EA",
    "theme_color": "#F3F1EA",
    "categories": ["education", "productivity", "utilities"],
    "prefer_related_applications": False,
    "icons": [
        {"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
        {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"},
        {"src": "icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}
    ],
    "shortcuts": [
        {"name": "Ara", "url": "./#ara", "icons": [{"src": "icon-192.png", "sizes": "192x192"}]},
        {"name": "Kaydedilenler", "url": "./#kaydedilenler", "icons": [{"src": "icon-192.png", "sizes": "192x192"}]}
    ]
}
(cikti / 'manifest.webmanifest').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')

# --- Servis çalışanı: sürümlü önbellek, dış istek yok ---
dosyalar = ['./', './index.html', './manifest.webmanifest', './privacy.html', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'] + ['./' + f for f in font_dosyalari]
sw = """/* PANO çevrimdışı çalışma. İnternet varken her açılışta güncel index.html alınır. */
const KABUK = 'pano-__SURUM__';
const DOSYALAR = __DOSYALAR__;

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(KABUK).then((c) => c.addAll(DOSYALAR)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== KABUK).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function onbellektenBul(r) {
  return caches.match(r, { ignoreSearch: true }).then((m) => m || (r.mode === 'navigate' ? caches.match('./index.html') : undefined));
}

/* Önce ağ; ağ 3,5 sn içinde yanıt vermezse ya da yoksa önbellek. */
function onceAg(r) {
  return new Promise((coz) => {
    let bitti = false;
    const bitir = (y) => { if (!bitti && y) { bitti = true; coz(y); } };
    const zaman = setTimeout(() => onbellektenBul(r).then(bitir), 3500);
    fetch(r)
      .then((y) => {
        clearTimeout(zaman);
        if (y && y.ok) { const kopya = y.clone(); caches.open(KABUK).then((c) => c.put(r, kopya)); }
        bitir(y);
      })
      .catch(() => {
        clearTimeout(zaman);
        onbellektenBul(r).then((m) => { if (!bitti) { bitti = true; coz(m || Response.error()); } });
      });
  });
}

/* Yazı tipi ve simgeler değişmez: önce önbellek. */
function onceOnbellek(r) {
  return caches.match(r).then((m) => m || fetch(r).then((y) => {
    if (y && y.ok) { const kopya = y.clone(); caches.open(KABUK).then((c) => c.put(r, kopya)); }
    return y;
  }));
}

self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== self.location.origin) return;
  if (/\\.(woff2|png)$/.test(u.pathname)) { e.respondWith(onceOnbellek(r)); return; }
  e.respondWith(onceAg(r));
});
""".replace('__SURUM__', surum).replace('__DOSYALAR__', json.dumps(dosyalar))
(cikti / 'sw.js').write_text(sw, encoding='utf-8')

print('Yayın dosyaları hazır:', surum, '| kilit:', 'açık' if '--kilit' in sys.argv else 'kapalı', '| index.html, privacy.html, manifest.webmanifest, sw.js güncellendi')
