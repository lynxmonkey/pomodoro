import React from 'react'
import styled from 'styled-components'
import { RerenderWithTime } from 'increaser-components'

import { connectTo, takeFromState } from '../utils/generic'
import NotifyAfter from './notify-after'
import Timeline from './timeline'
import Sync from './sync'
import ToStatistics from './to-statistics'
import { notificationAllowed } from '../utils/notification'
import RestTime from './rest-time'

const Container = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StatisticsPanel = ({ sets, willNotifyAfter }) => {
  if (sets.length < 1) return (
    <Container>
      <Sync/>
    </Container>
  )
  const renderNotify = () => {
    if (!notificationAllowed()) return null
    const lastSetEnd = sets[sets.length - 1].end
    const secondsPassed = (Date.now() - lastSetEnd) / 1000
    if (!willNotifyAfter && secondsPassed > 60) return null
    if (willNotifyAfter) {
      return <RestTime secondsPassed={secondsPassed}/>
    }
    return <NotifyAfter/>
  }
  return (
    <Container>
      <RerenderWithTime renderComponent={renderNotify} milliseconds={500} />
      <Timeline/>
      <ToStatistics/>
      <Sync/>
    </Container>
  )
}

export default connectTo(
  state => ({
    ...takeFromState(state, 'timer', ['willNotifyAfter']),
    ...takeFromState(state, 'timeline', ['sets']),
  }),
  { },
  StatisticsPanel
)