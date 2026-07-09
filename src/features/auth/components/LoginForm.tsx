"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createLoginSchema,
  type LoginFormValues,
} from "../lib/login-schema";
import { getRememberMeSessionMaxAge } from "../lib/session-policy";

export function LoginForm() {
  // Translation
  const t = useTranslations("auth.login");
  const locale = useLocale();
  const loginSchema = createLoginSchema({
    required: t("validation.required"),
  });

  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || `/${locale}`;

  // State
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  // Functions
  async function handleLogin(values: LoginFormValues) {
    setFormError(null);
    const sessionMaxAge = getRememberMeSessionMaxAge(values.rememberMe);

    try {
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        rememberMe: String(values.rememberMe),
        maxAge: sessionMaxAge ? String(sessionMaxAge) : "",
        redirect: false,
      });

      if (result?.error) {
        setFormError(t("invalidCredentials"));
        return;
      }

      router.push(returnUrl);
      router.refresh();
    } catch {
      setFormError(t("networkError"));
    }
  }

  return (
    <form
      className="mx-auto flex w-full max-w-md flex-col gap-5"
      dir={locale === "ar" ? "rtl" : "ltr"}
      noValidate
      onSubmit={handleSubmit(handleLogin)}
    >
      <header className="border-b border-border pb-6 text-center">
        <h1
          className="text-5xl font-normal leading-none text-primary"
          style={{ fontFamily: '"Edwardian Script ITC", cursive' }}
        >
          {t("title")}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {t("subtitle")}
        </p>
      </header>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-sm font-medium text-foreground"
          htmlFor="username"
        >
          {t("username")}
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          aria-invalid={errors.username ? true : undefined}
          aria-describedby={errors.username ? "username-error" : undefined}
          placeholder={t("usernamePlaceholder")}
          className="h-12 rounded-lg border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20"
          {...register("username")}
        />
        {errors.username ? (
          <p id="username-error" className="text-sm text-danger" role="alert">
            {errors.username.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-sm font-medium text-foreground"
          htmlFor="password"
        >
          {t("password")}
        </label>
        <div className="flex h-12 items-center rounded-lg border border-border bg-background px-4 transition focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/20">
          <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            autoComplete="current-password"
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? "password-error" : undefined}
            placeholder={t("passwordPlaceholder")}
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none"
            {...register("password")}
          />
          <button
            type="button"
            className="text-muted-foreground transition hover:text-primary"
            aria-label={
              isPasswordVisible ? t("hidePassword") : t("showPassword")
            }
            aria-pressed={isPasswordVisible}
            onClick={() => setIsPasswordVisible((currentValue) => !currentValue)}
          >
            {isPasswordVisible ? (
              <EyeOffIcon className="size-5" aria-hidden />
            ) : (
              <EyeIcon className="size-5" aria-hidden />
            )}
          </button>
        </div>
        {errors.password ? (
          <p id="password-error" className="text-sm text-danger" role="alert">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <Link
        className="self-end text-sm font-semibold text-primary hover:underline"
        href={`/${locale}/forgot-password`}
      >
        {t("forgotPassword")}
      </Link>

      <label className="flex items-center gap-3 text-sm text-foreground">
        <input
          type="checkbox"
          className="size-5 rounded border border-primary accent-primary"
          {...register("rememberMe")}
        />
        {t("rememberMe")}
      </label>

      {formError ? (
        <p className="text-center text-sm font-medium text-danger" role="alert">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-60"
      >
        {isSubmitting ? (
          <Loader2Icon className="size-4 animate-spin" aria-hidden />
        ) : null}
        {isSubmitting ? t("loading") : t("button")}
      </button>

      <footer className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
        {t("noAccount")}{" "}
        <Link
          className="font-semibold text-primary hover:underline"
          href={`/${locale}/register`}
        >
          {t("register")}
        </Link>
      </footer>
    </form>
  );
}
