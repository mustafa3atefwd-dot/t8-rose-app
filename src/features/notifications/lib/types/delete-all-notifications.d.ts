// Error response — e.g. 401 No token provided
export interface DeleteAllNotificationsErrorResponse {
  status: false;
  code: number;
  message: string;
}

// Success response — e.g. 200
export interface DeleteAllNotificationsSuccessResponse {
  status: true;
  code: number;
  message: string;
}

// Union type — use this in hooks / actions
export type DeleteAllNotificationsResponse =
  | DeleteAllNotificationsSuccessResponse
  | DeleteAllNotificationsErrorResponse;