(function() {
    'use strict';

    const terms = window.GLOSSARY_TERMS || [];
    let filteredTerms = [...terms];
    let currentQuery = '';

    function init() {
        renderAlphabetNav();
        renderTerms(terms);
        setupSearch();
        setupClearButton();
        updateTermCount();
        handleHashOnLoad();
    }

    function renderAlphabetNav() {
        const nav = document.getElementById('alphabetLetters');
        if (!nav) return;

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const availableLetters = new Set(terms.map(t => t.term.charAt(0).toUpperCase()));

        nav.innerHTML = letters.map(letter => `
            <button 
                class="alphabet-btn" 
                data-letter="${letter}"
                ${!availableLetters.has(letter) ? 'disabled' : ''}
                aria-label="Jump to ${letter}"
            >
                ${letter}
            </button>
        `).join('');

        nav.addEventListener('click', (e) => {
            const btn = e.target.closest('.alphabet-btn');
            if (!btn || btn.disabled) return;

            const letter = btn.dataset.letter;
            scrollToLetter(letter);

            // Highlight active
            nav.querySelectorAll('.alphabet-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    }

    function scrollToLetter(letter) {
        const section = document.getElementById(`letter-${letter}`);
        if (section) {
            const offset = 200; // Account for sticky navbar + search + alphabet
            const top = section.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }

    function renderTerms(termsToShow) {
        const container = document.getElementById('glossaryList');
        const noResults = document.getElementById('noResults');
        if (!container) return;

        if (termsToShow.length === 0) {
            container.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';

        // Group by first letter
        const groups = {};
        termsToShow.forEach(term => {
            const letter = term.term.charAt(0).toUpperCase();
            if (!groups[letter]) groups[letter] = [];
            groups[letter].push(term);
        });

        // Sort letters
        const sortedLetters = Object.keys(groups).sort();

        container.innerHTML = sortedLetters.map(letter => {
            const letterTerms = groups[letter];
            return `
                <div class="glossary-letter-group" id="letter-${letter}">
                    <div class="glossary-letter-header">
                        <div class="glossary-letter-badge">${letter}</div>
                        <div>
                            <h2 class="glossary-letter-title">${getLetterTitle(letter)}</h2>
                            <p class="glossary-letter-count">${letterTerms.length} term${letterTerms.length > 1 ? 's' : ''}</p>
                        </div>
                    </div>
                    <div class="glossary-terms">
                        ${letterTerms.map(t => createTermCard(t)).join('')}
                    </div>
                </div>
            `;
        }).join('');

        // Setup related link clicks
        setupRelatedLinks();
    }

    function getLetterTitle(letter) {
        const map = {
            'A': 'A Terms',
            'B': 'B Terms — Bell States & Bloch Sphere',
            'C': 'C Terms — Circuits & CNOT',
            'D': 'D Terms — Decoherence & Density',
            'E': 'E Terms — Entanglement & Eigenvalues',
            'F': 'F Terms — Fidelity',
            'G': 'G Terms — Gates & Grover',
            'H': 'H Terms — Hadamard & Hilbert',
            'K': 'K Terms — Ket Notation',
            'M': 'M Terms — Measurement',
            'N': 'N Terms — NISQ & No-Cloning',
            'O': 'O Terms — Oracle',
            'P': 'P Terms — Pauli & Phase',
            'Q': 'Q Terms — Qubits & Quantum',
            'S': 'S Terms — Shor, Superposition, Surface Code',
            'T': 'T Terms — Tensor & Topology',
            'U': 'U Terms — Unitary',
            'V': 'V Terms — VQE & Variational'
        };
        return map[letter] || `${letter} Terms`;
    }

    function createTermCard(term) {
        const highlighted = currentQuery ? highlightText(term.term, currentQuery) : term.term;
        const definition = currentQuery ? highlightText(term.definition, currentQuery) : term.definition;

        return `
            <div class="term-card" id="term-${term.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}" data-term="${term.term.toLowerCase()}">
                <h3 class="term-name">${highlighted}</h3>
                <p class="term-definition">${definition}</p>
                ${term.related && term.related.length > 0 ? `
                    <div class="term-related">
                        <span class="term-related-label">Related terms</span>
                        <div class="term-related-links">
                            ${term.related.map(r => `
                                <a href="#" class="term-related-link" data-related="${r.toLowerCase()}">${r}</a>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    function setupRelatedLinks() {
        document.querySelectorAll('.term-related-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const related = link.dataset.related;
                scrollToTerm(related);
            });
        });
    }

    function scrollToTerm(termName) {
        const termEl = document.querySelector(`[data-term="${termName}"]`);
        if (termEl) {
            const offset = 200;
            const top = termEl.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });

            // Highlight temporarily
            document.querySelectorAll('.term-card.highlighted').forEach(el => {
                el.classList.remove('highlighted');
            });
            termEl.classList.add('highlighted');
            setTimeout(() => termEl.classList.remove('highlighted'), 2500);
        } else {
            // Search for it
            const searchInput = document.getElementById('glossarySearch');
            if (searchInput) {
                searchInput.value = termName;
                handleSearch(termName);
            }
        }
    }

    function setupSearch() {
        const input = document.getElementById('glossarySearch');
        if (!input) return;

        let debounceTimer;
        input.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                handleSearch(e.target.value);
            }, 200);
        });
    }

    function handleSearch(query) {
        currentQuery = query.trim().toLowerCase();
        const clearBtn = document.getElementById('glossaryClear');

        if (clearBtn) {
            clearBtn.style.display = currentQuery ? 'flex' : 'none';
        }

        if (!currentQuery) {
            filteredTerms = [...terms];
        } else {
            filteredTerms = terms.filter(t => {
                const haystack = (
                    t.term + ' ' + 
                    t.definition + ' ' + 
                    (t.related || []).join(' ')
                ).toLowerCase();
                return haystack.includes(currentQuery);
            });
        }

        renderTerms(filteredTerms);
        updateResultsCount();
    }

    function setupClearButton() {
        const clearBtn = document.getElementById('glossaryClear');
        const searchInput = document.getElementById('glossarySearch');
        const clearSearchBtn = document.getElementById('clearSearch');

        if (clearBtn && searchInput) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                handleSearch('');
                searchInput.focus();
            });
        }

        if (clearSearchBtn && searchInput) {
            clearSearchBtn.addEventListener('click', () => {
                searchInput.value = '';
                handleSearch('');
                searchInput.focus();
            });
        }
    }

    function updateTermCount() {
        const el = document.getElementById('termCount');
        if (el) el.textContent = `${terms.length} terms`;
    }

    function updateResultsCount() {
        const el = document.getElementById('resultsCount');
        if (!el) return;

        if (currentQuery) {
            el.textContent = `Found ${filteredTerms.length} term${filteredTerms.length !== 1 ? 's' : ''} for "${currentQuery}"`;
        } else {
            el.textContent = `Showing all ${terms.length} terms`;
        }
    }

    function highlightText(text, query) {
        if (!query) return escapeHtml(text);
        const queryTerms = query.split(/\s+/).filter(t => t.length > 0);
        let result = escapeHtml(text);
        for (const term of queryTerms) {
            if (term.length < 2) continue;
            const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
            result = result.replace(regex, '<mark>$1</mark>');
        }
        return result;
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function handleHashOnLoad() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            setTimeout(() => {
                scrollToTerm(hash.replace(/-/g, ' '));
            }, 300);
        }
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();