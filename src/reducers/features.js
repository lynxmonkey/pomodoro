import { createReducer } from 'redux-act'

import * as a from '../actions/features'

const getDefaultState = () => ({
  features: [],
  featureName: '',
  featureDescription: '',
  topWeeklyUsers: [],
  lastScoreboardUpdate: undefined
})

export default () => createReducer({
  [a.receiveFeatures]: (state, features) => ({
    ...state,
    features
  }),
  [a.upvoteFeature]: (state, id) => ({
    ...state,
    features: state.features.map(feature => feature.id === id ? ({
      ...feature,
      upvoted: true,
      upvotesNumber: feature.upvotesNumber + 1
    }) : feature)
  }),
  [a.reupvoteFeature]: (state, id) => ({
    ...state,
    features: state.features.map(feature => feature.id === id ? ({
      ...feature,
      upvoted: false,
      upvotesNumber: feature.upvotesNumber - 1
    }) : feature)
  }),
  [a.changeFeatureName]: (state, featureName) => ({
    ...state,
    featureName
  }),
  [a.changeFeatureDescription]: (state, featureDescription) => ({
    ...state,
    featureDescription
  }),
  [a.clearFeatureForm]: state => ({
    ...state,
    featureName: '',
    featureDescription: ''
  }),
  [a.receiveFeature]: (state, feature) => ({
    ...state,
    features: [ ...state.features, feature ]
  }),
  [a.receiveWeeklyScoreboard]: (state, { users, timestamp }) => ({
    ...state,
    topWeeklyUsers: users,
    lastScoreboardUpdate: timestamp
  })
}, getDefaultState())