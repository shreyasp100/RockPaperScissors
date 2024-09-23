let playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
const winningScore = 5; 

const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');
const resultMessageElem = document.getElementById('result-message');
const playAgainButton = document.getElementById('play-again');
const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game-container');
const startGameBtn = document.getElementById('start-game-btn');

const rulesBtn = document.getElementById('rules-btn');
const rulesModal = document.getElementById('rules-modal');
const closeBtn = document.getElementById('close-btn');

startGameBtn.addEventListener('click', startGame);

document.addEventListener('DOMContentLoaded', () => {
    if (playerScore > 0 || computerScore > 0) {
        startGame();
    }
    updateScoresOnScreen(); 
});

function startGame() {
    startScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
}

document.getElementById('rock').addEventListener('click', () => playRound('rock'));
document.getElementById('paper').addEventListener('click', () => playRound('paper'));
document.getElementById('scissors').addEventListener('click', () => playRound('scissors'));

playAgainButton.addEventListener('click', resetGame);

rulesBtn.addEventListener('click', () => {
    rulesModal.classList.add('show'); 
});

closeBtn.addEventListener('click', () => {
    rulesModal.classList.remove('show'); 
});

window.addEventListener('click', (event) => {
    if (event.target === rulesModal) {
        rulesModal.classList.remove('show');
    }
});

function playRound(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    if (playerChoice === computerChoice) {
        resultMessageElem.textContent = "It's a tie!";
    } else if ((playerChoice === 'rock' && computerChoice === 'scissors') ||
               (playerChoice === 'paper' && computerChoice === 'rock') ||
               (playerChoice === 'scissors' && computerChoice === 'paper')) {
        playerScore++;
        resultMessageElem.textContent = `You win! You chose ${playerChoice}, computer chose ${computerChoice}.`;
        updateScoresOnScreen();
        storeScoresInLocalStorage();
        checkWin();  
    } else {
        computerScore++;
        resultMessageElem.textContent = `You lose! You chose ${playerChoice}, computer chose ${computerChoice}.`;
        updateScoresOnScreen();
        storeScoresInLocalStorage();
    }
}

function checkWin() {
    if (playerScore === winningScore) {
        alert("Congratulations! You've won the game!"); 
        resetGame(); 
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    localStorage.clear(); 
    updateScoresOnScreen();
    startGame(); 
}

function updateScoresOnScreen() {
    playerScoreElem.textContent = `Your Score: ${playerScore}`;
    computerScoreElem.textContent = `Computer Score: ${computerScore}`;
}

function storeScoresInLocalStorage() {
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
}
