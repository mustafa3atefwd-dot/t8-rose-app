import { useState } from 'react';
import { NumberInput } from '@/shared/components/ui/inputs';
import { PRODUCT_PRICE_MAX, PRODUCT_PRICE_MIN } from '../../lib/constants/product.constant';

interface PriceRangeFilterProps {
  minPrice?: number;
  maxPrice?: number;
  fromLabel: string;
  toLabel: string;
  onCommit: (minPrice?: number, maxPrice?: number) => void;
}

/** Parent remounts this (via a `key` tied to minPrice/maxPrice) whenever the
 * filter changes externally — e.g. Reset All — so local drafts never need to
 * be synced back from props with an effect. */
const PriceRangeFilter = ({ minPrice, maxPrice, fromLabel, toLabel, onCommit }: PriceRangeFilterProps) => {
  const [from, setFrom] = useState<number | ''>(minPrice ?? '');
  const [to, setTo] = useState<number | ''>(maxPrice ?? '');

  const commit = () => onCommit(from === '' ? undefined : from, to === '' ? undefined : to);

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-1">
        <label className="text-ds-text-plain text-sm">{fromLabel}</label>
        <NumberInput
          value={from}
          min={PRODUCT_PRICE_MIN}
          max={PRODUCT_PRICE_MAX}
          placeholder={String(PRODUCT_PRICE_MIN)}
          className="h-12 rounded-xl"
          onValueChange={(value) => setFrom(value ?? '')}
          onBlur={commit}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-ds-text-plain text-sm">{toLabel}</label>
        <NumberInput
          value={to}
          min={PRODUCT_PRICE_MIN}
          max={PRODUCT_PRICE_MAX}
          placeholder={String(PRODUCT_PRICE_MAX)}
          className="h-12 rounded-xl"
          onValueChange={(value) => setTo(value ?? '')}
          onBlur={commit}
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
