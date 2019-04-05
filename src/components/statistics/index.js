import React from 'react'
import DocumentTitle from 'react-document-title'
import styled from 'styled-components'

import PageWithExit from '../page-with-exit'
import Week from './week'
import Timelines from './timelines'


const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default () => {
  return (
    <DocumentTitle title='statistics'>
      <PageWithExit>
        <div>
          <Container>
            <Week/>
            <Timelines/>
          </Container>
        </div>
      </PageWithExit>
    </DocumentTitle>
  )
}
