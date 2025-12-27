/**
 * usePhoneTracking Hook
 * Provides phone call tracking functionality for React components
 */

import { useCallback } from "react";
import { trackPhoneCall } from "@/lib/utils/phoneTracking";
import { COMPANY_INFO } from "@/lib/constants/company";

interface UsePhoneTrackingReturn {
  trackAndCall: (source: string) => void;
  trackClick: (source: string) => Promise<void>;
}

/**
 * Hook to track phone number clicks
 *
 * @example
 * const { trackAndCall } = usePhoneTracking();
 *
 * <a href="tel:+15093086489" onClick={() => trackAndCall('header')}>
 *   Call Us
 * </a>
 */
export function usePhoneTracking(): UsePhoneTrackingReturn {
  const trackAndCall = useCallback((source: string) => {
    // Track the call asynchronously
    trackPhoneCall(source).catch(() => {
      // Silent fail - don't block the phone call
    });

    // Initiate the phone call
    if (typeof window !== "undefined") {
      window.location.href = `tel:${COMPANY_INFO.phone.tel}`;
    }
  }, []);

  const trackClick = useCallback(async (source: string) => {
    await trackPhoneCall(source);
  }, []);

  return {
    trackAndCall,
    trackClick,
  };
}
