export interface Address {
  id: string;
  userId: string;
  title: string;
  isPrimary: boolean;
  city: string;
  street: string;
  phone: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddressResponse {
  status: boolean;
  code: number;
  payload: {
    address: Address;
  };
}

export interface AddressesResponse {
  status: boolean;
  code: number;
  payload: {
    addresses: Address[];
  };
}

export interface CreateAddressPayload {
  title: string;
  city: string;
  street: string;
  phone: string;
  latitude: string;
  longitude: string;
}

export type UpdateAddressPayload = Partial<CreateAddressPayload>;
