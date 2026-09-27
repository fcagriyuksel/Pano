/* ---------- 3B modeller ----------
   Sayfada { tip: 'model', tur: '<ad>' }. Modeller: konular/<konu>/modeller.js (MODELLER). Rehber: belgeler/model-3b.md
   Three.js ilk model açılınca bir kez yüklenir ve önbellekte kalır. Çizim yalnızca bir şey değişince yapılır
   (sürükleme, düğme, animasyon). Sayfadan çıkınca sahne, GPU kaynakları ve dinleyiciler temizlenir. */
const THREE_YOLU = './varliklar/kutuphane/three-0.186.1/three.min.js';
let threeSozu = null;
const threeYukle = () => threeSozu || (threeSozu = import(THREE_YOLU).catch((e) => { threeSozu = null; throw e; }));
const modelOrnekleri = [];

/* Malzemeler: gerçek malzeme hissi, uygulamanın renkleri. r: belirteç adı verilirse renk temadan okunur. */
const MALZEMELER = {
  aluminyum: { renk: 0xc4c9cf, metal: 0.3, puruz: 0.42 },
  celik: { renk: 0xa3aab1, metal: 0.45, puruz: 0.32 },
  sac: { renk: 0x646b73, metal: 0.25, puruz: 0.5 },
  bakir: { renk: 0xc07a3e, metal: 0.35, puruz: 0.38 },
  miknatis: { renk: 0x4a5058, metal: 0.1, puruz: 0.6 },
  kuzey: { r: '--dc-plus', metal: 0.1, puruz: 0.55 },
  guney: { r: '--wire-n', metal: 0.1, puruz: 0.55 },
  plastik: { renk: 0x2b2f34, metal: 0, puruz: 0.7 },
  plastikAcik: { renk: 0xe8e4da, metal: 0, puruz: 0.65 },
  balata: { renk: 0x8c7b66, metal: 0, puruz: 0.85 },
  kart: { renk: 0x2f6b4a, metal: 0.05, puruz: 0.6 },
  entegre: { renk: 0x1c1f22, metal: 0.1, puruz: 0.5 },
  vurgu: { r: '--accent', metal: 0.1, puruz: 0.5 },
  kabloSiyah: { renk: 0x1f2226, metal: 0, puruz: 0.6 },
  kabloYesil: { renk: 0x3f8a3a, metal: 0, puruz: 0.6 },
  kabloKirmizi: { renk: 0xb7352a, metal: 0, puruz: 0.6 },
  kabloMavi: { renk: 0x2c63b0, metal: 0, puruz: 0.6 }
};

const modelDurum = (tur) => {
  if (!durum.model[tur]) durum.model[tur] = Object.assign({ patlat: false, kesit: 0, secili: -1 }, MODELLER[tur].yeni ? MODELLER[tur].yeni() : {});
  return durum.model[tur];
};

function modelDugmeleri(tur, s) {
  const M = MODELLER[tur];
  const d = (M.dugmeler ? M.dugmeler(s) : []).slice();
  if (M.patlat !== false) d.push(['patlat', s.patlat ? 'Birleştir' : 'Parçala', s.patlat]);
  const k = modelKesitleri(tur);
  if (k.length) d.push(['kesit', s.kesit ? `Kesit: ${k[s.kesit - 1].ad}` : 'Kesit', s.kesit > 0]);
  d.push(['sifirla', 'Görünümü sıfırla']);
  return d.map(([o, e, b]) => `<button type="button" class="dugme dugme-kucuk" data-model-olay="${o}"${b == null ? '' : ` aria-pressed="${!!b}"`}>${esc(e)}</button>`).join('');
}

/* Kesit kipleri: düğme sırayla dolaşır (yok → 1 → 2 …). Varsayılan: sağ üst çeyrek kesilir. */
const modelKesitleri = (tur) => MODELLER[tur].kesitler || [{ ad: 'çeyrek', planlar: [[-1, 0, 0, 0], [0, -1, 0, 0]] }];

function modelSecimMetni(tur, s) {
  const p = MODELLER[tur].parcalar[s.secili];
  return p ? `<span class="isaret-no" aria-hidden="true">${s.secili + 1}</span><span><span class="isaret-ad">${esc(p[0])}</span><span class="isaret-metin">${esc(p[1])}</span></span>` : '';
}

