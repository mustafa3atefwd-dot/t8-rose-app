'use server';

import { BACKEND_URL } from '@/shared/lib/constants';
import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';
import { apiRequest } from '@/shared/lib/utils/request.util';
import type { ISuccessResponse } from '@/shared/lib/types/api';
import type { IUser } from '@/shared/lib/types/user';
import type { ConfirmEmailPayload, UpdateProfilePayload, UpdateProfileResult } from '../types/account';

async function getAccountAccessToken() {
  const token = await getNextAuthToken();
  if (!token) throw new Error('Unauthorized');
  return token;
}

function jsonHeaders(token: string) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

function buildProfileRequestBody(profile: Omit<UpdateProfilePayload, 'originalEmail'>) {
  return Object.fromEntries(
    Object.entries({
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      phone: profile.phone.trim(),
      gender: profile.gender || undefined,
      photo: profile.photo || undefined,
    }).filter(([, value]) => value !== undefined && value !== '')
  );
}

export async function updateProfileAction(payload: UpdateProfilePayload): Promise<UpdateProfileResult> {
  const token = await getAccountAccessToken();
  const { originalEmail, ...profile } = payload;

  const response = await apiRequest<ISuccessResponse<{ user: IUser }>>(`${BACKEND_URL}/users/profile`, {
    method: 'PATCH',
    headers: jsonHeaders(token),
    body: JSON.stringify(buildProfileRequestBody(profile)),
  });

  const user = response.payload?.user;
  if (!user) throw new Error('Profile update failed');

  const emailChangePending = profile.email.trim() !== originalEmail;

  if (emailChangePending) {
    await apiRequest(`${BACKEND_URL}/users/email/request`, {
      method: 'POST',
      headers: jsonHeaders(token),
      body: JSON.stringify({ email: profile.email.trim() }),
    });
  }

  return { user, emailChangePending };
}

export async function confirmEmailAction(payload: ConfirmEmailPayload): Promise<void> {
  const token = await getAccountAccessToken();

  await apiRequest(`${BACKEND_URL}/users/email/confirm`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify({ email: payload.email.trim(), code: payload.code.trim() }),
  });
}

export async function deleteAccountAction(): Promise<void> {
  const token = await getAccountAccessToken();

  await apiRequest(`${BACKEND_URL}/users/account`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}
