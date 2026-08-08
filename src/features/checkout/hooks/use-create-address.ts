'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAddress } from '../lib/actions';
import { ADDRESSES_QUERY_KEY } from '../lib/constants';

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}
