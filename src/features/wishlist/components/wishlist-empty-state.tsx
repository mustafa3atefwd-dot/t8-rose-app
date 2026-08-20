import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';

export function WishlistEmptyState() {
  const t = useTranslations('wishlist');

  return (
    <div className="border-ds-border-soft bg-ds-bg-plain flex min-h-80 flex-col items-center justify-center gap-5 rounded-2xl border p-8 text-center">
      <div className="bg-ds-bg-primary-fade text-ds-text-primary flex size-20 items-center justify-center rounded-full">
        <Heart className="size-9" aria-hidden="true" />
      </div>
      <div className="space-y-2">
        <h2 className="text-ds-text-plain text-xl font-semibold">{t('empty')}</h2>
        <p className="text-ds-text-muted">{t('emptyDescription')}</p>
      </div>
      <Button asChild>
        <Link href="/products">{t('browse')}</Link>
      </Button>
    </div>
  );
}
