import { takeLatest } from 'redux-saga/effects'

import * as timerActions from '../actions/timer'
import * as timerSagas from './timer'

export default function* saga() {
  const relations = [
    [timerActions, timerSagas]
  ]

  for (const [actions, sagas] of relations) {
    for (const [actionName, action] of Object.entries(actions)) {
      const saga = sagas[actionName]
      if (saga) yield takeLatest(action.getType(), saga)
    }
  }
}