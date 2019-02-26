import * as Sentry from '@sentry/browser'

export function fail({ payload: { error, errorInfo }}) {
  if (process.env.NODE_ENV === 'production') {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
      Sentry.captureException(error)
    })
  }
}