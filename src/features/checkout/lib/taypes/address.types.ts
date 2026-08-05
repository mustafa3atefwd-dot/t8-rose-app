export interface Address {
  id: string;
  title: string;
  street: string;
  city: string;
  phone: string;
  isPrimary?: boolean;
  latitude?: string | number;
  longitude?: string | number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddressesApiResponse {
  status: boolean;
  code: number;
  message?: string;
  payload: {
    addresses: Address[];
  };
}