gameArea = document.querySelector("#gameboard")


const gameboard = (() => {
    const squares = function() {
        let array = []
        for(i = 0; i < 9; i++) {
            array.push(`${i}`)
        }
        console.log(array)
        return array
    }
    return {squares}   
})()

const player = (playName) => {
    let score = 0
    return {playName, score}
}

function generateBoard() {
    let grid = gameboard.squares()
    for(i = 0; i < grid.length; i++) {
        let gridNum = document.createElement("div")
        gridNum.setAttribute(`id`, `grid${i}`)
        gridNum.textContent = "X"
        gameArea.appendChild(gridNum)
    }
}

generateBoard()