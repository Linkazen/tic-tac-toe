const gameboard = (() => {
    let squares = 3 * 3
    return {squares}   
})

const player = (playName) => {
    let score = 0
    return {playName, score}
}