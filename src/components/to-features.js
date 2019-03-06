import React from 'react'
import styled from 'styled-components'

import { to } from '../actions/navigation'
import Button from './button-with-icon'
import { connectTo } from '../utils/generic'

const ButtonWrap = styled.div`
  margin: 10px 0;
`

export default connectTo(
  () => ({}),
  { to },
  ({ to }) => {
    if (!window.navigator.onLine) return null

    return (
      <ButtonWrap>
        <Button onClick={() => to('features')} icon='clipboard-list' text={'What can we improve?'}/>
      </ButtonWrap>
    )
  }
)