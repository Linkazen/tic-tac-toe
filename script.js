gameArea = document.querySelector(`#gameboard`)
let player1 = undefined
let player2 = undefined
let currentPlayer = undefined
let nameForm = document.querySelector(".namesformout")

const gameboard = (() => {
    // squares values for use in magic circle in the game
    let squares = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    // win condition values
    let winNum = 15
    let win = false
    
    function boardGen() {
        squares = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        for(i = 0; i < squares.length; i++) {
            let gridNum = document.createElement("div")
            gridNum.setAttribute(`id`, `grid${i}`)
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
        squares[e.target.id.slice(-1)] = `${currentPlayer.side}`
        console.log(squares)
        winCondition()
        if (currentPlayer == player1) {
            currentPlayer = player2
        } else {
            currentPlayer = player1
        }
    }

    function winCondition() {
        if ((squares[0] == "x" && squares[1] == "x" && squares[2] == "x") || 
        (squares[3] == "x" && squares[4] == "x" && squares[5] == "x") ||
        (squares[6] == "x" && squares[7] == "x" && squares[8] == "x") ||
        (squares[0] == "x" && squares[3] == "x" && squares[6] == "x") ||
        (squares[1] == "x" && squares[4] == "x" && squares[7] == "x") ||
        (squares[2] == "x" && squares[5] == "x" && squares[8] == "x") ||
        (squares[0] == "x" && squares[4] == "x" && squares[8] == "x") ||
        (squares[2] == "x" && squares[4] == "x" && squares[6] == "x") ||
        (squares[0] == "o" && squares[1] == "o" && squares[2] == "o") ||
        (squares[3] == "o" && squares[4] == "o" && squares[5] == "o") ||
        (squares[6] == "o" && squares[7] == "o" && squares[8] == "o") ||
        (squares[0] == "o" && squares[3] == "o" && squares[6] == "o") ||
        (squares[1] == "o" && squares[4] == "o" && squares[7] == "o") ||
        (squares[2] == "o" && squares[5] == "o" && squares[8] == "o") ||
        (squares[0] == "o" && squares[4] == "o" && squares[8] == "o") ||
        (squares[2] == "o" && squares[4] == "o" && squares[6] == "o")) {
            console.log(`${currentPlayer.side} wins`)
        } else if (squares.includes(0) == false) {
            console.log(`oopsie woopsie its a draw`)
        }
        return;

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

document.querySelector(".boardbtn").addEventListener("click", function() {
    if (player1 == undefined && player2 == undefined) {
        nameForm.style.display = "flex"
    }
})

document.querySelector(".formbtn").addEventListener("click", function() {
    // player1 = document.querySelector("#nameForm")
    console.log(document.querySelector("#nameForm"))
    gameboard.generateBoard()
    let scoreNums = document.querySelectorAll(".score")
    for (i = 0; i < scoreNums.length; i++) {
        scoreNums[i].style.display = "block"
    }
    document.querySelector("#gameboard").style.display = "grid"
    currentPlayer = player1
    nameForm.style.display = "none"
})

