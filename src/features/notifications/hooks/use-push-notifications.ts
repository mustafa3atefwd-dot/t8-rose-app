"use client";

import { useMutation } from "@tanstack/react-query";
import { subscribeToPush } from "../lib/apis/notifications.api";

export function usePushNotifications() {
  const subscribeMutation = useMutation({
    mutationFn: subscribeToPush,
  });

  const subscribe = async () => {
    if (!("Notification" in window)) {
      throw new Error("This browser does not support notifications");
    }

    if (!("serviceWorker" in navigator)) {
      throw new Error("This browser does not support service workers");
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      throw new Error("Notification permission was not granted");
    }

    const registration = await navigator.serviceWorker.register("/sw.js");

    await navigator.serviceWorker.ready;

    // هنجيب الـ VAPID public key هنا
    // ونعمل PushSubscription بعد كده

    console.log("Service worker registered", registration);
  };

  return {
    subscribe,
    isLoading: subscribeMutation.isPending,
  };
}