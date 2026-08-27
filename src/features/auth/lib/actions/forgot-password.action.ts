'use server';
import { TForgotPasswordStep1Schema, TForgotPasswordStep3Schema } from '../schemas/forgot-password.schema';
import { ForgotPasswordStep1Response, ForgotPasswordStep3Response } from '../types/forgot-password';

//^ forgot password step 1
export async function forgetPasswordStep1(values: TForgotPasswordStep1Schema): Promise<ForgotPasswordStep1Response> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(values),
    });
    const payload: ForgotPasswordStep1Response = await response.json();
    if (!response.ok) {
      throw new Error(payload.message || 'Something went wrong');
    }
    return payload;
  } catch (error) {
    throw error;
  }
}

//^ forgot password step 3
export async function forgetPasswordStep3(values: TForgotPasswordStep3Schema): Promise<ForgotPasswordStep3Response> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        token: values.token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }),
    });
    const payload: ForgotPasswordStep3Response = await response.json();
    if (!response.ok) {
      throw new Error(payload.message || 'Something went wrong');
    }
    return payload;
  } catch (error) {
    throw error;
  }
}
