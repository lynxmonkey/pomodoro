import { put, select } from 'redux-saga/effects'
import { receiveFeatures, clearFeatureForm, receiveFeature } from '../actions/features'
import { STATUS } from '../constants/features'

export function* requestFeatures() {
  const features = [
    {
      id: '1',
      status: STATUS.WAITING_FOR_CONFIRMATION,
      name: 'Palette',
      description: 'I would like to change palettes or maybe so that colors change automatically',
      upvotesNumber: 0,
      upvoted: false
    },
    {
      id: '12',
      status: STATUS.IN_QUEUE,
      name: 'Taka Taka',
      description: 'It would be cool to have TAKA TAKA in this app.',
      upvotesNumber: 21,
      upvoted: false
    },
    {
      id: '2',
      status: STATUS.IN_QUEUE,
      name: 'White noise',
      description: 'It would be cool if you can turn on white noise in the app background',
      upvotesNumber: 13,
      upvoted: false
    },
    {
      id: '3',
      status: STATUS.IN_PROGRESS,
      name: 'Palette',
      description: 'I would like to change palettes or maybe so that colors change automatically',
      upvotesNumber: 4,
      upvoted: false
    },
    {
      id: '34',
      status: STATUS.IN_PROGRESS,
      name: 'Super Palette',
      description: 'I would like to change palettes or maybe so that colors change automatically',
      upvotesNumber: 4,
      upvoted: false
    },
    {
      id: '4',
      status: STATUS.DONE,
      name: 'White noise',
      description: 'It would be cool if you can turn on white noise in the app background',
      upvotesNumber: 9,
      upvoted: false
    },
    {
      id: '345',
      status: STATUS.IN_PROGRESS,
      name: 'Super Palette',
      description: 'I would like to change palettes or maybe so that colors change automatically',
      upvotesNumber: 4,
      upvoted: false
    },
    {
      id: '346',
      status: STATUS.DONE,
      name: 'White noise',
      description: 'It would be cool if you can turn on white noise in the app background',
      upvotesNumber: 9,
      upvoted: false
    },
    {
      id: '3334',
      status: STATUS.DONE,
      name: 'White noise',
      description: 'It would be cool if you can turn on white noise in the app background',
      upvotesNumber: 9,
      upvoted: false
    },
    {
      id: '333345',
      status: STATUS.IN_PROGRESS,
      name: 'Super Palette',
      description: 'I would like to change palettes or maybe so that colors change automatically',
      upvotesNumber: 4,
      upvoted: false
    },
    {
      id: '333346',
      status: STATUS.DONE,
      name: 'White noise',
      description: 'It would be cool if you can turn on white noise in the app background',
      upvotesNumber: 9,
      upvoted: false
    },
  ]

  yield put(receiveFeatures(features))
}

export function upvoteFeature({ payload }) {
  console.log('upvote feature with id: ', payload)
}

export function reupvoteFeature({ payload }) {
  console.log('reupvote feature with id: ', payload)
}

export function* submitFeature() {
  const state = yield select()
  const { featureName, featureDescription } = state.features
  console.log({
    name: featureName,
    description: featureDescription
  })
  // request to api: ...
  const feature = {
    id: Math.round((Math.random * 10000000)).toString(),
    status: STATUS.WAITING_FOR_CONFIRMATION,
    name: featureName,
    description: featureDescription,
    upvotesNumber: 0,
    upvoted: false
  }
  yield put(receiveFeature(feature))
  yield put(clearFeatureForm())
}