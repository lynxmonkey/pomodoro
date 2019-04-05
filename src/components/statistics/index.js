import React from 'react'
import DocumentTitle from 'react-document-title'

import { connectTo, takeFromState } from '../../utils/generic';
import PageWithExit from '../page-with-exit'

const Statistics = ({ sets }) => {
  console.log(sets)
  return (
    <DocumentTitle title='statistics'>
      <PageWithExit>
        
      </PageWithExit>
    </DocumentTitle>
  )
}

export default connectTo(
  state => takeFromState(state, 'timeline', ['sets']),
  {},
  Statistics
)