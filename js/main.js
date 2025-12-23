document.addEventListener('DOMContentLoaded', () => {
    // Prevent browser from restoring scroll position
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // createLoaderParticles(); // Removed as new loader doesn't use particles
    createParticles();
    typeWriter();

    setInterval(rotateMessages, 6550);

    document.querySelectorAll('.course-card, .feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    setTimeout(() => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('hidden');
            // Remove from DOM after transition completes
            setTimeout(() => loader.remove(), 500);
        }
    }, 2800);

    createCommandPalette();

    console.group('👋 Benvenuto Developer!');
    console.log('%cIl sito è tuo! Usa il pannello "DevTools" in basso a destra per attivare le funzioni.', 'color: #6366f1; font-size: 14px;');
    console.log('%cOppure divertiti a esplorare il codice sorgente (F12 -> Sources)', 'color: #10b981; font-size: 12px;');
    console.groupEnd();
});
