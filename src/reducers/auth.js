import { createReducer } from 'redux-act'

import * as a from '../actions/auth'
import { takeIfExists } from '../utils/localStorage'
import { PROVIDER } from '../constants/auth'
import { googleAuthAvailable } from '../utils/generic'

const getDefaultState = () => ({
  token: takeIfExists('token'),
  tokenExpirationTime: takeIfExists('tokenExpirationTime', Number),
  id: takeIfExists('id'),
  providerScriptLoaded: {
    [PROVIDER.FACEBOOK]: window.FB !== undefined,
    [PROVIDER.GOOGLE]: googleAuthAvailable()
  }
})

export default () => createReducer({
    [a.receiveAuthData]: (state, { token, tokenExpirationTime, id }) => ({
      ...state,
      token,
      tokenExpirationTime,
      id
    }),
    [a.loadProviderScript]: (state, provider) => ({
      ...state,
      providerScriptLoaded: {
        ...state.providerScriptLoaded,
        [provider]: true
      }
    })
  },
  getDefaultState()
)