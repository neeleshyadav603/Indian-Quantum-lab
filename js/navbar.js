(function() {
    'use strict';

    var navbar = document.querySelector('.navbar');
    var hamburger = document.querySelector('.navbar-hamburger');
    var navLinks = document.querySelectorAll('.navbar-link');

    if (!navbar) return;

    function setMenuOpen(isOpen) {
        navbar.classList.toggle('is-open', isOpen);

        if (hamburger) {
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }

        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function toggleMenu() {
        setMenuOpen(!navbar.classList.contains('is-open'));
    }

    function closeMenu() {
        setMenuOpen(false);
    }

    function normalizePath(path) {
        if (!path || path === '/') return '/';
        return path.replace(/\/index\.html$/, '/');
    }

    function highlightActiveLink() {
        var currentPath = normalizePath(window.location.pathname);

        navLinks.forEach(function(link) {
            var linkPath = normalizePath(new URL(link.getAttribute('href'), window.location.origin).pathname);
            link.classList.toggle('active', linkPath === currentPath);
        });
    }

    function init() {
        if (hamburger) {
            hamburger.addEventListener('click', toggleMenu);
        }

        navLinks.forEach(function(link) {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });

        highlightActiveLink();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
