"use client";

import { Component, type ReactNode } from "react";
import { logger } from "@/lib/utils/logger";
import { captureException } from "@/lib/monitoring/sentry";
import { ErrorFallbackCard } from "@/components/error/ErrorFallbackCard";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const safeContext = {
      boundary: "component-error-boundary",
      errorName: error.name,
      componentStackPresent: Boolean(errorInfo.componentStack),
    };

    logger.error("Error caught by ErrorBoundary", safeContext);

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Track error in Sentry
    captureException(error, safeContext);

    // Track error in analytics if available
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exception", {
        description: "component-error-boundary",
        fatal: true,
      });
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  override render() {
    if (this.state.hasError && this.state.error) {
      // Custom fallback provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }

      // Default fallback UI
      return <DefaultErrorFallback reset={this.resetError} />;
    }

    return this.props.children;
  }
}

/**
 * Default Error Fallback Component
 */
function DefaultErrorFallback({ reset }: { reset: () => void }) {
  return (
    <ErrorFallbackCard
      reset={reset}
      heading="Oops! Something went wrong"
      message="We encountered an unexpected error. Don't worry, our team has been notified and we're working on fixing it."
      tryAgainLabel="Try Again"
      homeLabel="Go Home"
      contactLabel="Contact Support"
      alert
    />
  );
}
