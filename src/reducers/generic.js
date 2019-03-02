import { createReducer } from 'redux-act'

import * as a from '../actions/generic'

const getDefaultState = () => ({
  proposalEvent: undefined,
  pageWidth: window.innerWidth,
  pageHeight: window.innerWidth,
  auth: false
})

export default () =>
  createReducer(
    {
      [a.saveInstallProposalEvent]: (state, proposalEvent) => ({ ...state, proposalEvent }),
      [a.changePageSize]: (state, { width, height }) => ({
        ...state,
        pageWidth: width,
        pageHeight: height
      }),
      [a.promptToAddToHomeScreen]: (state) => ({ ...state, proposalEvent: undefined }),
      [a.openAuth]: state => ({
        ...state,
        auth: true
      })
    },
    getDefaultState()
  )
