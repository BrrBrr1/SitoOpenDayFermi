function attivaModalitaHacker() {
    const previousTheme = currentTheme;

    currentTheme = 'hacker';

    const bgAnimation = document.getElementById('bgAnimation');
    bgAnimation.classList.remove('theme-foresta', 'theme-tramonto', 'theme-cyberpunk', 'theme-neon', 'theme-ghiaccio', 'theme-toxic');

    document.documentElement.style.transition = 'all 0.6s ease';

    const overlay = document.createElement('div');
    overlay.id = 'hacker-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        z-index: 9998;
        pointer-events: none;
        backdrop-filter: blur(2px);
    `;
    document.body.appendChild(overlay);

    document.body.style.fontFamily = 'Courier New, monospace';
    document.documentElement.style.setProperty('--primary-color', '#00ff00');
    document.documentElement.style.setProperty('--secondary-color', '#00ff41');
    document.documentElement.style.setProperty('--accent-color', '#00cc00');
    document.documentElement.style.setProperty('--dark-bg', '#000000');
    document.documentElement.style.setProperty('--card-bg', '#001a00');

    let canvas = document.getElementById('matrix');
    if (canvas) canvas.remove();

    canvas = document.createElement('canvas');
    canvas.id = 'matrix';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        pointer-events: none;
        opacity: 0.15;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
    const matrixArray = matrix.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];

            const gradient = ctx.createLinearGradient(0, drops[i] * fontSize - 20, 0, drops[i] * fontSize);
            gradient.addColorStop(0, 'rgba(0, 255, 65, 1)');
            gradient.addColorStop(1, 'rgba(0, 255, 0, 0.3)');
            ctx.fillStyle = gradient;

            ctx.font = fontSize + 'px monospace';
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            ctx.fillStyle = '#00ff41';
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#00ff41';
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            ctx.shadowBlur = 0;

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    const matrixInterval = setInterval(drawMatrix, 33);

    const welcomeMsg = document.createElement('div');
    welcomeMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        z-index: 10000;
        color: #00ff00;
        font-family: 'Courier New', monospace;
        font-size: 2.5rem;
        font-weight: bold;
        text-align: center;
        text-shadow: 
            0 0 10px #00ff00,
            0 0 20px #00ff00,
            0 0 30px #00ff00,
            0 0 40px #00ff41;
        background: rgba(0, 0, 0, 0.9);
        padding: 2rem 3rem;
        border: 2px solid #00ff00;
        border-radius: 10px;
        box-shadow: 
            0 0 20px #00ff00,
            inset 0 0 20px rgba(0, 255, 0, 0.2);
        animation: hackerPulse 0.5s ease-out forwards, hackerGlitch 0.1s infinite;
        pointer-events: none;
    `;
    welcomeMsg.innerHTML = `
        <div style="margin-bottom: 1rem;">💻 ACCESSO CONSENTITO 💻</div>
        <div style="font-size: 1.2rem; opacity: 0.8;">MODALITÀ HACKER ATTIVATA</div>
        <div style="font-size: 0.9rem; margin-top: 1rem; color: #00cc00;">SISTEMA COMPROMESSO...</div>
    `;
    document.body.appendChild(welcomeMsg);

    const hackerStyle = document.createElement('style');
    hackerStyle.id = 'hacker-style';
    hackerStyle.textContent = `
        @keyframes hackerPulse {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.1); }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        
        @keyframes hackerGlitch {
            0%, 100% { text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00; }
            50% { text-shadow: 0 0 20px #00ff41, 0 0 40px #00ff41, 2px 0 5px #ff0000, -2px 0 5px #0000ff; }
        }
        
        @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
        }
    `;
    document.head.appendChild(hackerStyle);

    const scanline = document.createElement('div');
    scanline.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(transparent, #00ff00, transparent);
        z-index: 10001;
        pointer-events: none;
        animation: scanline 4s linear infinite;
        box-shadow: 0 0 10px #00ff00;
    `;
    document.body.appendChild(scanline);

    setTimeout(() => {
        welcomeMsg.style.transition = 'opacity 0.5s, transform 0.5s';
        welcomeMsg.style.opacity = '0';
        welcomeMsg.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => welcomeMsg.remove(), 500);
    }, 3000);

    console.log('%c💻 MODALITÀ HACKER ATTIVATA!', 'color: #00ff00; font-size: 20px; font-family: monospace; text-shadow: 0 0 10px #00ff00;');
    console.log('%cAccesso al sistema... CONCESSO', 'color: #00ff41; font-family: monospace;');
    console.log('%cScrivi disattivaHacker() per uscire', 'color: #00cc00; font-family: monospace;');

    window.hackerPreviousTheme = previousTheme;

    window.disattivaHacker = function () {
        clearInterval(matrixInterval);
        canvas.remove();
        overlay.remove();
        scanline.remove();
        const style = document.getElementById('hacker-style');
        if (style) style.remove();

        document.body.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

        document.querySelectorAll('*').forEach(el => {
            el.style.transition = 'color 0.5s ease, background-color 0.5s ease, border-color 0.5s ease';
        });

        if (previousTheme !== 'default') {
            setTimeout(() => cambiaTemaSito(previousTheme), 100);
        } else {
            const defaultColors = {
                '--primary-color': '#6366f1',
                '--secondary-color': '#8b5cf6',
                '--accent-color': '#ec4899',
                '--dark-bg': '#0f172a',
                '--card-bg': '#1e293b',
                '--text-light': '#e2e8f0'
            };

            Object.entries(defaultColors).forEach(([property, value]) => {
                document.documentElement.style.setProperty(property, value);
            });

            const bgAnimation = document.getElementById('bgAnimation');
            bgAnimation.classList.remove('theme-foresta', 'theme-tramonto', 'theme-cyberpunk',
                'theme-neon', 'theme-ghiaccio', 'theme-toxic');

            void bgAnimation.offsetHeight;
        }

        if (previousTheme === 'default') {
            currentTheme = 'default';
        }

        window.hackerModeActive = false;
        updateHackerButton();

        console.log('%c✅ Modalità hacker disattivata', 'color: #6366f1; font-size: 14px;');
        return 'Sistema ripristinato';
    };

    window.hackerModeActive = true;
    updateHackerButton();

    return 'Welcome to the Matrix...';
}

function updateHackerButton() {
    const btn = document.getElementById('hacker-btn');
    if (!btn) return;

    if (window.hackerModeActive) {
        btn.innerHTML = '🚫 Disattiva Hacker Mode';
        btn.onclick = window.disattivaHacker;
        btn.style.borderColor = '#ef4444';
        btn.style.color = '#ef4444';
    } else {
        btn.innerHTML = '💻 Modalità Hacker';
        btn.onclick = attivaModalitaHacker;
        btn.style.borderColor = '';
        btn.style.color = '';
    }
}
