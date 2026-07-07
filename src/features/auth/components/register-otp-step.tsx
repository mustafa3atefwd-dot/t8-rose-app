import { Button } from "@/shared/components/ui/button";
import { Loader2, MoveRight } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { RegisterStep } from "../lib/types/auth";
import { REGISTER_STEPS } from "../lib/constants/user.constant";
import { Controller } from "react-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/components/ui/input-otp";
import FormError from "@/shared/components/form-error";
import { useRegisterOtpStep } from "../hooks/use-register-otp-step";

interface IRegisterOtpStepProps {
  setStep: Dispatch<SetStateAction<RegisterStep>>;
  email: string;
}

function RegisterOtpStep({ setStep, email }: IRegisterOtpStepProps) {
  // Custom hook handles form, API calls, timer & retry logic
  const {
    form,
    timer,
    onSubmit,
    errorMessage,
    verifyOtpMutation,
    resendOtpMutation,
  } = useRegisterOtpStep({
    email,
    setStep,
  });

  
  return (
    <section aria-labelledby="register-otp-heading" className="w-full max-w-101.5">
      <h2 id="register-otp-heading" className="text-2xl lg:text-3xl text-zinc-800 dark:text-zinc-50 font-bold">
        Create Account
      </h2>
      
      <h3 className="mt-4 text-xl text-ds-text-primary font-semibold">Enter the OTP Code</h3>

      {/* ===== Instructions + Edit Email ===== */}
      <p className="mt-1 mb-4 text-ds-text-plain">
        We have sent a 6-digit code to: {email}
        <button
          type="button"
          className="text-blue-600 hover:underline cursor-pointer font-medium"
          onClick={() => setStep(REGISTER_STEPS.email)} // go back to edit email step
        >
          Edit
        </button>
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="border-y border-ds-border-muted">
        {/* OTP Input (controlled by react-hook-form) */}
        <Controller
          control={form.control}
          name="code"
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
            >
              {/* Render 6 OTP slots */}
              {[...Array(6)].map((_, i) => (
                <InputOTPGroup key={i} className="mt-11 mb-7.5">
                  <InputOTPSlot
                    index={i}
                    aria-invalid={!!errorMessage}
                  />
                </InputOTPGroup>
              ))}
            </InputOTP>
          )}
        />

        {/* ===== Timer / Resend Section ===== */}
        {timer > 0 ? (
          <p className="ms-auto w-fit text-gray-500">
            You can request another code in: {timer}s
          </p>
        ) : (
          <p className="ms-auto w-fit text-gray-500">
            <button
              type="button"
              className="cursor-pointer text-ds-text-plain font-medium"
              onClick={() => resendOtpMutation.mutate()}
              disabled={resendOtpMutation.isPending}
            >
              {resendOtpMutation.isPending ? "Resending..." : "Send a new code"}
            </button>
          </p>
        )}

        {/* ===== Error Feedback ===== */}
        <FormError message={errorMessage} />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="secondary"
          disabled={verifyOtpMutation.isPending}
          className="my-9 w-full bg-maroon-600 hover:bg-maroon-600/90 text-white text-base dark:bg-soft-pink-300 dark:hover:bg-soft-pink-400 dark:text-zinc-800 gap-2.5"
        >
          {verifyOtpMutation.isPending ? 
          <>
            Verifying...
            <Loader2 className="size-4.5 rtl:rotate-180 animate-spin" />
          </>
           : 
           "Verify Code"
          }
        </Button>
      </form>

      {/* Secondary Action (Login Redirect) */}
      <div className="mt-5 w-fit mx-auto text-sm text-zinc-800 dark:text-zinc-50 font-medium">
        Need help?{" "}
        <Link
          href="/contact"
          className="text-maroon-700 hover:text-maroon-700/90 dark:text-soft-pink-300 dark:hover:text-soft-pink-300/90 font-medium"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}

export default RegisterOtpStep;
