"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useSmokeBossCampaignStatus } from "@/hooks";

export function EventsHubBanner() {
  const pathname = usePathname();
  const { isMissionComplete: isCampaignComplete } =
    useSmokeBossCampaignStatus();

  if (
    isCampaignComplete ||
    pathname === "/events/bbq-contest" ||
    pathname === "/events/cool-desert-nights" ||
    pathname === "/events" ||
    pathname === "/careers"
  ) {
    return null;
  }

  return (
    <aside
      aria-labelledby="events-hub-banner-heading"
      className="border-y border-brand-secondary/20 bg-linear-to-r from-brand-primary-dark/70 via-brand-primary/55 to-brand-primary-dark/70"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-5 sm:gap-6 sm:px-6">
        <div className="w-36 shrink-0 sm:w-48 lg:w-64">
          <Image
            src="/images/events/cool-desert-nights/smoke-n-shine-showdown-graphic.webp"
            alt="Pacific Northwest Annual BBQ Competition — MH Construction"
            width={1200}
            height={630}
            className="h-auto w-full rounded-2xl object-contain shadow-[0_16px_36px_rgba(0,0,0,0.5)]"
          />
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-secondary/45 bg-brand-secondary/20 px-3 py-1 text-white">
            <MaterialIcon icon="outdoor_grill" size="sm" />
            <span className="flex flex-col leading-tight">
              <span className="font-subheading text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                BBQ Contest
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-brand-secondary-light/90">
                Fall 2026 · Tri-Cities, WA
              </span>
            </span>
          </span>
          <h2
            id="events-hub-banner-heading"
            className="text-xl font-black text-white sm:text-2xl"
          >
            Pacific Northwest Annual BBQ Competition
          </h2>
          <p className="font-body max-w-4xl text-sm leading-relaxed text-gray-200 sm:text-base">
            MH Construction is sponsoring the Pacific Northwest Annual BBQ
            Competition. View event status, schedule milestones, and
            participation details on the dedicated contest page.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="max-w-full border-brand-secondary bg-brand-secondary/20 text-white hover:bg-brand-secondary hover:text-gray-950"
            aria-label="View the Pacific Northwest Annual BBQ Competition details"
            asChild
          >
            <Link href="/events/bbq-contest" className="inline-flex max-w-full">
              <MaterialIcon icon="outdoor_grill" size="md" className="mr-2" />
              View BBQ Contest
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}

// Backward-compatible alias while imports are migrated.
export const SmokeBossFunnel = EventsHubBanner;
