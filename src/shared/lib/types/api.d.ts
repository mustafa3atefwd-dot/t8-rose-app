interface BaseResponse {
  status: boolean;
  code: number;
  message: string;
}

interface SuccessResponse<T> extends BaseResponse {
  status: true;
  payload: T;
}


interface ErrorResponse extends BaseResponse {
  status: false;
  errors?: Record<string, string[] | string> | null; 
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;