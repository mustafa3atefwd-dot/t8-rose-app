import { NextRequest, NextResponse } from 'next/server';
import { deleteAddress, updateAddress } from '@/features/checkout/lib/actions/addresses.action';

type AddressRouteContext = {
  params: Promise<{
    addressId: string;
  }>;
};

export async function PATCH(request: NextRequest, { params }: AddressRouteContext) {
  const { addressId } = await params;
  const body = await request.json();
  const data = await updateAddress(addressId, body);
  return NextResponse.json(data);
}

export async function DELETE(_request: NextRequest, { params }: AddressRouteContext) {
  const { addressId } = await params;
  const data = await deleteAddress(addressId);
  return NextResponse.json(data);
}
