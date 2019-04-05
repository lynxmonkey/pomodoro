import React from 'react'
import DocumentTitle from 'react-document-title'
import styled, { withTheme } from 'styled-components'
import { DateTime } from 'luxon'
import Timeline from 'increaser-timeline'

import { connectTo, takeFromState } from '../../utils/generic';
import PageWithExit from '../page-with-exit'
import Block from './block'
import Week from './week'
import { toTime } from '../../utils/time';
import TimelineWrapper from '../timeline-wrapper'
import { WEEKDAYS } from '../../constants/statistics'


const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const setsToSeconds = sets => sets.reduce((acc, set) => acc + set.end - set.start, 0) / 1000

const Statistics = ({ sets, theme }) => {
  const weekday = DateTime.local().weekday
  const weekdaysSets = WEEKDAYS
    .map((__, index) => sets
      .filter(s => toTime(s.start).weekday === index + 1)
    )
  
  const [earliestStart] = weekdaysSets
    .map(sets => sets[0])
    .filter(set => set)
    .map(({ start }) => {
      const time = toTime(start)
      const minute = time.minute
      const second = time.second
      return start - (minute * 60 + second) * 1000
    })
    .sort((a, b) => a > b ? 1 : 0)
  
  const [latestEnd] = weekdaysSets
    .map(sets => sets[sets.length - 1])
    .filter(set => set)
    .map(({ end }) => {
      const time = toTime(end)
      const minute = time.minute
      const second = time.second
      const secondsGap = 3600 - (minute * 60 + second)
      return end + secondsGap * 1000
    })
    .sort((a, b) => a < b ? 1 : 0)

  const toTimelineSets = (sets) => {
    const coloredSets = sets.map(s => ({
      start: s.start / 1000,
      end: s.end / 1000,
      color: theme.color.primary 
    }))

    return [
      {
        start: earliestStart / 1000,
        end: earliestStart / 1000,
        color: 'transparent'
      },
      ...coloredSets,
      {
        start: latestEnd / 1000,
        end: latestEnd / 1000,
        color: 'transparent'
      }
    ]
  }

  const Timelines = () => {
    return WEEKDAYS
      .slice(0, weekday - 1)
      .map((weekday, index) => {
        const sets = weekdaysSets[index]
        const seconds = setsToSeconds(sets)
        return (
          <Block key={index} period={weekday} time={seconds}>
            <TimelineWrapper>
              <Timeline
                sets={toTimelineSets(sets)}
                wrapper={TimelineWrapper}
              />
            </TimelineWrapper>
          </Block>
        )
      })
  }

  return (
    <DocumentTitle title='statistics'>
      <PageWithExit>
        <Container>
          <Week/>
          <Timelines/>
        </Container>
      </PageWithExit>
    </DocumentTitle>
  )
}

export default connectTo(
  state => takeFromState(state, 'timeline', ['sets']),
  {},
  withTheme(Statistics)
)