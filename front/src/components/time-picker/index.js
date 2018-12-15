import React from 'react'
import TimePicker from 'increaser-timepicker'

import * as actions from '../../actions/timer'
import { connectTo } from '../../utils/generic'
import Page from '../page'
import Time from '../time'
import Wrapper from '../wrapper'
import Logo from '../logo'

export default connectTo(
  state => state.timer,
  actions,
  ({ changeDuration, start, duration }) => {
    return (
      <Page>
        <Time showLastSet />
        <TimePicker
          wrapper={Wrapper}
          duration={duration}
          onDurationChange={changeDuration}
          onStart={start}
        />
        <Logo/>
      </Page>
    )
  }
)