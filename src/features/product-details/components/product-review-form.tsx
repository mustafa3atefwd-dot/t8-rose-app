'use client';

import { useTranslations } from 'next-intl';
import { Loader2, Send, Star } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { useProductReviewForm } from '@/features/product-details/hooks';
import { FormError, FormField, Rating } from '@/shared/components';
import { Button } from '@/shared/components/ui/button';
import { FieldError } from '@/shared/components/ui/field';

interface IProductReviewFormProps {
  productId: string;
}

function ProductReviewForm({ productId }: IProductReviewFormProps) {
  // Translations
  const t = useTranslations('productDetails');
  const tInput = useTranslations('input.placeholders');
  const tButton = useTranslations('button');

  // Handles form state, validation, and API request
  const { form, mutation, onSubmit } = useProductReviewForm({
    productId,
  });

  return (
    <section aria-labelledby="product-review-heading" className="w-full">
      <h2 id="product-review-heading" className="sr-only">
        {t('writeReview')}
      </h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* ===== Headline ===== */}
        <FormField
          control={form.control}
          name="headline"
          label={t('review.headlineLabel')}
          placeholder={tInput('reviewHeadline')}
          required
        />

        {/* ===== Content ===== */}
        <FormField
          control={form.control}
          name="content"
          variant="textarea"
          label={t('review.contentLabel')}
          placeholder={tInput('reviewContent')}
        />

        {/* ===== Rating ===== */}
        <Controller
          control={form.control}
          name="rating"
          render={({ field, fieldState }) => (
            <div>
              <p className="mb-2 text-sm font-medium">{t('review.ratingLabel')}</p>

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
                        className={`mb-2 size-6 ${isSelected ? 'fill-[#FBA707] text-[#FBA707]' : 'text-[#FBA707]'}`}
                      />
                    </button>
                  );
                })}
              </div>

              {fieldState.invalid && <FieldError id={`${name}-error`} errors={[fieldState.error]} />}
            </div>
          )}
        />

        {/* ===== Error Feedback ===== */}
        {mutation.isError && <FormError message={(mutation.error as Error).message} />}

        {/* ===== Submit Button ===== */}
        <Button
          type="submit"
          variant="secondary"
          className="bg-maroon-600 hover:bg-maroon-600/90 dark:bg-soft-pink-300 dark:hover:bg-soft-pink-400 w-full gap-2.5 text-white dark:text-zinc-800"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              {tButton('loading')}
              <Loader2 className="size-4.5 animate-spin" />
            </>
          ) : (
            <>
              {tButton('submit')}
              <Send className="size-4.5" />
            </>
          )}
        </Button>
      </form>
    </section>
  );
}

export default ProductReviewForm;
