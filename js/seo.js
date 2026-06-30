/**
 * Indian Quantum Lab - Auto SEO Head Injector
 * Automatically sets title, meta tags, OG, Twitter cards per page
 */
(function() {
    'use strict';

    // ==================== PAGE CONFIG ====================
    // Sirf yahan data add/edit karein - baaki sab automatic hai
    const SITE = {
        name: 'Indian Quantum Lab',
        domain: 'https://virtualquantumlab.app',
        defaultImage: '/assets/images/default.jpg',
        twitterHandle: '@indianquantumlab',
        gaId: 'G-XXXXXXXXXX' // ← Apna GA4 ID yahan daalein
    };

    const PAGES = {
        'index.html': {
            title: 'Learn Quantum Computing',
            desc: "India's open educational platform for quantum computing — free courses, virtual labs, and research resources for every student."
        },
        'about.html': {
            title: 'About Indian Quantum Lab',
            desc: 'Our mission to make quantum computing education accessible to every Indian student. Meet the team and our journey.'
        },
        'courses.html': {
            title: 'Quantum Course',
            desc: 'Structured video courses from beginner to advanced quantum computing with progress tracking and certificates.'
        },
        'course-single.html': {
            title: 'Quantum Course',
            desc: 'Watch quantum computing lectures, track your progress, and earn completion certificates.'
        },
        'learn.html': {
            title: 'Learning Pathways',
            desc: 'Follow structured lessons from fundamentals to cutting-edge research. Track progress across beginner, intermediate, and advanced tracks.'
        },
        'blog.html': {
            title: 'Quantum Blog',
            desc: 'Deep dives into quantum computing concepts, algorithms, research breakthroughs, and practical tutorials.'
        },
        'blog-post.html': {
            title: 'Quantum Article',
            desc: 'Read in-depth articles on quantum computing topics with code examples and visual explanations.'
        },
        'research.html': {
            title: 'Quantum Research',
            desc: 'Curated publications, open problems, and current research explorations pushing the boundaries of quantum computing.'
        },
        'virtual-lab.html': {
            title: 'Virtual Lab',
            desc: 'Build and simulate quantum circuits in your browser with drag-and-drop gates and real-time state vector visualization.'
        },
        'quiz.html': {
            title: 'Quantum Quiz',
            desc: 'Test your quantum knowledge with interactive quizzes on basics, gates, algorithms, hardware, and cryptography.'
        },
        'glossary.html': {
            title: 'Quantum Glossary',
            desc: 'Comprehensive quantum computing glossary with 44+ terms defined, linked, and searchable alphabetically.'
        },
        'community.html': {
            title: 'Community',
            desc: "Join India's growing quantum computing community on Discord, Telegram, and GitHub. Learn and build together."
        },
        'resources.html': {
            title: 'Learning Resources',
            desc: 'Hand-picked books, courses, papers, YouTube channels, and tools to deepen your quantum knowledge.'
        },
        'downloads.html': {
            title: 'Downloads',
            desc: 'Free software tools, course notes, research datasets, and educational resources for quantum computing.'
        },
        'contact.html': {
            title: 'Contact us',
            desc: 'Get in touch with questions, collaborations, speaking invitations, or feedback. We respond within 48 hours.'
        },
        'faq.html': {
            title: 'Frequently Asked Questions',
            desc: 'Frequently asked questions about Indian Quantum Lab, courses, certificates, and technical requirements.'
        },
        'roadmap.html': {
            title: 'Roadmap',
            desc: "Public product roadmap showing what we're planning, building, and have shipped. Vote on features."
        },
        'changelog.html': {
            title: 'Changelog',
            desc: 'Version history and changelog for Indian Quantum Lab. See what\'s new, improved, and fixed.'
        },
        '404.html': {
            title: 'Page Not Found',
            desc: 'The page you are looking for does not exist or has been moved.'
        }
    };

    // ==================== AUTO INJECTOR ====================
    function init() {
        // Current page detect karein
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        const pageData = PAGES[filename];

        if (!pageData) {
            console.warn('SEO: No config found for', filename);
            return;
        }

        const fullTitle = pageData.title + ' | ' + SITE.name;
        const fullUrl = SITE.domain + '/' + (filename === 'index.html' ? '' : filename);
        const imageUrl = SITE.domain + SITE.defaultImage;

        // Title set karein
        document.title = fullTitle;

        // Meta description
        setMeta('name', 'description', pageData.desc);

        // Canonical URL
        setLink('canonical', fullUrl);

        // Open Graph tags
        setMeta('property', 'og:type', 'website');
        setMeta('property', 'og:title', fullTitle);
        setMeta('property', 'og:description', pageData.desc);
        setMeta('property', 'og:url', fullUrl);
        setMeta('property', 'og:image', imageUrl);
        setMeta('property', 'og:site_name', SITE.name);
        setMeta('property', 'og:locale', 'en_IN');

        // Twitter Card tags
        setMeta('name', 'twitter:card', 'summary_large_image');
        setMeta('name', 'twitter:title', fullTitle);
        setMeta('name', 'twitter:description', pageData.desc);
        setMeta('name', 'twitter:image', imageUrl);
        setMeta('name', 'twitter:site', SITE.twitterHandle);
        // Additional SEO Meta Tags
        setMeta('name', 'author', 'Neelesh Kumar');
        setMeta('name', 'robots', 'index, follow');
        setMeta('name', 'keywords', 'Quantum Computing, Quantum Machine Learning, Qiskit, Quantum AI, Quantum Education, Indian Quantum Lab, Quantum Research');
        setMeta('name', 'theme-color', '#0b1020');

        setMeta('property', 'og:image:alt', 'Indian Quantum Lab');
        setMeta('property', 'og:image:type', 'image/jpeg');
        // Google Analytics inject karein
        if (SITE.gaId && SITE.gaId !== 'G-XXXXXXXXXX') {
            injectAnalytics(SITE.gaId);
        }

        // Service Worker register karein
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                    .then(function(reg) { console.log('SW registered:', reg.scope); })
                    .catch(function(err) { console.log('SW failed:', err); });
            });
        }
    }

    // Helper: Meta tag create/update karein
    function setMeta(attr, value, content) {
        var el = document.querySelector('meta[' + attr + '="' + value + '"]');
        if (el) {
            el.setAttribute('content', content);
        } else {
            el = document.createElement('meta');
            el.setAttribute(attr, value);
            el.setAttribute('content', content);
            document.head.appendChild(el);
        }
    }

    // Helper: Link tag create/update karein
    function setLink(rel, href) {
        var el = document.querySelector('link[rel="' + rel + '"]');
        if (el) {
            el.setAttribute('href', href);
        } else {
            el = document.createElement('link');
            el.setAttribute('rel', rel);
            el.setAttribute('href', href);
            document.head.appendChild(el);
        }
    }

    // Helper: Google Analytics dynamically load karein
    function injectAnalytics(gaId) {
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', gaId);
    }
    injectStructuredData({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Indian Quantum Lab",
    "url": "https://virtualquantumlab.app",
    "logo": "https://virtualquantumlab.app/assets/icons/logo.png",
    "description": "Indian Quantum Lab is an open platform for Quantum Computing education, research, tutorials, and open-source learning.",
    "sameAs": [
        "https://github.com/neeleshyadav603",
        "https://www.linkedin.com/company/indian-quantum-lab/",
        "https://www.youtube.com/@IndianQuantumLab",
        "https://www.instagram.com/indian_quantum_lab/"
    ]
    });
    injectStructuredData({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Indian Quantum Lab",
    "url": "https://virtualquantumlab.app",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://virtualquantumlab.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
    }
    });
    function injectStructuredData(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    }
    // Run immediately
    init();

})();