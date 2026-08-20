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
      className="hover:bg-ds-bg-muted relative inline-flex size-9 items-center justify-center rounded-lg transition-colors"
    >
      <Heart aria-hidden="true" className="size-5" />
      {count > 0 ? <HeaderBadge count={count} /> : null}
    </Link>
  );
}
