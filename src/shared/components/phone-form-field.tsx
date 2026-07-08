'use client';

import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from './ui/field';
import { PhoneInput } from './ui/inputs';

interface IPhoneFormFieldProps<T extends FieldValues> {
  value?: string;
  countryCode?: string;
  name: Path<T>;
  control: Control<T>;
  label: string;
}

export default function PhoneFormField<T extends FieldValues>({ name, control, label }: IPhoneFormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>

          <PhoneInput
            value={field.value?.phone ?? ''}
            countryCode={field.value?.country}
            onValueChange={(value, meta) => {
              field.onChange({
                phone: value,
                country: meta.country.code,
              });
            }}
            invalid={fieldState.invalid}
          />

          {fieldState.error && <FieldError id={`${String(name)}-error`} errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
