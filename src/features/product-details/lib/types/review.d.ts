import { IDocumentFields } from '@/shared/lib/types/base';

export interface IReviewUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface IReviewProduct {
  id: string;
  title: string;
}

export interface IReviewData extends IDocumentFields {
  id: string;
  userId: string;
  productId: string;
  headline: string;
  content: string;
  rating: number;
  user: IReviewUser;
  product: IReviewProduct;
}

export interface IReview {
  review: IReviewData;
}
