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
})();
