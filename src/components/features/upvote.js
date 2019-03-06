import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { centerContentStyle } from 'increaser-components'

import { connectTo, takeFromState } from '../../utils/generic'
import * as actions from '../../actions/features'

const Container = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 5px;
  color: ${p => p.upvoted ? p.theme.color.primary : p.theme.color.mainFont};
  border: 1px solid ${p => p.upvoted ? p.theme.color.primary : p.theme.color.mainFont};
  ${centerContentStyle};
  flex-direction: column;
  cursor: ${p => p.disabled ? 'auto': 'pointer'};
`

const IconWrap = styled.div`
  height: 12px;
`

const Component = ({
  token,
  upvoteFeature,
  reupvoteFeature,

  id,
  upvoted,
  number
}) => {
  const disabled = !token
  const clickHandler = () => {
    if (!disabled) {
      const func = upvoted ? reupvoteFeature : upvoteFeature
      func(id)
    }
  }
  return (
    <Container
      upvoted={upvoted}
      disabled={disabled}
      onClick={clickHandler}>
      <IconWrap>
        <FontAwesomeIcon size='lg' icon='sort-up' />
      </IconWrap>
      <p>{number}</p>
    </Container>
  )
}

export default connectTo(
  state => takeFromState(state, 'auth', ['token']),
  actions,
  Component
)