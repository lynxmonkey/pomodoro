import { createAction } from 'redux-act'

export const authorizeWithGoogle = createAction()
export const authorizeWithFacebook = createAction()

export const failToReceiveProviderToken = createAction()
export const receiveProviderToken = createAction()
export const receiveAuthData = createAction()
export const unauthorizeUser = createAction()
export const loadProviderScript = createAction()