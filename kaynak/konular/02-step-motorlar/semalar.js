/* Step motorlar: şemalar. */
Object.assign(SEMALAR, {
  step: `<svg class="sema" viewBox="0 0 318 312" role="img" aria-label="PLC, step sürücü, DC güç kaynağı ve iki sargılı step motor arasındaki bağlantı şeması">
    <rect x="6" y="16" width="92" height="130" rx="6" stroke-width="1.5" style="fill:var(--card);stroke:var(--ink)"></rect>
    <text x="52" y="36" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--ink)">PLC</text>
    <text x="88" y="66" text-anchor="end" font-size="11" style="fill:var(--ink)">Y0</text>
    <text x="88" y="96" text-anchor="end" font-size="11" style="fill:var(--ink)">Y1</text>
    <text x="88" y="126" text-anchor="end" font-size="11" style="fill:var(--ink)">Y2</text>
    <rect x="150" y="16" width="86" height="286" rx="6" stroke-width="1.5" style="fill:var(--card);stroke:var(--ink)"></rect>
    <text x="193" y="36" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--ink)">SÜRÜCÜ</text>
    <text x="158" y="66" font-size="11" style="fill:var(--ink)">PUL</text>
    <text x="158" y="96" font-size="11" style="fill:var(--ink)">DIR</text>
    <text x="158" y="126" font-size="11" style="fill:var(--ink)">ENA</text>
    <text x="158" y="250" font-size="11" style="fill:var(--ink)">V+</text>
    <text x="158" y="280" font-size="11" style="fill:var(--ink)">GND</text>
    <text x="228" y="66" text-anchor="end" font-size="11" style="fill:var(--ink)">A+</text>
    <text x="228" y="96" text-anchor="end" font-size="11" style="fill:var(--ink)">A−</text>
    <text x="228" y="180" text-anchor="end" font-size="11" style="fill:var(--ink)">B+</text>
    <text x="228" y="210" text-anchor="end" font-size="11" style="fill:var(--ink)">B−</text>
    <rect x="6" y="222" width="92" height="80" rx="6" stroke-width="1.5" style="fill:var(--card);stroke:var(--ink)"></rect>
    <text x="46" y="258" text-anchor="middle" font-size="11" style="fill:var(--ink)">DC güç</text>
    <text x="46" y="274" text-anchor="middle" font-size="11" style="fill:var(--ink)">kaynağı</text>
    <text x="90" y="250" text-anchor="end" font-size="12" font-weight="600" style="fill:var(--dc-plus)">+</text>
    <text x="90" y="280" text-anchor="end" font-size="12" font-weight="600" style="fill:var(--ink)">−</text>
    <path d="M98 62H150M98 92H150" stroke-width="2" fill="none" style="stroke:var(--signal)"></path>
    <path d="M98 122H150" stroke-width="2" stroke-dasharray="5 4" fill="none" style="stroke:var(--signal)"></path>
    <path d="M98 246H150" stroke-width="2.5" fill="none" style="stroke:var(--dc-plus)"></path>
    <path d="M98 276H150" stroke-width="2.5" fill="none" style="stroke:var(--ink)"></path>
    <rect x="258" y="40" width="54" height="190" rx="10" stroke-width="1.5" style="fill:var(--paper);stroke:var(--ink)"></rect>
    <text x="285" y="250" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--ink)">MOTOR</text>
    <path d="M236 62H280M236 92H280M236 176H280M236 206H280" stroke-width="2" fill="none" style="stroke:var(--ink)"></path>
    <path d="M280 62c9 0 9 7.5 0 7.5c9 0 9 7.5 0 7.5c9 0 9 7.5 0 7.5c9 0 9 7.5 0 7.5M280 176c9 0 9 7.5 0 7.5c9 0 9 7.5 0 7.5c9 0 9 7.5 0 7.5c9 0 9 7.5 0 7.5" stroke-width="2" fill="none" style="stroke:var(--ink)"></path>
    <text x="302" y="81" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--ink)">A</text>
    <text x="302" y="195" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--ink)">B</text>
    <g style="fill:var(--ink)">
      <circle cx="98" cy="62" r="3.5"></circle><circle cx="98" cy="92" r="3.5"></circle><circle cx="98" cy="122" r="3.5"></circle>
      <circle cx="98" cy="246" r="3.5"></circle><circle cx="98" cy="276" r="3.5"></circle>
      <circle cx="150" cy="62" r="3.5"></circle><circle cx="150" cy="92" r="3.5"></circle><circle cx="150" cy="122" r="3.5"></circle>
      <circle cx="150" cy="246" r="3.5"></circle><circle cx="150" cy="276" r="3.5"></circle>
      <circle cx="236" cy="62" r="3.5"></circle><circle cx="236" cy="92" r="3.5"></circle><circle cx="236" cy="176" r="3.5"></circle><circle cx="236" cy="206" r="3.5"></circle>
    </g>
    <circle cx="124" cy="40" r="10" style="fill:var(--ink)"></circle><text x="124" y="44" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">1</text>
    <circle cx="124" cy="222" r="10" style="fill:var(--ink)"></circle><text x="124" y="226" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">2</text>
    <circle cx="247" cy="134" r="10" style="fill:var(--ink)"></circle><text x="247" y="138" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">3</text>
  </svg>`,

  mekanik: `<svg class="sema" viewBox="0 0 318 120" role="img" aria-label="Motor, kaplin, sabit uç yatağı, bilyalı vida, somun ve tabla, serbest uç yatağından oluşan eksen">
    <rect x="6" y="34" width="48" height="48" rx="4" style="fill:var(--ink)"></rect>
    <path d="M54 58H70" stroke-width="3" fill="none" style="stroke:var(--ink)"></path>
    <rect x="70" y="48" width="28" height="20" rx="3" stroke-width="1.5" style="fill:var(--card);stroke:var(--ink)"></rect>
    <path d="M76 48v20M82 48v20M88 48v20M94 48v20" stroke-width="1" fill="none" style="stroke:var(--ink)"></path>
    <rect x="100" y="38" width="22" height="40" rx="2" stroke-width="1.5" style="fill:var(--chip);stroke:var(--ink)"></rect>
    <rect x="122" y="54" width="168" height="8" stroke-width="1.2" style="fill:var(--card);stroke:var(--ink)"></rect>
    <path d="M126 62l4-8m4 8l4-8m4 8l4-8m4 8l4-8m4 8l4-8m4 8l4-8m4 8l4-8m4 8l4-8m4 8l4-8m4 8l4-8m4 8l4-8m4 8l4-8m4 8l4-8m4 8l4-8m4 8l4-8m4 8l4-8m4 8l4-8m4 8l4-8m4 8l4-8m4 8l4-8" stroke-width="1" fill="none" style="stroke:var(--hatch)"></path>
    <rect x="168" y="30" width="68" height="10" rx="2" stroke-width="1.2" style="fill:var(--chip);stroke:var(--ink)"></rect>
    <rect x="182" y="42" width="40" height="32" rx="3" stroke-width="1.5" style="fill:var(--card);stroke:var(--ink)"></rect>
    <rect x="290" y="42" width="20" height="32" rx="2" stroke-width="1.5" style="fill:var(--chip);stroke:var(--ink)"></rect>
    <text x="30" y="108" text-anchor="middle" font-size="11" style="fill:var(--muted)">Motor</text>
    <path d="M84 68V95M111 78V95M150 62V95M202 74V95M300 74V95" stroke-width="1" stroke-dasharray="2 2" fill="none" style="stroke:var(--ink)"></path>
    <circle cx="84" cy="104" r="9" style="fill:var(--ink)"></circle><text x="84" y="108" text-anchor="middle" font-size="10" font-weight="600" style="fill:var(--paper)">1</text>
    <circle cx="111" cy="104" r="9" style="fill:var(--ink)"></circle><text x="111" y="108" text-anchor="middle" font-size="10" font-weight="600" style="fill:var(--paper)">2</text>
    <circle cx="150" cy="104" r="9" style="fill:var(--ink)"></circle><text x="150" y="108" text-anchor="middle" font-size="10" font-weight="600" style="fill:var(--paper)">3</text>
    <circle cx="202" cy="104" r="9" style="fill:var(--ink)"></circle><text x="202" y="108" text-anchor="middle" font-size="10" font-weight="600" style="fill:var(--paper)">4</text>
    <circle cx="300" cy="104" r="9" style="fill:var(--ink)"></circle><text x="300" y="108" text-anchor="middle" font-size="10" font-weight="600" style="fill:var(--paper)">5</text>
  </svg>`,

  stepPrensip: (() => {
    const panel = (cx, i, etiket) => {
      const cy = 62;
      const aA = i % 2 === 0;
      const yon = [[1, 0], [0, -1], [-1, 0], [0, 1]][i];
      const kutup = (x, y, w, h, on) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" style="fill:var(${on ? '--accent' : '--chip'});stroke:var(--ink)" stroke-width="1.2"></rect>`;
      const ux = cx + yon[0] * 20, uy = cy + yon[1] * 20;
      const bas = yon[0] ? `M${ux} ${uy}L${ux - yon[0] * 7} ${uy - 5}L${ux - yon[0] * 7} ${uy + 5}Z` : `M${ux} ${uy}L${ux - 5} ${uy - yon[1] * 7}L${ux + 5} ${uy - yon[1] * 7}Z`;
      return `<circle cx="${cx}" cy="${cy}" r="30" style="stroke:var(--line)" stroke-width="2" fill="none"></circle>
        ${kutup(cx - 38, cy - 6, 10, 12, aA)}${kutup(cx + 28, cy - 6, 10, 12, aA)}${kutup(cx - 6, cy - 38, 12, 10, !aA)}${kutup(cx - 6, cy + 28, 12, 10, !aA)}
        <circle cx="${cx}" cy="${cy}" r="13" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></circle>
        <path d="M${cx} ${cy}L${ux - yon[0] * 4} ${uy - yon[1] * 4}" style="stroke:var(--dc-plus)" stroke-width="2.5" fill="none"></path>
        <path d="${bas}" style="fill:var(--dc-plus)"></path>
        ${_yazi(cx, 124, etiket, { a: 'middle', b: 12, w: 600 })}`;
    };
    return `<svg class="sema" viewBox="0 0 318 136" role="img" aria-label="Tam adım sırası: A+, B+, A−, B−; her adımda rotor 90 derece elektriksel döner">
      ${panel(42, 0, '1 · A+')}${panel(120, 1, '2 · B+')}${panel(198, 2, '3 · A−')}${panel(276, 3, '4 · B−')}
    </svg>`;
  })(),

  stepNema: `<svg class="sema" viewBox="0 0 318 222" role="img" aria-label="NEMA step motor ön yüzü: yüz ölçüsü, delik aralığı, merkezleme çıkıntısı ve mil">
    <rect x="70" y="30" width="150" height="150" rx="10" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>
    <circle cx="145" cy="105" r="42" style="fill:var(--chip);stroke:var(--ink)" stroke-width="1.5"></circle>
    <circle cx="145" cy="105" r="10" style="fill:var(--rail);stroke:var(--ink)" stroke-width="1.5"></circle>
    <path d="M137 99H153" style="stroke:var(--ink)" stroke-width="1.5" fill="none"></path>
    <circle cx="90" cy="50" r="6" style="fill:var(--paper);stroke:var(--ink)" stroke-width="1.5"></circle>
    <circle cx="200" cy="50" r="6" style="fill:var(--paper);stroke:var(--ink)" stroke-width="1.5"></circle>
    <circle cx="90" cy="160" r="6" style="fill:var(--paper);stroke:var(--ink)" stroke-width="1.5"></circle>
    <circle cx="200" cy="160" r="6" style="fill:var(--paper);stroke:var(--ink)" stroke-width="1.5"></circle>
    ${_tel('M90 16H200M90 10V22M200 10V22M70 200H220M70 194V206M220 194V206', '--muted', { w: 1 })}
    <path d="M90 22V44M200 22V44M70 182V194M220 182V194" style="stroke:var(--muted)" stroke-width="1" stroke-dasharray="2 2" fill="none"></path>
    ${_cizgi('M222 200H232M202 16H212M252 90L187 99M252 126L154 110')}
    ${_no(242, 200, 1)}${_no(222, 16, 2)}${_no(262, 90, 3)}${_no(262, 126, 4)}
  </svg>`,

  stepMikro: (() => {
    const x0 = 40, gen = 260;
    const tamA = `M40 ${50 - 18}H170V${50 + 18}H300`;
    const tamB = `M40 ${50 + 14}H105V${50 - 14}H235V${50 + 14}H300`;
    const basamak = (f, gen0, orta, genlik) => {
      const w = gen0 / 16;
      let d = '';
      for (let k = 0; k < 16; k++) {
        const v = f((k * 22.5 * Math.PI) / 180);
        const y = (orta - v * genlik).toFixed(1);
        const xa = (x0 + k * w).toFixed(1), xb = (x0 + (k + 1) * w).toFixed(1);
        d += k === 0 ? `M${xa} ${y}H${xb}` : `V${y}H${xb}`;
      }
      return d;
    };
    return `<svg class="sema" viewBox="0 0 318 186" role="img" aria-label="Tam adımda ve 1/4 mikroadımda A ve B sargı akımları">
      ${_yazi(40, 14, 'Tam adım', { w: 600 })}
      <path d="M40 50H300M40 146H300" style="stroke:var(--line)" stroke-width="1" stroke-dasharray="3 3" fill="none"></path>
      ${_tel(tamB, '--ink', { w: 1.8 })}${_tel(tamA, '--signal', { w: 2.5 })}
      ${_yazi(40, 108, 'Mikroadım (1/4)', { w: 600 })}
      ${_tel(basamak((x) => -Math.cos(x), gen, 146, 22), '--ink', { w: 1.8 })}${_tel(basamak(Math.sin, gen, 146, 26), '--signal', { w: 2.5 })}
    </svg>`;
  })(),

  stepTork: `<svg class="sema" viewBox="0 0 318 214" role="img" aria-label="Step motor tork–hız eğrisi: pull-out ve pull-in eğrileri, rezonans bölgesi">
    <rect x="72" y="24" width="30" height="156" style="fill:var(--danger-bg)"></rect>
    ${_tel('M40 12V180H306', '--ink', { w: 1.5 })}
    ${_yazi(48, 14, 'Tork', { b: 11, w: 600 })}${_yazi(306, 198, 'Hız', { a: 'end', b: 11, w: 600 })}
    ${_tel('M40 40H70C78 40 82 54 87 54C92 54 96 42 104 42C140 42 160 60 190 90S260 146 300 154', '--signal', { w: 2.5 })}
    ${_tel('M40 72C90 74 110 90 140 118S190 164 208 178', '--ink', { w: 2, k: '5 4' })}
    ${_cizgi('M244 108L236 126M132 144L150 128')}
    ${_no(24, 40, 1)}${_no(250, 100, 2)}${_no(124, 152, 3)}${_no(87, 14, 4)}
  </svg>`,
});
