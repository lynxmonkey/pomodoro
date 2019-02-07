import React from 'react'
import styled from 'styled-components'
import { RerenderWithTime } from 'increaser-components'

import { connectTo, takeFromState } from '../utils/generic'
import NotifyAfter from './notify-after'
import Promotion from './promotion'
import Timeline from './timeline'
import { notificationAllowed } from '../utils/notification'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StatisticsPanel = ({ pageWidth, promoting, sets, willNotifyAfter }) => {
  if (pageWidth < 1540 || sets.length < 1) return null
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
      {promoting ? <Promotion/> : <Timeline/>}
    </Container>
  )
}

export default connectTo(
  state => ({
    ...takeFromState(state, 'timer', ['willNotifyAfter']),
    ...takeFromState(state, 'generic', ['pageWidth', 'promoting']),
    ...takeFromState(state, 'timeline', ['sets']),
  }),
  {},
  StatisticsPanel
)