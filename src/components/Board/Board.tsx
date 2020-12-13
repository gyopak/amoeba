import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import * as S from './styles'

export const Board = () => {
  const themeContext = useContext(ThemeContext)
  return (
    <S.Wrapper>
      {[...Array(themeContext.gridSize - 1).keys()].map((i) => {
        return (
          <React.Fragment key={i}>
            <S.Line i={i + 1} />
            <S.Line i={i + 1} horizontal />
          </React.Fragment>
        )
      })}
    </S.Wrapper>
  )
}
