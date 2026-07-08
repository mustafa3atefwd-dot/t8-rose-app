import { useRef } from 'react';
import { RegisterStep } from '@/features/auth/lib/types/auth';
import { REGISTER_STEP_ORDER } from '@/features/auth/lib/constants';

type IStepDirection = 'forward' | 'backward';

export function useRegisterStepDirection(step: RegisterStep): IStepDirection {
  const previousStep = useRef(step);

  const currentOrder = REGISTER_STEP_ORDER[step];
  const previousOrder = REGISTER_STEP_ORDER[previousStep.current];

  const direction: IStepDirection = currentOrder > previousOrder ? 'forward' : 'backward';

  previousStep.current = step;

  return direction;
}
