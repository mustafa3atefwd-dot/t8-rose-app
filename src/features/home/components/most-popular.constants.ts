export const OCCASION_FILTERS = ['Wedding', 'Anniversary', 'Birthday', 'Engagement'] as const;

export type OccasionFilter = (typeof OCCASION_FILTERS)[number];

export const MOST_POPULAR_PRODUCTS_LIMIT = 12; // 4 cols x 3 rows
