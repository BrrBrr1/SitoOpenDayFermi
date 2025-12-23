document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

let messageIndex = 0;
function rotateMessages() {
    const heroP = document.querySelector('.hero p');
    if (heroP) {
        messageIndex = (messageIndex + 1) % config.welcomeMessages.length;
        heroP.style.opacity = '0';
        setTimeout(() => {
            heroP.textContent = config.welcomeMessages[messageIndex];
            heroP.style.opacity = '0.9';
        }, 500);
    }
}

function typeWriter() {
    const title = document.querySelector('.hero h1');
    const text = title.textContent;
    title.textContent = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }

    setTimeout(type, 2538); // Inizia dopo il loader
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

let clickCount = 0;

document.addEventListener('click', (e) => {
    clickCount++;
    if (clickCount % 10 === 0) {
        console.log(`📊 Hai fatto ${clickCount} click sul sito!`);
    }

    if (window.hackerModeActive) {
        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ';
        const charCount = Math.floor(Math.random() * 8) + 8;

        for (let i = 0; i < charCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'hacker-particle';

                const char = characters[Math.floor(Math.random() * characters.length)];
                particle.textContent = char;

                const size = Math.random() * 1.5 + 0.8;
                particle.style.fontSize = size + 'rem';

                particle.style.left = e.clientX + 'px';
                particle.style.top = e.clientY + 'px';

                const angle = (Math.PI * 2 * i) / charCount + (Math.random() - 0.5);
                const distance = Math.random() * 150 + 100;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;

                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');

                document.body.appendChild(particle);

                setTimeout(() => particle.remove(), 800);
            }, i * 30);
        }
        return;
    }

    const particleCount = 15;
    const colors = themeColors[currentTheme];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';

        const size = Math.random() * 10 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 15px ${color}`;

        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';

        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const velocity = Math.random() * 500 + 300;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 1200);
    }
});

function createCommandPalette() {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'cmd-toggle';
    toggleBtn.innerHTML = '🛠️';
    toggleBtn.title = 'Apri Pannello Sviluppatore';
    document.body.appendChild(toggleBtn);

    const panel = document.createElement('div');
    panel.className = 'cmd-panel';
    panel.innerHTML = `
        <div class="cmd-header">
            <h3>DevTools 🚀</h3>
            <button class="cmd-close">×</button>
        </div>
        <div class="cmd-content">
            <div class="cmd-section">
                <h4>🎨 Temi Decorativi</h4>
                <div class="cmd-grid">
                    <button onclick="cambiaTemaSito('cyberpunk')">🤖 Cyberpunk</button>
                    <button onclick="cambiaTemaSito('neon')">💡 Neon</button>
                    <button onclick="cambiaTemaSito('foresta')">🌲 Foresta</button>
                    <button onclick="cambiaTemaSito('tramonto')">🌅 Tramonto</button>
                    <button onclick="cambiaTemaSito('ghiaccio')">❄️ Ghiaccio</button>
                    <button onclick="cambiaTemaSito('toxic')">☣️ Toxic</button>
                </div>
                <button onclick="resetToDefaultTheme()" style="margin-top: 0.5rem; width: 100%;">🔄 Reset Tema Default</button>
            </div>
            
            <div class="cmd-section">
                <h4>⚡ Funzioni Speciali</h4>
                <div class="cmd-list">
                    <button id="hacker-btn" onclick="attivaModalitaHacker()">💻 Modalità Hacker</button>
                    <button onclick="modalitaFesta()">🎉 Modalità Festa</button>
                    <button onclick="modalitàPresentazione()">🎓 Modalità Presentazione</button>
                </div>
            </div>

            <div class="cmd-section">
                <h4>🛠️ Azioni Rapide</h4>
                <div class="cmd-list">
                    <button onclick="openAddCourseModal()">📚 Aggiungi Corso</button>
                    <button onclick="openChangeTitleModal()">✏️ Modifica Titolo</button>
                    <button onclick="openChangeLogoModal()">🎭 Cambia Logo</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(panel);

    toggleBtn.addEventListener('click', () => {
        panel.classList.add('active');
        toggleBtn.style.transform = 'scale(0)';
        updateHackerButton();
    });

    panel.querySelector('.cmd-close').addEventListener('click', () => {
        panel.classList.remove('active');
        toggleBtn.style.transform = 'scale(1)';
    });
}

