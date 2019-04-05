import React from 'react'
import styled from 'styled-components'
import { push } from 'connected-react-router'
import { DateTime } from 'luxon'

import Button from './button-with-icon'
import { connectTo, takeFromState } from '../utils/generic'
import { PATH } from '../constants/routing'
import { toTime } from '../utils/time';

const ButtonWrap = styled.div`
  margin: 10px 0;
`

const ToWeekStatistics = ({ push, sets }) => {
  if (!sets.length) return null
  const now = DateTime.local()
  if (now.weekday === 1) return null
  const first = toTime(sets[0].start)
  if (first.weekday === now.weekday) return null

  return (
    <ButtonWrap>
      <Button centeredText onClick={() => push(PATH.STATISTICS)} icon={'chart-bar'} text={'Week Statistics'} />
    </ButtonWrap>
  )
}

export default connectTo(
  state => takeFromState(state, 'timeline', ['sets']),
  { push },
  ToWeekStatistics
)