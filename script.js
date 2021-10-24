gameArea = document.querySelector(`#gameboard`)


const gameboard = (() => {
    const squares = new Array(9)

    function makeXOrO(e) {
        e.srcElement.classList.add(`X`)
        console.log(e.srcElement.classList)
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

const player = (playName) => {
    let score = 0
    return {playName, score}
}


gameboard.generateBoard()
