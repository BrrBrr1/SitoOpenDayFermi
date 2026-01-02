// ============= BASE THEME (Light/Dark) =============
let baseTheme = 'dark'; // Default is now DARK
let presentationModeActive = false; // Flag to prevent theme changes during presentation

function setBaseTheme(theme) {
    // Don't change if presentation mode is active
    if (presentationModeActive) {
        console.log('⚠️ Tema base bloccato durante la presentazione');
        return;
    }

    baseTheme = theme;

    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }

    // Also reset any custom decorative theme to avoid visual conflicts
    currentTheme = 'default';
    document.documentElement.style.setProperty('--primary-color', '#2563eb');
    document.documentElement.style.setProperty('--secondary-color', '#0891b2');
    document.documentElement.style.setProperty('--accent-color', '#f59e0b');

    // Reset background colors based on new theme
    if (theme === 'dark') {
        document.documentElement.style.setProperty('--dark-bg', '#0f172a');
        document.documentElement.style.setProperty('--card-bg', '#1e293b');
    } else {
        document.documentElement.style.setProperty('--dark-bg', '#f8fafc');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
    }

    // Force refresh bgAnimation to clear any custom theme residue
    const bgAnimation = document.getElementById('bgAnimation');
    if (bgAnimation) {
        bgAnimation.classList.remove('theme-foresta', 'theme-tramonto',
            'theme-cyberpunk', 'theme-neon', 'theme-ghiaccio', 'theme-toxic');

        // Clone and replace to force pseudo-element refresh
        const parent = bgAnimation.parentNode;
        const clone = bgAnimation.cloneNode(true);
        parent.removeChild(bgAnimation);
        parent.insertBefore(clone, parent.firstChild);
    }

    // Save preference
    localStorage.setItem('baseTheme', theme);

    // Update toggle button if exists
    updateThemeToggleButton();

    // Force scrollbar to re-render by toggling overflow
    forceScrollbarRefresh();

    console.log(`🌓 Tema base: ${theme === 'dark' ? '🌙 Scuro' : '☀️ Chiaro'}`);
}

// Force browsers to re-render scrollbar styles by injecting dynamic CSS
function forceScrollbarRefresh() {
    // Remove old dynamic scrollbar style if exists
    const oldStyle = document.getElementById('dynamic-scrollbar-style');
    if (oldStyle) oldStyle.remove();

    // Create new style with scrollbar colors based on current theme
    const style = document.createElement('style');
    style.id = 'dynamic-scrollbar-style';

    if (baseTheme === 'dark') {
        style.textContent = `
            * { scrollbar-color: #2563eb #0f172a !important; }
            ::-webkit-scrollbar-track { background: #0f172a !important; }
            ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #2563eb, #0891b2) !important; border: 2px solid #0f172a !important; }
            ::-webkit-scrollbar-corner { background: #0f172a !important; }
        `;
    } else {
        style.textContent = `
            * { scrollbar-color: #2563eb #f1f5f9 !important; }
            ::-webkit-scrollbar-track { background: #f1f5f9 !important; }
            ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #2563eb, #0891b2) !important; border: 2px solid #f1f5f9 !important; }
            ::-webkit-scrollbar-corner { background: #f1f5f9 !important; }
        `;
    }

    document.head.appendChild(style);
}

function toggleBaseTheme() {
    setBaseTheme(baseTheme === 'light' ? 'dark' : 'light');
}

function updateThemeToggleButton() {
    // Update header toggle button
    const headerToggle = document.getElementById('header-theme-toggle');
    if (headerToggle) {
        const icon = headerToggle.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = baseTheme === 'dark' ? '☀️' : '🌙';
        }
    }
}

// Initialize base theme from localStorage or default to dark
function initBaseTheme() {
    const saved = localStorage.getItem('baseTheme');
    // If no saved preference, default to dark
    const themeToUse = saved || 'dark';

    // Apply immediately without full setBaseTheme to avoid console log on load
    if (themeToUse === 'dark') {
        document.body.classList.add('dark-theme');
    }
    baseTheme = themeToUse;

    // Update buttons and scrollbar after a short delay to ensure DOM is ready
    setTimeout(() => {
        updateThemeToggleButton();
        forceScrollbarRefresh();
    }, 100);
}

