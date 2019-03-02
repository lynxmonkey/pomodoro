import React from 'react'
import styled from 'styled-components'

import { connectTo, takeFromState } from '../../utils/generic'
import Time from '../time'
import Panel from '../panel'
import StatisticsPanel from '../statistics-panel'
import PlaceHolder from '../timeline-wrapper'
import Page from '../page'
import Center from './center'
import Mobile from './mobile'


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
const MOBILE_WIDTH = 800

class Component extends React.Component {
  render() {
    const { pageWidth } = this.props

    if (pageWidth < MOBILE_WIDTH) {
      return <Mobile/>
    }
    if (pageWidth < MEDIUM_WIDTH) {
      return (
        <Page>
          <Right>
            <Panel/>
            <StatisticsPanel/>
          </Right>
          <Center>
            <Time showLastSet mobile/>
          </Center>
        </Page>
      )
    }

    return (
      <Page>
        <Right>
          <Panel/>
          <PlaceHolder/>
        </Right>
        <Center/>
        <Left>
          <Time showLastSet />
          <StatisticsPanel/>
        </Left>
      </Page>
    )
  }

  componentDidMount() {
    document.addEventListener('click', this.onClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick)
  }
}

export default connectTo(
  state => ({
    ...takeFromState(state, 'generic', ['pageWidth']),
  }),
  { },
  Component
)