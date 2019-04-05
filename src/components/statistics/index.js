import React from 'react'
import DocumentTitle from 'react-document-title'
import styled from 'styled-components'
import { DateTime } from 'luxon'
import { BarChart } from 'increaser-charts'

import { connectTo, takeFromState } from '../../utils/generic';
import PageWithExit from '../page-with-exit'
import Block from './block'
import { THEME } from '../../constants/theme';
import { toTime } from '../../utils/time';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const WEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const setsToSeconds = sets => sets.reduce((acc, set) => acc + set.end - set.start, 0) / 1000

const Statistics = ({ sets }) => {
  const total = setsToSeconds(sets)
  const weekday = DateTime.local().weekday
  const sums = Array(7).fill(0).map((__, index) => {
    if (index >= weekday) return 0
    const weekdaySets = sets.filter(s => toTime(s.start).weekday === index + 1)
    return setsToSeconds(weekdaySets)
  })
  const bars = Array(7).fill(0).map((__, index) => ({
    label: WEEKDAYS[index],
    items: [{
      color: THEME.color.gold,
      value: sums[index]
    }]
  }))
  return (
    <DocumentTitle title='statistics'>
      <PageWithExit>
        <Container>
          <Block period='Week' time={total}>
            <BarChart
              bars={bars}
              barWidth={42}
              barSpace={4}
              showScroll={false}
              selectCenterBarOnScroll={false}
            />
          </Block>
        </Container>
      </PageWithExit>
    </DocumentTitle>
  )
}

export default connectTo(
  state => takeFromState(state, 'timeline', ['sets']),
  {},
  Statistics
)