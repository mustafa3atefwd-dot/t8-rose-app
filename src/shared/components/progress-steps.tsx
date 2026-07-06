"use client";

import React, { memo } from "react";
import clsx from "clsx";
import { RegisterStep } from "@/features/auth/lib/types/auth";

interface ProgressStepsProps {
  steps: RegisterStep[];
  currentStep: RegisterStep;
  className?: string;
}

function ProgressSteps({ steps, currentStep, className }: ProgressStepsProps) {
  // Determine current active step index
  const currentStepIndex = steps.indexOf(currentStep);
  
  return (
    <>
      {/* ===== Progress Container ===== */}
      <div className={clsx("progress flex items-center mb-2.5", className)}>
        {/* ===== Steps Renderer ===== */}
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            {/* Step Circle (state: completed / active / default) */}
            <div
              className={clsx("step", {
                completed: index < currentStepIndex,
                active: index === currentStepIndex,
              })}
            >
              {index + 1}
            </div>

            {/* Connector Line between steps (except last one) */}
            {index !== steps.length - 1 && (
              <div
                className={clsx("line flex-1", {
                  completed: index < currentStepIndex,
                })}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default memo(ProgressSteps);
