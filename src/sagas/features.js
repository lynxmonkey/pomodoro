import { put, select, call } from 'redux-saga/effects'

import { receiveFeatures, receiveWeeklyScoreboard, clearFeatureForm, receiveFeature } from '../actions/features'
import { callApi, reportError } from './generic'
import { get } from '../utils/api';
import { WEEKLY_SCOREBOARD } from '../constants/api';

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
    reportError('fail to submit feature', { errors })
  }
}

export function* requestWeeklyScoreboard() {
  try {
    const scoreboard = yield call(get, WEEKLY_SCOREBOARD)
    yield put(receiveWeeklyScoreboard(scoreboard))
  } catch (err) {
    reportError(err)
  }
}