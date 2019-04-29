import React from 'react'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'

import { connectTo, takeFromState } from '../../utils/generic'
import * as actions from '../../actions/features'

import List from './list'
import Form from './form'
import Auth from './auth'
import Scoreboard from './scoreboard'
import Navbar from '../navbar'
import Scrollable from '../reusable/scroll/scrollable'
import { PageContentTopNavigation, ScrollablePageContainer } from '../reusable/page'

const PageContainer = styled(PageContentTopNavigation)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
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

const MIDDLE = 1020
const MEDIUM = 1600


const Aligned = styled.div`
  width: 600px;
  align-self: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ScoreboardContainer = styled.div`
  margin-top: 32px;
  margin-left: 20px;
`


const Features = ({ pageWidth }) => {
  const Content = () => {
    if (pageWidth < MIDDLE) {
      return (
        <Aligned>
          <List/>
          <Auth/>
          <Form/>
          <Scoreboard/>
        </Aligned>
      )
    }
    if (pageWidth < MEDIUM) {
      return (
        <>
          <Left>
            <List/>
          </Left>
          <Right>
            <Auth/>
            <Form/>
            <Scoreboard/>
          </Right>
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
        <ScoreboardContainer>
          <Scoreboard/>
        </ScoreboardContainer>
      </>
    )
  }
  return (
    <DocumentTitle title='Pomodoro Features'>
      <ScrollablePageContainer>
        <Navbar/>
        <Scrollable>
          <PageContainer>
            <Content/>
          </PageContainer>
        </Scrollable>
      </ScrollablePageContainer>
    </DocumentTitle>
  )
}

export default connectTo(
  state => takeFromState(state, 'generic', ['pageWidth']),
  { actions },
  Features
)