(function() {
    'use strict';

    class SearchEngine {
        constructor() {
            this.posts = window.BLOG_POSTS || [];
            this.searchInput = null;
            this.resultsCallback = null;
            this.debounceTimer = null;
            this.currentQuery = '';
        }

        init(inputElement, callback) {
            this.searchInput = inputElement;
            this.resultsCallback = callback;

            if (!this.searchInput) return;

            this.searchInput.addEventListener('input', (e) => {
                this.handleInput(e.target.value);
            });

            // Handle clear button
            const clearBtn = document.getElementById('searchClear');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    this.searchInput.value = '';
                    this.handleInput('');
                    this.searchInput.focus();
                });
            }
        }

        handleInput(query) {
            this.currentQuery = query.trim().toLowerCase();

            // Toggle clear button
            const clearBtn = document.getElementById('searchClear');
            if (clearBtn) {
                clearBtn.style.display = query ? 'flex' : 'none';
            }

            // Debounce
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                this.performSearch();
            }, 300);
        }

        performSearch() {
            if (!this.currentQuery) {
                if (this.resultsCallback) {
                    this.resultsCallback(this.posts, this.currentQuery);
                }
                return;
            }

            const query = this.currentQuery;
            const queryTerms = query.split(/\s+/).filter(t => t.length > 0);

            // Score and filter posts
            const results = this.posts
                .map(post => ({
                    post,
                    score: this.calculateRelevance(post, queryTerms)
                }))
                .filter(item => item.score > 0)
                .sort((a, b) => b.score - a.score)
                .map(item => item.post);

            if (this.resultsCallback) {
                this.resultsCallback(results, query);
            }
        }

        calculateRelevance(post, queryTerms) {
            let score = 0;
            const titleLower = post.title.toLowerCase();
            const excerptLower = post.excerpt.toLowerCase();
            const tagsJoined = post.tags.join(' ').toLowerCase();
            const categoryLower = (post.categoryLabel || '').toLowerCase();

            for (const term of queryTerms) {
                // Title match (highest weight)
                if (titleLower.includes(term)) {
                    score += 10;
                    if (titleLower.startsWith(term)) score += 5;
                }

                // Tag match
                if (tagsJoined.includes(term)) {
                    score += 5;
                }

                // Category match
                if (categoryLower.includes(term)) {
                    score += 3;
                }

                // Excerpt match
                if (excerptLower.includes(term)) {
                    score += 2;
                }
            }

            // Boost for exact phrase match
            const exactQuery = queryTerms.join(' ');
            if (titleLower.includes(exactQuery)) score += 20;
            if (excerptLower.includes(exactQuery)) score += 5;

            return score;
        }

        highlightText(text, query) {
            if (!query) return this.escapeHtml(text);
            
            const queryTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);
            let result = this.escapeHtml(text);
            
            for (const term of queryTerms) {
                if (term.length < 2) continue;
                const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
                result = result.replace(regex, '<mark>$1</mark>');
            }
            
            return result;
        }

        escapeHtml(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        escapeRegex(str) {
            return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        getQuery() {
            return this.currentQuery;
        }
    }

    // Create global instance
    window.BlogSearch = new SearchEngine();

})();