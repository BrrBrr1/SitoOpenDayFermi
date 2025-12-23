/**
 * Secret Key Sequence to Reveal DevTools
 * Type "fermi" anywhere on the page to reveal the DevTools button
 */

(function() {
    'use strict';
    
    const SECRET_SEQUENCE = 'fermi';
    let typedKeys = '';
    let resetTimeout = null;
    
    // Check if DevTools has been revealed in this session
    const STORAGE_KEY = 'devtools_revealed';
    
    function revealDevTools() {
        const cmdToggle = document.querySelector('.cmd-toggle');
        if (cmdToggle && !cmdToggle.classList.contains('revealed')) {
            cmdToggle.classList.add('revealed');
            
            // Save to session storage so it persists during the session
            sessionStorage.setItem(STORAGE_KEY, 'true');
            
            // Optional: Show a fun message
            showRevealMessage();
        }
    }
    
    function showRevealMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            background: linear-gradient(135deg, #2563eb, #0891b2);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 0.95rem;
            z-index: 10001;
            box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4);
            animation: slideInRight 0.5s ease-out, fadeOutRight 0.5s ease-out 2.5s forwards;
        `;
        message.textContent = '🔓 DevTools Sbloccati!';
        document.body.appendChild(message);
        
        // Add the animation keyframes if not already present
        if (!document.getElementById('secret-sequence-styles')) {
            const style = document.createElement('style');
            style.id = 'secret-sequence-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes fadeOutRight {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove the message after animation
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    function handleKeyPress(e) {
        // Ignore if user is typing in an input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Get the pressed key (lowercase)
        const key = e.key.toLowerCase();
        
        // Only process letter keys
        if (key.length !== 1 || !/[a-z]/.test(key)) {
            return;
        }
        
        // Add key to typed sequence
        typedKeys += key;
        
        // Clear the reset timeout
        if (resetTimeout) {
            clearTimeout(resetTimeout);
        }
        
        // Reset after 2 seconds of no typing
        resetTimeout = setTimeout(() => {
            typedKeys = '';
        }, 2000);
        
        // Keep only the last N characters (length of secret)
        if (typedKeys.length > SECRET_SEQUENCE.length) {
            typedKeys = typedKeys.slice(-SECRET_SEQUENCE.length);
        }
        
        // Check if sequence matches
        if (typedKeys === SECRET_SEQUENCE) {
            revealDevTools();
            typedKeys = '';
        }
    }
    
    function init() {
        // Check if already revealed in this session
        if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
            const cmdToggle = document.querySelector('.cmd-toggle');
            if (cmdToggle) {
                cmdToggle.classList.add('revealed');
            }
        }
        
        // Listen for key presses
        document.addEventListener('keypress', handleKeyPress);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
