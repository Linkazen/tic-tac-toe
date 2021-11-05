const gameArea = document.querySelector(`#gameboard`)
const nameForm = document.querySelector(".namesformout")
let player1 = undefined
let player2 = undefined
let currentPlayer = undefined
let cpubtn = document.querySelector("#cpucheck")

const gameboard = (() => {
    let squares = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    // win condition values
    let winNum = 15
    let win = false
    let winscreen = document.querySelector("#winscreen")
    let ranNum = 0
    let boxestwo = undefined
    let player1woncheck = false
    
    function boardGen() {
        gameArea.innerHTML = ""
        squares = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        document.querySelector(`#p1name`).textContent = `(${player1.playName})`
        document.querySelector(`#p2name`).textContent = `(${player2.playName})`
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
        console.log(currentPlayer)
        if (currentPlayer == player2 && cpubtn.checked == true) {
            cpuMove()
        }
    }

    function cpuMove() {       
        boxestwo = document.querySelectorAll(`.box`)
        ranNum = Math.round(Math.random() * 8)
        tempsquares = squares
        if (squares.includes(0) == false) {
            return
        } else if (boxestwo[ranNum].className == "box o" || boxestwo[ranNum].className == "box x") {
            cpuMove()
        } else {
            boxestwo[ranNum].click()
        }
    }
    
    function makeXOrO(e) {
        if(e.target.className == "box x" || e.target.className == "box o") {
            return;
        }
        e.target.classList.add(`${currentPlayer.side}`)
        squares[e.target.id.slice(-1)] = `${currentPlayer.side}`
        winCondition()
        if (currentPlayer == player1) {
            currentPlayer = player2
        } else {
            currentPlayer = player1
        }
        if (currentPlayer == player2 && cpubtn.checked == true && player1woncheck == false) {
            cpuMove()
        }
        player1woncheck = false
    }

    function eventlistenerwin() {
        winscreen.style.display = "none"
        winscreen.classList.remove("winscreenanimation")
        boardGen()
        document.querySelector("#winscreen").removeEventListener("animationend", eventlistenerwin)
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
            winscreen.style.display = "flex"
            winscreen.textContent = `${currentPlayer.playName} wins`
            winscreen.classList.add("winscreenanimation")
            document.querySelector(`#${currentPlayer.playerNum}Score`).textContent = `${currentPlayer.score}`
            if (currentPlayer == player1) {
                player1woncheck = true
            }
            document.querySelector("#winscreen").addEventListener("animationend", eventlistenerwin)
        } else if (squares.includes(0) == false) {
            winscreen.textContent = "It's a draw"
            winscreen.style.display = "flex"
            winscreen.classList.add("winscreenanimation")
            document.querySelector(`#${currentPlayer.playerNum}Score`).textContent = `${currentPlayer.score}`
            document.querySelector("#winscreen").addEventListener("animationend", eventlistenerwin)
        }
        return;
    }

    return {
        generateBoard: function() {
            boardGen();
        },
        board: squares
    }   
})()

// constructor that gives each player a name and side
const player = (playerName) => {
    let playName = playerName
    let score = 0
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

    return { playName, score, side:side(), playerNum }
}

// functions for adding and taking away the animations
function anims1() {
    nameForm.classList.remove("namesformoutanim1")
    nameForm.removeEventListener("animationend", anims1, false)
}

function anims2() {
    nameForm.classList.remove("namesformoutanim2")
    nameForm.style.display = "none"
    nameForm.removeEventListener("animationend", anims2, false)
}

// button for bringing up the form and making a new game
document.querySelector(".boardbtn").addEventListener("click", function() {
    nameForm.style.display = "flex"
    nameForm.addEventListener("animationend", anims1, false)
    nameForm.classList.add("namesformoutanim1")
})

// button for after filling in the form
document.querySelector(".formbtn").addEventListener("click", function() {
    if (document.querySelector("#nameForm")[0].value == "" || (document.querySelector("#nameForm")[1].value == "" && cpubtn.checked == false)) {
        return
    }
    player1 = player(document.querySelector("#nameForm")[0].value)
    if (cpubtn.checked == true) {
        player2 = player("Jeff")
    }else {
        player2 = player(document.querySelector("#nameForm")[1].value)
    }
    document.querySelector(`#p1Score`).textContent = `0`
    document.querySelector(`#p2Score`).textContent = `0`
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

// disables the player2 name box if the cpu is ticked
cpubtn.addEventListener("change", function() {
    let player2txt = document.querySelector("#twoname")
    if (this.checked == true) {
        player2txt.disabled = "true"
    } else {
        player2txt.disabled = ""
    }
})