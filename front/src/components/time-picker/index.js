import * as Sentry from '@sentry/browser'
import React from 'react'
import TimePicker from 'increaser-timepicker'

import * as actions from '../../actions/timer'
import { promptToAddToHomeScreen } from '../../actions/generic'
import { connectTo, takeFromState } from '../../utils/generic'
import Page from '../page'
import Time from '../time'
import Timeline from '../timeline'
import Wrapper from '../wrapper'
import Logo from '../logo'

export default connectTo(
  state => ({
    ...takeFromState(state, 'timer', ['changeDuration', 'start', 'duration']),
    ...takeFromState(state, 'generic', ['proposalEvent']),
    ...takeFromState(state, 'timeline', ['sets'])
  }),
  {
    ...actions,
    promptToAddToHomeScreen
  },
  ({ changeDuration, start, duration, proposalEvent, promptToAddToHomeScreen, sets }) => {
    const onStart = () => {
      start()
      if (proposalEvent && sets.length) {
        try {
          proposalEvent.prompt()
          promptToAddToHomeScreen()
        } catch(err) {
          Sentry.captureException(err)
        }
      }
    }
    return (
      <Page>
        <Time showLastSet />
        <TimePicker
          wrapper={Wrapper}
          duration={duration}
          onDurationChange={changeDuration}
          onStart={onStart}
        />
        <Timeline/>
        <Logo/>
      </Page>
    )
  }
)