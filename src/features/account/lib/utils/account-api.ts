import type { ApiResponse } from '../types/account';

export class AccountApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = 'AccountApiError';
  }
}

export async function accountApi<T>(url: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const response = await fetch(url, init);
  const data = (await response.json().catch(() => ({}))) as ApiResponse<T>;
  if (!response.ok || !data.status) {
    const validationMessages = data.errors
      ?.map((error) => error.message)
      .filter(Boolean)
      .join(', ');
    throw new AccountApiError(
      validationMessages || data.message || `Request failed (${response.status})`,
      response.status
    );
  }
  return data;
}
