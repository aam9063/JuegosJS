const problemElement = document.getElementById('problem');
const answerInput = document.getElementById('answerInput');
const resultElement = document.getElementById('result');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('startButton');

let currentProblem = {};
let score = 0;
let timeLeft = 30;
let gameInterval;

// Generar un problema matemático aleatorio
function generateProblem() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    currentProblem = {
        num1: num1,
        num2: num2,
        operator: operator,
        answer: eval(`${num1} ${operator} ${num2}`) // Calcular la respuesta correcta
    };

    problemElement.textContent = `Problema: ${num1} ${operator} ${num2}`;
}

// Comprobar si la respuesta es correcta
function checkAnswer() {
    const playerAnswer = parseInt(answerInput.value);
    if (playerAnswer === currentProblem.answer) {
        score++;
        resultElement.textContent = '¡Correcto!';
    } else {
        resultElement.textContent = `Incorrecto, la respuesta era: ${currentProblem.answer}`;
    }
    answerInput.value = '';
    generateProblem(); // Generar un nuevo problema
}

// Controlar el temporizador
function startTimer() {
    timeLeft = 30;
    timerElement.textContent = `Tiempo restante: ${timeLeft} segundos`;
    gameInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Tiempo restante: ${timeLeft} segundos`;
        if (timeLeft === 0) {
            clearInterval(gameInterval);
            resultElement.textContent = `Tiempo agotado. Puntuación: ${score}`;
            startButton.disabled = false;
            answerInput.disabled = true;
        }
    }, 1000);
}

// Iniciar el juego
function startGame() {
    score = 0;
    resultElement.textContent = '';
    answerInput.disabled = false;
    answerInput.focus();
    generateProblem();
    startTimer();
    startButton.disabled = true;
}

// Event listener para la entrada de respuestas
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && answerInput.value !== '') {
        checkAnswer();
    }
});

// Iniciar el juego al presionar el botón
startButton.addEventListener('click', startGame);
