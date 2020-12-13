import styled from 'styled-components'

type LineProps = {
  i: number
  horizontal?: boolean
}

export const Wrapper = styled.div`
  position: relative;
`

const LineWithCircles = styled.div<LineProps>`
  ${({ horizontal, theme }) => {
    const commonCircleCssRules = `
        content: '';
        display: inline-block;
        width: ${theme.gridGap}px;
        height: ${theme.gridGap}px;
        border-radius: ${theme.gridGapHalf}vw;
        background-color: black;
        position: absolute;
    `

    return `
        ::before {
            ${commonCircleCssRules}
            ${horizontal ? 'left' : 'top'}: -${theme.gridGapHalf}vw;
        }

        ::after {
            ${commonCircleCssRules}
            ${horizontal ? 'right' : 'bottom'}: -${theme.gridGapHalf}vw;
        }
    `
  }}
`

export const Line = styled(LineWithCircles)<LineProps>`
  position: absolute;
  background-color: black;

  ${({ i, horizontal, theme }) => {
    const longDimension = theme.gridSize * theme.cellWidth + (theme.gridSize - 1) * theme.gridGap
    const translatedValue = i * theme.cellWidth + (i - 1) * theme.gridGap
    if (horizontal) {
      return `
        height: ${theme.gridGap}vw;
        width: ${longDimension}vw;
        top: ${translatedValue}vw;
        `
    } else {
      return `
        width: ${theme.gridGap}vw;
        height: ${longDimension}vw;
        left: ${translatedValue}vw;
        `
    }
  }}
`
