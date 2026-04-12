/* Aoki Tech — theme & language bootstrap (runs before paint, prevents FOUC) */
(function () {
  try {
    var t = localStorage.getItem('aoki-theme');
    document.documentElement.setAttribute('data-theme', t || 'light');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  try {
    var l = localStorage.getItem('aoki-lang');
    if (l === 'en' || l === 'es') {
      document.documentElement.lang = l;
      document.documentElement.dataset.lang = l;
    }
  } catch (e) {}
})();
