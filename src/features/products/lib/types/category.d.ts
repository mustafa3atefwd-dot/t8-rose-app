import { IDocumentFields } from '@/shared/lib/types/base';
import { IPaginationMeta } from './product';

export interface ISubCategorySummary {
  id: string;
  title: string;
}

export interface ICategoryCount {
  products: number;
}

export interface ICategory extends IDocumentFields {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  immutable: boolean;
  subCategories: ISubCategorySummary[];
  _count: ICategoryCount;
}

export interface ICategoriesQueryParams {
  page?: number;
  limit?: number;
}

export interface IPaginatedCategories {
  data: ICategory[];
  metadata: IPaginationMeta;
}
