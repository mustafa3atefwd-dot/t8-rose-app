import type { IApiResponse } from '@/shared/lib/types/api';
import type { IDocumentFields } from '@/shared/lib/types/base';

export interface IAddress extends IDocumentFields {
  id: string;
  title: string;
  street: string;
  city: string;
  phone: string;
  isPrimary?: boolean;
  latitude?: string | number;
  longitude?: string | number;
}

export interface IAddressesPayload {
  addresses: IAddress[];
}

export type IAddressesResponse = IApiResponse<IAddressesPayload>;
