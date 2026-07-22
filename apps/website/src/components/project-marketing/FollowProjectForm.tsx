"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

interface FollowProjectFormProps {
  slug: string;
}

type FormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function FollowProjectForm({ slug }: Readonly<FollowProjectFormProps>) {
  const t = useTranslations("projectMarketing.followForm");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<FormState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setFormState({ status: "error", message: t("errors.required") });
      return;
    }

    setIsSubmitting(true);
    setFormState({ status: "idle" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          source: `project:${slug}`,
        }),
      });

      const body = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        setFormState({
          status: "error",
          message: body.error ?? t("errors.generic"),
        });
        return;
      }

      setEmail("");
      setFormState({
        status: "success",
        message: body.message ?? t("success"),
      });
    } catch {
      setFormState({ status: "error", message: t("errors.generic") });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <label
        htmlFor={`follow-project-email-${slug}`}
        className="font-subheading text-xs font-bold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400"
      >
        {t("label")}
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          id={`follow-project-email-${slug}`}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t("placeholder")}
          className="min-w-0 flex-1 rounded-interactive border-border/70 bg-white px-4 py-2.5 font-body text-ink-primary placeholder:text-ink-muted focus:border-brand-primary focus:ring-brand-primary dark:border-white/20 dark:bg-gray-950 dark:text-white"
          required
        />

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-interactive bg-brand-primary px-5 py-2.5 font-subheading font-semibold text-white transition-colors hover:bg-brand-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("submitting") : t("submit")}
        </button>
      </div>

      <p className="font-body text-sm text-gray-600 dark:text-gray-300">
        {t("description")}
      </p>

      {formState.status !== "idle" && (
        <p
          role="status"
          className={`font-body text-sm ${
            formState.status === "success"
              ? "text-green-700 dark:text-green-300"
              : "text-red-700 dark:text-red-300"
          }`}
        >
          {formState.message}
        </p>
      )}
    </form>
  );
}
