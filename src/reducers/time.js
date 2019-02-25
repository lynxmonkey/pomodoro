import { createReducer } from 'redux-act'

import * as a from '../actions/time'
import { finish } from '../actions/timer'
import { takeIfExists } from '../utils/localStorage';

const getDefaultState = () => ({
  lastSetEnd: takeIfExists('lastSetEnd'),
  mounted: false,
  ticking: false,
  timeNow: Date.now()
})

export default () =>
  createReducer(
    {
      [a.tick]: state => ({ ...state, timeNow: Date.now() }),
      [finish]: state => {
        const lastSetEnd = Date.now()
        
        return { ...state, lastSetEnd }
      },
      [a.mount]: state => ({ ...state, mounted: true }),
      [a.startTicking]: state => ({ ...state, ticking: true }),
      [a.unmount]: state => ({ ...state, mounted: false, ticking: false }),
    },
    getDefaultState()
  )
