import React from 'react'

import { connectTo, takeFromState, loadScript } from '../utils/generic'
import { PROVIDER, GOOGLE_SCRIPT, GOOGLE_CLIENT_ID, GOOGLE_SCOPE, FACEBOOK_SCRIPT, FACEBOOK_APP_ID, FACEBOOK_VERSION } from '../constants/auth';
import { loadProviderScript } from '../actions/auth'

class Component extends React.Component {
  render() {
    return this.props.children || null
  }
  
  componentDidMount() {
    const { providerScriptLoaded, loadProviderScript } = this.props
    if (!providerScriptLoaded[PROVIDER.GOOGLE]) {
      loadScript(
        GOOGLE_SCRIPT,
        () => {
          const g = window.gapi
          g.load('auth2', () => {
            g.auth2.init({
              cookie_policy: 'none',
              client_id: GOOGLE_CLIENT_ID,
              scope: GOOGLE_SCOPE
            })
            loadProviderScript(PROVIDER.GOOGLE)
          })
        }
      )
    }
    if (!providerScriptLoaded[PROVIDER.FACEBOOK]) {
      loadScript(FACEBOOK_SCRIPT, () => {
        window.fbAsyncInit = () => {
          window.FB.init({
            appId: FACEBOOK_APP_ID,
            version : FACEBOOK_VERSION
          })
          loadProviderScript(PROVIDER.FACEBOOK)
        }
      })
    }
  }
}

export default connectTo(
  state => takeFromState(state, 'auth', ['providerScriptLoaded']),
  { loadProviderScript },
  Component
)