"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { LoaderCircle } from "lucide-react";

/** i18n keys for button copy — per design-system spec */
export const BUTTON_I18N = {
  en: {
    loading: "Loading...",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    confirm: "Confirm",
  },
  ar: {
    loading: "جاري التحميل...",
    submit: "إرسال",
    cancel: "إلغاء",
    save: "حفظ",
    delete: "حذف",
    confirm: "تأكيد",
  },
} as const;

export type ButtonLocale = keyof typeof BUTTON_I18N;

type CanonicalVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "outline-secondary"
  | "ghost"
  | "destructive";

/** Canonical + legacy aliases used in showcase / older code */
export type ButtonVariant =
  | CanonicalVariant
  | "light"
  | "outline-primary"
  | "danger";

function resolveVariant(variant: ButtonVariant): CanonicalVariant {
  switch (variant) {
    case "light":
      return "secondary";
    case "outline-primary":
      return "outline";
    case "danger":
      return "destructive";
    default:
      return variant;
  }
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  /** Overrides locale default loading text */
  loadingText?: string;
  locale?: ButtonLocale;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Renders a 44×44 square button — edge case: icon-only with no label */
  isIconOnly?: boolean;
}

const variantStyles: Record<CanonicalVariant, string> = {
  primary:
    "bg-[#A6252A] text-white hover:bg-[#821D21] disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] dark:bg-red-700 dark:hover:bg-red-800 dark:disabled:bg-gray-700 dark:disabled:text-gray-500",
  secondary:
    "bg-[#FBEAEA] text-[#A6252A] hover:bg-[#FAD4D4] disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] dark:bg-red-950 dark:text-red-200 dark:hover:bg-red-900 dark:disabled:bg-gray-700 dark:disabled:text-gray-500",
  outline:
    "border border-[#F3C5C7] text-[#A6252A] bg-white hover:bg-[#FDECEC] disabled:border-[#E5E7EB] disabled:text-[#9CA3AF] disabled:bg-white dark:border-red-500 dark:text-red-400 dark:bg-transparent dark:hover:bg-red-950 dark:disabled:border-gray-600 dark:disabled:text-gray-500 dark:disabled:bg-transparent",
  "outline-secondary":
    "border border-[#D1D5DB] text-[#374151] bg-white hover:bg-gray-50 disabled:border-[#E5E7EB] disabled:text-[#9CA3AF] disabled:bg-white dark:border-gray-600 dark:text-gray-300 dark:bg-transparent dark:hover:bg-gray-800 dark:disabled:border-gray-600 dark:disabled:text-gray-500 dark:disabled:bg-transparent",
  ghost:
    "text-[#374151] bg-transparent hover:bg-gray-100 disabled:text-[#9CA3AF] disabled:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800 dark:disabled:text-gray-500 dark:disabled:bg-transparent",
  destructive:
    "bg-[#DC2626] text-white hover:bg-[#B91C1C] disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] dark:bg-red-600 dark:hover:bg-red-700 dark:disabled:bg-gray-700 dark:disabled:text-gray-500",
};

export const Button = ({
  children,
  className = "",
  variant = "primary",
  isLoading = false,
  disabled,
  loadingText,
  locale = "en",
  leftIcon,
  rightIcon,
  isIconOnly = false,
  type = "button",
  ...props
}: ButtonProps) => {
  const resolved = resolveVariant(variant);
  const isDisabled = disabled || isLoading;
  const resolvedLoadingText = loadingText ?? BUTTON_I18N[locale].loading;

  const layoutStyles = isIconOnly
    ? "w-[44px] h-[44px] p-0"
    : "h-[44px] min-w-[181px] px-[16px]";

  const baseStyles = [
    "inline-flex items-center justify-center gap-[10px]",
    "rounded-[10px] font-normal text-[16px] leading-none",
    "transition-colors cursor-pointer",
    "disabled:cursor-not-allowed disabled:pointer-events-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A6252A]/40 focus-visible:ring-offset-2",
    "dark:focus-visible:ring-red-500/40 dark:focus-visible:ring-offset-gray-900",
    layoutStyles,
  ].join(" ");

  const displayIcon = isIconOnly ? (leftIcon ?? rightIcon) : leftIcon;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={`${baseStyles} ${variantStyles[resolved]} ${className}`}
      {...props}
    >
      {isIconOnly ? (
        isLoading ? (
          <LoaderCircle className="animate-spin shrink-0" size={18} aria-hidden />
        ) : (
          displayIcon && <span className="shrink-0 inline-flex">{displayIcon}</span>
        )
      ) : (
        <>
          {!isLoading && displayIcon && (
            <span className="shrink-0 inline-flex">{displayIcon}</span>
          )}
          <span>{isLoading ? resolvedLoadingText : children}</span>
          {isLoading ? (
            <LoaderCircle className="animate-spin shrink-0" size={18} aria-hidden />
          ) : (
            rightIcon && (
              <span className="shrink-0 inline-flex">{rightIcon}</span>
            )
          )}
        </>
      )}
    </button>
  );
};
