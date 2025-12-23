function aggiungiCorso(nome, descrizione, ...argomenti) {
    const coursesGrid = document.querySelector('.courses-grid');
    const newCard = document.createElement('div');
    newCard.className = 'course-card';

    const topicsArray = argomenti.length > 0
        ? argomenti.map((arg, index) => {
            if (typeof arg === 'string') {
                const emojis = ['🎯', '🔥', '⚡', '💡', '🚀', '⭐', '🎨', '📱'];
                return { icon: emojis[index % emojis.length], text: arg };
            }
            return arg;
        })
        : [
            { icon: '🆕', text: 'Nuovo 1' },
            { icon: '⭐', text: 'Nuovo 2' },
            { icon: '🚀', text: 'Nuovo 3' },
            { icon: '💡', text: 'Nuovo 4' }
        ];

    const topicsHTML = topicsArray.map(topic => `
        <div class="topic-card">
            <span class="topic-icon">${topic.icon}</span>
            <div class="topic-text">${topic.text}</div>
        </div>
    `).join('');

    newCard.innerHTML = `
        <div class="course-icon">🆕</div>
        <h3 class="course-title">${nome}</h3>
        <p class="course-description">${descrizione}</p>
        <div class="topics-grid">
            ${topicsHTML}
        </div>
    `;

    coursesGrid.appendChild(newCard);
    newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

    newCard.style.opacity = '0';
    newCard.style.transform = 'translateY(30px) scale(0.8)';
    newCard.style.transition = 'all 0.6s ease-out';
    newCard.style.border = '2px solid var(--accent-color)';

    setTimeout(() => {
        newCard.style.opacity = '1';
        newCard.style.transform = 'translateY(0) scale(1)';
    }, 100);

    console.log(`✅ Corso "${nome}" aggiunto con successo!`);
    return `Nuovo corso aggiunto! Scorri per vederlo.`;
}
