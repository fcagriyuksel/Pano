/* ---------- Olaylar ---------- */
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-sim-olay],[data-kaydet],[data-bolum-kaydir],[data-filtre],[data-hesap],[data-ara-terim],[data-ayar],[data-sifirla],[data-uyari-onay],[data-premium],[data-git]');
  if (!el) return;
  const d = el.dataset;
  if (d.simOlay) {
    const tur = d.simTur;
    if (!SIMLER[tur]) return;
    SIMLER[tur].olay(simDurum(tur), d.simOlay, () => simGuncelle(tur));
    simGuncelle(tur);
    return;
  }
  if (el.hasAttribute('data-uyari-onay')) {
    durum.uyariOnay = true;
    DEPO.yaz('uyariOnay', true);
    if (rota === 'ana') ciz('ana', { koru: true }); else git('ana');
    return;
  }
  if (d.ayar) {
    durum.ayarlar[d.ayar] = d.deger;
    DEPO.yaz('ayarlar', durum.ayarlar);
    $$(`[data-ayar="${d.ayar}"]`).forEach((b) => b.setAttribute('aria-pressed', String(b === el)));
    temaUygula();
    return;
  }
  if (d.sifirla) {
    if (d.sifirla === 'evet') {
      durum.kayitli = []; durum.son = null; durum.ilerleme = {}; durum.aramalar = []; durum.hesaplar = {};
      ['kayitli', 'son', 'ilerleme', 'aramalar', 'hesaplar'].forEach((k) => { try { localStorage.removeItem('pano.' + k); } catch (x) { /* yok say */ } });
      durum.sifirlaOnay = false;
      bildir('Veriler sıfırlandı');
    } else {
      durum.sifirlaOnay = d.sifirla === 'sor';
    }
    ciz(rota, { koru: true });
    const odak = $(durum.sifirlaOnay ? '[data-sifirla="evet"]' : '[data-sifirla="sor"]');
    if (odak) odak.focus({ preventScroll: true });
    return;
  }
  if (d.premium) {
    const is = d.premium === 'al' ? PREMIUM.satinAl() : PREMIUM.geriYukle(false);
    is.then((ok) => {
      if (ok && durum.premiumHedef && ALT[durum.premiumHedef]) { const h = durum.premiumHedef; durum.premiumHedef = null; git(h); }
      else if (rota === 'premium') ciz('premium', { koru: true });
    });
    return;
  }
  if (d.kaydet) {
    const i = durum.kayitli.indexOf(d.kaydet);
    if (i >= 0) durum.kayitli.splice(i, 1); else durum.kayitli.unshift(d.kaydet);
    DEPO.yaz('kayitli', durum.kayitli);
    const acik = i < 0;
    el.setAttribute('aria-pressed', String(acik));
    el.setAttribute('aria-label', acik ? 'Kayıtlardan çıkar' : 'Kaydet');
    bildir(acik ? 'Kaydedildi' : 'Kayıtlardan çıkarıldı');
  } else if (d.bolumKaydir) {
    bolumeGit(d.bolumKaydir, true);
  } else if (d.filtre) {
    durum.filtre[d.konu] = d.filtre;
    ciz(rota, { koru: true });
    const b = $(`[data-filtre="${d.filtre}"]`);
    if (b) b.focus({ preventScroll: true });
  } else if (d.hesap) {
    const tur = d.hesapTur;
    if (!HESAPLAR[tur]) return;
    hesapDurum(tur)[d.hesap] = Number(d.deger);
    DEPO.yaz('hesaplar', durum.hesaplar);
    $$(`[data-hesap-tur="${tur}"][data-hesap="${d.hesap}"]`).forEach((b) => b.setAttribute('aria-pressed', String(b === el)));
    hesapYaz(tur);
  } else if (d.araTerim) {
    durum.sorgu = d.araTerim;
    aramaKaydet(d.araTerim);
    if (rota === 'ara') {
      const g = $('#arama-kutusu');
      if (g) g.value = durum.sorgu;
      sonucYenile();
      window.scrollTo(0, 0);
    } else {
      git('ara');
    }
  } else if (d.git) {
    if (rota === 'ara' && el.closest('#arama-sonuc')) aramaKaydet(durum.sorgu);
    git(d.git, d.hedefBolum);
  }
});
document.addEventListener('input', (e) => {
  if (e.target && e.target.id === 'arama-kutusu') {
    durum.sorgu = e.target.value;
    sonucYenile();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.target && e.target.id === 'arama-kutusu' && e.key === 'Enter') {
    aramaKaydet(e.target.value);
    e.target.blur();
  }
});
