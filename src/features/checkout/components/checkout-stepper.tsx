'use client';

import { memo } from 'react';
import clsx from 'clsx';

interface ICheckoutStepperProps<T extends string> {
  steps: T[];
  currentStep: T;
  className?: string;
}

function CheckoutStepper<T extends string>({ steps, currentStep, className }: ICheckoutStepperProps<T>) {
  const currentIndex = steps.indexOf(currentStep);
  const progress = ((currentIndex + 0.5) / steps.length) * 100;

  return (
    <ol
      aria-label="Checkout progress"
      className={clsx('relative grid h-6 w-full grid-flow-col auto-cols-fr items-center', className)}
    >
      <div aria-hidden="true" className="bg-ds-bg-muted absolute inset-x-0 h-1.5 rounded-full" />
      <div
        aria-hidden="true"
        className="bg-ds-bg-primary-saturated absolute inset-s-0 h-1.5 rounded-full"
        style={{ width: `${progress}%` }}
      />

      {steps.map((step, index) => (
        <li
          key={step}
          aria-current={index === currentIndex ? 'step' : undefined}
          className={clsx(
            'relative z-10 mx-auto flex size-6 items-center justify-center rounded-full text-xs font-normal',
            index <= currentIndex
              ? 'bg-ds-bg-primary-saturated text-ds-text-inverse'
              : 'bg-ds-bg-muted text-ds-text-plain',
          )}
        >
          <span className="sr-only">Step </span>
          {index + 1}
        </li>
      ))}
    </ol>
  );
}

export default memo(CheckoutStepper) as typeof CheckoutStepper;
