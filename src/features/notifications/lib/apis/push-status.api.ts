'use server';
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { getNextAuthToken } from "@/shared/lib/utils/get-token.util";
import { apiRequest } from "@/shared/lib/utils/request.util";
import { IPushStatusResponse } from "../types/push-status";

async function getAccessToken() {
  const token = await getNextAuthToken();
  if (!token) {
    throw new Error("Unauthorized");
  }
  return token;
}

// get push status
export async function getPushStatus(): Promise<IPushStatusResponse> {
  const token = await getAccessToken();
  return apiRequest<IPushStatusResponse>(`${BACKEND_URL}/notifications/push-status`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  });
}