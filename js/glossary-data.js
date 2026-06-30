// Glossary data — 44 quantum terms
window.GLOSSARY_TERMS = [
    {
        term: 'Amplitude',
        definition: 'A complex number that describes the probability weight of a quantum state. The square of its magnitude gives the probability of measuring that state.',
        related: ['Superposition', 'Measurement', 'Qubit']
    },
    {
        term: 'Ancilla',
        definition: 'An auxiliary qubit used to assist in computation, often initialized to |0⟩ and discarded or measured at the end. Essential for error correction and reversible computing.',
        related: ['Quantum Circuit', 'Error Correction', 'Qubit']
    },
    {
        term: 'Bell State',
        definition: 'One of four maximally entangled two-qubit states. The canonical example is |Φ⁺⟩ = (|00⟩ + |11⟩)/√2, used in teleportation and superdense coding.',
        related: ['Entanglement', 'Quantum Teleportation', 'CNOT']
    },
    {
        term: 'Bloch Sphere',
        definition: 'A geometric representation of a single qubit\'s pure state space. Every point on the sphere\'s surface corresponds to a unique quantum state, with |0⟩ at the north pole and |1⟩ at the south.',
        related: ['Qubit', 'Superposition', 'Hadamard']
    },
    {
        term: 'Bra-ket',
        definition: 'Dirac notation for quantum states. A ket |ψ⟩ represents a column vector (state), while a bra ⟨ψ| represents its conjugate transpose (row vector). Inner products are written ⟨φ|ψ⟩.',
        related: ['Ket notation', 'Hilbert Space', 'Qubit']
    },
    {
        term: 'Circuit',
        definition: 'A sequence of quantum gates applied to qubits, followed by measurements. Quantum circuits are the primary model for describing quantum algorithms and computations.',
        related: ['Gate', 'Qubit', 'Measurement']
    },
    {
        term: 'CNOT',
        definition: 'Controlled-NOT gate — a two-qubit gate that flips the target qubit if and only if the control qubit is |1⟩. Essential for creating entanglement and universal quantum computation.',
        related: ['Gate', 'Entanglement', 'Bell State']
    },
    {
        term: 'Decoherence',
        definition: 'The loss of quantum coherence due to interaction with the environment. Decoherence causes qubits to decay from superposition into classical states, a major obstacle in quantum computing.',
        related: ['Qubit', 'Error Correction', 'NISQ']
    },
    {
        term: 'Density Matrix',
        definition: 'A mathematical representation of quantum states that can describe both pure states and mixed states (statistical ensembles). Denoted as ρ, it generalizes state vectors to handle noise and uncertainty.',
        related: ['Qubit', 'Decoherence', 'Fidelity']
    },
    {
        term: 'Eigenvalue',
        definition: 'A scalar λ such that A|ψ⟩ = λ|ψ⟩ for some operator A and state |ψ⟩. Quantum measurement yields eigenvalues of observable operators with probabilities determined by state amplitudes.',
        related: ['Hermitian', 'Measurement', 'Hilbert Space']
    },
    {
        term: 'Entanglement',
        definition: 'A quantum phenomenon where two or more qubits become correlated such that the state of one cannot be described independently. Measurement of one instantly affects the other, regardless of distance.',
        related: ['Bell State', 'Quantum Teleportation', 'Qubit']
    },
    {
        term: 'Error Correction',
        definition: 'Techniques for protecting quantum information from noise by encoding logical qubits across multiple physical qubits. Enables fault-tolerant quantum computing when error rates fall below threshold.',
        related: ['Surface Code', 'Fidelity', 'Decoherence']
    },
    {
        term: 'Fidelity',
        definition: 'A measure of similarity between two quantum states, ranging from 0 (orthogonal) to 1 (identical). Used to quantify gate accuracy and state preparation quality.',
        related: ['Gate', 'Density Matrix', 'Error Correction']
    },
    {
        term: 'Gate',
        definition: 'A unitary operation that transforms quantum states. Common gates include single-qubit gates (H, X, Y, Z, S, T) and two-qubit gates (CNOT, SWAP). All quantum gates are reversible.',
        related: ['Circuit', 'Unitary', 'Hadamard']
    },
    {
        term: 'Grover\'s Algorithm',
        definition: 'A quantum search algorithm that finds a marked item in an unsorted database of N items using O(√N) queries, providing quadratic speedup over classical O(N) search.',
        related: ['Oracle', 'Amplitude', 'Quantum Algorithm']
    },
    {
        term: 'Hadamard',
        definition: 'A single-qubit gate that creates superposition: H|0⟩ = (|0⟩+|1⟩)/√2. Represented by the matrix (1/√2)[[1,1],[1,-1]]. Fundamental to most quantum algorithms.',
        related: ['Gate', 'Superposition', 'Qubit']
    },
    {
        term: 'Hermitian',
        definition: 'An operator equal to its own conjugate transpose (A = A†). Observable quantities in quantum mechanics (energy, position, spin) are represented by Hermitian operators with real eigenvalues.',
        related: ['Eigenvalue', 'Measurement', 'Unitary']
    },
    {
        term: 'Hilbert Space',
        definition: 'A complete vector space with an inner product, used to represent quantum states. An n-qubit system lives in a 2ⁿ-dimensional complex Hilbert space.',
        related: ['Qubit', 'Bra-ket', 'Amplitude']
    },
    {
        term: 'Ket notation',
        definition: 'The |ψ⟩ notation introduced by Dirac to represent quantum state vectors. The ket is a column vector in Hilbert space representing a quantum state.',
        related: ['Bra-ket', 'Hilbert Space', 'Superposition']
    },
    {
        term: 'Measurement',
        definition: 'The process of observing a quantum system, which collapses the state to an eigenstate of the measured observable. The outcome is probabilistic, with probabilities given by amplitude squared.',
        related: ['Eigenvalue', 'Superposition', 'Qubit']
    },
    {
        term: 'NISQ',
        definition: 'Noisy Intermediate-Scale Quantum — current era of quantum computers with 50-1000 qubits that are too noisy for full error correction. Requires hybrid classical-quantum approaches.',
        related: ['Error Correction', 'Decoherence', 'VQE']
    },
    {
        term: 'No-Cloning Theorem',
        definition: 'A fundamental theorem stating that an unknown quantum state cannot be perfectly copied. This is a consequence of linearity and has profound implications for quantum cryptography.',
        related: ['Qubit', 'Quantum Cryptography', 'Entanglement']
    },
    {
        term: 'Oracle',
        definition: 'A black-box function used as a subroutine in quantum algorithms. In Grover\'s algorithm, the oracle marks the target state by flipping its phase.',
        related: ['Grover\'s Algorithm', 'Quantum Algorithm', 'Phase Kickback']
    },
    {
        term: 'Pauli Gates',
        definition: 'Three fundamental single-qubit gates: X (bit-flip/NOT), Y (combined bit and phase flip), and Z (phase-flip). Together with identity, they form a basis for all single-qubit operations.',
        related: ['Gate', 'Qubit', 'Bloch Sphere']
    },
    {
        term: 'Phase Kickback',
        definition: 'A quantum phenomenon where applying a controlled operation causes the phase information to "kick back" onto the control qubit. Fundamental to algorithms like phase estimation and Grover\'s.',
        related: ['CNOT', 'Quantum Fourier Transform', 'Oracle']
    },
    {
        term: 'Post-Quantum Cryptography',
        definition: 'Classical cryptographic algorithms believed to be secure against quantum attacks. NIST standardized CRYSTALS-Kyber, Dilithium, FALCON, and SPHINCS+ in 2024.',
        related: ['Shor\'s Algorithm', 'Quantum Cryptography', 'Quantum Supremacy']
    },
    {
        term: 'Quantum Algorithm',
        definition: 'A sequence of quantum operations designed to solve a computational problem. Famous examples include Grover\'s (search), Shor\'s (factoring), and VQE (chemistry).',
        related: ['Circuit', 'Gate', 'Quantum Supremacy']
    },
    {
        term: 'Quantum Annealing',
        definition: 'An optimization technique that uses quantum tunneling and thermal fluctuations to find global minima. Used by D-Wave systems for specific optimization problems.',
        related: ['QAOA', 'Quantum Algorithm', 'NISQ']
    },
    {
        term: 'Quantum Circuit',
        definition: 'A model of quantum computation where computation is a sequence of quantum gates, measurements, and resets applied to qubits. Equivalent to quantum Turing machines.',
        related: ['Circuit', 'Gate', 'Qubit']
    },
    {
        term: 'Quantum Cryptography',
        definition: 'The use of quantum mechanics to secure communication. Quantum Key Distribution (QKD) enables provably secure key exchange based on physical laws rather than computational assumptions.',
        related: ['Post-Quantum Cryptography', 'Entanglement', 'No-Cloning Theorem']
    },
    {
        term: 'Quantum Fourier Transform',
        definition: 'A linear transformation on qubits that is the quantum analogue of the discrete Fourier transform. Exponentially faster than classical FFT and central to Shor\'s algorithm.',
        related: ['Shor\'s Algorithm', 'Phase Kickback', 'Quantum Algorithm']
    },
    {
        term: 'Quantum Supremacy',
        definition: 'The milestone where a quantum computer performs a computation impossible for any classical computer in reasonable time. Google claimed this in 2019 with Sycamore.',
        related: ['NISQ', 'Quantum Algorithm', 'Quantum Volume']
    },
    {
        term: 'Quantum Teleportation',
        definition: 'A protocol for transferring a quantum state from one location to another using entanglement and classical communication. Does not transfer matter or violate no-cloning.',
        related: ['Entanglement', 'Bell State', 'Quantum Cryptography']
    },
    {
        term: 'Quantum Volume',
        definition: 'A single-number metric for quantum computer power that accounts for qubit count, connectivity, gate fidelity, and error rates. Developed by IBM for fair cross-platform comparison.',
        related: ['Fidelity', 'NISQ', 'Quantum Supremacy']
    },
    {
        term: 'QAOA',
        definition: 'Quantum Approximate Optimization Algorithm — a hybrid variational algorithm for solving combinatorial optimization problems on NISQ devices. Uses alternating cost and mixer unitaries.',
        related: ['VQE', 'Quantum Annealing', 'NISQ']
    },
    {
        term: 'Qubit',
        definition: 'The fundamental unit of quantum information. Unlike classical bits (0 or 1), a qubit can exist in a superposition α|0⟩ + β|1⟩ where |α|² + |β|² = 1.',
        related: ['Superposition', 'Bloch Sphere', 'Hilbert Space']
    },
    {
        term: 'Qubit Coherence Time',
        definition: 'The duration a qubit can maintain its quantum state before decoherence destroys it. Measured as T1 (relaxation) and T2 (dephasing) times, ranging from microseconds to seconds.',
        related: ['Decoherence', 'Qubit', 'Error Correction']
    },
    {
        term: 'Shor\'s Algorithm',
        definition: 'A quantum algorithm that factors integers in polynomial time, threatening RSA encryption. Reduces factoring to order-finding using quantum Fourier transform.',
        related: ['Quantum Fourier Transform', 'Post-Quantum Cryptography', 'Quantum Algorithm']
    },
    {
        term: 'Superposition',
        definition: 'The principle that a quantum system can exist in multiple states simultaneously. A qubit in superposition α|0⟩ + β|1⟩ has probability |α|² of measuring as 0 and |β|² of measuring as 1.',
        related: ['Qubit', 'Hadamard', 'Measurement']
    },
    {
        term: 'Surface Code',
        definition: 'A leading quantum error correction code that arranges qubits on a 2D lattice with nearest-neighbor interactions. Offers high error threshold (~1%) and topological protection.',
        related: ['Error Correction', 'Topological Qubit', 'Fidelity']
    },
    {
        term: 'SWAP Gate',
        definition: 'A two-qubit gate that exchanges the states of two qubits. Can be decomposed into three CNOT gates. Important for qubit routing in limited-connectivity hardware.',
        related: ['CNOT', 'Gate', 'Quantum Circuit']
    },
    {
        term: 'T-Gate',
        definition: 'A single-qubit phase gate that applies a π/4 phase shift to |1⟩. Non-Clifford gate essential for universal quantum computation. Magic state distillation creates T-gates from noisy resources.',
        related: ['Gate', 'Pauli Gates', 'Error Correction']
    },
    {
        term: 'Tensor Product',
        definition: 'Mathematical operation (⊗) used to combine quantum systems. Two qubits form a 4-dimensional space: |a⟩ ⊗ |b⟩. Essential for describing multi-qubit states and operations.',
        related: ['Entanglement', 'Hilbert Space', 'Qubit']
    },
    {
        term: 'Topological Qubit',
        definition: 'A theoretical qubit type that stores information in topological properties of exotic particles called anyons. Naturally fault-tolerant due to local noise immunity. Pursued by Microsoft.',
        related: ['Error Correction', 'Quantum Hardware', 'Fidelity']
    },
    {
        term: 'Unitary',
        definition: 'A matrix U satisfying U†U = I. All quantum gates are unitary operators — they preserve the norm (total probability = 1) and are reversible. This ensures quantum mechanics is deterministic at state evolution level.',
        related: ['Gate', 'Hermitian', 'Circuit']
    },
    {
        term: 'Variational Algorithm',
        definition: 'A hybrid quantum-classical algorithm where a parameterized quantum circuit is optimized by a classical optimizer. Includes VQE, QAOA, and variational quantum classifiers.',
        related: ['VQE', 'QAOA', 'NISQ']
    },
    {
        term: 'VQE',
        definition: 'Variational Quantum Eigensolver — a hybrid algorithm for finding ground state energies of molecules. Uses parameterized quantum circuits optimized classically. Suited for NISQ devices.',
        related: ['Variational Algorithm', 'QAOA', 'NISQ']
    }
];