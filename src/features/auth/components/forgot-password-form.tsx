'use client';
import { useState } from "react";
import ForgotPasswordStep1 from "./forgot-password-step1";
import ForgotPasswordStep2 from "./forgot-password-step2";
import ForgotPasswordStep3 from "./forgot-password-step3";

export default function ForgotPasswordForm() {
  const [step, setStep] = useState<1 | 2 | 3>(3);
  const [email, setEmail] = useState<string>('');
return (
  <>
    {step === 1 && (
      <ForgotPasswordStep1
        setEmail={setEmail}
        onNext={() => setStep(2)}
      />
    )}

    {step === 2 && (
      <ForgotPasswordStep2
        email={email}
        onNext={() => setStep(3)}
      />
    )}

    {step === 3 && (
      <ForgotPasswordStep3
      />
    )}
  </>
);
}
