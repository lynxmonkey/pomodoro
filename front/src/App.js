import * as Sentry from '@sentry/browser'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'

import saga from './sagas'
import store from './store'
import { sagaMiddleware } from './middleware'
import Layout from './components/layout'
import { THEME } from './constants/theme'

export default () => (
  <Provider store={store}>
    <ThemeProvider theme={THEME}>
      <Layout/>
    </ThemeProvider>
  </Provider>
)

sagaMiddleware.run(saga)


if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: "https://0dc467f02c2a46c9bfaacff3bab0b6ef@sentry.io/1362069"
  })
  ReactGA.initialize('UA-131566304-1')
}


