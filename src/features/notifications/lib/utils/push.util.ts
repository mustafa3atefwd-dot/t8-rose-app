import type { IPushSubscribeRequest } from '../types/push-status';

export function isPushSupported() {
  return (
    typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window
  );
}

export async function registerPushServiceWorker() {
  if (!isPushSupported()) {
    throw new Error('Push notifications are not supported by this browser.');
  }

  const registration = await navigator.serviceWorker.register('/sw.js');

  await navigator.serviceWorker.ready;

  return registration;
}

export async function subscribeToPush(publicKey: string): Promise<IPushSubscribeRequest> {
  const registration = await registerPushServiceWorker();

  let subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToArrayBuffer(publicKey),
    });
  }

  const json = subscription.toJSON();

  if (!json.endpoint || !json.keys) {
    throw new Error('Invalid push subscription.');
  }

  return {
    endpoint: json.endpoint,
    keys: {
      p256dh: json.keys.p256dh,
      auth: json.keys.auth,
    },
  };
}

function urlBase64ToArrayBuffer(value: string): ArrayBuffer {
  const padding = '='.repeat((4 - (value.length % 4)) % 4);

  const base64 = (value + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);

  const bytes = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    bytes[i] = rawData.charCodeAt(i);
  }

  return bytes.buffer;
}
