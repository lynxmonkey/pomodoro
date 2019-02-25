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

export const loadScript = (src, onLoad) => {
  const script = document.createElement('script')
  script.src = src
  script.async = true
  document.body.appendChild(script)
  script.onload = onLoad
}

export const googleAuthAvailable = () =>
Boolean(window.gapi && window.gapi.auth2 && window.gapi.auth2.getAuthInstance())