"use client";

import React, { useState } from "react";
import { Path, Control, Controller, FieldValues } from "react-hook-form";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import {
  Field,
  FieldError,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui";

interface IPasswordFormFieldProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  hasForgotPassword?: boolean;
}

function PasswordFormField<T extends FieldValues>({
  name,
  control,
  label,
  hasForgotPassword,
  ...inputProps
}: IPasswordFormFieldProps<T>) {
  // Controls password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          {/* ===== Field Wrapper ===== */}
          <Field data-invalid={fieldState.invalid}>
            {/* ===== Label ===== */}
            <FieldLabel htmlFor={String(name)}>{label}</FieldLabel>

            {/* ===== Password Input Group ===== */}
            <InputGroup className={inputProps.className || ""}>
              {/* Password Input */}
              <InputGroupInput
                id={String(name)}
                type={showPassword ? "text" : "password"}
                placeholder="********"
                aria-invalid={fieldState.invalid}
                aria-describedby={`${String(name)}-error`}
                {...inputProps}
                {...field}
              />

              {/* Toggle Visibility Button */}
              <InputGroupAddon align="inline-end">
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="bg-transparent p-1 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </InputGroupAddon>
            </InputGroup>

            {/* ===== Validation Error ===== */}
            {fieldState.invalid && (
              <FieldError
                id={`${String(name)}-error`}
                errors={[fieldState.error]}
              />
            )}

            {/* ===== Forgot Password Link ===== */}
            {hasForgotPassword && (
              <Link
                href="/reset-password"
                className="text-sm block max-w-fit ml-auto text-blue-600 hover:text-blue-500 font-medium transition-colors"
              >
                Forgot your password?
              </Link>
            )}
          </Field>
        </>
      )}
    />
  );
}

export default PasswordFormField;
