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
    stopped: false,
    willNotifyAfter: false,
    notifyAfterMinutes: undefined
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
      [a.notifyAfter]: (state, notifyAfterMinutes) => ({ ...state, notifyAfterMinutes, willNotifyAfter: true }),
      [a.doNotNotifyAfter]: state => ({ ...state, notifyAfter: false, notifyAfterMinutes: undefined }),
      [a.start]: state => {
        return {
          ...state,
          startTime: Date.now(),
          timeNow: Date.now()
        }
      }
    },
    getDefaultState()
  )