# API Routes Reference

This document provides a centralized index of all API endpoints in the MH Construction website. Each endpoint is documented with its purpose, method, parameters, and response format.

**Base URL:** `/api`

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
- **Implementation:** [src/app/api/auth/admin-login/route.ts](../../src/app/api/auth/admin-login/route.ts)

### Logout

- **Path:** `/auth/logout`
- **Method:** `POST`
- **Purpose:** Invalidate user session
- **Response:** `{ success: true }`
- **Implementation:** [src/app/api/auth/logout/route.ts](../../src/app/api/auth/logout/route.ts)

### Refresh Token

- **Path:** `/auth/refresh`
- **Method:** `POST`
- **Purpose:** Refresh expired access token using refresh token
- **Request Body:** `{ refreshToken: "token_here" }`
- **Response:** `{ accessToken, expiresIn }`
- **Implementation:** [src/app/api/auth/refresh/route.ts](../../src/app/api/auth/refresh/route.ts)

### Field Login

- **Path:** `/auth/field-login`
- **Method:** `POST`
- **Purpose:** Authenticate field staff
- **Implementation:** [src/app/api/auth/field-login/route.ts](../../src/app/api/auth/field-login/route.ts)

### Hub Login

- **Path:** `/auth/hub-login`
- **Method:** `POST`
- **Purpose:** Authenticate hub/admin staff
- **Implementation:** [src/app/api/auth/hub-login/route.ts](../../src/app/api/auth/hub-login/route.ts)

---

## Analytics

### Collect Analytics

- **Path:** `/analytics/collect`
- **Method:** `POST`
- **Purpose:** Track page views and custom events
- **Request Body:**
  ```json
  {
    "page": "/",
    "event": "page_view",
    "properties": { "referrer": "..." }
  }
  ```
- **Implementation:** [src/app/api/analytics/collect/route.ts](../../src/app/api/analytics/collect/route.ts)

### Analytics Dashboard

- **Path:** `/analytics/dashboard`
- **Method:** `GET`
- **Purpose:** Retrieve analytics dashboard data
- **Query Params:** `?start=2026-01-01&end=2026-12-31`
- **Authorization:** Required (admin)
- **Implementation:** [src/app/api/analytics/dashboard/route.ts](../../src/app/api/analytics/dashboard/route.ts)

### Geolocation Analytics

- **Path:** `/analytics/geolocation`
- **Method:** `POST`
- **Purpose:** Track visitor geolocation data
- **Implementation:** [src/app/api/analytics/geolocation/route.ts](../../src/app/api/analytics/geolocation/route.ts)

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
- **Implementation:** [src/app/api/contact/route.ts](../../src/app/api/contact/route.ts)

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
- **Implementation:** [src/app/api/consultations/route.ts](../../src/app/api/consultations/route.ts)

### Get Consultation by ID

- **Path:** `/consultations/[id]`
- **Method:** `GET`
- **Purpose:** Retrieve specific consultation details
- **Authorization:** Required (admin)
- **Implementation:** [src/app/api/consultations/[id]/route.ts](../../src/app/api/consultations/[id]/route.ts)

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
- **Implementation:** [src/app/api/job-applications/route.ts](../../src/app/api/job-applications/route.ts)

### Newsletter Subscription

- **Path:** `/newsletter`
- **Method:** `POST`
- **Purpose:** Subscribe to newsletter
- **Request Body:** `{ email: "user@example.com" }`
- **Response:** `{ success: true, message }`
- **Implementation:** [src/app/api/newsletter/route.ts](../../src/app/api/newsletter/route.ts)

---

## Safety Management

### Safety Forms

- **Path:** `/safety/forms`
- **Method:** `GET` (list), `POST` (create)
- **Purpose:** Manage safety incident reports
- **Authorization:** Required
- **Implementation:** [src/app/api/safety/forms/route.ts](../../src/app/api/safety/forms/route.ts)

