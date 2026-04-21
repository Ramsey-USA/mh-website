interface PNWStatesMapProps {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Custom SVG map of the MH Construction tri-state service area.
 *
 * Geographic coordinate conversion (viewBox 0 0 220 154):
 *   x = (lon + 124.7) * 16.058   (lon range −124.7 → −111.0 mapped to 0 → 220)
 *   y = (49.0 − lat) * 21.690    (lat range 49.0 → 41.9 mapped to 0 → 154)
 */
export function PNWStatesMap({
  className = "",
  width = 220,
  height = 154,
}: PNWStatesMapProps) {
  return (
    <svg
      viewBox="0 0 220 154"
      width={width}
      height={height}
      role="img"
      aria-label="Map showing Washington, Oregon, and Idaho - MH Construction service area"
      className={`block ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Washington — simplified outline, ~(−124.7,48.5) to (−116.9,46.0) */}
      <path
        d="M 0,11 L 124,0 L 124,65 L 10,60 Z"
        fill="#386851"
        stroke="white"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      {/* Oregon — simplified outline, ~(−124.1,46.25) to (−117.0,42.0) */}
      <path
        d="M 10,60 L 124,65 L 124,152 L 8,152 Z"
        fill="#4a7d63"
        stroke="white"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      {/* Idaho — simplified outline with distinctive panhandle */}
      <path
        d="M 124,0 L 164,0 L 172,54 L 220,109 L 220,152 L 124,152 Z"
        fill="#628F79"
        stroke="white"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      {/* State abbreviation labels */}
      <text
        x="60"
        y="38"
        textAnchor="middle"
        fill="white"
        fillOpacity="0.9"
        fontSize="11"
        fontWeight="600"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        WA
      </text>
      <text
        x="63"
        y="110"
        textAnchor="middle"
        fill="white"
        fillOpacity="0.9"
        fontSize="11"
        fontWeight="600"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        OR
      </text>
      <text
        x="168"
        y="108"
        textAnchor="middle"
        fill="white"
        fillOpacity="0.9"
        fontSize="11"
        fontWeight="600"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        ID
      </text>
      {/* Service area marker — Tri-Cities (Kennewick/Richland/Pasco, WA) */}
      <circle
        cx="89"
        cy="57"
        r="4"
        fill="#BD9264"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
}
