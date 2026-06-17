"use client";

import {
  type ChangeEvent,
  type InputHTMLAttributes,
  useEffect,
  useId,
  useRef,
} from "react";
import { Check, Minus } from "lucide-react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label: string;
  error?: string;
  /** Set on mount / when parent selection is partial — e.g. "select all" with some children checked */
  indeterminate?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Convenience callback that emits the checked boolean directly */
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = ({
  label,
  error,
  indeterminate = false,
  disabled,
  className = "",
  id,
  onChange,
  onCheckedChange,
  ...props
}: CheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const errorId = error ? `${checkboxId}-error` : undefined;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.indeterminate = false;
    }
    onChange?.(event);
    onCheckedChange?.(event.target.checked);
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label
        htmlFor={checkboxId}
        className={[
          "group inline-flex items-center gap-2 select-none",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        ].join(" ")}
      >
        <span className="relative inline-flex shrink-0">
          <input
            ref={inputRef}
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            className="sr-only"
            onChange={handleChange}
            {...props}
          />

          <span
            className={[
              "flex h-5 w-5 items-center justify-center rounded-[4px] border-2 transition-colors",
              "group-has-[input:checked]:border-[#A6252A] group-has-[input:checked]:bg-[#A6252A]",
              "group-has-[input:indeterminate]:border-[#A6252A] group-has-[input:indeterminate]:bg-[#A6252A]",
              "dark:group-has-[input:checked]:border-red-500 dark:group-has-[input:checked]:bg-red-500",
              "dark:group-has-[input:indeterminate]:border-red-500 dark:group-has-[input:indeterminate]:bg-red-500",
              "group-has-[input:focus-visible]:ring-2 group-has-[input:focus-visible]:ring-[#A6252A]/30 group-has-[input:focus-visible]:ring-offset-1",
              "dark:group-has-[input:focus-visible]:ring-red-500/30 dark:group-has-[input:focus-visible]:ring-offset-gray-900",
              error
                ? "border-[#DC2626] bg-white dark:bg-gray-900"
                : disabled
                  ? "border-[#D1D5DB] bg-[#F9FAFB] dark:border-gray-600 dark:bg-gray-800"
                  : "border-[#A6252A] bg-white hover:border-[#821D21] dark:border-red-400 dark:bg-gray-900 dark:hover:border-red-300",
            ].join(" ")}
          >
            <Check
              className={[
                "text-white transition-opacity opacity-0",
                "group-has-[input:checked]:opacity-100",
                "group-has-[input:indeterminate]:opacity-0",
              ].join(" ")}
              size={12}
              strokeWidth={3.5}
              aria-hidden
            />
            <Minus
              className={[
                "absolute text-white transition-opacity opacity-0",
                "group-has-[input:indeterminate]:opacity-100",
              ].join(" ")}
              size={12}
              strokeWidth={3.5}
              aria-hidden
            />
          </span>
        </span>

        <span
          className={[
            "text-[16px] leading-normal",
            error
              ? "text-[#DC2626] dark:text-red-400"
              : "text-[#374151] dark:text-gray-300",
          ].join(" ")}
        >
          {label}
        </span>
      </label>

      {error && (
        <p
          id={errorId}
          className="mt-1 text-[14px] text-[#DC2626] dark:text-red-400 pl-7"
     
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};
