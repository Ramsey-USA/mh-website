"use client";

import dynamic from "next/dynamic";
import { MaterialIcon } from "../icons/MaterialIcon";
import { Button } from "../ui";

// Dynamic import for Framer Motion to reduce bundle size
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false },
);
const AnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false },
);

interface FieldValidation {
  isValid: boolean;
  feedback: string;
}

interface MilitaryContext {
  isVeteran: boolean;
  suggestions: string[];
  discounts: string[];
}

interface FieldSuggestions {
  suggestions: string[];
  autoComplete: string;
  validation: FieldValidation;
  militaryContext: MilitaryContext;
}

interface PredictiveCompletion {
  suggestions: Array<{ field: string; value: string; confidence: number }>;
  autoFillRecommendations: string[];
  nextStepGuidance: string;
}

interface SmartFormAssistantProps {
  fieldSuggestions: FieldSuggestions | null;
  predictiveCompletion: PredictiveCompletion | null;
  isVeteranDetected: boolean;
  showSmartSuggestions: boolean;
  onSuggestionClick: (suggestion: string) => void;
  onAutoCompleteClick: () => void;
  onToggleSuggestions: () => void;
  getCompletionProgress: () => number;
}

export function SmartFormAssistant({
  fieldSuggestions,
  predictiveCompletion,
  isVeteranDetected,
  showSmartSuggestions,
  onSuggestionClick,
  onAutoCompleteClick,
  onToggleSuggestions,
  getCompletionProgress,
}: SmartFormAssistantProps) {
  const completionProgress = getCompletionProgress();

  return (
    <AnimatePresence>
      {showSmartSuggestions && (
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          {/* Smart Assistant Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MaterialIcon icon="psychology" className="text-brand-primary" />
              <h3 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-100 text-lg">
                <MaterialIcon
                  icon="workspace_premium"
                  size="md"
                  className="text-bronze-500"
                />
                Partnership Form Assistant
              </h3>
              {isVeteranDetected && (
                <span className="flex items-center gap-1 bg-brand-primary/10 px-2 py-1 rounded-full font-medium text-brand-primary text-xs">
                  <MaterialIcon icon="flag" size="sm" />
                  Partnership Ready
                </span>
              )}
            </div>
            <Button
              onClick={onToggleSuggestions}
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
            >
              <MaterialIcon icon="close" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="group relative flex">
            {/* Animated Border Glow */}
            <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

            <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
              {/* Top Accent Bar */}
              <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                    Partnership Progress
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {completionProgress}%
                  </span>
                </div>
                <div className="bg-gray-200 dark:bg-gray-600 rounded-full w-full h-2">
                  <MotionDiv
                    className="bg-brand-primary rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                {predictiveCompletion?.nextStepGuidance && (
                  <div className="bg-brand-primary/5 dark:bg-brand-primary/10 mt-3 p-3 rounded-lg">
                    <div className="text-brand-primary dark:text-brand-primary text-sm whitespace-pre-line">
                      {predictiveCompletion.nextStepGuidance.replace(
                        /\\n/g,
                        "\n",
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Field Suggestions */}
          {fieldSuggestions && (
            <div className="group relative flex">
              {/* Animated Border Glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                {/* Top Accent Bar */}
                <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                <div className="p-4">
                  <div className="space-y-3">
                    {/* Auto-Complete Suggestion */}
                    {fieldSuggestions.autoComplete && (
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <MaterialIcon
                            icon="auto_fix_high"
                            className="text-brand-secondary"
                          />
                          <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                            Partnership Completion
                          </span>
                        </div>
                        <Button
                          onClick={onAutoCompleteClick}
                          variant="ghost"
                          className="justify-start bg-brand-secondary/5 hover:bg-brand-secondary/10 p-3 border border-brand-secondary/20 rounded-lg w-full text-left"
                        >
                          <span className="font-medium text-brand-secondary">
                            {fieldSuggestions.autoComplete}
                          </span>
                          <MaterialIcon
                            icon="keyboard_tab"
                            className="ml-auto text-brand-secondary"
                          />
                        </Button>
                      </div>
                    )}

                    {/* Field Suggestions */}
                    {fieldSuggestions.suggestions &&
                      fieldSuggestions.suggestions.length > 0 && (
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <MaterialIcon
                              icon="lightbulb"
                              className="text-yellow-600"
                            />
                            <span className="font-medium text-gray-700 text-sm">
                              Intelligent Suggestions
                            </span>
                          </div>
                          <div className="space-y-2">
                            {fieldSuggestions.suggestions.map(
                              (suggestion: string, _index: number) => (
                                <Button
                                  key={_index}
                                  onClick={() => onSuggestionClick(suggestion)}
                                  variant="ghost"
                                  className="justify-start bg-yellow-50 hover:bg-yellow-100 p-3 border border-yellow-200 rounded-lg w-full text-left"
                                >
                                  <span className="text-yellow-800">
                                    {suggestion}
                                  </span>
                                  <MaterialIcon
                                    icon="arrow_forward"
                                    className="ml-auto text-yellow-600"
                                  />
                                </Button>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                    {/* Field Validation */}
                    {fieldSuggestions.validation && (
                      <div
                        className={`p-3 rounded-lg border ${
                          fieldSuggestions.validation.isValid
                            ? "bg-green-50 border-green-200"
                            : "bg-red-50 border-red-200"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <MaterialIcon
                            icon={
                              fieldSuggestions.validation.isValid
                                ? "check_circle"
                                : "error"
                            }
                            className={
                              fieldSuggestions.validation.isValid
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          />
                          <span
                            className={`text-sm font-medium ${
                              fieldSuggestions.validation.isValid
                                ? "text-green-800"
                                : "text-red-800"
                            }`}
                          >
                            {fieldSuggestions.validation.feedback}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Veteran Benefits */}
          {isVeteranDetected &&
            fieldSuggestions?.militaryContext?.discounts &&
            fieldSuggestions.militaryContext.discounts.length > 0 && (
              <div className="group relative flex">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/40 to-blue-600/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                <div className="relative bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>

                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <MaterialIcon
                        icon="military_tech"
                        className="text-blue-600"
                      />
                      <h4 className="flex items-center gap-2 font-semibold text-blue-800 text-lg">
                        <MaterialIcon
                          icon="workspace_premium"
                          size="md"
                          className="text-yellow-600"
                        />
                        Veteran Benefits & Discounts
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {fieldSuggestions.militaryContext.discounts.map(
                        (discount: string, _index: number) => (
                          <div
                            key={_index}
                            className="flex items-start space-x-2 bg-white dark:bg-gray-800 p-2 border border-blue-200 dark:border-blue-700 rounded"
                          >
                            <MaterialIcon
                              icon="verified"
                              className="mt-0.5 text-blue-600 dark:text-blue-400"
                            />
                            <span className="text-blue-800 dark:text-blue-200 text-sm">
                              {discount}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 mt-4 p-3 rounded-lg">
                      <p className="flex items-center gap-2 font-medium text-blue-800 dark:text-blue-200 text-sm">
                        <MaterialIcon icon="flag" size="md" />
                        Thank you for your service! These benefits will be
                        automatically applied to your project.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          {/* Veteran Suggestions */}
          {isVeteranDetected &&
            fieldSuggestions?.militaryContext?.suggestions &&
            fieldSuggestions.militaryContext.suggestions.length > 0 && (
              <div className="group relative flex">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-green-500/40 to-green-600/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                <div className="relative bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700"></div>

                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <MaterialIcon
                        icon="recommend"
                        className="text-green-600"
                      />
                      <h4 className="flex items-center gap-2 font-semibold text-green-800 text-lg">
                        <MaterialIcon
                          icon="workspace_premium"
                          size="md"
                          className="text-yellow-600"
                        />
                        Veteran-Specific Recommendations
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {fieldSuggestions.militaryContext.suggestions.map(
                        (suggestion: string, _index: number) => (
                          <Button
                            key={_index}
                            onClick={() => onSuggestionClick(suggestion)}
                            variant="ghost"
                            className="justify-start bg-white dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900/30 p-3 border border-green-200 dark:border-green-700 rounded-lg w-full text-left"
                          >
                            <span className="text-green-800 dark:text-green-200">
                              {suggestion}
                            </span>
                            <MaterialIcon
                              icon="arrow_forward"
                              className="ml-auto text-green-600 dark:text-green-400"
                            />
                          </Button>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

          {/* Predictive Auto-Fill Recommendations */}
          {predictiveCompletion?.autoFillRecommendations &&
            predictiveCompletion.autoFillRecommendations.length > 0 && (
              <div className="group relative flex">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/40 to-purple-600/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700"></div>

                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <MaterialIcon
                        icon="auto_awesome"
                        className="text-purple-600"
                      />
                      <h4 className="flex items-center gap-2 font-semibold text-gray-800 text-lg">
                        <MaterialIcon
                          icon="rocket_launch"
                          size="md"
                          className="text-blue-600"
                        />
                        Smart Recommendations
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {predictiveCompletion.autoFillRecommendations.map(
                        (recommendation: string, _index: number) => (
                          <div
                            key={_index}
                            className="bg-purple-50 p-3 border border-purple-200 rounded-lg"
                          >
                            <span className="text-purple-800 text-sm">
                              {recommendation}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}

export default SmartFormAssistant;
