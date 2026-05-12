"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useSmokeBossCampaignStatus } from "@/hooks";

export function SmokeBossFunnel() {
  const pathname = usePathname();
  const { isMissionComplete } = useSmokeBossCampaignStatus();

  if (isMissionComplete || pathname === "/cool-desert-nights") {
    return null;
  }

  return (
    <aside
      aria-labelledby="smoke-boss-funnel-heading"
      className="border-y border-amber-500/35 bg-linear-to-r from-gray-950 via-gray-900 to-zinc-900"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">
            <MaterialIcon icon="local_fire_department" size="sm" />
            Event-Driver
          </p>
          <h2
            id="smoke-boss-funnel-heading"
            className="text-xl font-black text-white sm:text-2xl"
          >
            Meet the Smoke Boss at Cool Desert Nights
          </h2>
          <p className="max-w-4xl text-sm leading-relaxed text-gray-200 sm:text-base">
            MHC is hosting the inaugural Smoke &amp; Shine BBQ Showdown this
            June. Jeremy Thamert is judging the PNW&apos;s best brisket
            alongside Kennewick&apos;s Mayor. Visit our premium booth near the
            BBQ competition for exclusive site coupons and gear.
          </p>
        </div>

        <Link href="/cool-desert-nights" className="shrink-0">
          <Button
            variant="secondary"
            size="lg"
            className="w-full border-amber-400 bg-amber-400/20 text-amber-200 hover:bg-amber-400 hover:text-gray-950 sm:w-auto"
            aria-label="View Cool Desert Nights mission briefing"
          >
            <MaterialIcon icon="campaign" size="md" className="mr-2" />
            View Mission Briefing
          </Button>
        </Link>
      </div>
    </aside>
  );
}
