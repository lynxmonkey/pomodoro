import * as Sentry from '@sentry/browser'
import { call, put } from 'redux-saga/effects'

import {
  FACEBOOK_SCOPE,
  FACEBOOK_APP_ID,
  FACEBOOK_VERSION,
  FACEBOOK_SCRIPT,
  GOOGLE_SCRIPT,
  GOOGLE_CLIENT_ID,
  GOOGLE_SCOPE,
  PROVIDER
} from '../constants/auth'
import { loadScript, googleAuthAvailable } from '../utils/generic'
import { post } from '../utils/api'
import { API } from '../constants/api'
import { receiveAuthData } from '../actions/auth'


export function* authorize(provider, token) {
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
}

const reportError = (provider, error) => {
  const message = `fail to login with ${provider}`
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(message)
    Sentry.configureScope(scope => {
      scope.setExtra('error', error)
    })
  } else { 
    console.log(message, error)
  }
}

export function* authorizeWithGoogle() {
  const provider = PROVIDER.GOOGLE
  try {
    if (!googleAuthAvailable()) {
      yield call(() => new Promise(resolve => loadScript(
        GOOGLE_SCRIPT,
        () => {
          const g = window.gapi
          g.load('auth2', () => {
            g.auth2.init({
              client_id: GOOGLE_CLIENT_ID,
              scope: GOOGLE_SCOPE
            })
            resolve()
          })
        }
      )))
    }
    const ga = window.gapi.auth2.getAuthInstance()
    const googleUser = yield call(() => new Promise((resolve, reject) => ga.signIn().then(resolve, reject)))
    const { id_token } = googleUser.getAuthResponse()

    yield * authorize(provider, id_token)
  } catch(err) {
    reportError(provider, err)
  }
}

export function* authorizeWithFacebook() {
  const provider = PROVIDER.FACEBOOK
  try {
    if (!window.FB) {
      yield call(() => new Promise(resolve => loadScript(FACEBOOK_SCRIPT, resolve)))
      yield call(() => new Promise(resolve => {
        window.fbAsyncInit = () => {
          window.FB.init({
            appId: FACEBOOK_APP_ID,
            version : FACEBOOK_VERSION
          })
          resolve()
        }
      }))
    }

    const fb = window.FB
    const response = yield call(() => new Promise(resolve => fb.login(resolve, { scope: FACEBOOK_SCOPE })))
    if (response && response.authResponse) {
      const { accessToken } = response.authResponse
      if (!accessToken) return
  
      yield * authorize(provider, accessToken)
    }
  } catch(err) {
    reportError(provider, err)
  }
}