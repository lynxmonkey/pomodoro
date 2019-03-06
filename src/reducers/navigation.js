import { createReducer } from 'redux-act'

import * as a from '../actions/navigation'

const getDefaultState = () => ({
  page: 'features'
})

export default () =>
  createReducer(
    {
      [a.to]: (state, page) => ({ ...state, page })
    },
    getDefaultState()
  )