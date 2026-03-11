import { VeteranBadgeSection as CanonicalVeteranBadgeSection } from "@/components/veterans/VeteranBadgeSection";

/**
 * Compatibility wrapper for the canonical VeteranBadgeSection.
 *
 * Prefer importing from "@/components/veterans/VeteranBadgeSection" for new code.
 */
export function VeteranBadgeSection() {
  return <CanonicalVeteranBadgeSection variant="full" showCTA={true} />;
}
