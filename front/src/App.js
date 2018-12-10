import React from 'react'
import { Provider } from 'react-redux'
import { YMInitializer } from 'react-yandex-metrika'

import saga from './sagas'
import store from './store'
import { sagaMiddleware } from './middleware'
import Layout from './components/layout'

export default () => (
  <>
    <Provider store={store}>
      <Layout/>
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
