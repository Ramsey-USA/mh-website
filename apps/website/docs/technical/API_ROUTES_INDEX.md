# API Routes Reference

This document provides a centralized index of all API endpoints in the MH Construction website. Each endpoint is documented with its purpose, method, parameters, and response format.

**Base URL:** `/api`

**Brand Congruency:** Route naming, endpoint labels, and API descriptions should stay aligned with approved MH terminology and trust-safe language.

---

## Table of Contents

1. [Authentication](#authentication)
2. [Analytics](#analytics)
3. [Forms & Submissions](#forms--submissions)
4. [Safety Management](#safety-management)
5. [Drivers & Alerts](#drivers--alerts)
6. [Security](#security)
7. [Utilities](#utilities)

---

## Authentication

### Admin Login

- **Path:** `/auth/admin-login`
- **Method:** `POST`
- **Purpose:** Authenticate admin users and generate JWT tokens
- **Rate Limit:** 3 attempts per 5 minutes (strict)
- **Request Body:**
  ```json
  {
    "email": "matt@mhc-gc.com",
    "password": "password_here"
  }
  ```
- **Response:** `{ success: true, accessToken, refreshToken, user, expiresIn }`
- **Implementation:** [apps/dashboard/src/app/api/auth/admin-login/route.ts](../../apps/dashboard/src/app/api/auth/admin-login/route.ts)

### Logout

- **Path:** `/auth/logout`
- **Method:** `POST`
- **Purpose:** Invalidate user session
- **Response:** `{ success: true }`
- **Implementation:** [apps/dashboard/src/app/api/auth/logout/route.ts](../../apps/dashboard/src/app/api/auth/logout/route.ts)

### Refresh Token

- **Path:** `/auth/refresh`
- **Method:** `POST`
- **Purpose:** Refresh expired access token using refresh token
- **Request Body:** `{ refreshToken: "token_here" }`
- **Response:** `{ accessToken, expiresIn }`
- **Implementation:** [apps/dashboard/src/app/api/auth/refresh/route.ts](../../apps/dashboard/src/app/api/auth/refresh/route.ts)

### Field Login

- **Path:** `/auth/field-login`
- **Method:** `POST`
- **Purpose:** Authenticate field staff
- **Implementation:** [apps/dashboard/src/app/api/auth/field-login/route.ts](../../apps/dashboard/src/app/api/auth/field-login/route.ts)

### Hub Login

- **Path:** `/auth/hub-login`
- **Method:** `POST`
- **Purpose:** Authenticate hub/admin staff
- **Implementation:** [apps/dashboard/src/app/api/auth/hub-login/route.ts](../../apps/dashboard/src/app/api/auth/hub-login/route.ts)

---

## Analytics

### Collect Analytics

- **Path:** `/analytics/collect`
- **Method:** `POST`
- **Purpose:** Deprecated. Website analytics collection now uses Google Analytics events.
- **Implementation:** Removed from website runtime.

### Analytics Dashboard

- **Path:** `/analytics/dashboard`
- **Method:** `GET`
- **Purpose:** Retrieve dashboard analytics data for admin users
- **Authorization:** Required (admin)
- **Implementation:** [apps/dashboard/src/app/api/analytics/dashboard/route.ts](../../apps/dashboard/src/app/api/analytics/dashboard/route.ts)

### Geolocation Analytics

- **Path:** `/analytics/geolocation`
- **Method:** `POST`
- **Purpose:** Deprecated. Geolocation enrichment endpoint removed from website runtime.
- **Implementation:** Removed from website runtime.

---

## Forms & Submissions

### Contact Form

- **Path:** `/contact`
- **Method:** `POST`
- **Purpose:** Submit general contact/inquiry form
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I have a project...",
    "type": "contact",
    "phone": "5093086489"
  }
  ```
- **Response:** `{ success: true, submissionId, message }`
- **Implementation:** [apps/website/src/app/api/contact/route.ts](../../apps/website/src/app/api/contact/route.ts)

### Consultations

- **Path:** `/consultations`
- **Method:** `POST` (submit), `GET` (retrieve)
- **Purpose:** Schedule project consultations
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "projectType": "Commercial Build",
    "budget": 250000,
    "timeline": "6 months",
    "selectedDate": "2026-05-01",
    "selectedTime": "10:00"
  }
  ```
- **Implementation:** [apps/website/src/app/api/consultations/route.ts](../../apps/website/src/app/api/consultations/route.ts)

### Get Consultation by ID

- **Path:** `/consultations/[id]`
- **Method:** `GET`
- **Purpose:** Retrieve specific consultation details
- **Authorization:** Required (admin)
- **Implementation:** [apps/website/src/app/api/consultations/[id]/route.ts](../../apps/website/src/app/api/consultations/[id]/route.ts)

### Job Applications

- **Path:** `/job-applications`
- **Method:** `POST`
- **Purpose:** Submit job application
- **Request Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com",
    "phone": "5093086489",
    "position": "Superintendent",
    "experience": "8 years",
    "availability": "2 weeks"
  }
  ```
- **Implementation:** [apps/website/src/app/api/job-applications/route.ts](../../apps/website/src/app/api/job-applications/route.ts)

### Newsletter Subscription

- **Path:** `/newsletter`
- **Method:** `POST`
- **Purpose:** Subscribe to newsletter
- **Request Body:** `{ email: "user@example.com" }`
- **Response:** `{ success: true, message }`
- **Implementation:** [apps/website/src/app/api/newsletter/route.ts](../../apps/website/src/app/api/newsletter/route.ts)

---

## Safety Management

### Safety Forms

- **Path:** `/safety/forms`
- **Method:** `GET` (list), `POST` (create)
- **Purpose:** Manage safety incident reports
- **Authorization:** Required
- **Implementation:** [apps/dashboard/src/app/api/safety/forms/route.ts](../../apps/dashboard/src/app/api/safety/forms/route.ts)

### Get Safety Form by ID

- **Path:** `/safety/forms/[id]`
- **Method:** `GET`, `PUT`
- **Purpose:** Retrieve or update specific safety form
- **Implementation:** [apps/dashboard/src/app/api/safety/forms/[id]/route.ts](../../apps/dashboard/src/app/api/safety/forms/[id]/route.ts)

### Safety Intake

- **Path:** `/safety/intake`
- **Method:** `GET` (list), `POST` (create)
- **Purpose:** Manage safety intake submissions
- **Authorization:** Required
- **Implementation:** [apps/dashboard/src/app/api/safety/intake/route.ts](../../apps/dashboard/src/app/api/safety/intake/route.ts)

### Get Safety Intake by ID

- **Path:** `/safety/intake/[id]`
- **Method:** `GET`, `PUT`
- **Purpose:** Retrieve or update specific intake record
- **Implementation:** [apps/dashboard/src/app/api/safety/intake/[id]/route.ts](../../apps/dashboard/src/app/api/safety/intake/[id]/route.ts)

### Upload Safety Intake File

- **Path:** `/safety/intake/[id]/file`
- **Method:** `POST`
- **Purpose:** Upload document for safety intake
- **Implementation:** [apps/dashboard/src/app/api/safety/intake/[id]/file/route.ts](../../apps/dashboard/src/app/api/safety/intake/[id]/file/route.ts)

### Safety Download Log

- **Path:** `/safety/downloads`
- **Method:** `GET`, `POST`
- **Purpose:** Track safety document downloads
- **Implementation:** [apps/dashboard/src/app/api/safety/downloads/route.ts](../../apps/dashboard/src/app/api/safety/downloads/route.ts)

### Safety Access Log

- **Path:** `/safety/access-log`
- **Method:** `GET`
- **Purpose:** Retrieve access logs for safety resources
- **Authorization:** Required
- **Implementation:** [apps/dashboard/src/app/api/safety/access-log/route.ts](../../apps/dashboard/src/app/api/safety/access-log/route.ts)

### Safety Jobs

- **Path:** `/safety/jobs`
- **Method:** `GET` (list), `POST` (create)
- **Purpose:** Manage safety job records
- **Implementation:** [apps/dashboard/src/app/api/safety/jobs/route.ts](../../apps/dashboard/src/app/api/safety/jobs/route.ts)

### Get Safety Job by ID

- **Path:** `/safety/jobs/[id]`
- **Method:** `GET`, `PUT`
- **Purpose:** Retrieve or update specific job safety info
- **Implementation:** [apps/dashboard/src/app/api/safety/jobs/[id]/route.ts](../../apps/dashboard/src/app/api/safety/jobs/[id]/route.ts)

---

## Drivers & Alerts

### Drivers List

- **Path:** `/drivers`
- **Method:** `GET` (list), `POST` (create)
- **Purpose:** Manage authorized drivers database
- **Authorization:** Required
- **Implementation:** [apps/dashboard/src/app/api/drivers/route.ts](../../apps/dashboard/src/app/api/drivers/route.ts)

### Get Driver by ID

- **Path:** `/drivers/[id]`
- **Method:** `GET`, `PUT`
- **Purpose:** Retrieve or update driver information
- **Implementation:** [apps/dashboard/src/app/api/drivers/[id]/route.ts](../../apps/dashboard/src/app/api/drivers/[id]/route.ts)

### Driver Alerts

- **Path:** `/drivers/alerts`
- **Method:** `GET`
- **Purpose:** Retrieve driver safety alerts
- **Authorization:** Required
- **Implementation:** [apps/dashboard/src/app/api/drivers/alerts/route.ts](../../apps/dashboard/src/app/api/drivers/alerts/route.ts)

### Check Driver Alerts

- **Path:** `/drivers/check-alerts`
- **Method:** `POST`
- **Purpose:** Check for active driver alerts
- **Request Body:** `{ driverId: "uuid" }`
- **Implementation:** [apps/dashboard/src/app/api/drivers/check-alerts/route.ts](../../apps/dashboard/src/app/api/drivers/check-alerts/route.ts)

---

## Security

### Security Status

- **Path:** `/security/status`
- **Method:** `GET`
- **Purpose:** Get current security status
- **Response:** `{ status: "healthy|warning|critical", incidents: [...] }`
- **Implementation:** [apps/dashboard/src/app/api/security/status/route.ts](../../apps/dashboard/src/app/api/security/status/route.ts)

### Security Events

- **Path:** `/security/events`
- **Method:** `GET`, `POST`
- **Purpose:** Log and retrieve security events
- **Authorization:** Required
- **Implementation:** [apps/dashboard/src/app/api/security/events/route.ts](../../apps/dashboard/src/app/api/security/events/route.ts)

### Cloudflare Security

- **Path:** `/security/cloudflare`
- **Method:** `GET`
- **Purpose:** Retrieve Cloudflare security metrics
- **Authorization:** Required
- **Implementation:** [apps/dashboard/src/app/api/security/cloudflare/route.ts](../../apps/dashboard/src/app/api/security/cloudflare/route.ts)

---

## Utilities

### Health Check

- **Path:** `/health`
- **Method:** `GET`
- **Purpose:** Verify API and database connectivity
- **Response:** `{ status: "ok", timestamp, uptime }`
- **Implementation:** [apps/website/src/app/api/health/route.ts](../../apps/website/src/app/api/health/route.ts)

### Chat AI

- **Path:** `/chat`
- **Method:** `POST`
- **Purpose:** Send message to AI chat assistant
- **Implementation:** [apps/website/src/app/api/chat/route.ts](../../apps/website/src/app/api/chat/route.ts)

### Upload Resume

- **Path:** `/upload/resume`
- **Method:** `POST`
- **Purpose:** Upload resume file for job application
- **Content-Type:** `multipart/form-data`
- **Form Fields:** `{ file, email }`
- **Implementation:** [apps/website/src/app/api/upload/resume/route.ts](../../apps/website/src/app/api/upload/resume/route.ts)

### Track Phone Call

- **Path:** `/track-phone-call`
- **Method:** `POST`
- **Purpose:** Track incoming phone calls for analytics
- **Implementation:** [apps/website/src/app/api/track-phone-call/route.ts](../../apps/website/src/app/api/track-phone-call/route.ts)

### Dynamic Functions

- **Path:** `/functions/[functionName]`
- **Method:** `POST`
- **Purpose:** Execute dynamic server functions
- **Authorization:** Required
- **Implementation:** [apps/dashboard/src/app/api/functions/[functionName]/route.ts](../../apps/dashboard/src/app/api/functions/[functionName]/route.ts)

### Testimonials Publish

- **Path:** `/testimonials/publish`
- **Method:** `POST`
- **Purpose:** Publish new testimonials
- **Implementation:** [apps/dashboard/src/app/api/testimonials/publish/route.ts](../../apps/dashboard/src/app/api/testimonials/publish/route.ts)

### Leads Management

- **Path:** `/leads`
- **Method:** `GET`, `POST`
- **Purpose:** Manage CRM leads
- **Authorization:** Required
- **Implementation:** [apps/dashboard/src/app/api/leads/route.ts](../../apps/dashboard/src/app/api/leads/route.ts)

### Sync Leads

- **Path:** `/leads/sync`
- **Method:** `POST`
- **Purpose:** Sync leads with external CRM system
- **Authorization:** Required
- **Implementation:** [apps/dashboard/src/app/api/leads/sync/route.ts](../../apps/dashboard/src/app/api/leads/sync/route.ts)

---

## Error Handling

All endpoints follow consistent error response patterns:

### Success Response

```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed successfully"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error description",
  "code": "ERROR_CODE",
  "timestamp": "2026-04-21T16:31:46.668Z"
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests (Rate Limited)
- `500` - Internal Server Error

---

## Authentication & Authorization

Most endpoints require authentication via JWT token:

```header
Authorization: Bearer {accessToken}
```

**Roles:**

- `admin` - Full access to all endpoints
- `field` - Limited to field operations
- `hub` - Hub/admin operations

---

## Rate Limiting

API endpoints have rate limiting to prevent abuse:

- **Standard:** 100 requests per 10 minutes per IP
- **Strict:** 3 requests per 5 minutes (admin login)
- **Relaxed:** 1000 requests per hour (public analytics)

Rate limit info is included in response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1713712306
```

---

## Documentation Updates

When adding new API endpoints:

1. Add Route implementation in `src/app/api/`
2. Update this index with:
   - Path and method
   - Purpose description
   - Request/response examples
   - Authorization requirements
   - Link to implementation

See [API Development Guidelines](./API_DEVELOPMENT.md) for more details.

---

Generated: April 21, 2026  
Last Updated: April 21, 2026  
Maintain this document when adding new API endpoints.
