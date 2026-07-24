"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AmericanFlag } from "@/lib/icons/AmericanFlag";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

// Patriotic color pairs (primary + accent) for each burst
const FIREWORK_COLOR_PAIRS: [string, string][] = [
  ["#B22234", "#FFD700"], // Old Glory Red + Gold
  ["#3C3B6E", "#FFFFFF"], // Union Blue + White
  ["#B22234", "#FFFFFF"], // Red + White
  ["#FFD700", "#FFFFFF"], // Gold + White
  ["#3C3B6E", "#FFD700"], // Blue + Gold
  ["#B22234", "#3C3B6E"], // Red + Blue
];

const JULY_FOURTH_1776_UTC = Date.UTC(1776, 6, 4);
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function isJuly(now: Date = new Date()): boolean {
  return now.getMonth() === 6;
}

function getFreedomCounters(now: Date): { years: number; days: number } {
  const elapsedDays = Math.max(
    0,
    Math.floor(
      (Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) -
        JULY_FOURTH_1776_UTC) /
        MS_PER_DAY,
    ),
  );

  const hasReachedJulyFourthThisYear =
    now.getUTCMonth() > 6 || (now.getUTCMonth() === 6 && now.getUTCDate() >= 4);
  const elapsedYears = Math.max(
    0,
    now.getUTCFullYear() - 1776 - (hasReachedJulyFourthThisYear ? 0 : 1),
  );

  return {
    years: elapsedYears,
    days: elapsedDays,
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
  glitter: boolean;
}

interface Rocket {
  x: number;
  startY: number;
  targetY: number;
  launchTime: number;
  riseDuration: number;
  burstStart: number;
  colors: [string, string];
}

