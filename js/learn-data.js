// Learning pathways data
window.LEARNING_TRACKS = {
    beginner: {
        title: 'Quantum Foundations',
        totalLessons: 10,
        lessons: [
            {
                id: 'b1-qubits',
                title: 'Introduction to Qubits',
                time: '45 min',
                type: 'article',
                typeIcon: '📄',
                link: '/blog-post.html?id=introduction-to-qubits',
                description: 'Learn the fundamental building block of quantum computing'
            },
            {
                id: 'b2-superposition',
                title: 'Quantum Superposition',
                time: '50 min',
                type: 'article',
                typeIcon: '📄',
                link: '/blog-post.html?id=introduction-to-qubits',
                description: 'How qubits exist in multiple states simultaneously'
            },
            {
                id: 'b3-measurement',
                title: 'Quantum Measurement',
                time: '40 min',
                type: 'article',
                typeIcon: '📄',
                link: '/blog-post.html?id=introduction-to-qubits',
                description: 'Wave function collapse and measurement postulates'
            },
            {
                id: 'b4-bloch',
                title: 'The Bloch Sphere',
                time: '35 min',
                type: 'article',
                typeIcon: '📄',
                link: '/glossary.html#bloch-sphere',
                description: 'Visualize single qubit states geometrically'
            },
            {
                id: 'b5-gates',
                title: 'Basic Gates (X, Y, Z, H)',
                time: '60 min',
                type: 'video',
                typeIcon: '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8Z"/></svg>',
                link: '/blog-post.html?id=understanding-hadamard-gate',
                description: 'Fundamental single-qubit operations and their matrices'
            },
            {
                id: 'b6-entanglement',
                title: 'Quantum Entanglement',
                time: '55 min',
                type: 'article',
                typeIcon: '📄',
                link: '/blog-post.html?id=quantum-entanglement-explained',
                description: 'The "spooky action at a distance" phenomenon'
            },
            {
                id: 'b7-bell',
                title: 'Bell States',
                time: '45 min',
                type: 'article',
                typeIcon: '📄',
                link: '/blog-post.html?id=quantum-entanglement-explained',
                description: 'The four maximally entangled two-qubit states'
            },
            {
                id: 'b8-circuits',
                title: 'Quantum Circuits',
                time: '50 min',
                type: 'video',
                typeIcon: '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8Z"/></svg>',
                link: '/blog-post.html?id=first-quantum-circuit-qiskit',
                description: 'Building and reading quantum circuit diagrams'
            },
            {
                id: 'b9-algorithms',
                title: 'Simple Algorithms',
                time: '60 min',
                type: 'article',
                typeIcon: '📄',
                link: '/blog-post.html?id=grovers-algorithm-visual-guide',
                description: 'Your first quantum algorithms: Deutsch-Jozsa and Bernstein-Vazirani'
            },
            {
                id: 'b10-qiskit',
                title: 'Introduction to Qiskit',
                time: '70 min',
                type: 'video',
                typeIcon: '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8Z"/></svg>',
                link: '/blog-post.html?id=first-quantum-circuit-qiskit',
                description: 'Hands-on tutorial with IBM\'s quantum SDK'
            }
        ]
    },
    intermediate: {
        title: 'Quantum Algorithms',
        totalLessons: 8,
        lessons: [
            {
                id: 'i1-qft',
                title: 'Quantum Fourier Transform',
                time: '90 min',
                type: 'article',
                typeIcon: '📄',
                link: '/glossary.html#quantum-fourier-transform',
                description: 'The quantum analog of the discrete Fourier transform'
            },
            {
                id: 'i2-phase',
                title: 'Quantum Phase Estimation',
                time: '80 min',
                type: 'article',
                typeIcon: '📄',
                link: '/glossary.html#phase-kickback',
                description: 'Estimating eigenvalues of unitary operators'
            },
            {
                id: 'i3-grover',
                title: "Grover's Algorithm",
                time: '100 min',
                type: 'video',
                typeIcon: '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8Z"/></svg>',
                link: '/blog-post.html?id=grovers-algorithm-visual-guide',
                description: 'Quantum search with quadratic speedup'
            },
            {
                id: 'i4-shor',
                title: "Shor's Algorithm",
                time: '120 min',
                type: 'article',
                typeIcon: '📄',
                link: '/blog-post.html?id=shors-algorithm-rsa',
                description: 'Factoring integers exponentially faster'
            },
            {
                id: 'i5-teleport',
                title: 'Quantum Teleportation',
                time: '75 min',
                type: 'video',
                typeIcon: '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8Z"/></svg>',
                link: '/blog-post.html?id=quantum-entanglement-explained',
                description: 'Transmitting quantum states using entanglement'
            },
            {
                id: 'i6-qec',
                title: 'Quantum Error Correction',
                time: '110 min',
                type: 'article',
                typeIcon: '📄',
                link: '/blog-post.html?id=quantum-error-correction-basics',
                description: 'Protecting fragile quantum information'
            },
            {
                id: 'i7-vqe',
                title: 'Variational Quantum Eigensolver (VQE)',
                time: '90 min',
                type: 'article',
                typeIcon: '📄',
                link: '/glossary.html#vqe',
                description: 'Hybrid classical-quantum algorithm for chemistry'
            },
            {
                id: 'i8-qaoa',
                title: 'Quantum Approximate Optimization (QAOA)',
                time: '85 min',
                type: 'quiz',
                typeIcon: '❓',
                link: '/glossary.html#qaoa',
                description: 'Variational algorithm for combinatorial optimization'
            }
        ]
    },
    advanced: {
        title: 'Research Frontiers',
        totalLessons: 6,
        lessons: [
            {
                id: 'a1-ftqc',
                title: 'Fault-Tolerant Quantum Computing',
                time: '120 min',
                type: 'article',
                typeIcon: '📄',
                link: '/glossary.html#error-correction',
                description: 'Building scalable quantum computers with error correction'
            },
            {
                id: 'a2-topological',
                title: 'Topological Quantum Computing',
                time: '100 min',
                type: 'article',
                typeIcon: '📄',
                link: '/glossary.html#topological-qubit',
                description: 'Microsoft\'s approach using anyons and braiding'
            },
            {
                id: 'a3-qml',
                title: 'Quantum Machine Learning',
                time: '110 min',
                type: 'video',
                typeIcon: '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8Z"/></svg>',
                link: '/blog-post.html?id=future-quantum-computing-india',
                description: 'Quantum neural networks and quantum kernels'
            },
            {
                id: 'a4-qcrypto',
                title: 'Quantum Cryptography',
                time: '95 min',
                type: 'article',
                typeIcon: '📄',
                link: '/blog-post.html?id=shors-algorithm-rsa',
                description: 'QKD, post-quantum cryptography, and quantum security'
            },
            {
                id: 'a5-hardware',
                title: 'Quantum Hardware Deep Dive',
                time: '100 min',
                type: 'article',
                typeIcon: '📄',
                link: '/blog-post.html?id=quantum-hardware-superconducting-trapped-ion',
                description: 'Superconducting, trapped ion, and photonic qubits'
            },
            {
                id: 'a6-frontiers',
                title: 'Current Research Frontiers',
                time: '90 min',
                type: 'quiz',
                typeIcon: '❓',
                link: '/research.html',
                description: 'Latest breakthroughs and open problems in quantum'
            }
        ]
    }
};