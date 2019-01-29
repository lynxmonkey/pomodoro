import * as Sentry from '@sentry/browser'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'
import { library } from '@fortawesome/fontawesome-svg-core'
import { THEME as ICTHEME } from 'increaser-components'
import { faVolumeUp, faVolumeMute, faComment } from '@fortawesome/free-solid-svg-icons'

import saga from './sagas'
import store from './store'
import { sagaMiddleware } from './middleware'
import Layout from './components/layout'
import { THEME } from './constants/theme'

const MERGED_THEME = {
  ...THEME,
  ...ICTHEME,
  color: {
    ...THEME.color,
    ...ICTHEME.color
  },
  shadow: {
    ...THEME.shadow,
    ...ICTHEME.shadow
  },
  transition: {
    ...THEME.transition,
    ...ICTHEME.transition
  }
}

library.add(faVolumeUp, faVolumeMute, faComment)

export default () => (
  <Provider store={store}>
    <ThemeProvider theme={MERGED_THEME}>
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
