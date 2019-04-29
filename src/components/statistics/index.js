import React from 'react'
import DocumentTitle from 'react-document-title'
import styled from 'styled-components'

import Week from './week'
import Timelines from './timelines'
import Navbar from '../navbar'
import Scrollable from '../reusable/scroll/scrollable'
import { PageContentTopNavigation, ScrollablePageContainer } from '../reusable/page'


const PageContainer = styled(PageContentTopNavigation)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`

export default () => {
  return (
    <DocumentTitle title='statistics'>
      <ScrollablePageContainer>
        <Navbar/>
        <Scrollable>
          <PageContainer>
          <Week/>
          <Timelines/>
          </PageContainer>
        </Scrollable>
      </ScrollablePageContainer>
    </DocumentTitle>
  )
}
