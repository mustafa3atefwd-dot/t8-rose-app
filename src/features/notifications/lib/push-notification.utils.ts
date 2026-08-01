export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service Worker is not supported");
  }

  const registration = await navigator.serviceWorker.register("/sw.js");

  return registration;
}