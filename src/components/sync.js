import React from 'react'
import styled, { keyframes } from 'styled-components'
import { RoundButton } from 'increaser-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'

import * as actions from '../actions/auth'
import { connectTo, takeFromState } from '../utils/generic'

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

const Sync = ({ token, authorizeWithGoogle, authorizeWithFacebook }) => {
  if (token || !window.navigator.onLine) return null

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
        <RoundButton  size='s' type='default' onClick={authorizeWithGoogle}>
          <FontAwesomeIcon size={'lg'} icon={faGoogle} />
        </RoundButton>
        <BetweenButtons/>
        <RoundButton  size='s' type='default' onClick={authorizeWithFacebook}>
          <FontAwesomeIcon size={'lg'} icon={faFacebookF} />
        </RoundButton>
      </Side>
    </Container>
  )
}

export default connectTo(
  state => takeFromState(state, 'auth', ['token']),
  actions,
  Sync
)