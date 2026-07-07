"use client";

import { memo } from "react";
import { useRegisterUserInfoStep } from "../hooks/use-register-user-info-step";
import { FieldGroup } from "@/shared/components/ui/field";
import FormField from "@/shared/components/form-field";
import FormError from "@/shared/components/form-error";
import { ChevronRight, Loader2, MoveRight } from "lucide-react";
import PasswordFormField from "@/shared/components/password-form-field";
import { Button } from "@/shared/components/ui/button";
import PhoneFormField from "@/shared/components/phone-form-field";


function RegisterUserInfoStep({ email }: { email: string }) {
  const {
    form,
    mutation,
    showPasswordStep,
    handleNextStep,
    onSubmit,
  } = useRegisterUserInfoStep({ email });

  console.log(form.watch("phone"));


  return (
    <>
    <section aria-labelledby="register-user-info-heading" className="w-full max-w-101.5">
      <h2 id="register-user-info-heading" className="text-2xl lg:text-3xl text-zinc-800 dark:text-zinc-50 font-bold">
        Create Account
      </h2>
      
      <h3 className="mt-4 text-xl text-ds-text-primary font-semibold">        
        {showPasswordStep
          ? "Create a strong password"
          : "Tell us more about you"}</h3>

      <p className="mt-1 mb-4 text-ds-text-plain">
        {showPasswordStep
        ? "Choose a secure password to protect your account"
        : "A few details to get started"}
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
        {/* ================= STEP 1: User Basic Info ================= */}
        {!showPasswordStep && (
          <>
            <FieldGroup className="gap-4 grid grid-cols-2">
              {/* First Name Field */}
              <FormField
                name="firstName"
                control={form.control}
                label="First Name"
                placeholder="Zoe"
                required
              />

              {/* Last Name Field */}
              <FormField
                name="lastName"
                control={form.control}
                label="Last Name"
                placeholder="Jonathan"
                required
              />
            </FieldGroup>

            <FieldGroup className="mt-4">
              {/* Username Field */}
              <FormField
                name="username"
                control={form.control}
                label="Username"
                placeholder="zoe123"
                required
              />

              {/* Phone Field */}
              <PhoneFormField
                name="phone"
                control={form.control}
                label="Phone Number"
              />
            </FieldGroup>

            {/* API Error (Step 1 context) */}
            {mutation.isError && (
              <FormError message={(mutation.error as Error).message} />
            )}

            {/* Go to Step 2 */}
            <Button
              type="button"
              variant="secondary"
              className="my-9 w-full bg-maroon-600 hover:bg-maroon-600/90 text-white dark:bg-soft-pink-300 dark:hover:bg-soft-pink-400 dark:text-zinc-800 gap-2.5"
              disabled={mutation.isPending}
              onClick={handleNextStep} 
            >
              Next
              <MoveRight className="size-4.5 rtl:rotate-180" />
            </Button>
          </>
        )}

        {/* ================= STEP 2: Password Setup ================= */}
        {showPasswordStep && (
          <>
            <FieldGroup className="mt-4">
              {/* Password Field */}
              <PasswordFormField
                name="password"
                control={form.control}
                label="Password"
                placeholder="********"
              />

              {/* Confirm Password Field */}
              <PasswordFormField
                name="confirmPassword"
                control={form.control}
                label="Confirm Password"
                placeholder="********"
              />
            </FieldGroup>

            {/* API Error (Step 2 context) */}
            {mutation.isError && (
              <FormError message={(mutation.error as Error).message} />
            )}

            {/* Final Submit */}
            <Button type="submit" disabled={mutation.isPending}
              className="my-9 w-full bg-maroon-600 hover:bg-maroon-600/90 text-white dark:bg-soft-pink-300 dark:hover:bg-soft-pink-400 dark:text-zinc-800 gap-2.5"
            >
                { 
                mutation.isPending ? (
                  <>
                    Creating...
                    <Loader2 className="size-4.5 rtl:rotate-180 animate-spin" />
                </>
                ) : 
                <>
                    Create Account
                    <MoveRight className="size-4.5 rtl:rotate-180" />
                </>
                }
            </Button>
          </>
        )}
      </form>
      </section>
    </>
  );
}

export default memo(RegisterUserInfoStep);
