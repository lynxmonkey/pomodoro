import { put, select } from 'redux-saga/effects'
import { push } from "connected-react-router"

import { saveLocation } from '../actions/previous-router'
import { stop } from '../actions/timer'
import { PATH } from '../constants/routing';

export function* locationChange({ payload }) {
  const { location, isFirstRendering, action } = payload
  const { pathname } = location
  if (pathname === PATH.TIMER && isFirstRendering) {
    yield put(push(PATH.TIME_PICKER))
  }
  const state = yield select()
  const previousPathname = state.previousRouter.location.pathname
  if (action === 'POP' && previousPathname === PATH.TIMER && pathname === PATH.TIME_PICKER) {
    yield put(stop())
  }

  if (action === 'POP' && previousPathname === PATH.TIME_PICKER && pathname === PATH.TIMER) {
    yield put(push(PATH.TIME_PICKER))
  }

  yield put(saveLocation(location))
}