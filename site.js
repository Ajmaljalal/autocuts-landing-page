/* Autocuts landing page behavior:
   1. Lazy-load demo videos from data-src just before they scroll into view.
   2. Play a video only while it is on screen; pause it when it leaves.
   3. Reveal sections on scroll.
   4. Shade the header rail after the page scrolls. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header rail */
  var rail = document.querySelector(".rail");
  function onScroll() {
    rail.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Reveal on scroll */
  var revealed = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealIO.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealed.forEach(function (el) { revealIO.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* Demo videos: load near the viewport, play only while visible */
  var videos = document.querySelectorAll("video[data-src]");

  function loadVideo(video) {
    if (!video.src) {
      video.src = video.getAttribute("data-src");
      video.load();
    }
  }

  function playVideo(video) {
    loadVideo(video);
    var p = video.play();
    if (p && p.catch) { p.catch(function () {}); }
  }

  if ("IntersectionObserver" in window) {
    var warmIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            loadVideo(entry.target);
            warmIO.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "600px 0px" }
    );

    var playIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            playVideo(entry.target);
          } else {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    videos.forEach(function (video) {
      warmIO.observe(video);
      playIO.observe(video);
    });
  } else {
    videos.forEach(function (video) {
      playVideo(video);
    });
  }
})();
