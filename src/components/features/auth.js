import React from 'react'
import styled from 'styled-components'

import { connectTo, takeFromState } from '../../utils/generic'

import AuthContainer from '../auth-container'
import Auth from '../auth'

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  background: ${p => p.theme.color.default};
  border-radius: 5px;
  padding: 20px;
`

const Text = styled.p`
  font-size: 18px;
  text-align: center;
  color: ${p => p.theme.color.mainFont};
`

const Component = ({ token }) => {
  if (token) return null

  return (
    <Container>
      <Text>Sign in to upvote or propose a new feature.</Text>
      <AuthContainer>
        <Auth/>
      </AuthContainer>
    </Container>
  )
}

export default connectTo(
  state => takeFromState(state, 'auth', ['token']),
  {},
  Component
)