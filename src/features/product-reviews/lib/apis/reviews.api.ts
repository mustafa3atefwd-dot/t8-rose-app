import { apiRequest } from "@/shared/lib/utils/request.util";
import type { ReviewsResponse } from "../types/product-reviews";
import { BACKEND_URL } from "@/shared/lib/constants/api.constant";
import { ProductResponse } from "../types/product";


export async function getProductRating(
  productId: string
): Promise<ProductResponse> {
  return apiRequest<ProductResponse>(
    `${BACKEND_URL}/products/${productId}`,
  );
}


export async function getReviews(
  productId: string,
  page: number,
  limit: number,
): Promise<ReviewsResponse> {
  return apiRequest<ReviewsResponse>(
    `${BACKEND_URL}/reviews?productId=${productId}&page=${page}&limit=${limit}`,
  );
}