'use client';

import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from './ui/inputs';
import { Textarea } from './ui/textarea';

type IBaseProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string | React.ReactNode;
  required?: boolean;
};

type IInputProps = React.ComponentPropsWithoutRef<'input'> & {
  variant?: 'input';
};

type ITextareaProps = React.ComponentPropsWithoutRef<'textarea'> & {
  variant: 'textarea';
};

type IFormFieldProps<T extends FieldValues> = IBaseProps<T> & (IInputProps | ITextareaProps);

function FormField<T extends FieldValues>(props: IFormFieldProps<T>) {
  const { name, control, label, variant = 'input', required, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          {/* ===== Field Wrapper ===== */}
          <Field data-invalid={fieldState.invalid}>
            {/* ===== Label ===== */}
            <FieldLabel htmlFor={String(name)}>
              {label}
              {required && (
                <span className="text-ds-text-danger" aria-label="required">
                  *
                </span>
              )}
            </FieldLabel>

            {/* Render Input or Textarea based on variant prop */}
            {variant === 'input' ? (
              <Input
                id={String(name)}
                aria-invalid={fieldState.invalid}
                aria-describedby={`${name}-error`}
                {...(rest as React.ComponentPropsWithoutRef<'input'>)}
                {...field}
              />
            ) : (
              <Textarea
                id={String(name)}
                aria-invalid={fieldState.invalid}
                aria-describedby={`${name}-error`}
                rows={5}
                {...(rest as React.ComponentPropsWithoutRef<'textarea'>)}
                {...field}
              />
            )}

            {/* ===== Error Message ===== */}
            {fieldState.invalid && <FieldError id={`${name}-error`} errors={[fieldState.error]} />}
          </Field>
        </>
      )}
    />
  );
}

export default FormField;
