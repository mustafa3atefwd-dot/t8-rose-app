import type { IPushSubscribeRequest } from '../types/notifications';

const SERVICE_WORKER_PATH = '/sw.js';

export function isPushSupported() {
  return (
    typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window
  );
}

export async function registerPushServiceWorker() {
  if (!isPushSupported()) {
    throw new Error('Push notifications are not supported by this browser.');
  }

  await navigator.serviceWorker.register(SERVICE_WORKER_PATH);

  return navigator.serviceWorker.ready;
}

// The browser's current subscription, without registering a worker or prompting for permission
export async function getBrowserPushSubscription() {
  if (!isPushSupported()) return null;

  const registration = await navigator.serviceWorker.getRegistration(SERVICE_WORKER_PATH);

  return (await registration?.pushManager.getSubscription()) ?? null;
}

export async function subscribeToPush(publicKey: string): Promise<IPushSubscribeRequest> {
  const registration = await registerPushServiceWorker();

  const subscription =
    (await registration.pushManager.getSubscription()) ??
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToArrayBuffer(publicKey),
    }));

  const { endpoint, keys } = subscription.toJSON();

  if (!endpoint || !keys?.p256dh || !keys.auth) {
    throw new Error('Invalid push subscription.');
  }

  return { endpoint, keys: { p256dh: keys.p256dh, auth: keys.auth } };
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
