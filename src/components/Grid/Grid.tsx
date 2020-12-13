import React, { useContext, useEffect, useReducer } from 'react'
import { ThemeContext } from 'styled-components'
import { Board } from '../Board/Board'
import { Cell } from '../Cell/Cell'
import { Score } from '../Score/Score'
import { checkBoardIsFull, checkWinner, findFreeCellIndexes, getRandomItemFromArray, Player } from './logic'
import { init, reducer } from './reducer'
import * as S from './styles'

export const Grid = () => {
  const themeContext = useContext(ThemeContext)
  const initialState = init(themeContext.gridSize)

  const [gameState, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (gameState.winner || gameState.draw) {
      return
    }

    const winner = checkWinner(gameState.cellStates, themeContext.gridSize)
    if (winner) {
      dispatch({ type: 'SET_WINNER', winner })
      return
    }

    const draw = checkBoardIsFull(gameState.cellStates)
    if (draw) {
      dispatch({ type: 'SET_DRAW' })
    }

    if (gameState.moveBy === 'human') {
      // setTimeout(() => dispatch({ type: 'SET_CELL', index, moveBy: 'computer' }), 600)
    }
  }, [gameState, themeContext.gridSize])

  const setCell = (index: number) => {
    dispatch({ type: 'SET_CELL', index, moveBy: gameState.moveBy === 'computer' ? 'human' : 'computer' })
  }

  const reset = (gridSize: number) => {
    dispatch({ type: 'RESET', gridSize })
  }

  const shouldShowScore = Boolean(gameState.winner || gameState.draw)
  return (
    <S.Container opacity={shouldShowScore ? 0.2 : 1}>
      <Board />
      <S.Wrapper>
        {gameState.cellStates.map((cellState, i) => {
          return (
            <Cell
              key={i}
              cellState={cellState}
              setCell={() => setCell(i)}
              disabled={cellState !== '_' || Boolean(gameState.winner)}
            />
          )
        })}
      </S.Wrapper>

      <Score
        winner={gameState.winner as Player}
        draw={gameState.draw}
        reset={reset}
        shouldShowScore={shouldShowScore}
      />
    </S.Container>
  )
}
