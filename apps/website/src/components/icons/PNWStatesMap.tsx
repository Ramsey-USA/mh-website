interface PNWStatesMapProps {
  className?: string;
  width?: number;
  height?: number;
}

export function PNWStatesMap({
  className = "",
  width = 220,
  height = 154,
}: Readonly<PNWStatesMapProps>) {
  return (
    <div
      role="img"
      aria-label="Map showing Washington, Oregon, and Idaho - MH Construction service area"
      className={`relative block ${className}`.trim()}
      style={{ width, height }}
    >
      <span className="pointer-events-none absolute left-[2%] top-[4%] h-[35%] w-[54%] rounded-xl border border-brand-primary/30 bg-gradient-to-br from-brand-primary/15 via-brand-primary/10 to-brand-secondary/15 shadow-sm" />
      <span className="pointer-events-none absolute left-[4%] top-[40%] h-[53%] w-[54%] rounded-xl border border-brand-primary/30 bg-gradient-to-br from-brand-primary/15 via-brand-primary/10 to-brand-secondary/15 shadow-sm" />
      <span className="pointer-events-none absolute left-[53%] top-[9%] h-[78%] w-[42%] rounded-xl border border-brand-primary/30 bg-gradient-to-br from-brand-primary/15 via-brand-primary/10 to-brand-secondary/15 shadow-sm" />

      <span className="pointer-events-none absolute left-[23%] top-[15%] rounded-md bg-gray-900/70 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white">
        WA
      </span>
      <span className="pointer-events-none absolute left-[22%] top-[65%] rounded-md bg-gray-900/70 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white">
        OR
      </span>
      <span className="pointer-events-none absolute left-[71%] top-[49%] rounded-md bg-gray-900/70 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white">
        ID
      </span>

      <span className="pointer-events-none absolute left-[35%] top-[31%] h-2.5 w-2.5 rounded-full border border-white bg-brand-secondary shadow-[0_0_10px_rgba(189,146,100,0.8)]" />
    </div>
  );
}
