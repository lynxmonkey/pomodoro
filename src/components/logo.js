import React from 'react'
import styled from 'styled-components'
import { Quote } from 'increaser-components'

import { connectTo, takeFromState } from '../utils/generic';

const Logo = styled.p`
  font-family: 'Logo', cursive;
  color: ${props => props.theme.color.mainFont};
  text-decoration: none;
  font-size: 32px;
`

export default connectTo(
  state => takeFromState(state, 'timeline', ['sets']),
  {},
  ({ sets }) => sets.length ? <Quote/> : (
    <Logo>
      Pomodoro by Increaser
    </Logo>
  )
)
  