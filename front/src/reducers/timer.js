import { createReducer } from 'redux-act'

import * as a from '../actions/timer'
import { takeIfExists } from '../utils/localStorage';
import { DEFAULT_DURATION } from '../constants/timer';


const getDefaultState = () => {
  const durationsSum = takeIfExists('durationsSum', Number)
  const startsNumber = takeIfExists('startsNumber', Number)
  const averageDuration = durationsSum / startsNumber
  
  return {
    duration: durationsSum ? Math.round(averageDuration / 5) * 5 : DEFAULT_DURATION,
    startTime: undefined,
    timeNow: undefined,
    stopped: false
  }
}

export default () =>
  createReducer(
    {
      [a.changeDuration]: (state, duration) => ({ ...state, duration }),
      [a.tick]: state => ({ ...state, timeNow: Date.now() }),
      [a.finish]: state => ({
        ...getDefaultState(),
        duration: state.duration
      }),
      [a.stop]: state => ({ ...state, stopped: true }),
      [a.start]: state => {
        const startsNumber = takeIfExists('startsNumber', Number)
        if (startsNumber) {
          const durationsSum = takeIfExists('durationsSum', Number)
          const newStartsNumber = startsNumber + 1
          localStorage.setItem('startsNumber', newStartsNumber)
          localStorage.setItem('durationsSum', durationsSum + state.duration)
        }
        else {
          localStorage.setItem('startsNumber', 1)
          localStorage.setItem('durationsSum', state.duration)
        }

        return {
          ...state,
          startTime: Date.now(),
          timeNow: Date.now()
        }
      }
    },
    getDefaultState()
  )