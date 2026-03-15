// Input component with MH Construction styling
import {
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

// Shared class constants — defined once at module level to avoid per-render allocations
const BASE_FIELD =
  "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 touch-manipulation bg-white dark:bg-gray-800 text-gray-900 dark:text-white";
const VALID_BORDER =
  "border-gray-300 dark:border-gray-600 focus:border-brand-primary focus:ring-brand-primary dark:focus:border-brand-secondary dark:focus:ring-brand-secondary";
const ERROR_BORDER =
  "border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className = "",
  id: idProp,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="block font-medium text-gray-700 dark:text-gray-300 text-sm"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          BASE_FIELD,
          "min-h-[44px]",
          error ? ERROR_BORDER : VALID_BORDER,
          className,
        )}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-red-600 dark:text-red-400 text-sm"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperId} className="text-gray-500 dark:text-gray-300 text-sm">
          {helperText}
        </p>
      )}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Textarea({
  label,
  error,
  helperText,
  className = "",
  id: idProp,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="block font-medium text-gray-700 dark:text-gray-300 text-sm"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          BASE_FIELD,
          "min-h-[100px] resize-y",
          error ? ERROR_BORDER : VALID_BORDER,
          className,
        )}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-red-600 dark:text-red-400 text-sm"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperId} className="text-gray-500 dark:text-gray-300 text-sm">
          {helperText}
        </p>
      )}
    </div>
  );
}
