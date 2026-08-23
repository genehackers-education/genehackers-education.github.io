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

/* ---- slide-deck preview carousels ----
   Auto-detects the image filenames (works with 1.jpg, Slide1.jpg, Slide1.JPG,
   .jpeg or .png) and auto-counts how many slides are in each folder, so the
   filenames and any stale data-count no longer matter. */
(function () {
  var PATTERNS = [
    function (i) { return i + '.jpg'; },
    function (i) { return 'Slide' + i + '.jpg'; },
    function (i) { return 'Slide' + i + '.JPG'; },
    function (i) { return 'Slide' + i + '.jpeg'; },
    function (i) { return 'Slide' + i + '.png'; },
    function (i) { return 'Slide' + i + '.PNG'; },
    function (i) { return i + '.jpeg'; },
    function (i) { return i + '.png'; }
  ];
 
  function setupDeck(el) {
    var folder = el.getAttribute('data-folder');
    if (!folder) return;
 
    var pi = 0;
    function findPattern() {
      if (pi >= PATTERNS.length) {
        el.innerHTML = '<div class="bar" style="justify-content:center;padding:20px;color:#8a1f1f">'
          + 'Slides couldn\u2019t load \u2014 check that images are in <code>' + folder + '/</code>.</div>';
        return;
      }
      var test = new Image();
      var pat = PATTERNS[pi];
      test.onload = function () { countThenBuild(pat); };
      test.onerror = function () { pi++; findPattern(); };
      test.src = folder + '/' + pat(1);
    }
 
    function countThenBuild(pat) {
      var api = build(pat);          // show slide 1 immediately
      var n = 1;
      (function probe() {            // then count the rest in the background
        var im = new Image();
        im.onload = function () { n++; probe(); };
        im.onerror = function () { api.setCount(n); };
        im.src = folder + '/' + pat(n + 1);
      })();
    }
 
    function build(pat) {
      var count = 1, idx = 0, known = false;
      el.innerHTML =
          '<div class="stage"><img alt="Slide 1"></div>'
        + '<button class="nav prev" aria-label="Previous slide">&#8249;</button>'
        + '<button class="nav next" aria-label="Next slide">&#8250;</button>'
        + '<div class="bar"><span class="count"></span><button class="full">Fullscreen</button></div>';
      var img = el.querySelector('img'), counter = el.querySelector('.count');
      function label() { counter.textContent = known ? ((idx + 1) + ' / ' + count) : ('' + (idx + 1)); }
      function show(i) {
        idx = (i % count + count) % count;
        img.src = folder + '/' + pat(idx + 1);
        img.alt = 'Slide ' + (idx + 1);
        label();
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
      show(0);
      return { setCount: function (c) { count = c; known = true; label(); } };
    }
 
    findPattern();
  }
 
  function initSlides() {
    var decks = document.querySelectorAll('.slides[data-folder]');
    for (var d = 0; d < decks.length; d++) { setupDeck(decks[d]); }
  }
  if (document.readyState !== 'loading') initSlides();
  else document.addEventListener('DOMContentLoaded', initSlides);
})();
