import React from 'react'

import * as pages from '../pages'
import { connectTo } from '../utils/generic'
import * as actions from '../actions/generic'

class Layout extends React.Component {
  render () {
    const { page, lastSetEnd, proposalEvent } = this.props

    if (lastSetEnd && proposalEvent) {
      try {
        proposalEvent.prompt()
      } catch(err) {
        console.info('fail to prompt')
      }
    }

    const Page = pages[page]
    return <Page />
  }

  componentDidMount() {
    const { saveInstallProposalEvent, changePageSize } = this.props

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      saveInstallProposalEvent(e)
    })
    window.addEventListener('resize', () => changePageSize({
      width: window.innerWidth,
      height: window.innerHeight
    }))
  }
}

export default connectTo(
  state => ({
    page: state.navigation.page,
    lastSetEnd: state.time.lastSetEnd,
    proposalEvent: state.generic.proposalEvent
  }),
  actions,
  Layout
)