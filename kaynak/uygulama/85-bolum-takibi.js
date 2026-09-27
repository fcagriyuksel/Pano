/* ---------- Bölüm takibi ---------- */
let aktifBolum = null;
let kareBekliyor = false;
function sayfaAcildi(a) {
  const s = sayfaOf(a);
  const bolum = bekleyenBolum && s.bolumler.some((b) => b.id === bekleyenBolum) ? bekleyenBolum : s.bolumler[0].id;
  durum.son = { sayfa: a.id, bolum };
  DEPO.yaz('son', durum.son);
}
function bolumeGit(id, yumusak) {
  const sec = document.getElementById('b-' + id);
  if (!sec) return;
  const cubuk = $('#ust-cubuk');
  const h = cubuk ? cubuk.offsetHeight : 0;
  const top = sec.getBoundingClientRect().top + window.scrollY - h - 12;
  window.scrollTo({ top: Math.max(0, top), behavior: yumusak && !azHareket() ? 'smooth' : 'auto' });
}
function kaydirmaIzle() {
  const cubuk = $('#ust-cubuk');
  if (cubuk) cubuk.classList.toggle('golgeli', window.scrollY > 4);
  if (!ALT[rota]) return;
  const secs = $$('.bolum');
  if (!secs.length) return;
  const alt = cubuk ? cubuk.getBoundingClientRect().bottom : 0;
  let idx = 0;
  secs.forEach((s, i) => { if (s.getBoundingClientRect().top <= alt + 48) idx = i; });
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) idx = secs.length - 1;
  const id = secs[idx].dataset.bolum;
  if (id === aktifBolum) return;
  aktifBolum = id;
  const satir = $('#bolum-cipleri');
  if (satir) {
    $$('.cip', satir).forEach((c) => c.classList.toggle('etkin', c.dataset.bolumKaydir === id));
    const c = $(`[data-bolum-kaydir="${id}"]`, satir);
    if (c) {
      const hedef = c.offsetLeft - satir.offsetLeft - 40;
      try { satir.scrollTo({ left: Math.max(0, hedef), behavior: azHareket() ? 'auto' : 'smooth' }); } catch (e) { satir.scrollLeft = Math.max(0, hedef); }
    }
  }
  durum.son = { sayfa: rota, bolum: id };
  DEPO.yaz('son', durum.son);
  if (idx > (Number(durum.ilerleme[rota]) || 0)) {
    durum.ilerleme[rota] = idx;
    DEPO.yaz('ilerleme', durum.ilerleme);
  }
}
window.addEventListener('scroll', () => {
  if (kareBekliyor) return;
  kareBekliyor = true;
  requestAnimationFrame(() => { kareBekliyor = false; kaydirmaIzle(); });
}, { passive: true });

/* ---------- Bildirim ---------- */
let bildirimZamani = null;
function bildir(m) {
  const b = $('#bildirim');
  b.textContent = m;
  b.classList.add('acik');
  clearTimeout(bildirimZamani);
  bildirimZamani = setTimeout(() => b.classList.remove('acik'), 1800);
}
