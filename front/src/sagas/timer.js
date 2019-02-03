import { select, put, call } from 'redux-saga/effects'
import * as Sentry from '@sentry/browser'

import { tick, finish as finishTimer } from '../actions/timer'
import { TICK_FREQUENCY, NOTIFICATION_TEXT } from '../constants/timer'
import { delay } from 'redux-saga'
import { to } from '../actions/navigation'
import { receiveSet } from '../actions/timeline'
import { SET_FINISHED } from '../constants/sounds'
import { getHours } from '../utils/time';
import { PROMOTE_AFTER_HOURS } from '../constants/promotion';
import { togglePromote } from '../actions/generic';

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
  const { timeline: { setsSum }, settings: { sound } } = yield select()
  yield put(receiveSet(set))
  const newSetsSum = (yield select()).timeline.setsSum
  const hoursBefore = getHours(setsSum)
  const hoursAfter = getHours(newSetsSum)
  const promote = PROMOTE_AFTER_HOURS.includes(hoursBefore) && !PROMOTE_AFTER_HOURS.includes(hoursAfter)
  if (promote) {
    yield put(togglePromote())
  }
  const documentHidden = document.hidden === undefined || document.hidden || document.webkitHidden
  if (!stopped && documentHidden) {
    if (window.Windows) {
      try {
        const imageUrl = window.location.protocol + '//' + window.location.host + '/images/1024x1024.png'
        const toastXml = new window.Windows.Data.Xml.Dom.XmlDocument()
        const toastNotificationXmlTemplate =
        `<toast>
            <visual>
                <binding template="ToastGeneric">
                    <text hint-maxLines="1"></text>
                    <text></text>
                    <image placement="" src=""/>
                </binding>
            </visual>
        </toast>`
        toastXml.loadXml(toastNotificationXmlTemplate)
  
        const images = toastXml.getElementsByTagName('image')
        images[0].setAttribute('src', imageUrl)
        const textNodes = toastXml.getElementsByTagName('text');
        textNodes[0].innerText = 'Pomodoro by Increaser'
        textNodes[1].innerText = NOTIFICATION_TEXT
        const toast = new window.Windows.UI.Notifications.ToastNotification(toastXml)
        window.Windows.UI.Notifications.ToastNotificationManager.createToastNotifier().show(toast)
      } catch(error) {
        Sentry.captureException(error)
      }
    } else if ( window.Notification && window.Notification.permission === 'granted') {
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
  }
  if (!stopped && sound) {
    const sound = new Audio(SET_FINISHED)
    try {
      yield sound.play()
    } catch (err) {
      console.log('fail to play sound')
    }
  }
  yield put(to('timePicker'))
}
