import { keyframes, css } from 'styled-components'

const animation = (yMove) => keyframes`
  0% {
    opacity: 0;
    transform: translateY(${yMove}px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

export const yAnimation = (moveY) => css`
  animation: ${animation(moveY)} .35s ease-in-out;
  animation-fill-mode: both;
`