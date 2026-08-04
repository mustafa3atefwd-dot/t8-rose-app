'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddressResponse, UpdateAddressPayload } from '../lib/types';
import { ADDRESSES_QUERY_KEY } from '../lib/constants';

interface IUpdateAddressVariables {
  id: string;
  payload: UpdateAddressPayload;
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: IUpdateAddressVariables): Promise<AddressResponse> => {
      const response = await fetch(`/api/addresses/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : null;

      if (!response.ok || !data?.status) {
        throw new Error(data?.message || response.statusText || 'Failed to update address');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}
