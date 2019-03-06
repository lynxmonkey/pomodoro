import React from 'react'
import styled from 'styled-components'

import { connectTo } from '../../utils/generic'
import * as actions from '../../actions/features'

import Upvote from './upvote'
import { STATUS } from '../../constants/features';

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  border-radius: 5px;
  color: ${p => p.theme.color.mainFont};
  background-color: ${p => p.theme.color.default};
  justify-content: space-between;
  padding: 10px;
`

const Name = styled.p`
  font-size: 18px;
`

const Feature = ({ name, upvotesNumber, status, id, upvoted }) => {
  return (
    <Container>
      <Name>{name}</Name>
      {status !== STATUS.WAITING_FOR_APPROVE && <Upvote id={id} upvoted={upvoted} number={upvotesNumber} />}
    </Container>
  )
}

export default connectTo(
  () => ({ }),
  actions,
  Feature
)