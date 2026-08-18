'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TicketPercent } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { IApiResponse } from '@/shared/lib/types/api';
import { IPaginatedCoupons } from '@/features/coupons/lib/types/coupons';

const fetchCoupon = async (code: string) => {
  const response = await fetch(`/api/coupons?search=${encodeURIComponent(code)}`);

  if (!response.ok) {
    throw new Error('Failed to look up coupon');
  }

  return (await response.json()) as IApiResponse<IPaginatedCoupons>;
};

export default function CouponField() {
  const t = useTranslations('cart');
  const [code, setCode] = useState('');
  // The code the user actually submitted, which is what keys the lookup — typing
  // alone must not fire a request per keystroke.
  const [submittedCode, setSubmittedCode] = useState('');

  const { data, isFetching, isError } = useQuery({
    queryKey: ['coupon', submittedCode],
    queryFn: () => fetchCoupon(submittedCode),
    enabled: Boolean(submittedCode),
  });

  const matchedCoupons = data?.status ? (data.payload?.data ?? []) : [];
  const appliedCoupon = matchedCoupons.at(0) ?? null;

  const handleApply = () => {
    const trimmedCode = code.trim();
    if (trimmedCode) setSubmittedCode(trimmedCode);
  };

  const handleRemove = () => {
    setCode('');
    setSubmittedCode('');
  };

  const statusMessage = () => {
    if (!submittedCode) return t('noCouponApplied');
    if (isFetching) return t('checkingCoupon');
    if (isError) return t('couponLookupFailed');
    return appliedCoupon ? t('couponApplied') : t('invalidCoupon');
  };

  return (
    <div className="flex w-full flex-col gap-2.5 p-4">
      <div className="flex flex-wrap items-center gap-2.5">
        <label className="sr-only" htmlFor="coupon-code">
          {t('couponPlaceholder')}
        </label>
        <input
          id="coupon-code"
          type="text"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && handleApply()}
          placeholder={t('couponPlaceholder')}
          className="border-ds-border-soft rounded-ds-xl h-12 min-w-0 flex-1 border p-4"
        />

        <button
          type="button"
          onClick={handleApply}
          disabled={!code.trim() || isFetching}
          className="bg-maroon-600 rounded-ds-xl flex h-12 cursor-pointer items-center gap-2.5 px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <TicketPercent className="h-6 w-6" aria-hidden />
          <span>{t('applyCoupon')}</span>
        </button>
      </div>

      <div className="border-ds-border-soft rounded-ds-base flex min-h-16 items-center justify-center border p-2.5">
        {appliedCoupon ? (
          <div className="flex w-full items-center justify-between gap-2.5">
            <p className="font-medium">{appliedCoupon.code}</p>
            <button type="button" className="cursor-pointer text-red-500" onClick={handleRemove}>
              {t('removeCoupon')}
            </button>
          </div>
        ) : (
          <p className="text-ds-text-muted text-base">{statusMessage()}</p>
        )}
      </div>
    </div>
  );
}
