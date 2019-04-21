import React from 'react'
import { withTheme } from 'styled-components'
import { BarChart } from 'increaser-charts'

import { connectTo, takeFromState } from '../../utils/generic';
import { getSetsSum, getWeekdaySets } from '../../utils/statistics';
import Block from './block'
import { SHORT_WEEKDAYS } from '../../constants/statistics';

const Week = ({ sets, theme }) => {
  const seconds = getSetsSum(sets) / 1000

  const bars = SHORT_WEEKDAYS.map((label, index) => ({
    label,
    items: [{
      color: theme.color.primary,
      value: getSetsSum(getWeekdaySets(sets, index + 1))
    }]
  }))
  const dt = new Date()
  const weekday = ((dt.getDay() + 6) % 7) + 1
  return (
    <Block period='Average' time={seconds / weekday}>
      <BarChart
        bars={bars}
        barWidth={46}
        barSpace={4}
        showScroll={false}
        selectCenterBarOnScroll={false}
      />
    </Block>
  )
}

export default connectTo(
  state => takeFromState(state, 'timeline', ['sets']),
  {},
  withTheme(Week)
)