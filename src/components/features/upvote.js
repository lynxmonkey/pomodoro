import React from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { centerContentStyle } from 'increaser-components'

import { connectTo, takeFromState } from '../../utils/generic'
import { STATUS } from '../../constants/features'
import * as actions from '../../actions/features'
import { buttonHoverStyle } from '../styles';

const Container = styled.div`
  min-height: 60px;
  min-width: 60px;
  border-radius: 5px;
  color: ${p => p.upvoted ? p.theme.color.primary : p.theme.color.mainFont};
  border: 1px solid ${p => p.upvoted ? p.theme.color.primary : p.theme.color.mainFont};
  ${centerContentStyle};
  flex-direction: column;
  cursor: ${p => p.disabled ? 'auto': 'pointer'};
  ${p => (!p.upvoted && !p.disabled) && css`
    &:hover {
      ${buttonHoverStyle}; 
  }`}
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
  number,
  status
}) => {
  const disabled = status === STATUS.DONE || !token
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
      onClick={clickHandler}
    >
      {status !== STATUS.DONE &&
        <IconWrap>
          <FontAwesomeIcon size='lg' icon='sort-up' />
        </IconWrap>
      }
      <p>{number}</p>
    </Container>
  )
}

export default connectTo(
  state => takeFromState(state, 'auth', ['token']),
  actions,
  Component
)