import React from 'react'
import Timer from 'increaser-timer'
import styled from 'styled-components'
import { TimerButton } from 'increaser-components'

import Wrapper from '../wrapper'
import { stop } from '../../actions/timer'
import { connectTo } from '../../utils/generic'
import Time from '../time'
import Page from '../page'

const Container = styled(Wrapper)`
  position: absolute;
  display: flex;
  justify-content: center;
`

const TimerWrapper = connectTo(
  state => state.generic,
  { stop },
  ({ stop, children, pageWidth }) => 
  {
    const stopInsideTimer = pageWidth > 800
    return (
      <Page >
        <Time/>
        <Container>
          {children}
          {stopInsideTimer && <TimerButton onClick={stop}>STOP</TimerButton>}
        </Container>
        {!stopInsideTimer && <TimerButton onClick={stop}>STOP</TimerButton>}
      </Page>
    )
  }
)

const InnerTimer = connectTo(
  state => state.timer,
  {},
  class extends React.Component {
    render() {
      const { startTime, timeNow, duration } = this.props
      return (
        <Timer
          wrapper={Wrapper}
          startTime={startTime}
          timeNow={timeNow}
          duration={duration}
          showTimeInTitle={true}
          handleBeforeUnload={true}
          theme={{ timeFillColor: 'rgb(249, 168, 37)' }}
        />
      )
    }

    componentDidMount() {
      if (window.Notification && window.Notification.permission !== 'granted') {
        window.Notification.requestPermission()
      }
    }
  }
)

export default () => (
  <TimerWrapper>
    <InnerTimer />
  </TimerWrapper>
)
