import { PageTrackingClient } from "@/components/analytics";
import { UnderConstruction } from "@/components/layout/UnderConstruction";

const SHOW_UNDER_CONSTRUCTION = true;

export default async function PublicSectorPage() {
  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <>
        <PageTrackingClient pageName="Public Sector" />
        <UnderConstruction
          pageName="Public Sector Contracting"
          description="We're building bonding capacity and establishing partnerships to serve government projects. Currently available for grant application support and subcontracting opportunities."
          estimatedCompletion="Q2 2026"
        />
      </>
    );
  }

  const { default: PublicSectorFullPage } =
    await import("./PublicSectorFullPage");
  return <PublicSectorFullPage />;
}
