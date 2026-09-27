/* PLC temelleri: simülasyonlar. */
Object.assign(SIMLER, {
  zamanlayici: {
    not: 'IN’i aç-kapa ve Q’nun ne zaman değiştiğini izle. Modu değiştirerek TON, TOF ve TP’yi karşılaştır.',
    yeni: () => ({ mod: 'TON', pt: 3, inp: false, q: false, et: 0, gecmis: [] }),
    tik(s, dt) {
      if (s.mod === 'TON') {
        if (s.inp) { s.et = Math.min(s.pt, s.et + dt); s.q = s.et >= s.pt - 1e-9; } else { s.et = 0; s.q = false; }
      } else if (s.mod === 'TOF') {
        if (s.inp) { s.q = true; s.et = 0; } else if (s.q) { s.et = Math.min(s.pt, s.et + dt); if (s.et >= s.pt - 1e-9) s.q = false; } else s.et = 0;
      } else {
        if (s.inp && !s.onceki && !s.q) { s.q = true; s.et = 0; }
        if (s.q) { s.et = Math.min(s.pt, s.et + dt); if (s.et >= s.pt - 1e-9) s.q = false; } else if (!s.inp) s.et = 0;
        s.onceki = s.inp;
      }
      s.gecmis.push([s.inp, s.q]);
      if (s.gecmis.length > 100) s.gecmis.shift();
    },
    olay(s, o) {
      if (o === 'in') s.inp = !s.inp;
      else if (o === 'mod') { const l = ['TON', 'TOF', 'TP']; s.mod = l[(l.indexOf(s.mod) + 1) % l.length]; s.et = 0; s.q = false; s.onceki = s.inp; }
      else if (o === 'pt') { const l = [2, 3, 5]; s.pt = l[(l.indexOf(s.pt) + 1) % l.length]; s.et = 0; }
    },
    dugmeler: (s) => [['in', s.inp ? 'IN = 1 · kapat' : 'IN = 0 · aç', s.inp], ['mod', `Mod: ${s.mod}`], ['pt', `PT: ${s.pt} s`]],
    durum(s) {
      if (s.mod === 'TON') {
        if (s.inp && !s.q) return { metin: `IN = 1: süre sayılıyor, ET = ${sayi(s.et, 1)} / ${s.pt} s. Q henüz 0.` };
        if (s.q) return { metin: 'ET, PT’ye ulaştı: Q = 1. IN kapanınca Q hemen 0 olur.' };
        return { metin: 'IN = 0: ET sıfırda, Q = 0.' };
      }
      if (s.mod === 'TP') {
        if (s.q) return { metin: `Darbe sürüyor: ET = ${sayi(s.et, 1)} / ${s.pt} s. IN ne yaparsa yapsın Q süre dolana kadar 1.` };
        if (s.inp) return { metin: 'Süre doldu, Q = 0. Yeni darbe için IN’i kapatıp yeniden aç.' };
        return { metin: 'Q = 0. IN’i açınca (yükselen kenar) Q, PT süresince 1 olur.' };
      }
      if (s.inp) return { metin: 'IN = 1: Q hemen 1 oldu.' };
      if (s.q) return { metin: `IN düştü: süre sayılıyor, ET = ${sayi(s.et, 1)} / ${s.pt} s. Q hâlâ 1.` };
      return { metin: 'Q = 0.' };
    },
    ciz(s) {
      const x0 = 40, adim = 266 / 100;
      const dalga = (idx, yUst, yAlt) => {
        const g = s.gecmis;
        if (!g.length) return `M${x0} ${yAlt}H306`;
        const bas = x0 + (100 - g.length) * adim;
        let d = `M${x0} ${yAlt}H${bas.toFixed(1)}`;
        let onceki = null;
        g.forEach((v, i) => {
          const y = v[idx] ? yUst : yAlt;
          const x = (bas + i * adim).toFixed(1);
          if (onceki === null) d += `V${y}`;
          else if (y !== onceki) d += `H${x}V${y}`;
          onceki = y;
        });
        return d + 'H306';
      };
      let o = `<svg class="sema" viewBox="0 0 318 168" role="img" aria-label="Zamanlayıcı giriş ve çıkış sinyallerinin zaman grafiği">`;
      o += _yazi(8, 44, 'IN', { b: 11, w: 600 }) + _yazi(8, 104, 'Q', { b: 11, w: 600 });
      o += `<path d="M${x0} 52H306M${x0} 112H306" style="stroke:var(--line)" stroke-width="1" stroke-dasharray="3 3" fill="none"></path>`;
      o += _tel(dalga(0, 28, 52), '--ink', { w: 2.5 }) + _tel(dalga(1, 88, 112), '--signal', { w: 2.5 });
      o += _yazi(8, 150, 'ET', { b: 11, w: 600 });
      o += `<rect x="${x0}" y="140" width="266" height="12" rx="6" style="fill:var(--chip)"></rect><rect x="${x0}" y="140" width="${(266 * Math.min(1, s.et / s.pt)).toFixed(1)}" height="12" rx="6" style="fill:var(--accent)"></rect>`;
      o += _yazi(306, 134, `${sayi(s.et, 1)} / ${s.pt} s`, { a: 'end', b: 10, r: '--muted' });
      o += _yazi(306, 20, 'son 10 s', { a: 'end', b: 9, r: '--muted' });
      return o + '</svg>';
    }
  },

  ladderMuhur: {
    not: 'Start ve Stop’a bas. Sarı kontaklar o an geçirgen, kırmızı çizgiler enerjili yolu gösterir. Stop kablosunu koparıp ne olduğuna bak.',
    yeni: () => ({ start: false, stop: false, kopuk: false, q: false }),
    hesapla(s) {
      s.i0 = s.start;
      s.i1 = !s.stop && !s.kopuk;
      s.q = s.i1 && (s.i0 || s.q);
    },
    olay(s, o, guncelle) {
      if (o === 'start') { s.start = true; setTimeout(() => { s.start = false; this.hesapla(s); guncelle(); }, 700); }
      else if (o === 'stop') { s.stop = true; setTimeout(() => { s.stop = false; this.hesapla(s); guncelle(); }, 500); }
      else if (o === 'kopuk') s.kopuk = !s.kopuk;
      this.hesapla(s);
    },
    dugmeler: (s) => [['start', 'Start (I0.0)'], ['stop', 'Stop (I0.1)'], ['kopuk', s.kopuk ? 'Kabloyu onar' : 'Stop kablosunu kopar', s.kopuk]],
    durum(s) {
      if (s.kopuk && s.start) return { metin: 'Kablo kopukken Start işe yaramaz: I0.1 = 0, satır açık. Arıza giderilmeden makine kalkmaz.', uyari: true };
      if (s.kopuk) return { metin: 'Stop kablosu koptu: I0.1 = 0 oldu ve Q0.0 düştü. NC bağlantı kopuk kabloyu stop gibi görür; güvenli taraf budur.', uyari: true };
      if (s.stop) return { metin: 'Stop basılı: NC kontak açıldı, I0.1 = 0. Satır kesildi, Q0.0 = 0.' };
      if (s.start && s.q) return { metin: 'Start basılı: I0.0 = 1, Q0.0 = 1. Bırakınca Q0.0 kendi kontağıyla kendini tutar.' };
      if (s.q) return { metin: 'Q0.0 = 1: alttaki Q0.0 kontağı Start’ı köprülüyor (mühür). Durdurmak için Stop.' };
      return { metin: 'Q0.0 = 0. I0.1 LED’i yanıyor: Stop NC bağlı olduğu için basılı değilken 1 okunur.' };
    },
    ciz(s) {
      const y = 58, yb = 112;
      const kontak = (x, yy, gecir) => `${gecir ? `<rect x="${x - 7}" y="${yy - 10}" width="14" height="20" style="fill:var(--accent)"></rect>` : ''}<path d="M${x - 7} ${yy - 11}V${yy + 11}M${x + 7} ${yy - 11}V${yy + 11}" style="stroke:var(--ink)" stroke-width="2.5" fill="none"></path>`;
      const bobin = (x, yy, acik) => `${acik ? `<circle cx="${x}" cy="${yy}" r="9" style="fill:var(--accent)"></circle>` : ''}<path d="M${x - 5} ${yy - 11}Q${x - 13} ${yy} ${x - 5} ${yy + 11}M${x + 5} ${yy - 11}Q${x + 13} ${yy} ${x + 5} ${yy + 11}" style="stroke:var(--ink)" stroke-width="2.2" fill="none"></path>`;
      const led = (x, ad, acik) => `<circle cx="${x}" cy="176" r="6" style="fill:var(${acik ? '--accent' : '--card'});stroke:var(--ink)" stroke-width="1.5"></circle>` + _yazi(x + 10, 180, ad, { b: 10 });
      let o = `<svg class="sema" viewBox="0 0 318 196" role="img" aria-label="Ladder start-stop mühürleme satırı">`;
      o += `<path d="M14 26V142M304 26V142" style="stroke:var(--ink)" stroke-width="3" fill="none"></path>`;
      o += _tel(`M14 ${y}H59`, CANLI, { w: 2.5 });
      o += _tel(`M73 ${y}H110`, R(s.i1), { w: 2.5 });
      o += _tel(`M110 ${y}H143M110 ${y}V${yb}H143`, R(s.i1), { w: 2.5 });
      o += _tel(`M157 ${y}H190`, R(s.i1 && s.i0), { w: 2.5 });
      o += _tel(`M157 ${yb}H190V${y}`, R(s.i1 && s.q), { w: 2.5 });
      o += _tel(`M190 ${y}H239`, R(s.q), { w: 2.5 });
      o += _tel(`M257 ${y}H304`, '--ink', { w: 2.5 });
      o += `<circle cx="110" cy="${y}" r="3" style="fill:var(--ink)"></circle><circle cx="190" cy="${y}" r="3" style="fill:var(--ink)"></circle>`;
      o += kontak(66, y, s.i1) + kontak(150, y, s.i0) + kontak(150, yb, s.q) + bobin(248, y, s.q);
      o += _yazi(66, 36, 'I0.1 Stop', { a: 'middle', b: 10, w: 600 }) + _yazi(150, 36, 'I0.0 Start', { a: 'middle', b: 10, w: 600 }) + _yazi(248, 36, 'Q0.0 Motor', { a: 'middle', b: 10, w: 600 });
      o += _yazi(150, 138, 'Q0.0 (mühür)', { a: 'middle', b: 10, w: 600 });
      o += _yazi(66, 84, 'NC bağlı', { a: 'middle', b: 9, r: '--muted' });
      o += `<path d="M8 158H310" style="stroke:var(--line)" stroke-width="1" fill="none"></path>`;
      o += led(24, 'I0.0', s.i0) + led(96, 'I0.1', s.i1) + led(168, 'Q0.0', s.q);
      o += _yazi(306, 180, 'LED’ler', { a: 'end', b: 9, r: '--muted' });
      return o + '</svg>';
    }
  },

  sayici: {
    not: 'Her CU basışı, sensörün önünden bir ürün geçmesi gibidir. CV, PV’ye ulaşınca Q = 1 olur; R ile sıfırla.',
    yeni: () => ({ cv: 0, pv: 3, cu: false }),
    olay(s, o, guncelle) {
      if (o === 'cu') { s.cv = Math.min(s.cv + 1, 999); s.cu = true; clearTimeout(s.zaman); s.zaman = setTimeout(() => { s.cu = false; guncelle(); }, 300); }
      else if (o === 'r') s.cv = 0;
      else if (o === 'pv') { const l = [3, 5, 8]; s.pv = l[(l.indexOf(s.pv) + 1) % l.length]; }
    },
    dugmeler: (s) => [['cu', 'CU darbesi (+1)'], ['r', 'R · sıfırla'], ['pv', `PV: ${s.pv}`]],
    durum(s) {
      if (s.cv >= s.pv) return { metin: `CV = ${s.cv} ≥ PV = ${s.pv}: Q = 1. Sayıcı saymaya devam eder; R ile sıfırla.` };
      return { metin: `CV = ${s.cv}, PV = ${s.pv}: Q = 0. ${s.pv - s.cv} darbe daha gerekli.` };
    },
    ciz(s) {
      const q = s.cv >= s.pv;
      let o = `<svg class="sema" viewBox="0 0 318 176" role="img" aria-label="Yukarı sayıcı CTU bloğu">`;
      o += _tel('M52 48H112', R(s.cu), { w: 2.5 }) + _tel('M52 76H112', '--ink', { w: 2 }) + _tel('M52 104H112', '--ink', { w: 2 });
      o += _yazi(46, 52, 'I0.2', { a: 'end', b: 10, w: 600 }) + _yazi(46, 80, 'I0.3', { a: 'end', b: 10, w: 600 }) + _yazi(46, 108, String(s.pv), { a: 'end', b: 12, w: 600 });
      o += _kutu(112, 14, 94, 106, { rx: 4, f: '--card' });
      o += `<path d="M112 32H206" style="stroke:var(--ink)" stroke-width="1.5" fill="none"></path>` + _yazi(159, 28, 'CTU', { a: 'middle', b: 11, w: 600 });
      o += _yazi(118, 52, 'CU', { b: 10 }) + _yazi(118, 80, 'R', { b: 10 }) + _yazi(118, 108, 'PV', { b: 10 });
      o += _yazi(200, 52, 'Q', { a: 'end', b: 10 }) + _yazi(200, 108, 'CV', { a: 'end', b: 10 });
      o += _tel('M206 48H262', R(q), { w: 2.5 }) + _lamba(272, 48, q) + _tel('M206 104H236', '--ink', { w: 2 });
      o += _yazi(242, 109, String(s.cv), { b: 15, w: 600 });
      const n = s.pv, ara = 24, bas = 159 - ((n - 1) * ara) / 2;
      for (let i = 0; i < n; i++) o += `<circle cx="${bas + i * ara}" cy="150" r="8" style="fill:var(${i < s.cv ? '--accent' : '--card'});stroke:var(--ink)" stroke-width="1.5"></circle>`;
      if (s.cv > n) o += _yazi(bas + (n - 1) * ara + 16, 154, `+${s.cv - n}`, { b: 11, w: 600 });
      return o + '</svg>';
    }
  },

  pid: {
    not: 'Kp, I ve D’yi değiştir; SP’yi değiştir ya da bozucu ekleyip PV’nin tepkisini izle. Süreç: 5 s zaman sabitli, 1 s ölü zamanlı bir ısıtıcı.',
    yeni: () => ({ sp: 60, pv: 20, onceki: 20, cv: 0, ig: 0, kp: 2, ti: 0, td: 0, boz: false, gecikme: [], gecmis: [] }),
    tik(s, dt) {
      const h = 0.05, adim = Math.max(1, Math.round((dt * 2) / h));
      for (let k = 0; k < adim; k++) {
        const e = s.sp - s.pv;
        const dpv = (s.pv - s.onceki) / h;
        s.onceki = s.pv;
        let cv = s.kp * e + s.ig - s.kp * s.td * dpv;
        const ust = cv >= 100, alt = cv <= 0;
        cv = Math.max(0, Math.min(100, cv));
        if (s.ti > 0 && !((ust && e > 0) || (alt && e < 0))) s.ig += ((s.kp / s.ti) * e) * h;
        if (s.ti === 0) s.ig = 0;
        s.cv = cv;
        s.gecikme.push(cv);
        const u = s.gecikme.length > 1 / h ? s.gecikme.shift() : 0;
        s.pv += (h / 5) * (-(s.pv - 20) + 0.8 * u + (s.boz ? -25 : 0));
      }
      s.gecmis.push([s.sp, s.pv, s.cv]);
      if (s.gecmis.length > 150) s.gecmis.shift();
    },
    olay(s, o) {
      const sonraki = (l, v) => l[(l.indexOf(v) + 1) % l.length];
      if (o === 'kp') s.kp = sonraki([0.5, 1, 2, 5, 9], s.kp);
      else if (o === 'ti') s.ti = sonraki([0, 8, 4, 1.5], s.ti);
      else if (o === 'td') s.td = s.td ? 0 : 0.5;
      else if (o === 'sp') s.sp = sonraki([60, 80, 40], s.sp);
      else if (o === 'boz') s.boz = !s.boz;
    },
    dugmeler: (s) => [['kp', `Kp: ${sayi(s.kp)}`], ['ti', 'I: ' + { 0: 'kapalı', 8: 'yavaş', 4: 'orta', 1.5: 'hızlı' }[s.ti]], ['td', s.td ? 'D: açık' : 'D: kapalı', s.td > 0], ['sp', `SP: ${s.sp}`], ['boz', s.boz ? 'Bozucuyu kaldır' : 'Bozucu ekle', s.boz]],
    durum(s) {
      const e = s.sp - s.pv, g = s.gecmis.slice(-50);
      let gecis = 0;
      for (let i = 1; i < g.length; i++) if (Math.sign(g[i][1] - g[i][0]) !== Math.sign(g[i - 1][1] - g[i - 1][0])) gecis++;
      const pvler = g.map((x) => x[1]), aralik = pvler.length ? Math.max(...pvler) - Math.min(...pvler) : 0;
      const son = s.gecmis.slice(-25).map((x) => x[1]), sakin = son.length >= 25 && Math.max(...son) - Math.min(...son) < 0.3;
      if (gecis >= 3 && aralik > 3) return { metin: 'Salınım var: Kp ya da I fazla. Birini azalt ya da D’yi aç.', uyari: true };
      if (s.cv >= 99.9 && e > 1) return { metin: `Çıkış %100’de: ısıtıcı tam güçte, PV yükseliyor. Hata ${sayi(e, 1)}.` };
      if (Math.abs(e) < 0.5) return { metin: `PV hedefte (SP = ${s.sp}). SP’yi değiştir ya da bozucu ekle.` };
      if (s.ti === 0 && sakin) return { metin: `Yalnız P: kalıcı hata ${sayi(e, 1)}. I’yı aç; hata zamanla sıfırlanır.` };
      return { metin: `Hedefe gidiyor: hata ${sayi(e, 1)}, çıkış %${sayi(s.cv, 0)}.` };
    },
    ciz(s) {
      const x0 = 34, gen = 272, Y = (v) => (150 - 1.3 * Math.max(0, Math.min(100, v))).toFixed(1);
      const g = s.gecmis, bas = 150 - g.length;
      const yol = (i) => g.map((p, j) => (j ? 'L' : 'M') + (x0 + ((bas + j) * gen) / 150).toFixed(1) + ' ' + Y(p[i])).join('');
      let o = `<svg class="sema" viewBox="0 0 318 196" role="img" aria-label="PID kontrol: hedef, ölçülen değer ve çıkışın zaman grafiği">`;
      o += `<path d="M${x0} ${Y(0)}H306M${x0} ${Y(50)}H306M${x0} ${Y(100)}H306" style="stroke:var(--line)" stroke-width="1" stroke-dasharray="3 3" fill="none"></path>`;
      o += _yazi(28, +Y(0) + 3, '0', { a: 'end', b: 9, r: '--muted' }) + _yazi(28, +Y(50) + 3, '50', { a: 'end', b: 9, r: '--muted' }) + _yazi(28, +Y(100) + 3, '100', { a: 'end', b: 9, r: '--muted' });
      if (g.length > 1) o += _tel(yol(2), '--muted', { w: 1.5 }) + _tel(yol(0), '--accent', { w: 2.5, k: '6 4' }) + _tel(yol(1), '--signal', { w: 2.5 });
      o += _yazi(306, 11, `PV ${sayi(s.pv, 1)} · CV %${sayi(s.cv, 0)}`, { a: 'end', b: 10, w: 600 });
      if (s.boz) o += _yazi(x0 + 4, 11, 'bozucu etkin', { b: 9, w: 600, r: '--dc-plus' });
      const lej = (x, renk, t, k) => `<path d="M${x} 180H${x + 18}" style="stroke:var(${renk})" stroke-width="2.5"${k ? ' stroke-dasharray="6 4"' : ''}></path>` + _yazi(x + 22, 184, t, { b: 9 });
      o += lej(34, '--accent', 'SP hedef', true) + lej(120, '--signal', 'PV ölçülen') + lej(214, '--muted', 'CV çıkış');
      o += _yazi(306, 166, 'son 30 s', { a: 'end', b: 8, r: '--muted' });
      return o + '</svg>';
    }
  },
});
