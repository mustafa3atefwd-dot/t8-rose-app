'use client';

import { memo } from 'react';
import clsx from 'clsx';

import { ICheckoutStepperProps } from '@/features/checkout/lib/types';

function CheckoutStepper<T extends string>({ steps, currentStep, className }: ICheckoutStepperProps<T>) {
  // Find the index of the currently active step.
  const currentIndex = steps.indexOf(currentStep);

  // Extend the progress to the center of the active step.
  // This keeps the active circle visually connected to the progress bar.
  const progress = ((currentIndex + 0.5) / steps.length) * 100;

  return (
    <ol
      aria-label="Checkout progress"
      className={clsx('relative grid h-6 w-full auto-cols-fr grid-flow-col items-center', className)}
    >
      {/* Background track showing the remaining checkout steps. */}
      <div aria-hidden="true" className="bg-ds-bg-muted absolute inset-x-0 h-1.5 rounded-full" />

      {/* Animated progress indicator showing the completed checkout steps. */}
      <div
        aria-hidden="true"
        className="bg-ds-bg-primary-saturated absolute inset-s-0 h-1.5 rounded-full transition-[width] duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />

      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isUpcoming = index > currentIndex;

        return (
          <li
            key={step}
            aria-current={isCurrent ? 'step' : undefined}
            className={clsx(
              // Step indicator container.
              'relative z-10 mx-auto flex size-6 items-center justify-center rounded-full text-xs font-normal',

              // Smoothly animate the step whenever its state changes.
              'transition-all duration-300 ease-in-out',

              // Completed and current steps use the primary color.
              isCompleted || isCurrent
                ? 'bg-ds-bg-primary-saturated text-ds-text-inverse scale-100'
                : 'bg-ds-bg-muted text-ds-text-plain',

              // Slightly emphasize the currently active step.
              isCurrent && 'scale-110 shadow-sm',

              // Keep upcoming steps visually subtle.
              isUpcoming && 'scale-100'
            )}
          >
            {/* Hide the step label visually while keeping it accessible to screen readers. */}
            <span className="sr-only">
              Step {index + 1}
              {isCurrent ? ' (current)' : ''}
            </span>

            {/* Display the step number visually. */}
            {index + 1}
          </li>
        );
      })}
    </ol>
  );
}

export default memo(CheckoutStepper) as typeof CheckoutStepper;
