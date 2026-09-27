/* Sigortalar: şemalar. */
Object.assign(SEMALAR, {
  mcb: `<svg class="sema" viewBox="0 0 318 292" role="img" aria-label="Tek kutuplu otomatik sigortanın priz hattına bağlantı şeması">
    <text x="80" y="14" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--wire-l)">L</text>
    <text x="220" y="14" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--wire-n)">N</text>
    <text x="268" y="14" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--wire-pe)">PE</text>
    <rect x="14" y="128" width="160" height="14" rx="2" style="fill:var(--rail)"></rect>
    <path d="M80 22V88" stroke-width="3" fill="none" style="stroke:var(--wire-l)"></path>
    <path d="M220 22V222" stroke-width="3" fill="none" style="stroke:var(--wire-n)"></path>
    <path d="M268 22V222" stroke-width="3" fill="none" style="stroke:var(--wire-pe)"></path>
    <path d="M268 22V222" stroke-width="3" stroke-dasharray="6 6" fill="none" style="stroke:var(--wire-pe2)"></path>
    <rect x="48" y="78" width="64" height="112" rx="6" stroke-width="1.5" style="fill:var(--svg-body);stroke:var(--ink)"></rect>
    <circle cx="80" cy="94" r="6" stroke-width="1.5" style="fill:var(--svg-body);stroke:var(--ink)"></circle>
    <path d="M76 94h8M80 90v8" stroke-width="1.2" fill="none" style="stroke:var(--ink)"></path>
    <rect x="72" y="112" width="16" height="30" rx="3" style="fill:var(--ink)"></rect>
    <text x="80" y="160" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--ink)">C16</text>
    <circle cx="80" cy="174" r="6" stroke-width="1.5" style="fill:var(--svg-body);stroke:var(--ink)"></circle>
    <path d="M76 174h8M80 170v8" stroke-width="1.2" fill="none" style="stroke:var(--ink)"></path>
    <path d="M80 180V250H180" stroke-width="3" stroke-linejoin="round" fill="none" style="stroke:var(--wire-l)"></path>
    <rect x="180" y="222" width="110" height="56" rx="6" stroke-width="1.5" style="fill:var(--card);stroke:var(--ink)"></rect>
    <text x="244" y="246" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--ink)">Yük</text>
    <text x="244" y="264" text-anchor="middle" font-size="11" style="fill:var(--muted)">priz hattı</text>
    <path d="M36 94H73M36 174H73M133 110L90 122M150 156V142" stroke-width="1" stroke-dasharray="2 2" fill="none" style="stroke:var(--ink)"></path>
    <circle cx="26" cy="94" r="10" style="fill:var(--ink)"></circle><text x="26" y="98" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">1</text>
    <circle cx="26" cy="174" r="10" style="fill:var(--ink)"></circle><text x="26" y="178" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">2</text>
    <circle cx="142" cy="106" r="10" style="fill:var(--ink)"></circle><text x="142" y="110" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">3</text>
    <circle cx="150" cy="166" r="10" style="fill:var(--ink)"></circle><text x="150" y="170" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">4</text>
  </svg>`,

  buson: `<svg class="sema" viewBox="0 0 318 300" role="img" aria-label="Buşonlu sigortanın parçaları: kapak, buşon, ayar vidası ve taban; besleme orta kontağa, yük dişli kısma bağlı">
    <path d="M150 60V226" style="stroke:var(--line)" stroke-width="1.5" stroke-dasharray="4 4" fill="none"></path>
    <rect x="112" y="12" width="76" height="40" rx="10" style="fill:var(--chip);stroke:var(--ink)" stroke-width="1.5"></rect>
    <ellipse cx="150" cy="24" rx="16" ry="5" style="fill:var(--card);stroke:var(--ink)" stroke-width="1"></ellipse>
    <rect x="122" y="52" width="56" height="16" style="fill:var(--rail);stroke:var(--ink)" stroke-width="1.2"></rect>
    <path d="M126 68l6-16m6 16l6-16m6 16l6-16m6 16l6-16" style="stroke:var(--hatch)" stroke-width="1" fill="none"></path>
    <rect x="130" y="92" width="40" height="70" rx="6" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>
    <rect x="134" y="86" width="32" height="8" rx="2" style="fill:var(--rail);stroke:var(--ink)" stroke-width="1.2"></rect>
    <circle cx="150" cy="84" r="6" style="fill:#9AA0A6;stroke:var(--ink)" stroke-width="1"></circle>
    <text x="150" y="131" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--ink)">16 A</text>
    <rect x="145" y="162" width="10" height="9" style="fill:var(--rail);stroke:var(--ink)" stroke-width="1.2"></rect>
    <rect x="132" y="190" width="36" height="20" rx="3" style="fill:var(--rail);stroke:var(--ink)" stroke-width="1.2"></rect>
    <rect x="132" y="190" width="36" height="5" rx="2" style="fill:#9AA0A6"></rect>
    <path d="M144 195V210M156 195V210" style="stroke:var(--ink)" stroke-width="1" stroke-dasharray="2 2" fill="none"></path>
    <rect x="96" y="226" width="108" height="58" rx="6" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>
    <rect x="122" y="226" width="56" height="26" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.2"></rect>
    <path d="M126 252l6-26m6 26l6-26m6 26l6-26m6 26l6-26" style="stroke:var(--hatch)" stroke-width="1" fill="none"></path>
    <rect x="145" y="252" width="10" height="8" style="fill:var(--ink)"></rect>
    <path d="M116 272H150V260M184 272H172V252" style="stroke:var(--ink)" stroke-width="1" stroke-dasharray="3 2" fill="none"></path>
    <path d="M10 272H104M196 272H308" style="stroke:var(--wire-l)" stroke-width="3" fill="none"></path>
    <circle cx="110" cy="272" r="6" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></circle>
    <circle cx="190" cy="272" r="6" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></circle>
    <text x="40" y="263" text-anchor="middle" font-size="11" style="fill:var(--muted)">Besleme</text>
    <text x="282" y="263" text-anchor="middle" font-size="11" style="fill:var(--muted)">Yük</text>
    <path d="M189 32H228M171 127H228M169 200H228M205 240H228" style="stroke:var(--ink)" stroke-width="1" stroke-dasharray="2 2" fill="none"></path>
    <circle cx="238" cy="32" r="10" style="fill:var(--ink)"></circle><text x="238" y="36" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">1</text>
    <circle cx="238" cy="127" r="10" style="fill:var(--ink)"></circle><text x="238" y="131" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">2</text>
    <circle cx="238" cy="200" r="10" style="fill:var(--ink)"></circle><text x="238" y="204" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">3</text>
    <circle cx="238" cy="240" r="10" style="fill:var(--ink)"></circle><text x="238" y="244" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">4</text>
  </svg>`,

  nh: `<svg class="sema" viewBox="0 0 318 250" role="img" aria-label="NH bıçaklı sigortanın tabandaki yaylı klipslere oturmuş yan görünüşü">
    <rect x="20" y="170" width="278" height="36" rx="4" style="fill:var(--chip);stroke:var(--ink)" stroke-width="1.5"></rect>
    <rect x="44" y="118" width="32" height="52" rx="3" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>
    <rect x="242" y="118" width="32" height="52" rx="3" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>
    <rect x="52" y="122" width="40" height="10" style="fill:var(--hatch);stroke:var(--ink)" stroke-width="1"></rect>
    <rect x="226" y="122" width="40" height="10" style="fill:var(--hatch);stroke:var(--ink)" stroke-width="1"></rect>
    <rect x="90" y="76" width="138" height="86" rx="6" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>
    <rect x="86" y="80" width="8" height="78" rx="2" style="fill:var(--rail);stroke:var(--ink)" stroke-width="1"></rect>
    <rect x="224" y="80" width="8" height="78" rx="2" style="fill:var(--rail);stroke:var(--ink)" stroke-width="1"></rect>
    <rect x="92" y="60" width="16" height="16" rx="2" style="fill:var(--rail);stroke:var(--ink)" stroke-width="1.2"></rect>
    <rect x="210" y="60" width="16" height="16" rx="2" style="fill:var(--rail);stroke:var(--ink)" stroke-width="1.2"></rect>
    <circle cx="100" cy="68" r="3" style="fill:var(--card)"></circle>
    <circle cx="218" cy="68" r="3" style="fill:var(--card)"></circle>
    <rect x="150" y="68" width="18" height="8" rx="2" style="fill:var(--dc-plus)"></rect>
    <text x="159" y="112" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--ink)">NH00</text>
    <text x="159" y="130" text-anchor="middle" font-size="11" style="fill:var(--ink)">gG 125 A</text>
    <text x="159" y="146" text-anchor="middle" font-size="10" style="fill:var(--muted)">500 V</text>
    <path d="M60 206V244M258 206V244" style="stroke:var(--wire-l)" stroke-width="3" fill="none"></path>
    <text x="68" y="236" font-size="11" style="fill:var(--muted)">Besleme</text>
    <text x="250" y="236" text-anchor="end" font-size="11" style="fill:var(--muted)">Yük</text>
    <path d="M32 106L56 122M98 40V60M183 38L164 68M288 108L272 120" style="stroke:var(--ink)" stroke-width="1" stroke-dasharray="2 2" fill="none"></path>
    <circle cx="24" cy="96" r="10" style="fill:var(--ink)"></circle><text x="24" y="100" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">1</text>
    <circle cx="98" cy="30" r="10" style="fill:var(--ink)"></circle><text x="98" y="34" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">2</text>
    <circle cx="190" cy="30" r="10" style="fill:var(--ink)"></circle><text x="190" y="34" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">3</text>
    <circle cx="296" cy="100" r="10" style="fill:var(--ink)"></circle><text x="296" y="104" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">4</text>
  </svg>`,

  mpcb: `<svg class="sema" viewBox="0 0 318 300" role="img" aria-label="Üç fazlı motorun motor koruma şalteri üzerinden bağlantı şeması">
    <text x="110" y="14" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--wire-l)">L1</text>
    <text x="150" y="14" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--wire-l2)">L2</text>
    <text x="190" y="14" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--wire-l3)">L3</text>
    <text x="40" y="14" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--wire-pe)">PE</text>
    <path d="M110 22V70" style="stroke:var(--wire-l)" stroke-width="3" fill="none"></path>
    <path d="M150 22V70" style="stroke:var(--wire-l2)" stroke-width="3" fill="none"></path>
    <path d="M190 22V70" style="stroke:var(--wire-l3)" stroke-width="3" fill="none"></path>
    <rect x="90" y="70" width="120" height="80" rx="6" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>
    <text x="110" y="85" text-anchor="middle" font-size="9" style="fill:var(--muted)">1</text>
    <text x="150" y="85" text-anchor="middle" font-size="9" style="fill:var(--muted)">3</text>
    <text x="190" y="85" text-anchor="middle" font-size="9" style="fill:var(--muted)">5</text>
    <text x="110" y="143" text-anchor="middle" font-size="9" style="fill:var(--muted)">2</text>
    <text x="150" y="143" text-anchor="middle" font-size="9" style="fill:var(--muted)">4</text>
    <text x="190" y="143" text-anchor="middle" font-size="9" style="fill:var(--muted)">6</text>
    <circle cx="150" cy="110" r="12" style="fill:var(--chip);stroke:var(--ink)" stroke-width="1.5"></circle>
    <path d="M150 110L158 102" style="stroke:var(--ink)" stroke-width="2" stroke-linecap="round" fill="none"></path>
    <rect x="210" y="88" width="24" height="44" rx="3" style="fill:var(--chip);stroke:var(--ink)" stroke-width="1.2"></rect>
    <path d="M110 150V200L128 226" style="stroke:var(--wire-l)" stroke-width="3" stroke-linejoin="round" fill="none"></path>
    <path d="M150 150V220" style="stroke:var(--wire-l2)" stroke-width="3" fill="none"></path>
    <path d="M190 150V200L172 226" style="stroke:var(--wire-l3)" stroke-width="3" stroke-linejoin="round" fill="none"></path>
    <path d="M40 22V254H116" style="stroke:var(--wire-pe)" stroke-width="3" fill="none"></path>
    <path d="M40 22V254H116" style="stroke:var(--wire-pe2)" stroke-width="3" stroke-dasharray="6 6" fill="none"></path>
    <circle cx="150" cy="254" r="34" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></circle>
    <text x="150" y="256" text-anchor="middle" font-size="16" font-weight="600" style="fill:var(--ink)">M</text>
    <text x="150" y="273" text-anchor="middle" font-size="12" style="fill:var(--ink)">3~</text>
    <path d="M72 82H104M72 116H137M72 146H104M258 110H235" style="stroke:var(--ink)" stroke-width="1" stroke-dasharray="2 2" fill="none"></path>
    <circle cx="62" cy="82" r="10" style="fill:var(--ink)"></circle><text x="62" y="86" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">1</text>
    <circle cx="62" cy="116" r="10" style="fill:var(--ink)"></circle><text x="62" y="120" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">2</text>
    <circle cx="62" cy="146" r="10" style="fill:var(--ink)"></circle><text x="62" y="150" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">3</text>
    <circle cx="268" cy="110" r="10" style="fill:var(--ink)"></circle><text x="268" y="114" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">4</text>
  </svg>`,

  rcd: `<svg class="sema" viewBox="0 0 318 300" role="img" aria-label="Kaçak akım rölesi bağlantısı: faz ve nötr röleden geçer, toprak doğrudan cihaz gövdesine gider">
    <text x="90" y="14" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--wire-l)">L</text>
    <text x="120" y="14" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--wire-n)">N</text>
    <text x="250" y="14" text-anchor="middle" font-size="12" font-weight="600" style="fill:var(--wire-pe)">PE</text>
    <rect x="56" y="58" width="96" height="104" rx="6" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>
    <path d="M90 22V210" style="stroke:var(--wire-l)" stroke-width="3" fill="none"></path>
    <path d="M120 22V210" style="stroke:var(--wire-n)" stroke-width="3" fill="none"></path>
    <ellipse cx="105" cy="96" rx="34" ry="10" style="stroke:var(--ink)" stroke-width="2.5" fill="none"></ellipse>
    <rect x="128" y="126" width="18" height="12" rx="2" style="fill:var(--dc-plus)"></rect>
    <text x="137" y="156" text-anchor="middle" font-size="9" style="fill:var(--muted)">30 mA</text>
    <path d="M250 22V234H206" style="stroke:var(--wire-pe)" stroke-width="3" fill="none"></path>
    <path d="M250 22V234H206" style="stroke:var(--wire-pe2)" stroke-width="3" stroke-dasharray="6 6" fill="none"></path>
    <rect x="56" y="210" width="150" height="48" rx="6" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></rect>
    <text x="131" y="239" text-anchor="middle" font-size="11" style="fill:var(--ink)">Cihaz (metal gövde)</text>
    <path d="M180 258V284" style="stroke:var(--dc-plus)" stroke-width="2" stroke-dasharray="4 3" fill="none"></path>
    <path d="M168 286H192M172 291H188M176 296H184" style="stroke:var(--ink)" stroke-width="1.5" fill="none"></path>
    <text x="192" y="276" font-size="10" style="fill:var(--dc-plus)">kaçak</text>
    <path d="M40 40H86M186 96H140M186 132H147M274 140H252" style="stroke:var(--ink)" stroke-width="1" stroke-dasharray="2 2" fill="none"></path>
    <circle cx="30" cy="40" r="10" style="fill:var(--ink)"></circle><text x="30" y="44" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">1</text>
    <circle cx="196" cy="96" r="10" style="fill:var(--ink)"></circle><text x="196" y="100" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">2</text>
    <circle cx="196" cy="132" r="10" style="fill:var(--ink)"></circle><text x="196" y="136" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">3</text>
    <circle cx="284" cy="140" r="10" style="fill:var(--ink)"></circle><text x="284" y="144" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">4</text>
  </svg>`,

  cam: `<svg class="sema" viewBox="0 0 318 184" role="img" aria-label="5×20 mm gecikmeli cam sigorta ve üzerindeki T2AL250V yazısının anlamı">
    <path d="M40 24H278M40 18V30M278 18V30" style="stroke:var(--muted)" stroke-width="1" fill="none"></path>
    <text x="159" y="15" text-anchor="middle" font-size="10" style="fill:var(--muted)">20 mm</text>
    <rect x="80" y="46" width="158" height="40" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.2"></rect>
    <path d="M90 52H228" style="stroke:var(--line)" stroke-width="1.5" fill="none"></path>
    <path d="M80 66H134l4-6 4 12 4-12 4 12 4-12 4 12 4-6H238" style="stroke:var(--ink)" stroke-width="1.5" stroke-linejoin="round" fill="none"></path>
    <rect x="40" y="40" width="40" height="52" rx="4" style="fill:var(--rail);stroke:var(--ink)" stroke-width="1.5"></rect>
    <rect x="238" y="40" width="40" height="52" rx="4" style="fill:var(--rail);stroke:var(--ink)" stroke-width="1.5"></rect>
    <text x="298" y="70" text-anchor="middle" font-size="10" style="fill:var(--muted)">Ø5</text>
    <text x="100" y="132" text-anchor="middle" font-size="22" font-weight="600" style="fill:var(--ink)">T</text>
    <text x="146" y="132" text-anchor="middle" font-size="22" font-weight="600" style="fill:var(--ink)">2A</text>
    <text x="190" y="132" text-anchor="middle" font-size="22" font-weight="600" style="fill:var(--ink)">L</text>
    <text x="240" y="132" text-anchor="middle" font-size="22" font-weight="600" style="fill:var(--ink)">250V</text>
    <path d="M100 140V154M146 140V154M190 140V154M240 140V154" style="stroke:var(--ink)" stroke-width="1" stroke-dasharray="2 2" fill="none"></path>
    <circle cx="100" cy="164" r="10" style="fill:var(--ink)"></circle><text x="100" y="168" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">1</text>
    <circle cx="146" cy="164" r="10" style="fill:var(--ink)"></circle><text x="146" y="168" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">2</text>
    <circle cx="190" cy="164" r="10" style="fill:var(--ink)"></circle><text x="190" y="168" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">3</text>
    <circle cx="240" cy="164" r="10" style="fill:var(--ink)"></circle><text x="240" y="168" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">4</text>
  </svg>`,

  ar: `<svg class="sema" viewBox="0 0 318 196" role="img" aria-label="Frekans konvertörü girişinde her fazda aR sigorta, doğrultucu ve DC bara">
    <text x="4" y="46" font-size="11" font-weight="600" style="fill:var(--wire-l)">L1</text>
    <text x="4" y="86" font-size="11" font-weight="600" style="fill:var(--wire-l2)">L2</text>
    <text x="4" y="126" font-size="11" font-weight="600" style="fill:var(--wire-l3)">L3</text>
    <path d="M24 50H64M100 50H150" style="stroke:var(--wire-l)" stroke-width="3" fill="none"></path>
    <path d="M24 90H64M100 90H150" style="stroke:var(--wire-l2)" stroke-width="3" fill="none"></path>
    <path d="M24 130H64M100 130H150" style="stroke:var(--wire-l3)" stroke-width="3" fill="none"></path>
    <rect x="64" y="42" width="36" height="16" rx="2" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>
    <rect x="64" y="82" width="36" height="16" rx="2" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>
    <rect x="64" y="122" width="36" height="16" rx="2" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>
    <path d="M64 50H100M64 90H100M64 130H100" style="stroke:var(--ink)" stroke-width="1" fill="none"></path>
    <rect x="74" y="16" width="16" height="10" rx="2" style="fill:var(--chip);stroke:var(--ink)" stroke-width="1.2"></rect>
    <path d="M82 26V42" style="stroke:var(--ink)" stroke-width="1" stroke-dasharray="2 2" fill="none"></path>
    <rect x="150" y="30" width="70" height="120" rx="6" style="fill:var(--svg-body);stroke:var(--ink)" stroke-width="1.5"></rect>
    <path d="M175 80V100L192 90Z" style="fill:var(--ink)"></path>
    <path d="M193 80V100" style="stroke:var(--ink)" stroke-width="2" fill="none"></path>
    <text x="185" y="128" text-anchor="middle" font-size="10" style="fill:var(--muted)">AC → DC</text>
    <path d="M220 60H270V84" style="stroke:var(--dc-plus)" stroke-width="2.5" fill="none"></path>
    <path d="M220 120H270V96" style="stroke:var(--ink)" stroke-width="2.5" fill="none"></path>
    <path d="M256 84H284M256 96H284" style="stroke:var(--ink)" stroke-width="2.5" fill="none"></path>
    <text x="234" y="54" font-size="12" font-weight="600" style="fill:var(--dc-plus)">+</text>
    <text x="234" y="138" font-size="12" font-weight="600" style="fill:var(--ink)">−</text>
    <path d="M82 166V139M185 166V151M270 166V121M110 21H91" style="stroke:var(--ink)" stroke-width="1" stroke-dasharray="2 2" fill="none"></path>
    <circle cx="82" cy="176" r="10" style="fill:var(--ink)"></circle><text x="82" y="180" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">1</text>
    <circle cx="185" cy="176" r="10" style="fill:var(--ink)"></circle><text x="185" y="180" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">2</text>
    <circle cx="270" cy="176" r="10" style="fill:var(--ink)"></circle><text x="270" y="180" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">3</text>
    <circle cx="120" cy="21" r="10" style="fill:var(--ink)"></circle><text x="120" y="25" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--paper)">4</text>
  </svg>`,

  mccbEgri: (() => {
    const X = (m) => 40 + (260 * Math.log10(m / 0.8)) / Math.log10(25), Y = (t) => 180 - (160 * (Math.log10(t) + 2)) / 6;
    const L = [[1.15, 3000], [1.5, 400], [2, 120], [3, 40], [4, 20], [6, 8]];
    let d = L.map(([m, t], i) => (i ? 'L' : 'M') + X(m).toFixed(1) + ' ' + Y(t).toFixed(1)).join('');
    d += `V${Y(0.2).toFixed(1)}H${X(12).toFixed(1)}V${Y(0.02).toFixed(1)}H${X(20).toFixed(1)}`;
    let izg = '';
    [1, 2, 5, 10, 20].forEach((m) => { izg += _yazi(X(m), 196, String(m), { a: 'middle', b: 9, r: '--muted' }); });
    [[0.01, '0,01'], [0.1, '0,1'], [1, '1'], [10, '10'], [100, '100'], [1000, '1000']].forEach(([t, e]) => { izg += _yazi(34, Y(t) + 3, e, { a: 'end', b: 8, r: '--muted' }); });
    const kilavuz = (m) => `<path d="M${X(m).toFixed(1)} 20V180" style="stroke:var(--line)" stroke-width="1" stroke-dasharray="3 3" fill="none"></path>`;
    return `<svg class="sema" viewBox="0 0 318 214" role="img" aria-label="Elektronik açma üniteli kompakt şalterin açma eğrisi: Ir, Isd, tsd, Ii">
      ${kilavuz(1)}${kilavuz(6)}${kilavuz(12)}
      ${_yazi(X(1) - 3, 26, 'Ir', { a: 'end', b: 9, w: 600 })}${_yazi(X(6) + 3, 26, 'Isd', { b: 9, w: 600 })}${_yazi(X(12) + 3, 26, 'Ii', { b: 9, w: 600 })}
      ${_tel('M40 16V180H304', '--ink', { w: 1.5 })}${izg}
      ${_yazi(44, 12, 'süre (s)', { b: 10, w: 600 })}${_yazi(306, 210, '× Ir', { a: 'end', b: 10, w: 600 })}
      ${_tel(d, '--signal', { w: 3 })}
      ${_yazi(X(8.5), Y(0.2) - 6, 'tsd', { a: 'middle', b: 9, w: 600 })}
      ${_no(X(2.4) + 14, Y(70) - 6, 1)}${_no(X(6) + 14, Y(2), 2)}${_no(X(8.5), Y(0.2) + 16, 3)}${_no(X(12) + 14, Y(0.07), 4)}
    </svg>`;
  })(),
});
