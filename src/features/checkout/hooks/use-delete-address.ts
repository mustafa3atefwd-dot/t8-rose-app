'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAddress } from '@/features/checkout/lib/actions/addresses.action';
import { ADDRESSES_QUERY_KEY } from '@/features/checkout/lib/constants';

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}
