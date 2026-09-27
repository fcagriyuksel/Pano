/* Sürücüler: şemalar. */
Object.assign(SEMALAR, {
  surucuDip: (() => {
    const acik = [1, 0, 1, 0, 1, 1, 0, 1];
    let s = '';
    acik.forEach((on, i) => {
      const x = 30 + i * 34;
      s += `<rect x="${x}" y="46" width="22" height="54" rx="3" style="fill:var(--paper);stroke:var(--ink)" stroke-width="1.2"></rect>
        <rect x="${x + 2}" y="${on ? 48 : 74}" width="18" height="24" rx="2" style="fill:var(--ink)"></rect>
        ${_yazi(x + 11, 114, String(i + 1), { a: 'middle', b: 10 })}`;
    });
    return `<svg class="sema" viewBox="0 0 318 176" role="img" aria-label="Step sürücü DIP anahtarları: akım, bekleme akımı ve mikroadım grupları">
      ${_yazi(18, 26, 'ON ↑', { b: 10, w: 600 })}
      <rect x="16" y="34" width="286" height="86" rx="6" style="fill:var(--chip);stroke:var(--ink)" stroke-width="1.5"></rect>
      ${s}
      ${_tel('M30 128V134H120V128M132 128V134H154V128M166 128V134H290V128', '--ink', { w: 1.2 })}
      ${_cizgi('M75 134V150M143 134V150M228 134V150')}
      ${_no(75, 160, 1)}${_no(143, 160, 2)}${_no(228, 160, 3)}
    </svg>`;
  })(),

  surucuServo: `<svg class="sema" viewBox="0 0 318 228" role="img" aria-label="PLC’den servo sürücüye üç komut yolu: darbe/yön, analog ve EtherCAT">
    ${_kutu(8, 28, 62, 172, { f: '--card' })}${_yazi(39, 118, 'PLC', { a: 'middle', w: 600 })}
    ${_kutu(206, 28, 56, 172, { f: '--card' })}${_yazi(234, 118, 'SÜRÜCÜ', { a: 'middle', b: 9, w: 600 })}
    ${_tel('M70 54H206M70 66H206', '--signal', { w: 2 })}
    ${_tel('M70 114H206', '--ink', { w: 2, k: '6 3' })}
    ${_tel('M70 168H206', '--signal', { w: 4 })}
    ${_yazi(150, 44, 'darbe / yön', { a: 'middle', b: 10, r: '--muted' })}
    ${_yazi(150, 104, 'analog ±10 V', { a: 'middle', b: 10, r: '--muted' })}
    ${_yazi(150, 158, 'EtherCAT', { a: 'middle', b: 10, r: '--muted' })}
    ${_tel('M262 114H276', '--ink', { w: 2 })}
    <circle cx="294" cy="114" r="18" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></circle>${_yazi(294, 118, 'M', { a: 'middle', w: 600 })}
    ${_no(100, 60, 1)}${_no(100, 114, 2)}${_no(100, 168, 3)}
  </svg>`,

  surucuVfd: `<svg class="sema" viewBox="0 0 318 180" role="img" aria-label="Frekans konvertörünün iç yapısı: doğrultucu, DC bara, fren kıyıcısı ve evirici">
    ${_tel('M6 75H40', '--wire-l')}${_tel('M6 95H40', '--wire-l2')}${_tel('M6 115H40', '--wire-l3')}
    ${_kutu(40, 50, 50, 90)}
    <path d="M58 88V102L70 95Z" style="fill:var(--ink)"></path><path d="M71 88V102" style="stroke:var(--ink)" stroke-width="2" fill="none"></path>
    ${_tel('M90 60H200', '--dc-plus', { w: 2.5 })}${_tel('M90 130H200', '--ink', { w: 2.5 })}
    ${_tel('M115 60V89M115 101V130', '--ink', { w: 1.5 })}
    ${_tel('M103 89H127M103 101H127', '--ink', { w: 2.5 })}
    ${_tel('M160 60V68M160 96V104', '--ink', { w: 1.5 })}
    <rect x="153" y="68" width="14" height="28" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></rect>
    ${_tel('M160 104L170 116M160 120V130', '--ink', { w: 1.8 })}
    <circle cx="160" cy="120" r="2" style="fill:var(--ink)"></circle>
    ${_kutu(200, 50, 50, 90)}${_yazi(225, 99, 'PWM', { a: 'middle', b: 10, r: '--muted' })}
    ${_tel('M250 80H264', '--wire-l', { w: 2.5 })}${_tel('M250 95H264', '--wire-l2', { w: 2.5 })}${_tel('M250 110H264', '--wire-l3', { w: 2.5 })}
    <circle cx="286" cy="95" r="22" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></circle>
    ${_yazi(286, 96, 'M', { a: 'middle', b: 13, w: 600 })}${_yazi(286, 110, '3~', { a: 'middle', b: 9 })}
    ${_cizgi('M65 141V154M115 131V154M160 131V154M225 141V154')}
    ${_no(65, 164, 1)}${_no(115, 164, 2)}${_no(160, 164, 3)}${_no(225, 164, 4)}
  </svg>`,

  surucuIo: (() => {
    const panel = (x0, baslik, npn) => `
      ${_yazi(x0 + 77, 14, baslik, { a: 'middle', b: 12, w: 600 })}
      ${_tel(`M${x0 + 8} 34H${x0 + 148}`, '--dc-plus', { w: 2.5 })}${_yazi(x0 + 148, 28, '+24 V', { a: 'end', b: 10, r: '--dc-plus' })}
      ${_kutu(x0 + 10, 84, 50, 56, { f: '--card' })}${_yazi(x0 + 35, 116, 'sensör', { a: 'middle', b: 10 })}
      ${_tel(`M${x0 + 22} 34V84`, '--dc-plus', { w: 2 })}${_tel(`M${x0 + 22} 140V204`, '--ink', { w: 2 })}
      ${_tel(`M${x0 + 60} 112H${x0 + 96}`, '--signal', { w: 2.5 })}
      ${_kutu(x0 + 96, 84, 52, 56, { f: '--card' })}
      ${_yazi(x0 + 101, 116, 'IN', { b: 10, w: 600 })}${_yazi(x0 + 122, npn ? 98 : 134, 'COM', { a: 'middle', b: 9 })}
      ${npn ? _tel(`M${x0 + 138} 84V34`, '--dc-plus', { w: 2 }) : _tel(`M${x0 + 138} 140V204`, '--ink', { w: 2 })}
      <circle cx="${x0 + 22}" cy="34" r="2.5" style="fill:var(--dc-plus)"></circle><circle cx="${x0 + 22}" cy="204" r="2.5" style="fill:var(--ink)"></circle>
      ${npn ? `<circle cx="${x0 + 138}" cy="34" r="2.5" style="fill:var(--dc-plus)"></circle>` : `<circle cx="${x0 + 138}" cy="204" r="2.5" style="fill:var(--ink)"></circle>`}`;
    return `<svg class="sema" viewBox="0 0 318 230" role="img" aria-label="NPN (sink) ve PNP (source) sensörlerin sürücü girişine bağlanışı">
      ${panel(0, 'NPN (sink)', true)}${panel(163, 'PNP (source)', false)}
      ${_tel('M8 204H310', '--ink', { w: 2.5 })}${_yazi(310, 222, '0 V', { a: 'end', b: 10 })}
      ${_no(78, 112, 1)}${_no(241, 112, 2)}${_no(159, 204, 3)}
    </svg>`;
  })(),
});