function createModal(title, contentHTML, onConfirm) {
    const existing = document.querySelector('.modal-overlay');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                ${contentHTML}
                <div class="modal-actions">
                    <button class="btn-cancel" onclick="this.closest('.modal-overlay').remove()">Annulla</button>
                    <button class="btn-submit" id="modal-confirm-btn">Conferma</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('modal-confirm-btn').onclick = () => {
        onConfirm();
        modal.remove();
    };
}

function openAddCourseModal() {
    const content = `
        <div class="form-group">
            <label>Nome Corso</label>
            <input type="text" id="courseName" placeholder="Es. Intelligenza Artificiale">
        </div>
        <div class="form-group">
            <label>Descrizione</label>
            <textarea id="courseDesc" rows="3" placeholder="Descrivi cosa si impara..."></textarea>
        </div>
        <div class="form-group">
            <label>Argomenti (separati da virgola)</label>
            <input type="text" id="courseTopics" placeholder="Es. Python, Neural Networks, Data Science">
        </div>
    `;

    createModal("📚 Aggiungi Nuovo Corso", content, () => {
        const nome = document.getElementById('courseName').value;
        const desc = document.getElementById('courseDesc').value;
        const topics = document.getElementById('courseTopics').value;

        if (!nome || !desc) {
            alert("Per favore inserisci almeno Nome e Descrizione!");
            return;
        }

        const args = topics ? topics.split(',').map(t => t.trim()) : [];
        aggiungiCorso(nome, desc, ...args);
    });
}

function openChangeTitleModal() {
    const content = `
        <div class="form-group">
            <label>Nuovo Titolo</label>
            <input type="text" id="newTitle" placeholder="Es. Open Day 2025">
        </div>
    `;

    createModal("✏️ Modifica Titolo", content, () => {
        const nuovo = document.getElementById('newTitle').value;
        if (nuovo) modificaTitolo(nuovo);
    });
}

function modificaTitolo(nuovoTitolo) {
    const titolo = document.querySelector('.hero h1');
    if (titolo) {
        titolo.textContent = nuovoTitolo;
        titolo.style.animation = 'gradient 3s ease infinite, pulse 1s';
        console.log(`✅ Titolo cambiato in: "${nuovoTitolo}"`);
    }
    return 'Titolo modificato!';
}

function openChangeLogoModal() {
    const emojis = ['💻', '🚀', '⚡', '🔥', '🎓', '🤖', '🌐', '📱', '🎨', '⭐', '💡', '🎮', '👾', '🦄', '🐉'];
    const emojiButtons = emojis.map(e => `<button class="emoji-btn" onclick="selectEmoji('${e}')">${e}</button>`).join('');

    const content = `
        <div class="form-group">
            <label>Scegli un'emoji</label>
            <div class="emoji-grid">
                ${emojiButtons}
            </div>
            <input type="hidden" id="selectedEmoji">
        </div>
    `;

    window.selectEmoji = (e) => {
        document.getElementById('selectedEmoji').value = e;
        document.querySelectorAll('.emoji-btn').forEach(btn => {
            btn.style.borderColor = btn.innerText === e ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)';
            btn.style.background = btn.innerText === e ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.05)';
        });
    };

    createModal("🎭 Cambia Logo", content, () => {
        const emoji = document.getElementById('selectedEmoji').value;
        if (emoji) aggiungiEmoji(emoji);
    });
}

