import { combineReducers, createStore } from 'redux'

import generic from './generic'
import timer from './timer'
import time from './time'
import timeline from './timeline'
import navigation from './navigation'
import settings from './settings'
import { fail } from '../actions/generic'

const getNewReducer = _ =>
  combineReducers(
    Object.entries({
      generic,
      timer,
      navigation,
      time,
      timeline,
      settings
    }).reduce(
      (acc, [key, createReducer]) => ({ ...acc, [key]: createReducer() }),
      {}
    )
  )

const reducer = getNewReducer()

export default (state, action) => {
  if (action.type === fail.getType()) {
    localStorage.clear()
    return reducer(createStore(getNewReducer()).getState())
  }

  return reducer(state, action)
}