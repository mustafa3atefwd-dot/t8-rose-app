export const PRODUCT_SORT_FIELDS = ['price', 'rating', 'createdAt', 'title', 'bestSelling'] as const;

export type ProductSortBy = (typeof PRODUCT_SORT_FIELDS)[number];

export const SORT_ORDERS = ['asc', 'desc'] as const;

export type SortOrder = (typeof SORT_ORDERS)[number];
