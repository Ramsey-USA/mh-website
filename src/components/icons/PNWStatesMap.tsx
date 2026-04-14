/**
 * Pacific Northwest States Map (WA, OR, ID)
 *
 * SVG component showing Washington, Oregon, and Idaho state outlines.
 * Uses MH Construction brand colors.
 */

interface PNWStatesMapProps {
  className?: string;
  width?: number;
  height?: number;
}

export function PNWStatesMap({
  className = "",
  width = 200,
  height = 140,
}: PNWStatesMapProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 140"
      width={width}
      height={height}
      className={className}
      aria-label="Map showing Washington, Oregon, and Idaho - MH Construction service area"
      role="img"
    >
      <title>Pacific Northwest Service Area - Washington, Oregon, Idaho</title>

      {/* Washington State */}
      <path
        d="M10 10 L15 8 L25 5 L40 3 L55 5 L70 8 L85 6 L95 10 L100 15
           L105 12 L115 10 L120 15 L118 25 L115 35 L112 45 L110 50
           L105 52 L95 50 L85 52 L75 50 L65 52 L55 50 L45 52 L35 50
           L25 52 L15 50 L10 45 L8 35 L10 25 L12 15 Z"
        fill="#386851"
        stroke="#D9BD93"
        strokeWidth="1.5"
        className="transition-all duration-300 hover:fill-[#628F79]"
      />
      {/* WA Label */}
      <text
        x="62"
        y="32"
        fill="#D9BD93"
        fontSize="12"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
        textAnchor="middle"
      >
        WA
      </text>

      {/* Idaho State */}
      <path
        d="M120 15 L130 12 L140 10 L150 15 L155 25 L158 35 L160 50
           L162 65 L165 80 L168 95 L165 105 L160 110 L150 108
           L140 105 L130 100 L125 90 L120 80 L118 70 L115 60
           L112 50 L115 35 L118 25 L120 15 Z"
        fill="#386851"
        stroke="#D9BD93"
        strokeWidth="1.5"
        className="transition-all duration-300 hover:fill-[#628F79]"
      />
      {/* ID Label */}
      <text
        x="140"
        y="65"
        fill="#D9BD93"
        fontSize="12"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
        textAnchor="middle"
      >
        ID
      </text>

      {/* Oregon State */}
      <path
        d="M10 55 L25 52 L45 55 L65 52 L85 55 L105 52 L110 55
           L112 65 L115 75 L118 85 L120 95 L118 105 L115 115
           L110 120 L100 125 L85 128 L70 130 L55 128 L40 125
           L25 120 L15 115 L10 105 L8 90 L10 75 L12 60 Z"
        fill="#386851"
        stroke="#D9BD93"
        strokeWidth="1.5"
        className="transition-all duration-300 hover:fill-[#628F79]"
      />
      {/* OR Label */}
      <text
        x="62"
        y="95"
        fill="#D9BD93"
        fontSize="12"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
        textAnchor="middle"
      >
        OR
      </text>

      {/* Service area indicator - Tri-Cities region marker */}
      <circle
        cx="95"
        cy="45"
        r="4"
        fill="#BD9264"
        stroke="#D9BD93"
        strokeWidth="1"
        className="animate-pulse"
      />
    </svg>
  );
}
