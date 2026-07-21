/**
 * @jest-environment node
 */

import { GET } from "../route";

describe("/api/og", () => {
  it("returns default branded image for legacy no-parameter requests", async () => {
    const response = GET(new Request("https://www.mhc-gc.com/api/og"));

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "https://www.mhc-gc.com/images/og-default.jpg",
    );
    expect(response.headers.get("cache-control")).toContain("s-maxage=86400");
    expect(response.headers.get("content-type")).toBe("image/jpeg");
  });

  it("selects the service template image from published canonical records", async () => {
    const response = GET(
      new Request(
        "https://www.mhc-gc.com/api/og?type=service&id=commercial-construction",
      ),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "https://www.mhc-gc.com/images/og/services/commercial-construction.webp",
    );
    expect(response.headers.get("content-type")).toBe("image/webp");
  });

  it("uses the default fallback image for location templates", async () => {
    const response = GET(
      new Request("https://www.mhc-gc.com/api/og?type=location&id=richland"),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "https://www.mhc-gc.com/images/og-default.jpg",
    );
  });

  it("rejects unknown template types", async () => {
    const response = GET(
      new Request("https://www.mhc-gc.com/api/og?type=podcast&id=episode-1"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: "Unsupported OG template type.",
    });
  });

  it("rejects requests missing required id", async () => {
    const response = GET(
      new Request("https://www.mhc-gc.com/api/og?type=service"),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: "Both type and id parameters are required.",
    });
  });

  it("rejects unsafe identifiers", async () => {
    const response = GET(
      new Request(
        "https://www.mhc-gc.com/api/og?type=project&id=franklin-county%2F..%2Fsecret",
      ),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: "Invalid OG template identifier.",
    });
  });

  it("rejects overlong identifiers", async () => {
    const overlongId = "a".repeat(81);
    const response = GET(
      new Request(
        `https://www.mhc-gc.com/api/og?type=service&id=${overlongId}`,
      ),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: "Invalid OG template identifier.",
    });
  });

  it("rejects private project records", async () => {
    const response = GET(
      new Request(
        "https://www.mhc-gc.com/api/og?type=project&id=lcsnw-tri-cities",
      ),
    );

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toMatchObject({
      error: "Project record is not published.",
    });
  });

  it("rejects unknown records for approved templates", async () => {
    const response = GET(
      new Request(
        "https://www.mhc-gc.com/api/og?type=event&id=missing-event-record",
      ),
    );

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toMatchObject({
      error: "Event record not found.",
    });
  });
});
