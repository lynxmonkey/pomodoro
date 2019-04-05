import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { buttonStyle, buttonHoverStyle } from './styles';

// to: one placy with custom colors
const Container = styled.button`
  ${buttonStyle}
  height: 40px;
  border-radius: 20px;
  width: 240px;
  &:hover {
    ${buttonHoverStyle}
  }
`

const IconPart = styled.div`
  width: 18%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const TextPart = styled.div`
  width: 92%;
  padding-left: ${p => p.centeredText ? '0px' : '10px'};
  justify-content: ${p => p.centeredText ? 'center' : 'start'};
  font-size: 16px;
  display: flex;
  flex-direction: row;
`

export default ({ icon, text, onClick, centeredText = false }) => {
  return (
    <Container onClick={onClick}>
      <IconPart>
        <FontAwesomeIcon size={'lg'} icon={icon} />
      </IconPart>
      <TextPart centeredText={centeredText}>
        <p>
          {text}
        </p>
      </TextPart>
    </Container>
  )
}