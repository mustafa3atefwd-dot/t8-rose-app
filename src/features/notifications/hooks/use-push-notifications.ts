// 'use client';

// import { useEffect } from 'react';
// import { registerServiceWorker } from '../lib/push-notification.utils';
// import { getVapidPublicKey } from '../apis/notifications.api';

// export function usePushNotifications() {
//   useEffect(() => {
//     async function init() {
//       const registration = await registerServiceWorker();

//       console.log(registration);

//       const vapidKey = await getVapidPublicKey();

//       console.log(vapidKey);

//       const permission = await Notification.requestPermission();

//       console.log('Notification permission:', permission);
//     }

//     init();
//   }, []);
// }