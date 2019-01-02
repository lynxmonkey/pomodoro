import * as Sentry from '@sentry/browser'
import { select, put, call } from 'redux-saga/effects'

import { tick, finish as finishTimer } from '../actions/timer'
import { promptToAddToHomeScreen } from '../actions/generic'
import { TICK_FREQUENCY, NOTIFICATION_TEXT } from '../constants/timer'
import { delay } from 'redux-saga'
import { to } from '../actions/navigation'
import { getTodaySets } from '../utils/time';
import { updateSets } from '../actions/timeline';

export function* start() {
  yield put(to('timer'))
  const { timer: { startTime, duration } } = yield select()
  while(true) {
    const { timer: { stopped } } = yield select()
    if (stopped) return yield put(finishTimer({ start: startTime, stopped }))

    const now = Date.now()
    const seconds = Math.floor((now - startTime) / 1000)
    if (seconds > duration * 60) {
      return yield put(finishTimer({ start: startTime, stopped: false }))
    }

    yield put(tick())
    yield call(delay, TICK_FREQUENCY)
  }
}

export function* finish({ payload : { start, stopped } }) {
  const set = {
    start,
    end: Date.now()
  }
  const { timeline: { sets } } = yield select()
  const newSets = getTodaySets([ ...sets, set ])
  yield put(updateSets(newSets))

  const documentHidden = document.hidden === undefined || document.hidden || document.webkitHidden
  const notificationAllowed = window.Notification && window.Notification.permission === 'granted'
  if (!stopped && documentHidden && notificationAllowed) {
    try {
      const notification = new window.Notification(NOTIFICATION_TEXT)
      notification.onclick = function() {
        window.focus()
        notification.close()
      }
    } catch (_) {
      navigator.serviceWorker.getRegistration().then(registration => {
        registration.showNotification(NOTIFICATION_TEXT, {
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          requireInteraction: true
        })
      })
    }
  }
  yield put(to('timePicker'))
  const { generic: { proposalEvent } } = yield select()
  if (!proposalEvent) return
  
  try {
    proposalEvent.prompt()
    yield put(promptToAddToHomeScreen())
  } catch(err) {
    Sentry.captureException(err)
  }
}
