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
  missionLine = "Building projects for the Client, NOT the Dollar",
}: PageHeroProps) {
  return (
    <section className="hero-section relative flex items-end justify-end text-white overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900">
        <div
          className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"
          aria-hidden="true"
        ></div>
      </div>

      <div className="hero-safe-top relative z-30 mb-4 sm:mb-4 md:mb-4 lg:mb-4 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
        <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight tracking-tight">
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
    </section>
  );
}