function modelBlok(tur) {
  const M = MODELLER[tur];
  if (!M) return '';
  const s = modelDurum(tur), d = M.durum ? M.durum(s) : null;
  return `
    <div class="model-blok" data-model-kutu="${tur}" data-durum="yukleniyor">
      <div class="kart model-kutu">
        <div class="model-sahne" id="model-${tur}-s" role="img" aria-label="${esc(M.aciklama)}">
          <p class="model-bilgi" id="model-${tur}-y">3B model yükleniyor…</p>
          <div class="model-isaretler" id="model-${tur}-i">${M.parcalar.map((p, i) => `<button type="button" class="model-no" tabindex="-1" aria-hidden="true" data-model-parca="${i}" aria-pressed="${s.secili === i}">${i + 1}</button>`).join('')}</div>
        </div>
        <div class="model-secim" id="model-${tur}-c" aria-live="polite"${s.secili < 0 ? ' hidden' : ''}>${modelSecimMetni(tur, s)}</div>
        ${d ? `<div class="sim-durum" id="model-${tur}-d" aria-live="polite">${esc(d.metin)}</div>` : ''}
        <div class="dugme-satir" id="model-${tur}-b">${modelDugmeleri(tur, s)}</div>
        <p class="kucuk">${esc(M.not)}</p>
      </div>
      <ol class="isaretler model-parcalar">${M.parcalar.map(([ad, m], i) => `
        <li><button type="button" class="model-parca" data-model-parca="${i}" aria-pressed="${s.secili === i}"><span class="isaret-no" aria-hidden="true">${i + 1}</span><span><span class="isaret-ad"><span class="gizli">${i + 1}. </span>${esc(ad)}</span><span class="isaret-metin">${esc(m)}</span></span></button></li>`).join('')}</ol>
    </div>`;
}

function modelleriTemizle() {
  modelOrnekleri.splice(0).forEach((o) => { o.bitti = true; if (o.temizle) o.temizle(); });
}

function modelleriKur() {
  modelleriTemizle();
  $$('[data-model-kutu]').forEach((kutu) => {
    const tur = kutu.dataset.modelKutu;
    if (!MODELLER[tur]) return;
    const o = { tur, kutu, bitti: false, gorunum: null };
    modelOrnekleri.push(o);
    kutu.addEventListener('click', (e) => modelTikla(o, e));
    threeYukle()
      .then((T) => { if (!o.bitti) modelBaslat(T, o); }, () => { if (!o.bitti) modelHata(o, 'yukleme'); })
      .catch((e) => { modelHata(o, 'hata'); console.error('3B model:', o.tur, e); });
  });
}

function modelHata(o, neden) {
  o.kutu.dataset.durum = 'hata';
  const b = document.getElementById(`model-${o.tur}-y`);
  if (b) {
    b.innerHTML = neden === 'webgl' ? 'Bu cihazda 3B çizim açılamadı (WebGL desteklenmiyor). Parçaların listesi aşağıda.'
      : neden === 'yukleme' ? '3B model yüklenemedi. İnternete bağlanıp <button type="button" class="metin-dugme" data-model-olay="yeniden">yeniden dene</button>.'
      : '3B model açılamadı. Parçaların listesi aşağıda.';
  }
}

/* Durum metni ve düğmeler; yalnızca değiştiyse yeniden yazılır (odak korunur). */
function modelYaz(o) {
  const M = MODELLER[o.tur], s = modelDurum(o.tur);
  const de = document.getElementById(`model-${o.tur}-d`);
  if (de && M.durum) { const m = M.durum(s).metin; if (de.textContent !== m) de.textContent = m; }
  const be = document.getElementById(`model-${o.tur}-b`), yeni = modelDugmeleri(o.tur, s);
  if (be && be.dataset.son !== yeni) {
    const odak = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.modelOlay : null;
    be.innerHTML = yeni;
    be.dataset.son = yeni;
    if (odak) { const b = be.querySelector(`[data-model-olay="${odak}"]`); if (b) b.focus({ preventScroll: true }); }
  }
  const ce = document.getElementById(`model-${o.tur}-c`);
  if (ce) { ce.hidden = s.secili < 0; ce.innerHTML = modelSecimMetni(o.tur, s); }
  $$('[data-model-parca]', o.kutu).forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.modelParca) === s.secili)));
}

