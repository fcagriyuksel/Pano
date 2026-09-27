/* Asenkron motorlar: şemalar. */
Object.assign(SEMALAR, {
  motorKlemens: (() => {
    const panel = (x0, baslik, ucgen, alt) => {
      const xs = [x0 + 30, x0 + 70, x0 + 110];
      let s = _yazi(x0 + 76, 16, baslik, { a: 'middle', b: 12, w: 600 });
      [['--wire-l', 'L1'], ['--wire-l2', 'L2'], ['--wire-l3', 'L3']].forEach(([r], i) => { s += _tel(`M${xs[i]} 24V86`, r, { w: 2.5 }); });
      s += _kutu(x0 + 4, 70, 140, 100, { rx: 8 });
      ['U1', 'V1', 'W1'].forEach((t, i) => { s += `<circle cx="${xs[i]}" cy="95" r="9" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></circle>` + _yazi(xs[i] + 12, 86, t, { b: 9, r: '--muted' }); });
      ['W2', 'U2', 'V2'].forEach((t, i) => { s += `<circle cx="${xs[i]}" cy="145" r="9" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></circle>` + _yazi(xs[i] + 12, 164, t, { b: 9, r: '--muted' }); });
      if (ucgen) xs.forEach((x) => { s += `<path d="M${x} 95V145" style="stroke:var(--hatch)" stroke-width="7" stroke-linecap="round" fill="none"></path>`; });
      else s += `<path d="M${xs[0]} 145H${xs[2]}" style="stroke:var(--hatch)" stroke-width="7" stroke-linecap="round" fill="none"></path>`;
      s += _yazi(x0 + 70, 194, alt, { a: 'middle', b: 10 });
      return s;
    };
    return `<svg class="sema" viewBox="0 0 318 208" role="img" aria-label="Motor klemens kutusunda yıldız ve üçgen köprü yerleşimi">
      ${panel(10, 'Yıldız (Y)', false, 'Sargıya U ÷ √3')}${panel(168, 'Üçgen (Δ)', true, 'Sargıya U')}
      ${_cizgi('M142 48H122')}
      ${_no(22, 14, 1)}${_no(180, 14, 2)}${_no(152, 48, 3)}
    </svg>`;
  })(),

  motorEtiket: (() => {
    const satir = (y, sol, sag, kalin) => _yazi(50, y, sol, { b: kalin ? 15 : 12, w: kalin ? 600 : null }) + _yazi(278, y, sag, { a: 'end', b: 12 });
    return `<svg class="sema" viewBox="0 0 318 176" role="img" aria-label="Örnek asenkron motor etiketi: güç, gerilim, akım, cos fi, devir, koruma sınıfı">
      <rect x="38" y="8" width="252" height="160" rx="10" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>
      ${_yazi(50, 30, '3~ Mot.', { b: 11, r: '--muted' })}${_yazi(278, 30, 'IEC 60034', { a: 'end', b: 11, r: '--muted' })}
      <path d="M46 40H282M46 70H282M46 98H282M46 126H282" style="stroke:var(--line)" stroke-width="1" fill="none"></path>
      ${satir(60, '2,2 kW', 'IE3', true)}${satir(89, '230/400 V  Δ/Y', '50 Hz')}${satir(117, '8,1/4,7 A', 'cos φ 0,82')}${satir(150, '1430 d/dk', 'IP55 · Isol. F')}
      ${_no(20, 55, 1)}${_no(20, 85, 2)}${_no(20, 113, 3)}${_no(302, 113, 4)}${_no(20, 146, 5)}${_no(302, 146, 6)}
    </svg>`;
  })(),

  motorOlcum: (() => {
    const xs = [68, 108, 148];
    const uc = (x, y) => `<circle cx="${x}" cy="${y}" r="8" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></circle>`;
    let s = '';
    ['U1', 'V1', 'W1'].forEach((t, i) => { s += uc(xs[i], 96) + _yazi(xs[i] + 11, 84, t, { b: 9, r: '--muted' }); });
    ['W2', 'U2', 'V2'].forEach((t, i) => { s += uc(xs[i], 156) + _yazi(xs[i] + 11, 172, t, { b: 9, r: '--muted' }); });
    s += `<circle cx="188" cy="160" r="6" style="fill:var(--card);stroke:var(--wire-pe)" stroke-width="2"></circle>` + _yazi(188, 147, 'PE', { a: 'middle', b: 9, r: '--muted' });
    return `<svg class="sema" viewBox="0 0 318 214" role="img" aria-label="Köprüleri sökülmüş motor klemensinde sargı direnci ve izolasyon ölçümü">
      ${_kutu(44, 70, 164, 110, { rx: 8 })}
      ${_tel('M68 46V88', '--signal', { w: 2 })}${_tel('M44 27H16V200H108V164', '--signal', { w: 2 })}
      ${_tel('M240 100V62H148V88', '--dc-plus', { w: 2 })}${_tel('M262 146V160H194', '--dc-plus', { w: 2 })}
      ${s}
      ${_kutu(44, 8, 90, 38, { f: '--card' })}${_yazi(89, 33, 'Ω', { a: 'middle', b: 16, w: 600 })}
      ${_kutu(222, 100, 86, 46, { f: '--card' })}${_yazi(265, 120, 'MΩ', { a: 'middle', b: 14, w: 600 })}${_yazi(265, 136, '500 V DC', { a: 'middle', b: 9, r: '--muted' })}
      ${_no(128, 126, 1)}${_no(150, 27, 2)}${_no(292, 164, 3)}
    </svg>`;
  })(),

  torkEgri: (() => {
    const X = (n) => 40 + (260 * n) / 3000, Y = (t) => 170 - (150 * t) / 60;
    const sayi = (v, b = 0) => Number(v).toLocaleString('tr-TR', { maximumFractionDigits: b });
    let d = '';
    for (let n = 880; n <= 3000; n += 40) d += (d ? 'L' : 'M') + X(n).toFixed(1) + ' ' + Y((9550 * 5.5) / n).toFixed(1);
    const nokta = (n, no, ad, dx, dy) => { const t = (9550 * 5.5) / n; return `<circle cx="${X(n)}" cy="${Y(t)}" r="5" style="fill:var(--accent);stroke:var(--ink)" stroke-width="1.5"></circle>` + _yazi(X(n) + dx, Y(t) + dy, `${ad} · ${sayi(t, 0)} N·m`, { b: 9, w: 600 }) + _no(X(n) + dx - 14, Y(t) + dy - 4, no); };
    let izg = '';
    [0, 1000, 2000, 3000].forEach((n) => { izg += _yazi(X(n), 186, sayi(n), { a: 'middle', b: 9, r: '--muted' }); });
    [0, 20, 40, 60].forEach((t) => { izg += _yazi(34, Y(t) + 3, String(t), { a: 'end', b: 9, r: '--muted' }); });
    return `<svg class="sema" viewBox="0 0 318 200" role="img" aria-label="5,5 kW sabit güçte tork ve devir ilişkisi">
      <path d="M${X(1000)} 20V170M${X(2000)} 20V170M40 ${Y(20)}H300M40 ${Y(40)}H300" style="stroke:var(--line)" stroke-width="1" stroke-dasharray="3 3" fill="none"></path>
      ${_tel('M40 16V170H304', '--ink', { w: 1.5 })}${izg}
      ${_yazi(46, 14, 'Tork (N·m)', { b: 10, w: 600 })}${_yazi(300, 162, 'Devir (d/dk)', { a: 'end', b: 10, w: 600 })}
      ${_tel(d, '--signal', { w: 2.5 })}
      ${_yazi(304, 14, 'P = 5,5 kW sabit', { a: 'end', b: 10, r: '--muted' })}
      ${nokta(960, 1, '6 kutup', 30, 4)}${nokta(1450, 2, '4 kutup', 30, 2)}${nokta(2900, 3, '2 kutup', -120, 22)}
    </svg>`;
  })(),
});
