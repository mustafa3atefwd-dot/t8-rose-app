'use client';

import { WishlistErrorState } from '@/features/wishlist';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <WishlistErrorState retry={reset} />;
}
