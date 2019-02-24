import { Auth } from 'aws-amplify'
import { call } from 'redux-saga/effects'

import { FACEBOOK_SCOPE } from '../constants/auth'

export function* authorize(provider, federatedAuthData, user) {
  const credentials = yield call(() => Auth.federatedSignIn(
    provider,
    federatedAuthData,
    user
  ))
  console.log(credentials)
}

export function* authorizeWithGoogle() {
  try {
    const ga = window.gapi.auth2.getAuthInstance()
    const googleUser = yield call(() => new Promise((resolve, reject) => ga.signIn().then(resolve, reject)))
    const { id_token, expires_at } = googleUser.getAuthResponse()
    const profile = googleUser.getBasicProfile()
    let user = {
      email: profile.getEmail(),
      name: profile.getName()
    }
    yield * authorize('google', { token: id_token, expires_at }, user)
  } catch(err) {
    console.log('fail to login with google: ', err)
  }
}

export function* authorizeWithFacebook() {
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
      yield * authorize('facebook', { token: accessToken, expires_at }, user)
    }
  } catch(err) {
    console.log('fail to login with facebook: ', err)
  }
}