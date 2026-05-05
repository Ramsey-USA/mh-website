/**
 * @jest-environment node
 *
 * Tests for lib/email/templates/testimonial-blast.ts
 */

import { generateTestimonialBlast } from "@/lib/email/templates/testimonial-blast";

const baseData = {
  unsubscribeToken: "tok-abc",
  quote: "Great work by the whole team!",
  clientName: "John D.",
  location: "Richland, WA",
  project: "Custom Home Remodel",
  rating: 5,
  pageUrl: "https://www.mhc-gc.com/testimonials",
};

describe("generateTestimonialBlast()", () => {
  it("returns an object with subject, html, and text", () => {
    const result = generateTestimonialBlast(baseData);
    expect(typeof result.subject).toBe("string");
    expect(typeof result.html).toBe("string");
    expect(typeof result.text).toBe("string");
  });

  it("includes the quote in the html output", () => {
    const { html } = generateTestimonialBlast(baseData);
    expect(html).toContain("Great work by the whole team!");
  });

  it("includes the client name in the html output", () => {
    const { html } = generateTestimonialBlast(baseData);
    expect(html).toContain("John D.");
  });

  it("includes the location and project type", () => {
    const { html } = generateTestimonialBlast(baseData);
    expect(html).toContain("Richland, WA");
    expect(html).toContain("Custom Home Remodel");
  });

  it("uses personalised greeting when subscriberName is provided", () => {
    const { html } = generateTestimonialBlast({
      ...baseData,
      subscriberName: "Alice",
    });
    expect(html).toContain("Hi Alice,");
  });

  it("uses generic greeting when subscriberName is absent", () => {
    const { html } = generateTestimonialBlast(baseData);
    expect(html).toContain("Hi there,");
  });

  it("renders the image block when imageUrl is provided", () => {
    const { html } = generateTestimonialBlast({
      ...baseData,
      imageUrl: "https://cdn.mhc-gc.com/photo.jpg",
      imageAlt: "Project photo",
    });
    expect(html).toContain("https://cdn.mhc-gc.com/photo.jpg");
    expect(html).toContain("Project photo");
  });

  it("omits the project photo when imageUrl is absent", () => {
    const { html } = generateTestimonialBlast(baseData);
    // No imageUrl provided — the optional imageBlock should be empty
    expect(html).not.toContain("cdn.mhc-gc.com");
  });

  it("renders filled + empty stars for the given rating", () => {
    const { html } = generateTestimonialBlast({ ...baseData, rating: 4 });
    expect(html).toContain("★★★★☆");
  });

  it("clamps star rating to the 0–5 range", () => {
    const over = generateTestimonialBlast({ ...baseData, rating: 10 });
    expect(over.html).toContain("★★★★★");
    const under = generateTestimonialBlast({ ...baseData, rating: -1 });
    expect(under.html).toContain("☆☆☆☆☆");
  });

  it("includes the unsubscribe link in the html output", () => {
    const { html } = generateTestimonialBlast({
      ...baseData,
      unsubscribeToken: "unsub-xyz",
    });
    expect(html).toContain("unsub-xyz");
    expect(html).toContain("/api/newsletter/unsubscribe");
  });

  it("includes the pageUrl CTA", () => {
    const { html } = generateTestimonialBlast(baseData);
    expect(html).toContain("https://www.mhc-gc.com/testimonials");
  });

  it("includes the quote in the plain-text output", () => {
    const { text } = generateTestimonialBlast(baseData);
    expect(text).toContain("Great work by the whole team!");
  });

  it("uses a non-empty subject line", () => {
    const { subject } = generateTestimonialBlast(baseData);
    expect(subject.length).toBeGreaterThan(0);
  });
});
