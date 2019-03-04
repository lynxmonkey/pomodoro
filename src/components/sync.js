import React from 'react'
import styled from 'styled-components'

import { loadProviderScript } from '../actions/auth'
import { openAuth } from '../actions/generic'
import { connectTo, takeFromState, loadScript } from '../utils/generic'
import Button from './button-with-icon'
import Auth from './auth'
import { centerContentStyle } from 'increaser-components'
import { PROVIDER, FACEBOOK_SCRIPT, FACEBOOK_APP_ID, FACEBOOK_VERSION, GOOGLE_SCRIPT, GOOGLE_CLIENT_ID, GOOGLE_SCOPE } from '../constants/auth';

const Container = styled.div`
  height: 120px;
  width: 100%;
  ${centerContentStyle};
  flex-direction: column;
  margin-top: 10px;
  justify-content: space-around;
`

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
      <Container>
        <Content/>
      </Container>
    )
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
  state => ({
    ...takeFromState(state, 'auth', ['token', 'providerScriptLoaded']),
    ...takeFromState(state, 'generic', ['auth']),
  }),
  { openAuth, loadProviderScript },
  Sync
)