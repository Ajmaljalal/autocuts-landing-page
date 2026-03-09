/**
 * AutoCuts Landing Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Navbar Background Opacity on Scroll
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('bg-surface-0/90', 'border-ui-border');
            nav.classList.remove('bg-surface-0/0', 'border-transparent');
        } else {
            // Optional: Make fully transparent at top if desired
            // nav.classList.remove('bg-surface-0/90', 'border-ui-border');
            // nav.classList.add('bg-surface-0/0', 'border-transparent');
        }
    });
});