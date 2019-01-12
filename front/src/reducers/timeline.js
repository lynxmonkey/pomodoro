import { createReducer } from 'redux-act'

import * as a from '../actions/timeline'
import { takeIfExists } from '../utils/localStorage';
import { getTodaySets } from '../utils/time';

const getDefaultState = () => {
  const sets = takeIfExists('sets', Array)
  if(!sets) return {
    sets: []
  }
  return {
    sets: getTodaySets(sets)
  }
}

export default () => createReducer({
  [a.updateSets]: (state, sets) => ({ ...state, sets })
}, getDefaultState())