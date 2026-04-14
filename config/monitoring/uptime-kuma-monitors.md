# Uptime Kuma Monitor Configuration

**Status:** ✅ Deployed and operational (April 14, 2026)
**Active Monitors:** 3 (MHC Website, n8n Health, Portainer Health)
**Notifications:** Email via Resend SMTP

This file documents the monitors configured in Uptime Kuma.

## Access

- **URL:** `http://status.mhc-gc.com:3001`
- **Admin:** Account created

---

## Active Monitors

### 1. MHC Website (Production)

| Setting       | Value            |
| ------------- | ---------------- |
| Monitor Type  | TCP Port         |
| Friendly Name | MHC Website      |
| Hostname      | `www.mhc-gc.com` |
| Port          | `443`            |
| Heartbeat     | Every 60 seconds |
| Status        | ✅ Up            |

> **Note:** Using TCP instead of HTTP to bypass Cloudflare bot protection (403 errors).
> TCP monitoring verifies the server is accepting connections on port 443.

### 2. n8n Health (Internal)

| Setting       | Value                     |
| ------------- | ------------------------- |
| Monitor Type  | HTTP(s)                   |
| Friendly Name | n8n Health                |
| URL           | `http://n8n:5678/healthz` |
| Heartbeat     | Every 60 seconds          |
| Status        | ✅ Up                     |

> **Note:** Uses Docker container name `n8n` for internal network communication.

### 3. Portainer Health (Internal)

| Setting       | Value                    |
| ------------- | ------------------------ |
| Monitor Type  | HTTP(s)                  |
| Friendly Name | Portainer Health         |
| URL           | `https://portainer:9443` |
| Heartbeat     | Every 300 seconds        |
| Ignore TLS    | Yes (self-signed cert)   |
| Status        | ✅ Up                    |

---

## Notification Channels

### Email via Resend SMTP (Active)

| Setting         | Value                     |
| --------------- | ------------------------- |
| Type            | SMTP                      |
| Friendly Name   | Email Alert               |
| Hostname        | `smtp.resend.com`         |
| Port            | `465`                     |
| Security        | TLS                       |
| Username        | `resend`                  |
| Password        | Resend API key            |
| From Email      | `onboarding@resend.dev`\* |
| To Email        | `matt@mhc-gc.com`         |
| Default enabled | ✅ Yes                    |
| Status          | ✅ Configured and tested  |

> \*Update to `notifications@mhc-gc.com` now that domain is verified.

### Twilio SMS (Optional)

- **Type:** Twilio
- **Account SID:** (from Twilio console)
- **Auth Token:** (from Twilio console)
- **From Number:** (your Twilio number)
- **To Number:** Matt's phone

### Push Notification (Recommended)

- **Type:** Apprise / Ntfy / Pushover
- Download Uptime Kuma app on mobile for push notifications

---

## Status Page (Optional)

Create a public status page at: `http://2.24.199.37:3001/status/mhc`

Include monitors:

- MHC Website (Production)
- Contact API Health

**Settings:**

- Theme: Dark
- Title: MH Construction Status
- Description: System status for mhc-gc.com
- Show powered by: No

---

## Quick Setup Commands

After creating admin account, you can also add monitors via API:

```bash
# Get API token from Settings > API Keys in Uptime Kuma

# Add monitor via curl
curl -X POST http://2.24.199.37:3001/api/monitors \
  -H "Authorization: Basic YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "http",
    "name": "MHC Website",
    "url": "https://www.mhc-gc.com",
    "interval": 60,
    "retryInterval": 60,
    "maxretries": 3
  }'
```
