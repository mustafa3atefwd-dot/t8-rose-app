import { useQuery } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';
import { IAddressesResponse } from '@/features/checkout/lib/types';
import { ADDRESSES_QUERY_KEY } from '../lib/constants';

export function useUserAddresses() {
  return useQuery({
    queryKey: ADDRESSES_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch('/api/addresses');

      const data: IAddressesResponse = await res.json();

      if (!res.ok || !data.status) {
        throw new ApiError(res.status, String(data.message));
      }

      return data;
    },
  });
}
