import React from 'react'
import { ConnectedRouter } from 'connected-react-router'

import { connectTo } from '../utils/generic'
import * as actions from '../actions/generic'
import history from '../history'
import { createGlobalStyle } from 'styled-components'

import Router from '../router'

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    height: 100%;
    background-color: ${p => p.theme.color.pageBackground};
  }
  * {
    margin: 0;
    outline: none;
    box-sizing: border-box;
    color: ${p => p.theme.color.mainFont};
    font-family: 'Regular', sans-serif;
    user-select: none;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0)
  }
`

class Layout extends React.Component {
  render () {
    return (
      <>
        <GlobalStyle/>
        <ConnectedRouter history={history}>
          <Router/>
        </ConnectedRouter>
      </>
    )
  }

  componentDidMount() {
    const { saveInstallProposalEvent, changePageSize, startApp } = this.props

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      saveInstallProposalEvent(e)
    })
    window.addEventListener('resize', () => changePageSize({
      width: window.innerWidth,
      height: window.innerHeight
    }))

    startApp()
  }

  componentDidCatch(error, errorInfo) {
    this.props.fail({ error, errorInfo })
  }
}

export default connectTo(
  () => ({ }),
  actions,
  Layout
)