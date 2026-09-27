/* Kontaktör ve röleler: şemalar. */
Object.assign(SEMALAR, {
  kontaktor: (() => {
    let s = '';
    const kutup = (x, ust, alt, tip) => {
      s += `<path d="M${x} 46V78M${x} 102V134" style="stroke:var(--ink)" stroke-width="2" fill="none"></path>`;
      s += _kontak(x, 78, { tip });
      s += `<circle cx="${x}" cy="46" r="3" style="fill:var(--paper);stroke:var(--ink)" stroke-width="1.5"></circle><circle cx="${x}" cy="134" r="3" style="fill:var(--paper);stroke:var(--ink)" stroke-width="1.5"></circle>`;
      s += _yazi(x + 7, 42, ust, { b: 10, r: '--muted' }) + _yazi(x + 7, 146, alt, { b: 10, r: '--muted' });
    };
    kutup(110, '1', '2', 'NO'); kutup(150, '3', '4', 'NO'); kutup(190, '5', '6', 'NO');
    kutup(236, '13', '14', 'NO'); kutup(286, '21', '22', 'NC');
    return `<svg class="sema" viewBox="0 0 318 188" role="img" aria-label="Kontaktör: A1-A2 bobini, 1-2 3-4 5-6 ana kontakları, 13-14 NO ve 21-22 NC yardımcı kontakları">
      ${_kutu(18, 58, 50, 64, { f: '--card' })}
      <rect x="31" y="80" width="24" height="20" style="stroke:var(--ink)" stroke-width="1.5" fill="none"></rect>
      ${_tel('M43 46V58M43 122V134', '--ink', { w: 2 })}
      ${_yazi(34, 44, 'A1', { a: 'end', b: 10, r: '--muted' })}${_yazi(34, 142, 'A2', { a: 'end', b: 10, r: '--muted' })}
      <path d="M68 90H296" style="stroke:var(--muted)" stroke-width="1.2" stroke-dasharray="4 3" fill="none"></path>
      ${s}
      ${_cizgi('M43 137V164M150 150V164M236 150V164M286 150V164')}
      ${_no(43, 174, 1)}${_no(150, 174, 2)}${_no(236, 174, 3)}${_no(286, 174, 4)}
    </svg>`;
  })(),

  termik: (() => {
    let p = '';
    [[40, '--wire-l', 'L1'], [60, '--wire-l2', 'L2'], [80, '--wire-l3', 'L3']].forEach(([x, r, ad]) => {
      p += _yazi(x, 14, ad, { a: 'middle', b: 11, w: 600, r });
      p += _tel(`M${x} 20V40`, r, { w: 2.5 }) + _kontak(x, 40, { tip: 'NO', u: r, a: r, w: 2.5 }) + _tel(`M${x} 64V100M${x} 150V${x === 60 ? 200 : 209}`, r, { w: 2.5 });
      p += `<path d="M${x} 100V150" style="stroke:var(${r})" stroke-width="2.5" fill="none"></path><rect x="${x - 4}" y="113" width="8" height="24" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.2"></rect>`;
    });
    return `<svg class="sema" viewBox="0 0 318 284" role="img" aria-label="Termik rölenin güç devresinde kontaktör ile motor arasında, 95-96 ve 97-98 kontaklarının kumanda devresinde bağlanışı">
      ${_kutu(26, 100, 68, 50, { f: '--svg-body' })}
      ${p}
      <path d="M30 52H92" style="stroke:var(--muted)" stroke-width="1.2" stroke-dasharray="4 3" fill="none"></path>
      ${_yazi(98, 56, '-K1', { b: 10, r: '--muted' })}${_yazi(98, 110, '-F2', { b: 10, r: '--muted' })}
      <circle cx="60" cy="226" r="26" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></circle>
      ${_yazi(60, 228, 'M', { a: 'middle', b: 14, w: 600 })}${_yazi(60, 244, '3~', { a: 'middle', b: 10 })}
      ${_tel('M190 20H262', '--ink', { w: 2 })}${_tel('M190 262H262', '--ink', { w: 2 })}
      ${_yazi(184, 24, 'L', { a: 'end', w: 600 })}${_yazi(184, 266, 'N', { a: 'end', w: 600 })}
      ${_tel('M200 20V113M200 137V170M200 186V262', '--ink', { w: 2 })}${_kontak(200, 113, { tip: 'NC' })}${_bobin(200, 170, false)}
      ${_tel('M262 20V113M262 137V181M262 199V262', '--ink', { w: 2 })}${_kontak(262, 113, { tip: 'NO' })}${_lamba(262, 190, false)}
      <path d="M94 125H266" style="stroke:var(--muted)" stroke-width="1.2" stroke-dasharray="4 3" fill="none"></path>
      ${_yazi(212, 152, '95-96', { b: 9, r: '--muted' })}${_yazi(274, 152, '97-98', { b: 9, r: '--muted' })}
      ${_yazi(216, 182, '-K1', { b: 10, r: '--muted' })}${_yazi(274, 194, '-H2', { b: 10, r: '--muted' })}
      ${_cizgi('M24 125H26')}
      ${_no(14, 125, 1)}${_no(178, 125, 2)}${_no(298, 125, 3)}
    </svg>`;
  })(),

  zamanDiyagram: `<svg class="sema" viewBox="0 0 318 206" role="img" aria-label="Çekmede ve düşmede gecikmeli zaman rölesinin zaman diyagramları">
    ${_yazi(8, 14, 'Çekmede gecikmeli', { b: 11, w: 600 })}
    ${_yazi(8, 44, 'Enerji', { b: 10, r: '--muted' })}${_yazi(8, 80, '15-18', { b: 10, r: '--muted' })}
    <path d="M100 22V92M160 22V92M250 22V92" style="stroke:var(--line)" stroke-width="1" stroke-dasharray="3 3" fill="none"></path>
    ${_puls(40, 100, 250, '--ink')}${_puls(76, 160, 250, '--signal')}
    ${_tel('M100 58H160M100 54V62M160 54V62', '--muted', { w: 1.2 })}${_yazi(130, 54, 'T', { a: 'middle', b: 11, w: 600 })}
    ${_yazi(8, 122, 'Düşmede gecikmeli', { b: 11, w: 600 })}
    ${_yazi(8, 150, 'Kontrol', { b: 10, r: '--muted' })}${_yazi(8, 186, '15-18', { b: 10, r: '--muted' })}
    <path d="M100 128V198M190 128V198M250 128V198" style="stroke:var(--line)" stroke-width="1" stroke-dasharray="3 3" fill="none"></path>
    ${_puls(146, 100, 190, '--ink')}${_puls(182, 100, 250, '--signal')}
    ${_tel('M190 164H250M190 160V168M250 160V168', '--muted', { w: 1.2 })}${_yazi(256, 168, 'T', { b: 11, w: 600 })}
  </svg>`,

  fazKoruma: (() => {
    let p = '';
    [[30, '--wire-l', 'L1', 70], [50, '--wire-l2', 'L2', 82], [70, '--wire-l3', 'L3', 94]].forEach(([x, r, ad, y]) => {
      p += _yazi(x, 14, ad, { a: 'middle', b: 11, w: 600, r }) + _tel(`M${x} 20V228`, r, { w: 2.5 }) + _tel(`M${x} ${y}H118`, r, { w: 1.8 });
      p += `<circle cx="${x}" cy="${y}" r="3" style="fill:var(${r})"></circle>`;
    });
    return `<svg class="sema" viewBox="0 0 318 248" role="img" aria-label="Faz koruma rölesinin üç fazı izlemesi ve kontağının kontaktör bobinine seri bağlanışı">
      ${p}
      ${_yazi(50, 244, 'motora', { a: 'middle', b: 10, r: '--muted' })}
      ${_kutu(118, 54, 70, 56, { f: '--card' })}${_yazi(153, 78, 'FKR', { a: 'middle', b: 11, w: 600 })}
      <circle cx="153" cy="94" r="5" style="fill:var(--signal)"></circle>
      ${_tel('M236 20H270', '--ink', { w: 2 })}${_yazi(230, 24, 'L', { a: 'end', w: 600 })}
      ${_tel('M250 20V70M250 94V150M250 166V222', '--ink', { w: 2 })}${_kontak(250, 70, { tip: 'NO' })}${_bobin(250, 150, false)}
      ${_tel('M236 222H270', '--ink', { w: 2 })}${_yazi(230, 226, 'N', { a: 'end', w: 600 })}
      ${_yazi(258, 72, '11', { b: 9, r: '--muted' })}${_yazi(258, 98, '14', { b: 9, r: '--muted' })}${_yazi(234, 162, '-K1', { a: 'end', b: 10, r: '--muted' })}
      <path d="M188 82H254" style="stroke:var(--muted)" stroke-width="1.2" stroke-dasharray="4 3" fill="none"></path>
      ${_cizgi('M100 120V96M153 126V110')}
      ${_no(100, 130, 1)}${_no(153, 136, 2)}${_no(290, 82, 3)}${_no(292, 158, 4)}
    </svg>`;
  })(),
});
