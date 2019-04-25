import React from 'react'
import styled from 'styled-components'
import { secondsFormatter } from '../utils/time';

const Text = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
`

const Time = styled.span`
  font-weight: bold;
`


export default ({ text, seconds, textFirst = false}) => (
  <Text>
    {textFirst && text + ' '}
    <Time>{secondsFormatter(seconds)}</Time>
    {!textFirst && ' ' + text}
  </Text>
)