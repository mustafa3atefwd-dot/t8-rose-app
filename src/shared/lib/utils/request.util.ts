// shared/lib/request.util.ts

import { IApiResponse } from "../types/api";
import { ApiError } from "./error.util";

/**
 * Generic API request handler.
 * Handles JSON parsing + basic error normalization.
 */
export const apiRequest = async <TResponse>(input: RequestInfo, init?: RequestInit): Promise<TResponse> => {
  const response = await fetch(input, init);

  const responseText = await response.text();
  let data: IApiResponse;

  try {
    data = responseText ? JSON.parse(responseText) : { status: response.ok, code: response.status };
  } catch {
    throw new ApiError(responseText || response.statusText || 'Request failed', response.status);
  }

  // Backend-level validation errors
  if (!data.status && data.errors?.length) {
    throw new Error(data.errors[0].message);
  }

  // HTTP + business logic failure fallback
  if (!response.ok || !data.status) {
    throw new ApiError(
      data.message || "Request failed",
      response.status,
      data.code,
    );
  }

  return data as TResponse;
};
