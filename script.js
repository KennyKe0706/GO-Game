// Game setup
const boardSize = 19; // 19x19 grid
const margin = 20; // Margin around the board
const svgSize = 800; // SVG size in pixels
const gridSize = (svgSize - 2 * margin) / (boardSize - 1); // Space between intersections
const svg = document.getElementById('board');
let board = Array(boardSize).fill().map(() => Array(boardSize).fill(0)); // 0=empty, 1=black, 2=white
let currentPlayer = 1; // 1=black, 2=white
let history = []; // Stores previous states
let blackScore = 0;
let whiteScore = 0;

// Add scoreboards
const blackScoreboard = document.createElement('div');
blackScoreboard.innerHTML = 'Black: 0';
blackScoreboard.style.position = 'absolute';
blackScoreboard.style.top = '10px';
blackScoreboard.style.left = '10px';
blackScoreboard.style.fontSize = '20px';
document.getElementById('game').appendChild(blackScoreboard);

const whiteScoreboard = document.createElement('div');
whiteScoreboard.innerHTML = 'White: 0';
whiteScoreboard.style.position = 'absolute';
whiteScoreboard.style.top = '30px';
whiteScoreboard.style.left = '10px';
whiteScoreboard.style.fontSize = '20px';
document.getElementById('game').appendChild(whiteScoreboard);

// Draw grid lines
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

// Render stones on the board
function renderStones() {
  const stones = svg.querySelectorAll('.stone');
  stones.forEach(stone => stone.remove());
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] !== 0) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', margin + i * gridSize);
        circle.setAttribute('cy', margin + j * gridSize);
        circle.setAttribute('r', gridSize / 2 - 2);
        circle.setAttribute('fill', board[i][j] === 1 ? 'black' : 'white');
        circle.classList.add('stone');
        svg.appendChild(circle);
      }
    }
  }
}

// Get adjacent positions
function getAdjacent(i, j) {
  const adjacent = [];
  if (i > 0) adjacent.push([i - 1, j]);
  if (i < boardSize - 1) adjacent.push([i + 1, j]);
  if (j > 0) adjacent.push([i, j - 1]);
  if (j < boardSize - 1) adjacent.push([i, j + 1]);
  return adjacent;
}

// Find connected group of same-color stones
function findGroup(i, j, player) {
  const group = [];
  const queue = [[i, j]];
  const visited = new Set([`${i},${j}`]);
  while (queue.length > 0) {
    const [ci, cj] = queue.shift();
    group.push([ci, cj]);
    const adjacent = getAdjacent(ci, cj);
    for (const [ni, nj] of adjacent) {
      if (board[ni][nj] === player && !visited.has(`${ni},${nj}`)) {
        visited.add(`${ni},${nj}`);
        queue.push([ni, nj]);
      }
    }
  }
  return group;
}

// Check if a group has liberties
function hasLiberties(group) {
  for (const [i, j] of group) {
    const adjacent = getAdjacent(i, j);
    for (const [ni, nj] of adjacent) {
      if (board[ni][nj] === 0) return true;
    }
  }
  return false;
}

// Remove captured stones and update score
function removeGroup(group, capturingPlayer) {
  const capturedCount = group.length;
  for (const [i, j] of group) {
    board[i][j] = 0;
  }
  if (capturingPlayer === 1) {
    blackScore += capturedCount;
    blackScoreboard.innerHTML = `Black: ${blackScore}`;
  } else {
    whiteScore += capturedCount;
    whiteScoreboard.innerHTML = `White: ${whiteScore}`;
  }
}

// Handle clicks to place stones
svg.addEventListener('click', (event) => {
  const rect = svg.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const i = Math.round((x - margin) / gridSize);
  const j = Math.round((y - margin) / gridSize);

  if (i >= 0 && i < boardSize && j >= 0 && j < boardSize && board[i][j] === 0) {
    // Save state before move
    history.push({
      board: board.map(row => row.slice()),
      player: currentPlayer,
      blackScore: blackScore,
      whiteScore: whiteScore
    });

    // Place stone
    board[i][j] = currentPlayer;
    const opponent = 3 - currentPlayer;

    // Check for captures
    const adjacent = getAdjacent(i, j);
    for (const [ai, aj] of adjacent) {
      if (board[ai][aj] === opponent) {
        const group = findGroup(ai, aj, opponent);
        if (!hasLiberties(group)) {
          removeGroup(group, currentPlayer);
        }
      }
    }

    // Check suicide rule
    const selfGroup = findGroup(i, j, currentPlayer);
    if (!hasLiberties(selfGroup)) {
      board[i][j] = 0; // Revert move
      history.pop();
      return;
    }

    // Switch player
    currentPlayer = opponent;
    renderStones();
  }
});

// Restart button
document.getElementById('restart').addEventListener('click', () => {
  board = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
  currentPlayer = 1;
  blackScore = 0;
  whiteScore = 0;
  blackScoreboard.innerHTML = 'Black: 0';
  whiteScoreboard.innerHTML = 'White: 0';
  history = [];
  renderStones();
});

// Undo button
document.getElementById('undo').addEventListener('click', () => {
  if (history.length > 0) {
    const lastState = history.pop();
    board = lastState.board;
    currentPlayer = lastState.player;
    blackScore = lastState.blackScore;
    whiteScore = lastState.whiteScore;
    blackScoreboard.innerHTML = `Black: ${blackScore}`;
    whiteScoreboard.innerHTML = `White: ${whiteScore}`;
    renderStones();
  }
});

// Initialize game
drawGrid();
renderStones();