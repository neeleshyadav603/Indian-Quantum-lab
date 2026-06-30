(function() {
    'use strict';

    const STORAGE_KEY = 'quantum-lab-quiz-scores';
    let scores = {};
    let currentQuizTopic = null;

    const quizMetadata = {
        basics: { title: 'Quantum Basics', icon: '🧬' },
        gates: { title: 'Quantum Gates', icon: '⚡' },
        algorithms: { title: 'Quantum Algorithms', icon: '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>' },
        hardware: { title: 'Quantum Hardware', icon: '🔧' },
        cryptography: { title: 'Quantum Cryptography', icon: '🔐' }
    };

    function init() {
        loadScores();
        setupQuizCards();
        setupModal();
        setupScoreForm();
        setupClearScores();
        renderScores();
    }

    function loadScores() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            scores = saved ? JSON.parse(saved) : {};
        } catch (e) {
            scores = {};
        }
    }

    function saveScores() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
        } catch (e) {
            console.error('Error saving scores:', e);
        }
    }

    function setupQuizCards() {
        document.querySelectorAll('.quiz-card').forEach(card => {
            const topic = card.dataset.quiz;
            const formUrl = card.dataset.form;
            const btn = card.querySelector('.quiz-take-btn');

            if (btn) {
                btn.addEventListener('click', () => {
                    openQuiz(topic, formUrl);
                });
            }

            // Update best score display
            if (scores[topic] && scores[topic].best !== undefined) {
                const bestScoreEl = card.querySelector('.quiz-best-score');
                if (bestScoreEl) {
                    bestScoreEl.style.display = 'flex';
                    bestScoreEl.querySelector('.score-value').textContent = 
                        scores[topic].best + '% (' + scores[topic].attempts + ' attempts)';
                }
            }
        });
    }

    function openQuiz(topic, formUrl) {
        currentQuizTopic = topic;
        const modal = document.getElementById('quizModal');
        const iframe = document.getElementById('quizIframe');
        const title = document.getElementById('quizModalTitle');

        if (!modal || !iframe || !title) return;

        const meta = quizMetadata[topic] || { title: 'Quiz' };
        title.textContent = meta.title + ' Quiz';
        iframe.src = formUrl;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeQuiz() {
        const modal = document.getElementById('quizModal');
        const iframe = document.getElementById('quizIframe');

        if (modal) modal.style.display = 'none';
        if (iframe) iframe.src = '';
        document.body.style.overflow = '';
        currentQuizTopic = null;
    }

    function setupModal() {
        const closeBtn = document.getElementById('quizClose');
        const modal = document.getElementById('quizModal');

        if (closeBtn) {
            closeBtn.addEventListener('click', closeQuiz);
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeQuiz();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
                closeQuiz();
            }
        });
    }

    function setupScoreForm() {
        const saveBtn = document.getElementById('saveScoreBtn');
        const input = document.getElementById('scoreInput');

        if (!saveBtn || !input) return;

        saveBtn.addEventListener('click', () => {
            const value = parseInt(input.value);
            
            if (isNaN(value) || value < 0 || value > 100) {
                showToast('Please enter a valid score (0-100)');
                return;
            }

            if (!currentQuizTopic) {
                showToast('No quiz selected');
                return;
            }

            saveScore(currentQuizTopic, value);
            input.value = '';
            showToast('Score saved! 🎉');
            renderScores();
            updateCardBestScores();
        });
    }

    function saveScore(topic, score) {
        if (!scores[topic]) {
            scores[topic] = {
                best: score,
                attempts: 1,
                history: [{ score, date: new Date().toISOString() }]
            };
        } else {
            scores[topic].attempts = (scores[topic].attempts || 0) + 1;
            if (score > scores[topic].best) {
                scores[topic].best = score;
            }
            scores[topic].history = scores[topic].history || [];
            scores[topic].history.unshift({ score, date: new Date().toISOString() });
            // Keep only last 20 attempts
            if (scores[topic].history.length > 20) {
                scores[topic].history = scores[topic].history.slice(0, 20);
            }
        }
        saveScores();
    }

    function renderScores() {
        const grid = document.getElementById('scoresGrid');
        const empty = document.getElementById('scoresEmpty');

        if (!grid || !empty) return;

        const topics = Object.keys(scores);

        if (topics.length === 0) {
            grid.style.display = 'none';
            empty.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        empty.style.display = 'none';

        grid.innerHTML = topics.map(topic => {
            const data = scores[topic];
            const meta = quizMetadata[topic] || { title: topic, icon: '❓' };
            const lastAttempt = data.history && data.history[0];
            const lastDate = lastAttempt ? new Date(lastAttempt.date).toLocaleDateString('en-IN', {
                month: 'short', day: 'numeric', year: 'numeric'
            }) : '';

            const scoreClass = getScoreClass(data.best);

            return `
                <div class="score-card">
                    <div class="score-card-top">
                        <span class="score-card-icon">${meta.icon}</span>
                        <span class="score-card-date">${lastDate}</span>
                    </div>
                    <h3 class="score-card-title">${meta.title}</h3>
                    <div class="score-card-score ${scoreClass}">${data.best}%</div>
                    <div class="score-card-bar">
                        <div class="score-card-bar-fill" style="width: ${data.best}%"></div>
                    </div>
                    <div style="font-size: var(--text-xs); color: var(--text-tertiary); font-family: var(--font-mono);">
                        ${data.attempts || 1} attempt${data.attempts > 1 ? 's' : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    function getScoreClass(score) {
        if (score >= 80) return 'score-high';
        if (score >= 50) return 'score-medium';
        return 'score-low';
    }

    function updateCardBestScores() {
        document.querySelectorAll('.quiz-card').forEach(card => {
            const topic = card.dataset.quiz;
            const bestScoreEl = card.querySelector('.quiz-best-score');
            if (bestScoreEl && scores[topic]) {
                bestScoreEl.style.display = 'flex';
                bestScoreEl.querySelector('.score-value').textContent = 
                    scores[topic].best + '% (' + (scores[topic].attempts || 1) + ' attempts)';
            }
        });
    }

    function setupClearScores() {
        const btn = document.getElementById('clearScoresBtn');
        if (!btn) return;

        btn.addEventListener('click', () => {
            if (Object.keys(scores).length === 0) {
                showToast('No scores to clear');
                return;
            }

            if (confirm('Are you sure you want to clear all quiz scores? This cannot be undone.')) {
                scores = {};
                saveScores();
                renderScores();
                updateCardBestScores();
                showToast('All scores cleared');
            }
        });
    }

    function showToast(message) {
        document.querySelectorAll('.toast').forEach(t => t.remove());

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background-color: var(--color-primary);
            color: var(--color-accent);
            padding: 12px 24px;
            border-radius: 8px;
            border: 1px solid var(--color-accent);
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            opacity: 0;
            transition: all 0.3s;
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
            toast.style.opacity = '1';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();