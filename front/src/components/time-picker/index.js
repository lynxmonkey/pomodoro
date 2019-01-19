import React from 'react'
import TimePicker from 'increaser-timepicker'

import * as actions from '../../actions/timer'
import { promptToAddToHomeScreen, togglePromote } from '../../actions/generic'
import { connectTo, takeFromState } from '../../utils/generic'
import Page from '../page'
import Time from '../time'
import Panel from '../panel'
import Timeline from '../timeline'
import Promotion from '../promotion'
import Wrapper from '../wrapper'
import Logo from '../logo'

class Component extends React.Component {
  render() {
    const { changeDuration, start, duration, proposalEvent, promptToAddToHomeScreen, sets, promoting } = this.props
    const onStart = () => {
      start()
      if (proposalEvent && sets.length) {
        promptToAddToHomeScreen()
      }
    }
    return (
      <Page>
        <Logo/>
        <Panel/>
        <Time showLastSet />
        <TimePicker
          wrapper={Wrapper}
          duration={duration}
          onDurationChange={changeDuration}
          onStart={onStart}
        />
        {promoting ? <Promotion/> : <Timeline/>}
      </Page>
    )
  }

  componentDidMount() {
    document.addEventListener('click', this.onClick)
  }

  onClick = () => {
    const { promoting, togglePromote } = this.props
    if (promoting) {
      togglePromote()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick)
  }
}

export default connectTo(
  state => ({
    ...takeFromState(state, 'timer', ['changeDuration', 'start', 'duration']),
    ...takeFromState(state, 'generic', ['proposalEvent', 'promoting']),
    ...takeFromState(state, 'timeline', ['sets'])
  }),
  {
    ...actions,
    promptToAddToHomeScreen,
    togglePromote
  },
  Component
)