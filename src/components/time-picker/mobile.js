import React from 'react'
import styled from 'styled-components'

import TimePicker from './time-picker'
import Time from '../time'
import Logo from '../logo'
import StatisticsPanel from '../statistics-panel'
import ToFeatures from '../to-features'

const Page = styled.div`
  padding: 20px;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-image: ${p => p.theme.color.pageBackground};
`

const TimePickerWrapper = styled.div`
  height: 400px;
  width: 400px;
  @media (max-width: 480px) {
    height: calc(100vw - 40px);
    width: calc(100vw - 40px);
  } 
`

const StatisticsPanelWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default () => {
  return (
    <Page>
      <Time showLastSet mobile/>
      <TimePickerWrapper>
        <TimePicker/>
      </TimePickerWrapper>
      <StatisticsPanelWrapper>
        <StatisticsPanel/>
        <ToFeatures/>
      </StatisticsPanelWrapper>
      <Logo/>
    </Page>
  )
}