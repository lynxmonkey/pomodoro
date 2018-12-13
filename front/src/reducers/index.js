import { combineReducers } from 'redux'

import generic from './generic'
import timer from './timer'
import time from './time'
import navigation from './navigation'

const getNewReducer = _ =>
  combineReducers(
    Object.entries({
      generic,
      timer,
      navigation,
      time
    }).reduce(
      (acc, [key, createReducer]) => ({ ...acc, [key]: createReducer() }),
      {}
    )
  )

const reducer = getNewReducer()

export default reducer