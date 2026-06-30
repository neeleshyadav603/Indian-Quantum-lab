(function() {
    'use strict';

    const POSTS_PER_PAGE = 9;
    let currentPage = 1;
    let currentFilter = 'all';
    let filteredPosts = window.BLOG_POSTS || [];
    let displayedPosts = [];

    // DOM Elements
    const blogGrid = document.getElementById('blogGrid');
    const pagination = document.getElementById('pagination');
    const resultsCount = document.getElementById('resultsCount');
    const noResults = document.getElementById('noResults');
    const filtersContainer = document.getElementById('blogFilters');
    const sortSelect = document.getElementById('blogSort');
    const resetBtn = document.getElementById('resetFilters');

    // Initialize
    function init() {
        setupFilters();
        setupSort();
        setupSearch();
        setupReset();
        render();
    }

    function setupSearch() {
        const searchInput = document.getElementById('blogSearch');
        if (searchInput && window.BlogSearch) {
            window.BlogSearch.init(searchInput, (results, query) => {
                displayedPosts = query ? results : applyFilters();
                currentPage = 1;
                render();
            });
        }
    }

    function setupFilters() {
        if (!filtersContainer) return;
        
        filtersContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;

            filtersContainer.querySelectorAll('.filter-btn').forEach(b => 
                b.classList.remove('active')
            );
            btn.classList.add('active');

            currentFilter = btn.dataset.filter;
            currentPage = 1;
            displayedPosts = applyFilters();
            render();
        });
    }

    function setupSort() {
        if (!sortSelect) return;
        sortSelect.addEventListener('change', () => {
            displayedPosts = applyFilters();
            render();
        });
    }

    function setupReset() {
        if (!resetBtn) return;
        resetBtn.addEventListener('click', () => {
            const searchInput = document.getElementById('blogSearch');
            if (searchInput) {
                searchInput.value = '';
                window.BlogSearch.handleInput('');
            }
            filtersContainer.querySelectorAll('.filter-btn').forEach(b => 
                b.classList.remove('active')
            );
            filtersContainer.querySelector('[data-filter="all"]').classList.add('active');
            currentFilter = 'all';
            currentPage = 1;
            displayedPosts = applyFilters();
            render();
        });
    }

    function applyFilters() {
        let posts = [...(window.BLOG_POSTS || [])];

        // Apply category filter
        if (currentFilter !== 'all') {
            posts = posts.filter(p => p.category === currentFilter);
        }

        // Apply sort
        const sort = sortSelect ? sortSelect.value : 'newest';
        if (sort === 'newest') {
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sort === 'oldest') {
            posts.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (sort === 'popular') {
            posts.sort((a, b) => b.views - a.views);
        }

        return posts;
    }

    function render() {
        if (!blogGrid) return;

        // Use search results if available, else filtered
        const postsToShow = displayedPosts.length > 0 || window.BlogSearch.getQuery() 
            ? displayedPosts 
            : applyFilters();

        // Pagination
        const totalPages = Math.max(1, Math.ceil(postsToShow.length / POSTS_PER_PAGE));
        if (currentPage > totalPages) currentPage = totalPages;
        
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        const pagePosts = postsToShow.slice(startIndex, endIndex);

        // Show/hide no results
        if (postsToShow.length === 0) {
            noResults.style.display = 'block';
            blogGrid.innerHTML = '';
            pagination.innerHTML = '';
            resultsCount.textContent = 'No articles found';
            return;
        }

        noResults.style.display = 'none';

        // Render cards
        const query = window.BlogSearch.getQuery();
        blogGrid.innerHTML = pagePosts.map(post => createCard(post, query)).join('');

        // Render pagination
        renderPagination(totalPages);

        // Update count
        resultsCount.textContent = `Showing ${pagePosts.length} of ${postsToShow.length} articles`;
    }

    function createCard(post, query) {
        const tagClass = window.getTagClass(post.category);
        const title = query && window.BlogSearch 
            ? window.BlogSearch.highlightText(post.title, query) 
            : post.title;
        const excerpt = query && window.BlogSearch 
            ? window.BlogSearch.highlightText(post.excerpt, query) 
            : post.excerpt;

        return `
            <a href="/blog-post.html?id=${post.slug}" class="blog-card">
                <div class="blog-card-image">
                    <span>${post.image}</span>
                </div>
                <div class="blog-card-body">
                    <div class="blog-card-meta">
                        <span class="blog-card-category">${post.categoryLabel}</span>
                        <span>·</span>
                        <span>${window.formatBlogDate(post.date)}</span>
                        <span>·</span>
                        <span>${post.readTime} min read</span>
                    </div>
                    <h3 class="blog-card-title">${title}</h3>
                    <p class="blog-card-excerpt">${excerpt}</p>
                    <div class="blog-card-tags">
                        ${post.tags.slice(0, 3).map(tag => 
                            `<span class="tag-pill ${tagClass}">#${tag}</span>`
                        ).join('')}
                    </div>
                    <div class="blog-card-author">
                        <div class="blog-card-author-avatar">${post.author.initials}</div>
                        <span class="blog-card-author-name">${post.author.name}</span>
                    </div>
                </div>
            </a>
        `;
    }

    function renderPagination(totalPages) {
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let html = '';
        
        // Previous
        html += `<button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">‹</button>`;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (totalPages <= 7 || 
                i === 1 || 
                i === totalPages || 
                Math.abs(i - currentPage) <= 1) {
                html += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                html += `<span class="pagination-ellipsis">...</span>`;
            }
        }

        // Next
        html += `<button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">›</button>`;

        pagination.innerHTML = html;

        // Click handlers
        pagination.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = parseInt(btn.dataset.page);
                if (!isNaN(page) && page !== currentPage) {
                    currentPage = page;
                    render();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();