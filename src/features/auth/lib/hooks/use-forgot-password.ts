'use client';

import { useEffect, useState } from 'react';

export function useForgotPassword(token?: string) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (token) {
      setStep(3);
    }
  }, [token]);

  const goToStep1 = () => setStep(1);
  const goToStep2 = () => setStep(2);

  return {
    step,
    email,
    setEmail,
    goToStep1,
    goToStep2,
  };
}