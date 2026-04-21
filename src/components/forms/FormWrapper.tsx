"use client";

import React, { type FormEvent, type ReactNode } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

/**
 * FormFieldError Component
 *
 * Displays field-level error messages with icon
 */
function FormFieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 mt-1">
      <MaterialIcon icon="error_outline" size="sm" />
      {message}
    </p>
  );
}

/**
 * FormWrapper Component
 *
 * Reusable form container with consistent styling, error handling,
 * and validation display patterns.
 *
 * @component
 * @example
 * <FormWrapper
 *   onSubmit={handleSubmit}
 *   isSubmitting={isSubmitting}
 *   submitError={error}
 *   submitButtonLabel="Send Application"
 * >
 *   <FormInput
 *     label="Your Name"
 *     name="name"
 *     value={formData.name}
 *     onChange={handleChange}
 *     error={errors.name}
 *     required
 *   />
 * </FormWrapper>
 *
 * @param {FormWrapperProps} props
 * @returns {React.ReactElement}
 */

export interface FormWrapperProps {
  /** Form submission handler */
  onSubmit: (e: FormEvent) => void;
  /** Form children (inputs, textareas, etc) */
  children: ReactNode;
  /** Submit button label */
  submitButtonLabel?: string;
  /** Secondary action button */
  secondaryButtonLabel?: string;
  /** Secondary button click handler */
  onSecondaryClick?: () => void;
  /** Is form currently submitting */
  isSubmitting?: boolean;
  /** Form-level submission error */
  submitError?: string;
  /** Success message */
  submitSuccess?: string;
  /** Layout direction (default: column) */
  layout?: "row" | "column";
  /** Additional CSS classes */
  className?: string;
  /** Disable submit button */
  disableSubmit?: boolean;
  /** Custom success icon (default: check_circle) */
  successIcon?: string;
}

/**
 * Form Input Wrapper Component
 *
 * Reusable form input with label, error display, and styling
 */
export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export function FormInput({
  label,
  error,
  helperText,
  containerClassName = "",
  ...props
}: FormInputProps) {
  const { name, required } = props;

  return (
    <div className={`flex flex-col gap-1 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        {...props}
        className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
          error
            ? "border-red-500 dark:border-red-400 focus:ring-red-200 dark:focus:ring-red-900"
            : "border-gray-300 dark:border-gray-600 focus:border-brand-primary dark:focus:border-brand-primary focus:ring-brand-primary/20"
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
      />
      {error && <FormFieldError message={error} />}
      {helperText && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
}

/**
 * Form Textarea Wrapper Component
 */
export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export function FormTextarea({
  label,
  error,
  helperText,
  containerClassName = "",
  ...props
}: FormTextareaProps) {
  const { name, required } = props;

  return (
    <div className={`flex flex-col gap-1 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        {...props}
        className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-vertical ${
          error
            ? "border-red-500 dark:border-red-400 focus:ring-red-200 dark:focus:ring-red-900"
            : "border-gray-300 dark:border-gray-600 focus:border-brand-primary dark:focus:border-brand-primary focus:ring-brand-primary/20"
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
      />
      {error && <FormFieldError message={error} />}
      {helperText && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
}

/**
 * Form Select Wrapper Component
 */
export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
  containerClassName?: string;
}

export function FormSelect({
  label,
  error,
  helperText,
  options,
  containerClassName = "",
  ...props
}: FormSelectProps) {
  const { name, required } = props;

  return (
    <div className={`flex flex-col gap-1 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        {...props}
        className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
          error
            ? "border-red-500 dark:border-red-400 focus:ring-red-200 dark:focus:ring-red-900"
            : "border-gray-300 dark:border-gray-600 focus:border-brand-primary dark:focus:border-brand-primary focus:ring-brand-primary/20"
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <FormFieldError message={error} />}
      {helperText && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
}

/**
 * Main FormWrapper Component
 */
export function FormWrapper({
  onSubmit,
  children,
  submitButtonLabel = "Submit",
  secondaryButtonLabel,
  onSecondaryClick,
  isSubmitting = false,
  submitError,
  submitSuccess,
  layout = "column",
  className = "",
  disableSubmit = false,
  successIcon = "check_circle",
}: FormWrapperProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex ${layout === "row" ? "flex-row gap-6" : "flex-col gap-4"} ${className}`}
    >
      {submitError && (
        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <MaterialIcon
            icon="error"
            className="text-red-600 dark:text-red-400"
          />
          <p className="text-sm text-red-700 dark:text-red-300">
            {submitError}
          </p>
        </div>
      )}

      {submitSuccess && (
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <MaterialIcon
            icon={successIcon}
            className="text-green-600 dark:text-green-400"
          />
          <p className="text-sm text-green-700 dark:text-green-300">
            {submitSuccess}
          </p>
        </div>
      )}

      {/* Form fields */}
      <div className={layout === "row" ? "flex-1" : "w-full"}>{children}</div>

      {/* Action buttons */}
      <div className={`flex gap-3 ${layout === "row" ? "" : "justify-end"}`}>
        {secondaryButtonLabel && onSecondaryClick && (
          <button
            type="button"
            onClick={onSecondaryClick}
            disabled={isSubmitting}
            className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {secondaryButtonLabel}
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || disableSubmit}
          className="px-6 py-2 text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary-dark rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {submitButtonLabel}
        </button>
      </div>
    </form>
  );
}

export default FormWrapper;
