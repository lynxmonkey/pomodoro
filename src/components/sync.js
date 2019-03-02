import React from 'react'
import styled from 'styled-components'

import { openAuth } from '../actions/generic'
import { connectTo, takeFromState } from '../utils/generic'
import Button from './button-with-icon'
import Auth from './auth'
import { centerContentStyle } from 'increaser-components'

const Container = styled.div`
  height: 120px;
  width: 100%;
  ${centerContentStyle};
  flex-direction: column;
  margin-top: 10px;
  justify-content: space-around;
`

const Sync = ({ openAuth, auth, token }) => {
  if (token || !window.navigator.onLine) return null
  return (
    <Container>
      {auth ? <Auth/> : <Button onClick={openAuth} icon='sync-alt' text='Synchronize Statistics'/>}
    </Container>
  )
}

export default connectTo(
  state => ({
    ...takeFromState(state, 'auth', ['token']),
    ...takeFromState(state, 'generic', ['auth']),
  }),
  { openAuth },
  Sync
)