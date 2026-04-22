import Image from "next/image";

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
    <div
      role="img"
      aria-label="Map showing Washington, Oregon, and Idaho - MH Construction service area"
      className={`relative block ${className}`.trim()}
      style={{ width, height }}
    >
      <div className="pointer-events-none absolute left-[2%] top-[2%] h-[36%] w-[56%] select-none">
        <Image
          src="/images/states/extracted/labeled/wa-washington.png"
          alt=""
          aria-hidden="true"
          fill
          className="object-contain drop-shadow-sm"
          sizes="220px"
        />
      </div>

      <div className="pointer-events-none absolute left-[5%] top-[35%] h-[57%] w-[56%] select-none">
        <Image
          src="/images/states/extracted/labeled/or-oregon.png"
          alt=""
          aria-hidden="true"
          fill
          className="object-contain drop-shadow-sm"
          sizes="220px"
        />
      </div>

      <div className="pointer-events-none absolute left-[54%] top-[8%] h-[82%] w-[44%] select-none">
        <Image
          src="/images/states/extracted/labeled/id-idaho.png"
          alt=""
          aria-hidden="true"
          fill
          className="object-contain drop-shadow-sm"
          sizes="220px"
        />
      </div>

      <span className="pointer-events-none absolute left-[25%] top-[16%] rounded-md bg-gray-900/70 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white">
        WA
      </span>
      <span className="pointer-events-none absolute left-[24%] top-[66%] rounded-md bg-gray-900/70 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white">
        OR
      </span>
      <span className="pointer-events-none absolute left-[73%] top-[50%] rounded-md bg-gray-900/70 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white">
        ID
      </span>

      <span className="pointer-events-none absolute left-[37%] top-[32%] h-2.5 w-2.5 rounded-full border border-white bg-brand-secondary shadow-[0_0_10px_rgba(189,146,100,0.8)]" />
    </div>
  );
}
