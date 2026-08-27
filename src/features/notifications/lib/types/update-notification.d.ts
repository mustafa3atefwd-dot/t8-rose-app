import { Notification } from './notifications';

// Request body
export interface UpdateNotificationBody {
  isRead: boolean;
}

// Route params
export interface UpdateNotificationParams {
  notificationId: string;
}

// Error response — e.g. 401 No token provided
export interface UpdateNotificationErrorResponse {
  status: false;
  code: number;
  message: string;
}

// Success payload — returns the updated notification
export interface UpdateNotificationPayload {
  notification: Notification;
}

// Success response — e.g. 200
export interface UpdateNotificationSuccessResponse {
  status: true;
  code: number;
  payload: UpdateNotificationPayload;
}

// Union type — use this in hooks / actions
export type UpdateNotificationResponse =
  | UpdateNotificationSuccessResponse
  | UpdateNotificationErrorResponse;
