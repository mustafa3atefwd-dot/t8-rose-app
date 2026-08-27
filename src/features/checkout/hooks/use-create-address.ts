'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAddress } from '@/features/checkout/lib/actions/addresses.action';
import { ADDRESSES_QUERY_KEY } from '@/features/checkout/lib/constants';

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}
