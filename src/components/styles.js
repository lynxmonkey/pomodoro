import { keyframes, css } from 'styled-components'
import { centerContentStyle } from 'increaser-components';

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

export const buttonStyle = css`
  border: 2px solid #31CEFF;
  background-color: transparent;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  ${centerContentStyle};
`

export const buttonHoverStyle = css`
  background-color: rgba(52, 152, 219, 0.15);
`