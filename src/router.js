import React from "react"
import { Route, Switch } from "react-router"

import { PATH } from './constants/routing'
import timePicker from './components/time-picker'
import timer from './components/timer'
import features from './components/features'
import statistics from './components/statistics'

export default () => (
  <Switch>
    <Route exact path={PATH.TIME_PICKER} component={timePicker} />
    <Route exact path={PATH.TIMER} component={timer} />
    <Route exact path={PATH.FEATURES} component={features} />
    <Route exact path={PATH.STATISTICS} component={statistics} />
    <Route component={timePicker} />
  </Switch>
)