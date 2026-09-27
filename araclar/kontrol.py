"""Bütün denetimler tek komutta. Commit’ten önce çalıştır.

Kullanım (depo kökünden):
  python3 araclar/kontrol.py          # içerik testi + sayfa testi + yayın dosyaları güncel mi
  python3 araclar/kontrol.py --hizli  # tarayıcısız: içerik testi + derleme denetimi

Yayın dosyaları denetimi: kaynak geçici klasöre derlenir ve depodaki index.html, privacy.html,
manifest.webmanifest, sw.js ile karşılaştırılır (sürüm damgası hariç). Fark varsa
"python3 araclar/derle.py" çalıştırılmamış demektir.
"""
import sys, subprocess, pathlib, tempfile, re, shutil

kok = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(kok / 'araclar'))
import derle  # noqa: E402

hizli = '--hizli' in sys.argv
sonuc = []


def calistir(ad, komut):
    print(f'\n== {ad}')
    r = subprocess.run(komut, cwd=kok)
    sonuc.append((ad, r.returncode == 0))


def yayin_guncel():
    print('\n== Yayın dosyaları güncel mi')
    gecici = pathlib.Path(tempfile.mkdtemp(prefix='pano-kontrol-'))
    try:
        derle.derle(gecici)
        damga = lambda t: re.sub(r'\d{12}', 'SURUM', t)
        eski = [f for f in ('index.html', 'privacy.html', 'manifest.webmanifest', 'sw.js')
                if not (kok / f).exists() or damga((kok / f).read_text(encoding='utf-8')) != damga((gecici / f).read_text(encoding='utf-8'))]
        if eski:
            print('Güncel değil:', ', '.join(eski), '→ python3 araclar/derle.py')
        else:
            print('Güncel.')
        sonuc.append(('Yayın dosyaları', not eski))
    finally:
        shutil.rmtree(gecici, ignore_errors=True)


calistir('İçerik ve hesaplayıcılar', ['node', 'test/test_icerik.js'])
if not hizli:
    calistir('Sayfalar (tarayıcı)', [sys.executable, 'test/test_sayfalar.py'])
yayin_guncel()

print('\n' + '\n'.join(f"{'✓' if t else '✗'} {ad}" for ad, t in sonuc))
sys.exit(0 if all(t for _, t in sonuc) else 1)
