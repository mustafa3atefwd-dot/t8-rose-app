import * as React from "react";
import { CircleAlertIcon, CircleCheckIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

type InputFieldProps = {
  label?: React.ReactNode;
  /** Associates the label with the control's id. */
  htmlFor?: string;
  required?: boolean;
  /** Error message — when set, renders the danger message row (with icon). */
  error?: React.ReactNode;
  /** Success message — shown only when there is no `error`. */
  success?: React.ReactNode;
  /** Neutral helper text — shown only when there is no `error`/`success`. */
  description?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

/**
 * Layout wrapper that adds a label above the control and a helper/error/success
 * line below it. The error/success rows carry an icon; in RTL (Arabic) the icon
 * mirrors to the left side of the text via `rtl:flex-row-reverse`.
 */
function InputField({
  label,
  htmlFor,
  required,
  error,
  success,
  description,
  className,
  children,
}: InputFieldProps) {
  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className="text-body-sm font-medium text-text-default"
        >
          {label}
          {required ? (
            <span className="ms-0.5 text-danger" aria-hidden>
              *
            </span>
          ) : null}
        </label>
      ) : null}

      {children}

      {error ? (
        <p
          role="alert"
          className="flex items-center gap-1 text-caption text-danger rtl:flex-row-reverse"
        >
          <CircleAlertIcon className="size-3.5 shrink-0" aria-hidden />
          <span>{error}</span>
        </p>
      ) : success ? (
        <p className="flex items-center gap-1 text-caption text-success rtl:flex-row-reverse">
          <CircleCheckIcon className="size-3.5 shrink-0" aria-hidden />
          <span>{success}</span>
        </p>
      ) : description ? (
        <p className="text-caption text-text-muted">{description}</p>
      ) : null}
    </div>
  );
}

export { InputField };
export type { InputFieldProps };
