import React from 'react'
import styled from 'styled-components'

import { connectTo } from '../../utils/generic'
import * as actions from '../../actions/features'

import Feature from './feature'
import { STATUS } from '../../constants/features';

const Header = styled.h3`
  font-size: 20px;
  color: ${p => p.theme.color.mainFont};
  margin-bottom: 5px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`


const Section = ({ features, name }) => {
  const approved = features.filter(({ status }) => status !== STATUS.WAITING_FOR_CONFIRMATION)
  const notApproved = features.filter(({ status }) => status === STATUS.WAITING_FOR_CONFIRMATION)
  const ordered = [
    ...approved.sort((a, b) => a.upvotesNumber > b.upvotesNumber ? -1 : 1),
    ...notApproved
  ]
  return (
    <SectionContainer>
      <Header>{name}</Header>
      {ordered.map((feature, index) => <Feature key={index} {...feature} first={index === 0} last={index === features.length - 1} />)}
    </SectionContainer>
  )
}

class List extends React.Component {
  render() {
    const { features } = this.props
    const inProgress = features.filter(({ status }) => status === STATUS.IN_PROGRESS)
    const inQueue = features.filter(({ status }) => status === STATUS.IN_QUEUE || status === STATUS.WAITING_FOR_CONFIRMATION)
    const done = features.filter(({ status }) => status === STATUS.DONE)
    const sections = [
      [inProgress, 'We are working on these'],
      [inQueue, 'We will start doing these soon'],
      [done, 'Done!']
    ].filter(([features]) => features.length > 0)
      .map(([ features, name ], index) => <Section key={index} {...{features, name}} />)

    return (
      <Container>
        {sections}
      </Container>
    )
  }
  
  componentDidMount() {
    this.props.requestFeatures()
  }
}

export default connectTo(
  state => state.features,
  actions,
  List
)