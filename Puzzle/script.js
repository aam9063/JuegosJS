/*
Creación del tablero: Se generan números del 1 al 15, y la última celda queda vacía. Se mezclan los números
 utilizando un algoritmo de mezcla (Fisher-Yates).
Movimiento de piezas: Las piezas solo pueden moverse si están adyacentes a la celda vacía (verificando 
la diferencia entre sus filas y columnas). Al mover una pieza, intercambia su posición con la celda vacía.
Verificación de victoria: Después de cada movimiento, se verifica si las piezas están en orden ascendente, 
lo que indica que el puzle ha sido resuelto.
Reinicio: El botón de reinicio vuelve a mezclar las piezas y reinicia el juego.
*/

const puzzleBoard = document.getElementById('puzzle-board');
const resetButton = document.getElementById('resetButton');

let tiles = [];
let emptyTileIndex = 15; // Última posición vacía

// Crear el tablero inicial
function createBoard() {
    tiles = [...Array(15).keys()].map(x => x + 1); // Números del 1 al 15
    tiles.push(''); // Última celda vacía
    shuffle(tiles);
    drawBoard();
}

// Dibujar el tablero en el DOM
function drawBoard() {
    puzzleBoard.innerHTML = ''; // Limpiar el tablero

    tiles.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('puzzle-tile');
        if (tile === '') {
            tileElement.classList.add('empty');
        } else {
            tileElement.textContent = tile;
            tileElement.addEventListener('click', () => moveTile(index));
        }
        puzzleBoard.appendChild(tileElement);
    });
}

// Mover una pieza si está al lado de la celda vacía
function moveTile(index) {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyTileIndex / 4);
    const emptyCol = emptyTileIndex % 4;

    // Verificar si la celda seleccionada está adyacente a la vacía
    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1) {
        tiles[emptyTileIndex] = tiles[index];
        tiles[index] = '';
        emptyTileIndex = index;
        drawBoard();
        checkWin();
    }
}

// Comprobar si el jugador ha ganado
function checkWin() {
    const isCorrect = tiles.slice(0, -1).every((tile, index) => tile === index + 1);
    if (isCorrect && tiles[15] === '') {
        setTimeout(() => alert('¡Felicidades, has completado el puzle!'), 100);
    }
}

// Mezclar el tablero (algoritmo Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Reiniciar el juego
resetButton.addEventListener('click', createBoard);

// Iniciar el juego al cargar la página
createBoard();
