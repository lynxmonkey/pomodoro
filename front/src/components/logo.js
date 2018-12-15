import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  bottom: 5%;
  width: 100%;
  display: flex;
  justify-content: center;
`

const Link = styled.a`
  font-family: 'Dancing Script', cursive;
  color: ${props => props.theme.color.text};
  cursor: pointer;
  text-decoration: none;
  font-size: 32px;
`

export default () => (
  <Wrapper>
    <Link target="_blank" href="https://increaser.org">
      Pomodoro by Increaser
    </Link>
  </Wrapper>
)