import React from 'react'
import styled from 'styled-components'
import { secondsFormatter } from '../../utils/time';

const Container = styled.div`
  width: 400px;
  height: 240px;
  padding: 10px;
  margin: 20px;
  border-radius: 5px;
  background-color: ${p => p.theme.color.default};
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
`

const Header = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`

const Text = styled.p`
  color: ${p => p.theme.color.mainFont};
`

export default ({ period, time, children }) => {
  return (
    <Container>
      <Header>
        <Text>{period}: {secondsFormatter(time)}</Text>
      </Header>
      {children}
    </Container>
  )
}