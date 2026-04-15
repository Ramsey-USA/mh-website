import * as Sentry from "@sentry/browser";

let isInitialized = false;

export function initSentry(): void {
  const dsn = process.env["NEXT_PUBLIC_SENTRY_DSN"];

  if (!dsn) {
    if (process.env.NODE_ENV === "development") {
      console.info("[Sentry] DSN not configured, skipping initialization");
    }
    return;
  }

  if (isInitialized) {
    return;
  }

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV || "production",
    release: process.env["NEXT_PUBLIC_APP_VERSION"] || "unknown",
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  });

  isInitialized = true;

  if (process.env.NODE_ENV === "development") {
    console.info("[Sentry] Initialized successfully");
  }
}

export function captureException(
  error: Error | unknown,
  context?: Record<string, unknown>,
): void {
  if (context) {
    Sentry.withScope((scope) => {
      scope.setExtras(context);
      if (error instanceof Error) {
        Sentry.captureException(error);
      } else {
        Sentry.captureMessage(String(error), "error");
      }
    });
    return;
  }

  if (error instanceof Error) {
    Sentry.captureException(error);
  } else {
    Sentry.captureMessage(String(error), "error");
  }
}

export function captureMessage(
  message: string,
  level: Sentry.SeverityLevel = "info",
  extra?: Record<string, unknown>,
): void {
  if (extra) {
    Sentry.withScope((scope) => {
      scope.setExtras(extra);
      Sentry.captureMessage(message, level);
    });
    return;
  }

  Sentry.captureMessage(message, level);
}

export function setUser(
  user: {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
  } | null,
): void {
  if (!user) {
    Sentry.setUser(null);
    return;
  }

  const sentryUser: Sentry.User = {};

  if (user.id) {
    sentryUser.id = user.id;
  }
  if (user.email) {
    sentryUser.email = user.email;
  }
  if (user.name) {
    sentryUser.username = user.name;
  }

  Sentry.setUser(sentryUser);

  if (user.role) {
    Sentry.setTag("role", user.role);
  }
}

export function addBreadcrumb(breadcrumb: Sentry.Breadcrumb): void {
  Sentry.addBreadcrumb(breadcrumb);
}

export { Sentry };
