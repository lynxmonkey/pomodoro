import * as Sentry from '@sentry/browser'

export const notificationAllowed = () => window.Windows || (window.Notification && window.Notification.permission === 'granted')

export const showNotification = (text) => {
  if (!notificationAllowed()) return
  
  if (window.Windows) {
    try {
      const imageUrl = window.location.protocol + '//' + window.location.host + '/images/1024x1024.png'
      const toastXml = new window.Windows.Data.Xml.Dom.XmlDocument()
      const toastNotificationXmlTemplate =
      `<toast>
          <visual>
              <binding template="ToastGeneric">
                  <text hint-maxLines="1"></text>
                  <text></text>
                  <image placement="" src=""/>
              </binding>
          </visual>
      </toast>`
      toastXml.loadXml(toastNotificationXmlTemplate)

      const images = toastXml.getElementsByTagName('image')
      images[0].setAttribute('src', imageUrl)
      const textNodes = toastXml.getElementsByTagName('text');
      textNodes[0].innerText = 'Pomodoro by Increaser'
      textNodes[1].innerText = text
      const toast = new window.Windows.UI.Notifications.ToastNotification(toastXml)
      window.Windows.UI.Notifications.ToastNotificationManager.createToastNotifier().show(toast)
    } catch(error) {
      Sentry.captureException(error)
    }
  } else {
    try {
      const notification = new window.Notification(text)
      notification.onclick = function() {
        window.focus()
        notification.close()
      }
    } catch (_) {
      navigator.serviceWorker.getRegistration().then(registration => {
        registration.showNotification(text, {
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          requireInteraction: true
        })
      })
    }
  }
}