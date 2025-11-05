"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Redirect page for /urgent -> /contact#urgent-support
 * This ensures backward compatibility and handles short URL variants
 */
export default function UrgentRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the contact page's urgent support section
    router.replace("/contact#urgent-support");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-600 to-orange-700">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-xl font-semibold">
          Redirecting to Urgent Support...
        </p>
      </div>
    </div>
  );
}
