'use client';

import ForgotPasswordStep1 from './forgot-password-step1';
import ForgotPasswordStep2 from './forgot-password-step2';
import ForgotPasswordStep3 from './forgot-password-step3';
import { useForgotPassword } from '../lib/hooks/use-forgot-password';

interface ForgotPasswordFormProps {
  token: string;
}

export default function ForgotPasswordForm({
  token,
}: ForgotPasswordFormProps) {
  const {
    step,
    email,
    setEmail,
    goToStep1,
    goToStep2,
  } = useForgotPassword(token);
  
  return (
    <>
      {step === 1 && (
        <ForgotPasswordStep1
          email={email}
          setEmail={setEmail}
          onNext={goToStep2}
        />
      )}

      {step === 2 && (
        <ForgotPasswordStep2
          email={email}
          onBack={goToStep1}
        />
      )}

      {step === 3 && (
        <ForgotPasswordStep3
          token={token}
        />
      )}
    </>
  );
}