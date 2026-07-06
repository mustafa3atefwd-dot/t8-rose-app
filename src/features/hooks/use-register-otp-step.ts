"use client";

import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { useCountdownTimer } from "@/shared/hooks";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpStepSchema } from "@/features/auth/lib/schemas";
import { IOtpStepSchema, registerStep } from "@/features/auth/lib/types/auth";

interface IUseRegisterOtpStepProps {
  email: string;
  setStep: Dispatch<SetStateAction<registerStep>>;
}

export function useRegisterOtpStep({
  email,
  setStep,
}: IUseRegisterOtpStepProps) {
  const { timer, resetTimer } = useCountdownTimer();

  // Initialize form
  const form = useForm<IOtpStepSchema>({
    resolver: zodResolver(otpStepSchema),
    defaultValues: {
      email,
      code: "",
    },
  });

  // Verify OTP code
  const verifyOtpMutation = useMutation({
    mutationFn: async (values: IOtpStepSchema) => {
      const res = await fetch("/api/auth/register/confirm-otp-step", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      // Normalize API errors
      if (!res.ok || !data.status) {
        throw new Error(data.message || "Invalid OTP");
      }

      return data;
    },

    // Move to next step after success
    onSuccess: () => {
      setStep("userInfo");
    },
  });

  // Resend OTP code
  const resendOtpMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/register/send-email-step", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      // Normalize API errors
      if (!res.ok || !data.status) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      return data;
    },

    // Restart timer after resend success
    onSuccess: () => {
      resetTimer();
    },
  });

  // Handle form submit
  function onSubmit(values: IOtpStepSchema) {
    verifyOtpMutation.mutate({
      email,
      code: values.code,
    });
  }

  // Merge form validation + server error
  const errorMessage =
    form.formState.errors.code?.message ||
    (verifyOtpMutation.isError
      ? (verifyOtpMutation.error as Error).message
      : undefined);

  return {
    form,
    timer,
    onSubmit,
    errorMessage,
    verifyOtpMutation,
    resendOtpMutation,
  };
}
