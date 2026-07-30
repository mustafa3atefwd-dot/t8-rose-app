export const PRODUCT_SORT_FIELDS = ['price', 'rating', 'createdAt', 'title', 'bestSelling', 'mostPopular'] as const;

export type ProductSortBy = (typeof PRODUCT_SORT_FIELDS)[number];

export const SORT_ORDERS = ['asc', 'desc'] as const;

export type SortOrder = (typeof SORT_ORDERS)[number];
<<<<<<< HEAD
=======

export const PRODUCT_PRICE_MIN = 0;
export const PRODUCT_PRICE_MAX = 1_000_000;
export const PRODUCT_MAX_RATING = 5;
export const PRODUCTS_PAGE_SIZE = 12;
>>>>>>> sprint/products-page
