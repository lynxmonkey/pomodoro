import { createReducer } from 'redux-act'

import * as a from '../actions/timer'
import { takeIfExists } from '../utils/localStorage';
import { DEFAULT_DURATION } from '../constants/timer';


const getDefaultState = () => {
  const averageDuration = takeIfExists('averageDuration', Number)
  return {
    duration: averageDuration ? Math.round(averageDuration / 5) * 5 : DEFAULT_DURATION,
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
          const averageDuration = takeIfExists('averageDuration', Number)
          const newStartsNumber = startsNumber + 1
          localStorage.setItem('startsNumber', newStartsNumber)
          localStorage.setItem('averageDuration', (averageDuration + state.duration) / newStartsNumber)
        }
        else {
          localStorage.setItem('startsNumber', 1)
          localStorage.setItem('averageDuration', state.duration)
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