/**
 * Progress Indicator Component
 * Visual step indicator for booking process
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface ProgressIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Mission Date & Time", icon: "event" },
  { number: 2, label: "Intel Briefing", icon: "assignment" },
  { number: 3, label: "Deployment Confirmed", icon: "check_circle" },
];

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="mb-12">
      <div className="flex justify-center items-center">
        {steps.map((step, _index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  relative flex items-center justify-center w-16 h-16 rounded-full
                  transition-all duration-300 shadow-lg
                  ${
                    currentStep > step.number
                      ? "bg-green-500 text-white"
                      : currentStep === step.number
                        ? "bg-brand-primary text-white ring-4 ring-brand-primary/30"
                        : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }
                `}
              >
                {currentStep > step.number ? (
                  <MaterialIcon icon="check" size="lg" />
                ) : (
                  <MaterialIcon icon={step.icon} size="lg" />
                )}
              </div>
              <div
                className={`
                  mt-3 text-sm font-medium text-center transition-colors
                  ${
                    currentStep === step.number
                      ? "text-brand-primary dark:text-brand-primary"
                      : "text-gray-600 dark:text-gray-400"
                  }
                `}
              >
                {step.label}
              </div>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="relative mb-8 mx-4 w-24 h-1">
                <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 rounded" />
                <div
                  className={`
                    absolute inset-0 rounded transition-all duration-300
                    ${
                      currentStep > step.number
                        ? "bg-green-500 w-full"
                        : "bg-transparent w-0"
                    }
                  `}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
