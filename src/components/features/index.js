import React from 'react'
import styled from 'styled-components'
import { push } from 'connected-react-router'

import { connectTo, takeFromState } from '../../utils/generic'
import * as actions from '../../actions/features'

import List from './list'
import Form from './form'
import Auth from './auth'
import Exit from '../exit-button'

const Page = styled.div`
  padding: 4% 4% 20px 4%;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-image: ${p => p.theme.color.pageBackground};
`

const Left = styled.div`
  width: 600px;
  min-width: 320px;
`

const Right = styled.div`
  margin-top: 32px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const SMALL = 780
const MIDDLE = 1220
const EXIT_OWERLAP = 1220

const Separation = styled.div`
  width: 20px;
`

const Aligned = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
`

const Features = ({ pageWidth, push }) => {
  const Content = () => {
    if (pageWidth < SMALL) {
      return (
        <>
          <Aligned>
            <Auth/>
            <Form/>
          </Aligned>
          <List/>
        </>
      )
    }
    if (pageWidth < MIDDLE) {
      return (
        <>
          <Row>
            <Auth/>
            <Separation/>
            <Form/>
          </Row>
          <List/>
        </>
      )
    }
    return (
      <>
        <Left>
          <List/>
        </Left>
        <Right>
          <Form/>
          <Auth/>
        </Right>
      </>
    )
  }
  const style = {
    flexDirection: pageWidth < MIDDLE ? 'column' : 'row',
    paddingRight: pageWidth < EXIT_OWERLAP ? 'calc(8% + 50px)' : '4%'
  }
  return (
    <Page style={style}>
      <Exit onClick={() => push('/')}/>
      <Content/>
    </Page>
  )
}

export default connectTo(
  state => takeFromState(state, 'generic', ['pageWidth']),
  {
    ...actions,
    push
  },
  Features
)