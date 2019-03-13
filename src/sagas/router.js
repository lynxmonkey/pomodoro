import { put, select } from 'redux-saga/effects'
import { push } from "connected-react-router"

import { saveLocation } from '../actions/previous-router'
import { stop } from '../actions/timer'

export function* locationChange({ payload }) {
  const { location, isFirstRendering, action } = payload
  const { pathname } = location
  if (pathname === '/timer' && isFirstRendering) {
    yield put(push('/'))
  }
  const state = yield select()
  const previousPathname = state.previousRouter.location.pathname
  if (action === 'POP' && previousPathname === '/timer' && pathname === '/') {
    yield put(stop())
  }

  if (action === 'POP' && previousPathname === '/' && pathname === '/timer') {
    yield put(push('/'))
  }

  yield put(saveLocation(location))
}