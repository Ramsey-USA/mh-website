"use client";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  missionLine?: string;
}

export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  missionLine = "Built on Quality, Backed by Trust. Squared away from start to finish.",
}: PageHeroProps) {
  return (
    <section
      className="hero-section relative flex items-end justify-end text-white overflow-hidden"
      style={{ height: "calc(100vh - var(--mh-nav-offset, 6.5rem))" }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900">
        <div
          className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"
          aria-hidden="true"
        ></div>
      </div>

      <div className="hero-safe-top hero-safe-bottom relative z-30 mx-3 sm:ml-auto sm:mr-5 lg:mr-7 xl:mr-10 mb-4 pointer-events-none transition-opacity duration-300 sm:w-[min(88vw,44rem)] sm:max-w-176">
        <div className="rounded-2xl border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5">
          <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
            <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
              {eyebrow}
            </span>
            <span className="block text-brand-secondary">{title}</span>
            {highlight ? (
              <span className="block text-brand-primary">{highlight}</span>
            ) : null}
            <span className="block text-white/90">{description}</span>
            <span className="block text-brand-secondary/90 text-xs xs:text-sm sm:text-base mt-2">
              {missionLine}
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
