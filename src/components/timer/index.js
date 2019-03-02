import React from 'react'
import Timer from 'increaser-timer'
import styled, { css, withTheme } from 'styled-components'
import { TimerButton, centerContentStyle } from 'increaser-components'

import { stop } from '../../actions/timer'
import { connectTo, takeFromState } from '../../utils/generic'
import Page from '../page'
import Time from '../time'

const InnerPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${centerContentStyle}
`

const MOBILE = 1220

const getWrapper = () => {
  const width = window.innerWidth
  if (width > MOBILE) {
    return styled.div`
      width: 80vmin;
      height: 80vmin;
    `
  }
  const height = window.innerHeight - (window.innerHeight * 0.08) - 240
  const side = Math.min(width - 80, height)
  return styled.div`
    width: ${side}px;
    height: ${side}px;
  `
}

const TimeContainer = styled.div`
  position: absolute;
  top: 0%;
  ${p => p.mobile ? css`
    height: 120px;
    background-color: transparent;
    left: 50%;
    transform: translateX(-50%);
  ` : css`
    right: 0%;
  `}
`

const TimerWrapper = connectTo(
  state => state.generic,
  { stop },
  ({ stop, pageWidth, pageHeight }) => 
  {
    const stopInsideTimer = pageWidth > 800
    const mobile = pageWidth < MOBILE
    const Wrapper = getWrapper()
    const Container = styled(Wrapper)`
      position: absolute;
      display: flex;
      justify-content: center;
    `
    return (
      <Page>
        <InnerPage>
          <TimeContainer mobile={mobile}>
            <Time mobile={mobile}/>
          </TimeContainer>
          <Container>
            <InnerTimer wrapper={Wrapper}/>
            {stopInsideTimer && <TimerButton onClick={stop}>STOP</TimerButton>}
          </Container>
          {!stopInsideTimer && <TimerButton onClick={stop}>STOP</TimerButton>}
        </InnerPage>
      </Page>
    )
  }
)

const InnerTimer = withTheme(connectTo(
  state => ({
    ...state.timer,
    ...takeFromState(state, 'generic', ['pageWidth', 'pageHeight'])
  }),
  {},
  class extends React.Component {
    render() {
      const { startTime, timeNow, duration, theme, wrapper: Wrapper } = this.props
      return (
        <Timer
          wrapper={Wrapper}
          startTime={startTime}
          timeNow={timeNow}
          duration={duration}
          showTimeInTitle={true}
          handleBeforeUnload={true}
          theme={{ timeFillColor: theme.color.gold }}
        />
      )
    }

    componentDidMount() {
      if (window.Notification && window.Notification.permission !== 'granted') {
        window.Notification.requestPermission()
      }
    }
  }
))

export default () => <TimerWrapper/>
