"""Uygulama simgelerini SVG’den üretir (PNG, varliklar/simgeler/).

Kullanım (depo kökünden):
  python3 araclar/simge_olustur.py              # icon-192, icon-512, icon-maskable-512, apple-touch-icon
  python3 araclar/simge_olustur.py --onizle DIR # ayrıca yuvarlak ve kare maskeli önizleme kaydeder

Simge: not defteri sayfası, sarı ayraç; ortadaki satır açık kontağa (IEC 60617) ve sarı bağlantı ucuna dönüşür.
Açılış ekranındaki çizim (kaynak/govde/03-acilis.html) aynı koordinatları kullanır; biri değişirse öbürünü de güncelle.
Ayrıntılı adımlar: belgeler/simge-ve-acilis.md
Gerekli: pip install playwright (ortamda Chromium varsa kurulum gerekmez).
"""
import pathlib, argparse

hedef = pathlib.Path(__file__).resolve().parent.parent / 'varliklar' / 'simgeler'
arg = argparse.ArgumentParser()
arg.add_argument('--onizle', help='önizleme görüntüsünün kaydedileceği klasör')
a = arg.parse_args()

ZEMIN, KAGIT, SARI = '#1B1E21', '#F3F1EA', '#F2B01E'


def simge(px, olcek):
    """olcek: işaretin büyüklüğü. Maskeli simgede işaret, çapı %80 olan güvenli dairenin içinde kalmalı."""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="{px}" height="{px}" style="display:block">
<defs>
  <radialGradient id="z" cx="28%" cy="18%" r="95%"><stop offset="0" stop-color="#2B3036"/><stop offset=".6" stop-color="{ZEMIN}"/><stop offset="1" stop-color="#121417"/></radialGradient>
  <linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFC844"/><stop offset="1" stop-color="#EBA414"/></linearGradient>
</defs>
<rect width="512" height="512" fill="url(#z)"/>
<g transform="translate(256 256) scale({olcek}) translate(-256 -256)">
  <rect x="132" y="100" width="248" height="312" rx="22" fill="{KAGIT}"/>
  <path d="M300 100h44v96l-22-18-22 18z" fill="url(#b)"/>
  <g fill="none" stroke="{ZEMIN}" stroke-linecap="round">
    <path d="M176 176H268M176 320H300M176 248H250M282 248H316" stroke-width="18"/>
    <path d="M250 222V274M282 222V274" stroke-width="14"/>
  </g>
  <circle cx="330" cy="248" r="14" fill="{SARI}" stroke="{ZEMIN}" stroke-width="8"/>
</g>
</svg>'''


# Sayfanın köşesi merkezden ≈ 191 birim uzakta (yuvarlatma dahil): maskeli simgede 1,0 ölçek güvenli daireye (204) sığar.
DOSYALAR = [('icon-192.png', 192, 1.08), ('icon-512.png', 512, 1.08), ('icon-maskable-512.png', 512, 1.0), ('apple-touch-icon.png', 180, 1.08)]

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch()
    for ad, px, olcek in DOSYALAR:
        pg = b.new_page(viewport={'width': px, 'height': px}, device_scale_factor=1)
        pg.set_content(f'<body style="margin:0">{simge(px, olcek)}</body>')
        pg.screenshot(path=str(hedef / ad))
        pg.close()
        print('yazıldı:', ad)
    if a.onizle:
        klasor = pathlib.Path(a.onizle); klasor.mkdir(parents=True, exist_ok=True)
        pg = b.new_page(viewport={'width': 860, 'height': 260})
        kutu = lambda px, olcek, r: f'<div style="border-radius:{r};overflow:hidden">{simge(px, olcek)}</div>'
        pg.set_content('<body style="margin:0;padding:24px;background:#8A8F94;display:flex;gap:24px;align-items:flex-start">'
                       + kutu(200, 1.0, '50%') + kutu(200, 1.08, '44px') + kutu(96, 1.08, '22px') + kutu(48, 1.0, '50%') + kutu(32, 1.08, '7px') + '</body>')
        pg.screenshot(path=str(klasor / 'simge_onizleme.png'))
        print('önizleme:', klasor / 'simge_onizleme.png')
    b.close()
