const Player = (name, marker) => {
    return {marker, name}
}

const gameBoard = (() => {
    const squares = document.querySelector('.squares')
    const board = ["", "", "", "", "", "", "", "", ""]

    board.forEach((item, index) => {
        const square = document.createElement('div')
        square.className = 'square'
        squares.appendChild(square)
    })

    Array.from(squares.children).forEach((square, index) => {
        square.addEventListener('click', () => {
            board[index] = game.activePlayer.marker
            console.log(board);
                square.style.pointerEvents = 'none'
                game.remainingSpots -= 1
                if(!game.win){
                    if(game.remainingSpots >= 0){
                        square.classList.add(game.activePlayer.marker)
                        game.nextPlayer()
                    }
                }
            
        })
    }) 
    return board
})();


const game = (() => {
    const playerOne = Player('Player 1', 'X')
    const playerTwo = Player('Player 2', 'O')

    let activePlayer = playerOne
    let remainingSpots = 9
    let win = false

    function nextPlayer() {
        this.activePlayer == playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne
    }

    function alertNextPlayer(){
        let next = document.querySelector('.nextPlayer')
    }

    return {
        activePlayer,
        remainingSpots,
        nextPlayer,
    }
})()