### Get Safety Form by ID

- **Path:** `/safety/forms/[id]`
- **Method:** `GET`, `PUT`
- **Purpose:** Retrieve or update specific safety form
- **Implementation:** [src/app/api/safety/forms/[id]/route.ts](../../src/app/api/safety/forms/[id]/route.ts)

### Safety Intake

- **Path:** `/safety/intake`
- **Method:** `GET` (list), `POST` (create)
- **Purpose:** Manage safety intake submissions
- **Authorization:** Required
- **Implementation:** [src/app/api/safety/intake/route.ts](../../src/app/api/safety/intake/route.ts)

### Get Safety Intake by ID

- **Path:** `/safety/intake/[id]`
- **Method:** `GET`, `PUT`
- **Purpose:** Retrieve or update specific intake record
- **Implementation:** [src/app/api/safety/intake/[id]/route.ts](../../src/app/api/safety/intake/[id]/route.ts)

### Upload Safety Intake File

- **Path:** `/safety/intake/[id]/file`
- **Method:** `POST`
- **Purpose:** Upload document for safety intake
- **Implementation:** [src/app/api/safety/intake/[id]/file/route.ts](../../src/app/api/safety/intake/[id]/file/route.ts)

### Safety Download Log

- **Path:** `/safety/downloads`
- **Method:** `GET`, `POST`
- **Purpose:** Track safety document downloads
- **Implementation:** [src/app/api/safety/downloads/route.ts](../../src/app/api/safety/downloads/route.ts)

### Safety Access Log

- **Path:** `/safety/access-log`
- **Method:** `GET`
- **Purpose:** Retrieve access logs for safety resources
- **Authorization:** Required
- **Implementation:** [src/app/api/safety/access-log/route.ts](../../src/app/api/safety/access-log/route.ts)

### Safety Jobs

- **Path:** `/safety/jobs`
- **Method:** `GET` (list), `POST` (create)
- **Purpose:** Manage safety job records
- **Implementation:** [src/app/api/safety/jobs/route.ts](../../src/app/api/safety/jobs/route.ts)

### Get Safety Job by ID

- **Path:** `/safety/jobs/[id]`
- **Method:** `GET`, `PUT`
- **Purpose:** Retrieve or update specific job safety info
- **Implementation:** [src/app/api/safety/jobs/[id]/route.ts](../../src/app/api/safety/jobs/[id]/route.ts)

---

## Drivers & Alerts

### Drivers List

- **Path:** `/drivers`
- **Method:** `GET` (list), `POST` (create)
- **Purpose:** Manage authorized drivers database
- **Authorization:** Required
- **Implementation:** [src/app/api/drivers/route.ts](../../src/app/api/drivers/route.ts)

### Get Driver by ID

- **Path:** `/drivers/[id]`
- **Method:** `GET`, `PUT`
- **Purpose:** Retrieve or update driver information
- **Implementation:** [src/app/api/drivers/[id]/route.ts](../../src/app/api/drivers/[id]/route.ts)

### Driver Alerts

- **Path:** `/drivers/alerts`
- **Method:** `GET`
- **Purpose:** Retrieve driver safety alerts
- **Authorization:** Required
- **Implementation:** [src/app/api/drivers/alerts/route.ts](../../src/app/api/drivers/alerts/route.ts)

### Check Driver Alerts

- **Path:** `/drivers/check-alerts`
- **Method:** `POST`
- **Purpose:** Check for active driver alerts
- **Request Body:** `{ driverId: "uuid" }`
- **Implementation:** [src/app/api/drivers/check-alerts/route.ts](../../src/app/api/drivers/check-alerts/route.ts)

---

## Security

### Security Status

- **Path:** `/security/status`
- **Method:** `GET`
- **Purpose:** Get current security status
- **Response:** `{ status: "healthy|warning|critical", incidents: [...] }`
- **Implementation:** [src/app/api/security/status/route.ts](../../src/app/api/security/status/route.ts)

