import React, { useRef } from 'react'
import { RoughNotation } from 'react-rough-notation'
import { CellState } from '../Grid/logic'
import * as S from './styles'

function lerp(start: number, end: number, amt: number): number {
  return (1 - amt) * start + amt * end
}

const TypedRoughNotation = RoughNotation as any

type Props = {
  cellState: CellState
  setCell: () => void
  disabled: boolean
}

export const Cell = ({ cellState, setCell, disabled }: Props) => {
  const type = cellState === 'x' ? 'crossed-off' : 'circle'
  const ix = lerp(Math.random(), 1, 3)
  const jx = lerp(Math.random(), 1, 9)
  const ref = useRef([ix, jx])
  const [i, w] = ref.current
  return (
    <S.Wrapper onClick={disabled ? () => {} : setCell} disabled={disabled}>
      <S.Marker>
        {cellState !== '_' && (
          <TypedRoughNotation
            animationDuration={400}
            iterations={i}
            strokeWidth={w}
            color={cellState === 'x' ? 'black' : 'red'}
            type={type}
            show
            customElement="div"
          />
        )}
      </S.Marker>
    </S.Wrapper>
  )
}
