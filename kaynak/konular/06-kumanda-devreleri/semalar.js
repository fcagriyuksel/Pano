/* Kumanda devreleri: şemalar. */
Object.assign(SEMALAR, {
  ileriGeriGuc: (() => {
    let p = '';
    [[50, '--wire-l', 'L1', 44, 170], [70, '--wire-l2', 'L2', 50, 190], [90, '--wire-l3', 'L3', 56, 210]].forEach(([x, r, ad, y, x2]) => {
      p += _yazi(x, 14, ad, { a: 'middle', b: 11, w: 600, r }) + _tel(`M${x} 20V76`, r, { w: 2.5 }) + _tel(`M${x} ${y}H${x2}V76`, r, { w: 2.5 });
      p += `<circle cx="${x}" cy="${y}" r="3" style="fill:var(${r})"></circle>`;
      p += _kontak(x, 76, { tip: 'NO', u: r }) + _kontak(x2, 76, { tip: 'NO', u: r });
    });
    return `<svg class="sema" viewBox="0 0 318 250" role="img" aria-label="İleri-geri güç devresi: K2 kontaktörü L1 ile L3’ün yerini değiştirir">
      ${p}
      <path d="M38 88H100M158 88H220" style="stroke:var(--muted)" stroke-width="1.2" stroke-dasharray="4 3" fill="none"></path>
      <path d="M100 88H158" style="stroke:var(--dc-plus)" stroke-width="1.5" stroke-dasharray="2 3" fill="none"></path>
      ${_tel('M50 100V140H110V201M70 100V150H130V192M90 100V160H150V201', '--ink', { w: 2 })}
      ${_tel('M170 100V160H150M190 100V150H130M210 100V140H110', '--ink', { w: 2 })}
      <circle cx="130" cy="218" r="26" style="fill:var(--card);stroke:var(--ink)" stroke-width="1.5"></circle>
      ${_yazi(130, 220, 'M', { a: 'middle', b: 14, w: 600 })}${_yazi(130, 236, '3~', { a: 'middle', b: 10 })}
      ${_yazi(70, 124, '-K1', { a: 'middle', b: 10, r: '--muted' })}${_yazi(190, 124, '-K2', { a: 'middle', b: 10, r: '--muted' })}
      ${_no(24, 88, 1)}${_no(240, 88, 2)}${_no(129, 70, 3)}
    </svg>`;
  })(),

  semboller: (() => {
    const hucre = [40, 120, 200, 280];
    let s = '';
    const ust = [['NO', false, 'NO kontak'], ['NC', false, 'NC kontak'], ['NO', true, 'Buton (NO)'], ['NC', true, 'Buton (NC)']];
    ust.forEach(([tip, b, ad], i) => {
      const x = hucre[i];
      s += _tel(`M${x} 12V26M${x} 50V62`, '--ink', { w: 2 }) + _kontak(x, 26, { tip, b }) + _yazi(x, 84, ad, { a: 'middle', b: 10 });
    });
    let x = hucre[0];
    s += _tel(`M${x} 118V132M${x} 148V162`, '--ink', { w: 2 }) + _bobin(x, 132, false) + _yazi(x, 190, 'Bobin', { a: 'middle', b: 10 });
    x = hucre[1];
    s += _tel(`M${x} 118V128M${x} 152V162`, '--ink', { w: 2 }) + _kontak(x, 128, { tip: 'NC' });
    s += _tel(`M${x - 34} 140h4v-6h6v12h6v-6h3`, '--ink', { w: 1.5 }) + `<path d="M${x - 15} 140H${x - 4}" style="stroke:var(--muted)" stroke-width="1.2" stroke-dasharray="2 2" fill="none"></path>`;
    s += _yazi(x, 190, 'Termik (NC)', { a: 'middle', b: 10 });
    x = hucre[2];
    s += _tel(`M${x} 118V131M${x} 149V162`, '--ink', { w: 2 }) + _lamba(x, 140, false) + _yazi(x, 190, 'Lamba', { a: 'middle', b: 10 });
    x = hucre[3];
    s += _tel(`M${x} 118V132M${x} 148V162`, '--ink', { w: 2 }) + _bobin(x, 132, false, { zaman: true }) + _yazi(x, 190, 'Zaman rölesi', { a: 'middle', b: 10 });
    return `<svg class="sema" viewBox="0 0 318 200" role="img" aria-label="Kumanda şeması sembolleri: NO ve NC kontak, butonlar, bobin, termik, lamba, zaman rölesi">${s}</svg>`;
  })(),
});
