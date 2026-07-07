"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserInfoStepSchema } from "../lib/types/schemas";
import { userInfoStepSchema } from "../lib/schemas/user-info-step.schema";



interface IUseRegisterUserInfoStepProps {
  email: string;
}

export function useRegisterUserInfoStep({
  email,
}: IUseRegisterUserInfoStepProps) {
  // Controls step navigation (basic info -> password)
  const [showPasswordStep, setShowPasswordStep] = useState(false);

  // Form setup with validation schema
  const form = useForm<IUserInfoStepSchema>({
    resolver: zodResolver(userInfoStepSchema),
    defaultValues: {
      email,
      firstName: "",
      lastName: "",
      username: "",
      phone: {
        country: "",
        phone: "",
      },
      password: "",
      confirmPassword: "",
    },
  });

  

  // Submit user registration
  const mutation = useMutation({
    mutationFn: async (values: IUserInfoStepSchema) => {
      console.log(values);

      const res = await fetch("/api/auth/register/user-info-step", {
        method: "POST",
        body: JSON.stringify({...values, phone: values.phone.phone}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok || !data.status) {
        throw new Error(data.message || "Request failed");
      }

      return data;
    },

    // Redirect after success
    onSuccess: () => {
      window.location.href = "/login";
    },
  });



  // Step 1 -> Step 2 validation (no submit yet)
async function handleNextStep() {
  const valid = await form.trigger([
    "firstName",
    "lastName",
    "username",
    "phone",
  ]);

  console.log("valid:", valid);
  console.log("errors:", form.formState.errors);

  if (valid) setShowPasswordStep(true);
}

  // Final submit (Step 2 only)
  function onSubmit(values: IUserInfoStepSchema) {
    if (!showPasswordStep) return;

    mutation.mutate({
      ...values,
      email,
    });
  }

  return {
    form,
    mutation,
    showPasswordStep,
    setShowPasswordStep,
    handleNextStep,
    onSubmit,
  };
}
