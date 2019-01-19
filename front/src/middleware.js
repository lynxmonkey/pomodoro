import createSagaMiddleware from 'redux-saga'

import { fail } from './actions/generic'
import { takeIfExists } from './utils/localStorage';


export const sagaMiddleware = createSagaMiddleware()

const localStorageMiddleware = store => next => action => {
  if (fail.getType() === action.type) {
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
  if (prevState.time.lastSetEnd !== nextState.time.lastSetEnd) {
    localStorage.setItem('lastSetEnd', nextState.time.lastSetEnd)
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

export default [sagaMiddleware, localStorageMiddleware]
