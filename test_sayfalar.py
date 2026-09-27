"""Bütün konu ve bilgi sayfalarını tarayıcıda açıp kontrol eder.

Kullanım (depo kökünden):
  python3 test_sayfalar.py              # açık ve koyu tema, 360 px genişlik
  python3 test_sayfalar.py --ekran DIR  # ayrıca her şemanın ekran görüntüsünü DIR’e kaydeder
  python3 test_sayfalar.py --sayfa pid,ladder --ekran /tmp/ekran

Kontroller: JavaScript hatası, ekranda 'undefined' / 'NaN' / '[object', yatay taşma, h1 yokluğu,
her simülasyon düğmesine bir kez basma. Gerçek yazı tipleri depo kökündeki woff2 dosyalarından yüklenir.
Gerekli: pip install playwright && playwright install chromium (ortamda Chromium varsa kurulum gerekmez).
"""
import sys, re, pathlib, threading, http.server, socketserver, functools, argparse

kok = pathlib.Path(__file__).resolve().parent
arg = argparse.ArgumentParser()
arg.add_argument('--ekran', help='şema ekran görüntülerinin kaydedileceği klasör')
arg.add_argument('--sayfa', help='virgülle ayrılmış sayfa id’leri (boşsa hepsi)')
a = arg.parse_args()

from playwright.sync_api import sync_playwright

# Google Fonts yerine depo kökündeki yazı tiplerini kullanan geçici sayfa
kaynak = (kok / 'pano-kaynak.html').read_text(encoding='utf-8')
index = (kok / 'index.html').read_text(encoding='utf-8')
ff = re.search(r'<style>\s*@font-face.*?</style>', index, re.S)
kaynak = re.sub(r'<link rel="preconnect"[^>]*>\s*', '', kaynak)
kaynak = re.sub(r'<link rel="stylesheet" href="https://fonts.googleapis.com[^>]*>', ff.group(0) if ff else '', kaynak)
gecici = kok / '_test_sayfalar.html'
gecici.write_text('<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>' + kaynak + '</body></html>', encoding='utf-8')

class Sessiz(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *x): pass
sunucu = socketserver.TCPServer(('127.0.0.1', 0), functools.partial(Sessiz, directory=str(kok)))
port = sunucu.server_address[1]
threading.Thread(target=sunucu.serve_forever, daemon=True).start()

sorunlar, hatalar = [], []
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for tema in ('light', 'dark'):
            pg = b.new_page(viewport={'width': 360, 'height': 780}, device_scale_factor=2, color_scheme=tema)
            pg.on('pageerror', lambda e: hatalar.append(str(e)))
            pg.on('console', lambda m: hatalar.append(m.text) if m.type == 'error' else None)
            pg.goto(f'http://127.0.0.1:{port}/_test_sayfalar.html'); pg.wait_for_timeout(500)
            pg.evaluate("localStorage.setItem('pano.uyariOnay','true')")
            rotalar = pg.evaluate("() => { const r = []; for (const k of VERI.konular) { r.push(k.id); for (const x of k.altlar) if (x.sayfa) r.push(x.id); } return r; }")
            if a.sayfa: rotalar = [r for r in rotalar if r in a.sayfa.split(',')]
            for r in rotalar + ['ana', 'ara', 'kaydedilenler', 'ayarlar', 'hakkinda', 'gizlilik']:
                pg.evaluate(f"location.hash='{r}'"); pg.wait_for_timeout(120)
                metin = pg.inner_text('body')
                kotu = [w for w in ('undefined', 'NaN', '[object') if w in metin]
                if kotu: sorunlar.append((tema, r, 'metin', kotu))
                if pg.evaluate('document.documentElement.scrollWidth > window.innerWidth'): sorunlar.append((tema, r, 'yatay taşma'))
                if not pg.locator('h1').count(): sorunlar.append((tema, r, 'h1 yok'))
                for d in pg.locator('[data-sim-olay]').all():
                    try: d.click(timeout=1000); pg.wait_for_timeout(60)
                    except Exception as e: sorunlar.append((tema, r, 'sim düğmesi', str(e)[:80]))
                if a.ekran:
                    klasor = pathlib.Path(a.ekran); klasor.mkdir(parents=True, exist_ok=True)
                    semalar = pg.locator('.bolum svg.sema:not([data-sim-kutu] svg)')
                    for i in range(semalar.count()):
                        semalar.nth(i).scroll_into_view_if_needed()
                        semalar.nth(i).screenshot(path=str(klasor / f'{r}_{i}_{tema}.png'))
            print(tema, len(rotalar), 'sayfa tarandı')
            pg.close()
        b.close()
finally:
    sunucu.shutdown()
    gecici.unlink(missing_ok=True)

for s in sorunlar: print('SORUN:', s)
for h in hatalar[:20]: print('HATA:', h)
print('sonuç:', 'TEMİZ' if not sorunlar and not hatalar else f'{len(sorunlar)} sorun, {len(hatalar)} hata')
sys.exit(1 if sorunlar or hatalar else 0)
