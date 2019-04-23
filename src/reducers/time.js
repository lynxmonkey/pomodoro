import { createReducer } from 'redux-act'

import * as a from '../actions/time'
import { finish } from '../actions/timer'
import { takeIfExists } from '../utils/localStorage';

const getDefaultState = () => ({
  lastSetEnd: takeIfExists('lastSetEnd'),
})

export default () =>
  createReducer(
    {
      [finish]: state => {
        const lastSetEnd = Date.now()
        
        return { ...state, lastSetEnd }
      },
      [a.receiveLastSetEnd]: (state, lastSetEnd) => ({ ...state, lastSetEnd })
    },
    getDefaultState()
  )
