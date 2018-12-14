import React from 'react'
import styled from 'styled-components'

const Text = styled.p`
  font-size: 20px;
`

export default ({ lastSetEnd }) => {
  const timeNow = Date.now()
  const getString = () => {
    const seconds = (timeNow - lastSetEnd) / 1000
    if (seconds < 60) {
      return 'the last set is over just now'
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

  return (
    <Text>{getString()}</Text>
  )
}