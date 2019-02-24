import React from 'react'
import styled from 'styled-components'
import { RoundButton } from 'increaser-components'
import { notifyAfter } from '../actions/timer'
import { connectTo } from '../utils/generic';

const Container = styled.div`
  width: 300px;
  border-radius: 5px;
  background-color: ${p => p.theme.color.default};
  color: ${props => props.theme.color.mainFont};
  padding: 10px;
  margin: 20px 0;
`

const Header = styled.p`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 18px;
  margin: 10px;
`

const Minutes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  justify-content: space-around;
`

const MINUTES = [5, 10, 15]

const NotifyAfter = ({ notifyAfter }) => {
  return (
    <Container>
      <Header>
        Notify in a few minutes?
      </Header>
      <Minutes>
        {MINUTES.map(minute =>(
          <RoundButton onClick={() => notifyAfter(minute)} key={minute} size='m' type='default'>
            {minute}
          </RoundButton>
        ))}
      </Minutes>
    </Container>
  )
}

export default connectTo(
  () => ({}),
  { notifyAfter },
  NotifyAfter
)