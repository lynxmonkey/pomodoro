import { select, put, call } from 'redux-saga/effects'
import ReactGA from 'react-ga'
import { push } from 'connected-react-router'

import { tick, finish as finishTimer, doNotNotifyAfter } from '../actions/timer'
import { TICK_FREQUENCY, NOTIFICATION_TEXT } from '../constants/timer'
import { delay } from 'redux-saga'
import { receiveSet } from '../actions/timeline'
import { SET_FINISHED } from '../constants/sounds'
import { showNotification } from '../utils/notification';
import { synchronize } from './generic';

export function* start() {
  yield put(push('/timer'))
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
      console.info('fail to play sound')
    }
  }
}

export function* finish({ payload : { start, stopped } }) {
  yield put(push('/'))
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
  yield put(receiveSet(set))
  yield * synchronize()
  if (!stopped) {
    yield soundNotification()
    showNotification(NOTIFICATION_TEXT)
  }
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
  const { pathname } = state.router.location
  const lastSetEnd = getLastSetEnd(state)
  if (pathname !== '/timer' && lastSetEnd === lastSetEndBefore) {
    yield soundNotification()
    showNotification('Time to come back to work!')
  }
}
