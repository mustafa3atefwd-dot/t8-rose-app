'use client';

import React, { useState } from 'react';
import { Path, Control, Controller, FieldValues } from 'react-hook-form';
import { Link } from '@/i18n/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { Field, FieldError, FieldLabel } from './ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import { useTranslations } from 'next-intl';

interface IPasswordFormFieldProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
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

  const tInput = useTranslations('input');
  const tAuth = useTranslations('auth');

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
            <InputGroup className={inputProps.className || ''}>
              {/* Password Input */}
              <InputGroupInput
                id={String(name)}
                type={showPassword ? 'text' : 'password'}
                placeholder={tInput('passwordPlaceholder')}
                aria-invalid={fieldState.invalid}
                aria-describedby={`${String(name)}-error`}
                {...inputProps}
                {...field}
              />

              {/* Toggle Visibility Button */}
              <InputGroupAddon align="inline-end">
                <button
                  type="button"
                  aria-label={showPassword ? tInput('hidePassword') : tInput('showPassword')}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="bg-transparent p-1 text-gray-500 hover:cursor-pointer hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </InputGroupAddon>
            </InputGroup>

            {/* ===== Validation Error ===== */}
            {fieldState.invalid && <FieldError id={`${String(name)}-error`} errors={[fieldState.error]} />}

            {/* ===== Forgot Password Link ===== */}
            {hasForgotPassword && (
              <Link
                href="/reset-password"
                className="ml-auto block max-w-fit text-sm font-medium text-blue-600 transition-colors hover:text-blue-500"
              >
                {tAuth('forgotPassword')}
              </Link>
            )}
          </Field>
        </>
      )}
    />
  );
}

export default PasswordFormField;
