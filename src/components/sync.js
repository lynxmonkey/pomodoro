import React from 'react'

import { openAuth } from '../actions/generic'
import { connectTo, takeFromState } from '../utils/generic'
import Button from './button-with-icon'
import Auth from './auth'
import AuthContainer from './auth-container'
import LoadAuthScripts from './load-auth-scripts'

class Sync extends React.Component {
  render() {
    const { openAuth, auth, token, providerScriptLoaded} = this.props
    if (token || !window.navigator.onLine) return null

    const Content = () => {
      if (auth) {
        const allLoaded = Object.values(providerScriptLoaded).every(p => p)
        return allLoaded ? <Auth/> : null
      }
      return <Button onClick={openAuth} icon='sync-alt' text='Synchronize Statistics'/>
    }
    return (
      <AuthContainer>
        <LoadAuthScripts>
          <Content/>
        </LoadAuthScripts>
      </AuthContainer>
    )
  }
}

export default connectTo(
  state => ({
    ...takeFromState(state, 'auth', ['token', 'providerScriptLoaded']),
    ...takeFromState(state, 'generic', ['auth']),
  }),
  { openAuth },
  Sync
)