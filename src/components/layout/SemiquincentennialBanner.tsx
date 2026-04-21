"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AmericanFlag } from "@/components/icons/AmericanFlag";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

// July 4, 2026 00:00:00 Pacific Daylight Time (UTC-7)
const SEMIQUINCENTENNIAL_DATE = new Date("2026-07-04T07:00:00.000Z");

// Patriotic firework colors
const FIREWORK_COLORS = [
  "#B22234", // Old Glory Red
  "#B22234",
  "#3C3B6E", // Union Blue
  "#3C3B6E",
  "#FFD700", // Gold
  "#FFFFFF", // White
];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function getTimeLeft(): TimeLeft {
  const diff = SEMIQUINCENTENNIAL_DATE.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
    isPast: false,
  };
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  radius: number;
  startTime: number;
}

export function SemiquincentennialBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft());
  const animFrameRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Tick the countdown every second
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1_000);
    return () => clearInterval(id);
  }, []);

  // Clean up canvas and animation on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
      const canvas = canvasRef.current;
      if (canvas?.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  const launchFireworks = useCallback(() => {
    // Cancel any in-progress animation first
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    const existing = canvasRef.current;
    if (existing?.parentNode) {
      existing.parentNode.removeChild(existing);
      canvasRef.current = null;
    }

    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText =
      "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      canvasRef.current = null;
      return;
    }

    const BURST_COUNT = 9;
    const PARTICLES_PER_BURST = 70;
    const DURATION_MS = 3_500;
    const startTime = performance.now();

    // Pre-generate all particles with staggered burst start times
    const particles: Particle[] = [];
    for (let b = 0; b < BURST_COUNT; b++) {
      const bx = canvas.width * (0.1 + Math.random() * 0.8);
      const by = canvas.height * (0.05 + Math.random() * 0.5);
      const baseColor =
        FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)] ??
        "#B22234";
      const burstStart = b * (DURATION_MS / BURST_COUNT) * 0.45;

      for (let i = 0; i < PARTICLES_PER_BURST; i++) {
        const angle = (Math.PI * 2 * i) / PARTICLES_PER_BURST;
        const speed = 1.5 + Math.random() * 5.5;
        particles.push({
          x: bx,
          y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          // Sprinkle some white sparks into every burst
          color: i % 6 === 0 ? "#FFFFFF" : baseColor,
          alpha: 1,
          radius: 1.5 + Math.random() * 2.5,
          startTime: burstStart,
        });
      }
    }

    function animate(now: number) {
      const elapsed = now - startTime;
      if (elapsed > DURATION_MS) {
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        canvasRef.current = null;
        return;
      }

      ctx!.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        const pElapsed = elapsed - p.startTime;
        if (pElapsed <= 0) continue;

        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.vx *= 0.99; // air resistance

        const pLifetime = DURATION_MS - p.startTime;
        p.alpha = Math.max(0, 1 - pElapsed / pLifetime);
        if (p.alpha <= 0) continue;

        ctx!.save();
        ctx!.globalAlpha = p.alpha;
        ctx!.fillStyle = p.color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  if (timeLeft.isPast) {
    return (
      <section
        aria-label="Happy 250th Birthday, America!"
        className="relative overflow-hidden bg-gradient-to-r from-[#B22234] via-[#3C3B6E] to-[#B22234] py-4 text-center"
      >
        <div className="flex items-center justify-center gap-4">
          <AmericanFlag size="sm" animated />
          <span className="text-lg font-bold text-white drop-shadow">
            Happy 250th Birthday, America! July 4, 2026 — Semiquincentennial
          </span>
          <AmericanFlag size="sm" animated />
        </div>
      </section>
    );
  }

  const countdownUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hrs" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" },
  ] as const;

  return (
    <section
      aria-label="United States 250th Anniversary Countdown — July 4, 2026"
      className="relative overflow-hidden bg-gradient-to-r from-[#0f0808] via-[#0f0f2a] to-[#0f0808] border-t border-b border-[#B22234]/40"
    >
      {/* Top patriotic stripe */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#B22234] via-[#FFFFFF] to-[#3C3B6E]"
      />

      <div className="mx-auto max-w-7xl px-4 py-3 sm:py-4">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          {/* Flag */}
          <AmericanFlag size="md" animated className="shrink-0" />

          {/* Title */}
          <div className="text-center sm:text-left">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#BD9264]">
              America&apos;s Semiquincentennial · 250 Years Since 1776
            </p>
            <h2 className="text-sm sm:text-base font-bold text-white leading-snug">
              Countdown to July 4, 2026
            </h2>
          </div>

          {/* Countdown digits */}
          <div
            aria-live="polite"
            aria-atomic="true"
            aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds remaining`}
            className="flex items-center gap-1.5 sm:gap-2"
          >
            {countdownUnits.map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-1.5 sm:gap-2">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="text-[#B22234] font-bold text-xl leading-none select-none"
                  >
                    :
                  </span>
                )}
                <div className="flex flex-col items-center w-10 sm:w-12">
                  <span className="text-2xl sm:text-3xl font-bold tabular-nums leading-none text-white">
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#BD9264] leading-none mt-0.5">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Celebrate button */}
          <button
            type="button"
            onClick={launchFireworks}
            className="flex items-center gap-1.5 rounded border border-[#B22234]/50 bg-[#B22234]/20 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#B22234]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD700] transition-colors touch-manipulation"
            aria-label="Launch fireworks to celebrate America's 250th anniversary"
          >
            <MaterialIcon
              icon="celebration"
              size="sm"
              className="text-[#FFD700]"
            />
            Celebrate!
          </button>

          {/* Second flag (hidden on small screens) */}
          <AmericanFlag
            size="md"
            animated
            className="shrink-0 hidden sm:block"
          />
        </div>
      </div>

      {/* Bottom patriotic stripe */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#3C3B6E] via-[#FFFFFF] to-[#B22234]"
      />
    </section>
  );
}
