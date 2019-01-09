import { createReducer } from 'redux-act'

import * as a from '../actions/settings'
import { takeIfExists } from '../utils/localStorage';

const getDefaultState = () => {
  const settings = takeIfExists('settings', Object)
  const state = {
    sound: false,
    ...settings
  }

  localStorage.setItem('settings', JSON.stringify(state))
  return state
}

export default () => createReducer({
  [a.toggleSound]: (state) => {
    const newSound = !state.sound
    const oldSettings = takeIfExists('settings', Object)
    localStorage.setItem('settings', JSON.stringify({ ...oldSettings, sound: newSound }))

    return {
      ...state,
      sound: newSound
    }
  }
}, getDefaultState())