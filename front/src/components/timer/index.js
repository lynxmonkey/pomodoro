import React from 'react'
import Timer from 'increaser-timer'
import styled, { css } from 'styled-components'
import { TimerButton } from 'increaser-components'

import { stop } from '../../actions/timer'
import { connectTo } from '../../utils/generic'
import Time from '../time'

const Page = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${p => p.theme.color.pageBackground};
`

const Wrapper = styled.div`
  width: 80vmin;
  height: 80vmin;

  @media (max-width: 1220px) {
    height: 66vmin;
    width: 66vmin;
  }

  @media (max-width: 800px) {
    height: 80vmin;
    width: 80vmin;
  }
`

const Container = styled(Wrapper)`
  position: absolute;
  display: flex;
  justify-content: center;
`

const TimeContainer = styled.div`
  position: absolute;
  top: 4%;
  ${p => p.mobile ? css`
    height: 120px;
    background-color: transparent;
    left: 50%;
    transform: translateX(-50%);
  ` : css`
    right: 4%;
  `}
`

const TimerWrapper = connectTo(
  state => state.generic,
  { stop },
  ({ stop, children, pageWidth }) => 
  {
    const stopInsideTimer = pageWidth > 800
    const mobile = pageWidth < 1220
    return (
      <Page>
        <TimeContainer mobile={mobile}>
          <Time mobile={mobile}/>
        </TimeContainer>
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
