const choices = ['piedra', 'papel', 'tijeras'];
let playerScore = 0;
let computerScore = 0;

const resultDisplay = document.getElementById('result');
const scoreDisplay = document.getElementById('score');

// Manejar la elección del jugador
document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', (e) => {
        const playerChoice = e.target.id;
        const computerChoice = getComputerChoice();
        const winner = determineWinner(playerChoice, computerChoice);
        updateResult(playerChoice, computerChoice, winner);
    });
});

// Función para que la computadora elija aleatoriamente
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Función para determinar el ganador
function determineWinner(player, computer) {
    if (player === computer) {
        return 'Empate';
    }
    if (
        (player === 'piedra' && computer === 'tijeras') ||
        (player === 'papel' && computer === 'piedra') ||
        (player === 'tijeras' && computer === 'papel')
    ) {
        playerScore++;
        return 'Jugador';
    } else {
        computerScore++;
        return 'Computadora';
    }
}

// Actualizar el resultado del juego
function updateResult(player, computer, winner) {
    resultDisplay.textContent = `Jugador eligió ${player}, Computadora eligió ${computer}. ${winner} gana!`;
    scoreDisplay.textContent = `Jugador: ${playerScore} | Computadora: ${computerScore}`;
}
