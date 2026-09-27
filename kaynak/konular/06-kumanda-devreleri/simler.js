/* Kumanda devreleri: simülasyonlar. */
Object.assign(SIMLER, {
  muhurleme: {
    not: 'Butonlara bas; kırmızı çizgiler gerilim olan yolu gösterir. Mühürlemeyi söküp start butonunu tekrar dene.',
    yeni: () => ({ k1: false, termik: false, muhur: true, s1: false, s0: false }),
    hesapla(s) {
      s.a2 = !s.termik;
      s.a3 = s.a2 && !s.s0;
      s.k1 = s.a3 && (s.s1 || (s.k1 && s.muhur));
    },
    olay(s, o, guncelle) {
      if (o === 'start') { s.s1 = true; setTimeout(() => { s.s1 = false; this.hesapla(s); guncelle(); }, 700); }
      else if (o === 'stop') { s.s0 = true; setTimeout(() => { s.s0 = false; this.hesapla(s); guncelle(); }, 500); }
      else if (o === 'termik') s.termik = !s.termik;
      else if (o === 'muhur') s.muhur = !s.muhur;
      this.hesapla(s);
    },
    dugmeler: (s) => [['start', 'Start (S1)'], ['stop', 'Stop (S0)'], ['termik', s.termik ? 'Termiği resetle' : 'Termiği attır', s.termik], ['muhur', s.muhur ? 'Mühürlemeyi sök' : 'Mühürlemeyi tak', !s.muhur]],
    durum(s) {
      if (s.termik) return { metin: 'Termik attı: 95-96 açık, K1 düştü. Motor duruyor.', uyari: true };
      if (s.s0) return { metin: 'Stop basılı: devre açıldı, K1 düştü. Motor duruyor.' };
      if (s.k1 && s.s1 && !s.muhur) return { metin: 'Start basılı: K1 çekili. Mühürleme sökük olduğu için bırakınca düşecek.' };
      if (s.k1 && s.s1) return { metin: 'Start basılı: K1 çekti, 13-14 kapandı. Motor çalışıyor.' };
      if (s.k1) return { metin: 'K1 çekili; akım 13-14 üzerinden geçiyor (mühürlü). Motor çalışıyor.' };
      if (!s.muhur) return { metin: 'Mühürleme sökük: start bırakılınca K1 düşer. Motor duruyor.' };
      return { metin: 'K1 düşük. Motor duruyor.' };
    },
    ciz(s) {
      const x = 100, xs = 160, xl = 250;
      let o = `<svg class="sema" viewBox="0 0 318 296" role="img" aria-label="Mühürleme kumanda devresi">`;
      o += _tel('M40 20H270', CANLI, { w: 2.5 }) + _yazi(32, 24, 'L', { a: 'end', w: 600, r: CANLI });
      o += _tel('M40 280H270', '--ink', { w: 2.5 }) + _yazi(32, 284, 'N', { a: 'end', w: 600 });
      o += _tel(`M${x} 20V34M${x} 54V64`, CANLI, { w: 2 }) + _sig(x, 34, CANLI) + _yazi(x + 12, 48, '-F1', { b: 10, r: '--muted' });
      o += _kontak(x, 64, { tip: 'NC', kapali: !s.termik, u: CANLI, a: R(s.a2) }) + _yazi(x + 12, 80, '-F2 95-96', { b: 10, r: '--muted' });
      o += _tel(`M${x} 88V100`, R(s.a2), { w: 2 });
      o += _kontak(x, 100, { tip: 'NC', kapali: !s.s0, u: R(s.a2), a: R(s.a3), b: true }) + _yazi(x + 12, 116, '-S0 stop', { b: 10, r: '--muted' });
      o += _tel(`M${x} 124V144M${x} 136H${xs}V144`, R(s.a3), { w: 2 });
      o += _kontak(x, 144, { tip: 'NO', kapali: s.s1, u: R(s.a3), a: R(s.k1), b: true }) + _yazi(x + 10, 160, '-S1', { b: 10, r: '--muted' });
      o += _kontak(xs, 144, { tip: 'NO', kapali: s.k1 && s.muhur, u: R(s.a3), a: R(s.k1), gri: !s.muhur });
      o += _yazi(xs + 10, 160, s.muhur ? '-K1 13-14' : 'sökük', { b: 10, r: s.muhur ? '--muted' : '--dc-plus' });
      o += _tel(`M${x} 168V200M${x} 180H${xs}V168`, R(s.k1), { w: 2 });
      o += _bobin(x, 200, s.k1) + _yazi(x + 16, 212, '-K1', { b: 10, w: 600 });
      o += _tel(`M${x} 216V280`, '--ink', { w: 2 });
      o += _tel(`M${xl} 20V100`, CANLI, { w: 2 }) + _kontak(xl, 100, { tip: 'NO', kapali: s.k1, u: CANLI, a: R(s.k1) }) + _yazi(xl + 10, 116, '-K1 23-24', { b: 10, r: '--muted' });
      o += _tel(`M${xl} 124V181`, R(s.k1), { w: 2 }) + _lamba(xl, 190, s.k1) + _yazi(xl + 14, 194, '-H1', { b: 10, r: '--muted' }) + _tel(`M${xl} 199V280`, '--ink', { w: 2 });
      return o + '</svg>';
    }
  },

  ileriGeri: {
    not: 'Motor ileri dönerken Geri’ye bas. Sonra kilitlemeyi kaldırıp aynısını dene.',
    yeni: () => ({ k1: false, k2: false, s1: false, s2: false, s0: false, kilit: true, kisa: false }),
    hesapla(s) {
      const c = !s.s0;
      s.c = c;
      for (let i = 0; i < 2; i++) {
        s.k1 = c && (s.s1 || s.k1) && (!s.kilit || !s.k2);
        s.k2 = c && (s.s2 || s.k2) && (!s.kilit || !s.k1);
      }
      if (s.k1 && s.k2) s.kisa = true;
      if (!c) s.kisa = false;
    },
    olay(s, o, guncelle) {
      const bas = (k, ms) => { s[k] = true; setTimeout(() => { s[k] = false; this.hesapla(s); guncelle(); }, ms); };
      if (o === 'ileri') bas('s1', 700);
      else if (o === 'geri') bas('s2', 700);
      else if (o === 'stop') bas('s0', 500);
      else if (o === 'kilit') s.kilit = !s.kilit;
      this.hesapla(s);
    },
    dugmeler: (s) => [['ileri', 'İleri (S1)'], ['geri', 'Geri (S2)'], ['stop', 'Stop (S0)'], ['kilit', s.kilit ? 'Kilitlemeyi kaldır' : 'Kilitlemeyi tak', !s.kilit]],
    durum(s) {
      if (s.kisa) return { metin: 'Kısa devre: K1 ve K2 aynı anda çekti, L1 ile L3 kısa devre oldu ve güç sigortaları attı. Stop’a bas.', uyari: true };
      if (s.k1) return { metin: s.s2 && s.kilit ? 'Geri basılı ama K1’in 21-22 kontağı açık; K2 çekemez. Motor ileri dönüyor.' : 'K1 çekili. Motor ileri dönüyor.' };
      if (s.k2) return { metin: s.s1 && s.kilit ? 'İleri basılı ama K2’nin 21-22 kontağı açık; K1 çekemez. Motor geri dönüyor.' : 'K2 çekili. Motor geri dönüyor.' };
      return { metin: s.kilit ? 'Motor duruyor. Kilitleme takılı.' : 'Motor duruyor. Kilitleme kaldırıldı.', uyari: !s.kilit };
    },
    ciz(s) {
      const c = s.c;
      const bA = c && (s.s1 || s.k1), bB = c && (s.s2 || s.k2);
      let o = `<svg class="sema" viewBox="0 0 318 316" role="img" aria-label="İleri-geri kumanda devresi, elektriksel kilitlemeli">`;
      o += _tel('M30 20H290', CANLI, { w: 2.5 }) + _yazi(24, 24, 'L', { a: 'end', w: 600, r: CANLI });
      o += _tel('M30 300H290', '--ink', { w: 2.5 }) + _yazi(24, 304, 'N', { a: 'end', w: 600 });
      o += _tel('M60 20V32M60 52V64', CANLI, { w: 2 }) + _sig(60, 32, CANLI) + _yazi(72, 46, '-F1', { b: 10, r: '--muted' });
      o += _kontak(60, 64, { tip: 'NC', kapali: !s.s0, u: CANLI, a: R(c), b: true }) + _yazi(72, 80, '-S0 stop', { b: 10, r: '--muted' });
      o += _tel('M60 88V110H230', R(c), { w: 2 });
      const kol = (x, xs, sb, k, bx, kilitKapali, etS, etK, etKilit, etBobin) => {
        let t = _tel(`M${x} 110V130M${x} 122H${xs}V130`, R(c), { w: 2 });
        t += _kontak(x, 130, { tip: 'NO', kapali: sb, u: R(c), a: R(bx), b: true }) + _yazi(x + 8, 146, etS, { b: 10, r: '--muted' });
        t += _kontak(xs, 130, { tip: 'NO', kapali: k, u: R(c), a: R(bx) }) + _yazi(xs + 8, 146, '13-14', { b: 9, r: '--muted' });
        t += _tel(`M${x} 154V178M${x} 166H${xs}V154`, R(bx), { w: 2 });
        if (s.kilit) t += _kontak(x, 178, { tip: 'NC', kapali: kilitKapali, u: R(bx), a: R(k) }) + _yazi(x + 8, 194, etKilit, { b: 9, r: '--muted' });
        else t += _tel(`M${x} 178V202`, R(bx), { w: 2 }) + _yazi(x + 8, 194, 'köprü', { b: 9, r: CANLI });
        t += _tel(`M${x} 202V224`, R(k), { w: 2 }) + _bobin(x, 224, k) + _yazi(x + 16, 236, etBobin, { b: 10, w: 600 });
        t += _tel(`M${x} 240V300`, '--ink', { w: 2 });
        return t;
      };
      o += kol(110, 150, s.s1, s.k1, bA, !s.k2, 'S1', 'K1', 'K2 21-22', '-K1 ileri');
      o += kol(230, 270, s.s2, s.k2, bB, !s.k1, 'S2', 'K2', 'K1 21-22', '-K2 geri');
      if (s.kisa) o += `<rect x="96" y="268" width="148" height="22" rx="6" style="fill:var(--danger-bg);stroke:var(--danger-line)"></rect>` + _yazi(170, 283, 'KISA DEVRE', { a: 'middle', b: 11, w: 600, r: '--danger-ink' });
      return o + '</svg>';
    }
  },

  yildizUcgen: {
    not: 'Start’a bas: önce K1 + K2 (yıldız), süre dolunca kısa bir aradan sonra K1 + K3 (üçgen). Gerçekte süre motora göre birkaç saniye ayarlanır.',
    yeni: () => ({ faz: 'dur', t: 0, T: 3 }),
    tik(s, dt) {
      if (s.faz === 'yildiz') { s.t += dt; if (s.t >= s.T) { s.faz = 'gecis'; s.t = 0; } }
      else if (s.faz === 'gecis') { s.t += dt; if (s.t >= 0.4) { s.faz = 'ucgen'; s.t = 0; } }
    },
    olay(s, o) {
      if (o === 'start' && s.faz === 'dur') { s.faz = 'yildiz'; s.t = 0; }
      else if (o === 'stop') { s.faz = 'dur'; s.t = 0; }
      else if (o === 'sure') { const l = [2, 3, 5]; s.T = l[(l.indexOf(s.T) + 1) % l.length]; }
    },
    dugmeler: (s) => [['start', 'Start'], ['stop', 'Stop'], ['sure', `Süre: ${s.T} s`]],
    durum(s) {
      if (s.faz === 'yildiz') return { metin: `Yıldız: K1 + K2 çekili. Hat akımı direkt kalkışın yaklaşık üçte biri. KT: ${sayi(s.t, 1)} / ${s.T} s` };
      if (s.faz === 'gecis') return { metin: 'Geçiş: K2 düştü, K3 henüz çekmedi. İkisi aynı anda çekerse kısa devre olur.' };
      if (s.faz === 'ucgen') return { metin: 'Üçgen: K1 + K3 çekili. Sargılarda tam gerilim, motor tam torkta.' };
      return { metin: 'Motor duruyor. Start’a bas.' };
    },
    ciz(s) {
      const k1 = s.faz !== 'dur', k2 = s.faz === 'yildiz', k3 = s.faz === 'ucgen';
      const kutu = (y, ad, alt, on) => _kutu(12, y, 118, 46, { f: on ? '--accent' : '--card' }) + _yazi(24, y + 20, ad, { b: 12, w: 600, r: on ? '--on-accent' : '--ink' }) + _yazi(24, y + 36, alt, { b: 9, r: on ? '--on-accent' : '--muted' });
      const cx = 228, cy = 96;
      const P = [[cx, cy - 58], [cx + 50, cy + 29], [cx - 50, cy + 29]];
      const yRenk = k2 ? '--signal' : '--line', dRenk = k3 ? '--signal' : '--line';
      let o = `<svg class="sema" viewBox="0 0 318 206" role="img" aria-label="Yıldız-üçgen geçişi: kontaktör durumları ve sargı bağlantısı">`;
      o += kutu(12, '-K1 ana', 'L → U1-V1-W1', k1) + kutu(66, '-K2 yıldız', 'U2-V2-W2 kısa', k2) + kutu(120, '-K3 üçgen', 'L → W2-U2-V2', k3);
      o += _tel(`M${cx} ${cy}L${P[0][0]} ${P[0][1]}M${cx} ${cy}L${P[1][0]} ${P[1][1]}M${cx} ${cy}L${P[2][0]} ${P[2][1]}`, yRenk, { w: k2 ? 3.5 : 2 });
      o += _tel(`M${P[0][0]} ${P[0][1]}L${P[1][0]} ${P[1][1]}L${P[2][0]} ${P[2][1]}Z`, dRenk, { w: k3 ? 3.5 : 2, k: k3 ? '' : '4 4' });
      P.forEach(([x, y]) => { o += `<circle cx="${x}" cy="${y}" r="4" style="fill:var(--ink)"></circle>`; });
      o += _yazi(cx, cy - 66, 'U1', { a: 'middle', b: 10 }) + _yazi(cx + 58, cy + 40, 'V1', { a: 'start', b: 10 }) + _yazi(cx - 58, cy + 40, 'W1', { a: 'end', b: 10 });
      const ad = { dur: 'Duruyor', yildiz: 'Yıldız', gecis: 'Geçiş', ucgen: 'Üçgen' }[s.faz];
      o += _yazi(cx, 160, ad, { a: 'middle', b: 13, w: 600 });
      const oran = s.faz === 'yildiz' ? Math.min(1, s.t / s.T) : s.faz === 'dur' ? 0 : 1;
      o += `<rect x="12" y="184" width="294" height="8" rx="4" style="fill:var(--chip)"></rect><rect x="12" y="184" width="${(294 * oran).toFixed(1)}" height="8" rx="4" style="fill:var(--accent)"></rect>`;
      o += _yazi(12, 178, 'KT', { b: 9, r: '--muted' });
      return o + '</svg>';
    }
  },
});
