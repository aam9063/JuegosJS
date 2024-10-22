const boardElement = document.getElementById('sudoku-board'); // Elemento que contiene el tablero de Sudoku
const checkButton = document.getElementById('checkButton'); // Botón para verificar el Sudoku
const resetButton = document.getElementById('resetButton'); // Botón para reiniciar el Sudoku
const statusText = document.getElementById('statusText'); // Texto de estado del Sudoku

let sudokuBoard = generateRandomSudoku(); // Tablero de Sudoku generado aleatoriamente

// Generar un tablero de Sudoku aleatorio
function generateRandomSudoku() { // Genera un tablero de Sudoku aleatorio
    const board = Array.from({ length: 9 }, () => Array(9).fill('')); // Crear un tablero vacío

    // Llenar algunas celdas aleatoriamente
    for (let i = 0; i < 20; i++) { // Puedes ajustar el número de celdas prellenadas
        const row = Math.floor(Math.random() * 9); // Generar un número aleatorio entre 0 y 8
        const col = Math.floor(Math.random() * 9); // Generar un número aleatorio entre 0 y 8
        const value = Math.floor(Math.random() * 9) + 1; // Generar un número aleatorio entre 1 y 9

        if (isValidMove(row, col, value, board)) { // Verificar si el número se puede colocar en la celda
            board[row][col] = value; // Colocar el número en la celda
        }
    }

    return board; // Devolver el tablero de Sudoku generado aleatoriamente
}

// Crear el tablero Sudoku en el DOM
function createSudokuBoard() { // Crea el tablero de Sudoku en el DOM
    boardElement.innerHTML = ''; // Limpia el tablero antes de crearlo

    sudokuBoard.forEach((row) => { // Recorrer cada fila del tablero
        row.forEach((cell) => { // Recorrer cada celda de la fila
            const input = document.createElement('input'); // Crear un elemento de entrada
            input.type = 'text'; // Establecer el tipo de entrada a texto
            input.maxLength = 1; // Establecer la longitud máxima de entrada a 1
            
            // Si la celda tiene un número predefinido, es no editable
            if (cell !== '') { // Si la celda no está vacía
                input.value = cell; // Establecer el valor de la celda
                input.disabled = true; // Deshabilitar la entrada
            }

            boardElement.appendChild(input); // Agregar la entrada al tablero
        });
    });
}

// Verificar si el tablero es correcto
function checkSudoku() {
    const inputs = boardElement.querySelectorAll('input'); // Obtener todas las celdas del tablero
    let isValid = true; // Bandera para verificar si el Sudoku es válido

    // Recorrer todas las celdas y validar si hay errores
    inputs.forEach((input, index) => {
        const row = Math.floor(index / 9); // Calcular la fila de la celda
        const col = index % 9; // Calcular la columna de la celda
        const value = parseInt(input.value); // Obtener el valor de la celda como un número

        if (!value || value < 1 || value > 9 || !isValidMove(row, col, value, sudokuBoard)) { // Si el valor no es válido
            input.style.backgroundColor = 'lightcoral'; // Establecer el color de fondo de la celda a rojo
            isValid = false; // Establecer la bandera de validez en falso
        } else {
            input.style.backgroundColor = 'white'; // Establecer el color de fondo de la celda a blanco
        }
    });

    // Establecer el texto de estado según la validez del Sudoku
    statusText.textContent = isValid ? '¡Sudoku Completado Correctamente!' : 'Hay errores en el Sudoku'; 
}

// Validar si un número se puede colocar en una celda específica
function isValidMove(row, col, value, board) {
    // Verificar la fila
    for (let i = 0; i < 9; i++) {
        if (i !== col && board[row][i] === value) { // Si el número ya está en la fila
            return false; // Devolver falso
        }
    }

    // Verificar la columna
    for (let i = 0; i < 9; i++) { // Recorrer todas las celdas de la columna
        if (i !== row && board[i][col] === value) { // Si el número ya está en la columna
            return false; // Devolver falso
        }
    }

    // Verificar la caja de 3x3
    const boxRowStart = Math.floor(row / 3) * 3; // Calcular el índice de inicio de la fila de la caja
    const boxColStart = Math.floor(col / 3) * 3; // Calcular el índice de inicio de la columna de la caja
    for (let i = 0; i < 3; i++) { // Recorrer las filas de la caja
        for (let j = 0; j < 3; j++) { // Recorrer las columnas de la caja
            const currentRow = boxRowStart + i; // Calcular la fila actual
            const currentCol = boxColStart + j; // Calcular la columna actual
            if ((currentRow !== row || currentCol !== col) && board[currentRow][currentCol] === value) { // Si el número ya está en la caja
                return false; // Devolver falso
            }
        }
    }

    return true; // Devolver verdadero si el número se puede colocar en la celda
}

// Reiniciar el tablero de Sudoku
function resetSudoku() { 
    sudokuBoard = generateRandomSudoku(); // Generar un nuevo tablero de Sudoku
    createSudokuBoard(); // Crear el tablero de Sudoku en el DOM
    statusText.textContent = ''; // Limpiar el texto de estado
}

// Inicializar el juego
createSudokuBoard();

// Event Listeners para los botones
checkButton.addEventListener('click', checkSudoku); 
resetButton.addEventListener('click', resetSudoku);