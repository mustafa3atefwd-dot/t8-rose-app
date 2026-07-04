'use client';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldError } from '@/shared/components/ui/field';
import { Input, InputField } from '@/shared/components/ui/inputs';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordStep1Schema, TForgotPasswordStep1Schema } from '../lib/schemas/forgot-password.schema';
import { MoveRight } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Link } from '@/i18n/navigation';
import { ForgotPasswordStep1Props } from '../lib/types/forgot-password.type';
import { forgetPasswordStep1 } from '../lib/actions/forgot-password.action';
import { toast } from '@/shared/components/ui/toast';
export default function ForgotPasswordStep1({onNext, setEmail}: ForgotPasswordStep1Props) {
  const t = useTranslations();
  const form = useForm<TForgotPasswordStep1Schema>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordStep1Schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const {handleSubmit, register, formState: {isSubmitting, isValid, errors}} = form;
  async function handleForgotPassword(values:TForgotPasswordStep1Schema){
    try {
        await forgetPasswordStep1(values);
        setEmail(values.email);
    onNext();
    } catch (error) {
        toast.error(t('toast.error'));
    }
  }
  return (
    <>
    {/* forgot password form */}
    <div className='w-full max-w-101.5'>
            {/* header */}
      <header className="text-text-plain border-b border-ds-border-muted pb-4">
        <h3 className="text-2xl font-semibold">{t('forgotPw.step1.title')}</h3>
        <p>{t('forgotPw.step1.subtitle')}</p>
      </header>
      <form className='mt-6' onSubmit={handleSubmit(handleForgotPassword)}>
      <Field data-invalid={!!errors.email}>
  <InputField
    label={t("input.labels.email")}
    htmlFor="email"
  >
    <Input
      id="email"
      type="email"
      inputMode="email"
      placeholder={t("input.placeholders.email")}
      {...register("email")}
    />
  </InputField>

  {errors.email && (
    <FieldError errors={[errors.email]} />
  )}
</Field>
        <Button type='submit' disabled={!isValid || isSubmitting} loading={isSubmitting} size={'lg'} className='my-9 w-full text-base bg-maroon-500 dark:bg-soft-pink-300 py-5'>
              {t('button.next')}
              <MoveRight className="rtl:rotate-180 text-base" />
        </Button>
      </form>
      {/* create account */}
      <div className='pt-5 text-center border-t border-ds-border-muted text-sm'>
        <span className='text-ds-text-plain font-medium'>{t('forgotPw.step1.notHaveAccount')}</span>
        <Link href={'/login'} className='font-bold text-maroon-700 dark:text-soft-pink-300'> {t('forgotPw.step1.toRegister')}</Link>
      </div>
    </div>

    </>
  );
}
