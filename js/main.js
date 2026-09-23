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

  // ---- Planches d'arrière-plan : dérive douce au scroll ----------------
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var chips = Array.prototype.slice.call(document.querySelectorAll('.plank-chip'));

  if (chips.length && !reduceMotion) {
    var vh = window.innerHeight;
    chips.forEach(function (chip, i) {
      chip.dataset.phase = Math.random() * Math.PI * 2;
      chip.dataset.speed = (0.35 + Math.random() * 0.4).toFixed(3);
      chip.dataset.amp = (14 + Math.random() * 22).toFixed(1);
      chip.dataset.spin = (Math.random() * 14 - 7).toFixed(1);
    });

    var ticking = false;
    function renderChips() {
      var scrollY = window.scrollY;
      chips.forEach(function (chip) {
        var rect = chip.parentElement.getBoundingClientRect();
        var center = rect.top + rect.height / 2;
        var dist = (center - vh / 2) / vh; // -ish .. +ish
        var wind = Math.sin(scrollY * 0.002 + parseFloat(chip.dataset.phase)) * parseFloat(chip.dataset.amp);
        var drift = -dist * parseFloat(chip.dataset.speed) * 140 + wind;
        var rot = parseFloat(chip.dataset.spin) * Math.sin(scrollY * 0.001 + parseFloat(chip.dataset.phase));
        chip.style.transform = 'translate3d(' + drift.toFixed(1) + 'px,' + (drift * 0.3).toFixed(1) + 'px,0) rotate(' + rot.toFixed(1) + 'deg)';
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) { window.requestAnimationFrame(renderChips); ticking = true; }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { vh = window.innerHeight; renderChips(); });
    renderChips();
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
