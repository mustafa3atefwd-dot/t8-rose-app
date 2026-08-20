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
    self.registration.showNotification(title, {
      body: message,

      ...(data.id && {
        tag: data.id,
      }),

      data: {
        link,
      },

      // icon: '/icons/icon-192x192.png',
      // badge: '/icons/badge-72x72.png',
    })
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
