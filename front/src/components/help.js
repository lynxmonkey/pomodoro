import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 320px;
  padding: 10px;
  background: ${p => p.theme.color.default};
  color: ${props => props.theme.color.mainFont};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
`

const Header = styled.h4`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin: 10px;
`

const Steps = styled.div`
  display: flex;
  flex-direction: column;
`

const Step = styled.div`
  display: flex;
  flex-direction: row;
  flex-direction: start;
  margin: 10px;
`

const Number = styled.p`
  padding-right: 5px;
`


const STEPS = [
  'Select number of minutes you want to work.',
  'Click on rocket and work without distractions.',
  'Take a rest and repeat.'
]

export default () => (
  <Container>
    <Header>
      Make Yourself More Productive!
    </Header>
    <Steps>
      {STEPS.map((step, index) => (
        <Step key={index}>
          <Number>{index + 1}.</Number>
          <p>{step}</p>
        </Step>
      ))}
    </Steps>
  </Container>
)