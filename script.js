// Sayt uchun kichik yordamchi skriptlar.
(function () {
  'use strict';

  // 1) Hero rasmi yuklanmasa — "DE" bosh harflari ko‘rsatiladi.
  var photo = document.getElementById('heroPhoto');
  var fallback = document.getElementById('photoFallback');
  if (photo && fallback) {
    var showFallback = function () {
      photo.hidden = true;
      fallback.hidden = false;
    };
    photo.addEventListener('error', showFallback);
    if (photo.complete && photo.naturalWidth === 0) showFallback();
  }

  // 2) Scroll bo‘yicha bloklarni yumshoq chiqarish.
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('visible'); });
  }

  // 3) Navigatsiya: scroll holati va faol bo‘lim.
  var nav = document.querySelector('.nav');
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  var onScroll = function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 8);

    var current = null;
    sections.forEach(function (sec) {
      if (sec.getBoundingClientRect().top <= 120) current = sec;
    });
    links.forEach(function (a) {
      a.classList.toggle('active', !!current && a.getAttribute('href') === '#' + current.id);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 4) Futerdagi yil.
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
