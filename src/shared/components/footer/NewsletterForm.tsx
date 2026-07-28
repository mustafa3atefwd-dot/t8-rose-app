'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/inputs';
import { createNewsletterSchema, type NewsletterFormValues } from './newsletter.schema';
import { useNewsletterSubscription } from './use-newsletter-subscription';

export function NewsletterForm() {
  const t = useTranslations('footer');
  const validation = useTranslations('validation');
  const schema = createNewsletterSchema({
    required: validation('emailRequired'),
    invalid: validation('invalidEmail'),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const subscription = useNewsletterSubscription({
    onSubscribed: () => setValue('email', ''),
  });

  function handleSubscribe(values: NewsletterFormValues) {
    subscription.mutate(values.email.toLowerCase());
  }

  return (
    <form className="mt-4 w-full" noValidate onSubmit={handleSubmit(handleSubscribe)}>
      <div
        className="bg-ds-bg-default focus-within:ring-ds-ring data-[invalid=true]:border-ds-border-danger data-[invalid=true]:ring-ds-ring-danger data-[invalid=true]:focus-within:border-ds-border-danger data-[invalid=true]:focus-within:ring-ds-ring-danger dark:bg-ds-bg-subtle flex h-10 w-full items-center rounded-full border border-transparent ps-1 transition-shadow focus-within:ring-2 data-[invalid=true]:ring-2"
        data-invalid={Boolean(errors.email)}
      >
        <Input
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
          placeholder={t('emailPlaceholder')}
          className="text-ds-text-inverse placeholder:text-ds-text-muted dark:text-ds-text-plain h-full flex-1 rounded-full border-0 bg-transparent px-3 text-sm focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent"
          {...register('email')}
        />
        <Button
          type="submit"
          loading={subscription.isPending}
          className="bg-ds-bg-primary-fade text-ds-text-primary hover:bg-ds-bg-primary-faint dark:bg-ds-bg-primary dark:text-ds-text-inverse dark:hover:bg-ds-bg-primary-saturated h-10 rounded-full px-5"
        >
          {t('subscribe')}
          {!subscription.isPending ? <ArrowRight className="size-4 rtl:rotate-180" aria-hidden /> : null}
        </Button>
      </div>

      {errors.email?.message ? (
        <p id="newsletter-email-error" className="text-ds-text-danger mt-2 text-sm" role="alert">
          {errors.email.message}
        </p>
      ) : null}
    </form>
  );
}
