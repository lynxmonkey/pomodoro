import * as Sentry from '@sentry/browser'
import { select, put, call } from 'redux-saga/effects'

import { unauthorizeUser } from '../actions/auth'
import { receiveSets } from '../actions/timeline'
import { post } from '../utils/api'
import { API } from '../constants/api'

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
      yield * synchronize()
    }
  }
}

export function* synchronize() {
  const state = yield select()
  if (state.auth.token && window.navigator.onLine) {
    const { sets } = state.timeline
    const query = `
      query Synchronize($input: SynchronizeInput!) {
        synchronize(synchronizeInput: $input) {
          start,
          end
        }
      }
    `

    const payload = {
      query,
      variables: {
        input: {
          sets
        }
      }
    }
    const { data: { synchronize }, errors } = yield call(post, API, payload)
    if (errors) {
      if (errors.find(e => e.message === 'Invalid Token')) {
        yield put(unauthorizeUser())
      } else {
        if (process.env.NODE_ENV === 'production') {
          Sentry.captureException('fail to synchronize: ')
          Sentry.configureScope(scope => {
            scope.setExtra('errors', errors)
          })
        }
      }
    } else {
      yield put(receiveSets(synchronize))
    }
  }
}