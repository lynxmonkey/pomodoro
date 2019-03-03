import React from 'react'
import styled from 'styled-components'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'

import * as actions from '../actions/auth'
import { connectTo, googleAuthAvailable, loadScript } from '../utils/generic'
import Button from './button-with-icon'
import { yAnimation } from './styles'
import { GOOGLE_SCRIPT, GOOGLE_CLIENT_ID, GOOGLE_SCOPE, FACEBOOK_SCRIPT, FACEBOOK_APP_ID, FACEBOOK_VERSION, PROVIDER, FACEBOOK_SCOPE } from '../constants/auth';

const MOVE = 30

const Top = styled.div`
  ${yAnimation(MOVE)}
`

const Bottom = styled.div`
  ${yAnimation(-MOVE)}
`

class Auth extends React.Component {
  render() {
    return (
      <>
        <Top>
          <Button onClick={this.clickSignInWithGoogle} icon={faGoogle} text='Sign In with Google'/>
        </Top>
        <Bottom>
          <Button onClick={this.clickSignInWithFacebook} icon={faFacebookF} text='Sign In with Facebook'/>
        </Bottom>
      </>
    )
  }

  signInWithGoogle = () => {
    const ga = window.gapi.auth2.getAuthInstance()
    ga.signIn().then(
      user => {
        const { id_token } = user.getAuthResponse()
        this.props.receiveProviderToken({ provider: PROVIDER.GOOGLE, token: id_token })
      },
      (error) => this.props.failToReceiveProviderToken({ provider: PROVIDER.GOOGLE, error })
    )
  }

  clickSignInWithGoogle = () => {
    if (!googleAuthAvailable()) {
      loadScript(
        GOOGLE_SCRIPT,
        () => {
          const g = window.gapi
          g.load('auth2', () => {
            g.auth2.init({
              client_id: GOOGLE_CLIENT_ID,
              scope: GOOGLE_SCOPE
            })
            this.signInWithGoogle()
          })
        }
      )
    } else {
      this.signInWithGoogle()
    }
  }

  signInWithFacebook = () => {
    const fb = window.FB
    fb.login(
      response => {
        if (response && response.authResponse && response.authResponse.accessToken) {
          const { accessToken } = response.authResponse
          this.props.receiveProviderToken({ provider: PROVIDER.FACEBOOK, token: accessToken })
        } else {
          this.props.failToReceiveProviderToken({ provider: PROVIDER.FACEBOOK, error: response })
        }
      },
      { scope: FACEBOOK_SCOPE }
    )
  }

  clickSignInWithFacebook = () => {
    if (!window.FB) {
      loadScript(FACEBOOK_SCRIPT, () => {
        window.fbAsyncInit = () => {
          window.FB.init({
            appId: FACEBOOK_APP_ID,
            version : FACEBOOK_VERSION
          })
          this.signInWithFacebook()
        }
      })
    }
  }
}

export default connectTo(
  () => ({ }),
  actions,
  Auth
)