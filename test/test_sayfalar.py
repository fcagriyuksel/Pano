"""Bütün konu ve bilgi sayfalarını tarayıcıda açıp kontrol eder.

Kullanım (depo kökünden):
  python3 test/test_sayfalar.py                          # açık ve koyu tema, 360 px genişlik
  python3 test/test_sayfalar.py --ekran DIR              # ayrıca her şemanın ekran görüntüsünü DIR’e kaydeder
  python3 test/test_sayfalar.py --sayfa pid,ladder --ekran /tmp/ekran

Kaynak geçici bir klasöre derlenir (araclar/derle.py); depodaki yayın dosyalarına dokunulmaz.
Kontroller: açılış ekranının kendiliğinden kalkması, JavaScript hatası, ekranda 'undefined' / 'NaN' / '[object',
yatay taşma, h1 yokluğu, her simülasyon ve model düğmesine bir kez basma, 3B modelin çizilmesi.
Gerekli: pip install playwright (ortamda Chromium varsa kurulum gerekmez).
"""
import sys, pathlib, threading, http.server, socketserver, functools, argparse, tempfile, os, shutil

kok = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(kok / 'araclar'))
import derle  # noqa: E402

arg = argparse.ArgumentParser()
arg.add_argument('--ekran', help='şema ekran görüntülerinin kaydedileceği klasör')
arg.add_argument('--sayfa', help='virgülle ayrılmış sayfa id’leri (boşsa hepsi)')
a = arg.parse_args()

from playwright.sync_api import sync_playwright  # noqa: E402

gecici = pathlib.Path(tempfile.mkdtemp(prefix='otomasyon-test-'))
derle.derle(gecici)
os.symlink(kok / 'varliklar', gecici / 'varliklar')


class Sessiz(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *x): pass


sunucu = socketserver.TCPServer(('127.0.0.1', 0), functools.partial(Sessiz, directory=str(gecici)))
port = sunucu.server_address[1]
threading.Thread(target=sunucu.serve_forever, daemon=True).start()

sorunlar, hatalar = [], []
try:
    with sync_playwright() as p:
        b = p.chromium.launch(args=['--use-angle=swiftshader', '--enable-unsafe-swiftshader'])
        for tema in ('light', 'dark'):
            pg = b.new_page(viewport={'width': 360, 'height': 780}, device_scale_factor=2, color_scheme=tema, service_workers='block')
            pg.on('pageerror', lambda e: hatalar.append(str(e)))
            pg.on('console', lambda m: hatalar.append(m.text) if m.type == 'error' else None)
            pg.goto(f'http://127.0.0.1:{port}/index.html'); pg.wait_for_timeout(500)
            # Açılış ekranı kendiliğinden kalkmalı ve giriş animasyonu bitmeli
            try: pg.wait_for_function("!document.getElementById('acilis') && !document.documentElement.classList.contains('acilis')", timeout=4000)
            except Exception: sorunlar.append((tema, 'açılış', 'açılış ekranı 4 sn içinde kalkmadı'))
            pg.evaluate("localStorage.setItem('otomasyon-notlari.uyariOnay','true')")
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
                modeller = pg.locator('[data-model-kutu]')
                if modeller.count():
                    try: pg.wait_for_function("[...document.querySelectorAll('[data-model-kutu]')].every((k) => k.dataset.durum === 'hazir')", timeout=8000)
                    except Exception: sorunlar.append((tema, r, '3B model çizilmedi', pg.evaluate("[...document.querySelectorAll('[data-model-kutu]')].map((k) => k.dataset.durum).join(',')")))
                    # Süre 3 sn: sürekli animasyonda (ör. kontaktör vınlaması) yazılımsal WebGL kareyi 100–350 ms’ye uzatır;
                    # Playwright’ın “düğme kıpırdamıyor” denetimi iki kare beklediği için 1 sn yetmeyebilir.
                    for d in pg.locator('[data-model-olay]').all():
                        try: d.click(timeout=3000); pg.wait_for_timeout(80)
                        except Exception as e: sorunlar.append((tema, r, 'model düğmesi', str(e)[:80]))
                    # Titreme: model görünürken durum metni bir değere geri dönüyorsa (A → B → A) tik hedefe oturmuyor demektir.
                    # Düzenli değişim (ör. azalan mesafe) ve sabit metin sorun sayılmaz.
                    modeller.first.scroll_into_view_if_needed(); pg.wait_for_timeout(800)
                    if pg.evaluate("""new Promise((r) => {
                        const d = [...document.querySelectorAll('[data-model-kutu] .sim-durum')], l = d.map(() => []); let n = 0;
                        const f = () => { d.forEach((e, i) => l[i].push(e.textContent)); if (++n < 12) requestAnimationFrame(f);
                          else r(l.some((a) => a.some((v, j) => j > 1 && v !== a[j - 1] && a.slice(0, j - 1).includes(v)))); };
                        requestAnimationFrame(f); })"""):
                        sorunlar.append((tema, r, 'model durumu titriyor (tik hedefe oturmuyor)'))
                if a.ekran:
                    klasor = pathlib.Path(a.ekran); klasor.mkdir(parents=True, exist_ok=True)
                    semalar = pg.locator('.bolum svg.sema:not([data-sim-kutu] svg)')
                    for i in range(semalar.count()):
                        semalar.nth(i).scroll_into_view_if_needed()
                        semalar.nth(i).screenshot(path=str(klasor / f'{r}_{i}_{tema}.png'))
                    for i in range(modeller.count()):
                        modeller.nth(i).scroll_into_view_if_needed(); pg.wait_for_timeout(300)
                        modeller.nth(i).screenshot(path=str(klasor / f'{r}_model{i}_{tema}.png'))
            print(tema, len(rotalar), 'sayfa tarandı')
            pg.close()
        b.close()
finally:
    sunucu.shutdown()
    shutil.rmtree(gecici, ignore_errors=True)

for s in sorunlar: print('SORUN:', s)
for h in hatalar[:20]: print('HATA:', h)
print('sonuç:', 'TEMİZ' if not sorunlar and not hatalar else f'{len(sorunlar)} sorun, {len(hatalar)} hata')
sys.exit(1 if sorunlar or hatalar else 0)
