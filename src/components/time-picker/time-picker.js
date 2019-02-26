import React from 'react'
import styled from 'styled-components'
import TimePicker from 'increaser-timepicker'
import { centerContentStyle } from 'increaser-components'

import * as actions from '../../actions/timer'
import { promptToAddToHomeScreen } from '../../actions/generic'
import { connectTo, takeFromState } from '../../utils/generic'


const Middle = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  ${centerContentStyle}
`

const Component = ({ duration, changeDuration, promptToAddToHomeScreen, start, proposalEvent, sets }) => {
  const onStart = () => {
    start()
    if (proposalEvent && sets.length && !window.Windows) {
      promptToAddToHomeScreen()
    }
  }
  return (
    <TimePicker
      wrapper={Middle}
      duration={duration}
      onDurationChange={changeDuration}
      onStart={onStart}
    />
  )
}

export default connectTo(
  state => ({
    ...takeFromState(state, 'timer', ['duration']),
    ...takeFromState(state, 'generic', ['proposalEvent']),
    ...takeFromState(state, 'timeline', ['sets'])
  }),
  { ...actions, promptToAddToHomeScreen },
  Component
)