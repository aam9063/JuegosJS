const player = document.getElementById('player');
const game = document.getElementById('game');
const platforms = document.querySelectorAll('.platform');
const coin = document.querySelector('.coin');
const scoreElement = document.getElementById('score');

let playerX = 50;
let playerY = 0;
let playerVelocityX = 0;
let playerVelocityY = 0;
let gravity = 0.5;
let isJumping = false;
let score = 0;

// Manejar teclas de movimiento
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        playerVelocityX = 5;
    } else if (event.key === 'ArrowLeft') {
        playerVelocityX = -5;
    } else if (event.key === 'ArrowUp' && !isJumping) {
        playerVelocityY = -10;
        isJumping = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        playerVelocityX = 0;
    }
});

// Detectar colisiones con plataformas
function checkPlatformCollision() {
    platforms.forEach(platform => {
        const platformRect = platform.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();
        
        if (playerRect.bottom > platformRect.top &&
            playerRect.top < platformRect.bottom &&
            playerRect.right > platformRect.left &&
            playerRect.left < platformRect.right &&
            playerVelocityY > 0) {
            playerY = platformRect.top - playerRect.height - game.getBoundingClientRect().top;
            playerVelocityY = 0;
            isJumping = false;
        }
    });
}

// Detectar colisión con la moneda
function checkCoinCollision() {
    const coinRect = coin.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    
    if (playerRect.top < coinRect.bottom &&
        playerRect.bottom > coinRect.top &&
        playerRect.right > coinRect.left &&
        playerRect.left < coinRect.right) {
        score++;
        scoreElement.textContent = `Puntuación: ${score}`;
        coin.style.display = 'none'; // Desaparece la moneda
    }
}

// Actualizar la posición del jugador
function updatePlayer() {
    playerX += playerVelocityX;
    playerY += playerVelocityY;
    playerVelocityY += gravity;

    // Limitar movimiento dentro del área de juego
    if (playerX < 0) {
        playerX = 0;
    } else if (playerX + player.offsetWidth > game.offsetWidth) {
        playerX = game.offsetWidth - player.offsetWidth;
    }

    if (playerY + player.offsetHeight > game.offsetHeight) {
        playerY = game.offsetHeight - player.offsetHeight;
        playerVelocityY = 0;
        isJumping = false;
    }

    // Aplicar posición
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
}

// Bucle principal del juego
function gameLoop() {
    updatePlayer();
    checkPlatformCollision();
    checkCoinCollision();
    requestAnimationFrame(gameLoop);
}

// Iniciar el juego
gameLoop();
