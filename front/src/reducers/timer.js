import { createReducer } from 'redux-act'

import * as a from '../actions/timer'

const getDefaultState = () => ({
  duration: 25,
  startTime: undefined,
  timeNow: undefined,
  stopped: false
})

export default () =>
  createReducer(
    {
      [a.changeDuration]: (state, duration) => ({ ...state, duration }),
      [a.tick]: state => ({ ...state, timeNow: Date.now() }),
      [a.finish]: state => ({
        ...getDefaultState(),
        duration: state.duration,
        lastSetTotal: (state.timeNow - state.startTime) / 1000
      }),
      [a.stop]: state => ({ ...state, stopped: true }),
      [a.start]: state => ({
        ...state,
        startTime: Date.now(),
        timeNow: Date.now()
      })
    },
    getDefaultState()
  )
