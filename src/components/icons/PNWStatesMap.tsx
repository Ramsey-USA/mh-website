interface PNWStatesMapProps {
  className?: string;
  width?: number;
  height?: number;
}

export function PNWStatesMap({
  className = "",
  width = 220,
  height = 154,
}: PNWStatesMapProps) {
  return (
    <picture>
      <source srcSet="/icons/tri-state-mhc.avif" type="image/avif" />
      <source srcSet="/icons/tri-state-mhc.webp" type="image/webp" />
      <img
        src="/icons/tri-state-mhc.png"
        alt="Map showing Washington, Oregon, and Idaho - MH Construction service area"
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={`block ${className}`.trim()}
      />
    </picture>
  );
}
