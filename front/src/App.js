import * as Sentry from '@sentry/browser'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

import saga from './sagas'
import store from './store'
import { sagaMiddleware } from './middleware'
import Layout from './components/layout'
import { THEME } from './constants/theme'

library.add(faVolumeUp, faVolumeMute)

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
  ReactGA.pageview(window.location.pathname + window.location.search)
  console.log('start app, version 1.0.0')
}


