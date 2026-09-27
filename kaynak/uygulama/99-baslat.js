/* ---------- Başlat ---------- */
let hataGosterildi = false;
window.addEventListener('error', () => {
  if (hataGosterildi) return;
  hataGosterildi = true;
  try { bildir('Beklenmeyen bir sorun oluştu. Sürerse uygulamayı yeniden aç.'); } catch (x) { /* yok say */ }
});

temaUygula();
let ilk = 'ana';
try { ilk = rotaCoz(location.hash); } catch (e) { /* yok say */ }
ciz(ilk);

/* Açılış ekranı CSS ile kendi kendine kapanır; burada DOM’dan kaldırılır. Dokununca atlanır. */
const acilis = document.getElementById('acilis');
if (acilis) {
  const bitir = () => { kok.classList.remove('acilis', 'acilis-var'); acilis.remove(); };
  if (!kok.classList.contains('acilis-var')) acilis.remove();
  else {
    acilis.addEventListener('animationend', (e) => { if (e.target === acilis) acilis.remove(); });
    acilis.addEventListener('click', () => { kok.classList.remove('acilis'); acilis.classList.add('atla'); });
    window.addEventListener('hashchange', () => kok.classList.remove('acilis'), { once: true });
    setTimeout(bitir, 2400);
  }
}

PREMIUM.baslat().then(() => {
  if (rota === 'premium' || rota === 'ayarlar') ciz(rota, { koru: true });
}).catch(() => { /* Play dışında normal */ });
