'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAddress } from '../lib/actions';
import { ADDRESSES_QUERY_KEY } from '../lib/constants';

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}
