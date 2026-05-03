"use client";

import {
  DASHBOARD_LABEL_CLASS,
  DASHBOARD_INPUT_CLASS,
} from "@/components/ui/forms/DashboardFormField";

interface SkillRatingInputProps {
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/**
 * Combined range slider + numeric input used to rate a single skill
 * 0–100 in the Hub profile editor.
 *
 * Extracted from `TeamProfileForm` so the markup is defined in one
 * place and can be tested in isolation.
 */
export function SkillRatingInput({
  label,
  value,
  onChange,
}: SkillRatingInputProps) {
  return (
    <div>
      <label className={DASHBOARD_LABEL_CLASS}>
        {label}
        <span className="ml-1 font-bold text-brand-secondary">{value}</span>
      </label>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full accent-brand-secondary"
        aria-label={`${label} skill rating`}
      />
      <input
        type="number"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 ${DASHBOARD_INPUT_CLASS} w-20`}
        aria-label={`${label} skill number input`}
      />
    </div>
  );
}
