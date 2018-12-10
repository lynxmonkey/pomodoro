import React from 'react'
import Timer from 'increaser-timer'
import styled from 'styled-components'

import Wrapper from '../wrapper'
import { stop } from '../../actions/timer'
import { connectTo } from '../../utils/generic'
import Page from '../page'

const StopButton = styled.button`
  color: #FFFFFF;
  position: absolute;
  top: 62.8%;
  width: 24%;
  height: 8%;
  background-color: rgba(255, 255, 255, 0.15);
  font-size: 2.6vmin;
  font-family: 'Medium';
  cursor: pointer;
  border-width: 0;
  border-radius: 5px;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  &:hover {
    background-color: rgba(52, 152, 219,0.2);
    transition: .35s ease-in-out;
  }
`

const Container = styled(Wrapper)`
  position: absolute;
  display: flex;
  justify-content: center;
`

const TimerWrapper = connectTo(() => ({}), { stop }, ({ stop, children }) => (
  <Page >
    <Container>
      {children}
      <StopButton onClick={stop}>STOP</StopButton>
    </Container>
  </Page>
))

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
      if (Notification.permission !== 'granted') {
        Notification.requestPermission()
      }
    }
  }
)

export default () => (
  <TimerWrapper>
    <InnerTimer />
  </TimerWrapper>
)
