# Controlled Media Optimization

**Status:** Active production control  
**Authority:** CHENG brand control with repository review and CI validation  
**Applies to:** `apps/website/public/images/` and `apps/website/public/videos/`

## Control Position

Media optimization is a reviewed build activity, not a production-side mutation. GitHub Actions must not generate files, commit files, bypass checks, or push directly to `main`.

Every optimized asset enters the repository through a pull request and passes the same branding, security, route, build, and deployment gates as source code.

## Asset Classes

### Public Website Media

Photographs, project images, team portraits, social graphics, and videos may be converted or compressed before review. The source owner must verify cropping, legibility, color, licensing, and brand treatment.

### Controlled QR Assets

Files under `apps/website/public/images/qr-codes/` are controlled operational artifacts.

- Keep the approved PNG or SVG source format.
- Do not create WebP or AVIF QR derivatives.
- Do not resize, blur, recolor, or recompress a QR code through the general media optimizer.
- Validate the encoded redirect, visual quiet zone, contrast, print size, and scan result before release.
- Route changes belong in the stable redirect pipeline, not inside a regenerated image batch.

### Document Factory Outputs

Branded PDFs, project SSSPs, binder components, and their QR assets remain under the private incremental document factory. Approved public outputs may be published to R2, but the website repository must not rebuild or rewrite those controlled artifacts.

## Repository Workflow

The `Validate Images & Videos` workflow runs on media pull requests and by manual dispatch.

It enforces:

1. Read-only repository permissions.
2. No direct commits or pushes to `main`.
3. No WebP or AVIF files within the controlled QR directory.
4. A 500 KB budget for ordinary production images.
5. A 10 MB WebM and 15 MB MP4 budget outside approved hero-commercial exceptions.
6. Reviewed pull-request entry for every optimization output.

The workflow does not convert assets. Conversion happens before the pull request so reviewers can inspect the exact bytes intended for production.

## Local Image Preparation

Use the website optimizer only for ordinary public media:

```bash
pnpm --filter @mhc/website run optimize:images
```

The optimizer excludes the complete `qr-codes/` directory. Do not remove or weaken that exclusion.

Before opening a pull request:

- confirm the page actually references the optimized format;
- compare source and output dimensions;
- verify visual quality at mobile and desktop sizes;
- remove unused derivatives;
- preserve copyright, trademark, photographer, and project-use authority;
- record material asset changes in the pull-request description.

## Local Video Preparation

Use the video optimizer only for approved public video sources:

```bash
pnpm --filter @mhc/website run optimize:videos
```

Verify poster frames, captions where required, duration, audio rights, encoding compatibility, and the production size budget before review.

## Fail-Closed Release Rules

A media change must stop when:

- the source or usage rights are unclear;
- a QR redirect is unverified;
- the asset exceeds its production budget;
- the optimized file is not referenced;
- visual review identifies brand or legibility loss;
- the change attempts to write around the pull-request pipeline;
- CI, security, branding, or deployment checks fail.

## Operational Record

On 2026-08-07, the former automation produced 469 derivative files and committed them directly to `main` with CI skipped. The release safeguard correction removed that uncontrolled batch, prohibited direct-write optimization, excluded QR assets from general conversion, and restored pull-request authority.

That incident remains the control basis for this standard.
