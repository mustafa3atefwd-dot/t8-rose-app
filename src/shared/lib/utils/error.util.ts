/**
 * Custom error class for API-related errors with status code support.
 * This class allows you to attach HTTP status codes to errors.
 */
export class ApiError extends Error {
  status: number;
  code?: number;

  constructor(message: string, status: number, code?: number) {
    super(message);

    this.status = status;
    this.code = code;
  }
}
