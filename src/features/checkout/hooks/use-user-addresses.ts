import { useQuery } from '@tanstack/react-query';
import { AddressesApiResponse } from '../lib/taypes/address.types';

export function useUserAddresses() {
  return useQuery({
    queryKey: ['user-addresses'],
    queryFn: async (): Promise<AddressesApiResponse> => {
      const res = await fetch('/api/addresses');

      if (!res.ok) {
        throw new Error('Failed to load addresses.');
      }

      return res.json();
    },
  });
}
