'use client';

import { useQuery } from '@tanstack/react-query';
import { occasionKeys } from '../lib/constants/query-keys.constant';
import { IApiResponse } from '@/shared/lib/types/api';
import { IPaginatedOccasions } from '../lib/types/occasion';

/** Occasions are reference data that changes rarely, so cache it for the whole session. */
export function useOccasions() {
  return useQuery({
    queryKey: occasionKeys.list(),
    queryFn: async () => {
      const response = await fetch(`/api/occasions?limit=100`);
      const data: IApiResponse<IPaginatedOccasions> = await response.json();

      if (!data.status) throw new Error(data.message);
      return data.payload;
    },
    staleTime: Infinity,
  });
}
