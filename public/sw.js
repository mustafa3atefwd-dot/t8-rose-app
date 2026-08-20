self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }

  let data;

  try {
    data = event.data.json();
  } catch {
    data = {
      title: 'Rose',
      message: event.data.text(),
    };
  }

  const title = data.title || 'Rose';
  const message = data.message || '';
  const link = data.link || '/';

  event.waitUntil(
    (async () => {
      // Show browser notification
      await self.registration.showNotification(title, {
        body: message,

        ...(data.id && {
          tag: data.id,
        }),

        data: {
          link,
        },
      });

      // Notify the React app
      const clientsList = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });

      clientsList.forEach((client) => {
        client.postMessage({
          type: 'NEW_NOTIFICATION',
          notification: data,
        });
      });
    })()
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const link = event.notification.data?.link;

  if (!link) {
    return;
  }

  event.waitUntil(clients.openWindow(link));
});