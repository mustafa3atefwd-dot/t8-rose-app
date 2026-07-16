'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/inputs';
import { toast } from '@/shared/components/ui/toast';
import { STATIC_NEWSLETTER_DELAY_MS } from './footer.constants';
import { createNewsletterSchema, type NewsletterFormValues } from './newsletter.schema';

function waitForStaticSubscription() {
  return new Promise((resolve) => window.setTimeout(resolve, STATIC_NEWSLETTER_DELAY_MS));
}

export function NewsletterForm() {
  const t = useTranslations('footer');
  const validation = useTranslations('validation');
  const [subscribedEmails, setSubscribedEmails] = useState<ReadonlySet<string>>(() => new Set());
  const schema = createNewsletterSchema({
    required: validation('emailRequired'),
    invalid: validation('invalidEmail'),
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  async function handleSubscribe(values: NewsletterFormValues) {
    await waitForStaticSubscription();

    const email = values.email.toLowerCase();

    if (subscribedEmails.has(email)) {
      toast.error(t('alreadySubscribed'));
      return;
    }

    setSubscribedEmails((currentEmails) => new Set(currentEmails).add(email));
    toast.success(t('subscribeSuccess'));
    setValue('email', '');
  }

  return (
    <form className="mt-4 w-full" noValidate onSubmit={handleSubmit(handleSubscribe)}>
      <div
        className="flex h-10 w-full items-center rounded-full bg-[#5B5B65] ps-1 transition-shadow focus-within:ring-2 focus-within:ring-[#F78DA7] dark:bg-[#27272A]"
        data-invalid={Boolean(errors.email)}
      >
        <Input
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
          placeholder={t('emailPlaceholder')}
          className="h-full flex-1 rounded-full border-0 bg-transparent px-3 text-sm text-white placeholder:text-[#A1A1AA] focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent"
          {...register('email')}
        />
        <Button
          type="submit"
          loading={isSubmitting}
          className="h-10 rounded-full bg-[#FCE7E7] px-5 text-[#7F1D1D] hover:bg-[#F9D6DA] dark:bg-[#F78DA7] dark:text-[#3F0B16] dark:hover:bg-[#F9A3B8]"
        >
          {t('subscribe')}
          {!isSubmitting ? <ArrowRight className="size-4 rtl:rotate-180" aria-hidden /> : null}
        </Button>
      </div>

      {errors.email?.message ? (
        <p id="newsletter-email-error" className="mt-2 text-sm text-[#FDA4AF]" role="alert">
          {errors.email.message}
        </p>
      ) : null}
    </form>
  );
}
