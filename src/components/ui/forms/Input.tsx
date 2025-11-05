// Input component with MH Construction styling
import { type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

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
  ...props
}: InputProps) {
  const baseClasses =
    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 touch-manipulation min-h-[44px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white";
  const errorClasses = error
    ? "border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400"
    : "border-gray-300 dark:border-gray-600 focus:border-[#386851] focus:ring-[#386851] dark:focus:border-[#BD9264] dark:focus:ring-[#BD9264]";

  const classes = `${baseClasses} ${errorClasses} ${className}`;

  return (
    <div className="space-y-1">
      {label && (
        <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">
          {label}
        </label>
      )}
      <input className={classes} {...props} />
      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-gray-500 dark:text-gray-400 text-sm">{helperText}</p>
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
  ...props
}: TextareaProps) {
  const baseClasses =
    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 touch-manipulation min-h-[100px] resize-y bg-white dark:bg-gray-800 text-gray-900 dark:text-white";
  const errorClasses = error
    ? "border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400"
    : "border-gray-300 dark:border-gray-600 focus:border-[#386851] focus:ring-[#386851] dark:focus:border-[#BD9264] dark:focus:ring-[#BD9264]";

  const classes = `${baseClasses} ${errorClasses} ${className}`;

  return (
    <div className="space-y-1">
      {label && (
        <label className="block font-medium text-gray-700 dark:text-gray-300 text-sm">
          {label}
        </label>
      )}
      <textarea className={classes} {...props} />
      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-gray-500 dark:text-gray-400 text-sm">{helperText}</p>
      )}
    </div>
  );
}
