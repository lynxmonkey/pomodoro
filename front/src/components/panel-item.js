import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
  border-radius: 50%;
  border: none;
  background-color: ${props => props.theme.color.glass};
  transition: .35s ease-in-out;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.color.text};
  &:hover {
    color: ${props => props.theme.color.gold};
  }
`

export default ({ icon, onClick }) => {
  return (
    <Container onClick={onClick}>
      <FontAwesomeIcon size={'lg'} icon={icon}/>
    </Container>
  )
}