(function() {
    'use strict';

    const STORAGE_KEY = 'quantum-lab-lessons';
    let completedLessons = {};

    function init() {
        loadProgress();
        renderAllTracks();
        setupTrackToggles();
        setupCheckboxes();
        updateAllProgress();
        setupContinueSection();
    }

    function loadProgress() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            completedLessons = saved ? JSON.parse(saved) : {};
        } catch (e) {
            completedLessons = {};
        }
    }

    function saveProgress() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(completedLessons));
        } catch (e) {
            console.error('Error saving progress:', e);
        }
    }

    function renderAllTracks() {
        for (const trackId in window.LEARNING_TRACKS) {
            renderTrack(trackId);
        }
    }

    function renderTrack(trackId) {
        const track = window.LEARNING_TRACKS[trackId];
        const listEl = document.getElementById(`lessons-${trackId}`);
        if (!listEl) return;

        listEl.innerHTML = track.lessons.map((lesson, index) => {
            const isCompleted = completedLessons[lesson.id] === true;
            return `
                <li class="lesson-item ${isCompleted ? 'completed' : ''}" data-lesson-id="${lesson.id}" data-track="${trackId}">
                    <div class="lesson-number">${isCompleted ? '✓' : (index + 1)}</div>
                    <div class="lesson-type-icon" title="${lesson.type}">${lesson.typeIcon}</div>
                    <div class="lesson-info">
                        <h4 class="lesson-title">${lesson.title}</h4>
                        <span class="lesson-time">${lesson.time} · ${lesson.type}</span>
                    </div>
                    <a href="${lesson.link}" class="lesson-link" target="_blank" rel="noopener">
                        ${lesson.type === 'video' ? 'Watch' : lesson.type === 'quiz' ? 'Take' : 'Read'} →
                    </a>
                    <input 
                        type="checkbox" 
                        class="lesson-checkbox" 
                        ${isCompleted ? 'checked' : ''}
                        aria-label="Mark ${lesson.title} as complete"
                    >
                </li>
            `;
        }).join('');
    }

    function setupTrackToggles() {
        document.querySelectorAll('.track-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.track-card');
                const content = card.querySelector('.track-content');
                const isExpanded = card.classList.contains('expanded');

                if (isExpanded) {
                    content.style.display = 'none';
                    card.classList.remove('expanded');
                    btn.setAttribute('aria-expanded', 'false');
                    btn.querySelector('span').textContent = 'View Lessons';
                } else {
                    content.style.display = 'block';
                    card.classList.add('expanded');
                    btn.setAttribute('aria-expanded', 'true');
                    btn.querySelector('span').textContent = 'Hide Lessons';
                }
            });
        });
    }

    function setupCheckboxes() {
        document.querySelectorAll('.lesson-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const item = e.target.closest('.lesson-item');
                const lessonId = item.dataset.lessonId;

                if (e.target.checked) {
                    completedLessons[lessonId] = true;
                    item.classList.add('completed');
                    const numEl = item.querySelector('.lesson-number');
                    if (numEl) numEl.textContent = '✓';
                } else {
                    delete completedLessons[lessonId];
                    item.classList.remove('completed');
                    const numEl = item.querySelector('.lesson-number');
                    const index = Array.from(item.parentNode.children).indexOf(item);
                    if (numEl) numEl.textContent = index + 1;
                }

                saveProgress();
                updateAllProgress();
                updateContinueSection();
                updateTotalCompleted();
            });
        });
    }

    function updateAllProgress() {
        for (const trackId in window.LEARNING_TRACKS) {
            updateTrackProgress(trackId);
        }
        updateTotalCompleted();
    }

    function updateTrackProgress(trackId) {
        const track = window.LEARNING_TRACKS[trackId];
        const card = document.querySelector(`.track-card[data-track="${trackId}"]`);
        if (!card) return;

        let completed = 0;
        track.lessons.forEach(lesson => {
            if (completedLessons[lesson.id]) completed++;
        });

        const percentage = Math.round((completed / track.totalLessons) * 100);

        // Update progress circle
        const circle = card.querySelector('.progress-circle');
        if (circle) {
            circle.setAttribute('data-progress', percentage);
            const path = circle.querySelector('.progress-bar');
            if (path) path.setAttribute('stroke-dasharray', `${percentage}, 100`);
            const text = circle.querySelector('.progress-text');
            if (text) text.textContent = percentage + '%';
        }

        // Update progress bar
        const fill = card.querySelector('.progress-fill');
        if (fill) fill.style.width = percentage + '%';

        // Update label
        const label = card.querySelector('.progress-label');
        if (label) label.textContent = `${completed} of ${track.totalLessons} lessons complete`;
    }

    function updateTotalCompleted() {
        const total = Object.keys(completedLessons).length;
        const el = document.getElementById('totalCompleted');
        if (el) el.textContent = total;
    }

    function setupContinueSection() {
        const continueBtn = document.getElementById('continueBtn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                const next = findNextLesson();
                if (next) {
                    scrollToLesson(next.trackId, next.lessonId);
                }
            });
        }
        updateContinueSection();
    }

    function findNextLesson() {
        // Priority: find the first incomplete lesson in the first track that has progress
        const tracks = ['beginner', 'intermediate', 'advanced'];
        
        // Check which tracks have progress
        const tracksWithProgress = tracks.filter(trackId => {
            return window.LEARNING_TRACKS[trackId].lessons.some(l => completedLessons[l.id]);
        });

        // Look in tracks with progress first
        for (const trackId of tracksWithProgress) {
            const track = window.LEARNING_TRACKS[trackId];
            for (const lesson of track.lessons) {
                if (!completedLessons[lesson.id]) {
                    return { trackId, lessonId: lesson.id, lesson };
                }
            }
        }

        // Fall back to first incomplete in beginner
        for (const trackId of tracks) {
            const track = window.LEARNING_TRACKS[trackId];
            for (const lesson of track.lessons) {
                if (!completedLessons[lesson.id]) {
                    return { trackId, lessonId: lesson.id, lesson };
                }
            }
        }

        return null;
    }

    function updateContinueSection() {
        const section = document.getElementById('continueSection');
        const lessonEl = document.getElementById('continueLesson');
        if (!section || !lessonEl) return;

        const next = findNextLesson();
        const totalCompleted = Object.keys(completedLessons).length;

        if (next && totalCompleted > 0) {
            section.style.display = 'block';
            lessonEl.innerHTML = `
                Next up: <strong>${next.lesson.title}</strong> in <em>${window.LEARNING_TRACKS[next.trackId].title}</em>
            `;
        } else if (totalCompleted === 0) {
            section.style.display = 'none';
        } else {
            section.style.display = 'block';
            lessonEl.innerHTML = '🎉 You\'ve completed all lessons! Explore our advanced topics or retake quizzes.';
        }
    }

    function scrollToLesson(trackId, lessonId) {
        const card = document.querySelector(`.track-card[data-track="${trackId}"]`);
        if (!card) return;

        // Expand the track
        if (!card.classList.contains('expanded')) {
            const toggle = card.querySelector('.track-toggle');
            if (toggle) toggle.click();
        }

        // Highlight the lesson
        setTimeout(() => {
            const lessonItem = card.querySelector(`[data-lesson-id="${lessonId}"]`);
            if (lessonItem) {
                // Remove previous highlights
                document.querySelectorAll('.lesson-item.highlighted').forEach(el => {
                    el.classList.remove('highlighted');
                });
                lessonItem.classList.add('highlighted');
                lessonItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Remove highlight after 5s
                setTimeout(() => {
                    lessonItem.classList.remove('highlighted');
                }, 5000);
            }
        }, 100);
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();