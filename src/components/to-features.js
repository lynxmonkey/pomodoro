import React from 'react'
import styled from 'styled-components'

import { to } from '../actions/navigation'
import Button from './button-with-icon'
import { connectTo, takeFromState } from '../utils/generic'

const ButtonWrap = styled.div`
  margin: 10px 0;
`

export default connectTo(
  state => ({
    ...takeFromState(state, 'auth', ['token']),
    ...takeFromState(state, 'timeline',  ['sets'])
  }),
  { to },
  ({ to, sets, token, history }) => {
    if (!window.navigator.onLine || (!sets.length && !token)) return null

    return (
      <ButtonWrap>
        <Button onClick={() => history.push('/features')} icon='clipboard-list' text={'What can we improve?'}/>
      </ButtonWrap>
    )
  }
)