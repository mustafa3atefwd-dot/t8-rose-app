import { useState } from 'react';
import { RegisterStep } from '@/features/auth/lib/types/auth';
import { REGISTER_STEP_ORDER } from '@/features/auth/lib/constants';

type IStepDirection = 'forward' | 'backward';

export function useRegisterStepDirection(step: RegisterStep): IStepDirection {
  // Derived state adjusted during render (instead of a ref) so the direction is
  // available on the very same render the step changes.
  const [previousStep, setPreviousStep] = useState(step);
  const [direction, setDirection] = useState<IStepDirection>('forward');

  if (previousStep !== step) {
    setPreviousStep(step);
    setDirection(REGISTER_STEP_ORDER[step] > REGISTER_STEP_ORDER[previousStep] ? 'forward' : 'backward');
  }

  return direction;
}
