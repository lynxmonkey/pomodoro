import { combineReducers } from 'redux'

import timer from './timer'
import navigation from './navigation'

const getNewReducer = _ =>
  combineReducers(
    Object.entries({
      timer,
      navigation
    }).reduce(
      (acc, [key, createReducer]) => ({ ...acc, [key]: createReducer() }),
      {}
    )
  )

const reducer = getNewReducer()

export default reducer