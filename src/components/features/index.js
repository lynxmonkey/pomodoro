import React from 'react'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'

import { connectTo, takeFromState } from '../../utils/generic'
import * as actions from '../../actions/features'

import List from './list'
import Form from './form'
import Auth from './auth'
import PageWithExit from '../page-with-exit'
import Scoreboard from './scoreboard'

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

const Separation = styled.div`
  width: 20px;
`

const Aligned = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
`

const Features = ({ pageWidth }) => {
  const Content = () => {
    if (pageWidth < SMALL) {
      return (
        <>
          <Aligned>
            <Auth/>
            <Form/>
          </Aligned>
          <List/>
          <Scoreboard/>
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
          <Scoreboard/>
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
          <Scoreboard/>
        </Right>
      </>
    )
  }
  return (
    <DocumentTitle title='Pomodoro Features'>
      <PageWithExit>
        <Content/>
      </PageWithExit>
    </DocumentTitle>
  )
}

export default connectTo(
  state => takeFromState(state, 'generic', ['pageWidth']),
  { actions },
  Features
)