'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductRating } from '../lib/apis/reviews.api';

export function useProductRating(productId: string) {
  return useQuery({
    queryKey: ['productRating', productId],
    queryFn: () => getProductRating(productId),
  });
}
