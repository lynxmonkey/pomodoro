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

const getSetsSum = sets => sets.reduce((acc, { start, end }) => acc + end - start, 0)

export default () => createReducer({
  [a.receiveSet]: (state, set) => {
    return {
      ...state,
      setsSum: state.setsSum + set.end - set.start,
      sets: getTodaySets([ ...state.sets, set ])
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