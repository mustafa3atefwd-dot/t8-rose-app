// The base structural fields shared across all your API responses
interface BaseResponse {
    status: boolean;
    code: number;
    message: string;
  }
  
  // 1. Exact match for Success schema from api response for type.PNG
  interface SuccessResponse<T> extends BaseResponse {
    status: true;
    payload: T;
  }
  
  // 2. Exact match for Error schema from api response for type.PNG
  interface ErrorResponse extends BaseResponse {
    status: false;
    errors?: Record<string, string[] | string> | null; 
  }
  
  // 3. The Clean Universal Union Type
  export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;