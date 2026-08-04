'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddressResponse } from '../lib/types';
import { ADDRESSES_QUERY_KEY } from '../lib/constants';

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addressId: string): Promise<AddressResponse> => {
      const response = await fetch(`/api/addresses/${addressId}`, {
        method: 'DELETE',
      });

      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : null;

      if (!response.ok || !data?.status) {
        throw new Error(data?.message || response.statusText || 'Failed to delete address');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}
