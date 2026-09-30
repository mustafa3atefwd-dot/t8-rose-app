'use server';

import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { getNextAuthToken } from "@/shared/lib/utils/get-token.util";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { UpdateNotificationResponse } from "../types/update-notification";
import { DeleteNotificationResponse } from "../types/delete-notification";
import { UpdateAllNotificationsResponse } from "../types/update-all-notifications";
import { DeleteAllNotificationsResponse } from "../types/delete-all-notifications";

// get token
async function getAccessToken() {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  return token;
}

// update a notification to read notification
export async function updateNotification(notificationId: string): Promise<UpdateNotificationResponse> {
  const token = await getAccessToken();
  return apiRequest<UpdateNotificationResponse>(`${BACKEND_URL}/notifications/${notificationId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      isRead: true,
    }),
  });
}

// Delete a notification by ID
export async function deleteNotification(notificationId: string): Promise<DeleteNotificationResponse> {
  const token = await getAccessToken();
  return apiRequest<DeleteNotificationResponse>(`${BACKEND_URL}/notifications/${notificationId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

// Mark ALL Read Notifications
export async function markAllRead(): Promise<UpdateAllNotificationsResponse> {
  const token = await getAccessToken();
  return apiRequest<UpdateAllNotificationsResponse>(`${BACKEND_URL}/notifications/mark-all-read`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

// Delete ALL Notifications
export async function deleteAllNotifications(): Promise<DeleteAllNotificationsResponse> {
  const token = await getAccessToken();
  return apiRequest<DeleteAllNotificationsResponse>(`${BACKEND_URL}/notifications/clear-all`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
}