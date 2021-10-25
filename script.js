gameArea = document.querySelector(`#gameboard`)
let player1 = undefined
let currentPlayer = undefined

const gameboard = (() => {
    const squares = new Array(9)

    function makeXOrO(e) {
        console.log(e)
        e.target.classList.add(`${currentPlayer.side}`)
        if (currentPlayer == player1) {
            currentPlayer = player2
            console.log(currentPlayer)
        } else {
            currentPlayer = player1
            console.log(currentPlayer)
        }
    }

    function boardGen() {
        for(i = 0; i < squares.length; i++) {
            let gridNum = document.createElement("div")
            gridNum.setAttribute(`id`, `grid${i}`)
            gridNum.setAttribute(`class`, `box`)
            gridNum.textContent = `X`
            gameArea.appendChild(gridNum)
        }
        let boxes = document.querySelectorAll(`.box`)
        for(i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener('click', makeXOrO)
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

    return { playName, score, side:side() }
}

player1 = player("Jonathan")
currentPlayer = player1
let player2 = player("Bob")

console.log(player1)
console.log(player2)

gameboard.generateBoard()
