import React from 'react'

import * as pages from '../pages'
import { connectTo } from '../utils/generic'
import { saveInstallProposalEvent } from '../actions/generic'

class Layout extends React.Component {
  render () {
    const { page, lastSetEnd, proposalEvent } = this.props

    if (lastSetEnd && proposalEvent) proposalEvent.prompt()

    const Page = pages[page]
    return <Page />
  }

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      this.props.saveInstallProposalEvent(e)
    })
  }
}

export default connectTo(
  state => ({
    page: state.navigation.page,
    lastSetEnd: state.time.lastSetEnd,
    proposalEvent: state.generic.proposalEvent
  }),
  { saveInstallProposalEvent },
  Layout
)