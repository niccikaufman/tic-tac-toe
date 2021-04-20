//game status element
const statusDisplay = document.querySelector('.game-status');

//know whose turn it is
let currentPlayer = "X";

//so the game can pause if a valid winning turn is made
let gameActive = true;

//current game state to track played cells
let gameState = ["", "", "", "", "", "", "", "", ""];

//UI messages
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

//initial message
statusDisplay.innerHTML = currentPlayerTurn();

function handleCellClick(clickedCellEvent) {
  //clicked html element as variable
  const clickedCell = clickedCellEvent.target;
  //grabs data-cell-index attribute and returns it as an integer
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index')
  );
  //check if the cell has already been played or if the game is paused, if so, ignore
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  //if not, proceed with game
  handleCellPlayed(clickedCell,clickedCellIndex);
  handleResultValidation();
}

//change current player and update game status message
function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

//check if current player won the game
function handleResultValidation() {
  let roundWon = false;
  //if elements are a match, current player has won
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }
  //if all fields have been filled in, game is a draw
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
    }
  handlePlayerChange();
}

//update game state and reflect played move
function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

//reset game board, reset tracking variables, update game status
function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell")
    .forEach(cell => cell.innerHTML = "");
}

//game cells and restart button event listeners
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);