import React from 'react'
import styled, { css } from 'styled-components'

import * as actions from '../../actions/features'
import { connectTo, takeFromState } from '../../utils/generic'
import { buttonStyle, buttonHoverStyle } from '../styles';

const Container = styled.form`
  width: 400px;
  border-radius: 5px;
  color: ${p => p.theme.color.mainFont};
  display: flex;
  flex-direction: column;
  background: ${p => p.theme.color.default};
  padding: 20px;
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
  margin: 10px 0;

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

const SubmitButton = styled.button`
  ${buttonStyle};
  height: 40px;
  border-radius: 5px;
  width: 100%;
  font-size: 18px;
  margin-top: 20px;
  ${p => p.enabled && css`
    &:hover {
      ${buttonHoverStyle}; 
  }`}
  cursor: ${p => p.enabled ? 'cursor' : 'auto'};
`

const Form = ({ featureName, featureDescription, changeFeatureName, changeFeatureDescription, token, submitFeature }) => {
  const submitPossible = token && featureName.length > 0
  const handleSubmit = (e) => {
    e.preventDefault()
    if (submitPossible) {
      submitFeature()
    }
  }
  
  return (
    <Container
      onSubmit={handleSubmit}
    >
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
      <SubmitButton enabled={token && featureName.length > 0} onClick={handleSubmit}>SUBMIT</SubmitButton>
    </Container>
  )
}

export default connectTo(
  state => ({
    ...takeFromState(state, 'auth', ['token']),
    ...state.features,
  }),
  actions,
  Form
)