import { useState } from "react";

export const useSteps = (steps: number[]) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((p) => p + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((p) => p - 1);
    }
  };

  return {
    currentStep: steps[currentStep],
    previousStep,
    nextStep,
  };
};