import styled from 'styled-components'
import { motion } from 'framer-motion'

export const OverLay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`

export const Title = styled.div`
  font-size: calc(3vw + 3vh);
`

export const Button = styled.div`
  font-size: calc(2vw + 2vh);
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`
