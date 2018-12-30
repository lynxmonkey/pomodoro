import * as Sentry from '@sentry/browser'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { YMInitializer } from 'react-yandex-metrika'

import saga from './sagas'
import store from './store'
import { sagaMiddleware } from './middleware'
import Layout from './components/layout'
import { THEME } from './constants/theme'

export default () => (
  <>
    <Provider store={store}>
      <ThemeProvider theme={THEME}>
        <Layout/>
      </ThemeProvider>
    </Provider>
    {process.env.NODE_ENV === 'production' && (
      <YMInitializer
        accounts={[51491761]}
        version="2"
        options={{
          id: 51491761,
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true
        }}
      />
    )}
  </>
)

sagaMiddleware.run(saga)


if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: "https://0dc467f02c2a46c9bfaacff3bab0b6ef@sentry.io/1362069"
   })
}


