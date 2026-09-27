/* PLC temelleri: şemalar. */
Object.assign(SEMALAR, {
  plcTarama: (() => {
    const kutu = (x, y, n, t1, t2) => _kutu(x, y, 140, 40, { f: '--card' }) + _no(x + 16, y + 20, n) + _yazi(x + 80, y + 18, t1, { a: 'middle', b: 11, w: 600 }) + _yazi(x + 80, y + 32, t2, { a: 'middle', b: 9, r: '--muted' });
    const ok = (d, uc) => `<path d="${d}" style="stroke:var(--signal)" stroke-width="2.5" fill="none"></path><path d="${uc}" style="fill:var(--signal)"></path>`;
    return `<svg class="sema" viewBox="0 0 318 224" role="img" aria-label="PLC tarama çevrimi: girişleri oku, programı çalıştır, çıkışları yaz, iletişim">
      ${ok('M150 38H160', 'M168 38l-9-5v10z')}${ok('M238 58V158', 'M238 166l-5-9h10z')}
      ${ok('M168 186H158', 'M150 186l9-5v10z')}${ok('M80 166V66', 'M80 58l-5 9h10z')}
      ${kutu(10, 18, 1, 'Girişleri oku', 'I → hafıza')}${kutu(168, 18, 2, 'Program', 'satır satır çalışır')}
      ${kutu(168, 166, 3, 'Çıkışları yaz', 'hafıza → Q')}${kutu(10, 166, 4, 'İletişim, tanı', 'HMI, ağ, test')}
      ${_yazi(159, 104, 'Tarama süresi', { a: 'middle', b: 10, r: '--muted' })}${_yazi(159, 126, '1–20 ms', { a: 'middle', b: 17, w: 600 })}
    </svg>`;
  })(),

  /* Ayrıca kullanan: sensorler */
  plcGiris: (() => {
    const panel = (x0, pnp) => {
      let s = _yazi(x0 + 75, 14, pnp ? 'PNP sensör' : 'NPN sensör', { a: 'middle', b: 12, w: 600 });
      s += _yazi(x0 + 4, 28, '+24 V', { b: 9, r: '--muted' }) + _yazi(x0 + 4, 186, '0 V', { b: 9, r: '--muted' });
      s += _tel(`M${x0 + 2} 34H${x0 + 150}`, '--dc-plus', { w: 2.5 }) + _tel(`M${x0 + 2} 192H${x0 + 150}`, '--wire-n', { w: 2.5 });
      s += _tel(`M${x0 + 26} 34V70`, '--dc-plus', { w: 2 }) + _tel(`M${x0 + 26} 130V192`, '--wire-n', { w: 2 });
      s += `<circle cx="${x0 + 26}" cy="34" r="3" style="fill:var(--ink)"></circle><circle cx="${x0 + 26}" cy="192" r="3" style="fill:var(--ink)"></circle>`;
      s += _kutu(x0 + 10, 70, 54, 60, { f: '--card' }) + _yazi(x0 + 37, 104, pnp ? 'PNP' : 'NPN', { a: 'middle', b: 11, w: 600 });
      s += _tel(`M${x0 + 64} 100H${x0 + 90}`, '--ink', { w: 2.5 });
      s += pnp ? `<path d="M${x0 + 84} 100l-8-5v10z" style="fill:var(--ink)"></path>` : `<path d="M${x0 + 70} 100l8-5v10z" style="fill:var(--ink)"></path>`;
      s += _kutu(x0 + 90, 64, 50, 96, { f: '--card' }) + _yazi(x0 + 115, 80, 'PLC', { a: 'middle', b: 10, w: 600 });
      s += _yazi(x0 + 95, 96, 'I0.0', { b: 9, r: '--muted' });
      s += `<path d="M${x0 + 90} 100H${x0 + 116}V108M${x0 + 116} 130V140H${x0 + 140}" style="stroke:var(--ink)" stroke-width="1.5" fill="none"></path>`;
      s += `<rect x="${x0 + 111}" y="108" width="10" height="22" rx="1" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></rect>`;
      s += _yazi(x0 + 136, 154, '1M', { a: 'end', b: 9, r: '--muted' });
      s += pnp ? _tel(`M${x0 + 140} 140H${x0 + 146}V192`, '--wire-n', { w: 2 }) : _tel(`M${x0 + 140} 140H${x0 + 146}V34`, '--dc-plus', { w: 2 });
      s += `<circle cx="${x0 + 146}" cy="${pnp ? 192 : 34}" r="3" style="fill:var(--ink)"></circle>`;
      return s;
    };
    return `<svg class="sema" viewBox="0 0 318 200" role="img" aria-label="PNP ve NPN sensörün PLC dijital girişine bağlantısı">
      ${panel(4, true)}${panel(166, false)}
      ${_no(40, 52, 1)}${_no(77, 118, 2)}${_no(40, 160, 3)}${_no(128, 176, 4)}
    </svg>`;
  })(),

  ladderSembol: (() => {
    const hucre = (x, y, sembol, ad, acik) => {
      const cx = x + 36;
      let s = '';
      if (sembol === 'bobin' || sembol === 'S' || sembol === 'R') {
        s += `<path d="M${x + 8} ${y}H${cx - 9}M${cx + 9} ${y}H${x + 64}" style="stroke:var(--ink)" stroke-width="2" fill="none"></path>`;
        s += `<path d="M${cx - 5} ${y - 11}Q${cx - 13} ${y} ${cx - 5} ${y + 11}M${cx + 5} ${y - 11}Q${cx + 13} ${y} ${cx + 5} ${y + 11}" style="stroke:var(--ink)" stroke-width="2.2" fill="none"></path>`;
        if (sembol !== 'bobin') s += _yazi(cx, y + 4, sembol, { a: 'middle', b: 11, w: 600 });
      } else {
        s += `<path d="M${x + 8} ${y}H${cx - 7}M${cx + 7} ${y}H${x + 64}" style="stroke:var(--ink)" stroke-width="2" fill="none"></path>`;
        s += `<path d="M${cx - 7} ${y - 11}V${y + 11}M${cx + 7} ${y - 11}V${y + 11}" style="stroke:var(--ink)" stroke-width="2.5" fill="none"></path>`;
        if (sembol === 'NC') s += `<path d="M${cx - 7} ${y + 11}L${cx + 7} ${y - 11}" style="stroke:var(--ink)" stroke-width="1.8" fill="none"></path>`;
        if (sembol === 'P') s += _yazi(cx, y + 4, 'P', { a: 'middle', b: 11, w: 600 });
      }
      return s + _yazi(x + 72, y - 2, ad, { b: 11, w: 600 }) + _yazi(x + 72, y + 12, acik, { b: 9, r: '--muted' });
    };
    return `<svg class="sema" viewBox="0 0 318 180" role="img" aria-label="Ladder sembolleri: NO ve NC kontak, bobin, set, reset, yükselen kenar">
      <path d="M159 10V170M8 60H310M8 120H310" style="stroke:var(--line)" stroke-width="1" fill="none"></path>
      ${hucre(0, 30, 'NO', 'NO kontak', 'bit 1 → geçirir')}${hucre(159, 30, 'NC', 'NC kontak', 'bit 0 → geçirir')}
      ${hucre(0, 90, 'bobin', 'Bobin', 'satır → bit')}${hucre(159, 90, 'P', 'Kenar (P)', 'tek tarama 1')}
      ${hucre(0, 150, 'S', 'Set', 'bit 1’de kalır')}${hucre(159, 150, 'R', 'Reset', 'bit’i 0 yapar')}
    </svg>`;
  })(),

  plcAriza: (() => {
    const satirlar = [['Sensör / buton', 'sensörün kendi LED’i', '--signal'], ['Giriş LED’i', 'I0.0 yanıyor mu', '--signal'], ['Program (online)', 'bit ve satır koşulları', '--accent'], ['Çıkış LED’i', 'Q0.0 yanıyor mu', '--dc-plus'], ['Yük', 'uçlarında 24 V var mı', '--dc-plus']];
    let s = '';
    satirlar.forEach(([a, b, r], i) => {
      const y = 8 + i * 48;
      s += _kutu(48, y, 216, 36, { f: '--card' }) + `<rect x="48" y="${y}" width="8" height="36" rx="3" style="fill:var(${r})"></rect>`;
      s += _yazi(68, y + 16, a, { b: 12, w: 600 }) + _yazi(68, y + 30, b, { b: 9, r: '--muted' }) + _no(24, y + 18, i + 1);
      if (i < 4) s += `<path d="M156 ${y + 36}V${y + 42}" style="stroke:var(--ink)" stroke-width="2" fill="none"></path><path d="M156 ${y + 48}l-5-7h10z" style="fill:var(--ink)"></path>`;
    });
    const grup = (y1, y2, t) => `<path d="M272 ${y1}H278V${y2}H272" style="stroke:var(--muted)" stroke-width="1.2" fill="none"></path><text x="0" y="0" font-size="9" text-anchor="middle" transform="translate(292 ${(y1 + y2) / 2}) rotate(90)" style="fill:var(--muted)">${t}</text>`;
    return `<svg class="sema" viewBox="0 0 318 248" role="img" aria-label="PLC arızasında sinyal yolu: sensör, giriş LED’i, program, çıkış LED’i, yük">${s}
      ${grup(10, 90, 'giriş tarafı')}${grup(154, 234, 'çıkış tarafı')}
    </svg>`;
  })(),

  veriBoyut: (() => {
    let s = '';
    for (let b = 0; b < 4; b++) {
      const x0 = 20 + b * 70;
      s += _yazi(x0 + 35, 32, 'MB' + b, { a: 'middle', b: 10, w: 600 });
      for (let i = 0; i < 8; i++) {
        const on = b === 0 && i === 7;
        s += `<rect x="${x0 + i * 8.75}" y="38" width="8.75" height="20" style="fill:var(${on ? '--accent' : '--card'});stroke:var(--ink)" stroke-width="${i === 0 ? 1.8 : 0.8}"></rect>`;
      }
    }
    s += `<rect x="20" y="38" width="280" height="20" style="fill:none;stroke:var(--ink)" stroke-width="1.8"></rect>`;
    const parantez = (x1, x2, y, t, renk, kesik) => `<path d="M${x1} ${y - 6}V${y}H${x2}V${y - 6}" style="stroke:var(${renk})" stroke-width="1.5"${kesik ? ' stroke-dasharray="4 3"' : ''} fill="none"></path>` + _yazi((x1 + x2) / 2, y + 13, t, { a: 'middle', b: 10, w: 600, r: renk });
    s += parantez(21, 159, 70, 'MW0', '--ink') + parantez(161, 299, 70, 'MW2', '--ink');
    s += parantez(91, 229, 104, 'MW1 · MW0 ile çakışır', '--dc-plus', true);
    s += parantez(21, 299, 138, 'MD0 (32 bit)', '--signal');
    return `<svg class="sema" viewBox="0 0 318 190" role="img" aria-label="Bit, byte, word ve double word adresleri; MW0 ile MW1’in çakışması">${s}
      ${_cizgi('M86 38L96 18')}${_yazi(99, 16, '%M0.0', { b: 10, w: 600 })}
      ${_yazi(159, 178, 'Siemens: MW0 = MB0 (yüksek) + MB1 (düşük)', { a: 'middle', b: 9, r: '--muted' })}
      ${_no(148, 12, 1)}${_no(10, 28, 2)}${_no(304, 70, 3)}${_no(304, 138, 4)}${_no(246, 102, 5)}
    </svg>`;
  })(),
});
