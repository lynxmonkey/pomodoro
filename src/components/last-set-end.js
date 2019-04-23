import React from 'react'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'
import { LESS_THAN_MINUTE_MESSAGE } from '../constants/timer';
import { getHumanDuration } from '../utils/time';

const Text = styled.p`
  font-size: 20px;
`

export default ({ lastSetEnd }) => {
  const string = getHumanDuration(
    lastSetEnd,
    LESS_THAN_MINUTE_MESSAGE,
    time => `last set ended ${time} ago`
  )
  return (
    <DocumentTitle title={string === LESS_THAN_MINUTE_MESSAGE ? 'Pomodoro' : string}>
      <Text>{string}</Text>
    </DocumentTitle>
  )
}