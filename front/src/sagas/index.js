import { takeLatest } from 'redux-saga/effects'

import * as timerActions from '../actions/timer'
import * as timerSagas from './timer'

import * as timeActions from '../actions/time'
import * as timeSagas from './time'

import * as genericActions from '../actions/generic'
import * as genericSagas from './generic'

import * as authActions from '../actions/auth'
import * as authSagas from './auth'

export default function* saga() {
  const relations = [
    [timerActions, timerSagas],
    [timeActions, timeSagas],
    [genericActions, genericSagas],
    [authActions, authSagas]
  ]

  for (const [actions, sagas] of relations) {
    for (const [actionName, action] of Object.entries(actions)) {
      const saga = sagas[actionName]
      if (saga) yield takeLatest(action.getType(), saga)
    }
  }
}