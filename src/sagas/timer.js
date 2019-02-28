import { select, put, call } from 'redux-saga/effects'
import ReactGA from 'react-ga'

import { tick, finish as finishTimer, doNotNotifyAfter } from '../actions/timer'
import { TICK_FREQUENCY, NOTIFICATION_TEXT } from '../constants/timer'
import { delay } from 'redux-saga'
import { to } from '../actions/navigation'
import { receiveSet } from '../actions/timeline'
import { SET_FINISHED } from '../constants/sounds'
import { getHours } from '../utils/time';
import { PROMOTE_AFTER_HOURS } from '../constants/promotion';
import { togglePromote } from '../actions/generic';
import { showNotification } from '../utils/notification';
import { synchronize } from './generic';

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

function* soundNotification () {
  const { settings: { sound } } = yield select()
  if (sound) {
    const audio = new Audio(SET_FINISHED)
    try {
      yield audio.play()
    } catch (err) {
      console.log('fail to play sound')
    }
  }
}

export function* finish({ payload : { start, stopped } }) {
  const end = Date.now()
  const set = { start, end }
  // ga: start
  if (process.env.NODE_ENV === 'production') {
    const minutes = Math.round((end - start) / 1000 / 60)
    if (minutes > 0) {
      ReactGA.event({
        category: 'Timer',
        action: 'Finished Set',
        value: minutes,
      })
    }
  }
  // ga: end
  const { timeline: { setsSum } } = yield select()
  yield put(receiveSet(set))
  yield * synchronize()
  const newSetsSum = (yield select()).timeline.setsSum
  const hoursBefore = getHours(setsSum)
  const hoursAfter = getHours(newSetsSum)
  const promote = PROMOTE_AFTER_HOURS.includes(hoursBefore) && !PROMOTE_AFTER_HOURS.includes(hoursAfter)
  if (promote) {
    yield put(togglePromote())
  }
  if (!stopped) {
    yield soundNotification()
    showNotification(NOTIFICATION_TEXT)
  }
  yield put(to('timePicker'))
}

export function* notifyAfter ({ payload }) {
  const stateBefore = yield select()
  const getLastSetEnd = (state) => {
    const { sets } = state.timeline
    return sets.length ? sets[sets.length - 1].end : undefined
  }
  const lastSetEndBefore = getLastSetEnd(stateBefore)
  yield call(delay, payload * 60 * 1000)
  yield put(doNotNotifyAfter())
  const state = yield select()
  const page = state.navigation.page
  const lastSetEnd = getLastSetEnd(state)
  if (page !== 'timer' && lastSetEnd === lastSetEndBefore) {
    yield soundNotification()
    showNotification('Time to come back to work!')
  }
}
