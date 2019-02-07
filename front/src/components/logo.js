import React from 'react'
import styled from 'styled-components'
import { Quote } from 'increaser-components'

import { INCREASER } from '../constants/links';
import { connectTo, takeFromState } from '../utils/generic';
const Link = styled.a`
  font-family: 'Dancing Script', cursive;
  color: ${props => props.theme.color.text};
  cursor: pointer;
  text-decoration: none;
  font-size: 32px;
`

export default connectTo(
  state => takeFromState(state, 'timeline', ['sets']),
  {},
  ({ sets }) => sets.length ? <Quote/> : (
    <Link target="_blank" href={INCREASER}>
      Pomodoro by Increaser
    </Link>
  )
)
  