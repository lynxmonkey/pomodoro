import React from 'react'

import * as pages from '../pages'
import { connectTo } from '../utils/generic'
import * as actions from '../actions/generic'

class Layout extends React.Component {
  render () {
    const { page } = this.props
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

  componentDidCatch(error, errorInfo) {
    this.props.fail({ error, errorInfo })
  }
}

export default connectTo(
  state => ({
    page: state.navigation.page
  }),
  actions,
  Layout
)