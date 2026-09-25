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
    var G = '#DCA35D', G2 = '#F1D39B', D = '#8C5F35', OL = '#C08A3E';
    var st = filled ? D : OL, sw = filled ? 2.2 : 1.8;
    function fl(c) { return filled ? c : 'none'; }
    var A = ' stroke="' + st + '" stroke-width="' + sw + '" stroke-linejoin="round" stroke-linecap="round"';
    var svg = function (vb, inner) { return '<svg viewBox="' + vb + '">' + inner + '</svg>'; };
    if (kind === 'plank') {
      return svg('0 0 60 104', '<rect x="2" y="2" width="56" height="100" rx="11" fill="' + fl('#D2A56E') + '"' + A + '/><circle cx="30" cy="15" r="4.2" fill="' + fl('#F7F0E1') + '"' + A + '/><path d="M14 36c8 4 24 4 32 0M14 52c8 4 24 4 32 0M14 68c8 4 24 4 32 0M16 84c8 3 20 3 28 0" fill="none" stroke="' + st + '" stroke-width="1.2" opacity=".55"/>');
    }
    if (kind === 'baguette') {
      var sc = '';
      [[46, 10], [82, 14], [118, 18], [154, 22]].forEach(function (p) {
        sc += '<path d="M' + p[0] + ' ' + (p[1] + 12) + 'c8-14 20-16 30-10-6 10-18 14-30 10Z" fill="' + fl(G2) + '"' + A + '/>';
      });
      return svg('0 0 230 60', '<path d="M12 34C4 20 14 8 30 8h150c22 0 42 8 42 20 0 14-20 26-44 26H34C22 54 16 44 12 34Z" fill="' + fl(G) + '"' + A + '/>' + sc + '<path d="M30 46c30 6 100 6 160 0" fill="none" stroke="' + st + '" stroke-width="1.4" opacity=".45"/>');
    }
    if (kind === 'boule') {
      return svg('0 0 110 100', '<path d="M6 60C4 26 30 6 56 6s48 20 46 54c-2 26-24 36-48 36S8 86 6 60Z" fill="' + fl(G) + '"' + A + '/><path d="M28 28c14 4 36 4 54 0M22 46c18 6 48 6 66 0M26 64c16 5 40 5 58 0" fill="none"' + A + '/><path d="M28 28c14 4 36 4 54 0-2 8-8 12-27 12S30 36 28 28Z" fill="' + fl(G2) + '"' + A + '/>');
    }
    if (kind === 'epi') {
      var g = '';
      for (var i = 0; i < 5; i++) {
        var y = 78 - i * 12;
        g += '<path d="M30 ' + y + 'c-14-2-20-12-18-22 12 0 20 8 18 22Z" fill="' + fl(G) + '"' + A + '/><path d="M30 ' + y + 'c14-2 20-12 18-22-12 0-20 8-18 22Z" fill="' + fl(G) + '"' + A + '/>';
      }
      return svg('0 0 60 120', '<path d="M30 116V30" fill="none"' + A + '/>' + g + '<path d="M30 34c-8-6-8-16 0-22 8 6 8 16 0 22Z" fill="' + fl(G) + '"' + A + '/>');
    }
    if (kind === 'croissant') {
      var sp = '';
      [[60, 22, 60, 6], [44, 25, 34, 10], [76, 25, 86, 10], [31, 35, 14, 24], [89, 35, 106, 24]].forEach(function (q) {
        sp += '<path d="M' + q[0] + ' ' + q[1] + 'L' + q[2] + ' ' + q[3] + '" fill="none"' + A + '/>';
      });
      return svg('0 0 120 60', '<path d="M4 52C0 30 28 4 60 4s60 26 56 48c-6-6-12-8-20-6-4-14-16-24-36-24S28 32 24 46c-8-2-14 0-20 6Z" fill="' + fl(G) + '"' + A + '/>' + sp + '<path d="M40 14c14-6 28-6 42 0" fill="none" stroke="' + (filled ? G2 : OL) + '" stroke-width="2.4" stroke-linecap="round"/>');
    }
    if (kind === 'eclair') {
      return svg('0 0 150 56', '<rect x="4" y="12" width="142" height="38" rx="19" fill="' + fl(G) + '"' + A + '/><path d="M8 26C8 10 24 8 40 10h70c22-2 38 0 40 16-2 8-8 10-18 10H26c-10 0-18-2-18-10Z" fill="' + fl('#6B4634') + '"' + A + '/><path d="M30 20l10 6 10-6 10 6 10-6 10 6 10-6 10 6 10-6" fill="none" stroke="' + (filled ? '#FFFCF5' : OL) + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>');
    }
    if (kind === 'tarte') {
      var fl2 = '';
      for (var j = 0; j < 8; j++) fl2 += '<path d="M' + (22 + j * 9) + ' 46l-2 24" fill="none" stroke="' + st + '" stroke-width="1.2" opacity=".6"/>';
      return svg('0 0 110 84', '<path d="M8 42h94l-10 38H18Z" fill="' + fl(G) + '"' + A + '/>' + fl2 + '<path d="M12 44c6-26 80-26 86 0Z" fill="' + fl('#F6EAD0') + '"' + A + '/><circle cx="36" cy="30" r="8.5" fill="' + fl('#C4475A') + '"' + A + '/><circle cx="56" cy="22" r="8.5" fill="' + fl('#C4475A') + '"' + A + '/><circle cx="76" cy="30" r="8" fill="' + fl('#9AA860') + '"' + A + '/><circle cx="36" cy="28" r="1.6" fill="' + (filled ? '#F6C0C8' : OL) + '"/><circle cx="56" cy="20" r="1.6" fill="' + (filled ? '#F6C0C8' : OL) + '"/>');
    }
    if (kind === 'macaron') {
      return svg('0 0 100 66', '<path d="M8 30C8 6 92 6 92 30Z" fill="' + fl('#D9576B') + '"' + A + '/><path d="M4 32h92" fill="none"' + A + '/><rect x="10" y="32" width="80" height="8" rx="4" fill="' + fl('#FFFCF5') + '"' + A + '/><path d="M10 42c0 20 80 20 80 0Z" fill="' + fl('#D9576B') + '"' + A + '/><path d="M18 30c6-6 14-8 22-8" fill="none" stroke="' + (filled ? '#F3A0AE' : OL) + '" stroke-width="2.4" stroke-linecap="round"/>');
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
  var POOL = ['baguette', 'eclair', 'boule', 'tarte', 'croissant', 'macaron', 'epi'];
  var SIZES = { baguette: 190, eclair: 140, boule: 96, tarte: 104, croissant: 116, macaron: 92, epi: 62 };
  function autoItems(host, idx) {
    var h = host.offsetHeight, out = [];
    if (host.classList.contains('page-header')) {
      return [['hang', 93, 0, 58, 3, 'back', 0.4, 1, 40], [POOL[(idx + 1) % POOL.length], 66, 62, 150, 10, 'back', 0.4, 0], [POOL[(idx + 4) % POOL.length], 82, 74, 96, -8, 'back', 0.5, 1]];
    }
    var n = Math.max(1, Math.floor(h / 280));
    for (var i = 0; i < n; i++) {
      var kind = POOL[(i * 3 + idx) % POOL.length], left = i % 2 === 0, front = i % 3 === 2;
      var w = SIZES[kind] * 1.15;
      out.push([kind, left ? 1.5 : 98.5 - (w / host.offsetWidth) * 100, ((i + 0.5) / n) * 100, w, (i % 2 ? -1 : 1) * (8 + (i * 7) % 14), front ? 'front' : 'back', 0.3 + (i % 3) * 0.15, i % 2]);
    }
    if (idx % 2 === 0) out.unshift(['hang', 95, 0, 60, 3, 'back', 0.4, 1, 50]);
    return out;
  }

  var fxEls = [];
  function build(host, items) {
    var layers = {};
    ['back', 'front'].forEach(function (k) {
      var l = document.createElement('div');
      l.className = 'fx-layer fx-' + k;
      l.setAttribute('aria-hidden', 'true');
      host.appendChild(l);
      layers[k] = l;
    });
    items.forEach(function (it, i) {
      if (isSmall && (i % 2)) return;
      var el = document.createElement('div');
      var hang = it[0] === 'hang';
      el.className = 'fx' + (hang ? ' fx-hang' : '');
      el.style.left = it[1] + '%';
      el.style.top = it[2] + '%';
      var w = isSmall ? it[3] * 0.72 : it[3];
      el.style.width = w + 'px';
      if (hang) {
        var L = (it[8] || 60) * (isSmall ? 0.6 : 1);
        el.innerHTML = '<i class="fx-string" style="height:' + L + 'px"></i>' + shape('plank', !!it[7]);
        el.style.top = '0';
        el.dataset.sway = it[4];
      } else {
        el.innerHTML = shape(it[0], !!it[7]);
        el.style.marginTop = (-w * 0.25) + 'px';
      }
      el.dataset.rot = hang ? 0 : it[4];
      el.dataset.drift = it[6];
      el.dataset.phase = (Math.random() * 6.28).toFixed(2);
      el.dataset.period = (7 + Math.random() * 8).toFixed(1);
      el.dataset.amp = ((it[7] ? 34 : 22) + Math.random() * 30).toFixed(0);
      layers.back.appendChild(el);
      fxEls.push({ el: el, layer: layers[it[5]], hang: hang, host: host });
    });
  }
  var built = [];
  function buildAll() {
    var idx = 0;
    FX.forEach(function (cfg) {
      var hosts = cfg.multi ? Array.prototype.slice.call(document.querySelectorAll(cfg.sel)) : [document.querySelector(cfg.sel)];
      hosts.forEach(function (host) {
        if (!host || built.indexOf(host) > -1) return;
        built.push(host);
        host.classList.add('fx-host');
        build(host, cfg.auto ? autoItems(host, idx++) : cfg.items);
      });
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
        var x = -dist * d * 160 + wind;
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
