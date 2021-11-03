const gameArea = document.querySelector(`#gameboard`)
const nameForm = document.querySelector(".namesformout")
let player1 = undefined
let player2 = undefined
let currentPlayer = undefined

const gameboard = (() => {
    // squares values for use in magic circle in the game
    let squares = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    // win condition values
    let winNum = 15
    let win = false
    
    function boardGen() {
        gameArea.innerHTML = ""
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
            currentPlayer.score++
            let winscreen = document.querySelector("#winscreen")
            winscreen.style.display = "flex"
            winscreen.classList.add("winscreenanimation")
            document.querySelector(`#${currentPlayer.playerNum}Score`).textContent = `${currentPlayer.score}`
            document.querySelector("#winscreen").addEventListener("animationend", function() {
                winscreen.style.display = "none"
                winscreen.classList.remove("winscreenanimation")
                boardGen()
            })
        } else if (squares.includes(0) == false) {
            let winscreen = document.querySelector("#winscreen")
            winscreen.style.display = "flex"
            winscreen.classList.add("winscreenanimation")
            document.querySelector(`#${currentPlayer.playerNum}Score`).textContent = `${currentPlayer.score}`
            document.querySelector("#winscreen").addEventListener("animationend", function() {
                winscreen.style.display = "none"
                winscreen.classList.remove("winscreenanimation")
                boardGen()
            })
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
    let playerNum = "temp"

    function side() {
        if(player1 != undefined){
            playerNum = "p2"
            switch (player1.side) {
            case 'x':
                return 'o';
            case 'o':
                return 'x';
            }
        } else {
            playerNum = "p1"
            if(Math.random() < 0.5) {
                return "x"
            } else return "o"
        }
    }

    return { playName, score, side:side(), squaresCleared, playerNum }
}

function anims1() {
    nameForm.classList.remove("namesformoutanim1")
    nameForm.removeEventListener("animationend", anims1, false)
}

function anims2() {
    nameForm.classList.remove("namesformoutanim2")
    nameForm.style.display = "none"
    nameForm.removeEventListener("animationend", anims2, false)
}

document.querySelector(".boardbtn").addEventListener("click", function() {
    nameForm.style.display = "flex"
    nameForm.addEventListener("animationend", anims1, false)
    nameForm.classList.add("namesformoutanim1")
})

document.querySelector(".formbtn").addEventListener("click", function() {
    player1 = player(document.querySelector("#nameForm")[0].value)
    player2 = player(document.querySelector("#nameForm")[1].value)
    if (currentPlayer == undefined || currentPlayer == player2) {
        currentPlayer = player1
    } else {
        currentPlayer = player2
    }
    gameboard.generateBoard()
    let scoreNums = document.querySelectorAll(".score")
    for (i = 0; i < scoreNums.length; i++) {
        scoreNums[i].style.display = "block"
    }
    document.querySelector("#gameboard").style.display = "grid"
    nameForm.addEventListener("animationend", anims2, false)
    nameForm.classList.add("namesformoutanim2")
})