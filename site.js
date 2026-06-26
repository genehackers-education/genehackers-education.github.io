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
