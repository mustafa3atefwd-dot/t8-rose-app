import { apiRequest } from '@/shared/lib/utils/request.util';
import type { ReviewsResponse } from '../types/product-reviews';
import { BACKEND_URL } from '@/shared/lib/constants/api.constant';

// get users  reviews
export async function getReviews(productId: string, page: number, limit: number): Promise<ReviewsResponse> {
  return apiRequest<ReviewsResponse>(`${BACKEND_URL}/reviews?productId=${productId}&page=${page}&limit=${limit}`);
}
