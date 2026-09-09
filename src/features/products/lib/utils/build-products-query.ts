import type { IProductsQueryParams } from '../types/product';

/**
 * Serializes product filters into the backend's query-string shape. Shared by
 * the client API layer and the server action so a filter behaves identically
 * whichever side issues the request.
 */
export const buildProductsQuery = (params?: IProductsQueryParams) => {
  const query = new URLSearchParams();

  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  if (params?.categoryId) query.set('categoryId', params.categoryId);
  if (params?.subCategoryId) query.set('subCategoryId', params.subCategoryId);
  if (params?.occasionId) query.set('occasionId', params.occasionId);
  if (params?.minPrice != null) query.set('minPrice', String(params.minPrice));
  if (params?.maxPrice != null) query.set('maxPrice', String(params.maxPrice));
  if (params?.minRating != null) query.set('minRating', String(params.minRating));
  if (params?.sortBy) query.set('sortBy', params.sortBy);
  if (params?.sortOrder) query.set('sortOrder', params.sortOrder);
  if (params?.search) query.set('search', params.search);

  return query.toString();
};
