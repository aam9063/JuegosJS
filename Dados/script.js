const rollButton = document.getElementById('rollButton');
const player1RollDisplay = document.getElementById('player1-roll');
const player1TotalDisplay = document.getElementById('player1-total');
const player2RollDisplay = document.getElementById('player2-roll');
const player2TotalDisplay = document.getElementById('player2-total');
const resultDisplay = document.getElementById('result');

let player1Total = 0;
let player2Total = 0;

// Función para tirar dos dados y devolver su suma
function rollDice() {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    return [die1, die2, die1 + die2];
}

// Función para jugar una ronda
function playRound() {
    // Jugador 1 tira los dados
    const [player1Die1, player1Die2, player1Sum] = rollDice();
    player1RollDisplay.textContent = `Dados: ${player1Die1}, ${player1Die2}`;
    player1Total += player1Sum;
    player1TotalDisplay.textContent = `Total: ${player1Total}`;

    // Jugador 2 tira los dados
    const [player2Die1, player2Die2, player2Sum] = rollDice();
    player2RollDisplay.textContent = `Dados: ${player2Die1}, ${player2Die2}`;
    player2Total += player2Sum;
    player2TotalDisplay.textContent = `Total: ${player2Total}`;

    // Comparar los resultados y mostrar el ganador de la ronda
    if (player1Sum > player2Sum) {
        resultDisplay.textContent = 'Resultado: Jugador 1 gana la ronda';
    } else if (player2Sum > player1Sum) {
        resultDisplay.textContent = 'Resultado: Jugador 2 gana la ronda';
    } else {
        resultDisplay.textContent = 'Resultado: Empate en la ronda';
    }
}

// Event Listener para el botón de tirar los dados
rollButton.addEventListener('click', playRound);
