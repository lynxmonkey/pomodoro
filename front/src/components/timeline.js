import React from 'react'
import Timeline from 'increaser-timeline'
import { withTheme } from 'styled-components'
import { RerenderWithTime } from 'increaser-components'

import { connectTo } from '../utils/generic'
import { THEME } from '../constants/theme'
import Wrapper from './timeline-wrapper'

export default connectTo(
  state => ({
    ...state.timeline,
    ...state.generic
  }),
  {},
  withTheme(({ theme, sets, pageWidth }) => {
    if (pageWidth < 1220 || sets.length < 2) return null
    const coloredSets = sets.map(s => ({
      start: s.start / 1000,
      end: s.end / 1000,
      color: THEME.color.gold 
    }))

    const lastSetEnd = coloredSets[coloredSets.length - 1].end

    const renderTimeline = () => (
      <Timeline
        sets={[...coloredSets, { start: lastSetEnd, color: theme.color.default, end: Date.now() / 1000 }]}
        wrapper={Wrapper}
      />
    )
    return <RerenderWithTime renderComponent={renderTimeline} milliseconds={1000} />
  })
)