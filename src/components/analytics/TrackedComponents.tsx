/**
 * Tracked Component Wrappers
 *
 * Drop-in replacements for common elements that include automatic tracking.
 * Use these instead of regular HTML elements for instant analytics.
 *
 * EASY TO USE:
 * - Replace <button> with <TrackedButton trackId="button-name">
 * - Replace <a> with <TrackedLink trackId="link-name">
 * - Replace <form> with <TrackedForm trackId="form-name">
 *
 * That's it! Tracking is automatic.
 */

"use client";

import React, {
  type ReactNode,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type FormHTMLAttributes,
} from "react";
import Link from "next/link";
import {
  useClickTracking,
  useFormTracking,
  useCTATracking,
} from "@/lib/analytics/hooks";

interface TrackedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  trackId: string;
  trackProperties?: Record<string, unknown>;
  children: ReactNode;
}

/**
 * Button that automatically tracks clicks
 *
 * @example
 * ```tsx
 * // Instead of:
 * <button onClick={handleClick}>Click me</button>
 *
 * // Use:
 * <TrackedButton trackId="my-button" onClick={handleClick}>
 *   Click me
 * </TrackedButton>
 * ```
 */
export function TrackedButton({
  trackId,
  trackProperties,
  onClick,
  children,
  ...props
}: TrackedButtonProps) {
  const trackClick = useClickTracking();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackClick(trackId, trackProperties);
    onClick?.(e);
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

interface TrackedLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  trackId: string;
  trackProperties?: Record<string, unknown>;
  href: string;
  children: ReactNode;
}

/**
 * Link that automatically tracks clicks
 *
 * @example
 * ```tsx
 * // Instead of:
 * <Link href="/services">Services</Link>
 *
 * // Use:
 * <TrackedLink trackId="nav-services" href="/services">
 *   Services
 * </TrackedLink>
 * ```
 */
export function TrackedLink({
  trackId,
  trackProperties,
  href,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  const trackClick = useClickTracking();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackClick(trackId, {
      ...trackProperties,
      destination: href,
    });
    onClick?.(e);
  };

  // Use Next.js Link for internal navigation
  if (href.startsWith("/") || href.startsWith("#")) {
    // Extract only valid Link props
    const { className, style, id } = props;
    return (
      <Link
        href={href}
        onClick={handleClick}
        className={className}
        style={style}
        id={id}
      >
        {children}
      </Link>
    );
  }

  // Regular anchor for external links
  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

interface TrackedCTAProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  trackId: string;
  trackProperties?: Record<string, unknown>;
  children: ReactNode;
}

/**
 * CTA button that tracks conversions
 * Use for primary calls-to-action that drive conversions
 *
 * @example
 * ```tsx
 * <TrackedCTA
 *   trackId="hero-get-started"
 *   trackProperties={{ variant: 'primary', section: 'hero' }}
 * >
 *   Get Started Now
 * </TrackedCTA>
 * ```
 */
export function TrackedCTA({
  trackId,
  trackProperties,
  onClick,
  children,
  ...props
}: TrackedCTAProps) {
  const trackCTA = useCTATracking();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackCTA(trackId, trackProperties);
    onClick?.(e);
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

interface TrackedFormProps extends FormHTMLAttributes<HTMLFormElement> {
  trackId: string;
  trackProperties?: Record<string, unknown>;
  children: ReactNode;
}

/**
 * Form that automatically tracks submissions and field interactions
 *
 * @example
 * ```tsx
 * <TrackedForm
 *   trackId="contact-form"
 *   onSubmit={handleSubmit}
 * >
 *   <input name="email" />
 *   <button type="submit">Submit</button>
 * </TrackedForm>
 * ```
 */
export function TrackedForm({
  trackId,
  trackProperties,
  onSubmit,
  children,
  ...props
}: TrackedFormProps) {
  const { trackSubmit } = useFormTracking(trackId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    trackSubmit(trackProperties);
    onSubmit?.(e);
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
}

interface TrackedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  trackId: string;
  formId: string;
}

/**
 * Input that tracks focus, blur, and changes
 *
 * @example
 * ```tsx
 * <TrackedInput
 *   trackId="email-field"
 *   formId="contact-form"
 *   type="email"
 *   name="email"
 * />
 * ```
 */
export function TrackedInput({
  trackId,
  formId,
  onFocus,
  onBlur,
  onChange,
  ...props
}: TrackedInputProps) {
  const { trackField } = useFormTracking(formId);

  return (
    <input
      onFocus={(e) => {
        trackField(trackId, "focus");
        onFocus?.(e);
      }}
      onBlur={(e) => {
        trackField(trackId, "blur");
        onBlur?.(e);
      }}
      onChange={(e) => {
        trackField(trackId, "change");
        onChange?.(e);
      }}
      {...props}
    />
  );
}

interface TrackedTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  trackId: string;
  formId: string;
}

/**
 * TextArea that tracks focus, blur, and changes
 *
 * @example
 * ```tsx
 * <TrackedTextArea
 *   trackId="message-field"
 *   formId="contact-form"
 *   name="message"
 * />
 * ```
 */
export function TrackedTextArea({
  trackId,
  formId,
  onFocus,
  onBlur,
  onChange,
  ...props
}: TrackedTextAreaProps) {
  const { trackField } = useFormTracking(formId);

  return (
    <textarea
      onFocus={(e) => {
        trackField(trackId, "focus");
        onFocus?.(e);
      }}
      onBlur={(e) => {
        trackField(trackId, "blur");
        onBlur?.(e);
      }}
      onChange={(e) => {
        trackField(trackId, "change");
        onChange?.(e);
      }}
      {...props}
    />
  );
}
