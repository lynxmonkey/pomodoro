import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export const connectTo = (mapStateToProps, actions, Container) => {
  const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
  return connect(mapStateToProps, mapDispatchToProps)(Container)
}

export const takeFromState = (state, stateObjectName, fields) =>
  Object.entries(state[stateObjectName])
    .reduce(
      (acc, [key, value]) => fields.includes(key) ? { ...acc, [key]: value } : acc,
      {}
    )