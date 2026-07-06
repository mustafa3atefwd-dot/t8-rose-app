"use client";
import { useState } from "react";
import { REGISTER_STEPS } from "@/features/auth/lib/constants/user.constant";
import { RegisterStep } from "@/features/auth/lib/types/auth";
import ProgressSteps from "@/shared/components/progress-steps";
import RegisterEmailStep from "@/features/auth/components/register-email-step";

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
      
    </>
  );
}