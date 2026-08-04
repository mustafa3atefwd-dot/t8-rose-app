'use client';

import { useQuery } from '@tanstack/react-query';
import { AddressesResponse } from '../lib/types';
import { ADDRESSES_QUERY_KEY } from '../lib/constants';

export function useAddresses() {
  return useQuery<AddressesResponse>({
    queryKey: ADDRESSES_QUERY_KEY,
    queryFn: async () => {
      const response = await fetch('/api/addresses');

      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }

      return response.json();
    },
  });
}
