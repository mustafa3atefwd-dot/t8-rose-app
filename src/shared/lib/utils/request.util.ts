// features/auth/lib/request.ts

import { IApiResponse } from "../types/api";
import { notFound } from "next/navigation";
import { ApiError } from "./error.util";

/**
 * Generic API request handler for auth endpoints.
 * Handles JSON parsing + basic error normalization.
 */
export const apiRequest = async <TResponse>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<TResponse> => {
  const response = await fetch(input, init);

  const data: IApiResponse = await response.json();

  // Backend-level validation errors
  if (!data.status && data.errors?.length) {
    throw new Error(data.errors[0].message);
  }

  // HTTP + business logic failure fallback
  if (!response.ok || !data.status) {
    if (data.code === 404) {
      notFound();
    }

    throw new ApiError(
      data.message || "Request failed",
      response.status,
      data.code,
    );
  }

  return data as TResponse;
};
