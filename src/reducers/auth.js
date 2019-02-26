import { createReducer } from 'redux-act'

import * as a from '../actions/auth'
import { takeIfExists } from '../utils/localStorage'

const getDefaultState = () => ({
  token: takeIfExists('token'),
  tokenExpirationTime: takeIfExists('tokenExpirationTime', Number),
})

export default () => createReducer({
    [a.receiveAuthData]: (state, { token, tokenExpirationTime }) => ({
      ...state,
      token,
      tokenExpirationTime
    }),
    [a.unauthorizeUser]: () => ({})
  },
  getDefaultState()
)