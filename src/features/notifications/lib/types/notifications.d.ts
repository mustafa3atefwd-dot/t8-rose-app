export interface NotificationsResponse {
  status: boolean;
  code: number;
  payload: NotificationsPayload;
}

export interface NotificationsPayload {
  data: Notification[];
  metadata: PaginationMetadata;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  link: string;
  createdAt: string; 
  updatedAt: string; 
}

export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type NotificationType = "PROMOTION" | string;