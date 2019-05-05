import React from 'react'
import styled, { withTheme } from 'styled-components'

import { connectTo, takeFromState } from '../utils/generic';
import { secondsFormatterMinAndSecs } from '../utils/time'

const Container = styled.div`
  width: 300px;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Time = styled.p`
  font-size: 32px;
  color: ${props => props.theme.color.mainFont};
  font-weight: bold;
`

const RestTime = ({ theme, notifyAfterMinutes, secondsPassed }) => {
  const overallSeconds = notifyAfterMinutes * 60
  const percent = (secondsPassed / overallSeconds) * 100
  const background = `linear-gradient(to right, ${theme.color.primary} ${percent}%, ${theme.color.default} ${percent}%`
  const time = secondsFormatterMinAndSecs(overallSeconds - secondsPassed)
  return (
    <Container style={{ background }}>
      <Time>{time}</Time>
    </Container>
  )
}

export default connectTo(
  state => (takeFromState(state, 'timer', ['notifyAfterMinutes'])),
  { },
  withTheme(RestTime)
)