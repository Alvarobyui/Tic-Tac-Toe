/* eslint-disable react/prop-types */
import { useState } from 'react'
import confetti from "canvas-confetti"
import {Square} from "./components/Square"
import {TURNS} from "./constants.js"
import {checkWinnerFrom} from "./logic/board.js"

function App() {
  
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board")
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn")
    return turnFromStorage ?? TURNS.X 
  })
  const [winner, setWinner] = useState(null)

  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem("board")
    window.localStorage.removeItem("turn")
  }

  const checkEndGame = (newBoard) => {
    //vemos si hay un empate
    // si no hay espacios vacios en el tablero.
    return newBoard.every(square => square !== null)
  }

  const updateBoard = (index)=> {
    //no actualizar esta pocisión si ya tiene algo

    if(board[index] || winner) return
    // Actualizar si esta vacio
    const newBoard = [...board]
    newBoard[index] = turn 
    setBoard(newBoard)
    
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Guarder aqui partida
    window.localStorage.setItem("board", JSON.stringify(newBoard))
    window.localStorage.setItem("turn", newTurn)
    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } //  ver si el juego termino
      else if (checkEndGame(newBoard)) {
        setWinner(false)
      }
  }
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                  {square}
              </Square>
            )
          }) 
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className="text">
              <h2>
                {
                  winner === false
                    ? "Tie"
                    : "Winner:"
                }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Play Again</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
