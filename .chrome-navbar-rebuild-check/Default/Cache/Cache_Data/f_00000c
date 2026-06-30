(function() {
    'use strict';

    // ==================== QUANTUM GATE DEFINITIONS ====================
    const GATES = {
        H: {
            name: 'Hadamard',
            color: '#7c3aed',
            matrix: math.matrix([
                [1 / Math.sqrt(2), 1 / Math.sqrt(2)],
                [1 / Math.sqrt(2), -1 / Math.sqrt(2)]
            ])
        },
        X: {
            name: 'Pauli-X',
            color: '#ff4444',
            matrix: math.matrix([
                [math.complex(0, 0), math.complex(1, 0)],
                [math.complex(1, 0), math.complex(0, 0)]
            ])
        },
        Y: {
            name: 'Pauli-Y',
            color: '#00ff88',
            matrix: math.matrix([
                [math.complex(0, 0), math.complex(0, -1)],
                [math.complex(0, 1), math.complex(0, 0)]
            ])
        },
        Z: {
            name: 'Pauli-Z',
            color: '#3b82f6',
            matrix: math.matrix([
                [math.complex(1, 0), math.complex(0, 0)],
                [math.complex(0, 0), math.complex(-1, 0)]
            ])
        },
        T: {
            name: 'T-gate',
            color: '#00d4ff',
            matrix: math.matrix([
                [math.complex(1, 0), math.complex(0, 0)],
                [math.complex(0, 0), math.exp(math.multiply(math.complex(0, 1), Math.PI / 4))]
            ])
        },
        S: {
            name: 'S-gate',
            color: '#ffaa00',
            matrix: math.matrix([
                [math.complex(1, 0), math.complex(0, 0)],
                [math.complex(0, 0), math.complex(0, 1)]
            ])
        },
        CNOT: {
            name: 'CNOT',
            color: '#ff8800'
            // Matrix built dynamically based on control/target
        }
    };

    const NUM_QUBITS = 3;
    const NUM_STEPS = 8;

    // ==================== CIRCUIT STATE ====================
    class QuantumCircuit {
        constructor() {
            this.numQubits = NUM_QUBITS;
            this.numSteps = NUM_STEPS;
            // circuit[qubit][step] = { type: 'H' | 'X' | ... } | { type: 'CNOT', control, target } | null
            this.circuit = Array.from({ length: this.numQubits }, () => 
                Array.from({ length: this.numSteps }, () => null)
            );
            this.cnotPlacing = false;
            this.cnotControl = null;
        }

        addGate(gateType, qubit, step) {
            if (qubit < 0 || qubit >= this.numQubits) return false;
            if (step < 0 || step >= this.numSteps) return false;
            this.circuit[qubit][step] = { type: gateType };
            return true;
        }

        addCNOT(control, target, step) {
            if (control === target) return false;
            if (step < 0 || step >= this.numSteps) return false;
            this.circuit[control][step] = { type: 'CNOT', role: 'control', partner: target };
            this.circuit[target][step] = { type: 'CNOT', role: 'target', partner: control };
            return true;
        }

        removeGate(qubit, step) {
            const gate = this.circuit[qubit][step];
            if (!gate) return;
            if (gate.type === 'CNOT') {
                // Remove both ends
                this.circuit[gate.partner][step] = null;
            }
            this.circuit[qubit][step] = null;
        }

        getGateCount() {
            let count = 0;
            const counted = new Set();
            for (let q = 0; q < this.numQubits; q++) {
                for (let s = 0; s < this.numSteps; s++) {
                    const g = this.circuit[q][s];
                    if (g) {
                        const key = `${s}-${g.type === 'CNOT' ? Math.min(q, g.partner) + '-' + Math.max(q, g.partner) : q}`;
                        if (!counted.has(key)) {
                            counted.add(key);
                            count++;
                        }
                    }
                }
            }
            return count;
        }

        clear() {
            this.circuit = Array.from({ length: this.numQubits }, () => 
                Array.from({ length: this.numSteps }, () => null)
            );
        }

        // Simulate the circuit and return final state vector
        simulate() {
            const dim = Math.pow(2, this.numQubits);
            // Initial state |00...0⟩
            let state = math.zeros(dim, 1);
            state.set([0, 0], math.complex(1, 0));

            // Apply gates step by step
            for (let step = 0; step < this.numSteps; step++) {
                // Find gates at this step
                const gatesAtStep = [];
                const processed = new Set();
                
                for (let q = 0; q < this.numQubits; q++) {
                    const gate = this.circuit[q][step];
                    if (gate && !processed.has(q)) {
                        if (gate.type === 'CNOT') {
                            const control = gate.role === 'control' ? q : gate.partner;
                            const target = gate.role === 'target' ? q : gate.partner;
                            gatesAtStep.push({ type: 'CNOT', control, target });
                            processed.add(control);
                            processed.add(target);
                        } else {
                            gatesAtStep.push({ type: gate.type, qubit: q });
                            processed.add(q);
                        }
                    }
                }

                // Apply each gate
                for (const gate of gatesAtStep) {
                    let opMatrix;
                    if (gate.type === 'CNOT') {
                        opMatrix = this.buildCNOTMatrix(gate.control, gate.target);
                    } else {
                        opMatrix = this.buildSingleQubitMatrix(gate.type, gate.qubit);
                    }
                    state = math.multiply(opMatrix, state);
                }
            }

            return state;
        }

        buildSingleQubitMatrix(gateType, targetQubit) {
            const gateMatrix = GATES[gateType].matrix;
            const I = math.identity(2);
            
            // Build tensor product: I ⊗ I ⊗ G ⊗ I ⊗ I
            // Note: qubit 0 is most significant (leftmost)
            let result = null;
            for (let i = 0; i < this.numQubits; i++) {
                const piece = (i === targetQubit) ? gateMatrix : I;
                result = result === null ? piece : math.kron(result, piece);
            }
            return result;
        }

        buildCNOTMatrix(control, target) {
            const dim = Math.pow(2, this.numQubits);
            const matrix = math.zeros(dim, dim);
            
            for (let i = 0; i < dim; i++) {
                // Check if control qubit is 1 in basis state i
                const controlBit = (i >> (this.numQubits - 1 - control)) & 1;
                let j = i;
                if (controlBit === 1) {
                    // Flip target bit
                    j ^= (1 << (this.numQubits - 1 - target));
                }
                matrix.set([j, i], math.complex(1, 0));
            }
            return matrix;
        }

        loadPreset(preset) {
            this.clear();
            switch (preset) {
                case 'bell':
                    this.addGate('H', 0, 0);
                    this.addCNOT(0, 1, 1);
                    break;
                case 'ghz':
                    this.addGate('H', 0, 0);
                    this.addCNOT(0, 1, 1);
                    this.addCNOT(1, 2, 2);
                    break;
                case 'qft2':
                    this.addGate('H', 0, 0);
                    this.addCNOT(1, 0, 1); // controlled-S (approximated)
                    this.addGate('S', 0, 2);
                    this.addGate('H', 1, 3);
                    break;
                case 'teleport':
                    this.addGate('H', 0, 0);
                    this.addGate('H', 1, 0);
                    this.addCNOT(1, 2, 1);
                    this.addCNOT(0, 1, 2);
                    this.addGate('H', 0, 3);
                    this.addCNOT(1, 2, 4);
                    this.addGate('Z', 2, 5);
                    break;
                case 'clear':
                    // Already cleared
                    break;
            }
        }

        randomize() {
            this.clear();
            const singleGates = ['H', 'X', 'Y', 'Z', 'T', 'S'];
            const numGates = 3 + Math.floor(Math.random() * 5);
            
            for (let i = 0; i < numGates; i++) {
                const step = Math.floor(Math.random() * this.numSteps);
                const qubit = Math.floor(Math.random() * this.numQubits);
                if (this.circuit[qubit][step] === null) {
                    if (Math.random() < 0.3 && qubit < this.numQubits - 1) {
                        // Try CNOT
                        const target = (qubit + 1) % this.numQubits;
                        if (this.circuit[target][step] === null) {
                            this.addCNOT(qubit, target, step);
                        } else {
                            this.addGate(singleGates[Math.floor(Math.random() * singleGates.length)], qubit, step);
                        }
                    } else {
                        this.addGate(singleGates[Math.floor(Math.random() * singleGates.length)], qubit, step);
                    }
                }
            }
        }
    }

    // ==================== RENDERER ====================
    class CircuitRenderer {
        constructor(canvas, circuit) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.circuit = circuit;
            
            // Responsive sizing
            this.paddingLeft = 60;
            this.paddingTop = 50;
            this.cellWidth = 75;
            this.cellHeight = 75;
            this.gateSize = 48;
            
            this.resize();
            window.addEventListener('resize', () => this.resize());
        }

        resize() {
            const rect = this.canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            this.canvas.width = rect.width * dpr;
            this.canvas.height = rect.height * dpr;
            this.ctx.scale(dpr, dpr);
            this.width = rect.width;
            this.height = rect.height;
            
            // Recalculate dimensions to fit
            const availableWidth = this.width - this.paddingLeft - 20;
            const newCellWidth = Math.min(75, availableWidth / this.circuit.numSteps);
            this.cellWidth = newCellWidth;
            this.cellHeight = Math.min(75, (this.height - this.paddingTop - 20) / this.circuit.numQubits);
            this.gateSize = Math.min(48, this.cellHeight * 0.7);
            
            this.draw();
        }

        draw() {
            const ctx = this.ctx;
            const theme = document.documentElement.getAttribute('data-theme');
            const wireColor = theme === 'dark' ? '#00d4ff' : '#7c3aed';
            const textColor = theme === 'dark' ? '#e8eaed' : '#0a0a2e';
            const bgColor = theme === 'dark' ? '#131350' : '#ffffff';
            const gridColor = theme === 'dark' ? 'rgba(0, 212, 255, 0.08)' : 'rgba(124, 58, 237, 0.06)';
            
            // Clear
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, this.width, this.height);

            // Draw subtle grid
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 1;
            for (let s = 0; s <= this.circuit.numSteps; s++) {
                const x = this.paddingLeft + s * this.cellWidth;
                ctx.beginPath();
                ctx.moveTo(x, this.paddingTop - 10);
                ctx.lineTo(x, this.paddingTop + this.circuit.numQubits * this.cellHeight);
                ctx.stroke();
            }

            // Draw qubit wires and labels
            ctx.strokeStyle = wireColor;
            ctx.lineWidth = 2;
            ctx.fillStyle = textColor;
            ctx.font = `bold 14px ${getComputedStyle(document.body).fontFamily}`;
            ctx.textBaseline = 'middle';
            
            for (let q = 0; q < this.circuit.numQubits; q++) {
                const y = this.paddingTop + q * this.cellHeight + this.cellHeight / 2;
                
                // Label
                ctx.fillStyle = textColor;
                ctx.fillText(`|q${q}⟩`, 10, y);
                
                // Wire
                ctx.strokeStyle = wireColor;
                ctx.beginPath();
                ctx.moveTo(this.paddingLeft, y);
                ctx.lineTo(this.paddingLeft + this.circuit.numSteps * this.cellWidth, y);
                ctx.stroke();

                // Initial state indicator
                ctx.fillStyle = theme === 'dark' ? 'rgba(0, 212, 255, 0.3)' : 'rgba(124, 58, 237, 0.3)';
                ctx.font = `italic 11px ${getComputedStyle(document.body).fontFamily}`;
                ctx.fillText('|0⟩', this.paddingLeft + 2, y - 15);
            }

            // Draw step numbers
            ctx.fillStyle = textColor;
            ctx.font = `bold 10px ${getComputedStyle(document.body).fontFamily}`;
            ctx.textAlign = 'center';
            for (let s = 0; s < this.circuit.numSteps; s++) {
                ctx.fillText(`t${s + 1}`, this.paddingLeft + s * this.cellWidth + this.cellWidth / 2, this.paddingTop - 25);
            }
            ctx.textAlign = 'left';

            // Draw gates
            for (let q = 0; q < this.circuit.numQubits; q++) {
                for (let s = 0; s < this.circuit.numSteps; s++) {
                    const gate = this.circuit.circuit[q][s];
                    if (!gate) continue;
                    
                    const x = this.paddingLeft + s * this.cellWidth + this.cellWidth / 2;
                    const y = this.paddingTop + q * this.cellHeight + this.cellHeight / 2;
                    
                    if (gate.type === 'CNOT') {
                        this.drawCNOT(s, gate);
                    } else {
                        this.drawSingleGate(x, y, gate.type);
                    }
                }
            }

            // Draw CNOT placement indicator
            if (this.circuit.cnotPlacing && this.circuit.cnotControl !== null) {
                const control = this.circuit.cnotControl;
                const y = this.paddingTop + control * this.cellHeight + this.cellHeight / 2;
                ctx.strokeStyle = '#ff8800';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.moveTo(this.paddingLeft, y);
                ctx.lineTo(this.paddingLeft + this.circuit.numSteps * this.cellWidth, y);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }

        drawSingleGate(x, y, type) {
            const ctx = this.ctx;
            const gate = GATES[type];
            const size = this.gateSize;
            
            // Shadow
            ctx.shadowColor = gate.color;
            ctx.shadowBlur = 12;
            
            // Box
            ctx.fillStyle = gate.color;
            ctx.beginPath();
            const r = 6;
            ctx.roundRect(x - size/2, y - size/2, size, size, r);
            ctx.fill();
            
            ctx.shadowBlur = 0;
            
            // Border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Text
            ctx.fillStyle = ['#00ff88', '#00d4ff', '#ffaa00'].includes(gate.color) ? '#0a0a2e' : '#ffffff';
            ctx.font = `bold ${size * 0.4}px ${getComputedStyle(document.body).fontFamily}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(type, x, y);
            ctx.textAlign = 'left';
        }

        drawCNOT(step, gateInfo) {
            const ctx = this.ctx;
            const x = this.paddingLeft + step * this.cellWidth + this.cellWidth / 2;
            
            // Find control and target
            let control, target;
            if (gateInfo.role === 'control') {
                control = this.circuit.circuit.indexOf(
                    this.circuit.circuit.find(row => row[step] && row[step].type === 'CNOT' && row[step].role === 'control')
                );
                // Simpler: look up from gate info
            }
            
            // Scan to find both endpoints
            let controlQ = -1, targetQ = -1;
            for (let q = 0; q < this.circuit.numQubits; q++) {
                const g = this.circuit.circuit[q][step];
                if (g && g.type === 'CNOT') {
                    if (g.role === 'control') controlQ = q;
                    else targetQ = q;
                }
            }
            if (controlQ === -1 || targetQ === -1) return;

            const yControl = this.paddingTop + controlQ * this.cellHeight + this.cellHeight / 2;
            const yTarget = this.paddingTop + targetQ * this.cellHeight + this.cellHeight / 2;

            // Vertical line
            ctx.strokeStyle = GATES.CNOT.color;
            ctx.lineWidth = 2;
            ctx.shadowColor = GATES.CNOT.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.moveTo(x, yControl);
            ctx.lineTo(x, yTarget);
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Control dot
            ctx.fillStyle = GATES.CNOT.color;
            ctx.beginPath();
            ctx.arc(x, yControl, 7, 0, Math.PI * 2);
            ctx.fill();

            // Target circle with cross
            ctx.strokeStyle = GATES.CNOT.color;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(x, yTarget, 12, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x - 12, yTarget);
            ctx.lineTo(x + 12, yTarget);
            ctx.moveTo(x, yTarget - 12);
            ctx.lineTo(x, yTarget + 12);
            ctx.stroke();
        }

        getCellFromCoords(x, y) {
            if (x < this.paddingLeft || y < this.paddingTop) return null;
            const step = Math.floor((x - this.paddingLeft) / this.cellWidth);
            const qubit = Math.floor((y - this.paddingTop) / this.cellHeight);
            if (step < 0 || step >= this.circuit.numSteps) return null;
            if (qubit < 0 || qubit >= this.circuit.numQubits) return null;
            return { qubit, step };
        }

        exportPNG() {
            const link = document.createElement('a');
            link.download = `quantum-circuit-${Date.now()}.png`;
            link.href = this.canvas.toDataURL('image/png');
            link.click();
        }
    }

    // ==================== MAIN APP ====================
    class CircuitVisualizer {
        constructor() {
            this.circuit = new QuantumCircuit();
            this.canvas = document.getElementById('circuitCanvas');
            this.renderer = new CircuitRenderer(this.canvas, this.circuit);
            this.setupDragDrop();
            this.setupInteractions();
            this.setupPresets();
            this.updateDisplay();
        }

        setupDragDrop() {
            const paletteItems = document.querySelectorAll('.gate-item[draggable="true"]');
            
            paletteItems.forEach(item => {
                item.addEventListener('dragstart', (e) => {
                    const gate = item.dataset.gate;
                    e.dataTransfer.setData('text/plain', gate);
                    e.dataTransfer.effectAllowed = 'copy';
                });
            });

            // CNOT click handler
            const cnotItem = document.querySelector('.gate-cnot-item');
            if (cnotItem) {
                cnotItem.addEventListener('click', () => {
                    this.circuit.cnotPlacing = true;
                    this.circuit.cnotControl = null;
                    cnotItem.classList.add('active');
                    this.setStatus('Click on a qubit wire to set CNOT control');
                });
            }

            this.canvas.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
            });

            this.canvas.addEventListener('drop', (e) => {
                e.preventDefault();
                const gateType = e.dataTransfer.getData('text/plain');
                if (!gateType || gateType === 'CNOT') return;
                
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cell = this.renderer.getCellFromCoords(x, y);
                
                if (cell) {
                    this.circuit.addGate(gateType, cell.qubit, cell.step);
                    this.updateDisplay();
                }
            });

            // CNOT placement via click
            this.canvas.addEventListener('click', (e) => {
                if (!this.circuit.cnotPlacing) return;
                
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cell = this.renderer.getCellFromCoords(x, y);
                
                if (!cell) return;
                
                if (this.circuit.cnotControl === null) {
                    // First click: set control
                    this.circuit.cnotControl = cell.qubit;
                    this.circuit.cnotControlStep = cell.step;
                    this.setStatus(`Control on q${cell.qubit}. Now click target qubit at step t${cell.step + 1}`);
                    this.renderer.draw();
                } else {
                    // Second click: set target and place CNOT
                    if (cell.qubit !== this.circuit.cnotControl && cell.step === this.circuit.cnotControlStep) {
                        if (this.circuit.circuit[cell.qubit][cell.step] === null) {
                            this.circuit.addCNOT(this.circuit.cnotControl, cell.qubit, cell.step);
                            this.setStatus(`CNOT placed: control=q${this.circuit.cnotControl}, target=q${cell.qubit}`);
                        } else {
                            this.setStatus('That cell is occupied. CNOT cancelled.');
                        }
                    } else {
                        this.setStatus('Target must be different qubit at same step. CNOT cancelled.');
                    }
                    this.circuit.cnotPlacing = false;
                    this.circuit.cnotControl = null;
                    cnotItem.classList.remove('active');
                    this.updateDisplay();
                }
            });

            // Right-click to remove
            this.canvas.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cell = this.renderer.getCellFromCoords(x, y);
                if (cell && this.circuit.circuit[cell.qubit][cell.step]) {
                    this.circuit.removeGate(cell.qubit, cell.step);
                    this.updateDisplay();
                }
            });
        }

        setupInteractions() {
            document.getElementById('resetBtn').addEventListener('click', () => {
                this.circuit.clear();
                this.updateDisplay();
                this.setStatus('Circuit cleared');
            });

            document.getElementById('randomBtn').addEventListener('click', () => {
                this.circuit.randomize();
                this.updateDisplay();
                this.setStatus('Random circuit generated');
            });

            document.getElementById('exportBtn').addEventListener('click', () => {
                this.renderer.exportPNG();
            });
        }

        setupPresets() {
            document.getElementById('presetSelect').addEventListener('change', (e) => {
                const preset = e.target.value;
                if (preset) {
                    this.circuit.loadPreset(preset);
                    this.updateDisplay();
                    this.setStatus(`Loaded preset: ${e.target.options[e.target.selectedIndex].text}`);
                    e.target.value = '';
                }
            });
        }

        setStatus(message) {
            const status = document.getElementById('paletteStatus');
            if (status) status.textContent = message;
        }

        updateDisplay() {
            this.renderer.draw();
            this.updateGateCount();
            this.updateStateVector();
            this.updateProbabilities();
        }

        updateGateCount() {
            const el = document.getElementById('gateCount');
            if (el) {
                el.innerHTML = `Gates: <strong>${this.circuit.getGateCount()}</strong>`;
            }
        }

        updateStateVector() {
            const container = document.getElementById('stateVector');
            if (!container) return;

            const state = this.circuit.simulate();
            const dim = state.size()[0];
            let html = '';
            
            for (let i = 0; i < dim; i++) {
                const amplitude = state.get([i, 0]);
                const basisLabel = '|' + i.toString(2).padStart(this.circuit.numQubits, '0') + '⟩';
                
                const real = amplitude.re;
                const imag = amplitude.im;
                const magnitude = Math.sqrt(real * real + imag * imag);
                
                let ampStr;
                if (magnitude < 1e-6) {
                    ampStr = '0';
                    html += `<div class="state-row"><span class="state-basis">${basisLabel}</span><span class="state-amplitude state-zero">${ampStr}</span></div>`;
                } else {
                    const realStr = formatNumber(real);
                    const imagStr = formatNumber(Math.abs(imag));
                    const sign = imag >= 0 ? '+' : '-';
                    if (Math.abs(imag) < 1e-6) {
                        ampStr = realStr;
                    } else if (Math.abs(real) < 1e-6) {
                        ampStr = `${sign === '-' ? '-' : ''}${imagStr}i`;
                    } else {
                        ampStr = `${realStr} ${sign} ${imagStr}i`;
                    }
                    html += `<div class="state-row"><span class="state-basis">${basisLabel}</span><span class="state-amplitude">${ampStr}</span></div>`;
                }
            }
            
            container.innerHTML = html;
        }

        updateProbabilities() {
            const container = document.getElementById('probabilityBars');
            if (!container) return;

            const state = this.circuit.simulate();
            const dim = state.size()[0];
            let html = '';
            
            for (let i = 0; i < dim; i++) {
                const amplitude = state.get([i, 0]);
                const prob = amplitude.re * amplitude.re + amplitude.im * amplitude.im;
                const basisLabel = '|' + i.toString(2).padStart(this.circuit.numQubits, '0') + '⟩';
                const width = Math.min(100, prob * 100);
                
                html += `
                    <div class="prob-row">
                        <span class="prob-label">${basisLabel}</span>
                        <div class="prob-bar-container">
                            <div class="prob-bar-fill" style="width: ${width}%"></div>
                        </div>
                        <span class="prob-value">${(prob * 100).toFixed(2)}%</span>
                    </div>
                `;
            }
            
            container.innerHTML = html;
        }
    }

    function formatNumber(n) {
        if (Math.abs(n) < 1e-6) return '0';
        // Check for common quantum values
        const sqrt2 = 1 / Math.sqrt(2);
        if (Math.abs(Math.abs(n) - sqrt2) < 1e-4) {
            return n > 0 ? '1/√2' : '-1/√2';
        }
        if (Math.abs(Math.abs(n) - 0.5) < 1e-4) {
            return n > 0 ? '0.5' : '-0.5';
        }
        if (Math.abs(Math.abs(n) - 1) < 1e-4) {
            return n > 0 ? '1' : '-1';
        }
        return n.toFixed(3);
    }

    // Polyfill for roundRect
    if (!CanvasRenderingContext2D.prototype.roundRect) {
        CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
            if (typeof r === 'number') r = { tl: r, tr: r, br: r, bl: r };
            this.beginPath();
            this.moveTo(x + r.tl, y);
            this.lineTo(x + w - r.tr, y);
            this.quadraticCurveTo(x + w, y, x + w, y + r.tr);
            this.lineTo(x + w, y + h - r.br);
            this.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
            this.lineTo(x + r.bl, y + h);
            this.quadraticCurveTo(x, y + h, x, y + h - r.bl);
            this.lineTo(x, y + r.tl);
            this.quadraticCurveTo(x, y, x + r.tl, y);
            this.closePath();
            return this;
        };
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (document.getElementById('circuitCanvas')) {
                window.circuitVisualizer = new CircuitVisualizer();
            }
        });
    } else {
        if (document.getElementById('circuitCanvas')) {
            window.circuitVisualizer = new CircuitVisualizer();
        }
    }

})();