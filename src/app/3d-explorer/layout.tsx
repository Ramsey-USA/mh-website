import { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = getPageMetadata("/3d-explorer");

export default function Explorer3DLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
