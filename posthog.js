// PostHog event tracking for the AutoCuts landing page.
(function () {
  var STUDIO_URL = 'https://studio.autocuts.ai/';
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  function getDevice() {
    if (typeof window.matchMedia !== 'function') return 'desktop';
    if (window.matchMedia('(max-width: 767px)').matches) return 'mobile';
    if (window.matchMedia('(max-width: 1024px)').matches) return 'tablet';
    return 'desktop';
  }

  function getUtmProperties() {
    var params = new URLSearchParams(window.location.search);
    return UTM_KEYS.reduce(function (acc, key) {
      var value = params.get(key);
      if (value) acc[key] = value;
      return acc;
    }, {});
  }

  function baseProperties(properties) {
    return Object.assign(
      {
        app: 'video_editor',
        surface: 'landing',
        device: getDevice(),
        path: window.location.pathname
      },
      getUtmProperties(),
      properties || {}
    );
  }

  function captureLandingEvent(eventName, properties) {
    if (typeof window.posthog === 'undefined') return;
    window.posthog.capture(eventName, baseProperties(properties));
  }

  function setStudioUtm(link, location) {
    var href = link.getAttribute('href');
    if (!href || href.indexOf(STUDIO_URL) !== 0) return;

    var url = new URL(href);
    url.searchParams.set('utm_source', 'landing_page');
    url.searchParams.set('utm_medium', 'website');
    url.searchParams.set('utm_campaign', 'landing_cta');
    url.searchParams.set('utm_content', location);
    link.setAttribute('href', url.toString());
  }

  function captureCtaClick(location, link) {
    var href = link.getAttribute('href') || '';
    var label = link.textContent.trim().replace(/\s+/g, ' ');
    captureLandingEvent('landing.cta_clicked', {
      location: location,
      label: label,
      href: href,
      destination: href.indexOf(STUDIO_URL) === 0 ? 'studio' : 'internal'
    });
  }

  window.trackLandingEvent = captureLandingEvent;

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof window.posthog !== 'undefined') {
      window.posthog.register(baseProperties());
    }

    captureLandingEvent('landing.page_viewed');

    [
      ['nav', document.querySelector('.rail__cta')],
      ['hero', document.querySelector('.hero__actions .btn--primary')],
      ['pricing', document.querySelector('.cta__btn')],
      ['footer_closing', document.querySelector('.foot-state__cta a')],
      ['footer_resources', document.querySelector('.foot-col a[href="' + STUDIO_URL + '"]')]
    ].forEach(function (entry) {
      var location = entry[0];
      var link = entry[1];
      if (!link) return;
      setStudioUtm(link, location);
      link.addEventListener('click', function () {
        captureCtaClick(location, link);
      });
    });

    var heroGhost = document.querySelector('.hero__actions .btn--ghost');
    if (heroGhost) {
      heroGhost.addEventListener('click', function () {
        captureLandingEvent('landing.secondary_cta_clicked', {
          location: 'hero',
          label: heroGhost.textContent.trim().replace(/\s+/g, ' '),
          href: heroGhost.getAttribute('href')
        });
      });
    }

    document.querySelectorAll('.foot-col a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function () {
        captureLandingEvent('landing.section_link_clicked', {
          section: (link.getAttribute('href') || '').replace('#', ''),
          label: link.textContent.trim(),
          location: 'footer'
        });
      });
    });

    document.querySelectorAll('.foot-bar__right a').forEach(function (link) {
      link.addEventListener('click', function () {
        captureLandingEvent('landing.social_link_clicked', {
          platform: link.getAttribute('aria-label'),
          href: link.getAttribute('href')
        });
      });
    });

    document.querySelectorAll('.faq__item').forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        var question = item.querySelector('.faq__q');
        captureLandingEvent('landing.faq_opened', {
          question: question ? question.textContent.trim() : ''
        });
      });
    });
  });
})();
