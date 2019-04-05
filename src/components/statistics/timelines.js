import React from 'react'
import { withTheme } from 'styled-components'
import Timeline from 'increaser-timeline'
import { DateTime } from 'luxon'

import { connectTo, takeFromState } from '../../utils/generic';
import { WEEKDAYS } from '../../constants/statistics';
import { getWeekdaySets, getSetsSum } from '../../utils/statistics';
import { toTime } from '../../utils/time';
import Block from './block'
import TimelineWrapper from '../timeline-wrapper'


const toOrderedHours = timestamps => timestamps
  .map(t => toTime(t).hour)
  .sort((a, b) => a > b ? 1 : 0)

const Timelines = ({ sets, theme }) => {
  const now = DateTime.local()
  const weekday = now.weekday
  const days = WEEKDAYS.slice(0, weekday)
  const weekdaysSets = days.map((__, index) => getWeekdaySets(sets, index + 1))
  const notEmptyWeekdaysSets = weekdaysSets.filter(s => s.length)
  const starts = notEmptyWeekdaysSets.map(sets => sets[0].start)
  const ends = notEmptyWeekdaysSets.map(sets => sets[sets.length - 1].end)
  const [startHour] = toOrderedHours(starts)
  const endHour = toOrderedHours(ends)[ends.length - 1] + 1
  const weekStart = DateTime.local(now.year, now.month, now.day - weekday + 1, 0, 0, 0, 0).valueOf() / 1000

  return days.map((day, index) => {
    const weekdaySets = weekdaysSets[index]
    const seconds = getSetsSum(weekdaySets) / 1000
    const start = weekStart + (24 * index + startHour) * 3600
    const end  = weekStart + (24 * index + endHour) * 3600
    const timelineSets = [
      {
        start: start,
        end: start,
        color: 'transparent'
      },
      ...weekdaySets.map(({ start, end }) => ({
        start: start / 1000,
        end: end / 1000,
        color: theme.color.primary
      })),
      {
        start: end,
        end,
        color: 'transparent'
      }
    ]

    return (
      <Block key={index} period={day} time={seconds}>
        <TimelineWrapper>
          <Timeline
            minHours={0}
            sets={timelineSets}
            wrapper={TimelineWrapper}
          />
        </TimelineWrapper>
      </Block>
    )
  })
}

export default connectTo(
  state => takeFromState(state, 'timeline', ['sets']),
  {},
  withTheme(Timelines)
)