export function SemiquincentennialBanner() {
  const [isJulyCelebration, setIsJulyCelebration] = useState(false);
  const [_freedomCounters, setFreedomCounters] = useState(() =>
    getFreedomCounters(new Date()),
  );
  const animFrameRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Resolve month state on mount and refresh periodically so the ribbon can
  // transition naturally if the page remains open across month boundaries.
  useEffect(() => {
    const syncBannerState = () => {
      const now = new Date();
      setIsJulyCelebration(isJuly(now));
      setFreedomCounters(getFreedomCounters(now));
    };

    syncBannerState();

    const id = setInterval(() => {
      syncBannerState();
    }, 60_000);

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

    const BURST_COUNT = 12;
    const PARTICLES_PER_BURST = 90;
    const SPARKS_PER_BURST = 18;
    const DURATION_MS = 5_500;
    const startTime = performance.now();

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];

    for (let b = 0; b < BURST_COUNT; b++) {
      const bx = canvas.width * (0.1 + Math.random() * 0.8);
      const by = canvas.height * (0.05 + Math.random() * 0.45);
      const colors =
        FIREWORK_COLOR_PAIRS[
          Math.floor(Math.random() * FIREWORK_COLOR_PAIRS.length)
        ] ?? (["#B22234", "#FFD700"] as [string, string]);

      const launchTime = b * (DURATION_MS / BURST_COUNT) * 0.42;
      const riseDuration = 500 + Math.random() * 500;
      const burstStart = launchTime + riseDuration;

      rockets.push({
        x: bx,
        startY: canvas.height + 10,
        targetY: by,
        launchTime,
        riseDuration,
        burstStart,
        colors,
      });

      // Main burst — uniform ring with slight angle variation for a natural look
      for (let i = 0; i < PARTICLES_PER_BURST; i++) {
        const angle =
          (Math.PI * 2 * i) / PARTICLES_PER_BURST +
          (Math.random() - 0.5) * 0.35;
        const speed = 1.8 + Math.random() * 6.5;
        const isWhite = i % 7 === 0;
        const isGold = !isWhite && i % 9 === 0;
        particles.push({
          x: bx,
          y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: isWhite
            ? "#FFFFFF"
            : isGold
              ? "#FFD700"
              : i % 2 === 0
                ? colors[0]
                : colors[1],
          alpha: 1,
          radius: isGold ? 3 : 1.5 + Math.random() * 2.5,
          startTime: burstStart,
          glitter: Math.random() < 0.25,
        });
      }

      // Trailing gold sparks that drift down after the main burst
      for (let i = 0; i < SPARKS_PER_BURST; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 2;
        particles.push({
          x: bx,
          y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          color: "#FFD700",
          alpha: 1,
          radius: 1,
          startTime: burstStart + 100 + Math.random() * 400,
          glitter: true,
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

      // ── Rockets rising toward burst position ─────────────────────────────
      for (const r of rockets) {
        const rElapsed = elapsed - r.launchTime;
        if (rElapsed <= 0 || rElapsed >= r.riseDuration) continue;

        const progress = rElapsed / r.riseDuration;
        const currentY = r.startY + (r.targetY - r.startY) * progress;

        // Trail — gradient line fading toward the tail
        const trailLen = 30;
        const trailGrad = ctx!.createLinearGradient(
          r.x,
          currentY + trailLen,
          r.x,
          currentY,
        );
        trailGrad.addColorStop(0, "transparent");
        trailGrad.addColorStop(1, r.colors[0]);
        ctx!.save();
        ctx!.globalAlpha = 0.8;
        ctx!.strokeStyle = trailGrad;
        ctx!.lineWidth = 2.5;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(r.x, currentY + trailLen);
        ctx!.lineTo(r.x, currentY);
        ctx!.stroke();

        // Head — bright glowing dot
        ctx!.globalAlpha = 1;
        ctx!.fillStyle = "#FFFFFF";
        ctx!.shadowColor = r.colors[0];
        ctx!.shadowBlur = 12;
        ctx!.beginPath();
        ctx!.arc(r.x, currentY, 3, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }

      // ── Burst flash ───────────────────────────────────────────────────────
      for (const r of rockets) {
        const fElapsed = elapsed - r.burstStart;
        if (fElapsed < 0 || fElapsed > 280) continue;
        ctx!.save();
        ctx!.globalAlpha = (1 - fElapsed / 280) * 0.55;
        ctx!.fillStyle = "#FFFFFF";
        ctx!.beginPath();
        ctx!.arc(r.x, r.targetY, fElapsed * 1.3, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }

      // ── Particles ────────────────────────────────────────────────────────
      for (const p of particles) {
        const pElapsed = elapsed - p.startTime;
        if (pElapsed <= 0) continue;

        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.07; // gravity
        p.vx *= 0.985; // air resistance
        p.vy *= 0.985;

        const pLifetime = DURATION_MS - p.startTime;
        const lifeFraction = pElapsed / pLifetime;
        // Ease-out: bright near the start, accelerates to fade near the end
        const baseAlpha = Math.max(0, 1 - lifeFraction * lifeFraction);
        p.alpha = p.glitter
          ? baseAlpha * (0.45 + 0.55 * Math.random()) // flicker
          : baseAlpha;

        if (p.alpha <= 0.02) continue;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

        // Comet tail: fading line behind fast-moving particles
        if (speed > 1.5) {
          const tailLen = speed * 2.5;
          ctx!.save();
          ctx!.globalAlpha = p.alpha * 0.45;
          ctx!.strokeStyle = p.color;
          ctx!.lineWidth = p.radius;
          ctx!.lineCap = "round";
          ctx!.beginPath();
          ctx!.moveTo(
            p.x - (p.vx / speed) * tailLen,
            p.y - (p.vy / speed) * tailLen,
          );
          ctx!.lineTo(p.x, p.y);
          ctx!.stroke();
          ctx!.restore();
        }

        // Particle head
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

  return (
    <section
      aria-label="United States July Celebration Ribbon"
      className="relative isolate overflow-hidden border-y border-[#B22234]/65 bg-[#070B1A] shadow-[0_12px_36px_rgba(10,18,48,0.55)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-[#22090F] via-[#101E4D] to-[#081127]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(178,34,52,0.5)_0,transparent_34%),radial-gradient(circle_at_85%_80%,rgba(30,58,138,0.45)_0,transparent_38%),radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.12)_0,transparent_45%)] opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.8)_0.7px,transparent_0.7px)] bg-size-[20px_20px] opacity-22"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[14%] h-0.5 bg-linear-to-r from-transparent via-white/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[14%] h-0.5 bg-linear-to-r from-transparent via-white/75 to-transparent"
      />

      {/* Top patriotic stripe */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#B22234] via-[#FFFFFF] to-[#1E3A8A]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4">
        <div className="rounded-2xl border border-white/25 bg-white/12 px-4 py-4 backdrop-blur-[2px] sm:px-5 sm:py-5">
          <div className="grid items-center gap-4 lg:grid-cols-[minmax(0,1.25fr)_auto_minmax(0,1fr)] lg:gap-6">
            <div className="text-center lg:text-left">
              <p className="font-subheading text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F8D36B]">
                America&apos;s Semiquincentennial Support Month
              </p>
              <h2 className="text-base font-bold leading-snug text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.52)] sm:text-lg">
                Celebrating America Throughout July
              </h2>
              <p className="text-xs text-white/95 sm:text-sm">
                {isJulyCelebration
                  ? "We proudly stand with our veterans and their families year-round, honoring service and strengthening our communities."
                  : "Join us in supporting our communities and celebrating American values."}
              </p>
            </div>

            <div className="group/badge mx-auto flex items-center gap-3">
              <AmericanFlag size="md" animated className="shrink-0" />
              <div className="relative overflow-hidden rounded-xl border border-[#FFD700]/70 bg-linear-to-b from-[#1E3A8A]/80 via-[#102B66]/85 to-[#0B1E46]/90 px-4 py-2 text-center shadow-[0_10px_24px_rgba(11,30,70,0.45)] transition-all duration-300 motion-safe:group-hover/badge:-translate-y-0.5 motion-safe:group-hover/badge:shadow-[0_14px_28px_rgba(11,30,70,0.58)]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.28),transparent_60%)]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 translate-x-[-170%] bg-linear-to-r from-transparent via-white/55 to-transparent opacity-0 blur-[2px] transition-all duration-700 ease-out motion-safe:group-hover/badge:translate-x-[360%] motion-safe:group-hover/badge:opacity-100"
                />
                <p className="relative text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FFE8A3]">
                  Semiquincentennial
                </p>
                <p className="relative text-2xl font-black leading-none text-white sm:text-[30px]">
                  250
                </p>
                <p className="relative text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFE8A3]">
                  Years of Freedom
                </p>
              </div>
              <AmericanFlag
                size="md"
                animated
                className="shrink-0 hidden sm:block"
              />
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={launchFireworks}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#FFD700]/70 bg-linear-to-r from-[#B22234] via-[#D22A43] to-[#8E1528] px-3 py-2 text-white shadow-[0_10px_22px_rgba(122,19,32,0.5)] transition-all hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD700] touch-manipulation"
                aria-label="Launch fireworks to celebrate America's 250th anniversary"
              >
                <MaterialIcon
                  icon="celebration"
                  size="sm"
                  className="text-[#FFD700] transition-transform group-hover:scale-110"
                />
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FFE8A3] sm:text-[11px]">
                    Click to Celebrate
                  </span>
                  <span className="text-xs font-bold tracking-tight text-white sm:text-sm">
                    250 Years of Freedom
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom patriotic stripe */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-[#1E3A8A] via-[#FFFFFF] to-[#B22234]"
      />
    </section>
  );
}
