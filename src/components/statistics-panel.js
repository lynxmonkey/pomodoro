import React from 'react'
import styled from 'styled-components'
import { RerenderWithTime } from 'increaser-components'

import { connectTo, takeFromState } from '../utils/generic'
import NotifyAfter from './notify-after'
import Timeline from './timeline'
import Sync from './sync'
import { notificationAllowed } from '../utils/notification'

const Container = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StatisticsPanel = ({ sets, willNotifyAfter, to }) => {
  if (sets.length < 1) return (
    <Container>
      <Sync/>
    </Container>
  )
  const renderNotify = () => {
    if (willNotifyAfter || !notificationAllowed()) return null
    const lastSetEnd = sets[sets.length - 1].end
    const secondsPassed = (Date.now() - lastSetEnd) / 1000
    if (secondsPassed > 60) return null

    return <NotifyAfter/>
  }
  return (
    <Container>
      <RerenderWithTime renderComponent={renderNotify} milliseconds={2000} />
      <Timeline/>
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