import { combineReducers, createStore } from 'redux'
import { connectRouter } from 'connected-react-router';

import auth from './auth'
import generic from './generic'
import timer from './timer'
import time from './time'
import timeline from './timeline'
import settings from './settings'
import features from './features'
import previousRouter from './previous-router'

import history from '../history'
import { unauthorizeUser } from '../actions/auth'

const getNewReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    ...Object.entries({
      previousRouter,
      auth,
      generic,
      timer,
      time,
      timeline,
      settings,
      features
    }).reduce(
      (acc, [key, createReducer]) => ({ ...acc, [key]: createReducer() }),
      {}
    )
  })


const reducer = getNewReducer(history)

export default (state, action) => {
  if (action.type === unauthorizeUser.getType()) {
    return reducer(createStore(getNewReducer(history)).getState())
  }

  return reducer(state, action)
}