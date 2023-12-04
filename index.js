let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let difficulty = 'medium'; // Default difficulty
let cell;
function resetGame() {
    const cells = document.querySelectorAll('.cell');
    for (const cell of cells) {
      cell.textContent = '';
    }
    currentPlayer = 'X';
    gameOver = false;
    board = ['', '', '', '', '', '', '', '', ''];
    document.getElementById("wmeg").innerHTML = "Welcome To the Tic-Tac-Toe game&#128519;!!";
    
}

function changeDifficulty() {
    difficulty = document.getElementById('difficulty').value;
    resetGame()
}
function makeMove(cell, index) {
    if (!gameOver && board[index] === '') {
        cell.innerText = currentPlayer;
        board[index] = currentPlayer;
        if (checkWinner()) {
            document.getElementById("wmeg").style.visibility = "visible";
            document.getElementById("wmeg").innerHTML = 'Player '+currentPlayer +" Win&#128512;!!";
            gameOver = true;
        } else if (checkTie()) {
            document.getElementById("wmeg").style.visibility = "visible";
            document.getElementById("wmeg").innerHTML = "Game is Tie!! You noob &#128540; Try to Win (:P)";
            gameOver = true;
        }
        else if(difficulty==="easy"){
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                makeRandomMove();
            }
        }
        
        else if(difficulty==="medium"){
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (Math.random() < 0.2 && currentPlayer === 'O') {
                makeRandomMove();
              } 
            else if(currentPlayer == 'O') {
                computerMove();
              }

        }
        else if(difficulty==="hard") {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                computerMove();
            }
        }
    }
}

function computerMove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    document.querySelectorAll('.cell')[move].click();
    console.log("ata computer er move:"+move);
}

function minimax(board, depth, isMaximizing, alpha = -Infinity, beta = Infinity) {
    let scores = {
        'X': -1,
        'O': 1,
        'tie': 0
    };

    if (checkWinner()) {
        return scores[checkWinner()];
    }

    if (checkTie()) {
        return scores['tie'];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false, alpha, beta);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, bestScore);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true, alpha, beta);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, bestScore);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return bestScore;
    }
}


function makeRandomMove() {
    let randomNumber;
    while(true){
    randomNumber = Math.floor(Math.random() * 9);
     if (board[randomNumber] ==='') {
        console.log("ATa random er chal:"+randomNumber);
        break;
     }
    }
   document.querySelectorAll('.cell')[randomNumber].click();
  }

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
}

function checkTie() {
    return board.every(cell => cell !== '');
}
