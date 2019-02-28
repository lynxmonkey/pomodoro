import * as Sentry from '@sentry/browser'
import { select, put } from 'redux-saga/effects'
import { unauthorizeUser } from '../actions/auth';

export function fail({ payload: { error, errorInfo }}) {
  if (process.env.NODE_ENV === 'production') {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
      Sentry.captureException(error)
    })
  }
}

export function * startApp() {
  const state = yield select()
  if (state.auth.token) {
    if (state.auth.tokenExpirationTime < Date.now() / 1000) {
      yield put(unauthorizeUser())
    } else {
      if (process.env.NODE_ENV === 'production') {
        Sentry.configureScope(scope => {
          scope.setUser({
            id: state.auth.id
          })
        })
      }
    }
  }
}