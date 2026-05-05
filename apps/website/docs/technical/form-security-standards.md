# Form Security Standards

**Category:** Technical - Security  
**Last Updated:** April 14, 2026  
**Version:** 1.0.0  
**Status:** ✅ Active - Mandatory

## 🧭 Quick Navigation

- [📚 Development Standards](../development/standards/development-standards.md)
- [🔐 Secrets Management](./secrets-management.md)
- [🔑 Admin Password Security](./admin-password-security.md)

---

## 🎯 Purpose

This document establishes **mandatory security standards** for all public-facing forms on the MH Construction website. These standards protect against bot submissions, spam, and malicious attacks while maintaining a positive user experience.

---

## 🛡️ Security Architecture Overview

All public forms implement a **defense-in-depth** approach with multiple layers:

| Layer                    | Protection                        | Status      |
| ------------------------ | --------------------------------- | ----------- |
| **Cloudflare Turnstile** | Bot detection & CAPTCHA           | ✅ Required |
| **Rate Limiting**        | Request throttling per IP         | ✅ Active   |
| **Input Validation**     | Server-side field validation      | ✅ Active   |
| **CSRF Protection**      | Cross-site request forgery tokens | ✅ Active   |
| **Security Headers**     | CSP, HSTS, XSS protection         | ✅ Active   |
| **Audit Logging**        | All submissions logged            | ✅ Active   |
| **Trust Indicators**     | User-visible security badges      | ✅ Required |

---

## 🔒 Cloudflare Turnstile Integration

### What is Turnstile?

Cloudflare Turnstile is a privacy-preserving CAPTCHA alternative that:

- Runs invisibly in most cases (no user interaction needed)
- Falls back to a simple checkbox challenge when needed
- Provides strong bot protection without annoying users
- Is free for unlimited use

### Required Environment Variables

```env
# Client-side (public) - used in browser
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key

# Server-side (secret) - used for verification
TURNSTILE_SECRET_KEY=your_secret_key
```

Get keys from [Cloudflare Dashboard → Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile).

### Forms Requiring Turnstile

| Form                 | API Route               | Priority | Status         |
| -------------------- | ----------------------- | -------- | -------------- |
| Job Application      | `/api/job-applications` | Critical | ✅ Implemented |
| Safety Intake        | `/api/safety/intake`    | Critical | ✅ Implemented |
| Newsletter Signup    | `/api/newsletter`       | High     | 🔄 Required    |
| Consultation Request | `/api/consultations`    | High     | 🔄 Required    |
| Contact Form         | `/api/contact`          | High     | 🔄 Required    |

---

## 📋 Implementation Checklist

### Client-Side (React Component)

Every form component MUST include:

- [ ] **Turnstile Script Loading** via `next/script`
- [ ] **Turnstile Widget** rendered in the form
- [ ] **Trust Indicator** showing users the form is protected
- [ ] **Token State Management** to track verification status
- [ ] **Pre-submit Validation** blocking submission without token
- [ ] **Error Handling** with token reset on failures

### Standard Implementation Pattern

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

const TURNSTILE_SITE_KEY = process.env["NEXT_PUBLIC_TURNSTILE_SITE_KEY"] ?? "";

// Turnstile type definition
declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

export function SecureForm() {
  // Turnstile state
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);

  const mountTurnstile = useCallback(() => {
    if (!turnstileRef.current || !window.turnstile || !TURNSTILE_SITE_KEY) {
      return;
    }
    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
    }
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "auto",
      callback: (token) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
    });
    setTurnstileReady(true);
  }, []);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken("");
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Verify Turnstile token if configured
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError("Please complete the security verification.");
      return;
    }

    // Include token in submission
    const response = await fetch("/api/your-endpoint", {
      method: "POST",
      body: JSON.stringify({ ...formData, turnstileToken }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields... */}

      {/* Security Trust Indicator & Turnstile Widget */}
      <div className="rounded-2xl border-2 border-brand-primary/20 bg-gradient-to-r from-brand-primary/5 to-brand-primary/10 p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-primary/15 rounded-xl">
              <MaterialIcon
                icon="verified_user"
                size="md"
                className="text-brand-primary"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Your data is protected
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                SSL encrypted • Rate limited • Bot protected
              </p>
            </div>
          </div>
          {TURNSTILE_SITE_KEY && (
            <div ref={turnstileRef} className="cf-turnstile" />
          )}
        </div>
      </div>

      {/* Submit button... */}

      {/* Load Turnstile script */}
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
          onLoad={mountTurnstile}
        />
      )}
    </form>
  );
}
```

### Server-Side (API Route)

Every API route handling form submissions MUST:

- [ ] **Import Turnstile Verifier**: `import { verifyTurnstileToken } from "@/lib/security/turnstile";`
- [ ] **Accept Token in Request Body**: Add `turnstileToken?: string` to interface
- [ ] **Verify Token Server-Side**: Call `verifyTurnstileToken()` before processing
- [ ] **Enforce in Production**: Require token when `TURNSTILE_SECRET_KEY` is set
- [ ] **Apply Rate Limiting**: Wrap handler with `rateLimit()` middleware

### Standard API Route Pattern

```typescript
import { type NextRequest, NextResponse } from "next/server";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";
import { withSecurity } from "@/middleware/security";

