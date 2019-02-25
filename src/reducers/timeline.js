import { createReducer } from 'redux-act'

import * as a from '../actions/timeline'
import { takeIfExists } from '../utils/localStorage';
import { getTodaySets } from '../utils/time';

const getDefaultState = () => {
  const setsSum = takeIfExists('setsSum', Number) || 0
  const sets = takeIfExists('sets', Array) || []
  return {
    sets: getTodaySets(sets),
    setsSum
  }
}

export default () => createReducer({
  [a.receiveSet]: (state, set) => {
    return {
      setsSum: state.setsSum + set.end - set.start,
      sets: getTodaySets([ ...state.sets, set ])
    }
  }
}, getDefaultState())