import { select, put, call } from 'redux-saga/effects'

import { tick, finish as finishTimer } from '../actions/timer'
import { TICK_FREQUENCY, NOTIFICATION_TEXT } from '../constants/timer'
import { delay } from 'redux-saga'
import { to } from '../actions/navigation'

export function* start() {
  yield put(to('timer'))
  const { timer: { startTime, duration } } = yield select()
  while(true) {
    const { timer: { stopped } } = yield select()
    if (stopped) return yield put(finishTimer({ stopped }))

    const seconds = Math.floor((Date.now() - startTime) / 1000)
    if (seconds > duration * 60)
      return yield put(finishTimer({ stopped: false }))

    yield put(tick())
    yield call(delay, TICK_FREQUENCY)
  }
}

export function* finish({ payload : { stopped } }) {
  if (
    !stopped &&
    (document.hidden === undefined ||
      document.hidden ||
      document.webkitHidden) &&
    Notification.permission === 'granted'
  ) {
    try {
      const notification = new Notification(NOTIFICATION_TEXT)
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
}
