import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RoundButton } from 'increaser-components'
import { yAnimation } from './styles';

const Container = styled.div`
  position: relative;
  margin: 10px 0;
`

const GenericHintContainer = styled.div`
  left: 70px;
  top: 5px;
  position: absolute;
  display: none;
  ${yAnimation(10)};
  animation-fill-mode: both;
  ${Container}:hover & {
    display: block;
    color: ${props => props.theme.color.mainFont};
  }
`

const Hint = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 240px;
  padding: 10px;
  background-color: ${props => props.theme.color.default};
`

export default ({ icon, onClick, hint, linkTo, customHint, calling }) => {
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
        <RoundButton calling={calling} onClick={onClick} size='m' type='default'>
          <FontAwesomeIcon size={'lg'} icon={icon}/>
        </RoundButton>
        <GenericHintContainer>
          {customHint ? customHint() : (
            <Hint>
              <p>{hint}</p>
            </Hint>
          )}
        </GenericHintContainer>
      </Container>
    </Link>
  )
}