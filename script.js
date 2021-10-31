gameArea = document.querySelector(`#gameboard`)
let player1 = undefined
let player2 = undefined
let currentPlayer = undefined

const gameboard = (() => {
    // squares values for use in magic circle in the game
    const squares = [8, 1, 6, 3, 5, 7, 4, 9, 2]
    
    function boardGen() {
        for(i = 0; i < squares.length; i++) {
            let gridNum = document.createElement("div")
            gridNum.setAttribute(`id`, `grid${squares[i]}`)
            gridNum.setAttribute(`class`, `box`)
            gameArea.appendChild(gridNum)
        }
        let boxes = document.querySelectorAll(`.box`)
        for(i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener('click', makeXOrO)
        }
    }
    
    function makeXOrO(e) {
        if(e.target.className == "box x" || e.target.className == "box o") {
            return;
        }
        e.target.classList.add(`${currentPlayer.side}`)
        currentPlayer.squaresCleared.push(parseInt(e.target.id.substring(-1)))
        if (winCondition == true) {
            console.log("winner")
        }
        if (currentPlayer == player1) {
            currentPlayer = player2
        } else {
            currentPlayer = player1
        }
    }
    
    function winCondition() {
        // win condition values
        let winNum = 15
        let win = false

        if (player1.squaresCleared.length > 2 || player2.squaresCleared.length > 2) {
            recursiveAddition([], currentPlayer.squaresCleared)
            if (win == true) {
                return true
            }
            return false
        }
        return false
    }

    function recursiveAddition(emptyArr, playerScore) {
        if (win === true) return;
        if (playerScore.length > 0) {
            let sum = emptyArr.concat(playerScore[0]).reduce(function(prev, curr) {return prev + curr;});
            if (sum === winNum) {
                win = true
                return win
            }
            recursiveAddition(emptyArr.concat(playerScore[0]), playerScore.slice(1))
            recursiveAddition(emptyArr, playerScore.slice(1))
        }
    }

    return {
        generateBoard: function() {
            boardGen();
        }
    }   
})()


// constructor that gives each player a name and side
const player = (playName) => {
    let score = 0
    let squaresCleared = []

    function side() {
        if(player1 != undefined){
            switch (player1.side) {
            case 'x':
                return 'o';
            case 'o':
                return 'x';
            }
        } else {
            if(Math.random() < 0.5) {
                return "x"
            } else return "o"
        }
    }

    return { playName, score, side:side(), squaresCleared }
}


player1 = player("Jonathan")
player2 = player("Bob")
currentPlayer = player1


gameboard.generateBoard()
