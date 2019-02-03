import React from 'react'
import styled from 'styled-components'
import { connectTo, takeFromState } from '../utils/generic';

import Promotion from './promotion'
import Timeline from './timeline'

const Container = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StatisticsPanel = ({ pageWidth, promoting, sets }) => {
  if (pageWidth < 1220 || sets.length < 1) return null
  return (
    <Container>
      {promoting ? <Promotion/> : <Timeline/>}
    </Container>
  )
}

export default connectTo(
  state => ({
    ...takeFromState(state, 'generic', ['pageWidth', 'promoting']),
    ...takeFromState(state, 'timeline', ['sets']),
  }),
  {},
  StatisticsPanel
)