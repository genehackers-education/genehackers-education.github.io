/* =============================================================
   Genehackers Outreach Toolkit — site behavior (plain ES5)
   ============================================================= */
var CONFIG = {
  goatcounterCode: 'genehackers-education',

  reportFormUrl: 'https://forms.gle/bUFeKZsFfWhidJTp8'
};
/* ============================================================= */

(function () {
  // --- load GoatCounter
  if (CONFIG.goatcounterCode) {
    var gc = document.createElement('script');
    gc.async = true;
    gc.setAttribute('data-goatcounter',
      'https://' + CONFIG.goatcounterCode + '.goatcounter.com/count');
    gc.src = '//gc.zgo.at/count.js';
    document.head.appendChild(gc);
  }

  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }
  ready(function () {
    var body = document.body;

    // point every "report back" link at the form
    var rb = document.querySelectorAll('.reportback a, a.report-link');
    for (var k = 0; k < rb.length; k++) { rb[k].setAttribute('href', CONFIG.reportFormUrl); }

    // mobile menu toggle
    var toggle = document.querySelector('.menu-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        body.className = body.className.indexOf('nav-open') > -1
          ? body.className.replace(/\s*nav-open/, '')
          : body.className + ' nav-open';
      });
    }
    var links = document.querySelectorAll('#sidebar a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        body.className = body.className.replace(/\s*nav-open/, '');
      });
    }

    // smooth scroll for the "On this page" links
    var toc = document.querySelectorAll('.toc a');
    for (var j = 0; j < toc.length; j++) {
      toc[j].addEventListener('click', function (e) {
        var id = this.getAttribute('href');
        if (id && id.charAt(0) === '#') {
          var el = document.getElementById(id.slice(1));
          if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        }
      });
    }
  });
})();

/* ---- slide-deck preview carousels (added for lesson pages) ---- */
(function () {
  function initSlides() {
    var decks = document.querySelectorAll('.slides[data-folder]');
    for (var d = 0; d < decks.length; d++) {
      (function (el) {
        var folder = el.getAttribute('data-folder');
        var count = parseInt(el.getAttribute('data-count') || '0', 10);
        if (!count) return;
        var idx = 0;
        el.innerHTML =
            '<div class="stage"><img alt="Slide 1"></div>'
          + '<button class="nav prev" aria-label="Previous slide">&#8249;</button>'
          + '<button class="nav next" aria-label="Next slide">&#8250;</button>'
          + '<div class="bar"><span class="count"></span><button class="full">Fullscreen</button></div>';
        var img = el.querySelector('img');
        var counter = el.querySelector('.count');
        function show(i) {
          idx = (i % count + count) % count;
          img.src = folder + '/' + (idx + 1) + '.jpg';
          img.alt = 'Slide ' + (idx + 1);
          counter.textContent = (idx + 1) + ' / ' + count;
        }
        function next() { show(idx + 1); }
        function prev() { show(idx - 1); }
        el.querySelector('.next').addEventListener('click', next);
        el.querySelector('.prev').addEventListener('click', prev);
        el.querySelector('.stage').addEventListener('click', next);
        el.querySelector('.full').addEventListener('click', function () {
          if (el.requestFullscreen) el.requestFullscreen();
          else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
        });
        el.setAttribute('tabindex', '0');
        el.addEventListener('keydown', function (e) {
          if (e.keyCode === 39) { next(); e.preventDefault(); }
          else if (e.keyCode === 37) { prev(); e.preventDefault(); }
        });
        for (var p = 1; p <= count; p++) { var pre = new Image(); pre.src = folder + '/' + p + '.jpg'; }
        show(0);
      })(decks[d]);
    }
  }
  if (document.readyState !== 'loading') initSlides();
  else document.addEventListener('DOMContentLoaded', initSlides);
})();
