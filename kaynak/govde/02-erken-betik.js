/* İlk kareden önce: seçili tema uygulanır (renk sıçraması olmasın) ve açılış ekranı oturum başına bir kez açılır.
   Depo öneki uygulama/40-dizin-depo-durum.js içindeki DEPO_ONEK ile aynı olmalı. */
(function () {
  var k = document.documentElement;
  try {
    var t = (JSON.parse(localStorage.getItem('otomasyon-notlari.ayarlar')) || {}).tema;
    if (t === 'acik' || t === 'koyu') {
      k.setAttribute('data-ilk-tema', k.getAttribute('data-theme') || '');
      k.setAttribute('data-theme', t === 'acik' ? 'light' : 'dark');
    }
  } catch (e) { /* depo kapalı olabilir */ }
  var goster = true;
  try { goster = !matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* yok say */ }
  try { if (sessionStorage.getItem('otomasyon-notlari.acilis')) goster = false; else sessionStorage.setItem('otomasyon-notlari.acilis', '1'); } catch (e) { /* yok say */ }
  if (goster) k.classList.add('acilis', 'acilis-var');
})();
