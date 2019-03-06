import { createAction } from 'redux-act'

export const requestFeatures = createAction()
export const receiveFeatures = createAction()
export const upvoteFeature = createAction()
export const reupvoteFeature = createAction()
export const changeFeatureName = createAction()
export const changeFeatureDescription = createAction()
export const submitFeature = createAction()
export const clearFeatureForm = createAction()
export const receiveFeature = createAction()