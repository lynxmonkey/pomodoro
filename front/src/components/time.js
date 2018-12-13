import React from 'react'
import styled from 'styled-components'

import { connectTo, takeFromState } from '../utils/generic'
import { mount, unmount } from '../actions/time'

const Container = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
  width: 300px;
  height: 100px;
  background-color: ${props => props.theme.color.glass};
  border-radius: 5px;
  padding: 20px;
  color: ${props => props.theme.color.text};
  display: flex;
  justify-content: center;
  align-items: center;
`

const TimeNow = styled.p`
  font-size: ${props => props.large ? 40 : 34}px;
`

class Time extends React.Component {
  render() {
    const {
      timeNow,
      lastSetEnd,
      page
    } = this.props

    const time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const showLastEnd = page !== 'timer' && lastSetEnd
    return (
      <Container>
        <TimeNow large={!showLastEnd}>{time}</TimeNow>
        
      </Container>
    )
  }

  componentDidMount() {
    this.props.mount()
  }

  componentWillUnmount() {
    this.props.unmount()
  }
}

export default connectTo(
  state => ({
    ...takeFromState(state, 'time', ['lastSetEnd', 'timeNow']),
    ...takeFromState(state, 'navigation', ['page'])
  }),
  { mount, unmount },
  Time
)