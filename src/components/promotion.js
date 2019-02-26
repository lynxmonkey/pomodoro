import React from 'react'
import styled, { keyframes } from 'styled-components'
import Wrapper from './timeline-wrapper'
import { INCREASER } from '../constants/links';

const animation = p => keyframes`
  from {
    box-shadow: 0 0 10px ${p.theme.color.mainFont}, 0 0 20px ${p.theme.color.mainFont}, 0 0 30px ${p.theme.color.mainFont}, 0 0 40px ${p.theme.color.gold}, 0 0 70px ${p.theme.color.gold}, 0 0 80px ${p.theme.color.gold}, 0 0 100px ${p.theme.color.gold}, 0 0 150px ${p.theme.color.gold};
  }
  to {
    box-shadow: 0 0 5px ${p.theme.color.mainFont}, 0 0 10px ${p.theme.color.mainFont}, 0 0 15px ${p.theme.color.mainFont}, 0 0 20px ${p.theme.color.gold}, 0 0 35px ${p.theme.color.gold}, 0 0 40px ${p.theme.color.gold}, 0 0 50px ${p.theme.color.gold}, 0 0 75px ${p.theme.color.gold};
  }
`

const appearAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const AppearWrapper = styled.div`
  width: 100%;
  height: 100%;
  animation: ${appearAnimation} 2s linear alternate;
`

const Container = styled.a`
  background-color: ${p => p.theme.color.gold};
  border-radius: 5px;
  width: 100%;
  height: 100%;
  animation: ${p => animation(p)} 1.5s ease-in-out infinite alternate;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.color.mainFont};
  cursor: pointer;
  text-decoration: none;
`

const Question = styled.h4`
  font-size: 18px;
`

const Logo = styled.h3`
  font-family: 'Dancing Script', cursive;
  font-weight: bold;
  font-size: 26px;
`

export default () => (
  <Wrapper>
    <AppearWrapper>
      <Container  target="_blank" href={INCREASER}>
        <Question>
          Want to be more productive?
        </Question>
        <Logo>Increaser</Logo>
      </Container>
    </AppearWrapper>
  </Wrapper>
)