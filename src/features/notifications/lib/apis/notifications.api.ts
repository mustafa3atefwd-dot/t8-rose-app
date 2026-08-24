import { IApiResponse } from "@/shared/lib/types/api";


type PushSubscriptionPayload = {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
};

export async function subscribeToPush(
  subscription: PushSubscriptionPayload
): Promise<IApiResponse> {
  const res = await fetch("/api/notifications/subscriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to subscribe to push notifications");
  }

  return data;
}