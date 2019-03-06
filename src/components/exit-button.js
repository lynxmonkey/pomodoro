import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RoundButton } from 'increaser-components'

import { noPropagation } from '../utils/generic'

const ExitButtonWrapper = styled.div`
  position: fixed;
  top: 4%;
  right: 4%;
`

export default ({ onClick }) => (
  <ExitButtonWrapper>
    <RoundButton onClick={noPropagation(onClick)} type="default" size="m">
      <FontAwesomeIcon icon={'times'} />
    </RoundButton>
  </ExitButtonWrapper>
)