import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RoundButton } from 'increaser-components'

const Container = styled.div`
  position: relative;
  margin: 10px 0;
`

const animation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const Hint = styled.div`
  left: 70px;
  top: 5px;
  position: absolute;
  display: none;
  animation: ${animation} .35s ease-in-out;
  animation-fill-mode: both;
  width: 240px;
  border-radius: 5px;
  padding: 10px;
  background-color: ${props => props.theme.color.glass};
  ${Container}:hover & {
    color: ${props => props.theme.color.text};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default ({ icon, onClick, hint, linkTo }) => {
  const Link = ({ children }) => {
    if (linkTo) return (
      <a target="_blank" rel="noopener noreferrer" href={linkTo}>
        {children}
      </a>
    )

    return children
  }
  return (
    <Link>
      <Container>
        <RoundButton onClick={onClick} size='m' type='default'>
          <FontAwesomeIcon size={'lg'} icon={icon}/>
        </RoundButton>
        <Hint>
          <p>{hint}</p>
        </Hint>
      </Container>
    </Link>
  )
}