import React from 'react'

import * as pages from '../pages'
import { connectTo } from '../utils/generic'

class Layout extends React.Component {
  render () {
    const { page } = this.props
    const Page = pages[page]
    return <Page />
  }
}

export default connectTo(
  state => ({
    page: state.navigation.page
  }),
  { },
  Layout
)