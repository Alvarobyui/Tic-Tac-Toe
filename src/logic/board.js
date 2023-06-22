import {WINNER_COMBOS} from "../constants.js"

export const checkWinnerFrom = (boardtoCheck) => {
  //revisamos todas las conbinaciones ganadoreas
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardtoCheck[a] && // si exixte algo en la pocisión a
      boardtoCheck[a] === boardtoCheck[b] && 
      boardtoCheck[a] === boardtoCheck[c] // si en la pocisi+on a y b esta el mismo signo Y si en la b y c esta el mismo signo
    ) {
      // retorna al ganador
      return boardtoCheck[a]
    }
  }
  // si no hay ganador
  return null
}