import React from 'react'
import styled from 'styled-components'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'

import * as actions from '../actions/auth'
import { connectTo } from '../utils/generic'
import Button from './button-with-icon'
import { centerContentStyle } from 'increaser-components';

const Container = styled.div`
  width: 100%;
  ${centerContentStyle};
  flex-direction: column;
  margin-top: 10px;
`

const Sync = ({ authorizeWithGoogle, authorizeWithFacebook }) => {
  return (
    <Container>
      <Button onClick={authorizeWithGoogle} icon={faGoogle} text='Sign In with Google'/>
      <Button onClick={authorizeWithFacebook} icon={faFacebookF} text='Sign In with Facebook'/>
    </Container>
  )
}

export default connectTo(
  () => ({ }),
  actions,
  Sync
)