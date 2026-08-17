export async function getVapidPublicKey() {
  const res = await fetch("/api/notifications/vapid-public-key");

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to get VAPID public key"
    );
  }

  return data.payload.publicKey;
}