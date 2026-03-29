(function () {
  'use strict';

  // Scroll-triggered fade-in
  var faders = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    faders.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    faders.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // Theme toggle: system → light → dark → system
  var toggle = document.querySelector('.theme-toggle');
  var darkMQ = window.matchMedia('(prefers-color-scheme: dark)');

  // Follow system preference changes in real-time when in system mode
  darkMQ.addEventListener('change', function () {
    var saved = localStorage.getItem('theme');
    if (!saved || saved === 'system') {
      document.documentElement.removeAttribute('data-theme');
    }
  });

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = localStorage.getItem('theme') || 'system';
      var next;

      if (current === 'system') {
        next = 'light';
      } else if (current === 'light') {
        next = 'dark';
      } else {
        next = 'system';
      }

      if (next === 'system') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.removeItem('theme');
      } else {
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
      }
    });
  }
})();
