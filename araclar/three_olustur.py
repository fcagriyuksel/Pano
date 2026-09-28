"""Three.js’ten yalnızca Otomasyon Notları’nın kullandığı sınıfları içeren küçültülmüş tek modül üretir.

Kullanım (depo kökünden; npm ve internet gerekir):
  python3 araclar/three_olustur.py

Çıktı: varliklar/kutuphane/three-<SURUM>/three.min.js ve LICENSE.
Modeller Three.js sınıflarına kaynak/uygulama/86-model.js üzerinden “T.<Sınıf>” diye erişir. Bir model yeni bir sınıf
kullanacaksa önce aşağıdaki DISA listesine ekle ve bu betiği yeniden çalıştır. Sürüm değişirse 86-model.js içindeki
THREE_YOLU sabitini de güncelle ve eski klasörü sil. Ayrıntı: belgeler/model-3b.md
"""
import pathlib, shutil, subprocess, sys, tarfile, tempfile

SURUM = '0.186.1'
ESBUILD = '0.25.12'
DISA = [
    # çizim, sahne, kamera, ışık
    'WebGLRenderer', 'Scene', 'PerspectiveCamera', 'Group', 'Object3D', 'HemisphereLight', 'DirectionalLight', 'AmbientLight',
    # nesneler ve malzemeler
    'Mesh', 'InstancedMesh', 'LineSegments', 'EdgesGeometry', 'LineBasicMaterial', 'MeshStandardMaterial', 'MeshBasicMaterial',
    # geometriler
    'BufferGeometry', 'Float32BufferAttribute', 'BoxGeometry', 'CylinderGeometry', 'LatheGeometry', 'TorusGeometry', 'SphereGeometry',
    'RingGeometry', 'CircleGeometry', 'ExtrudeGeometry', 'ShapeGeometry', 'TubeGeometry', 'Shape', 'Path',
    'CatmullRomCurve3', 'CubicBezierCurve3', 'QuadraticBezierCurve3', 'LineCurve3', 'CurvePath',
    # matematik
    'Vector2', 'Vector3', 'Quaternion', 'Euler', 'Matrix4', 'Color', 'Plane', 'Box3', 'Sphere', 'Raycaster', 'MathUtils',
    # sabitler
    'DoubleSide', 'FrontSide', 'BackSide', 'SRGBColorSpace', 'NoToneMapping',
]

kok = pathlib.Path(__file__).resolve().parent.parent
hedef = kok / 'varliklar' / 'kutuphane' / f'three-{SURUM}'
gecici = pathlib.Path(tempfile.mkdtemp(prefix='otomasyon-three-'))
try:
    calis = lambda *k: subprocess.run(list(k), cwd=gecici, check=True, capture_output=True, text=True)
    calis('npm', 'pack', f'three@{SURUM}')
    with tarfile.open(next(gecici.glob('three-*.tgz'))) as t:
        t.extractall(gecici, filter='data')
    (gecici / 'giris.js').write_text('export {\n  ' + ',\n  '.join(DISA) + "\n} from './package/build/three.module.js';\n", encoding='utf-8')
    hedef.mkdir(parents=True, exist_ok=True)
    calis('npx', '-y', f'esbuild@{ESBUILD}', 'giris.js', '--bundle', '--format=esm', '--minify', '--target=es2019',
          '--legal-comments=none', f'--banner:js=/* three.js {SURUM} (Otomasyon Notları alt kümesi) · MIT License · https://threejs.org */',
          f'--outfile={hedef / "three.min.js"}')
    shutil.copy(gecici / 'package' / 'LICENSE', hedef / 'LICENSE')
finally:
    shutil.rmtree(gecici, ignore_errors=True)

eski = [p.name for p in hedef.parent.iterdir() if p.is_dir() and p != hedef]
print(f'yazıldı: {hedef.relative_to(kok)}/three.min.js ({(hedef / "three.min.js").stat().st_size // 1024} KB)')
if eski:
    print('Eski sürüm klasörleri duruyor, silmeyi unutma:', ', '.join(eski), file=sys.stderr)
