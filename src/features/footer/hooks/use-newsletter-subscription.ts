'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { toast } from '@/shared/components/ui/toast';
import { subscribeToNewsletter } from '../lib/actions/newsletter.action';

interface UseNewsletterSubscriptionOptions {
  onSubscribed: () => void;
}

export function useNewsletterSubscription({ onSubscribed }: UseNewsletterSubscriptionOptions) {
  const t = useTranslations('footer');

  return useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: (result) => {
      if (result === 'already-subscribed') {
        toast.error(t('alreadySubscribed'));
        return;
      }

      toast.success(t('subscribeSuccess'));
      onSubscribed();
    },
    onError: () => {
      toast.error(t('subscribeError'));
    },
  });
}
