(function() {
    'use strict';

    // ==================== BIBTEX COPY ====================
    window.showBibTeX = function(bibtex, title) {
        const modal = document.getElementById('bibtexModal');
        if (!modal) return;
        
        document.getElementById('bibtexContent').textContent = bibtex;
        document.getElementById('bibtexTitle').textContent = title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeBibTeX = function() {
        const modal = document.getElementById('bibtexModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    window.copyBibTeX = function() {
        const content = document.getElementById('bibtexContent').textContent;
        copyToClipboard(content, 'BibTeX copied to clipboard!');
    };

    // ==================== RESOURCE FILTERS ====================
    window.initResourceFilters = function() {
        const filterBtns = document.querySelectorAll('.resource-filter-btn');
        const cards = document.querySelectorAll('.resource-card');
        const countEl = document.getElementById('resourceCount');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                let visible = 0;
                cards.forEach(card => {
                    if (filter === 'all' || card.dataset.type === filter) {
                        card.style.display = 'flex';
                        visible++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                if (countEl) {
                    countEl.textContent = `Showing ${visible} resource${visible !== 1 ? 's' : ''}`;
                }
            });
        });
    };

    // ==================== FAQ ACCORDION ====================
    window.initFAQ = function() {
        const questions = document.querySelectorAll('.faq-question');
        const categoryBtns = document.querySelectorAll('.faq-category-btn');
        const faqSections = document.querySelectorAll('.faq-section');

        questions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                const isActive = item.classList.contains('active');

                // Close all in same section
                const section = item.closest('.faq-section');
                section.querySelectorAll('.faq-item.active').forEach(i => {
                    if (i !== item) i.classList.remove('active');
                });

                item.classList.toggle('active', !isActive);
            });
        });

        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                faqSections.forEach(section => {
                    if (filter === 'all' || section.dataset.category === filter) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });
    };

    // ==================== SHARED UTILITIES ====================
    function copyToClipboard(text, message) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showToast(message);
            }).catch(() => fallbackCopy(text, message));
        } else {
            fallbackCopy(text, message);
        }
    }

    function fallbackCopy(text, message) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showToast(message);
        } catch (err) {
            console.error('Copy failed:', err);
        }
        document.body.removeChild(textarea);
    }

    function showToast(message) {
        document.querySelectorAll('.toast').forEach(t => t.remove());

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    // ==================== AUTO-INIT ====================
    function autoInit() {
        if (document.querySelectorAll('.resource-filter-btn').length > 0) {
            initResourceFilters();
        }
        if (document.querySelectorAll('.faq-question').length > 0) {
            initFAQ();
        }
        
        // Close BibTeX modal on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeBibTeX();
            }
        });

        // Close BibTeX on backdrop click
        const modal = document.getElementById('bibtexModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeBibTeX();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInit);
    } else {
        autoInit();
    }

})();