### Security Events

- **Path:** `/security/events`
- **Method:** `GET`, `POST`
- **Purpose:** Log and retrieve security events
- **Authorization:** Required
- **Implementation:** [src/app/api/security/events/route.ts](../../src/app/api/security/events/route.ts)

### Cloudflare Security

- **Path:** `/security/cloudflare`
- **Method:** `GET`
- **Purpose:** Retrieve Cloudflare security metrics
- **Authorization:** Required
- **Implementation:** [src/app/api/security/cloudflare/route.ts](../../src/app/api/security/cloudflare/route.ts)

---

## Utilities

### Health Check

- **Path:** `/health`
- **Method:** `GET`
- **Purpose:** Verify API and database connectivity
- **Response:** `{ status: "ok", timestamp, uptime }`
- **Implementation:** [src/app/api/health/route.ts](../../src/app/api/health/route.ts)

### Chat AI

- **Path:** `/chat`
- **Method:** `POST`
- **Purpose:** Send message to AI chat assistant
- **Implementation:** [src/app/api/chat/route.ts](../../src/app/api/chat/route.ts)

### Upload Resume

- **Path:** `/upload/resume`
- **Method:** `POST`
- **Purpose:** Upload resume file for job application
- **Content-Type:** `multipart/form-data`
- **Form Fields:** `{ file, email }`
- **Implementation:** [src/app/api/upload/resume/route.ts](../../src/app/api/upload/resume/route.ts)

### Track Phone Call

- **Path:** `/track-phone-call`
- **Method:** `POST`
- **Purpose:** Track incoming phone calls for analytics
- **Implementation:** [src/app/api/track-phone-call/route.ts](../../src/app/api/track-phone-call/route.ts)

### Dynamic Functions

- **Path:** `/functions/[functionName]`
- **Method:** `POST`
- **Purpose:** Execute dynamic server functions
- **Authorization:** Required
- **Implementation:** [src/app/api/functions/[functionName]/route.ts](../../src/app/api/functions/[functionName]/route.ts)

### Testimonials Publish

- **Path:** `/testimonials/publish`
- **Method:** `POST`
- **Purpose:** Publish new testimonials
- **Implementation:** [src/app/api/testimonials/publish/route.ts](../../src/app/api/testimonials/publish/route.ts)

### Leads Management

- **Path:** `/leads`
- **Method:** `GET`, `POST`
- **Purpose:** Manage CRM leads
- **Authorization:** Required
- **Implementation:** [src/app/api/leads/route.ts](../../src/app/api/leads/route.ts)

### Sync Leads

- **Path:** `/leads/sync`
- **Method:** `POST`
- **Purpose:** Sync leads with external CRM system
- **Authorization:** Required
- **Implementation:** [src/app/api/leads/sync/route.ts](../../src/app/api/leads/sync/route.ts)

### Protocol Handler

- **Path:** `/protocol-handler`
- **Method:** `GET`
- **Purpose:** Handle custom protocol URLs
- **Implementation:** [src/app/api/protocol-handler/route.ts](../../src/app/api/protocol-handler/route.ts)

### File Handler

- **Path:** `/file-handler`
- **Method:** `GET`, `POST`
- **Purpose:** Handle file operations
- **Implementation:** [src/app/api/file-handler/route.ts](../../src/app/api/file-handler/route.ts)

### Resources - Safety Manual

- **Path:** `/resources/safety-manual`
- **Method:** `GET`
- **Purpose:** Retrieve safety manual resources
- **Implementation:** [src/app/api/resources/safety-manual/route.ts](../../src/app/api/resources/safety-manual/route.ts)

### Resources - Safety Program

- **Path:** `/resources/safety-program`
- **Method:** `GET`
- **Purpose:** Retrieve safety program information
- **Implementation:** [src/app/api/resources/safety-program/route.ts](../../src/app/api/resources/safety-program/route.ts)

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
