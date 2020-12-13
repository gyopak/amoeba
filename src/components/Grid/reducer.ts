import { GameState, Player } from './logic'

type Action =
  | { type: 'SET_CELL'; index: number; moveBy: Player }
  | { type: 'SET_WINNER'; winner: Player }
  | { type: 'SET_DRAW' }
  | { type: 'RESET'; gridSize: number }

export function init(gridSize: number): GameState {
  return {
    winner: null,
    draw: false,
    moveBy: 'computer',
    cellStates: Array(Math.pow(gridSize, 2)).fill('_'),
  }
}

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SET_CELL': {
      const { moveBy, index } = action
      const nextCellState = moveBy === 'human' ? 'x' : 'o'

      // const freeCellIndexes = findFreeCellIndexes(state.cellStates)
      // const index = getRandomItemFromArray(freeCellIndexes)
      return {
        ...state,
        moveBy,
        cellStates: state.cellStates.map((cellState, i) => (index === i ? nextCellState : cellState)),
      }
    }
    case 'SET_WINNER': {
      const { winner } = action
      return {
        ...state,
        winner,
      }
    }
    case 'SET_DRAW': {
      return {
        ...state,
        draw: true,
      }
    }
    case 'RESET': {
      const { gridSize } = action
      return init(gridSize)
    }
    default:
      throw new Error()
  }
}
