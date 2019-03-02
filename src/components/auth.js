import React from 'react'
import styled from 'styled-components'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'

import * as actions from '../actions/auth'
import { connectTo } from '../utils/generic'
import Button from './button-with-icon'
import { yAnimation } from './styles'

const MOVE = 30

const Top = styled.div`
  ${yAnimation(MOVE)}
`

const Bottom = styled.div`
  ${yAnimation(-MOVE)}
`

const Auth = ({ authorizeWithGoogle, authorizeWithFacebook }) => {
  return (
    <>
      <Top>
        <Button onClick={authorizeWithGoogle} icon={faGoogle} text='Sign In with Google'/>
      </Top>
      <Bottom>
        <Button onClick={authorizeWithFacebook} icon={faFacebookF} text='Sign In with Facebook'/>
      </Bottom>
    </>
  )
}

export default connectTo(
  () => ({ }),
  actions,
  Auth
)