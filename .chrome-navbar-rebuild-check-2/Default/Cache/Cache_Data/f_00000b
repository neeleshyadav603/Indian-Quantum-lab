// Blog posts data - shared across blog.html and blog-post.html
window.BLOG_POSTS = [
    {
        id: 'introduction-to-qubits',
        title: 'Introduction to Qubits: Beyond Classical Bits',
        slug: 'introduction-to-qubits',
        category: 'basics',
        categoryLabel: 'Quantum Basics',
        tags: ['qubits', 'superposition', 'basics', 'quantum-mechanics'],
        date: '2026-06-15',
        readTime: 8,
        author: { name: 'Dr. Anil Kumar', initials: 'AK', role: 'Quantum Researcher' },
        views: 2400,
        excerpt: 'Unlike classical bits that exist as 0 or 1, qubits can exist in superposition — a fundamental property that enables quantum parallelism and exponential speedup in specific computations.',
        image: '<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="9" ry="4"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)"/></svg>',
        bibtex: `@article{kumar2026qubits,
  title={Introduction to Qubits: Beyond Classical Bits},
  author={Kumar, Anil},
  journal={Indian Quantum Lab Blog},
  year={2026},
  month={June},
  url={https://indianquantumlab.com/blog/introduction-to-qubits}
}`,
        content: `
            <p>The foundation of quantum computing lies in its most basic unit: the <strong>qubit</strong> (quantum bit). While a classical bit can only exist in one of two states — 0 or 1 — a qubit can exist in a <em>superposition</em> of both states simultaneously.</p>

            <h2 id="classical-vs-quantum">Classical Bits vs Qubits</h2>
            <p>A classical bit is deterministic. It is always exactly 0 or exactly 1. A qubit, however, is described by a quantum state that can be written in Dirac notation as:</p>

            <p><code>|ψ⟩ = α|0⟩ + β|1⟩</code></p>

            <p>where α and β are complex numbers called <strong>probability amplitudes</strong>, and |α|² + |β|² = 1. This constraint ensures that when we measure the qubit, the probabilities sum to 100%.</p>

            <h2 id="bloch-sphere">The Bloch Sphere</h2>
            <p>A single qubit's state can be visualized as a point on the surface of a unit sphere called the <strong>Bloch sphere</strong>. The north pole represents |0⟩, the south pole represents |1⟩, and any point on the equator represents an equal superposition.</p>

            <blockquote>
                <p>"If you think you understand quantum mechanics, you don't understand quantum mechanics." — Richard Feynman</p>
            </blockquote>

            <h2 id="measurement">Measurement and Collapse</h2>
            <p>When we measure a qubit in superposition, its wave function <strong>collapses</strong> to either |0⟩ or |1⟩ with probabilities |α|² and |β|² respectively. This is inherently probabilistic — even if we prepare identical qubits, we may get different outcomes.</p>

            <h3 id="example-code">Example: Qubit in Qiskit</h3>
            <p>Here's how to create a qubit in a superposition state using Qiskit:</p>

            <pre class="line-numbers"><code class="language-python">from qiskit import QuantumCircuit, execute, Aer

# Create a quantum circuit with 1 qubit
qc = QuantumCircuit(1, 1)

# Apply Hadamard gate to create superposition
qc.h(0)

# Measure the qubit
qc.measure(0, 0)

# Simulate
backend = Aer.get_backend('qasm_simulator')
result = execute(qc, backend, shots=1000).result()
counts = result.get_counts()

print(counts)
# Output: {'0': ~500, '1': ~500}</code></pre>

            <h2 id="multi-qubit">Multi-Qubit Systems</h2>
            <p>The real power emerges when we combine qubits. With <em>n</em> qubits, we can represent 2<sup>n</sup> basis states simultaneously. For 3 qubits, we have 8 basis states: |000⟩, |001⟩, ..., |111⟩.</p>

            <p>This exponential scaling is what enables quantum algorithms to outperform classical ones for certain problems — a topic we'll explore in future articles.</p>

            <h2 id="next-steps">Next Steps</h2>
            <p>In the next article, we'll dive into quantum gates and learn how to manipulate qubits. Understanding single-qubit gates like Hadamard, Pauli-X, and phase gates is essential before tackling multi-qubit operations like CNOT.</p>

            <div class="post-callout post-callout-info">
                <div class="post-callout-title"><svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/><path d="M22 10v6"/></svg> Try it yourself</div>
                <p>Head to our <a href="/virtual-lab.html">Virtual Quantum Lab</a> to experiment with qubits and gates directly in your browser — no installation required.</p>
            </div>
        `
    },
    {
        id: 'understanding-hadamard-gate',
        title: 'Understanding the Hadamard Gate',
        slug: 'understanding-hadamard-gate',
        category: 'gates',
        categoryLabel: 'Gates & Circuits',
        tags: ['hadamard', 'gates', 'superposition', 'quantum-circuits'],
        date: '2026-06-10',
        readTime: 10,
        author: { name: 'Prof. Priya Sharma', initials: 'PS', role: 'Quantum Educator' },
        views: 3100,
        excerpt: 'The Hadamard gate is the workhorse of quantum computing. Learn how this simple 2x2 matrix creates perfect superposition and enables quantum algorithms to explore multiple paths simultaneously.',
        image: 'H',
        bibtex: null,
        content: `
            <p>The <strong>Hadamard gate</strong> (H) is arguably the most important single-qubit gate in quantum computing. It transforms a basis state into an equal superposition, enabling the quantum parallelism that powers algorithms like Grover's search and the Quantum Fourier Transform.</p>

            <h2 id="matrix-definition">Matrix Definition</h2>
            <p>The Hadamard gate is defined by the following 2×2 unitary matrix:</p>

            <p><code>H = (1/√2) × [[1, 1], [1, -1]]</code></p>

            <p>Key properties:</p>
            <ul>
                <li><strong>Unitary:</strong> H†H = I (preserves probabilities)</li>
                <li><strong>Hermitian:</strong> H = H† (self-adjoint)</li>
                <li><strong>Self-inverse:</strong> H² = I (applying twice returns to original state)</li>
            </ul>

            <h2 id="effect-on-states">Effect on Basis States</h2>
            <p>When applied to computational basis states:</p>
            <ul>
                <li><code>H|0⟩ = (|0⟩ + |1⟩) / √2 = |+⟩</code></li>
                <li><code>H|1⟩ = (|0⟩ - |1⟩) / √2 = |-⟩</code></li>
            </ul>

            <h2 id="creating-superposition">Creating Superposition</h2>
            <p>Starting from |0⟩, a single Hadamard gate produces a perfect 50-50 superposition. Measure it, and you'll get 0 or 1 with equal probability.</p>

            <pre class="line-numbers"><code class="language-python">from qiskit import QuantumCircuit
from qiskit.visualization import plot_bloch_multivector

qc = QuantumCircuit(1)
qc.h(0)  # Apply Hadamard

# Visualize on Bloch sphere
state = Statevector.from_instruction(qc)
plot_bloch_multivector(state)</code></pre>

            <h2 id="multi-qubit-hadamard">Multi-Qubit Hadamard</h2>
            <p>Applying H to each of n qubits initialized to |0⟩ creates a <strong>uniform superposition</strong> over all 2<sup>n</sup> basis states:</p>

            <p><code>H⊗n |0⟩⊗n = (1/√2<sup>n</sup>) Σ |x⟩</code> for all x ∈ {0,1}<sup>n</sup></p>

            <blockquote>
                <p>This is the starting point of most quantum algorithms. With just n Hadamard gates, you can explore an exponentially large space.</p>
            </blockquote>

            <h2 id="applications">Applications</h2>
            <h3 id="grover">Grover's Algorithm</h3>
            <p>Grover's search begins by creating a uniform superposition with Hadamard gates, then uses quantum interference to amplify the amplitude of the target state.</p>

            <h3 id="qft">Quantum Fourier Transform</h3>
            <p>The QFT uses Hadamard gates alongside controlled phase rotations to transform between computational and frequency bases.</p>

            <h2 id="practice">Practice in Our Virtual Lab</h2>
            <p>Drag the Hadamard gate onto any qubit wire in our <a href="/virtual-lab.html">Virtual Quantum Lab</a> and watch the state vector update in real-time.</p>
        `
    },
    {
        id: 'quantum-entanglement-explained',
        title: 'Quantum Entanglement Explained Simply',
        slug: 'quantum-entanglement-explained',
        category: 'basics',
        categoryLabel: 'Quantum Basics',
        tags: ['entanglement', 'bell-states', 'non-locality'],
        date: '2026-06-05',
        readTime: 12,
        author: { name: 'Dr. Meera Iyer', initials: 'MI', role: 'Quantum Physicist' },
        views: 4800,
        excerpt: 'Einstein called it "spooky action at a distance." Entanglement links qubits so that measuring one instantly determines the other, regardless of distance — enabling quantum teleportation and secure communication.',
        image: '🔗',
        bibtex: null,
        content: `
            <p><strong>Quantum entanglement</strong> is one of the most counterintuitive and powerful phenomena in physics. When two qubits become entangled, their quantum states are correlated in ways that classical physics cannot explain.</p>

            <h2 id="what-is-entanglement">What is Entanglement?</h2>
            <p>Two qubits are entangled when their joint state <em>cannot</em> be written as a product of individual states. For example, the Bell state:</p>

            <p><code>|Φ⁺⟩ = (|00⟩ + |11⟩) / √2</code></p>

            <p>If you measure the first qubit and get |0⟩, the second qubit <strong>instantly</strong> becomes |0⟩ — even if they're light-years apart.</p>

            <h2 id="creating-bell-state">Creating a Bell State</h2>
            <p>The simplest way to entangle two qubits is with a Hadamard + CNOT circuit:</p>

            <pre class="line-numbers"><code class="language-python">from qiskit import QuantumCircuit

qc = QuantumCircuit(2, 2)

# Create superposition on qubit 0
qc.h(0)

# Entangle: qubit 0 controls qubit 1
qc.cx(0, 1)

# Measure both
qc.measure([0, 1], [0, 1])

# You'll get 00 or 11 with equal probability — never 01 or 10!</code></pre>

            <h2 id="epr-paradox">The EPR Paradox</h2>
            <p>In 1935, Einstein, Podolsky, and Rosen argued that entanglement implied quantum mechanics was incomplete. They believed "hidden variables" must exist. Bell's theorem (1964) and subsequent experiments proved them wrong — entanglement is genuinely non-local.</p>

            <blockquote>
                <p>"I cannot believe that God plays dice with the universe." — Albert Einstein, regarding quantum mechanics</p>
            </blockquote>

            <h2 id="applications">Applications</h2>
            <ul>
                <li><strong>Quantum teleportation</strong> — transfer quantum states without physical transmission</li>
                <li><strong>Quantum cryptography</strong> — provably secure communication (BB84 protocol)</li>
                <li><strong>Superdense coding</strong> — send 2 classical bits using 1 qubit</li>
                <li><strong>Quantum computing</strong> — enable algorithms that require correlation between qubits</li>
            </ul>

            <h2 id="no-communication">No Faster-Than-Light Communication</h2>
            <p>Despite the "spooky" instantaneous correlation, entanglement cannot be used to transmit information faster than light. The measurement outcomes are random — you need a classical channel to compare results.</p>

            <div class="post-callout post-callout-info">
                <div class="post-callout-title"><svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3h6"/><path d="M10 3v6L4.5 19A2 2 0 0 0 6.2 22h11.6a2 2 0 0 0 1.7-3L14 9V3"/><path d="M7 16h10"/></svg> Experiment</div>
                <p>Create Bell states and test entanglement in our <a href="/virtual-lab.html">Virtual Quantum Lab</a>. Try the Bell State preset!</p>
            </div>
        `
    },
    {
        id: 'grovers-algorithm-visual-guide',
        title: "Grover's Search Algorithm: A Visual Guide",
        slug: 'grovers-algorithm-visual-guide',
        category: 'algorithms',
        categoryLabel: 'Algorithms',
        tags: ['grovers', 'search', 'quantum-algorithm', 'amplitude-amplification'],
        date: '2026-05-28',
        readTime: 15,
        author: { name: 'Dr. Rajesh Patel', initials: 'RP', role: 'Algorithm Specialist' },
        views: 5200,
        excerpt: "Grover's algorithm finds a marked item in an unsorted database of N items using only √N queries — a quadratic speedup over classical search. Learn how amplitude amplification makes this possible.",
        image: '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
        bibtex: `@article{patel2026grover,
  title={Grover's Search Algorithm: A Visual Guide},
  author={Patel, Rajesh},
  journal={Indian Quantum Lab Blog},
  year={2026},
  url={https://indianquantumlab.com/blog/grovers-algorithm-visual-guide}
}`,
        content: `
            <p>Published by Lov Grover in 1996, <strong>Grover's algorithm</strong> is one of the most famous quantum algorithms after Shor's. It provides a <em>quadratic speedup</em> for unstructured search problems.</p>

            <h2 id="the-problem">The Search Problem</h2>
            <p>Given an unsorted database of N items and a function f(x) that returns 1 for exactly one "marked" item and 0 otherwise, find the marked item.</p>
            <ul>
                <li><strong>Classical:</strong> O(N) queries in the worst case</li>
                <li><strong>Quantum (Grover):</strong> O(√N) queries</li>
            </ul>

            <h2 id="geometric-interpretation">Geometric Interpretation</h2>
            <p>Grover's algorithm can be understood as a rotation in a 2D plane spanned by:</p>
            <ul>
                <li>|marked⟩ — the target state</li>
                <li>|unmarked⟩ — the superposition of all other states</li>
            </ul>

            <p>Each iteration of Grover's operator rotates the state vector toward |marked⟩ by angle 2θ, where sin(θ) = 1/√N.</p>

            <h2 id="the-algorithm">The Algorithm</h2>
            <ol>
                <li>Initialize all qubits to |0⟩</li>
                <li>Apply H⊗n to create uniform superposition</li>
                <li>Repeat O(√N) times:
                    <ul>
                        <li>Apply the <strong>oracle</strong> (flips phase of marked state)</li>
                        <li>Apply the <strong>diffusion operator</strong> (inversion about mean)</li>
                    </ul>
                </li>
                <li>Measure</li>
            </ol>

            <h3 id="oracle">The Oracle</h3>
            <p>The oracle U<sub>f</sub> applies a phase flip to the marked state:</p>
            <p><code>U<sub>f</sub>|x⟩ = (-1)<sup>f(x)</sup>|x⟩</code></p>

            <h3 id="diffusion">The Diffusion Operator</h3>
            <p>The diffusion operator 2|ψ⟩⟨ψ| - I performs "inversion about the mean" — amplifying the marked state's amplitude while reducing others.</p>

            <pre class="line-numbers"><code class="language-python">from qiskit import QuantumCircuit

def grover_oracle(qc, marked_state):
    """Oracle for 2-qubit Grover's, marked = '11'"""
    qc.cz(0, 1)  # Phase flip for |11⟩

def diffusion(qc):
    """Diffusion operator for 2 qubits"""
    qc.h([0, 1])
    qc.x([0, 1])
    qc.cz(0, 1)
    qc.x([0, 1])
    qc.h([0, 1])

# Build circuit
qc = QuantumCircuit(2, 2)
qc.h([0, 1])  # Uniform superposition

# One Grover iteration (optimal for N=4)
grover_oracle(qc, '11')
diffusion(qc)

qc.measure([0, 1], [0, 1])</code></pre>

            <h2 id="optimal-iterations">Optimal Number of Iterations</h2>
            <p>For N items, the optimal number of iterations is approximately <strong>π√N / 4</strong>. Too few iterations = not enough rotation. Too many = overshoot the target!</p>

            <h2 id="applications">Applications Beyond Search</h2>
            <ul>
                <li>SAT problems and constraint satisfaction</li>
                <li>Amplitude amplification as a subroutine</li>
                <li>Quantum machine learning optimizations</li>
                <li>Cryptanalysis (speeding up brute force)</li>
            </ul>

            <blockquote>
                <p>Grover's algorithm shows that quantum computing provides speedups even without the exponential structure exploited by Shor's algorithm.</p>
            </blockquote>
        `
    },
    {
        id: 'shors-algorithm-rsa',
        title: "Shor's Algorithm and the Future of RSA Encryption",
        slug: 'shors-algorithm-rsa',
        category: 'algorithms',
        categoryLabel: 'Algorithms',
        tags: ['shors', 'rsa', 'cryptography', 'factoring'],
        date: '2026-05-20',
        readTime: 18,
        author: { name: 'Dr. Rajesh Patel', initials: 'RP', role: 'Algorithm Specialist' },
        views: 6800,
        excerpt: "Shor's algorithm can factor large integers exponentially faster than classical methods, threatening RSA encryption. Learn the math behind it and why post-quantum cryptography is essential.",
        image: '🔐',
        bibtex: `@article{patel2026shor,
  title={Shor's Algorithm and the Future of RSA},
  author={Patel, Rajesh},
  journal={Indian Quantum Lab Blog},
  year={2026},
  url={https://indianquantumlab.com/blog/shors-algorithm-rsa}
}`,
        content: `
            <p>In 1994, Peter Shor devised an algorithm that could factor large integers <strong>exponentially faster</strong> than the best known classical methods. This breakthrough threatens RSA, the encryption system that secures most of the internet.</p>

            <h2 id="rsa-basics">How RSA Works</h2>
            <p>RSA's security relies on the difficulty of factoring large semiprimes N = p × q, where p and q are large primes. Given only N, finding p and q classically requires sub-exponential but still prohibitive time.</p>

            <h2 id="quantum-speedup">Quantum Speedup</h2>
            <ul>
                <li><strong>Classical best:</strong> L-notation, ~exp(O(n<sup>1/3</sup>(log n)<sup>2/3</sup>))</li>
                <li><strong>Shor's algorithm:</strong> O(n<sup>3</sup>) quantum gates, where n = log N</li>
            </ul>

            <p>For a 2048-bit RSA key, Shor's would need about 4000 logical qubits and ~10<sup>9</sup> gates — feasible within the next 10-20 years.</p>

            <h2 id="the-algorithm">The Algorithm Structure</h2>
            <p>Shor's reduces factoring to <strong>order-finding</strong>: given a and N, find the smallest r such that a<sup>r</sup> ≡ 1 (mod N).</p>

            <ol>
                <li>Classical preprocessing: pick random a coprime to N</li>
                <li>Quantum subroutine: find the order r using QFT</li>
                <li>Classical postprocessing: compute gcd(a<sup>r/2</sup> ± 1, N)</li>
            </ol>

            <h3 id="qft">The Quantum Fourier Transform</h3>
            <p>The QFT is the heart of Shor's algorithm. It transforms periodicity in the amplitudes into peaks in the measurement outcomes.</p>

            <pre class="line-numbers"><code class="language-python"># Simplified QFT implementation
def qft(circuit, n):
    """Apply QFT to first n qubits"""
    for i in range(n):
        circuit.h(i)
        for j in range(i + 1, n):
            angle = math.pi / (2 ** (j - i))
            circuit.cp(angle, j, i)
    # Reverse qubit order
    for i in range(n // 2):
        circuit.swap(i, n - i - 1)</code></pre>

            <h2 id="current-state">Current State of the Art</h2>
            <p>The largest number factored by Shor's on real quantum hardware is 40 — factored by researchers in 2019 using NMR. We're still decades away from breaking real RSA keys.</p>

            <h2 id="post-quantum">Post-Quantum Cryptography</h2>
            <p>NIST has standardized four post-quantum algorithms in 2024:</p>
            <ul>
                <li><strong>CRYSTALS-Kyber</strong> — key encapsulation</li>
                <li><strong>CRYSTALS-Dilithium</strong> — digital signatures</li>
                <li><strong>FALCON</strong> — digital signatures</li>
                <li><strong>SPHINCS+</strong> — hash-based signatures</li>
            </ul>

            <div class="post-callout post-callout-warning">
                <div class="post-callout-title"><svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg> Harvest Now, Decrypt Later</div>
                <p>Adversaries are already collecting encrypted traffic today, storing it until quantum computers mature. Organizations must migrate to post-quantum cryptography <em>now</em>.</p>
            </div>

            <h2 id="india-initiative">India's Quantum Response</h2>
            <p>The National Quantum Mission (2023-2031) has allocated ₹6,000 crores, with significant investment in quantum-safe cryptography research at IISc, IIT Madras, and C-DAC.</p>
        `
    },
    {
        id: 'quantum-hardware-superconducting-trapped-ion',
        title: 'Quantum Hardware: Superconducting vs Trapped Ion',
        slug: 'quantum-hardware-superconducting-trapped-ion',
        category: 'hardware',
        categoryLabel: 'Hardware',
        tags: ['hardware', 'superconducting', 'trapped-ion', 'qubits'],
        date: '2026-05-15',
        readTime: 14,
        author: { name: 'Dr. Vikram Singh', initials: 'VS', role: 'Quantum Hardware Engineer' },
        views: 3400,
        excerpt: 'Two leading approaches dominate quantum hardware: superconducting qubits (IBM, Google) and trapped ions (IonQ, Quantinuum). Compare their coherence times, gate fidelities, and scalability tradeoffs.',
        image: '🔧',
        bibtex: null,
        content: `
            <p>Building a quantum computer requires engineering physical systems that behave quantum mechanically. Two approaches currently lead the race: <strong>superconducting qubits</strong> and <strong>trapped ions</strong>.</p>

            <h2 id="superconducting">Superconducting Qubits</h2>
            <p>Used by IBM, Google, Rigetti, and others. Based on superconducting circuits cooled to ~15 millikelvin.</p>

            <h3 id="transmon">The Transmon</h3>
            <p>The most common superconducting qubit. It's essentially an anharmonic oscillator with two energy levels used as |0⟩ and |1⟩.</p>

            <ul>
                <li><strong>Gate speed:</strong> 10-100 ns (very fast)</li>
                <li><strong>Coherence:</strong> ~100 μs (improving rapidly)</li>
                <li><strong>Gate fidelity:</strong> 99.5%+ for single-qubit, 99%+ for two-qubit</li>
                <li><strong>Scalability:</strong> Excellent — fabricated with lithography</li>
            </ul>

            <h2 id="trapped-ion">Trapped Ion Qubits</h2>
            <p>Used by IonQ, Quantinuum, and Alpine Quantum Technologies. Individual atomic ions trapped in electromagnetic fields and manipulated with lasers.</p>

            <ul>
                <li><strong>Gate speed:</strong> 10-100 μs (slower)</li>
                <li><strong>Coherence:</strong> seconds to minutes (excellent)</li>
                <li><strong>Gate fidelity:</strong> 99.9%+ for both single and two-qubit</li>
                <li><strong>Connectivity:</strong> All-to-all — any ion can interact with any other</li>
            </ul>

            <h2 id="comparison">Head-to-Head Comparison</h2>
            <table>
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Superconducting</th>
                        <th>Trapped Ion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Coherence time</td><td>~100 μs</td><td>seconds to minutes</td></tr>
                    <tr><td>Gate speed</td><td>10-100 ns</td><td>10-100 μs</td></tr>
                    <tr><td>Gate fidelity</td><td>~99.5%</td><td>~99.9%</td></tr>
                    <tr><td>Connectivity</td><td>Nearest-neighbor</td><td>All-to-all</td></tr>
                    <tr><td>Operating temp</td><td>~15 mK</td><td>Room temp (vacuum)</td></tr>
                    <tr><td>Scalability</td><td>High (planar chips)</td><td>Challenging (ion chains)</td></tr>
                </tbody>
            </table>

            <h2 id="india-hardware">Quantum Hardware in India</h2>
            <p>India's quantum hardware ecosystem is growing rapidly:</p>
            <ul>
                <li><strong>IISc Bangalore</strong> — superconducting qubit research</li>
                <li><strong>IIT Bombay</strong> — trapped ion experiments</li>
                <li><strong>RRI (Raman Research Institute)</strong> — quantum optics</li>
                <li><strong>Startups</strong> — QNu Labs, BosonQ Psi</li>
            </ul>

            <blockquote>
                <p>"The race isn't about who has the most qubits today — it's about who builds the first fault-tolerant quantum computer." — Dr. Vikram Singh</p>
            </blockquote>

            <h2 id="future">The Road Ahead</h2>
            <p>Hybrid approaches (combining superconducting processors with ion-based memory) and topological qubits (Microsoft's approach) may ultimately win. For now, both superconducting and trapped ion platforms continue to push the boundaries of what's computationally possible.</p>
        `
    },
    {
        id: 'quantum-error-correction-basics',
        title: 'Quantum Error Correction Basics',
        slug: 'quantum-error-correction-basics',
        category: 'research',
        categoryLabel: 'Research',
        tags: ['error-correction', 'fault-tolerance', 'surface-codes'],
        date: '2026-05-08',
        readTime: 16,
        author: { name: 'Dr. Neha Gupta', initials: 'NG', role: 'Quantum Information Scientist' },
        views: 2900,
        excerpt: 'Quantum computers are inherently noisy. Quantum error correction (QEC) protects fragile quantum information by encoding it across multiple physical qubits. Learn the 3-qubit code and surface codes.',
        image: '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>',
        bibtex: `@article{gupta2026qec,
  title={Quantum Error Correction Basics},
  author={Gupta, Neha},
  journal={Indian Quantum Lab Blog},
  year={2026},
  url={https://indianquantumlab.com/blog/quantum-error-correction-basics}
}`,
        content: `
            <p>Noise is the enemy of quantum computation. Qubits lose coherence, gates are imperfect, and measurements fail. <strong>Quantum error correction (QEC)</strong> is the key to building fault-tolerant quantum computers.</p>

            <h2 id="why-qec">Why QEC is Hard</h2>
            <p>Classical error correction uses redundancy: store 1 bit as 3 bits (000 or 111), and majority-vote to correct errors. Quantum faces three obstacles:</p>
            <ul>
                <li><strong>No-cloning theorem:</strong> Can't copy quantum states</li>
                <li><strong>Measurement destroys states:</strong> Can't peek at qubits without collapsing them</li>
                <li><strong>Continuous errors:</strong> Qubits can rotate by arbitrary small angles</li>
            </ul>

            <h2 id="three-qubit-code">The 3-Qubit Bit-Flip Code</h2>
            <p>The simplest QEC code protects against bit-flip errors (X errors):</p>

            <p><code>|0⟩ → |000⟩</code> and <code>|1⟩ → |111⟩</code></p>

            <p>An arbitrary state α|0⟩ + β|1⟩ becomes α|000⟩ + β|111⟩. We detect errors by measuring <strong>parities</strong> (Z₁Z₂ and Z₂Z₃) without learning the state itself.</p>

            <pre class="line-numbers"><code class="language-python">def encode_bit_flip(qc, data_qubit, ancilla1, ancilla2):
    """Encode into 3-qubit bit-flip code"""
    qc.cx(data_qubit, ancilla1)
    qc.cx(data_qubit, ancilla2)

def detect_error(qc, q0, q1, q2, ancilla1, ancilla2):
    """Measure parity checks"""
    qc.cx(q0, ancilla1)
    qc.cx(q1, ancilla1)
    qc.cx(q1, ancilla2)
    qc.cx(q2, ancilla2)
    qc.measure([ancilla1, ancilla2], [0, 1])</code></pre>

            <h2 id="shor-code">The Shor Code</h2>
            <p>Peter Shor's 9-qubit code was the first QEC code that could correct <em>any</em> single-qubit error (X, Y, Z, or combinations). It combines bit-flip and phase-flip protection.</p>

            <h2 id="surface-codes">Surface Codes</h2>
            <p>The most promising approach for near-term fault tolerance. Qubits are arranged in a 2D lattice with nearest-neighbor interactions:</p>

            <ul>
                <li><strong>High threshold:</strong> ~1% error rate tolerable</li>
                <li><strong>Local measurements:</strong> Only adjacent qubits interact</li>
                <li><strong>Topological protection:</strong> Errors must form chains across the lattice</li>
            </ul>

            <h2 id="overhead">The Overhead Problem</h2>
            <p>Current estimates suggest <strong>1000-10,000 physical qubits</strong> are needed per logical qubit at realistic error rates. This means a useful quantum computer with 1000 logical qubits requires millions of physical qubits.</p>

            <blockquote>
                <p>"Error correction isn't optional — it's the defining challenge of our field." — Barbara Terhal, quantum information theorist</p>
            </blockquote>

            <h2 id="india-research">QEC Research in India</h2>
            <p>Several Indian institutions lead QEC research:</p>
            <ul>
                <li>IISc Bangalore — surface code implementations</li>
                <li>TIFR Mumbai — topological codes</li>
                <li>IMSc Chennai — theoretical advances</li>
                <li>IIT Madras — hardware-aware QEC</li>
            </ul>

            <div class="post-callout post-callout-info">
                <div class="post-callout-title"><svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"/></svg> Learn More</div>
                <p>Our <a href="/courses.html">Advanced Quantum Algorithms course</a> covers QEC in depth with hands-on Qiskit implementations.</p>
            </div>
        `
    },
    {
        id: 'first-quantum-circuit-qiskit',
        title: 'Building Your First Quantum Circuit with Qiskit',
        slug: 'first-quantum-circuit-qiskit',
        category: 'gates',
        categoryLabel: 'Gates & Circuits',
        tags: ['qiskit', 'tutorial', 'quantum-circuits', 'python'],
        date: '2026-04-28',
        readTime: 12,
        author: { name: 'Prof. Priya Sharma', initials: 'PS', role: 'Quantum Educator' },
        views: 7500,
        excerpt: 'Step-by-step tutorial for building and running your first quantum circuit using IBM Qiskit. From installing the SDK to executing on real quantum hardware via the cloud.',
        image: '💻',
        bibtex: null,
        content: `
            <p>Qiskit is IBM's open-source SDK for quantum computing. In this tutorial, you'll build your first circuit, simulate it, and run it on a real quantum computer — all for free.</p>

            <h2 id="installation">Installation</h2>
            <pre class="line-numbers"><code class="language-bash">pip install qiskit
pip install qiskit-ibm-runtime</code></pre>

            <h2 id="first-circuit">Your First Circuit</h2>
            <p>Let's create a simple Bell state — two entangled qubits:</p>

            <pre class="line-numbers"><code class="language-python">from qiskit import QuantumCircuit
from qiskit.visualization import plot_histogram

# Create circuit with 2 qubits and 2 classical bits
qc = QuantumCircuit(2, 2)

# Step 1: Create superposition on qubit 0
qc.h(0)

# Step 2: Entangle qubits with CNOT
qc.cx(0, 1)

# Step 3: Measure both qubits
qc.measure([0, 1], [0, 1])

# Draw the circuit
print(qc.draw())</code></pre>

            <p>Output:</p>
            <pre><code>     ┌───┐     ┌─┐
q_0: ┤ H ├──■──┤M├───
     └───┘┌─┴─┐└╥┘┌─┐
q_1: ─────┤ X ├─╫─┤M├
          └───┘ ║ └╥┘
c: 2/═══════════╩══╩═
                0  1</code></pre>

            <h2 id="simulation">Local Simulation</h2>
            <pre class="line-numbers"><code class="language-python">from qiskit_aer import AerSimulator

# Simulate locally
simulator = AerSimulator()
result = simulator.run(qc, shots=1000).result()
counts = result.get_counts()

print(counts)
# Output: {'00': ~500, '11': ~500}

# Visualize
plot_histogram(counts)</code></pre>

            <h2 id="real-hardware">Running on Real Quantum Hardware</h2>
            <p>IBM offers free access to real quantum computers via IBM Quantum Platform:</p>

            <pre class="line-numbers"><code class="language-python">from qiskit_ibm_runtime import QiskitRuntimeService

# Save your IBM Quantum API token (one-time)
QiskitRuntimeService.save_account(
    channel="ibm_quantum",
    token="YOUR_API_TOKEN"
)

# Load the service
service = QiskitRuntimeService()

# Get the least busy backend
backend = service.least_busy(simulator=False, operational=True)

# Run your circuit
from qiskit_ibm_runtime import Sampler
sampler = Sampler(backend)
result = sampler.run([qc]).result()

print(result[0].data)</code></pre>

            <h2 id="advanced-tips">Advanced Tips</h2>
            <ul>
                <li><strong>Transpile</strong> your circuit for the target backend's gate set</li>
                <li>Use <strong>error mitigation</strong> techniques for more accurate results</li>
                <li>Batch multiple circuits to reduce queue wait times</li>
                <li>Monitor job status with <code>job.status()</code></li>
            </ul>

            <h2 id="next-steps">Next Steps</h2>
            <p>Now that you've built your first circuit, explore:</p>
            <ul>
                <li>Multi-qubit gates (Toffoli, SWAP)</li>
                <li>Parameterized circuits for variational algorithms</li>
                <li>Qiskit Runtime primitives for efficient execution</li>
            </ul>

            <div class="post-callout post-callout-info">
                <div class="post-callout-title"><svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/><path d="M22 10v6"/></svg> Continue Learning</div>
                <p>Our <a href="/courses.html">Quantum Gates and Circuits course</a> covers everything from basic gates to complex algorithms, with hands-on Qiskit projects.</p>
            </div>
        `
    },
    {
        id: 'future-quantum-computing-india',
        title: 'The Future of Quantum Computing in India',
        slug: 'future-quantum-computing-india',
        category: 'news',
        categoryLabel: 'News',
        tags: ['india', 'national-quantum-mission', 'policy', 'ecosystem'],
        date: '2026-04-15',
        readTime: 9,
        author: { name: 'Dr. Anil Kumar', initials: 'AK', role: 'Quantum Researcher' },
        views: 8900,
        excerpt: "India's National Quantum Mission (2023-2031) with ₹6,000 crore investment aims to establish the country as a quantum leader. Explore the ecosystem: IITs, startups, government initiatives, and career opportunities.",
        image: '🇮🇳',
        bibtex: null,
        content: `
            <p>India is rapidly emerging as a global player in quantum technology. With the launch of the <strong>National Quantum Mission (NQM)</strong> in 2023, the country has committed ₹6,000 crores (about $730 million) over 8 years to accelerate quantum research and commercialization.</p>

            <h2 id="national-quantum-mission">The National Quantum Mission</h2>
            <p>The NQM focuses on four key themes:</p>
            <ol>
                <li><strong>Quantum Computing</strong> — 50-1000 physical qubit systems</li>
                <li><strong>Quantum Communication</strong> — satellite and fiber-based QKD across 2000 km</li>
                <li><strong>Quantum Sensing & Metrology</strong> — ultra-precise sensors and clocks</li>
                <li><strong>Quantum Materials & Devices</strong> — novel superconductors, photonics</li>
            </ol>

            <h2 id="academic-hubs">Academic Research Hubs</h2>
            <p>India's top institutions are leading quantum research:</p>

            <ul>
                <li><strong>IISc Bangalore</strong> — superconducting qubits, quantum algorithms</li>
                <li><strong>IIT Bombay</strong> — quantum hardware, cryogenic systems</li>
                <li><strong>IIT Madras</strong> — quantum photonics, cryptography</li>
                <li><strong>IIT Delhi</strong> — quantum machine learning</li>
                <li><strong>TIFR Mumbai</strong> — topological quantum computing</li>
                <li><strong>RRI Bangalore</strong> — quantum optics and information</li>
                <li><strong>IISER Pune</strong> — quantum chemistry applications</li>
            </ul>

            <h2 id="startup-ecosystem">Startup Ecosystem</h2>
            <p>India's quantum startup scene has exploded since 2020:</p>

            <ul>
                <li><strong>QNu Labs</strong> (Bangalore) — quantum cryptography products, QKD systems</li>
                <li><strong>BosonQ Psi</strong> (Hyderabad) — quantum simulation for materials</li>
                <li><strong>QpiAI</strong> (Bangalore) — quantum AI and optimization</li>
                <li><strong>TaQsY Quantum</strong> (IIT Madras incubated) — quantum software</li>
                <li><strong>QuNu Labs</strong> — quantum sensing</li>
            </ul>

            <h2 id="industry-adoption">Industry Adoption</h2>
            <p>Major Indian companies are exploring quantum:</p>

            <ul>
                <li><strong>TCS</strong> — quantum algorithm research, consulting</li>
                <li><strong>Infosys</strong> — Quantum Living Lab for clients</li>
                <li><strong>Wipro</strong> — quantum optimization services</li>
                <li><strong>HCL</strong> — partnerships with IBM Quantum</li>
                <li><strong>SBI</strong> — exploring quantum for fraud detection</li>
                <li><strong>DRDO</strong> — quantum communication for defense</li>
            </ul>

            <h2 id="career-opportunities">Career Opportunities</h2>
            <p>Quantum is a booming field in India. High-demand roles:</p>

            <ul>
                <li><strong>Quantum Algorithm Researcher</strong> — PhD, ₹25-50 LPA</li>
                <li><strong>Quantum Hardware Engineer</strong> — M.Tech, ₹18-35 LPA</li>
                <li><strong>Quantum Software Developer</strong> — B.Tech, ₹15-30 LPA</li>
                <li><strong>Quantum Cryptography Specialist</strong> — M.Tech, ₹20-40 LPA</li>
            </ul>

            <h2 id="challenges">Challenges Ahead</h2>
            <ul>
                <li><strong>Talent shortage:</strong> Need 10,000+ trained quantum professionals by 2030</li>
                <li><strong>Hardware access:</strong> Dependence on foreign quantum computers</li>
                <li><strong>Funding gaps:</strong> Early-stage startups need more VC support</li>
                <li><strong>Industry-academia gap:</strong> Better collaboration needed</li>
            </ul>

            <blockquote>
                <p>"India has the talent, the scale, and now the government support. This is our decade to lead in quantum." — Prof. K. VijayRaghavan, former Principal Scientific Adviser</p>
            </blockquote>

            <h2 id="how-to-get-involved">How to Get Involved</h2>
            <ul>
                <li>Take free courses on our platform</li>
                <li>Join the <a href="/community.html">Indian Quantum Community</a></li>
                <li>Participate in QHack, IBM Quantum Challenge</li>
                <li>Apply to IIT/IISc quantum labs for graduate study</li>
                <li>Follow quantum startups and attend conferences like Q2B India</li>
            </ul>

            <div class="post-callout post-callout-info">
                <div class="post-callout-title">🇮🇳 Join the Movement</div>
                <p>Whether you're a student, researcher, or professional, now is the perfect time to learn quantum computing. Start with our <a href="/learn.html">free learning pathways</a> and join 1000+ Indian learners.</p>
            </div>
        `
    }
];

// Helper: format date
window.formatBlogDate = function(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Helper: get tag class
window.getTagClass = function(category) {
    const map = {
        basics: 'tag-pill-basics',
        gates: 'tag-pill-gates',
        algorithms: 'tag-pill-algorithms',
        hardware: 'tag-pill-hardware',
        research: 'tag-pill-research',
        news: 'tag-pill-news'
    };
    return map[category] || 'tag-pill';
};