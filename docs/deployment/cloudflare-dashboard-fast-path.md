# Cloudflare Dashboard Fast Path (UI-Proof)

**Category:** Deployment - Cloudflare Security  
**Last Updated:** July 10, 2026

When Cloudflare navigation changes, use dashboard search and these exact target labels.

## What To Search For

Use the Cloudflare dashboard search bar and open the first matching page for each item:

1. `Members` and `Two-Factor Authentication`
2. `Managed rules`
3. `Super Bot Fight Mode`
4. `DNS Records`

## Phase 1 Actions (Minimal)

1. Enforce MFA for all members.
2. Enable Cloudflare Managed Rules (each zone).
3. Enable Standard Super Bot Fight Mode (each zone).
4. Keep only one SPF TXT at root (`@`):

```txt
v=spf1 include:spf.protection.outlook.com include:spf.resend.com ~all
```

1. Add DMARC TXT at `_dmarc`:

```txt
v=DMARC1; p=none; rua=mailto:office@mhc-gc.com; fo=1
```

1. Keep `autodiscover` records as DNS-only unless Microsoft explicitly says otherwise.

## Local Verification Command

Run this from `apps/website` after DNS changes propagate:

```bash
npm run cloudflare:phase1:check
```

Optional domain arguments:

```bash
bash scripts/validation/check-cloudflare-phase1.sh mhc-gc.com autodiscover.mhc-gc.com
```

What this verifies:

1. `https://<domain>/.well-known/security.txt` returns HTTP 200 and has a Contact line.
2. Exactly one SPF record exists at root.
3. DMARC record exists at `_dmarc.<domain>`.
4. Autodiscover DNS shape looks compatible with DNS-only mail routing.

## If Something Looks Off

1. Do not add a second SPF record. Merge senders into one `v=spf1` line.
2. Keep DMARC on `p=none` first; tighten after clean reporting.
3. If Outlook autodiscover breaks, revert only that DNS change and re-test.

## Related Docs

- [Cloudflare Security Hardening Runbook](./cloudflare-security-hardening-runbook.md)
- [Cloudflare Workers Deployment Guide](./cloudflare-guide.md)
