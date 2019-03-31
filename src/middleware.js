import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'

import { unauthorizeUser } from './actions/auth'
import { takeIfExists } from './utils/localStorage'
import { setUserForReporting } from './utils/generic'
import history from './history';

export const sagaMiddleware = createSagaMiddleware()

const middleware = store => next => action => {
  if (action.type === unauthorizeUser.getType()) {
    localStorage.clear()
  }
  const prevState = store.getState()
  const result = next(action)
  const nextState = store.getState()

  if (prevState.settings.sound !== nextState.settings.sound) {
    const oldSettings = takeIfExists('settings', Object) || {}
    const newSettings = JSON.stringify({ ...oldSettings, sound: nextState.settings.sound })
    localStorage.setItem('settings', newSettings)
  }
  if (prevState.auth.token !== nextState.auth.token) {
    if (!nextState.auth.token) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpirationTime')
      localStorage.removeItem('id')
    } else {
      localStorage.setItem('token', nextState.auth.token)
      localStorage.setItem('tokenExpirationTime', nextState.auth.tokenExpirationTime)
      localStorage.setItem('id', nextState.auth.id)
    }
    setUserForReporting(nextState.auth.id)
  }
  if (prevState.time.lastSetEnd !== nextState.time.lastSetEnd) {
    if (!nextState.time.lastSetEnd){
      localStorage.removeItem('lastSetEnd')
    } else {
      localStorage.setItem('lastSetEnd', nextState.time.lastSetEnd)
    }
  }
  if (prevState.timeline.sets !== nextState.timeline.sets) {
    localStorage.setItem('sets', JSON.stringify(nextState.timeline.sets))
  }
  if (prevState.timeline.setsSum !== nextState.timeline.setsSum) {
    localStorage.setItem('setsSum', nextState.timeline.setsSum)
  }
  if (prevState.timer.startTime !== nextState.timer.startTime) {
    const startsNumber = takeIfExists('startsNumber', Number)
    if (startsNumber) {
      const durationsSum = takeIfExists('durationsSum', Number)
      const newStartsNumber = startsNumber + 1
      localStorage.setItem('startsNumber', newStartsNumber)
      localStorage.setItem('durationsSum', durationsSum + nextState.timer.duration)
    }
    else {
      localStorage.setItem('startsNumber', 1)
      localStorage.setItem('durationsSum', nextState.timer.duration)
    }
  }
  return result
}

export default [
  routerMiddleware(history),
  sagaMiddleware,
  middleware
]
