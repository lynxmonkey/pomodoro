import { createReducer } from 'redux-act'

import * as a from '../actions/settings'
import { takeIfExists } from '../utils/localStorage';

const getDefaultState = () => {
  const settings = takeIfExists('settings', Object) || {}
  const state = {
    sound: false,
    ...settings
  }
  return state
}

export default () => createReducer({
  [a.toggleSound]: (state) => {
    const newSound = !state.sound

    return {
      ...state,
      sound: newSound
    }
  }
}, getDefaultState())