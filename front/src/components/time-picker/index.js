import React from 'react'
import styled from 'styled-components'

import { togglePromote } from '../../actions/generic'
import { connectTo, takeFromState } from '../../utils/generic'
import Time from '../time'
import Panel from '../panel'
import StatisticsPanel from '../statistics-panel'
import PlaceHolder from '../timeline-wrapper'
import Center from './center'

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Page = styled.div`
  padding: 4% 4% 20px 4%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-image: ${p => p.theme.color.pageBackground};
`

class Component extends React.Component {
  render() {
    const { pageWidth } = this.props
    const mobile = pageWidth < 1220
    return (
      <Page>
        {!mobile && (
          <Left>
            <Panel/>
            <PlaceHolder/>
          </Left>

        )}
        <Center>
          {mobile && <Time showLastSet mobile />}
        </Center>
        {!mobile && (
          <Right>
            <Time showLastSet />
            <StatisticsPanel/>
          </Right>
        )}


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
    ...takeFromState(state, 'generic', ['promoting', 'pageWidth']),
  }),
  {
    togglePromote
  },
  Component
)