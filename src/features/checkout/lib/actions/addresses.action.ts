'use server';

import { BACKEND_URL } from '@/shared/lib/constants/api.constant';
import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';
import { apiRequest } from '@/shared/lib/utils/request.util';
import { AddressResponse, AddressesResponse, CreateAddressPayload, UpdateAddressPayload } from '../types';

async function getAccessToken() {
  const token = await getNextAuthToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  return token;
}

// Get the current user's saved addresses
export async function getAddresses(): Promise<AddressesResponse> {
  const token = await getAccessToken();
  return apiRequest<AddressesResponse>(`${BACKEND_URL}/addresses`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
}

// Create a new address
export async function createAddress(payload: CreateAddressPayload): Promise<AddressResponse> {
  const token = await getAccessToken();
  return apiRequest<AddressResponse>(`${BACKEND_URL}/addresses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

// Update an existing address
export async function updateAddress(addressId: string, payload: UpdateAddressPayload): Promise<AddressResponse> {
  const token = await getAccessToken();
  return apiRequest<AddressResponse>(`${BACKEND_URL}/addresses/${addressId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

// Delete an address
export async function deleteAddress(addressId: string): Promise<AddressResponse> {
  const token = await getAccessToken();
  return apiRequest<AddressResponse>(`${BACKEND_URL}/addresses/${addressId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
