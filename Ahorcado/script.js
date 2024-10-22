const words = ['PROGRAMAR', 'JAVASCRIPT', 'COMPUTADORA', 'AHORCADO', 'DESARROLLADOR'];
let selectedWord = '';
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 6;

const wordDisplayElement = document.getElementById('wordDisplay');
const messageElement = document.getElementById('message');
const keyboardElement = document.getElementById('keyboard');
const hangmanCanvas = document.getElementById('hangmanCanvas');
const resetButton = document.getElementById('resetButton');
const ctx = hangmanCanvas.getContext('2d');

// Inicializar el juego
function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    mistakes = 0;
    messageElement.textContent = '';
    wordDisplayElement.textContent = '_ '.repeat(selectedWord.length);
    drawHangman();
    generateKeyboard();
}

// Dibujar el muñeco ahorcado según el número de errores
function drawHangman() {
    ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
    
    // Base
    ctx.beginPath();
    ctx.moveTo(10, 230);
    ctx.lineTo(100, 230);
    ctx.moveTo(50, 230);
    ctx.lineTo(50, 20);
    ctx.lineTo(150, 20);
    ctx.lineTo(150, 50);
    ctx.stroke();

    if (mistakes > 0) {
        // Cabeza
        ctx.beginPath();
        ctx.arc(150, 70, 20, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (mistakes > 1) {
        // Cuerpo
        ctx.moveTo(150, 90);
        ctx.lineTo(150, 150);
        ctx.stroke();
    }
    if (mistakes > 2) {
        // Brazo izquierdo
        ctx.moveTo(150, 110);
        ctx.lineTo(120, 130);
        ctx.stroke();
    }
    if (mistakes > 3) {
        // Brazo derecho
        ctx.moveTo(150, 110);
        ctx.lineTo(180, 130);
        ctx.stroke();
    }
    if (mistakes > 4) {
        // Pierna izquierda
        ctx.moveTo(150, 150);
        ctx.lineTo(120, 180);
        ctx.stroke();
    }
    if (mistakes > 5) {
        // Pierna derecha
        ctx.moveTo(150, 150);
        ctx.lineTo(180, 180);
        ctx.stroke();
    }
}

// Generar el teclado virtual
function generateKeyboard() {
    keyboardElement.innerHTML = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    alphabet.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter));
        keyboardElement.appendChild(button);
    });
}

// Manejar la adivinanza
function handleGuess(letter) {
    if (guessedLetters.includes(letter)) return;
    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        updateWordDisplay();
        checkWin();
    } else {
        mistakes++;
        drawHangman();
        checkLoss();
    }
}

// Actualizar la palabra mostrada
function updateWordDisplay() {
    let displayWord = '';

    selectedWord.split('').forEach(letter => {
        if (guessedLetters.includes(letter)) {
            displayWord += letter + ' ';
        } else {
            displayWord += '_ ';
        }
    });

    wordDisplayElement.textContent = displayWord.trim();
}

// Verificar si el jugador ha ganado
function checkWin() {
    if (!wordDisplayElement.textContent.includes('_')) {
        messageElement.textContent = '¡Felicidades, has ganado!';
        disableKeyboard();
    }
}

// Verificar si el jugador ha perdido
function checkLoss() {
    if (mistakes === maxMistakes) {
        messageElement.textContent = `Has perdido. La palabra era: ${selectedWord}`;
        disableKeyboard();
    }
}

// Deshabilitar el teclado al finalizar el juego
function disableKeyboard() {
    const buttons = keyboardElement.querySelectorAll('button');
    buttons.forEach(button => button.disabled = true);
}

// Reiniciar el juego
resetButton.addEventListener('click', initializeGame);

// Iniciar el juego al cargar la página
initializeGame();
