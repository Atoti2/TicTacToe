const Player = (name, marker) => {
    return {marker, name}
}

const gameBoard = (() => {
    const squares = document.querySelector('.squares')
    let board = ["", "", "", "", "", "", "", "", ""]
    let count = 0
    board.forEach((item, index) => {
        const square = document.createElement('div')
        square.className = 'square'
        squares.appendChild(square)
    })

    const button = document.querySelector('.new')

    function restart(){
        document.querySelector('.new').style.display = "none"
        count = 0
        game.win = false
        game.activePlayer = game.playerOne
        game.remainingSpots = 9
        for(let i = 0; i < board.length; i++) {
            board[i] = "";
        }
        for(let i = 0; i<9; i++){
            squares.childNodes[i].classList.remove('X')
            squares.childNodes[i].classList.remove('O')
            squares.childNodes[i].style.pointerEvents = ''
        }
        document.querySelector('.winner').textContent = ""
        document.querySelector('.nextPlayer').textContent = game.activePlayer.name
        
    }
    
    button.addEventListener('click', restart)

        Array.from(squares.children).forEach((square, index) => {
                square.addEventListener('click', () => {
                      
                        board[index] = game.activePlayer.marker
                        square.style.pointerEvents = 'none'
                        game.remainingSpots -= 1
                        game.checkWinner()
                        square.classList.add(game.activePlayer.marker)
                        if(game.win){
                            count++
                            document.querySelector('.new').style.display = "block"
                            if(count >= 2){
                                square.classList.remove(game.activePlayer.marker)
                                square.classList.add('over')
                            }
                        }
                        if(!game.win){
                            if(game.remainingSpots > 0){
                        
                                game.nextPlayer()
                                game.alertNextPlayer()
                            }else if(game.remainingSpots == 0){
                                game.checkTie()
                            }
                        }
            })
}) 
    return {board}
})();


const game = (() => {
    const playerOne = Player('Player 1', 'X')
    const playerTwo = Player('Player 2', 'O')

    let activePlayer = playerOne
    let remainingSpots = 9
    let win = false

    let next = document.querySelector('.nextPlayer')
    let winner = document.querySelector('.winner')
    const winnnerAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];


    function checkWinner(){
        winnnerAxes.forEach((item, index) => {
            if(gameBoard.board[item[0]] === this.activePlayer.marker && gameBoard.board[item[1]] === this.activePlayer.marker && gameBoard.board[item[2]] === this.activePlayer.marker){
                winner.textContent = "Winner: " + this.activePlayer.name
                gameBoard.playing = false
                this.win = true
            };
        })
    }

    function checkTie(){
        winner.textContent = "Tie"
        document.querySelector('.new').style.display = "block"
    }

    function alertNextPlayer(){
        this.activePlayer == playerOne ? next.textContent = "Player 2" : next.textContent = "Player 1"
    }

    function nextPlayer() {
        this.activePlayer == playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne
    }

    return {
        activePlayer,
        remainingSpots,
        nextPlayer,
        alertNextPlayer,
        checkWinner,
        checkTie,
        playerOne,
        playerTwo,
        win

    }
})()

