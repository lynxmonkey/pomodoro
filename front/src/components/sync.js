import React from 'react'
import styled, { keyframes } from 'styled-components'
import { RoundButton } from 'increaser-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'

import * as actions from '../actions/auth'
import { connectTo, takeFromState, loadScript } from '../utils/generic'
import { GOOGLE_SCRIPT, GOOGLE_CLIENT_ID, FACEBOOK_SCRIPT, FACEBOOK_APP_ID, FACEBOOK_VERSION } from '../constants/auth';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  height: 60px;
  color: ${p => p.theme.color.mainFont};
  margin-top: 10px;
`

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const BetweenButtons = styled.div`
  width: 10px;
`

const SyncIcon = styled.div`
  animation: ${spin} 3s linear infinite;
  padding: 10px;
`

const Side = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

class Sync extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      google: false,
      facebook: false
    }
  }
  render() {
    const { token } = this.props
    if (token || !navigator.onLine) return null
    const { google, facebook } = this.state
    if (!google || !facebook) return null

    return (
      <Container>
        <Side>
          <SyncIcon>
            <FontAwesomeIcon size={'lg'} icon={'sync-alt'} />
          </SyncIcon>
          <p>
            Synchronize statistics
          </p>
        </Side>
        <Side>
          <RoundButton  size='s' type='default'>
            <FontAwesomeIcon size={'lg'} icon={faGoogle} />
          </RoundButton>
          <BetweenButtons/>
          <RoundButton  size='s' type='default'>
            <FontAwesomeIcon size={'lg'} icon={faFacebookF} />
          </RoundButton>
        </Side>
      </Container>
    )
  }

  componentDidMount() {
    if (!navigator.onLine) return
    if (!window.FB) {
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: FACEBOOK_APP_ID,
          version : FACEBOOK_VERSION
        })
        this.setState({ facebook: true })
      }
      loadScript(FACEBOOK_SCRIPT)
    }
    if (!(window.gapi && window.gapi.auth2 && window.gapi.auth2.getAuthInstance())) {
      loadScript(
        GOOGLE_SCRIPT,
        () => {
          const g = window.gapi
          g.load('auth2', () => {
              g.auth2.init({
                  client_id: GOOGLE_CLIENT_ID,
                  scope: 'profile email'
              })
          })
          this.setState({ google: true })
        }
      )
    }
  }
}

export default connectTo(
  state => takeFromState(state, 'auth', ['token']),
  actions,
  Sync
)