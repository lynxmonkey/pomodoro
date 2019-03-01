import React from 'react'
import styled from 'styled-components'
import { centerContentStyle } from 'increaser-components'

import TimePicker from './time-picker'
import Logo from '../logo'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  margin: 0 10px;
`

const Placeholder = styled.div`
  width: 100%;
  height: 160px;
  ${centerContentStyle};
`

const Bottom = styled(Placeholder)`
  max-width: 600px;
`

export default ({ children = null }) => {
  return (
    <Container>
      <Placeholder>
        {children}
      </Placeholder>
      <TimePicker/>
      <Bottom>
        <Logo/>
      </Bottom>
    </Container>
  )
}
