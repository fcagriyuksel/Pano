/* Kablo ve topraklama: şemalar. */
Object.assign(SEMALAR, {
  akimSirasi: `<svg class="sema" viewBox="0 0 318 126" role="img" aria-label="Ib küçük eşit In küçük eşit Iz sıralaması">
    ${_tel('M20 62H296', '--ink', { w: 2 })}<path d="M300 62l-8-5v10z" style="fill:var(--ink)"></path>
    ${_yazi(302, 82, 'A', { a: 'end', b: 10, r: '--muted' })}
    <circle cx="70" cy="62" r="7" style="fill:var(--signal)"></circle><circle cx="160" cy="62" r="7" style="fill:var(--accent);stroke:var(--ink)" stroke-width="1"></circle><circle cx="250" cy="62" r="7" style="fill:var(--wire-l)"></circle>
    ${_yazi(70, 42, 'Ib', { a: 'middle', b: 16, w: 600 })}${_yazi(115, 44, '≤', { a: 'middle', b: 18 })}${_yazi(160, 42, 'In', { a: 'middle', b: 16, w: 600 })}${_yazi(205, 44, '≤', { a: 'middle', b: 18 })}${_yazi(250, 42, 'Iz', { a: 'middle', b: 16, w: 600 })}
    ${_yazi(70, 86, 'yük', { a: 'middle', b: 10, r: '--muted' })}${_yazi(160, 86, 'sigorta', { a: 'middle', b: 10, r: '--muted' })}${_yazi(250, 86, 'kablo', { a: 'middle', b: 10, r: '--muted' })}
    ${_no(70, 110, 1)}${_no(160, 110, 2)}${_no(250, 110, 3)}
  </svg>`,

  gerilimHat: `<svg class="sema" viewBox="0 0 318 174" role="img" aria-label="Panodan yüke uzanan hatta gerilim düşümü">
    ${_kutu(10, 40, 70, 80, { f: '--card' })}${_yazi(45, 72, 'Pano', { a: 'middle', b: 12, w: 600 })}${_yazi(45, 92, 'U₁', { a: 'middle', b: 12 })}
    ${_kutu(238, 40, 70, 80, { f: '--card' })}${_yazi(273, 72, 'Yük', { a: 'middle', b: 12, w: 600 })}${_yazi(273, 92, 'U₂', { a: 'middle', b: 12 })}
    ${_tel('M80 64H238', '--wire-l', { w: 3 })}${_tel('M80 96H238', '--wire-n', { w: 3 })}
    <path d="M166 64l-9-5v10z" style="fill:var(--ink)"></path>${_yazi(159, 56, 'I', { a: 'middle', b: 12, w: 600 })}
    ${_tel('M80 22H238M80 17V27M238 17V27', '--muted', { w: 1.2 })}${_yazi(159, 16, 'L (tek yön) · S (kesit)', { a: 'middle', b: 10, r: '--muted' })}
    ${_yazi(159, 162, 'U₂ = U₁ − ΔU', { a: 'middle', b: 12, w: 600 })}
    ${_cizgi('M45 121V130M273 121V130')}
    ${_no(45, 140, 1)}${_no(159, 116, 2)}${_no(273, 140, 3)}
  </svg>`,

  topraklama: (() => {
    const toprak = (x, y) => `<path d="M${x} ${y}V${y + 6}M${x - 8} ${y + 6}H${x + 8}M${x - 5} ${y + 10}H${x + 5}M${x - 2} ${y + 14}H${x + 2}" style="stroke:var(--ink)" stroke-width="1.5" fill="none"></path>`;
    const trafo = (y0) => `<circle cx="26" cy="${y0 + 46}" r="11" style="fill:none;stroke:var(--ink)" stroke-width="1.5"></circle><circle cx="40" cy="${y0 + 46}" r="11" style="fill:none;stroke:var(--ink)" stroke-width="1.5"></circle>`;
    const yuk = (y0) => _kutu(246, y0 + 22, 56, 50, { f: '--card' }) + _yazi(274, y0 + 51, 'Yük', { a: 'middle', b: 11 });
    const pen = (d) => _tel(d, '--wire-pe') + _tel(d, '--wire-n', { k: '3 9' });
    let s = '';
    let y0 = 4;
    s += _yazi(8, y0 + 14, 'TN-S', { b: 12, w: 600 }) + trafo(y0);
    s += _tel(`M51 ${y0 + 32}H246`, '--wire-l') + _tel(`M51 ${y0 + 46}H246`, '--wire-n') + _pe(`M62 ${y0 + 46}V${y0 + 62}H246`);
    s += `<circle cx="62" cy="${y0 + 46}" r="3" style="fill:var(--ink)"></circle>` + toprak(62, y0 + 62) + yuk(y0);
    y0 = 104;
    s += _yazi(8, y0 + 14, 'TN-C-S', { b: 12, w: 600 }) + trafo(y0);
    s += _tel(`M51 ${y0 + 32}H246`, '--wire-l') + pen(`M51 ${y0 + 50}H150`);
    s += _tel(`M150 ${y0 + 50}V${y0 + 46}H246`, '--wire-n') + _pe(`M150 ${y0 + 50}V${y0 + 62}H246`);
    s += `<circle cx="150" cy="${y0 + 50}" r="3.5" style="fill:var(--ink)"></circle>` + toprak(62, y0 + 62) + _tel(`M62 ${y0 + 50}V${y0 + 62}`, '--ink', { w: 1.5 }) + `<circle cx="62" cy="${y0 + 50}" r="3" style="fill:var(--ink)"></circle>`;
    s += _yazi(150, y0 + 88, 'ayrılma noktası', { a: 'middle', b: 9, r: '--muted' }) + yuk(y0);
    y0 = 204;
    s += _yazi(8, y0 + 14, 'TT', { b: 12, w: 600 }) + trafo(y0);
    s += _tel(`M51 ${y0 + 32}H246`, '--wire-l') + _tel(`M51 ${y0 + 46}H246`, '--wire-n');
    s += `<circle cx="62" cy="${y0 + 46}" r="3" style="fill:var(--ink)"></circle>` + _tel(`M62 ${y0 + 46}V${y0 + 62}`, '--ink', { w: 1.5 }) + toprak(62, y0 + 62) + yuk(y0);
    s += _pe(`M274 ${y0 + 72}V${y0 + 80}`) + toprak(274, y0 + 80) + _yazi(236, y0 + 92, 'bina toprağı', { a: 'end', b: 9, r: '--muted' });
    return `<svg class="sema" viewBox="0 0 318 306" role="img" aria-label="TN-S, TN-C-S ve TT topraklama sistemleri">${s}</svg>`;
  })(),
});
