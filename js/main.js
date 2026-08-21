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
});
