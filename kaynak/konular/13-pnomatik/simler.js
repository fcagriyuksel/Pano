/* Pnömatik: simülasyonlar. */
Object.assign(SIMLER, {
  valf52: {
    not: 'Monostabil valf bobin enerjisi kesilince yayla döner; bistabil valf son konumunu hatırlar. Valf tipini değiştirip havayı kesmeyi de dene.',
    yeni: () => ({ mod: 'mono', y1: false, y2: false, konum: 'a', hava: true, poz: 0 }),
    hesapla(s) {
      if (s.mod === 'mono') s.konum = s.y1 ? 'b' : 'a';
      else if (s.y1 && !s.y2) s.konum = 'b';
      else if (s.y2 && !s.y1) s.konum = 'a';
    },
    tik(s, dt) {
      if (!s.hava) return;
      const hedef = s.konum === 'b' ? 1 : 0, fark = hedef - s.poz;
      s.poz += Math.sign(fark) * Math.min(Math.abs(fark), 0.8 * dt);
    },
    olay(s, o, guncelle) {
      const darbe = (k) => { s[k] = true; this.hesapla(s); setTimeout(() => { s[k] = false; this.hesapla(s); guncelle(); }, 600); };
      if (o === 'y1') { if (s.mod === 'mono') s.y1 = !s.y1; else darbe('y1'); }
      else if (o === 'y2') darbe('y2');
      else if (o === 'hava') s.hava = !s.hava;
      else if (o === 'mod') { s.mod = s.mod === 'mono' ? 'bi' : 'mono'; s.y1 = false; s.y2 = false; }
      this.hesapla(s);
    },
    dugmeler: (s) => s.mod === 'mono'
      ? [['y1', s.y1 ? 'Y1 enerjili · kes' : 'Y1’i enerjile', s.y1], ['hava', s.hava ? 'Havayı kes' : 'Havayı aç', !s.hava], ['mod', 'Valf: monostabil']]
      : [['y1', 'Y1 darbesi', s.y1], ['y2', 'Y2 darbesi', s.y2], ['hava', s.hava ? 'Havayı kes' : 'Havayı aç', !s.hava], ['mod', 'Valf: bistabil']],
    durum(s) {
      const ileri = s.poz >= 0.97, geri = s.poz <= 0.03, hedefIleri = s.konum === 'b';
      if (!s.hava) return { metin: 'Hava kesik: silindir olduğu yerde kalır ve kuvvet uygulamaz. Valf konumu değişse de hareket olmaz.', uyari: true };
      if (hedefIleri && !ileri) return { metin: 'Valf b konumunda: 1→4 basınçlı, 2→3 egzoz. Silindir ileri gidiyor…' };
      if (!hedefIleri && !geri) return { metin: 'Valf a konumunda: 1→2 basınçlı, 4→5 egzoz. Silindir geri dönüyor…' };
      if (s.mod === 'mono') return hedefIleri
        ? { metin: 'Y1 enerjili: silindir ileride, B2 algılıyor. Y1 kesilince yay valfi geri iter ve silindir döner.' }
        : { metin: 'Y1 enerjisiz: yay valfi a konumunda tutar, silindir geride, B1 algılıyor.' };
      return hedefIleri
        ? { metin: 'Y1 darbesi yetti: bistabil valf b konumunu hatırlar. Bobin enerjisizken de silindir ileride kalır.' }
        : { metin: 'Silindir geride, B1 algılıyor. Bistabil valfi ileri almak için Y1’e bir darbe ver.' };
    },
    ciz(s) {
      const px = 46 + s.poz * 100, b = s.konum === 'b', hava = s.hava;
      const basinc = (on) => (hava && on ? '--signal' : '--muted');
      const dx = b ? 60 : 0;
      const kutu = (x, ic) => `<rect x="${x}" y="150" width="60" height="40" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>${ic}`;
      const ok = (x1, y1, x2, y2) => { const a = Math.atan2(y2 - y1, x2 - x1), u = 7; return `<path d="M${x1} ${y1}L${x2} ${y2}" style="stroke:var(--ink)" stroke-width="1.5"></path><path d="M${x2} ${y2}L${(x2 - u * Math.cos(a - 0.4)).toFixed(1)} ${(y2 - u * Math.sin(a - 0.4)).toFixed(1)}L${(x2 - u * Math.cos(a + 0.4)).toFixed(1)} ${(y2 - u * Math.sin(a + 0.4)).toFixed(1)}Z" style="fill:var(--ink)"></path>`; };
      const xa = 131 + dx, xb = 71 + dx;
      const kutuA = kutu(xa, ok(xa + 30, 188, xa + 45, 152) + ok(xa + 15, 152, xa + 5, 188));
      const kutuB = kutu(xb, ok(xb + 30, 188, xb + 15, 152) + ok(xb + 45, 152, xb + 55, 188));
      const bobin = (x, ad, on) => `<rect x="${x}" y="158" width="20" height="24" style="fill:var(${on ? '--accent' : '--card'});stroke:var(--ink)" stroke-width="1.5"></rect><path d="M${x} 182L${x + 20} 158" style="stroke:var(--ink)" stroke-width="1"></path>` + _yazi(x + 10, 150, ad, { a: 'middle', b: 9, w: 600 });
      const yay = (x) => `<path d="M${x} 170l4-8 4 16 4-16 4 16 4-8" style="stroke:var(--ink)" stroke-width="1.5" fill="none"></path>`;
      const sol = bobin(xb - 20, 'Y1', s.y1);
      const sag = s.mod === 'mono' ? yay(xa + 60) : bobin(xa + 60, 'Y2', s.y2);
      const sensor = (x, ad, on) => `<rect x="${x}" y="8" width="22" height="9" rx="2" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.2"></rect><circle cx="${x + 16}" cy="12.5" r="2.6" style="fill:var(${on ? '--accent' : '--line'})"></circle>` + _yazi(x - 4, 16, ad, { a: 'end', b: 9, w: 600 });
      let o = `<svg class="sema" viewBox="0 0 318 236" role="img" aria-label="5/2 valf ve çift etkili silindir simülasyonu">`;
      o += `<rect x="40" y="22" width="150" height="36" rx="3" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>`;
      o += `<rect x="42" y="24" width="${(px - 42).toFixed(1)}" height="32" style="fill:var(--signal);opacity:${hava && b ? 0.22 : 0}"></rect>`;
      o += `<rect x="${(px + 10).toFixed(1)}" y="24" width="${(188 - px - 10).toFixed(1)}" height="32" style="fill:var(--signal);opacity:${hava && !b ? 0.22 : 0}"></rect>`;
      o += `<rect x="34" y="18" width="7" height="44" rx="2" style="fill:var(--chip);stroke:var(--ink)" stroke-width="1.2"></rect><rect x="190" y="18" width="7" height="44" rx="2" style="fill:var(--chip);stroke:var(--ink)" stroke-width="1.2"></rect>`;
      o += `<rect x="${px.toFixed(1)}" y="24" width="10" height="32" rx="2" style="fill:var(--hatch);stroke:var(--ink)" stroke-width="1.2"></rect>`;
      o += `<rect x="${(px + 10).toFixed(1)}" y="35" width="152" height="10" rx="2" style="fill:var(--rail);stroke:var(--ink)" stroke-width="1.2"></rect>`;
      o += sensor(46, 'B1', s.poz <= 0.08) + sensor(146, 'B2', s.poz >= 0.92);
      o += _tel('M52 58V104H146V150', basinc(b), { w: 2.5 }) + _tel('M176 58V150', basinc(!b), { w: 2.5 });
      o += _yazi(140, 146, '4', { a: 'end', b: 9, r: '--muted' }) + _yazi(182, 146, '2', { b: 9, r: '--muted' });
      o += kutuB + kutuA + sol + sag;
      o += _tel('M161 190V214', hava ? '--signal' : '--muted', { w: 2.5 }) + `<path d="M161 214l-7 10h14z" style="fill:var(${hava ? '--signal' : '--muted'})"></path>`;
      o += _tel('M136 190V200M186 190V200', '--ink', { w: 1.5 }) + `<path d="M130 200h12l-6 8zM180 200h12l-6 8z" style="fill:none;stroke:var(--ink)" stroke-width="1.2"></path>`;
      o += _yazi(128, 204, '5', { a: 'end', b: 9, r: '--muted' }) + _yazi(168, 208, '1', { b: 9, r: '--muted' }) + _yazi(196, 204, '3', { b: 9, r: '--muted' });
      o += _yazi(176, 232, hava ? 'hava: 6 bar' : 'hava kesik', { b: 9, w: 600, r: hava ? '--ink' : '--dc-plus' });
      o += _yazi(310, 104, b ? 'b konumu' : 'a konumu', { a: 'end', b: 10, w: 600 });
      return o + '</svg>';
    }
  },
});
