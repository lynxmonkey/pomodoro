import React from 'react'
import styled from 'styled-components'
import { push } from 'connected-react-router'

import { connectTo, takeFromState } from '../utils/generic'
import Exit from './exit-button'
import { PATH } from '../constants/routing';


const Page = styled.div`
  padding: 4% 4% 20px 4%;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-image: ${p => p.theme.color.pageBackground};
`


const MIDDLE = 1220
const EXIT_OWERLAP = 1220

const Features = ({ pageWidth, push, children }) => {

  const style = {
    flexDirection: pageWidth < MIDDLE ? 'column' : 'row',
    paddingRight: pageWidth < EXIT_OWERLAP ? 'calc(8% + 50px)' : '4%'
  }
  return (
    <Page style={style}>
      <Exit onClick={() => push(PATH.TIME_PICKER)}/>
      {children}
    </Page>
  )
}

export default connectTo(
  state => takeFromState(state, 'generic', ['pageWidth']),
  {
    push
  },
  Features
)