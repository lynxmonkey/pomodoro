import { createAction } from 'redux-act'

export const tick = createAction()
export const mount = createAction()
export const unmount = createAction()
export const stopTicking = createAction()