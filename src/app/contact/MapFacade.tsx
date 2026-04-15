"use client";

import { useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=3111+N+Capitol+Ave,+Pasco,+WA+99301&z=15&output=embed";

/**
 * MapFacade — shows a static placeholder until the user clicks to load the
 * Google Maps iframe.  Avoids the third-party network connection on every
 * page view (facade pattern).
 */
export function MapFacade() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={MAP_EMBED_URL}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="MH Construction Office Location - 3111 N Capitol Ave, Pasco, WA 99301"
        className="absolute inset-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer border-0"
      aria-label="Load interactive map for MH Construction office location"
    >
      <div className="flex flex-col items-center gap-3 text-gray-600 dark:text-gray-300">
        <MaterialIcon icon="map" size="4xl" className="text-brand-primary" />
        <span className="font-semibold text-lg">Click to load map</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          3111 N Capitol Ave, Pasco, WA 99301
        </span>
      </div>
    </button>
  );
}
