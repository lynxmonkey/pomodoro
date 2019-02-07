import React from 'react'
import styled from 'styled-components'

import { togglePromote } from '../../actions/generic'
import { connectTo, takeFromState } from '../../utils/generic'
import Page from '../page'
import Time from '../time'
import Panel from '../panel'
import Wrapper from '../wrapper'
import Logo from '../logo'
import StatisticsPanel from '../statistics-panel'
import PlaceHolder from '../timeline-wrapper'
import Center from './center'

const Left = styled.div`
  background-color: goldenrod;
  padding: 5vh 0 5vh 5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Right = styled.div`
  background-color: navy;
  padding: 5vh 5vw 5vh 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

class Component extends React.Component {
  render() {
    return (
      <Page>
        <Left>
          <Panel/>
          <PlaceHolder/>
        </Left>
        <Center>
        </Center>
        <Right>
          <Time showLastSet />
          <StatisticsPanel/>
        </Right>


        {/* <Logo/>
        <Panel/>
        <TimePicker
          wrapper={Wrapper}
          duration={duration}
          onDurationChange={changeDuration}
          onStart={onStart}
        />
         */}
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
    ...takeFromState(state, 'generic', ['promoting']),
  }),
  {
    togglePromote
  },
  Component
)