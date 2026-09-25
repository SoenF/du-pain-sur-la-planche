// Du Pain sur la Planche — script commun (menu latéral + galerie)
document.addEventListener('DOMContentLoaded', function () {
  var sidebar = document.querySelector('.sidebar');
  var backdrop = document.querySelector('.sidebar-backdrop');
  var openBtn = document.querySelector('.menu-toggle');
  var closeBtn = document.querySelector('.sidebar-close');

  function openMenu() {
    sidebar.classList.add('open');
    backdrop.classList.add('open');
  }
  function closeMenu() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('open');
  }

  if (openBtn) openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  // Ferme le menu si on clique un lien (utile en mobile)
  document.querySelectorAll('.sidebar-nav a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Lightbox simple pour les galeries d'images
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    var lightboxClose = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery figure').forEach(function (fig) {
      fig.addEventListener('click', function () {
        var img = fig.querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
      });
    });

    function closeLightbox() { lightbox.classList.remove('open'); lightboxImg.src = ''; }
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // ---- Décor vivant : planches suspendues et pains qui dérivent -----------
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isSmall = window.matchMedia('(max-width: 700px)').matches;
  var FILL = '#DDA95F', SHADE = '#B9834F', LINE = '#8C5F35', OUT = '#C08A3E';
  function shape(kind, filled) {
    var LINE = '#5E3D24', OL = '#C08A3E';
    var G = '#DDA458', GD = '#B97F3E', GL = '#F0C883', CR = '#F7E4B8', CH = '#5A3826', RD = '#C9455A', PK = '#DB5C70', GR = '#9AA860';
    function circ(x, y, r, f) { return { d: 'M' + (x - r) + ' ' + y + 'a' + r + ' ' + r + ' 0 1 0 ' + (2 * r) + ' 0a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0Z', f: f }; }
    function render(vb, parts) {
      var fills = '', lines = '';
      parts.forEach(function (p) {
        if (filled && p.f) fills += '<path d="' + p.d + '" fill="' + p.f + '"' + (p.o ? ' opacity="' + p.o + '"' : '') + '/>';
        if (p.s !== false) lines += '<path d="' + p.d + '" fill="none" stroke="' + (filled ? (p.c || LINE) : OL) + '" stroke-width="' + (p.w || 2.2) + '" stroke-linecap="round" stroke-linejoin="round"' + (p.o && !filled ? ' opacity="' + p.o + '"' : '') + '/>';
      });
      return '<svg viewBox="' + vb + '"><g transform="translate(2.4,2)">' + fills + '</g><g>' + lines + '</g></svg>';
    }
    var i, p, q;
    if (kind === 'plank') {
      var pl = [
        { d: 'M28 40V14c0-6 4-10 12-10s12 4 12 10v26', f: '#C9985F' },
        { d: 'M12 40h56c6 0 10 4 10 10v88c0 6-4 10-10 10H12c-6 0-10-4-10-10V50c0-6 4-10 10-10Z', f: '#D9AC72' },
        circ(40, 17, 4.8, '#F7F0E1'),
        { d: 'M14 52h52c3 0 5 2 5 5v76c0 3-2 5-5 5H14c-3 0-5-2-5-5V57c0-3 2-5 5-5Z', f: '#E4BC84', w: 1.3, o: 0.9 }
      ];
      var boardSvg = render('0 0 80 152', pl);
      var bag = '<g transform="rotate(-58 40 98)">' +
        (filled ? '<path d="M3.4 100c0-7 5-11 12-11h54c7 0 12 4 12 11s-5 11-12 11H15.4c-7 0-12-4-12-11Z" fill="' + GD + '" transform="translate(1.6,2)"/>' : '') +
        '<path d="M2 98c0-7 5-11 12-11h54c7 0 12 4 12 11s-5 11-12 11H14c-7 0-12-4-12-11Z" fill="' + (filled ? G : 'none') + '" stroke="' + (filled ? LINE : OL) + '" stroke-width="2.2" stroke-linejoin="round"/>' +
        '<path d="M16 93l9 10M30 92l9 11M44 92l9 11M58 93l9 10" fill="none" stroke="' + (filled ? LINE : OL) + '" stroke-width="2.4" stroke-linecap="round"/>' +
        (filled ? '<path d="M10 92c20-4 44-4 66 0" fill="none" stroke="' + GL + '" stroke-width="2.4" stroke-linecap="round"/>' : '') + '</g>';
      var crumbs = '<g fill="' + (filled ? GD : OL) + '"><circle cx="14" cy="132" r="1.6"/><circle cx="24" cy="138" r="1.2"/><circle cx="62" cy="64" r="1.5"/><circle cx="56" cy="58" r="1.1"/></g>';
      return boardSvg.replace('</svg>', crumbs + bag + '</svg>');
    }
    if (kind === 'baguette') {
      var parts = [
        { d: 'M10 46C6 30 22 16 50 14L222 8C252 6 268 20 264 36C260 52 240 62 214 64L52 70C28 72 12 62 10 46Z', f: G },
        { d: 'M14 52C24 62 40 68 60 68L214 62C240 60 256 50 262 38C256 54 236 64 210 66L58 72C34 72 18 64 14 52Z', f: GD, s: false },
        { d: 'M34 24C80 15 190 12 240 15C200 23 90 25 34 24Z', f: GL, s: false }
      ];
      [46, 84, 122, 160, 198].forEach(function (x, n) {
        var y = 30 - n * 1.2;
        parts.push({ d: 'M' + x + ' ' + (y + 6) + 'C' + (x + 8) + ' ' + (y - 8) + ' ' + (x + 28) + ' ' + (y - 10) + ' ' + (x + 40) + ' ' + (y - 2) + 'C' + (x + 30) + ' ' + (y + 12) + ' ' + (x + 12) + ' ' + (y + 16) + ' ' + x + ' ' + (y + 6) + 'Z', f: CR });
        parts.push({ d: 'M' + (x + 6) + ' ' + (y + 6) + 'C' + (x + 16) + ' ' + y + ' ' + (x + 26) + ' ' + (y - 2) + ' ' + (x + 34) + ' ' + (y - 1), f: null, w: 1.3, o: 0.6 });
      });
      [[70, 50], [120, 52], [170, 50], [225, 44], [90, 22]].forEach(function (c) { parts.push(circ(c[0], c[1], 1.6, '#F7E4B8')); });
      return render('0 0 272 80', parts);
    }
    if (kind === 'boule') {
      return render('0 0 130 120', [
        { d: 'M8 68C4 30 34 8 66 8s60 22 56 60c-3 30-28 46-58 46S10 98 8 68Z', f: '#D99A50' },
        { d: 'M12 82C22 108 44 112 66 112c26 0 46-14 52-40-2 32-26 46-56 46S14 110 12 82Z', f: '#B57834', s: false },
        { d: 'M24 34C40 16 90 14 108 38C90 24 44 24 24 34Z', f: GL, s: false },
        { d: 'M34 36C56 32 86 56 98 86C76 88 46 64 34 36Z', f: CR },
        { d: 'M98 36C76 32 46 56 34 84C58 88 88 64 98 36Z', f: CR },
        circ(24, 60, 1.8, CR), circ(108, 58, 1.8, CR), circ(50, 96, 1.8, CR), circ(84, 100, 1.8, CR), circ(66, 20, 1.6, CR)
      ]);
    }
    if (kind === 'tranche') {
      return render('0 0 112 120', [
        { d: 'M20 114V56C4 52 2 28 22 18 34 8 50 10 56 16 62 10 80 8 92 18c20 10 18 34 0 38v58Z', f: '#B57834' },
        { d: 'M29 108V52C15 48 13 32 27 24c10-6 21-5 29 2 8-7 20-8 30-2 14 8 12 24-2 28v56Z', f: '#F3DDAA' },
        circ(40, 44, 2.6, '#E5C482'), circ(70, 38, 2, '#E5C482'), circ(52, 72, 2.4, '#E5C482'), circ(72, 88, 2.8, '#E5C482'), circ(42, 96, 2, '#E5C482'),
        { d: 'M30 30c8-6 18-5 26 2', f: null, w: 1.2, o: 0.4 }
      ]);
    }
    if (kind === 'pain-choc') {
      var pc = [
        { d: 'M8 44C8 18 32 8 76 8s68 10 68 36-24 34-68 34S8 70 8 44Z', f: G },
        { d: 'M14 56C30 74 120 74 138 54 132 72 108 80 76 80S22 74 14 56Z', f: GD, s: false },
        { d: 'M26 20C60 10 100 10 128 22C100 18 56 18 26 20Z', f: GL, s: false }
      ];
      [40, 62, 84, 106].forEach(function (x) { pc.push({ d: 'M' + x + ' 14C' + (x + 6) + ' 34 ' + (x + 4) + ' 54 ' + (x - 4) + ' 74', f: null, w: 1.6, o: 0.75 }); });
      pc.push({ d: 'M124 26C140 26 146 38 140 48C132 54 122 48 122 38Z', f: CH });
      pc.push({ d: 'M8 40C10 30 18 26 24 30 26 40 22 48 12 52Z', f: CH });
      return render('0 0 150 84', pc);
    }
    if (kind === 'croissant') {
      var cr = [
        { d: 'M6 68C0 40 28 8 75 8s75 32 69 60c-2 8-12 10-16 2-6-16-24-32-53-32S28 54 22 70c-4 8-14 6-16-2Z', f: G },
        { d: 'M22 70c6-16 24-32 53-32s47 16 53 32c-8-8-26-22-53-22S30 62 22 70Z', f: GD, s: false },
        { d: 'M30 26C50 12 100 12 120 26C100 20 50 20 30 26Z', f: GL, s: false },
        { d: 'M58 39C56 28 52 18 48 10', f: null, w: 2 }, { d: 'M92 39C94 28 98 18 102 10', f: null, w: 2 },
        { d: 'M40 46C36 36 32 28 26 20', f: null, w: 2 }, { d: 'M110 46C114 36 118 28 124 20', f: null, w: 2 },
        { d: 'M27 60C22 54 16 50 10 50', f: null, w: 2 }, { d: 'M123 60C128 54 134 50 140 50', f: null, w: 2 },
        { d: 'M75 38V9', f: null, w: 2, o: 0.6 }
      ];
      return render('0 0 150 84', cr);
    }
    if (kind === 'epi') {
      var ep = [{ d: 'M30 118V34', f: null, w: 2.4 }];
      for (i = 0; i < 5; i++) {
        var y = 84 - i * 13;
        ep.push({ d: 'M30 ' + y + 'C14 ' + (y - 2) + ' 8 ' + (y - 14) + ' 12 ' + (y - 24) + ' 26 ' + (y - 20) + ' 32 ' + (y - 8) + ' 30 ' + y + 'Z', f: G });
        ep.push({ d: 'M30 ' + y + 'C46 ' + (y - 2) + ' 52 ' + (y - 14) + ' 48 ' + (y - 24) + ' 34 ' + (y - 20) + ' 28 ' + (y - 8) + ' 30 ' + y + 'Z', f: G });
      }
      ep.push({ d: 'M30 36C20 28 22 14 30 6 38 14 40 28 30 36Z', f: G });
      return render('0 0 60 122', ep);
    }
    if (kind === 'eclair') {
      return render('0 0 170 66', [
        { d: 'M8 38C8 26 20 24 40 24h92c22 0 32 2 32 14v6c0 12-12 16-32 16H40C20 60 8 56 8 44Z', f: G },
        { d: 'M10 34C10 20 24 14 46 14h82c24 0 36 6 36 18-6 8-12 0-18 8-4 8-10 0-16 6-6 6-12-2-18 4H48C24 50 10 46 10 34Z', f: CH },
        { d: 'M30 24c30-8 80-8 112 0', f: null, c: '#FFFFFF', w: 2.4, s: true, o: 0.55 },
        { d: 'M32 30l10 6 10-6 10 6 10-6 10 6 10-6 10 6 10-6 10 6 10-6', f: null, c: '#FFF8E8', w: 2.6 },
        circ(146, 40, 5, '#FFF8E8')
      ]);
    }
    if (kind === 'tarte') {
      var tp = [
        { d: 'M10 52h100l-12 42H22Z', f: G },
        { d: 'M14 54C18 26 102 26 106 54Z', f: '#F6EAD0' }
      ];
      for (i = 0; i < 9; i++) tp.push({ d: 'M' + (20 + i * 10) + ' 56l' + (i < 4 ? -1 : 1) + ' 34', f: null, w: 1.2, o: 0.6 });
      [[38, 34, 9], [58, 26, 9.5], [80, 34, 9]].forEach(function (b) {
        tp.push(circ(b[0], b[1], b[2], RD));
        tp.push(circ(b[0] - 3, b[1] - 3, 1.5, '#F7B8C2'));
        tp.push(circ(b[0] + 3, b[1] + 2, 1.5, '#F7B8C2'));
      });
      tp.push({ d: 'M92 44c6-6 12-4 14 2-6 4-12 4-14-2Z', f: GR });
      tp.push({ d: 'M48 46c4-3 8-2 10 2-4 3-8 2-10-2Z', f: GR });
      return render('0 0 120 98', tp);
    }
    if (kind === 'macaron') {
      var mp = [
        { d: 'M10 34C10 4 100 4 100 34Z', f: PK },
        { d: 'M6 36q4 7 8 0 4 7 8 0 4 7 8 0 4 7 8 0 4 7 8 0 4 7 8 0 4 7 8 0 4 7 8 0 4 7 8 0 4 7 8 0 4 7 8 0', f: PK, s: true },
        { d: 'M12 40h86c4 0 4 8 0 8H12c-4 0-4-8 0-8Z', f: '#FFF4DD' },
        { d: 'M10 50C10 74 100 74 100 50Z', f: PK },
        { d: 'M18 22C24 12 40 8 54 9', f: null, c: '#FBC1CB', w: 3 }
      ];
      return render('0 0 110 74', mp);
    }
    if (kind === 'religieuse') {
      return render('0 0 100 122', [
        { d: 'M10 92C6 66 26 50 50 50s44 16 40 42c-4 20-20 28-40 28S12 112 10 92Z', f: CH },
        { d: 'M12 84C20 96 34 100 50 100', f: null, c: '#8B5A3C', w: 2.2, o: 0.9 },
        { d: 'M26 52q5 8 10 0 5 8 10 0 5 8 10 0 5 8 10 0 5 8 6 0', f: '#FFF4DD' },
        { d: 'M28 44C24 26 36 14 52 14s26 12 22 30Z', f: CH },
        { d: 'M38 18c8-6 18-4 22 2', f: null, c: '#FFFFFF', w: 2.2, o: 0.6 },
        circ(50, 8, 5, '#FFF4DD'),
        circ(38, 84, 2.4, '#FFF4DD'), circ(56, 78, 2.4, '#FFF4DD'), circ(66, 92, 2.4, '#FFF4DD')
      ]);
    }
    if (kind === 'paris-brest') {
      var pb = [
        { d: 'M8 46C8 22 40 8 68 8s54 14 54 38c0 26-30 38-58 38S8 72 8 46Zm38 0c0 8 8 12 18 12s18-4 18-12-8-12-18-12-18 4-18 12Z', f: G, fr: 'evenodd' },
        { d: 'M14 40C24 20 50 12 70 12c32 0 50 10 50 28', f: null, c: GL, w: 3, o: 0.9 }
      ];
      [[22, 40], [34, 26], [52, 18], [74, 14], [96, 18], [110, 30], [116, 48], [100, 68], [76, 74], [48, 72], [26, 62], [96, 36]].forEach(function (c, n) {
        pb.push({ d: 'M' + c[0] + ' ' + c[1] + 'c4-6 12-6 14 0-3 6-11 7-14 0Z', f: '#F3DDAA' });
      });
      var sv = render('-6 -2 142 96', pb);
      return sv.replace('<path d="M8 46', '<path fill-rule="evenodd" d="M8 46');
    }
    return '';
  }

  // [type, gauche %, haut % (ou px), largeur px, rotation, plan, dérive, plein?, longueur du fil]
  var FX = [
    { sel: '.hero', items: [
      ['hang', 3, 0, 62, 4, 'back', 0.5, 1, 70], ['baguette', 56, 80, 250, -16, 'back', 1.2, 0], ['boule', 90, 8, 96, 8, 'back', 0.8, 1],
      ['croissant', 40, 86, 120, 6, 'back', 1.0, 0], ['epi', 78, 54, 60, 18, 'back', 0.7, 0],
      ['hang', 90, 0, 76, -3, 'front', 0.6, 1, 150], ['eclair', 20, 92, 150, -6, 'back', 1.0, 1]
    ] },
    { sel: '#pains', auto: 1 }, { sel: '#histoire', auto: 1 }, { sel: '.page-header', auto: 1 },
    { sel: 'main .section, .main .section, .main .section-tight, .main .section-alt', auto: 1, multi: 1 }
  ];
  var POOL = ['baguette', 'eclair', 'boule', 'tarte', 'croissant', 'macaron', 'epi', 'tranche', 'pain-choc', 'paris-brest'];
  var SIZES = { baguette: 210, eclair: 150, boule: 96, tarte: 92, croissant: 130, macaron: 90, epi: 56, tranche: 76, 'pain-choc': 130, religieuse: 76, 'paris-brest': 116 };
  function autoItems(host, idx) {
    var h = host.offsetHeight, out = [];
    var n = host.classList.contains('page-header') ? 2 : Math.max(2, Math.min(5, Math.floor(h / 300)));
    for (var i = 0; i < n; i++) {
      var kind = POOL[(i * 3 + idx * 2) % POOL.length];
      out.push([kind, 0, 0, SIZES[kind] * 1.1, (i % 2 ? -1 : 1) * (6 + (i * 7) % 14), 'back', 0.25 + (i % 3) * 0.1, i % 2]);
    }
    out.unshift(['hang', 0, 0, 58, 3, 'back', 0.3, 1, 40 + (idx % 3) * 30]);
    return out;
  }

  var fxEls = [];
  function seeded(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  function coverRects(host, mx, my) {
    var MX = mx == null ? 36 : mx, MY = my == null ? 14 : my;
    var hr = host.getBoundingClientRect(), out = [];
    function add(q, ex, ey) { if (q.width > 1 && q.height > 1) out.push({ x: q.left - hr.left - ex, y: q.top - hr.top - ey, r: q.right - hr.left + ex, b: q.bottom - hr.top + ey }); }
    host.querySelectorAll('.plank, .cta-band, .loyalty-band, img, .btn, .step, .menu-row, .founder, .note, figcaption, .hero-tags span, .seal').forEach(function (e) { if (!e.closest('.fx-layer')) add(e.getBoundingClientRect(), MX, MY); });
    host.querySelectorAll('h1, h2, h3, h4, p, .eyebrow, .concept-link, .scroll-cue, li, .role').forEach(function (e) {
      if (e.closest('.fx-layer')) return;
      var rg = document.createRange(); rg.selectNodeContents(e);
      Array.prototype.forEach.call(rg.getClientRects(), function (q) { add(q, MX, MY); });
    });
    host.querySelectorAll('.concept').forEach(function (e) {
      var q = e.getBoundingClientRect();
      add({ left: q.left, right: q.right, top: q.bottom - 2, bottom: q.bottom, width: q.width, height: 2 }, 0, 30);
    });
    return out;
  }
  function hit(a, b) { return a.x < b.r && a.r > b.x && a.y < b.b && a.b > b.y; }

  function build(host, items, auto) {
    var layers = {};
    ['back', 'front'].forEach(function (k) {
      var l = document.createElement('div');
      l.className = 'fx-layer fx-' + k;
      l.setAttribute('aria-hidden', 'true');
      host.appendChild(l);
      layers[k] = l;
    });
    var created = [];
    items.forEach(function (it, i) {
      if (isSmall && (i % 2)) return;
      var el = document.createElement('div');
      var hang = it[0] === 'hang';
      el.className = 'fx' + (hang ? ' fx-hang' : '');
      var w = isSmall ? it[3] * 0.72 : it[3];
      el.style.width = w + 'px';
      if (!auto) { el.style.left = it[1] + '%'; el.style.top = it[2] + '%'; }
      if (hang) {
        var L = (it[8] || 60) * (isSmall ? 0.6 : 1);
        el.innerHTML = '<i class="fx-string" style="height:' + L + 'px"></i>' + shape('plank', !!it[7]);
        el.style.top = '0';
        el.dataset.sway = it[4];
      } else {
        el.innerHTML = shape(it[0], !!it[7]);
        if (!auto) el.style.marginTop = (-w * 0.25) + 'px';
      }
      el.dataset.rot = hang ? 0 : it[4];
      el.dataset.drift = it[6];
      el.dataset.phase = (Math.random() * 6.28).toFixed(2);
      el.dataset.period = (7 + Math.random() * 8).toFixed(1);
      el.dataset.amp = (auto ? 14 + Math.random() * 16 : (it[7] ? 34 : 22) + Math.random() * 30).toFixed(0);
      layers.back.appendChild(el);
      var rec = { el: el, layer: layers[it[5]], hang: hang, host: host, auto: auto };
      created.push(rec);
      fxEls.push(rec);
    });
    if (!auto) return;
    // cherche des zones vraiment vides (hors texte, photos, blocs) pour poser chaque forme
    var covers = coverRects(host), placed = [], rnd = seeded(97 + host.offsetHeight + Math.round(host.offsetWidth));
    var lw = layers.back.clientWidth, lh = layers.back.clientHeight, pad = 8;
    created.forEach(function (f) {
      var w = f.el.offsetWidth, h = f.el.offsetHeight, ok = false;
      for (var t = 0; t < 140 && !ok; t++) {
        var px = f.hang ? 34 : pad, x = px + rnd() * Math.max(1, lw - w - 2 * px);
        var y = f.hang ? 0 : pad + rnd() * Math.max(1, lh - h - 2 * pad);
        var cand = { x: x - 14, y: y - 8, r: x + w + 14, b: y + h + 8 };
        if (covers.some(function (c) { return hit(cand, c); })) continue;
        if (placed.some(function (c) { return hit({ x: cand.x - 70, y: cand.y - 70, r: cand.r + 70, b: cand.b + 70 }, c); })) continue;
        f.el.style.left = x + 'px'; f.el.style.top = y + 'px';
        placed.push(cand); ok = true;
      }
      if (!ok) { f.el.remove(); fxEls.splice(fxEls.indexOf(f), 1); }
    });
  }
  var built = [];
  function buildAll() {
    var idx = 0;
    FX.forEach(function (cfg) {
      var hosts = cfg.multi ? Array.prototype.slice.call(document.querySelectorAll(cfg.sel)) : [document.querySelector(cfg.sel)];
      hosts.forEach(function (host) {
        if (!host || built.indexOf(host) > -1) return;
        if (host.querySelector('.cta-band, .loyalty-band')) return;
        built.push(host);
        host.classList.add('fx-host');
        build(host, cfg.auto ? autoItems(host, idx++) : cfg.items, !!cfg.auto);
      });
    });
    // rangée de planches suspendues tout en haut du hero et des en-têtes
    ['.hero', '.page-header'].forEach(function (sel) {
      var host = document.querySelector(sel);
      if (!host) return;
      if (!host.classList.contains('fx-host')) { host.classList.add('fx-host'); }
      var layer = host.querySelector('.fx-layer.fx-back');
      if (!layer) { layer = document.createElement('div'); layer.className = 'fx-layer fx-back'; layer.setAttribute('aria-hidden', 'true'); host.appendChild(layer); }
      var covers = coverRects(host, 12, 6), lw = layer.clientWidth, rnd = seeded(31 + Math.round(lw)), placed = [], made = 0, want = isSmall ? 2 : 3;
      for (var t = 0; t < 260 && made < want; t++) {
        var w = (isSmall ? 50 : 66) + Math.round(rnd() * 22), L = 6 + Math.round(rnd() * (isSmall ? 40 : 90)), ph = w * 1.9;
        var x = 16 + rnd() * Math.max(1, lw - w - 32);
        var cand = { x: x - 10, y: 0, r: x + w + 10, b: L + ph + 8 };
        if (covers.some(function (c) { return hit(cand, c); })) continue;
        if (placed.some(function (c) { return cand.x < c.r + 8 && cand.r > c.x - 8; })) continue;
        var el = document.createElement('div');
        el.className = 'fx fx-hang';
        el.style.width = w + 'px'; el.style.left = x + 'px'; el.style.top = '0';
        el.innerHTML = '<i class="fx-string" style="height:' + L + 'px"></i>' + shape('plank', rnd() > 0.35);
        el.dataset.sway = (rnd() * 8 - 4).toFixed(1); el.dataset.rot = 0; el.dataset.drift = 0.3;
        el.dataset.phase = (rnd() * 6.28).toFixed(2); el.dataset.period = 9; el.dataset.amp = 12;
        layer.appendChild(el);
        fxEls.push({ el: el, layer: layer, hang: true, host: host, auto: true });
        placed.push(cand); made++;
      }
      if (built.indexOf(host) < 0) built.push(host);
    });
    // formes du hero (positions manuelles) : retire celles cachées par la photo ou le texte
    fxEls = fxEls.filter(function (f) {
      if (f.auto) return true;
      var hr = f.host.getBoundingClientRect(), r = f.el.getBoundingClientRect();
      var cand = { x: r.left - hr.left, y: r.top - hr.top, r: r.right - hr.left, b: r.bottom - hr.top };
      if (coverRects(f.host).some(function (c) { return hit(cand, c); })) { f.el.remove(); return false; }
      return true;
    });
    if ('IntersectionObserver' in window) {
      var vio = new IntersectionObserver(function (es) {
        es.forEach(function (e) { e.isIntersecting ? visible.add(e.target) : visible.delete(e.target); });
      }, { rootMargin: '200px' });
      built.forEach(function (h) { vio.observe(h); });
    }
    if (reduceMotion) {
      fxEls.forEach(function (f) {
        f.el.style.transform = 'rotate(' + (f.hang ? f.el.dataset.sway : f.el.dataset.rot) + 'deg)';
      });
    } else if (fxEls.length) {
      requestAnimationFrame(frame);
    }
  }

  var vel = 0, lastY = window.scrollY, smoothVel = 0;
  var visible = new Set();
  function frame(t) {
    var vh = window.innerHeight, y = window.scrollY;
    vel = y - lastY; lastY = y;
    smoothVel += (vel - smoothVel) * 0.12;
    fxEls.forEach(function (f) {
      if (visible.size && !visible.has(f.host)) return;
      var el = f.el, d = parseFloat(el.dataset.drift), ph = parseFloat(el.dataset.phase);
      var hr = f.host.getBoundingClientRect();
      var center = hr.top + (el.offsetTop + el.offsetHeight / 2);
      var dist = (center - vh / 2) / vh;
      var sec = t / 1000;
      var wind = Math.sin(sec / parseFloat(el.dataset.period) * 6.28 + ph) * parseFloat(el.dataset.amp);
      if (f.hang) {
        var sway = parseFloat(el.dataset.sway) + Math.sin(sec * 0.7 + ph) * 3 + Math.max(-14, Math.min(14, smoothVel * 0.35));
        el.style.transform = 'rotate(' + sway.toFixed(2) + 'deg)';
      } else {
        var x = -dist * d * (f.auto ? 60 : 160) + wind;
        var yy = Math.sin(sec * 0.5 + ph) * 6 - dist * d * 40;
        var lw = f.layer.clientWidth, lh = f.layer.clientHeight, pad = 6;
        x = Math.max(pad - el.offsetLeft, Math.min(lw - el.offsetLeft - el.offsetWidth - pad, x));
        yy = Math.max(pad - el.offsetTop, Math.min(lh - el.offsetTop - el.offsetHeight - pad, yy));
        var r = parseFloat(el.dataset.rot) + Math.sin(sec * 0.4 + ph) * 2.5;
        el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + yy.toFixed(1) + 'px,0) rotate(' + r.toFixed(1) + 'deg)';
      }
    });
    if (!document.hidden) requestAnimationFrame(frame);
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden && fxEls.length && !reduceMotion) requestAnimationFrame(frame); });
  if (document.readyState === 'complete') buildAll(); else window.addEventListener('load', buildAll);

  // ---- Le passage : une grande planche traverse l'écran et révèle la photo ---
  var passage = document.querySelector('.passage');
  if (passage) {
    var stage = passage.querySelector('.passage-stage');
    var planks = Array.prototype.slice.call(passage.querySelectorAll('.passage-plank'));
    var pText = passage.querySelector('.passage-text'), pPhoto = passage.querySelector('.passage-photo');
    var ease = function (x) { return x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x); };
    var pTick = false;
    var renderPassage = function () {
      pTick = false;
      var r = passage.getBoundingClientRect(), total = r.height - window.innerHeight;
      var p = Math.max(0, Math.min(1, -r.top / total));
      var W = stage.clientWidth, main = ease((p - 0.08) / 0.68);
      planks.forEach(function (pl, i) {
        var w = pl.offsetWidth, lag = i === 0 ? 0 : (i === 1 ? -0.12 : 0.1);
        var q = ease((p - 0.08 - lag * 0.4) / 0.68);
        var x = -w - 40 + q * (W + w + 80);
        pl.style.transform = 'translate3d(' + x.toFixed(0) + 'px,-50%,0) rotate(' + (i === 0 ? -2 : i === 1 ? 3 : -5) + 'deg)';
      });
      var cover = p > 0.08 + 0.34 * 0.68 ? 1 : 0;
      var shown = p > 0.3 ? 1 : 0;
      pText.style.opacity = shown ? 0 : 1;
      pPhoto.style.opacity = shown ? 1 : 0;
    };
    if (reduceMotion) {
      passage.classList.add('is-static');
    } else {
      window.addEventListener('scroll', function () { if (!pTick) { pTick = true; requestAnimationFrame(renderPassage); } }, { passive: true });
      window.addEventListener('resize', renderPassage);
      renderPassage();
    }
  }

  // ---- Le sceau : s'appose une fois à l'entrée de la section histoire --
  var stamp = document.querySelector('.seal-stamp');
  if (stamp) {
    if (reduceMotion) {
      stamp.classList.add('is-stamped');
    } else if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            stamp.classList.add('is-stamped');
            io.disconnect();
          }
        });
      }, { threshold: 0.5 });
      io.observe(stamp);
    } else {
      stamp.classList.add('is-stamped');
    }
  }
});
