import * as Sentry from '@sentry/browser'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'
import { THEME as ICTHEME } from 'increaser-components'

import './utils/init-fa'
import saga from './sagas'
import store from './store'
import { sagaMiddleware } from './middleware'
import Layout from './components/layout'
import { THEME } from './constants/theme'

const MERGED_THEME = {
  ...THEME,
  ...ICTHEME,
  color: {
    ...ICTHEME.color,
    ...THEME.color,
  },
  shadow: {
    ...ICTHEME.shadow,
    ...THEME.shadow,
  },
  transition: {
    ...THEME.transition,
    ...ICTHEME.transition
  }
}


export default () => (
  <Provider store={store}>
    <ThemeProvider theme={MERGED_THEME}>
      <Layout/>
    </ThemeProvider>
  </Provider>
)

sagaMiddleware.run(saga)

const VERSION = '1.4.12'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_KEY
  })
  Sentry.configureScope(scope => scope.setTag('version', VERSION))
  ReactGA.initialize(process.env.REACT_APP_GA_KEY)
  ReactGA.pageview(window.location.pathname + window.location.search)
  console.info(`start app, version ${VERSION}`)
}
