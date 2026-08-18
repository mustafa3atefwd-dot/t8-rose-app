'use client';

import { Fragment, memo } from 'react';
import clsx from 'clsx';

interface ProgressStepsProps<T extends string> {
  steps: T[];
  currentStep: T;
  className?: string;
}

function ProgressSteps<T extends string>({ steps, currentStep, className }: ProgressStepsProps<T>) {
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <>
      {/* ===== Progress Container ===== */}
      <div className={clsx('progress mb-2.5 flex items-center', className)}>
        {/* ===== Steps Renderer ===== */}
        {steps.map((step, index) => (
          <Fragment key={step}>
            {/* Step Circle (state: completed / active / default) */}
            <div
              className={clsx('step', {
                completed: index < currentStepIndex,
                active: index === currentStepIndex,
              })}
            >
              {index + 1}
            </div>

            {/* Connector Line between steps (except last one) */}
            {index !== steps.length - 1 && (
              <div
                className={clsx('line flex-1', {
                  completed: index < currentStepIndex,
                })}
              />
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default memo(ProgressSteps) as typeof ProgressSteps;
