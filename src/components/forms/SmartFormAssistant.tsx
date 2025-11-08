"use client";

import dynamic from "next/dynamic";
import { MaterialIcon } from "../icons/MaterialIcon";
import { Card, CardContent, Button } from "../ui";

// Dynamic import for Framer Motion to reduce bundle size
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false },
);
const AnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false },
);

interface SmartFormAssistantProps {
  fieldSuggestions: unknown;
  predictiveCompletion: unknown;
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
          <Card>
            <CardContent className="p-4">
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
            </CardContent>
          </Card>

          {/* Field Suggestions */}
          {fieldSuggestions && (
            <Card>
              <CardContent className="p-4">
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
                            (suggestion: string, index: number) => (
                              <Button
                                key={index}
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
              </CardContent>
            </Card>
          )}

          {/* Veteran Benefits */}
          {isVeteranDetected &&
            fieldSuggestions?.militaryContext.discounts.length > 0 && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
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
                      (discount: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start space-x-2 bg-white p-2 border border-blue-200 rounded"
                        >
                          <MaterialIcon
                            icon="verified"
                            className="mt-0.5 text-blue-600"
                          />
                          <span className="text-blue-800 text-sm">
                            {discount}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                  <div className="bg-blue-100 mt-4 p-3 rounded-lg">
                    <p className="flex items-center gap-2 font-medium text-blue-800 text-sm">
                      <MaterialIcon icon="flag" size="md" />
                      Thank you for your service! These benefits will be
                      automatically applied to your project.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

          {/* Veteran Suggestions */}
          {isVeteranDetected &&
            fieldSuggestions?.militaryContext.suggestions.length > 0 && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <MaterialIcon icon="recommend" className="text-green-600" />
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
                      (suggestion: string, index: number) => (
                        <Button
                          key={index}
                          onClick={() => onSuggestionClick(suggestion)}
                          variant="ghost"
                          className="justify-start bg-white hover:bg-green-100 p-3 border border-green-200 rounded-lg w-full text-left"
                        >
                          <span className="text-green-800">{suggestion}</span>
                          <MaterialIcon
                            icon="arrow_forward"
                            className="ml-auto text-green-600"
                          />
                        </Button>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

          {/* Predictive Auto-Fill Recommendations */}
          {predictiveCompletion?.autoFillRecommendations.length > 0 && (
            <Card>
              <CardContent className="p-4">
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
                    (recommendation: string, index: number) => (
                      <div
                        key={index}
                        className="bg-purple-50 p-3 border border-purple-200 rounded-lg"
                      >
                        <span className="text-purple-800 text-sm">
                          {recommendation}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}

export default SmartFormAssistant;
