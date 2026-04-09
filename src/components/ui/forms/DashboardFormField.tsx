/**
 * Dashboard Form Components
 *
 * Themed form inputs for the admin dashboard with dark mode styling.
 * Used in DriversTab, SafetyTab, and other dashboard forms.
 */
import {
  useId,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

// ─── Shared Styling Constants ────────────────────────────────────────────────

/** Base input styling for dashboard forms */
export const DASHBOARD_INPUT_CLASS =
  "w-full px-3 py-2 bg-gray-700/60 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 focus:border-brand-secondary";

/** Select input styling (adds appearance-none for custom arrows) */
export const DASHBOARD_SELECT_CLASS = `${DASHBOARD_INPUT_CLASS} appearance-none`;

/** Label styling for dashboard forms */
export const DASHBOARD_LABEL_CLASS =
  "text-xs text-gray-400 font-semibold uppercase mb-1 block";

/** Section header styling */
export const DASHBOARD_SECTION_HEADER_CLASS =
  "text-sm font-black text-brand-secondary uppercase tracking-wider";

/** Table header styling */
export const DASHBOARD_TABLE_HEADER_CLASS =
  "text-xs font-black text-gray-400 uppercase tracking-wider";

// ─── DashboardFormField Component ─────────────────────────────────────────────

interface DashboardFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above the input */
  label: string;
  /** Whether the field is required (adds red asterisk to label) */
  isRequired?: boolean;
  /** Error message to display */
  error?: string;
}

/**
 * A styled form field for dashboard forms with label and dark theme.
 */
export function DashboardFormField({
  label,
  isRequired = false,
  error,
  className,
  id: idProp,
  ...props
}: DashboardFormFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <div>
      <label htmlFor={id} className={DASHBOARD_LABEL_CLASS}>
        {label} {isRequired && <span className="text-red-400">*</span>}
      </label>
      <input
        id={id}
        className={cn(
          DASHBOARD_INPUT_CLASS,
          error && "border-red-400",
          className,
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

// ─── DashboardSelectField Component ───────────────────────────────────────────

interface DashboardSelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Label text displayed above the select */
  label: string;
  /** Whether the field is required (adds red asterisk to label) */
  isRequired?: boolean;
  /** Error message to display */
  error?: string;
  /** Select options as children */
  children: React.ReactNode;
}

/**
 * A styled select field for dashboard forms with label and dark theme.
 */
export function DashboardSelectField({
  label,
  isRequired = false,
  error,
  className,
  id: idProp,
  children,
  ...props
}: DashboardSelectFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <div>
      <label htmlFor={id} className={DASHBOARD_LABEL_CLASS}>
        {label} {isRequired && <span className="text-red-400">*</span>}
      </label>
      <select
        id={id}
        className={cn(
          DASHBOARD_SELECT_CLASS,
          error && "border-red-400",
          className,
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

// ─── DashboardTextareaField Component ─────────────────────────────────────────

interface DashboardTextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text displayed above the textarea */
  label: string;
  /** Whether the field is required (adds red asterisk to label) */
  isRequired?: boolean;
  /** Error message to display */
  error?: string;
}

/**
 * A styled textarea field for dashboard forms with label and dark theme.
 */
export function DashboardTextareaField({
  label,
  isRequired = false,
  error,
  className,
  id: idProp,
  ...props
}: DashboardTextareaFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <div>
      <label htmlFor={id} className={DASHBOARD_LABEL_CLASS}>
        {label} {isRequired && <span className="text-red-400">*</span>}
      </label>
      <textarea
        id={id}
        className={cn(
          DASHBOARD_INPUT_CLASS,
          error && "border-red-400",
          className,
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}
