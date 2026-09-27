/* Servo motorlar: şemalar. */
Object.assign(SEMALAR, {
  servoEnkoder: (() => {
    const cx = 70, cy = 88;
    let yarik = '';
    for (let i = 0; i < 24; i++) {
      const a = (i * Math.PI) / 12, c = Math.cos(a), s = Math.sin(a);
      yarik += `M${(cx + 38 * c).toFixed(1)} ${(cy + 38 * s).toFixed(1)}L${(cx + 48 * c).toFixed(1)} ${(cy + 48 * s).toFixed(1)}`;
    }
    const kare = (y0, ilk) => {
      const hi = y0 - 11, lo = y0 + 11;
      let d = `M150 ${lo}`, x = ilk, yuksek = false;
      while (x <= 280) { d += `H${x}V${yuksek ? lo : hi}`; yuksek = !yuksek; x += 20; }
      return d + 'H290';
    };
    return `<svg class="sema" viewBox="0 0 318 184" role="img" aria-label="Artımsal enkoder diski ve A, B, Z kanal sinyalleri">
      <circle cx="${cx}" cy="${cy}" r="52" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></circle>
      <path d="${yarik}" style="stroke:var(--ink)" stroke-width="3" fill="none"></path>
      <path d="M${cx} ${cy - 32}V${cy - 24}" style="stroke:var(--dc-plus)" stroke-width="4" fill="none"></path>
      <circle cx="${cx}" cy="${cy}" r="11" style="fill:var(--ink)"></circle>
      ${_yazi(142, 44, 'A', { a: 'end', w: 600, r: '--signal' })}
      ${_yazi(142, 92, 'B', { a: 'end', w: 600 })}
      ${_yazi(142, 140, 'Z', { a: 'end', w: 600, r: '--dc-plus' })}
      ${_tel(kare(40, 160), '--signal', { w: 2 })}
      ${_tel(kare(88, 170), '--ink', { w: 2 })}
      ${_tel('M150 147H200V125H210V147H290', '--dc-plus', { w: 2 })}
      ${_yazi(220, 172, 'A önde → ileri yön', { a: 'middle', b: 10, r: '--muted' })}
      ${_cizgi(`M${cx} 141V150`)}
      ${_no(cx, 160, 1)}${_no(306, 64, 2)}${_no(306, 136, 3)}
    </svg>`;
  })(),

  servoBaglanti: `<svg class="sema" viewBox="0 0 318 330" role="img" aria-label="Servo sürücü bağlantısı: besleme, PLC, enkoder, motor güç kablosu, fren ve fren direnci">
    ${_yazi(130, 14, 'L1', { a: 'middle', w: 600, r: '--wire-l' })}${_yazi(150, 14, 'L2', { a: 'middle', w: 600, r: '--wire-l2' })}${_yazi(170, 14, 'L3', { a: 'middle', w: 600, r: '--wire-l3' })}
    ${_tel('M130 20V60', '--wire-l')}${_tel('M150 20V60', '--wire-l2')}${_tel('M170 20V60', '--wire-l3')}
    ${_kutu(110, 60, 100, 210)}
    ${_yazi(160, 84, 'SERVO', { a: 'middle', b: 10, w: 600 })}${_yazi(160, 97, 'SÜRÜCÜ', { a: 'middle', b: 10, w: 600 })}
    ${_yazi(202, 174, 'U', { a: 'end', b: 9, r: '--muted' })}${_yazi(202, 189, 'V', { a: 'end', b: 9, r: '--muted' })}${_yazi(202, 204, 'W', { a: 'end', b: 9, r: '--muted' })}${_yazi(202, 219, 'PE', { a: 'end', b: 9, r: '--muted' })}
    ${_tel('M210 170H250', '--wire-l')}${_tel('M210 185H250', '--wire-l2')}${_tel('M210 200H250', '--wire-l3')}${_pe('M210 215H250')}
    ${_kutu(250, 150, 60, 100, { rx: 10, f: '--card' })}
    ${_yazi(280, 196, 'SERVO', { a: 'middle', b: 9, w: 600 })}${_yazi(280, 209, 'MOTOR', { a: 'middle', b: 9, w: 600 })}
    ${_kutu(262, 118, 36, 32, { rx: 4, f: '--chip', sw: 1.2 })}${_yazi(280, 138, 'ENC', { a: 'middle', b: 9 })}
    ${_tel('M210 104H280V118', '--signal', { w: 2 })}
    ${_tel('M280 250V300H236', '--dc-plus', { w: 2 })}
    ${_kutu(176, 288, 60, 24, { rx: 4, f: '--chip', sw: 1.2 })}${_yazi(206, 304, '24 V', { a: 'middle', b: 10 })}
    ${_kutu(10, 130, 70, 70, { f: '--card' })}${_yazi(45, 170, 'PLC', { a: 'middle', w: 600 })}
    ${_tel('M80 150H110M80 180H110', '--signal', { w: 2 })}
    ${_kutu(28, 242, 52, 24, { rx: 3, f: '--card', sw: 1.2 })}
    ${_tel('M34 254l4-6 4 12 4-12 4 12 4-12 4 12 4-6', '--ink', { w: 1.2 })}
    ${_tel('M80 248H110M80 260H110', '--ink', { w: 1.5 })}
    ${_cizgi('M110 40H127')}
    ${_no(100, 40, 1)}${_no(95, 120, 2)}${_no(236, 80, 3)}${_no(230, 234, 4)}${_no(160, 300, 5)}${_no(95, 228, 6)}
  </svg>`,

  servoAyar: `<svg class="sema" viewBox="0 0 318 184" role="img" aria-label="Servo sürücüde iç içe konum, hız ve akım döngüleri">
    ${_kutu(10, 40, 70, 36, { f: '--card' })}${_yazi(45, 62, 'Konum', { a: 'middle', w: 600 })}
    ${_kutu(104, 40, 62, 36, { f: '--card' })}${_yazi(135, 62, 'Hız', { a: 'middle', w: 600 })}
    ${_kutu(190, 40, 62, 36, { f: '--card' })}${_yazi(221, 62, 'Akım', { a: 'middle', w: 600 })}
    <circle cx="288" cy="58" r="18" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></circle>${_yazi(288, 62, 'M', { a: 'middle', w: 600 })}
    ${_tel('M80 58H100M166 58H186M252 58H266', '--ink', { w: 1.8 })}
    ${_okSag(104, 58)}${_okSag(190, 58)}${_okSag(270, 58)}
    ${_tel('M288 76V150H45V80M135 150V80', '--signal', { w: 1.8 })}
    ${_okYukari(45, 76)}${_okYukari(135, 76)}
    ${_tel('M261 58V110H221V80', '--dc-plus', { w: 1.8 })}${_okYukari(221, 76)}
    <circle cx="261" cy="58" r="2.5" style="fill:var(--ink)"></circle><circle cx="135" cy="150" r="2.5" style="fill:var(--signal)"></circle>
    ${_yazi(232, 144, 'enkoder', { a: 'middle', b: 10, r: '--muted' })}${_yazi(242, 104, 'akım ölçümü', { a: 'middle', b: 10, r: '--muted' })}
    ${_cizgi('M45 30V40M135 30V40M221 30V40M100 150V158')}
    ${_no(45, 20, 1)}${_no(135, 20, 2)}${_no(221, 20, 3)}${_no(100, 168, 4)}
  </svg>`,

  servoFren: `<svg class="sema" viewBox="0 0 318 222" role="img" aria-label="Servo motor freninin röle üzerinden 24 V ile beslenmesi">
    ${_kutu(10, 30, 70, 80, { f: '--card' })}${_yazi(45, 74, '24 V DC', { a: 'middle', w: 600 })}
    ${_yazi(72, 54, '+', { a: 'end', w: 600, r: '--dc-plus' })}${_yazi(72, 98, '−', { a: 'end', w: 600 })}
    ${_tel('M80 50H128', '--dc-plus', { w: 2.5 })}
    ${_tel('M128 50L154 40', '--ink', { w: 2 })}
    ${_tel('M160 50H250V66', '--dc-plus', { w: 2.5 })}
    <rect x="232" y="56" width="72" height="50" rx="6" style="stroke:var(--muted)" stroke-width="1" stroke-dasharray="4 3" fill="none"></rect>
    ${_tel('M250 66c9 0 9 7.5 0 7.5c9 0 9 7.5 0 7.5c9 0 9 7.5 0 7.5c9 0 9 7.5 0 7.5', '--ink', { w: 2 })}
    ${_tel('M250 66H284V78M284 90V96H250', '--ink', { w: 1.5 })}
    <path d="M276 78H292" style="stroke:var(--ink)" stroke-width="2" fill="none"></path>
    <path d="M276 90H292L284 78Z" style="fill:var(--ink)"></path>
    ${_tel('M250 96V122H94V94H80', '--ink', { w: 2.5 })}
    ${_kutu(128, 150, 44, 28, { rx: 4, f: '--chip', sw: 1.2 })}${_yazi(150, 168, 'röle', { a: 'middle', b: 10 })}
    <path d="M150 150V47" style="stroke:var(--muted)" stroke-width="1" stroke-dasharray="3 3" fill="none"></path>
    ${_kutu(10, 144, 70, 40, { f: '--card' })}${_yazi(45, 161, 'Sürücü', { a: 'middle', b: 10, w: 600 })}${_yazi(45, 175, 'fren çıkışı', { a: 'middle', b: 9, r: '--muted' })}
    ${_tel('M80 164H128', '--signal', { w: 2 })}
    ${_cizgi('M45 185V196M150 179V196M228 84H246')}
    ${_no(45, 206, 1)}${_no(150, 206, 2)}${_no(304, 84, 3)}${_no(218, 84, 4)}
  </svg>`,

  servoReduktor: `<svg class="sema" viewBox="0 0 318 170" role="img" aria-label="Servo motor, adaptör flanş, sıkma bileziği, planet redüktör ve çıkış mili">
    ${_kutu(6, 52, 88, 76, { rx: 6 })}${_yazi(50, 94, 'SERVO', { a: 'middle', w: 600 })}
    <rect x="94" y="58" width="22" height="64" style="fill:var(--chip);stroke:var(--ink)" stroke-width="1.5"></rect>
    <rect x="84" y="82" width="34" height="16" style="stroke:var(--ink)" stroke-width="1" stroke-dasharray="3 2" fill="none"></rect>
    ${_kutu(116, 62, 92, 56, { rx: 8 })}
    <circle cx="162" cy="90" r="21" style="stroke:var(--ink)" stroke-width="1.5" fill="none"></circle>
    <circle cx="162" cy="90" r="6" style="fill:var(--ink)"></circle>
    <circle cx="162" cy="77" r="7" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.2"></circle>
    <circle cx="150.7" cy="96.5" r="7" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.2"></circle>
    <circle cx="173.3" cy="96.5" r="7" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.2"></circle>
    <rect x="208" y="66" width="10" height="48" style="fill:var(--chip);stroke:var(--ink)" stroke-width="1.2"></rect>
    <rect x="218" y="83" width="56" height="14" style="fill:var(--rail);stroke:var(--ink)" stroke-width="1.2"></rect>
    <rect x="236" y="83" width="24" height="4" style="fill:var(--ink)"></rect>
    <rect x="274" y="70" width="26" height="40" rx="3" style="fill:var(--chip);stroke:var(--ink)" stroke-width="1.2"></rect>
    ${_cizgi('M105 40V58M101 140V99M162 40V62M246 140V98')}
    ${_no(105, 30, 1)}${_no(101, 150, 2)}${_no(162, 30, 3)}${_no(246, 150, 4)}
  </svg>`,
});
