/* =============================================================
   Genehackers Outreach Toolkit — site behavior (plain ES5)

   >>> EDIT THESE TWO LINES AFTER YOU MAKE YOUR ACCOUNTS <<<
   Everything else updates automatically across the whole site.
   ============================================================= */
var CONFIG = {
  // Your GoatCounter code = the part before ".goatcounter.com".
  // e.g. if your dashboard is https://genehackers.goatcounter.com,
  // put 'genehackers' here. Leave as-is to turn analytics off.
  goatcounterCode: 'YOURCODE',

  // Paste your Google Form share link here (the whole https:// URL).
  reportFormUrl: 'https://forms.gle/REPLACE-ME'
};
/* ============================================================= */

(function () {
  // --- load GoatCounter only if a real code was set ---
  if (CONFIG.goatcounterCode && CONFIG.goatcounterCode !== 'YOURCODE') {
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
