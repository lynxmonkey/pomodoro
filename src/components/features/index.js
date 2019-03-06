import React from 'react'
import styled from 'styled-components'

import { connectTo } from '../../utils/generic'
import * as actions from '../../actions/features'
import { to } from '../../actions/navigation'

import List from './list'
import Form from './form'
import AuthContainer from '../auth-container'
import Auth from '../auth'
import Exit from '../exit-button'

const Page = styled.div`
  padding: 4% 4% 20px 4%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-image: ${p => p.theme.color.pageBackground};
`

const Left = styled.div`
  width: 600px;
  min-width: 320px;
  /* background-color: teal; */
`

const Right = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  /* background-color: gold; */
`

const Features = ({ to }) => {
  return (
    <Page>
      <Exit onClick={() => to('timePicker')}/>
      <Left>
        <List/>
      </Left>
      <Right>
        <Form/>
        <AuthContainer>
          <Auth/>
        </AuthContainer>
      </Right>
    </Page>
  )
}

export default connectTo(
  () => ({}),
  {
    ...actions,
    to
  },
  Features
)