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

  const lazyVideos = document.querySelectorAll('video[data-src]:not(.lazy-hero-video)');
  const heroVideo = document.querySelector('.lazy-hero-video[data-src]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealVideoWhenReady(video) {
    if (!video.classList.contains('viewfinder__video')) return;
    if (video.readyState >= 2) {
      video.classList.add('is-loaded');
      return;
    }
    video.addEventListener('loadeddata', function () {
      video.classList.add('is-loaded');
    }, { once: true });
  }

  function loadVideo(video) {
    const src = video.dataset.src;
    if (!src || video.getAttribute('src')) return;
    if (video.dataset.poster && !video.getAttribute('poster')) {
      video.setAttribute('poster', video.dataset.poster);
    }
    revealVideoWhenReady(video);
    video.src = src;
    video.load();
    if (!reduceMotion) video.play().catch(function () {});
  }

  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        loadVideo(entry.target);
        videoObserver.unobserve(entry.target);
      });
    }, { rootMargin: '220px 0px' });

    lazyVideos.forEach(function (video) {
      videoObserver.observe(video);
    });
  } else {
    lazyVideos.forEach(loadVideo);
  }

  if (heroVideo && !reduceMotion) {
    const loadHeroVideo = function () {
      loadVideo(heroVideo);
      window.removeEventListener('pointerdown', loadHeroVideo);
      window.removeEventListener('keydown', loadHeroVideo);
      window.removeEventListener('touchstart', loadHeroVideo);
      window.removeEventListener('scroll', loadHeroVideo);
    };

    window.addEventListener('pointerdown', loadHeroVideo, { passive: true });
    window.addEventListener('keydown', loadHeroVideo);
    window.addEventListener('touchstart', loadHeroVideo, { passive: true });
    window.addEventListener('scroll', loadHeroVideo, { passive: true });
  }
})();
