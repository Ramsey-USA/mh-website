import { Suspense } from "react";
import CareersPageClient from "./CareersPageClient";

export default function CareersPage() {
  return (
    <Suspense fallback={null}>
      <CareersPageClient />
    </Suspense>
  );
}
