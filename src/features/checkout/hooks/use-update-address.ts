'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAddress } from '../lib/actions';
import { UpdateAddressPayload } from '../lib/types';
import { ADDRESSES_QUERY_KEY } from '../lib/constants';

interface IUpdateAddressVariables {
  id: string;
  payload: UpdateAddressPayload;
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: IUpdateAddressVariables) => updateAddress(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}
