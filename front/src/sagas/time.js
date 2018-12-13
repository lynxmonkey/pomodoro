import { select, put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { stopTicking, tick } from '../actions/time'
import { TICK_FREQUENCY } from '../constants/timer'


export function* mount() {
  const { time: { ticking } } = yield select()
  if (ticking) return

  while(true) {
    const { time: { mounted } } = yield select()
    if (!mounted) return yield put(stopTicking())

    yield put(tick())
    yield call(delay, TICK_FREQUENCY)
  }
}