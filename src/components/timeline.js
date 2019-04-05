import React from 'react'
import Timeline from 'increaser-timeline'
import { withTheme } from 'styled-components'
import { RerenderWithTime } from 'increaser-components'

import { connectTo, takeFromState } from '../utils/generic'
import Wrapper from './timeline-wrapper'
import { getTodaySets } from '../utils/time';
import TotalTime from './total-time'

const Component = ({ theme, sets }) => {
  const todaySets = getTodaySets(sets)
  if (!todaySets.length) return null
  const coloredSets = todaySets.map(s => ({
    start: s.start / 1000,
    end: s.end / 1000,
    color: theme.color.primary 
  }))

  const lastSetEnd = coloredSets[coloredSets.length - 1].end
  const totalSeconds = Math.round(coloredSets.reduce((acc, cs) => acc + cs.end - cs.start, 0))
  const renderTimeline = () => (
    <Timeline
      sets={[...coloredSets, { start: lastSetEnd, color: theme.color.default, end: Date.now() / 1000 }]}
      wrapper={Wrapper}
    />
  )
  return (
    <>
      <TotalTime seconds={totalSeconds} text={'of deep work today'}/>
      <RerenderWithTime renderComponent={renderTimeline} milliseconds={1000} />
    </>
  )
}

export default connectTo(
  state => takeFromState(state, 'timeline', ['sets']),
  {},
  withTheme(Component)
)