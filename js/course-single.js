(function() {
    'use strict';

    // Course data (in real app, this would come from API/database)
    const courseData = {
        'quantum-fundamentals': {
            title: 'Quantum Computing Fundamentals',
            instructor: 'Dr. Anil Kumar',
            level: 'beginner',
            topic: 'basics',
            description: 'Introduction to qubits, superposition, and quantum mechanics basics. Perfect for beginners with no prior knowledge. This comprehensive course covers the fundamental principles of quantum computing, including quantum states, measurement, and the mathematical framework behind quantum mechanics.',
            totalLectures: 12,
            lectures: [
                { title: 'Introduction to Quantum Computing', videoId: 'OWJCfOvchA4', duration: '15:23' },
                { title: 'Classical vs Quantum Bits', videoId: 'F_rSsKGeibM', duration: '18:45' },
                { title: 'Quantum Superposition', videoId: '4mkGb29l7Jg', duration: '22:10' },
                { title: 'Quantum Measurement', videoId: '6qD9XcWFcLI', duration: '20:33' },
                { title: 'Bra-Ket Notation', videoId: 'JhHMJCUmq28', duration: '25:17' },
                { title: 'Quantum States', videoId: '-U5np4RZnqc', duration: '19:42' },
                { title: 'Probability Amplitudes', videoId: 'OWJCfOvchA4', duration: '23:55' },
                { title: 'Quantum Interference', videoId: 'F_rSsKGeibM', duration: '21:08' },
                { title: 'Multi-Qubit Systems', videoId: '4mkGb29l7Jg', duration: '28:30' },
                { title: 'Entanglement Basics', videoId: '6qD9XcWFcLI', duration: '26:45' },
                { title: 'Quantum Circuits Introduction', videoId: 'JhHMJCUmq28', duration: '24:12' },
                { title: 'Course Summary & Next Steps', videoId: '-U5np4RZnqc', duration: '16:50' }
            ]
        },
        'quantum-gates': {
            title: 'Quantum Gates and Circuits',
            instructor: 'Prof. Priya Sharma',
            level: 'beginner',
            topic: 'gates',
            description: 'Learn Pauli-X, Hadamard, CNOT gates and build simple quantum circuits. Hands-on with circuit diagrams and quantum gate operations.',
            totalLectures: 15,
            lectures: Array.from({length: 15}, (_, i) => ({
                title: `Lecture ${i + 1}`,
                videoId: 'F_rSsKGeibM',
                duration: '20:00'
            }))
        },
        'grovers-algorithm': {
            title: "Grover's Search Algorithm",
            instructor: 'Dr. Rajesh Patel',
            level: 'intermediate',
            topic: 'algorithms',
            description: "Master quantum search algorithm with quadratic speedup. Implement Grover's on IBM Quantum and understand oracle construction.",
            totalLectures: 18,
            lectures: Array.from({length: 18}, (_, i) => ({
                title: `Lecture ${i + 1}`,
                videoId: '4mkGb29l7Jg',
                duration: '25:00'
            }))
        },
        'shors-algorithm': {
            title: "Shor's Algorithm Deep Dive",
            instructor: 'Prof. Meera Iyer',
            level: 'intermediate',
            topic: 'algorithms',
            description: "Understand how Shor's algorithm breaks RSA encryption. Learn quantum Fourier transform and modular exponentiation.",
            totalLectures: 22,
            lectures: Array.from({length: 22}, (_, i) => ({
                title: `Lecture ${i + 1}`,
                videoId: '6qD9XcWFcLI',
                duration: '30:00'
            }))
        },
        'quantum-hardware': {
            title: 'Quantum Hardware Fundamentals',
            instructor: 'Dr. Vikram Singh',
            level: 'advanced',
            topic: 'hardware',
            description: 'Explore superconducting qubits, trapped ions, and topological quantum computing. Understand decoherence and error correction.',
            totalLectures: 25,
            lectures: Array.from({length: 25}, (_, i) => ({
                title: `Lecture ${i + 1}`,
                videoId: 'JhHMJCUmq28',
                duration: '28:00'
            }))
        },
        'quantum-ml': {
            title: 'Quantum Machine Learning',
            instructor: 'Dr. Neha Gupta',
            level: 'advanced',
            topic: 'algorithms',
            description: 'Quantum neural networks, variational quantum eigensolver, and quantum kernel methods. Bridge quantum computing with AI.',
            totalLectures: 28,
            lectures: Array.from({length: 28}, (_, i) => ({
                title: `Lecture ${i + 1}`,
                videoId: '-U5np4RZnqc',
                duration: '32:00'
            }))
        }
    };

    // Get course ID from URL
    function getCourseId() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id') || 'quantum-fundamentals';
    }

    // Get current lecture index from URL
    function getCurrentLecture() {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('lecture')) || 0;
    }

    // Update URL with lecture parameter
    function updateURL(lectureIndex) {
        const url = new URL(window.location);
        url.searchParams.set('lecture', lectureIndex);
        window.history.pushState({}, '', url);
    }

    // Load course data
    function loadCourse() {
        const courseId = getCourseId();
        const currentLectureIndex = getCurrentLecture();
        const course = courseData[courseId];

        if (!course) {
            document.querySelector('.course-single-main').innerHTML = '<h1>Course not found</h1>';
            return;
        }

        // Update page content
        document.getElementById('courseTitle').textContent = course.title;
        document.getElementById('courseDescription').textContent = course.description;
        document.getElementById('instructorName').textContent = course.instructor;
        document.getElementById('totalLectures').textContent = course.totalLectures;
        document.getElementById('totalCount').textContent = course.totalLectures;
        document.title = `${course.title} — Indian Quantum Lab`;

        // Update level tag
        const levelTag = document.getElementById('courseLevel');
        levelTag.textContent = course.level.charAt(0).toUpperCase() + course.level.slice(1);
        levelTag.className = `tag tag-${course.level}`;

        // Update topic tag
        const topicTag = document.getElementById('courseTopic');
        topicTag.textContent = course.topic.charAt(0).toUpperCase() + course.topic.slice(1);

        // Load current lecture
        loadLecture(courseId, currentLectureIndex, course);

        // Render lecture list
        renderLectureList(courseId, course, currentLectureIndex);

        // Update progress
        updateProgressDisplay(courseId, course.totalLectures);

        // Setup event listeners
        setupEventListeners(courseId, course, currentLectureIndex);
    }

    // Load specific lecture
    function loadLecture(courseId, lectureIndex, course) {
        const lecture = course.lectures[lectureIndex];
        if (!lecture) return;

        // Update video
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.src = `https://www.youtube.com/embed/${lecture.videoId}`;

        // Update lecture counter
        document.getElementById('currentLecture').textContent = lectureIndex + 1;

        // Save last watched
        if (window.ProgressTracker) {
            window.ProgressTracker.saveLastWatched(courseId, lectureIndex);
        }

        // Update navigation buttons
        const prevBtn = document.getElementById('prevLecture');
        const nextBtn = document.getElementById('nextLecture');

        prevBtn.disabled = lectureIndex === 0;
        nextBtn.disabled = lectureIndex === course.totalLectures - 1;

        // Update active lecture in list
        document.querySelectorAll('.lecture-item').forEach((item, idx) => {
            item.classList.toggle('active', idx === lectureIndex);
        });

        // Update URL
        updateURL(lectureIndex);

        // Update mark complete button state
        updateMarkCompleteButton(courseId, lectureIndex);
    }

    // Render lecture list
    function renderLectureList(courseId, course, currentLectureIndex) {
        const lectureList = document.getElementById('lectureList');
        lectureList.innerHTML = '';

        course.lectures.forEach((lecture, index) => {
            const isComplete = window.ProgressTracker && 
                              window.ProgressTracker.isLectureComplete(courseId, index);
            const isActive = index === currentLectureIndex;

            const lectureItem = document.createElement('div');
            lectureItem.className = `lecture-item${isActive ? ' active' : ''}${isComplete ? ' completed' : ''}`;
            lectureItem.innerHTML = `
                <div class="lecture-number">${isComplete ? '✓' : index + 1}</div>
                <div class="lecture-title">${lecture.title}</div>
                <div class="lecture-duration">${lecture.duration}</div>
                ${isComplete ? '<svg class="lecture-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
            `;

            lectureItem.addEventListener('click', () => {
                loadLecture(courseId, index, course);
                renderLectureList(courseId, course, index);
            });

            lectureList.appendChild(lectureItem);
        });
    }

    // Update progress display
    function updateProgressDisplay(courseId, totalLectures) {
        if (!window.ProgressTracker) return;

        const progress = window.ProgressTracker.getCourseProgress(courseId, totalLectures);
        
        const progressBar = document.getElementById('courseProgressBar');
        const completedCount = document.getElementById('completedCount');
        const progressPercent = document.getElementById('progressPercent');
        const getCertificateBtn = document.getElementById('getCertificate');

        if (progressBar) {
            progressBar.style.width = progress.percentage + '%';
        }
        if (completedCount) {
            completedCount.textContent = progress.completed;
        }
        if (progressPercent) {
            progressPercent.textContent = progress.percentage;
        }

        // Show certificate button if course is complete
        if (getCertificateBtn) {
            getCertificateBtn.style.display = progress.isComplete ? 'inline-flex' : 'none';
        }
    }

    // Update mark complete button state
    function updateMarkCompleteButton(courseId, lectureIndex) {
        const markCompleteBtn = document.getElementById('markComplete');
        if (!markCompleteBtn || !window.ProgressTracker) return;

        const isComplete = window.ProgressTracker.isLectureComplete(courseId, lectureIndex);
        
        if (isComplete) {
            markCompleteBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                Completed
            `;
            markCompleteBtn.classList.remove('btn-primary');
            markCompleteBtn.classList.add('btn-secondary');
        } else {
            markCompleteBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                Mark as Complete
            `;
            markCompleteBtn.classList.add('btn-primary');
            markCompleteBtn.classList.remove('btn-secondary');
        }
    }

    // Setup event listeners
    function setupEventListeners(courseId, course, currentLectureIndex) {
        // Mark complete button
        const markCompleteBtn = document.getElementById('markComplete');
        if (markCompleteBtn) {
            markCompleteBtn.addEventListener('click', () => {
                const isComplete = window.ProgressTracker.isLectureComplete(courseId, currentLectureIndex);
                
                if (isComplete) {
                    window.ProgressTracker.markLectureIncomplete(courseId, currentLectureIndex);
                } else {
                    window.ProgressTracker.markLectureComplete(courseId, currentLectureIndex);
                }

                updateMarkCompleteButton(courseId, currentLectureIndex);
                updateProgressDisplay(courseId, course.totalLectures);
                renderLectureList(courseId, course, currentLectureIndex);

                // Check if course is now complete
                if (window.ProgressTracker.isCourseComplete(courseId, course.totalLectures)) {
                    if (window.CertificateSystem) {
                        window.CertificateSystem.showCertificateButton(courseId, course.title);
                    }
                }
            });
        }

        // Get certificate button
        const getCertificateBtn = document.getElementById('getCertificate');
        if (getCertificateBtn) {
            getCertificateBtn.addEventListener('click', () => {
                if (window.CertificateSystem) {
                    window.CertificateSystem.generateCertificate(courseId, course.title);
                }
            });
        }

        // Previous lecture button
        const prevBtn = document.getElementById('prevLecture');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentLectureIndex > 0) {
                    loadLecture(courseId, currentLectureIndex - 1, course);
                    renderLectureList(courseId, course, currentLectureIndex - 1);
                }
            });
        }

        // Next lecture button
        const nextBtn = document.getElementById('nextLecture');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentLectureIndex < course.totalLectures - 1) {
                    loadLecture(courseId, currentLectureIndex + 1, course);
                    renderLectureList(courseId, course, currentLectureIndex + 1);
                }
            });
        }

        // PDF preview toggle
        const togglePdfBtn = document.getElementById('togglePdfPreview');
        const pdfPreview = document.getElementById('pdfPreview');
        if (togglePdfBtn && pdfPreview) {
            togglePdfBtn.addEventListener('click', () => {
                pdfPreview.style.display = pdfPreview.style.display === 'none' ? 'block' : 'none';
            });
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadCourse);
    } else {
        loadCourse();
    }

})();