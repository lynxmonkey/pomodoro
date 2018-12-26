import React from 'react'
import styled from 'styled-components'
import DocumentTitle from 'react-document-title'
import { LESS_THAN_MINUTE_MESSAGE } from '../constants/timer';

const Text = styled.p`
  font-size: 20px;
`

export default ({ lastSetEnd }) => {
  const timeNow = Date.now()
  const getString = () => {
    const seconds = (timeNow - lastSetEnd) / 1000
    if (seconds < 60) {
      return LESS_THAN_MINUTE_MESSAGE
    }
    const minutes = Math.round(seconds / 60)
    const template = (time, name) => `last set ended ${time} ${time > 1 ? `${name}s` : name} ago`
    if (minutes < 60) {
      return template(minutes, 'minute')
    }
    const hours = Math.round(minutes / 60)
    if (hours < 24) {
      return template(hours, 'hour')
    }
    const days = Math.round(hours / 24)
    return template(days, 'day')
  }

  const string = getString()
  return (
    <DocumentTitle title={string === LESS_THAN_MINUTE_MESSAGE ? 'Pomodoro' : string}>
      <Text>{getString()}</Text>
    </DocumentTitle>
  )
}