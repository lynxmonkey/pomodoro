import React from 'react'
import styled from 'styled-components'
import { push } from 'connected-react-router'

import { connectTo } from '../../utils/generic';
import { PATH } from '../../constants/routing';


const PlaceHolder = styled.div`
  height: 60px;
  width: 100%;
`

const Container = styled(PlaceHolder)`
  background-color: ${p => p.theme.color.default};
  padding: 0 4%;
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const MainLogoPart = styled.p`
  cursor: pointer;
  font-family: 'Logo', cursive;
  color: ${props => props.theme.color.mainFont};
  font-size: 34px;
  &:hover {
    color: ${p => p.theme.color.primary};
    transition: ${p => p.theme.transition.default};
  }
`

const Navbar = ({ push }) => {
  return (
    <>
      <Container>
        <Logo onClick={() => push(PATH.TIME_PICKER)}>
          <MainLogoPart>Pomodoro</MainLogoPart>
        </Logo>
      </Container>
      <PlaceHolder/>
    </>
  )
}

export default connectTo(
  () => ({}),
  { push },
  Navbar
)
