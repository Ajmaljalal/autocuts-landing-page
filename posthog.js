// PostHog event tracking for AutoCuts landing page
// Token and host configured via environment variables (see .env)

document.addEventListener('DOMContentLoaded', function () {
    if (typeof window.posthog === 'undefined') return;

    // Nav rail CTA — "Upload video" in the sticky top bar
    var navCta = document.querySelector('.rail__cta');
    if (navCta) {
        navCta.addEventListener('click', function () {
            posthog.capture('nav_cta_clicked', {
                label: navCta.textContent.trim(),
                href: navCta.getAttribute('href')
            });
        });
    }

    // Hero primary CTA — "Upload video" button
    var heroActions = document.querySelector('.hero__actions');
    if (heroActions) {
        var heroPrimary = heroActions.querySelector('.btn--primary');
        if (heroPrimary) {
            heroPrimary.addEventListener('click', function () {
                posthog.capture('hero_cta_clicked', {
                    label: heroPrimary.textContent.trim(),
                    href: heroPrimary.getAttribute('href')
                });
            });
        }

        // Hero ghost CTA — "See how it works"
        var heroGhost = heroActions.querySelector('.btn--ghost');
        if (heroGhost) {
            heroGhost.addEventListener('click', function () {
                posthog.capture('hero_scroll_cta_clicked', {
                    label: heroGhost.textContent.trim(),
                    href: heroGhost.getAttribute('href')
                });
            });
        }
    }

    // Pricing / CTA section button — "Upload video"
    var ctaBtn = document.querySelector('.cta__btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function () {
            posthog.capture('pricing_cta_clicked', {
                label: ctaBtn.textContent.trim(),
                href: ctaBtn.getAttribute('href')
            });
        });
    }

    // Footer closing-statement Studio link
    var footStateCta = document.querySelector('.foot-state__cta a');
    if (footStateCta) {
        footStateCta.addEventListener('click', function () {
            posthog.capture('footer_studio_clicked', {
                label: footStateCta.textContent.trim(),
                href: footStateCta.getAttribute('href')
            });
        });
    }

    // Footer Resources "Studio" link
    var footResourceStudio = document.querySelector('.foot-col a[href="https://studio.autocuts.ai/"]');
    if (footResourceStudio) {
        footResourceStudio.addEventListener('click', function () {
            posthog.capture('footer_studio_clicked', {
                label: footResourceStudio.textContent.trim(),
                href: footResourceStudio.getAttribute('href'),
                location: 'footer_resources'
            });
        });
    }

    // Footer nav section links (Outputs, Workflow, Who it's for, Pricing, FAQ)
    document.querySelectorAll('.foot-col a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function () {
            posthog.capture('nav_section_clicked', {
                section: link.getAttribute('href').replace('#', ''),
                label: link.textContent.trim(),
                location: 'footer'
            });
        });
    });

    // Social media links in footer bar
    document.querySelectorAll('.foot-bar__right a').forEach(function (link) {
        link.addEventListener('click', function () {
            posthog.capture('social_link_clicked', {
                platform: link.getAttribute('aria-label'),
                href: link.getAttribute('href')
            });
        });
    });

    // FAQ items — track when a user expands a question
    document.querySelectorAll('.faq__item').forEach(function (item) {
        item.addEventListener('toggle', function () {
            if (item.open) {
                var question = item.querySelector('.faq__q');
                posthog.capture('faq_item_opened', {
                    question: question ? question.textContent.trim() : ''
                });
            }
        });
    });
});
