import React from 'react'
import styled from 'styled-components'

import { togglePromote } from '../../actions/generic'
import { connectTo, takeFromState } from '../../utils/generic'
import Time from '../time'
import Panel from '../panel'
import StatisticsPanel from '../statistics-panel'
import PlaceHolder from '../timeline-wrapper'
import Page from '../page'
import Center from './center'

const Side = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Right = styled(Side)`
  align-items: flex-start;
`

const Left = styled(Side)`
  align-items: flex-end;
`

const MEDIUM_WIDTH = 1540
// const MOBILE_WIDTH = 800

class Component extends React.Component {
  render() {
    const { pageWidth } = this.props
    const mobile = pageWidth < 1220

    const Content = () => {
      if (pageWidth < MEDIUM_WIDTH) {
        return (
          <>
            <Right>
              <Panel/>
              <StatisticsPanel/>
            </Right>
            <Center>
              <Time showLastSet mobile/>
            </Center>
          </>
        )
      }
      if (mobile) {
        return (
          <Center>
            <Time showLastSet mobile/>
          </Center>
        )
      }

      return (
        <>
          <Right>
            <Panel/>
            <PlaceHolder/>
          </Right>
          <Center/>
          <Left>
            <Time showLastSet />
            <StatisticsPanel/>
          </Left>
        </>
      )
    }

    return (
      <Page>
        <Content/>
      </Page>
    )
  }

  componentDidMount() {
    document.addEventListener('click', this.onClick)
  }

  onClick = () => {
    const { promoting, togglePromote } = this.props
    if (promoting) {
      togglePromote()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick)
  }
}

export default connectTo(
  state => ({
    ...takeFromState(state, 'generic', ['promoting', 'pageWidth']),
  }),
  {
    togglePromote
  },
  Component
)