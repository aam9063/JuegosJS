const cardSymbols = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍑'];
let cards = [...cardSymbols, ...cardSymbols]; // Crear pares 
let flippedCards = [];
let matchedCards = 0;

const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('resetButton');

// Mezclar las cartas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Crear el tablero
function createBoard() {
    gameBoard.innerHTML = ''; // Limpiar el tablero
    shuffledCards = shuffle(cards); // Mezclar las cartas

    shuffledCards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

// Voltear las cartas
function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.textContent = card.dataset.symbol;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Verificar si las cartas coinciden
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedCards += 2;
        flippedCards = [];
        if (matchedCards === cards.length) {
            setTimeout(() => alert('¡Has encontrado todos los pares!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.textContent = '';
            card2.classList.remove('flipped');
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Reiniciar el juego
resetButton.addEventListener('click', () => {
    matchedCards = 0;
    createBoard();
});

// Iniciar el juego al cargar la página
createBoard();
