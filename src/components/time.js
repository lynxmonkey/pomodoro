import React from 'react'
import styled, { css } from 'styled-components'

import { connectTo, takeFromState } from '../utils/generic'
import { mount, unmount } from '../actions/time'
import LastSetEnd from './last-set-end'
import { getHumanTime } from '../utils/time';
import { PATH } from '../constants/routing';

const Container = styled.div`
  width: 320px;
  height: 100px;
  background-color: ${props => props.theme.color.default};
  border-radius: 5px;
  padding: 20px;
  color: ${props => props.theme.color.mainFont};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  ${p => p.mobile && css`
    background-color: transparent;
    height: 120px;
  `}
`

const TimeNow = styled.p`
  font-size: ${props => props.large ? 40 : 34}px;
`

class Time extends React.Component {
  render() {
    const { lastSetEnd, pathname, showLastSet, mobile } = this.props
    const time = getHumanTime()
    const showLastEnd = pathname !== PATH.TIMER && lastSetEnd && showLastSet
    return (
      <Container mobile={mobile}>
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
    pathname: state.router.location.pathname
  }),
  { mount, unmount },
  Time
)