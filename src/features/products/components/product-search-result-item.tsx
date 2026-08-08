import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import FormatPrice from '../hooks/format-price';
import { getDiscountedPrice } from '../lib/utils';
import type { IProduct } from '../lib/types';

interface ProductSearchResultItemProps {
  product: IProduct;
  onSelect?: () => void;
}

export function ProductSearchResultItem({ product, onSelect }: ProductSearchResultItemProps) {
  const discountedPrice = getDiscountedPrice(product);

  return (
    <Link
      href={`/products/${product.id}`}
      onClick={onSelect}
      className="hover:bg-ds-bg-muted flex items-center gap-3 rounded-lg p-2 transition-colors"
    >
      <div className="bg-ds-bg-muted relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
        {product.cover && <Image src={product.cover} alt={product.title} fill unoptimized className="object-cover" />}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-ds-text-plain line-clamp-1 text-sm font-medium">{product.title}</span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-ds-text-primary text-sm font-semibold">
            {FormatPrice(Number(discountedPrice ?? product.price))} EGP
          </span>
          {discountedPrice !== null && (
            <span className="text-ds-text-muted text-xs line-through">{FormatPrice(Number(product.price))}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
