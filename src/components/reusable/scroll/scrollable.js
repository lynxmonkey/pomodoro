import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import Thumb from './thumb'

export default ({ children }) => (
  <Scrollbars
    renderThumbVertical={(...props) => <Thumb {...props} />}
    renderThumbHorizontal={(...props) => <Thumb {...props} />}
  >
    {children}
  </Scrollbars>
)
