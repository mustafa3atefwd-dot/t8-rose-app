export interface ReviewsResponse {
  status: boolean;
  code: number;
  payload: {
    data: Review[];
    metadata: PaginationMetadata;
  };
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  headline: string;
  content: string;
  rating: number;
  createdAt: string; 
  updatedAt: string; 
  user: ReviewUser;
  product: ReviewProduct;
}

export interface ReviewUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface ReviewProduct {
  id: string;
  title: string;
}

export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}