(function () {
  // scroll progress razor
  const bar = document.getElementById('progressbar');
  function syncProg() {
    const h = document.documentElement;
    const p = (h.scrollTop || document.body.scrollTop) / Math.max(1, h.scrollHeight - h.clientHeight);
    if (bar) bar.style.setProperty('--progress', (p * 100).toFixed(2) + '%');
  }
  syncProg();
  window.addEventListener('scroll', syncProg, { passive: true });
})();
