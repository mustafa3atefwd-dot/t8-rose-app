// Core API response types for backend interactions
export interface IErrorResponse {
  status: false;
  code: number;
  message: string;
  errors?: Array<{ path: string; message: string }>;
}

// Successful API response with optional payload
export interface ISuccessResponse<T = unknown> {
  status: true;
  code: number;
  message?: string;
  payload?: T;
}

// Combined API response type (error or success)
export type IApiResponse<T = unknown> = IErrorResponse | ISuccessResponse<T>;
