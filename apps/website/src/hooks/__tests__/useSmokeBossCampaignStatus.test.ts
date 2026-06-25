import { getSmokeBossCampaignStatus } from "../useSmokeBossCampaignStatus";

describe("getSmokeBossCampaignStatus", () => {
  it("always returns active while voting remains open", () => {
    const beforeCutoff = new Date("2026-06-28T06:59:59.000Z").getTime();
    const afterCutoff = new Date("2026-07-01T00:00:00.000Z").getTime();

    expect(getSmokeBossCampaignStatus(beforeCutoff).isMissionComplete).toBe(
      false,
    );
    expect(getSmokeBossCampaignStatus(afterCutoff).isMissionComplete).toBe(
      false,
    );
  });

  it("ignores the supplied timestamp", () => {
    const atCutoff = new Date("2026-06-28T07:00:00.000Z").getTime();

    expect(getSmokeBossCampaignStatus(atCutoff).isMissionComplete).toBe(false);
  });
});
