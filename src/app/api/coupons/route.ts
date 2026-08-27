import { NextRequest, NextResponse } from 'next/server';
import { getCoupons } from '@/features/coupons/lib/services/coupons.service';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search')?.trim();

  if (!search) {
    return NextResponse.json({ message: 'A coupon code is required' }, { status: 400 });
  }

  try {
    const data = await getCoupons({ search, isActive: true });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to look up coupon' },
      { status: 500 }
    );
  }
}
