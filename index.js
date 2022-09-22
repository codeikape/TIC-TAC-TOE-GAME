const state = {
    gameElement: document.querySelector('.game'),
    // cells:[null, null, null, null, null, null, null, null, null],
    cells: Array(9).fill(null), //connecting arrays to the cells so  they can work together.
    Symbols: ['o', 'x'], // symbols for the game.
    winningCombinatiions: [
        [0,1,2], // top row
        [3,4,5], // middle row
        [6,7,8], // bottom row

        [0,3,6], // left column
        [1,4,7], // middle column
        [2,5,8], // rigt column

        [0,4,8], // left diag.
        [2,4,6] // right diag.
    ],
    gameFinished: false
}
function drawGame(){
// const gameElement = document.querySelector('.game')
state.gameElement.innerHTML = '' // to get rid of the previous grid, so to replace  with the new one with X & O. 
    for (let i = 0; i < 9; i++){
        const cell = document.createElement('div')
        cell.classList.add('cell')
        state.gameElement.append(cell)

        if (state.cells[i]) { // does the cell have an x or o, run this
            const cellSymbol = document.createElement('p')
            cellSymbol.innerText = state.cells[i]
            cellSymbol.classList.add('symbol')
            cell.append(cellSymbol)

        }else{ // if empty, run this, it should be able to click an empty cell
            cell.addEventListener('click', function(){
                if (state.gameFinished){
                    return
                }
                state.Symbols.reverse()
                state.cells[i] = state.Symbols[0]

                drawGame()


                if(checkForWinner()){
                    // winner code goes here 
                    state.gameFinished = true
                    drawMessage('Congratulations! You did it!')
                }
                if(checkForDraw()){
                    state.gameFinished = true
                    drawMessage("Ooh it's a Draw!")
                }
            })
        }
        //state.gameElement.append(cell)
    }
}

// CHECKING FOR A DRAW
function checkForDraw(){
    return state.cells.every(function(cell){
        return cell !== null
    })
}

// DRAW MESSAGE FUNCTION
function drawMessage(message){
    const banner = document.createElement('div')
    banner.classList.add('banner')

    const h1 = document.createElement('h1')
    h1.innerText= message
    banner.append(h1)
    state.gameElement.append(banner)
}

// WINNING FUNCTION
function checkForWinner(){
    return state.winningCombinatiions.some(function(combo){
        const cells = combo.map(function(index){
            return state.cells[index]
    })
    return !(cells.includes(null)) && new Set(cells).size === 1
   })
 }

// RESET FUNCTION
 const resetGame = document.getElementById("reset");


 resetGame.addEventListener('click', function (){
       window.location.reload()

       
 }
 )

drawGame()





