const board = document.getElementById('board');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let cells = [];
let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function handleCellClick(e) {
  const idx = e.target.dataset.index;
  if (!gameActive || gameState[idx]) return;
  gameState[idx] = currentPlayer;
  e.target.textContent = currentPlayer;
  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (gameState.every(cell => cell)) {
    status.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winPatterns.some(pattern =>
    pattern.every(idx => gameState[idx] === currentPlayer)
  );
}

function restartGame() {
  gameState.fill('');
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function createBoard() {
  board.innerHTML = '';
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
    cells.push(cell);
  }
}

restartBtn.addEventListener('click', restartGame);

createBoard();
restartGame(); 