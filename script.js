const statusDisplay = document.querySelector('.game--status');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
function handleCellPlayed() {

}
function handlePlayerChange() {

}
function handleResultValidation() {

}
function handleCellClick() {

}
function handleRestartGame() {

}
document.querySelectorAll('.cell').forEach(cell=>cell.addEventListener('click',handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

/*In handleCellClick, we have to handle two things. Fist we have to check if the cell has 
been already clicked. If not continue our game play.*/
function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if(gameState[clickedCellIndex]!==""|| !gameActive){
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

/*In this handler,we have to update two things.First update our game state and then 
user interface.*/
function handleCellPlayed(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

/*The result validation is the core of our tic tac toe game. Here only we will check 
whether the game end with win or draw. */
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleResultValidation(){
    let roundWon = false;
        for(let i =0; i<= 7; i++){
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if(a===''|| b===''|| c===''){
                continue;
            }
            if(a===b && b===c){
                roundWon = true;
                break;
            }
        }
        if(roundWon){
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
        }
        let roundDraw = !gameState.includes("");
        if(roundDraw){
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }
        handlePlayerChange();
}

/*This will change the current player and update the game status. 
Here we are using ternary operator to assign the value to the new player.*/
function handlePlayerChange(){
    currentPlayer = currentPlayer ==="X" ? "0" : "X";
    statusDisplay.innerHTML  = currentPlayerTurn();
}

/*This will set all our game tracking back into default. It clear all sings in the 
game board and update the game status into the current player message.*/
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}