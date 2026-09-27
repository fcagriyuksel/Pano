/* Sensörler: şemalar. */
Object.assign(SEMALAR, {
  enduktifSensor: (() => {
    let dis = '';
    for (let x = 86; x <= 136; x += 6) dis += `M${x} 60V110`;
    for (let x = 154; x <= 166; x += 6) dis += `M${x} 60V110`;
    return `<svg class="sema" viewBox="0 0 318 190" role="img" aria-label="Endüktif sensör, aktif yüzey, algılama mesafesi ve metal hedef">
      <rect x="40" y="60" width="130" height="50" rx="3" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>
      <path d="${dis}" style="stroke:var(--line)" stroke-width="1" fill="none"></path>
      <rect x="68" y="52" width="14" height="66" rx="2" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></rect>
      <rect x="138" y="52" width="14" height="66" rx="2" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></rect>
      <rect x="170" y="62" width="9" height="46" rx="2" style="fill:var(--accent);stroke:var(--ink)" stroke-width="1.5"></rect>
      <circle cx="52" cy="70" r="4" style="fill:var(--accent);stroke:var(--ink)" stroke-width="1"></circle>
      <path d="M179 68Q222 85 179 102M179 74Q204 85 179 96M179 62Q240 85 179 108" style="stroke:var(--signal)" stroke-width="1.5" stroke-dasharray="4 3" fill="none"></path>
      <rect x="226" y="50" width="14" height="70" rx="2" style="fill:var(--hatch);stroke:var(--ink)" stroke-width="1.5"></rect>
      ${_yazi(233, 42, 'Metal', { a: 'middle', b: 10, r: '--muted' })}
      ${_tel('M179 136H226M179 130V142M226 130V142', '--ink', { w: 1.2 })}${_yazi(202, 128, 'Sn', { a: 'middle', b: 12, w: 600 })}
      ${_tel('M40 85H24V126', '--hatch', { w: 7 })}
      ${_tel('M24 126L12 160', '--wire-l', { w: 2.5 })}${_tel('M24 126V160', '--ink', { w: 2.5 })}${_tel('M24 126L36 160', '--wire-n', { w: 2.5 })}
      ${_yazi(12, 176, 'BN', { a: 'middle', b: 9, r: '--muted' })}${_yazi(24, 186, 'BK', { a: 'middle', b: 9, r: '--muted' })}${_yazi(38, 176, 'BU', { a: 'middle', b: 9, r: '--muted' })}
      ${_cizgi('M174 30V60')}${_no(174, 22, 1)}${_no(202, 162, 2)}${_no(264, 85, 3)}
      ${_cizgi('M52 32V64')}${_no(52, 24, 4)}${_no(62, 150, 5)}
    </svg>`;
  })(),

  kapasitifSeviye: (() => {
    const sensor = (cy, gorur) => `<path d="M204 ${cy - 11}Q182 ${cy} 204 ${cy + 11}M204 ${cy - 6}Q192 ${cy} 204 ${cy + 6}" style="stroke:var(--signal)" stroke-width="1.5" stroke-dasharray="3 3" fill="none"></path>
      <rect x="204" y="${cy - 12}" width="58" height="24" rx="3" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>
      <rect x="204" y="${cy - 12}" width="7" height="24" rx="2" style="fill:var(--accent);stroke:var(--ink)" stroke-width="1"></rect>
      <circle cx="248" cy="${cy}" r="4.5" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.2"></circle><path d="M245 ${cy + 3}L251 ${cy - 3}" style="stroke:var(--ink)" stroke-width="1.2"></path>
      <circle cx="232" cy="${cy}" r="4" style="fill:var(${gorur ? '--accent' : '--card'});stroke:var(--ink)" stroke-width="1"></circle>
      ${_tel(`M262 ${cy}H306`, '--hatch', { w: 5 })}
      ${_yazi(284, cy + 22, gorur ? 'çıkış 1' : 'çıkış 0', { a: 'middle', b: 10, w: 600 })}`;
    return `<svg class="sema" viewBox="0 0 318 210" role="img" aria-label="Kapasitif sensörlerle plastik depoda dışarıdan seviye algılama">
      <rect x="62" y="104" width="138" height="84" style="fill:var(--wire-n);opacity:.35"></rect>
      <path d="M62 104q11-5 23 0t23 0t23 0t23 0t23 0t23 0" style="stroke:var(--wire-n)" stroke-width="2" fill="none"></path>
      <path d="M60 18V190H202V18" style="stroke:var(--ink)" stroke-width="4" stroke-linejoin="round" fill="none"></path>
      ${_yazi(131, 44, 'Plastik depo', { a: 'middle', b: 10, r: '--muted' })}${_yazi(131, 152, 'Sıvı', { a: 'middle', b: 12, w: 600 })}
      ${sensor(62, false)}${sensor(150, true)}
      ${_cizgi('M214 22V50')}${_no(214, 16, 1)}${_cizgi('M262 22L250 57')}${_no(270, 16, 2)}
      ${_no(34, 70, 3)}${_cizgi('M44 70H58')}${_no(34, 104, 4)}${_cizgi('M44 104H60')}
    </svg>`;
  })(),

  fotoelektrik: (() => {
    const govde = (x, y, t) => _kutu(x, y + 20, 42, 32, { f: '--card' }) + _yazi(x + 21, y + 40, t, { a: 'middle', b: 10, w: 600 });
    const isin = (x1, x2, y) => `<path d="M${x1} ${y}H${x2}" style="stroke:var(--signal)" stroke-width="2.5" fill="none"></path>` + (x2 > x1 ? `<path d="M${x2} ${y}l-8-4.5v9z" style="fill:var(--signal)"></path>` : `<path d="M${x2} ${y}l8-4.5v9z" style="fill:var(--signal)"></path>`);
    let s = '';
    let y = 4;
    s += _no(14, y + 10, 1) + _yazi(30, y + 14, 'Karşılıklı', { b: 12, w: 600 });
    s += govde(18, y, 'V') + govde(258, y, 'A') + isin(60, 256, y + 36);
    s += _yazi(159, y + 64, 'uzun menzil · iki ayrı gövde', { a: 'middle', b: 9, r: '--muted' });
    y = 80;
    s += _no(14, y + 10, 2) + _yazi(30, y + 14, 'Reflektörlü', { b: 12, w: 600 });
    s += govde(18, y, 'V+A') + isin(60, 280, y + 30) + isin(280, 62, y + 44);
    s += `<rect x="282" y="${y + 18}" width="16" height="36" rx="2" style="fill:var(--dc-plus);stroke:var(--ink)" stroke-width="1.2"></rect><path d="M286 ${y + 24}l4 4l4-4M286 ${y + 34}l4 4l4-4M286 ${y + 44}l4 4l4-4" style="stroke:var(--paper)" stroke-width="1.2" fill="none"></path>`;
    s += _yazi(159, y + 64, 'orta menzil · karşıda reflektör', { a: 'middle', b: 9, r: '--muted' });
    y = 156;
    s += _no(14, y + 10, 3) + _yazi(30, y + 14, 'Cisimden yansımalı', { b: 12, w: 600 });
    s += govde(18, y, 'V+A') + isin(60, 196, y + 30) + isin(196, 62, y + 44);
    s += `<rect x="198" y="${y + 18}" width="44" height="36" rx="4" style="fill:var(--hatch);stroke:var(--ink)" stroke-width="1.2"></rect>` + _yazi(220, y + 40, 'cisim', { a: 'middle', b: 9, r: '--paper' });
    s += _yazi(159, y + 64, 'kısa menzil · reflektör yok', { a: 'middle', b: 9, r: '--muted' });
    return `<svg class="sema" viewBox="0 0 318 228" role="img" aria-label="Fotoelektrik sensör tipleri: karşılıklı, reflektörlü, cisimden yansımalı">${s}</svg>`;
  })(),

  analogLoop: `<svg class="sema" viewBox="0 0 318 228" role="img" aria-label="İki telli 4-20 mA akım döngüsü: besleme, transmitter, PLC analog girişi">
    ${_tel('M84 50H140V38H190', '--dc-plus', { w: 2.5 })}
    ${_tel('M270 62V122', '--signal', { w: 2.5 })}
    ${_tel('M170 196H120V90H84', '--wire-n', { w: 2.5 })}
    ${_kutu(14, 30, 70, 80, { f: '--card' })}${_yazi(49, 66, '24 V', { a: 'middle', b: 13, w: 600 })}${_yazi(49, 82, 'DC', { a: 'middle', b: 10, r: '--muted' })}
    ${_yazi(78, 46, '+', { a: 'end', b: 12, w: 600 })}${_yazi(78, 96, '−', { a: 'end', b: 12, w: 600 })}
    ${_kutu(190, 14, 100, 48, { f: '--card' })}${_yazi(240, 34, 'Transmitter', { a: 'middle', b: 11, w: 600 })}${_yazi(240, 50, 'basınç · 2 telli', { a: 'middle', b: 9, r: '--muted' })}
    ${_yazi(186, 33, '+', { a: 'end', b: 12, w: 600 })}${_yazi(282, 58, '−', { a: 'end', b: 11, w: 600 })}
    ${_kutu(170, 122, 130, 84, { f: '--card' })}
    <path d="M270 122V148M270 180V196H170" style="stroke:var(--ink)" stroke-width="1.5" fill="none"></path>
    <rect x="264" y="148" width="12" height="32" rx="1" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></rect>
    ${_yazi(262, 138, 'AI+', { a: 'end', b: 10, w: 600 })}${_yazi(178, 190, 'AI−', { b: 10, w: 600 })}${_yazi(256, 168, '250 Ω', { a: 'end', b: 10, r: '--muted' })}
    ${_yazi(235, 222, 'PLC analog giriş', { a: 'middle', b: 10, w: 600 })}
    <path d="M116 50l-8-5v10z" style="fill:var(--dc-plus)"></path><path d="M270 104l-5-9h10z" style="fill:var(--signal)"></path><path d="M144 196l8-5v10z" style="fill:var(--wire-n)"></path>
    ${_yazi(205, 96, 'I = 4–20 mA', { a: 'middle', b: 12, w: 600 })}
    ${_no(49, 128, 1)}${_no(158, 20, 2)}${_no(150, 150, 3)}
  </svg>`,

  pt100Bag: (() => {
    const sutun = (cx, n, baslik, teller, alt) => {
      let s = _no(cx - 42, 12, n) + _yazi(cx + 4, 16, baslik, { a: 'middle', b: 11, w: 600 });
      s += `<rect x="${cx - 7}" y="30" width="14" height="32" rx="2" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></rect>` + _yazi(cx + 11, 50, 'PT100', { b: 8, r: '--muted' });
      teller.forEach(([dx, ust]) => {
        const x = cx + dx, renk = ust ? '--dc-plus' : '--hatch';
        s += _tel(ust ? `M${cx} 30V24H${x}V150` : `M${cx} 62V70H${x}V150`, renk, { w: 2.2 });
        s += `<circle cx="${x}" cy="150" r="3.5" style="fill:var(--ink)"></circle>`;
      });
      s += _kutu(cx - 44, 150, 88, 24, { f: '--card' }) + _yazi(cx, 166, 'giriş', { a: 'middle', b: 10 });
      s += _yazi(cx, 192, alt, { a: 'middle', b: 9, w: 600, r: n === 1 ? '--dc-plus' : '--ink' });
      return s;
    };
    return `<svg class="sema" viewBox="0 0 318 200" role="img" aria-label="PT100’ün 2, 3 ve 4 telli bağlantısı">
      <rect x="4" y="96" width="310" height="24" rx="4" style="fill:var(--chip)"></rect>${_yazi(312, 112, 'kablo', { a: 'end', b: 9, r: '--muted' })}
      ${sutun(53, 1, '2 telli', [[-16, true], [16, false]], 'hata ekler')}
      ${sutun(159, 2, '3 telli', [[-20, true], [8, false], [24, false]], 'dengelenir')}
      ${sutun(265, 3, '4 telli', [[-26, true], [-12, true], [12, false], [26, false]], 'en hassas')}
    </svg>`;
  })(),

  enkoderPlc: (() => {
    const cizgi = (x1, x2, y, renk, k) => _tel(`M${x1} ${y}H${x2}`, renk, { w: 2, k });
    let s = _yazi(78, 14, 'HTL · 24 V', { a: 'middle', b: 11, w: 600 }) + _yazi(240, 14, 'Line driver · 5 V', { a: 'middle', b: 11, w: 600 });
    s += _kutu(8, 26, 48, 124, { f: '--card' }) + _yazi(32, 42, 'ENK', { a: 'middle', b: 10, w: 600 });
    s += _kutu(100, 26, 54, 124, { f: '--card' }) + _yazi(127, 42, 'PLC', { a: 'middle', b: 10, w: 600 });
    [['A', 'HSC A', 58, '--signal'], ['B', 'HSC B', 80, '--signal'], ['Z', 'Z (ref)', 102, '--signal'], ['+', '24 V', 124, '--dc-plus'], ['0V', 'M', 142, '--wire-n']].forEach(([a, b, y, r]) => {
      s += cizgi(56, 100, y, r) + _yazi(52, y + 4, a, { a: 'end', b: 9 }) + _yazi(104, y + 4, b, { b: 8 });
    });
    s += _kutu(170, 26, 48, 124, { f: '--card' }) + _yazi(194, 42, 'ENK', { a: 'middle', b: 10, w: 600 });
    s += _kutu(262, 26, 50, 124, { f: '--card' }) + _yazi(287, 40, 'Sayıcı', { a: 'middle', b: 9, w: 600 }) + _yazi(287, 51, 'kartı', { a: 'middle', b: 9, w: 600 });
    [['A', 62, '--signal', null], ['/A', 74, '--signal', '4 3'], ['B', 94, '--ink', null], ['/B', 106, '--ink', '4 3'], ['5 V', 128, '--dc-plus', null], ['0V', 142, '--wire-n', null]].forEach(([a, y, r, k]) => {
      s += cizgi(218, 262, y, r, k) + _yazi(214, y + 4, a, { a: 'end', b: 8 }) + _yazi(266, y + 4, a, { b: 8 });
    });
    s += `<ellipse cx="240" cy="68" rx="9" ry="11" style="fill:none;stroke:var(--muted)" stroke-width="1" stroke-dasharray="2 2"></ellipse><ellipse cx="240" cy="100" rx="9" ry="11" style="fill:none;stroke:var(--muted)" stroke-width="1" stroke-dasharray="2 2"></ellipse>`;
    s += _yazi(78, 170, 'kısa mesafe, doğrudan', { a: 'middle', b: 9, r: '--muted' }) + _yazi(240, 170, 'uzun mesafe, dayanıklı', { a: 'middle', b: 9, r: '--muted' });
    s += _no(32, 190, 1) + _no(127, 190, 2) + _no(194, 190, 3) + _no(287, 190, 4);
    return `<svg class="sema" viewBox="0 0 318 204" role="img" aria-label="HTL enkoderin PLC hızlı sayıcısına ve line driver enkoderin sayıcı kartına bağlanması">${s}</svg>`;
  })(),
});
