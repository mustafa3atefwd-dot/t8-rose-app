import React from 'react';

interface CheckoutStepperProps {
  currentStep: number;
  totalSteps: number;
}

export function CheckoutStepper({ currentStep, totalSteps }: CheckoutStepperProps) {
  // Calculate width: step 1 fills to step 2 (50% in a 2-step setup, or 100% of the active segment)
  // For a 2-step progress bar, currentStep = 1 fills 50% (the segment after step 1)
  const progressPercentage = (currentStep / totalSteps) * 50;

  return (
    <div className="w-full my-6">
      <div className="relative flex items-center justify-around">
        {/* Background track */}
        <div className="absolute border-4 border-zinc-200 left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-zinc-200 z-0" />
        
        {/* Active maroon line */}
        <div
          className="absolute left-0 top-1/2 border-4 border-maroon-600 -translate-y-1/2 bg-maroon-600 transition-all duration-300 z-0"
          style={{ width: `${progressPercentage}%` }}
        />

        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;
          return (
            <div
              key={stepNumber}
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                isActive ? 'bg-maroon-600 text-white' : 'bg-zinc-200 text-zinc-600'
              }`}
            >
              {stepNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
}