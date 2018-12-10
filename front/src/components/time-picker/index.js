import React from 'react'
import TimePicker from 'increaser-timepicker'

import * as actions from '../../actions/timer'
import { connectTo } from '../../utils/generic'
import Page from '../page'
import Wrapper from '../wrapper'

export default connectTo(
  state => state.timer,
  actions,
  ({ changeDuration, start, duration }) => (
    <Page>
      <TimePicker
        wrapper={Wrapper}
        duration={duration}
        onDurationChange={changeDuration}
        onStart={start}
      />
    </Page>
  )
)