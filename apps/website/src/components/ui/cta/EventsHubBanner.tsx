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
    pathname === "/cool-desert-nights" ||
    pathname === "/events" ||
    pathname === "/careers"
  ) {
    return null;
  }

  return (
    <aside
      aria-labelledby="events-hub-banner-heading"
      className="border-y border-brand-secondary/35 bg-linear-to-r from-brand-primary-dark via-brand-primary to-brand-primary-dark"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-5 sm:gap-6 sm:px-6">
        <div className="w-36 shrink-0 sm:w-48 lg:w-64">
          <Image
            src="/images/events/cool-desert-nights/cool-desert-nights-logo2.webp"
            alt="MH Construction community events"
            width={1200}
            height={520}
            className="h-auto w-full rounded-2xl object-contain shadow-[0_16px_36px_rgba(0,0,0,0.5)]"
          />
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-secondary/45 bg-brand-secondary/20 px-3 py-1 text-white">
            <MaterialIcon icon="event" size="sm" />
            <span className="flex flex-col leading-tight">
              <span className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                Events Hub
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-brand-secondary-light/90">
                Community Updates
              </span>
            </span>
          </span>
          <h2
            id="events-hub-banner-heading"
            className="text-xl font-black text-white sm:text-2xl"
          >
            Explore Sponsored and Hosted Events
          </h2>
          <p className="max-w-4xl text-sm leading-relaxed text-gray-200 sm:text-base">
            Visit the MH Construction Events Hub for featured placements,
            community event highlights, and upcoming sponsored or hosted event
            sections.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="max-w-full border-brand-secondary bg-brand-secondary/20 text-white hover:bg-brand-secondary hover:text-gray-950"
            aria-label="Explore the MH Construction Events Hub"
            asChild
          >
            <Link href="/events" className="inline-flex max-w-full">
              <MaterialIcon icon="campaign" size="md" className="mr-2" />
              Explore Events Hub
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}

// Backward-compatible alias while imports are migrated.
export const SmokeBossFunnel = EventsHubBanner;
