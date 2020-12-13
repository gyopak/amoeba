import React, { useContext, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ThemeContext } from 'styled-components'
import { Player } from '../Grid/logic'
import * as S from './styles'

type Props = {
  winner: Player
  draw: boolean
  shouldShowScore: boolean
  reset: (gridSize: number) => void
}

function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

function getTitle(shouldShowScore: boolean, draw: boolean, prevDraw: boolean, winner: Player, prevWinner: Player) {
  if (shouldShowScore) {
    return draw ? `It's a draw` : `${winner} wins`
  } else {
    return prevDraw ? `It's a draw` : `${prevWinner} wins`
  }
}

export const Score = ({ winner, draw, reset, shouldShowScore }: Props) => {
  const themeContext = useContext(ThemeContext)
  // due to the exit animation the initialState will be shown
  // we have to keep track of the previous winner/draw
  const prevWinner = usePrevious(winner)
  const prevDraw = usePrevious(draw)
  const title = getTitle(shouldShowScore, draw, prevDraw as boolean, winner, prevWinner as Player)

  return createPortal(
    <S.OverLay
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      animate={{ opacity: shouldShowScore ? 1 : 0 }}
      style={{ zIndex: shouldShowScore ? 1 : -1 }}
    >
      <S.Wrapper>
        <S.Title>{title.toUpperCase()}</S.Title>
        <S.Button onClick={() => reset(themeContext.gridSize)}>start the same</S.Button>
        <S.Button
          onClick={() => {
            const nextGridSize = themeContext.gridSize === 3 ? 4 : 3
            themeContext.setGridSize(nextGridSize)
            reset(nextGridSize)
          }}
        >
          change map
        </S.Button>
      </S.Wrapper>
    </S.OverLay>,
    document.body,
  )
}
