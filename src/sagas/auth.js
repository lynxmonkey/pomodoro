import * as Sentry from '@sentry/browser'
import { call } from 'redux-saga/effects'

import { FACEBOOK_SCOPE } from '../constants/auth'

export function* authorize(provider, authData) {
  yield console.log(provider, authData)
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
  const provider = 'google'
  try {
    const ga = window.gapi.auth2.getAuthInstance()
    const googleUser = yield call(() => new Promise((resolve, reject) => ga.signIn().then(resolve, reject)))
    const { id_token, expires_at } = googleUser.getAuthResponse()
    const profile = googleUser.getBasicProfile()
    let user = {
      email: profile.getEmail(),
      name: profile.getName()
    }
    yield * authorize(provider, { token: id_token, expires_at }, user)
  } catch(err) {
    reportError(provider, err)
  }
}

export function* authorizeWithFacebook() {
  const provider = 'facebook'
  try {
    const fb = window.FB
    const response = yield call(() => new Promise(resolve => fb.login(resolve, { scope: FACEBOOK_SCOPE })))
    if (response && response.authResponse) {
      const { accessToken, expiresIn } = response.authResponse
      const date = new Date()
      const expires_at = expiresIn * 1000 + date.getTime()
      if (!accessToken) return
  
      const fb = window.FB
      const { name, email } = yield call(() => new Promise(resolve => fb.api('/me', { fields: 'name,email' }, resolve)))
      const user = { name, email }
      yield * authorize(provider, { token: accessToken, expires_at }, user)
    }
  } catch(err) {
    reportError(provider, err)
  }
}