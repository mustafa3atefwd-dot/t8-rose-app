'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddressResponse, CreateAddressPayload } from '../lib/types';
import { ADDRESSES_QUERY_KEY } from '../lib/constants';

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateAddressPayload): Promise<AddressResponse> => {
      const response = await fetch('/api/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        throw new Error(data.message || 'Failed to create address');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}
