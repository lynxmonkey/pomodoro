import React from 'react'
import styled from 'styled-components'
import Timeline from 'increaser-timeline'

import { connectTo } from '../utils/generic'
import { THEME } from '../constants/theme'

const Wrapper = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
  width: 320px;
  height: 100px;
`

export default connectTo(
  state => ({
    ...state.timeline,
    ...state.generic
  }),
  {},
  ({ sets, pageWidth }) => {
    if (pageWidth < 1220 || sets.length < 2) return null
    const coloredSets = sets.map(s => ({
      start: s.start / 1000,
      end: s.end / 1000,
      color: THEME.color.gold 
    }))
    return (
      <Timeline
        sets={coloredSets}
        wrapper={Wrapper}
      />
    )
  }
)