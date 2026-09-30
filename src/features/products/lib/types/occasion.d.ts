import { IDocumentFields } from '@/shared/lib/types/base';
import { IPaginationMeta } from './product';

export interface IOccasion extends IDocumentFields {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  immutable: boolean;
}

export interface IOccasionsQueryParams {
  page?: number;
  limit?: number;
}

export interface IPaginatedOccasions {
  data: IOccasion[];
  metadata: IPaginationMeta;
}
