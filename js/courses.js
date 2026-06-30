(function() {
    'use strict';

    const filterCheckboxes = document.querySelectorAll('[data-filter]');
    const courseCards = document.querySelectorAll('.course-card');
    const visibleCoursesEl = document.getElementById('visibleCourses');
    const noResultsEl = document.getElementById('noResults');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const clearFiltersBtn2 = document.getElementById('clearFiltersBtn');

    // Filter courses based on selected filters
    function filterCourses() {
        const levelFilters = Array.from(document.querySelectorAll('[data-filter="level"]:checked'))
            .map(cb => cb.value);
        const topicFilters = Array.from(document.querySelectorAll('[data-filter="topic"]:checked'))
            .map(cb => cb.value);

        let visibleCount = 0;

        courseCards.forEach(card => {
            const cardLevel = card.dataset.level;
            const cardTopic = card.dataset.topic;

            const levelMatch = levelFilters.length === 0 || 
                              levelFilters.includes('all') || 
                              levelFilters.includes(cardLevel);
            const topicMatch = topicFilters.length === 0 || topicFilters.includes(cardTopic);

            if (levelMatch && topicMatch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update visible count
        if (visibleCoursesEl) {
            visibleCoursesEl.textContent = visibleCount;
        }

        // Show/hide no results message
        if (visibleCount === 0) {
            noResultsEl.style.display = 'block';
        } else {
            noResultsEl.style.display = 'none';
        }
    }

    // Clear all filters
    function clearFilters() {
        filterCheckboxes.forEach(cb => {
            if (cb.value === 'all') {
                cb.checked = true;
            } else {
                cb.checked = false;
            }
        });
        filterCourses();
    }

    // Update progress bars on course cards
    function updateCourseProgressBars() {
        if (!window.ProgressTracker) return;

        courseCards.forEach(card => {
            const courseLink = card.querySelector('a[href*="course-single"]');
            if (!courseLink) return;

            const courseId = new URL(courseLink.href, window.location.origin).searchParams.get('id');
            if (!courseId) return;

            const totalLectures = parseInt(card.querySelector('.course-stats span').textContent) || 12;
            const progress = window.ProgressTracker.getCourseProgress(courseId, totalLectures);
            
            const progressFill = card.querySelector('.progress-fill');
            const progressText = card.querySelector('.progress-text');

            if (progressFill) {
                progressFill.style.width = progress.percentage + '%';
            }
            if (progressText) {
                progressText.textContent = progress.percentage + '%';
            }
        });
    }

    // Initialize
    function init() {
        // Add event listeners to filter checkboxes
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', filterCourses);
        });

        // Clear filters buttons
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', clearFilters);
        }
        if (clearFiltersBtn2) {
            clearFiltersBtn2.addEventListener('click', clearFilters);
        }

        // Initial filter
        filterCourses();

        // Update progress bars
        updateCourseProgressBars();

        // Listen for progress updates
        window.addEventListener('storage', updateCourseProgressBars);
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();