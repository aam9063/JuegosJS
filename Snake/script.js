const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const resetButton = document.getElementById('resetButton');

const boxSize = 20;
const canvasSize = 400;
let snake = [{x: 100, y: 100}]; // La serpiente empieza con una sección
let direction = {x: 0, y: 0}; // Dirección inicial
let food = getRandomFoodPosition();
let score = 0;
let gameInterval;

// Empezar el juego
function startGame() {
    score = 0;
    snake = [{x: 100, y: 100}];
    direction = {x: 0, y: 0};
    food = getRandomFoodPosition();
    scoreElement.textContent = `Puntuación: ${score}`;
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 100);
}

// Actualizar el estado del juego
function updateGame() {
    moveSnake();
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert('¡Perdiste! Presiona Reiniciar para jugar de nuevo.');
        return;
    }

    if (checkFoodCollision()) {
        score += 10;
        scoreElement.textContent = `Puntuación: ${score}`;
        snake.push({...snake[snake.length - 1]}); // Agregar segmento a la serpiente
        food = getRandomFoodPosition();
    }

    drawGame();
}

// Dibujar el estado actual del juego
function drawGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Dibujar la comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Dibujar la serpiente
    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, boxSize, boxSize));
}

// Mover la serpiente
function moveSnake() {
    const newHead = {x: snake[0].x + direction.x * boxSize, y: snake[0].y + direction.y * boxSize};
    snake.unshift(newHead); // Agregar nueva cabeza
    snake.pop(); // Eliminar la última parte de la cola
}

// Verificar si la serpiente colisiona con las paredes o consigo misma
function checkCollision() {
    const head = snake[0];

    // Colisión con paredes
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }

    // Colisión con el cuerpo de la serpiente
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Verificar si la serpiente colisiona con la comida
function checkFoodCollision() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

// Obtener una posición aleatoria para la comida
function getRandomFoodPosition() {
    const foodX = Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize;
    const foodY = Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize;
    return {x: foodX, y: foodY};
}

// Manejar la entrada del teclado para mover la serpiente
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = {x: 0, y: -1};
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = {x: 0, y: 1};
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = {x: -1, y: 0};
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = {x: 1, y: 0};
            break;
    }
});

// Reiniciar el juego
resetButton.addEventListener('click', startGame);

// Iniciar el juego al cargar la página
startGame();
