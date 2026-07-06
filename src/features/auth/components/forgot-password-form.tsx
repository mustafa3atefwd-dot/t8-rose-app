'use client';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/inputs';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, TForgotPasswordSchema } from '../lib/schemas/forgot-password.schema';
export default function ForgotPasswordForm() {
  const form = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  });
  const {handleSubmit} = form;
  function handleForgotPassword(values:TForgotPasswordSchema){
    console.log(values);
    
  }
  return (
    <>
    {/* forgot password form */}
    <div className=''>
      {/* header */}
      <header className="text-text-plain">
        <h3 className="text-2xl font-semibold">Forgot Password?</h3>
        <p>Worry not, we’ll send you instructions to help you reset it.</p>
      </header>
      
      <form className='bg-red-400 mt-6' onSubmit={handleSubmit(handleForgotPassword)}>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="user@example.com"
                autoComplete="off"
                className='p-6'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button className='w-full text-base py-4 mt-9'>Continue</Button>
      </form>
    </div>

    </>
  );
}
