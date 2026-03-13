document.addEventListener('DOMContentLoaded', () => {
    const siteNav = document.querySelector('[data-site-nav]');
    const storyScroll = document.querySelector('[data-story-scroll]');
    const storyScenes = Array.from(document.querySelectorAll('.story-scene'));
    const storyPrompt = document.querySelector('.story-prompt');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobileStoryLayout = window.matchMedia('(max-width: 820px)');
    let frameId = 0;
    let activeSceneIndex = -1;
    let activeStoryProgress = -1;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const syncNavState = () => {
        if (!(siteNav instanceof HTMLElement)) {
            return;
        }

        siteNav.classList.toggle('is-scrolled', window.scrollY > 24);
    };

    const clearStoryState = () => {
        document.body.classList.remove('story-ready');
        activeSceneIndex = -1;
        activeStoryProgress = -1;

        storyScenes.forEach((scene) => {
            scene.classList.remove('is-active');
            scene.removeAttribute('aria-hidden');
            scene.style.removeProperty('--scene-visibility');
            scene.style.removeProperty('--scene-distance');
        });

        if (storyScroll instanceof HTMLElement) {
            storyScroll.style.removeProperty('--story-progress');
        }

        if (storyPrompt instanceof HTMLElement) {
            storyPrompt.classList.remove('is-hidden');
        }
    };

    const updateStory = () => {
        syncNavState();

        if (!(storyScroll instanceof HTMLElement) || storyScenes.length === 0) {
            return;
        }

        if (prefersReducedMotion.matches || isMobileStoryLayout.matches) {
            clearStoryState();
            return;
        }

        document.body.classList.add('story-ready');

        const viewportHeight = Math.max(window.innerHeight, 1);
        const scrollRange = Math.max(storyScroll.offsetHeight - viewportHeight, 1);
        const offset = clamp(window.scrollY - storyScroll.offsetTop, 0, scrollRange);
        const maxSceneIndex = Math.max(storyScenes.length - 1, 0);
        const rawPosition = offset / viewportHeight;
        const nextActiveSceneIndex = clamp(Math.round(rawPosition), 0, maxSceneIndex);
        const snappedProgress = maxSceneIndex > 0 ? nextActiveSceneIndex / maxSceneIndex : 0;

        if (Math.abs(snappedProgress - activeStoryProgress) > 0.0001) {
            activeStoryProgress = snappedProgress;
            storyScroll.style.setProperty('--story-progress', snappedProgress.toFixed(4));
        }

        if (nextActiveSceneIndex !== activeSceneIndex) {
            activeSceneIndex = nextActiveSceneIndex;

            storyScenes.forEach((scene, index) => {
                const isActive = index === activeSceneIndex;
                const distance = index - activeSceneIndex;
                const visibility = isActive ? 1 : 0;

                scene.style.setProperty('--scene-visibility', visibility.toFixed(4));
                scene.style.setProperty('--scene-distance', distance.toFixed(4));
                scene.classList.toggle('is-active', isActive);
                scene.setAttribute('aria-hidden', isActive ? 'false' : 'true');
            });
        }

        if (storyPrompt instanceof HTMLElement) {
            storyPrompt.classList.toggle('is-hidden', activeSceneIndex > 0);
        }
    };

    const requestFrame = () => {
        if (frameId !== 0) {
            return;
        }

        frameId = window.requestAnimationFrame(() => {
            frameId = 0;
            updateStory();
        });
    };

    const scrollToScene = (sceneIndex) => {
        const targetIndex = clamp(sceneIndex, 0, Math.max(storyScenes.length - 1, 0));
        const targetScene = storyScenes[targetIndex];

        if (!(targetScene instanceof HTMLElement)) {
            return;
        }

        if (prefersReducedMotion.matches || !document.body.classList.contains('story-ready')) {
            targetScene.scrollIntoView({
                behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
                block: 'start'
            });
            return;
        }

        if (!(storyScroll instanceof HTMLElement)) {
            return;
        }

        const targetTop = storyScroll.offsetTop + (targetIndex * window.innerHeight);

        window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });
    };

    document.querySelectorAll('[data-target-scene]').forEach((element) => {
        element.addEventListener('click', (event) => {
            const sceneIndexValue = element.getAttribute('data-target-scene');

            if (sceneIndexValue === null) {
                return;
            }

            const sceneIndex = Number(sceneIndexValue);

            if (Number.isNaN(sceneIndex)) {
                return;
            }

            event.preventDefault();
            scrollToScene(sceneIndex);
        });
    });

    document.querySelectorAll('a[href^="#"]:not([data-target-scene])').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');

            if (!targetId || targetId === '#') {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!(targetElement instanceof HTMLElement)) {
                return;
            }

            event.preventDefault();
            targetElement.scrollIntoView({
                behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
                block: 'start'
            });
        });
    });

    syncNavState();
    updateStory();

    window.addEventListener('scroll', requestFrame, { passive: true });
    window.addEventListener('resize', requestFrame);
    prefersReducedMotion.addEventListener('change', requestFrame);
    isMobileStoryLayout.addEventListener('change', requestFrame);
});