function modelTikla(o, e) {
  const el = e.target.closest('[data-model-olay],[data-model-parca]');
  if (!el) return;
  const M = MODELLER[o.tur], s = modelDurum(o.tur);
  if (el.dataset.modelParca != null) {
    const i = Number(el.dataset.modelParca);
    s.secili = s.secili === i ? -1 : i;
  } else {
    const olay = el.dataset.modelOlay;
    if (olay === 'yeniden') { modelleriKur(); return; }
    if (olay === 'patlat') { s.patlat = !s.patlat; if (o.gorunum) o.gorunum.patlatildi(); }
    else if (olay === 'kesit') s.kesit = (s.kesit + 1) % (modelKesitleri(o.tur).length + 1);
    else if (olay === 'sifirla') { s.patlat = false; s.kesit = 0; s.secili = -1; if (o.gorunum) o.gorunum.kameraSifirla(); }
    else if (M.olay) M.olay(s, olay);
  }
  modelYaz(o);
  if (o.gorunum) o.gorunum.guncelle();
}

function modelBaslat(T, o) {
  const M = MODELLER[o.tur], s = modelDurum(o.tur);
  const sahneEl = document.getElementById(`model-${o.tur}-s`), isaretEl = document.getElementById(`model-${o.tur}-i`);
  if (!sahneEl) return;
  let renderer;
  try {
    renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch (e) { modelHata(o, 'webgl'); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.NoToneMapping;
  renderer.localClippingEnabled = true;
  const tuval = renderer.domElement;
  tuval.className = 'model-tuval';
  sahneEl.insertBefore(tuval, isaretEl);

  const belirtec = (ad) => getComputedStyle(document.documentElement).getPropertyValue(ad).trim() || '#888888';
  const sahne = new T.Scene();
  const kamera = new T.PerspectiveCamera(28, 1, 1, 5000);
  /* Işık kameraya bağlı: model döndükçe bakılan yüz hep aydınlık kalır. Değerler, dik bakan açık yüz beyaza kaçmayacak kadar düşük. */
  const isik = new T.DirectionalLight(0xffffff, 1.45);
  isik.position.set(0.6, 1.1, 1);
  const dolgu = new T.DirectionalLight(0xffffff, 0.45);
  dolgu.position.set(-1, -0.4, 0.2);
  kamera.add(isik, dolgu);
  sahne.add(kamera, new T.HemisphereLight(0xffffff, 0x9a9fa6, 0.95));

  /* ---- modele verilen yardımcılar ---- */
  const malzemeler = new Map();
  const cizgiMalzeme = new T.LineBasicMaterial({ color: belirtec('--ink'), transparent: true, opacity: 0.4 });
  const y = {
    T,
    malzeme(ad) {
      if (!malzemeler.has(ad)) {
        const m = MALZEMELER[ad];
        if (!m) throw new Error('Bilinmeyen malzeme: ' + ad);
        malzemeler.set(ad, new T.MeshStandardMaterial({ color: m.r ? belirtec(m.r) : m.renk, metalness: m.metal, roughness: m.puruz }));
      }
      return malzemeler.get(ad);
    },
    /* Ağ: geometri + malzeme adı. kenar: false verilmezse keskin kenarlar ince çizgiyle çizilir (teknik çizim görünümü). */
    ag(geo, malzeme, sec = {}) {
      const a = new T.Mesh(geo, typeof malzeme === 'string' ? y.malzeme(malzeme) : malzeme);
      if (sec.kenar !== false) a.add(new T.LineSegments(new T.EdgesGeometry(geo, sec.esik || 35), cizgiMalzeme));
      return a;
    },
    /* Z ekseni boyunca, z = 0 merkezli geometriler */
    silindir: (r, u, bolum = 48) => new T.CylinderGeometry(r, r, u, bolum).rotateX(Math.PI / 2),
    halka(ic, dis, u, bolum = 64) {
      const sekil = new T.Shape().absarc(0, 0, dis, 0, Math.PI * 2, false);
      sekil.holes.push(new T.Path().absarc(0, 0, ic, 0, Math.PI * 2, true));
      return y.cek(sekil, u, { bolum });
    },
    /* Şekli z boyunca u kadar çeker, ortalar. pah: kenar yuvarlatma (mm). */
    cek(sekil, u, sec = {}) {
      const pah = sec.pah || 0;
      const g = new T.ExtrudeGeometry(sekil, { depth: u - pah * 2, bevelEnabled: pah > 0, bevelThickness: pah, bevelSize: pah, bevelSegments: 2, curveSegments: sec.bolum || 24 });
      return g.translate(0, 0, -(u - pah * 2) / 2);
    },
    pahliKare(kenar, pah) {
      const k = kenar / 2, p = pah;
      return new T.Shape().moveTo(-k + p, -k).lineTo(k - p, -k).lineTo(k, -k + p).lineTo(k, k - p).lineTo(k - p, k).lineTo(-k + p, k).lineTo(-k, k - p).lineTo(-k, -k + p).closePath();
    },
    boru(noktalar, r, bolum = 48) {
      return new T.TubeGeometry(new T.CatmullRomCurve3(noktalar.map((n) => new T.Vector3(...n))), bolum, r, 10, false);
    },
    /* Kutuplu stator boşluğu (şeklin deliği olarak kullanılır). n kutup, 1. kutup bas açısında, sonrakiler artan açıyla.
       rArka: arka demir, rUc: kutup ucunun sırtı, rIc: delik (hava aralığı) yarıçapı, g: kutup gövdesinin yarı genişliği,
       uc: kutup ucunun yarı açısı (rad). dis: { sayi, adim (rad), derinlik, oran } kutup yüzündeki ince dişler (isteğe bağlı). */
    kutupluBosluk({ n, rArka, rUc, rIc, g, uc, bas = Math.PI / 2, dis = null }) {
      const V = (r, a) => new T.Vector2(r * Math.cos(a), r * Math.sin(a));
      const yay = (d, r, a0, a1, k) => { for (let i = 1; i < k; i++) d.push(V(r, a0 + ((a1 - a0) * i) / k)); };   // uçlar hariç
      const aB = Math.asin(g / rArka), aS = Math.asin(g / rUc), adim = (Math.PI * 2) / n, rY = rIc + (dis ? dis.derinlik : 0);
      const d = [];
      for (let k = 0; k < n; k++) {
        const c = bas + k * adim, u = [Math.cos(c), Math.sin(c)], v = [-Math.sin(c), Math.cos(c)];
        const N = (r, t) => new T.Vector2(r * u[0] + t * v[0], r * u[1] + t * v[1]);
        d.push(N(Math.sqrt(rArka * rArka - g * g), -g), N(Math.sqrt(rUc * rUc - g * g), -g));
        yay(d, rUc, c - aS, c - uc, 3);
        d.push(V(rUc, c - uc), V(rY, c - uc));
        if (dis) {
          const h = (dis.adim * dis.oran) / 2;
          for (let j = 0; j < dis.sayi; j++) {
            const a = c + (j - (dis.sayi - 1) / 2) * dis.adim;
            d.push(V(rY, a - h), V(rIc, a - h), V(rIc, a + h), V(rY, a + h));
          }
        } else yay(d, rIc, c - uc, c + uc, 8);
        d.push(V(rY, c + uc), V(rUc, c + uc));
        yay(d, rUc, c + uc, c + aS, 3);
        d.push(N(Math.sqrt(rUc * rUc - g * g), g), N(Math.sqrt(rArka * rArka - g * g), g));
        yay(d, rArka, c + aB, c + adim - aB, 6);
      }
      return new T.Path(d);
    },
    /* Kutup gövdesine sarılı bobin, +y yönündeki kutup için; z ekseni boyunca uzanır. gw, gh: gövde deliğinin yarı
       genişliği ve yarı boyu, kalinlik: tel sargısının kalınlığı, uzanti: gövdeden taşan uç, r0 ve derinlik: radyal konum. */
    bobin({ gw, gh, kalinlik, uzanti, r0, derinlik, pah = 0.3 }) {
      const bw = gw + kalinlik, bh = gh + uzanti, br = Math.min(2, kalinlik);
      const s = new T.Shape().moveTo(-bw + br, -bh).lineTo(bw - br, -bh).quadraticCurveTo(bw, -bh, bw, -bh + br).lineTo(bw, bh - br).quadraticCurveTo(bw, bh, bw - br, bh)
        .lineTo(-bw + br, bh).quadraticCurveTo(-bw, bh, -bw, bh - br).lineTo(-bw, -bh + br).quadraticCurveTo(-bw, -bh, -bw + br, -bh);
      s.holes.push(new T.Path().moveTo(-gw, -gh).lineTo(-gw, gh).lineTo(gw, gh).lineTo(gw, -gh).closePath());
      return new T.ExtrudeGeometry(s, { depth: derinlik - 2 * pah, bevelEnabled: pah > 0, bevelThickness: pah, bevelSize: pah, bevelSegments: 2, curveSegments: 6 })
        .rotateX(-Math.PI / 2).translate(0, r0 + pah, 0);
    },
    /* Dişli disk şekli: diş üstü rDis, diş dibi rTaban, ortada rDelik. oran: diş tabanının adıma oranı. kayma: açı (rad). */
    disli({ sayi, rDis, rTaban, rDelik = 0, kayma = 0, oran = 0.42 }) {
      const n = [], p = (Math.PI * 2) / sayi, h = (p * oran) / 2;
      for (let i = 0; i < sayi; i++) {
        const a = i * p + kayma;
        for (const [aa, r] of [[a - p / 2, rTaban], [a - h, rTaban], [a - h * 0.8, rDis], [a + h * 0.8, rDis], [a + h, rTaban]]) n.push(new T.Vector2(r * Math.cos(aa), r * Math.sin(aa)));
      }
      const s = new T.Shape(n);
      if (rDelik) s.holes.push(new T.Path().absarc(0, 0, rDelik, 0, Math.PI * 2, true));
      return s;
    },
    /* Sabit bilyalı rulman (z ekseninde, z = 0 merkezli): dış bilezik, iç bilezik, bilyeler. */
    rulman(ic, dis, gen) {
      const t = (dis - ic) * 0.28, rb = (dis - ic - 2 * t) * 0.46, rc = (ic + dis) / 2, n = Math.floor((Math.PI * 2 * rc) / (rb * 2.6));
      const g = new T.Group();
      g.add(y.ag(y.halka(dis - t, dis, gen), 'celik'), y.ag(y.halka(ic, ic + t, gen), 'celik'));
      const bilye = new T.SphereGeometry(rb, 14, 10);
      for (let i = 0; i < n; i++) {
        const b = y.ag(bilye, 'celik', { kenar: false });
        b.position.set(rc * Math.cos((i * Math.PI * 2) / n), rc * Math.sin((i * Math.PI * 2) / n), 0);
        g.add(b);
      }
      return g;
    }
  };

  let m;
  try {
    m = M.kur(y, s);
  } catch (e) {
    renderer.dispose();
    tuval.remove();
    throw e;
  }
  sahne.add(m.kok);

  /* ---- parçalar: her parça kendi malzeme kopyasını alır (seçim vurgusu ve saydamlık parça başına) ---- */
  const parcalar = m.parcalar.map((p, i) => {
    const kopya = new Map();
    const aglar = [];
    p.nesne.traverse((n) => {
      if (n.isMesh || n.isLineSegments) {
        if (!kopya.has(n.material)) kopya.set(n.material, n.material.clone());
        n.material = kopya.get(n.material);
        if (n.isMesh) { n.userData.parca = i; aglar.push(n); }
      }
    });
    return { nesne: p.nesne, taban: p.nesne.position.clone(), patlat: new T.Vector3(...(p.patlat || [0, 0, 0])), isaret: new T.Vector3(...(p.isaret || [0, 0, 0])), aglar, malzemeler: [...kopya.values()] };
  });
  const tumMalzemeler = [...new Set(parcalar.flatMap((p) => p.malzemeler))];
  sahne.traverse((n) => { if ((n.isMesh || n.isLineSegments) && !tumMalzemeler.includes(n.material)) tumMalzemeler.push(n.material); });
  /* Kesit yüzleri: her ağın arka yüzleri düz renkle çizilir. Kesitten içeri bakınca görünen arka yüzler dolu bir kesit
     yüzeyi gibi görünür (kapalı ağlarda çalışır). Yalnızca kesit açıkken görünür; renk ve saydamlık ana ağdan kopyalanır. */
  const kapaklar = [];
  parcalar.forEach((pr, i) => pr.aglar.forEach((a) => {
    const k = new T.Mesh(a.geometry, new T.MeshBasicMaterial({ side: T.BackSide }));
    k.visible = false;
    k.userData.parca = i;
    k.userData.ana = a;
    a.add(k);
    kapaklar.push(k);
  }));
  function kapaklariEsle() {
    if (!s.kesit) return;
    kapaklar.forEach((k) => {
      const a = k.userData.ana.material, km = k.material;
      km.color.copy(a.color).multiplyScalar(0.82);
      if (km.transparent !== a.transparent) { km.transparent = a.transparent; km.needsUpdate = true; }
      km.opacity = a.opacity;
      km.depthWrite = a.depthWrite;
    });
  }
  const secilebilir = parcalar.flatMap((p) => p.aglar).concat(kapaklar);

  /* ---- kamera: başlangıç yönünden bakınca model (birleşik ve parçalı hâlde) çerçeveye sığar ---- */
  const yon = new T.Vector3(...(M.kamera && M.kamera.yon ? M.kamera.yon : [1, 0.7, 1.6])).normalize();
  /* kamera.patlak: parçalı görünümde kameranın döneceği yön (uzun modellerde yandan bakış). */
  const yonPatlak = M.kamera && M.kamera.patlak ? new T.Vector3(...M.kamera.patlak).normalize() : yon;
  const acilar = (v) => ({ teta: Math.atan2(v.x, v.z), fi: Math.acos(v.y) });
  const bas = acilar(yon);
  const gor = { teta: bas.teta, fi: bas.fi, yakin: 1 };
  let kameraHedef = null;
  function kameraYonel(v) {
    const h = acilar(v);
    h.teta += Math.round((gor.teta - h.teta) / (Math.PI * 2)) * Math.PI * 2;   // en kısa yoldan dön
    kameraHedef = h;
  }
  function sigdir(pp, bakis) {
    parcalar.forEach((pr) => pr.nesne.position.copy(pr.taban).addScaledVector(pr.patlat, pp));
    m.kok.updateMatrixWorld(true);
    const koseler = [];   // her ağın kendi kutusunun köşeleri: tek büyük kutudan daha sıkı sığdırır
    m.kok.traverse((n) => {
      if (!n.isMesh) return;
      if (!n.geometry.boundingBox) n.geometry.computeBoundingBox();
      const k = n.geometry.boundingBox;
      for (const x of [k.min.x, k.max.x]) for (const yy of [k.min.y, k.max.y]) for (const z of [k.min.z, k.max.z]) koseler.push(new T.Vector3(x, yy, z).applyMatrix4(n.matrixWorld));
    });
    const kutu = new T.Box3().setFromPoints(koseler), merkez = kutu.getCenter(new T.Vector3());
    let d = kutu.getBoundingSphere(new T.Sphere()).radius / Math.sin((kamera.fov * Math.PI) / 360);
    for (let i = 0; i < 4; i++) {
      kamera.position.copy(bakis).multiplyScalar(d).add(merkez);
      kamera.lookAt(merkez);
      kamera.updateMatrixWorld();
      kamera.updateProjectionMatrix();
      const en = Math.max(...koseler.map((k) => { const v = k.clone().project(kamera); return Math.max(Math.abs(v.x), Math.abs(v.y)); }));
      d *= en / 0.9;
    }
    return { merkez, d };
  }
  let cerceve = null;
  const cerceveHesapla = () => { cerceve = [sigdir(0, yon), sigdir(1, yonPatlak)]; patlatUygula(); };

  const kesitPlanlari = modelKesitleri(o.tur).map((k) => k.planlar.map(([a, b, c, d]) => new T.Plane(new T.Vector3(a, b, c), d)));
  const planlar = () => kesitPlanlari[s.kesit - 1] || [];
  /* Işın testi kesimi bilmez: kesit açıkken kesilip atılan bölgeye (bütün planların arkası) düşen vuruşlar yok sayılır. */
  const kesik = (nk) => s.kesit > 0 && planlar().every((pl) => pl.distanceToPoint(nk) < 0);
  const gorunenVurus = (liste) => liste.find((x) => x.object.visible && x.object.material.opacity > 0.5 && !kesik(x.point));
  let p = s.patlat ? 1 : 0, kesitUygulanan = null, seciliUygulanan = null;

  function kesitUygula() {
    if (kesitUygulanan === s.kesit) return;
    kesitUygulanan = s.kesit;
    const pl = s.kesit ? planlar() : null;
    tumMalzemeler.concat(cizgiMalzeme, kapaklar.map((k) => k.material)).forEach((mm) => {
      mm.clippingPlanes = pl;
      mm.clipIntersection = true;
      mm.needsUpdate = true;
    });
    kapaklar.forEach((k) => { k.visible = s.kesit > 0; });
    kapaklariEsle();
  }
  const vurgu = new T.Color(belirtec('--accent'));
  function secimUygula() {
    if (seciliUygulanan === s.secili) return;
    seciliUygulanan = s.secili;
    parcalar.forEach((pr, i) => pr.malzemeler.forEach((mm) => {
      const secili = i === s.secili, soluk = s.secili >= 0 && !secili, cizgi = mm.isLineBasicMaterial;
      if (mm.emissive) mm.emissive.copy(vurgu).multiplyScalar(secili ? 0.45 : 0);
      mm.transparent = cizgi || soluk;
      mm.opacity = cizgi ? (soluk ? 0.08 : 0.4) : (soluk ? 0.16 : 1);
      mm.depthWrite = !soluk;
      mm.needsUpdate = true;
    }));
    kapaklariEsle();
  }
  function patlatUygula() {
    const e = p * p * (3 - 2 * p);
    parcalar.forEach((pr) => pr.nesne.position.copy(pr.taban).addScaledVector(pr.patlat, e));
  }
  function kameraYerlestir() {
    const e = p * p * (3 - 2 * p);
    const merkez = cerceve[0].merkez.clone().lerp(cerceve[1].merkez, e);
    const r = (cerceve[0].d + (cerceve[1].d - cerceve[0].d) * e) * gor.yakin;
    kamera.position.set(Math.sin(gor.fi) * Math.sin(gor.teta), Math.cos(gor.fi), Math.sin(gor.fi) * Math.cos(gor.teta)).multiplyScalar(r).add(merkez);
    kamera.near = Math.max(0.5, r / 50);
    kamera.far = r * 4;
    kamera.updateProjectionMatrix();
    kamera.lookAt(merkez);
  }

  /* ---- numaralı işaretler: ekrana izdüşüm; arkada kalanlar soluk ---- */
  const noEl = $$('.model-no', isaretEl);
  const isin = new T.Raycaster();
  let sonOrtulme = 0;
  function isaretleriYerlestir(w, h, ortulmeHesapla) {
    const v = new T.Vector3();
    parcalar.forEach((pr, i) => {
      const el = noEl[i];
      if (!el) return;
      v.copy(pr.isaret);
      pr.nesne.localToWorld(v);
      const dunya = v.clone();
      v.project(kamera);
      const disarida = v.z > 1 || Math.abs(v.x) > 1.05 || Math.abs(v.y) > 1.05;
      el.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px)`;
      el.classList.toggle('gizli-no', disarida);
      if (ortulmeHesapla) {
        const yonV = dunya.clone().sub(kamera.position), mesafe = yonV.length();
        isin.set(kamera.position, yonV.normalize());
        isin.far = mesafe + 0.01;
        const vurus = gorunenVurus(isin.intersectObjects(secilebilir, false));
        el.classList.toggle('arkada', (!!vurus && vurus.object.userData.parca !== i && vurus.distance < mesafe - mesafe * 0.02) || kesik(dunya));
      }
    });
  }

  /* ---- çizim döngüsü: yalnızca gerektiğinde ---- */
  let istek = 0, son = 0, gorunur = true, w = 0, h = 0, surukleniyor = false;
  const iste = () => { if (!istek && !o.bitti) istek = requestAnimationFrame(kare); };
  function kare(t) {
    istek = 0;
    const dt = son ? Math.min(0.05, (t - son) / 1000) : 0.016;
    son = t;
    let devam = false;
    const hedef = s.patlat ? 1 : 0;
    if (p !== hedef) {
      p = azHareket() ? hedef : (hedef > p ? Math.min(hedef, p + dt * 2) : Math.max(hedef, p - dt * 2));
      patlatUygula();
      devam = true;
    }
    if (kameraHedef) {
      const k = azHareket() ? 1 : 1 - Math.exp(-dt * 5);
      gor.teta += (kameraHedef.teta - gor.teta) * k;
      gor.fi += (kameraHedef.fi - gor.fi) * k;
      if (Math.abs(kameraHedef.teta - gor.teta) + Math.abs(kameraHedef.fi - gor.fi) < 0.002) { gor.teta = kameraHedef.teta; gor.fi = kameraHedef.fi; kameraHedef = null; }
      else devam = true;
    }
    if (M.tik && gorunur && !document.hidden && M.tik(s, dt)) {
      m.uygula(s);
      kapaklariEsle();
      modelYaz(o);
      devam = true;
    }
    kesitUygula();
    secimUygula();
    kameraYerlestir();
    renderer.render(sahne, kamera);
    /* Örtülme ışın testi pahalıdır: sürüklerken yapılmaz, animasyonda en çok 180 ms’de bir, durunca her zaman. */
    const simdi = performance.now();
    const ortulme = !surukleniyor && (!devam || simdi - sonOrtulme > 180);
    if (ortulme) sonOrtulme = simdi;
    isaretleriYerlestir(w, h, ortulme);
    if (devam && gorunur) iste();
    else son = 0;
  }

  function boyutla() {
    const nw = sahneEl.clientWidth, nh = sahneEl.clientHeight;
    if (!nw || !nh || (nw === w && nh === h)) return;
    w = nw; h = nh;
    renderer.setSize(w, h, false);
    kamera.aspect = w / h;
    cerceveHesapla();
    iste();
  }

  /* ---- dokunma ve fare: tek parmak döndürür, iki parmak yakınlaştırır; kısa dokunuş parça seçer ---- */
  const isaretci = new Map();
  let dokunus = null, ikiliBas = 0;
  const sinirla = (x, a, b) => Math.max(a, Math.min(b, x));
  tuval.addEventListener('pointerdown', (e) => {
    isaretci.set(e.pointerId, { x: e.clientX, y: e.clientY });
    try { tuval.setPointerCapture(e.pointerId); } catch (x) { /* yok say */ }
    dokunus = isaretci.size === 1 ? { x: e.clientX, y: e.clientY } : null;
    kameraHedef = null;
    if (isaretci.size === 2) { const [a, b] = [...isaretci.values()]; ikiliBas = Math.hypot(a.x - b.x, a.y - b.y); }
    surukleniyor = true;
  });
  tuval.addEventListener('pointermove', (e) => {
    const onceki = isaretci.get(e.pointerId);
    if (!onceki) return;
    const yeni = { x: e.clientX, y: e.clientY };
    isaretci.set(e.pointerId, yeni);
    if (isaretci.size === 1) {
      gor.teta -= (yeni.x - onceki.x) * 0.009;
      gor.fi = sinirla(gor.fi - (yeni.y - onceki.y) * 0.009, 0.12, Math.PI - 0.12);
      if (dokunus && Math.hypot(yeni.x - dokunus.x, yeni.y - dokunus.y) > 6) dokunus = null;
    } else if (isaretci.size === 2) {
      const [a, b] = [...isaretci.values()], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (ikiliBas > 0 && d > 0) gor.yakin = sinirla(gor.yakin * (ikiliBas / d), 0.35, 2.5);
      ikiliBas = d;
    }
    iste();
  });
  const birak = (e) => {
    if (!isaretci.has(e.pointerId)) return;
    isaretci.delete(e.pointerId);
    if (e.type === 'pointerup' && dokunus && isaretci.size === 0) {
      const r = tuval.getBoundingClientRect();
      isin.far = Infinity;
      isin.setFromCamera(new T.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), kamera);
      const vurus = gorunenVurus(isin.intersectObjects(secilebilir, false));
      const i = vurus ? vurus.object.userData.parca : -1;
      s.secili = s.secili === i ? -1 : i;
      modelYaz(o);
    }
    if (!isaretci.size) { surukleniyor = false; dokunus = null; }
    iste();
  };
  tuval.addEventListener('pointerup', birak);
  tuval.addEventListener('pointercancel', birak);
  tuval.addEventListener('wheel', (e) => {
    if (!e.ctrlKey) return;   // düz tekerlek sayfayı kaydırır; Ctrl + tekerlek (ya da izleme dörtgeninde kıstırma) yakınlaştırır
    e.preventDefault();
    gor.yakin = sinirla(gor.yakin * Math.exp(e.deltaY * 0.01), 0.35, 2.5);
    iste();
  }, { passive: false });
  tuval.addEventListener('webglcontextlost', (e) => e.preventDefault());
  tuval.addEventListener('webglcontextrestored', iste);

  const boyutGozlem = new ResizeObserver(boyutla);
  boyutGozlem.observe(sahneEl);
  const gorunurGozlem = new IntersectionObserver((g) => { gorunur = g[0].isIntersecting; if (gorunur) iste(); });
  gorunurGozlem.observe(sahneEl);
  const koyuSorgu = matchMedia('(prefers-color-scheme: dark)');
  const temaDegisti = () => { cizgiMalzeme.color.set(belirtec('--ink')); tumMalzemeler.forEach((mm) => { if (mm.isLineBasicMaterial) mm.color.set(belirtec('--ink')); }); iste(); };
  koyuSorgu.addEventListener('change', temaDegisti);

  o.gorunum = {
    guncelle() { m.uygula(s); kapaklariEsle(); iste(); },
    kameraSifirla() { kameraHedef = null; gor.teta = bas.teta; gor.fi = bas.fi; gor.yakin = 1; },
    patlatildi() { if (yonPatlak !== yon) kameraYonel(s.patlat ? yonPatlak : yon); }
  };
  o.temizle = () => {
    cancelAnimationFrame(istek);
    boyutGozlem.disconnect();
    gorunurGozlem.disconnect();
    koyuSorgu.removeEventListener('change', temaDegisti);
    sahne.traverse((n) => {
      if (n.geometry) n.geometry.dispose();
      if (n.material) [].concat(n.material).forEach((mm) => mm.dispose());
    });
    malzemeler.forEach((mm) => mm.dispose());
    cizgiMalzeme.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  };

  m.uygula(s);
  cerceveHesapla();
  boyutla();
  o.kutu.dataset.durum = 'hazir';
  iste();
}
