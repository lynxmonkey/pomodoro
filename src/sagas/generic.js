import * as Sentry from '@sentry/browser'
import { select, put, call } from 'redux-saga/effects'

import { unauthorizeUser } from '../actions/auth'
import { receiveSets } from '../actions/timeline'
import { post } from '../utils/api'
import { API } from '../constants/api'
import { setUserForReporting } from '../utils/generic'


export function fail({ payload: { error, errorInfo }}) {
  reportError(error, errorInfo)
}

export function * startApp() {
  const state = yield select()
  if (state.auth.token) {
    if (state.auth.tokenExpirationTime < Date.now() / 1000) {
      yield put(unauthorizeUser())
    } else {
      setUserForReporting(state.auth.id)
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
        reportError('fail to synchronize', { errors })
      }
    } else {
      yield put(receiveSets(synchronize))
    }
  }
}

export const reportError = (message, info) => {
  if (process.env.NODE_ENV !== 'production') {
    if (info) {
      Sentry.withScope(scope => {
        try {
          Object.keys(info).forEach(key => {
            scope.setExtra(key, info[key])
          })
        } catch(err) {
          scope.setExtra('info', info)
        }
        Sentry.captureException(message)
      })
    }
  } else {
    console.error(message, info)
  }
}