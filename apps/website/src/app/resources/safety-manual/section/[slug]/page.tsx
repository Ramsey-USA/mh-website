import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { buildDualSeoTitle } from "@/lib/branding/page-names";

import { getDocumentById } from "@/lib/data/documents";
import { clusterForSection } from "@/lib/data/safety-manual-clusters";

export const metadata: Metadata = {
  title: buildDualSeoTitle("safetyManual", "Section Redirect"),
  description:
    "Legacy safety manual section route that permanently redirects to the current indexed cluster page.",
  alternates: {
    canonical: "https://www.mhc-gc.com/resources/safety-manual/contents",
  },
  robots: {
    index: false,
    follow: true,
  },
};

/**
 * Legacy section URL — `/resources/safety-manual/section/[slug]`
 *
 * Old QR codes and external links pointed here. We now serve the section as
 * an anchored card on its cluster page, e.g.
 *   /resources/safety-manual/fall-and-access-safety#mish-21
 *
 * This page resolves the legacy slug to its cluster + anchor and issues a 308
 * permanent redirect, preserving SEO equity. Unknown slugs fall back to the
 * Table of Contents.
 */
export default async function SafetyManualSectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const manual = getDocumentById("safety-manual");
  const section = manual?.sections?.find((s) => s.slug === slug);
  if (section) {
    const lookup = clusterForSection(Number(section.number));
    if (lookup) permanentRedirect(lookup.href);
  }
  permanentRedirect("/resources/safety-manual/contents");
}
