/**
 * Indian Quantum Lab - Main Utilities
 * Handles lazy loading, smooth scroll, external links, reading time, 
 * clipboard utilities, and number animations.
 */
(function() {
    'use strict';

    const IQ = window.IQ = window.IQ || {};

    // ==================== INITIALIZATION ====================
    document.addEventListener('DOMContentLoaded', () => {
        IQ.initLazyLoading();
        IQ.initSmoothScroll();
        IQ.initExternalLinks();
        IQ.initReadingTime();
        IQ.initNumberAnimations();
        
        // Log initialization in dev mode
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            console.log('Indian Quantum Lab initialized');
        }
    });

    // ==================== LAZY LOADING ====================
    IQ.initLazyLoading = function() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: load all images immediately
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    img.removeAttribute('data-srcset');
                    obs.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px', // Start loading 200px before viewport
            threshold: 0.01
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            observer.observe(img);
        });
    };

    // ==================== SMOOTH SCROLL ====================
    IQ.initSmoothScroll = function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without jump
                    history.pushState(null, null, targetId);
                }
            });
        });
    };

    // ==================== EXTERNAL LINKS ====================
    IQ.initExternalLinks = function() {
        const currentHost = window.location.hostname;
        
        document.querySelectorAll('a[href]').forEach(link => {
            try {
                const url = new URL(link.href, window.location.origin);
                
                // Skip if same host or special protocols
                if (url.hostname === currentHost || 
                    link.href.startsWith('mailto:') || 
                    link.href.startsWith('tel:') ||
                    link.href.startsWith('javascript:')) {
                    return;
                }

                // Add external link attributes
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                
                // Add visual indicator if not already present
                if (!link.querySelector('.external-icon') && !link.classList.contains('no-external-icon')) {
                    const icon = document.createElement('span');
                    icon.className = 'external-icon';
                    icon.innerHTML = ' ↗';
                    icon.style.fontSize = '0.8em';
                    icon.style.opacity = '0.6';
                    link.appendChild(icon);
                }
            } catch (e) {
                // Invalid URL, skip
            }
        });
    };

    // ==================== READING TIME ====================
    IQ.calculateReadingTime = function(text) {
        const wordsPerMinute = 225;
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    };

    IQ.initReadingTime = function() {
        const articleContent = document.querySelector('.post-content, .article-content');
        const readingTimeEl = document.querySelector('[data-reading-time]');
        
        if (articleContent && readingTimeEl) {
            const text = articleContent.innerText;
            readingTimeEl.textContent = IQ.calculateReadingTime(text);
        }
    };

    // ==================== CLIPBOARD UTILITY ====================
    IQ.copyToClipboard = async function(text, feedbackElement) {
        try {
            await navigator.clipboard.writeText(text);
            IQ.showCopyFeedback(feedbackElement, true);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
                IQ.showCopyFeedback(feedbackElement, true);
            } catch (fallbackErr) {
                IQ.showCopyFeedback(feedbackElement, false);
            }
            
            document.body.removeChild(textarea);
            return false;
        }
    };

    IQ.showCopyFeedback = function(element, success) {
        if (!element) return;
        
        const originalText = element.textContent;
        element.textContent = success ? 'Copied!' : 'Failed to copy';
        element.style.color = success ? 'var(--color-success)' : 'var(--color-error)';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = '';
        }, 2000);
    };

    // ==================== NUMBER ANIMATION ====================
    IQ.animateNumbers = function(element, end, duration = 2000) {
        const start = 0;
        const startTime = performance.now();
        const suffix = element.dataset.suffix || '';
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);
            
            element.textContent = current.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    };

    IQ.initNumberAnimations = function() {
        const numbers = document.querySelectorAll('[data-animate-number]');
        
        if (!numbers.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    const endValue = parseInt(entry.target.dataset.animateNumber, 10);
                    if (!isNaN(endValue)) {
                        IQ.animateNumbers(entry.target, endValue);
                        entry.target.dataset.animated = 'true';
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        numbers.forEach(num => observer.observe(num));
    };

})();