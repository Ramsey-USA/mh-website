"use client";

import { useEffect, useState } from "react";

export interface SmokeBossCampaignStatus {
  isMissionComplete: boolean;
}

export function getSmokeBossCampaignStatus(
  _now: number = Date.now(),
): SmokeBossCampaignStatus {
  return {
    isMissionComplete: false,
  };
}

export function useSmokeBossCampaignStatus(): SmokeBossCampaignStatus {
  const [status, setStatus] = useState<SmokeBossCampaignStatus>(() => ({
    isMissionComplete: false,
  }));

  useEffect(() => {
    setStatus(getSmokeBossCampaignStatus());
  }, []);

  return status;
}
