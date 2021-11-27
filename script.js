const gameBoard = (() => {
    const gameFreeze = 0;
    const gameTurn = 1;
    let board = [[0,0,0],[0,0,0],[0,0,0]];
    const reset = () => {
        board = [[0,0,0],[0,0,0],[0,0,0]];
        return;
    }

    

    const checkTie = () => {
        let i, j;
        for (i=0;i<3;i++) {
            for (j=0;j<3;j++) {
                if (board[i][j] == 0) {
                    return 0;
                }
            }
        }
        return -1;
    }


    const checkEnd = () => {
        let winRow = [0, 0, 0];
        let i, j;
        for (i = 0;i<3;i++) {
            winRow = [board[i][0], board[i][1], board[i][2]];
            winRow.sort()
            if (winRow[0] == winRow[2] && winRow[0] !== 0) {
                return winRow[0];
            }
        }

        for (i = 0;i<3;i++) {
            winRow = [board[0][i], board[1][i], board[2][i]];
            winRow.sort()
            if (winRow[0] == winRow[2] && winRow[0] !== 0) {
                return winRow[0];
            }
        }

        winRow = [board[0][0], board[1][1], board[2][2]];
        winRow.sort();
        if (winRow[0] == winRow[2] && winRow[0] !== 0) {
            return winRow[0];
        }

        winRow = [board[0][2], board[1][1], board[2][0]];
        winRow.sort();
        if (winRow[0] == winRow[2] && winRow[0] !== 0) {
            return winRow[0];
        }

        if (checkTie()) {
            return -1;
        }

        return 0;
    }

    




    const setMark = (x, y, side) => {
        // side meanings: 1=X and 2=O
        board[x][y] = side;
        return;
    }

    const getBoard = () => {
        return board;
    }

    return {reset, setMark, checkEnd, getBoard, gameFreeze, gameTurn};
})();



const displayController = (() => {
    const gameBoard = document.querySelector(".game-board");

    const createGameBoard = (board) => {
        for(let i=0;i<3;i++) {
            const gameBoardRow = document.createElement("div");
            gameBoardRow.setAttribute("class", "game-board-row");
            for(let j=0;j<3;j++) {
                const gameBoardBox = document.createElement("div");
                gameBoardBox.setAttribute("class", "game-board-box");
                gameBoardBox.setAttribute("id", `${i}-${j}`);
                gameBoardBox.style.color = "black";
                if (board[i][j] == 1) {
                    gameBoardBox.textContent = "X";
                } else if (board[i][j] == 2) {
                    gameBoardBox.textContent = "O";
                }
                gameBoardRow.appendChild(gameBoardBox);
            }
            gameBoard.appendChild(gameBoardRow);
        }
    }

    const updateGameBoard = (board) => {
        
        while (gameBoard.firstChild) {
            gameBoard.removeChild(gameBoard.firstChild);
        }
        createGameBoard(board);
        addBoardClickListener();
        
        return;
    }

    const updateInfoScreenTurn = (gameTurn, restartValue) => {
        const pInfoText = document.querySelector(".info-text");
        console.log(restartValue);

        // when restart button is pressed; following code is used.
        if (restartValue == 1) {
            console.log("restart path");
            pInfoText.textContent = "X's turn";
            gameTurn = 1;
            return gameTurn;
        }

        if (pInfoText.textContent == "X's turn") {
            pInfoText.textContent = "O's turn";
            gameTurn = 2;
        } else if (pInfoText.textContent == "O's turn") {
            pInfoText.textContent = "X's turn";
            gameTurn = 1;
        }
        return gameTurn;
    }

    const updateInfoScreenEnd = (endValue) => {
        const pInfoText = document.querySelector(".info-text");
        //add functionality
        if (endValue == 1) {
            pInfoText.textContent = "X wins!";
        } else if (endValue == 2) {
            pInfoText.textContent = "O wins!";
        } else if (endValue == -1) {
            pInfoText.textContent = "Draw!";
        }
        return;
    }

    return {createGameBoard, updateGameBoard, updateInfoScreenTurn, updateInfoScreenEnd};
})();


const addBoardClickListener = () => {
    const divs = document.querySelectorAll("div");
    divs.forEach(div => div.addEventListener("click", function(e){
        if(gameBoard.gameFreeze == 1) {
            return;
        }
        if(this.classList.value == "game-board-box"){
            console.log(this.id);
            let position = this.id.split("-");
            if (gameBoard.getBoard()[position[0]][position[1]] !== 0) {
                return;
            }
            gameBoard.setMark(position[0], position[1], gameBoard.gameTurn);
            displayController.updateGameBoard(gameBoard.getBoard());
            gameBoard.gameTurn = displayController.updateInfoScreenTurn(gameBoard.gameTurn, 0);

            if (endValue = gameBoard.checkEnd()) {
                console.log("endValue: " + endValue);
                displayController.updateInfoScreenEnd(endValue);
                gameBoard.gameFreeze = 1;
            }

        }
        e.stopPropagation();
    }, {
        capture: false
    }));
}

window.onload = function(){
    displayController.createGameBoard(gameBoard.getBoard());
    addBoardClickListener();
    document.querySelector(".button-restart").addEventListener("click", function() {
        gameBoard.reset();
        gameBoard.gameFreeze = 0;
        gameBoard.gameTurn = displayController.updateInfoScreenTurn(gameBoard.gameTurn, 1);
        
        displayController.updateGameBoard(gameBoard.getBoard());
        
    })
    
}