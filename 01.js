// Basic Go board setup
const boardSize = 19;
const margin = 20;
const svgSize = 800;
const gridSize = (svgSize - 2 * margin) / (boardSize - 1);
const svg = document.getElementById('board');

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
