import React from 'react'
import styled, { css } from 'styled-components'

import * as actions from '../../actions/features'
import { connectTo } from '../../utils/generic'

const Container = styled.form`
  width: 400px;
  border-radius: 5px;
  color: ${p => p.theme.color.mainFont};
  display: flex;
  flex-direction: column;
  background: ${p => p.theme.color.default};
  padding: 10px;
`

const Text = styled.h3`
  text-align: center;
  margin: 10px;
`

const inputStyles = css`
  border-radius: 5px;
  border: 1px solid ${p => p.theme.color.mainFont};
  background-color: transparent;
  font-size: 16px;
  padding: 10px;
  color: ${p => p.theme.color.mainFont};
  margin: 10px;

  &::placeholder {
    color: ${p => p.theme.color.mainFont};
  }
`

const NameInput = styled.input`
  ${inputStyles};
  height: 40px;
`

const DescriptionInput = styled.textarea`
  ${inputStyles};
  height: 160px;
`

const Form = ({ featureName, featureDescription, changeFeatureName, changeFeatureDescription }) => {
  return (
    <Container>
      <Text>Make Inpact. Propose Feature!</Text>
      <NameInput
        value={featureName}
        placeholder='Enter Name'
        onChange={({ target: { value } }) => changeFeatureName(value)}
      />
      <DescriptionInput
        value={featureDescription}
        placeholder='Describe your feature, so we will get it'
        onChange={({ target: { value } }) => changeFeatureDescription(value)}
      />
    </Container>
  )
}

export default connectTo(
  state => state.features,
  actions,
  Form
)