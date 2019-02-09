import React from 'react'
import styled from 'styled-components'
import TimePicker from 'increaser-timepicker'
import { centerContentStyle } from 'increaser-components'

import { connectTo, takeFromState } from '../../utils/generic';
import * as actions from '../../actions/timer'
import { promptToAddToHomeScreen } from '../../actions/generic'
import Logo from '../logo'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
`

const Placeholder = styled.div`
  width: 100%;
  height: 160px;
  ${centerContentStyle};
`

const Bottom = styled(Placeholder)`
  max-width: 600px;
`

const Middle = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  ${centerContentStyle}
`

const Center = ({ duration, changeDuration, start, proposalEvent, sets, children = null }) => {
  const onStart = () => {
    start()
    if (proposalEvent && sets.length) {
      promptToAddToHomeScreen()
    }
  }
  return (
    <Container>
      <Placeholder>
        {children}
      </Placeholder>
      <TimePicker
        wrapper={Middle}
        duration={duration}
        onDurationChange={changeDuration}
        onStart={onStart}
      />
      <Bottom>
        <Logo/>
      </Bottom>
    </Container>
  )
}

export default connectTo(
  state => ({
    ...takeFromState(state, 'timer', ['duration']),
    ...takeFromState(state, 'generic', ['proposalEvent']),
    ...takeFromState(state, 'timeline', ['sets'])
  }),
  { ...actions, promptToAddToHomeScreen },
  Center
)