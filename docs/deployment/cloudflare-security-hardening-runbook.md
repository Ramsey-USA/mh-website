# Cloudflare Security Hardening Runbook

**Category:** Deployment - Cloudflare Security  
**Last Updated:** July 10, 2026

## Purpose

Convert Cloudflare Security Insights findings into an ordered, low-risk hardening sequence for
`mhc-gc.com` and `hd-drywall.net`.

This runbook prioritizes:

1. Attack surface reduction on public web endpoints.
2. Cloudflare account takeover prevention.
3. Email spoofing risk reduction (DMARC/SPF).
4. Repeatable validation and rollback points.

## Inputs

- Security Insights export: `Cloudflare_MHC Apps_SecurityInsights_20260710_1636.csv`

- Target zones:

1. `mhc-gc.com`
2. `hd-drywall.net`

## Priority Order

1. Enforce MFA for all Cloudflare users.
2. Deploy Cloudflare Managed Rules for each zone.
3. Review DNS-only CNAME records and proxy only web-safe hostnames.
4. Enable Standard Super Bot Fight Mode.
5. Reduce broad `skip` rules.
6. Publish `security.txt`.
7. Correct DMARC/SPF records and tighten policy over time.

## Step 1: Enforce MFA (Account Level)

Cloudflare dashboard path:

1. `Manage Account` -> `Members`
2. `Policies` -> `Require Two-Factor Authentication`

Target outcome:

1. Every user account in the Cloudflare account is MFA-enforced.
2. No pending users without enrolled MFA.

Verification:

1. Export/review member list and confirm 100% MFA enrollment.

## Step 2: Deploy Managed Rules (Per Zone)

Cloudflare dashboard path (for each zone):

1. `Security` -> `WAF` -> `Managed rules`

Execution:

1. Enable Cloudflare Managed Ruleset.
2. Start with managed defaults for immediate coverage.
3. Run in monitoring window (log/challenge behavior) before strict blocking when needed.

Target outcome:

1. Managed rules actively inspecting requests in both production zones.

Verification:

1. `Security` -> `Events`: confirm managed rules are matching traffic.
2. Check for unexpected false positives on form endpoints and API routes.

## Step 3: Fix Unproxied CNAME Findings Safely

Cloudflare dashboard path:

1. `DNS` -> `Records`

Execution guidance:

1. For web hostnames that should be edge-protected, set `Proxy status` to `Proxied` (orange
   cloud).
2. For mail-related hostnames such as `autodiscover`, validate provider requirements before
   enabling proxy.

Important caution:

1. Email service hostnames are often required to remain `DNS only` and may break if proxied.
2. Do not blanket-proxy all records.

Target outcome:

1. Only web-traffic hostnames remain publicly shielded by Cloudflare proxy.
2. Mail-dependent DNS records remain provider-compatible.

Verification:

1. Confirm expected hostnames are orange-clouded.
2. Validate mail client autodiscover and message flow after DNS changes.

## Step 4: Enable Standard Super Bot Fight Mode

Cloudflare dashboard path:

1. `Security` -> `Bots`

Execution:

1. Enable `Super Bot Fight Mode` at `Standard`.
2. Review bot score telemetry after rollout.

Target outcome:

1. Reduced automated abuse against forms and public endpoints.

Verification:

1. `Security` -> `Bots` analytics show mitigated bot traffic.
2. No regression in legitimate traffic flows.

## Step 5: Reduce Broad Skip Rules

Cloudflare dashboard path:

1. `Security` -> `WAF` -> `Custom rules`

Execution:

1. Inventory all rules with `Skip` actions.
2. Remove or narrow any skip that is no longer required.
3. Prefer scoped exceptions (specific path + method + known source).

Target outcome:

1. Minimized bypass surface for core WAF protections.

Verification:

1. Re-test known integrations that previously required skips.
2. Confirm no broad wildcard skip remains without documented owner/expiration.

## Step 6: Publish security.txt

Implemented in this repository at:

- `apps/website/public/.well-known/security.txt`

Target URL:

- `https://mhc-gc.com/.well-known/security.txt`

Operational note:

1. Refresh `Expires` at least annually.
2. Keep `Contact` aligned with public intake routing (`office@mhc-gc.com`).

## Step 7: Correct DMARC and SPF

Cloudflare dashboard path:

1. `DNS` -> `Records`

DMARC starter record (monitoring mode):

```txt
Type: TXT
Name: _dmarc
Content: v=DMARC1; p=none; rua=mailto:dmarc@mhc-gc.com; ruf=mailto:dmarc@mhc-gc.com; fo=1; adkim=s; aspf=s; pct=100
TTL: Auto
```

SPF starter record (single TXT at root `@`; customize include sources):

```txt
Type: TXT
Name: @
Content: v=spf1 include:_spf.mx.cloudflare.net include:spf.resend.com ~all
TTL: Auto
```

Implementation notes:

1. Keep only one SPF TXT record at root. Merge all senders into one line.
2. Confirm actual mail providers before publishing includes.
3. If `dmarc@mhc-gc.com` mailbox is not monitored, replace with an actively monitored mailbox.

DMARC tightening sequence:

1. Start with `p=none` for report collection.
2. After alignment confidence, move to `p=quarantine`.
3. Final target: `p=reject` when valid senders are fully aligned.

Verification:

1. Use MXToolbox and dmarcian checks for syntax and alignment.
2. Confirm no legitimate transactional email failures.

## Validation Checklist (Done = Hardened)

- [ ] MFA enforced for all Cloudflare members.
- [ ] Managed Rules enabled on `mhc-gc.com`.
- [ ] Managed Rules enabled on `hd-drywall.net`.
- [ ] Unproxied CNAME findings triaged with explicit keep/proxy decision.
- [ ] Standard Super Bot Fight Mode enabled.
- [ ] Broad WAF skip rules reduced and documented.
- [ ] `https://mhc-gc.com/.well-known/security.txt` resolves publicly.
- [ ] DMARC published and reporting received.
- [ ] SPF consolidated to one valid record per domain.

## Rollback Notes

If a hardening change causes production issues:

1. Revert only the affected setting (do not disable all protections globally).
2. Capture timestamp, impacted path, and source IP/User-Agent from `Security` -> `Events`.
3. Reapply a narrower exception with owner + expiration date.

## Quick Links

- [Cloudflare Workers Deployment Guide](./cloudflare-guide.md)
- [Cloudflare Verification Runbook](./cloudflare-verification-runbook.md)
- [Deployment Index](./index.md)
