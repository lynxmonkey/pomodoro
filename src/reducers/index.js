import { combineReducers, createStore } from 'redux'

import auth from './auth'
import generic from './generic'
import timer from './timer'
import time from './time'
import timeline from './timeline'
import navigation from './navigation'
import settings from './settings'
import { unauthorizeUser } from '../actions/auth'

const getNewReducer = _ =>
  combineReducers(
    Object.entries({
      auth,
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
  if (action.type === unauthorizeUser.getType()) {
    return reducer(createStore(getNewReducer()).getState())
  }

  return reducer(state, action)
}