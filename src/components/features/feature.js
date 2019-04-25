import React from 'react'
import styled, { css } from 'styled-components'

import { connectTo } from '../../utils/generic'
import * as actions from '../../actions/features'

import Upvote from './upvote'
import { STATUS } from '../../constants/features';

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  margin: 1px;
  ${p => p.first && css`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  `}
  ${p => p.last && css`
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  `}
  background-color: ${p => p.theme.color.default};
  justify-content: space-between;
  padding: 10px;
`


const Left = styled.div`
  display: flex;
  flex-direction: column;
`

const Name = styled.p`
  font-size: 18px;
  padding-bottom: 5px;
`

const Feature = ({ first, last, name, upvotesNumber, status, id, upvoted }) => {
  const upvoteParams = {
    id,
    upvoted,
    number: upvotesNumber,
    status
  }
  return (
    <Container first={first} last={last}>
      <Left>
        <Name>{name}</Name>
        {status === STATUS.WAITING_FOR_CONFIRMATION && <p>This feature will be available for upvote after confirmation.</p>}
      </Left>
      {status !== STATUS.WAITING_FOR_CONFIRMATION && <Upvote {...upvoteParams} />}
    </Container>
  )
}

export default connectTo(
  () => ({ }),
  actions,
  Feature
)