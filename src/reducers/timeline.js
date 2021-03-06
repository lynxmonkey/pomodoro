import { createReducer } from 'redux-act'

import * as a from '../actions/timeline'
import { takeIfExists } from '../utils/localStorage';
import { getWeekSets } from '../utils/time';
import { getSetsSum } from '../utils/statistics';

const getDefaultState = () => {
  const setsSum = takeIfExists('setsSum', Number) || 0
  const sets = takeIfExists('sets', Array) || []
  return {
    sets: getWeekSets(sets),
    setsSum
  }
}


export default () => createReducer({
  [a.receiveSet]: (state, set) => {
    return {
      ...state,
      setsSum: state.setsSum + set.end - set.start,
      sets: getWeekSets([ ...state.sets, set ])
    }
  },
  [a.receiveSets]: (state, sets) => {
    const sumBefore = getSetsSum(state.sets)
    const sumNow = getSetsSum(sets)
    const setsSum = state.setsSum + sumNow - sumBefore
    return {
      ...state,
      setsSum,
      sets
    }
  }
}, getDefaultState())