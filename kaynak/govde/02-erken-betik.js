/* İlk kareden önce: seçili tema uygulanır (renk sıçraması olmasın) ve açılış ekranı oturum başına bir kez açılır. */
(function () {
  var k = document.documentElement;
  try {
    var t = (JSON.parse(localStorage.getItem('pano.ayarlar')) || {}).tema;
    if (t === 'acik' || t === 'koyu') {
      k.setAttribute('data-ilk-tema', k.getAttribute('data-theme') || '');
      k.setAttribute('data-theme', t === 'acik' ? 'light' : 'dark');
    }
  } catch (e) { /* depo kapalı olabilir */ }
  var goster = true;
  try { goster = !matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* yok say */ }
  try { if (sessionStorage.getItem('pano.acilis')) goster = false; else sessionStorage.setItem('pano.acilis', '1'); } catch (e) { /* yok say */ }
  if (goster) k.classList.add('acilis', 'acilis-var');
})();
