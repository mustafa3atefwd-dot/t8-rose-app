import { IProductsQueryParams } from '../types/product';
import { IOccasionsQueryParams } from '../types/occasion';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params?: IProductsQueryParams) => [...productKeys.lists(), params ?? {}] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

export const occasionKeys = {
  all: ['occasions'] as const,
  lists: () => [...occasionKeys.all, 'list'] as const,
  list: (params?: IOccasionsQueryParams) => [...occasionKeys.lists(), params ?? {}] as const,
};
