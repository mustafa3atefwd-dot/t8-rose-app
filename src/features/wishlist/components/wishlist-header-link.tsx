'use client';

import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import HeaderBadge from '@/shared/components/header-badge';
import { useWishlistPage } from '../context/wishlist-provider';

export function WishlistHeaderLink() {
  const t = useTranslations('home.header');
  const { count } = useWishlistPage();

  return (
    <Link
      href="/wishlist"
      aria-label={t('favorite')}
      className="relative inline-flex size-6 items-center justify-center"
    >
      <Heart aria-hidden="true" />
      {count > 0 ? <HeaderBadge count={count} /> : null}
    </Link>
  );
}
