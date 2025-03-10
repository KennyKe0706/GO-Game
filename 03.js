// Basic Go board setup with turns
const boardSize = 19;
const margin = 20;
const svgSize = 800;
const gridSize = (svgSize - 2 * margin) / (boardSize - 1);
const svg = document.getElementById('board');
let board = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
let currentPlayer = 1; // 1=black, 2=white

// Draw grid
function drawGrid() {
  for (let i = 0; i < boardSize; i++) {
    const pos = margin + i * gridSize;
    const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    hLine.setAttribute('x1', margin);
    hLine.setAttribute('y1', pos);
    hLine.setAttribute('x2', svgSize - margin);
    hLine.setAttribute('y2', pos);
    hLine.setAttribute('stroke', 'black');
    svg.appendChild(hLine);
    
    const vLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    vLine.setAttribute('x1', pos);
    vLine.setAttribute('y1', margin);
    vLine.setAttribute('x2', pos);
    vLine.setAttribute('y2', svgSize - margin);
    vLine.setAttribute('stroke', 'black');
    svg.appendChild(vLine);
  }
}

drawGrid();

// Handle clicks to place stones
svg.addEventListener('click', (event) => {
  const rect = svg.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const i = Math.round((x - margin) / gridSize);
  const j = Math.round((y - margin) / gridSize);

  if (i >= 0 && i < boardSize && j >= 0 && j < boardSize && board[i][j] === 0) {
    board[i][j] = currentPlayer;
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', margin + i * gridSize);
    circle.setAttribute('cy', margin + j * gridSize);
    circle.setAttribute('r', gridSize / 2 - 2);
    circle.setAttribute('fill', currentPlayer === 1 ? 'black' : 'white');
    svg.appendChild(circle);
    
    currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch player
  }
});
