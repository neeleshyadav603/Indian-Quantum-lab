(function() {
    'use strict';

    let currentPost = null;
    let allPosts = window.BLOG_POSTS || [];

    function init() {
        const postId = getPostIdFromURL();
        currentPost = allPosts.find(p => p.slug === postId || p.id === postId);

        if (!currentPost) {
            show404();
            return;
        }

        renderPost();
        setupTOC();
        setupShare();
        setupReadingProgress();
        setupPrevNext();
        setupRelatedPosts();
        setupCopyCode();
        
        // Run Prism highlighting after content is injected
        if (window.Prism) {
            window.Prism.highlightAll();
        }
    }

    function getPostIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id') || 'introduction-to-qubits';
    }

    function show404() {
        document.getElementById('postTitle').textContent = 'Article Not Found';
        document.getElementById('postContent').innerHTML = `
            <p>The article you're looking for doesn't exist. <a href="/blog.html">Browse all articles</a>.</p>
        `;
    }

    function renderPost() {
        // Meta tags
        document.getElementById('pageTitle').textContent = `${currentPost.title} — Indian Quantum Lab`;
        document.getElementById('metaDescription').setAttribute('content', currentPost.excerpt);
        
        // Post content
        document.getElementById('postTitle').textContent = currentPost.title;
        document.getElementById('postCategory').textContent = currentPost.categoryLabel;
        document.getElementById('postDate').textContent = window.formatBlogDate(currentPost.date);
        document.getElementById('postReadTime').textContent = `${currentPost.readTime} min read`;
        document.getElementById('postViews').textContent = formatViews(currentPost.views);
        document.getElementById('postContent').innerHTML = currentPost.content;

        // Author
        document.getElementById('authorAvatar').textContent = currentPost.author.initials;
        document.getElementById('authorName').textContent = currentPost.author.name;
        document.getElementById('authorCardAvatar').textContent = currentPost.author.initials;
        document.getElementById('authorCardName').textContent = currentPost.author.name;

        // Tags
        const tagClass = window.getTagClass(currentPost.category);
        document.getElementById('postTags').innerHTML = currentPost.tags
            .map(tag => `<span class="tag-pill ${tagClass}">#${tag}</span>`)
            .join('');

        // BibTeX citation
        if (currentPost.bibtex) {
            const citationSection = document.getElementById('postCitation');
            citationSection.style.display = 'block';
            document.getElementById('bibtexContent').textContent = currentPost.bibtex;
            
            document.getElementById('copyBibtex').addEventListener('click', () => {
                copyToClipboard(currentPost.bibtex, 'BibTeX copied!');
            });
        }
    }

    function formatViews(views) {
        if (views >= 1000) return (views / 1000).toFixed(1) + 'k views';
        return views + ' views';
    }

    function setupTOC() {
        const toc = document.getElementById('toc');
        const headings = document.querySelectorAll('#postContent h2, #postContent h3');
        
        if (headings.length === 0) {
            toc.parentElement.style.display = 'none';
            return;
        }

        let html = '';
        headings.forEach((heading, index) => {
            const level = heading.tagName.toLowerCase();
            const id = heading.id || `section-${index}`;
            if (!heading.id) heading.id = id;
            
            const text = heading.textContent;
            html += `<a href="#${id}" class="toc-link toc-${level}" data-section="${id}">${text}</a>`;
        });
        
        toc.innerHTML = html;

        // Smooth scroll + active state on scroll
        const links = toc.querySelectorAll('.toc-link');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Intersection observer for active TOC
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const link = toc.querySelector(`[data-section="${id}"]`);
                if (!link) return;

                if (entry.isIntersecting) {
                    links.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        }, { 
            rootMargin: '-80px 0px -70% 0px',
            threshold: 0 
        });

        headings.forEach(h => observer.observe(h));
    }

    function setupShare() {
        const url = window.location.href;
        const title = currentPost.title;
        const text = currentPost.excerpt;

        // Twitter
        document.getElementById('shareTwitter').addEventListener('click', () => {
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
            window.open(twitterUrl, '_blank', 'width=550,height=420');
        });

        // LinkedIn
        document.getElementById('shareLinkedIn').addEventListener('click', () => {
            const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            window.open(linkedinUrl, '_blank', 'width=550,height=420');
        });

        // Copy link
        document.getElementById('shareCopy').addEventListener('click', () => {
            copyToClipboard(url, 'Link copied!');
        });
    }

    function setupReadingProgress() {
        const progressBar = document.getElementById('readingProgressBar');
        const post = document.querySelector('.blog-post');
        
        if (!progressBar || !post) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = Math.min(100, progress) + '%';
        });
    }

    function setupPrevNext() {
        const currentIndex = allPosts.findIndex(p => p.id === currentPost.id);
        const prev = allPosts[currentIndex - 1];
        const next = allPosts[currentIndex + 1];

        const prevBtn = document.getElementById('prevPost');
        const nextBtn = document.getElementById('nextPost');

        if (prev) {
            prevBtn.href = `/blog-post.html?id=${prev.slug}`;
            prevBtn.querySelector('.nav-title').textContent = prev.title;
        } else {
            prevBtn.style.display = 'none';
        }

        if (next) {
            nextBtn.href = `/blog-post.html?id=${next.slug}`;
            nextBtn.querySelector('.nav-title').textContent = next.title;
        } else {
            nextBtn.style.display = 'none';
        }
    }

    function setupRelatedPosts() {
        const container = document.getElementById('relatedPosts');
        if (!container) return;

        // Find related posts (same category, then by tag overlap)
        const related = allPosts
            .filter(p => p.id !== currentPost.id)
            .map(p => {
                let score = 0;
                if (p.category === currentPost.category) score += 5;
                const tagOverlap = p.tags.filter(t => currentPost.tags.includes(t)).length;
                score += tagOverlap * 2;
                return { post: p, score };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map(item => item.post);

        container.innerHTML = related.map(post => `
            <a href="/blog-post.html?id=${post.slug}" class="related-post-item">
                <div class="related-post-title">${post.title}</div>
                <div class="related-post-meta">${window.formatBlogDate(post.date)} · ${post.readTime} min</div>
            </a>
        `).join('');
    }

    function setupCopyCode() {
        // Add copy buttons to all code blocks
        document.querySelectorAll('#postContent pre').forEach(pre => {
            const btn = document.createElement('button');
            btn.className = 'code-copy-btn';
            btn.textContent = 'Copy';
            btn.addEventListener('click', () => {
                const code = pre.querySelector('code');
                if (code) {
                    copyToClipboard(code.textContent, 'Code copied!');
                    btn.textContent = 'Copied!';
                    setTimeout(() => btn.textContent = 'Copy', 2000);
                }
            });
            pre.style.position = 'relative';
            pre.appendChild(btn);
        });
    }

    function copyToClipboard(text, message) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showToast(message);
            }).catch(() => {
                fallbackCopy(text, message);
            });
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
        // Remove existing toasts
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

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();