// ============= DECORATIVE THEMES (for DevTools) =============
function cambiaTemaSito(temaNome) {
    // Don't change if presentation mode is active
    if (presentationModeActive) {
        console.log('⚠️ Temi decorativi bloccati durante la presentazione');
        return;
    }

    const temi = {
        'foresta': {
            primary: '#10b981',
            secondary: '#059669',
            accent: '#34d399',
            dark: baseTheme === 'dark' ? '#064e3b' : '#f0fdf4',
            card: baseTheme === 'dark' ? '#042c19' : '#ffffff'
        },
        'tramonto': {
            primary: '#f59e0b',
            secondary: '#ef4444',
            accent: '#fbbf24',
            dark: baseTheme === 'dark' ? '#18181b' : '#fffbeb',
            card: baseTheme === 'dark' ? '#27272a' : '#ffffff'
        },
        'cyberpunk': {
            primary: '#ec4899',
            secondary: '#8b5cf6',
            accent: '#06b6d4',
            dark: baseTheme === 'dark' ? '#0f0f23' : '#fdf4ff',
            card: baseTheme === 'dark' ? '#1e1e3f' : '#ffffff'
        },
        'neon': {
            primary: '#a855f7',
            secondary: '#ec4899',
            accent: '#22d3ee',
            dark: baseTheme === 'dark' ? '#0a0a0f' : '#faf5ff',
            card: baseTheme === 'dark' ? '#1a1a2e' : '#ffffff'
        },
        'ghiaccio': {
            primary: '#3b82f6',
            secondary: '#06b6d4',
            accent: '#38bdf8',
            dark: baseTheme === 'dark' ? '#020617' : '#f0f9ff',
            card: baseTheme === 'dark' ? '#0f172a' : '#ffffff'
        },
        'toxic': {
            primary: '#84cc16',
            secondary: '#22c55e',
            accent: '#facc15',
            dark: baseTheme === 'dark' ? '#14120b' : '#f7fee7',
            card: baseTheme === 'dark' ? '#1c1917' : '#ffffff'
        }
    };

    const tema = temi[temaNome];
    if (tema) {
        let overlay = document.querySelector('.theme-transition-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'theme-transition-overlay';
            document.body.appendChild(overlay);
        }

        overlay.style.background = `radial-gradient(circle, ${tema.primary}, ${tema.dark})`;
        setTimeout(() => overlay.classList.add('active'), 10);

        setTimeout(() => {
            currentTheme = temaNome;
            document.documentElement.style.setProperty('--primary-color', tema.primary);
            document.documentElement.style.setProperty('--secondary-color', tema.secondary);
            document.documentElement.style.setProperty('--accent-color', tema.accent);
            document.documentElement.style.setProperty('--dark-bg', tema.dark);
            document.documentElement.style.setProperty('--card-bg', tema.card);

            const bgAnimation = document.getElementById('bgAnimation');
            bgAnimation.classList.remove('theme-foresta', 'theme-tramonto',
                'theme-cyberpunk', 'theme-neon', 'theme-ghiaccio', 'theme-toxic');
            bgAnimation.classList.add(`theme-${temaNome}`);

            setTimeout(() => {
                overlay.classList.remove('active');
            }, 100);

            console.log(`✨ Tema "${temaNome}" applicato!`);
        }, 200);

    } else {
        console.log('❌ Tema non trovato! Temi disponibili: tramonto, foresta, cyberpunk, neon, ghiaccio, toxic');
    }
}

let currentTheme = 'default';
const themeColors = {
    'default': ['#2563eb', '#0891b2', '#f59e0b', '#10b981', '#06b6d4'],
    'foresta': ['#10b981', '#059669', '#34d399', '#22c55e', '#86efac'],
    'tramonto': ['#f59e0b', '#ef4444', '#fbbf24', '#fb923c', '#fdba74'],
    'cyberpunk': ['#ec4899', '#8b5cf6', '#a855f7', '#f43f5e', '#d946ef'],
    'neon': ['#a855f7', '#ec4899', '#22d3ee', '#f472b6', '#c084fc'],
    'ghiaccio': ['#3b82f6', '#06b6d4', '#38bdf8', '#60a5fa', '#7dd3fc'],
    'toxic': ['#84cc16', '#22c55e', '#facc15', '#a3e635', '#4ade80']
};

// Reset to default theme (respects light/dark base)
function resetToDefaultTheme() {
    currentTheme = 'default';

    // Reset CSS variables to defaults
    document.documentElement.style.setProperty('--primary-color', '#2563eb');
    document.documentElement.style.setProperty('--secondary-color', '#0891b2');
    document.documentElement.style.setProperty('--accent-color', '#f59e0b');

    // Remove decorative theme classes and force refresh
    const bgAnimation = document.getElementById('bgAnimation');
    if (bgAnimation) {
        // Remove all theme classes
        bgAnimation.classList.remove('theme-foresta', 'theme-tramonto',
            'theme-cyberpunk', 'theme-neon', 'theme-ghiaccio', 'theme-toxic');

        // Force DOM refresh to clear pseudo-element styles
        const parent = bgAnimation.parentNode;
        const clone = bgAnimation.cloneNode(true);
        parent.removeChild(bgAnimation);
        parent.insertBefore(clone, parent.firstChild);
    }

    // Restore base theme colors
    if (baseTheme === 'dark') {
        document.documentElement.style.setProperty('--dark-bg', '#0f172a');
        document.documentElement.style.setProperty('--card-bg', '#1e293b');
    } else {
        document.documentElement.style.setProperty('--dark-bg', '#f8fafc');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
    }

    console.log('🔄 Tema resettato ai valori predefiniti');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initBaseTheme);
