import { Dispatch, SetStateAction } from "react";
import { RegisterStep } from "../lib/types/auth";
import { useRegisterEmailStep } from "@/features/hooks/use-register-email-step";
import FormField from "@/shared/components/form-field";
import FormError from "@/shared/components/form-error";
import { Button } from "@/shared/components/ui/button";

interface IRegisterEmailStep {
  setStep: Dispatch<SetStateAction<RegisterStep>>;
  setEmail: Dispatch<SetStateAction<string>>;
}


function RegisterEmailStep({ setStep, setEmail }: IRegisterEmailStep) {
  // Handles form state, validation, and API request
  const { form, mutation, onSubmit } = useRegisterEmailStep({
    setStep,
    setEmail,
  });

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
        {/* Email input */}
        <FormField
          control={form.control}
          name="email"
          type="email"
          label="Email"
          placeholder="user@example.com"
        />

        {/* ===== Error Feedback ===== */}
        {mutation.isError && (
          <FormError message={(mutation.error as Error).message} />
        )}

        {/* ===== Submit Button ===== */}
        <Button
          type="submit"
          variant="secondary"
          className="mt-8 w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Sending..." : "Verify Email"}
        </Button>
      </form>
    </>
  );
}

export default RegisterEmailStep;