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
  const approved = features.filter(({ status }) => status !== STATUS.WAITING_FOR_APPROVE)
  const notApproved = features.filter(({ status }) => status === STATUS.WAITING_FOR_APPROVE)
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
    const inQueue = features.filter(({ status }) => status === STATUS.IN_QUEUE || status === STATUS.WAITING_FOR_APPROVE)
    const done = features.filter(({ status }) => status === STATUS.DONE)

    return (
      <Container>
        <Section name={'We are working on this'} features={inProgress} />
        <Section name={'We will start doing these features soon'} features={inQueue} />
        <Section name={'Those are done'} features={done} />
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