(function() {
    'use strict';

    const PROGRESS_KEY = 'quantum-lab-progress';
    const LAST_WATCHED_KEY = 'quantum-lab-last-watched';

    // Progress Tracker Class
    class ProgressTracker {
        constructor() {
            this.progress = this.loadProgress();
            this.lastWatched = this.loadLastWatched();
        }

        // Load progress from localStorage
        loadProgress() {
            try {
                const saved = localStorage.getItem(PROGRESS_KEY);
                return saved ? JSON.parse(saved) : {};
            } catch (e) {
                console.error('Error loading progress:', e);
                return {};
            }
        }

        // Save progress to localStorage
        saveProgress() {
            try {
                localStorage.setItem(PROGRESS_KEY, JSON.stringify(this.progress));
            } catch (e) {
                console.error('Error saving progress:', e);
            }
        }

        // Load last watched lecture
        loadLastWatched() {
            try {
                const saved = localStorage.getItem(LAST_WATCHED_KEY);
                return saved ? JSON.parse(saved) : {};
            } catch (e) {
                console.error('Error loading last watched:', e);
                return {};
            }
        }

        // Save last watched lecture
        saveLastWatched(courseId, lectureIndex) {
            try {
                this.lastWatched[courseId] = lectureIndex;
                localStorage.setItem(LAST_WATCHED_KEY, JSON.stringify(this.lastWatched));
            } catch (e) {
                console.error('Error saving last watched:', e);
            }
        }

        // Mark lecture as complete
        markLectureComplete(courseId, lectureIndex) {
            if (!this.progress[courseId]) {
                this.progress[courseId] = {
                    completed: [],
                    total: 0
                };
            }

            if (!this.progress[courseId].completed.includes(lectureIndex)) {
                this.progress[courseId].completed.push(lectureIndex);
                this.saveProgress();
            }

            return this.isLectureComplete(courseId, lectureIndex);
        }

        // Mark lecture as incomplete
        markLectureIncomplete(courseId, lectureIndex) {
            if (this.progress[courseId]) {
                this.progress[courseId].completed = this.progress[courseId].completed.filter(
                    idx => idx !== lectureIndex
                );
                this.saveProgress();
            }
        }

        // Check if lecture is complete
        isLectureComplete(courseId, lectureIndex) {
            return this.progress[courseId] && 
                   this.progress[courseId].completed.includes(lectureIndex);
        }

        // Get progress for a course
        getCourseProgress(courseId, totalLectures) {
            if (!this.progress[courseId]) {
                return {
                    completed: 0,
                    total: totalLectures,
                    percentage: 0,
                    isComplete: false
                };
            }

            const completed = this.progress[courseId].completed.length;
            const percentage = Math.round((completed / totalLectures) * 100);

            return {
                completed: completed,
                total: totalLectures,
                percentage: percentage,
                isComplete: completed === totalLectures
            };
        }

        // Get last watched lecture for a course
        getLastWatched(courseId) {
            return this.lastWatched[courseId] || 0;
        }

        // Check if course is complete
        isCourseComplete(courseId, totalLectures) {
            const progress = this.getCourseProgress(courseId, totalLectures);
            return progress.isComplete;
        }

        // Get all completed courses
        getCompletedCourses() {
            const completed = [];
            for (const courseId in this.progress) {
                if (this.progress[courseId].completed.length > 0) {
                    completed.push({
                        courseId: courseId,
                        completed: this.progress[courseId].completed.length
                    });
                }
            }
            return completed;
        }

        // Clear all progress
        clearAllProgress() {
            this.progress = {};
            this.lastWatched = {};
            localStorage.removeItem(PROGRESS_KEY);
            localStorage.removeItem(LAST_WATCHED_KEY);
        }

        // Clear progress for specific course
        clearCourseProgress(courseId) {
            delete this.progress[courseId];
            delete this.lastWatched[courseId];
            this.saveProgress();
        }
    }

    // Create global instance
    window.ProgressTracker = new ProgressTracker();

    // Export for use in other scripts
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = window.ProgressTracker;
    }

})();