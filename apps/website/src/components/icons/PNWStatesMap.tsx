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
}: Readonly<PNWStatesMapProps>) {
  return (
    <div
      role="img"
      aria-label="Map showing Washington, Oregon, and Idaho - MH Construction service area"
      className={`relative block ${className}`.trim()}
      style={{ width, height }}
    >
      <div className="pointer-events-none absolute left-[0%] top-[1%] h-[38%] w-[58%] select-none">
        <Image
          src="/images/states/extracted/labeled/wa-washington.png"
          alt=""
          aria-hidden="true"
          fill
          className="object-contain drop-shadow-sm"
          sizes="220px"
        />
      </div>

      <div className="pointer-events-none absolute left-[3%] top-[33%] h-[59%] w-[58%] select-none">
        <Image
          src="/images/states/extracted/labeled/or-oregon.png"
          alt=""
          aria-hidden="true"
          fill
          className="object-contain drop-shadow-sm"
          sizes="220px"
        />
      </div>

      <div className="pointer-events-none absolute left-[51%] top-[6%] h-[84%] w-[46%] select-none">
        <Image
          src="/images/states/extracted/labeled/id-idaho.png"
          alt=""
          aria-hidden="true"
          fill
          className="object-contain drop-shadow-sm"
          sizes="220px"
        />
      </div>

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
