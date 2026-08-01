'use client';

import { useTranslations } from 'next-intl';
import { Loader2, Send, Star } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { useProductReviewForm } from '@/features/product-details/hooks';
import { FormError, FormField, Rating } from '@/shared/components';
import { Button } from '@/shared/components/ui/button';
import { FieldError } from '@/shared/components/ui/field';
import { useSession } from 'next-auth/react';
import { cn } from '@/shared/lib/utils';

interface IProductReviewFormProps {
  productId: string;
}

function ProductReviewForm({ productId }: IProductReviewFormProps) {
  // Translations
  const t = useTranslations('productDetails');
  const tInput = useTranslations('input.placeholders');
  const tButton = useTranslations('button');

  const { status } = useSession();
  const isUnauthenticated = status === 'unauthenticated';

  // Handles form state, validation, and API request
  const { form, mutation, onSubmit } = useProductReviewForm({
    productId,
  });

  return (
    <section aria-labelledby="product-review-heading">
      <h2 id="product-review-heading" className="sr-only">
        {t('writeReview')}
      </h2>

      <div className="relative p-3">
        {/* Overlay */}
        {isUnauthenticated && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg backdrop-blur-[3px]">
            <p className="bg-ds-bg-cardpx-4 text-ds-text-plain py-2 text-center font-semibold">
              Please login to be able to review the product.
            </p>
          </div>
        )}

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(`space-y-3 transition`, isUnauthenticated ? 'opacity-80' : '')}
        >
          {/* Rating */}
          <Controller
            control={form.control}
            name="rating"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1">
                <div className="flex gap-2.5">
                  <p className="text-sm font-medium">{t('review.ratingLabel')}</p>

                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const rating = index + 1;
                      const isSelected = rating <= field.value;

                      return (
                        <button
                          key={rating}
                          type="button"
                          aria-label={t('review.ratingValue', { rating })}
                          aria-pressed={isSelected}
                          onClick={() => field.onChange(rating)}
                        >
                          <Star
                            className={`size-6 ${isSelected ? 'fill-[#FBA707] text-[#FBA707]' : 'text-[#FBA707]'}`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {fieldState.invalid && <FieldError id="rating-error" errors={[fieldState.error]} />}
              </div>
            )}
          />

          {/* Headline */}
          <FormField
            control={form.control}
            name="headline"
            label={t('review.headlineLabel')}
            placeholder={tInput('reviewHeadline')}
          />

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            variant="textarea"
            label={t('review.contentLabel')}
            placeholder={tInput('reviewContent')}
          />

          {mutation.isError && <FormError message={(mutation.error as Error).message} />}

          <Button
            type="submit"
            variant="secondary"
            className="bg-maroon-600 hover:bg-maroon-600/90 dark:bg-soft-pink-300 dark:hover:bg-soft-pink-400 w-full gap-2.5 text-white dark:text-zinc-800"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? tButton('loading') : tButton('addReview')}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ProductReviewForm;
