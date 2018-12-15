import React from 'react'
import styled from 'styled-components'

import { connectTo, takeFromState } from '../utils/generic'
import { mount, unmount } from '../actions/time'
import LastSetEnd from './last-set-end'

const Container = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
  width: 320px;
  height: 100px;
  background-color: ${props => props.theme.color.glass};
  border-radius: 5px;
  padding: 20px;
  color: ${props => props.theme.color.text};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 1220px) {
    background-color: transparent;
    left: 50%;
    transform: translateX(-50%);
    height: 120px;
  }
`

const TimeNow = styled.p`
  font-size: ${props => props.large ? 40 : 34}px;
`


class Time extends React.Component {
  render() {
    const { lastSetEnd, page, showLastSet } = this.props

    const time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const showLastEnd = page !== 'timer' && lastSetEnd && showLastSet
    return (
      <Container>
        <TimeNow large={!showLastEnd}>{time}</TimeNow>
        {showLastEnd && <LastSetEnd lastSetEnd={lastSetEnd} />}
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