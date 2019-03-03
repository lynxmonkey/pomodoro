import { call, put } from 'redux-saga/effects'

import { post } from '../utils/api'
import { API } from '../constants/api'
import { receiveAuthData } from '../actions/auth'
import { synchronize, reportError } from './generic'


export function* receiveProviderToken({ payload: { provider, token } }) {
  const query = `
    query {
      identify(provider: ${provider}, token: "${token}") {
        token,
        tokenExpirationTime,
        id
      }
    }
  `
  const { data: { identify } } = yield call(post, API, { query })
  yield put(receiveAuthData(identify))
  yield * synchronize()
}

export function failToReceiveProviderToken({ payload: { provider, error }}) {
  const message = `fail to login with ${provider}`
  reportError(message, { error })
}