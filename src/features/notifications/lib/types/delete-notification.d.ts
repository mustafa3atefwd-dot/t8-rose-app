// Error response — e.g. 401 No token provided
export interface DeleteNotificationErrorResponse {
  status: false;
  code: number;
  message: string;
}

// Success response — e.g. 200 Notification deleted successfully
export interface DeleteNotificationSuccessResponse {
  status: true;
  code: number;
  message: string;
}

// Union type — use this in hooks / actions
export type DeleteNotificationResponse =
  | DeleteNotificationSuccessResponse
  | DeleteNotificationErrorResponse;

export interface DeleteNotificationParams {
  notificationId: string;
}