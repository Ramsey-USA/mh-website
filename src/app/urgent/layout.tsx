import type { Metadata } from "next";
import { getUrgentSEO } from "@/lib/seo/page-seo-utils";

const seoData = getUrgentSEO();
const { schemas: _schemas, ...metadataProps } = seoData;

export const metadata: Metadata = metadataProps;

export default function UrgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