interface FormData {
  // ... your fields
  turnstileToken?: string;
}

async function handlePOST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as FormData;

  // Verify Turnstile token
  if (body.turnstileToken) {
    const clientIp = request.headers.get("cf-connecting-ip") ?? undefined;
    const verification = await verifyTurnstileToken(
      body.turnstileToken,
      clientIp,
    );

    if (!verification.success && !verification.skipped) {
      return NextResponse.json(
        { error: "Security verification failed. Please try again." },
        { status: 400 },
      );
    }
  } else if (
    process.env.NODE_ENV === "production" &&
    process.env["TURNSTILE_SECRET_KEY"]
  ) {
    return NextResponse.json(
      { error: "Security verification is required." },
      { status: 400 },
    );
  }

  // Process form submission...
}

export const POST = rateLimit(rateLimitPresets.api)(withSecurity(handlePOST));
```

---

## 🎨 Trust Indicator Standards

All forms MUST display a visible trust indicator to reassure users their data is protected.

### Required Elements

1. **Shield/Lock Icon**: `verified_user` or `lock` Material Icon
2. **Primary Text**: "Your data is protected"
3. **Secondary Text**: "SSL encrypted • Rate limited • Bot protected"
4. **Turnstile Widget**: Rendered inline (when configured)
5. **Status Feedback**: Loading, verification required, or verified states

### Brand-Compliant Styling

```tsx
<div className="rounded-2xl border-2 border-brand-primary/20 bg-gradient-to-r from-brand-primary/5 to-brand-primary/10 p-4 dark:border-brand-primary/30 dark:from-brand-primary/10 dark:to-brand-primary/15">
  {/* Trust indicator content */}
</div>
```

---

## ⚡ Rate Limiting Configuration

### Presets by Form Type

| Form Type        | Preset | Max Requests | Window |
| ---------------- | ------ | ------------ | ------ |
| Job Applications | `api`  | 100          | 15 min |
| Newsletter       | `api`  | 100          | 15 min |
| Consultations    | `api`  | 100          | 15 min |
| Contact          | `api`  | 100          | 15 min |
| File Uploads     | Custom | 5            | 1 min  |
| Auth Attempts    | `auth` | 10           | 15 min |

### Custom Rate Limit Example

```typescript
export const POST = rateLimit({
  maxRequests: 5,
  windowMs: 60000, // 1 minute
  message: "Too many submissions. Please wait before trying again.",
})(withSecurity(handlePOST));
```

---

## 🧪 Testing Requirements

### Unit Tests

- [ ] Form submits successfully with valid Turnstile token
- [ ] Form rejects submission without token (when required)
- [ ] Turnstile widget resets on error
- [ ] Trust indicator displays correctly

### Integration Tests

- [ ] API route verifies Turnstile token
- [ ] API route rejects invalid tokens
- [ ] Rate limiting blocks excessive requests
- [ ] Error messages are user-friendly

---

## 📊 Monitoring & Alerts

### Metrics to Track

- Turnstile verification failures
- Rate limit triggers by IP
- Form submission success/failure rates
- Bot detection events

### Audit Log Events

All form submissions are logged via `auditLogger` with:

- IP address
- User agent
- Timestamp
- Submission type
- Success/failure status

---

## 🔄 Migration Guide

### Adding Turnstile to Existing Form

1. **Update Component**: Add Turnstile state, refs, and callbacks
2. **Add Trust Indicator**: Display security badge with Turnstile widget
3. **Update Submit Handler**: Check for token before submission
4. **Update API Route**: Import verifier and validate token
5. **Test Thoroughly**: Verify both success and error paths
6. **Update Documentation**: Note Turnstile requirement

### Environment Setup

1. Create Turnstile widget in Cloudflare Dashboard
2. Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` to `.env`
3. Add `TURNSTILE_SECRET_KEY` to `.env` and Cloudflare secrets
4. Deploy and verify

---

## 📚 Related Documentation

- [Secrets Management](./secrets-management.md) - Environment variable handling
- [Admin Password Security](./admin-password-security.md) - Authentication security
- [Development Standards](../development/standards/development-standards.md) - Code standards
- [Contributing Guide](../../contributing.md) - PR requirements

---

## ✅ Compliance Verification

Before deploying any new form, verify:

- [ ] Turnstile integration complete (client + server)
- [ ] Trust indicator displayed
- [ ] Rate limiting applied
- [ ] Input validation implemented
- [ ] Error handling includes token reset
- [ ] Tests cover security flows
- [ ] Documentation updated
