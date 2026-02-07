const choices = document.querySelectorAll('.choice');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const resultText = document.getElementById('result-text');
const playerHand = document.querySelector('.player-hand');
const computerHand = document.querySelector('.computer-hand');
const resetBtn = document.getElementById('reset-btn');

let playerScore = 0;
let computerScore = 0;

const emojiMap = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.dataset.choice;
        const computerChoice = getComputerChoice();

        animateHands();
        setTimeout(() => {
            playerHand.textContent = emojiMap[playerChoice];
            computerHand.textContent = emojiMap[computerChoice];
            const winner = getWinner(playerChoice, computerChoice);
            updateScore(winner);
            resultText.textContent = winner === 'draw' ? "It's a draw!" : `${winner} wins!`;
        }, 500);
    });
});

function getComputerChoice() {
    const choices = ['rock','paper','scissors'];
    return choices[Math.floor(Math.random() * 3)];
}

function getWinner(player, computer) {
    if(player === computer) return 'draw';
    if(
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) return 'You';
    return 'Computer';
}

function updateScore(winner) {
    if(winner === 'You') playerScore++;
    if(winner === 'Computer') computerScore++;
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
}

function animateHands() {
    playerHand.style.transform = "rotate(20deg)";
    computerHand.style.transform = "rotate(-20deg)";
    setTimeout(() => {
        playerHand.style.transform = "rotate(0deg)";
        computerHand.style.transform = "rotate(0deg)";
    }, 500);
}

resetBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    playerHand.textContent = '❓';
    computerHand.textContent = '❓';
    resultText.textContent = '';
});
