import React from 'react'
import styled from 'styled-components'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'

import * as actions from '../actions/auth'
import { connectTo, takeFromState } from '../utils/generic'
import Button from './button-with-icon'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
`

const Sync = ({ token, authorizeWithGoogle, authorizeWithFacebook }) => {
  if (token || !window.navigator.onLine) return null
  return (
    <Container>
      <Button onClick={authorizeWithGoogle} icon={faGoogle} text='Sign In with Google'/>
      <Button onClick={authorizeWithFacebook} icon={faFacebookF} text='Sign In with Facebook'/>
    </Container>
  )
}

export default connectTo(
  state => takeFromState(state, 'auth', ['token']),
  actions,
  Sync
)