import React from 'react'
import styled from 'styled-components'
import { RoundButton } from 'increaser-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'

import * as actions from '../actions/auth'
import { connectTo, takeFromState } from '../utils/generic'


const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 60px;
  color: ${p => p.theme.color.mainFont};
  margin-top: 10px;
`

const ButtonWrap = styled.div`
  margin: 5px;
`

const Text = styled.p`
  font-size: 18px;
`

const Sync = ({ token, authorizeWithGoogle, authorizeWithFacebook }) => {
  if (token || !window.navigator.onLine) return null

  return (
    <Container>
      <Text>Sign in with</Text>
      <ButtonWrap>
        <RoundButton size='s' type='default' onClick={authorizeWithGoogle}>
          <FontAwesomeIcon size={'lg'} icon={faGoogle} />
        </RoundButton>
      </ButtonWrap>
      <Text> or </Text>
      <ButtonWrap>
        <RoundButton size='s' type='default' onClick={authorizeWithFacebook}>
          <FontAwesomeIcon size={'lg'} icon={faFacebookF} />
        </RoundButton>
      </ButtonWrap>
    </Container>
  )
}

export default connectTo(
  state => takeFromState(state, 'auth', ['token']),
  actions,
  Sync
)