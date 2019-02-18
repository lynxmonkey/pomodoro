import React from 'react'
import styled from 'styled-components'

import * as actions from '../actions/settings'
import { connectTo, takeFromState } from '../utils/generic'
import Item from './panel-item'
import Help from './help'
import { AUTHOR_SITE } from '../constants/links';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Panel = ({ sound, toggleSound, setsSum }) => {
  return (
    <Container>
      <Item
        onClick={toggleSound}
        icon={sound ? 'volume-up' : 'volume-mute'}
        hint={`${sound ? '' : 'no'} sound after the end of set`}
      />
      <Item
        icon={'comment'}
        hint={'contact the author'}
        linkTo={AUTHOR_SITE}
      />
      <Item
        calling={setsSum === 0}
        icon={'question'}
        customHint={Help}
      />
    </Container>
  )
}

export default connectTo(
  state => ({
    ...state.settings,
    ...takeFromState(state, 'timeline', ['setsSum'])
  }),
  actions,
  Panel
)