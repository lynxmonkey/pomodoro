import React from 'react'
import styled from 'styled-components'
import TimePicker from 'increaser-timepicker'

import { connectTo, takeFromState } from '../../utils/generic';
import * as actions from '../../actions/timer'
import { promptToAddToHomeScreen } from '../../actions/generic'
import Logo from '../logo'

const Container = styled.div`
  /* padding: 5vh 0; */
  background-color: blueviolet;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;
`

class Center extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0
    }
  }

  render() {
    const { duration, changeDuration, start, proposalEvent, sets } = this.props
    const Content = () => {
      const { width, height } = this.state
      if (!width || !height) return null
      const Wrapper = styled.div`
        width: ${width}px;
        height: ${width > height ? '100%' : `${width}px`};
      `

      const onStart = () => {
        start()
        if (proposalEvent && sets.length) {
          promptToAddToHomeScreen()
        }
      }

      return (
        <TimePicker
          wrapper={Wrapper}
          duration={duration}
          onDurationChange={changeDuration}
          onStart={onStart}
        />
      )
    }
    return (
      <Container ref={el => this.container = el}>
        <Content/>
        <Logo/>
      </Container>
    )
  }

  componentDidMount() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    if (this.container) {
      const { width, height } = this.container.getBoundingClientRect()
      this.setState({ width, height })
    }
  }
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