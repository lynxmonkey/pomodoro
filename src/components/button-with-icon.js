import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { centerContentStyle } from 'increaser-components'

const Container = styled.button`
  color: ${p => p.theme.color.mainFont};
  height: 40px;
  border-radius: 20px;
  border: 2px solid #31CEFF;
  ${centerContentStyle};
  background-color: transparent;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  width: 240px;
  &:hover {
    background-color: rgba(52, 152, 219, 0.15);
  }
`

const IconPart = styled.div`
  width: 18%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const TextPart = styled.p`
  width: 92%;
  padding-left: 10px;
  font-size: 16px;
  display: flex;
  flex-direction: row;
`

export default ({ icon, text, onClick }) => {
  return (
    <Container onClick={onClick}>
      <IconPart>
        <FontAwesomeIcon size={'lg'} icon={icon} />
      </IconPart>
      <TextPart>{text}</TextPart>
    </Container>
  )
}