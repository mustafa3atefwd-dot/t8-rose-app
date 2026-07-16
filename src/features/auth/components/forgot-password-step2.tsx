import { ChevronLeft } from 'lucide-react';
import { ForgotPasswordStep2Props } from '../lib/types/forgot-password';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function ForgotPasswordStep2({ email, onBack }: ForgotPasswordStep2Props) {
  const t = useTranslations();
  return (
    <section className="w-full max-w-101.5 rtl:max-w-md">
      {/* header */}
      <header className="border-ds-border-muted mb-6 space-y-2.5 border-b pb-4">
        {/* back to forgot password step 1 */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            aria-label={t('forgotPw.step2.back')}
            className="rounded-ds-lg bg-ds-bg-primary flex size-7.5 cursor-pointer items-center justify-center"
          >
            <ChevronLeft className="text-ds-text-inverse rtl:rotate-180" />
          </button>
          <h3 className="text-ds-text-plain text-2xl font-semibold">{t('forgotPw.step2.title')}</h3>
        </div>
        <p className="text-ds-text-plain">
          {t('forgotPw.step2.subtitle')} <br />
          <span className="text-ds-text-info">{email || 'user@example.com'}</span>
        </p>
      </header>
      {/* instructions */}
      <div className="mb-9 space-y-4">
        <p className="text-ds-text-plain">{t('forgotPw.step2.paragraph1')}</p>
        <p className="text-ds-text-default">{t('forgotPw.step2.paragraph2')}</p>
      </div>
      {/* go to contact */}
      <div className="border-ds-border-muted border-t pt-5 text-center text-sm">
        <span className="text-ds-text-plain font-medium">{t('forgotPw.step3.contact')}</span>
        <Link href={'/'} className="text-maroon-700 dark:text-soft-pink-300 font-bold">
          {' '}
          {t('forgotPw.step3.toContact')}
        </Link>
      </div>
    </section>
  );
}
