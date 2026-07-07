"use client";
import { useState } from "react";
import { REGISTER_STEPS } from "@/features/auth/lib/constants/user.constant";
import { RegisterStep } from "@/features/auth/lib/types/auth";
import ProgressSteps from "@/shared/components/progress-steps";
import RegisterEmailStep from "@/features/auth/components/register-email-step";
import RegisterOtpStep from "@/features/auth/components/register-otp-step";
import RegisterUserInfoStep from "@/features/auth/components/register-user-info-step";

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<RegisterStep>(REGISTER_STEPS.email);

  const [email, setEmail] = useState<string>("");


  return (
    <>
      {/* ===== Progress Steps ===== */}
      {currentStep !== REGISTER_STEPS.email && (
        <ProgressSteps
          steps={Object.values(REGISTER_STEPS)}
          currentStep={currentStep}
          className="px-20 xl:px-38"
        />
      )}

      {currentStep === REGISTER_STEPS.email && (
        <RegisterEmailStep
          setEmail={setEmail}
          setStep={setCurrentStep}
        />
      )}

      {currentStep === REGISTER_STEPS.otp && (
        <RegisterOtpStep email={email} setStep={setCurrentStep} />
      )}  

      {currentStep === REGISTER_STEPS.userInfo && (
        <RegisterUserInfoStep email={email} />
      )}      
    </>
  );
}