import React from 'react'
import styled from 'styled-components'

import { openAuth } from '../actions/generic'
import { connectTo, takeFromState } from '../utils/generic'
import Button from './button-with-icon'
import Auth from './auth'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
`

const Sync = ({ openAuth, auth, token }) => {
  if (token || !window.navigator.onLine) return null
  if (auth)return <Auth/>
  
  return (
    <Container>
      <Button onClick={openAuth} icon='sync-alt' text='Synchronize Statistics'/>
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