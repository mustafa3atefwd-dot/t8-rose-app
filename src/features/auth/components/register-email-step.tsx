import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction } from 'react';
import { Loader2, MoveRight } from 'lucide-react';
import { useRegisterEmailStep } from '@/features/auth/hooks';
import { RegisterStep } from '@/features/auth/lib/types/auth';
import { FormError, FormField } from '@/shared/components';
import { Button } from '@/shared/components/ui/button';

interface IRegisterEmailStepProps {
  setStep: Dispatch<SetStateAction<RegisterStep>>;
  setEmail: Dispatch<SetStateAction<string>>;
}

function RegisterEmailStep({ setStep, setEmail }: IRegisterEmailStepProps) {
  // Translations
  const t = useTranslations('auth');
  const tInput = useTranslations('input.placeholders');
  const tButton = useTranslations('button');

  // Handles form state, validation, and API request
  const { form, mutation, onSubmit } = useRegisterEmailStep({
    setStep,
    setEmail,
  });

  return (
    <section aria-labelledby="register-email-heading" className="w-full max-w-101.5">
      <h2 id="register-email-heading" className="sr-only">
        {t('registerEmail')}
      </h2>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Email input */}
        <FormField
          control={form.control}
          name="email"
          type="email"
          label={t('emailLabel')}
          placeholder={tInput('email')}
        />

        {/* ===== Error Feedback ===== */}
        {mutation.isError && <FormError message={(mutation.error as Error).message} />}

        {/* ===== Next Button ===== */}
        <Button
          type="submit"
          variant="secondary"
          className="bg-maroon-600 hover:bg-maroon-600/90 dark:bg-soft-pink-300 dark:hover:bg-soft-pink-400 my-9 w-full gap-2.5 text-white dark:text-zinc-800"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              {tButton('loading')} <Loader2 className="size-4.5 animate-spin rtl:rotate-180" />
            </>
          ) : (
            <>
              {tButton('next')} <MoveRight className="size-4.5 rtl:rotate-180" />
            </>
          )}
        </Button>
      </form>

      {/* ===== Secondary Action (Login Redirect) ===== */}
      <div className="mx-auto mt-5 w-fit text-sm font-medium text-zinc-800 dark:text-zinc-50">
        {t('alreadyHaveAccount')}{' '}
        <Link
          href="/login"
          className="text-maroon-700 hover:text-maroon-700/90 dark:text-soft-pink-300 dark:hover:text-soft-pink-300/90 text-base font-medium"
        >
          {t('login')}
        </Link>
      </div>
    </section>
  );
}

export default RegisterEmailStep;
