/**
 * Booking Page Hero Component
 * Header section with veteran badge and navigation
 */

import Link from "next/link";
import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

export function BookingHero() {
  return (
    <div className="relative bg-gradient-to-br from-brand-primary to-brand-secondary shadow-2xl pt-24 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(30deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(150deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(30deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(150deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff)",
            backgroundSize: "80px 140px",
            backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-white text-sm">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-white/80 transition-colors"
          >
            <MaterialIcon icon="home" size="sm" />
            Home
          </Link>
          <MaterialIcon icon="chevron_right" size="sm" />
          <span className="font-medium">Mission Scheduling</span>
        </nav>

        {/* Hero Content */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="mb-4 font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight drop-shadow-lg">
              Deploy Your
              <br />
              <span className="text-yellow-300">Tactical Consultation</span>
            </h1>
            <p className="mb-6 max-w-2xl text-white text-xl leading-relaxed drop-shadow-md">
              Partner with Eastern Washington&apos;s veteran-owned construction
              command. Let&apos;s brief on your mission objectives and execute
              extraordinary results together.
            </p>

            {/* Trust Indicators */}
            <div className="flex md:flex-row flex-col gap-6 md:items-center">
              <div className="flex items-center gap-2 text-white">
                <MaterialIcon
                  icon="verified"
                  size="md"
                  className="text-yellow-300"
                />
                <span className="font-semibold">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <MaterialIcon
                  icon="military_tech"
                  size="md"
                  className="text-yellow-300"
                />
                <span className="font-semibold">Veteran-Owned Excellence</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <MaterialIcon
                  icon="schedule"
                  size="md"
                  className="text-yellow-300"
                />
                <span className="font-semibold">60-Minute Briefing</span>
              </div>
            </div>
          </div>

          {/* Veteran Badge */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative bg-white shadow-2xl p-4 rounded-2xl">
              <Image
                src="/images/Vet Logo.png"
                alt="Veteran-Owned Business"
                width={200}
                height={200}
                className="drop-shadow-lg"
                priority
              />
            </div>
            <div className="bg-white/95 shadow-lg backdrop-blur-sm px-6 py-3 rounded-full">
              <p className="font-bold text-brand-primary text-center text-sm">
                🇺🇸 Proudly Veteran-Owned 🇺🇸
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
