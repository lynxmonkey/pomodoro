import { put, select } from 'redux-saga/effects'

import { receiveFeatures, clearFeatureForm, receiveFeature } from '../actions/features'
import { callApi, reportError } from './generic'

export function* requestFeatures() {
  const query = `
    query {
      features {
        id,
        status,
        name,
        upvotesNumber,
        upvoted
      }
    }
  `
  try {
    const { features } = yield callApi(query)
    yield put(receiveFeatures(features))
  } catch(errors) {
    reportError('fail to receive features', { errors })
  }
}

export function* upvoteFeature({ payload }) {
  const query = `
    mutation {
      upvoteFeature(id: "${payload}")
    }
  `
  try {
    yield callApi(query)
  } catch(errors) {
    reportError('fail to upvote feature', { errors })
  }
}

export function* reupvoteFeature({ payload }) {
  const query = `
    mutation {
      reupvoteFeature(id: "${payload}")
    }
  `
  try {
    yield callApi(query)
  } catch(errors) {
    reportError('fail to reupvote feature', { errors })
  }
}

export function* submitFeature() {
  const state = yield select()
  const { featureName, featureDescription } = state.features

  const query = `
    mutation SubmitFeature($input: FeatureInput!) {
      submitFeature(featureInput: $input) {
        id,
        status,
        name,
        upvotesNumber,
        upvoted
      }
    }  
  `
  const variables = {
    input: {
      name: featureName,
      description: featureDescription
    }
  }
  try {
    const { submitFeature } = yield callApi(query, variables)
    yield put(receiveFeature(submitFeature))
    yield put(clearFeatureForm())
  } catch(errors) {
    reportError('fail to reupvote feature', { errors })
  }
}