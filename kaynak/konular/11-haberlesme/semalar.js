/* Endüstriyel haberleşme: şemalar. */
Object.assign(SEMALAR, {
  modbusHat: (() => {
    const A = 56, B = 76, G = 96;
    const cihaz = (cx, t1, t2) => `${_tel(`M${cx - 10} ${A}V118`, '--dc-plus', { w: 2 })}${_tel(`M${cx} ${B}V118`, '--signal', { w: 2 })}${_tel(`M${cx + 10} ${G}V118`, '--muted', { w: 1.5 })}
      <circle cx="${cx - 10}" cy="${A}" r="3" style="fill:var(--ink)"></circle><circle cx="${cx}" cy="${B}" r="3" style="fill:var(--ink)"></circle><circle cx="${cx + 10}" cy="${G}" r="2.5" style="fill:var(--ink)"></circle>
      ${_kutu(cx - 28, 118, 56, 44, { f: '--card' })}${_yazi(cx, 137, t1, { a: 'middle', b: 11, w: 600 })}${_yazi(cx, 152, t2, { a: 'middle', b: 9, r: '--muted' })}`;
    const son = (x) => `<path d="M${x} ${A}V60M${x} 72V${B}" style="stroke:var(--ink)" stroke-width="1.5" fill="none"></path><rect x="${x - 4}" y="60" width="8" height="12" rx="1" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></rect>`;
    return `<svg class="sema" viewBox="0 0 318 192" role="img" aria-label="RS-485 Modbus RTU hattı: master, sırayla bağlı cihazlar ve iki uçta 120 ohm sonlandırma">
      ${_tel(`M26 ${A}H312`, '--dc-plus', { w: 2.5 })}${_tel(`M26 ${B}H312`, '--signal', { w: 2.5 })}${_tel(`M26 ${G}H312`, '--muted', { w: 1.5, k: '4 3' })}
      ${_yazi(4, A + 4, 'A', { b: 10, w: 600 })}${_yazi(4, B + 4, 'B', { b: 10, w: 600 })}${_yazi(2, G + 4, '0 V', { b: 9, w: 600 })}
      ${son(32)}${son(306)}${_yazi(32, 44, '120 Ω', { a: 'middle', b: 9, r: '--muted' })}${_yazi(300, 44, '120 Ω', { a: 'middle', b: 9, r: '--muted' })}
      ${cihaz(64, 'PLC', 'master')}${cihaz(140, 'VFD', 'adres 1')}${cihaz(216, 'VFD', 'adres 2')}${cihaz(284, 'Sayaç', 'adres 3')}
      ${_no(64, 178, 1)}${_no(140, 178, 2)}${_no(262, 40, 3)}${_no(178, 38, 4)}
    </svg>`;
  })(),

  modbusTcp: (() => {
    const cihaz = (x, t1, t2, ip) => _kutu(x, 80, 80, 44, { f: '--card' }) + _yazi(x + 40, 96, t1, { a: 'middle', b: 11, w: 600 }) + _yazi(x + 40, 108, t2, { a: 'middle', b: 9, r: '--muted' }) + _yazi(x + 40, 119, ip, { a: 'middle', b: 9 });
    return `<svg class="sema" viewBox="0 0 318 196" role="img" aria-label="Modbus TCP ağı: PLC, switch, sürücü ve RTU ağ geçidi">
      ${_tel('M130 48V62H48V80M159 48V80M188 48V62H270V80', '--signal', { w: 2.5 })}
      ${_kutu(114, 14, 90, 34, { f: '--card' })}${_yazi(159, 36, 'Switch', { a: 'middle', b: 11, w: 600 })}
      ${cihaz(8, 'PLC', 'client', '192.168.0.10')}${cihaz(119, 'VFD', 'server', '192.168.0.30')}${cihaz(230, 'Ağ geçidi', 'TCP ↔ RTU', '192.168.0.40')}
      ${_yazi(159, 138, 'port 502', { a: 'middle', b: 9, r: '--muted' })}
      ${_tel('M270 124V146M214 146H310M236 146V158M288 146V158', '--dc-plus', { w: 2.5 })}
      <circle cx="270" cy="146" r="3" style="fill:var(--ink)"></circle><circle cx="236" cy="146" r="3" style="fill:var(--ink)"></circle><circle cx="288" cy="146" r="3" style="fill:var(--ink)"></circle>
      ${_kutu(212, 158, 48, 30, { f: '--card' })}${_yazi(236, 172, 'ID 1', { a: 'middle', b: 10, w: 600 })}${_yazi(236, 183, 'RTU', { a: 'middle', b: 8, r: '--muted' })}
      ${_kutu(264, 158, 48, 30, { f: '--card' })}${_yazi(288, 172, 'ID 2', { a: 'middle', b: 10, w: 600 })}${_yazi(288, 183, 'RTU', { a: 'middle', b: 8, r: '--muted' })}
      ${_no(48, 140, 1)}${_no(222, 31, 2)}${_no(104, 102, 3)}${_no(192, 172, 4)}
    </svg>`;
  })(),

  canHat: (() => {
    const H = 62, L = 82;
    const dugum = (cx, t1, t2) => `${_tel(`M${cx - 6} ${H}V112`, '--dc-plus', { w: 2 })}${_tel(`M${cx + 6} ${L}V112`, '--signal', { w: 2 })}
      <circle cx="${cx - 6}" cy="${H}" r="3" style="fill:var(--ink)"></circle><circle cx="${cx + 6}" cy="${L}" r="3" style="fill:var(--ink)"></circle>
      ${_kutu(cx - 28, 112, 56, 44, { f: '--card' })}${_yazi(cx, 131, t1, { a: 'middle', b: 11, w: 600 })}${_yazi(cx, 146, t2, { a: 'middle', b: 9, r: '--muted' })}`;
    const son = (x) => `<path d="M${x} ${H}V66M${x} 78V${L}" style="stroke:var(--ink)" stroke-width="1.5" fill="none"></path><rect x="${x - 4}" y="66" width="8" height="12" rx="1" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></rect>`;
    return `<svg class="sema" viewBox="0 0 318 188" role="img" aria-label="CANopen hattı: CAN_H, CAN_L, iki uçta 120 ohm ve enerjisizken 60 ohm ölçümü">
      ${_tel(`M18 ${H}H310`, '--dc-plus', { w: 2.5 })}${_tel(`M18 ${L}H310`, '--signal', { w: 2.5 })}
      ${_yazi(2, H + 4, 'H', { b: 10, w: 600 })}${_yazi(2, L + 4, 'L', { b: 10, w: 600 })}
      ${son(26)}${son(304)}${_yazi(26, 52, '120 Ω', { a: 'middle', b: 9, r: '--muted' })}${_yazi(298, 52, '120 Ω', { a: 'middle', b: 9, r: '--muted' })}
      ${_tel(`M144 34V${H}`, '--ink', { w: 1.5 })}${_tel(`M176 34V${L}`, '--ink', { w: 1.5 })}
      <circle cx="144" cy="${H}" r="3" style="fill:var(--ink)"></circle><circle cx="176" cy="${L}" r="3" style="fill:var(--ink)"></circle>
      ${_kutu(128, 6, 64, 28, { f: '--card' })}${_yazi(160, 25, '60 Ω', { a: 'middle', b: 13, w: 600 })}
      ${dugum(58, 'PLC', 'master')}${dugum(128, 'Sürücü', 'ID 2')}${dugum(198, 'I/O', 'ID 3')}${dugum(262, 'Enkoder', 'ID 4')}
      ${_no(58, 174, 1)}${_no(128, 174, 2)}${_no(270, 46, 3)}${_no(208, 20, 4)}
    </svg>`;
  })(),

  ethercatHat: (() => {
    const port = (x, bos) => `<rect x="${x - 8}" y="56" width="16" height="12" rx="2" style="fill:var(${bos ? '--card' : '--ink'});stroke:var(--ink)" stroke-width="1.5"></rect>`;
    const slave = (x, t, sira, sonuncu) => _kutu(x, 62, 64, 58, { f: '--card' }) + port(x + 18) + port(x + 46, sonuncu)
      + _yazi(x + 18, 82, 'IN', { a: 'middle', b: 8, r: '--muted' }) + _yazi(x + 46, 82, 'OUT', { a: 'middle', b: 8, r: '--muted' })
      + _yazi(x + 32, 100, t, { a: 'middle', b: 11, w: 600 }) + _yazi(x + 32, 113, sira, { a: 'middle', b: 9, r: '--muted' });
    const kablo = (x1, x2) => _tel(`M${x1} 56V40H${x2}V56`, '--signal', { w: 2.5 }) + `<path d="M${(x1 + x2) / 2 + 5} 40l-9-5v10z" style="fill:var(--signal)"></path>`;
    return `<svg class="sema" viewBox="0 0 318 164" role="img" aria-label="EtherCAT hattı: master, IN ve OUT portları üzerinden sıralı cihazlar">
      ${kablo(34, 96)}${kablo(124, 178)}${kablo(206, 260)}
      ${_kutu(6, 62, 56, 58, { f: '--card' })}${port(34)}${_yazi(34, 82, 'ETH', { a: 'middle', b: 8, r: '--muted' })}${_yazi(34, 100, 'PLC', { a: 'middle', b: 11, w: 600 })}${_yazi(34, 113, 'master', { a: 'middle', b: 9, r: '--muted' })}
      ${slave(78, 'Sürücü', 'sıra 1', false)}${slave(160, 'I/O', 'sıra 2', false)}${slave(242, 'Sürücü', 'sıra 3', true)}
      ${_tel('M270 130H44', '--signal', { w: 1.5, k: '4 3' })}<path d="M36 130l9-5v10z" style="fill:var(--signal)"></path>
      ${_yazi(184, 148, 'çerçeve her cihazdan geçip geri döner', { a: 'middle', b: 9, r: '--muted' })}
      ${_no(34, 148, 1)}${_no(66, 24, 2)}${_no(151, 24, 3)}${_no(288, 38, 4)}
    </svg>`;
  })(),

  rs232Kablo: `<svg class="sema" viewBox="0 0 318 190" role="img" aria-label="RS-232 çapraz kablo: TXD karşı tarafın RXD ucuna, GND düz bağlanır">
    ${_yazi(50, 18, 'PLC / PC', { a: 'middle', b: 11, w: 600 })}${_yazi(268, 18, 'Cihaz', { a: 'middle', b: 11, w: 600 })}
    ${_kutu(10, 30, 80, 120, { f: '--card' })}${_kutu(228, 30, 80, 120, { f: '--card' })}
    ${_yazi(16, 64, '2 RXD', { b: 10 })}${_yazi(16, 94, '3 TXD', { b: 10 })}${_yazi(16, 124, '5 GND', { b: 10 })}
    ${_yazi(302, 64, 'RXD 2', { a: 'end', b: 10 })}${_yazi(302, 94, 'TXD 3', { a: 'end', b: 10 })}${_yazi(302, 124, 'GND 5', { a: 'end', b: 10 })}
    ${_tel('M90 90H130L188 60H222', '--dc-plus', { w: 2.5 })}<path d="M228 60l-9-5v10z" style="fill:var(--dc-plus)"></path>
    ${_tel('M228 90H188L130 60H96', '--signal', { w: 2.5 })}<path d="M90 60l9-5v10z" style="fill:var(--signal)"></path>
    ${_tel('M90 120H228', '--ink', { w: 2.5 })}
    ${[60, 90, 120].map((y) => `<circle cx="90" cy="${y}" r="3.5" style="fill:var(--ink)"></circle><circle cx="228" cy="${y}" r="3.5" style="fill:var(--ink)"></circle>`).join('')}
    ${_cizgi('M159 44V70')}${_no(159, 34, 4)}${_no(112, 106, 1)}${_no(112, 44, 2)}${_no(159, 136, 3)}
    ${_yazi(159, 176, 'Boştaki TX ucu, GND’ye göre −5…−12 V okunur', { a: 'middle', b: 9, r: '--muted' })}
  </svg>`,

  ipAdres: (() => {
    const oktet = (x, t, host) => `<rect x="${x}" y="20" width="56" height="32" rx="6" style="fill:var(${host ? '--accent' : '--chip'});stroke:var(--ink)" stroke-width="1.5"></rect>` + _yazi(x + 28, 41, t, { a: 'middle', b: 14, w: 600, r: host ? '--on-accent' : '--ink' });
    const maske = (x, t) => _yazi(x + 28, 66, t, { a: 'middle', b: 9, r: '--muted' });
    const cihaz = (y, ad, ip, durum, renk) => `${_tel(`M70 ${y + 13}H100`, '--signal', { w: 2 })}${_kutu(100, y, 206, 26, { f: '--card' })}${_yazi(108, y + 17, ad, { b: 10, w: 600 })}${_yazi(160, y + 17, ip, { b: 10 })}${durum ? _yazi(300, y + 17, durum, { a: 'end', b: 10, w: 600, r: renk }) : ''}`;
    return `<svg class="sema" viewBox="0 0 318 204" role="img" aria-label="IP adresi ve alt ağ maskesi: aynı ağdaki cihazlar konuşur, farklı ağdaki görmez">
      ${oktet(10, '192')}${oktet(72, '168')}${oktet(134, '0')}${oktet(196, '10', true)}${_yazi(262, 41, '/24', { b: 13, w: 600 })}
      ${maske(10, '255')}${maske(72, '255')}${maske(134, '255')}${maske(196, '0')}
      <path d="M12 74V80H188V74M198 74V80H250V74" style="stroke:var(--ink)" stroke-width="1.2" fill="none"></path>
      ${_yazi(90, 94, 'ağ kısmı', { a: 'middle', b: 10, w: 600 })}${_no(140, 90, 1)}${_yazi(224, 94, 'cihaz', { a: 'middle', b: 10, w: 600 })}${_no(270, 90, 2)}
      ${_kutu(10, 118, 60, 70, { f: '--card' })}${_yazi(40, 157, 'Switch', { a: 'middle', b: 10, w: 600 })}
      ${cihaz(108, 'PLC', '192.168.0.10', '', '')}${cihaz(139, 'HMI', '192.168.0.20', 'aynı ağ ✓', '--wire-pe')}${cihaz(170, 'Kamera', '192.168.1.20', 'farklı ✗', '--dc-plus')}
      ${_no(85, 152, 3)}${_no(85, 183, 4)}
    </svg>`;
  })(),

  profinetAg: (() => {
    const port = (x) => `<rect x="${x - 8}" y="56" width="16" height="12" rx="2" style="fill:var(--ink);stroke:var(--ink)" stroke-width="1.5"></rect>`;
    const cihaz = (x, t, ad) => _kutu(x, 62, 64, 58, { f: '--card' }) + port(x + 16) + port(x + 48)
      + _yazi(x + 16, 82, 'P1', { a: 'middle', b: 8, r: '--muted' }) + _yazi(x + 48, 82, 'P2', { a: 'middle', b: 8, r: '--muted' })
      + _yazi(x + 32, 100, t, { a: 'middle', b: 10, w: 600 }) + _yazi(x + 32, 113, ad, { a: 'middle', b: 9, r: '--signal' });
    const kablo = (x1, x2) => _tel(`M${x1} 56V40H${x2}V56`, '--signal', { w: 2.5 });
    return `<svg class="sema" viewBox="0 0 318 186" role="img" aria-label="PROFINET hattı: IO-Controller ve cihaz adlarıyla tanınan IO-Device’lar">
      ${kablo(34, 96)}${kablo(128, 178)}${kablo(210, 262)}
      ${_kutu(6, 62, 56, 58, { f: '--card' })}${port(34)}${_yazi(34, 82, 'ETH', { a: 'middle', b: 8, r: '--muted' })}${_yazi(34, 100, 'PLC', { a: 'middle', b: 11, w: 600 })}${_yazi(34, 113, 'controller', { a: 'middle', b: 7, r: '--muted' })}
      ${cihaz(80, 'ET 200', 'io-1')}${cihaz(162, 'VFD', 'vfd-1')}${cihaz(246, 'Valf ad.', 'va-1')}
      <path d="M12 134h16l6 6v20H12z" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.2"></path><path d="M28 134v6h6" style="stroke:var(--ink)" stroke-width="1.2" fill="none"></path>
      ${_yazi(40, 152, 'GSDML', { b: 9, w: 600 })}
      ${_yazi(310, 176, 'PLC, cihazı adından bulur, IP’yi kendisi atar', { a: 'end', b: 9, r: '--muted' })}
      ${_no(34, 24, 1)}${_no(194, 136, 2)}${_no(154, 24, 3)}${_no(98, 147, 4)}
    </svg>`;
  })(),

  ioLink: `<svg class="sema" viewBox="0 0 318 206" role="img" aria-label="IO-Link: PLC, IO-Link master, 3 telli kablo ve akıllı sensör">
    ${_kutu(10, 10, 72, 32, { f: '--card' })}${_yazi(46, 31, 'PLC', { a: 'middle', b: 11, w: 600 })}
    ${_tel('M46 42V70', '--signal', { w: 4 })}${_yazi(56, 60, 'PROFINET / EtherCAT', { b: 9, r: '--muted' })}
    ${_kutu(10, 70, 150, 50, { f: '--card' })}${_yazi(85, 92, 'IO-Link master', { a: 'middle', b: 11, w: 600 })}
    ${[1, 2, 3, 4].map((n) => { const x = 28 + (n - 1) * 38; return `<circle cx="${x}" cy="120" r="8" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></circle>` + _yazi(x, 110, 'X' + n, { a: 'middle', b: 8, r: '--muted' }); }).join('')}
    ${_tel('M24 128V162H232', '--wire-l', { w: 2.5 })}${_tel('M28 128V176H232', '--wire-l2', { w: 2.5 })}${_tel('M32 128V190H232', '--wire-n', { w: 2.5 })}
    ${_yazi(110, 158, 'L+ 24 V', { b: 9, r: '--muted' })}${_yazi(110, 172, 'C/Q veri', { b: 9, w: 600 })}${_yazi(110, 186, 'L− 0 V', { b: 9, r: '--muted' })}
    ${_kutu(232, 148, 76, 50, { f: '--card' })}${_yazi(270, 170, 'Sensör', { a: 'middle', b: 11, w: 600 })}${_yazi(270, 186, 'IODD', { a: 'middle', b: 9, r: '--muted' })}
    <path d="M190 120H256M256 120l-7-4v8zM190 120l7-4v8z" style="stroke:var(--signal);fill:var(--signal)" stroke-width="1.5"></path>
    ${_yazi(238, 110, 'değer · parametre · tanı', { a: 'middle', b: 9, r: '--muted' })}
    ${_no(176, 84, 1)}${_cizgi('M60 136L36 125')}${_no(70, 140, 2)}${_no(200, 146, 3)}${_no(292, 136, 4)}
  </svg>`,
});
