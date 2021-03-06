import React from 'react'
import styled from 'styled-components'
import { push } from 'connected-react-router'

import Button from './button-with-icon'
import { connectTo, takeFromState } from '../utils/generic'
import { PATH } from '../constants/routing';

const ButtonWrap = styled.div`
  margin: 10px 0;
`

export default connectTo(
  state => ({
    ...takeFromState(state, 'auth', ['token']),
    ...takeFromState(state, 'timeline',  ['sets'])
  }),
  { push },
  ({ sets, token, push }) => {
    if (!window.navigator.onLine || (!sets.length && !token)) return null

    return (
      <ButtonWrap>
        <Button centeredText onClick={() => push(PATH.FEATURES)} icon='user-friends' text={'Community'}/>
      </ButtonWrap>
    )
  }
)