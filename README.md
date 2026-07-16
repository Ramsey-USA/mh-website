# MH Construction Monorepo

Built on Quality, Backed by Trust.

Founded by Mike Holstein in 2010, Veteran Owned since January 2025 under Jeremy Thamert.

- Website: <https://www.mhc-gc.com>
- Phone: (509) 308-6489
- Email: <office@mhc-gc.com>

## What This Repository Contains

This is a pnpm monorepo for MH Construction's public website, operations dashboard, shared assets, and documentation pipelines.

```text
apps/
  website/      # Public site (Next.js + OpenNext + Cloudflare)
  dashboard/    # Operations Hub (Next.js)
packages/
  shared/       # Shared constants and utilities
docs/           # Canonical project documentation
messages/       # Canonical localization messages
documents/      # Canonical document templates/scripts (manual/forms/letterhead)
scripts/        # Root automation and validation scripts
```

## Current State (July 2026)

- Deployment: Cloudflare Workers via OpenNext
- Frameworks: Next.js 16.2.10, React 19.2.7, Tailwind CSS 4.3.2, TypeScript 6.0.3
- Runtime and adapter: Node.js 22+, `@opennextjs/cloudflare` 1.20.1, Wrangler 4.110.0
- Runtime requirement: Node.js 22+
- Primary quality gates: TypeScript, ESLint, Jest, markdown lint, docs sync contracts, branding guardrails
- CI workflow installs use error-level pnpm logging to reduce non-blocking warning noise while preserving failure signals
- Canonical slogan and voice rules are enforced across docs and app surfaces

For architecture and route inventory, use [docs/project/architecture.md](docs/project/architecture.md).

## Audience Paths

### New Developer (Website or Dashboard)

Start here:

1. [.github/DEVELOPMENT_SETUP.md](.github/DEVELOPMENT_SETUP.md)
1. [docs/development/standards/consistency-guide.md](docs/development/standards/consistency-guide.md)
1. [docs/development/standards/page-template-guide.md](docs/development/standards/page-template-guide.md)

Then run:

```bash
pnpm install
pnpm run dev
pnpm run type-check
pnpm run lint
pnpm run test
```

### Ops and Docs Maintainer (Manuals, Forms, Publishing)

Canonical edit locations:

- [docs/](docs)
- [messages/](messages)
- [documents/](documents)

Then run:

```bash
pnpm run docs:sync
pnpm run docs:sync:check
pnpm --filter @mhc/website run docs:release
pnpm --filter @mhc/website run docs:verify:published
```

## Quick Start

### Prerequisites

- Node.js 22+
- pnpm (via Corepack)
- Git

### Install and Run

```bash
git clone https://github.com/Ramsey-USA/mh-website.git
cd mh-website

corepack enable
pnpm install

cp .env.local.example .env.local
pnpm run dev
```

Environment template: [.env.local.example](.env.local.example).

Website dev runs on <http://localhost:3000>.

Dashboard dev:

```bash
pnpm run dev:dashboard
```

Dashboard runs on <http://localhost:3001>.

## Top 8 Commands

Run from repository root unless noted.

| Goal                | Command                    |
| ------------------- | -------------------------- |
| Website dev         | `pnpm run dev`             |
| Dashboard dev       | `pnpm run dev:dashboard`   |
| Build all apps      | `pnpm run build:all`       |
| Type-check all apps | `pnpm run type-check`      |
| Lint all apps       | `pnpm run lint`            |
| Test website        | `pnpm run test`            |
| Validate docs setup | `pnpm run docs:sync`       |
| Verify no mirrors   | `pnpm run docs:sync:check` |

For docs publishing commands, see [Safety Manual and Handbook Pipeline](#safety-manual-and-handbook-pipeline).
For full quality gates, see [Quality Gate Before PR](#quality-gate-before-pr).

## Documentation Canonical Rules

Canonical sources:

- [docs/](docs)
- [messages/](messages)
- [documents/](documents)

Legacy app mirror trees under [apps/website](apps/website) are deprecated and should remain absent.

After editing docs, messages, or documents, run:

```bash
pnpm run docs:sync
pnpm run docs:sync:check
```

If sync check fails, remove mirror duplicates under [apps/website/docs](apps/website/docs), [apps/website/messages](apps/website/messages), and [apps/website/documents](apps/website/documents).

## Safety Manual and Handbook Pipeline

Document generation commands live in [apps/website](apps/website) package scripts and use canonical sources under [documents/](documents).

Canonical output path when running these commands from repo root:

- [documents/generated-pdfs/](documents/generated-pdfs)

Download-friendly bundle:

- [documents/downloads/](documents/downloads)

Stale mirror output at [apps/website/documents/generated-pdfs/](apps/website/documents/generated-pdfs) can accumulate outdated files from older workflows.

```bash
# Generate templates/artifacts
pnpm --filter @mhc/website run docs:preflight:pdf-output
pnpm --filter @mhc/website run docs:generate
pnpm --filter @mhc/website run docs:generate:forms
pnpm --filter @mhc/website run docs:generate:handbook

# Optional: include incremental cache hit/miss summary in logs
pnpm --filter @mhc/website run docs:generate -- --template sections --report-cache
pnpm --filter @mhc/website run docs:generate -- --template form-covers --report-cache
pnpm --filter @mhc/website run docs:generate -- --template form-packages --report-cache

# Merge final PDFs
pnpm --filter @mhc/website run docs:merge
pnpm --filter @mhc/website run docs:merge:handbook

# Publish to R2
pnpm --filter @mhc/website run docs:publish:safety
pnpm --filter @mhc/website run docs:publish:forms
pnpm --filter @mhc/website run docs:publish:employee-handbook

# Verify public URLs
pnpm --filter @mhc/website run docs:verify:published

# Optional: remove stale legacy mirror PDF artifacts
pnpm run docs:clean:legacy-output

# Root shortcut for the same preflight check
pnpm run docs:preflight:pdf-output
```

End-to-end release shortcut:

```bash
pnpm --filter @mhc/website run docs:release
```

## Quality Gate Before PR

Recommended local gate sequence:

```bash
pnpm run type-check
pnpm run lint
pnpm run test
pnpm run lint:markdown
pnpm run docs:sync:check
pnpm run docs:guardrails:contracts
pnpm run nav:contract:check
```

For strict website parity with CI checks:

```bash
pnpm --filter @mhc/website run ci:gate
```

## Key References

- Development setup and commit hygiene: [.github/DEVELOPMENT_SETUP.md](.github/DEVELOPMENT_SETUP.md)
- Documentation index: [docs/index.md](docs/index.md)
- Architecture and route map: [docs/project/architecture.md](docs/project/architecture.md)
- Component standards: [docs/branding/standards/unified-component-standards.md](docs/branding/standards/unified-component-standards.md)
- Consistency guardrails: [docs/development/standards/consistency-guide.md](docs/development/standards/consistency-guide.md)
- Page template: [docs/development/standards/page-template-guide.md](docs/development/standards/page-template-guide.md)
- Page compliance checklist: [docs/development/standards/page-compliance-checklist.md](docs/development/standards/page-compliance-checklist.md)
- Cloudflare deployment guide: [docs/deployment/cloudflare-guide.md](docs/deployment/cloudflare-guide.md)

## Contributing

- Follow [contributing.md](contributing.md).
- Keep branding, trust, accessibility, and SEO naming consistent with canonical docs.
- Do not create or commit app mirror docs trees; keep canonical sources in [docs/](docs), [messages/](messages), and [documents/](documents).

## License

Copyright © 2026 MH Construction.
All rights reserved.
