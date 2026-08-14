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

  const lazyVideos = document.querySelectorAll('video[data-src]:not(.lazy-hero-video):not(.rot-video):not(.vf-vid)');
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

/* ---- Hero slideshow: morphing viewfinder carousel ----
   Plays one clip at a time; advances when the clip ends or the user swipes/taps a dot.
   The stage keeps a fixed height and morphs its width between 16:9 and 9:16 per slide. */
(function () {
  var root = document.querySelector('.vf');
  if (!root) return;
  var screen = root.querySelector('.vf-screen');
  var slides = Array.prototype.slice.call(root.querySelectorAll('.vf-slide'));
  if (!screen || slides.length < 2) return;
  var dots = Array.prototype.slice.call(root.querySelectorAll('.vf-dot'));
  // big rotating headline lives above the video (outside .vf); all titles are
  // preloaded in the DOM for SEO, we just toggle which one is visible.
  var rotaItems = Array.prototype.slice.call(document.querySelectorAll('.hero__rota .rota__item'));
  var cap = root.querySelector('.vf-cap');
  var capK = root.querySelector('.vf-cap__kicker');
  var capD = root.querySelector('.vf-cap__desc');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var i = 0, started = false, visible = false, timer = null, capTimer = null, capIdx = -1;

  function vid(s) { return s.querySelector('video'); }

  function load(s) {
    var v = vid(s); if (!v) return null;
    if (v.dataset.src && !v.getAttribute('src')) { v.src = v.dataset.src; v.load(); }
    return v;
  }

  function applyText(s) {
    if (capK) capK.textContent = s.dataset.kicker || '';
    if (capD) capD.textContent = s.dataset.desc || '';
  }

  function setCap(s, idx) {
    if (!cap || idx === capIdx) return; // unchanged, skip the fade
    capIdx = idx;
    cap.classList.add('is-fading');
    clearTimeout(capTimer);
    capTimer = setTimeout(function () { applyText(s); cap.classList.remove('is-fading'); }, 200);
  }

  function pauseAllBut(s) {
    slides.forEach(function (o) { if (o !== s) { var v = vid(o); if (v && !v.paused) v.pause(); } });
  }

  // Safety net only: 'ended' is the normal trigger. The timeout must be LONGER
  // than the clip so it never advances early; it fires only if 'ended' never does.
  function armSafety(v) {
    clearTimeout(timer);
    var d = (v && isFinite(v.duration) && v.duration > 0) ? v.duration : null;
    timer = setTimeout(next, d ? (d + 2) * 1000 : 40000);
  }

  function playCurrent() {
    clearTimeout(timer);
    var v = load(slides[i]);
    if (!v || reduce) return;
    try { v.currentTime = 0; } catch (e) {}
    var p = v.play(); if (p && p.catch) p.catch(function () {});
    var cur = slides[i];
    if (isFinite(v.duration) && v.duration > 0) {
      armSafety(v);
    } else {
      // duration not known yet (preload="none"); hold a long provisional timer,
      // then arm the real one once metadata arrives.
      timer = setTimeout(next, 40000);
      v.addEventListener('loadedmetadata', function onmd() {
        v.removeEventListener('loadedmetadata', onmd);
        if (slides[i] === cur && visible) armSafety(v);
      }, { once: true });
    }
  }

  function show(n) {
    n = (n % slides.length + slides.length) % slides.length;
    i = n;
    var cur = slides[i];
    if (cur.dataset.orient === 'v') screen.classList.add('is-v'); else screen.classList.remove('is-v');
    slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
    dots.forEach(function (d, k) {
      d.classList.toggle('is-active', k === i);
      d.setAttribute('aria-selected', k === i ? 'true' : 'false');
    });
    rotaItems.forEach(function (el, k) { el.classList.toggle('is-active', k === i); });
    setCap(cur, i);
    load(slides[(i + 1) % slides.length]); // warm the next clip
    pauseAllBut(cur);
    if (visible) playCurrent();
  }
  function next() { show(i + 1); }
  function prev() { show(i - 1); }

  slides.forEach(function (s) {
    var v = vid(s);
    if (v) v.addEventListener('ended', function () { if (slides[i] === s) next(); });
  });
  dots.forEach(function (d, k) { d.addEventListener('click', function () { show(k); }); });

  // swipe (touch)
  var sx = 0, sy = 0, tracking = false;
  screen.addEventListener('touchstart', function (e) {
    var t = e.changedTouches[0]; sx = t.clientX; sy = t.clientY; tracking = true;
  }, { passive: true });
  screen.addEventListener('touchend', function (e) {
    if (!tracking) return; tracking = false;
    var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) { if (dx < 0) next(); else prev(); }
  }, { passive: true });

  // initial state without autoplay (until the section scrolls into view)
  applyText(slides[0]);
  capIdx = 0;
  rotaItems.forEach(function (el, k) { el.classList.toggle('is-active', k === 0); });
  if (slides[0].dataset.orient === 'v') screen.classList.add('is-v');

  function activate() {
    visible = true;
    if (!started) { started = true; show(0); } else playCurrent();
  }
  function deactivate() {
    visible = false;
    clearTimeout(timer);
    var v = vid(slides[i]); if (v && !v.paused) v.pause();
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) activate(); else deactivate(); });
    }, { threshold: 0.3 });
    io.observe(root);
  } else { activate(); }
})();
