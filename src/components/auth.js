import React from 'react'
import styled from 'styled-components'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'

import * as actions from '../actions/auth'
import { connectTo } from '../utils/generic'
import Button from './button-with-icon'
import { yAnimation } from './styles'
import { PROVIDER, FACEBOOK_SCOPE } from '../constants/auth';
import { reportError } from '../sagas/generic';

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
          <Button onClick={this.signInWithGoogle} icon={faGoogle} text='Sign In with Google'/>
        </Top>
        <Bottom>
          <Button onClick={this.signInWithFacebook} icon={faFacebookF} text='Sign In with Facebook'/>
        </Bottom>
      </>
    )
  }

  componentDidCatch(error, errorInfo) {
    reportError({ error: `Fail in Auth component: ${error}`, errorInfo })
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
}

export default connectTo(
  () => ({ }),
  actions,
  Auth
)