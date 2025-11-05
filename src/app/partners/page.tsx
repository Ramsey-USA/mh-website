"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Redirect page for /partners -> /trade-partners
 * This ensures backward compatibility and handles short URL variants
 */
export default function PartnersRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the correct trade-partners page
    router.replace("/trade-partners");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-brand-primary to-brand-accent">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-xl font-semibold">
          Redirecting to Trade Partners...
        </p>
      </div>
    </div>
  );
}
