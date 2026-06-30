(function() {
    'use strict';

    class CertificateSystem {
        constructor() {
            this.certificates = this.loadCertificates();
        }

        loadCertificates() {
            try {
                const saved = localStorage.getItem('quantum-lab-certificates');
                return saved ? JSON.parse(saved) : {};
            } catch (e) {
                console.error('Error loading certificates:', e);
                return {};
            }
        }

        saveCertificates() {
            try {
                localStorage.setItem('quantum-lab-certificates', JSON.stringify(this.certificates));
            } catch (e) {
                console.error('Error saving certificates:', e);
            }
        }

        showCertificateButton(courseId, courseTitle) {
            const btn = document.getElementById('getCertificate');
            if (btn) {
                btn.style.display = 'inline-flex';
            }
        }

        // ==================== NEW: Student Name Prompt ====================
        promptForStudentName() {
            return new Promise((resolve) => {
                const overlay = document.createElement('div');
                overlay.className = 'cert-name-overlay';
                overlay.innerHTML = `
                    <div class="cert-name-modal">
                        <h3><svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/><path d="M22 10v6"/></svg> Enter Your Name</h3>
                        <p>This will appear on your certificate:</p>
                        <input type="text" id="certNameInput" placeholder="Your Full Name" autocomplete="name" autofocus>
                        <div class="cert-name-actions">
                            <button class="btn btn-ghost btn-sm" id="certNameCancel">Cancel</button>
                            <button class="btn btn-primary btn-sm" id="certNameConfirm">Generate Certificate</button>
                        </div>
                    </div>
                `;

                const style = document.createElement('style');
                style.id = 'cert-name-modal-styles';
                style.textContent = `
                    .cert-name-overlay {
                        position: fixed; inset: 0; background: rgba(0,0,0,0.85);
                        display: flex; align-items: center; justify-content: center;
                        z-index: 10001; backdrop-filter: blur(5px);
                        animation: modalFadeIn 0.2s ease-out;
                    }
                    .cert-name-modal {
                        background: var(--bg-surface); border: 1px solid var(--border-color);
                        border-radius: var(--radius-xl); padding: var(--space-8);
                        max-width: 420px; width: 90%; box-shadow: var(--shadow-xl);
                        animation: modalSlideIn 0.3s ease-out;
                    }
                    .cert-name-modal h3 { margin: 0 0 var(--space-2); font-size: var(--text-xl); }
                    .cert-name-modal p { color: var(--text-secondary); margin-bottom: var(--space-4); font-size: var(--text-sm); }
                    .cert-name-modal input {
                        width: 100%; padding: var(--space-3) var(--space-4);
                        border: 1px solid var(--border-color); border-radius: var(--radius-md);
                        background: var(--bg-body); color: var(--text-primary);
                        font-size: var(--text-base); margin-bottom: var(--space-5);
                        box-sizing: border-box; transition: border-color var(--transition-fast);
                    }
                    .cert-name-modal input:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.15); }
                    .cert-name-modal input.error { border-color: var(--color-error); }
                    .cert-name-actions { display: flex; gap: var(--space-3); justify-content: flex-end; }
                `;

                document.head.appendChild(style);
                document.body.appendChild(overlay);

                const input = overlay.querySelector('#certNameInput');
                const confirmBtn = overlay.querySelector('#certNameConfirm');
                const cancelBtn = overlay.querySelector('#certNameCancel');

                const cleanup = () => {
                    overlay.remove();
                    style.remove();
                };

                cancelBtn.addEventListener('click', () => { cleanup(); resolve(null); });
                overlay.addEventListener('click', (e) => { if (e.target === overlay) { cleanup(); resolve(null); } });
                document.addEventListener('keydown', function escHandler(e) {
                    if (e.key === 'Escape') { cleanup(); resolve(null); document.removeEventListener('keydown', escHandler); }
                });

                confirmBtn.addEventListener('click', () => {
                    const name = input.value.trim();
                    if (name.length >= 2) {
                        cleanup();
                        resolve(name);
                    } else {
                        input.classList.add('error');
                        input.focus();
                    }
                });

                input.addEventListener('keypress', (e) => { if (e.key === 'Enter') confirmBtn.click(); });
                setTimeout(() => input.focus(), 50);
            });
        }

        // ==================== NEW: PDF Generation via jsPDF ====================
        generatePDF(studentName, courseTitle, certificateId, completionDate) {
            if (!window.jspdf || !window.jspdf.jsPDF) {
                alert('PDF library is still loading. Please try again in a moment.');
                return;
            }

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

            const W = 297, H = 210;

            // Dark background
            doc.setFillColor(10, 10, 46);
            doc.rect(0, 0, W, H, 'F');

            // Cyan double border
            doc.setDrawColor(0, 212, 255);
            doc.setLineWidth(2);
            doc.rect(10, 10, W - 20, H - 20);
            doc.setLineWidth(0.5);
            doc.rect(15, 15, W - 30, H - 30);

            // Corner accents
            const cs = 18;
            doc.setFillColor(0, 212, 255);
            doc.triangle(10, 10, 10 + cs, 10, 10, 10 + cs, 'F');
            doc.triangle(W - 10, 10, W - 10 - cs, 10, W - 10, 10 + cs, 'F');
            doc.triangle(10, H - 10, 10 + cs, H - 10, 10, H - 10 - cs, 'F');
            doc.triangle(W - 10, H - 10, W - 10 - cs, H - 10, W - 10, H - 10 - cs, 'F');

            // Brand
            doc.setTextColor(0, 212, 255);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('INDIAN QUANTUM LAB', W / 2, 35, { align: 'center' });

            // Title
            doc.setTextColor(232, 234, 237);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text('CERTIFICATE OF COMPLETION', W / 2, 50, { align: 'center' });

            // "This certifies that"
            doc.setFontSize(10);
            doc.setTextColor(180, 180, 200);
            doc.text('This is to certify that', W / 2, 65, { align: 'center' });

            // Student name
            doc.setTextColor(0, 212, 255);
            doc.setFontSize(30);
            doc.setFont('helvetica', 'bold');
            doc.text(studentName, W / 2, 85, { align: 'center' });

            // Name underline
            const nameW = doc.getTextWidth(studentName);
            doc.setDrawColor(124, 58, 237);
            doc.setLineWidth(0.8);
            doc.line(W / 2 - nameW / 2 - 10, 90, W / 2 + nameW / 2 + 10, 90);

            // "has successfully completed"
            doc.setFontSize(10);
            doc.setTextColor(180, 180, 200);
            doc.setFont('helvetica', 'normal');
            doc.text('has successfully completed the course', W / 2, 105, { align: 'center' });

            // Course name
            doc.setTextColor(232, 234, 237);
            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.text(courseTitle, W / 2, 120, { align: 'center' });

            // Date
            doc.setFontSize(9);
            doc.setTextColor(150, 150, 170);
            doc.setFont('helvetica', 'normal');
            doc.text('Completed on ' + completionDate, W / 2, 135, { align: 'center' });

            // Signature lines
            const sigY = 165;
            doc.setDrawColor(100, 100, 120);
            doc.setLineWidth(0.3);
            doc.line(W / 2 - 100, sigY, W / 2 - 20, sigY);
            doc.line(W / 2 + 20, sigY, W / 2 + 100, sigY);

            doc.setFontSize(8);
            doc.setTextColor(150, 150, 170);
            doc.text('Course Instructor', W / 2 - 60, sigY + 5, { align: 'center' });
            doc.text('Indian Quantum Lab', W / 2 + 60, sigY + 5, { align: 'center' });

            // Certificate ID footer
            doc.setFontSize(7);
            doc.setTextColor(100, 100, 120);
            doc.setFont('courier', 'normal');
            doc.text('Certificate ID: ' + certificateId, W / 2, H - 20, { align: 'center' });
            doc.text('Verify at: indianquantumlab.com/verify', W / 2, H - 16, { align: 'center' });

            // Download
            const safeName = studentName.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-');
            const safeCourse = courseTitle.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-');
            doc.save('IQL-Certificate-' + safeName + '-' + safeCourse + '.pdf');
        }

        // ==================== ORIGINAL: generateCertificate (UPGRADED) ====================
        async generateCertificate(courseId, courseTitle) {
            // NEW: Ask for student name first
            const studentName = await this.promptForStudentName();
            if (!studentName) return; // User cancelled

            const certificateId = 'CERT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            const completionDate = new Date().toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // ORIGINAL: Save to localStorage (preserved exactly)
            this.certificates[courseId] = {
                id: certificateId,
                courseTitle: courseTitle,
                studentName: studentName, // NEW: store name
                completionDate: completionDate,
                issuedAt: new Date().toISOString()
            };

            this.saveCertificates();

            // ORIGINAL: Show preview modal (now passes studentName)
            this.showCertificateModal(certificateId, courseTitle, completionDate, studentName);
        }

        // ==================== ORIGINAL: showCertificateModal (UPGRADED with name + PDF) ====================
        showCertificateModal(certificateId, courseTitle, completionDate, studentName) {
            // Remove existing modal if any
            const existingModal = document.querySelector('.certificate-modal');
            if (existingModal) {
                existingModal.remove();
            }

            // NEW: Use actual student name instead of hardcoded "Learner"
            const displayName = studentName || 'Learner';

            const modal = document.createElement('div');
            modal.className = 'certificate-modal';
            modal.innerHTML = 
                '<div class="certificate-modal-content">' +
                    '<div class="certificate-header">' +
                        '<h2>\uD83C\uDF89 Certificate of Completion</h2>' +
                        '<button class="certificate-close" aria-label="Close">&times;</button>' +
                    '</div>' +
                    '<div class="certificate-body">' +
                        '<div class="certificate-border">' +
                            '<p class="certificate-text">This certifies that</p>' +
                            '<p class="certificate-name">' + displayName + '</p>' +
                            '<p class="certificate-text">has successfully completed</p>' +
                            '<p class="certificate-course">' + courseTitle + '</p>' +
                            '<p class="certificate-text">on ' + completionDate + '</p>' +
                            '<p class="certificate-id">Certificate ID: ' + certificateId + '</p>' +
                            '<div class="certificate-signature">' +
                                '<div class="signature-line"></div>' +
                                '<p>Indian Quantum Lab</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="certificate-footer">' +
                        '<button class="btn btn-primary" id="downloadCert">' +
                            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                                '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>' +
                                '<polyline points="7 10 12 15 17 10"/>' +
                                '<line x1="12" y1="15" x2="12" y2="3"/>' +
                            '</svg>' +
                            'Download PDF' +
                        '</button>' +
                        '<button class="btn btn-secondary" id="shareCert">' +
                            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                                '<circle cx="18" cy="5" r="3"/>' +
                                '<circle cx="6" cy="12" r="3"/>' +
                                '<circle cx="18" cy="19" r="3"/>' +
                                '<line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>' +
                                '<line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>' +
                            '</svg>' +
                            'Share on LinkedIn' +
                        '</button>' +
                    '</div>' +
                '</div>';

            document.body.appendChild(modal);

            // Add modal styles (ORIGINAL - preserved exactly)
            this.addModalStyles();

            // Setup event listeners
            const closeBtn = modal.querySelector('.certificate-close');
            const downloadBtn = modal.querySelector('#downloadCert');
            const shareBtn = modal.querySelector('#shareCert');

            closeBtn.addEventListener('click', () => modal.remove());
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });

            // UPGRADED: Real PDF download instead of alert
            downloadBtn.addEventListener('click', () => {
                this.generatePDF(displayName, courseTitle, certificateId, completionDate);
            });

            // ORIGINAL: LinkedIn share (preserved exactly)
            shareBtn.addEventListener('click', () => {
                const shareText = 'I just completed "' + courseTitle + '" on Indian Quantum Lab! Certificate ID: ' + certificateId;
                const shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href);
                window.open(shareUrl, '_blank');
            });

            // Close on Escape key
            const escHandler = (e) => {
                if (e.key === 'Escape') {
                    modal.remove();
                    document.removeEventListener('keydown', escHandler);
                }
            };
            document.addEventListener('keydown', escHandler);
        }

        // ORIGINAL: addModalStyles (preserved exactly as-is)
        addModalStyles() {
            if (document.getElementById('certificate-modal-styles')) {
                return;
            }

            const style = document.createElement('style');
            style.id = 'certificate-modal-styles';
            style.textContent = `
                .certificate-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    padding: var(--space-4);
                    animation: modalFadeIn 0.3s ease-out;
                }

                @keyframes modalFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .certificate-modal-content {
                    background-color: var(--bg-surface);
                    border-radius: var(--radius-xl);
                    max-width: 700px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: var(--shadow-xl);
                    animation: modalSlideIn 0.3s ease-out;
                }

                @keyframes modalSlideIn {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .certificate-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: var(--space-6);
                    border-bottom: 1px solid var(--border-color);
                }

                .certificate-header h2 { margin: 0; font-size: var(--text-2xl); }

                .certificate-close {
                    background: none; border: none; font-size: var(--text-3xl);
                    color: var(--text-tertiary); cursor: pointer;
                    width: 40px; height: 40px;
                    display: flex; align-items: center; justify-content: center;
                    border-radius: var(--radius-md); transition: all var(--transition-fast);
                }

                .certificate-close:hover {
                    background-color: var(--bg-surface-hover); color: var(--text-primary);
                }

                .certificate-body { padding: var(--space-8) var(--space-6); }

                .certificate-border {
                    border: 3px solid var(--color-accent);
                    border-radius: var(--radius-lg);
                    padding: var(--space-8);
                    text-align: center;
                    background: linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.05) 0%, rgba(var(--color-secondary-accent-rgb), 0.03) 100%);
                }

                .certificate-text { font-size: var(--text-lg); color: var(--text-secondary); margin: var(--space-4) 0; }

                .certificate-name {
                    font-size: var(--text-3xl); font-weight: 700;
                    color: var(--color-accent); margin: var(--space-6) 0;
                    font-family: var(--font-mono);
                }

                .certificate-course { font-size: var(--text-2xl); font-weight: 600; color: var(--text-primary); margin: var(--space-4) 0; }

                .certificate-id { font-size: var(--text-sm); color: var(--text-tertiary); font-family: var(--font-mono); margin-top: var(--space-6); }

                .certificate-signature { margin-top: var(--space-8); }

                .signature-line { width: 200px; height: 2px; background-color: var(--text-tertiary); margin: 0 auto var(--space-2); }

                .certificate-signature p { font-size: var(--text-sm); color: var(--text-tertiary); margin: 0; }

                .certificate-footer {
                    display: flex; gap: var(--space-3); padding: var(--space-6);
                    border-top: 1px solid var(--border-color); justify-content: center; flex-wrap: wrap;
                }

                @media (max-width: 768px) {
                    .certificate-modal-content { max-height: 95vh; }
                    .certificate-border { padding: var(--space-6) var(--space-4); }
                    .certificate-name { font-size: var(--text-2xl); }
                    .certificate-course { font-size: var(--text-xl); }
                    .certificate-footer { flex-direction: column; }
                    .certificate-footer .btn { width: 100%; }
                }
            `;

            document.head.appendChild(style);
        }

        // ORIGINAL methods preserved exactly
        getCertificate(courseId) {
            return this.certificates[courseId] || null;
        }

        getAllCertificates() {
            return this.certificates;
        }

        deleteCertificate(courseId) {
            delete this.certificates[courseId];
            this.saveCertificates();
        }
    }

    // Create global instance (ORIGINAL - preserved)
    window.CertificateSystem = new CertificateSystem();

    // Export for use in other scripts (ORIGINAL - preserved)
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = window.CertificateSystem;
    }

})();