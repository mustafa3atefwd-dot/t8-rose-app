import { useQuery } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';
import { IAddressesResponse } from '@/features/checkout/lib/types';

export function useUserAddresses() {
  return useQuery({
    queryKey: ['user-addresses'],
    queryFn: async () => {
      const res = await fetch('/api/addresses');

      const data: IAddressesResponse = await res.json();

      if (!res.ok || !data.status) {
        throw new ApiError(res.status, String(data.message));
      }

      return data.payload?.addresses;
    },
  });
}
