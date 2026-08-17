self.addEventListener('push', (event) => {
  const d = event.data.json();

  event.waitUntil(
    self.registration.showNotification(d.title, {
      body: d.message,
      tag: d.id,
      data: {
        link: d.link,
      },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.notification.data?.link) {
    event.waitUntil(
      clients.openWindow(event.notification.data.link)
    );
  }
});