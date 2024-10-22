const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const resetButton = document.getElementById('resetButton');

let carWidth = 50;
let carHeight = 100;
let carX = canvas.width / 2 - carWidth / 2;
let carY = canvas.height - carHeight - 10;
let carSpeed = 5;

let obstacles = [];
let obstacleWidth = 50;
let obstacleHeight = 100;
let obstacleSpeed = 5;
let obstacleFrequency = 100; // Cada cuántos frames aparece un nuevo obstáculo

let score = 0;
let gameOver = false;

// Manejar el movimiento del coche
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && carX > 0) {
        carX -= carSpeed;
    } else if (e.key === 'ArrowRight' && carX < canvas.width - carWidth) {
        carX += carSpeed;
    }
});

// Función para dibujar el coche del jugador
function drawCar() {
    ctx.fillStyle = '#00f';
    ctx.fillRect(carX, carY, carWidth, carHeight);
}

// Función para generar obstáculos
function generateObstacle() {
    let obstacleX = Math.floor(Math.random() * (canvas.width - obstacleWidth));
    obstacles.push({ x: obstacleX, y: 0 });
}

// Función para dibujar obstáculos
function drawObstacles() {
    ctx.fillStyle = '#f00';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
        obstacle.y += obstacleSpeed; // Mover los obstáculos hacia abajo
    });
}

// Función para detectar colisiones
function detectCollision() {
    for (let obstacle of obstacles) {
        if (
            carX < obstacle.x + obstacleWidth &&
            carX + carWidth > obstacle.x &&
            carY < obstacle.y + obstacleHeight &&
            carY + carHeight > obstacle.y
        ) {
            gameOver = true;
        }
    }
}

// Función principal de juego
function gameLoop() {
    if (gameOver) {
        alert('¡Has chocado! Juego terminado.');
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el coche
    drawCar();

    // Generar nuevos obstáculos periódicamente
    if (Math.floor(Math.random() * obstacleFrequency) === 0) {
        generateObstacle();
    }

    // Dibujar obstáculos y detectar colisiones
    drawObstacles();
    detectCollision();

    // Actualizar la puntuación
    score++;
    scoreElement.textContent = `Puntuación: ${score}`;

    requestAnimationFrame(gameLoop);
}

// Reiniciar el juego
function resetGame() {
    carX = canvas.width / 2 - carWidth / 2;
    obstacles = [];
    score = 0;
    gameOver = false;
    gameLoop();
}

// Iniciar el juego
gameLoop();

// Botón para reiniciar el juego
resetButton.addEventListener('click', resetGame);
