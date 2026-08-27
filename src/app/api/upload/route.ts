import { NextRequest, NextResponse } from 'next/server';

import { BACKEND_URL } from '@/shared/lib/constants/api.constant';
import { getNextAuthToken } from '@/shared/lib/utils/get-token.util';

export async function POST(request: NextRequest) {
  try {
    const token = await getNextAuthToken();
    if (!token) {
      return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 401 });
    }

    const contentType = request.headers.get('content-type');
    if (!contentType?.startsWith('multipart/form-data')) {
      return NextResponse.json({ status: false, message: 'A multipart image file is required' }, { status: 400 });
    }

    const incoming = await request.clone().formData();
    const image = incoming.get('image');
    if (!(image instanceof File)) {
      return NextResponse.json({ status: false, message: 'The multipart field "image" is required' }, { status: 400 });
    }

    // Preserve the browser-generated multipart boundary and bytes exactly.
    const body = await request.arrayBuffer();

    const response = await fetch(`${BACKEND_URL}/upload`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': contentType,
      },
      body,
    });

    const text = await response.text();
    return new NextResponse(text || null, {
      status: response.status,
      headers: { 'Content-Type': response.headers.get('content-type') || 'application/json' },
    });
  } catch (error) {
    console.error('Upload API proxy failed:', error);
    return NextResponse.json({ status: false, message: 'Unable to upload the image' }, { status: 502 });
  }
}
