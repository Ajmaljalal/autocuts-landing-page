(function () {
  const bar = document.getElementById('progressbar');
  let ticking = false;

  function syncProg() {
    ticking = false;
    const h = document.documentElement;
    const p = (h.scrollTop || document.body.scrollTop) / Math.max(1, h.scrollHeight - h.clientHeight);
    if (bar) bar.style.setProperty('--progress', (p * 100).toFixed(2) + '%');
  }

  function requestSync() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(syncProg);
  }

  requestSync();
  window.addEventListener('scroll', requestSync, { passive: true });
  window.addEventListener('resize', requestSync);
})();
