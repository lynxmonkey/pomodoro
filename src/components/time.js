import React from 'react'
import styled, { css } from 'styled-components'
import { RerenderWithTime } from 'increaser-components'

import DocumentTitle from 'react-document-title'
import { connectTo, takeFromState } from '../utils/generic'
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


const Time = ({ lastSetEnd, pathname, showLastSet, mobile }) =>  {
  const showLastEnd = pathname !== PATH.TIMER && lastSetEnd && showLastSet
  const TitleWrapper = ({ children }) => {
    if (showLastEnd || pathname === PATH.TIMER) return children

    return (
      <DocumentTitle title={'Pomodoro'}>
        {children}
      </DocumentTitle>
    )
  }
  
  const rerenderPart = () => (
    <>
      <TimeNow large={!showLastEnd}>{getHumanTime()}</TimeNow>
      {showLastEnd && <LastSetEnd lastSetEnd={lastSetEnd} />}
    </>
  )

  return (
    <TitleWrapper>
      <Container mobile={mobile}>
        <RerenderWithTime renderComponent={rerenderPart} milliseconds={1000} />
      </Container>
    </TitleWrapper>
  )
}

export default connectTo(
  state => ({
    ...takeFromState(state, 'time', ['lastSetEnd']),
    pathname: state.router.location.pathname
  }),
  {},
  Time
)