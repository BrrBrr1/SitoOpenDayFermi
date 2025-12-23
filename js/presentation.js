function modalitàPresentazione() {
    // Enable presentation mode protection
    presentationModeActive = true;
    document.body.classList.add('presentation-active');

    const courses = [];
    document.querySelectorAll('.course-card').forEach(card => {
        const title = card.querySelector('.course-title').innerText;
        const desc = card.querySelector('.course-description').innerText;
        const icon = card.querySelector('.course-icon').innerText;
        const details = card.querySelector('.course-details-text') ? card.querySelector('.course-details-text').innerText : '';

        const topics = [];
        card.querySelectorAll('.topic-card').forEach(tCard => {
            topics.push({
                icon: tCard.querySelector('.topic-icon').innerText,
                text: tCard.querySelector('.topic-text').innerText,
                desc: tCard.querySelector('.topic-desc') ? tCard.querySelector('.topic-desc').innerText : ''
            });
        });

        courses.push({ title, desc, icon, details, topics });
    });

    const slides = [
        {
            type: 'intro',
            content: `
                <div class="slide-header">
                    <div class="spinning-icon">🎓</div>
                    <h1>Benvenuti all'Open Day</h1>
                </div>
                <p style="font-size: 1.5rem;">Scopri il futuro della tecnologia con i nostri corsi d'eccellenza.</p>
                <p>Premi <strong>Avanti</strong> o usa le frecce per iniziare il tour.</p>
            `
        },
        ...courses.map(c => ({
            type: 'course',
            content: `
                <div class="slide-header">
                    <div class="spinning-icon">${c.icon}</div>
                    <h1>${c.title}</h1>
                </div>
                <p style="font-size: 1.4rem; opacity: 0.9;">${c.desc}</p>
                
                ${c.details ? `<div class="slide-details">${c.details}</div>` : ''}

                <div class="slide-content-grid">
                    ${c.topics.map(t => `
                        <div class="topic-card">
                            <span class="topic-icon">${t.icon}</span>
                            <div class="topic-text">${t.text}</div>
                            <div class="topic-desc" style="display: none;">${t.desc}</div>
                        </div>
                    `).join('')}
                </div>
            `
        })),
        {
            type: 'outro',
            content: `
                <div class="slide-header">
                    <div class="spinning-icon">🚀</div>
                    <h1>Il Futuro ti Aspetta</h1>
                </div>
                <p>Inizia il tuo viaggio nel mondo dell'informatica.</p>
                <button class="presentation-btn" onclick="closePresentation()">Torna al Sito</button>
            `
        }
    ];

    let currentSlideIndex = 0;

    const overlay = document.createElement('div');
    overlay.className = 'presentation-overlay';
    overlay.innerHTML = `
        <button class="presentation-close" onclick="closePresentation()">×</button>
        <div class="presentation-slide" id="current-slide"></div>
        <div class="presentation-controls">
            <button class="presentation-btn" onclick="prevSlide()">← Indietro</button>
            <span id="slide-counter">1 / ${slides.length}</span>
            <button class="presentation-btn" onclick="nextSlide()">Avanti →</button>
        </div>
    `;
    document.body.appendChild(overlay);

    function renderSlide(index, direction = 'next') {
        const slideContainer = document.getElementById('current-slide');
        const slide = slides[index];
        if (slideContainer.innerHTML !== '') {
            slideContainer.classList.add('exit-left');
            setTimeout(() => {
                slideContainer.classList.remove('exit-left');
                updateContent();
            }, 300);
        } else {
            updateContent();
        }

        function updateContent() {
            slideContainer.innerHTML = slide.content;
            slideContainer.style.animation = 'none';
            void slideContainer.offsetHeight;
            slideContainer.style.animation = 'slideScaleIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards';

            document.getElementById('slide-counter').innerText = `${index + 1} / ${slides.length}`;
        }
    }

    window.nextSlide = () => {
        if (currentSlideIndex < slides.length - 1) {
            currentSlideIndex++;
            renderSlide(currentSlideIndex, 'next');
        } else {
            closePresentation();
        }
    };

    window.prevSlide = () => {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            renderSlide(currentSlideIndex, 'prev');
        }
    };

    window.closePresentation = () => {
        // Disable presentation mode protection
        presentationModeActive = false;
        document.body.classList.remove('presentation-active');
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
            delete window.nextSlide;
            delete window.prevSlide;
            delete window.closePresentation;
        }, 500);
    };

    const handleKey = (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'Escape') closePresentation();
    };
    document.addEventListener('keydown', handleKey);

    const originalClose = window.closePresentation;
    window.closePresentation = () => {
        document.removeEventListener('keydown', handleKey);
        originalClose();
    };

    renderSlide(0);
}