/* Pnömatik: şemalar. */
Object.assign(SEMALAR, {
  silindirKesit: (() => {
    const sensor = (x, ad, acik) => `<rect x="${x}" y="30" width="22" height="9" rx="2" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.2"></rect><circle cx="${x + 16}" cy="34.5" r="2.6" style="fill:var(${acik ? '--accent' : '--line'})"></circle>` + _tel(`M${x + 6} 30V20`, '--hatch', { w: 2 }) + _yazi(x + 6, 14, ad, { a: 'middle', b: 9, w: 600 });
    return `<svg class="sema" viewBox="0 0 318 150" role="img" aria-label="Çift etkili pnömatik silindirin kesiti: piston, mıknatıs, mil, hava ağızları ve manyetik sensörler">
      <rect x="34" y="40" width="190" height="56" rx="3" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>
      <rect x="26" y="34" width="10" height="68" rx="2" style="fill:var(--chip);stroke:var(--ink)" stroke-width="1.5"></rect>
      <rect x="222" y="34" width="10" height="68" rx="2" style="fill:var(--chip);stroke:var(--ink)" stroke-width="1.5"></rect>
      <rect x="36" y="42" width="22" height="52" style="fill:var(--signal);opacity:.18"></rect>
      <rect x="58" y="42" width="14" height="52" rx="2" style="fill:var(--hatch);stroke:var(--ink)" stroke-width="1.2"></rect>
      <rect x="60" y="42" width="10" height="6" style="fill:var(--accent)"></rect><rect x="60" y="88" width="10" height="6" style="fill:var(--accent)"></rect>
      <rect x="72" y="62" width="208" height="12" rx="2" style="fill:var(--rail);stroke:var(--ink)" stroke-width="1.2"></rect>
      <path d="M270 62v12M274 62v12M278 62v12" style="stroke:var(--ink)" stroke-width="1" fill="none"></path>
      <rect x="40" y="96" width="10" height="14" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.2"></rect><rect x="206" y="96" width="10" height="14" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.2"></rect>
      ${_tel('M45 110V122', '--signal', { w: 2.5 })}${_tel('M211 110V122', '--muted', { w: 2.5 })}
      ${sensor(54, 'B1', true)}${sensor(188, 'B2', false)}
      ${_yazi(45, 136, 'basınç', { a: 'middle', b: 9, r: '--muted' })}${_yazi(211, 136, 'egzoz', { a: 'middle', b: 9, r: '--muted' })}
      ${_cizgi('M80 106L70 95')}${_no(90, 114, 1)}${_no(256, 92, 2)}${_cizgi('M26 112L39 104')}${_no(16, 120, 3)}${_cizgi('M100 18L78 30')}${_no(110, 16, 4)}
    </svg>`;
  })(),

  frl: (() => {
    const kutu = (x, t1, t2) => _kutu(x - 1, 40, 52, 44, { f: '--card' }) + _yazi(x + 25, t2 ? 59 : 65, t1, { a: 'middle', b: 8.5, w: 600 }) + (t2 ? _yazi(x + 25, 71, t2, { a: 'middle', b: 8.5, w: 600 }) : '');
    return `<svg class="sema" viewBox="0 0 318 146" role="img" aria-label="Hava hazırlama zinciri: kapatma valfi, filtre, regülatör, yumuşak başlatma, basınç şalteri">
      ${_tel('M2 62H306', '--signal', { w: 3 })}<path d="M314 62l-9-5v10z" style="fill:var(--signal)"></path>
      ${_yazi(316, 100, 'makine', { a: 'end', b: 9, r: '--muted' })}
      ${kutu(8, 'Kapatma', 'valfi')}${kutu(68, 'Filtre')}${kutu(128, 'Regülatör')}${kutu(188, 'Yumuşak', 'başlatma')}${kutu(248, 'Basınç', 'şalteri')}
      <rect x="26" y="96" width="14" height="10" rx="2" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.2"></rect><path d="M29 96v-4a4 4 0 0 1 8 0v4" style="stroke:var(--ink)" stroke-width="1.2" fill="none"></path>
      ${_yazi(33, 120, 'kilitlenir', { a: 'middle', b: 8, r: '--muted' })}
      <path d="M93 84V94M88 94h10l-5 7z" style="stroke:var(--ink);fill:var(--wire-n)" stroke-width="1.2"></path>${_yazi(93, 120, 'su tahliye', { a: 'middle', b: 8, r: '--muted' })}
      <circle cx="153" cy="24" r="10" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></circle><path d="M153 24l5-5M153 34V40" style="stroke:var(--ink)" stroke-width="1.5" fill="none"></path>${_yazi(153, 104, '6 bar', { a: 'middle', b: 9, w: 600 })}
      ${_tel('M273 84V112', '--signal', { w: 1.5, k: '3 3' })}${_yazi(273, 122, 'PLC', { a: 'middle', b: 9, w: 600 })}
      ${_no(33, 18, 1)}${_no(93, 18, 2)}${_no(176, 18, 3)}${_no(213, 18, 4)}${_no(273, 18, 5)}
    </svg>`;
  })(),

  valfAdasi: (() => {
    let s = '';
    [0, 1, 2, 3].forEach((i) => {
      const x = 30 + i * 62, on = i === 0 || i === 3;
      s += _kutu(x, 40, 52, 70, { f: '--card' });
      s += `<rect x="${x + 4}" y="44" width="44" height="18" rx="2" style="fill:var(--chip);stroke:var(--ink)" stroke-width="1"></rect>`;
      s += `<circle cx="${x + 40}" cy="53" r="4" style="fill:var(${on ? '--accent' : '--line'});stroke:var(--ink)" stroke-width="1"></circle>` + _yazi(x + 16, 57, 'Y' + (i + 1), { a: 'middle', b: 8, w: 600 });
      s += `<circle cx="${x + 26}" cy="82" r="6" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.2"></circle><path d="M${x + 22} 82H${x + 30}" style="stroke:var(--ink)" stroke-width="1.5"></path>`;
      s += `<rect x="${x + 12}" y="28" width="8" height="12" style="fill:var(--rail);stroke:var(--ink)" stroke-width="1"></rect><rect x="${x + 32}" y="28" width="8" height="12" style="fill:var(--rail);stroke:var(--ink)" stroke-width="1"></rect>`;
      s += _yazi(x + 16, 24, '4', { a: 'middle', b: 8, r: '--muted' }) + _yazi(x + 36, 24, '2', { a: 'middle', b: 8, r: '--muted' });
    });
    return `<svg class="sema" viewBox="0 0 318 176" role="img" aria-label="Valf adası: bus bağlantısı, bobin LED’leri, manuel butonlar, ortak besleme ve çıkış ağızları">
      ${s}
      <rect x="20" y="110" width="260" height="28" rx="3" style="fill:var(--chip);stroke:var(--ink)" stroke-width="1.5"></rect>
      <rect x="4" y="112" width="16" height="24" rx="2" style="fill:var(--ink)"></rect>${_tel('M4 124H-4', '--ink', { w: 3 })}
      ${_yazi(150, 128, 'ortak besleme 1 · egzoz 3/5', { a: 'middle', b: 9, w: 600 })}
      ${_yazi(12, 152, 'bus / konnektör', { b: 9, r: '--muted' })}
      ${_cizgi('M12 102V112')}${_no(12, 92, 1)}${_cizgi('M288 53H260')}${_no(298, 53, 2)}${_cizgi('M288 82H248')}${_no(298, 82, 3)}${_no(296, 124, 4)}${_cizgi('M150 18L138 28')}${_no(160, 12, 5)}
    </svg>`;
  })(),
});
