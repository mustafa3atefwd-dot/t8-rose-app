'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { reviewSchema } from '@/features/product-details/lib/schemas/product-review-form.schema';
import { IReviewSchema } from '@/features/product-details/lib/types/schemas';

interface IUseProductReviewFormProps {
  productId: string;
}

export function useProductReviewForm({ productId }: IUseProductReviewFormProps) {
  const t = useTranslations('');

  const schema = useMemo(() => reviewSchema(t), [t]);

  const form = useForm<IReviewSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      productId,
      headline: '',
      content: '',
      rating: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: IReviewSchema) => {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!data.status) {
        throw new Error(data.message);
      }

      return data;
    },
  });

  function onSubmit(values: IReviewSchema) {
    mutation.mutate(values);
  }

  return {
    form,
    mutation,
    onSubmit,
  };
}
