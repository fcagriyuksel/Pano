/* Güç kaynağı ve ölçüm: şemalar. */
Object.assign(SEMALAR, {
  psuBaglanti: (() => {
    const sig = (x, y, t) => `<rect x="${x}" y="${y - 6}" width="24" height="12" rx="2" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></rect>` + _yazi(x + 12, y + 3, t, { a: 'middle', b: 8, w: 600 });
    const toprak = (x, y) => `<path d="M${x - 8} ${y}H${x + 8}M${x - 5} ${y + 4}H${x + 5}M${x - 2} ${y + 8}H${x + 2}" style="stroke:var(--ink)" stroke-width="1.5" fill="none"></path>`;
    return `<svg class="sema" viewBox="0 0 318 206" role="img" aria-label="24 V DC güç kaynağı bağlantısı: AC giriş, çıkış dağıtımı ve 0 V topraklaması">
      ${_yazi(4, 44, 'L', { b: 9, w: 600 })}${_yazi(4, 68, 'N', { b: 9, w: 600 })}${_yazi(4, 92, 'PE', { b: 9, w: 600 })}
      ${_tel('M16 48H100', '--wire-l')}${_tel('M16 72H100', '--wire-n')}${_pe('M20 96H100')}
      <rect x="38" y="41" width="24" height="14" rx="2" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></rect>${_yazi(50, 51, 'C6', { a: 'middle', b: 8, w: 600 })}
      ${_kutu(100, 30, 76, 104, { f: '--card' })}${_yazi(138, 62, '230 V AC', { a: 'middle', b: 9, r: '--muted' })}${_yazi(138, 86, 'PSU', { a: 'middle', b: 14, w: 600 })}${_yazi(138, 106, '24 V DC', { a: 'middle', b: 10, w: 600 })}
      ${_yazi(172, 43, '+', { a: 'end', b: 11, w: 600 })}${_yazi(172, 126, '−', { a: 'end', b: 11, w: 600 })}
      ${_tel('M176 46H200V110M200 46H300M200 78H300M200 110H300', '--dc-plus')}
      <circle cx="200" cy="78" r="3" style="fill:var(--ink)"></circle>
      ${sig(216, 46, '2 A')}${sig(216, 78, '4 A')}${sig(216, 110, '4 A')}
      ${_yazi(300, 40, 'PLC', { a: 'end', b: 10, w: 600 })}${_yazi(300, 72, 'Sensörler', { a: 'end', b: 10, w: 600 })}${_yazi(300, 104, 'Valfler', { a: 'end', b: 10, w: 600 })}
      ${_tel('M176 120H188V164H300', '--wire-n')}${_yazi(300, 158, '0 V', { a: 'end', b: 10, w: 600 })}
      ${_pe('M232 164V180')}<circle cx="232" cy="164" r="3" style="fill:var(--ink)"></circle>${toprak(232, 180)}${_yazi(312, 198, 'tek noktadan PE', { a: 'end', b: 9, r: '--muted' })}
      ${_no(50, 24, 1)}${_no(138, 152, 2)}${_no(228, 26, 3)}${_no(210, 186, 4)}
    </svg>`;
  })(),

  multimetreBaglanti: (() => {
    const pil = (x0) => `<path d="M${x0 + 10} 70H${x0 + 30}M${x0 + 14} 78H${x0 + 26}" style="stroke:var(--ink)" stroke-width="2.5" fill="none"></path>` + _yazi(x0 + 34, 68, '+', { b: 10, w: 600 });
    const olcer = (cx, cy, t) => `<circle cx="${cx}" cy="${cy}" r="13" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.8"></circle>` + _yazi(cx, cy + 5, t, { a: 'middle', b: 13, w: 600 });
    const nokta = (x, y) => `<circle cx="${x}" cy="${y}" r="3" style="fill:var(--ink)"></circle>`;
    let v = _no(12, 14, 1) + _yazi(26, 18, 'Gerilim: paralel', { b: 11, w: 600 });
    v += _tel('M20 40V70M20 78V120H100V89M100 71V40H20', '--hatch', { w: 2.5 }) + pil(0) + _lamba(100, 80, true);
    v += _tel('M136 67V56H100', '--dc-plus', { w: 2 }) + _tel('M136 93V104H100', '--ink', { w: 2 }) + nokta(100, 56) + nokta(100, 104) + olcer(136, 80, 'V');
    v += _yazi(75, 142, 'uçlar yükün iki ucuna', { a: 'middle', b: 9, r: '--muted' });
    let a = _no(172, 14, 2) + _yazi(186, 18, 'Akım: seri', { b: 11, w: 600 });
    a += _tel('M180 70V40H206M234 40H260V71M260 89V120H180V78', '--hatch', { w: 2.5 }) + pil(160) + _lamba(260, 80, true);
    a += _tel('M200 40H207', '--dc-plus', { w: 2.5 }) + _tel('M233 40H240', '--ink', { w: 2.5 }) + olcer(220, 40, 'A');
    a += _yazi(235, 142, 'devre açılıp araya girilir', { a: 'middle', b: 9, r: '--muted' });
    const soket = (x, t, renk) => `<circle cx="${x}" cy="176" r="9" style="fill:var(--card);stroke:var(${renk})" stroke-width="3"></circle>` + _yazi(x, 200, t, { a: 'middle', b: 9, w: 600 });
    return `<svg class="sema" viewBox="0 0 318 208" role="img" aria-label="Multimetreyle gerilim paralel, akım seri ölçülür; soket seçimi">
      ${v}${a}
      <path d="M8 156H310" style="stroke:var(--line)" stroke-width="1" fill="none"></path>
      ${soket(46, '10 A', '--dc-plus')}${soket(112, 'mA', '--dc-plus')}${soket(178, 'COM', '--ink')}${soket(244, 'VΩ', '--dc-plus')}
      ${_no(296, 176, 3)}
    </svg>`;
  })(),

  pensOlcum: (() => {
    const cene = (cx) => `<path d="M${cx + 10.3} 35.8A30 30 0 1 1 ${cx - 10.3} 35.8" style="stroke:var(--hatch)" stroke-width="7" stroke-linecap="round" fill="none"></path><rect x="${cx - 9}" y="94" width="18" height="22" rx="3" style="fill:var(--hatch)"></rect>`;
    const cik = (x, renk) => `<circle cx="${x}" cy="64" r="8" style="fill:var(${renk});stroke:var(--ink)" stroke-width="1"></circle><circle cx="${x}" cy="64" r="2.4" style="fill:var(--paper)"></circle>`;
    const gir = (x, renk) => `<circle cx="${x}" cy="64" r="8" style="fill:var(${renk});stroke:var(--ink)" stroke-width="1"></circle><path d="M${x - 4} 60l8 8M${x + 4} 60l-8 8" style="stroke:var(--paper)" stroke-width="1.8"></path>`;
    const sutun = (cx, n, baslik, ic, deger, alt) => _no(cx - 42, 12, n) + _yazi(cx + 6, 16, baslik, { a: 'middle', b: 10, w: 600 }) + cene(cx) + ic + _yazi(cx, 138, deger, { a: 'middle', b: 14, w: 600 }) + _yazi(cx, 154, alt, { a: 'middle', b: 9, r: '--muted' });
    return `<svg class="sema" viewBox="0 0 318 164" role="img" aria-label="Pens ampermetre: tek iletken, faz ve nötr birlikte, kaçak akım">
      ${sutun(53, 1, 'Tek iletken', cik(53, '--wire-l'), '8,2 A', 'yük akımı')}
      ${sutun(159, 2, 'L + N', cik(149, '--wire-l') + gir(169, '--wire-n'), '0,0 A', 'alanlar sıfırlanır')}
      ${sutun(265, 3, 'Kaçak pens', cik(255, '--wire-l') + gir(275, '--wire-n'), '12 mA', 'fark = kaçak')}
      <path d="M106 8V158M212 8V158" style="stroke:var(--line)" stroke-width="1" fill="none"></path>
    </svg>`;
  })(),

  megger: `<svg class="sema" viewBox="0 0 318 184" role="img" aria-label="İzolasyon ölçer, iki ucu ayrılmış kabloda faz ile PE arasına bağlı">
    <rect x="96" y="92" width="112" height="58" rx="10" style="fill:var(--chip);stroke:var(--hatch)" stroke-width="1.5"></rect>
    ${_tel('M54 100H246', '--wire-l', { w: 2.5 })}${_tel('M54 114H246', '--wire-l2', { w: 2.5 })}${_tel('M54 128H246', '--wire-l3', { w: 2.5 })}${_pe('M54 142H246')}
    ${[100, 114, 128, 142].map((y) => `<circle cx="50" cy="${y}" r="4" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></circle><circle cx="250" cy="${y}" r="4" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></circle>`).join('')}
    ${_yazi(50, 166, 'ayrık', { a: 'middle', b: 9, r: '--muted' })}${_yazi(250, 166, 'ayrık', { a: 'middle', b: 9, r: '--muted' })}
    ${_tel('M124 58V76H50V96', '--dc-plus', { w: 2 })}${_tel('M110 40H20V142H46', '--ink', { w: 2 })}
    ${_kutu(110, 8, 100, 50, { f: '--card' })}${_yazi(160, 26, '500 V DC', { a: 'middle', b: 9, r: '--muted' })}${_yazi(160, 47, '> 200 MΩ', { a: 'middle', b: 14, w: 600 })}
    ${_yazi(262, 104, 'L1', { b: 9, r: '--muted' })}${_yazi(262, 146, 'PE', { b: 9, r: '--muted' })}
    ${_no(228, 33, 1)}${_no(88, 62, 2)}${_no(66, 28, 3)}${_no(292, 125, 4)}
  </svg>`,
});
