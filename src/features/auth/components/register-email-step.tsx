import { Dispatch, SetStateAction } from "react";
import FormField from "@/shared/components/form-field";
import FormError from "@/shared/components/form-error";
import { Button } from "@/shared/components/ui/button";
import { Loader2, MoveRight } from "lucide-react";
import Link from "next/link";
import { RegisterStep } from "../lib/types/auth";
import { useRegisterEmailStep } from "../hooks/use-register-email-step";

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
    <section aria-labelledby="register-email-heading" className="w-full max-w-101.5">
      <h2 id="register-email-heading" className="sr-only">
        Register with Email
      </h2>
      
      <form onSubmit={form.handleSubmit(onSubmit)}>
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

        {/* ===== Next Button ===== */}
        <Button
          type="submit"
          variant="secondary"
          className="my-9 w-full bg-maroon-600 hover:bg-maroon-600/90 text-white dark:bg-soft-pink-300 dark:hover:bg-soft-pink-400 dark:text-zinc-800 gap-2.5"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 
          <>
            Sending...
            <Loader2 className="size-4.5 rtl:rotate-180 animate-spin" />
          </>
          : 
          <>
            Next
            <MoveRight className="size-4.5 rtl:rotate-180" />
          </> 
          }
        </Button>
      </form>

      {/* ===== Secondary Action (Login Redirect) ===== */}
      <div className="mt-5 w-fit mx-auto text-sm text-zinc-800 dark:text-zinc-50 font-medium">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-maroon-700 hover:text-maroon-700/90 dark:text-soft-pink-300 dark:hover:text-soft-pink-300/90 text-base font-medium"
        >
          Login
        </Link>
      </div>
    </section>
  );
}

export default RegisterEmailStep;