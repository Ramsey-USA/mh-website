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
      viewBox="0 0 198 170"
      width={width}
      height={height}
      className={className}
      aria-label="Map showing Washington, Oregon, and Idaho - MH Construction service area"
      role="img"
    >
      <title>Pacific Northwest Service Area - Washington, Oregon, Idaho</title>

      {/*
       * Coordinate system (approximate geographic projection):
       *   x = 10 + (125 − lon°W) × 13.5  px/degree longitude
       *   y =  5 + (49  − lat°N) × 22.6  px/degree latitude
       *
       * Key reference points:
       *   WA NW coast  (124.7°W, 49°N) → (14, 5)
       *   WA NE / ID W (117.0°W, 49°N) → (118, 5)
       *   Columbia R junction (117°W, 46.2°N) → (118, 68)
       *   Columbia R mouth   (124°W,  46.2°N) → (24, 68)
       *   OR SW corner (124.5°W, 42°N) → (17, 163)
       *   OR/ID SW     (117°W,   42°N) → (118, 163)
       *   ID panhandle NE (~116°W, 49°N) → (132, 5)
       *   ID main-body E  (~112°W, 42°N) → (186, 163)
       */}

      {/* Washington State
            – Flat 49th-parallel northern border
            – Straight eastern border at 117° W
            – Curved southern border following the Columbia River
            – Pacific coast with a slight Olympic-Peninsula westward bulge */}
      <path
        d="M 14,5
           L 118,5
           L 118,68
           C 88,77 55,75 28,70
           C 20,68 15,65 13,62
           C 10,50 9,33 12,20
           C 13,12 13,7 14,5
           Z"
        fill="#386851"
        stroke="#D9BD93"
        strokeWidth="1.5"
        className="transition-all duration-300 hover:fill-[#628F79]"
      />
      <text
        x="64"
        y="36"
        fill="#D9BD93"
        fontSize="11"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
        textAnchor="middle"
      >
        WA
      </text>

      {/* Oregon State
            – North border matches WA's Columbia River south border
            – Straight eastern border at 117° W
            – Flat 42nd-parallel southern border
            – Pacific coast (nearly straight) */}
      <path
        d="M 13,62
           C 15,65 20,68 28,70
           C 55,75 88,77 118,68
           L 118,163
           L 14,163
           Z"
        fill="#386851"
        stroke="#D9BD93"
        strokeWidth="1.5"
        className="transition-all duration-300 hover:fill-[#628F79]"
      />
      <text
        x="64"
        y="122"
        fill="#D9BD93"
        fontSize="11"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
        textAnchor="middle"
      >
        OR
      </text>

      {/* Idaho State
            – Narrow panhandle (≈ 1° wide) running from the Canadian border
              south to ~46° N, then the state widens dramatically eastward —
              Idaho's most distinctive geographic feature */}
      <path
        d="M 118,5
           L 132,5
           L 134,68
           L 186,72
           L 186,163
           L 118,163
           Z"
        fill="#386851"
        stroke="#D9BD93"
        strokeWidth="1.5"
        className="transition-all duration-300 hover:fill-[#628F79]"
      />
      <text
        x="158"
        y="122"
        fill="#D9BD93"
        fontSize="11"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
        textAnchor="middle"
      >
        ID
      </text>

      {/* Tri-Cities service area marker (SE Washington, ~119°W 46.3°N) */}
      <circle
        cx="91"
        cy="63"
        r="4"
        fill="#BD9264"
        stroke="#D9BD93"
        strokeWidth="1"
        className="animate-pulse"
      />
    </svg>
  );
}
