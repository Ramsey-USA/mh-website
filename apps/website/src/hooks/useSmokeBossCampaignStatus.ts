"use client";

import { useEffect, useState } from "react";

// June 28, 2026 00:00:00 Pacific Daylight Time (UTC-7)
const MISSION_COMPLETE_DATE = new Date("2026-06-28T07:00:00.000Z");

export interface SmokeBossCampaignStatus {
  isMissionComplete: boolean;
}

export function getSmokeBossCampaignStatus(
  now: number = Date.now(),
): SmokeBossCampaignStatus {
  return {
    isMissionComplete: now >= MISSION_COMPLETE_DATE.getTime(),
  };
}

export function useSmokeBossCampaignStatus(): SmokeBossCampaignStatus {
  const [status, setStatus] = useState<SmokeBossCampaignStatus>(() => ({
    isMissionComplete: false,
  }));

  useEffect(() => {
    const initialStatus = getSmokeBossCampaignStatus();
    setStatus(initialStatus);

    if (initialStatus.isMissionComplete) {
      return;
    }

    const intervalId = setInterval(() => {
      const nextStatus = getSmokeBossCampaignStatus();
      setStatus(nextStatus);
      if (nextStatus.isMissionComplete) {
        clearInterval(intervalId);
      }
    }, 60_000);

    return () => clearInterval(intervalId);
  }, []);

  return status;
}
