import { cn } from '@/shared/lib/utils';
import React from 'react';

interface CheckoutStepperProps {
  currentStep: number;
  totalSteps: number;
}

export function CheckoutStepper({ currentStep, totalSteps }: CheckoutStepperProps) {

  {/* progress track percentage */}
  const progressPercentage = (currentStep / totalSteps) * 50;

  return (
    <div className="w-full my-6">
      <div className="relative flex items-center justify-around">
        {/* Background track */}
        <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-zinc-200 z-0" />

        {/* Active maroon line */}
        <div
          className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-maroon-600 transition-all duration-300 z-0"
          style={{ width: `${progressPercentage}%` }}
        />

        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;

          return (
            <div
              key={stepNumber}
              className={cn(
                'relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                isActive ? 'bg-maroon-600 text-white' : 'bg-zinc-200 text-zinc-600'
              )}
            >
              {stepNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
}