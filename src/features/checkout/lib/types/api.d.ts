import { IApiResponse } from '@/shared/lib/types/api';

export interface IAddressPayload {
  address: IAddress;
}

export type IAddressResponse = IApiResponse<IAddressPayload>;

export interface IAddressesPayload {
  addresses: IAddress[];
}

export type IAddressesResponse = IApiResponse<IAddressesPayload>;

export interface CreateAddressPayload {
  title: string;
  city: string;
  street: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export type UpdateAddressPayload = Partial<CreateAddressPayload>;
