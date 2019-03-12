import React from "react"
import { Route, Switch } from "react-router"

import timePicker from './components/time-picker'
import timer from './components/timer'
import features from './components/features'

export default () => (
  <Switch>
    <Route exact path='/' component={timePicker} />
    <Route exact path='/timer' component={timer} />
    <Route exact path='/features' component={features} />
    <Route component={timePicker} />
  </Switch>
)