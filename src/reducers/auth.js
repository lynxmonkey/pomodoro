import { createReducer } from 'redux-act'

import * as a from '../actions/auth'
import { takeIfExists } from '../utils/localStorage'

const getDefaultState = () => ({
  token: takeIfExists('token'),
  tokenExpirationTime: takeIfExists('tokenExpirationTime', Number),
  id: takeIfExists('id')
})

export default () => createReducer({
    [a.receiveAuthData]: (state, { token, tokenExpirationTime, id }) => ({
      ...state,
      token,
      tokenExpirationTime,
      id
    }),
    [a.unauthorizeUser]: () => ({})
  },
  getDefaultState()
)