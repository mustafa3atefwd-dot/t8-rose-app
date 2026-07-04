import "server-only";

import { emailStepSchema } from "../schemas/email-step.schema";
import { apiRequest } from "@/src/shared/lib/utils/request.util";
import { BACKEND_URL } from "@/src/shared/lib/constants/api.constant";
import { IApiResponse } from "@/src/shared/lib/types/api";
import { IOtpStepSchema, IUserInfoStepSchema } from "../types/schemas";

/**
 * Sends email verification for signup flow.
 */
export const sendEmailStepAction = async (email: string) => {
  const parsedEmail = emailStepSchema.parse({ email });

  return apiRequest<IApiResponse>(
    `${BACKEND_URL}/auth/send-email-verification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedEmail),
    },
  );
};

/**
 * Confirms OTP code sent to user's email.
 */
export const confirmOtpStepAction = async (payload: IOtpStepSchema) => {
  return apiRequest<IApiResponse>(
    `${BACKEND_URL}/auth/confirm-email-verification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );
};

/**
 * Final registration step after email verification.
 */
export const userInfoStepAction = async (payload: IUserInfoStepSchema) => {
  return await apiRequest<IApiResponse>(`${BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};