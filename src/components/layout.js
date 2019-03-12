import React from 'react'
import { ConnectedRouter } from 'connected-react-router'

import { connectTo } from '../utils/generic'
import * as actions from '../actions/generic'
import history from '../history'

import Router from '../router'

class Layout extends React.Component {
  render () {
    return (
      <ConnectedRouter history={history}>
        <Router/>
      </ConnectedRouter>
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