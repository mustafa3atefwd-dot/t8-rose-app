import { cn } from '@/shared/lib/utils';
import { CheckoutStep } from '../lib/types/checkout';

interface ICheckoutStepperProps {
  steps: readonly CheckoutStep[];
  currentStep: CheckoutStep;
}

export function CheckoutStepper({ steps, currentStep }: ICheckoutStepperProps) {
  const currentIndex = steps.indexOf(currentStep);

  const progressPercentage = steps.length > 1 ? (currentIndex / (steps.length - 1)) * 100 : 0;

  return (
    <div className="my-6 w-full">
      <div className="relative flex items-center justify-between">
        {/* Background track */}
        <div className="absolute top-1/2 left-0 z-0 h-1 w-full -translate-y-1/2 bg-zinc-200" />

        {/* Active track */}
        <div
          className="bg-maroon-600 absolute top-1/2 left-0 z-0 h-1 -translate-y-1/2 transition-all duration-300"
          style={{
            width: `${progressPercentage}%`,
          }}
        />

        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;

          return (
            <div
              key={step}
              className={cn(
                `relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors`,
                isCompleted ? 'bg-maroon-600 text-white' : 'bg-zinc-200 text-zinc-600'
              )}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}
