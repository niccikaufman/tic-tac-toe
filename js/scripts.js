//game status element
const statusDisplay;

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

//initial message
statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCellEvent) {
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

function handlePlayerChange() {

}

function handleResultValidation() {

}

function handleCellClick() {

}

function handleRestartGame() {

}

//game cell and restart button event listeners
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);