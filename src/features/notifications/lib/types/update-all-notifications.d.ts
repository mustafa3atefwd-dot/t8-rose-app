import { Notification } from './notifications';

// Error response — e.g. 401 No token provided
export interface UpdateAllNotificationsErrorResponse {
  status: false;
  code: number;
  message: string;
}

// Success payload — returns the last updated notification
export interface UpdateAllNotificationsPayload {
  notification: Notification;
}

// Success response — e.g. 200
export interface UpdateAllNotificationsSuccessResponse {
  status: true;
  code: number;
  payload: UpdateAllNotificationsPayload;
}

// Union type — use this in hooks / actions
export type UpdateAllNotificationsResponse =
  | UpdateAllNotificationsSuccessResponse
  | UpdateAllNotificationsErrorResponse;