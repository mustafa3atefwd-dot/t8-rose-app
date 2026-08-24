import { apiRequest } from "@/shared/lib/utils/request.util";
import { ProductMutationInput, ProductMutationResponse } from "../lib/types";


const jsonHeaders = { 'Content-Type': 'application/json' };

export function createProduct(input: ProductMutationInput) {
  return apiRequest<ProductMutationResponse>('/api/products', {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(input),
  });
}

export function updateProduct(id: string, input: Partial<ProductMutationInput>) {
  return apiRequest<ProductMutationResponse>(`/api/products/${id}`, {
    method: 'PATCH',
    headers: jsonHeaders,
    body: JSON.stringify(input),
  });
}