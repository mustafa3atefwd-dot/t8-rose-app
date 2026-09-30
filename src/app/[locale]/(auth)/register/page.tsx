'use client';
import { useState } from 'react';
import { REGISTER_STEPS } from '@/features/auth/lib/constants';
import { RegisterStep } from '@/features/auth/lib/types/auth';
import { ProgressSteps } from '@/shared/components';
import { RegisterEmailStep, RegisterOtpStep, RegisterUserInfoStep } from '@/features/auth/components';

const registerSteps = Object.values(REGISTER_STEPS);

export default function RegisterPage() {
  // State
  const [currentStep, setCurrentStep] = useState<RegisterStep>(REGISTER_STEPS.email);
  const [emailAddress, setEmailAddress] = useState('');

  // Variables
  const shouldShowProgressSteps = currentStep !== REGISTER_STEPS.email;

  return (
    <>
      {shouldShowProgressSteps && (
        <ProgressSteps steps={registerSteps} currentStep={currentStep} className="px-20 xl:px-38" />
      )}

      {currentStep === REGISTER_STEPS.email && (
        <RegisterEmailStep setEmail={setEmailAddress} setStep={setCurrentStep} />
      )}

      {currentStep === REGISTER_STEPS.otp && <RegisterOtpStep email={emailAddress} setStep={setCurrentStep} />}

      {currentStep === REGISTER_STEPS.userInfo && <RegisterUserInfoStep email={emailAddress} />}
    </>
  );
}