function aggiungiEmoji(emoji) {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.innerHTML = emoji + ' Informatica Fermi';
        console.log(`✅ Logo aggiornato con emoji: ${emoji}`);
    }
}

function modalitaFesta() {
    document.body.style.animation = '';

    const discoStyle = document.createElement('style');
    discoStyle.id = 'disco-style';
    discoStyle.textContent = `
            @keyframes disco {
                0% { background: linear-gradient(135deg, #ff0080 0%, #7928ca 100%); }
                25% { background: linear-gradient(135deg, #ff0080 0%, #00d4ff 100%); }
                50% { background: linear-gradient(135deg, #00d4ff 0%, #7928ca 100%); }
                75% { background: linear-gradient(135deg, #ffaa00 0%, #ff0080 100%); }
                100% { background: linear-gradient(135deg, #ff0080 0%, #7928ca 100%); }
            }
        
            @keyframes confettiFall {
                0% {
                    transform: translateY(-10px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        
            .festa-active {
                animation: disco 3s linear infinite !important;
            }
        
            .confetto {
                position: fixed;
                width: 10px;
                height: 10px;
                z-index: 9999;
                pointer-events: none;
                animation: confettiFall 3s ease-in forwards;
            }
        `;

    const oldStyle = document.getElementById('disco-style');
    if (oldStyle) oldStyle.remove();
    document.head.appendChild(discoStyle);

    const bgAnimation = document.getElementById('bgAnimation');

    const previousTheme = currentTheme;
    bgAnimation.classList.remove('theme-foresta', 'theme-tramonto', 'theme-cyberpunk', 'theme-neon', 'theme-ghiaccio', 'theme-toxic');
    bgAnimation.classList.add('festa-active');

    const colors = ['#ff0080', '#7928ca', '#00d4ff', '#ffaa00', '#00ff88', '#ff4444'];
    const shapes = ['circle', 'square'];

    for (let i = 0; i < 600; i++) {
        setTimeout(() => {
            const confetto = document.createElement('div');
            confetto.className = 'confetto';

            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            if (shape === 'circle') {
                confetto.style.borderRadius = '50%';
            } else {
                confetto.style.width = '8px';
                confetto.style.height = '12px';
            }

            confetto.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetto.style.left = Math.random() * 100 + '%';
            confetto.style.top = '-20px';
            confetto.style.animationDelay = '0s';
            confetto.style.animationDuration = (2 + Math.random() * 2) + 's';
            confetto.style.boxShadow = `0 0 10px ${confetto.style.background}`;

            document.body.appendChild(confetto);

            setTimeout(() => {
                confetto.remove();
            }, 5000);
        }, i * 20);
    }

    const festaMessage = document.createElement('div');
    festaMessage.innerHTML = "🎉 MODALITÀ FESTA ATTIVATA! 🎊";

    festaMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
  
                font-size: 3rem;
                font-weight: bold;
                color: white;
                text-align: center;
                text-shadow:
                    0 0 20px #ff0080,
                    0 0 40px #7928ca,
                    0 0 60px #ff0080;
  
                background: rgba(0, 0, 0, 0.6);
                padding: 2rem 4rem;
                border-radius: 1rem;
  
                z-index: 10000;
                animation: pulse 1s ease-in-out 3;
                pointer-events: none;
            `;


    document.body.appendChild(festaMessage);

    setTimeout(() => {
        festaMessage.style.transition = 'opacity 0.5s';
        festaMessage.style.opacity = '0';
        setTimeout(() => festaMessage.remove(), 500);
    }, 3000);

    setTimeout(() => {
        bgAnimation.classList.remove('festa-active');
        if (previousTheme !== 'default') {
            bgAnimation.classList.add(`theme-${previousTheme}`);
        }
        console.log('🎊 Modalità festa terminata!');
    }, 15000);

    console.log('🎉 MODALITÀ FESTA ATTIVATA PER 15 SECONDI!');
    console.log('💃 Goditi lo spettacolo!');
}
