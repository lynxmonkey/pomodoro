import React from 'react'
import styled,{ keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
  position: relative;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.theme.color.glass};
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.color.text};
  :hover {
    transition: .35s ease-in-out;
    color: ${props => props.theme.color.gold};
  }
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
  width: 220px;
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

export default ({ icon, onClick, hint }) => {
  return (
    <Container onClick={onClick}>
      <FontAwesomeIcon size={'lg'} icon={icon}/>
      <Hint>
        <p>{hint}</p>
      </Hint>
    </Container>
  )
}