const greenButton = document.getElementById('green');
const redButton = document.getElementById('red');
const yellowButton = document.getElementById('yellow');
const blueButton = document.getElementById('blue');
const startButton = document.getElementById('startButton');
const messageElement = document.getElementById('message');

const colors = ['green', 'red', 'yellow', 'blue'];
let gameSequence = [];
let playerSequence = [];
let level = 0;
let isPlayerTurn = false;

// Función para reproducir la secuencia del juego
function playSequence() {
    let index = 0;
    playerSequence = [];
    messageElement.textContent = `Nivel ${level + 1}`;
    isPlayerTurn = false;

    const interval = setInterval(() => {
        if (index >= gameSequence.length) {
            clearInterval(interval);
            isPlayerTurn = true;
            messageElement.textContent = 'Tu turno';
        } else {
            const color = gameSequence[index];
            highlightButton(color);
            index++;
        }
    }, 1000);
}

// Función para destacar un botón temporalmente
function highlightButton(color) {
    const button = document.getElementById(color);
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 500);
}

// Función para generar la secuencia del juego
function nextSequence() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);
    playSequence();
}

// Función para manejar el clic en un botón de color
function handleColorClick(color) {
    if (!isPlayerTurn) return;

    playerSequence.push(color);
    highlightButton(color);
    
    const currentStep = playerSequence.length - 1;
    if (playerSequence[currentStep] !== gameSequence[currentStep]) {
        messageElement.textContent = '¡Incorrecto! Juego terminado. Presiona "Iniciar Juego" para comenzar de nuevo.';
        resetGame();
        return;
    }

    if (playerSequence.length === gameSequence.length) {
        level++;
        isPlayerTurn = false;
        setTimeout(nextSequence, 1000);
    }
}

// Manejar eventos de clic en los botones de colores
greenButton.addEventListener('click', () => handleColorClick('green'));
redButton.addEventListener('click', () => handleColorClick('red'));
yellowButton.addEventListener('click', () => handleColorClick('yellow'));
blueButton.addEventListener('click', () => handleColorClick('blue'));

// Función para iniciar el juego
function startGame() {
    resetGame();
    messageElement.textContent = 'Memoriza la secuencia...';
    nextSequence();
}

// Reiniciar el juego
function resetGame() {
    gameSequence = [];
    playerSequence = [];
    level = 0;
    isPlayerTurn = false;
}

// Iniciar el juego al hacer clic en el botón de iniciar
startButton.addEventListener('click', startGame);
