self.addEventListener('notificationclick', (event) => {
  event.notification.close()
 
  event.waitUntil(
    clients
      .matchAll({ type: 'window' })
      .then(clientList => {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i]
          if (client.url === '/' && 'focus' in client) return client.focus()
        }
        if (clients.openWindow) return clients.openWindow('/')
      })
  )
})
