(function() {
    'use strict';

    const THEME_KEY = 'indian-quantum-lab-theme';
    const THEME_TOGGLE_SELECTOR = '.theme-toggle';

    // Get saved theme or detect system preference
    function getSavedTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved) {
            return saved;
        }
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        return 'light';
    }

    // Apply theme to HTML element
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Add transition class to prevent flash
        document.documentElement.classList.add('theme-transitioning');
        
        setTimeout(function() {
            document.documentElement.classList.remove('theme-transitioning');
        }, 500);
    }

    // Update toggle button icon
    function updateToggleIcon(theme) {
        const toggleBtn = document.querySelector(THEME_TOGGLE_SELECTOR);
        if (!toggleBtn) return;

        const sunIcon = toggleBtn.querySelector('.sun');
        const moonIcon = toggleBtn.querySelector('.moon');

        if (sunIcon && moonIcon) {
            if (theme === 'dark') {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
        }

        // Update aria-label
        toggleBtn.setAttribute('aria-label', 
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }

    // Toggle between themes
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        applyTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
        updateToggleIcon(newTheme);

        // Dispatch custom event for other scripts
        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme: newTheme }
        }));
    }

    // Initialize theme
    function initTheme() {
        const theme = getSavedTheme();
        applyTheme(theme);
        updateToggleIcon(theme);

        // Attach toggle listener
        const toggleBtn = document.querySelector(THEME_TOGGLE_SELECTOR);
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleTheme);
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
                if (!localStorage.getItem(THEME_KEY)) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    applyTheme(newTheme);
                    updateToggleIcon(newTheme);
                }
            });
        }
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Apply theme immediately to prevent flash
    (function() {
        const theme = getSavedTheme();
        document.documentElement.setAttribute('data-theme', theme);
    })();
})();