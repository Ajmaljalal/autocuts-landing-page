/**
 * AutoCuts landing page interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('motion-ready');

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');

            if (!targetId || targetId === '#') {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const nav = document.querySelector('nav');

    if (nav) {
        const syncNavState = () => {
            if (window.scrollY > 32) {
                nav.classList.add('bg-surface-0/90');
            } else {
                nav.classList.remove('bg-surface-0/90');
            }
        };

        syncNavState();
        window.addEventListener('scroll', syncNavState);
    }
});