import { createReducer } from 'redux-act'

import * as a from '../actions/generic'

const getDefaultState = () => ({
  proposalEvent: undefined
})

export default () =>
  createReducer(
    {
      [a.saveInstallProposalEvent]: (state, proposalEvent) => ({ ...state, proposalEvent })
    },
    getDefaultState()
  )
