// Sayt uchun kichik yordamchi skriptlar.
(function () {
  'use strict';

  // 0) JS ishlayotganini belgilaymiz — animatsiyalar faqat shu holatda yashiradi.
  document.documentElement.classList.add('js');

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

  // 2) Ish kartalaridagi rasm yuklanmasa — nomi yozilgan panel qo‘yiladi.
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    var swap = function () {
      var ph = document.createElement('div');
      ph.className = 'work-ph';
      ph.textContent = img.getAttribute('data-fallback');
      if (img.parentNode) img.parentNode.replaceChild(ph, img);
    };
    img.addEventListener('error', swap);
    if (img.complete && img.naturalWidth === 0) swap();
  });

  // 3) Scroll bo‘yicha bloklarni yumshoq chiqarish.
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

  // 4) Navigatsiya: scroll holati va faol bo‘lim.
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

  // 5) Mobil menyu (burger).
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    var setMenu = function (open) {
      mobileMenu.hidden = !open;
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    burger.addEventListener('click', function () {
      setMenu(mobileMenu.hidden);
    });
    mobileMenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 980) setMenu(false);
    });
  }

  // 6) Savol-javob akkordeon: bittasi ochilsa, qolganlari yopiladi.
  var faqItems = document.querySelectorAll('.faq details');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  // 7) Futerdagi yil.
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
